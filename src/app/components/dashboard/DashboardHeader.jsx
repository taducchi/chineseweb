// components/dashboard/DashboardHeader.jsx
'use client';

export default function DashboardHeader({ setSidebarOpen }) {
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
        <div className="flex items-center gap-2">
          <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
            12 Ngày
          </div>
        </div>
      </div>
    </header>
  );
}