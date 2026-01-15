// components/dashboard/DashboardSidebar.jsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function DashboardSidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();
   const { user, logout } = useAuth();
  const router = useRouter();


  const navItems = [
    { icon: 'dashboard', label: 'Bảng Điều Khiển', href: '/dashboard' },
    { icon: 'menu_book', label: 'Khóa Học', href: '/dashboard/courses' },
    { icon: 'style', label: 'Luyện từ vựng', href: '/dashboard/vocabulary' },
   { icon: 'style', label: 'Xem video', href: '/dashboard/video' },
   { icon: 'style', label: 'Luyện đọc', href: '/dashboard/reading' },
    { icon: 'style', label: 'Chép chính tả', href: '/dashboard/notetaking' },
    { icon: 'settings', label: 'Cài Đặt', href: '/dashboard/settings' },
    
    
    
  ];

  return (
    <aside className={`
      fixed md:relative z-50 md:z-auto flex flex-col w-64 h-full bg-white dark:bg-[#15222b] 
      border-r border-slate-200 dark:border-slate-800 transition-transform duration-300
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>

      <div className="p-6 flex items-center gap-3">
        <div className="size-8 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Zhoo 中文</h1>
      </div>
      
      <div className="px-4 py-2">
  
        
        <nav className="flex flex-col gap-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            
            return (
              <a
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
              </a>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-4">
        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-4 text-white">
          <div className="flex justify-between items-start mb-2">
            <span className="material-symbols-outlined text-white/80">workspace_premium</span>
            <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded">PRO</span>
          </div>
          <p className="text-sm font-bold mb-1">Nâng Cấp Gói</p>
          <p className="text-xs text-white/80 mb-3">Nhận bài luyện tập không giới hạn và đánh giá chuyên gia.</p>
          <button className="w-full py-1.5 bg-white text-primary text-xs font-bold rounded shadow-sm hover:bg-slate-50 transition-colors">
            Nâng Cấp
          </button>
        </div>
      </div>
    </aside>
  );
}