// app/dashboard/dictation/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DictationPage() {
  const router = useRouter();
  
  const [selectedMode, setSelectedMode] = useState('listening');
  const [selectedLevel, setSelectedLevel] = useState('1');
  const [showHistory, setShowHistory] = useState(false);
  
  // Practice modes data
  const practiceModes = [
    {
      id: 'listening',
      name: 'Nghe chép',
      description: 'Luyện kỹ năng nghe và gõ lại nội dung. Phù hợp để cải thiện phản xạ âm thanh.',
      icon: 'headphones',
      active: true,
      color: 'primary'
    },
    {
      id: 'vocabulary',
      name: 'Chép từ vựng',
      description: 'Tập trung vào từng từ đơn lẻ. Củng cố trí nhớ về mặt chữ Hán và ý nghĩa.',
      icon: 'translate',
      active: false,
      color: 'slate'
    },
    {
      id: 'sentence',
      name: 'Chép câu',
      description: 'Luyện viết cả câu hoàn chỉnh. Cải thiện ngữ pháp và cấu trúc câu.',
      icon: 'text_fields',
      active: false,
      color: 'slate'
    }
  ];

  // HSK levels
  const hskLevels = [
    { id: '1', name: 'HSK 1', description: 'Sơ cấp - 150 từ' },
    { id: '2', name: 'HSK 2', description: 'Sơ cấp - 300 từ' },
    { id: '3', name: 'HSK 3', description: 'Trung cấp - 600 từ' },
    { id: '4', name: 'HSK 4', description: 'Trung cấp - 1200 từ' },
    { id: '5', name: 'HSK 5', description: 'Cao cấp - 2500 từ' },
    { id: '6', name: 'HSK 6', description: 'Cao cấp - 5000 từ' }
  ];

  // Stats data
  const statsData = [
    {
      id: 1,
      title: 'Lịch sử luyện tập',
      description: 'Xem lại quá trình tiến bộ của bạn qua từng ngày với biểu đồ chi tiết.',
      gradient: 'from-indigo-500 to-purple-600',
      icon: 'history_edu',
      link: '/dashboard/dictation/history'
    },
    {
      id: 2,
      title: 'Bảng xếp hạng tuần',
      description: 'Cạnh tranh với những người học khác để đạt thứ hạng cao nhất.',
      gradient: 'from-emerald-500 to-teal-600',
      icon: 'leaderboard',
      link: '/dashboard/dictation/leaderboard'
    }
  ];

  // Event handlers
  const handleModeSelect = (modeId) => {
    setSelectedMode(modeId);
    
    // Update modes array to reflect selection
    practiceModes.forEach(mode => {
      mode.active = mode.id === modeId;
    });
  };

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleStartPractice = () => {
    console.log('Starting dictation practice with:', {
      mode: selectedMode,
      level: selectedLevel
    });
    
    // Navigate to practice session
    router.push(`/dashboard/dictation/practice?mode=${selectedMode}&level=${selectedLevel}`);
  };

  const handleViewHistory = (link) => {
    router.push(link);
  };

  const handleBackToHome = () => {
    router.push('/dashboard');
  };

  return (
    <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 sm:p-6 lg:p-10">
      <div className="w-full mx-auto flex flex-col">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <button
                onClick={handleBackToHome}
                className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary dark:text-slate-400 dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px] mr-1">home</span>
                Trang chủ
              </button>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-slate-400 text-sm mx-1">chevron_right</span>
                <span className="ms-1 text-sm font-medium text-text-main dark:text-white md:ms-2">
                  Chép chính tả
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black text-text-main dark:text-white tracking-tight">
            Lựa chọn chế độ <span className="text-primary">chép chính tả</span>
          </h1>
          <p className="text-text-secondary dark:text-slate-400 text-base max-w-2xl">
            Chọn chế độ luyện tập phù hợp với mục tiêu của bạn. Bạn có thể thay đổi chế độ và cấp độ bất cứ lúc nào.
          </p>
        </div>

        {/* Mode Selection Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {practiceModes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => handleModeSelect(mode.id)}
              className={`group relative cursor-pointer bg-white dark:bg-surface-dark rounded-xl p-6 transition-all hover:-translate-y-1 ${
                mode.id === selectedMode
                  ? 'border-2 border-primary shadow-lg shadow-primary/10'
                  : 'border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md'
              }`}
            >
              {/* Checkmark for active mode */}
              {mode.id === selectedMode && (
                <div className="absolute top-4 right-4 text-primary">
                  <span className="material-symbols-outlined fill-1">check_circle</span>
                </div>
              )}
              
              <div className="flex flex-col h-full gap-4">
                {/* Icon */}
                <div className={`size-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  mode.id === selectedMode
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-primary group-hover:text-white'
                }`}>
                  <span className="material-symbols-outlined text-3xl">{mode.icon}</span>
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                    {mode.name}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-slate-400">
                    {mode.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Level Selection & Start Button */}
        <section className="bg-white dark:bg-surface-dark rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm mt-2">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            
            {/* Level Selection */}
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              <label className="text-base font-bold text-text-main dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">signal_cellular_alt</span>
                Chọn trình độ
              </label>
              
              {/* Custom Radio Group for Levels */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {hskLevels.map((level) => (
                  <label key={level.id} className="cursor-pointer">
                    <input
                      className="peer sr-only"
                      name="level"
                      type="radio"
                      value={level.id}
                      checked={selectedLevel === level.id}
                      onChange={() => handleLevelSelect(level.id)}
                    />
                    <div className={`rounded-lg border py-3 text-center text-sm font-medium transition-all hover:bg-slate-100 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary peer-checked:shadow-sm ${
                      selectedLevel === level.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}>
                      {level.name}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Start Practice Button */}
            <div className="w-full md:w-auto flex-shrink-0">
              <button
                onClick={handleStartPractice}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-sky-600 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">play_arrow</span>
                Bắt đầu ngay
              </button>
            </div>
          </div>
        </section>

        {/* Bottom Stats Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              onClick={() => handleViewHistory(stat.link)}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br cursor-pointer transition-transform hover:-translate-y-1"
              style={{ 
                backgroundImage: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                background: `linear-gradient(135deg, 
                  ${stat.gradient.includes('indigo') ? '#6366f1' : '#10b981'}, 
                  ${stat.gradient.includes('purple') ? '#8b5cf6' : '#0d9488'}
                )`
              }}
            >
              <div className="p-8 text-white min-h-[160px] flex flex-col justify-center relative z-10">
                {/* Background Icon */}
                <div className="absolute right-0 top-0 opacity-10 scale-150 translate-x-10 -translate-y-10">
                  <span className="material-symbols-outlined text-[200px]">{stat.icon}</span>
                </div>
                
                {/* Content */}
                <h4 className="text-xl font-bold z-10 relative">{stat.title}</h4>
                <p className="opacity-90 mt-2 z-10 relative text-sm max-w-xs">
                  {stat.description}
                </p>
                
                {/* View Button */}
                <button className="mt-4 text-sm font-medium bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors w-fit z-10">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">info</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Mẹo luyện tập hiệu quả
              </h3>
              <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>
                  <span>Luyện tập đều đặn mỗi ngày ít nhất 15 phút</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>
                  <span>Không nên nhìn đáp án trước khi nghe hoàn chỉnh</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>
                  <span>Ghi chú lại những từ vựng hoặc cấu trúc khó để ôn tập sau</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}