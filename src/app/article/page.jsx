'use client';
import { useState, useRef } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Settings, 
  ArrowLeft, 
  Volume2, 
  ChevronDown, 
  X, 
  Plus,
  Menu,
  X as XIcon,
  BookOpen,
  Clock,
  Target
} from "lucide-react";

export default function ArticlePage() {
  // State declarations
  const [selectedWord, setSelectedWord] = useState(null);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [fontSize, setFontSize] = useState("text-2xl");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [progress, setProgress] = useState(35);
  const [currentTime, setCurrentTime] = useState("01:17");
  const [totalTime, setTotalTime] = useState("03:45");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("vocab");

  const audioRef = useRef(null);

  // Data
  const sentences = [
    {
      id: 1,
      pinyin: "Jīntiān wǒmen qù chī huǒguō ba.",
      chinese: "今天我们去吃火锅吧。",
      vietnamese: "Hôm nay chúng ta đi ăn lẩu nhé。",
      words: [
        { text: "今天", pinyin: "jīntiān", meaning: "hôm nay" },
        { text: "我们", pinyin: "wǒmen", meaning: "chúng ta" },
        { text: "去", pinyin: "qù", meaning: "đi" },
        { text: "吃", pinyin: "chī", meaning: "ăn" },
        { text: "火锅", pinyin: "huǒguō", meaning: "lẩu", hskLevel: "HSK 2" },
        { text: "吧", pinyin: "ba", meaning: "nhé (trợ từ)" },
      ],
    },
    {
      id: 2,
      pinyin: "Nà jiā cāntīng hěn yǒumíng, tīng shuō wèidào fēicháng hǎo.",
      chinese: "那家餐厅很有名，听说味道非常好。",
      vietnamese: "Nhà hàng đó rất nổi tiếng，nghe nói mùi vị rất ngon。",
      words: [
        { text: "那", pinyin: "nà", meaning: "đó" },
        { text: "家", pinyin: "jiā", meaning: "nhà (lượng từ)" },
        { text: "餐厅", pinyin: "cāntīng", meaning: "nhà hàng" },
        { text: "很", pinyin: "hěn", meaning: "rất" },
        { text: "有名", pinyin: "yǒumíng", meaning: "nổi tiếng" },
        { text: "听说", pinyin: "tīng shuō", meaning: "nghe nói" },
        { text: "味道", pinyin: "wèidào", meaning: "mùi vị" },
        { text: "非常", pinyin: "fēicháng", meaning: "rất, cực kỳ" },
        { text: "好", pinyin: "hǎo", meaning: "ngon, tốt" },
      ],
    },
    {
      id: 3,
      pinyin: "Wǒmen yào yùdìng zhuōzi ma?",
      chinese: "我们要预订桌子吗？",
      vietnamese: "Chúng ta có cần đặt bàn trước không?",
      words: [
        { text: "我们", pinyin: "wǒmen", meaning: "chúng ta" },
        { text: "要", pinyin: "yào", meaning: "cần" },
        { text: "预订", pinyin: "yùdìng", meaning: "đặt trước" },
        { text: "桌子", pinyin: "zhuōzi", meaning: "bàn" },
        { text: "吗", pinyin: "ma", meaning: "không (trợ từ nghi vấn)" },
      ],
    },
    {
      id: 4,
      pinyin: "Bùyòng, wǒ yǐjīng dìng hǎo le.",
      chinese: "不用，我已经订好了。",
      vietnamese: "Không cần đâu，tớ đã đặt xong rồi。",
      words: [
        { text: "不用", pinyin: "bùyòng", meaning: "không cần" },
        { text: "我", pinyin: "wǒ", meaning: "tôi, tớ" },
        { text: "已经", pinyin: "yǐjīng", meaning: "đã" },
        { text: "订", pinyin: "dìng", meaning: "đặt" },
        { text: "好", pinyin: "hǎo", meaning: "xong, tốt" },
        { text: "了", pinyin: "le", meaning: "rồi (trợ từ)" },
      ],
    },
  ];

  const vocabularyList = [
    { chinese: "火锅", pinyin: "huǒguō", meaning: "lẩu", hsk: "HSK 2" },
    { chinese: "预订", pinyin: "yùdìng", meaning: "đặt trước", hsk: "HSK 3" },
    { chinese: "味道", pinyin: "wèidào", meaning: "mùi vị", hsk: "HSK 2" },
    { chinese: "有名", pinyin: "yǒumíng", meaning: "nổi tiếng", hsk: "HSK 3" },
    { chinese: "餐厅", pinyin: "cāntīng", meaning: "nhà hàng", hsk: "HSK 2" },
    { chinese: "不用", pinyin: "bùyòng", meaning: "không cần", hsk: "HSK 2" },
  ];

  const fontSizeOptions = [
    { label: "Nhỏ", value: "text-xl" },
    { label: "Vừa", value: "text-2xl" },
    { label: "Lớn", value: "text-3xl" },
    { label: "Rất lớn", value: "text-4xl" },
  ];

  // Event handlers
  const handleWordClick = (word) => {
    setSelectedWord({
      chinese: word.text,
      pinyin: word.pinyin,
      meaning: word.meaning,
      hskLevel: word.hskLevel || "HSK 1",
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const newProgress = Math.min(100, Math.max(0, percentage));
    setProgress(newProgress);
    
    const totalSeconds = 225;
    const currentSeconds = Math.floor((newProgress / 100) * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    setCurrentTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  };

  const handleSpeedChange = () => {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-gray-100 font-sans antialiased h-screen flex flex-col transition-colors duration-200">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between px-4 md:px-6 py-3 shrink-0 bg-[#f6f7f8] dark:bg-[#101922] border-b border-gray-200 dark:border-white/10 z-50">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#0d141b] dark:text-white" />
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium uppercase tracking-wider text-[#4c739a] dark:text-gray-400">
              Bài 15
            </span>
            <h1 className="text-base font-bold text-[#0d141b] dark:text-white">
              Tại nhà hàng
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              <span className="text-sm font-medium text-[#0d141b] dark:text-white">
                {isDarkMode ? '🌙' : '☀️'}
              </span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5 text-[#0d141b] dark:text-white" />
            </button>
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              {showMobileMenu ? (
                <XIcon className="w-5 h-5 text-[#0d141b] dark:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-[#0d141b] dark:text-white" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-[#101922] border-b border-gray-200 dark:border-gray-700 z-40 p-4 shadow-lg">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowPinyin(!showPinyin)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg ${
                  showPinyin
                    ? "bg-[#137fec]/20 border border-[#137fec] text-[#137fec]"
                    : "bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[#0d141b] dark:text-gray-300"
                }`}
              >
                <span className="font-medium">Hiển thị Pinyin</span>
                <div className={`w-10 h-6 rounded-full relative ${showPinyin ? 'bg-[#137fec]' : 'bg-gray-400'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${showPinyin ? 'right-1' : 'left-1'}`}></div>
                </div>
              </button>
              
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg ${
                  showTranslation
                    ? "bg-[#137fec]/20 border border-[#137fec] text-[#137fec]"
                    : "bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[#0d141b] dark:text-gray-300"
                }`}
              >
                <span className="font-medium">Hiển thị bản dịch</span>
                <div className={`w-10 h-6 rounded-full relative ${showTranslation ? 'bg-[#137fec]' : 'bg-gray-400'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${showTranslation ? 'right-1' : 'left-1'}`}></div>
                </div>
              </button>
              
              <div className="px-4 py-3">
                <span className="font-medium mb-2 block">Cỡ chữ</span>
                <div className="flex gap-2">
                  {fontSizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFontSize(option.value)}
                      className={`px-3 py-1.5 rounded-lg border ${
                        fontSize === option.value
                          ? "bg-[#137fec] text-white border-[#137fec]"
                          : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-[#0d141b] dark:text-gray-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
              >
                <span className="font-medium">Chế độ tối</span>
                <div className={`w-10 h-6 rounded-full relative ${isDarkMode ? 'bg-[#137fec]' : 'bg-gray-400'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${isDarkMode ? 'right-1' : 'left-1'}`}></div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Panel - Reading Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Hero Section */}
            <div className="px-4 md:px-8 pt-6 pb-2">
              <div className="flex items-start justify-between max-w-6xl mx-auto">
                <div>
                  <h2 className="text-3xl md:text-4xl font-chinese font-bold text-[#0d141b] dark:text-white mb-1">
                    在餐厅
                  </h2>
                  <p className="text-lg md:text-xl text-[#137fec] font-medium">
                    Zài cāntīng
                  </p>
                </div>
                
                {/* Progress Indicator */}
                <div className="hidden md:flex flex-col items-end gap-2">
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200 dark:text-white/10"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="text-[#137fec]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="75, 100"
                        strokeWidth="3"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#4c739a] dark:text-gray-400">
                      75%
                    </span>
                  </div>
                  <span className="text-xs text-[#4c739a] dark:text-gray-400">Hoàn thành</span>
                </div>
              </div>
            </div>

            {/* Control Toolbar - Desktop */}
            <div className="hidden md:flex sticky top-0 z-20 bg-[#f6f7f8]/95 dark:bg-[#101922]/95 backdrop-blur-sm px-8 py-3 border-b border-gray-200 dark:border-white/5 gap-3">
              <button
                onClick={() => setShowPinyin(!showPinyin)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  showPinyin
                    ? "bg-[#137fec]/20 border-[#137fec] text-[#137fec]"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-[#0d141b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <span className="font-medium">Pinyin</span>
              </button>

              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  showTranslation
                    ? "bg-[#137fec]/20 border-[#137fec] text-[#137fec]"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-[#0d141b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <span className="font-medium">Tiếng Việt</span>
              </button>

              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[#0d141b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span>Cỡ chữ</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {fontSizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFontSize(option.value)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[#0d141b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 ml-auto"
              >
                <span>{isDarkMode ? '🌙' : '☀️'}</span>
                <span>Chế độ {isDarkMode ? 'tối' : 'sáng'}</span>
              </button>
            </div>

            {/* Reading Content */}
            <div className="px-4 md:px-8 py-6 space-y-6 md:space-y-8 max-w-6xl mx-auto">
              {sentences.map((sentence) => (
                <div
                  key={sentence.id}
                  className="group/sentence relative pl-4 border-l-2 border-transparent hover:border-[#137fec] transition-all duration-300"
                >
                  {/* Pinyin Line */}
                  {showPinyin && (
                    <p className="text-sm md:text-base font-medium text-[#137fec] mb-2 tracking-wide">
                      {sentence.pinyin}
                    </p>
                  )}

                  {/* Chinese Characters Line */}
                  <div className={`${fontSize} font-chinese font-medium leading-relaxed text-[#0d141b] dark:text-white mb-2`}>
                    {sentence.words.map((word, index) => {
                      const isSelected = selectedWord?.chinese === word.text;
                      return (
                        <span
                          key={index}
                          onClick={() => handleWordClick(word)}
                          className={`cursor-pointer rounded px-0.5 transition-colors ${
                            isSelected
                              ? "bg-[#137fec]/20 text-[#137fec]"
                              : "hover:bg-[#137fec]/10 hover:text-[#137fec]"
                          }`}
                        >
                          {word.text}
                        </span>
                      );
                    })}
                  </div>

                  {/* Vietnamese Translation Line */}
                  {showTranslation && (
                    <p className="text-base text-[#4c739a] dark:text-gray-400 font-normal leading-relaxed">
                      {sentence.vietnamese}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Dictionary & Notes (Desktop) */}
          <div className="hidden lg:flex w-96 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-[#101922] flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("vocab")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 ${
                  activeTab === "vocab"
                    ? "bg-[#137fec]/10 text-[#137fec] border-b-2 border-[#137fec]"
                    : "text-[#4c739a] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="font-medium">Từ vựng</span>
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 ${
                  activeTab === "notes"
                    ? "bg-[#137fec]/10 text-[#137fec] border-b-2 border-[#137fec]"
                    : "text-[#4c739a] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Target className="w-4 h-4" />
                <span className="font-medium">Ghi chú</span>
              </button>
              <button
                onClick={() => setActiveTab("progress")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 ${
                  activeTab === "progress"
                    ? "bg-[#137fec]/10 text-[#137fec] border-b-2 border-[#137fec]"
                    : "text-[#4c739a] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="font-medium">Tiến độ</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === "vocab" && (
                <div className="p-4">
                  <div className="mb-6">
                    <h3 className="font-bold text-lg text-[#0d141b] dark:text-white mb-3">Từ đã chọn</h3>
                    {selectedWord ? (
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-chinese font-bold text-[#0d141b] dark:text-white">
                              {selectedWord.chinese}
                            </span>
                            <span className="text-sm text-[#137fec] font-medium">{selectedWord.pinyin}</span>
                          </div>
                          <span className="text-xs font-medium text-[#4c739a] border border-gray-300 dark:border-gray-600 px-2 py-1 rounded">
                            {selectedWord.hskLevel}
                          </span>
                        </div>
                        <p className="text-[#4c739a] dark:text-gray-300 mb-3">{selectedWord.meaning}</p>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#137fec] text-white rounded-lg hover:bg-[#0b5ed7] transition-colors text-sm">
                          <Plus className="w-4 h-4" />
                          Thêm vào sổ từ
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-[#4c739a] dark:text-gray-400">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-gray-400" />
                        </div>
                        <p>Nhấn vào từ trong bài để tra nghĩa</p>
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-lg text-[#0d141b] dark:text-white mb-3">Từ vựng trong bài</h3>
                  <div className="space-y-2">
                    {vocabularyList.map((word, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                        onClick={() => setSelectedWord(word)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-chinese font-bold text-[#0d141b] dark:text-white">
                            {word.chinese}
                          </span>
                          <span className="text-sm text-[#4c739a] dark:text-gray-400">{word.pinyin}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-[#4c739a] border border-gray-300 dark:border-gray-600 px-2 py-1 rounded">
                            {word.hsk}
                          </span>
                          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                            <Plus className="w-4 h-4 text-[#4c739a] dark:text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "notes" && (
                <div className="p-4">
                  <h3 className="font-bold text-lg text-[#0d141b] dark:text-white mb-4">Ghi chú ngữ pháp</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#137fec]"></div>
                        <span className="font-medium text-[#0d141b] dark:text-white">Trợ từ 吧 (ba)</span>
                      </div>
                      <p className="text-sm text-[#4c739a] dark:text-gray-300">
                        Đặt cuối câu để thể hiện đề nghị, gợi ý một cách lịch sự. Ví dụ: 我们去吃火锅吧。
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="font-medium text-[#0d141b] dark:text-white">已经...了 (yǐjīng...le)</span>
                      </div>
                      <p className="text-sm text-[#4c739a] dark:text-gray-300">
                        Biểu thị hành động đã hoàn thành. Ví dụ: 我已经订好了。
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span className="font-medium text-[#0d141b] dark:text-white">听说 (tīng shuō)</span>
                      </div>
                      <p className="text-sm text-[#4c739a] dark:text-gray-300">
                        Cụm từ dùng để bắt đầu thông tin nghe được từ người khác. Ví dụ: 听说味道非常好。
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-[#0d141b] dark:text-white mb-3">Thêm ghi chú</h4>
                    <textarea 
                      className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-[#0d141b] dark:text-white"
                      placeholder="Viết ghi chú của bạn ở đây..."
                    />
                    <button className="w-full mt-2 px-4 py-2 bg-[#137fec] text-white rounded-lg hover:bg-[#0b5ed7] transition-colors">
                      Lưu ghi chú
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "progress" && (
                <div className="p-4">
                  <h3 className="font-bold text-lg text-[#0d141b] dark:text-white mb-6">Tiến độ học tập</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#4c739a] dark:text-gray-400">Hoàn thành bài học</span>
                        <span className="font-bold text-[#0d141b] dark:text-white">75%</span>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#137fec] rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#4c739a] dark:text-gray-400">Từ vựng đã học</span>
                        <span className="font-bold text-[#0d141b] dark:text-white">8/12 từ</span>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '66%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#4c739a] dark:text-gray-400">Ngữ pháp nắm được</span>
                        <span className="font-bold text-[#0d141b] dark:text-white">3/5 điểm</span>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium text-[#0d141b] dark:text-white mb-3">Thống kê học tập</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-[#137fec]">24</div>
                          <div className="text-xs text-[#4c739a] dark:text-gray-400">Phút học</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-green-500">86%</div>
                          <div className="text-xs text-[#4c739a] dark:text-gray-400">Độ chính xác</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-purple-500">5</div>
                          <div className="text-xs text-[#4c739a] dark:text-gray-400">Bài đã học</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-orange-500">42</div>
                          <div className="text-xs text-[#4c739a] dark:text-gray-400">Từ đã lưu</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Word Info Card (Mobile) */}
        {selectedWord && (
          <div className="lg:hidden fixed inset-0 top-16 z-40 bg-black/50 flex items-end">
            <div className="w-full bg-white dark:bg-[#101922] rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto" style={{ animation: 'slide-up 0.3s ease-out' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-[#0d141b] dark:text-white">Tra từ</h3>
                <button 
                  onClick={() => setSelectedWord(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5 text-[#4c739a] dark:text-gray-400" />
                </button>
              </div>
              
              <div className="flex items-start gap-3 mb-6">
                <div className="bg-[#137fec]/10 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-3xl font-chinese font-bold text-[#0d141b] dark:text-white">
                    {selectedWord.chinese}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xl text-[#0d141b] dark:text-white">
                      {selectedWord.pinyin}
                    </h4>
                    <span className="text-xs font-medium text-[#4c739a] border border-gray-300 dark:border-gray-600 px-2 py-1 rounded">
                      {selectedWord.hskLevel}
                    </span>
                  </div>
                  <p className="text-base text-[#4c739a] dark:text-gray-300">
                    {selectedWord.meaning}
                  </p>
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#137fec] text-white rounded-lg hover:bg-[#0b5ed7] transition-colors font-medium">
                <Plus className="w-5 h-5" />
                Thêm vào sổ từ
              </button>
            </div>
          </div>
        )}

        {/* Audio Player Footer */}
        <footer className="fixed bottom-0 left-0 w-full z-40 bg-white dark:bg-[#101922] border-t border-gray-300 dark:border-gray-700 pb-5 pt-3 px-4 shadow-lg">
          <div className="max-w-6xl mx-auto">
            {/* Progress Bar */}
            <div
              className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 group cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="absolute top-0 left-0 h-full bg-[#137fec] rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 w-4 h-4 bg-white dark:bg-gray-200 rounded-full shadow-md -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>

            <div className="flex items-center justify-between">
              {/* Time Display */}
              <span className="text-sm font-medium text-[#4c739a] dark:text-gray-400 w-16">
                {currentTime}
              </span>

              {/* Main Controls */}
              <div className="flex items-center gap-4 md:gap-6">
                <button 
                  onClick={handleSpeedChange}
                  className="text-sm font-medium text-[#4c739a] dark:text-gray-400 hover:text-[#0d141b] dark:hover:text-white px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {playbackSpeed}x
                </button>
                
                <div className="flex items-center gap-3">
                  <button className="text-[#4c739a] dark:text-gray-400 hover:text-[#0d141b] dark:hover:text-white transition-colors p-2">
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handlePlayPause}
                    className="flex items-center justify-center w-12 h-12 bg-[#137fec] rounded-full text-white hover:bg-[#0b5ed7] hover:scale-105 transition-all shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>

                  <button className="text-[#4c739a] dark:text-gray-400 hover:text-[#0d141b] dark:hover:text-white transition-colors p-2">
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
                
                <button className="text-[#4c739a] dark:text-gray-400 hover:text-[#0d141b] dark:hover:text-white transition-colors p-2">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Total Time */}
              <span className="text-sm font-medium text-[#4c739a] dark:text-gray-400 w-16 text-right">
                {totalTime}
              </span>
            </div>

            {/* Mobile Progress Info */}
            <div className="lg:hidden flex justify-between mt-2 px-1">
              <span className="text-xs text-[#4c739a] dark:text-gray-400">
                Đang phát: Bài 15 - Tại nhà hàng
              </span>
              <span className="text-xs text-[#4c739a] dark:text-gray-400">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </footer>

        {/* CSS Animation */}
        <style jsx>{`
          @keyframes slide-up {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}