'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../../components/learn/Header';
import Footer from '../../../components/learn/Footer';
import Sidebar from '../../../components/learn/SideBar';
import GlobalLoadingOverlay from '../../../components/GlobalLoadingOverlay';
import { useAuth } from '../../../context/AuthContext';
import LoginAlert from '../../../account/login/LoginAlert';
import { CourseProvider } from '../../../context/CourseContext';
import Cookies from 'js-cookie'
export default function Layout({ children, params }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [courseData, setCourseData] = useState({});
    const [loadingCourse, setLoadingCourse] = useState(false);
    const [errorCourse, setErrorCourse] = useState(null);

    const { loadingCount, user, accessToken, API_URL } = useAuth();
    const unwrappedParams = React.use(params);
    const course_slug = unwrappedParams?.course_slug;
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
        const access = Cookies.get("access");
    useEffect(() => {
        if (!course_slug || !user) return;

        const fetchCourse = async () => {
            setLoadingCourse(true);
            
            setErrorCourse(null);
            try {
                const response = await fetch(
                    `${API_URL}api/courses/${course_slug}/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${access}`,
                        },
                    }
                );
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                setCourseData(data);
                console.log(data)
            } catch (err) {
                console.error('Fetch course failed:', err);
                setErrorCourse(err.message);
            } finally {
                setLoadingCourse(false);
            }
        };

        fetchCourse();
    }, [course_slug, user, accessToken]);

    // 👇 Value của context — bọc trong useMemo để tránh re-render thừa
    const courseContextValue = React.useMemo(() => ({
        courseData,
        setCourseData,
        loadingCourse,
        errorCourse,
    }), [courseData, loadingCourse, errorCourse]);

    return (
        <div className="flex flex-col h-screen">
            {(loadingCourse )&& <GlobalLoadingOverlay />}
            {loadingCount === 0 && user === null && <LoginAlert />}

            {user != null && !loadingCourse
                
                     &&
                     <CourseProvider value={courseContextValue}>
                    <div className="flex flex-1 overflow-hidden relative">
                        <Sidebar
                            isOpen={isSidebarOpen}
                            onClose={() => setIsSidebarOpen(false)}
                            toggleSidebar={toggleSidebar}
                            course_slug={course_slug}
                            courseData={courseData}
                        />
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <Header toggleSidebar={toggleSidebar} />
                            {children}
                            <Footer />
                        </div>
                    </div>
                </CourseProvider>
                

               
            }
        </div>
    );
}