'use client';

import { useState } from 'react';
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40 w-full flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 border-b border-gray-200 dark:border-gray-800 justify-between container mx-auto">
        {/* Left section - Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined">school</span>
          </div>
          <h1 className="text-lg font-bold leading-tight tracking-tight text-primary dark:text-white md:text-xl">
            Zhoo中文
          </h1>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Trang chủ</Link>
          <Link href="/courses" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Khóa học</Link>
          <Link href="/materials" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Tài liệu</Link>

          {/* Dropdown Navbar */}
          <div className="relative group">
            <button className="text-text-main dark:text-white hover:text-primary transition-colors font-medium flex items-center gap-1 py-2">
              Luyện tập
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full mt-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform -translate-y-2 group-hover:translate-y-0 border border-gray-100 dark:border-gray-700 z-50">
              <div className="absolute -top-2 left-0 w-full h-2 bg-transparent"></div>

              <div className="py-1">
                <Link
                  href="/vocabsetting"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-t-lg"
                >
                  <span className="material-symbols-outlined text-primary text-base">translate</span>
                  <span>Luyện tập từ vựng</span>
                </Link>
                <Link
                  href="/reading"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-b-lg"
                >
                  <span className="material-symbols-outlined text-primary text-base">menu_book</span>
                  <span>Luyện đọc</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Right section - Auth/Avatar */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button - Visible on mobile only */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-text-main dark:text-white hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              {/* Avatar */}
              <button className="flex-shrink-0 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 hover:ring-primary transition-all size-9">
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

              </button>

              {/* Tên người dùng - Không bị co lại */}
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-main dark:text-white truncate max-w-[150px]">
                  {user.first_name || user.username || user.email.split('@')[0]}

                </p>

              </div>

              {/* Nút đăng xuất */}
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-shrink-0 flex items-center justify-center p-2 text-blue-600 dark:text-blue-400  rounded-lg transition-colors"
                title="Vào học ngay"
              >
                <span className="material-symbols-outlined text-lg">school</span>
              </button>
              <button
                onClick={() => logout()}
                className="flex-shrink-0 flex items-center justify-center p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Đăng xuất"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/account/login"
                className="items-center justify-center text-text-main dark:text-white hover:text-primary transition-colors font-medium"
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
          )}
        </div>
      </header>

      {/* Mobile Navigation Menu - Positioned above header */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel - Appears from top to bottom */}
        <div
          className={`absolute top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
          {/* Menu Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined">school</span>
              </div>
              <h2 className="text-lg font-bold text-primary dark:text-white">Zhoo中文</h2>
            </div>

            {/* Close button inside the sidebar */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-text-main dark:text-white hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Menu Content */}
          <div className="max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="flex flex-col p-4">
              <Link
                href="/"
                className="flex items-center gap-3 p-3 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-primary">home</span>
                <span className="font-medium">Trang chủ</span>
              </Link>

              <Link
                href="/courses"
                className="flex items-center gap-3 p-3 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-primary">school</span>
                <span className="font-medium">Khóa học</span>
              </Link>
              {user && <Link
                href="/dashboard"
                className="flex items-center gap-3 p-3 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-primary">school</span>
                <span className="font-medium">Dashboard</span>
              </Link> }

              <Link
                href="/materials"
                className="flex items-center gap-3 p-3 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-primary">description</span>
                <span className="font-medium">Tài liệu</span>
              </Link>

              {/* Practice Dropdown Section */}
              <div className="mt-2">
                <div className="flex items-center gap-3 p-3 text-text-main dark:text-white font-medium">
                  <span className="material-symbols-outlined text-primary">exercise</span>
                  <span>Luyện tập</span>
                </div>
                <div className="ml-10 space-y-1">
                  <Link
                    href="/vocabsetting"
                    className="flex items-center gap-3 p-2 text-sm text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="material-symbols-outlined text-primary text-base">translate</span>
                    <span>Luyện tập từ vựng</span>
                  </Link>
                  <Link
                    href="/reading"
                    className="flex items-center gap-3 p-2 text-sm text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="material-symbols-outlined text-primary text-base">menu_book</span>
                    <span>Luyện đọc</span>
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-gray-200 dark:border-gray-800"></div>

              {/* Auth Links for Mobile */}
              {!user ? (
                <div className="space-y-3">
                  <Link
                    href="/account/login"
                    className="flex items-center justify-center gap-2 p-3 text-text-main dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="material-symbols-outlined">login</span>
                    <span>Đăng nhập</span>
                  </Link>

                  <Link
                    href="/account/register"
                    className="flex items-center justify-center gap-2 p-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="material-symbols-outlined">person_add</span>
                    <span>Đăng ký</span>
                  </Link>
                </div>
              ) : (
                <>
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
                      <p className="text-sm font-medium text-text-main dark:text-white truncate">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      router.push('/dashboard');

                    }}
                    className="flex items-center justify-center gap-2 p-3 text-blue-600 border dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium w-full"
                  >
                    <span className="material-symbols-outlined">logout</span>
                    <span>Vào học ngay</span>
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 p-3 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium w-full"
                  >
                    <span className="material-symbols-outlined">logout</span>
                    <span>Đăng xuất</span>
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}