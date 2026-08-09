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
    { icon: 'cast_for_education', label: 'Khóa Học', href: '/dashboard/courses' },
    { icon: 'match_word', label: 'Luyện từ vựng', href: '/dashboard/vocabulary' },
   { icon: 'videocam', label: 'Xem video', href: '/dashboard/video' },
   { icon: 'auto_stories', label: 'Luyện đọc', href: '/dashboard/reading' },
    { icon: 'edit', label: 'Chép chính tả', href: '/dashboard/notetaking' },
    { icon: 'settings', label: 'Cài Đặt', href: '/dashboard/settings' },
    
    
    
  ];

  return (
    <aside className={`
      fixed md:relative z-50 md:z-auto flex flex-col w-64 h-full bg-white dark:bg-[#15222b] 
      border-r border-slate-200 dark:border-slate-800 transition-transform duration-300
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>

     
<div className="p-6 flex items-center gap-4">
  <div className="relative">
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
      <span className="text-white font-black text-2xl tracking-tight">M</span>
    </div>
    {/* Decorative dots */}
    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-400 rounded-full" />
    <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-400 rounded-full" />
  </div>
  
  <div>
    <h1 className="text-2xl font-black tracking-tight">
      <span className="text-slate-900 dark:text-white">Maginese</span>
      <span className="text-blue-600 dark:text-blue-400">.vn</span>
    </h1>
    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wider">
      Chinese for GenZ
    </p>
  </div>
</div>


      
      <div className="px-4 py-2">
  
        
        <nav className="flex flex-col gap-1">
          {navItems.map((item, index) => {
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
    
      
    </aside>
  );
}