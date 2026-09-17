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
        check: <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />,
        chevronRight: <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
        book: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
        sparkle: <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
        homework: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
    };
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icons[name]}
        </svg>
    );
};

// ─── KEY POINTS ───────────────────────────────────────────────
const KeyPointsSection = ({ items }) => {
    if (!items?.length) return null;

    return (
        <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Icon name="sparkle" className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-slate-800">Điểm chính cần ghi nhớ</h3>
            </div>

            <ul className="space-y-2.5">
                {items.map((item, i) => {
                    const text = typeof item === 'string' ? item : item?.content || '';
                    const label = typeof item === 'object' ? item?.title : null;
                    return (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                            <span className="w-5 h-5 rounded-md bg-amber-50 border border-amber-100 text-[10px] font-bold text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                {i + 1}
                            </span>
                            <span>
                                {label && <strong className="text-slate-800">{label}: </strong>}
                                <span dangerouslySetInnerHTML={{ __html: text }} />
                            </span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

// ─── KEY VOCABULARY ───────────────────────────────────────────
const KeyVocabularySection = ({ items }) => {
    if (!items?.length) return null;

    return (
        <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon name="book" className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-slate-800">Từ vựng trọng tâm</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((w, i) => (
                    <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-lg font-bold text-slate-900">{w.chinese}</span>
                                {w.pinyin && (
                                    <span className="text-xs text-blue-600 font-medium">{w.pinyin}</span>
                                )}
                            </div>
                            {w.meaning && (
                                <p className="text-xs text-slate-600 mt-1">{w.meaning}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// ─── KEY GRAMMAR ──────────────────────────────────────────────
const KeyGrammarSection = ({ items }) => {
    if (!items?.length) return null;

    return (
        <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Icon name="check" className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-slate-800">Ngữ pháp trọng tâm</h3>
            </div>

            <div className="space-y-3">
                {items.map((g, i) => (
                    <div key={i} className="p-4 rounded-lg bg-emerald-50/40 border border-emerald-100">
                        <div className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-md bg-white border border-emerald-200 text-[10px] font-bold text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                {i + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                                {g.title && (
                                    <h4 className="font-semibold text-slate-800 text-sm mb-1">
                                        {g.title}
                                    </h4>
                                )}
                                {g.structure && (
                                    <code className="block text-xs bg-white border border-emerald-200 text-emerald-700 rounded px-2 py-1 mb-1.5 font-mono">
                                        {g.structure}
                                    </code>
                                )}
                                {(g.explanation || g.content) && (
                                    <p
                                        className="text-xs text-slate-600 leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: g.explanation || g.content,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// ─── HOMEWORK ─────────────────────────────────────────────────
const HomeworkSection = ({ items }) => {
    // Parse nếu là string
    let list = items;
    if (typeof items === 'string') {
        try {
            list = JSON.parse(items);
        } catch (e) {
            console.error('Failed to parse homework:', e);
            list = [];
        }
    }

    if (!Array.isArray(list) || list.length === 0) return null;

    return (
        <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Icon name="homework" className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-slate-800">Bài tập về nhà</h3>
            </div>

            <ul className="space-y-2.5">
                {list.map((task, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                        <span className="w-5 h-5 rounded-md bg-purple-50 border border-purple-100 text-[10px] font-bold text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                        </span>
                        <span>{task}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function SummaryLesson({ course_slug, module_slug, lesson_slug }) {
    const [lessonData, setLessonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [nextLesson, setNextLesson] = useState(null);
    const [prevLesson, setPrevLesson] = useState(null);
    const [error, setError] = useState(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

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

    const content = lessonData?.content || {};
    const isCompleted = lessonData?.is_completed;

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <main className="p-5 sm:p-8 w-full space-y-6">
                {/* ─── HEADER ─── */}
                <header className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {lessonData.module_title || lessonData.course_slug}
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {content.title || lessonData.title || 'Tổng kết bài học'}
                    </h1>
                    {content.description && (
                        <p
                            className="text-sm text-slate-500 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: content.description }}
                        />
                    )}
                </header>

                {/* ─── NỘI DUNG TỔNG KẾT ─── */}
                {content.content && (
                    <section className="rounded-xl bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-100 p-5 sm:p-6">
                        <div
                            className="text-sm sm:text-base text-slate-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: content.content }}
                        />
                    </section>
                )}

                {/* ─── ĐIỂM CHÍNH ─── */}
                <KeyPointsSection items={content.key_points} />

                {/* ─── TỪ VỰNG ─── */}
                <KeyVocabularySection items={content.key_vocabulary} />

                {/* ─── NGỮ PHÁP ─── */}
                <KeyGrammarSection items={content.key_grammar} />

                {/* ─── BÀI TẬP VỀ NHÀ ─── */}
                <HomeworkSection items={content.homework} />

                {/* ─── ACTION BAR ─── */}
                <section className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-200 -mx-5 sm:-mx-8 px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-sm text-slate-500 font-medium">
                        {isCompleted ? (
                            <span className="text-emerald-600 font-semibold">✓ Bạn đã hoàn thành bài này</span>
                        ) : (
                            <span>Hoàn thành để mở bài tiếp theo</span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {!isCompleted && (
                            <button
                                type="button"
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
                                disabled={loadingUpdate}
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-primary hover:bg-blue-600 shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className={`material-symbols-outlined text-[18px] ${loadingUpdate ? 'animate-spin' : ''}`}>
                                    {loadingUpdate ? 'progress_activity' : 'workspace_premium'}
                                </span>
                                {loadingUpdate ? 'Đang lưu...' : 'Hoàn thành bài học'}
                            </button>
                        )}

                        {isCompleted && (
                            <>
                                <span className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-200">
                                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                    Đã hoàn thành
                                </span>

                                {nextLesson && (
                                    <Link
                                        href={`/learn/courses/${course_slug}/${module_slug}/${nextLesson.lesson_type}/${nextLesson.slug}`}
                                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition-colors"
                                    >
                                        Bài tiếp theo
                                        <Icon name="chevronRight" className="w-4 h-4" />
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}