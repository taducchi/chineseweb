// app/dashboard/courses/page.jsx
'use client';

import { useState } from 'react';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Course data
  const courses = [
    {
      id: 1,
      title: 'Tiếng Trung cho người mới bắt đầu',
      description: 'Khóa học nền tảng toàn diện 4 kỹ năng Nghe - Nói - Đọc - Viết dành cho người chưa biết gì.',
      category: 'beginner',
      badge: { text: 'Phổ biến', color: 'bg-primary' },
      duration: '3 tháng',
      students: '1.2k học viên',
      rating: 4.9,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmbJXTYUMJIpaMfgN7bEtWUj3paeqtT3IWo4VwJCTVwuD_SXpDQrFxCl6NjoRcxTJtS4cZNGViu_0diOM1vVmx1VGfulbjrFbHH-2ammzKRHAC4zyDk_UXgxvP28Q3pez3pvyynB1dEO7BchRLhoCjEzGquRgC1fD0RR1BXpBzfdBQdbxfwfqfhKH5q3k3rlT9uWBpsSIzZp2QSESxWAC9NKHFgVAvdCUpWL8ol-14JTgny5gzDtofBcDuw0vIQA7iJUMhzuK4fZY'
    },
    {
      id: 2,
      title: 'Luyện thi HSK 3 Cấp Tốc',
      description: 'Chiến thuật làm bài thi HSK 3 điểm cao, tập trung vào ngữ pháp và từ vựng trọng tâm.',
      category: 'hsk',
      badge: { text: 'HSK 3', color: 'bg-indigo-500' },
      duration: '2 tháng',
      students: '850 học viên',
      rating: 4.8,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGp5wKUiAsVX3UzaUxWJSv9JHMbjMzuDSzR1jHXjKQ12A0Mx5y6CyPU7bbXbP9XqCJgpbEPp9OZXHPEFvDr6Ld8xy7RODx9_c1qYFyWDxnrcYrKdFB68poP8E_YY2utS6GEAM19CBbVwmDBg3yIk6RlKO8Oz7AvNbIbGLwItt16syEq0b5TiZuDvjjsjOnhXHQmKtIWka1OY1RdbU8Op41Nq9gvuViCuegr31lvCK_Cr3J3EXmrhHDdRkFrjOcnp5XJ3sSvKdCTeM'
    },
    {
      id: 3,
      title: 'Tiếng Trung Thương Mại',
      description: 'Giao tiếp trong môi trường công sở, đàm phán hợp đồng và văn hóa doanh nghiệp Trung Quốc.',
      category: 'business',
      badge: { text: 'Thương mại', color: 'bg-emerald-500' },
      duration: '4 tháng',
      students: '500 học viên',
      rating: 4.7,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHct3BeV-YEWWzjb2RsJ7d4oH9tb_LVyrn-C1SJNjo8Ig5hiWw46sDai34E7_F-ZLVGUnaqPSwyfgauyDjpMwRhVtPfnTPI0x_ZOIXyhSpS4c6vA4rfp78LViHt1Bu0Zy750Gej_cDfp99Jwl9vGH8GaVTgxRt2vX9XPehvRhc1faQTKrim8ThWx89-S8Gb7Xi78YZyyi0Agn2VWvfFComJ6gQPnWrMQ-YF4-FcO53Nmr8NIfXr5wEZwRTOFiGRTLulZTrDG03EVI'
    },
    {
      id: 4,
      title: 'Luyện Viết Hán Tự',
      description: 'Phương pháp nhớ chữ Hán qua bộ thủ, luyện viết đẹp và chuẩn.',
      category: 'writing',
      badge: { text: 'Viết', color: 'bg-rose-500' },
      duration: '1.5 tháng',
      students: '2.1k học viên',
      rating: 5.0,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKbgToLhAtV_xnDJrMbbB2DDRP3d4z0EE8gl8GhWqxkHF4U5aMMfPPm1qgSOweQIExdNqrKznr_lPt442vLw57AsHN-uHf4JmZPMgqTtYFNleU7p2a8r7MdoP2lGMiuT4k6rV74lJME7IN1hQEd-rnmn1J1iT6tQvecd3SOa1REyr_DoUQHO2eiRDIHzn1BBiFxjviQAGZ1IuIGIN36WuKH_K2H3wPAo3AonfoxGJ_iRxL-ifKBFaPhje9FQseq8onWCAQKXGCvs4'
    },
    {
      id: 5,
      title: 'Tiếng Trung Giao Tiếp Hàng Ngày',
      description: 'Tự tin giao tiếp với người bản xứ qua các tình huống thực tế: mua sắm, du lịch, hỏi đường.',
      category: 'conversation',
      badge: { text: 'Giao tiếp', color: 'bg-orange-500' },
      duration: '2.5 tháng',
      students: '3.4k học viên',
      rating: 4.6,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7xPI-AV1AgwZZjhkuKdJLawJAzADz7uIl5qtQkyV1S_3AqEzFzF1rVpqp43UE8uVLDK8sIK44diwBRN-FNecYu8Md7f2Bi9oe9cn1RtsJwgwdVOMfd3e_psWmXlHksVz4jmFBVPQWRYdvDQ8lwH4RwcXVfkltkQGz1hGtd4K2JnknsFm7udRtL3y49e1aVErqc3tsXX_6JC9UYPpb1UUtHaC1HgLSFfA15ZuOrT5D7TlISkbII4IEbKFVg7U7vUiiiKN3BMCtA0A'
    },
    {
      id: 6,
      title: 'Tìm Hiểu Văn Hóa Trung Hoa',
      description: 'Khám phá lịch sử, phong tục, tập quán và nghệ thuật của đất nước Trung Quốc.',
      category: 'culture',
      badge: { text: 'Văn hóa', color: 'bg-purple-500' },
      duration: '1 tháng',
      students: '900 học viên',
      rating: 4.9,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlA-DbZq8SmKPVXf7zHfVdvLGz3_wmXqBIA-ml9iVQ0Zx21MCsS4zF_oLgSPAhimki7SsRmyEr39HJXlFOfGq2IN7E434pSWO7o8PZCYTWaob2Fie5bzHA-HGT8y0mBQsiIbNf0LYx915EuxjYZcHA6jKGjbgxHB6EQOWdXgXsyTxBTQtUHI6f6nHFMKFzQXWbn1K_Z7Ns__XSLWUMeCGD-U1l9SvnUkY-iH-wsZe1P84Wb9oeLtqd7NCi3isHlGCqbhYgZEZbNSo'
    }
  ];

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'Tất cả' },
    { id: 'beginner', label: 'Sơ cấp' },
    { id: 'intermediate', label: 'Trung cấp' },
    { id: 'advanced', label: 'Cao cấp' },
    { id: 'hsk', label: 'Luyện thi HSK' },
    { id: 'conversation', label: 'Giao tiếp' }
  ];

  // Filter and search courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchTerm === '' || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || course.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  const handleCourseClick = (courseId) => {
    // Navigate to course detail page
    console.log('Navigating to course:', courseId);
    // router.push(`/dashboard/courses/${courseId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
      
     

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 scroll-smooth">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          {/* Page Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Danh Sách Khóa Học
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal max-w-2xl">
                Khám phá các khóa học phù hợp với trình độ của bạn và bắt đầu hành trình chinh phục tiếng Trung ngay hôm nay.
              </p>
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-sm text-slate-500 dark:text-slate-400">Sắp xếp:</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white cursor-pointer">
                Phổ biến nhất
              </span>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">expand_more</span>
            </div>
          </div>

          {/* Filters (Chips) */}
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-transform active:scale-95 ${
                  activeFilter === filter.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                    : 'bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => handleCourseClick(course.id)}
                className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 transition-all duration-300 group cursor-pointer h-full"
              >
                {/* Course Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <div 
                    className="bg-cover bg-center h-full w-full group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${course.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <div className={`absolute top-3 left-3 ${course.badge.color} text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded shadow-sm`}>
                    {course.badge.text}
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                  
                  {/* Course Stats */}
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-[16px]">group</span>
                        <span>{course.students}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded text-amber-600 dark:text-amber-400 text-xs font-bold">
                        <span>{course.rating}</span>
                        <span className="material-symbols-outlined text-[14px] fill">star</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center pb-10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-medium flex items-center justify-center ${
                    currentPage === page
                      ? 'bg-primary text-white font-bold shadow-lg shadow-primary/30'
                      : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <span className="text-slate-400">...</span>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}