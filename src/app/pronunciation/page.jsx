// app/practice/pronunciation/page.jsx
'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ============================================================
// DATA
// ============================================================
const practiceTopics = [
  {
    id: 'tones',
    icon: 'graphic_eq',
    title: 'Thanh điệu',
    description: 'Luyện tập 5 thanh điệu cơ bản',
    count: 5,
    color: 'from-blue-500 to-indigo-600',
    emoji: '🎵'
  },
  {
    id: 'initials',
    icon: 'mic',
    title: 'Phụ âm đầu',
    description: 'Luyện phát âm 21 phụ âm đầu',
    count: 21,
    color: 'from-green-500 to-emerald-600',
    emoji: '🔊'
  },
  {
    id: 'finals',
    icon: 'volume_up',
    title: 'Vần',
    description: 'Luyện phát âm 36 vần',
    count: 36,
    color: 'from-purple-500 to-pink-600',
    emoji: '📢'
  },
];

// Thanh điệu đầy đủ
const toneData = [
  {
    id: 1,
    name: 'Thanh 1',
    symbol: 'ā',
    description: 'Cao, phẳng, kéo dài.',
    example: 'mā',
    meaning: 'Mẹ',
    color: 'text-blue-500',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    iconBg: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    name: 'Thanh 2',
    symbol: 'á',
    description: 'Giống dấu sắc, lên dốc.',
    example: 'má',
    meaning: 'Cây gai',
    color: 'text-green-500',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    iconBg: 'from-green-500 to-green-600'
  },
  {
    id: 3,
    name: 'Thanh 3',
    symbol: 'ǎ',
    description: 'Xuống rồi lên, giống dấu hỏi kết hợp ngã.',
    example: 'mǎ',
    meaning: 'Con ngựa',
    color: 'text-purple-500',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    iconBg: 'from-purple-500 to-purple-600'
  },
  {
    id: 4,
    name: 'Thanh 4',
    symbol: 'à',
    description: 'Mạnh, dứt khoát, đi xuống.',
    example: 'mà',
    meaning: 'Mắng',
    color: 'text-orange-500',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    iconBg: 'from-orange-500 to-orange-600'
  },
  {
    id: 5,
    name: 'Thanh nhẹ',
    symbol: 'a',
    description: 'Ngắn, nhẹ, không có dấu hiệu.',
    example: 'ma',
    meaning: 'Trợ từ',
    color: 'text-pink-500',
    borderColor: 'border-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    iconBg: 'from-pink-500 to-pink-600'
  }
];

// Phụ âm đầu (Thanh mẫu)
const initialData = [
  { id: 'b', pinyin: 'b', sound: 'b', example: 'ba', meaning: 'ba', group: 'Môi - môi' },
  { id: 'p', pinyin: 'p', sound: 'p', example: 'pa', meaning: 'pa', group: 'Môi - môi' },
  { id: 'm', pinyin: 'm', sound: 'm', example: 'ma', meaning: 'ma', group: 'Môi - môi' },
  { id: 'f', pinyin: 'f', sound: 'f', example: 'fa', meaning: 'fa', group: 'Môi - răng' },
  { id: 'd', pinyin: 'd', sound: 'd', example: 'da', meaning: 'da', group: 'Đầu lưỡi giữa' },
  { id: 't', pinyin: 't', sound: 't', example: 'ta', meaning: 'ta', group: 'Đầu lưỡi giữa' },
  { id: 'n', pinyin: 'n', sound: 'n', example: 'na', meaning: 'na', group: 'Đầu lưỡi giữa' },
  { id: 'l', pinyin: 'l', sound: 'l', example: 'la', meaning: 'la', group: 'Đầu lưỡi giữa' },
  { id: 'g', pinyin: 'g', sound: 'g', example: 'ga', meaning: 'ga', group: 'Cuống lưỡi' },
  { id: 'k', pinyin: 'k', sound: 'k', example: 'ka', meaning: 'ka', group: 'Cuống lưỡi' },
  { id: 'h', pinyin: 'h', sound: 'h', example: 'ha', meaning: 'ha', group: 'Cuống lưỡi' },
  { id: 'j', pinyin: 'j', sound: 'j', example: 'ji', meaning: 'ji', group: 'Mặt lưỡi' },
  { id: 'q', pinyin: 'q', sound: 'q', example: 'qi', meaning: 'qi', group: 'Mặt lưỡi' },
  { id: 'x', pinyin: 'x', sound: 'x', example: 'xi', meaning: 'xi', group: 'Mặt lưỡi' },
  { id: 'zh', pinyin: 'zh', sound: 'zh', example: 'zha', meaning: 'zha', group: 'Đầu lưỡi sau' },
  { id: 'ch', pinyin: 'ch', sound: 'ch', example: 'cha', meaning: 'cha', group: 'Đầu lưỡi sau' },
  { id: 'sh', pinyin: 'sh', sound: 'sh', example: 'sha', meaning: 'sha', group: 'Đầu lưỡi sau' },
  { id: 'r', pinyin: 'r', sound: 'r', example: 'ra', meaning: 'ra', group: 'Đầu lưỡi sau' },
  { id: 'z', pinyin: 'z', sound: 'z', example: 'za', meaning: 'za', group: 'Đầu lưỡi trước' },
  { id: 'c', pinyin: 'c', sound: 'c', example: 'ca', meaning: 'ca', group: 'Đầu lưỡi trước' },
  { id: 's', pinyin: 's', sound: 's', example: 'sa', meaning: 'sa', group: 'Đầu lưỡi trước' },
];

// Vần (Vận mẫu) - Đã đầy đủ 36 vần
const finalData = [
  { id: 'a', pinyin: 'a', example: 'ma', meaning: 'mā', group: 'Đơn vần' },
  { id: 'o', pinyin: 'o', example: 'mo', meaning: 'mō', group: 'Đơn vần' },
  { id: 'e', pinyin: 'e', example: 'me', meaning: 'me', group: 'Đơn vần' },
  { id: 'i', pinyin: 'i', example: 'mi', meaning: 'mī', group: 'Đơn vần' },
  { id: 'u', pinyin: 'u', example: 'mu', meaning: 'mū', group: 'Đơn vần' },
  { id: 'ü', pinyin: 'ü', example: 'nü', meaning: 'nǚ', group: 'Đơn vần' },
  { id: 'ai', pinyin: 'ai', example: 'mai', meaning: 'mài', group: 'Phức vần' },
  { id: 'ei', pinyin: 'ei', example: 'mei', meaning: 'měi', group: 'Phức vần' },
  { id: 'ao', pinyin: 'ao', example: 'mao', meaning: 'māo', group: 'Phức vần' },
  { id: 'ou', pinyin: 'ou', example: 'mou', meaning: 'mǒu', group: 'Phức vần' },
  { id: 'ia', pinyin: 'ia', example: 'jia', meaning: 'jiā', group: 'Phức vần' },
  { id: 'ie', pinyin: 'ie', example: 'jie', meaning: 'jiē', group: 'Phức vần' },
  { id: 'iao', pinyin: 'iao', example: 'jiao', meaning: 'jiǎo', group: 'Phức vần' },
  { id: 'iu', pinyin: 'iu', example: 'jiu', meaning: 'jiǔ', group: 'Phức vần' },
  { id: 'ua', pinyin: 'ua', example: 'gua', meaning: 'guā', group: 'Phức vần' },
  { id: 'uo', pinyin: 'uo', example: 'guo', meaning: 'guò', group: 'Phức vần' },
  { id: 'üe', pinyin: 'üe', example: 'jue', meaning: 'jué', group: 'Phức vần' },
  { id: 'ui', pinyin: 'ui', example: 'gui', meaning: 'guī', group: 'Phức vần' },
  { id: 'üan', pinyin: 'üan', example: 'juan', meaning: 'juān', group: 'Phức vần' },
  { id: 'an', pinyin: 'an', example: 'gan', meaning: 'gān', group: 'Mũi vần' },
  { id: 'en', pinyin: 'en', example: 'gen', meaning: 'gēn', group: 'Mũi vần' },
  { id: 'in', pinyin: 'in', example: 'jin', meaning: 'jīn', group: 'Mũi vần' },
  { id: 'un', pinyin: 'un', example: 'gun', meaning: 'gǔn', group: 'Mũi vần' },
  { id: 'ün', pinyin: 'ün', example: 'jun', meaning: 'jūn', group: 'Mũi vần' },
  { id: 'ian', pinyin: 'ian', example: 'jian', meaning: 'jiān', group: 'Mũi vần' },
  { id: 'uan', pinyin: 'uan', example: 'guan', meaning: 'guān', group: 'Mũi vần' },
  { id: 'uen', pinyin: 'uen', example: 'wen', meaning: 'wén', group: 'Mũi vần' },
  { id: 'ang', pinyin: 'ang', example: 'gang', meaning: 'gāng', group: 'Mũi vần' },
  { id: 'eng', pinyin: 'eng', example: 'geng', meaning: 'gēng', group: 'Mũi vần' },
  { id: 'ing', pinyin: 'ing', example: 'jing', meaning: 'jīng', group: 'Mũi vần' },
  { id: 'ong', pinyin: 'ong', example: 'gong', meaning: 'gōng', group: 'Mũi vần' },
  { id: 'iang', pinyin: 'iang', example: 'jiang', meaning: 'jiāng', group: 'Mũi vần' },
  { id: 'iong', pinyin: 'iong', example: 'jiong', meaning: 'jiǒng', group: 'Mũi vần' },
  { id: 'uang', pinyin: 'uang', example: 'guang', meaning: 'guāng', group: 'Mũi vần' },
  { id: 'ueng', pinyin: 'ueng', example: 'weng', meaning: 'wēng', group: 'Mũi vần' },
  { id: 'er', pinyin: 'er', example: 'er', meaning: 'èr', group: 'Vần đặc biệt' },
];

// ============================================================
// SIDEBAR COMPONENT
// ============================================================
function PronunciationSidebar({ activeTopic, onSelectTopic }) {
  return (
    <aside className="hidden lg:block w-64 xl:w-72 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto flex-shrink-0">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Luyện phát âm
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Chọn nội dung luyện tập
        </p>
      </div>

      <div className="p-3 space-y-2">
        {practiceTopics.map((topic) => {
          const isActive = activeTopic === topic.id;
          
          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={`
                w-full text-left p-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r ' + topic.color + ' text-white shadow-lg' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                  ${isActive ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800'}
                `}>
                  <span className="material-symbols-outlined">
                    {topic.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {topic.title}
                    </span>
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full
                      ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}
                    `}>
                      {topic.count}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                    {topic.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

// ============================================================
// CONTENT COMPONENT
// ============================================================
function PronunciationContent({ topic }) {
  const [playingId, setPlayingId] = useState(null);

  const handlePlay = (id) => {
    setPlayingId(id);
    setTimeout(() => setPlayingId(null), 1500);
  };

  const renderContent = () => {
    switch (topic) {
      case 'tones':
        return (
          <>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Luyện thanh điệu
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Luyện tập phát âm 5 thanh điệu cơ bản trong tiếng Trung.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {toneData.map((tone) => (
                <div
                  key={tone.id}
                  className={`
                    bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border-2 ${tone.borderColor}
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                  `}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-xl font-bold ${tone.color}`}>{tone.name}</h3>
                    <div className={`w-8 h-8 rounded-full ${tone.bgColor} flex items-center justify-center ${tone.color} font-bold`}>
                      {tone.id === 5 ? '0' : tone.id}
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center py-6">
                    <span className="text-6xl font-bold text-gray-900 dark:text-white mb-3">
                      {tone.symbol}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center px-4">
                      {tone.description}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl mt-4 border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ví dụ:</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {tone.example}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({tone.meaning})
                        </span>
                      </div>
                      <button
                        onClick={() => handlePlay(tone.id)}
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                          ${playingId === tone.id 
                            ? 'bg-primary text-white scale-110' 
                            : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                          }
                        `}
                      >
                        <span className="material-symbols-outlined">
                          {playingId === tone.id ? 'play_circle' : 'volume_up'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-3 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary hover:text-white transition-all duration-300">
                    Phát âm
                  </button>
                </div>
              ))}
            </div>
          </>
        );

      case 'initials':
        const groupedInitials = initialData.reduce((acc, item) => {
          if (!acc[item.group]) acc[item.group] = [];
          acc[item.group].push(item);
          return acc;
        }, {});

        const groupColors = {
          'Môi - môi': 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
          'Môi - răng': 'border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20',
          'Đầu lưỡi giữa': 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
          'Cuống lưỡi': 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20',
          'Mặt lưỡi': 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20',
          'Đầu lưỡi sau': 'border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-900/20',
          'Đầu lưỡi trước': 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
        };

        return (
          <>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Phụ âm đầu (Thanh mẫu)
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Luyện phát âm 21 phụ âm đầu trong tiếng Trung, phân loại theo nhóm phát âm.
              </p>
            </div>

            {Object.entries(groupedInitials).map(([group, items]) => (
              <div key={group} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">label</span>
                  {group}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`
                        bg-white dark:bg-gray-800 rounded-xl p-4 text-center border-2 ${groupColors[group] || 'border-gray-200 dark:border-gray-700'}
                        hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                      `}
                    >
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {item.pinyin}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.sound}
                      </div>
                      <button
                        onClick={() => handlePlay(item.id)}
                        className="mt-3 w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center mx-auto"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {playingId === item.id ? 'play_circle' : 'volume_up'}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        );

      case 'finals':
        const groupedFinals = finalData.reduce((acc, item) => {
          if (!acc[item.group]) acc[item.group] = [];
          acc[item.group].push(item);
          return acc;
        }, {});

        const finalGroupColors = {
          'Đơn vần': 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
          'Phức vần': 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
          'Mũi vần': 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20',
          'Vần đặc biệt': 'border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-900/20',
        };

        return (
          <>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Vần (Vận mẫu)
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Luyện phát âm 36 vần trong tiếng Trung, phân loại theo nhóm.
              </p>
            </div>

            {Object.entries(groupedFinals).map(([group, items]) => (
              <div key={group} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">label</span>
                  {group}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`
                        bg-white dark:bg-gray-800 rounded-xl p-4 text-center border-2 ${finalGroupColors[group] || 'border-gray-200 dark:border-gray-700'}
                        hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                      `}
                    >
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {item.pinyin}
                      </div>
                      <button
                        onClick={() => handlePlay(item.id)}
                        className="mt-3 w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center mx-auto"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {playingId === item.id ? 'play_circle' : 'volume_up'}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        );

      default:
        return (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">practice</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Chọn nội dung luyện tập</h2>
            <p className="text-gray-500 dark:text-gray-400">Vui lòng chọn một chủ đề từ sidebar bên trái.</p>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </main>
  );
}

// ============================================================
// MOBILE SELECT COMPONENT
// ============================================================
function MobileTopicSelect({ activeTopic, onSelectTopic }) {
  const [isOpen, setIsOpen] = useState(false);
  const activeTopicData = practiceTopics.find(t => t.id === activeTopic);

  return (
    <div className="lg:hidden w-full pt-4 pb-2 px-4 md:px-6">
      {/* Custom Select Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3.5 text-gray-900 dark:text-white font-medium shadow-sm hover:border-primary transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{activeTopicData?.emoji || '📚'}</span>
          <span>{activeTopicData?.title || 'Chọn chủ đề'}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
            {activeTopicData?.count || 0}
          </span>
        </div>
        <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute left-4 right-4 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
          {practiceTopics.map((topic) => {
            const isActive = activeTopic === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  onSelectTopic(topic.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors
                  ${isActive 
                    ? 'bg-gradient-to-r ' + topic.color + ' text-white' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                <span className="text-2xl">{topic.emoji}</span>
                <div className="flex-1">
                  <div className="font-medium">{topic.title}</div>
                  <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'}`}>
                    {topic.description}
                  </div>
                </div>
                <span className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}
                `}>
                  {topic.count}
                </span>
                {isActive && (
                  <span className="material-symbols-outlined text-sm">check</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function Pronunciation() {
  const [activeTopic, setActiveTopic] = useState('tones');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <div className="flex flex-col">
        {/* Mobile: Select dropdown ở trên cùng */}
        <div className="lg:hidden w-full">
          <MobileTopicSelect 
            activeTopic={activeTopic} 
            onSelectTopic={setActiveTopic} 
          />
        </div>

        <div className="flex flex-1 container mx-auto px-4 md:px-6">
          {/* Desktop Sidebar */}
          <PronunciationSidebar
            activeTopic={activeTopic}
            onSelectTopic={setActiveTopic}
          />

          {/* Main Content */}
          
            <PronunciationContent topic={activeTopic} />
         
        </div>
      </div>

      <Footer />
    </div>
  );
}