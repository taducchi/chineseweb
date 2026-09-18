// components/learn/SentenceBuild.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_SENTENCES_PER_ROUND = 5;
const DEFAULT_ROUNDS = 2;

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

    const playPick = () => playTone(800, 0.06, 'sine', 0.1);

    const playDrop = () => playTone(500, 0.08, 'sine', 0.08);

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
        playTone(1046.5, 0.2, 'triangle', 0.18, 0.36);
        playTone(1318.51, 0.5, 'triangle', 0.2, 0.52);
    };

    const playStart = () => {
        playTone(400, 0.1, 'sine', 0.1);
        playTone(600, 0.15, 'sine', 0.12, 0.08);
    };

    return { playClick, playPick, playDrop, playCorrect, playWrong, playRoundComplete, playVictory, playStart };
};

// ============ HELPERS ============
const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Tách câu thành các từ/cụm từ dựa trên dữ liệu API
// Ví dụ: example_sentence = "我是学生。" và example_pinyin = "Wǒ shì xuéshēng."
// → Nếu có example_sentence_segments (mảng các từ), dùng luôn
// → Nếu không, tự động tách theo từng ký tự Trung Quốc
const splitSentence = (card) => {
    // Nếu API có sẵn segments
    if (Array.isArray(card.example_sentence_segments) && card.example_sentence_segments.length > 0) {
        return card.example_sentence_segments;
    }

    // Nếu có example_sentence, tự động tách
    const sentence = card.example_sentence || card.chinese || '';
    if (!sentence) return [];

    // Cách 1: Tách theo từng ký tự Trung Quốc (giữ dấu câu dính với ký tự cuối)
    // Ví dụ: "我是学生。" → ["我", "是", "学", "生。"]
    const chars = [];
    let current = '';
    for (let i = 0; i < sentence.length; i++) {
        const char = sentence[i];
        // Nếu là dấu câu tiếng Trung hoặc Anh → gắn vào từ trước đó
        if (/[。，！？、；：""''（）《》【】,.!?;:()\[\]{}]/.test(char)) {
            if (current) {
                current += char;
                chars.push(current);
                current = '';
            } else if (chars.length > 0) {
                chars[chars.length - 1] += char;
            }
        } else {
            if (current) chars.push(current);
            current = char;
        }
    }
    if (current) chars.push(current);

    return chars;
};

export default function SentenceBuild({ data, course_slug, module_slug, lesson_slug, item_slug }) {
    const router = useRouter();
    const { API_URL } = useAuth();
    const sounds = useSoundEffects();
    const containerRef = useRef(null);

    const [allCards, setAllCards] = useState([]);
    const [rounds, setRounds] = useState([]);
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

    // State cho câu hiện tại
    const [wordBank, setWordBank] = useState([]); // Các từ chưa dùng
    const [answerSlots, setAnswerSlots] = useState([]); // Các từ đã xếp (mảng các {id, word})
    const [correctWords, setCorrectWords] = useState([]); // Đáp án đúng

    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const [timer, setTimer] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);
    const [streak, setStreak] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

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
        sentencesPerRound: DEFAULT_SENTENCES_PER_ROUND,
        totalRounds: DEFAULT_ROUNDS,
    });

    const maxStreakRef = useRef(0);
    const totalMistakesRef = useRef(0);

    // ============ FETCH DATA ============
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

    // ============ FULLSCREEN ============
    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
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

    useEffect(() => {
        if (streak > maxStreakRef.current) maxStreakRef.current = streak;
    }, [streak]);

    const enterFullscreen = async () => {
        try {
            const element = containerRef.current || document.documentElement;
            if (element.requestFullscreen) await element.requestFullscreen();
            else if (element.webkitRequestFullscreen) await element.webkitRequestFullscreen();
            else if (element.mozRequestFullScreen) await element.mozRequestFullScreen();
            else if (element.msRequestFullscreen) await element.msRequestFullscreen();
            setIsFullscreen(true);
        } catch (err) {
            console.warn('Không thể vào fullscreen:', err);
        }
    };

    const exitFullscreen = async () => {
        try {
            if (document.exitFullscreen) await document.exitFullscreen();
            else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
            else if (document.mozCancelFullScreen) await document.mozCancelFullScreen();
            else if (document.msExitFullscreen) await document.msExitFullscreen();
            setIsFullscreen(false);
        } catch (err) {
            console.warn('Không thể thoát fullscreen:', err);
        }
    };

    const toggleFullscreen = () => isFullscreen ? exitFullscreen() : enterFullscreen();

    const playSound = (soundFn) => {
        if (soundEnabled) soundFn();
    };

    // ============ TIMER ============
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

    // ============ XP ============
    const calculateXP = (totalSentences, maxStreak, mistakes, timeInSeconds) => {
        const baseXP = totalSentences * 20;
        const streakBonus = Math.min(maxStreak * 5, 50);
        const avgTimePerSentence = timeInSeconds / totalSentences;
        const timeBonus = avgTimePerSentence <= 15 ? 30 : avgTimePerSentence <= 25 ? 20 : avgTimePerSentence <= 40 ? 10 : 0;
        const accuracyBonus = mistakes === 0 ? 30 : 0;
        const totalXP = baseXP + streakBonus + timeBonus + accuracyBonus;
        return { totalXP, baseXP, streakBonus, timeBonus, accuracyBonus, maxStreak, totalMistakes: mistakes, totalTime: timeInSeconds };
    };

    // ============ CHUẨN BỊ CÂU ============
    const prepareSentenceFromCard = (card) => {
        const segments = splitSentence(card);
        if (segments.length < 2) return null; // Bỏ qua câu quá ngắn

        // Tạo ID duy nhất cho mỗi từ
        const wordsWithId = segments.map((word, idx) => ({
            id: `${card.id}-${idx}-${word}`,
            word,
            correctIndex: idx,
        }));

        return {
            card,
            segments: wordsWithId,
            correctAnswer: segments,
            pinyin: card.example_pinyin || card.pinyin || '',
            translation: card.example_translation || card.meaning || '',
        };
    };

    const setupSentence = (sentenceObj) => {
        // Trộn vị trí các từ trong word bank
        const shuffled = shuffleArray(sentenceObj.segments);
        setWordBank(shuffled);
        setAnswerSlots([]);
        setCorrectWords(sentenceObj.correctAnswer);
        setAnswered(false);
        setIsCorrect(false);
        setShowHint(false);
    };

    // ============ START GAME ============
    const startGame = () => {
        if (allCards.length === 0) return;

        playSound(sounds.playStart);

        // Lọc các card có câu đủ dài để chơi
        const validCards = allCards.filter(card => {
            const segs = splitSentence(card);
            return segs.length >= 2;
        });

        if (validCards.length === 0) {
            setError('Bài học không có câu ví dụ đủ dài để luyện tập.');
            return;
        }

        const shuffled = shuffleArray(validCards);
        const maxSentences = config.sentencesPerRound * config.totalRounds;
        const cardsToUse = shuffled.slice(0, Math.min(maxSentences, shuffled.length));

        // Chuyển thành câu hỏi
        const sentences = cardsToUse.map(prepareSentenceFromCard).filter(Boolean);

        // Chia thành các round
        const newRounds = [];
        for (let i = 0; i < sentences.length; i += config.sentencesPerRound) {
            newRounds.push(sentences.slice(i, i + config.sentencesPerRound));
        }

        if (newRounds.length === 0) {
            setError('Không thể tạo câu hỏi từ dữ liệu bài học.');
            return;
        }

        setRounds(newRounds);
        setCurrentRoundIndex(0);
        setCurrentSentenceIndex(0);
        setupSentence(newRounds[0][0]);
        setTimer(0);
        setStreak(0);
        setIsPlaying(true);
        setIsGameFinished(false);
        maxStreakRef.current = 0;
        totalMistakesRef.current = 0;

        setTimeout(() => enterFullscreen(), 100);
    };

    // ============ HANDLERS ============
    const handlePickWord = (wordObj) => {
        if (answered) return;
        playSound(sounds.playPick);
        setWordBank(prev => prev.filter(w => w.id !== wordObj.id));
        setAnswerSlots(prev => [...prev, wordObj]);
    };

    const handleRemoveWord = (wordObj, index) => {
        if (answered) return;
        playSound(sounds.playDrop);
        setAnswerSlots(prev => prev.filter((_, i) => i !== index));
        setWordBank(prev => [...prev, wordObj]);
    };

    const handleClearAll = () => {
        if (answered) return;
        playSound(sounds.playClick);
        setWordBank(prev => [...prev, ...answerSlots]);
        setAnswerSlots([]);
    };

    const handleHint = () => {
        if (answered || showHint) return;
        playSound(sounds.playClick);
        setShowHint(true);
    };

    const handleSubmit = () => {
        if (answered) return;

        if (answerSlots.length !== correctWords.length) {
            playSound(sounds.playWrong);
            return;
        }

        const userAnswer = answerSlots.map(w => w.word);
        const isAllCorrect = userAnswer.every((word, idx) => word === correctWords[idx]);

        setAnswered(true);
        setIsCorrect(isAllCorrect);

        if (isAllCorrect) {
            playSound(sounds.playCorrect);
            setStreak(prev => prev + 1);
        } else {
            playSound(sounds.playWrong);
            setStreak(0);
            totalMistakesRef.current += 1;
        }
    };

    const handleNext = () => {
        const currentRound = rounds[currentRoundIndex];
        const isLastSentenceOfRound = currentSentenceIndex + 1 >= currentRound.length;
        const isLastRound = currentRoundIndex + 1 >= rounds.length;

        if (isLastSentenceOfRound && isLastRound) {
            // Kết thúc game
            playSound(sounds.playVictory);
            const totalSentences = rounds.reduce((sum, r) => sum + r.length, 0);
            const stats = calculateXP(totalSentences, maxStreakRef.current, totalMistakesRef.current, timer);
            setTimeout(() => {
                setGameStats(stats);
                setIsGameFinished(true);
                setIsPlaying(false);
                exitFullscreen();
            }, 500);
            return;
        }

        if (isLastSentenceOfRound) {
            // Hết round → chuyển sang round tiếp theo
            playSound(sounds.playRoundComplete);
            const nextRoundIdx = currentRoundIndex + 1;
            setCurrentRoundIndex(nextRoundIdx);
            setCurrentSentenceIndex(0);
            setupSentence(rounds[nextRoundIdx][0]);
        } else {
            // Câu tiếp theo trong cùng round
            const nextSentenceIdx = currentSentenceIndex + 1;
            setCurrentSentenceIndex(nextSentenceIdx);
            setupSentence(currentRound[nextSentenceIdx]);
        }
    };

    const handleBackToSettings = () => {
        exitFullscreen();
        setIsPlaying(false);
        setIsGameFinished(false);
        setRounds([]);
        setCurrentRoundIndex(0);
        setCurrentSentenceIndex(0);
        setWordBank([]);
        setAnswerSlots([]);
        setCorrectWords([]);
        setAnswered(false);
        setIsCorrect(false);
        setShowHint(false);
        setTimer(0);
        setStreak(0);
        maxStreakRef.current = 0;
        totalMistakesRef.current = 0;
    };

    // ============ RENDER ============
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
        const totalSentences = rounds.reduce((sum, r) => sum + r.length, 0);
        const correctSentences = totalSentences - gameStats.totalMistakes;
        const accuracy = totalSentences > 0 ? Math.round((correctSentences / totalSentences) * 100) : 0;

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
                                Bạn đã hoàn thành trò chơi sắp xếp câu
                            </p>
                        </div>

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
        // Đếm số câu hợp lệ có thể chơi
        const validSentences = allCards.filter(card => splitSentence(card).length >= 2).length;
        const maxPossibleRounds = Math.ceil(validSentences / config.sentencesPerRound);

        return (
            <main className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark overflow-y-auto">
                <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 max-w-2xl mx-auto w-full">
                    <div className="w-full bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-primary text-4xl">sort</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-white mb-2">
                                Sắp xếp câu
                            </h1>
                            <p className="text-text-sub text-sm sm:text-base">
                                Sắp xếp các từ/cụm từ thành câu hoàn chỉnh. Có <span className="font-bold text-primary">{validSentences}</span> câu có thể luyện tập.
                            </p>
                        </div>

                        {/* Số câu mỗi round */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-text-main dark:text-white mb-3">
                                Số câu mỗi round
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[3, 5, 8, 10].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setConfig(prev => ({ ...prev, sentencesPerRound: num }))}
                                        className={`
                                            py-3 rounded-xl font-bold text-sm sm:text-base transition-all border-2
                                            ${config.sentencesPerRound === num
                                                ? 'bg-primary text-white border-primary shadow-lg scale-105'
                                                : 'bg-slate-50 dark:bg-slate-800 text-text-main dark:text-white border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                            }
                                        `}
                                    >
                                        {num} câu
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Số round */}
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
                                Tối đa {maxPossibleRounds} round với {validSentences} câu.
                                {config.totalRounds * config.sentencesPerRound > validSentences && (
                                    <span className="text-orange-500 font-medium"> (Sẽ dùng hết {validSentences} câu)</span>
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
                                <span className="text-text-sub">Tổng số câu sẽ chơi:</span>
                                <span className="font-bold text-primary text-lg">
                                    {Math.min(config.sentencesPerRound * config.totalRounds, validSentences)} câu
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm mt-2">
                                <span className="text-text-sub">Số round thực tế:</span>
                                <span className="font-bold text-primary text-lg">
                                    {Math.ceil(Math.min(config.sentencesPerRound * config.totalRounds, validSentences) / config.sentencesPerRound)} round
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={startGame}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 text-lg mb-4"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">play_arrow</span>
                                Bắt đầu chơi
                            </span>
                        </button>

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

    // ============ MÀN HÌNH CHƠI GAME ============
    const currentRound = rounds[currentRoundIndex];
    const currentSentence = currentRound?.[currentSentenceIndex];
    const totalSentencesInRound = currentRound?.length || 0;
    const totalSentencesAll = rounds.reduce((sum, r) => sum + r.length, 0);
    const totalDone = rounds.slice(0, currentRoundIndex).reduce((sum, r) => sum + r.length, 0) + currentSentenceIndex;

    return (
        <main
            ref={containerRef}
            className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark overflow-y-auto"
            style={{ backgroundColor: 'var(--background-light, #f8fafc)' }}
        >
            <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
                    <div className="flex-1 w-full">
                        <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                            <span className="text-text-sub font-medium">
                                Câu {totalDone + 1}/{totalSentencesAll}
                            </span>
                            <span className="text-text-main font-bold">
                                Round {currentRoundIndex + 1}/{rounds.length}
                            </span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${((totalDone + (answered ? 1 : 0)) / totalSentencesAll) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
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
                            onClick={toggleFullscreen}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
                        >
                            <span className="material-symbols-outlined text-text-sub text-base sm:text-lg">
                                {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
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
                <div className="flex-1 flex flex-col gap-5">

                    {/* Hướng dẫn + Gợi ý */}
                    <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs text-text-sub uppercase tracking-wider font-bold">
                                Sắp xếp các từ thành câu hoàn chỉnh
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleHint}
                                    disabled={answered || showHint}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1
                                        ${showHint || answered
                                            ? 'bg-slate-100 dark:bg-slate-800 text-text-sub/40 cursor-not-allowed'
                                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-sm">lightbulb</span>
                                    Gợi ý
                                </button>
                                <button
                                    onClick={handleClearAll}
                                    disabled={answered || answerSlots.length === 0}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1
                                        ${answered || answerSlots.length === 0
                                            ? 'bg-slate-100 dark:bg-slate-800 text-text-sub/40 cursor-not-allowed'
                                            : 'bg-slate-100 dark:bg-slate-800 text-text-sub hover:bg-slate-200 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                    Xóa hết
                                </button>
                            </div>
                        </div>

                        {/* Vùng câu trả lời */}
                        <div className={`
                            min-h-[100px] sm:min-h-[120px] rounded-xl border-2 border-dashed p-3 sm:p-4 transition-all
                            ${answered
                                ? isCorrect
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                : answerSlots.length === 0
                                    ? 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50'
                                    : 'border-primary/50 bg-primary/5'
                            }
                        `}>
                            {answerSlots.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-text-sub/50 text-sm italic py-6">
                                    Nhấn vào từ bên dưới để xếp vào đây...
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2 items-center justify-center">
                                    {answerSlots.map((wordObj, idx) => (
                                        <button
                                            key={`ans-${wordObj.id}-${idx}`}
                                            onClick={() => handleRemoveWord(wordObj, idx)}
                                            disabled={answered}
                                            className={`
                                                px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border-2 font-kaiti text-xl sm:text-2xl font-bold transition-all
                                                ${answered
                                                    ? 'cursor-default'
                                                    : 'hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer'
                                                }
                                                ${answered
                                                    ? isCorrect
                                                        ? 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                                                        : 'bg-red-100 dark:bg-red-900/40 border-red-500 text-red-700 dark:text-red-300'
                                                    : 'bg-white dark:bg-[#1a2632] border-primary text-primary shadow-sm'
                                                }
                                            `}
                                        >
                                            {wordObj.word}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Gợi ý */}
                        {showHint && !answered && (
                            <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-center">
                                <p className="text-xs text-amber-700 dark:text-amber-400 mb-1">Từ đầu tiên là:</p>
                                <p className="font-kaiti text-xl text-amber-800 dark:text-amber-300 font-bold">
                                    {correctWords[0]}
                                </p>
                            </div>
                        )}

                        {/* Kết quả */}
                        {answered && (
                            <div className={`mt-3 rounded-lg p-3 text-center border
                                ${isCorrect
                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700'
                                    : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                                }`}>
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <span className={`material-symbols-outlined text-2xl ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {isCorrect ? 'check_circle' : 'cancel'}
                                    </span>
                                    <span className={`text-lg font-bold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {isCorrect ? 'Chính xác!' : 'Chưa đúng!'}
                                    </span>
                                </div>
                                {!isCorrect && (
                                    <p className="text-sm text-text-sub mt-1">
                                        Đáp án đúng: <span className="font-kaiti font-bold text-text-main dark:text-white text-base">
                                            {correctWords.join(' ')}
                                        </span>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Word bank */}
                    <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-text-sub uppercase tracking-wider">
                                Các từ có sẵn
                            </h3>
                            <span className="text-xs text-text-sub">
                                {wordBank.length} từ còn lại
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center min-h-[60px]">
                            {wordBank.length === 0 ? (
                                <p className="text-sm text-text-sub/60 italic py-4">
                                    Đã dùng hết từ. Nhấn "Kiểm tra đáp án" để xem kết quả!
                                </p>
                            ) : (
                                wordBank.map((wordObj) => (
                                    <button
                                        key={`bank-${wordObj.id}`}
                                        onClick={() => handlePickWord(wordObj)}
                                        disabled={answered}
                                        className={`
                                            px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border-2 font-kaiti text-xl sm:text-2xl font-bold transition-all
                                            ${answered
                                                ? 'bg-slate-100 dark:bg-slate-800 text-text-sub/50 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                                                : 'bg-white dark:bg-[#1a2632] border-slate-200 dark:border-slate-700 text-text-main dark:text-white hover:border-primary hover:text-primary hover:shadow-md hover:-translate-y-0.5 cursor-pointer active:scale-95'
                                            }
                                        `}
                                    >
                                        {wordObj.word}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Pinyin & Translation (ẩn cho đến khi trả lời) */}
                    {currentSentence && (
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 text-center">
                            {answered ? (
                                <>
                                    {currentSentence.pinyin && (
                                        <p className="text-sm text-primary font-medium mb-1">{currentSentence.pinyin}</p>
                                    )}
                                    {currentSentence.translation && (
                                        <p className="text-sm text-text-sub italic">{currentSentence.translation}</p>
                                    )}
                                </>
                            ) : (
                                <p className="text-xs text-text-sub/60 italic">
                                    💡 Pinyin và nghĩa sẽ hiện sau khi bạn kiểm tra đáp án
                                </p>
                            )}
                        </div>
                    )}

                    {/* Nút kiểm tra / tiếp theo */}
                    <div className="flex flex-col gap-3">
                        {!answered ? (
                            <button
                                onClick={handleSubmit}
                                disabled={answerSlots.length !== correctWords.length}
                                className={`
                                    w-full font-bold py-4 rounded-2xl transition-all text-lg
                                    ${answerSlots.length === correctWords.length
                                        ? 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95'
                                        : 'bg-slate-200 dark:bg-slate-700 text-text-sub cursor-not-allowed'
                                    }
                                `}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">check</span>
                                    Kiểm tra đáp án
                                </span>
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 text-lg"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {(() => {
                                        const isLastSentenceOfRound = currentSentenceIndex + 1 >= totalSentencesInRound;
                                        const isLastRound = currentRoundIndex + 1 >= rounds.length;
                                        if (isLastSentenceOfRound && isLastRound) {
                                            return (
                                                <>
                                                    <span className="material-symbols-outlined">emoji_events</span>
                                                    Xem kết quả
                                                </>
                                            );
                                        }
                                        if (isLastSentenceOfRound) {
                                            return (
                                                <>
                                                    Round tiếp theo
                                                    <span className="material-symbols-outlined">arrow_forward</span>
                                                </>
                                            );
                                        }
                                        return (
                                            <>
                                                Câu tiếp theo
                                                <span className="material-symbols-outlined">arrow_forward</span>
                                            </>
                                        );
                                    })()}
                                </span>
                            </button>
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
                .font-kaiti {
                    font-family: 'KaiTi', 'STKaiti', 'Noto Serif SC', 'Songti SC', serif;
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
                    :fullscreen { background-color: #0f172a !important; }
                    :fullscreen main { background-color: #0f172a !important; }
                }
                .dark :fullscreen { background-color: #0f172a !important; }
                .dark :fullscreen main { background-color: #0f172a !important; }
                :-webkit-full-screen {
                    background-color: #f8fafc !important;
                    width: 100vw;
                    height: 100vh;
                }
                :-webkit-full-screen main {
                    background-color: #f8fafc !important;
                    min-height: 100vh;
                }
                .dark :-webkit-full-screen { background-color: #0f172a !important; }
                .dark :-webkit-full-screen main { background-color: #0f172a !important; }
            `}</style>
        </main>
    );
}