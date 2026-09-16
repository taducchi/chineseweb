import Cookies from 'js-cookie'

export const updateProgress = async ( lessonData, setLessonData, nextLesson, setNextLesson,
                                        courseData, setCourseData, setLoadingUpdate, 
                                    API_URL, 
                                lesson_slug) => {
    setLoadingUpdate(true);
    const accessToken = Cookies.get('access')
    try {
        const response = await fetch(
            `${API_URL}api/courses/lessons/${lesson_slug}/update-progress/`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    status: 'completed',
                    progress_percentage: 100,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data);

        // ✅ 1. Cập nhật lessonData hiện tại
        setLessonData(prev => ({
            ...prev,
            ...data,
            is_completed: true,
        }));

        // ✅ 2. Cập nhật lesson trong courseData.modules + tính lại progress
        const { module_slug: returnedModuleSlug, lesson_slug: returnedLessonSlug } = data;
        const targetModuleSlug = returnedModuleSlug || module_slug;
        const targetLessonSlug = returnedLessonSlug || lesson_slug;

        if (targetModuleSlug && targetLessonSlug) {
            setCourseData(prev => {
                if (!prev?.modules) return prev;

                // Bước 1: cập nhật lesson trong module tương ứng
                let lessonChanged = false;

                const nextModules = prev.modules.map(module => {
                    if (module.slug !== targetModuleSlug) return module;

                    const nextLessons = (module.lessons ?? []).map(lesson => {
                        if (lesson.slug !== targetLessonSlug) return lesson;
                        lessonChanged = true;
                        return {
                            ...lesson,
                            ...data,
                            is_completed: true,
                        };
                    });

                    if (!lessonChanged) return module;
                    return { ...module, lessons: nextLessons };
                });

                if (!lessonChanged) return prev;

                // Bước 2: tính lại progress của course
                let totalLessons = 0;
                let completedLessons = 0;

                for (const module of nextModules) {
                    for (const lesson of module.lessons ?? []) {
                        totalLessons += 1;
                        if (lesson.is_completed) completedLessons += 1;
                    }
                }

                const progress = totalLessons === 0
                    ? 0
                    : Math.round((completedLessons / totalLessons) * 100);

                // Bước 3: trả về courseData mới
                return {
                    ...prev,
                    modules: nextModules,
                    progress,                  // 👈 cập nhật progress
                    total_lessons: totalLessons,       // (tuỳ chọn) nếu muốn lưu
                    completed_lessons: completedLessons, // (tuỳ chọn)
                };
            });
        }
    } catch (err) {
        console.error('Update progress failed:', err);
    } finally {
        setLoadingUpdate(false);
    }
};