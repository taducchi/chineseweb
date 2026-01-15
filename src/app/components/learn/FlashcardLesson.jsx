// components/learn/FlashcardLesson.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function FlashcardLesson({ data, course_slug, lesson_slug, item_slug }) {
  const router = useRouter();
  
  // State management
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState([]);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [streak, setStreak] = useState(12);

  // Fetch flashcards data
  const fetchFlashcards = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // If data is provided via props, use it
      if (data && data.flashcards) {
        setCards(data.flashcards);
        setProgress({
          current: data.progress?.current || 0,
          total: data.flashcards.length
        });
        return;
      }
      
      // Otherwise fetch from API
      const response = await fetch(
        `/api/courses/${course_slug}/lessons/${lesson_slug}/flashcards/${item_slug}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch flashcards');
      }
      
      const result = await response.json();
      setCards(result.flashcards || []);
      setProgress({
        current: result.progress?.current || 0,
        total: result.flashcards?.length || 0
      });
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      // Fallback to sample data
      setCards(sampleFlashcards);
      setProgress({ current: 0, total: sampleFlashcards.length });
    } finally {
      setIsLoading(false);
    }
  }, [data, course_slug, lesson_slug, item_slug]);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Format timer to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle card rating (Spaced Repetition System)
  const handleRating = useCallback((rating) => {
    if (!cards[currentCard]) return;
    
    // In a real app, you would send this rating to your backend
    console.log(`Rated card "${cards[currentCard].chinese}" as ${rating}`);
    
    // Move to next card
    if (currentCard < cards.length - 1) {
      setCurrentCard(prev => prev + 1);
      setProgress(prev => ({
        ...prev,
        current: prev.current + 1
      }));
    } else {
      // All cards completed
      router.push(`/courses/${course_slug}/lessons/${lesson_slug}/complete`);
    }
    
    setIsRevealed(false);
    
    // Update streak based on rating
    if (rating === 'good' || rating === 'easy') {
      setStreak(prev => prev + 1);
    } else if (rating === 'again') {
      setStreak(prev => Math.max(0, prev - 2));
    }
  }, [currentCard, cards, course_slug, lesson_slug, router]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsRevealed(prev => !prev);
      } else if (e.code === 'Digit1') {
        handleRating('again');
      } else if (e.code === 'Digit2') {
        handleRating('hard');
      } else if (e.code === 'Digit3') {
        handleRating('good');
      } else if (e.code === 'Digit4') {
        handleRating('easy');
      } else if (e.code === 'ArrowLeft' && currentCard > 0) {
        setCurrentCard(prev => prev - 1);
        setIsRevealed(false);
      } else if (e.code === 'ArrowRight' && currentCard < cards.length - 1) {
        setCurrentCard(prev => prev + 1);
        setIsRevealed(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleRating, currentCard, cards.length]);

  // Initial data fetch
  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards]);

  // Sample data structure
  const sampleFlashcards = [
    {
      id: 1,
      chinese: "快乐",
      pinyin: "Kuàilè",
      english: "Happy / Cheerful",
      example: {
        chinese: "祝你生日快乐!",
        pinyin: "Zhù nǐ shēngrì kuàilè!",
        english: "Happy birthday to you!"
      },
      difficulty: "new",
      mastered: false
    },
    {
      id: 2,
      chinese: "悲伤",
      pinyin: "Bēishāng",
      english: "Sad / Sorrowful",
      example: {
        chinese: "听到这个消息我很悲伤",
        pinyin: "Tīng dào zhège xiāoxī wǒ hěn bēishāng",
        english: "I'm very sad to hear this news"
      },
      difficulty: "review",
      mastered: true
    },
    {
      id: 3,
      chinese: "兴奋",
      pinyin: "Xīngfèn",
      english: "Excited",
      example: {
        chinese: "孩子们对旅行感到兴奋",
        pinyin: "Háizimen duì lǚxíng gǎndào xīngfèn",
        english: "The children are excited about the trip"
      },
      difficulty: "new",
      mastered: false
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-sub">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-text-sub mb-4">
            sentiment_dissatisfied
          </span>
          <h3 className="text-xl font-bold mb-2">No flashcards found</h3>
          <p className="text-text-sub">Try refreshing or check back later</p>
        </div>
      </div>
    );
  }

  const currentCardData = cards[currentCard];

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark relative">
      {/* Header / Top Bar */}
      <header className="h-16 px-6 md:px-10 flex items-center justify-between bg-white/50 dark:bg-[#101922]/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200/50 dark:border-slate-800/50">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm">
          <button 
            onClick={() => router.push('/')}
            className="text-text-sub hover:text-primary transition-colors"
          >
            Home
          </button>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <button 
            onClick={() => router.push(`/courses/${course_slug}`)}
            className="text-text-sub hover:text-primary transition-colors"
          >
            HSK Level 3
          </button>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-text-main dark:text-white font-medium">
            Lesson {lesson_slug}: Feelings
          </span>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="material-symbols-outlined text-orange-500 text-[20px] icon-filled">
              local_fire_department
            </span>
            <span className="text-sm font-bold text-text-main dark:text-white">
              {streak}
            </span>
          </div>
        </div>
      </header>
      
      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center">
        <div className="w-full max-w-[800px] flex flex-col gap-6">
          {/* Progress & Timer Row */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-text-sub">
                  Session Progress
                </span>
                <span className="text-sm font-bold text-text-main dark:text-white">
                  {progress.current + 1}/{progress.total}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((progress.current + 1) / progress.total) * 100}%` 
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
              <span className="material-symbols-outlined text-text-sub">
                timer
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-text-main dark:text-white font-mono">
                  {formatTime(timer)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Flashcard Interaction Area */}
          <div className="relative w-full aspect-[4/3] md:aspect-[16/10] min-h-[450px]">
            {/* Prev Button */}
            {currentCard > 0 && (
              <button 
                onClick={() => {
                  setCurrentCard(prev => prev - 1);
                  setIsRevealed(false);
                }}
                className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-primary hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all hidden lg:block"
              >
                <span className="material-symbols-outlined text-3xl">
                  chevron_left
                </span>
              </button>
            )}
            
            {/* The Card */}
            <div className="w-full h-full bg-white dark:bg-[#1a2632] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700 flex flex-col relative overflow-hidden group/card">
              {/* Card Header */}
              <div className="absolute top-0 w-full p-4 flex justify-between items-start z-10">
                <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium text-text-sub uppercase tracking-wider">
                  {currentCardData.difficulty === 'new' ? 'New Word' : 'Review'}
                </div>
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">
                    bookmark
                  </span>
                </button>
              </div>
              
              {/* Card Content Wrapper */}
              <div className="flex-1 flex flex-col">
                {/* Front: Chinese Character */}
                <div 
                  className={`flex-1 flex flex-col items-center justify-center p-8 pb-0 transition-all duration-300 ${
                    isRevealed ? 'opacity-0 scale-95' : 'opacity-100'
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <h1 className="font-chinese text-[80px] md:text-[100px] leading-tight font-bold text-text-main dark:text-white tracking-wide">
                      {currentCardData.chinese}
                    </h1>
                    <button 
                      onClick={() => {
                        // Play pronunciation
                        const utterance = new SpeechSynthesisUtterance(currentCardData.chinese);
                        utterance.lang = 'zh-CN';
                        window.speechSynthesis.speak(utterance);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors group/audio"
                    >
                      <span className="material-symbols-outlined text-xl group-hover/audio:scale-110 transition-transform">
                        volume_up
                      </span>
                      <span className="text-sm font-medium">
                        Pronunciation
                      </span>
                    </button>
                  </div>
                </div>
                
                {/* Back: Revealed Info */}
                {isRevealed && (
                  <div className="flex-1 bg-slate-50 dark:bg-[#151f2b]/50 border-t border-slate-100 dark:border-slate-700/50 p-8 flex flex-col items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center">
                      <p className="text-2xl font-medium text-primary mb-1">
                        {currentCardData.pinyin}
                      </p>
                      <p className="text-xl text-text-main dark:text-slate-200">
                        {currentCardData.english}
                      </p>
                    </div>
                    
                    {currentCardData.example && (
                      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-lg p-4 mt-2 border border-slate-100 dark:border-slate-700 shadow-sm">
                        <div className="flex gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900/30 text-primary rounded-full size-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                            ex
                          </div>
                          <div>
                            <p className="font-chinese text-lg text-text-main dark:text-slate-200 leading-relaxed">
                              {currentCardData.example.chinese}
                            </p>
                            <p className="text-text-sub text-sm mt-1">
                              {currentCardData.example.pinyin}
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm italic mt-1">
                              {currentCardData.example.english}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Hint for rating */}
                    <p className="text-sm text-text-sub mt-2">
                      Rate how well you remembered this word:
                    </p>
                  </div>
                )}
              </div>
              
              {/* Card Footer Controls */}
              <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2632] p-4">
                {!isRevealed ? (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setIsRevealed(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium shadow-lg shadow-primary/20 transition-all hover:scale-105"
                    >
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                      Show Answer (Space)
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
                    {[
                      { key: 'again', label: 'Again', time: '< 1m', color: 'text-red-500' },
                      { key: 'hard', label: 'Hard', time: '< 10m', color: 'text-orange-500' },
                      { key: 'good', label: 'Good', time: '1d', color: 'text-primary' },
                      { key: 'easy', label: 'Easy', time: '4d', color: 'text-emerald-500' },
                    ].map((rating) => (
                      <button
                        key={rating.key}
                        onClick={() => handleRating(rating.key)}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group ${
                          rating.key === 'good' ? 'bg-primary text-white shadow-md shadow-primary/20' : ''
                        }`}
                      >
                        <span className={`text-xs font-medium mb-1 ${
                          rating.key === 'good' ? 'text-blue-100' : 'text-text-sub group-hover:' + rating.color
                        }`}>
                          {rating.time}
                        </span>
                        <span className={`font-bold text-sm md:text-base ${
                          rating.key === 'good' ? 'text-white' : rating.color
                        }`}>
                          {rating.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Next Button */}
            {currentCard < cards.length - 1 && (
              <button 
                onClick={() => {
                  setCurrentCard(prev => prev + 1);
                  setIsRevealed(false);
                }}
                className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-primary hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all hidden lg:block"
              >
                <span className="material-symbols-outlined text-3xl">
                  chevron_right
                </span>
              </button>
            )}
          </div>
          
          {/* Card Counter */}
          <div className="text-center text-text-sub text-sm">
            Card {currentCard + 1} of {cards.length}
          </div>
          
          {/* Shortcuts Legend */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-text-sub">
            {[
              { key: '1', label: 'Again' },
              { key: '2', label: 'Hard' },
              { key: '3', label: 'Good' },
              { key: '4', label: 'Easy' },
            ].map((shortcut) => (
              <div key={shortcut.key} className="flex items-center gap-1.5">
                <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-text-main dark:text-slate-300">
                  {shortcut.key}
                </kbd>
                <span>{shortcut.label}</span>
              </div>
            ))}
            
            <span className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-2 hidden md:block"></span>
            
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-text-main dark:text-slate-300">
                Space
              </kbd>
              <span>Show Answer</span>
            </div>
            
            <span className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-2 hidden md:block"></span>
            
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-text-main dark:text-slate-300">
                ←
              </kbd>
              <span>Previous</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-text-main dark:text-slate-300">
                →
              </kbd>
              <span>Next</span>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex justify-between md:hidden pt-4">
            <button
              onClick={() => {
                if (currentCard > 0) {
                  setCurrentCard(prev => prev - 1);
                  setIsRevealed(false);
                }
              }}
              disabled={currentCard === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                currentCard === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">
                chevron_left
              </span>
              Previous
            </button>
            
            <button
              onClick={() => {
                if (currentCard < cards.length - 1) {
                  setCurrentCard(prev => prev + 1);
                  setIsRevealed(false);
                }
              }}
              disabled={currentCard === cards.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                currentCard === cards.length - 1
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Next
              <span className="material-symbols-outlined">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// Sample API data structure
export const sampleFlashcardData = {
  course_slug: "hsk-level-3",
  lesson_slug: "lesson-4",
  item_slug: "feelings-vocabulary",
  title: "Lesson 4: Feelings Vocabulary",
  description: "Learn vocabulary related to emotions and feelings",
  flashcards: [
    {
      id: 1,
      chinese: "快乐",
      pinyin: "Kuàilè",
      english: "Happy / Cheerful",
      example: {
        chinese: "祝你生日快乐!",
        pinyin: "Zhù nǐ shēngrì kuàilè!",
        english: "Happy birthday to you!"
      },
      audio_url: "/audio/快乐.mp3",
      difficulty: "new",
      mastered: false,
      last_reviewed: null,
      next_review: null
    },
    {
      id: 2,
      chinese: "悲伤",
      pinyin: "Bēishāng",
      english: "Sad / Sorrowful",
      example: {
        chinese: "听到这个消息我很悲伤",
        pinyin: "Tīng dào zhège xiāoxī wǒ hěn bēishāng",
        english: "I'm very sad to hear this news"
      },
      audio_url: "/audio/悲伤.mp3",
      difficulty: "review",
      mastered: true,
      last_reviewed: "2024-01-10",
      next_review: "2024-01-17"
    },
    {
      id: 3,
      chinese: "兴奋",
      pinyin: "Xīngfèn",
      english: "Excited",
      example: {
        chinese: "孩子们对旅行感到兴奋",
        pinyin: "Háizimen duì lǚxíng gǎndào xīngfèn",
        english: "The children are excited about the trip"
      },
      audio_url: "/audio/兴奋.mp3",
      difficulty: "new",
      mastered: false,
      last_reviewed: null,
      next_review: null
    },
    {
      id: 4,
      chinese: "生气",
      pinyin: "Shēngqì",
      english: "Angry",
      example: {
        chinese: "不要为小事生气",
        pinyin: "Búyào wèi xiǎoshì shēngqì",
        english: "Don't get angry over small things"
      },
      audio_url: "/audio/生气.mp3",
      difficulty: "review",
      mastered: true,
      last_reviewed: "2024-01-05",
      next_review: "2024-01-12"
    },
    {
      id: 5,
      chinese: "担心",
      pinyin: "Dānxīn",
      english: "Worried / Concerned",
      example: {
        chinese: "妈妈担心我的健康",
        pinyin: "Māma dānxīn wǒ de jiànkāng",
        english: "Mom is worried about my health"
      },
      audio_url: "/audio/担心.mp3",
      difficulty: "new",
      mastered: false,
      last_reviewed: null,
      next_review: null
    }
  ],
  progress: {
    current: 2,
    total: 5,
    mastered: 2,
    completion_rate: 40
  },
  settings: {
    cards_per_session: 20,
    show_pinyin: true,
    show_examples: true,
    auto_play_audio: false
  }
};

// API route example
export async function getFlashcardsFromAPI(course_slug, lesson_slug, item_slug) {
  // This would be your actual API call
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${course_slug}/lessons/${lesson_slug}/flashcards/${item_slug}`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch flashcards');
  }
  
  return response.json();
}

// Tailwind CSS custom classes needed in tailwind.config.js
// Add these to your tailwind.config.js theme.extend:
/*
boxShadow: {
  'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
},
fontFamily: {
  'chinese': ['"Noto Sans SC"', 'sans-serif'],
},
*/