'use client';

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 border-b border-gray-200 dark:border-gray-800 justify-between container mx-auto">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary p-2 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined">school</span>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight text-text-main dark:text-white md:text-xl">
          Học Tiếng Trung
        </h1>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Tính năng</a>
        <a href="/courses" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Khóa học</a>
        <a href="#testimonials" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Đánh giá</a>
        <a href="#planning" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Lộ trình học</a>

        {/* Dropdown Navbar với CSS đã sửa */}
        <div className="relative group">
          <button className="text-text-main dark:text-white hover:text-primary transition-colors font-medium flex items-center gap-1 py-2">
            Luyện tập
            <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {/* Dropdown Menu - Đã sửa CSS */}
          <div className="absolute left-0 top-full mt-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform -translate-y-2 group-hover:translate-y-0 border border-gray-100 dark:border-gray-700 z-50">
            {/* Phần tử vô hình để tạo khoảng cách an toàn */}
            <div className="absolute -top-2 left-0 w-full h-2 bg-transparent"></div>

            <div className="py-1">
              <a
                href="/vocabulary"
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-t-lg"
              >
                <span className="material-symbols-outlined text-primary text-base">translate</span>
                <span>Luyện tập từ vựng</span>
              </a>
              <a
                href="/reading"
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-b-lg"
              >
                <span className="material-symbols-outlined text-primary text-base">menu_book</span>
                <span>Luyện đọc</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="/account/login"
          className="hidden md:flex items-center justify-center text-text-main dark:text-white hover:text-primary transition-colors font-medium"
        >
          Đăng nhập
        </Link>

        <Link
          href="/account/register"
          className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Đăng ký
        </Link>
      </div>
    </header>
  )
}