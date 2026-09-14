'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

// ─── QUESTION DATA ──────────────────────────────────────────
const QUESTION_BANK = [
  {
    id: 1,
    prompt: 'xiànzài — bây giờ, hiện tại',
    question: 'Từ tiếng Trung nào đúng?',
    options: ['前', '现在', '时候', '中午'],
    correctIndex: 1,
  },
  {
    id: 2,
    prompt: 'diǎn — giờ',
    question: 'Từ tiếng Trung nào đúng?',
    options: ['分', '点', '回', '住'],
    correctIndex: 1,
  },
  {
    id: 3,
    prompt: 'zhōngwǔ — buổi trưa',
    question: 'Từ tiếng Trung nào đúng?',
    options: ['中午', '时候', '现在', '吃饭'],
    correctIndex: 0,
  },
  {
    id: 4,
    prompt: 'chīfàn — ăn cơm',
    question: 'Từ tiếng Trung nào đúng?',
    options: ['看电影', '回家', '吃饭', '住'],
    correctIndex: 2,
  },
  {
    id: 5,
    prompt: 'shíhou — khi, lúc',
    question: 'Từ tiếng Trung nào đúng?',
    options: ['时候', '时间', '现在', '前'],
    correctIndex: 0,
  },
  {
    id: 6,
    prompt: 'huí — về, trở về',
    question: 'Từ tiếng Trung nào đúng?',
    options: ['去', '住', '回', '来'],
    correctIndex: 2,
  },
  {
    id: 7,
    prompt: 'diànyǐng — phim',
    question: 'Từ tiếng Trung nào đúng?',
    options: ['电影', '学校', '商店', '饭'],
    correctIndex: 0,
  },
  {
    id: 8,
    prompt: 'zhù — ở, sống',
    question: 'Từ tiếng Trung nào đúng?',
    options: ['回', '住', '去', '看'],
    correctIndex: 1,
  },
  {
    id: 9,
    prompt: '6:15',
    question: 'Cách nói nào đúng?',
    options: ['六分十五点', '六点十五分', '十五点六分', '六点五十分'],
    correctIndex: 1,
  },
  {
    id: 10,
    prompt: '5:05',
    question: 'Cách nói nào đúng? (phút 01–09 dùng 点零……分)',
    options: ['五点一五分', '五点零五分', '五分五点', '五点十五分'],
    correctIndex: 1,
  },
  {
    id: 11,
    prompt: '3:30',
    question: 'Cách nói thường dùng nào đúng?',
    options: ['三点三分', '三点三十分', '三点半分', '三十分三点'],
    correctIndex: 1,
  },
  {
    id: 12,
    prompt: '"Bây giờ là mấy giờ?"',
    question: 'Câu tiếng Trung nào đúng?',
    options: ['现在什么时间？', '现在几点？', '什么时候现在？', '几点现在？'],
    correctIndex: 1,
  },
  {
    id: 13,
    prompt: 'A：中午几点吃饭？ B：________',
    question: 'Câu trả lời nào phù hợp?',
    options: ['十二点吃饭。', '十二分吃饭。', '吃饭十二分。', '十二点电影。'],
    correctIndex: 0,
  },
  {
    id: 14,
    prompt: 'A：爸爸什么时候回家？ B：________',
    question: 'Câu trả lời nào phù hợp?',
    options: ['下午五点。', '六点三十分电影。', '十二点吃饭。', '三天住。'],
    correctIndex: 0,
  },
  {
    id: 15,
    prompt: '"ba ngày trước"',
    question: 'Cách nói nào đúng?',
    options: ['三天后', '三天前', '前三天', '三点前'],
    correctIndex: 1,
  },
  {
    id: 16,
    prompt: 'A：我们什么时候去看电影？ B：________',
    question: 'Câu trả lời nào phù hợp?',
    options: ['六点三十分。', '六点三十分吃饭。', '六分三十点。', '三十分六点。'],
    correctIndex: 0,
  },
];

// ─── HELPERS ──────────────────────────────────────────────────
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ─── COMPONENT ──────────────────────────────────────────────
export default function PracticeLesson() {
  // ─── STATE ──────────────────────────────────────────────────
  const [gameState, setGameState] = useState('start');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [timerPercent, setTimerPercent] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResultBox, setShowResultBox] = useState(false);
  const [resultType, setResultType] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [resultEmoji, setResultEmoji] = useState('');
  const [resultColor, setResultColor] = useState('');

  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const countdownPlayerRef = useRef(null);
  const resultTimerRef = useRef(null);
  const QUESTION_TIMER = 30;

  const BACKGROUND_VIDEO_ID = 'wyoU9qwxBUY';
  const COUNTDOWN_VIDEO_ID = 'W2lL1S-c8Rs';

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? (currentIndex / totalQuestions) * 100 : 0;

  // ─── YOUTUBE PLAYER FOR BACKGROUND MUSIC ──────────────────
  useEffect(() => {
    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      if (document.getElementById('youtube-background-player') && !youtubePlayerRef.current) {
        youtubePlayerRef.current = new window.YT.Player('youtube-background-player', {
          height: '0',
          width: '0',
          videoId: BACKGROUND_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            playsinline: 1,
            loop: 1,
            playlist: BACKGROUND_VIDEO_ID,
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(musicVolume * 100);
              if (gameState === 'playing') {
                event.target.playVideo();
                setIsMusicPlaying(true);
              }
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      }

      if (document.getElementById('youtube-countdown-player') && !countdownPlayerRef.current) {
        countdownPlayerRef.current = new window.YT.Player('youtube-countdown-player', {
          height: '0',
          width: '0',
          videoId: COUNTDOWN_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(musicVolume * 100);
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.stopVideo();
              }
            },
          },
        });
      }
    };

    return () => {
      if (youtubePlayerRef.current) {
        try { youtubePlayerRef.current.destroy(); } catch (e) {}
        youtubePlayerRef.current = null;
      }
      if (countdownPlayerRef.current) {
        try { countdownPlayerRef.current.destroy(); } catch (e) {}
        countdownPlayerRef.current = null;
      }
    };
  }, [musicVolume, gameState]);

  // ─── ĐIỀU KHIỂN PLAY/PAUSE NHẠC NỀN ──────────────────────
  useEffect(() => {
    if (youtubePlayerRef.current && typeof youtubePlayerRef.current.playVideo === 'function') {
      if (gameState === 'playing') {
        youtubePlayerRef.current.playVideo();
        setIsMusicPlaying(true);
      } else {
        youtubePlayerRef.current.pauseVideo();
        setIsMusicPlaying(false);
      }
    }
  }, [gameState]);

  // ─── MUSIC CONTROLS ────────────────────────────────────────
  const toggleMusic = useCallback(() => {
    if (youtubePlayerRef.current && typeof youtubePlayerRef.current.playVideo === 'function') {
      if (isMusicPlaying) {
        youtubePlayerRef.current.pauseVideo();
        setIsMusicPlaying(false);
      } else {
        youtubePlayerRef.current.playVideo();
        setIsMusicPlaying(true);
      }
    }
  }, [isMusicPlaying]);

  const playCountdown = useCallback(() => {
    if (countdownPlayerRef.current && typeof countdownPlayerRef.current.playVideo === 'function') {
      try {
        countdownPlayerRef.current.stopVideo();
        setTimeout(() => {
          if (countdownPlayerRef.current && typeof countdownPlayerRef.current.playVideo === 'function') {
            countdownPlayerRef.current.playVideo();
          }
        }, 100);
      } catch (e) {
        console.log('Countdown play error:', e);
      }
    }
  }, []);

  const stopCountdown = useCallback(() => {
    if (countdownPlayerRef.current && typeof countdownPlayerRef.current.stopVideo === 'function') {
      try {
        countdownPlayerRef.current.stopVideo();
      } catch (e) {
        console.log('Countdown stop error:', e);
      }
    }
  }, []);

  const handleVolumeChange = useCallback((e) => {
    const volume = parseFloat(e.target.value);
    setMusicVolume(volume);
    if (youtubePlayerRef.current && typeof youtubePlayerRef.current.setVolume === 'function') {
      youtubePlayerRef.current.setVolume(volume * 100);
    }
    if (countdownPlayerRef.current && typeof countdownPlayerRef.current.setVolume === 'function') {
      countdownPlayerRef.current.setVolume(volume * 100);
    }
  }, []);

  // ─── FULLSCREEN ─────────────────────────────────────────────
  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      if (containerRef.current) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.msRequestFullscreen) {
          containerRef.current.msRequestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }, [isFullscreen]);

  const enterFullscreen = useCallback(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const shuffleQuestions = useCallback(() => {
    setQuestions(shuffleArray(QUESTION_BANK));
  }, []);

  // ─── TIMER ──────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    if (!currentQuestion || answered || gameState !== 'playing') return;

    let elapsed = 0;
    setTimerPercent(100);
    setTimeLeft(QUESTION_TIMER);
    setShowResultBox(false);

    playCountdown();

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      elapsed += 0.1;
      const remaining = Math.max(0, 100 - (elapsed / QUESTION_TIMER) * 100);
      setTimerPercent(remaining);
      setTimeLeft(Math.ceil((remaining / 100) * QUESTION_TIMER));

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setTimeLeft(0);
        stopCountdown();
        if (!answered && gameState === 'playing') {
          handleTimeout();
        }
      }
    }, 100);
  }, [currentQuestion, answered, gameState, playCountdown, stopCountdown]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    stopCountdown();
  }, [stopCountdown]);

  // ─── HANDLE TIMEOUT ────────────────────────────────────────
  const handleTimeout = useCallback(() => {
    if (answered || gameState !== 'playing') return;
    const q = currentQuestion;
    if (!q) return;

    setWrongCount((prev) => prev + 1);
    setStreak(0);
    setSelectedIndex(q.correctIndex);
    setAnswered(true);

    setResultType('timeout');
    setResultMessage('⏰ Hết giờ! Đáp án đúng được tô xanh.');
    setResultEmoji('⏰');
    setResultColor('#ba1a1a');
    setShowResultBox(true);
  }, [answered, currentQuestion, gameState]);

  // ─── HANDLE ANSWER ──────────────────────────────────────────
  const handleOptionClick = (index) => {
    if (answered || gameState !== 'playing') return;
    if (!currentQuestion) return;

    const isCorrect = index === currentQuestion.correctIndex;

    setSelectedIndex(index);
    clearTimer();
    stopCountdown();
    setAnswered(true);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const bonus = Math.min(newStreak, 5);
      const earned = 10 + bonus * 2;
      setScore((prev) => prev + earned);

      setResultType('correct');
      setResultMessage(`✅ Đúng! +${earned} điểm ${bonus > 0 ? '(🔥 x' + bonus + ')' : ''}`);
      setResultEmoji('🎉');
      setResultColor('#006e1c');
      setShowResultBox(true);

      spawnConfetti();

      if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
      resultTimerRef.current = setTimeout(() => {
        setShowResultBox(false);
        goToNext();
      }, 3000);
    } else {
      setWrongCount((prev) => prev + 1);
      setStreak(0);

      setResultType('wrong');
      setResultMessage(`❌ Sai rồi! Đáp án đúng là “${currentQuestion.options[currentQuestion.correctIndex]}”.`);
      setResultEmoji('❌');
      setResultColor('#ba1a1a');
      setShowResultBox(true);
    }
  };

  // ─── CONFETTI ──────────────────────────────────────────────
  const spawnConfetti = () => {
    const colors = ['#ff9800', '#33a0fd', '#78dc77', '#ffb870', '#ff6b6b', '#a29bfe'];
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        width: ${6 + Math.random() * 8}px;
        height: ${6 + Math.random() * 8}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${20 + Math.random() * 60}%;
        top: ${10 + Math.random() * 20}%;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        z-index: 9999;
        animation: confettiDrop ${0.8 + Math.random() * 0.8}s ease-in forwards;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }
  };

  // ─── GO TO NEXT ────────────────────────────────────────────
  const goToNext = useCallback(() => {
    if (resultTimerRef.current) {
      clearTimeout(resultTimerRef.current);
      resultTimerRef.current = null;
    }

    setShowResultBox(false);
    setAnswered(false);
    setSelectedIndex(null);

    if (currentIndex + 1 >= totalQuestions) {
      // Kết thúc game
      setGameState('end');
      clearTimer();
      // Đảm bảo không còn timer nào chạy
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, totalQuestions, clearTimer]);

  // ─── EFFECT: TỰ ĐỘNG BẮT ĐẦU TIMER ──────────────────────
  useEffect(() => {
    // Chỉ chạy khi đang chơi và chưa trả lời
    if (gameState === 'playing' && !answered && currentQuestion) {
      clearTimer();
      startTimer();
    }
    // Cleanup khi unmount hoặc dependency thay đổi
    return () => {
      // Không clear timer ở đây vì sẽ ảnh hưởng đến các effect khác
    };
  }, [currentIndex, gameState, answered, currentQuestion]);

  // ─── START GAME ─────────────────────────────────────────────
  const startGame = useCallback(() => {
    // Reset toàn bộ state
    const shuffled = shuffleArray(QUESTION_BANK);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setWrongCount(0);
    setAnswered(false);
    setSelectedIndex(null);
    setTimerPercent(100);
    setTimeLeft(QUESTION_TIMER);
    setShowResultBox(false);
    setResultType('');
    setResultMessage('');
    setResultEmoji('');
    setResultColor('');
    setGameState('playing');
    clearTimer();

    // Sau khi set state, useEffect sẽ tự bắt đầu timer
    enterFullscreen();

    // Bật nhạc nền
    setTimeout(() => {
      if (youtubePlayerRef.current && typeof youtubePlayerRef.current.playVideo === 'function') {
        youtubePlayerRef.current.playVideo();
        setIsMusicPlaying(true);
      }
    }, 500);
  }, [clearTimer, enterFullscreen, shuffleQuestions]);

  // ─── GO HOME ────────────────────────────────────────────────
  const goHome = useCallback(() => {
    clearTimer();
    if (resultTimerRef.current) {
      clearTimeout(resultTimerRef.current);
      resultTimerRef.current = null;
    }
    setGameState('start');
    setCurrentIndex(0);
    setAnswered(false);
    setSelectedIndex(null);
    setTimerPercent(100);
    setTimeLeft(QUESTION_TIMER);
    setShowResultBox(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setWrongCount(0);

    if (youtubePlayerRef.current && typeof youtubePlayerRef.current.pauseVideo === 'function') {
      youtubePlayerRef.current.pauseVideo();
      setIsMusicPlaying(false);
    }
    if (countdownPlayerRef.current && typeof countdownPlayerRef.current.stopVideo === 'function') {
      countdownPlayerRef.current.stopVideo();
    }
    if (isFullscreen && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }, [clearTimer, isMusicPlaying, isFullscreen]);

  // ─── SHUFFLE ON START ──────────────────────────────────────
  useEffect(() => {
    shuffleQuestions();
  }, [shuffleQuestions]);

  // ─── CLEANUP ────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      clearTimer();
      if (resultTimerRef.current) {
        clearTimeout(resultTimerRef.current);
      }
      if (youtubePlayerRef.current) {
        try { youtubePlayerRef.current.destroy(); } catch (e) {}
      }
      if (countdownPlayerRef.current) {
        try { countdownPlayerRef.current.destroy(); } catch (e) {}
      }
    };
  }, [clearTimer]);

  // ─── RENDER: START SCREEN ──────────────────────────────────
  if (gameState === 'start') {
    return (
      <div 
        ref={containerRef}
        className={`min-h-screen bg-[#f7f9ff] flex flex-col items-center justify-center px-6 py-12 overflow-y-auto ${
          isFullscreen ? 'fixed inset-0 z-[9999] bg-[#f7f9ff]' : ''
        }`}
      >
        <div id="youtube-background-player" style={{ position: 'fixed', width: '0', height: '0', opacity: 0, pointerEvents: 'none' }} />
        <div id="youtube-countdown-player" style={{ position: 'fixed', width: '0', height: '0', opacity: 0, pointerEvents: 'none' }} />

        <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
          <button
            onClick={toggleMusic}
            className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow border border-[#d1e4fb]"
            title={isMusicPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
          >
            <span className="material-symbols-outlined text-2xl text-[#8b5000]">
              {isMusicPlaying ? 'music_note' : 'music_off'}
            </span>
          </button>
          <button
            onClick={() => setShowVolumeControl(!showVolumeControl)}
            className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow border border-[#d1e4fb]"
            title="Điều chỉnh âm lượng"
          >
            <span className="material-symbols-outlined text-2xl text-[#8b5000]">volume_up</span>
          </button>
        </div>

        {showVolumeControl && (
          <div className="absolute top-16 right-4 bg-white rounded-xl p-4 shadow-lg border border-[#d1e4fb] z-50 min-w-[180px]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-sm text-[#554434]">volume_down</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={musicVolume}
                onChange={handleVolumeChange}
                className="flex-1 accent-[#8b5000] h-2 bg-[#d1e4fb] rounded-full appearance-none cursor-pointer"
              />
              <span className="material-symbols-outlined text-sm text-[#554434]">volume_up</span>
            </div>
            <div className="text-center text-xs text-[#554434] mt-1">{Math.round(musicVolume * 100)}%</div>
          </div>
        )}

        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-7xl md:text-8xl">🧠</div>
          <h1 className="font-bold text-3xl md:text-4xl text-[#091d2e]">Thử thách từ vựng</h1>
          <p className="text-[#554434] text-lg">Chọn từ tiếng Trung đúng với nghĩa đã cho. Cố gắng trả lời nhanh và chính xác nhé!</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button
              onClick={startGame}
              className="bg-[#8b5000] text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-[0_6px_0_#6a3d00] hover:bg-[#8b5000]/90 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">play_arrow</span>
              Bắt đầu
            </button>
            <button
              onClick={shuffleQuestions}
              className="bg-[#d9eaff] text-[#091d2e] px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_4px_0_#b0c4d9] hover:bg-[#d1e4fb] transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">shuffle</span>
              Trộn câu
            </button>
          </div>

          <div className="text-sm text-[#554434]/70 mt-4">
            <span className="material-symbols-outlined text-sm align-middle">info</span>
            Bộ đề gồm <span className="font-bold">{QUESTION_BANK.length}</span> câu hỏi
          </div>
        </div>

        <style jsx>{`
          @keyframes confettiDrop {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(80px) rotate(720deg); opacity: 0; }
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #8b5000;
            cursor: pointer;
          }
          input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #8b5000;
            cursor: pointer;
            border: none;
          }
        `}</style>
      </div>
    );
  }

  // ─── RENDER: END SCREEN ────────────────────────────────────
  if (gameState === 'end') {
    const total = correctCount + wrongCount;
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    let emoji = '📚';
    if (pct >= 90) emoji = '🏆';
    else if (pct >= 70) emoji = '🌟';
    else if (pct >= 50) emoji = '💪';

    return (
      <div 
        ref={containerRef}
        className={`min-h-screen bg-[#f7f9ff] flex flex-col items-center justify-center px-6 py-12 overflow-y-auto ${
          isFullscreen ? 'fixed inset-0 z-[9999] bg-[#f7f9ff]' : ''
        }`}
      >
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="text-7xl md:text-8xl">{emoji}</div>
          <h2 className="font-bold text-3xl md:text-4xl text-[#091d2e]">Hoàn thành!</h2>
          <p className="text-[#554434] text-lg">Bạn đã trả lời tất cả {totalQuestions} câu hỏi.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-white rounded-2xl p-5 text-center border border-[#d1e4fb] shadow-sm">
              <div className="text-3xl font-bold text-[#8b5000]">{score}</div>
              <div className="text-sm text-[#554434]">Điểm</div>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center border border-[#d1e4fb] shadow-sm">
              <div className="text-3xl font-bold text-[#006e1c]">{correctCount}</div>
              <div className="text-sm text-[#554434]">Đúng</div>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center border border-[#d1e4fb] shadow-sm">
              <div className="text-3xl font-bold text-[#ba1a1a]">{wrongCount}</div>
              <div className="text-sm text-[#554434]">Sai</div>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center border border-[#d1e4fb] shadow-sm">
              <div className="text-3xl font-bold text-[#0061a4]">{maxStreak}</div>
              <div className="text-sm text-[#554434]">🔥 Chuỗi dài</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              onClick={startGame}
              className="bg-[#8b5000] text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-[0_6px_0_#6a3d00] hover:bg-[#8b5000]/90 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">replay</span>
              Chơi lại
            </button>
            <button
              onClick={goHome}
              className="bg-[#d9eaff] text-[#091d2e] px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_4px_0_#b0c4d9] hover:bg-[#d1e4fb] transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">home</span>
              Trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── RENDER: PLAYING SCREEN ────────────────────────────────
  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-[#f7f9ff] flex flex-col px-4 sm:px-6 pt-4 pb-8 md:pt-6 overflow-y-auto ${
        isFullscreen ? 'fixed inset-0 z-[9999] bg-[#f7f9ff]' : ''
      }`}
    >
      <div id="youtube-background-player" style={{ position: 'fixed', width: '0', height: '0', opacity: 0, pointerEvents: 'none' }} />
      <div id="youtube-countdown-player" style={{ position: 'fixed', width: '0', height: '0', opacity: 0, pointerEvents: 'none' }} />

      {/* ─── TOP BAR ─── */}
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between gap-4 mb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={goHome}
            className="flex items-center gap-2 text-[#554434] hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
            <span className="hidden md:inline font-medium">Thoát</span>
          </button>
          <div className="w-px h-6 bg-[#d1e4fb] hidden md:block" />
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 text-[#554434] hover:opacity-80 transition-opacity"
            title={isFullscreen ? 'Thoát full màn hình' : 'Full màn hình'}
          >
            <span className="material-symbols-outlined text-2xl">
              {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
            </span>
            <span className="hidden md:inline font-medium">
              {isFullscreen ? 'Thoát full' : 'Full màn hình'}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={toggleMusic}
              className="text-[#554434] hover:opacity-80 transition-opacity p-1"
              title={isMusicPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
            >
              <span className="material-symbols-outlined text-xl">
                {isMusicPlaying ? 'music_note' : 'music_off'}
              </span>
            </button>
            <button
              onClick={() => setShowVolumeControl(!showVolumeControl)}
              className="text-[#554434] hover:opacity-80 transition-opacity p-1"
              title="Điều chỉnh âm lượng"
            >
              <span className="material-symbols-outlined text-xl">volume_up</span>
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#d9eaff] rounded-full px-3 py-1.5 shadow-sm border border-[#d1e4fb]">
            <span className="material-symbols-outlined text-sm text-[#ff9800]">local_fire_department</span>
            <span className="font-bold text-sm text-[#ff9800]">{streak}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#d9eaff] rounded-full px-4 py-1.5 shadow-sm border border-[#d1e4fb]">
            <span className="material-symbols-outlined text-sm text-[#8b5000]">stars</span>
            <span className="font-bold text-lg text-[#8b5000]">{score}</span>
          </div>
        </div>
      </div>

      {showVolumeControl && (
        <div className="absolute top-16 right-4 bg-white rounded-xl p-4 shadow-lg border border-[#d1e4fb] z-50 min-w-[180px]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-sm text-[#554434]">volume_down</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={musicVolume}
              onChange={handleVolumeChange}
              className="flex-1 accent-[#8b5000] h-2 bg-[#d1e4fb] rounded-full appearance-none cursor-pointer"
            />
            <span className="material-symbols-outlined text-sm text-[#554434]">volume_up</span>
          </div>
          <div className="text-center text-xs text-[#554434] mt-1">{Math.round(musicVolume * 100)}%</div>
        </div>
      )}

      <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col gap-4">
        {/* ─── PROGRESS ─── */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="text-sm text-[#554434] whitespace-nowrap">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <div className="flex-1 h-2 bg-[#d1e4fb] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8b5000] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ─── TIMER BAR ─── */}
        <div className="w-full h-5 bg-[#d1e4fb] rounded-full overflow-hidden shadow-inner flex-shrink-0">
          <div
            className={`h-full rounded-full transition-all duration-100 flex flex-col justify-start ${
              timeLeft <= 3 ? 'bg-[#ba1a1a]' : timeLeft <= 5 ? 'bg-[#ff9800]' : 'bg-[#63c664]'
            }`}
            style={{ width: `${timerPercent}%` }}
          >
            <div className="w-full h-1/2 bg-white/30 rounded-t-full" />
          </div>
        </div>

        {/* ─── TIME LEFT DISPLAY ─── */}
        <div className="flex justify-center">
          <div className={`text-2xl font-bold ${
            timeLeft <= 3 ? 'text-[#ba1a1a] animate-pulse' : timeLeft <= 5 ? 'text-[#ff9800]' : 'text-[#8b5000]'
          }`}>
            ⏱️ {timeLeft}s
          </div>
        </div>

        {/* ─── QUESTION CARD ─── */}
        <div className="bg-white rounded-[2rem] p-6 md:p-10 border-2 border-[#d1e4fb] shadow-xl">
          <div className="text-center w-full">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-sm font-bold text-[#554434] bg-[#d9eaff] px-3 py-1 rounded-full">
                Câu {currentIndex + 1}/{totalQuestions}
              </span>
            </div>
            <div className="font-bold text-xl md:text-2xl lg:text-3xl text-[#8b5000] mb-1">
              {currentQuestion?.prompt}
            </div>
            <div className="text-base md:text-lg text-[#554434]">{currentQuestion?.question}</div>
          </div>
        </div>

        {/* ─── OPTIONS GRID ─── */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {currentQuestion?.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrect = idx === currentQuestion.correctIndex;
            let buttonClass =
              'bg-white rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center justify-center border-4 shadow-[0_4px_0_#c9dcf3] md:shadow-[0_6px_0_#c9dcf3] text-[#091d2e] min-h-[80px] md:min-h-[100px] w-full font-chinese text-2xl md:text-3xl lg:text-4xl transition-all duration-200';

            if (answered) {
              if (isCorrect) {
                buttonClass += ' border-[#006e1c] bg-[#e8f5e9] scale-105 shadow-[0_0_30px_rgba(99,198,100,0.4)]';
              } else if (isSelected && !isCorrect) {
                buttonClass += ' border-[#ba1a1a] bg-[#ffebee] animate-shake';
              } else {
                buttonClass += ' border-[#d1e4fb] opacity-60';
              }
            } else {
              buttonClass += ' border-[#d1e4fb] hover:bg-[#edf4ff] hover:-translate-y-1';
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={answered}
                className={buttonClass}
              >
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* ─── FEEDBACK ─── */}
        {!showResultBox && (
          <div className="flex justify-center text-sm text-[#554434] mt-1">
            {answered ? 'Đã chọn đáp án' : 'Chọn một đáp án ✨'}
          </div>
        )}
      </div>

      {/* ─── RESULT BOX OVERLAY ─── */}
      {showResultBox && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer"
          onClick={() => {
            if (resultType === 'correct') {
              if (resultTimerRef.current) {
                clearTimeout(resultTimerRef.current);
                resultTimerRef.current = null;
              }
              goToNext();
            }
          }}
        >
          <div 
            className={`bg-white rounded-3xl p-8 md:p-12 max-w-md w-full mx-4 text-center shadow-2xl transform transition-all duration-300 scale-100 border-t-8 cursor-default ${
              resultType === 'correct' ? 'border-[#006e1c]' : 'border-[#ba1a1a]'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'popIn 0.3s ease-out' }}
          >
            <div className="text-6xl md:text-7xl mb-4">{resultEmoji}</div>
            <div className="text-2xl md:text-3xl font-bold mb-3" style={{ color: resultColor }}>
              {resultType === 'correct' ? 'Chính xác!' : resultType === 'wrong' ? 'Sai rồi!' : 'Hết giờ!'}
            </div>
            <p className="text-base md:text-lg text-[#554434] mb-6">{resultMessage}</p>
            
            {resultType === 'wrong' || resultType === 'timeout' ? (
              <button
                onClick={goToNext}
                className="bg-[#33a0fd] text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-[0_4px_0_#1a6ea8] hover:bg-[#33a0fd]/80 transition-colors flex items-center gap-2 mx-auto"
              >
                <span>Tiếp tục</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            ) : (
              <div className="text-sm text-[#554434]/70">
                <span className="material-symbols-outlined text-sm align-middle">hourglass_bottom</span>
                Tự động chuyển câu sau 3s...
                <br />
                <span className="text-xs">(Bấm vào màn hình để bỏ qua)</span>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-12px); }
          40% { transform: translateX(12px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes confettiDrop {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(80px) rotate(720deg); opacity: 0; }
        }
        .animate-pulse { animation: pulse 1s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease; }
        .font-chinese { font-family: 'Noto Sans SC', sans-serif; font-weight: 500; }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 16px; height: 16px; border-radius: 50%;
          background: #8b5000; cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: #8b5000; cursor: pointer; border: none;
        }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500;700&family=Quicksand:wght@400;500;700&display=swap" rel="stylesheet" />
    </div>
  );
}