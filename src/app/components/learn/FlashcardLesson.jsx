// components/learn/FlashcardLesson.js
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function FlashcardLesson({ data, course_slug, lesson_slug, item_slug }) {
  const router = useRouter();
  const { API_URL } = useAuth();
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState([]);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [error, setError] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef(null);
  
  // Fetch flashcards data
  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}api/courses/${course_slug}/lessons/${lesson_slug}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu bài học');
        }
        return response.json();
      })
      .then(data => {
        setCards(data.content?.words || []);
        setProgress({
          current: 0,
          total: data.content?.words?.length || 0
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Lỗi tải bài học:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [API_URL, course_slug, lesson_slug]);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playAudio = (audioFile) => {
    if (!audioFile) return;
    
    const baseUrl = process.env.NEXT_PUBLIC_MEDIA_URL || '/media/';
    const audioUrl = audioFile.startsWith('http') ? audioFile : `${baseUrl}${audioFile}`;
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
    
    audioRef.current = new Audio(audioUrl);
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(error => {
        console.error('Lỗi phát âm thanh:', error);
        setIsPlaying(false);
      });
    
    audioRef.current.onended = () => {
      setIsPlaying(false);
    };
    
    audioRef.current.onerror = () => {
      setIsPlaying(false);
    };
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRating = useCallback((rating, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    if (!cards[currentCard]) return;
    
    console.log(`Đã đánh giá từ "${cards[currentCard].chinese}" là ${rating}`);
    
    if (rating === 'good' || rating === 'easy') {
      setStreak(prev => prev + 1);
    } else if (rating === 'again') {
      setStreak(prev => Math.max(0, prev - 1));
    }
    
    if (currentCard < cards.length - 1) {
      setTimeout(() => {
        setCurrentCard(prev => prev + 1);
        setProgress(prev => ({
          ...prev,
          current: prev.current + 1
        }));
        setIsFlipped(false);
      }, 300);
    } else {
      router.push(`/courses/${course_slug}/lessons/${lesson_slug}/complete`);
    }
  }, [currentCard, cards, course_slug, lesson_slug, router]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'Digit1') {
        handleRating('again', e);
      } else if (e.code === 'Digit2') {
        handleRating('hard', e);
      } else if (e.code === 'Digit3') {
        handleRating('good', e);
      } else if (e.code === 'Digit4') {
        handleRating('easy', e);
      } else if (e.code === 'ArrowLeft' && currentCard > 0 && !isFlipped) {
        setCurrentCard(prev => prev - 1);
        setProgress(prev => ({
          ...prev,
          current: prev.current - 1
        }));
        setIsFlipped(false);
      } else if (e.code === 'ArrowRight' && currentCard < cards.length - 1 && !isFlipped) {
        setCurrentCard(prev => prev + 1);
        setProgress(prev => ({
          ...prev,
          current: prev.current + 1
        }));
        setIsFlipped(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleRating, currentCard, cards.length, isFlipped]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (isFlipped) return;
    
    setTouchEndX(e.changedTouches[0].clientX);
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentCard < cards.length - 1) {
        setCurrentCard(prev => prev + 1);
        setProgress(prev => ({
          ...prev,
          current: prev.current + 1
        }));
      } else if (diff < 0 && currentCard > 0) {
        setCurrentCard(prev => prev - 1);
        setProgress(prev => ({
          ...prev,
          current: prev.current - 1
        }));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-sub">Đang tải flashcards...</p>
        </div>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-text-sub mb-4">
            sentiment_dissatisfied
          </span>
          <h3 className="text-xl font-bold mb-2">Không tìm thấy flashcards</h3>
          <p className="text-text-sub">Vui lòng thử làm mới hoặc quay lại sau</p>
        </div>
      </div>
    );
  }

  const currentCardData = cards[currentCard];

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        {/* Progress & Timer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 md:mb-6">
          <div className="flex-1 w-full">
            <div className="flex justify-between text-xs sm:text-sm mb-1.5">
              <span className="text-text-sub font-medium">Tiến độ</span>
              <span className="text-text-main font-bold">
                {progress.current + 1}/{progress.total}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${((progress.current + 1) / progress.total) * 100}%` 
                }}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
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
          </div>
        </div>

        {/* Card Counter */}
        <div className="text-center text-text-sub text-xs sm:text-sm mb-3">
          Thẻ {currentCard + 1} / {cards.length}
        </div>

        {/* Flashcard - Flip Card */}
        <div 
          className="relative flex-1 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={handleFlip}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="relative w-full h-full transition-transform duration-700 ease-in-out"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Front Side */}
            <div 
              className="absolute inset-0 bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col p-6 sm:p-8 md:p-10"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">
                  <span className="text-xs font-medium text-text-sub uppercase tracking-wider">
                    {currentCardData.is_learned ? 'Ôn tập' : 'Từ mới'}
                  </span>
                </div>
                <span className="text-xs text-text-sub">{currentCard + 1}/{cards.length}</span>
              </div>

              {/* Card Content - Front */}
              <div className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-6">
                {/* Chinese Character - Font KaiTi */}
                <h2 className="font-kaiti text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text-main dark:text-white tracking-wide text-center leading-tight">
                  {currentCardData.chinese}
                </h2>
                
                {/* Audio Button - Large, below the word */}
                {currentCardData.audio_file && (
                 <button
  onClick={(e) => {
    e.stopPropagation();
    playAudio(currentCardData.audio_file);
  }}
  className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full transition-all duration-300 flex-shrink-0 ${
    isPlaying 
      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/30 scale-110' 
      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-110 hover:shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/20'
  }`}
>
  <span className={`material-symbols-outlined text-3xl sm:text-4xl md:text-5xl transition-all duration-300 ${
    isPlaying ? 'animate-pulse' : ''
  }`}>
    {isPlaying ? 'volume_up' : 'volume_up'}
  </span>
  
  {isPlaying && (
    <>
      <span className="absolute inset-0 rounded-full animate-ping bg-blue-400/30"></span>
      <span className="absolute inset-0 rounded-full animate-ping bg-blue-400/20 animation-delay-200"></span>
    </>
  )}
</button>
                )}
                
                <p className="text-sm sm:text-base text-text-sub">Chạm vào thẻ để lật • Xem đáp án</p>
              </div>

              <div className="text-center text-xs text-text-sub/50">
                <span className="material-symbols-outlined text-sm align-middle">touch_app</span>
                {' '}Chạm vào thẻ để xem đáp án
              </div>
            </div>

            {/* Back Side */}
            <div 
              className="absolute inset-0 bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col p-6 sm:p-8 md:p-10"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              {/* Card Header - Back */}
              <div className="flex items-start justify-between">
                <div className="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-md">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">Đáp án</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFlip();
                  }}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-text-sub">close</span>
                </button>
              </div>

              {/* Card Content - Back */}
              <div className="flex-1 flex flex-col items-center justify-center gap-3 sm:gap-4 py-2">
                <p className="text-xl sm:text-2xl md:text-3xl font-medium text-primary">
                  {currentCardData.pinyin}
                </p>
                <p className="text-lg sm:text-xl md:text-2xl text-text-main dark:text-white font-medium">
                  {currentCardData.meaning}
                </p>

                {currentCardData.example_sentence && (
                  <div className="w-full max-w-md mt-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                    <p className="font-kaiti text-base sm:text-lg text-text-main dark:text-slate-200 leading-relaxed">
                      {currentCardData.example_sentence}
                    </p>
                    {currentCardData.example_pinyin && (
                      <p className="text-xs sm:text-sm text-text-sub mt-1">{currentCardData.example_pinyin}</p>
                    )}
                    {currentCardData.example_translation && (
                      <p className="text-xs sm:text-sm text-text-sub/70 italic mt-1">{currentCardData.example_translation}</p>
                    )}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-text-sub mt-2">Bạn nhớ từ này như thế nào?</p>
              </div>

              {/* Rating Buttons - Tiếng Việt */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-2">
                {[
                  { key: 'again', label: 'Quên', color: 'bg-red-500 hover:bg-red-600' },
                  { key: 'hard', label: 'Khó', color: 'bg-orange-500 hover:bg-orange-600' },
                  { key: 'good', label: 'Tốt', color: 'bg-primary hover:bg-primary-dark' },
                  { key: 'easy', label: 'Dễ', color: 'bg-emerald-500 hover:bg-emerald-600' },
                ].map((rating) => (
                  <button
                    key={rating.key}
                    onClick={(e) => handleRating(rating.key, e)}
                    className={`${rating.color} text-white py-2 sm:py-3 px-2 rounded-lg font-medium text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10`}
                  >
                    {rating.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Tiếng Việt */}
        <div className="flex justify-between items-center mt-4 gap-3">
          <button
            onClick={() => {
              if (currentCard > 0 && !isFlipped) {
                setCurrentCard(prev => prev - 1);
                setProgress(prev => ({
                  ...prev,
                  current: prev.current - 1
                }));
                setIsFlipped(false);
              }
            }}
            disabled={currentCard === 0 || isFlipped}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all ${
              currentCard === 0 || isFlipped
                ? 'opacity-40 cursor-not-allowed text-text-sub'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-text-main'
            }`}
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">chevron_left</span>
            <span className="hidden xs:inline">Trước</span>
          </button>

          <span className="text-xs text-text-sub font-mono">{currentCard + 1} / {cards.length}</span>

          <button
            onClick={() => {
              if (currentCard < cards.length - 1 && !isFlipped) {
                setCurrentCard(prev => prev + 1);
                setProgress(prev => ({
                  ...prev,
                  current: prev.current + 1
                }));
                setIsFlipped(false);
              }
            }}
            disabled={currentCard === cards.length - 1 || isFlipped}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all ${
              currentCard === cards.length - 1 || isFlipped
                ? 'opacity-40 cursor-not-allowed text-text-sub'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-text-main'
            }`}
          >
            <span className="hidden xs:inline">Sau</span>
            <span className="material-symbols-outlined text-lg sm:text-xl">chevron_right</span>
          </button>
        </div>

        {/* Keyboard Shortcuts - Tiếng Việt */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 text-xs text-text-sub/60">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">Space</kbd>
            Lật thẻ
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">1</kbd>
            Quên
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">2</kbd>
            Khó
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">3</kbd>
            Tốt
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">4</kbd>
            Dễ
          </span>
        </div>
      </div>
    </main>
  );
}