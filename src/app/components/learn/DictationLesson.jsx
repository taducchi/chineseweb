// components/lessons/DictationLesson.jsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function DictationLesson() {
  // State management
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(45); // seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(10);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showVirtualKeypad, setShowVirtualKeypad] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  
  const textareaRef = useRef(null);
  const timerRef = useRef(null);

  // Audio simulation
  const playAudio = () => {
    setIsPlaying(true);
    // Simulate audio playing for 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeRemaining, isSubmitted]);

  // Focus textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  // Handle form submission
  const handleSubmit = () => {
    if (isSubmitted) return;
    
    setIsSubmitted(true);
    clearInterval(timerRef.current);
    
    // Mock validation - check if input is not empty
    const isValid = userInput.trim().length > 0;
    setIsCorrect(isValid);
    
    // Show result for 2 seconds then move to next question
    setTimeout(() => {
      if (currentQuestion < totalQuestions) {
        setCurrentQuestion(prev => prev + 1);
        setUserInput('');
        setTimeRemaining(45);
        setIsSubmitted(false);
        setIsCorrect(null);
        setShowHint(false);
        
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      } else {
        // Course completed
        alert('Congratulations! You have completed the dictation practice!');
      }
    }, 2000);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space to replay audio
      if (e.code === 'Space' && !e.target.matches('textarea')) {
        e.preventDefault();
        playAudio();
      }
      
      // Enter to submit
      if (e.code === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        handleSubmit();
      }
      
      // Escape to skip
      if (e.code === 'Escape') {
        e.preventDefault();
        setUserInput('');
        playAudio(); // Replay audio on skip
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userInput, isSubmitted]);

  // Virtual keyboard characters for Chinese input
  const chineseCharacters = [
    '我', '们', '你', '好', '谢', '谢', '对', '不', '起', '没',
    '关', '系', '再', '见', '早', '上', '晚', '上', '中', '午',
    '学', '习', '工', '作', '吃', '饭', '喝', '水', '去', '哪'
  ];

  return (
    <div className="w-full min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-hidden">
      {/* Main Content */}
      <main className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark relative">
        {/* Header */}
        <header className="h-16 px-4 sm:px-6 md:px-10 flex items-center justify-between bg-white/50 dark:bg-[#101922]/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200/50 dark:border-slate-800/50">
          <nav className="flex items-center gap-2 text-sm overflow-hidden whitespace-nowrap">
            <a className="text-text-sub hover:text-primary transition-colors" href="#">
              Courses
            </a>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <a className="text-text-sub hover:text-primary transition-colors" href="#">
              HSK Level 4
            </a>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-text-main dark:text-white font-medium truncate">
              Listening Practice: Lesson {currentQuestion}
            </span>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="material-symbols-outlined text-orange-500 text-[20px] icon-filled">
                local_fire_department
              </span>
              <span className="text-sm font-bold text-text-main dark:text-white">
                3 Day Streak
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 flex flex-col items-center">
          <div className="w-full max-w-[700px] flex flex-col gap-6 sm:gap-8">
            {/* Progress and Timer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
              <div className="flex-1 w-full">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-text-sub uppercase tracking-wider">
                    Question
                  </span>
                  <span className="text-sm font-bold text-text-main dark:text-white">
                    {currentQuestion}/{totalQuestions}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg shadow-sm w-full sm:w-auto">
                <span className="material-symbols-outlined text-text-sub">timer</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-text-main dark:text-white font-mono">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
            </div>

            {/* Dictation Card */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl sm:rounded-2xl shadow-card border border-slate-200 dark:border-slate-700 p-6 sm:p-8 md:p-12 flex flex-col items-center gap-8 sm:gap-10 relative overflow-hidden">
              {/* Decorative top line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              
              {/* Audio Player Section */}
              <div className="flex flex-col items-center gap-6 z-10">
                <div className="relative group">
                  {/* Animated rings */}
                  {isPlaying && (
                    <>
                      <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 animate-ping" />
                      <div className="absolute inset-0 bg-primary/20 rounded-full scale-125 group-hover:scale-150 transition-transform duration-500" />
                    </>
                  )}
                  
                  <button
                    onClick={playAudio}
                    disabled={isPlaying}
                    className={`relative size-20 sm:size-24 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 z-10 ${
                      isPlaying ? 'cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined text-4xl sm:text-5xl icon-filled ml-1">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                </div>
                
                {/* Listening indicator */}
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" />
                  <span className="h-1 w-1 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="h-1 w-1 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="text-sm font-medium text-text-sub ml-1">
                    {isPlaying ? 'Playing...' : 'Listen and type'}
                  </span>
                </div>
              </div>

              {/* Text Input Area */}
              <div className="w-full z-10">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={isSubmitted}
                    className={`w-full bg-slate-50 dark:bg-[#151f2b] border-2 rounded-xl px-4 py-6 text-center text-xl sm:text-2xl md:text-3xl font-chinese text-text-main dark:text-white focus:border-primary focus:ring-0 placeholder:text-slate-300 dark:placeholder:text-slate-600 resize-none transition-all shadow-inner min-h-[120px] sm:min-h-[140px] ${
                      isCorrect === true
                        ? 'border-green-500'
                        : isCorrect === false
                        ? 'border-red-500'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                    placeholder="在此输入..."
                    rows="2"
                  />
                  
                  <div className="absolute bottom-3 right-3 text-xs text-text-sub font-mono opacity-50">
                    {userInput.length} chars
                  </div>
                </div>
                
                {/* Hint and Virtual Keypad Buttons */}
                <div className="flex justify-between mt-3 px-1">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs text-text-sub hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">help</span>
                    Hint
                  </button>
                  
                  <button
                    onClick={() => setShowVirtualKeypad(!showVirtualKeypad)}
                    className="text-xs text-text-sub hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">keyboard</span>
                    Virtual Keypad
                  </button>
                </div>
                
                {/* Hint Display */}
                {showHint && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Hint: This sentence contains common greetings and daily expressions.
                    </p>
                  </div>
                )}
                
                {/* Virtual Keypad */}
                {showVirtualKeypad && (
                  <div className="mt-4 p-4 bg-slate-50 dark:bg-[#151f2b] rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                      {chineseCharacters.map((char, index) => (
                        <button
                          key={index}
                          onClick={() => setUserInput(prev => prev + char)}
                          className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-primary hover:text-white transition-colors text-lg font-chinese"
                        >
                          {char}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setUserInput(prev => prev.slice(0, -1))}
                        className="flex-1 p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      >
                        Backspace
                      </button>
                      <button
                        onClick={() => setUserInput('')}
                        className="flex-1 p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="w-full pt-2 z-10">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitted || userInput.trim().length === 0}
                  className={`w-full py-3 sm:py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 group ${
                    isSubmitted
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary-dark hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  <span className="text-white">
                    {isSubmitted
                      ? isCorrect === true
                        ? '✓ Correct!'
                        : isCorrect === false
                        ? '✗ Try Again'
                        : 'Checking...'
                      : 'Check Answer'}
                  </span>
                  {!isSubmitted && (
                    <span className="material-symbols-outlined text-white group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="flex justify-center flex-wrap gap-3 sm:gap-4 md:gap-6 text-xs text-text-sub mt-2 sm:mt-4">
              <div className="flex items-center gap-2">
                <kbd className="min-w-[24px] h-6 px-1.5 flex items-center justify-center rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-sans font-medium text-text-main dark:text-slate-300 shadow-sm">
                  Space
                </kbd>
                <span>Replay Audio</span>
              </div>
              
              <div className="flex items-center gap-2">
                <kbd className="min-w-[24px] h-6 px-1.5 flex items-center justify-center rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-sans font-medium text-text-main dark:text-slate-300 shadow-sm">
                  Ctrl + Enter
                </kbd>
                <span>Check Answer</span>
              </div>
              
              <div className="flex items-center gap-2">
                <kbd className="min-w-[24px] h-6 px-1.5 flex items-center justify-center rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-sans font-medium text-text-main dark:text-slate-300 shadow-sm">
                  Esc
                </kbd>
                <span>Skip & Replay</span>
              </div>
            </div>

            {/* Result Feedback */}
            {isSubmitted && isCorrect !== null && (
              <div className={`mt-4 p-4 rounded-lg border ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-2xl ${
                    isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {isCorrect ? 'check_circle' : 'error'}
                  </span>
                  <div>
                    <h4 className={`font-bold ${
                      isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                    }`}>
                      {isCorrect ? 'Well done!' : 'Incorrect answer'}
                    </h4>
                    <p className="text-sm text-text-sub mt-1">
                      {isCorrect
                        ? 'You typed the sentence correctly! Moving to next question...'
                        : 'Listen carefully and try again. Pay attention to pronunciation.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap');
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .icon-filled {
          font-variation-settings: 'FILL' 1;
        }
        
        /* Smooth transitions */
        * {
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }
      `}</style>
    </div>
  );
}