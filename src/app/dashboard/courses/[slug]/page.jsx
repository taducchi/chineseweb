// app/dashboard/courses/[courseId]/detail/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CourseDetailPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [openModule, setOpenModule] = useState(1);
  
  // Course details data
  const courseData = {
    title: 'Tiếng Trung Giao Tiếp HSK 3',
    description: 'Thành thạo giao tiếp hàng ngày và chinh phục chứng chỉ HSK 3 chỉ trong 3 tháng cùng lộ trình chuẩn hóa.',
    rating: 4.9,
    students: '2.5k học viên',
    originalPrice: '2.000.000 VNĐ',
    discountPrice: '1.200.000 đ',
    badges: ['New Course', 'Best Seller'],
    
    stats: [
      { icon: 'schedule', label: '3 Tháng', description: 'Thời lượng học', color: 'primary' },
      { icon: 'school', label: 'HSK 3', description: 'Trình độ đầu ra', color: 'purple' },
      { icon: 'menu_book', label: '30 Bài', description: 'Video bài giảng', color: 'rose' },
      { icon: 'all_inclusive', label: 'Trọn đời', description: 'Quyền truy cập', color: 'emerald' }
    ],
    
    objectives: [
      {
        icon: 'book',
        title: '600 từ vựng cốt lõi',
        description: 'Nắm vững 600 từ vựng thông dụng nhất trong đời sống, công sở và du lịch Trung Quốc.',
        color: 'primary'
      },
      {
        icon: 'extension',
        title: 'Ngữ pháp ứng dụng',
        description: 'Hiểu và vận dụng thành thạo các cấu trúc ngữ pháp HSK 3 vào giao tiếp thực tế.',
        color: 'orange'
      },
      {
        icon: 'mic',
        title: 'Phát âm chuẩn AI',
        description: 'Luyện tập và sửa lỗi phát âm trực tiếp với công nghệ AI tiên tiến, giúp bạn tự tin nói chuyện.',
        color: 'indigo'
      }
    ],
    
    curriculum: [
      {
        id: 1,
        title: 'Nhập môn Pinyin & Thanh điệu',
        lessons: [
          { id: 1, title: 'Bài 1: Giới thiệu hệ thống phiên âm Pinyin', duration: '10:00', status: 'available' },
          { id: 2, title: 'Bài 2: Vận mẫu đơn và thanh điệu cơ bản', duration: '15:30', status: 'available' },
          { id: 3, title: 'Bài 3: Ghép vần và quy tắc biến điệu', duration: null, status: 'locked' }
        ]
      },
      {
        id: 2,
        title: 'Chào hỏi & Làm quen',
        lessons: [
          { id: 4, title: 'Bài 4: Các mẫu câu chào hỏi thông dụng', duration: null, status: 'locked' },
          { id: 5, title: 'Bài 5: Giới thiệu bản thân và quốc tịch', duration: null, status: 'locked' }
        ]
      },
      {
        id: 3,
        title: 'Gia đình & Công việc',
        lessons: [
          { id: 6, title: 'Bài 6: Từ vựng về thành viên gia đình', duration: null, status: 'locked' }
        ]
      }
    ],
    
    instructor: {
      name: 'Ms. Lin Chen',
      degree: 'Thạc sĩ ĐH Bắc Kinh',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxB4ytGrDqH5AVw5p842WlI8YK2kpI5xyv6kYg0AO6FKW7wuTayNbuR9NUchAROGkqVzefP7pg1lgahWl-SUz_UEsEd4sBhB9IwCZNGyVkOZYS3LukeyCeCJL__ThpYUlumV-y8xPkWQqk6FwcTjXwH45bpWG3KlKzHWRYXkkaxwvnuMAVius2V5JRv6Te_YKlvf1m8M2H6t9ZBDhvFetUvUxJTf2FtinOltO14hqvG6Eq5o4clfTB1IC-BTVIEoN-RyhUYajshXM',
      experience: '10 năm KN',
      followers: '15k Follow',
      quote: '"Cô Lin nổi tiếng với phương pháp dạy sinh động, dễ hiểu, giúp học viên nhớ từ vựng ngay tại lớp."'
    },
    
    testimonials: [
      {
        id: 1,
        name: 'Nguyễn Văn A',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfjFMwnTi1sQhvNc0HMTJPzPw3mpx-duOS3LtBLcfYNMKw3vJSvIpC0EH-KExB44iQdeeR1I1-wsLye2NWAsJVRJJMKMmez9IKq_HJ_sRzBnHYeAHsFPmzP_B2nOMhOmT0IN4XcXepeiYiuTWpq1XJp3WfPI-i6VKSiY5VN6Iub27dIdeQM7_M0kFbUdOhpGeR9GazrhlyIVeGqKZOE9vPo9idPl7jUSEdc6Y4NS0JA5_GRkCdryxI7o5UM0aEDAnNluZGy4UE3rk',
        rating: 5,
        comment: '"Khóa học rất chi tiết, lộ trình rõ ràng. Mình đã thi đỗ HSK 3 chỉ sau 2.5 tháng theo học."'
      },
      {
        id: 2,
        name: 'Trần Thị B',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKHj7sFsIi4d-eE39b_2wDdQ32x8-dfgYmOuwZO_Pl0RJY1BN1KXv5WCpOxPecMFUJa9Heikt2XGfqQWhA0mqBbaukQej0m3siS_YX5a5KxMEw80UabqttxY3GRy8lOebDLqK6d6uLlHpYxckD6vccOwfMto1GC6oIe7b944fk788UHRaukSscttklTxVicEt1ZTr0D4nR5pPkQNxk7n3JqZtNQKCas8v7DS3FnbUXewQUS3vi_PTOXIbmXyi1DX-lCNpcCRT6WXM',
        rating: 4.5,
        comment: '"Giảng viên phát âm rất chuẩn, phần mềm hỗ trợ AI giúp mình sửa lỗi sai ngay lập tức."'
      },
      {
        id: 3,
        name: 'Lê Văn C',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMJGRWuhoQJKh3TKN2C9zC6Mu2E3q-0Ma8Kt0792ecp3O8vmr1inrjxFcKT1qM4NC8DTgoqwUGAfUElu2RBo2lSlueSQ9u_n1nygQeeUS6QcPHWVdoLaKok3UVWfaBDqFPAsywznRC60B7v3kTVsCSSIC5DCQDFsZ4fSf41vlbzZ2TJUOId0kjCJaRUKYFko5S4tusuXCVEZlROXNgwfF1OhdMQ7PABcd0VDMBnmCclq0DOAfzUH4BUHtwxU2jLuNh1eVmSL5ZU90',
        rating: 5,
        comment: '"Tuyệt vời! Giao diện dễ sử dụng, bài học ngắn gọn nhưng súc tích."'
      }
    ]
  };

  // Event handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleModuleToggle = (moduleId) => {
    setOpenModule(openModule === moduleId ? null : moduleId);
  };

  const handleEnrollNow = () => {
    console.log('Enrolling in course...');
    // Add enrollment logic here
  };

  const handleViewInstructorProfile = () => {
    console.log('Viewing instructor profile...');
    // Add navigation logic here
  };

  const handleBackToCourses = () => {
    router.push('/dashboard/courses');
  };

  const handleLessonClick = (lessonId) => {
    console.log('Starting lesson:', lessonId);
    // Add navigation to lesson page
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-[14px] fill text-yellow-500">
            star
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-[14px] fill text-yellow-500">
            star_half
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="material-symbols-outlined text-[14px] text-yellow-500">
            star
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <main className="flex flex-1 flex-col  w-full  h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
      
      {/* Top Navbar */}
     
    
      {/* Scrollable Page Content */}
      <div className="flex-1 overflow-y-auto  w-full  scroll-smooth">
        <div className="flex justify-center  w-full pb-20 ">
          <div className="layout-content-container flex flex-col max-w-[1200px] mx-auto w-full p-6 md:p-8 pb-32">
            
            {/* Hero Section */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center gap-6 order-2 lg:order-1">
                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    {courseData.badges.map((badge, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                          index === 0 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title & Description */}
                  <div className="flex flex-col gap-3">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                      {courseData.title}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                      {courseData.description}
                    </p>
                  </div>
                  
                  {/* CTA & Rating */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                    <button 
                      onClick={handleEnrollNow}
                      className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-sky-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                    >
                      <span>Đăng ký ngay</span>
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </button>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                      <span className="material-symbols-outlined text-yellow-500 fill-1 text-[20px]">star</span>
                      <span className="text-slate-900 dark:text-white font-bold">{courseData.rating}</span>
                      <span>({courseData.students})</span>
                    </div>
                  </div>
                </div>
                
                {/* Hero Image */}
                <div 
                  className="w-full lg:w-1/2 min-h-[300px] lg:min-h-full bg-cover bg-center relative order-1 lg:order-2"
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARey2F_QLsbsv1kZf8PABMTYn-M7kXvDWwY9j8NInhMx34G_BRlJ7JlRUjXhfxcumT01m_TED5tOZqMeFlh00guYUzswzuKzogE2tJBGEJCa_Uuli3-XP_oyHFZWlE2wX-p1A-83wncwlj2neFdl4ibf40VWWucb2wjwyQnd7z5X-AIiLui5qwhqyLPGG3JhF6RPP5KMUCzd5mKdCBU5GJHCa-OvRpLZ68jN_EycCmsiYN-7s3tTdNnDiNWIiJd2Htj1lx03B5la4")'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/10"></div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {courseData.stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2"
                >
                  <div className={`size-10 rounded-full ${
                    stat.color === 'primary' ? 'bg-blue-50 dark:bg-blue-900/30 text-primary' :
                    stat.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-500' :
                    stat.color === 'rose' ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-500' :
                    'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500'
                  } flex items-center justify-center mb-1`}>
                    <span className="material-symbols-outlined">{stat.icon}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{stat.label}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{stat.description}</p>
                </div>
              ))}
            </div>

            {/* Objectives Section */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mục tiêu khóa học</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                  Sau khi hoàn thành khóa học, bạn sẽ đạt được những kỹ năng quan trọng sau:
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courseData.objectives.map((objective, index) => (
                  <div 
                    key={index}
                    className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`size-12 rounded-lg ${
                      objective.color === 'primary' ? 'bg-primary/10 text-primary' :
                      objective.color === 'orange' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-500' :
                      'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500'
                    } flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-[28px]">{objective.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {objective.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {objective.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum & Instructor Section */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Curriculum */}
              <div className="flex-1 w-full flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nội dung khóa học</h2>
                
                <div className="flex flex-col gap-4">
                  {courseData.curriculum.map((module) => (
                    <div 
                      key={module.id}
                      className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden"
                    >
                      <div 
                        onClick={() => handleModuleToggle(module.id)}
                        className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-sm">
                            {module.id.toString().padStart(2, '0')}
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white">{module.title}</span>
                        </div>
                        <span 
                          className={`material-symbols-outlined text-slate-400 transition-transform ${
                            openModule === module.id ? 'rotate-180' : ''
                          }`}
                        >
                          expand_more
                        </span>
                      </div>
                      
                      {openModule === module.id && (
                        <div className="border-t border-slate-100 dark:border-slate-800 p-4 pt-2">
                          <ul className="flex flex-col gap-3">
                            {module.lessons.map((lesson) => (
                              <li 
                                key={lesson.id}
                                onClick={() => lesson.status === 'available' && handleLessonClick(lesson.id)}
                                className={`flex items-center gap-3 text-sm py-1 cursor-pointer ${
                                  lesson.status === 'available'
                                    ? 'text-slate-600 dark:text-slate-400 hover:text-primary'
                                    : 'text-slate-400 dark:text-slate-600'
                                }`}
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  {lesson.status === 'available' ? 'play_circle' : 'lock'}
                                </span>
                                <span className="flex-1">{lesson.title}</span>
                                {lesson.duration && (
                                  <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                                    {lesson.duration}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Instructor Card */}
              <div className="w-full lg:w-80 flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white lg:hidden">Giảng viên</h2>
                
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                  {/* Instructor Avatar */}
                  <div 
                    className="size-24 rounded-full bg-cover bg-center mb-4 border-4 border-slate-50 dark:border-slate-800 shadow-sm"
                    style={{ backgroundImage: `url(${courseData.instructor.image})` }}
                  />
                  
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{courseData.instructor.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">{courseData.instructor.degree}</p>
                  
                  {/* Stats */}
                  <div className="flex gap-2 mb-6 w-full justify-center">
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      <span>{courseData.instructor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                      <span className="material-symbols-outlined text-[14px]">group</span>
                      <span>{courseData.instructor.followers}</span>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {courseData.instructor.quote}
                  </p>
                  
                  {/* View Profile Button */}
                  <button 
                    onClick={handleViewInstructorProfile}
                    className="w-full py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Xem hồ sơ
                  </button>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="flex flex-col gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Học viên nói gì?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {courseData.testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="size-10 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${testimonial.avatar})` }}
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{testimonial.name}</h4>
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                      {testimonial.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 lg:px-8 fixed bottom-0 w-full z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 dark:text-slate-400 line-through">
              {courseData.originalPrice}
            </span>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-black text-primary">{courseData.discountPrice}</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">/ khóa</span>
            </div>
          </div>
          
          <button 
            onClick={handleEnrollNow}
            className="bg-primary hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-primary/30"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </main>
  );
}