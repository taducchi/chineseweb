// components/learn/MatchingGame.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_WORDS_PER_ROUND = 4;
const DEFAULT_ROUNDS = 3;

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
        playTone(880, 0.15, 'sine', 0.15);
        playTone(1174.66, 0.2, 'sine', 0.12, 0.08);
    };

    const playWrong = () => {
        playTone(200, 0.2, 'sawtooth', 0.1);
        playTone(150, 0.25, 'sawtooth', 0.08, 0.1);
    };

    const playRoundComplete = () => {
        playTone(523.25, 0.15, 'triangle', 0.15, 0);
        playTone(659.25, 0.15, 'triangle', 0.15, 0.12);
        playTone(783.99, 0.3, 'triangle', 0.18, 0.24);
    };

    const playVictory = () => {
        playTone(523.25, 0.15, 'triangle', 0.15, 0);
        playTone(659.25, 0.15, 'triangle', 0.15, 0.12);
        playTone(783.99, 0.15, 'triangle', 0.15, 0.24);
        playTone(1046.50, 0.2, 'triangle', 0.18, 0.36);
        playTone(1318.51, 0.5, 'triangle', 0.2, 0.52);
    };

    const playStart = () => {
        playTone(400, 0.1, 'sine', 0.1);
        playTone(600, 0.15, 'sine', 0.12, 0.08);
    };

    return { playClick, playCorrect, playWrong, playRoundComplete, playVictory, playStart };
};

export default function MatchingGame({ data, course_slug, module_slug, lesson_slug, item_slug }) {
    const router = useRouter();
    const { API_URL } = useAuth();
    const sounds = useSoundEffects();
    const containerRef = useRef(null);

    const [allCards, setAllCards] = useState([]);
    const [rounds, setRounds] = useState([]);
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    
    const [leftItems, setLeftItems] = useState([]);
    const [rightItems, setRightItems] = useState([]);
    
    const [selectedLeft, setSelectedLeft] = useState(null);
    const [selectedRight, setSelectedRight] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [wrongPair, setWrongPair] = useState(null);
    
    const [timer, setTimer] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);
    const [streak, setStreak] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

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
    });

    const [config, setConfig] = useState({
        wordsPerRound: DEFAULT_WORDS_PER_ROUND,
        totalRounds: DEFAULT_ROUNDS,
    });

    // Refs để theo dõi trong suốt game
    const maxStreakRef = useRef(0);
    const totalMistakesRef = useRef(0);

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

    // Lắng nghe sự kiện thay đổi fullscreen
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

    // Cập nhật maxStreak mỗi khi streak thay đổi
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

    // Tính điểm XP
    const calculateXP = (totalWords, maxStreak, mistakes, timeInSeconds) => {
        // Điểm cơ bản: 10 XP cho mỗi từ ghép đúng
        const baseXP = totalWords * 10;

        // Bonus streak: 5 XP cho mỗi streak đạt được (tối đa 50 XP)
        const streakBonus = Math.min(maxStreak * 5, 50);

        // Bonus thời gian: Nếu hoàn thành nhanh (dưới 2 phút cho mỗi round) thì có bonus
        // Công thức: 30 XP nếu thời gian <= 60s, giảm dần
        const avgTimePerWord = timeInSeconds / totalWords;
        const timeBonus = avgTimePerWord <= 5 ? 30 : avgTimePerWord <= 8 ? 20 : avgTimePerWord <= 12 ? 10 : 0;

        // Bonus chính xác: Nếu không có lỗi nào
        const accuracyBonus = mistakes === 0 ? 20 : 0;

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

        const shuffledWords = [...allCards].sort(() => Math.random() - 0.5);
        const maxWords = config.wordsPerRound * config.totalRounds;
        const wordsToUse = shuffledWords.slice(0, Math.min(maxWords, shuffledWords.length));

        const newRounds = [];
        for (let i = 0; i < wordsToUse.length; i += config.wordsPerRound) {
            newRounds.push(wordsToUse.slice(i, i + config.wordsPerRound));
        }

        setRounds(newRounds);
        setCurrentRoundIndex(0);
        setupRound(newRounds[0]);
        setTimer(0);
        setStreak(0);
        setIsPlaying(true);
        setIsGameFinished(false);
        maxStreakRef.current = 0;
        totalMistakesRef.current = 0;

        setTimeout(() => {
            enterFullscreen();
        }, 100);
    };

    const setupRound = (roundWords) => {
        const shuffledLeft = [...roundWords].sort(() => Math.random() - 0.5);
        const shuffledRight = [...roundWords].sort(() => Math.random() - 0.5);
        
        setLeftItems(shuffledLeft);
        setRightItems(shuffledRight);
        setMatchedPairs([]);
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongPair(null);
    };

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

    const handleSelectLeft = (item) => {
        if (matchedPairs.includes(item.id) || wrongPair || isGameFinished) return;
        playSound(sounds.playClick);
        setSelectedLeft(item);
        checkMatch(item, selectedRight);
    };

    const handleSelectRight = (item) => {
        if (matchedPairs.includes(item.id) || wrongPair || isGameFinished) return;
        playSound(sounds.playClick);
        setSelectedRight(item);
        checkMatch(selectedLeft, item);
    };

    const checkMatch = (left, right) => {
        if (!left || !right) return;

        if (left.id === right.id) {
            playSound(sounds.playCorrect);
            const newMatched = [...matchedPairs, left.id];
            setMatchedPairs(newMatched);
            setStreak(prev => prev + 1);
            setSelectedLeft(null);
            setSelectedRight(null);
            
            if (newMatched.length === leftItems.length) {
                if (currentRoundIndex + 1 >= rounds.length) {
                    // Hoàn thành toàn bộ - hiển thị kết quả
                    setTimeout(() => {
                        playSound(sounds.playVictory);
                    }, 300);
                    
                    // Tính toán XP sau khi hoàn thành
                    const totalWordsPlayed = rounds.reduce((sum, r) => sum + r.length, 0);
                    const stats = calculateXP(
                        totalWordsPlayed,
                        maxStreakRef.current,
                        totalMistakesRef.current,
                        timer
                    );
                    
                    setTimeout(() => {
                        setGameStats(stats);
                        setIsGameFinished(true);
                        setIsPlaying(false);
                        // Thoát fullscreen để hiển thị modal đẹp hơn
                        exitFullscreen();
                    }, 1000);
                } else {
                    setTimeout(() => {
                        playSound(sounds.playRoundComplete);
                    }, 300);
                }
            }
        } else {
            playSound(sounds.playWrong);
            setWrongPair({ leftId: left.id, rightId: right.id });
            setStreak(0);
            totalMistakesRef.current += 1;
            setTimeout(() => {
                setWrongPair(null);
                setSelectedLeft(null);
                setSelectedRight(null);
            }, 800);
        }
    };

    const handleNextRound = () => {
        const nextIndex = currentRoundIndex + 1;
        if (nextIndex < rounds.length) {
            setCurrentRoundIndex(nextIndex);
            setupRound(rounds[nextIndex]);
        }
    };

    // Quay về màn hình cấu hình + thoát fullscreen
    const handleBackToSettings = () => {
        exitFullscreen();
        setIsPlaying(false);
        setIsGameFinished(false);
        setRounds([]);
        setLeftItems([]);
        setRightItems([]);
        setMatchedPairs([]);
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongPair(null);
        setTimer(0);
        setStreak(0);
        maxStreakRef.current = 0;
        totalMistakesRef.current = 0;
    };

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
        return (
            <main className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark overflow-y-auto">
                <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 max-w-2xl mx-auto w-full">
                    
                    <div className="w-full bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sm:p-8 animate-bounce-in">
                        {/* Header chúc mừng */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                                <span className="material-symbols-outlined text-white text-5xl">emoji_events</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-white mb-2">
                                Hoàn thành xuất sắc!
                            </h1>
                            <p className="text-text-sub text-sm sm:text-base">
                                Bạn đã hoàn thành trò chơi ghép thẻ từ vựng
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
                                XP
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
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700">
                                <span className="material-symbols-outlined text-primary text-2xl mb-1">timer</span>
                                <p className="text-xs text-text-sub mb-1">Thời gian</p>
                                <p className="font-bold text-text-main dark:text-white">{formatTime(gameStats.totalTime)}</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700">
                                <span className="material-symbols-outlined text-red-500 text-2xl mb-1">close</span>
                                <p className="text-xs text-text-sub mb-1">Lỗi</p>
                                <p className="font-bold text-text-main dark:text-white">{gameStats.totalMistakes}</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700">
                                <span className="material-symbols-outlined text-orange-500 text-2xl mb-1">whatshot</span>
                                <p className="text-xs text-text-sub mb-1">Streak max</p>
                                <p className="font-bold text-text-main dark:text-white">{gameStats.maxStreak}</p>
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
        const maxPossibleRounds = Math.ceil(allCards.length / config.wordsPerRound);

        return (
            <main className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark overflow-y-auto">
                <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 max-w-2xl mx-auto w-full">
                    
                    <div className="w-full bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-primary text-4xl">extension</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-white mb-2">
                                Ghép thẻ từ vựng
                            </h1>
                            <p className="text-text-sub text-sm sm:text-base">
                                Bài học có <span className="font-bold text-primary">{allCards.length}</span> từ vựng. Hãy cấu hình trò chơi của bạn!
                            </p>
                        </div>

                        {/* Cấu hình số từ mỗi round */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-text-main dark:text-white mb-3">
                                Số từ mỗi round
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[4, 5, 6, 8].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setConfig(prev => ({ ...prev, wordsPerRound: num }))}
                                        className={`
                                            py-3 rounded-xl font-bold text-sm sm:text-base transition-all border-2
                                            ${config.wordsPerRound === num
                                                ? 'bg-primary text-white border-primary shadow-lg scale-105'
                                                : 'bg-slate-50 dark:bg-slate-800 text-text-main dark:text-white border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                            }
                                        `}
                                    >
                                        {num} từ
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cấu hình số round */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-text-main dark:text-white mb-3">
                                Số round muốn chơi
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[1, 2, 3, 'all'].map((num) => {
                                    const isAll = num === 'all';
                                    const displayValue = isAll ? 'Tất cả' : `${num} round`;
                                    const roundsValue = isAll ? maxPossibleRounds : num;
                                    const isSelected = isAll 
                                        ? config.totalRounds >= maxPossibleRounds 
                                        : config.totalRounds === num;
                                    
                                    return (
                                        <button
                                            key={num}
                                            onClick={() => setConfig(prev => ({ ...prev, totalRounds: roundsValue }))}
                                            className={`
                                                py-3 rounded-xl font-bold text-sm sm:text-base transition-all border-2
                                                ${isSelected
                                                    ? 'bg-primary text-white border-primary shadow-lg scale-105'
                                                    : 'bg-slate-50 dark:bg-slate-800 text-text-main dark:text-white border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                                }
                                            `}
                                        >
                                            {displayValue}
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-xs text-text-sub mt-2">
                                Tối đa {maxPossibleRounds} round với {allCards.length} từ vựng.
                                {config.totalRounds * config.wordsPerRound > allCards.length && (
                                    <span className="text-orange-500 font-medium"> (Sẽ dùng hết {allCards.length} từ)</span>
                                )}
                            </p>
                        </div>

                        {/* Toggle âm thanh */}
                        <div className="mb-6 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-2xl">
                                    {soundEnabled ? 'volume_up' : 'volume_off'}
                                </span>
                                <div>
                                    <p className="font-bold text-text-main dark:text-white text-sm">Âm thanh trò chơi</p>
                                    <p className="text-xs text-text-sub">Bật/tắt hiệu ứng âm thanh</p>
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
                                <span className="text-text-sub">Tổng số từ sẽ chơi:</span>
                                <span className="font-bold text-primary text-lg">
                                    {Math.min(config.wordsPerRound * config.totalRounds, allCards.length)} từ
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm mt-2">
                                <span className="text-text-sub">Số round thực tế:</span>
                                <span className="font-bold text-primary text-lg">
                                    {Math.ceil(Math.min(config.wordsPerRound * config.totalRounds, allCards.length) / config.wordsPerRound)} round
                                </span>
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
                            href={`/learn/courses/${course_slug}/${module_slug}/vocabulary/${lesson_slug}`}
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
    const isRoundCompleted = matchedPairs.length === leftItems.length && leftItems.length > 0;
    const isAllCompleted = isRoundCompleted && currentRoundIndex + 1 >= rounds.length;
    
    const totalMatched = (currentRoundIndex * config.wordsPerRound) + matchedPairs.length;
    const totalWordsToPlay = Math.min(config.wordsPerRound * config.totalRounds, allCards.length);

    return (
        <main 
            ref={containerRef}
            className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark"
            style={{ backgroundColor: 'var(--background-light, #f8fafc)' }}
        >
            <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
                
                {/* Header: Progress, Timer & End Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
                    <div className="flex-1 w-full">
                        <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                            <span className="text-text-sub font-medium">
                                Tiến độ: {totalMatched}/{totalWordsToPlay} từ
                            </span>
                            <span className="text-text-main font-bold">
                                Round {currentRoundIndex + 1}/{rounds.length}
                            </span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(totalMatched / totalWordsToPlay) * 100}%` }}
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
                <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 flex-1">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-center font-bold text-text-sub uppercase tracking-wider text-xs sm:text-sm mb-2">Pinyin / Chữ Hán</h3>
                        {leftItems.map((item) => {
                            const isMatched = matchedPairs.includes(item.id);
                            const isSelected = selectedLeft?.id === item.id;
                            const isWrong = wrongPair?.leftId === item.id;

                            return (
                                <button
                                    key={`left-${item.id}`}
                                    onClick={() => handleSelectLeft(item)}
                                    disabled={isMatched}
                                    className={`
                                        relative flex items-center justify-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 min-h-[70px] sm:min-h-[90px]
                                        ${isMatched 
                                            ? 'opacity-0 scale-95 pointer-events-none' 
                                            : isWrong
                                                ? 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/30 dark:border-red-500 dark:text-red-400 animate-shake'
                                                : isSelected
                                                    ? 'bg-primary/10 border-primary text-primary shadow-lg scale-[1.02]'
                                                    : 'bg-white dark:bg-[#1a2632] border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md'
                                        }
                                    `}
                                >
                                    <span className="font-kaiti text-xl sm:text-2xl md:text-3xl font-bold text-center">
                                        {item.chinese}
                                    </span>
                                    <span className="absolute bottom-1 right-2 text-[10px] sm:text-xs text-text-sub/60 font-mono">
                                        {item.pinyin}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-center font-bold text-text-sub uppercase tracking-wider text-xs sm:text-sm mb-2">Nghĩa tiếng Việt</h3>
                        {rightItems.map((item) => {
                            const isMatched = matchedPairs.includes(item.id);
                            const isSelected = selectedRight?.id === item.id;
                            const isWrong = wrongPair?.rightId === item.id;

                            return (
                                <button
                                    key={`right-${item.id}`}
                                    onClick={() => handleSelectRight(item)}
                                    disabled={isMatched}
                                    className={`
                                        relative flex items-center justify-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 min-h-[70px] sm:min-h-[90px]
                                        ${isMatched 
                                            ? 'opacity-0 scale-95 pointer-events-none' 
                                            : isWrong
                                                ? 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/30 dark:border-red-500 dark:text-red-400 animate-shake'
                                                : isSelected
                                                    ? 'bg-primary/10 border-primary text-primary shadow-lg scale-[1.02]'
                                                    : 'bg-white dark:bg-[#1a2632] border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md'
                                        }
                                    `}
                                >
                                    <span className="text-sm sm:text-base md:text-lg font-medium text-center">
                                        {item.meaning}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Thông báo hoàn thành Round */}
                {isRoundCompleted && !isAllCompleted && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-[#1a2632] rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-bounce-in">
                            <span className="material-symbols-outlined text-6xl text-emerald-500 mb-4">check_circle</span>
                            <h2 className="text-2xl font-bold mb-2">Hoàn thành Round {currentRoundIndex + 1}!</h2>
                            <p className="text-text-sub mb-6">Bạn đã ghép đúng {leftItems.length} cặp từ vựng. Sẵn sàng cho round tiếp theo chưa?</p>
                            <button
                                onClick={handleNextRound}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
                            >
                                Round tiếp theo
                            </button>
                        </div>
                    </div>
                )}

                {/* Nút quay lại cấu hình */}
                <div className="mt-6 flex justify-center gap-4">
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