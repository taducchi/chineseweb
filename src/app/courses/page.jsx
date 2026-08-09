// pages/courses.js
'use client';

import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import IntroCourseCard from '../components/courses/IntroCourseCard';
import FilterButtons from './FilterButtons';
import { useAuth } from '../context/AuthContext';




export default function CoursesPage() {
        const [searchTerm, setSearchTerm] = useState('');
        const [activeFilter, setActiveFilter] = useState('all');
        const [courses, setCourses] = useState([]);
        const API_URL = useAuth().API_URL; // Access API_URL from AuthContext
        const fetchCourses = async () => {
                // Simulate fetching data from an API
                fetch(`${API_URL}/api/courses/`)
                        .then(response => response.json())
                        .then(data => setCourses(data.results));
        };

        useEffect(() => {
                fetchCourses();
                // Fetch courses from an API or database
                // For demonstration, we'll use static data
        }, []);

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
                <>
                        <div className="min-h-screen bg-background-light dark:bg-background-dark">
                                <main className="px-4 md:px-10 lg:px-2 py-8 max-w-[1200px] mx-auto">
                                        {/* Page Heading */}
                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 p-4 mb-2">
                                                <div className="flex flex-col gap-2 min-w-72">
                                                        <h1 className="text-3xl md:text-[32px] font-bold text-text-main dark:text-white tracking-tight leading-tight">Danh sách khóa học</h1>
                                                        <p className="text-sm font-normal text-text-sub dark:text-slate-400 leading-normal">Khám phá các khóa học tiếng Trung phù hợp với trình độ của bạn</p>
                                                </div>
                                        </div>

                                        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">

                                                <FilterButtons
                                                        filterOptions={filterOptions || []}  // Fallback nếu undefined
                                                        activeFilter={activeFilter}
                                                        handleFilterClick={handleFilterClick}
                                                />

                                        </div>

                                        {/* Course Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-10">
                                                {filteredCourses.map((course) => (
                                                        <div
                                                                key={course.id}
                                                                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group course-card"
                                                        >
                                                                <div className="relative h-48 md:h-56 overflow-hidden">
                                                                        <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                        backgroundImage: `url('${course.thumbnail || '/images/course-default.jpg'}')`,
                        backgroundColor: course.thumbnail ? 'transparent' : '#f3f4f6'
                    }}
                ></div>
                                                                        

                                                                        {/* Badge hiển thị level */}
                                                                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-bold text-white ${course.level === 'beginner' ? 'bg-green-500' :
                                                                                        course.level === 'intermediate' ? 'bg-orange-500' :
                                                                                                course.level === 'advanced' ? 'bg-red-500' :
                                                                                                        'bg-blue-500'
                                                                                }`}>
                                                                                {course.level_display || course.level}
                                                                        </div>

                                                                        {/* Badge giảm giá */}
                                                                        {course.is_discounted && (
                                                                                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold animate-pulse">
                                                                                        -{course.discount_percentage}%
                                                                                </div>
                                                                        )}

                                                                        {/* Badge featured */}
                                                                        {course.is_featured && (
                                                                                <div className="absolute bottom-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-bold">
                                                                                        ⭐ Nổi bật
                                                                                </div>
                                                                        )}
                                                                </div>

                                                                <div className="p-6">
                                                                        <h4 className="text-xl font-bold text-text-main dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                                                {course.title}
                                                                        </h4>

                                                                        <p className="text-text-sub dark:text-gray-400 mb-4 text-sm line-clamp-2">
                                                                                {course.short_description}
                                                                        </p>

                                                                        <div className="flex flex-wrap items-center gap-2 text-sm text-text-sub dark:text-gray-500 mb-4">
                                                                                <div className="flex items-center gap-1">
                                                                                        <span className="material-symbols-outlined text-base">schedule</span>
                                                                                        {course.duration_display || 'Chưa cập nhật'}
                                                                                </div>
                                                                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                                                <div className="flex items-center gap-1">
                                                                                        <span className="material-symbols-outlined text-base">menu_book</span>
                                                                                        {course.total_lessons || 0} bài
                                                                                </div>
                                                                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                                                <div className="flex items-center gap-1">
                                                                                        <span className="material-symbols-outlined text-base">group</span>
                                                                                        {course.students_display || course.student_count || '0'} học viên
                                                                                </div>
                                                                        </div>

                                                                        {/* Rating */}
                                                                        {course.rating > 0 && (
                                                                                <div className="flex items-center gap-1 mb-4">
                                                                                        <span className="material-symbols-outlined text-base text-yellow-500 fill-current">star</span>
                                                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                                                {course.rating.toFixed(1)}
                                                                                        </span>
                                                                                </div>
                                                                        )}

                                                                        {/* Price */}
                                                                        <div className="flex items-center gap-3 mb-4">
                                                                                {course.is_discounted ? (
                                                                                        <>
                                                                                                <span className="text-xl font-bold text-red-500">
                                                                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.current_price)}
                                                                                                </span>
                                                                                                <span className="text-sm text-gray-400 line-through">
                                                                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                                                                                                </span>
                                                                                        </>
                                                                                ) : (
                                                                                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                                                                                                {course.is_free ? 'Miễn phí' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                                                                                        </span>
                                                                                )}
                                                                        </div>

                                                                        <Link
                                                                                href={`/courses/${course.slug}`}
                                                                                className={`block w-full text-center font-bold py-2.5 rounded-lg text-sm transition-colors shadow-md ${course.is_free
                                                                                                ? 'bg-green-500 hover:bg-green-600 shadow-green-200 dark:shadow-none'
                                                                                                : 'bg-primary hover:bg-primary-dark shadow-blue-200 dark:shadow-none'
                                                                                        } text-white`}
                                                                        >
                                                                                Xem chi tiết
                                                                        </Link>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>

                                        {/* Pagination */}
                                        <div className="flex justify-center pb-10">
                                                <nav className="flex items-center gap-2">
                                                        <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-text-sub dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                                                <span className="material-symbols-outlined">chevron_left</span>
                                                        </button>
                                                        <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white font-bold shadow-md shadow-blue-200 dark:shadow-none">1</button>

                                                        {/* <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-text-main dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium">2</button>
                                                        <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-text-main dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium">3</button>
                                                        <span className="flex items-center justify-center w-10 h-10 text-text-sub">...</span>
                                                        <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-text-main dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium">8</button> */}

                                                        <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-text-sub dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                                                <span className="material-symbols-outlined">chevron_right</span>
                                                        </button>
                                                </nav>
                                        </div>
                                </main>
                        </div>
                        <Footer />
                </>
        );
}