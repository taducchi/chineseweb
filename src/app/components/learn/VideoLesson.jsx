// components/Layout/VideoLesson.js
'use client';

import { useState } from 'react';

export default function VideoLesson({ toggleSidebar }) {
  const [activeTab, setActiveTab] = useState('transcript');

  const tabs = [
    { id: 'transcript', label: 'Transcript' },
    { id: 'vocabulary', label: 'Vocabulary List' },
    { id: 'grammar', label: 'Grammar Notes' },
    { id: 'discussion', label: 'Discussion', badge: 12 }
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark relative">
     

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap gap-2 text-sm text-text-sub-light dark:text-text-sub-dark">
            <a className="hover:text-primary transition-colors" href="#">Home</a>
            <span>/</span>
            <a className="hover:text-primary transition-colors" href="#">HSK 3</a>
            <span>/</span>
            <span className="text-text-main-light dark:text-text-main-dark font-medium">Lesson 5</span>
          </nav>

          {/* Page Heading & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-light dark:border-border-dark pb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-text-main-light dark:text-text-main-dark mb-2">
                Bài 1: Xin chào (Ni Hao)
              </h1>
              <p className="text-text-sub-light dark:text-text-sub-dark">Module 1 • Video Lesson</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-bold text-text-main-light dark:text-text-main-dark">
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
                <span>Lưu</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-blue-600 transition-colors text-white text-sm font-bold shadow-lg shadow-blue-500/20">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Đánh dấu hoàn thành</span>
              </button>
            </div>
          </div>

          {/* Video Player Area */}
          <div className="w-full aspect-video rounded-xl bg-black relative overflow-hidden group shadow-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCMtb6SJepXS2-hDHdFSc5Qa8qyXnR8zSGFz9aIuv9bfvkuicbq2TJjs94uO4YwCxjtZClJ0bBLz8F8sa5r_FLlyVpCX8LRgv0dwvSK2EZy1i7speIxCna-nFV7syiL_V7cC3KqCo1momQQHPGqfN-tZFlVUr_2Q6hSoUWzHonnpJdKknhH0M8E6xg9efD0sIPFNjTrQGdEJj-Dd6l7n-lDsYpP7Sjb-I2tjRt-R_mBLhLi6F1hsynQ2qtbAM2kG8umqfxhidzaZdAD")'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="size-20 bg-primary/90 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-xl backdrop-blur-sm">
                <span className="material-symbols-outlined text-[48px] ml-1">play_arrow</span>
              </button>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gray-800">
              <div className="h-full bg-primary w-[20%]" />
            </div>
          </div>

          {/* Content Tabs */}
          <div className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
            {/* Tab Headers */}
            <div className="flex border-b border-border-light dark:border-border-dark overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab.id ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark hover:bg-background-light dark:hover:bg-border-dark'}`}
                >
                  {tab.label}
                  {tab.badge && (
                    <span className="ml-2 bg-border-light dark:bg-border-dark px-1.5 py-0.5 rounded text-xs">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
              {activeTab === 'transcript' && (
                <>
                  <h3 className="text-xl font-bold mb-4">Dialogue: Meeting for the first time</h3>
                  <div className="space-y-6">
                    {/* Dialogue items would be rendered here */}
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary font-bold shrink-0">
                        A
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-2xl font-body font-medium text-text-main-light dark:text-text-main-dark">
                          你好！
                        </p>
                        <p className="text-sm text-text-sub-light dark:text-text-sub-dark font-mono">
                          Nǐ hǎo!
                        </p>
                        <p className="text-base text-text-main-light dark:text-text-main-dark mt-1">
                          Hello!
                        </p>
                      </div>
                      <button className="ml-auto size-8 flex items-center justify-center rounded-full hover:bg-background-light dark:hover:bg-border-dark text-text-sub-light transition-colors self-start">
                        <span className="material-symbols-outlined text-[20px]">volume_up</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
              {/* Add other tab contents here */}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}