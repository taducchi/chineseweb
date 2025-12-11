'use client';
import { useState, useEffect } from 'react';

export default function Roadmap() {
  const [currentLevel, setCurrentLevel] = useState('HSK 3');
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Roadmap data
  const roadmapData = [
    {
      id: 1,
      level: 'HSK 1',
      title: 'Khởi động',
      status: 'completed',
      progress: 100,
      stats: [
        { icon: 'translate', label: '150 từ vựng' },
        { icon: 'edit_square', label: '174 Hán tự' },
        { icon: 'menu_book', label: '45 ngữ pháp' },
        { icon: 'schedule', label: '40 giờ' }
      ],
      color: 'bg-green-500',
      buttonText: 'Ôn tập lại'
    },
    {
      id: 2,
      level: 'HSK 2',
      title: 'Cơ bản',
      status: 'completed',
      progress: 100,
      stats: [
        { icon: 'translate', label: '300 từ vựng' },
        { icon: 'edit_square', label: '347 Hán tự' },
        { icon: 'menu_book', label: '45 ngữ pháp' },
        { icon: 'schedule', label: '40 giờ' }
      ],
      color: 'bg-green-500',
      buttonText: 'Ôn tập lại'
    },
    {
      id: 3,
      level: 'HSK 3',
      title: 'Trung cấp',
      status: 'current',
      progress: 75,
      stats: [
        { icon: 'translate', label: '600 từ vựng' },
        { icon: 'edit_square', label: '617 Hán tự' },
        { icon: 'menu_book', label: '45 ngữ pháp' },
        { icon: 'schedule', label: '60 giờ' }
      ],
      color: 'bg-blue-500',
      buttonText: 'Tiếp tục học bài 12'
    },
    {
      id: 4,
      level: 'HSK 4',
      title: 'Tiền cao cấp',
      status: 'locked',
      progress: 0,
      stats: [
        { icon: 'translate', label: '1200 từ vựng' },
        { icon: 'edit_square', label: '1000 Hán tự' }
      ],
      color: 'bg-gray-500',
      buttonText: 'Mở khóa'
    },
    {
      id: 5,
      level: 'HSK 5',
      title: 'Cao cấp',
      status: 'locked',
      progress: 0,
      stats: [
        { icon: 'translate', label: '2500 từ vựng' },
        { icon: 'edit_square', label: '1500 Hán tự' }
      ],
      color: 'bg-gray-500',
      buttonText: 'Mở khóa'
    },
    {
      id: 6,
      level: 'HSK 6',
      title: 'Thành thạo',
      status: 'locked',
      progress: 0,
      stats: [
        { icon: 'translate', label: '5000 từ vựng' },
        { icon: 'edit_square', label: '2500 Hán tự' }
      ],
      color: 'bg-gray-500',
      buttonText: 'Mở khóa'
    },
    {
      id: 7,
      level: 'HSK 7-9',
      title: 'Chuyên gia',
      status: 'locked',
      progress: 0,
      stats: [
        { icon: 'translate', label: '11000+ từ' },
        { icon: 'edit_square', label: 'Dịch thuật' }
      ],
      color: 'bg-gray-500',
      buttonText: 'Mở khóa'
    }
  ];

  const stats = {
    currentLevel: 'HSK 3',
    wordsLearned: 450,
    totalWords: 5000,
    streakDays: 12
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải lộ trình...</p>
        </div>
      </div>
    );
  }

  return (
    <>
 
      
      {/* Main Container */}
      <div className="min-h-screen bg-white">
        
        {/* Desktop Header */}
        <header className="hidden lg:block sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <div>
                  <h1 className="text-xl font-bold font-display text-gray-900">Lộ trình học tiếng Trung</h1>
                  <p className="text-sm text-gray-600 mt-1">Hành trình chinh phục HSK từ cơ bản đến thành thạo</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden xl:flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Cấp độ hiện tại</p>
                    <p className="text-lg font-bold text-primary">{stats.currentLevel}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Từ đã học</p>
                    <p className="text-lg font-bold text-gray-900">
                      {stats.wordsLearned}<span className="text-sm text-gray-500">/{stats.totalWords}</span>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Ngày liên tiếp</p>
                    <p className="text-lg font-bold text-orange-500">{stats.streakDays} 🔥</p>
                  </div>
                </div>
                
                <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <div>
                  <h1 className="text-lg font-bold font-display text-gray-900">Lộ trình của bạn</h1>
                </div>
              </div>
              
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          
          {/* Hero Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900 mb-3">
              Hành trình chinh phục <br/>
              <span className="text-primary">Tiếng Trung HSK</span>
            </h2>
            <p className="text-gray-600 mb-6">Từ cơ bản đến thành thạo với lộ trình được cá nhân hóa</p>
            
            {/* Mobile Stats */}
            <div className="lg:hidden grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Cấp độ hiện tại</p>
                <p className="text-lg font-bold text-primary">{stats.currentLevel}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Từ đã học</p>
                <p className="text-lg font-bold text-gray-900">
                  {stats.wordsLearned}<span className="text-xs font-normal text-gray-500">/{stats.totalWords}</span>
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Ngày liên tiếp</p>
                <p className="text-lg font-bold text-orange-500">{stats.streakDays} 🔥</p>
              </div>
            </div>
          </div>

          {/* Roadmap Container */}
          <div className="relative">
            
            {/* Timeline Line for Desktop */}
            <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-gray-300 ml-4 z-0"></div>
            
            {/* Roadmap Items */}
            <div className="space-y-6 lg:space-y-8">
              {roadmapData.map((item, index) => (
                <div key={item.id} className="relative">
                  
                  {/* Timeline Node for Desktop */}
                  <div className="hidden lg:flex absolute left-8 -translate-x-1/2 z-10">
                    <div className={`
                      flex h-8 w-8 items-center justify-center rounded-full border-4 border-white shadow-lg
                      ${item.status === 'completed' ? 'bg-green-500' : 
                        item.status === 'current' ? 'bg-primary shadow-glow' : 
                        'bg-gray-300'}
                    `}>
                      <span className="material-symbols-outlined text-white text-sm">
                        {item.status === 'completed' ? 'check' : 
                         item.status === 'current' ? 'play_arrow' : 
                         'lock'}
                      </span>
                    </div>
                  </div>

                  {/* Card Container */}
                  <div className={`
                    lg:ml-16 rounded-xl border transition-all duration-300
                    ${item.status === 'current' ? 
                      'bg-gradient-to-br from-blue-50 to-white border-blue-200 shadow-lg' : 
                      'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'}
                  `}>
                    
                    {/* Card Header */}
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {/* Mobile Status Badge */}
                          <div className={`
                            lg:hidden flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow
                            ${item.status === 'completed' ? 'bg-green-500' : 
                              item.status === 'current' ? 'bg-primary shadow-glow' : 
                              'bg-gray-300'}
                          `}>
                            <span className="material-symbols-outlined text-white text-sm">
                              {item.status === 'completed' ? 'check' : 
                               item.status === 'current' ? 'play_arrow' : 
                               'lock'}
                            </span>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                                {item.level} - {item.title}
                              </h3>
                              <span className={`
                                px-3 py-1 rounded-full text-xs font-bold uppercase
                                ${item.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                  item.status === 'current' ? 'bg-blue-100 text-primary' : 
                                  'bg-gray-100 text-gray-600'}
                              `}>
                                {item.status === 'completed' ? 'Đã xong' : 
                                 item.status === 'current' ? 'Đang học' : 
                                 'Chưa mở'}
                              </span>
                            </div>
                            
                            {item.status === 'current' && (
                              <p className="text-primary text-sm font-medium mt-1">Tiến độ: {item.progress}%</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Progress Bar for Current Level */}
                        {item.status === 'current' && (
                          <div className="md:w-48 lg:w-64">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Tiến độ</span>
                              <span className="font-semibold text-primary">{item.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-500"
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                        {item.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="flex items-center gap-2">
                            <span className={`
                              material-symbols-outlined text-lg
                              ${item.status === 'current' ? 'text-primary' : 
                                item.status === 'completed' ? 'text-green-600' : 
                                'text-gray-400'}
                            `}>
                              {stat.icon}
                            </span>
                            <span className={`
                              text-sm
                              ${item.status === 'current' ? 'text-gray-700' : 
                                item.status === 'completed' ? 'text-gray-600' : 
                                'text-gray-500'}
                            `}>
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Action Button */}
                      <button className={`
                        mt-6 w-full md:w-auto px-6 py-3 rounded-lg font-medium text-sm transition-colors
                        ${item.status === 'current' ? 
                          'bg-primary hover:bg-primary-dark text-white' : 
                          item.status === 'completed' ? 
                          'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300' : 
                          'bg-gray-100 text-gray-500 cursor-not-allowed'}
                      `}>
                        <div className="flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-base">
                            {item.status === 'current' ? 'play_circle' : 
                             item.status === 'completed' ? 'replay' : 
                             'lock'}
                          </span>
                          {item.buttonText}
                          {item.status === 'current' && (
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                          )}
                        </div>
                      </button>
                    </div>
                    
                    {/* Decorative Element for Current Level */}
                    {item.status === 'current' && (
                      <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl -z-10"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information Section for Desktop */}
          <div className="hidden lg:block mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lời khuyên học tập</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">schedule</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Duy trì đều đặn</h4>
                  </div>
                  <p className="text-sm text-gray-600">Học 30 phút mỗi ngày hiệu quả hơn 3.5 giờ cuối tuần</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-600">repeat</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Ôn tập thường xuyên</h4>
                  </div>
                  <p className="text-sm text-gray-600">Ôn lại từ vựng cũ ít nhất 1 lần/tuần để ghi nhớ lâu</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-orange-500">auto_stories</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Học qua ngữ cảnh</h4>
                  </div>
                  <p className="text-sm text-gray-600">Đọc truyện, xem phim giúp nhớ từ vựng tự nhiên hơn</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Bottom Action Button */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <button className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-colors">
            <span className="material-symbols-outlined fill-current">play_circle</span>
            Tiếp tục học: HSK 3
          </button>
        </div>

        {/* Desktop Action Button in Content */}
        <div className="hidden lg:block container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <button className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-colors text-lg">
              <span className="material-symbols-outlined fill-current">play_circle</span>
              Bắt đầu học ngay hôm nay - Tiếp tục với HSK 3
            </button>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        .shadow-glow {
          box-shadow: 0 0 20px -5px rgba(19, 127, 236, 0.5);
        }
        
        /* Hide scrollbar but keep functionality */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Smooth transitions */
        * {
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
      `}</style>
    </>
  );
}