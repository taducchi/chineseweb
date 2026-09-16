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
        check: (
            <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
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

const LessonHeader = ({ title }) => (
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

// ✅ Checkbox item cho từng kỹ năng
const SkillCheckbox = ({ id, html, checked, onChange, accent = 'emerald' }) => {
    const accentMap = {
        blue: {
            border: 'border-blue-200',
            bg: 'bg-blue-50/50',
            checkedBg: 'bg-blue-100 border-blue-400',
            checkbox: 'text-blue-600',
        },
        emerald: {
            border: 'border-emerald-200',
            bg: 'bg-emerald-50/50',
            checkedBg: 'bg-emerald-100 border-emerald-400',
            checkbox: 'text-emerald-600',
        },
    };
    const styles = accentMap[accent] || accentMap.emerald;

    return (
        <label
            htmlFor={id}
            className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all select-none ${
                checked
                    ? `${styles.checkedBg} shadow-sm`
                    : `${styles.border} ${styles.bg} hover:bg-white hover:shadow-sm`
            }`}
        >
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className={`mt-0.5 w-4 h-4 rounded border-slate-300 ${styles.checkbox} focus:ring-2 focus:ring-offset-0 cursor-pointer flex-shrink-0`}
            />
            <span
                className={`text-sm sm:text-base leading-relaxed ${
                    checked ? 'text-slate-800 font-medium' : 'text-slate-600'
                }`}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </label>
    );
};

// ✅ Section chứa danh sách checkbox
const ChecklistSection = ({
    index,
    title,
    subtitle,
    items,
    checkedItems,
    onToggle,
    accent = 'emerald',
    idPrefix,
}) => {
    if (!items || items.length === 0) return null;

    const checkedCount = items.filter((_, i) => checkedItems.includes(`${idPrefix}-${i}`)).length;

    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
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
                <span className="text-xs font-bold text-slate-400 whitespace-nowrap">
                    {checkedCount}/{items.length}
                </span>
            </div>

            <div className="space-y-3">
                {items.map((item, i) => {
                    const id = `${idPrefix}-${i}`;
                    return (
                        <SkillCheckbox
                            key={id}
                            id={id}
                            html={item}
                            checked={checkedItems.includes(id)}
                            onChange={() => onToggle(id)}
                            accent={accent}
                        />
                    );
                })}
            </div>
        </div>
    );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────
export default function SummaryLesson({ course_slug, module_slug, lesson_slug }) {
    const [lessonData, setLessonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [nextLesson, setNextLesson] = useState(null);
    const [prevLesson, setPrevLesson] = useState(null);
    const [error, setError] = useState(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    // ✅ Lưu danh sách id các kỹ năng đã đạt được
    const [checkedItems, setCheckedItems] = useState([]);

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
                const mergedData = {
                    ...data,
                    description: data?.description || MOCK_INTRO_LESSON.content.description,
                    objectives: {
                        knowledge:
                            data?.objectives?.knowledge ||
                            MOCK_INTRO_LESSON.content.objectives.knowledge,
                        skills:
                            data?.objectives?.skills ||
                            MOCK_INTRO_LESSON.content.objectives.skills,
                    },
                    prerequisites:
                        data?.prerequisites?.length > 0
                            ? data.prerequisites
                            : MOCK_INTRO_LESSON.content.prerequisites,
                    review_link: data?.review_link || MOCK_INTRO_LESSON.content.review_link,
                };

                setLessonData(mergedData);

                if (Array.isArray(data?.achieved_skills)) {
                    setCheckedItems(data.achieved_skills);
                }

                if (data?.next_lesson) setNextLesson(data.next_lesson);
                if (data?.prev_lesson) setPrevLesson(data.prev_lesson);

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching lesson:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // ✅ Toggle checkbox
    const handleToggle = (id) => {
        setCheckedItems((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
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

    const totalSkills =
        (lessonData?.objectives?.knowledge?.length || 0) +
        (lessonData?.objectives?.skills?.length || 0);
    const allChecked = totalSkills > 0 && checkedItems.length >= totalSkills;
    const isCompleted = lessonData?.is_completed;

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <main className="p-6 sm:p-8 md:p-10 max-w-7xl w-full mx-auto space-y-8">
                {/* ─── HEADER ─── */}
                <section data-purpose="lesson-header-action">
                    <LessonHeader title={lessonData.title || 'Tổng kết bài học'} />
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

                {/* ─── CHECKLIST MỤC TIÊU ─── */}
                <section className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                        <div>
                            <span className="text-[11px] font-bold tracking-wider text-emerald-600 uppercase block mb-1">
                                Tự đánh giá
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                Đánh dấu kỹ năng bạn đã đạt được
                            </h2>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">
                            Tick vào những mục bạn đã nắm vững sau bài học
                        </p>
                    </div>

                    <ChecklistSection
                        index="01"
                        title="Kiến thức trọng tâm"
                        subtitle="Những khái niệm và quy tắc đã nắm"
                        items={lessonData?.objectives?.knowledge || []}
                        checkedItems={checkedItems}
                        onToggle={handleToggle}
                        accent="blue"
                        idPrefix="knowledge"
                    />

                    <ChecklistSection
                        index="02"
                        title="Kỹ năng ứng dụng"
                        subtitle="Những gì bạn đã có thể làm sau bài học"
                        items={lessonData?.objectives?.skills || []}
                        checkedItems={checkedItems}
                        onToggle={handleToggle}
                        accent="emerald"
                        idPrefix="skills"
                    />
                </section>

                {/* ─── ACTION BAR ─── */}
                <section className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-200 -mx-6 sm:-mx-8 md:-mx-10 px-6 sm:px-8 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-sm text-slate-500 font-medium">
                        Đã đạt:{' '}
                        <span className="font-bold text-slate-800">
                            {checkedItems.length}/{totalSkills}
                        </span>{' '}
                        kỹ năng
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* ✅ Trường hợp 1: Chưa hoàn thành bài học */}
                        {!isCompleted && (
                            <button
                                type="button"
                                onClick={() => {
                                    if (!allChecked || loadingUpdate) return;
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
                                disabled={!allChecked || loadingUpdate}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-colors text-white text-sm font-bold shadow-lg disabled:opacity-70 disabled:cursor-not-allowed ${
        lessonData.is_completed
            ? "bg-green-500 hover:bg-green-600 shadow-green-500/20 cursor-not-allowed"
            : "bg-primary hover:bg-blue-600 shadow-blue-500/20"
    }`}
                            >
                                {loadingUpdate ? (
                                    <span className="material-symbols-outlined text-[20px] animate-spin">
                                        progress_activity
                                    </span>
                                ) : (
                                    <span className="material-symbols-outlined text-[20px]">
                                        workspace_premium
                                    </span>
                                )}
                                <span>
                                    {loadingUpdate ? 'Đang lưu...' : 'Hoàn thành bài học'}
                                </span>
                            </button>
                        )}

                        {/* ✅ Trường hợp 2: Đã hoàn thành → hiển thị badge + nút bài tiếp theo */}
                        {isCompleted && (
                            <>
                                <span className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-200">
                                    <span className="material-symbols-outlined text-[20px]">
                                        check_circle
                                    </span>
                                    Đã hoàn thành
                                </span>

                                {nextLesson && (
                                    <Link
                                        href={`/learn/courses/${course_slug}/${module_slug}/${nextLesson.lesson_type}/${nextLesson.slug}`}
                                        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg shadow-md transition-all duration-300 active:scale-95"
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
                                )}
                            </>
                        )}
                    </div>
                </section>

                <div className="h-4" />
            </main>
        </div>
    );
}