// components/GlobalLoadingOverlay.jsx
'use client';


export default function GlobalLoadingOverlay() {
 
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-md dark:bg-slate-900/90 transition-all duration-300">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full mx-4">
        {/* Logo/Icon với animation */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/20 animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          {/* Animated ring */}
          <div className="absolute inset-0 rounded-2xl border-4 border-blue-400/20 animate-ping" />
          
          {/* Badge nhỏ */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Đang tải...
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Vui lòng đợi trong giây lát
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.32s]" />
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.16s]" />
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}