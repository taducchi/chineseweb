// components/learn/GapFilling.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_SENTENCES = 8;

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

    return { playClick, playPick, playDrop, playCorrect, playCorrectStreak, playWrong, playStart, playVictory };
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

// Tách câu ví dụ thành các phần, chỗ trống được đánh dấu bằng ___
// Ví dụ: "我___学生，他___老师。" -> ["我", "___", "学生，他", "___", "老师。"]
const parseSentenceWithBlanks = (sentence, answers) => {
    // Nếu câu có sẵn dấu ___ thì dùng luôn
    if (sentence.includes('___')) {
        const parts = sentence.split(/(___)/g);
        return parts.map(part => ({
            text: part,
            isBlank: part === '___'
        }));
    }
    
    // Nếu không có ___, tự động tạo blank ở vị trí của từng đáp án
    let parts = [];
    let remaining = sentence;
    
    answers.forEach((answer, idx) => {
        const pos = remaining.indexOf(answer);
        if (pos !== -1) {
            if (pos > 0) {
                parts.push({ text: remaining.substring(0, pos), isBlank: false });
            }
            parts.push({ text: answer, isBlank: true, correctAnswer: answer });
            remaining = remaining.substring(pos + answer.length);
        }
    });
    
    if (remaining) {
        parts.push({ text: remaining, isBlank: false });
    }
    
    return parts;
};

export default function GapFilling({ data, course_slug, module_slug, lesson_slug, item_slug }) {
    const router = useRouter();
    const { API_URL } = useAuth();
    const sounds = useSoundEffects();
    const containerRef = useRef(null);

    const [allCards, setAllCards] = useState([]);
    const [gameSentences, setGameSentences] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // State cho drag & drop
    const [wordBank, setWordBank] = useState([]); // Các từ có thể kéo
    const [usedWords, setUsedWords] = useState([]); // Các từ đã dùng
    const [filledBlanks, setFilledBlanks] = useState({}); // { blankIndex: { word, id } }
    const [selectedWord, setSelectedWord] = useState(null); // Từ đang được chọn (cho click mode)
    const [draggedWord, setDraggedWord] = useState(null);
    const [dragOverBlank, setDragOverBlank] = useState(null);

    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

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
        correctCount: 0,
        wrongCount: 0,
    });

    const [config, setConfig] = useState({
        sentencesPerGame: DEFAULT_SENTENCES,
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

    const toggleFullscreen = () => {
        if (isFullscreen) {
            exitFullscreen();
        } else {
            enterFullscreen();
        }
    };

    const playSound = (soundFn) => {
        if (soundEnabled) soundFn();
    };

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

    // Tính điểm XP
    const calculateXP = (totalSentences, maxStreak, mistakes, timeInSeconds) => {
        const baseXP = totalSentences * 20; // 20 XP/câu (khó hơn)
        const streakBonus = Math.min(maxStreak * 5, 50);
        const avgTimePerSentence = timeInSeconds / totalSentences;
        const timeBonus = avgTimePerSentence <= 15 ? 30 : avgTimePerSentence <= 25 ? 20 : avgTimePerSentence <= 40 ? 10 : 0;
        const accuracyBonus = mistakes === 0 ? 40 : 0;
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

    // Chuẩn bị câu hỏi từ dữ liệu
    const prepareSentence = (card) => {
        // Nếu có example_sentence, tách thành các phần
        const sentence = card.example_sentence || card.chinese;
        const answer = card.chinese;
        
        // Parse câu thành các phần với blank
        const parts = parseSentenceWithBlanks(sentence, [answer]);
        
        return {
            card,
            sentence,
            parts,
            answer,
            pinyin: card.example_pinyin || card.pinyin,
            translation: card.example_translation || card.meaning,
        };
    };

    const startGame = () => {
        if (allCards.length === 0) return;

        playSound(sounds.playStart);

        // Lọc các từ có example_sentence
        const validCards = allCards.filter(c => c.chinese);
        
        if (validCards.length === 0) {
            setError('Bài học không có từ vựng để tạo câu hỏi.');
            return;
        }

        const shuffled = shuffleArray(validCards);
        const cardsToUse = shuffled.slice(0, Math.min(config.sentencesPerGame, shuffled.length));
        
        const sentences = cardsToUse.map(card => prepareSentence(card));

        setGameSentences(sentences);
        setCurrentIndex(0);
        setupSentence(sentences[0]);
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

    const setupSentence = (sentenceObj) => {
        const blanksCount = sentenceObj.parts.filter(p => p.isBlank).length;
        
        // Tạo word bank: các đáp án đúng + một vài từ gây nhiễu từ allCards
        const correctAnswers = sentenceObj.parts
            .filter(p => p.isBlank)
            .map(p => p.correctAnswer || sentenceObj.answer);

        // Thêm từ gây nhiễu (distractors)
        const distractors = allCards
            .filter(c => !correctAnswers.includes(c.chinese))
            .slice(0, Math.min(3, allCards.length - correctAnswers.length))
            .map(c => c.chinese);

        const bankWords = shuffleArray([
            ...correctAnswers.map((word, idx) => ({ id: `correct-${idx}-${word}`, word, isCorrect: true })),
            ...distractors.map((word, idx) => ({ id: `distract-${idx}-${word}`, word, isCorrect: false })),
        ]);

        setWordBank(bankWords);
        setUsedWords([]);
        setFilledBlanks({});
        setSelectedWord(null);
        setAnswered(false);
        setIsCorrect(false);
    };

    // ============ DRAG & DROP HANDLERS ============
    const handleDragStart = (e, word) => {
        setDraggedWord(word);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', word.word);
        playSound(sounds.playPick);
    };

    const handleDragEnd = () => {
        setDraggedWord(null);
        setDragOverBlank(null);
    };

    const handleDragOver = (e, blankIndex) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverBlank(blankIndex);
    };

    const handleDragLeave = () => {
        setDragOverBlank(null);
    };

    const handleDrop = (e, blankIndex) => {
        e.preventDefault();
        setDragOverBlank(null);
        
        if (!draggedWord) return;
        if (answered) return;

        playSound(sounds.playDrop);

        // Nếu blank đã có từ, trả từ cũ về bank
        const oldFilled = filledBlanks[blankIndex];
        if (oldFilled) {
            setWordBank(prev => [...prev, oldFilled.wordObj]);
            setUsedWords(prev => prev.filter(w => w.id !== oldFilled.wordObj.id));
        }

        // Đặt từ mới vào blank
        setFilledBlanks(prev => ({
            ...prev,
            [blankIndex]: { word: draggedWord.word, wordObj: draggedWord }
        }));

        // Xóa từ khỏi word bank
        setWordBank(prev => prev.filter(w => w.id !== draggedWord.id));
        setUsedWords(prev => [...prev, draggedWord]);
        setDraggedWord(null);
    };

    // ============ CLICK HANDLERS (cho mobile) ============
    const handleWordClick = (word) => {
        if (answered) return;
        playSound(sounds.playPick);
        setSelectedWord(selectedWord?.id === word.id ? null : word);
    };

    const handleBlankClick = (blankIndex) => {
        if (answered) return;

        // Nếu blank đã có từ, trả về bank
        const oldFilled = filledBlanks[blankIndex];
        if (oldFilled) {
            setWordBank(prev => [...prev, oldFilled.wordObj]);
            setUsedWords(prev => prev.filter(w => w.id !== oldFilled.wordObj.id));
            setFilledBlanks(prev => {
                const newFilled = { ...prev };
                delete newFilled[blankIndex];
                return newFilled;
            });
            playSound(sounds.playDrop);
            return;
        }

        // Nếu có từ đang chọn, đặt vào blank
        if (selectedWord) {
            setFilledBlanks(prev => ({
                ...prev,
                [blankIndex]: { word: selectedWord.word, wordObj: selectedWord }
            }));
            setWordBank(prev => prev.filter(w => w.id !== selectedWord.id));
            setUsedWords(prev => [...prev, selectedWord]);
            setSelectedWord(null);
            playSound(sounds.playDrop);
        }
    };

    const handleRemoveFromBlank = (e, blankIndex) => {
        e.stopPropagation();
        if (answered) return;
        
        const oldFilled = filledBlanks[blankIndex];
        if (oldFilled) {
            setWordBank(prev => [...prev, oldFilled.wordObj]);
            setUsedWords(prev => prev.filter(w => w.id !== oldFilled.wordObj.id));
            setFilledBlanks(prev => {
                const newFilled = { ...prev };
                delete newFilled[blankIndex];
                return newFilled;
            });
            playSound(sounds.playDrop);
        }
    };

    // ============ SUBMIT ============
    const handleSubmit = () => {
        if (answered) return;

        const currentSentence = gameSentences[currentIndex];
        const blankParts = currentSentence.parts.filter(p => p.isBlank);
        
        // Kiểm tra tất cả các blank đã được điền chưa
        const allFilled = blankParts.every((_, idx) => filledBlanks[idx]);
        if (!allFilled) {
            playSound(sounds.playWrong);
            return;
        }

        // Kiểm tra đáp án
        let allCorrect = true;
        blankParts.forEach((part, idx) => {
            const correctAnswer = part.correctAnswer || currentSentence.answer;
            const userAnswer = filledBlanks[idx]?.word;
            if (userAnswer !== correctAnswer) {
                allCorrect = false;
            }
        });

        setAnswered(true);
        setIsCorrect(allCorrect);
        playSound(sounds.playClick);

        if (allCorrect) {
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
        if (currentIndex + 1 >= gameSentences.length) {
            // Kết thúc game
            playSound(sounds.playVictory);
            const stats = calculateXP(
                gameSentences.length,
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

        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setupSentence(gameSentences[nextIndex]);
    };

    const handleBackToSettings = () => {
        exitFullscreen();
        setIsPlaying(false);
        setIsGameFinished(false);
        setGameSentences([]);
        setCurrentIndex(0);
        setWordBank([]);
        setUsedWords([]);
        setFilledBlanks({});
        setSelectedWord(null);
        setAnswered(false);
        setIsCorrect(false);
        setTimer(0);
        setStreak(0);
        maxStreakRef.current = 0;
        totalMistakesRef.current = 0;
        correctCountRef.current = 0;
        wrongCountRef.current = 0;
    };

    // Keyboard: Enter để submit hoặc next
    useEffect(() => {
        if (!isPlaying || isGameFinished) return;

        const handleGlobalKeyDown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (answered) {
                    handleNext();
                } else {
                    handleSubmit();
                }
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isPlaying, isGameFinished, answered, currentIndex, gameSentences.length, filledBlanks]);

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
                                Bạn đã hoàn thành {gameSentences.length} câu điền từ
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
        const maxSentences = allCards.length;

        return (
            <main className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark overflow-y-auto">
                <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 max-w-2xl mx-auto w-full">
                    <div className="w-full bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-primary text-4xl">edit_note</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-white mb-2">
                                Điền từ vào câu
                            </h1>
                            <p className="text-text-sub text-sm sm:text-base">
                                Kéo thả từ vựng vào ô trống trong câu ví dụ. Bài học có <span className="font-bold text-primary">{allCards.length}</span> từ.
                            </p>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-bold text-text-main dark:text-white mb-3">
                                Số câu muốn luyện tập
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[5, 8, 10, 15].map((num) => {
                                    const isDisabled = num > maxSentences;
                                    return (
                                        <button
                                            key={num}
                                            onClick={() => !isDisabled && setConfig(prev => ({ ...prev, sentencesPerGame: num }))}
                                            disabled={isDisabled}
                                            className={`
                                                py-3 rounded-xl font-bold text-sm sm:text-base transition-all border-2
                                                ${isDisabled
                                                    ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-text-sub border-slate-200 dark:border-slate-700'
                                                    : config.sentencesPerGame === num
                                                        ? 'bg-primary text-white border-primary shadow-lg scale-105'
                                                        : 'bg-slate-50 dark:bg-slate-800 text-text-main dark:text-white border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                                }
                                            `}
                                        >
                                            {num} câu
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

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

                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-sub">Số câu sẽ chơi:</span>
                                <span className="font-bold text-primary text-lg">
                                    {Math.min(config.sentencesPerGame, allCards.length)} câu
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
                                        <li>Kéo từ vựng từ ngân hàng từ vào ô trống</li>
                                        <li>Hoặc click vào từ rồi click vào ô trống (cho mobile)</li>
                                        <li>Click vào ô trống đã điền để trả từ về</li>
                                        <li>Nhấn <kbd className="px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-800 font-mono text-[10px]">Enter</kbd> để kiểm tra hoặc chuyển câu</li>
                                    </ul>
                                </div>
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

    // ============ MÀN HÌNH CHƠI GAME (FULLSCREEN) ============
    const currentSentence = gameSentences[currentIndex];
    const blankParts = currentSentence?.parts.filter(p => p.isBlank) || [];
    const totalSentences = gameSentences.length;

    // Kiểm tra tất cả blank đã được điền chưa
    const allBlanksFilled = blankParts.length > 0 && blankParts.every((_, idx) => filledBlanks[idx]);

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
                                Câu {currentIndex + 1}/{totalSentences}
                            </span>
                            <span className="text-text-main font-bold">
                                Gap Filling
                            </span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${((currentIndex + (answered ? 1 : 0)) / totalSentences) * 100}%` }}
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
                        {/* Nút Fullscreen toggle */}
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
                <div className="flex-1 flex flex-col gap-6">

                    {/* Sentence Card */}
                    <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                        <div className="text-center mb-4">
                            <p className="text-xs text-text-sub mb-2">Điền từ thích hợp vào ô trống</p>
                        </div>

                        {/* Sentence với blanks */}
                        <div className="flex flex-wrap items-center justify-center gap-1 text-2xl sm:text-3xl md:text-4xl font-kaiti leading-loose">
                            {currentSentence?.parts.map((part, idx) => {
                                if (part.isBlank) {
                                    const blankIndex = blankParts.findIndex((_, i) => {
                                        // Tìm index của blank này trong danh sách blanks
                                        const partsBefore = currentSentence.parts.slice(0, idx);
                                        return partsBefore.filter(p => p.isBlank).length === i;
                                    });
                                    
                                    // Tính đúng blank index
                                    let actualBlankIndex = 0;
                                    for (let i = 0; i < idx; i++) {
                                        if (currentSentence.parts[i].isBlank) actualBlankIndex++;
                                    }
                                    
                                    const filled = filledBlanks[actualBlankIndex];
                                    const isDragOver = dragOverBlank === actualBlankIndex;
                                    const correctAnswer = part.correctAnswer || currentSentence.answer;
                                    const isWrongAnswer = answered && filled && filled.word !== correctAnswer;

                                    return (
                                        <div
                                            key={`blank-${idx}`}
                                            onDragOver={(e) => handleDragOver(e, actualBlankIndex)}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, actualBlankIndex)}
                                            onClick={() => handleBlankClick(actualBlankIndex)}
                                            className={`
                                                relative inline-flex items-center justify-center min-w-[100px] sm:min-w-[120px] h-14 sm:h-16 px-3 rounded-xl border-2 border-dashed transition-all cursor-pointer
                                                ${answered
                                                    ? isWrongAnswer
                                                        ? 'bg-red-50 dark:bg-red-900/30 border-red-500 border-solid'
                                                        : 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 border-solid'
                                                    : isDragOver
                                                        ? 'bg-primary/20 border-primary border-solid scale-105'
                                                        : filled
                                                            ? 'bg-primary/10 border-primary border-solid'
                                                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 hover:border-primary/50'
                                                }
                                            `}
                                        >
                                            {filled ? (
                                                <div className="flex items-center gap-1">
                                                    <span className={`font-kaiti font-bold ${answered ? (isWrongAnswer ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400') : 'text-primary'}`}>
                                                        {filled.word}
                                                    </span>
                                                    {!answered && (
                                                        <button
                                                            onClick={(e) => handleRemoveFromBlank(e, actualBlankIndex)}
                                                            className="text-text-sub hover:text-red-500 transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">close</span>
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-text-sub/40 text-sm">Kéo từ vào đây</span>
                                            )}
                                        </div>
                                    );
                                }
                                return (
                                    <span key={`text-${idx}`} className="text-text-main dark:text-white">
                                        {part.text}
                                    </span>
                                );
                            })}
                        </div>

                        {/* Pinyin & Translation */}
                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 text-center">
                            {currentSentence?.pinyin && (
                                <p className="text-sm text-primary font-medium mb-1">{currentSentence.pinyin}</p>
                            )}
                            {currentSentence?.translation && (
                                <p className="text-sm text-text-sub italic">{currentSentence.translation}</p>
                            )}
                        </div>
                    </div>

                    {/* Word Bank */}
                    <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-text-sub uppercase tracking-wider">
                                Ngân hàng từ
                            </h3>
                            <span className="text-xs text-text-sub">
                                {wordBank.length} từ còn lại
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center min-h-[60px]">
                            {wordBank.length === 0 ? (
                                <p className="text-sm text-text-sub/60 italic py-4">
                                    Đã dùng hết từ. Nhấn Enter để kiểm tra!
                                </p>
                            ) : (
                                wordBank.map((wordObj) => (
                                    <button
                                        key={wordObj.id}
                                        draggable={!answered}
                                        onDragStart={(e) => handleDragStart(e, wordObj)}
                                        onDragEnd={handleDragEnd}
                                        onClick={() => handleWordClick(wordObj)}
                                        disabled={answered}
                                        className={`
                                            px-4 py-3 rounded-xl border-2 font-kaiti text-xl sm:text-2xl font-bold transition-all cursor-grab active:cursor-grabbing
                                            ${answered
                                                ? 'opacity-50 cursor-not-allowed'
                                                : selectedWord?.id === wordObj.id
                                                    ? 'bg-primary text-white border-primary shadow-lg scale-110'
                                                    : 'bg-slate-50 dark:bg-slate-800 text-text-main dark:text-white border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md hover:-translate-y-1'
                                            }
                                        `}
                                    >
                                        {wordObj.word}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Submit / Next Button */}
                    <div className="flex flex-col gap-3">
                        {!answered ? (
                            <button
                                onClick={handleSubmit}
                                disabled={!allBlanksFilled}
                                className={`
                                    w-full font-bold py-4 rounded-2xl transition-all text-lg
                                    ${allBlanksFilled
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
                            <>
                                <div className={`
                                    rounded-2xl p-4 text-center border-2
                                    ${isCorrect
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700'
                                        : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                                    }
                                `}>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className={`material-symbols-outlined text-3xl ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {isCorrect ? 'check_circle' : 'cancel'}
                                        </span>
                                        <span className={`text-xl font-bold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {isCorrect ? 'Chính xác!' : 'Chưa đúng!'}
                                        </span>
                                    </div>
                                    {!isCorrect && (
                                        <p className="text-sm text-text-sub mt-2">
                                            Đáp án đúng: <span className="font-kaiti font-bold text-text-main dark:text-white">{currentSentence.answer}</span>
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 text-lg"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {currentIndex + 1 >= totalSentences ? (
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
                            </>
                        )}

                        {/* Keyboard hint */}
                        <div className="flex justify-center">
                            <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-xs text-text-sub">
                                <span className="material-symbols-outlined text-sm">keyboard</span>
                                <span>Nhấn</span>
                                <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-mono text-[10px] font-bold text-text-main dark:text-white shadow-sm">
                                    Enter
                                </kbd>
                                <span>{answered ? 'để chuyển câu tiếp theo' : 'để kiểm tra'}</span>
                            </div>
                        </div>
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