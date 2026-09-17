// components/learn/WordDictation.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_WORDS = 10;

// ============ HỆ THỐNG ÂM THANH ============
const useSoundEffects = () => {
    const audioContextRef = useRef(null);

    const getContext = () => {
        if (typeof window === 'undefined') return null;
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
        return audioContextRef.current;
    };

    const playTone = (frequency, duration, type = 'sine', volume = 0.15, delay = 0) => {
        const ctx = getContext();
        if (!ctx) return;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

        gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(ctx.currentTime + delay);
        oscillator.stop(ctx.currentTime + delay + duration);
    };

    const playClick = () => playTone(600, 0.08, 'sine', 0.08);

    const playCorrect = () => {
        playTone(880, 0.12, 'sine', 0.15);
        playTone(1174.66, 0.2, 'sine', 0.12, 0.08);
    };

    const playCorrectStreak = () => {
        playTone(880, 0.1, 'triangle', 0.15, 0);
        playTone(1046.5, 0.1, 'triangle', 0.15, 0.08);
        playTone(1318.51, 0.1, 'triangle', 0.15, 0.16);
        playTone(1567.98, 0.3, 'triangle', 0.18, 0.24);
    };

    const playWrong = () => {
        playTone(220, 0.2, 'sawtooth', 0.1);
        playTone(165, 0.25, 'sawtooth', 0.08, 0.1);
    };

    const playStart = () => {
        playTone(400, 0.1, 'sine', 0.1);
        playTone(600, 0.15, 'sine', 0.12, 0.08);
    };

    const playVictory = () => {
        playTone(523.25, 0.15, 'triangle', 0.15, 0);
        playTone(659.25, 0.15, 'triangle', 0.15, 0.12);
        playTone(783.99, 0.15, 'triangle', 0.15, 0.24);
        playTone(1046.5, 0.2, 'triangle', 0.18, 0.36);
        playTone(1318.51, 0.6, 'triangle', 0.2, 0.52);
    };

    const playReveal = () => {
        playTone(440, 0.15, 'sine', 0.12, 0);
        playTone(660, 0.2, 'sine', 0.12, 0.1);
    };

    return { playClick, playCorrect, playCorrectStreak, playWrong, playStart, playVictory, playReveal };
};

export default function WordDictation({ data, course_slug, module_slug, lesson_slug, item_slug }) {
    const router = useRouter();
    const { API_URL } = useAuth();
    const sounds = useSoundEffects();
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const audioRef = useRef(null);

    const [allCards, setAllCards] = useState([]);
    const [gameCards, setGameCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [userInput, setUserInput] = useState('');
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const [timer, setTimer] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);
    const [streak, setStreak] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    // State cho màn hình kết quả
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [gameStats, setGameStats] = useState({
        totalXP: 0,
        baseXP: 0,
        streakBonus: 0,
        timeBonus: 0,
        accuracyBonus: 0,
        maxStreak: 0,
        totalMistakes: 0,
        totalTime: 0,
        correctCount: 0,
        wrongCount: 0,
    });

    const [config, setConfig] = useState({
        wordsPerGame: DEFAULT_WORDS,
    });

    const maxStreakRef = useRef(0);
    const totalMistakesRef = useRef(0);
    const correctCountRef = useRef(0);
    const wrongCountRef = useRef(0);

    // Fetch data
    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}api/courses/${course_slug}/lessons/${lesson_slug}/`)
            .then(response => {
                if (!response.ok) throw new Error('Không thể tải dữ liệu bài học');
                return response.json();
            })
            .then(data => {
                const words = data.content?.words || [];
                setAllCards(words);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Lỗi tải bài học:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [API_URL, course_slug, lesson_slug]);

    // Fullscreen listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    // Update maxStreak
    useEffect(() => {
        if (streak > maxStreakRef.current) {
            maxStreakRef.current = streak;
        }
    }, [streak]);

    const enterFullscreen = async () => {
        try {
            const element = containerRef.current || document.documentElement;
            if (element.requestFullscreen) {
                await element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                await element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                await element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                await element.msRequestFullscreen();
            }
            setIsFullscreen(true);
        } catch (err) {
            console.warn('Không thể vào chế độ fullscreen:', err);
        }
    };

    const exitFullscreen = async () => {
        try {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                await document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                await document.msExitFullscreen();
            }
            setIsFullscreen(false);
        } catch (err) {
            console.warn('Không thể thoát chế độ fullscreen:', err);
        }
    };

    const playSound = (soundFn) => {
        if (soundEnabled) soundFn();
    };

    // Phát audio của từ hiện tại
    const playWordAudio = useCallback(() => {
        const currentCard = gameCards[currentIndex];
        if (!currentCard?.audio_file) return;

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const baseUrl = process.env.NEXT_PUBLIC_MEDIA_URL || '/media/';
        const audioUrl = currentCard.audio_file.startsWith('http')
            ? currentCard.audio_file
            : `${baseUrl}${currentCard.audio_file}`;

        audioRef.current = new Audio(audioUrl);
        audioRef.current.onplay = () => setIsAudioPlaying(true);
        audioRef.current.onended = () => setIsAudioPlaying(false);
        audioRef.current.onerror = () => setIsAudioPlaying(false);

        audioRef.current.play().catch(err => {
            console.warn('Không thể phát audio:', err);
            setIsAudioPlaying(false);
        });
    }, [gameCards, currentIndex]);

    // Tự động phát audio khi vào câu mới
    useEffect(() => {
        if (isPlaying && gameCards[currentIndex] && !answered && !isGameFinished) {
            const timer = setTimeout(() => {
                playWordAudio();
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, isPlaying, gameCards, answered, isGameFinished, playWordAudio]);

    // Focus vào input khi vào câu mới
    useEffect(() => {
        if (isPlaying && !answered && inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentIndex, isPlaying, answered]);

    // Timer
    useEffect(() => {
        if (!isPlaying || isGameFinished) return;
        const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
        return () => clearInterval(interval);
    }, [isPlaying, isGameFinished]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Chuẩn hóa chuỗi để so sánh
    const normalizeText = (text) => {
        return text.trim().replace(/\s+/g, '').toLowerCase();
    };

    // Tính điểm XP
    const calculateXP = (totalWords, maxStreak, mistakes, timeInSeconds) => {
        const baseXP = totalWords * 15;
        const streakBonus = Math.min(maxStreak * 5, 50);
        const avgTimePerWord = timeInSeconds / totalWords;
        const timeBonus = avgTimePerWord <= 8 ? 30 : avgTimePerWord <= 12 ? 20 : avgTimePerWord <= 20 ? 10 : 0;
        const accuracyBonus = mistakes === 0 ? 30 : 0;
        const totalXP = baseXP + streakBonus + timeBonus + accuracyBonus;

        return {
            totalXP,
            baseXP,
            streakBonus,
            timeBonus,
            accuracyBonus,
            maxStreak,
            totalMistakes: mistakes,
            totalTime: timeInSeconds,
        };
    };

    const startGame = () => {
        if (allCards.length === 0) return;

        playSound(sounds.playStart);

        const shuffled = [...allCards].sort(() => Math.random() - 0.5);
        const wordsToUse = shuffled.slice(0, Math.min(config.wordsPerGame, shuffled.length));

        setGameCards(wordsToUse);
        setCurrentIndex(0);
        setUserInput('');
        setAnswered(false);
        setIsCorrect(false);
        setShowAnswer(false);
        setShowHint(false);
        setTimer(0);
        setStreak(0);
        setIsPlaying(true);
        setIsGameFinished(false);
        maxStreakRef.current = 0;
        totalMistakesRef.current = 0;
        correctCountRef.current = 0;
        wrongCountRef.current = 0;

        setTimeout(() => {
            enterFullscreen();
        }, 100);
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (answered || !userInput.trim()) return;

        playSound(sounds.playClick);

        const currentCard = gameCards[currentIndex];
        const normalizedInput = normalizeText(userInput);
        const normalizedAnswer = normalizeText(currentCard.chinese);
        const correct = normalizedInput === normalizedAnswer;

        setAnswered(true);
        setIsCorrect(correct);

        if (correct) {
            const newStreak = streak + 1;
            if (newStreak >= 3) {
                playSound(sounds.playCorrectStreak);
            } else {
                playSound(sounds.playCorrect);
            }
            setStreak(newStreak);
            correctCountRef.current += 1;
        } else {
            playSound(sounds.playWrong);
            setStreak(0);
            totalMistakesRef.current += 1;
            wrongCountRef.current += 1;
        }
    };

    const handleNext = () => {
        if (currentIndex + 1 >= gameCards.length) {
            // Kết thúc game
            playSound(sounds.playVictory);
            const stats = calculateXP(
                gameCards.length,
                maxStreakRef.current,
                totalMistakesRef.current,
                timer
            );
            setGameStats({
                ...stats,
                correctCount: correctCountRef.current,
                wrongCount: wrongCountRef.current,
            });
            setIsGameFinished(true);
            setIsPlaying(false);
            exitFullscreen();
            return;
        }

        setCurrentIndex(prev => prev + 1);
        setUserInput('');
        setAnswered(false);
        setIsCorrect(false);
        setShowAnswer(false);
        setShowHint(false);
    };

    const handleReveal = () => {
        playSound(sounds.playReveal);
        setShowAnswer(true);
        setAnswered(true);
        setIsCorrect(false);
        setStreak(0);
        totalMistakesRef.current += 1;
        wrongCountRef.current += 1;
    };

    const handleShowHint = () => {
        setShowHint(true);
    };

    const handleBackToSettings = () => {
        exitFullscreen();
        setIsPlaying(false);
        setIsGameFinished(false);
        setGameCards([]);
        setCurrentIndex(0);
        setUserInput('');
        setAnswered(false);
        setIsCorrect(false);
        setShowAnswer(false);
        setShowHint(false);
        setTimer(0);
        setStreak(0);
        maxStreakRef.current = 0;
        totalMistakesRef.current = 0;
        correctCountRef.current = 0;
        wrongCountRef.current = 0;
    };

    // Keyboard: Enter để submit (khi chưa trả lời) hoặc next (khi đã trả lời)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (answered) {
                e.preventDefault();
                handleNext();
            }
            // Khi chưa answered, Enter sẽ tự động submit form (mặc định của form)
        }
    };

    // Global keyboard listener cho màn hình đã hiện đáp án
    // (để Enter hoạt động ngay cả khi input không còn focus)
    useEffect(() => {
        if (!isPlaying || !answered || isGameFinished) return;
        
        const handleGlobalKeyDown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNext();
            }
        };
        
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isPlaying, answered, isGameFinished, currentIndex, gameCards.length]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-sub">Đang tải trò chơi...</p>
                </div>
            </div>
        );
    }

    if (error || allCards.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-text-sub mb-4">sentiment_dissatisfied</span>
                    <h3 className="text-xl font-bold mb-2">Không tìm thấy dữ liệu</h3>
                    <p className="text-text-sub">{error || "Bài học này chưa có từ vựng."}</p>
                </div>
            </div>
        );
    }

    // ============ MÀN HÌNH KẾT QUẢ ============
    if (isGameFinished) {
        const total = gameStats.correctCount + gameStats.wrongCount;
        const accuracy = total > 0 ? Math.round((gameStats.correctCount / total) * 100) : 0;

        return (
            <main className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark overflow-y-auto">
                <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 max-w-2xl mx-auto w-full">

                    <div className="w-full bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sm:p-8 animate-bounce-in">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                                <span className="material-symbols-outlined text-white text-5xl">emoji_events</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-white mb-2">
                                Hoàn thành xuất sắc!
                            </h1>
                            <p className="text-text-sub text-sm sm:text-base">
                                Bạn đã hoàn thành {gameCards.length} câu dictation
                            </p>
                        </div>

                        {/* Điểm XP tổng */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 mb-6 border-2 border-amber-200 dark:border-amber-800 text-center">
                            <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1 uppercase tracking-wider">
                                Tổng điểm XP
                            </p>
                            <p className="text-5xl sm:text-6xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                                +{gameStats.totalXP}
                            </p>
                            <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                                Độ chính xác: {accuracy}%
                            </p>
                        </div>

                        {/* Chi tiết điểm */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-xl">stars</span>
                                    <span className="text-sm font-medium text-text-main dark:text-white">Điểm cơ bản</span>
                                </div>
                                <span className="font-bold text-primary">+{gameStats.baseXP} XP</span>
                            </div>

                            {gameStats.streakBonus > 0 && (
                                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-orange-500 text-xl">local_fire_department</span>
                                        <span className="text-sm font-medium text-text-main dark:text-white">
                                            Chuỗi streak (tối đa {gameStats.maxStreak})
                                        </span>
                                    </div>
                                    <span className="font-bold text-orange-500">+{gameStats.streakBonus} XP</span>
                                </div>
                            )}

                            {gameStats.timeBonus > 0 && (
                                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-blue-500 text-xl">bolt</span>
                                        <span className="text-sm font-medium text-text-main dark:text-white">Hoàn thành nhanh</span>
                                    </div>
                                    <span className="font-bold text-blue-500">+{gameStats.timeBonus} XP</span>
                                </div>
                            )}

                            {gameStats.accuracyBonus > 0 && (
                                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-emerald-500 text-xl">verified</span>
                                        <span className="text-sm font-medium text-text-main dark:text-white">Không có lỗi</span>
                                    </div>
                                    <span className="font-bold text-emerald-500">+{gameStats.accuracyBonus} XP</span>
                                </div>
                            )}
                        </div>

                        {/* Thống kê */}
                        <div className="grid grid-cols-4 gap-3 mb-6">
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700">
                                <span className="material-symbols-outlined text-primary text-2xl mb-1">timer</span>
                                <p className="text-xs text-text-sub mb-1">Thời gian</p>
                                <p className="font-bold text-text-main dark:text-white text-sm">{formatTime(gameStats.totalTime)}</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700">
                                <span className="material-symbols-outlined text-emerald-500 text-2xl mb-1">check_circle</span>
                                <p className="text-xs text-text-sub mb-1">Đúng</p>
                                <p className="font-bold text-text-main dark:text-white text-sm">{gameStats.correctCount}</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700">
                                <span className="material-symbols-outlined text-red-500 text-2xl mb-1">cancel</span>
                                <p className="text-xs text-text-sub mb-1">Sai</p>
                                <p className="font-bold text-text-main dark:text-white text-sm">{gameStats.wrongCount}</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700">
                                <span className="material-symbols-outlined text-orange-500 text-2xl mb-1">whatshot</span>
                                <p className="text-xs text-text-sub mb-1">Streak</p>
                                <p className="font-bold text-text-main dark:text-white text-sm">{gameStats.maxStreak}</p>
                            </div>
                        </div>

                        {/* Nút hành động */}
                        <div className="space-y-3">
                            <button
                                onClick={handleBackToSettings}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 text-lg"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">replay</span>
                                    Chơi lại với cấu hình mới
                                </span>
                            </button>

                            <Link
                                href={`/learn/courses/${course_slug}/${module_slug}/vocabulary/${lesson_slug}`}
                                className="w-full bg-white text-[#091d2e] px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_4px_0_#c9dcf3] hover:bg-[#edf4ff] transition-colors flex items-center justify-center gap-2 border-2 border-[#d1e4fb]"
                            >
                                <span className="material-symbols-outlined text-sm">apps</span>
                                Chọn chế độ luyện tập khác
                            </Link>
                        </div>
                    </div>
                </div>

                <style jsx global>{`
                    @keyframes bounce-in {
                        0% { transform: scale(0.8); opacity: 0; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    .animate-bounce-in {
                        animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    }
                `}</style>
            </main>
        );
    }

    // ============ MÀN HÌNH CẤU HÌNH ============
    if (!isPlaying) {
        const maxWords = allCards.length;

        return (
            <main className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark overflow-y-auto">
                <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 max-w-2xl mx-auto w-full">

                    <div className="w-full bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-primary text-4xl">headphones</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-white mb-2">
                                Nghe & Viết từ vựng
                            </h1>
                            <p className="text-text-sub text-sm sm:text-base">
                                Nghe audio và nhập từ tiếng Trung tương ứng. Bài học có <span className="font-bold text-primary">{allCards.length}</span> từ.
                            </p>
                        </div>

                        {/* Cấu hình số từ */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-text-main dark:text-white mb-3">
                                Số từ muốn luyện tập
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[5, 10, 15, 20].map((num) => {
                                    const isDisabled = num > maxWords;
                                    return (
                                        <button
                                            key={num}
                                            onClick={() => !isDisabled && setConfig(prev => ({ ...prev, wordsPerGame: num }))}
                                            disabled={isDisabled}
                                            className={`
                                                py-3 rounded-xl font-bold text-sm sm:text-base transition-all border-2
                                                ${isDisabled
                                                    ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-text-sub border-slate-200 dark:border-slate-700'
                                                    : config.wordsPerGame === num
                                                        ? 'bg-primary text-white border-primary shadow-lg scale-105'
                                                        : 'bg-slate-50 dark:bg-slate-800 text-text-main dark:text-white border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                                }
                                            `}
                                        >
                                            {num} từ
                                        </button>
                                    );
                                })}
                            </div>
                            {maxWords < 20 && (
                                <p className="text-xs text-text-sub mt-2">
                                    Bài học chỉ có {maxWords} từ, nên tối đa là {maxWords} từ.
                                </p>
                            )}
                        </div>

                        {/* Toggle âm thanh */}
                        <div className="mb-6 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-2xl">
                                    {soundEnabled ? 'volume_up' : 'volume_off'}
                                </span>
                                <div>
                                    <p className="font-bold text-text-main dark:text-white text-sm">Hiệu ứng âm thanh</p>
                                    <p className="text-xs text-text-sub">Bật/tắt âm thanh phản hồi</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSoundEnabled(!soundEnabled)}
                                className={`
                                    relative w-14 h-8 rounded-full transition-colors duration-300
                                    ${soundEnabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}
                                `}
                            >
                                <span
                                    className={`
                                        absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300
                                        ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}
                                    `}
                                />
                            </button>
                        </div>

                        {/* Thông tin tóm tắt */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-sub">Số câu sẽ chơi:</span>
                                <span className="font-bold text-primary text-lg">
                                    {Math.min(config.wordsPerGame, allCards.length)} câu
                                </span>
                            </div>
                        </div>

                        {/* Hướng dẫn */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6 border border-blue-200 dark:border-blue-800">
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">info</span>
                                <div className="text-sm text-blue-800 dark:text-blue-300">
                                    <p className="font-bold mb-1">Cách chơi:</p>
                                    <ul className="list-disc list-inside space-y-0.5 text-xs">
                                        <li>Nghe audio và nhập từ tiếng Trung vào ô trống</li>
                                        <li>Nhấn <kbd className="px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-800 font-mono text-[10px]">Enter</kbd> để kiểm tra</li>
                                        <li>Sau khi xem đáp án, nhấn <kbd className="px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-800 font-mono text-[10px]">Enter</kbd> để chuyển câu tiếp theo</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Nút bắt đầu */}
                        <button
                            onClick={startGame}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 text-lg mb-4"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">play_arrow</span>
                                Bắt đầu chơi
                            </span>
                        </button>

                        {/* Nút chọn chế độ khác */}
                        <Link
                            href={`/learn/courses/${course_slug}/${module_slug}/overview-practice/${lesson_slug}`}
                            className="w-full bg-white text-[#091d2e] px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_4px_0_#c9dcf3] hover:bg-[#edf4ff] transition-colors flex items-center justify-center gap-2 border-2 border-[#d1e4fb]"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Chọn chế độ khác
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    // ============ MÀN HÌNH CHƠI GAME (FULLSCREEN) ============
    const currentCard = gameCards[currentIndex];
    const totalWords = gameCards.length;

    return (
        <main
            ref={containerRef}
            className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark overflow-y-auto"
            style={{ backgroundColor: 'var(--background-light, #f8fafc)' }}
        >
            <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 max-w-3xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
                    <div className="flex-1 w-full">
                        <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                            <span className="text-text-sub font-medium">
                                Câu {currentIndex + 1}/{totalWords}
                            </span>
                            <span className="text-text-main font-bold">
                                Dictation
                            </span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${((currentIndex + (answered ? 1 : 0)) / totalWords) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 flex-wrap">
                        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-text-sub text-base sm:text-lg">timer</span>
                            <span className="text-sm sm:text-base font-bold text-text-main dark:text-white font-mono tabular-nums">
                                {formatTime(timer)}
                            </span>
                        </div>
                        {streak > 0 && (
                            <div className="flex items-center gap-1 bg-primary/10 dark:bg-primary/20 px-3 py-1.5 rounded-lg">
                                <span className="material-symbols-outlined text-primary text-base sm:text-lg">whatshot</span>
                                <span className="text-sm sm:text-base font-bold text-primary">{streak}</span>
                            </div>
                        )}
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
                        >
                            <span className="material-symbols-outlined text-text-sub text-base sm:text-lg">
                                {soundEnabled ? 'volume_up' : 'volume_off'}
                            </span>
                        </button>
                        <button
                            onClick={handleBackToSettings}
                            className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-red-500/30 hover:scale-105 active:scale-95"
                            title="Kết thúc và quay về màn hình cấu hình"
                        >
                            <span className="material-symbols-outlined text-base sm:text-lg">logout</span>
                            <span className="hidden sm:inline">Kết thúc</span>
                        </button>
                    </div>
                </div>

                {/* Game Area */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6">

                    {/* Audio Player Card */}
                    <div className="w-full bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                        <div className="flex flex-col items-center gap-4">
                            <button
                                onClick={playWordAudio}
                                disabled={isAudioPlaying}
                                className={`
                                    relative w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center
                                    transition-all duration-300 shadow-xl
                                    ${isAudioPlaying
                                        ? 'bg-gradient-to-br from-primary to-primary-dark text-white scale-110'
                                        : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white hover:scale-105 active:scale-95'
                                    }
                                `}
                            >
                                <span className={`material-symbols-outlined text-5xl sm:text-6xl ${isAudioPlaying ? 'animate-pulse' : ''}`}>
                                    {isAudioPlaying ? 'volume_up' : 'volume_up'}
                                </span>
                                {isAudioPlaying && (
                                    <>
                                        <span className="absolute inset-0 rounded-full animate-ping bg-blue-400/40"></span>
                                        <span className="absolute inset-0 rounded-full animate-ping bg-blue-400/20 animation-delay-200"></span>
                                    </>
                                )}
                            </button>
                            <p className="text-sm text-text-sub">
                                {isAudioPlaying ? 'Đang phát...' : 'Nhấn để nghe lại'}
                            </p>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="w-full">
                        {!answered ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <div className="relative">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Nhập từ tiếng Trung..."
                                        className="w-full text-center text-2xl sm:text-3xl md:text-4xl font-kaiti font-bold py-5 px-4 rounded-2xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-[#1a2632] text-text-main dark:text-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        spellCheck="false"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={!userInput.trim()}
                                        className={`
                                            flex-1 font-bold py-4 rounded-2xl transition-all text-lg
                                            ${userInput.trim()
                                                ? 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95'
                                                : 'bg-slate-200 dark:bg-slate-700 text-text-sub cursor-not-allowed'
                                            }
                                        `}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined">check</span>
                                            Kiểm tra
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleShowHint}
                                        className="px-5 py-4 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                                        title="Xem gợi ý"
                                    >
                                        <span className="material-symbols-outlined">lightbulb</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleReveal}
                                        className="px-5 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-text-sub font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                        title="Xem đáp án"
                                    >
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                </div>
                                {showHint && !answered && (
                                    <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-4 text-center">
                                        <p className="text-xs text-amber-700 dark:text-amber-400 mb-1">Gợi ý</p>
                                        <p className="font-kaiti text-2xl text-amber-800 dark:text-amber-300">
                                            {currentCard?.chinese?.[0]}
                                            {' _'.repeat(Math.max(0, (currentCard?.chinese?.length || 1) - 1))}
                                        </p>
                                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">{currentCard?.pinyin}</p>
                                    </div>
                                )}
                            </form>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {/* Kết quả */}
                                <div className={`
                                    rounded-2xl p-6 border-2 text-center
                                    ${isCorrect
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700'
                                        : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                                    }
                                `}>
                                    <div className="flex items-center justify-center gap-2 mb-3">
                                        <span className={`material-symbols-outlined text-4xl ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {isCorrect ? 'check_circle' : 'cancel'}
                                        </span>
                                        <span className={`text-2xl font-bold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {isCorrect ? 'Chính xác!' : 'Chưa đúng!'}
                                        </span>
                                    </div>

                                    {!isCorrect && (
                                        <div className="mb-3">
                                            <p className="text-xs text-text-sub mb-1">Bạn đã nhập:</p>
                                            <p className="font-kaiti text-xl text-red-600 dark:text-red-400 line-through">
                                                {userInput || '(bỏ trống)'}
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <p className="text-xs text-text-sub mb-1">Đáp án đúng:</p>
                                        <p className="font-kaiti text-3xl sm:text-4xl font-bold text-text-main dark:text-white mb-1">
                                            {currentCard?.chinese}
                                        </p>
                                        <p className="text-base text-primary font-medium">{currentCard?.pinyin}</p>
                                        <p className="text-sm text-text-sub mt-1">{currentCard?.meaning}</p>
                                    </div>
                                </div>

                                {/* Nút tiếp tục */}
                                <button
                                    onClick={handleNext}
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 text-lg"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {currentIndex + 1 >= totalWords ? (
                                            <>
                                                <span className="material-symbols-outlined">emoji_events</span>
                                                Xem kết quả
                                            </>
                                        ) : (
                                            <>
                                                Câu tiếp theo
                                                <span className="material-symbols-outlined">arrow_forward</span>
                                            </>
                                        )}
                                    </span>
                                </button>

                                {/* 📢 Ghi chú: Enter để chuyển câu tiếp theo */}
                                <div className="flex justify-center">
                                    <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-xs text-text-sub">
                                        <span className="material-symbols-outlined text-sm">keyboard</span>
                                        <span>
                                            Nhấn
                                        </span>
                                        <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-mono text-[10px] font-bold text-text-main dark:text-white shadow-sm">
                                            Enter
                                        </kbd>
                                        <span>
                                            để chuyển sang câu tiếp theo
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Nút cấu hình lại */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleBackToSettings}
                        className="text-text-sub hover:text-primary text-sm flex items-center gap-1 transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">settings</span>
                        Cấu hình lại
                    </button>
                </div>
            </div>

            {/* CSS animation + fullscreen background fix */}
            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
                @keyframes bounce-in {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-bounce-in {
                    animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .font-kaiti {
                    font-family: 'KaiTi', 'STKaiti', 'Noto Serif SC', serif;
                }

                :fullscreen {
                    background-color: #f8fafc !important;
                    width: 100vw;
                    height: 100vh;
                    overflow-y: auto;
                }
                :fullscreen main {
                    background-color: #f8fafc !important;
                    min-height: 100vh;
                }
                @media (prefers-color-scheme: dark) {
                    :fullscreen {
                        background-color: #0f172a !important;
                    }
                    :fullscreen main {
                        background-color: #0f172a !important;
                    }
                }
                .dark :fullscreen {
                    background-color: #0f172a !important;
                }
                .dark :fullscreen main {
                    background-color: #0f172a !important;
                }
                :-webkit-full-screen {
                    background-color: #f8fafc !important;
                    width: 100vw;
                    height: 100vh;
                }
                :-webkit-full-screen main {
                    background-color: #f8fafc !important;
                    min-height: 100vh;
                }
                .dark :-webkit-full-screen {
                    background-color: #0f172a !important;
                }
                .dark :-webkit-full-screen main {
                    background-color: #0f172a !important;
                }
            `}</style>
        </main>
    );
}