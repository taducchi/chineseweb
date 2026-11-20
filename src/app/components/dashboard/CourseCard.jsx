// components/CourseCard.jsx
'use client'
import Link from 'next/link'

const DEFAULT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCV3PqHMYQJCQ4l1WhMC8nZcVPOj8sJRttCXKLVU-SnhqdwXidHPTPDeCTkUTSdhFznkr9iEJJfFLQ9KcPo8vXs2fDa47EWn_vCT1g44FIVz-su8eUkD7MIfPm4MRtnv98XwXJuRmZPROhS3TXCBZW-37Ci8L7Rol12CWZWmucFZ6MCtZvYHwjygYhzjsMkY21CfE3kA1Wdny21X72r9ep6dk2PY0D7qvuEgyzXHXHjX_H6ipj1qsiaAWanyoOkwjt0VSVeY8254so'

export default function CourseCard({ course }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg dark:border-slate-700 dark:bg-[#15222b]">
      <div className="flex flex-col md:flex-row">
        {/* ---------- Thumbnail ---------- */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden md:aspect-[4/3] md:w-52 lg:w-60">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url("${course.image ?? DEFAULT_IMAGE}")`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg backdrop-blur-sm">
            <span className="material-symbols-outlined text-[14px]">
              school
            </span>
            HSK {course.level ?? 1}
          </span>
        </div>

        {/* ---------- Content ---------- */}
        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 lg:p-6">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
              Khóa học hiện tại
            </span>
            <span className="text-xs font-medium text-slate-400">
              HSK cấp {course.level ?? 1}
            </span>
          </div>

          <h2 className="mb-2 text-base font-bold text-slate-900 dark:text-white sm:text-lg lg:text-xl">
            {course.title}
          </h2>

          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Làm quen với bảng chữ cái, phát âm cơ bản và 150 từ vựng thiết yếu
            cho người mới bắt đầu.
          </p>

          {/* Progress + CTA — hiển thị đồng nhất trên mọi breakpoint */}
          <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full flex-col gap-2 sm:max-w-[240px]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  Tiến độ
                </span>
                <span className="font-bold text-primary">
                  {course.progress}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-[width] duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            <Link
              href={`/learn/courses/${course.slug}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-md active:scale-[0.98]"
            >
              Tiếp tục bài học
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}