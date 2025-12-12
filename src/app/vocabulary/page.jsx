// pages/vocabulary-practice.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';

export default function VocabularyPractice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [words, setWords] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const audioRef = useRef(null);

  // Fetch data từ API
  useEffect(() => {
    fetchVocabularyData();
  }, []);

  const fetchVocabularyData = async () => {
    try {
      setIsLoading(true);
      // Thay thế URL này bằng endpoint thực tế của bạn
      const response = await fetch('http://127.0.0.1:8000/api/vocabulary/');
      const data = await response.json();

      if (data && data.results.length > 0) {
        setWords(data.results);
        setProgress(1);
      }
    } catch (error) {
      console.error('Error fetching vocabulary:', error);
      // Fallback data nếu API fail
      const fallbackData = [
        {
          id: 1,
          imageURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuADNLPbYRZ1-S6tfyh0aAy0i0QetvzxD9FNbJWQ6wQ_0AtGlQpaXgDAtUms1e1_HmhQQkYQ1pfzjLvDWhP6VI4z9I-VCp_y9hVvHorUNA4LkjB4y3mYQfvvsodVqDdAuAMLuoDBWmbT04wImoOTCJ6eUXE8N9x0vJ0RN4YWqNJQ-KxwI1id_udSbdkVLFmUJeG35fUuKNCQzvPPZWN6wbrNEnUxlw71H0H3e7I6L3G3TPEEnxfn8gP2PNKSD-37utULsrR7xwlgVts",
          chinese: "苹果",
          english: "apple",
          vietnamese: "Quả táo",
          pinyin: "píng guǒ",
          audioLink: "https://example.com/audio/apple.mp3"
        },
        {
          id: 2,
          imageURL: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
          chinese: "水",
          english: "water",
          vietnamese: "Nước",
          pinyin: "shuǐ",
          audioLink: "https://example.com/audio/water.mp3"
        },
        // Thêm nhiều từ hơn...
      ];
      setWords(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheck = () => {
    if (!words[currentIndex]) return;

    const correct = userInput.trim() === words[currentIndex].chinese;
    setIsCorrect(correct);
    setShowResult(true);

    // Tự động chuyển từ sau 2 giây
    setTimeout(() => {
      handleNext();
    }, 2000);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(prev => prev + 1);
    } else {
      // Đã hoàn thành tất cả từ
      alert('Chúc mừng! Bạn đã hoàn thành bài luyện tập!');
      // Có thể reset hoặc fetch bài mới
      fetchVocabularyData();
      setCurrentIndex(0);
      setProgress(1);
    }

    // Reset state
    setUserInput('');
    setShowResult(false);
    setHintUsed(false);
    setShowHint(false);
  };

  const handleSkip = () => {
    handleNext();
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audioUrl = words[currentIndex]?.audioLink;
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play().catch(e => console.error('Audio play failed:', e));
    }
  };

  const handleShowHint = () => {
    if (!hintUsed) {
      setShowHint(true);
      setHintUsed(true);

      // Ẩn hint sau 3 giây
      setTimeout(() => {
        setShowHint(false);
      }, 3000);
    }
  };

  const getHint = () => {
    if (!words[currentIndex]) return '';
    const word = words[currentIndex].chinese;
    if (word.length > 1) {
      return `Gợi ý: Từ này có ${word.length} chữ Hán`;
    }
    return `Gợi ý: Từ này có 1 chữ Hán`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-sub">Đang tải từ vựng...</p>
        </div>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-text-sub mb-4">
            sentiment_dissatisfied
          </span>
          <p className="text-text-sub">Không có từ vựng nào để luyện tập</p>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
          {/* Progress Section */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl md:text-2xl font-bold font-display">
                Luyện tập từ vựng
              </h1>
              <div className="text-primary font-semibold tabular-nums">
                {progress}/{words.length}
              </div>
            </div>

            <div className="h-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out shadow-glow"
                style={{ width: `${(progress / words.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Result Overlay */}
          {showResult && (
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
              } backdrop-blur-sm`}>
              <div className={`p-8 rounded-2xl shadow-2xl ${isCorrect
                  ? 'bg-gradient-to-br from-green-400 to-emerald-600'
                  : 'bg-gradient-to-br from-red-400 to-rose-600'
                }`}>
                <div className="text-center text-white">
                  <span className="material-symbols-outlined text-6xl mb-4">
                    {isCorrect ? 'celebration' : 'sentiment_dissatisfied'}
                  </span>
                  <h2 className="text-3xl font-bold mb-2">
                    {isCorrect ? 'Chính xác! 🎉' : 'Sai rồi! 😢'}
                  </h2>
                  <p className="text-xl mb-4">
                    {currentWord.chinese} - {currentWord.vietnamese}
                  </p>
                  <p className="text-lg opacity-90">
                    Chuyển từ tiếp theo...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Game Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            {/* Left Column */}
            <div className="space-y-6 md:space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900">
                <div className="p-4 md:p-6">
                  {/* Word Info Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-sm font-medium text-primary uppercase tracking-wider">
                        Từ vựng #{currentIndex + 1}
                      </span>
                      <p className="text-xs text-text-sub mt-1">
                        {currentWord.english}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleShowHint}
                        className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                        disabled={hintUsed}
                      >
                        <span className="material-symbols-outlined">
                          lightbulb
                        </span>
                      </button>
                      <button
                        onClick={() => {/* Implement bookmark */ }}
                        className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined">
                          bookmark
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 relative group">
                    <img
                      src={currentWord.image_url}
                      alt={currentWord.english}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Vocabulary Details */}
                  <div className="space-y-6">
                    {/* Pinyin & Audio */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-2xl md:text-3xl font-bold mb-1 text-primary">
                          {currentWord.pinyin}
                        </div>
                        <div className="text-sm text-text-sub">
                          Phiên âm
                        </div>
                      </div>
                      <button
                        onClick={handlePlayAudio}
                        className="flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors group"
                      >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                          volume_up
                        </span>
                        <span>Nghe phát âm</span>
                      </button>
                    </div>

                    {/* Vietnamese Meaning */}
                    <div className="p-4 md:p-6 rounded-xl bg-gray-50 dark:bg-gray-800 text-center">
                      <div className="text-3xl md:text-4xl font-bold mb-2">
                        {currentWord.vietnamese}
                      </div>
                      <div className="text-sm text-text-sub">
                        Nghĩa tiếng Việt
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hint Display */}
              {showHint && (
                <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">
                      lightbulb
                    </span>
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                        Gợi ý
                      </h4>
                      <p className="text-yellow-700 dark:text-yellow-400">
                        {getHint()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Input & Actions */}
            <div className="space-y-6 md:space-y-8">
              <div className="rounded-2xl p-6 md:p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Điền từ tiếng Trung</h2>
                    <p className="text-text-sub">
                      Nhập chữ Hán tương ứng với nghĩa bên cạnh
                    </p>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-3">
                    <label htmlFor="vocab-input" className="block text-sm font-medium text-text-sub">
                      Nhập chữ Hán cho: <span className="font-semibold text-primary">{currentWord.vietnamese}</span>
                    </label>
                    <div className="relative">
                      <input
                        id="vocab-input"
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Nhập chữ Hán tại đây..."
                        className="w-full px-6 py-4 text-2xl md:text-3xl font-bold text-center rounded-xl border-2 transition-all bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleCheck();
                          }
                        }}
                      />
                      {userInput && (
                        <button
                          onClick={() => setUserInput('')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub hover:text-primary"
                        >
                          <span className="material-symbols-outlined">close</span>
                        </button>
                      )}
                    </div>

                    {/* Character Count */}
                    <div className="text-sm text-text-sub text-center">
                      {userInput.length} / {currentWord.chinese.length} ký tự
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={handleCheck}
                      disabled={!userInput.trim()}
                      className={`w-full group relative overflow-hidden rounded-xl font-bold py-4 md:py-5 text-lg shadow-lg transition-all duration-300 active:scale-[0.98] ${userInput.trim()
                          ? 'bg-primary hover:bg-primary-dark text-white shadow-glow'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span>Kiểm tra</span>
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                          check_circle
                        </span>
                      </div>
                    </button>

                    <div className="flex gap-4">
                      <button
                        onClick={handleSkip}
                        className="flex-1 py-3 text-text-sub hover:text-primary font-medium transition-colors border border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary"
                      >
                        Bỏ qua
                      </button>
                      <button
                        onClick={() => {
                          setUserInput(currentWord.chinese);
                          setHintUsed(true);
                        }}
                        disabled={hintUsed}
                        className={`flex-1 py-3 font-medium transition-colors rounded-lg ${hintUsed
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                          }`}
                      >
                        Hiển thị đáp án
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round((progress / words.length) * 100)}%
                  </div>
                  <div className="text-sm text-text-sub">Hoàn thành</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div className="text-2xl font-bold text-primary">
                    {currentIndex + 1}
                  </div>
                  <div className="text-sm text-text-sub">Hiện tại</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div className="text-2xl font-bold text-primary">
                    {words.length}
                  </div>
                  <div className="text-sm text-text-sub">Tổng số từ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Routes mẫu cho Next.js */}
      {/* pages/api/vocabulary.js */}
      {/* 
      export default function handler(req, res) {
        const vocabularyData = [
          {
            id: 1,
            imageURL: "https://example.com/apple.jpg",
            chinese: "苹果",
            english: "apple",
            vietnamese: "Quả táo",
            pinyin: "píng guǒ",
            audioLink: "https://example.com/audio/apple.mp3"
          },
          // Thêm nhiều từ hơn...
        ];
        
        res.status(200).json(vocabularyData);
      }
      */}
    </>
  );
}