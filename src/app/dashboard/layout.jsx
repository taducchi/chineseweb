// app/dashboard/layout.jsx
'use client';

import { useState } from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import Breadcrumb from '../components/courses/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import GlobalLoadingOverlay from '../components/GlobalLoadingOverlay';


export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {loadingCount} = useAuth()


  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen overflow-hidden">
      {loadingCount > 0 && <GlobalLoadingOverlay />}
      <div className="flex h-screen w-full">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar Component */}
        <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Top Header */}
          <DashboardHeader setSidebarOpen={setSidebarOpen} />
          {/* Page Content */}
          <Breadcrumb />
          {children}
        </div>
      </div>
    </div>
  );
}