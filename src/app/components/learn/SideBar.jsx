// components/Layout/Sidebar.js
'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '../Logo';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, onClose, course_slug, toggleSidebar }) {
        const [openModule, setOpenModule] = useState(1);
        const [isMobile, setIsMobile] = useState(false);
        const [activeLessonSlug, setActiveLessonSlug] = useState('');
        const [sidebarWidth, setSidebarWidth] = useState(320);
        const [isResizing, setIsResizing] = useState(false);
        const sidebarRef = useRef(null);
        const pathname = usePathname();
        const [modules, setModules] = useState([]);
        const [modulesLoading, setModulesLoading] = useState(true); 
        const {API_URL} = useAuth()
        useEffect(() => {
                // Fetch modules data from API
                setModulesLoading(true); // Bắt đầu loading
                
                const fetchModules = async () => {
                        try {
                                const response = await fetch(`${API_URL}api/courses/tieng-trung-hsk-1/`);
                                const data = await response.json();
                                setModules(data.modules || []);
                        } catch (error) {
                                console.error('Error fetching modules:', error);
                        } finally {
                                setModulesLoading(false); // Kết thúc loading
                        }
                };
                
                fetchModules();
        }, []);

        // Kiểm tra kích thước màn hình
        useEffect(() => {
                const checkMobile = () => {
                        setIsMobile(window.innerWidth < 1024);
                };

                checkMobile();
                window.addEventListener('resize', checkMobile);

                return () => window.removeEventListener('resize', checkMobile);
        }, []);

        // Load saved width from localStorage
        useEffect(() => {
                const savedWidth = localStorage.getItem('sidebarWidth');
                if (savedWidth) {
                        const width = parseInt(savedWidth);
                        if (width >= 240 && width <= 480) {
                                setSidebarWidth(width);
                        }
                }
        }, []);

        // Extract active lesson slug từ URL
        useEffect(() => {
                if (pathname && modules.length > 0) {
                        const segments = pathname.split('/');
                        const lessonSlug = segments[segments.length - 1];

                        if (lessonSlug && lessonSlug !== '') {
                                setActiveLessonSlug(lessonSlug);

                                const moduleSlug = segments[segments.length - 3];
                                const module = modules.find(m => m.slug === moduleSlug);
                                if (module) {
                                        setOpenModule(module.id);
                                }
                        }
                }
        }, [pathname, modules]);

        // Handle resize
        const handleResizeStart = (e) => {
                e.preventDefault();
                setIsResizing(true);
                document.addEventListener('mousemove', handleResizeMove);
                document.addEventListener('mouseup', handleResizeEnd);
                document.body.style.cursor = 'col-resize';
                document.body.style.userSelect = 'none';
        };

        const handleResizeMove = (e) => {
                if (!sidebarRef.current) return;

                const newWidth = e.clientX;
                const minWidth = 240;
                const maxWidth = 480;

                if (newWidth >= minWidth && newWidth <= maxWidth) {
                        setSidebarWidth(newWidth);
                        localStorage.setItem('sidebarWidth', newWidth.toString());
                }
        };

        const handleResizeEnd = () => {
                setIsResizing(false);
                document.removeEventListener('mousemove', handleResizeMove);
                document.removeEventListener('mouseup', handleResizeEnd);
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
        };

        const toggleModule = (moduleId) => {
                setOpenModule(openModule === moduleId ? null : moduleId);
        };

        const isLessonActive = (lessonSlug) => {
                return activeLessonSlug === lessonSlug;
        };

        const getLessonStyle = (lesson) => {
                if (isLessonActive(lesson.slug)) {
                        return 'bg-primary/10 text-primary border-l-2 border-primary';
                }

                if (lesson.status === 'playing') {
                        return 'bg-blue-50 text-blue-600 hover:bg-blue-100';
                }

                if (lesson.status === 'completed') {
                        return 'hover:bg-gray-50 text-gray-600 hover:text-gray-900';
                }

                return 'hover:bg-gray-50 text-gray-400 hover:text-gray-700';
        };

        const getLessonIcon = (lessonType) => {
                const iconMap = {
                        'video': 'play_circle',
                        'vocabulary': 'menu_book',
                        'grammar': 'text_fields',
                        'reading': 'chrome_reader_mode',
                        'practice': 'quiz',
                        'dictation': 'edit_note',
                        'speaking': 'record_voice_over',
                        'quiz': 'assignment',
                        'test': 'fact_check',
                        'listening': 'hearing',
                        'writing': 'edit_document',
                        'pronunciation': 'mic',
                        'conversation': 'forum',
                        'review': 'refresh',
                        'project': 'assignment_turned_in'
                };

                return iconMap[lessonType] || 'article';
        };

        return (
                <>
                        {/* Overlay for mobile/tablet */}
                        {isOpen && (
                                <div
                                        className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                                        onClick={onClose}
                                />
                        )}

                        {/* Mobile Menu Button */}
                        {/* {!isOpen && isMobile && (
                                <button
                                        onClick={toggleSidebar}
                                        className="fixed top-4 left-4 z-40 lg:hidden bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                                        aria-label="Mở menu"
                                >
                                        <span className="material-symbols-outlined text-gray-700">menu</span>
                                </button>
                        )} */}

                        {/* Sidebar */}
                        <aside
                                ref={sidebarRef}
                                className={`
                                        flex flex-col border-r border-gray-200 
                                        bg-white overflow-y-auto shrink-0 h-full z-30 
                                        transition-transform duration-300 ease-in-out
                                        fixed lg:static
                                        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                                        shadow-xl lg:shadow-none
                                `}
                                style={{
                                        width: isMobile ? '100%' : `${sidebarWidth}px`,
                                        maxWidth: isMobile ? '100%' : '480px',
                                        minWidth: isMobile ? '100%' : '240px'
                                }}
                        >
                                {/* Header */}
                                <Logo />
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
                                                        Tiến độ học tập
                                                </p>
                                        </div>

                                        <button
                                                onClick={onClose}
                                                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                aria-label="Đóng menu"
                                        >
                                                <span className="material-symbols-outlined">close</span>
                                        </button>
                                </div>

                                {/* Modules Accordion - Container chính */}
                                <div className="flex flex-col p-4 gap-2 flex-1 overflow-y-auto">
                                        {/* Loading Spinner */}
                                        {modulesLoading ? (
                                                <div className="flex flex-col items-center justify-center h-full gap-4">
                                                        <div className="relative">
                                                                {/* Spinner chính */}
                                                                <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-primary"></div>
                                                                {/* Inner dot */}
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                                                                </div>
                                                        </div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                                                                Đang tải bài học...
                                                        </p>
                                                </div>
                                        ) : modules.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500">
                                                        <span className="material-symbols-outlined text-4xl">folder_open</span>
                                                        <p className="text-sm">Không có bài học nào</p>
                                                </div>
                                        ) : (
                                                // Danh sách modules
                                                modules.map((module) => (
                                                        <div key={module.id} className="group">
                                                                {/* Module Header */}
                                                                <button
                                                                        onClick={() => !module.is_locked && toggleModule(module.id)}
                                                                        className={`
                                                                                flex w-full cursor-pointer items-center justify-between gap-2 p-3 rounded-lg 
                                                                                hover:bg-gray-50 transition-colors
                                                                                ${module.is_locked ? 'cursor-not-allowed opacity-60' : ''}
                                                                        `}
                                                                        disabled={module.is_locked}
                                                                >
                                                                        <div className="flex items-center gap-3">
                                                                                <div className={`
                                                                                        size-6 rounded flex items-center justify-center
                                                                                        ${module.is_locked ? 'bg-gray-100 text-gray-500' : 'bg-primary/10 text-primary'}
                                                                                `}>
                                                                                        <span className="material-symbols-outlined text-[18px]">
                                                                                                {module.is_locked ? 'lock' : 'crop_square'}
                                                                                        </span>
                                                                                </div>
                                                                                <span className={`
                                                                                        text-sm text-left
                                                                                        ${module.is_locked ? 'font-medium text-gray-500' : 'font-bold text-gray-900'}
                                                                                `}>
                                                                                        {module.title}
                                                                                </span>
                                                                        </div>
                                                                        {!module.is_locked && (
                                                                                <span className={`
                                                                                        material-symbols-outlined text-[20px] text-gray-500 
                                                                                        transition-transform duration-300 ease-in-out
                                                                                        ${module.id === openModule ? 'rotate-180' : 'rotate-0'}
                                                                                `}>
                                                                                        expand_more
                                                                                </span>
                                                                        )}
                                                                </button>

                                                                {/* Lessons Container */}
                                                                <div className={`
                                                                        overflow-hidden transition-all duration-500 ease-in-out
                                                                        ${!module.is_locked && module.lessons.length > 0 && module.id === openModule
                                                                                ? 'max-h-[2000px] opacity-100'
                                                                                : 'max-h-0 opacity-0'
                                                                        }
                                                                `}>
                                                                        <div className="pl-4 pr-1 py-1 flex flex-col gap-1 mt-1 border-l-2 border-gray-200 ml-6">
                                                                                {module.lessons.map((lesson) => (
                                                                                        <Link
                                                                                                key={lesson.id}
                                                                                                href={`/learn/courses/${course_slug}/${module.slug}/${lesson.lesson_type}/${lesson.slug}`}
                                                                                                onClick={() => {
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
                                                                                                {isLessonActive(lesson.slug) && (
                                                                                                        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-primary rounded-full" />
                                                                                                )}

                                                                                                <div className="flex items-center gap-3 min-w-0">
                                                                                                        <span className="material-symbols-outlined text-[18px]">
                                                                                                                {getLessonIcon(lesson.lesson_type)}
                                                                                                        </span>
                                                                                                        <div className="flex flex-col min-w-0">
                                                                                                                <span className="text-sm font-medium truncate">{lesson.title}</span>
                                                                                                                <span className="text-[10px] text-gray-500 truncate">{lesson.description}</span>
                                                                                                        </div>
                                                                                                </div>

                                                                                                <div className="flex items-center gap-1">
                                                                                                        {lesson.is_completed && (
                                                                                                                <span className="material-symbols-outlined text-[16px] text-green-500">
                                                                                                                        check_circle
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
                                                                </div>
                                                        </div>
                                                ))
                                        )}
                                </div>

                                {/* Footer */}
                                {isMobile && (
                                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                                                <p className="text-sm font-medium text-gray-900">Khóa học: {course_slug?.toUpperCase()}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                        Đang học: {activeLessonSlug ? `Bài ${activeLessonSlug.split('-').pop()}` : 'Module 1'}
                                                </p>
                                        </div>
                                )}
                        </aside>

                        {/* Resize Handle - chỉ hiển thị trên desktop */}
                        {!isMobile && (
                                <div
                                        className={`
                                                fixed top-0 z-40 cursor-col-resize hover:bg-blue-500/20 transition-all duration-150
                                                ${isResizing ? 'bg-blue-500/30' : 'bg-transparent'}
                                        `}
                                        style={{
                                                left: `${sidebarWidth}px`,
                                                width: '6px',
                                                height: '100vh',
                                                transform: 'translateX(-3px)',
                                        }}
                                        onMouseDown={handleResizeStart}
                                >
                                        {/* Visual indicator */}
                                        <div className={`
                                                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                                w-1 h-12 rounded-full transition-all duration-200
                                                ${isResizing ? 'bg-blue-500 h-16' : 'bg-gray-300 hover:bg-blue-400'}
                                        `} />

                                        {/* Drag hint dots */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                                <div className="w-1 h-1 rounded-full bg-gray-400" />
                                                <div className="w-1 h-1 rounded-full bg-gray-400" />
                                                <div className="w-1 h-1 rounded-full bg-gray-400" />
                                        </div>
                                </div>
                        )}
                </>
        );
}