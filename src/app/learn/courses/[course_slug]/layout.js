'use client';


import React, { useState } from 'react';
import Header from '../../../components/learn/Header';
import Footer from '../../../components/learn/Footer';
import Sidebar from '../../../components/learn/SideBar';
import Content from '../../../components/learn/Content';
import Breadcrumb from '../../../components/courses/Breadcrumb';
import GlobalLoadingOverlay from '../../../components/GlobalLoadingOverlay';
import { useAuth } from '../../../context/AuthContext';
import { useEffect } from 'react';
import LoginAlert from '../../../account/login/LoginAlert';

export default function Layout({ children, params }) {
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        const loadingCount = useAuth().loadingCount
        const unwrappedParams = React.use(params);
        const course_slug = unwrappedParams?.course_slug;
        const toggleSidebar = () => {
                setIsSidebarOpen(!isSidebarOpen);
        }

        const user = useAuth().user

     
        return (
                <div className="flex flex-col h-screen">
                        {loadingCount > 0 && <GlobalLoadingOverlay />}


                        {
                                loadingCount === 0 && user === null && <LoginAlert />
                        }
                         {
                                user != null && <div className="flex flex-1 overflow-hidden relative">
                                        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}
                                                toggleSidebar={toggleSidebar}
                                                course_slug={course_slug}                                         />
                                        <div className="flex-1 flex flex-col overflow-hidden">
                                                <Header toggleSidebar={toggleSidebar}  />
                                                {children}
                                                <Footer />
                                        </div>
                                </div>
                         }
                               
                        

                </div>
        )
}
