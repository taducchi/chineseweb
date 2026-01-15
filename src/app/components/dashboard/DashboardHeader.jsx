// components/dashboard/DashboardHeader.jsx
'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function DashboardHeader({ setSidebarOpen }) {


    const { user, logout } = useAuth();
    const router = useRouter();
  
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-[#15222b] border-b border-slate-200 dark:border-slate-800 shrink-0 z-10">
      <div className="flex md:hidden items-center gap-3">
        <button 
          className="text-slate-500"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="font-bold text-lg">Zhongwen Master</h1>
      </div>
      
      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            type="text"
            className="block w-full p-2 pl-10 text-sm text-slate-900 border border-transparent rounded-lg bg-slate-100 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary placeholder-slate-500"
            placeholder="Tìm kiếm từ vựng, ngữ pháp hoặc bài học..."
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#15222b]" />
        </button>
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />
              {user && (  <>
                  {/* User Info */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-3">
                    <div className="rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 size-10 flex-shrink-0">
                      <div className="relative transform perspective-1000 hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 rounded-full transform rotate-6 scale-105"></div>
                        <img
                          alt="User profile avatar"
                          className="relative w-full h-full object-cover rounded-full shadow-[0_10px_30px_-5px_rgba(99,102,241,0.3)] dark:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.5)] border-2 border-white/50 dark:border-gray-800/50 backdrop-blur-sm"
                          src={user.avatar_url}
                          onError={(e) => {
                            const initials = (user.first_name?.[0] || user.email[0]).toUpperCase();
                            e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" fill="%236366f1" rx="128"/><text x="128" y="140" font-family="Arial" font-size="96" fill="white" text-anchor="middle" dy=".3em">${initials}</text></svg>`;
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-main dark:text-white truncate">{user.first_name} {user.last_name}</p>
                    </div>
                  </div>

                  

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 p-3 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium w-full"
                  >
                    <span className="material-symbols-outlined">logout</span>
                  
                  </button>
                </>)  }
      </div>
    </header>
  );
}