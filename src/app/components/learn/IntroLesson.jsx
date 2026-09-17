'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { updateProgress } from './progress/UpdateProgress';

// ─── ICONS ────────────────────────────────────────────────────
const Icon = ({ name, className = 'w-4 h-4' }) => {
    const icons = {
        clock: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
        bookmark: <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
        check: <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />,
        chevronLeft: <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
        chevronRight: <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
    };
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icons[name]}
        </svg>
    );
};

// ─── OBJECTIVE CARD ───────────────────────────────────────────
const ObjectiveCard = ({ index, title, items, accent = 'blue' }) => {
    const accents = {
        blue:    { dot: 'bg-blue-500',    ring: 'ring-blue-100',    text: 'text-blue-600',    bg: 'bg-blue-50/50' },
        emerald: { dot: 'bg-emerald-500', ring: 'ring-emerald-100', text: 'text-emerald-600', bg: 'bg-emerald-50/50' },
    };
    const a = accents[accent] || accents.blue;
    if (!items?.length) return null;

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
                <span className={`w-7 h-7 rounded-lg ${a.bg} ${a.text} flex items-center justify-center text-xs font-bold ring-4 ${a.ring}`}>
                    {index}
                </span>
                <h3 className="text-base font-bold text-slate-800">{title}</h3>
            </div>

            <ul className="space-y-2.5">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                        <span className={`w-1.5 h-1.5 rounded-full ${a.dot} mt-2 flex-shrink-0`} />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

// ─── PREREQUISITES ────────────────────────────────────────────
const PrerequisitesCard = ({ prerequisites = [], reviewLink }) => {
    if (!prerequisites.length) return null;

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4">Kiến thức cần có trước</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prerequisites.map((item, i) => (
                    <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-500 flex items-center justify-center">
                                {String.fromCharCode(65 + i)}
                            </span>
                            <h4 className="font-semibold text-slate-800 text-sm">{item.title}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                    </div>
                ))}
            </div>

            {reviewLink && (
                <div className="mt-4 flex items-center justify-between gap-3 text-xs bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
                    <span className="text-amber-900">
                        <strong>Ôn tập:</strong> {reviewLink.message}
                    </span>
                    <Link href={reviewLink.url} className="font-bold text-amber-700 hover:text-amber-900 whitespace-nowrap">
                        Xem →
                    </Link>
                </div>
            )}
        </div>
    );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────
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
            .then((r) => {
                if (!r.ok) throw new Error('Failed to fetch lesson data');
                return r.json();
            })
            .then((data) => {
                setLessonData(data);
                if (data?.next_lesson) setNextLesson(data.next_lesson);
                if (data?.prev_lesson) setPrevLesson(data.prev_lesson);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching lesson:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

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
            setLessonData((p) => ({ ...p, is_completed: true, progress_percentage: 100 }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingUpdate(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-slate-400 text-sm">Đang tải bài học...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-red-500 text-sm">Không thể tải bài học: {error}</div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <main className="p-5 sm:p-8 w-full space-y-6">

                {/* ─── HEADER ─── */}
                <header className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {lessonData.module_title || lessonData.course_slug}
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {lessonData.title || 'Giới thiệu bài học'}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        {lessonData.lesson_type_display && (
                            <span className="inline-flex items-center gap-1">
                                <Icon name="bookmark" className="w-3.5 h-3.5" />
                                {lessonData.lesson_type_display}
                            </span>
                        )}
                        {lessonData.duration_minutes > 0 && (
                            <span className="inline-flex items-center gap-1">
                                <Icon name="clock" className="w-3.5 h-3.5" />
                                {lessonData.duration_minutes} phút
                            </span>
                        )}
                    </div>
                </header>

                {/* ─── DESCRIPTION ─── */}
                {lessonData.description && (
                    <section className="rounded-xl bg-blue-50/60 border border-blue-100 p-5">
                        <div
                            className="text-sm text-slate-700 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: lessonData.description }}
                        />
                    </section>
                )}

                {/* ─── OBJECTIVES ─── */}
                {(lessonData?.content?.objectives?.knowledge?.length ||
                    lessonData?.content?.objectives?.skills?.length) && (
                    <section className="space-y-4">
                        <h2 className="text-lg font-bold text-slate-900">Mục tiêu cần đạt</h2>
                        <ObjectiveCard
                            index="01"
                            title="Kiến thức trọng tâm"
                            items={lessonData?.content?.objectives?.knowledge || []}
                            accent="blue"
                        />
                        <ObjectiveCard
                            index="02"
                            title="Kỹ năng ứng dụng"
                            items={lessonData?.content?.objectives?.skills || []}
                            accent="emerald"
                        />
                    </section>
                )}

                {/* ─── PREREQUISITES ─── */}
                <PrerequisitesCard
                    prerequisites={lessonData?.content?.prerequisites || []}
                    reviewLink={lessonData?.content?.review_link}
                />

                {/* ─── NAVIGATION ─── */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end items-stretch sm:items-center gap-3 pt-2">
                    <button
                        onClick={() =>
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
                            )
                        }
                        disabled={loadingUpdate || lessonData.is_completed}
                        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
                            lessonData.is_completed
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-primary hover:bg-blue-600 text-white border-transparent shadow-sm'
                        }`}
                    >
                        <span className={`material-symbols-outlined text-[18px] ${loadingUpdate ? 'animate-spin' : ''}`}>
                            {loadingUpdate ? 'progress_activity' : 'check_circle'}
                        </span>
                        {loadingUpdate
                            ? 'Đang lưu...'
                            : lessonData.is_completed
                            ? 'Đã hoàn thành'
                            : 'Đánh dấu hoàn thành'}
                    </button>

                    {nextLesson ? (
                        <Link
                            href={
                                lessonData.is_completed
                                    ? `/learn/courses/${course_slug}/${module_slug}/${nextLesson.lesson_type}/${nextLesson.slug}`
                                    : '#'
                            }
                            onClick={(e) => !lessonData.is_completed && e.preventDefault()}
                            aria-disabled={!lessonData.is_completed}
                            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                                lessonData.is_completed
                                    ? 'bg-slate-900 hover:bg-slate-800 text-white'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                            }`}
                        >
                            Bài tiếp theo
                            <Icon name="chevronRight" className="w-4 h-4" />
                        </Link>
                    ) : (
                        <button
                            disabled
                            className="px-5 py-2.5 bg-slate-100 text-slate-400 text-sm font-semibold rounded-lg cursor-not-allowed border border-slate-200"
                        >
                            Đã hết bài
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}