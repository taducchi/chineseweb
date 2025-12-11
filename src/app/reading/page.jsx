'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';

export default function ReadingLibrary() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('HSK 5');
  const [selectedTopics, setSelectedTopics] = useState(['Kinh tế & Thương mại']);
  const [duration, setDuration] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data
  const articles = [
    {
      id: 1,
      title: "中国的数字经济蓬勃发展",
      description: "Sự phát triển mạnh mẽ của nền kinh tế số Trung Quốc và tác động đến đời sống người dân.",
      level: "HSK 5",
      levelColor: "text-primary",
      borderColor: "border-primary/30",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "5 phút",
      views: "1.2k",
      tags: ["Kinh tế", "Công nghệ"],
      tagColors: ["bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400", "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"],
      isBookmarked: false,
      isNew: false
    },
    {
      id: 2,
      title: "中国茶文化的历史与传承",
      description: "Tìm hiểu về lịch sử và sự kế thừa của văn hóa trà đạo Trung Quốc qua hàng ngàn năm.",
      level: "HSK 4",
      levelColor: "text-orange-400",
      borderColor: "border-orange-400/30",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "3 phút",
      views: "856",
      tags: ["Văn hóa"],
      tagColors: ["bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"],
      isBookmarked: false,
      isNew: false
    },
    {
      id: 3,
      title: "春节的传统习俗与现代变化",
      description: "Những phong tục truyền thống ngày Tết và những thay đổi trong xã hội hiện đại.",
      level: "HSK 6",
      levelColor: "text-red-500",
      borderColor: "border-red-500/30",
      image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "7 phút",
      views: "2.1k",
      tags: ["Lễ hội"],
      tagColors: ["bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"],
      isBookmarked: true,
      isNew: false
    },
    {
      id: 4,
      title: "低头族：手机对生活的影响",
      description: '"Cúi đầu tộc": Ảnh hưởng của điện thoại di động đến cuộc sống hàng ngày của giới trẻ.',
      level: "HSK 3",
      levelColor: "text-green-500",
      borderColor: "border-green-500/30",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "4 phút",
      views: "943",
      tags: ["Đời sống", "Xã hội"],
      tagColors: ["bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400", "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"],
      isBookmarked: false,
      isNew: true
    },
    {
      id: 5,
      title: "中国古代建筑的特点",
      description: "Đặc điểm kiến trúc cổ đại Trung Quốc và ảnh hưởng đến kiến trúc hiện đại.",
      level: "HSK 4",
      levelColor: "text-purple-400",
      borderColor: "border-purple-400/30",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "6 phút",
      views: "1.5k",
      tags: ["Kiến trúc", "Lịch sử"],
      tagColors: ["bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400", "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"],
      isBookmarked: false,
      isNew: false
    },
    {
      id: 6,
      title: "中国美食文化介绍",
      description: "Giới thiệu về văn hóa ẩm thực Trung Quốc và các món ăn đặc trưng vùng miền.",
      level: "HSK 2",
      levelColor: "text-yellow-500",
      borderColor: "border-yellow-500/30",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "2 phút",
      views: "2.8k",
      tags: ["Ẩm thực"],
      tagColors: ["bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"],
      isBookmarked: false,
      isNew: false
    }
  ];

  const topics = [
    "Kinh tế & Thương mại",
    "Văn hóa Trung Hoa",
    "Đời sống thường nhật",
    "Khoa học & Công nghệ",
    "Giáo dục & Học tập"
  ];

  const levels = ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'Cao cấp'];
  const difficulties = ['Dễ', 'Trung bình', 'Khó'];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const toggleBookmark = (id) => {
    // In a real app, you would update the backend
    const article = articles.find(a => a.id === id);
    if (article) {
      article.isBookmarked = !article.isBookmarked;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-sub">Đang tải thư viện...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      
      {/* Main Container */}
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
        
        {/* Desktop/Tablet Header */}
        <header className="hidden lg:block sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
          <div className="container mx-auto px-6 py-4">
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsDrawerOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white"
                >
                  <span className="material-symbols-outlined text-xl">menu</span>
                </button>
                <div>
                  <h1 className="text-lg font-bold font-display">Thư viện bài đọc</h1>
                  <p className="text-xs text-text-sub hidden sm:block">Chọn bài phù hợp với trình độ</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span className="material-symbols-outlined">search</span>
                </button>
                <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
          
          {/* Mobile Drawer Backdrop */}
          {isDrawerOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />
          )}

          {/* Sidebar Filters */}
          <aside className={`
            fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-72 xl:w-80 
            bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark 
            transform transition-transform duration-300 ease-in-out 
            ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto z-20
          `}>
            <div className="p-4 md:p-6 h-full flex flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-display">Bộ lọc bài đọc</h2>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Search inside sidebar for mobile/tablet */}
              <div className="lg:hidden mb-6">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub">
                    <span className="material-symbols-outlined text-lg">search</span>
                  </span>
                  <input 
                    type="text" 
                    placeholder="Tìm bài đọc..." 
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>
              </div>

              {/* Filter Sections */}
              <div className="space-y-6 flex-1">
                {/* HSK Level Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-text-sub">Trình độ HSK</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`
                          h-9 rounded-md text-xs font-medium transition-colors
                          ${selectedLevel === level 
                            ? 'bg-primary text-white border border-primary-dark' 
                            : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary'
                          }
                        `}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topics Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-text-sub">Chủ đề</h3>
                  <div className="space-y-2">
                    {topics.map((topic) => (
                      <label 
                        key={topic}
                        className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <input 
                          type="checkbox" 
                          checked={selectedTopics.includes(topic)}
                          onChange={() => toggleTopic(topic)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary bg-transparent" 
                        />
                        <span className="text-sm">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-text-sub">Thời lượng đọc</h3>
                  <div className="space-y-2">
                    <input 
                      type="range" 
                      min="1" 
                      max="15" 
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full h-1.5 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary" 
                    />
                    <div className="flex justify-between text-xs text-text-sub">
                      <span>&lt; 1 phút</span>
                      <span className="font-semibold text-primary">{duration} phút</span>
                      <span>&gt; 15 phút</span>
                    </div>
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-text-sub">Độ khó</h3>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty) => (
                      <button
                        key={difficulty}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary"
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply Filters Button */}
              <div className="pt-6 border-t border-border-light dark:border-border-dark">
                <button className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                  Áp dụng bộ lọc
                </button>
                <button className="w-full mt-2 py-2 text-sm text-text-sub hover:text-text-main dark:hover:text-white transition-colors">
                  Đặt lại bộ lọc
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Mobile Filter Bar */}
            
            <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
              
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-2 text-sm font-semibold text-text-sub"
              >
                <span className="material-symbols-outlined">filter_list</span>
                Bộ lọc
              </button>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[200px]">
                <span className="shrink-0 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                  {selectedLevel}
                </span>
                {selectedTopics.slice(0, 1).map((topic) => (
                  <span key={topic} className="shrink-0 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-text-sub dark:text-gray-300 text-xs font-medium">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Header for Desktop/Tablet */}
            <div className="hidden lg:flex items-center justify-between px-6 py-4 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
              <div>
                <h2 className="text-xl font-bold font-display">Tất cả bài đọc</h2>
                <p className="text-sm text-text-sub mt-1">Tìm thấy {articles.length} bài đọc phù hợp</p>
              </div>
              <div className="hidden lg:flex items-center relative w-64">
                  <span className="absolute left-3 text-text-sub">
                    <span className="material-symbols-outlined text-lg">search</span>
                  </span>
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm bài đọc..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <span className="material-symbols-outlined text-lg">sort</span>
                  <span className="text-sm">Sắp xếp</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                  <span className="hidden xl:inline text-sm">Chế độ xem</span>
                </button>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                {articles.map((article) => (
                  <article 
                    key={article.id} 
                    className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border-light dark:border-border-dark"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold ${article.levelColor} border ${article.borderColor}`}>
                        {article.level}
                      </div>
                      <button 
                        onClick={() => toggleBookmark(article.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {article.isBookmarked ? 'bookmark' : 'bookmark_add'}
                        </span>
                      </button>
                      {article.isNew && (
                        <div className="absolute top-3 right-3 bg-primary/90 text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
                          Mới nhất
                        </div>
                      )}
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-text-sub mb-4 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-xs text-text-sub">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            <span>{article.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-text-sub">
                            <span className="material-symbols-outlined text-sm">visibility</span>
                            <span>{article.views}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {article.tags.map((tag, index) => (
                            <span 
                              key={tag} 
                              className={`px-2 py-1 rounded-md text-[10px] font-medium ${article.tagColors[index]}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark p-4">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-2xl">menu_book</span>
              <span className="text-xs font-medium">Đọc</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-text-sub hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">search</span>
              <span className="text-xs">Tìm kiếm</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-text-sub hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">bookmark</span>
              <span className="text-xs">Đã lưu</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-text-sub hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">person</span>
              <span className="text-xs">Tài khoản</span>
            </button>
          </div>
        </div>

        {/* Floating Action Button for Mobile */}
        <button className="lg:hidden fixed bottom-20 right-4 z-30 h-14 w-14 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white transition-transform active:scale-95">
          <span className="material-symbols-outlined text-2xl">auto_stories</span>
        </button>

      </div>
    </>
  );
}