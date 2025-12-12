// app/forgot-password/page.js
'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Gửi email:', email);
    // Gọi API reset password
  };

  return (
    <>
   

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        {/* Thay thế ảnh nền bằng SVG hoặc CSS gradient */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-5">
          <div className="absolute top-10 left-10 text-9xl font-black text-gray-800 dark:text-gray-200 transform -rotate-12">学</div>
          <div className="absolute bottom-10 right-10 text-9xl font-black text-gray-800 dark:text-gray-200 transform rotate-12">习</div>
        </div>

        {/* Form Container */}
        <div className="relative z-10 w-full max-w-md">
          {/* Icon sử dụng Material Symbols qua className */}
          <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-4xl">
              lock_reset
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Địa chỉ Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400">
                    mail
                  </span>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="nhap_email_cua_ban@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Gửi hướng dẫn
            </button>
          </form>
        </div>
      </main>


    </>
  );
}