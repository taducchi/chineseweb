'use client';
import { useState, useEffect } from 'react';

export default function Roadmap() {
  const [currentLevel, setCurrentLevel] = useState('HSK 1');
  const [targetLevel, setTargetLevel] = useState('HSK 3');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  // All available levels
  const allLevels = ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7-9'];

  // Course data
  const courseData = {
    'HSK 1': {
      level: 'HSK 1',
      title: 'Nền tảng vững chắc',
      subtitle: 'Khởi đầu hành trình tiếng Trung',
      description: 'Làm quen với bảng chữ cái, phát âm chuẩn và 150 từ vựng cơ bản nhất. Xây dựng nền móng vững chắc cho con đường chinh phục tiếng Trung của bạn.',
      stats: [
        { icon: 'translate', label: '150 từ vựng' },
        { icon: 'edit_square', label: '174 Hán tự' },
        { icon: 'menu_book', label: '45 cấu trúc' },
        { icon: 'schedule', label: '40 giờ học' }
      ],
      color: 'from-green-400 to-emerald-500',
      badge: '🇨🇳 Bắt đầu',
      cta: 'Bắt đầu học ngay',
      duration: '2-3 tháng',
      level_num: 1
    },
    'HSK 2': {
      level: 'HSK 2',
      title: 'Giao tiếp cơ bản',
      subtitle: 'Tự tin hội thoại hàng ngày',
      description: 'Mở rộng vốn từ lên 300+, nắm vững 347 Hán tự và 45 cấu trúc ngữ pháp. Bắt đầu tự tin giao tiếp trong các tình huống đời sống cơ bản.',
      stats: [
        { icon: 'translate', label: '300 từ vựng' },
        { icon: 'edit_square', label: '347 Hán tự' },
        { icon: 'menu_book', label: '45 cấu trúc' },
        { icon: 'schedule', label: '40 giờ học' }
      ],
      color: 'from-blue-400 to-cyan-500',
      badge: '🗣️ Giao tiếp',
      cta: 'Chinh phục HSK 2',
      duration: '3-4 tháng',
      level_num: 2
    },
    'HSK 3': {
      level: 'HSK 3',
      title: 'Trung cấp vượt trội',
      subtitle: 'Tư duy bằng tiếng Trung',
      description: 'Đạt 600 từ vựng, 617 Hán tự và 45 cấu trúc ngữ pháp nâng cao. Phát triển khả năng diễn đạt ý tưởng, kể chuyện và thảo luận chủ đề đa dạng.',
      stats: [
        { icon: 'translate', label: '600 từ vựng' },
        { icon: 'edit_square', label: '617 Hán tự' },
        { icon: 'menu_book', label: '45 cấu trúc' },
        { icon: 'schedule', label: '60 giờ học' }
      ],
      color: 'from-indigo-400 to-purple-500',
      badge: '🚀 Phát triển',
      cta: 'Chinh phục HSK 3',
      duration: '4-5 tháng',
      level_num: 3
    },
    'HSK 4': {
      level: 'HSK 4',
      title: 'Tiền cao cấp',
      subtitle: 'Đọc hiểu & Viết chuyên sâu',
      description: 'Nâng vốn từ lên 1200+, 1000 Hán tự. Đọc hiểu báo chí, văn bản chuyên ngành và viết đoạn văn mạch lạc. Sẵn sàng cho môi trường làm việc quốc tế.',
      stats: [
        { icon: 'translate', label: '1200 từ vựng' },
        { icon: 'edit_square', label: '1000 Hán tự' },
        { icon: 'menu_book', label: '60 cấu trúc' },
        { icon: 'schedule', label: '80 giờ học' }
      ],
      color: 'from-pink-400 to-rose-500',
      badge: '📚 Chuyên sâu',
      cta: 'Chinh phục HSK 4',
      duration: '5-6 tháng',
      level_num: 4
    },
    'HSK 5': {
      level: 'HSK 5',
      title: 'Cao cấp toàn diện',
      subtitle: 'Giao tiếp học thuật & Chuyên nghiệp',
      description: '2500 từ vựng, 1500 Hán tự. Nắm vững ngữ pháp phức tạp, thuyết trình, tranh luận và viết báo cáo chuyên nghiệp. Đạt chuẩn giao tiếp công sở.',
      stats: [
        { icon: 'translate', label: '2500 từ vựng' },
        { icon: 'edit_square', label: '1500 Hán tự' },
        { icon: 'menu_book', label: '70 cấu trúc' },
        { icon: 'schedule', label: '100 giờ học' }
      ],
      color: 'from-orange-400 to-red-500',
      badge: '💼 Chuyên nghiệp',
      cta: 'Chinh phục HSK 5',
      duration: '6-8 tháng',
      level_num: 5
    },
    'HSK 6': {
      level: 'HSK 6',
      title: 'Thành thạo cao cấp',
      subtitle: 'Ngôn ngữ thượng đỉnh',
      description: '5000 từ vựng, 2500 Hán tự. Đọc hiểu văn bản phức tạp, viết luận và giao tiếp tinh tế trong mọi tình huống. Trình độ tương đương người bản xứ.',
      stats: [
        { icon: 'translate', label: '5000 từ vựng' },
        { icon: 'edit_square', label: '2500 Hán tự' },
        { icon: 'menu_book', label: '80 cấu trúc' },
        { icon: 'schedule', label: '120 giờ học' }
      ],
      color: 'from-amber-400 to-yellow-600',
      badge: '🏆 Thành thạo',
      cta: 'Chinh phục HSK 6',
      duration: '8-10 tháng',
      level_num: 6
    },
    'HSK 7-9': {
      level: 'HSK 7-9',
      title: 'Chuyên gia ngôn ngữ',
      subtitle: 'Đẳng cấp thượng thừa',
      description: 'Trên 11000 từ vựng, thành thạo dịch thuật, viết báo chí và phản biện học thuật. Trở thành chuyên gia tiếng Trung trong lĩnh vực của bạn.',
      stats: [
        { icon: 'translate', label: '11000+ từ' },
        { icon: 'edit_square', label: 'Dịch thuật' },
        { icon: 'menu_book', label: 'Nâng cao' },
        { icon: 'schedule', label: '150+ giờ' }
      ],
      color: 'from-emerald-400 to-teal-500',
      badge: '🌟 Chuyên gia',
      cta: 'Chinh phục HSK 7-9',
      duration: '12+ tháng',
      level_num: 7
    }
  };

  // Get filtered roadmap based on current and target level
  const getFilteredCourses = () => {
    const currentIndex = allLevels.indexOf(currentLevel);
    const targetIndex = allLevels.indexOf(targetLevel);
    
    // Ensure current <= target
    const start = Math.min(currentIndex, targetIndex);
    const end = Math.max(currentIndex, targetIndex);
    
    return allLevels.slice(start, end + 1);
  };

  const filteredLevels = getFilteredCourses();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải lộ trình...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              🎯 Lộ trình bài bản - Cam kết đầu ra
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Hành trình chinh phục 
              <br />
              <span className="text-yellow-300">Tiếng Trung HSK</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Từ con số 0 đến chuyên gia - Lộ trình học tập được thiết kế khoa học, phù hợp với mọi trình độ
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">📚</span>
                <span className="text-sm">7 cấp độ</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">🎓</span>
                <span className="text-sm">150+ bài học</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">⭐</span>
                <span className="text-sm">98% học viên hài lòng</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="https://www.w3.org/2000/svg">
            <path d="M0 40L60 50C120 60 240 80 360 80C480 80 600 60 720 50C840 40 960 40 1080 50C1200 60 1320 80 1380 90L1440 100V120H0V40Z" fill="white" fillOpacity="0.1"/>
            <path d="M0 70L60 75C120 80 240 90 360 90C480 90 600 80 720 75C840 70 960 70 1080 75C1200 80 1320 90 1380 95L1440 100V120H0V70Z" fill="white" fillOpacity="0.05"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Level Selector - Updated with both current and target */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8 -mt-8 relative z-20">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Level */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <span className="text-2xl">📍</span>
                Trình độ hiện tại của bạn
              </label>
              <div className="flex flex-wrap gap-2">
                {allLevels.map((level) => (
                  <button
                    key={`current-${level}`}
                    onClick={() => setCurrentLevel(level)}
                    className={`
                      px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                      ${currentLevel === level 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'}
                    `}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Level */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <span className="text-2xl">🎯</span>
                Mục tiêu bạn muốn đạt được
              </label>
              <div className="flex flex-wrap gap-2">
                {allLevels.map((level) => {
                  const isDisabled = allLevels.indexOf(level) < allLevels.indexOf(currentLevel);
                  return (
                    <button
                      key={`target-${level}`}
                      onClick={() => !isDisabled && setTargetLevel(level)}
                      disabled={isDisabled}
                      className={`
                        px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                        ${targetLevel === level 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                          : isDisabled
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'}
                      `}
                    >
                      {level}
                      {isDisabled && ' 🔒'}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Mục tiêu phải cao hơn hoặc bằng trình độ hiện tại
              </p>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <span className="font-medium text-gray-700">
                  Lộ trình: <span className="text-blue-600 font-bold">{currentLevel}</span>
                  <span className="mx-2">➜</span>
                  <span className="text-purple-600 font-bold">{targetLevel}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {filteredLevels.length} cấp độ • 
                  {filteredLevels.reduce((total, level) => {
                    const course = courseData[level];
                    const hours = parseInt(course.stats[3].label);
                    return total + (isNaN(hours) ? 0 : hours);
                  }, 0)} giờ học
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Cards - Showing from current to target */}
        <div className="space-y-8">
          {filteredLevels.map((level, index) => {
            const course = courseData[level];
            const isFirst = index === 0;
            const isLast = index === filteredLevels.length - 1;
            const isTarget = level === targetLevel;
            
            return (
              <div 
                key={level} 
                className={`group relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500
                  ${isTarget ? 'ring-2 ring-purple-500 ring-offset-2' : ''}
                  ${isFirst ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Badges */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
                  {isFirst && (
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                      🚀 Bắt đầu
                    </span>
                  )}
                  {isTarget && (
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                      🎯 Mục tiêu
                    </span>
                  )}
                  {!isFirst && !isTarget && (
                    <span className="bg-gradient-to-r from-gray-500 to-gray-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      ⏳ Trên lộ trình
                    </span>
                  )}
                </div>
                
                <div className="relative p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    
                    {/* Level Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`
                          flex items-center justify-center w-12 h-12 rounded-xl text-white font-bold text-lg shadow-lg
                          bg-gradient-to-r ${course.color}
                        `}>
                          {course.level_num}
                        </div>
                        <div>
                          <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
                            {course.badge}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                            {course.level} - {course.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 font-medium mb-2">{course.subtitle}</p>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {course.description}
                      </p>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {course.stats.map((stat, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                            <span className="text-blue-600 text-lg material-symbols-outlined">
                              {stat.icon}
                            </span>
                            <span className="text-sm text-gray-700 font-medium">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <span className="text-lg">⏱️</span> {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-lg">📖</span> {course.stats[0].label}
                        </span>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="lg:w-64 flex flex-col justify-center">
                      <button className={`
                        w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg 
                        hover:shadow-xl transform hover:scale-105 transition-all duration-300
                        ${isTarget ? 'bg-gradient-to-r from-purple-600 to-pink-600' : `bg-gradient-to-r ${course.color}`}
                      `}>
                        <span className="block text-base">
                          {isTarget ? '🎯 Chinh phục ngay' : course.cta}
                        </span>
                        <span className="text-xs opacity-90 font-normal mt-1 block">
                          {isTarget 
                            ? `Đạt ${course.level} - Mục tiêu của bạn` 
                            : isFirst 
                              ? 'Bắt đầu hành trình' 
                              : `Từ ${allLevels[allLevels.indexOf(level) - 1]} lên ${course.level}`}
                        </span>
                      </button>
                      
                      {isTarget && (
                        <p className="text-xs text-center text-gray-500 mt-2">
                          ⭐ Hơn 10,000+ học viên đã thành công
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <section className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Tại sao nên chọn lộ trình này?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Lộ trình cá nhân hóa</h3>
              <p className="text-sm text-gray-600">Tùy chỉnh theo trình độ và mục tiêu của bạn. Học đúng những gì bạn cần.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Giáo trình chuẩn HSK</h3>
              <p className="text-sm text-gray-600">Nội dung được biên soạn theo cấu trúc đề thi HSK mới nhất của Hán Việt.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Cam kết đầu ra</h3>
              <p className="text-sm text-gray-600">Đạt được chứng chỉ HSK với lộ trình học tập rõ ràng và bài bản.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Sẵn sàng chinh phục tiếng Trung?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Bắt đầu hành trình của bạn ngay hôm nay. Hơn 10,000+ học viên đã thành công với lộ trình này.
            </p>
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              🚀 Bắt đầu học ngay - Miễn phí 7 ngày
            </button>
            <p className="text-sm text-blue-200 mt-3">✨ Không cần thẻ tín dụng. Hủy bất kỳ lúc nào.</p>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        * {
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
        }
        
        button:active {
          transform: scale(0.96);
        }
      `}</style>
    </div>
  );
}