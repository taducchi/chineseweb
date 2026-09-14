// app/page.js
'use client';
import React from 'react';
import CourseIntro from "../../../components/learn/CourseIntro";
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Cookies from 'js-cookie';


export default function HomePage({ params }) {
        const unwrappedParams = React.use(params);
        const course_slug = unwrappedParams?.course_slug;
        // const [Loading, setLoading] = useState(false)
        const API_URL = useAuth().API_URL
        const [loading, setLoading] = useState(true);
        const [courseData, setCourseData] = useState({
                "title": "Khoá học tiếng Trung Quốc"
        })
        useEffect(() => {
                // Fetch modules data from API           
                
                const fetchData = async () => {
                        setLoading(true)
                        
                        try {
                                // const accessToken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg5Mzc2NTI5LCJpYXQiOjE3ODkzNzU2MjksImp0aSI6IjViMWI2ODg4MzU0NjRlNmY5ZWRiOTgzNGUxNjYyZTk2IiwidXNlcl9pZCI6IjEifQ.CNjA1FdDMCvdeBk5tKG6uPy0bbBgwKfF560PS5qLHkw
                                const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg5Mzc4NjA5LCJpYXQiOjE3ODkzNzc3MDksImp0aSI6ImMxZWJhNTNmMWQ2ODRjMmRhMjg3ZTRhMTM4ZWZjY2VjIiwidXNlcl9pZCI6IjEifQ.F6aWxQdJNtRWBeaj1DoijziMnL22VSw4TAWG0Zo_DCk";
                                const response = await fetch(
                                        `${API_URL}api/courses/${course_slug}`,
                                        {
                                                headers: {
                                                        "Authorization": `Bearer ${accessToken}`,
                                                        "Content-Type": "application/json",
                                                },
                                        }
                                );

                                const data = await response.json();
                                console.log(data)
                                setCourseData(data);

                        } catch (error) {
                                console.error('Error fetching modules:', error);
                        } finally {
                                // Kết thúc loading
                                setLoading(false);
                        }
                };

                fetchData();
        }, []);
        if (loading) {
                return (
                        <main className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark relative">
                                <div className="flex-1 flex items-center justify-center p-6">
                                        <div className="flex flex-col items-center gap-4">
                                                {/* Spinner chính */}
                                                <div className="relative">
                                                        <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-500"></div>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                                                        </div>
                                                </div>
                                                <p className="text-gray-500 dark:text-gray-400 animate-pulse">
                                                        Đang tải bài học...
                                                </p>
                                        </div>
                                </div>
                        </main>
                );
        }
        return (

                <>
                        <CourseIntro course_slug={course_slug} courseData={courseData} />
                </>

        );
}