// app/dashboard/settings/page.jsx
'use client';

import { useState } from 'react';

export default function SettingsPage() {
        const [userData, setUserData] = useState({
                username: 'LearningHero',
                email: 'student@hanzihero.com',
                bio: 'Passionate Chinese learner aiming for HSK 6.'
        });

        const [learningPrefs, setLearningPrefs] = useState({
                dailyGoal: 'Regular (30 mins/day)',
                targetLevel: 'HSK 5-6 (Advanced)',
                reviewStyle: 'standard',
                characterSystem: 'Simplified Chinese'
        });

        const [interfaceSettings, setInterfaceSettings] = useState({
                appLanguage: 'English',
                darkMode: false
        });

        const [notifications, setNotifications] = useState({
                dailyReminders: true,
                weeklyReport: true,
                newContent: false
        });

        const handleSaveChanges = () => {
                // Logic to save settings
                console.log('Saving changes...', {
                        userData,
                        learningPrefs,
                        interfaceSettings,
                        notifications
                });
                // Show success message or call API
        };

        const handleCancel = () => {
                // Logic to cancel changes
                console.log('Cancelling changes...');
        };

        const handleInputChange = (section, field, value) => {
                switch (section) {
                        case 'userData':
                                setUserData(prev => ({ ...prev, [field]: value }));
                                break;
                        case 'learningPrefs':
                                setLearningPrefs(prev => ({ ...prev, [field]: value }));
                                break;
                        case 'interfaceSettings':
                                setInterfaceSettings(prev => ({ ...prev, [field]: value }));
                                break;
                        case 'notifications':
                                setNotifications(prev => ({ ...prev, [field]: value }));
                                break;
                }
        };

        return (
                <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
                        <div className="flex-1 overflow-y-auto">
                                <div className="layout-content-container flex flex-col max-w-[1200px] mx-auto w-full p-6 md:p-8 pb-32">

                                        {/* Breadcrumbs */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                                <a
                                                        className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
                                                        href="/dashboard"
                                                >
                                                        Trang Chủ
                                                </a>
                                                <span className="text-slate-400 text-sm font-medium">/</span>
                                                <span className="text-slate-900 dark:text-white text-sm font-medium">
                                                        Cài Đặt
                                                </span>
                                        </div>

                                        {/* Page Header */}
                                        <div className="flex flex-col gap-2 mb-8">
                                                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                                        Cài Đặt Tài Khoản
                                                </h1>
                                                <p className="text-slate-500 dark:text-slate-400 text-base">
                                                        Quản lý thông tin hồ sơ, tùy chọn và thông báo của bạn.
                                                </p>
                                        </div>

                                        {/* Settings Sections */}
                                        <div className="flex flex-col gap-8">

                                                {/* Profile Information */}
                                                <div className="bg-white dark:bg-[#1a2c35] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                                                                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                                        <span className="material-symbols-outlined text-primary">badge</span>
                                                                        Thông Tin Hồ Sơ
                                                                </h2>
                                                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                                                        Cập nhật ảnh đại diện và thông tin cá nhân.
                                                                </p>
                                                        </div>

                                                        <div className="p-6">
                                                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                                                        {/* Profile Photo */}
                                                                        <div className="flex flex-col items-center gap-3">
                                                                                <div className="size-24 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative group cursor-pointer">
                                                                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                                                                <span className="material-symbols-outlined text-white">photo_camera</span>
                                                                                        </div>
                                                                                        <img
                                                                                                alt="User Avatar"
                                                                                                className="w-full h-full object-cover"
                                                                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqjGFGbdT8aBizcqqP_8GjrOuMcmRE2r1mOPHbUnm1Jr8eWAvgPCGPOuhD8kELkCyaDGqT6UJ7Ym9MMIxw-hImDvokD7xIfpw1P5sUR13LUVMj1rXswFF4grYyUEcA8KN4urDhlnd0JLDrX4u-GKeFwxY6_CEZrTol2Ig_wQu8OB0x3BAX-DvaxGJu60GXmGadcV83MCx0zI-17mET-1WWkyjE_Ojo1vGIqG7Zp8Ht-HaFs6t0md8of0LBrEJVpdTWVF0gT367-sw"
                                                                                        />
                                                                                </div>
                                                                                <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                                                                                        Thay Đổi Ảnh
                                                                                </button>
                                                                        </div>

                                                                        {/* Profile Form */}
                                                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                                                                <div className="col-span-1">
                                                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                                                                Tên Người Dùng
                                                                                        </label>
                                                                                        <input
                                                                                                className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-[#15232b] text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                                                                type="text"
                                                                                                value={userData.username}
                                                                                                onChange={(e) => handleInputChange('userData', 'username', e.target.value)}
                                                                                        />
                                                                                </div>

                                                                                <div className="col-span-1">
                                                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                                                                Địa chỉ Email
                                                                                        </label>
                                                                                        <input
                                                                                                className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-[#15232b] text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                                                                type="email"
                                                                                                value={userData.email}
                                                                                                onChange={(e) => handleInputChange('userData', 'email', e.target.value)}
                                                                                        />
                                                                                </div>

                                                                                <div className="col-span-1 md:col-span-2">
                                                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                                                                Giới thiệu
                                                                                        </label>
                                                                                        <textarea
                                                                                                className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-[#15232b] text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder:text-slate-400"
                                                                                                rows="3"
                                                                                                value={userData.bio}
                                                                                                onChange={(e) => handleInputChange('userData', 'bio', e.target.value)}
                                                                                        />
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Learning Preferences */}
                                                <div className="bg-white dark:bg-[#1a2c35] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                                                                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                                        <span className="material-symbols-outlined text-primary">school</span>
                                                                        Tùy Chọn Học Tập
                                                                </h2>
                                                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                                                        Tùy chỉnh kế hoạch học tập và lịch ôn tập.
                                                                </p>
                                                        </div>

                                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div>
                                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                                                Mục Tiêu Hàng Ngày
                                                                        </label>
                                                                        <select
                                                                                className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-[#15232b] text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                                                value={learningPrefs.dailyGoal}
                                                                                onChange={(e) => handleInputChange('learningPrefs', 'dailyGoal', e.target.value)}
                                                                        >
                                                                                <option>Casual (10 mins/day)</option>
                                                                                <option>Regular (30 mins/day)</option>
                                                                                <option>Serious (60 mins/day)</option>
                                                                                <option>Intense (2 hours/day)</option>
                                                                        </select>
                                                                </div>

                                                                <div>
                                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                                                Mức Độ Mục Tiêu
                                                                        </label>
                                                                        <select
                                                                                className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-[#15232b] text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                                                value={learningPrefs.targetLevel}
                                                                                onChange={(e) => handleInputChange('learningPrefs', 'targetLevel', e.target.value)}
                                                                        >
                                                                                <option>HSK 1-2 (Beginner)</option>
                                                                                <option>HSK 3-4 (Intermediate)</option>
                                                                                <option>HSK 5-6 (Advanced)</option>
                                                                                <option>HSK 7-9 (Pro)</option>
                                                                        </select>
                                                                </div>

                                                                <div>
                                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                                                Kiểu Ôn Tập
                                                                        </label>
                                                                        <div className="flex gap-4 mt-2">
                                                                                <label className="flex items-center">
                                                                                        <input
                                                                                                className="text-primary focus:ring-primary border-slate-300 dark:border-slate-700 dark:bg-[#15232b]"
                                                                                                name="review_style"
                                                                                                type="radio"
                                                                                                checked={learningPrefs.reviewStyle === 'relaxed'}
                                                                                                onChange={() => handleInputChange('learningPrefs', 'reviewStyle', 'relaxed')}
                                                                                        />
                                                                                        <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Relaxed</span>
                                                                                </label>
                                                                                <label className="flex items-center">
                                                                                        <input
                                                                                                className="text-primary focus:ring-primary border-slate-300 dark:border-slate-700 dark:bg-[#15232b]"
                                                                                                name="review_style"
                                                                                                type="radio"
                                                                                                checked={learningPrefs.reviewStyle === 'standard'}
                                                                                                onChange={() => handleInputChange('learningPrefs', 'reviewStyle', 'standard')}
                                                                                        />
                                                                                        <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Standard</span>
                                                                                </label>
                                                                                <label className="flex items-center">
                                                                                        <input
                                                                                                className="text-primary focus:ring-primary border-slate-300 dark:border-slate-700 dark:bg-[#15232b]"
                                                                                                name="review_style"
                                                                                                type="radio"
                                                                                                checked={learningPrefs.reviewStyle === 'strict'}
                                                                                                onChange={() => handleInputChange('learningPrefs', 'reviewStyle', 'strict')}
                                                                                        />
                                                                                        <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Strict</span>
                                                                                </label>
                                                                        </div>
                                                                </div>

                                                                <div>
                                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                                                Hệ Thống Chữ
                                                                        </label>
                                                                        <select
                                                                                className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-[#15232b] text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                                                value={learningPrefs.characterSystem}
                                                                                onChange={(e) => handleInputChange('learningPrefs', 'characterSystem', e.target.value)}
                                                                        >
                                                                                <option>Simplified Chinese</option>
                                                                                <option>Traditional Chinese</option>
                                                                        </select>
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Two Column Grid */}
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                                        {/* Language & Interface */}
                                                        <div className="bg-white dark:bg-[#1a2c35] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full">
                                                                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                                                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                                                <span className="material-symbols-outlined text-primary">translate</span>
                                                                                Ngôn Ngữ & Giao Diện
                                                                        </h2>
                                                                </div>

                                                                <div className="p-6 flex flex-col gap-6">
                                                                        <div>
                                                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                                                        Ngôn Ngữ Ứng Dụng
                                                                                </label>
                                                                                <select
                                                                                        className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-[#15232b] text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                                                        value={interfaceSettings.appLanguage}
                                                                                        onChange={(e) => handleInputChange('interfaceSettings', 'appLanguage', e.target.value)}
                                                                                >
                                                                                        <option>English</option>
                                                                                        <option>Español</option>
                                                                                        <option>Français</option>
                                                                                        <option>Tiếng Việt</option>
                                                                                </select>
                                                                        </div>

                                                                        <div className="flex items-center justify-between">
                                                                                <div>
                                                                                        <p className="text-sm font-medium text-slate-900 dark:text-white">Chế Độ Tối</p>
                                                                                        <p className="text-xs text-slate-500 dark:text-slate-400">Giảm mỏi mắt</p>
                                                                                </div>
                                                                                <button
                                                                                        aria-checked={interfaceSettings.darkMode}
                                                                                        className={`bg-slate-200 dark:bg-slate-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${interfaceSettings.darkMode ? 'bg-primary' : ''}`}
                                                                                        role="switch"
                                                                                        type="button"
                                                                                        onClick={() => handleInputChange('interfaceSettings', 'darkMode', !interfaceSettings.darkMode)}
                                                                                >
                                                                                        <span
                                                                                                aria-hidden="true"
                                                                                                className={`${interfaceSettings.darkMode ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                                                                        />
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>

                                                        {/* Notification Settings */}
                                                        <div className="bg-white dark:bg-[#1a2c35] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full">
                                                                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                                                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                                                <span className="material-symbols-outlined text-primary">notifications</span>
                                                                                Cài Đặt Thông Báo
                                                                        </h2>
                                                                </div>

                                                                <div className="p-6 flex flex-col gap-4">
                                                                        <div className="flex items-start gap-3">
                                                                                <div className="flex h-6 items-center">
                                                                                        <input
                                                                                                className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary dark:bg-[#15232b]"
                                                                                                id="daily_reminders"
                                                                                                name="daily_reminders"
                                                                                                type="checkbox"
                                                                                                checked={notifications.dailyReminders}
                                                                                                onChange={(e) => handleInputChange('notifications', 'dailyReminders', e.target.checked)}
                                                                                        />
                                                                                </div>
                                                                                <div className="text-sm leading-6">
                                                                                        <label className="font-medium text-slate-900 dark:text-white" htmlFor="daily_reminders">
                                                                                                Nhắc Nhở Học Tập Hàng Ngày
                                                                                        </label>
                                                                                        <p className="text-slate-500 dark:text-slate-400">
                                                                                                Nhận thông báo lúc 9:00 AM nếu bạn chưa học.
                                                                                        </p>
                                                                                </div>
                                                                        </div>

                                                                        <div className="flex items-start gap-3">
                                                                                <div className="flex h-6 items-center">
                                                                                        <input
                                                                                                className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary dark:bg-[#15232b]"
                                                                                                id="weekly_report"
                                                                                                name="weekly_report"
                                                                                                type="checkbox"
                                                                                                checked={notifications.weeklyReport}
                                                                                                onChange={(e) => handleInputChange('notifications', 'weeklyReport', e.target.checked)}
                                                                                        />
                                                                                </div>
                                                                                <div className="text-sm leading-6">
                                                                                        <label className="font-medium text-slate-900 dark:text-white" htmlFor="weekly_report">
                                                                                                Báo Cáo Tiến Độ Hàng Tuần
                                                                                        </label>
                                                                                        <p className="text-slate-500 dark:text-slate-400">
                                                                                                Nhận tóm tắt thống kê học tập qua email.
                                                                                        </p>
                                                                                </div>
                                                                        </div>

                                                                        <div className="flex items-start gap-3">
                                                                                <div className="flex h-6 items-center">
                                                                                        <input
                                                                                                className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary dark:bg-[#15232b]"
                                                                                                id="new_content"
                                                                                                name="new_content"
                                                                                                type="checkbox"
                                                                                                checked={notifications.newContent}
                                                                                                onChange={(e) => handleInputChange('notifications', 'newContent', e.target.checked)}
                                                                                        />
                                                                                </div>
                                                                                <div className="text-sm leading-6">
                                                                                        <label className="font-medium text-slate-900 dark:text-white" htmlFor="new_content">
                                                                                                Tính Năng & Nội Dung Mới
                                                                                        </label>
                                                                                        <p className="text-slate-500 dark:text-slate-400">
                                                                                                Là người đầu tiên biết về bộ từ vựng mới và cập nhật.
                                                                                        </p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {/* Sticky Bottom Save Bar */}
                        <div className="w-full bg-white dark:bg-[#15232b] border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-6 z-20">
                                <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                                        Lần lưu cuối: Hôm nay lúc 10:42 AM
                                                </p>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto flex-1 md:justify-end">
                                                <button
                                                        onClick={handleCancel}
                                                        className="px-6 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium transition-colors w-full md:w-auto"
                                                >
                                                        Hủy
                                                </button>

                                                <button
                                                        onClick={handleSaveChanges}
                                                        className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-8 rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
                                                >
                                                        <span className="material-symbols-outlined text-sm">save</span>
                                                        <span>Lưu Thay Đổi</span>
                                                </button>
                                        </div>
                                </div>
                        </div>
                </main>
        );
}