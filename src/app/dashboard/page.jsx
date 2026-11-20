// app/dashboard/page.jsx (Trang chủ dashboard)
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useAuth } from '../context/AuthContext'
import CourseCard from '../components/dashboard/CourseCard'

export default function DashboardPage() {
  const { user, loadingCount, API_URL } = useAuth()
  const [greeting, setGreeting] = useState('')
  const [timeIcon, setTimeIcon] = useState('')
  const [courses, setCourses] = useState([])
  const accessToken = Cookies.get('access')

  useEffect(() => {
    if (!accessToken) return

    fetch(`${API_URL}api/courses/enrollments/my-courses/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setCourses(res)
      })
  }, [accessToken, API_URL])

  useEffect(() => {
    const hour = new Date().getHours()

    let greet = ''
    let icon = ''

    if (hour >= 5 && hour < 12) {
      greet = 'Chào buổi sáng'
      icon = '🌅'
    } else if (hour >= 12 && hour < 14) {
      greet = 'Chào buổi trưa'
      icon = '☀️'
    } else if (hour >= 14 && hour < 18) {
      greet = 'Chào buổi chiều'
      icon = '🌤️'
    } else if (hour >= 18 && hour < 22) {
      greet = 'Chào buổi tối'
      icon = '🌙'
    } else {
      greet = 'Chào buổi đêm'
      icon = '🌃'
    }

    setGreeting(greet)
    setTimeIcon(icon)
  }, [])

  // Thống kê nhanh — class viết tường minh để Tailwind JIT compile đúng
  const stats = [
    {
      value: '350',
      label: 'Từ Đã Thuộc',
      icon: 'school',
      bgClass: 'bg-purple-100 dark:bg-purple-900/30',
      textClass: 'text-purple-600',
    },
    {
      value: '45h',
      label: 'Giờ Học',
      icon: 'schedule',
      bgClass: 'bg-amber-100 dark:bg-amber-900/30',
      textClass: 'text-amber-600',
    },
    {
      value: '12.5k',
      label: 'Tổng Điểm Kinh Nghiệm',
      icon: 'emoji_events',
      bgClass: 'bg-emerald-100 dark:bg-emerald-900/30',
      textClass: 'text-emerald-600',
    },
  ]

  // Bài tập — dotClass tường minh
  const assignments = [
    {
      title: 'Luyện Thanh Điệu',
      type: 'Ghi Âm',
      due: 'Đến hạn ngày mai',
      status: 'urgent',
      dotClass: 'bg-red-500',
    },
    {
      title: 'Viết Chữ Hán',
      type: 'Bài Tập',
      due: 'Đến hạn thứ Sáu',
      status: 'pending',
      dotClass: 'bg-orange-500',
    },
    {
      title: 'Bài Kiểm Tra Từ Vựng',
      type: 'Hoàn thành hôm qua',
      due: 'Đã Hoàn Thành',
      status: 'completed',
      dotClass: 'bg-slate-500',
    },
  ]

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-8">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
              {greeting}
              {loadingCount == 0 ? `, ${user?.first_name ?? 'bạn'}` : ', bạn'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
              Hãy tiếp tục hành trình đến với sự trôi chảy. Bạn đang làm rất
              tốt!
            </p>
          </div>

          <button className="px-4 py-2 bg-white dark:bg-[#15222b] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            Xem Báo Cáo
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN (Main Focus) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Course List — mỗi khóa học là 1 card tách biệt */}
            <div className="flex flex-col gap-4">
              {courses.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-[#15222b]">
                  <span className="material-symbols-outlined text-4xl text-slate-300">
                    menu_book
                  </span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Bạn chưa có khóa học nào.
                  </p>
                </div>
              ) : (
                courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#15222b] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4"
                >
                  <div
                    className={`size-12 rounded-full flex items-center justify-center ${stat.bgClass} ${stat.textClass}`}
                  >
                    <span className="material-symbols-outlined">
                      {stat.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 uppercase font-medium tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Courses
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Đề Xuất Cho Bạn
                </h3>
                <a href="#" className="text-primary text-sm font-medium hover:underline">
                  Xem Tất Cả
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedCourses.map((course, index) => (
                  <div
                    key={index}
                    className="group bg-white dark:bg-[#15222b] p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition cursor-pointer flex gap-4"
                  >
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url(${course.image})` }}
                    />
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-500 mb-2">
                        {course.level} • {course.lessons}
                      </p>
                      <div className="flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 gap-1">
                        <span className="material-symbols-outlined text-base">star</span>
                        {course.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* RIGHT COLUMN (Widgets) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Assignments */}
            <div className="bg-white dark:bg-[#15222b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Bài Tập
                </h3>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                  2 Bài Đến Hạn
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {assignments.map((assignment, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="mt-1">
                      <div
                        className={`size-2 rounded-full ${assignment.dotClass}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`text-sm font-bold text-slate-900 dark:text-white ${
                          assignment.status === 'completed'
                            ? 'line-through'
                            : ''
                        }`}
                      >
                        {assignment.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {assignment.type} • {assignment.due}
                      </p>
                    </div>
                    {assignment.status === 'completed' ? (
                      <div className="text-emerald-500">
                        <span className="material-symbols-outlined">
                          check_circle
                        </span>
                      </div>
                    ) : (
                      <button className="text-slate-400 hover:text-primary">
                        <span className="material-symbols-outlined">
                          chevron_right
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Community Teaser */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-1">
                  Thử Thách Hàng Tuần
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Hoàn thành 5 bài học tuần này để nhận huy hiệu "Học Giả".
                </p>
                <div className="flex -space-x-2 mb-4">
                  <img
                    alt="Người tham gia 1"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk-QPSo1aNjweY1KHj8JIa1bmhZSmN2VXywV4GBVftHnGj6vS3bywqnk01H57ITg0akT271iTnOWKyCuH6UUDo5Jc5sO_H0PVEdgiZsechuSlTqF6m4oVrzgiTp1yczuhdemznjbTeJDMrYsDE7su6Z0lgZ9qrGz-4lLYKxfKt7bEcvEdXsp3WJX4fckC1rh5VTN_imwAf9ny807M_0eMPyryPxKwQKXRkvoyvZTMX1e3_SJvpWGHgH1GpL0UeSKMXvRqNXkyot9E"
                  />
                  <img
                    alt="Người tham gia 2"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLFFb6OrrKIPsZroTXuOXRdyDOfBkATG_Xoyb3Clf-RW-vUjmx_onpu_wUH-yI08QQjCyByNnRwQmEXkgPKphr3oUjLVNK6tZigQc9BNPRvlB44BDLiP1QdZwuzv-AQe6OziMd_RN2rDkk4ZLcpErBjd8LJB1_c2lanCuDWX1eowTSCyhffXUFzV9gOBZZMxi7vM3VNOn3rmVcpxHPSCPYZHdcY83cWmW62wrBYABQQgrohbp71VjOi8dxVJRFPmpJZukj1Jo4F0c"
                  />
                  <img
                    alt="Người tham gia 3"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr5HLdFal33r3Kof-JjCW_LnwtgB6hPs410Q4IoqoYhIfwFNn7KsrpppjiY4nzNNoHmeVGGJDtlNvHM79QW1z0hEH-4WLgzr4qmbzoeMNJjHqqTgIRwQiODNc_Dmfvml556FWK7THWmmnnXpvt2XMusBRcS83-XZY8ms5w39XcwtpBx3D6l2yvacGSw_INeX0CF70KNApjLVcrcrQPz4tO3vVAxw9q9x7sGOLpmXK9ReFRMG7jMn_GN35OVWfDe5EB4BSRybtDABQ"
                  />
                  <div className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-white/20 flex items-center justify-center text-xs font-bold">
                    +42
                  </div>
                </div>
                <button className="bg-white text-indigo-600 text-sm font-bold py-2 px-4 rounded shadow-sm hover:bg-slate-50 transition">
                  Tham Gia Thử Thách
                </button>
              </div>
              <div className="absolute -bottom-4 -right-4 text-white/10">
                <span className="material-symbols-outlined text-[120px]">
                  flag
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}