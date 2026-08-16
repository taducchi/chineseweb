// app/page.js
'use client';


export default function HomePage({ toggleSidebar }) {
  return (
   
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-[#0a0f1a] dark:via-[#15222b] dark:to-[#1a1a2e]">
  <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
    
    {/* Hero Section - Chào mừng */}
    <div className="relative bg-white dark:bg-[#15222b]/80 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative p-8 md:p-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold rounded-full shadow-sm">
                <span className="material-symbols-outlined text-[16px]">celebration</span>
                HSK 1
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                🇨🇳 150 từ vựng
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Chào mừng đến với{' '}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                HSK 1
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Bắt đầu hành trình chinh phục tiếng Trung của bạn với khóa học nền tảng, 
              giúp bạn làm quen với 150 từ vựng và 80 cấu trúc ngữ pháp cơ bản.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                <span className="material-symbols-outlined">play_circle</span>
                Bắt đầu học
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all duration-300">
                <span className="material-symbols-outlined">info</span>
                Xem chi tiết
              </button>
            </div>
          </div>
          
          {/* Icon/Image */}
          <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 flex items-center justify-center border-4 border-white/50 dark:border-slate-700/50 shadow-xl">
            <span className="text-6xl md:text-7xl">🎯</span>
          </div>
        </div>
      </div>
    </div>

    {/* Course Overview - Thông tin khóa học */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-[#15222b]/80 rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">📚</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">30 Bài học</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Hệ thống bài học từ cơ bản đến nâng cao, phù hợp với người mới bắt đầu.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
            Đã hoàn thành 12/30
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#15222b]/80 rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🗣️</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Phát âm chuẩn</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Luyện phát âm với phiên âm Pinyin và giọng đọc của người bản xứ.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
            🎧 80+ file nghe
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#15222b]/80 rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🏆</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Chứng chỉ HSK 1</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Hoàn thành khóa học và nhận chứng chỉ HSK 1 từ hệ thống đào tạo.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">
            ⭐ Đánh giá 4.9/5
          </span>
        </div>
      </div>
    </div>

    {/* Progress - Tiến độ */}
    <div className="bg-white dark:bg-[#15222b]/80 rounded-xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Tiến độ học tập</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Bạn đang đi đúng hướng, tiếp tục phát huy nhé! 💪</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-primary">65%</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">Hoàn thành</span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full" style={{ width: '65%' }} />
        </div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
          <span>Đã học: 24 bài</span>
          <span>Còn lại: 6 bài</span>
          <span>Ngày tiếp theo: Bài 25</span>
        </div>
      </div>
    </div>

    {/* Other Content */}
    <div className="p-6 md:p-8 bg-white dark:bg-[#15222b]/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-primary">lightbulb</span>
        Gợi ý học tập
      </h2>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        Dành 30 phút mỗi ngày để học từ vựng mới và ôn tập lại bài cũ. 
        Đừng quên luyện nghe và nói để cải thiện phản xạ ngôn ngữ nhé!
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <span className="text-2xl">📝</span>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Từ vựng mới</p>
          <p className="text-sm font-bold text-primary">10 từ/ngày</p>
        </div>
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <span className="text-2xl">🎧</span>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Nghe & lặp lại</p>
          <p className="text-sm font-bold text-primary">15 phút</p>
        </div>
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <span className="text-2xl">✍️</span>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Viết chữ Hán</p>
          <p className="text-sm font-bold text-primary">5 chữ/ngày</p>
        </div>
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <span className="text-2xl">💬</span>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Luyện nói</p>
          <p className="text-sm font-bold text-primary">10 phút</p>
        </div>
      </div>
    </div>
  </div>
</div>
  
  );
}