// components/Layout/VideoLesson.js
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function VideoLesson({ toggleSidebar, course_slug, module_slug, lesson_slug }) {
        const [activeTab, setActiveTab] = useState('vocabulary');
        const [lessonData, setLessonData] = useState({});
        const [content, setContent] = useState({});
        const [loading, setLoading] = useState(true); // ← Thêm state loading
        const [error, setError] = useState(null);
        const [words, setWords] = useState({})
        const [nextLesson, setNextLesson] = useState({})

        const { API_URL } = useAuth()
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
                                if (data?.content?.vocabulary_content) {
                                        setWords(data.content.vocabulary_content.words || []);
                                } else {
                                        setWords([]); // Hoặc xử lý mặc định
                                }
                                if (data?.next_lesson) {
                                        setNextLesson(data.next_lesson)
                                } else {
                                }
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
                                                        src={`https://player.vimeo.com/video/${content.video_id}`}
                                                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                                                        frameBorder="0"
                                                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                                        referrerPolicy="strict-origin-when-cross-origin"

                                                />
                                        </div>

                                        {/* Content Tabs */}
                                        <div className="mt-6 flex justify-end">
                                                <Link
                                                        href={`/learn/courses/${course_slug}/${module_slug}/${nextLesson.lesson_type}/${nextLesson.slug}`}
                                                        className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                                                >
                                                        <span>Bài tiếp theo</span>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                </Link>
                                        </div>
                                        <div className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                                                {/* Tab Headers */}
                                                <div className="flex border-b border-border-light dark:border-border-dark overflow-x-auto scrollbar-none">
                                                        <div className="flex min-w-full">
                                                                {tabs.map((tab) => (
                                                                        <button
                                                                                key={tab.id}
                                                                                onClick={() => setActiveTab(tab.id)}
                                                                                className={`
                        relative px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors flex-shrink-0
                        ${activeTab === tab.id
                                                                                                ? 'text-primary'
                                                                                                : 'text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark hover:bg-background-light dark:hover:bg-border-dark'
                                                                                        }
                    `}
                                                                        >
                                                                                {tab.label}
                                                                                {tab.badge && (
                                                                                        <span className="ml-1 sm:ml-2 bg-border-light dark:bg-border-dark px-1.5 py-0.5 rounded text-[10px] sm:text-xs">
                                                                                                {tab.badge}
                                                                                        </span>
                                                                                )}

                                                                                {/* Active indicator - bottom border */}
                                                                                {activeTab === tab.id && (
                                                                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                                                                                )}
                                                                        </button>
                                                                ))}
                                                        </div>
                                                </div>

                                                {/* Tab Content */}
                                                <div className="p-4 sm:p-6 md:p-8">
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
                                                                <div className="space-y-6">
                                                                        {words.map((word, index) => (
                                                                                <div
                                                                                        key={word.id || index}
                                                                                        className="group relative bg-white dark:bg-gray-800/30 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-gray-200/60 dark:border-gray-700/30 hover:border-blue-400/40 dark:hover:border-blue-400/30 transition-all duration-300 hover:-translate-y-0.5"
                                                                                >
                                                                                        {/* Mobile: Layout dạng cột dọc */}
                                                                                        <div className="block md:hidden p-4 space-y-3">
                                                                                                {/* Hàng 1: Số thứ tự + Từ vựng + Audio */}
                                                                                                <div className="flex items-center gap-3">
                                                                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 flex items-center justify-center ring-1 ring-blue-200/50 dark:ring-blue-400/20 flex-shrink-0">
                                                                                                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                                                                                                        {String(index + 1).padStart(2, '0')}
                                                                                                                </span>
                                                                                                        </div>
                                                                                                        <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                                                                                                                {word.chinese}
                                                                                                        </span>
                                                                                                        {word.audio_file && word.audio_file.trim() !== '' && (
                                                                                                                <button
                                                                                                                        className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 flex items-center justify-center flex-shrink-0"
                                                                                                                        onClick={() => {
                                                                                                                                try {
                                                                                                                                        new Audio(word.audio_file).play();
                                                                                                                                } catch (error) {
                                                                                                                                        console.error('Audio playback failed:', error);
                                                                                                                                }
                                                                                                                        }}
                                                                                                                >
                                                                                                                        <span className="material-symbols-outlined text-[18px]">volume_up</span>
                                                                                                                </button>
                                                                                                        )}
                                                                                                </div>

                                                                                                {/* Hàng 2: Pinyin */}
                                                                                                <div>
                                                                                                        <span className="inline-block text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700/40 px-3 py-1 rounded-lg border border-gray-200/50 dark:border-gray-600/30 tracking-wide">
                                                                                                                {word.pinyin}
                                                                                                        </span>
                                                                                                </div>

                                                                                                {/* Hàng 3: Nghĩa + Badges */}
                                                                                                <div className="flex flex-wrap items-center gap-2">
                                                                                                        <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                                                                                                {word.meaning}
                                                                                                        </span>
                                                                                                        <div className="flex items-center gap-2 ml-auto">
                                                                                                                {word.level && (
                                                                                                                        <span className="text-[10px] font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 px-2.5 py-1 rounded-full shadow-sm">
                                                                                                                                HSK {word.level}
                                                                                                                        </span>
                                                                                                                )}
                                                                                                                {word.is_learned && (
                                                                                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-400/20">
                                                                                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                                                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                                                                                </svg>
                                                                                                                                Learned
                                                                                                                        </span>
                                                                                                                )}
                                                                                                        </div>
                                                                                                </div>

                                                                                                {/* Phần mở rộng Mobile */}
                                                                                                {(word.example_sentence || word.image_file || word.review_count > 0) && (
                                                                                                        <div className="pt-3 border-t border-gray-100/60 dark:border-gray-700/20 space-y-3">
                                                                                                                {/* Hình ảnh */}
                                                                                                                {(word.image_file || word.image_url) && (
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Hình:</span>
                                                                                                                                {(word.image_file && word.image_file.trim() !== '') ? (
                                                                                                                                        <img
                                                                                                                                                src={word.image_file}
                                                                                                                                                alt={word.chinese}
                                                                                                                                                className="h-12 w-12 object-cover rounded-lg border border-gray-200/50 dark:border-gray-700/30"
                                                                                                                                                onError={(e) => e.target.style.display = 'none'}
                                                                                                                                        />
                                                                                                                                ) : (word.image_url && word.image_url.trim() !== '') ? (
                                                                                                                                        <img
                                                                                                                                                src={word.image_url}
                                                                                                                                                alt={word.chinese}
                                                                                                                                                className="h-12 w-12 object-cover rounded-lg border border-gray-200/50 dark:border-gray-700/30"
                                                                                                                                                onError={(e) => e.target.style.display = 'none'}
                                                                                                                                        />
                                                                                                                                ) : null}
                                                                                                                        </div>
                                                                                                                )}

                                                                                                                {/* Ví dụ câu */}
                                                                                                                {word.example_sentence && word.example_sentence.trim() !== '' && (
                                                                                                                        <div className="flex flex-col gap-1.5">
                                                                                                                                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Ví dụ:</span>
                                                                                                                                <div className="flex flex-col gap-1">
                                                                                                                                        <span className="text-base text-gray-800 dark:text-gray-200 font-medium">
                                                                                                                                                {word.example_sentence}
                                                                                                                                        </span>
                                                                                                                                        {word.example_pinyin && word.example_pinyin.trim() !== '' && (
                                                                                                                                                <span className="text-sm text-gray-400 dark:text-gray-500 font-mono">
                                                                                                                                                        {word.example_pinyin}
                                                                                                                                                </span>
                                                                                                                                        )}
                                                                                                                                        {word.example_translation && word.example_translation.trim() !== '' && (
                                                                                                                                                <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                                                                                                                                                        {word.example_translation}
                                                                                                                                                </span>
                                                                                                                                        )}
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                )}
                                                                                                        </div>
                                                                                                )}
                                                                                        </div>

                                                                                        {/* Tablet & Desktop: Layout dạng hàng ngang */}
                                                                                        <div className="hidden md:block">
                                                                                                <div className="flex items-center gap-4 px-6 py-5 overflow-x-auto">
                                                                                                        {/* Cột 1: Số thứ tự */}
                                                                                                        <div className="w-10 flex-shrink-0">
                                                                                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 flex items-center justify-center ring-1 ring-blue-200/50 dark:ring-blue-400/20 group-hover:ring-blue-400/70 dark:group-hover:ring-blue-400/40 transition-all">
                                                                                                                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                                                                                                                {String(index + 1).padStart(2, '0')}
                                                                                                                        </span>
                                                                                                                </div>
                                                                                                        </div>

                                                                                                        {/* Cột 2: Từ vựng + Audio */}
                                                                                                        <div className="w-28 lg:w-32 flex-shrink-0 flex items-center gap-2 lg:gap-3">
                                                                                                                <span className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                                                                                                                        {word.chinese}
                                                                                                                </span>
                                                                                                                {word.audio_file && word.audio_file.trim() !== '' && (
                                                                                                                        <button
                                                                                                                                className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 flex items-center justify-center flex-shrink-0"
                                                                                                                                onClick={() => {
                                                                                                                                        try {
                                                                                                                                                new Audio(word.audio_file).play();
                                                                                                                                        } catch (error) {
                                                                                                                                                console.error('Audio playback failed:', error);
                                                                                                                                        }
                                                                                                                                }}
                                                                                                                        >
                                                                                                                                <span className="material-symbols-outlined text-[16px] lg:text-[18px]">volume_up</span>
                                                                                                                        </button>
                                                                                                                )}
                                                                                                        </div>

                                                                                                        {/* Cột 3: Pinyin */}
                                                                                                        <div className="w-32 lg:w-40 flex-shrink-0">
                                                                                                                <span className="inline-block text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700/40 px-2 lg:px-3 py-1 rounded-lg border border-gray-200/50 dark:border-gray-600/30 tracking-wide truncate max-w-full">
                                                                                                                        {word.pinyin}
                                                                                                                </span>
                                                                                                        </div>

                                                                                                        {/* Cột 4: Nghĩa */}
                                                                                                        <div className="flex-1 min-w-[80px] lg:min-w-[120px]">
                                                                                                                <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                                                                                                                        {word.meaning}
                                                                                                                </span>
                                                                                                        </div>

                                                                                                        {/* Cột 5: Badges */}
                                                                                                        <div className="w-24 lg:w-28 flex-shrink-0 flex items-center justify-end gap-1 lg:gap-2">
                                                                                                                {word.level && (
                                                                                                                        <span className="text-[9px] lg:text-[10px] font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 px-2 lg:px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap">
                                                                                                                                HSK {word.level}
                                                                                                                        </span>
                                                                                                                )}
                                                                                                                {word.is_learned && (
                                                                                                                        <span className="inline-flex items-center gap-0.5 lg:gap-1 text-[9px] lg:text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 lg:px-2.5 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-400/20 whitespace-nowrap">
                                                                                                                                <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                                                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                                                                                </svg>
                                                                                                                                <span className="hidden xs:inline">Learned</span>
                                                                                                                        </span>
                                                                                                                )}
                                                                                                        </div>
                                                                                                </div>

                                                                                                {/* Phần mở rộng Tablet/Desktop */}
                                                                                                {(word.example_sentence || word.image_file || word.review_count > 0) && (
                                                                                                        <div className="px-6 pb-4 pt-0 border-t border-gray-100/60 dark:border-gray-700/20">
                                                                                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                                                                                                                        {/* Hình ảnh */}
                                                                                                                        {(word.image_file || word.image_url) && (
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Hình:</span>
                                                                                                                                        {(word.image_file && word.image_file.trim() !== '') ? (
                                                                                                                                                <img
                                                                                                                                                        src={word.image_file}
                                                                                                                                                        alt={word.chinese}
                                                                                                                                                        className="h-12 w-12 object-cover rounded-lg border border-gray-200/50 dark:border-gray-700/30"
                                                                                                                                                        onError={(e) => e.target.style.display = 'none'}
                                                                                                                                                />
                                                                                                                                        ) : (word.image_url && word.image_url.trim() !== '') ? (
                                                                                                                                                <img
                                                                                                                                                        src={word.image_url}
                                                                                                                                                        alt={word.chinese}
                                                                                                                                                        className="h-12 w-12 object-cover rounded-lg border border-gray-200/50 dark:border-gray-700/30"
                                                                                                                                                        onError={(e) => e.target.style.display = 'none'}
                                                                                                                                                />
                                                                                                                                        ) : null}
                                                                                                                                </div>
                                                                                                                        )}

                                                                                                                        {/* Ví dụ câu */}
                                                                                                                        {word.example_sentence && word.example_sentence.trim() !== '' && (
                                                                                                                                <div className="flex flex-col gap-1.5">
                                                                                                                                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Ví dụ:</span>
                                                                                                                                        <div className="flex flex-col gap-1">
                                                                                                                                                <span className="text-sm lg:text-base text-gray-800 dark:text-gray-200 font-medium">
                                                                                                                                                        {word.example_sentence}
                                                                                                                                                </span>
                                                                                                                                                {word.example_pinyin && word.example_pinyin.trim() !== '' && (
                                                                                                                                                        <span className="text-xs lg:text-sm text-gray-400 dark:text-gray-500 font-mono">
                                                                                                                                                                {word.example_pinyin}
                                                                                                                                                        </span>
                                                                                                                                                )}
                                                                                                                                                {word.example_translation && word.example_translation.trim() !== '' && (
                                                                                                                                                        <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 italic">
                                                                                                                                                                {word.example_translation}
                                                                                                                                                        </span>
                                                                                                                                                )}
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        )}
                                                                                                                </div>
                                                                                                        </div>
                                                                                                )}
                                                                                        </div>
                                                                                </div>
                                                                        ))}

                                                                        {/* Hiển thị khi không có dữ liệu */}
                                                                        {words.length === 0 && (
                                                                                <div className="text-center py-12">
                                                                                        <p className="text-gray-500 dark:text-gray-400">Chưa có từ vựng nào</p>
                                                                                </div>
                                                                        )}
                                                                </div>
                                                        )}
                                                        {/* Add other tab contents here */}
                                                </div>
                                        </div>
                                </div>
                        </div>
                </main>
        );
}