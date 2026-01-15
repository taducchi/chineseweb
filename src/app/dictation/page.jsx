'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Mock service (replace with actual geminiService)
const geminiService = {
  generatePassage: async (level) => {
    // Mock data - replace with actual API call
    const passages = {
      beginner: {
        chinese: '你好，我叫小明。我今年二十岁。',
        pinyin: 'Nǐ hǎo, wǒ jiào Xiǎo Míng. Wǒ jīnnián èrshí suì.',
        meaning: 'Xin chào, tôi tên là Tiểu Minh. Tôi năm nay hai mươi tuổi.',
        topic: 'Chào hỏi cơ bản'
      },
      intermediate: {
        chinese: '今天天气很好，我们一起去公园散步吧。',
        pinyin: 'Jīntiān tiānqì hěn hǎo, wǒmen yīqǐ qù gōngyuán sànbù ba.',
        meaning: 'Hôm nay thời tiết rất đẹp, chúng ta cùng đi công viên đi dạo nhé.',
        topic: 'Thời tiết và hoạt động'
      },
      advanced: {
        chinese: '随着科技的快速发展，人工智能正在改变我们的生活方式。',
        pinyin: 'Suízhe kējì de kuàisù fāzhǎn, réngōng zhìnéng zhèngzài gǎibiàn wǒmen de shēnghuó fāngshì.',
        meaning: 'Với sự phát triển nhanh chóng của công nghệ, trí tuệ nhân tạo đang thay đổi cách sống của chúng ta.',
        topic: 'Công nghệ và xã hội'
      }
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      ...passages[level],
      level: level
    };
  },
  
  generateSpeech: async (text) => {
    // Mock audio generation - replace with actual TTS API
    // For now, we'll simulate with a timeout
    await new Promise(resolve => setTimeout(resolve, 300));
    // Return mock base64 audio (this would be actual audio data from API)
    return 'mock-audio-base64';
  }
};

const PracticePage = ({ level = 'intermediate', onBack }) => {
  const [loading, setLoading] = useState(true);
  const [passage, setPassage] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [audioBase64, setAudioBase64] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [accuracy, setAccuracy] = useState(95);
  const [score, setScore] = useState({ correct: 7, total: 10 });
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(38);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const audioContextRef = useRef(null);
  const audioSourceRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const levelNames = {
    beginner: 'Sơ cấp',
    intermediate: 'Trung cấp',
    advanced: 'Cao cấp'
  };

  const levelHSK = {
    beginner: 'HSK 1 - 2',
    intermediate: 'HSK 3 - 4',
    advanced: 'HSK 5 - 6'
  };

  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const accuracyPercentage = (score.correct / score.total) * 100;

  const fetchNewPassage = useCallback(async () => {
    setLoading(true);
    setUserInput('');
    setIsCorrect(null);
    setAudioBase64(null);
    setShowAnswer(false);
    setShowHint(false);
    setAudioProgress(0);
    setAudioCurrentTime(0);
    setPlaying(false);
    
    // Clear any existing audio
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    try {
      const p = await geminiService.generatePassage(level);
      setPassage(p);
      const audio = await geminiService.generateSpeech(p.chinese);
      setAudioBase64(audio);
    } catch (e) {
      console.error('Lỗi tải bài tập:', e);
    } finally {
      setLoading(false);
    }
  }, [level]);

  useEffect(() => {
    fetchNewPassage();
    
    // Cleanup on unmount
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [fetchNewPassage]);

  const decodeAudio = async (base64) => {
    try {
      // Mock decoding - in real app, decode actual base64 audio
      const ctx = new (window.AudioContext || window.webkitAudioContext)({ 
        sampleRate: 24000 
      });
      audioContextRef.current = ctx;

      // Create mock buffer (replace with actual audio decoding)
      const duration = 38; // seconds
      const sampleRate = 24000;
      const frameCount = sampleRate * duration;
      const buffer = ctx.createBuffer(1, frameCount, sampleRate);
      const channelData = buffer.getChannelData(0);
      
      // Generate a simple sine wave for mock audio
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.1;
      }
      
      return buffer;
    } catch (error) {
      console.error('Lỗi giải mã âm thanh:', error);
      throw error;
    }
  };

  const playAudio = async () => {
    if (!audioBase64 || playing) return;
    
    setPlaying(true);
    try {
      const buffer = await decodeAudio(audioBase64);
      const ctx = audioContextRef.current;
      if (!ctx) return;
      
      // Start progress simulation
      setAudioCurrentTime(0);
      setAudioProgress(0);
      
      progressIntervalRef.current = setInterval(() => {
        setAudioCurrentTime(prev => {
          const newTime = prev + 0.1;
          const progress = (newTime / audioDuration) * 100;
          setAudioProgress(progress);
          
          if (newTime >= audioDuration) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
              progressIntervalRef.current = null;
            }
            setPlaying(false);
            return 0;
          }
          return newTime;
        });
      }, 100);
      
      audioSourceRef.current = ctx.createBufferSource();
      audioSourceRef.current.buffer = buffer;
      audioSourceRef.current.connect(ctx.destination);
      
      audioSourceRef.current.onended = () => {
        setPlaying(false);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        setAudioProgress(100);
        setAudioCurrentTime(audioDuration);
      };
      
      audioSourceRef.current.start();
    } catch (error) {
      console.error('Lỗi phát âm thanh:', error);
      setPlaying(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  };

  const stopAudio = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setPlaying(false);
  };

  const handleProgressClick = (e) => {
    if (!audioBase64) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = (clickPosition / rect.width) * 100;
    const newTime = (percentage / 100) * audioDuration;
    
    setAudioProgress(Math.min(100, Math.max(0, percentage)));
    setAudioCurrentTime(newTime);
    
    // If audio is playing, we would seek to this position
    // For now, just update the visual progress
  };

  const checkResult = () => {
    if (!passage || !userInput.trim()) return;
    
    const cleanUser = userInput.replace(/[.,!?，。！？\s]/g, '');
    const cleanPassage = passage.chinese.replace(/[.,!?，。！？\s]/g, '');
    const correct = cleanUser === cleanPassage;
    setIsCorrect(correct);
    
    // Update score
    if (correct) {
      setScore(prev => ({
        correct: prev.correct + 1,
        total: prev.total + 1
      }));
    } else {
      setScore(prev => ({
        correct: prev.correct,
        total: prev.total + 1
      }));
    }
    
    // Move to next question if correct
    if (correct && currentQuestion < totalQuestions) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        fetchNewPassage();
      }, 1500);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
      fetchNewPassage();
    } else {
      // Completed all questions
      alert('Chúc mừng! Bạn đã hoàn thành tất cả bài tập!');
      onBack?.();
    }
  };

  const handleSkip = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
      fetchNewPassage();
    }
  };

  const handleShowHint = () => {
    setShowHint(!showHint);
  };

  const handleVirtualKeyboard = () => {
    // In a real app, this would toggle a virtual Chinese keyboard
    alert('Tính năng bàn phím ảo sẽ được thêm trong phiên bản sau!');
  };

  const handleBack = () => {
    stopAudio();
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    onBack?.();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space for play/pause
      if (e.code === 'Space' && !e.target.matches('textarea, input')) {
        e.preventDefault();
        if (playing) {
          stopAudio();
        } else {
          playAudio();
        }
      }
      
      // Enter for check answer
      if (e.code === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        checkResult();
      }
      
      // Escape for skip
      if (e.code === 'Escape') {
        handleSkip();
      }
      
      // N for next
      if (e.code === 'KeyN' && e.ctrlKey) {
        e.preventDefault();
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playing, userInput, passage, audioBase64]);

  if (loading) {
    return (
      <main className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[800px] flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-sub dark:text-gray-400">Đang tải bài tập...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[800px] flex flex-col gap-6">
        {/* Heading & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6h-4v-4h4v4z"/>
              </svg>
              <span>{levelHSK[level]} - Cấp độ {levelNames[level]}</span>
            </div>
            <h1 className="text-text-main dark:text-white text-3xl md:text-4xl font-bold leading-tight">
              Bài tập {currentQuestion}: {passage?.topic || 'Chủ đề'}
            </h1>
            <p className="text-text-sub dark:text-gray-400 text-base font-normal">
              Nghe đoạn âm thanh và viết lại chính xác bằng tiếng Trung (Hán tự).
            </p>
          </div>
          
          {/* Simple Score Widget */}
          <div className="hidden md:flex flex-col items-end gap-1 bg-white dark:bg-[#1a2632] px-4 py-2 rounded-lg border border-[#e5e8eb] dark:border-gray-700 shadow-sm">
            <span className="text-xs font-bold text-text-sub uppercase">Độ chính xác</span>
            <span className="text-xl font-bold text-green-600">{Math.round(accuracyPercentage)}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <p className="text-text-main dark:text-gray-200 text-sm font-bold">
              Câu {currentQuestion} / {totalQuestions}
            </p>
            <p className="text-text-sub dark:text-gray-500 text-xs font-medium">
              {Math.round(progressPercentage)}% Hoàn thành
            </p>
          </div>
          <div className="h-2.5 w-full bg-[#dbe0e6] dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Interaction Card */}
        <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-sm border border-[#e5e8eb] dark:border-gray-700 overflow-hidden flex flex-col">
          {/* Audio Player Section */}
          <div className="p-6 border-b border-[#f0f2f4] dark:border-gray-700 bg-background-light/50 dark:bg-gray-800/50">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                {/* Album Art / Visualization */}
                <div 
                  className="relative size-16 md:size-20 shrink-0 rounded-xl overflow-hidden shadow-md group cursor-pointer"
                  onClick={playing ? stopAudio : playAudio}
                >
                  <div className={`absolute inset-0 ${playing ? 'bg-primary/30' : 'bg-primary/20'} group-hover:bg-primary/30 transition-colors`}></div>
                  <div 
                    className="bg-center bg-no-repeat h-full w-full bg-cover"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA46Ok0GyinH0HU4M5ipOQK97CBxBQLNrgHGc09SHR-r5nVIsOzhcB1YVkruIbweGhkAUF2Q7DqlVq6q0zENJ9OWWaUu_HKxTmZU8d6k4ZhWPsZDsfKq_DL4R8vochdQNCwUSCwENMwrIN50LLjHdLWGUr6kB6m5_RmpUpIG4PnefgjskgAXspqDg8D-PQBGSW2YSw6RFCT7cMyPaPz4aV_ZXdvX7-uyf2JX-keTnn5q-1ympCDhs4N6KlEJF0DFQuqHLDvQkM6_5mv")'
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className={`text-primary ${playing ? 'text-2xl' : 'text-3xl'}`} fill="currentColor" viewBox="0 0 24 24">
                      {playing ? (
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      ) : (
                        <path d="M8 5v14l11-7z"/>
                      )}
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-text-main dark:text-white text-lg font-bold truncate">
                    Audio Câu {currentQuestion}
                  </h3>
                  <p className="text-text-sub dark:text-gray-400 text-sm truncate">
                    {passage?.topic || 'Bài học'}
                  </p>
                </div>
                
                {/* Big Play Button */}
                <button 
                  onClick={playing ? stopAudio : playAudio}
                  disabled={!audioBase64}
                  className="shrink-0 flex items-center justify-center rounded-full size-14 bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="text-3xl ml-1" fill="currentColor" viewBox="0 0 24 24">
                    {playing ? (
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    ) : (
                      <path d="M8 5v14l11-7z"/>
                    )}
                  </svg>
                </button>
              </div>
              
              {/* Scrubber */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-text-sub text-xs font-mono w-10 text-right">
                  {formatTime(audioCurrentTime)}
                </span>
                <div 
                  className="flex-1 h-8 flex items-center cursor-pointer group/scrubber"
                  onClick={handleProgressClick}
                >
                  <div className="relative w-full h-1.5 bg-[#dbe0e6] dark:bg-gray-600 rounded-full">
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary rounded-full"
                      style={{ width: `${audioProgress}%` }}
                    ></div>
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 size-4 bg-white border-2 border-primary rounded-full shadow-sm scale-0 group-hover/scrubber:scale-100 transition-transform"
                      style={{ left: `${audioProgress}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-text-sub text-xs font-mono w-10">
                  {formatTime(audioDuration)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Input Section */}
          <div className="p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="text-text-main dark:text-gray-200 text-base font-bold flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                Câu trả lời của bạn
              </label>
              <button 
                onClick={handleVirtualKeyboard}
                className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/>
                </svg>
                Bàn phím ảo
              </button>
            </div>
            
            <div className="relative group/input">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full min-h-[160px] resize-none rounded-xl border-2 border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 p-4 text-xl leading-relaxed text-text-main dark:text-white placeholder:text-text-sub/50 focus:border-primary focus:ring-0 focus:outline-none transition-all shadow-inner"
                placeholder="Nhập nội dung nghe được (Hán tự)..."
                disabled={playing}
              />
              {/* Character count */}
              <div className="absolute bottom-3 right-3 text-xs text-text-sub pointer-events-none bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded">
                {userInput.length} ký tự
              </div>
            </div>

            {/* Hint Section */}
            {showHint && passage && (
              <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                  <span className="font-semibold text-blue-700 dark:text-blue-300">Gợi ý:</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 text-sm">{passage.meaning}</p>
              </div>
            )}
          </div>
          
          {/* Action Footer */}
          <div className="p-6 pt-2 bg-white dark:bg-[#1a2632] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={handleShowHint}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#dbe0e6] dark:border-gray-600 text-text-sub dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                </svg>
                {showHint ? 'Ẩn gợi ý' : 'Gợi ý'}
              </button>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={handleSkip}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-text-sub hover:text-text-main dark:text-gray-400 dark:hover:text-white font-medium transition-colors"
              >
                Bỏ qua
              </button>
              <button 
                onClick={checkResult}
                disabled={!userInput.trim()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-base shadow-md shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Kiểm tra
              </button>
            </div>
          </div>

          {/* Result Display */}
          {isCorrect !== null && (
            <div className={`p-6 border-t ${
              isCorrect 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isCorrect 
                    ? 'bg-green-100 dark:bg-green-800' 
                    : 'bg-red-100 dark:bg-red-800'
                }`}>
                  {isCorrect ? (
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg ${
                    isCorrect 
                      ? 'text-green-700 dark:text-green-400' 
                      : 'text-red-700 dark:text-red-400'
                  }`}>
                    {isCorrect ? 'Chính xác! 🎉' : 'Chưa chính xác!'}
                  </h4>
                  <p className={`text-sm ${
                    isCorrect 
                      ? 'text-green-600 dark:text-green-500' 
                      : 'text-red-600 dark:text-red-500'
                  }`}>
                    {isCorrect 
                      ? 'Bạn đã chép chính xác đoạn văn!' 
                      : 'Đoạn văn của bạn chưa khớp với đáp án.'}
                  </p>
                </div>
                
                {isCorrect && currentQuestion < totalQuestions ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                  >
                    Tiếp theo →
                  </button>
                ) : !isCorrect ? (
                  <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
                  </button>
                ) : null}
              </div>
            </div>
          )}

          {/* Answer Reveal */}
          {showAnswer && passage && !isCorrect && (
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Đáp án chính xác:
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-xl text-gray-800 dark:text-white mb-2 font-chinese">
                    {passage.chinese}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {passage.pinyin}
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Ý nghĩa:</span> {passage.meaning}
                  </p>
                </div>
                
                <button
                  onClick={handleNextQuestion}
                  className="w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
                >
                  Tiếp tục với câu {currentQuestion + 1}
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Instructions / Keyboard Shortcuts Hint */}
        <div className="flex justify-center gap-6 text-text-sub text-xs opacity-70">
          <div className="flex items-center gap-1.5">
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-sans font-medium text-[10px]">
              Space
            </kbd>
            <span>Phát/Dừng</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-sans font-medium text-[10px]">
              Ctrl + Enter
            </kbd>
            <span>Kiểm tra</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-sans font-medium text-[10px]">
              Esc
            </kbd>
            <span>Bỏ qua</span>
          </div>
        </div>

        {/* Back button for mobile */}
        <div className="md:hidden mt-4">
          <button
            onClick={handleBack}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại chọn cấp độ
          </button>
        </div>
      </div>
    </main>
  );
};

export default PracticePage;