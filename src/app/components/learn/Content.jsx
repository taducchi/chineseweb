'use client';

import { useState } from 'react';
import VideoLesson from './VideoLesson';

export default function Content({ toggleSidebar }) {
 

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark relative">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 left-4 z-30 p-2 bg-white dark:bg-surface-dark rounded-lg shadow-lg text-text-main-light dark:text-text-main-dark border border-border-light dark:border-border-dark"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
        {/* <VideoLesson /> */}

        </div>
    </main>
  );
}