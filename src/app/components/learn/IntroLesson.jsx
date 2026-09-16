'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { updateProgress } from './progress/UpdateProgress';
// ─── MOCK DATA ────────────────────────────────────────────────
const MOCK_INTRO_LESSON = {
    content: {
        description:
            '<p>Trong bài này, bạn sẽ học cách <strong>hỏi và trả lời giờ</strong> trong tiếng Trung, cách phân biệt <strong>点 (giờ)</strong> và <strong>分 (phút)</strong>, và cách dùng <strong>零</strong> khi số phút nhỏ hơn 10.</p><p>Bài học phù hợp cho người mới bắt đầu, đã biết chào hỏi cơ bản.</p>',

        difficulty: 'beginner',
        difficulty_label: 'Cơ bản',
        level: 'HSK 1',
        course_name: 'Tiếng Trung Nhập Môn GenZ',
        estimated_duration: 10,

        objectives: {
            knowledge: [
                'Phân biệt bản chất và cách dùng của <strong>点</strong> (diǎn - giờ) và <strong>分</strong> (fēn - phút).',
                'Quy tắc bắt buộc chèn chữ <strong>零</strong> (líng) khi số phút từ 01 đến 09 (ví dụ: <strong>五点零五分</strong>).',
                'Nắm vững 5 từ vựng nền tảng về thời gian: <strong>现在, 点, 分, 中午, 时候</strong>.',
            ],
            skills: [
                'Mẫu câu hỏi giờ tiêu chuẩn: <strong>现在几点？</strong> (Bây giờ là mấy giờ?)',
                'Cấu trúc phản xạ trả lời: <code>现在 + [số] + 点 + [số] + 分</code>',
                'Hình thành phản xạ nhận diện mặt đồng hồ và nói giờ lập tức trong giao tiếp hàng ngày.',
            ],
        },

        prerequisites: [
            {
                title: 'Giao tiếp & chào hỏi cơ bản',
                description:
                    'Đã làm quen và phát âm chuẩn các câu giao tiếp: <strong>你好</strong> (nǐ hǎo), <strong>谢谢</strong> (xièxie).',
            },
            {
                title: 'Quy tắc đếm số từ 1 đến 60',
                description:
                    'Thuộc quy tắc ghép số thứ tự (<strong>一, 二, 三... 十, 二十, 五十九</strong>) để ghép số giờ và số phút tự nhiên.',
            },
        ],

        review_link: {
            message:
                'Nếu chưa nhớ vững số đếm 1-60, bạn có thể xem lại bài ôn số đếm trong kho tài liệu.',
            url: '/learn/courses/hsk1-nhap-mon/on-so-dem',
        },
    },
};

// ─── ICONS ────────────────────────────────────────────────────
const Icon = ({ name, className = 'w-4 h-4' }) => {
    const icons = {
        clock: (
            <path
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        ),
        bookmark: (
            <path
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        ),
        check: (
            <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
            />
        ),
        chevronLeft: (
            <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        ),
        chevronRight: (
            <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        ),
    };
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icons[name]}
        </svg>
    );
};

// ─── SUB COMPONENTS ──────────────────────────────────────────
const LessonHeader = ({
    title,
    difficulty,
    duration,
    level,
    courseName,
    isCompleted,
    onBookmark,
    onComplete,
}) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {title}
                </h1>
               
            </div>

          
        </div>

    </div>
);

const ObjectiveCard = ({ index, title, subtitle, items, accent = 'blue' }) => {
    const accentMap = {
        blue: {
            dot: 'bg-blue-400',
            label: 'text-blue-600',
            border: 'border-blue-100',
            bg: 'bg-blue-50/40',
        },
        emerald: {
            dot: 'bg-emerald-400',
            label: 'text-emerald-600',
            border: 'border-emerald-100',
            bg: 'bg-emerald-50/40',
        },
    };
    const accentStyles = accentMap[accent] || accentMap.blue;

    if (!items || items.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 pb-5 mb-6 border-b border-slate-100">
                <span className="text-3xl font-black font-mono text-slate-300 leading-none">
                    {index}
                </span>
                <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-wide">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-sm text-slate-400 font-medium mt-0.5">{subtitle}</p>
                    )}
                </div>
            </div>

            <ul className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {items.map((item, i) => (
                    <li
                        key={i}
                        className={`flex items-start gap-3 p-3 rounded-lg ${accentStyles.bg} ${accentStyles.border} border`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${accentStyles.dot} mt-2 flex-shrink-0`}
                        />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

// ✅ SỬA: dùng prop `prerequisites` truyền vào, KHÔNG dùng lessonData
const PrerequisitesCard = ({ prerequisites = [], reviewLink }) => {
    if (!prerequisites || prerequisites.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="border-b border-slate-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                    <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                        Yêu cầu tiên quyết
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        Kiến thức cần có trước
                    </h2>
                </div>
                <p className="text-sm text-slate-400 font-medium">
                    Những phần cần nắm chắc trước khi tiếp tục
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prerequisites.map((item, i) => (
                    <div
                        key={i}
                        className="p-5 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2 hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-2.5">
                            <span className="text-xs font-mono font-bold text-slate-400">
                                {String.fromCharCode(65 + i)}
                            </span>
                            <h4 className="font-bold text-slate-800 text-base">{item.title}</h4>
                        </div>
                        <p
                            className="text-sm text-slate-600 leading-relaxed pl-5"
                            dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                    </div>
                ))}
            </div>

            {reviewLink && (
                <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200/70 p-4 text-xs sm:text-sm text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-amber-500 text-[20px]">
                            lightbulb
                        </span>
                        <span>
                            <strong className="font-bold">Lưu ý ôn tập:</strong>{' '}
                            {reviewLink.message}
                        </span>
                    </div>
                    <Link
                        href={reviewLink.url}
                        className="text-xs font-bold text-amber-700 hover:text-amber-800 whitespace-nowrap self-end sm:self-auto"
                    >
                        Xem bài ôn tập →
                    </Link>
                </div>
            )}
        </div>
    );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────
export default function IntroLesson({ course_slug, module_slug, lesson_slug }) {
    const [lessonData, setLessonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [nextLesson, setNextLesson] = useState(null);
    const [prevLesson, setPrevLesson] = useState(null);
    const [error, setError] = useState(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const { API_URL } = useAuth();
    const accessToken = Cookies.get('access');
    const { courseData, setCourseData } = useCourse();
    
    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}api/courses/${course_slug}/lessons/${lesson_slug}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch lesson data');
                }
                return response.json();
            })
            .then((data) => {
                // ✅ SỬA: đặt objectives/prerequisites/review_link ở top-level
                const mergedData = {
                    ...data,
                    // Description: ưu tiên backend, fallback mock
                    description:
                        data?.description || MOCK_INTRO_LESSON.content.description,
                    // Objectives: ưu tiên backend, fallback mock
                    objectives: {
                        knowledge:
                            data?.objectives?.knowledge ||
                            MOCK_INTRO_LESSON.content.objectives.knowledge,
                        skills:
                            data?.objectives?.skills ||
                            MOCK_INTRO_LESSON.content.objectives.skills,
                    },
                    // Prerequisites: ưu tiên backend, fallback mock
                    prerequisites:
                        data?.prerequisites?.length > 0
                            ? data.prerequisites
                            : MOCK_INTRO_LESSON.content.prerequisites,
                    // Review link: ưu tiên backend, fallback mock
                    review_link:
                        data?.review_link || MOCK_INTRO_LESSON.content.review_link,
                };

                setLessonData(mergedData);

                if (data?.next_lesson) {
                    setNextLesson(data.next_lesson);
                }
                if (data?.prev_lesson) {
                    setPrevLesson(data.prev_lesson);
                }

                console.log('LessonData', mergedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching lesson:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleBookmark = () => {
        setIsBookmarked((v) => !v);
    };

    const handleComplete = async () => {
        if (loadingUpdate || lessonData?.is_completed) return;
        setLoadingUpdate(true);
        try {
            const res = await fetch(
                `${API_URL}api/courses/${course_slug}/lessons/${lesson_slug}/complete/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to mark complete');
            setLessonData((prev) => ({
                ...prev,
                is_completed: true,
                progress_percentage: 100,
            }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingUpdate(false);
        }
    };

    // ─── Loading / Error ───
    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-slate-400 text-sm font-medium">Đang tải bài học...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-red-500 text-sm font-medium">
                    Không thể tải bài học: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <main className="p-6 sm:p-8 md:p-10 max-w-7xl w-full mx-auto space-y-8">
                {/* ─── HEADER ─── */}
                <section data-purpose="lesson-header-action">
                    <LessonHeader
                        title={lessonData.title || 'Giới thiệu bài học'}
                        difficulty={lessonData.lesson_type_display}
                        duration={lessonData.duration_minutes}
                        level={lessonData.module_title}
                        courseName={lessonData.course_slug}
                        isCompleted={lessonData.is_completed}
                        onBookmark={handleBookmark}
                        onComplete={handleComplete}
                    />
                </section>

                {/* ─── DESCRIPTION ─── */}
                {lessonData.description && (
                    <section className="bg-gradient-to-br from-blue-50/70 to-indigo-50/50 rounded-2xl p-6 sm:p-8 border border-blue-100">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-blue-500 text-[24px] flex-shrink-0">
                                info
                            </span>
                            <div
                                className="text-slate-700 leading-relaxed text-sm sm:text-base"
                                dangerouslySetInnerHTML={{ __html: lessonData.description }}
                            />
                        </div>
                    </section>
                )}

                {/* ─── OBJECTIVES: 2 CARD FULL-WIDTH ─── */}
                <section className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                        <div>
                           
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                Mục tiêu cần đạt
                            </h2>
                        </div>
                      
                    </div>

                    <ObjectiveCard
                        index="01"
                        title="Kiến thức trọng tâm"
                        subtitle="Những khái niệm và quy tắc cần nắm"
                        items={lessonData?.objectives?.knowledge || []}
                        accent="blue"
                    />

                    <ObjectiveCard
                        index="02"
                        title="Kỹ năng ứng dụng"
                        subtitle="Những gì bạn có thể làm sau bài học"
                        items={lessonData?.objectives?.skills || []}
                        accent="emerald"
                    />
                </section>

                {/* ─── PREREQUISITES ─── */}
                <PrerequisitesCard
                    prerequisites={lessonData?.prerequisites || []}
                    reviewLink={lessonData?.review_link}
                />

                {/* ─── NAVIGATION ─── */}
                <div className="mt-6 flex justify-end items-center gap-3">
                  <button
    onClick={() => {
        updateProgress(
            lessonData,
            setLessonData,
            nextLesson,
            setNextLesson,
            courseData,
            setCourseData,
            setLoadingUpdate,
            API_URL,
            lesson_slug
        );
    }}
    disabled={loadingUpdate || lessonData.is_completed}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold border transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
        lessonData.is_completed
            ? "bg-emerald-50 text-emerald-700 border-emerald-200 cursor-not-allowed"
            : "bg-primary hover:bg-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20"
    }`}
>
    {loadingUpdate ? (
        <span className="material-symbols-outlined text-[20px] animate-spin">
            progress_activity
        </span>
    ) : (
        <span className="material-symbols-outlined text-[20px]">
            check_circle
        </span>
    )}

    <span>
        {loadingUpdate
            ? "Đang lưu..."
            : lessonData.is_completed
            ? "Đã hoàn thành"
            : "Đánh dấu hoàn thành"}
    </span>
</button>
          {nextLesson ? (
    <Link
        href={
            lessonData.is_completed
                ? `/learn/courses/${course_slug}/${module_slug}/${nextLesson.lesson_type}/${nextLesson.slug}`
                : "#"
        }
        onClick={(e) => {
            if (!lessonData.is_completed) {
                e.preventDefault();
            }
        }}
        aria-disabled={!lessonData.is_completed}
        className={`px-6 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-300 ${
            lessonData.is_completed
                ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95"
                : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 pointer-events-auto"
        }`}
    >
        <span>Bài tiếp theo</span>
        <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
            />
        </svg>
    </Link>
) : (
    <button
        disabled
        className="px-6 py-2.5 bg-slate-100 text-slate-400 text-sm font-medium rounded-lg cursor-not-allowed border border-slate-200"
    >
        Đã hết bài
    </button>
)}
                </div>

                {/* Padding bottom để không bị Footer che */}
                <div className="h-4" />
            </main>
        </div>
    );
}