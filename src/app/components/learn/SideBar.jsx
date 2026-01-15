// components/Layout/Sidebar.js
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isOpen, onClose, course_slug, toggleSidebar }) {
  const [openModule, setOpenModule] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [activeLessonSlug, setActiveLessonSlug] = useState('');
  
  const pathname = usePathname();
  
  // Kiểm tra kích thước màn hình
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Extract active lesson slug từ URL
  useEffect(() => {
    if (pathname) {
      // URL pattern: /learn/courses/[course_slug]/[module_slug]/[type]/[lesson_slug]
      const segments = pathname.split('/');
      
      // Tìm lesson_slug (phần tử cuối cùng của URL)
      const lessonSlug = segments[segments.length - 1];
      
      // Kiểm tra nếu đây thực sự là lesson_slug (không phải empty hoặc special)
      if (lessonSlug && lessonSlug !== '') {
        setActiveLessonSlug(lessonSlug);
        
        // Tự động mở module chứa lesson đang active
        const moduleSlug = segments[segments.length - 3]; // module_slug là phần thứ 3 từ cuối
        const module = modules.find(m => m.slug === moduleSlug);
        if (module) {
          setOpenModule(module.id);
        }
      }
    }
  }, [pathname]);

  const toggleModule = (moduleId) => {
    setOpenModule(openModule === moduleId ? null : moduleId);
  };

  const modules = [
    {
      id: 1,
      title: "Module 1: Chào hỏi",
      icon: "folder_open",
      isLocked: false,
      isOpen: openModule === 1,
      lessons: [
        { id: 1, title: "Lesson 1.1: Bài giảng", subtitle: "12 mins • Video", icon: "play_circle", status: "completed", type: "video", slug: "lesson-1-1" },
        { id: 2, title: "Lesson 1.2: Từ mới", subtitle: "Flashcards • 25 words", icon: "menu_book", status: "completed", type: "vocabulary", slug: "lesson-1-2" },
        { id: 3, title: "Lesson 1.3: Chép chính tả", subtitle: "Practice • 15 mins", icon: "edit_note", type: "dictation", slug: "lesson-1-3" },
        { id: 4, title: "Lesson 1.4: Bài đọc", subtitle: "Reading • 10 mins", icon: "chrome_reader_mode", status: "pending", type: "reading", slug: "lesson-1-4" },
        { id: 5, title: "Lesson 1.5: Luyện tập", subtitle: "Exercises • 20 mins", icon: "quiz", status: "pending", type: "practice", slug: "lesson-1-5" }
      ],
      slug: "module-1"
    },
    {
      id: 2,
      title: "Module 2: Siêu thị",
      icon: "lock",
      isLocked: true,
      isOpen: openModule === 2,
      lessons: [],
      slug: "module-2"
    },
    {
      id: 3,
      title: "Module 3: Trường học",
      icon: "lock",
      isLocked: true,
      isOpen: openModule === 3,
      lessons: [],
      slug: "module-3"
    }
  ];

  // Hàm kiểm tra xem lesson có đang active không
  const isLessonActive = (lessonSlug) => {
    return activeLessonSlug === lessonSlug;
  };

  // Hàm kiểm tra lesson status kết hợp với active state
  const getLessonStyle = (lesson) => {
    // Nếu lesson đang active (đang xem)
    if (isLessonActive(lesson.slug)) {
      return 'bg-primary/10 text-primary border-l-2 border-primary';
    }
    
    // Nếu lesson có status là playing (tiếp theo sẽ học)
    if (lesson.status === 'playing') {
      return 'bg-blue-50 text-blue-600 hover:bg-blue-100';
    }
    
    // Nếu lesson đã completed
    if (lesson.status === 'completed') {
      return 'hover:bg-gray-50 text-gray-600 hover:text-gray-900';
    }
    
    // Mặc định cho pending lessons
    return 'hover:bg-gray-50 text-gray-400 hover:text-gray-700';
  };

  return (
    <>
      {/* Overlay for mobile/tablet - chỉ hiện khi sidebar mở */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu Button - hiển thị trên mobile/tablet */}
      {!isOpen && isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-40 lg:hidden bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Mở menu"
        >
          <span className="material-symbols-outlined text-gray-700">menu</span>
        </button>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          w-80 flex flex-col border-r border-gray-200 
          bg-white overflow-y-auto shrink-0 h-full z-30 
          transition-transform duration-300 ease-in-out
          fixed lg:static
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          shadow-xl lg:shadow-none
        `}
      >
        {/* Header với nút đóng trên mobile/tablet */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between lg:justify-start">
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <p className="text-base font-bold text-gray-900">Khoá học HSK 3 Tiêu chuẩn</p>
              <p className="text-primary text-sm font-bold">35%</p>
            </div>
            <div className="rounded-full bg-gray-200 h-2 overflow-hidden mt-2">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: '35%' }} />
            </div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mt-1">
              Course Progress
            </p>
          </div>
          
          {/* Nút đóng cho mobile/tablet */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Đóng menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modules Accordion */}
        <div className="flex flex-col p-4 gap-2 flex-1">
          {modules.map((module) => (
            <div key={module.id} className="group">
              <button
                onClick={() => !module.isLocked && toggleModule(module.id)}
                className={`
                  flex w-full cursor-pointer items-center justify-between gap-2 p-3 rounded-lg 
                  hover:bg-gray-50 transition-colors
                  ${module.isLocked ? 'cursor-not-allowed opacity-60' : ''}
                `}
                disabled={module.isLocked}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    size-6 rounded flex items-center justify-center
                    ${module.isLocked ? 'bg-gray-100 text-gray-500' : 'bg-primary/10 text-primary'}
                  `}>
                    <span className="material-symbols-outlined text-[18px]">
                      {module.icon}
                    </span>
                  </div>
                  <span className={`
                    text-sm text-left
                    ${module.isLocked ? 'font-medium text-gray-500' : 'font-bold text-gray-900'}
                  `}>
                    {module.title}
                  </span>
                </div>
                {!module.isLocked && (
                  <span className="material-symbols-outlined text-[20px] text-gray-500 transition-transform duration-200 group-hover:rotate-180">
                    expand_more
                  </span>
                )}
              </button>

              {module.isOpen && module.lessons.length > 0 && (
                <div className="pl-4 pr-1 py-1 flex flex-col gap-1 mt-1 border-l-2 border-gray-200 ml-6">
                  {module.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/learn/courses/${course_slug}/${module.slug}/${lesson.type}/${lesson.slug}`}
                      onClick={() => {
                        // Đóng sidebar khi click lesson trên mobile/tablet
                        if (isMobile) {
                          onClose();
                        }
                      }}
                      className={`
                        flex items-center justify-between p-2.5 rounded-lg 
                        transition-colors relative
                        ${getLessonStyle(lesson)}
                      `}
                    >
                      {/* Active indicator dot */}
                      {isLessonActive(lesson.slug) && (
                        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-primary rounded-full" />
                      )}
                      
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="material-symbols-outlined text-[18px]">
                          {lesson.icon}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium truncate">{lesson.title}</span>
                          <span className="text-[10px] text-gray-500 truncate">{lesson.subtitle}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {lesson.status === 'completed' && (
                          <span className="material-symbols-outlined text-[16px] text-green-500">
                            check_circle
                          </span>
                        )}
                        {lesson.status === 'playing' && !isLessonActive(lesson.slug) && (
                          <span className="material-symbols-outlined text-[16px] text-blue-500">
                            graphic_eq
                          </span>
                        )}
                        {isLessonActive(lesson.slug) && (
                          <span className="material-symbols-outlined text-[16px] text-primary animate-pulse">
                            radio_button_checked
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer với thông tin khóa học trên mobile */}
        {isMobile && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm font-medium text-gray-900">Khóa học: {course_slug?.toUpperCase()}</p>
            <p className="text-xs text-gray-500 mt-1">
              Đang học: {activeLessonSlug ? `Bài ${activeLessonSlug.split('-').pop()}` : 'Module 1'}
            </p>
          </div>
        )}
      </aside>
    </>
  );
}