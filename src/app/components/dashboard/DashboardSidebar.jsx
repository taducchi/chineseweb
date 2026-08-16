// components/dashboard/DashboardSidebar.jsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import Logo from '../Logo';

export default function DashboardSidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  // Nhóm nav items chính
  const mainNavItems = [
    { icon: 'dashboard', label: 'Bảng Điều Khiển', href: '/dashboard' },
    { icon: 'cast_for_education', label: 'Khóa Học', href: '/dashboard/courses' },
    { icon: 'match_word', label: 'Luyện từ vựng', href: '/dashboard/vocabulary' },
    { icon: 'videocam', label: 'Xem video', href: '/dashboard/video' },
    { icon: 'auto_stories', label: 'Luyện đọc', href: '/dashboard/reading' },
    { icon: 'edit', label: 'Chép chính tả', href: '/dashboard/notetaking' },
  ];

  // Nhóm nav items phía dưới (Cài đặt và Giúp đỡ)
  const bottomNavItems = [
    { icon: 'help', label: 'Giúp đỡ', href: '/dashboard/help' },
    { icon: 'settings', label: 'Cài đặt', href: '/dashboard/settings' },
  ];

  return (
    <div className={`
      fixed md:relative z-50 md:z-auto flex flex-col w-64 h-full bg-white dark:bg-[#15222b] 
      border-r border-slate-200 dark:border-slate-800 transition-transform duration-300
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      {/* Header */}
      <Logo />

      {/* Navigation - Main items */}
      <div className="px-4 py-2 flex-1">
        <nav className="flex flex-col gap-1">
          {mainNavItems.map((item, index) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Divider */}
      <div className="px-4">
        <div className="border-t border-slate-200 dark:border-slate-700" />
      </div>

      {/* Navigation - Bottom items (Cài đặt & Giúp đỡ) */}
      <div className="px-4 py-3">
        <nav className="flex flex-col gap-1">
          {bottomNavItems.map((item, index) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'filled' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}