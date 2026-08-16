// app/dashboard/courses/page.jsx
'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import IntroCourseCard from '../../components/courses/IntroCourseCard';
import { useAuth } from '../../context/AuthContext';




export default function CoursesPage() {
  const API_URL = useAuth().API_URL; // Access API_URL from AuthContext
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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

 
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
    
    const matchesFilter = activeFilter === 'all' || course.level === activeFilter;
    
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
             <IntroCourseCard key={course.id} course={course} link="/dashboard/courses" />
            ))}
          </div>

          {/* Pagination */}
          {/* <div className="flex justify-center pb-10">
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
          </div> */}
        </div>
      </div>
    </main>
  );
}