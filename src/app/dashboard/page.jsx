'use client';

import { useState } from 'react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Danh sách navigation items
  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', active: true },
    { icon: 'menu_book', label: 'Courses' },
    { icon: 'style', label: 'Vocabulary Deck' },
    { icon: 'group', label: 'Community' },
    { icon: 'settings', label: 'Settings' },
  ];

  // Thống kê nhanh
  const stats = [
    { value: '350', label: 'Words Mastered', icon: 'school', color: 'purple' },
    { value: '45h', label: 'Hours Studied', icon: 'schedule', color: 'amber' },
    { value: '12.5k', label: 'Total XP', icon: 'emoji_events', color: 'emerald' },
  ];

  // Khóa học đề xuất
  const recommendedCourses = [
    {
      title: 'Business Chinese I',
      level: 'Intermediate',
      lessons: '15 Lessons',
      rating: '4.8 (1.2k reviews)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpiw0Z3SqwjL5IbHyrgtisqxFtp2kty27HZ_fj_SR8Qayw9faNlK48SOqCBmc4R11L8tp4zCcYXX94plWW603lFaXF41zX1No1U5TrjbIIiHmL2o2S3rwJigiCMWUf-hUKa8BGrwIXMvMAh2O3j54Ke1aFcswwIkh2f-yIBY1zjxT_NeH7ct00ht7-hxBLH4E8bzt1gtlVwPxvLCVgWoHE6xcYwGdu6NUsqYqtJWtSyT22JHk0X6BhlHAgH08nAqiBVvCHm9FFecQ',
    },
    {
      title: 'Culture & Customs',
      level: 'Beginner',
      lessons: '8 Lessons',
      rating: '4.9 (850 reviews)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbWGHgzh6XTFASuETIr91BpiCrFntNTnIiGYT0ARAiBeQzTBAzi17tYhqqJd7Ap3eU-r9Ma8AFnubjfLKRhshzAINaiCK1gTuZRaVEdxM9e-oYxiK2VsO7AB8SkHrIb9-GOWNth2r5y3RciQambtUDPXVpxQZ3Luk43fmarV8dLMrqyy5H9maYFguXjrim22T75mNicc99ie2T3UCX96ZL35gU96dTJ4T5chsbCLNYBE33QZ1wYBXnylxwOEGFcr2IYu6FNLEpKpM',
    },
  ];

  // Bài tập
  const assignments = [
    { title: 'Practice Tones', type: 'Audio Recording', due: 'Due Tomorrow', status: 'urgent', color: 'red' },
    { title: 'Writing Hanzi', type: 'Worksheet', due: 'Due Friday', status: 'pending', color: 'orange' },
    { title: 'Vocabulary Quiz', type: 'Completed Yesterday', due: 'Completed', status: 'completed', color: 'slate' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen overflow-hidden">
      <div className="flex h-screen w-full">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Desktop & Mobile */}
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
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Zhongwen Master</h1>
          </div>
          
          <div className="px-4 py-2">
            <div className="flex gap-3 items-center p-2 mb-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNHiXTpMWi3QfV5Inx5xIJKPUEZy37dXp6WazZGEZ-wIAdcr1Z4eukzrve_0xrw5BX4cdF5bQ_qmnw_6V9Rgg2SzzATVDdFiMzOeu0wTJhZL91StNmdx8ckjEuNE51d0_qodOUNz1tfZZo_Tdnt01dU5FYkWGmFUfDipnRgaBPsQfTihlgQx6iGhkISw1o2YwaQA_IRCnuJIZ7M-LwRdF3NV1uvNNZBJp55YFigkfoAjAC0pFTvCpJE4qNQxao6M4Jk5D-0R1e9ao")'}}
              />
              <div className="flex flex-col overflow-hidden">
                <h2 className="text-sm font-bold truncate text-slate-900 dark:text-white">Alex Chen</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Level 3 Learner</p>
              </div>
            </div>
            
            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`material-symbols-outlined ${item.active ? 'filled' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto p-4">
            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-4 text-white">
              <div className="flex justify-between items-start mb-2">
                <span className="material-symbols-outlined text-white/80">workspace_premium</span>
                <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded">PRO</span>
              </div>
              <p className="text-sm font-bold mb-1">Upgrade Plan</p>
              <p className="text-xs text-white/80 mb-3">Get unlimited practice and expert reviews.</p>
              <button className="w-full py-1.5 bg-white text-primary text-xs font-bold rounded shadow-sm hover:bg-slate-50 transition-colors">
                Upgrade
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Top Header */}
          <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-[#15222b] border-b border-slate-200 dark:border-slate-800 shrink-0 z-10">
            <div className="flex md:hidden items-center gap-3">
              <button 
                className="text-slate-500"
                onClick={() => setSidebarOpen(!sidebarOpen)}
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
                  placeholder="Search vocabulary, grammar, or lessons..."
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
                  12 Days
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20">
            <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-8">
              {/* Page Heading */}
              <div className="flex flex-wrap justify-between items-end gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                    Good Morning, Alex
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
                    Let's continue your journey to fluency. You're doing great!
                  </p>
                </div>
                <div className="hidden sm:flex gap-3">
                  <button className="px-4 py-2 bg-white dark:bg-[#15222b] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    View Report
                  </button>
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* LEFT COLUMN (Main Focus) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  {/* Hero Course Card */}
                  <div className="bg-white dark:bg-[#15222b] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-6 md:gap-8 items-center">
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                            Current Course
                          </span>
                          <span className="text-slate-400 text-xs font-medium">HSK Level 3</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          Intermediate Grammar Structures
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                          Continue learning how to express duration with 'le' and complex complements of direction.
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="flex flex-col gap-2 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-slate-700 dark:text-slate-300">Progress</span>
                            <span className="text-slate-500">65%</span>
                          </div>
                          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
                          </div>
                          <p className="text-xs text-slate-400 mt-1">24/30 Lessons Completed</p>
                        </div>
                        
                        <button className="bg-primary hover:bg-sky-500 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2">
                          Continue Lesson
                          <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                      </div>
                      
                      <div className="w-full lg:w-64 aspect-video lg:aspect-square shrink-0 rounded-lg bg-cover bg-center shadow-inner relative overflow-hidden">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCV3PqHMYQJCQ4l1WhMC8nZcVPOj8sJRttCXKLVU-SnhqdwXidHPTPDeCTkUTSdhFznkr9iEJJfFLQ9KcPo8vXs2fDa47EWn_vCT1g44FIVz-su8eUkD7MIfPm4MRtnv98XwXJuRmZPROhS3TXCBZW-37Ci8L7Rol12CWZWmucFZ6MCtZvYHwjygYhzjsMkY21CfE3kA1Wdny21X72r9ep6dk2PY0D7qvuEgyzXHXHjX_H6ipj1qsiaAWanyoOkwjt0VSVeY8254so")'}}
                        />
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-[#15222b] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4"
                      >
                        <div className={`size-12 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 flex items-center justify-center`}>
                          <span className="material-symbols-outlined">{stat.icon}</span>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                          <p className="text-xs text-slate-500 uppercase font-medium tracking-wide">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommended Courses */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Recommended for You
                      </h3>
                      <a href="#" className="text-primary text-sm font-medium hover:underline">
                        View All
                      </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendedCourses.map((course, index) => (
                        <div
                          key={index}
                          className="group bg-white dark:bg-[#15222b] p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition cursor-pointer flex gap-4"
                        >
                          <div 
                            className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-cover bg-center shrink-0"
                            style={{backgroundImage: `url(${course.image})`}}
                          />
                          <div className="flex flex-col justify-center">
                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                              {course.title}
                            </h4>
                            <p className="text-xs text-slate-500 mb-2">
                              {course.level} • {course.lessons}
                            </p>
                            <div className="flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 gap-1">
                              <span className="material-symbols-outlined text-base">star</span>
                              {course.rating}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN (Widgets) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  {/* Word of the Day */}
                  <div className="bg-white dark:bg-[#15222b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="material-symbols-outlined text-[100px] text-primary">auto_stories</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                      Word of the Day
                    </h3>
                    <div className="text-center py-4">
                      <div className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-2">
                        努力
                      </div>
                      <div className="text-lg md:text-xl text-primary font-medium mb-1">nǔ lì</div>
                      <div className="text-slate-500 dark:text-slate-400">Great effort; to strive; to try hard</div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-sm font-bold transition-colors">
                        Listen
                      </button>
                      <button className="flex-1 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary text-primary rounded-lg text-sm font-bold transition-colors">
                        Save
                      </button>
                    </div>
                  </div>

                  {/* Assignments */}
                  <div className="bg-white dark:bg-[#15222b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Assignments</h3>
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">2 Due</span>
                    </div>
                    <div className="flex flex-col gap-4">
                      {assignments.map((assignment, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <div className="mt-1">
                            <div className={`size-2 rounded-full bg-${assignment.color}-500`} />
                          </div>
                          <div className="flex-1">
                            <h4 className={`text-sm font-bold text-slate-900 dark:text-white ${assignment.status === 'completed' ? 'line-through' : ''}`}>
                              {assignment.title}
                            </h4>
                            <p className="text-xs text-slate-500">{assignment.type} • {assignment.due}</p>
                          </div>
                          {assignment.status === 'completed' ? (
                            <div className="text-emerald-500">
                              <span className="material-symbols-outlined">check_circle</span>
                            </div>
                          ) : (
                            <button className="text-slate-400 hover:text-primary">
                              <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Community Teaser */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="font-bold text-lg mb-1">Weekly Challenge</h3>
                      <p className="text-white/80 text-sm mb-4">
                        Complete 5 lessons this week to earn the "Scholar" badge.
                      </p>
                      <div className="flex -space-x-2 mb-4">
                        <img
                          alt="Participant 1"
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk-QPSo1aNjweY1KHj8JIa1bmhZSmN2VXywV4GBVftHnGj6vS3bywqnk01H57ITg0akT271iTnOWKyCuH6UUDo5Jc5sO_H0PVEdgiZsechuSlTqF6m4oVrzgiTp1yczuhdemznjbTeJDMrYsDE7su6Z0lgZ9qrGz-4lLYKxfKt7bEcvEdXsp3WJX4fckC1rh5VTN_imwAf9ny807M_0eMPyryPxKwQKXRkvoyvZTMX1e3_SJvpWGHgH1GpL0UeSKMXvRqNXkyot9E"
                        />
                        <img
                          alt="Participant 2"
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLFFb6OrrKIPsZroTXuOXRdyDOfBkATG_Xoyb3Clf-RW-vUjmx_onpu_wUH-yI08QQjCyByNnRwQmEXkgPKphr3oUjLVNK6tZigQc9BNPRvlB44BDLiP1QdZwuzv-AQe6OziMd_RN2rDkk4ZLcpErBjd8LJB1_c2lanCuDWX1eowTSCyhffXUFzV9gOBZZMxi7vM3VNOn3rmVcpxHPSCPYZHdcY83cWmW62wrBYABQQgrohbp71VjOi8dxVJRFPmpJZukj1Jo4F0c"
                        />
                        <img
                          alt="Participant 3"
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr5HLdFal33r3Kof-JjCW_LnwtgB6hPs410Q4IoqoYhIfwFNn7KsrpppjiY4nzNNoHmeVGGJDtlNvHM79QW1z0hEH-4WLgzr4qmbzoeMNJjHqqTgIRwQiODNc_Dmfvml556FWK7THWmmnnXpvt2XMusBRcS83-XZY8ms5w39XcwtpBx3D6l2yvacGSw_INeX0CF70KNApjLVcrcrQPz4tO3vVAxw9q9x7sGOLpmXK9ReFRMG7jMn_GN35OVWfDe5EB4BSRybtDABQ"
                        />
                        <div className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-white/20 flex items-center justify-center text-xs font-bold">
                          +42
                        </div>
                      </div>
                      <button className="bg-white text-indigo-600 text-sm font-bold py-2 px-4 rounded shadow-sm hover:bg-slate-50 transition">
                        Join Challenge
                      </button>
                    </div>
                    <div className="absolute -bottom-4 -right-4 text-white/10">
                      <span className="material-symbols-outlined text-[120px]">flag</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;