// app/dashboard/courses/[courseId]/detail/page.jsx
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { useEffect } from 'react';
import IntroCourseCard from '../../../components/courses/IntroCourseCard';
import Link from 'next/link';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [openModule, setOpenModule] = useState(null);
  const API_URL = useAuth().API_URL;
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
                  // Simulate fetching data from an API
                  fetch(`${API_URL}api/courses/`)
                          .then(response => response.json())
                          .then(data => setCourses(data.results));
          };
  
        useEffect(() => {
                  fetchCourses();
                  // Fetch courses from an API or database
                  // For demonstration, we'll use static data
          }, []);
  const fetchCourseData = async (slug) => {
    try {
      const response = await fetch(`${API_URL}api/courses/${slug}`);
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    if (params.slug) {
      fetchCourseData(params.slug);
    }
  }, [params.slug]);

  
  // Course details data (fallback)
  const courseData = {
    ...course,
    
    stats: [
      { icon: 'schedule', label: '3 Tháng', description: 'Thời lượng học', color: 'blue' },
      { icon: 'school', label: 'HSK 4', description: 'Trình độ đầu ra', color: 'purple' },
      { icon: 'menu_book', label: '42 Bài', description: 'Video bài giảng', color: 'rose' },
      { icon: 'all_inclusive', label: 'Trọn đời', description: 'Quyền truy cập', color: 'emerald' }
    ],
   
    testimonials: [
      {
        id: 1,
        name: 'Nguyễn Văn A',
        avatar: '/api/placeholder/40/40',
        rating: 5,
        comment: 'Khóa học rất chi tiết, lộ trình rõ ràng. Mình đã thi đỗ HSK 3 chỉ sau 2.5 tháng theo học.'
      },
      {
        id: 2,
        name: 'Trần Thị B',
        avatar: '/api/placeholder/40/40',
        rating: 4.5,
        comment: 'Giảng viên phát âm rất chuẩn, phần mềm hỗ trợ AI giúp mình sửa lỗi sai ngay lập tức.'
      },
      {
        id: 3,
        name: 'Lê Văn C',
        avatar: '/api/placeholder/40/40',
        rating: 5,
        comment: 'Tuyệt vời! Giao diện dễ sử dụng, bài học ngắn gọn nhưng súc tích.'
      }
    ]
  };

  // Render stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-[16px] text-yellow-400 fill-1">
            star
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-[16px] text-yellow-400">
            star_half
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="material-symbols-outlined text-[16px] text-yellow-400">
            star
          </span>
        );
      }
    }
    return stars;
  };

  const handleModuleToggle = (moduleId) => {
    setOpenModule(openModule === moduleId ? null : moduleId);
  };

  const handleEnrollNow = () => {
    router.push('/checkout');
  };

  const handleBackToCourses = () => {
    router.push('/dashboard/courses');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Đang tải khóa học...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto scroll-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-40">
        {/* Back Button */}
      

        {/* Hero Section - Modern Design */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent dark:from-primary/10 pointer-events-none"></div>
          
          <div className="relative p-8 md:p-12 lg:p-16">
            {/* Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Chứng chỉ HSK 4
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">flash_on</span>
                Hot nhất 2026
              </span>
            </div>

            {/* Title & Description */}
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
                {courseData.title}
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl">
                {courseData.description}
              </p>
            </div>

            {/* CTA & Stats Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button
                onClick={handleEnrollNow}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <span>Đăng ký ngay hôm nay</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {renderStars(courseData.rating)}
                  <span className="ml-2 text-sm font-bold text-slate-900 dark:text-white">{courseData.rating}</span>
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">({courseData.student_count})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Glassmorphism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {courseData.stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/20"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                stat.color === 'purple' ? 'from-purple-500 to-purple-600' :
                stat.color === 'rose' ? 'from-rose-500 to-rose-600' :
                'from-emerald-500 to-emerald-600'
              } flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-white text-[24px]">
                  {stat.icon}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">{stat.label}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Includes Section */}
        <div className="mt-12">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">✨ Khóa học bao gồm</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Những gì bạn sẽ nhận được khi tham gia khóa học:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseData.includes.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">
                    {item.icon}
                  </span>
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights Section */}
        <div className="mt-12">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">🎯 Mục tiêu khóa học</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Sau khi hoàn thành khóa học, bạn sẽ đạt được những kỹ năng quan trọng sau:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseData.highlights.map((highlight, index) => (
              <div
                key={index}
                className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <p className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-primary transition-colors">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modules & Instructor Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modules */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">📚 Nội dung khóa học</h2>

            <div className="space-y-3">
              {courseData.modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden transition-all duration-300 hover:border-primary/20"
                >
                  <button
                    onClick={() => handleModuleToggle(module.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 flex items-center justify-center font-bold text-primary">
                        {String(module.id).padStart(2, '0')}
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-slate-900 dark:text-white">{module.title}</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{module.lessons.length} bài học</p>
                      </div>
                    </div>
                    <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${
                      openModule === module.id ? 'rotate-180' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>

                  {openModule === module.id && (
                    <div className="border-t border-slate-200/50 dark:border-slate-700/50 p-4 space-y-2">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                            lesson.status === 'available'
                              ? 'hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer'
                              : 'opacity-60'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-[20px] ${
                            lesson.status === 'available'
                              ? 'text-primary'
                              : 'text-slate-400'
                          }`}>
                            {lesson.status === 'available' ? 'play_circle' : 'lock'}
                          </span>
                          <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                            {lesson.title}
                          </span>
                          {lesson.duration && (
                            <span className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400">
                              {lesson.duration}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Card - Enhanced */}
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">👨‍🏫 Giảng viên</h2>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-1">
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center border-4 border-white dark:border-slate-700"
                      style={{ backgroundImage: `url(${courseData.instructor.avatar})` }}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                    <span className="material-symbols-outlined text-white text-[16px]">verified</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">
                  {courseData.instructor.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">
                  {courseData.instructor.degree}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-[14px]">work</span>
                    {courseData.instructor.experience}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-[14px]">group</span>
                    {courseData.instructor.followers}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-[14px]">school</span>
                    {courseData.instructor.students}
                  </span>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent my-4"></div>

                <blockquote className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  "{courseData.instructor.quote}"
                </blockquote>

                <button className="mt-6 w-full py-3 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:shadow-md transition-all duration-300">
                  Xem hồ sơ đầy đủ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">💬 Học viên nói gì?</h2>
            <span className="text-sm text-primary font-medium cursor-pointer hover:underline">
              Xem tất cả →
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courseData.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-slate-200 dark:border-slate-600"
                    style={{ backgroundImage: `url(${testimonial.avatar})` }}
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">🎓 Các khoá học khác</h2>
            <Link className="text-sm text-primary font-medium cursor-pointer hover:underline" href="/dashboard/courses">
              Xem tất cả →
            </Link>
          </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                   {courses.map((course) => {
                      if (course.id != courseData.id) {
                        return <IntroCourseCard key={course.id} course={course} link="/dashboard/courses" />
                      }

                   })}
                 </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 p-4 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-through">
                {courseData.price}
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-primary">
                  {courseData.current_price}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">/ khóa</span>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Bảo hành kiến thức
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Hoàn tiền trong 7 ngày
              </span>
            </div>
          </div>

          <button
            onClick={handleEnrollNow}
            className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>Đăng ký ngay</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}