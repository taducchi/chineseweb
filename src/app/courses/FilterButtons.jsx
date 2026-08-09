'use client';

import { useState } from 'react';

export default function FilterButtons({ filterOptions, activeFilter, handleFilterClick }) {
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  // Tìm label của filter đang active
  const activeLabel = filterOptions.find(f => f.id === activeFilter)?.label || 'Tất cả';

  return (
    <div className="py-3 md:py-5">
      {/* Mobile: Dropdown + Chips */}
      <div className="lg:hidden flex ">
        {/* Dropdown */}
        <div className="relative mr-3 flex-1">
          <button
            onClick={() => setShowMobileDropdown(!showMobileDropdown)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium"
          >
            <span>{activeLabel}</span>
            <svg 
              className={`w-5 h-5 transition-transform ${showMobileDropdown ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showMobileDropdown && (
            <>
              {/* Overlay để click ra ngoài đóng dropdown */}
              <div 
                className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm"
                onClick={() => setShowMobileDropdown(false)}
              />
              
              {/* Dropdown full width màn hình */}
              <div className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 mx-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[70vh]">
                {/* Header dropdown */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Chọn bộ lọc</h3>
                  <button
                    onClick={() => setShowMobileDropdown(false)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Danh sách options */}
                <div className="overflow-y-auto max-h-[calc(70vh-60px)] p-2">
                  {filterOptions.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        handleFilterClick(filter.id);
                        setShowMobileDropdown(false);
                      }}
                      className={`
                        w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all
                        ${activeFilter === filter.id
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span>{filter.label}</span>
                        {activeFilter === filter.id && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Active filter chips */}
        <div className="flex flex-wrap gap-2 width-full">
          {filterOptions.map((filter) => (
            activeFilter === filter.id && (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-xs font-medium shadow-md"
              >
                {filter.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )
          ))}
        </div>
      </div>

      {/* Desktop: Horizontal filters */}
      <div className="hidden lg:flex flex-wrap items-center gap-3">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`
              flex items-center justify-center 
              px-5 py-2.5 
              rounded-full 
              text-sm 
              font-medium 
              whitespace-nowrap 
              transition-transform active:scale-95
              ${activeFilter === filter.id
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                : 'bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors'
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}