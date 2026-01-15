// components/lessons/ReadingLesson.jsx
'use client';

import { useState } from 'react';

export default function ReadingLesson() {
  const [showPinyin, setShowPinyin] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(77); // seconds
  const [duration, setDuration] = useState(143); // seconds
  const [notes, setNotes] = useState('');
  const [fontSize, setFontSize] = useState('text-[28px]');

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = () => {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const percentage = clickPosition / progressBarWidth;
    const newTime = Math.floor(duration * percentage);
    setCurrentTime(newTime);
  };

  const fontSizeOptions = [
    { value: 'text-[20px]', label: 'Nhỏ' },
    { value: 'text-[24px]', label: 'Vừa' },
    { value: 'text-[28px]', label: 'Lớn' },
    { value: 'text-[32px]', label: 'Rất lớn' },
  ];

  const vocabulary = [
    { chinese: "起床", pinyin: "qǐ chuáng", meaning: "Thức dậy", isHighlighted: false },
    { chinese: "学习", pinyin: "xué xí", meaning: "Học tập", isHighlighted: true },
    { chinese: "食堂", pinyin: "shí táng", meaning: "Nhà ăn", isHighlighted: false },
    { chinese: "图书馆", pinyin: "tú shū guǎn", meaning: "Thư viện", isHighlighted: false },
    { chinese: "汉语", pinyin: "Hàn yǔ", meaning: "Tiếng Hán", isHighlighted: false },
    { chinese: "宿舍", pinyin: "sù shè", meaning: "Ký túc xá", isHighlighted: false },
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-display">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative scroll-smooth">
        {/* Header Section */}
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-2 sm:pb-4">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 text-sm">
            <a className="text-[#617589] hover:text-primary transition-colors font-medium" href="#">
              Khóa học
            </a>
            <span className="text-[#617589] font-medium">/</span>
            <a className="text-[#617589] hover:text-primary transition-colors font-medium" href="#">
              Cấp độ 1
            </a>
            <span className="text-[#617589] font-medium">/</span>
            <a className="text-[#617589] hover:text-primary transition-colors font-medium" href="#">
              Bài 5
            </a>
            <span className="text-[#617589] font-medium">/</span>
            <span className="text-[#111418] dark:text-white font-medium">Bài đọc</span>
          </div>

          {/* Page Heading */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-200 dark:border-gray-800 pb-4 sm:pb-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-[#111418] dark:text-white tracking-tight text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight font-chinese">
                第五课：我的一天
              </h2>
              <p className="text-[#617589] dark:text-gray-400 text-base sm:text-lg font-normal leading-normal">
                Bài 5: Một ngày của tôi
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-[#111418] dark:text-gray-200 text-sm font-medium transition-colors bg-white dark:bg-transparent">
                <span className="material-symbols-outlined text-[20px]">bookmark_add</span>
                <span className="hidden sm:inline">Lưu bài</span>
              </button>
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span className="hidden sm:inline">Hoàn thành</span>
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar & Player Sticky Wrapper */}
        <div className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Media Player Compact */}
              <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full md:w-auto">
                <button 
                  onClick={togglePlayback}
                  className="flex shrink-0 items-center justify-center rounded-full size-8 sm:size-10 bg-primary hover:bg-blue-600 text-white transition-all shadow-md"
                >
                  <span className="material-symbols-outlined filled">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <div className="flex flex-col flex-1 max-w-md gap-1.5">
                  <div className="flex justify-between items-center text-xs text-[#617589] font-medium">
                    <span>{formatTime(currentTime)}</span>
                    <span>Giọng Bắc Kinh</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div 
                    className="relative h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer group"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="absolute h-full bg-primary rounded-full group-hover:bg-blue-600 transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    />
                    <div 
                      className="absolute h-3 w-3 bg-white border-2 border-primary rounded-full top-1/2 -translate-y-1/2 shadow-sm transform scale-0 group-hover:scale-100 transition-transform"
                      style={{ left: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                {/* Speed Control */}
                <button 
                  onClick={handleSpeedChange}
                  className="text-xs font-bold text-[#617589] hover:text-primary px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {playbackSpeed}x
                </button>
              </div>

              {/* Tools */}
              <div className="flex items-center gap-2 border-l pl-2 sm:pl-4 border-gray-300 dark:border-gray-700">
                <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <button 
                    onClick={() => setShowPinyin(true)}
                    className={`p-1.5 rounded transition-colors ${showPinyin ? 'bg-gray-100 dark:bg-gray-700 text-primary font-medium' : 'text-[#617589] hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'}`}
                    title="Hiện Pinyin"
                  >
                    <span className="text-sm font-bold">Pinyin</span>
                  </button>
                  <button 
                    onClick={() => setShowPinyin(false)}
                    className={`p-1.5 rounded transition-colors ${!showPinyin ? 'bg-gray-100 dark:bg-gray-700 text-primary font-medium' : 'text-[#617589] hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'}`}
                    title="Hiện Hán tự"
                  >
                    <span className="text-sm font-bold">汉</span>
                  </button>
                </div>
                
                {/* Font Size Dropdown */}
                <div className="relative group">
                  <button className="p-2 text-[#617589] hover:text-[#111418] dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Cỡ chữ">
                    <span className="material-symbols-outlined">format_size</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    {fontSizeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFontSize(option.value)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${fontSize === option.value ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button className="p-2 text-[#617589] hover:text-[#111418] dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Chế độ tập trung">
                  <span className="material-symbols-outlined">fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reading Content Grid */}
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8 pb-16 sm:pb-20">
          {/* Left: Main Text */}
          <div className="flex-1 min-w-0">
            <div className="bg-white dark:bg-[#111a22] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-sm border border-gray-100 dark:border-gray-800 relative">
              {/* Article Content */}
              <article className={`font-chinese leading-relaxed text-[#111418] dark:text-gray-100 ${fontSize}`}>
                <p className="mb-6 sm:mb-8">
                  {showPinyin ? (
                    <ruby>我<rt>wǒ</rt></ruby>
                  ) : (
                    <span className="char-hover">我</span>
                  )}
                  {showPinyin ? (
                    <ruby>的<rt>de</rt></ruby>
                  ) : (
                    <span className="char-hover">的</span>
                  )}
                  {showPinyin ? (
                    <ruby>一<rt>yī</rt></ruby>
                  ) : (
                    <span className="char-hover">一</span>
                  )}
                  {showPinyin ? (
                    <ruby>天<rt>tiān</rt></ruby>
                  ) : (
                    <span className="char-hover">天</span>
                  )}
                </p>
                
                <p className="mb-6 sm:mb-8 text-justify">
                  {showPinyin ? (
                    <ruby>我<rt>wǒ</rt></ruby>
                  ) : (
                    <span className="char-hover">我</span>
                  )}
                  {showPinyin ? (
                    <ruby>叫<rt>jiào</rt></ruby>
                  ) : (
                    <span className="char-hover">叫</span>
                  )}
                  {showPinyin ? (
                    <ruby>李<rt>Lǐ</rt></ruby>
                  ) : (
                    <span className="char-hover">李</span>
                  )}
                  {showPinyin ? (
                    <ruby>明<rt>Míng</rt></ruby>
                  ) : (
                    <span className="char-hover">明</span>
                  )}
                  ，
                  {showPinyin ? (
                    <ruby>是<rt>shì</rt></ruby>
                  ) : (
                    <span className="char-hover">是</span>
                  )}
                  {showPinyin ? (
                    <ruby>一<rt>yī</rt></ruby>
                  ) : (
                    <span className="char-hover">一</span>
                  )}
                  {showPinyin ? (
                    <ruby>名<rt>míng</rt></ruby>
                  ) : (
                    <span className="char-hover">名</span>
                  )}
                  {showPinyin ? (
                    <ruby>大<rt>dà</rt></ruby>
                  ) : (
                    <span className="char-hover">大</span>
                  )}
                  {showPinyin ? (
                    <ruby>学<rt>xué</rt></ruby>
                  ) : (
                    <span className="char-hover">学</span>
                  )}
                  {showPinyin ? (
                    <ruby>生<rt>shēng</rt></ruby>
                  ) : (
                    <span className="char-hover">生</span>
                  )}
                  。
                </p>

                <p className="mb-6 sm:mb-8 text-justify">
                  {showPinyin ? (
                    <ruby>上<rt>shàng</rt></ruby>
                  ) : (
                    <span className="char-hover">上</span>
                  )}
                  {showPinyin ? (
                    <ruby>午<rt>wǔ</rt></ruby>
                  ) : (
                    <span className="char-hover">午</span>
                  )}
                  {showPinyin ? (
                    <ruby>八<rt>bā</rt></ruby>
                  ) : (
                    <span className="char-hover">八</span>
                  )}
                  {showPinyin ? (
                    <ruby>点<rt>diǎn</rt></ruby>
                  ) : (
                    <span className="char-hover">点</span>
                  )}
                  ，
                  {showPinyin ? (
                    <ruby>我<rt>wǒ</rt></ruby>
                  ) : (
                    <span className="char-hover">我</span>
                  )}
                  {showPinyin ? (
                    <ruby>去<rt>qù</rt></ruby>
                  ) : (
                    <span className="char-hover">去</span>
                  )}
                  {showPinyin ? (
                    <ruby>图<rt>tú</rt></ruby>
                  ) : (
                    <span className="char-hover">图</span>
                  )}
                  {showPinyin ? (
                    <ruby>书<rt>shū</rt></ruby>
                  ) : (
                    <span className="char-hover">书</span>
                  )}
                  {showPinyin ? (
                    <ruby>馆<rt>guǎn</rt></ruby>
                  ) : (
                    <span className="char-hover">馆</span>
                  )}
                  <span className="bg-primary/20 text-primary px-1 rounded mx-0.5 cursor-pointer border-b-2 border-primary">
                    {showPinyin ? (
                      <ruby>学<rt>xué</rt></ruby>
                    ) : (
                      <span>学</span>
                    )}
                    {showPinyin ? (
                      <ruby>习<rt>xí</rt></ruby>
                    ) : (
                      <span>习</span>
                    )}
                  </span>
                  。
                </p>
              </article>

              {/* Divider */}
              <div className="h-px w-full bg-gray-100 dark:bg-gray-800 my-6 sm:my-8" />

              {/* Translation Section */}
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-100 dark:border-blue-900/20">
                <div className="flex items-center gap-2 mb-3 text-primary font-bold">
                  <span className="material-symbols-outlined">translate</span>
                  <h3>Dịch nghĩa (Đoạn 2)</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  Vào lúc 8 giờ sáng, tôi đến thư viện để học tập. Tôi vô cùng thích đọc sách. Buổi trưa, tôi cùng các bạn ăn cơm trưa.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Vocabulary & Notes */}
          <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
            {/* Vocab List Card */}
            <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col h-auto">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                <h3 className="font-bold text-[#111418] dark:text-white">Từ vựng bài học</h3>
                <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300 font-bold">
                  {vocabulary.length}
                </span>
              </div>
              <div className="overflow-y-auto max-h-[400px] p-2">
                {vocabulary.map((word, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg group cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-0 ${word.isHighlighted ? 'bg-primary/5' : ''}`}
                  >
                    <div>
                      <p className={`text-lg font-bold font-chinese group-hover:text-primary ${word.isHighlighted ? 'text-primary' : 'text-[#111418] dark:text-gray-200'}`}>
                        {word.chinese}
                      </p>
                      <p className="text-xs text-gray-500">{word.pinyin}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {word.meaning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100 dark:border-gray-800">
                <button className="w-full py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  Xem tất cả từ vựng
                </button>
              </div>
            </div>

            {/* Discussion/Notes Preview */}
            <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-gray-400">edit_note</span>
                <h3 className="font-bold text-[#111418] dark:text-white text-sm">Ghi chú của bạn</h3>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-sm bg-gray-50 dark:bg-gray-800 border-none rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-primary/20 focus:outline-none"
                placeholder="Viết ghi chú cho bài này..."
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">
                  {notes.length} ký tự
                </span>
                <button
                  onClick={() => setNotes('')}
                  className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1 rounded transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}