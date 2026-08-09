// components/Layout/VideoLesson.js
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function VideoLesson({ toggleSidebar, course_slug, module_slug, lesson_slug  }) {
    const [activeTab, setActiveTab] = useState('transcript');
    const [lessonData, setLessonData] = useState({});
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true); // ← Thêm state loading
    const [error, setError] = useState(null);
    const {API_URL} = useAuth()
    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}api/courses/${course_slug}/lessons/${lesson_slug}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch lesson data');
                }
                return response.json();
            })
            .then(data => {
                setLessonData(data);
                setContent(data.content || {});
                console.log(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching lesson:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const tabs = [
        { id: 'vocabulary', label: 'Từ vựng' },
        { id: 'grammar', label: 'Ngữ pháp' },
        { id: 'dialouge', label: 'Bài khoá' },
        { id: 'discussion', label: 'Thảo luận', badge: 12 }
    ];

    // Hiển thị loading
    if (loading) {
        return (
            <main className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark relative">
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="flex flex-col items-center gap-4">
                        {/* Spinner chính */}
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-500"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
                            Đang tải bài học...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    // Hiển thị lỗi
    if (error) {
        return (
            <main className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark relative">
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-red-500">error</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Có lỗi xảy ra</h3>
                        <p className="text-gray-500 dark:text-gray-400">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark relative">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                <div className="max-w-5xl mx-auto flex flex-col gap-6">
                    {/* Page Heading & Actions */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-light dark:border-border-dark pb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-text-main-light dark:text-text-main-dark mb-2">
                                {lessonData.title || 'Bài học'}
                            </h1>
                            <p className="text-text-sub-light dark:text-text-sub-dark">{lessonData.module_title || ''}</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-bold text-text-main-light dark:text-text-main-dark">
                                <span className="material-symbols-outlined text-[20px]">bookmark</span>
                                <span>Lưu</span>
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-blue-600 transition-colors text-white text-sm font-bold shadow-lg shadow-blue-500/20">
                                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                <span>Đánh dấu hoàn thành</span>
                            </button>
                        </div>
                    </div>

                    {/* Video Player Area - YouTube Embed */}
                    {/* <div className="w-full aspect-video rounded-xl overflow-hidden bg-black relative shadow-2xl">
                        {content?.video_id ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${content.video_id}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                <div className="text-center text-white">
                                    <span className="material-symbols-outlined text-6xl mb-2">play_circle</span>
                                    <p className="text-gray-400">Video không khả dụng</p>
                                </div>
                            </div>
                        )}
                    </div> */}
                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-black relative shadow-2xl"> {/* 4:3 aspect ratio */}
            <iframe
                src={`https://player.vimeo.com/video/${`1216750355`}`}
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title={"Video thử giảng"}
            />
        </div>

                    {/* Content Tabs */}
                    <div className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                        {/* Tab Headers */}
                        <div className="flex border-b border-border-light dark:border-border-dark overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab.id
                                        ? 'text-primary border-b-2 border-primary bg-primary/5'
                                        : 'text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark hover:bg-background-light dark:hover:bg-border-dark'
                                        }`}
                                >
                                    {tab.label}
                                    {tab.badge && (
                                        <span className="ml-2 bg-border-light dark:bg-border-dark px-1.5 py-0.5 rounded text-xs">
                                            {tab.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>




                        {/* Tab Content */}
                        <div className="p-6 md:p-8">
                            {activeTab === 'dialouge' && (
                                <>
                                    <h3 className="text-xl font-bold mb-4">Hội thoại: Chào Anh!</h3>
                                    <div className="space-y-6">
                                        {/* Dialogue items would be rendered here */}
                                        <div className="flex gap-4">
                                            <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary font-bold shrink-0">
                                                A
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-2xl font-body font-medium text-text-main-light dark:text-text-main-dark">
                                                    你好！
                                                </p>
                                                <p className="text-sm text-text-sub-light dark:text-text-sub-dark font-mono">
                                                    Nǐ hǎo!
                                                </p>
                                                <p className="text-base text-text-main-light dark:text-text-main-dark mt-1">
                                                    Hello!
                                                </p>
                                            </div>
                                            <button className="ml-auto size-8 flex items-center justify-center rounded-full hover:bg-background-light dark:hover:bg-border-dark text-text-sub-light transition-colors self-start">
                                                <span className="material-symbols-outlined text-[20px]">volume_up</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 'vocabulary' && (
                                <>
                                  
                                    <div className="space-y-6">
                                        {/* Dialogue items would be rendered here */}
                                        <div className="flex gap-4">
                                            <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary font-bold shrink-0">
                                                A
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-2xl font-body font-medium text-text-main-light dark:text-text-main-dark">
                                                    你好！
                                                </p>
                                                <p className="text-sm text-text-sub-light dark:text-text-sub-dark font-mono">
                                                    Nǐ hǎo!
                                                </p>
                                                <p className="text-base text-text-main-light dark:text-text-main-dark mt-1">
                                                    Xin chào
                                                </p>
                                            </div>
                                            <button className="ml-auto size-8 flex items-center justify-center rounded-full hover:bg-background-light dark:hover:bg-border-dark text-text-sub-light transition-colors self-start">
                                                <span className="material-symbols-outlined text-[20px]">volume_up</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* Add other tab contents here */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}