'use client';


import React , { useState}  from 'react';
import Header from '../../../components/learn/Header'; 
import Footer from '../../../components/learn/Footer'; 
import Sidebar from '../../../components/learn/SideBar'; 
import Content from '../../../components/learn/Content';
export default function Layout({ children, params  }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const unwrappedParams = React.use(params);
  const course_slug = unwrappedParams?.course_slug;
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          toggleSidebar={toggleSidebar}
          course_slug={course_slug}   // ✅ giờ là hợp lệ
        />
          {children}
     
      </div>
      <Footer />
    </div>
  );
}
