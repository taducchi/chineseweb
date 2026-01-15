import Link from "next/link";

export default function IntroCourseCard({ course }) {
    return (
       <div key={course.id} className="group flex flex-col bg-white dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:-translate-y-1">
    {/* Course Image and Level Badge */}
    <div className="relative h-48 overflow-hidden">
        <div className={`absolute top-3 left-3 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm border border-slate-200 dark:border-slate-700 ${course.level_color || 'text-success'}`}>
            {course.level_display || course.level}
        </div>
        {course.is_discounted && (
            <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-lg">
                -{course.discount_percentage}%
            </div>
        )}
        <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ 
                backgroundImage: `url('${course.thumbnail || '/images/course-default.jpg'}')`,
                backgroundColor: course.thumbnail ? 'transparent' : '#f3f4f6'
            }}
        ></div>
    </div>
 
    {/* Course Content */}
    <div className="flex flex-col flex-1 p-5">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-text-main dark:text-white line-clamp-2 group-hover:text-primary transition-colors flex-1 mr-2">
                {course.title}
            </h3>
            {course.rating > 0 && (
                <div className="flex items-center gap-1 text-amber-400 shrink-0">
                    <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                    <span className="text-sm font-bold text-text-main dark:text-slate-300">{course.rating}</span>
                </div>
            )}
        </div>

        {/* Short Description */}
        <p className="text-sm text-text-sub dark:text-slate-400 mb-4 line-clamp-2 flex-1">
            {course.short_description}
        </p>

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-xs text-text-sub dark:text-slate-400 mb-4 border-t border-slate-100 dark:border-slate-700 pt-3">
            <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>{course.total_lessons} bài</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>{course.duration_display}</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">group</span>
                <span>{course.students_display} học viên</span>
            </div>
        </div>

        {/* Price and Action Buttons */}
        <div className="flex gap-3 mt-auto">
            <div className="flex-1">
                {course.is_free ? (
                    <div className="text-lg font-bold text-green-600 dark:text-green-400 text-center py-2">
                        MIỄN PHÍ
                    </div>
                ) : (
                    <div className="mb-2">
                        {course.is_discounted ? (
                            <>
                                <div className="text-lg font-bold text-primary dark:text-blue-400">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.current_price)}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-slate-400 line-through">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                                </div>
                            </>
                        ) : (
                            <div className="text-lg font-bold text-text-main dark:text-white">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                            </div>
                        )}
                    </div>
                )}
                
                <Link
                    href={`/courses/${course.slug}`}
                    className={`block text-center ${course.is_free 
                        ? 'bg-green-500 hover:bg-green-600 shadow-green-200 dark:shadow-none' 
                        : 'bg-primary hover:bg-primary-dark shadow-blue-200 dark:shadow-none'
                    } text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-md`}
                >
                    {course.is_free ? 'Học ngay' : 'Tìm hiểu ngay'}
                </Link>
            </div>

        </div>
    </div>
</div> )
};