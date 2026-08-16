'use client';

import { useState } from 'react';
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import GlobalLoadingOverlay from './GlobalLoadingOverlay';
import { useEffect } from 'react';

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const { user, logout, loadingCount } = useAuth();
	const router = useRouter();
	const [isPracticeOpen, setIsPracticeOpen] = useState(false)

	// Handle logout với loading state và xử lý lỗi
	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			await logout();
			// Đóng menu mobile
			setIsMobileMenuOpen(false);
			// Redirect về trang chủ
			router.push('/');
		} catch (error) {
			console.error('Logout failed:', error);
			// Có thể hiển thị thông báo lỗi ở đây
		} finally {
			setIsLoggingOut(false);
		}
	};

	// Handle mobile menu toggle
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	// Handle close mobile menu
	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<div className="zindex-50">
			{loadingCount > 0 && <GlobalLoadingOverlay />}
			
			{/* Logout Loading Overlay */}
			{isLoggingOut && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
						<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
						<p className="text-gray-700 dark:text-gray-300 font-medium">Đang đăng xuất...</p>
					</div>
				</div>
			)}

			<header className="w-full flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 border-b border-gray-200 dark:border-gray-800 justify-between container mx-auto">
				{/* Left section - Logo */}
				<Logo />

				{/* Desktop Navigation - Hidden on mobile */}
				<nav className="hidden md:flex items-center gap-8">
					<Link href="/" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Trang chủ</Link>
					<Link href="/roadmap" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Lộ trình</Link>
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
									href="/pronunciation"
									className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-t-lg"
								>
									<span className="material-symbols-outlined text-primary text-base">record_voice_over</span>
									<span>Phát âm</span>
								</Link>
								<Link
									href="/vocabsetting"
									className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
								>
									<span className="material-symbols-outlined text-primary text-base">translate</span>
									<span>Từ vựng</span>
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
						onClick={toggleMobileMenu}
						className="md:hidden flex items-center justify-center p-2 text-text-main dark:text-white hover:text-primary transition-colors"
						aria-label="Toggle menu"
					>
						<span className="material-symbols-outlined text-2xl">menu</span>
					</button>

					{user ? (
						<div className="hidden md:flex items-center gap-3">
							{/* Avatar với hiệu ứng đẹp */}
							<button
								className="flex-shrink-0 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-blue-500 dark:hover:ring-blue-400 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/20 group relative"
								onClick={() => router.push('/profile')}
								title="Hồ sơ cá nhân"
							>
								<div className="relative w-9 h-9">
									<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full transform group-hover:rotate-6 transition-all duration-500 blur-sm"></div>
									<img
										alt="User profile avatar"
										className="relative w-full h-full object-cover rounded-full border-2 border-white/80 dark:border-gray-800/80 shadow-md group-hover:shadow-lg transition-all duration-300"
										src={user.avatar_url || user.google_avatar_url}
										onError={(e) => {
											const initials = (user.first_name?.[0] || user.email[0] || 'U').toUpperCase();
											e.currentTarget.src = `data:image/svg+xml,<svg xmlns="https://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" fill="%236366f1" rx="128"/><text x="128" y="140" font-family="Arial" font-size="96" fill="white" text-anchor="middle" dy=".3em">${initials}</text></svg>`;
										}}
									/>
									<span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
								</div>
							</button>

							{/* Tên người dùng với role */}
							<div className="min-w-0 flex flex-col">
								<p className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[150px] leading-tight">
									{user.first_name || user.username || user.email.split('@')[0]}
								</p>
								<span className="text-xs text-gray-500 dark:text-gray-400">
									{user.role === 'admin' ? '👑 Quản trị viên' : user.role === 'teacher' ? '👨‍🏫 Giáo viên' : '🎓 Học viên'}
								</span>
							</div>

							{/* Nút Vào học */}
							<button
								onClick={() => router.push('/dashboard')}
								className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
								title="Vào học ngay"
							>
								<span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700"></span>
								<span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
								<span className="material-symbols-outlined text-lg relative z-10 group-hover:rotate-6 transition-transform duration-300">school</span>
								<span className="relative z-10 hidden lg:inline">Vào học</span>
								<span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform duration-300 hidden lg:inline">arrow_forward</span>
							</button>

							{/* Nút Đăng xuất Desktop */}
							<button
								onClick={handleLogout}
								disabled={isLoggingOut}
								className="group relative flex items-center gap-1.5 px-3 py-2 text-red-600 dark:text-red-400 hover:text-red font-medium rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
								title="Đăng xuất"
							>
								<span className="absolute inset-0 bg-red-50 dark:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
								{isLoggingOut ? (
									<>
										<span className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent relative z-10"></span>
										<span className="relative z-10 hidden lg:inline text-sm">Đang xử lý...</span>
									</>
								) : (
									<>
										<span className="material-symbols-outlined text-lg relative z-10 group-hover:rotate-12 transition-transform duration-300">logout</span>
										<span className="relative z-10 hidden lg:inline text-sm">Đăng xuất</span>
									</>
								)}
							</button>
						</div>
					) : (
						<div className="hidden md:flex items-center gap-3">
							<Link
								href="/account/login"
								className="group relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105"
							>
								<span>Đăng nhập</span>
								<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
							</Link>
							<Link
								href="/account/register"
								className="group relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
							>
								<span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700"></span>
								<span className="relative z-10">Đăng ký</span>
								<span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
							</Link>
						</div>
					)}
				</div>
			</header>

			{/* Mobile Navigation Menu */}
			<div
				className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
			
			>
				{/* Backdrop */}
				<div
					className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-50' : 'opacity-0'}`}
					onClick={closeMobileMenu}
				/>

				{/* Menu Panel */}
				<div
					className={`max-h-screen overflow-y-auto absolute top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
				style={{ 
    msOverflowStyle: 'none',
    scrollbarWidth: 'none'
  }}
				>
					{/* Menu Header */}
					<div className="flex items-center justify-between pr-4 border-b border-gray-200 dark:border-gray-800">
						<Logo />
						<button
							onClick={closeMobileMenu}
							className="p-2 text-text-main dark:text-white hover:text-primary transition-colors"
							aria-label="Close menu"
						>
							<span className="material-symbols-outlined text-2xl">close</span>
						</button>
					</div>

					{/* Menu Content */}
					<div className="max-h-[calc(100vh-80px)] overflow-y-auto "  style={{ 
    msOverflowStyle: 'none',
    scrollbarWidth: 'none'
  }}>
						<nav className="flex flex-col p-4">
							<Link
								href="/"
								className="flex items-center gap-3 p-3 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
								onClick={closeMobileMenu}
							>
								<span className="material-symbols-outlined text-primary">home</span>
								<span className="font-medium">Trang chủ</span>
							</Link>

							<Link
								href="/roadmap"
								className="flex items-center gap-3 p-3 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
								onClick={closeMobileMenu}
							>
								<span className="material-symbols-outlined text-primary">map</span>
								<span className="font-medium">Lộ trình</span>
							</Link>

							<Link
								href="/courses"
								className="flex items-center gap-3 p-3 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
								onClick={closeMobileMenu}
							>
								<span className="material-symbols-outlined text-primary">school</span>
								<span className="font-medium">Khóa học</span>
							</Link>

					

							<Link
								href="/materials"
								className="flex items-center gap-3 p-3 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
								onClick={closeMobileMenu}
							>
								<span className="material-symbols-outlined text-primary">description</span>
								<span className="font-medium">Tài liệu</span>
							</Link>

							
							
<div className="mt-2">
  {/* Dropdown Header */}
  <button
    onClick={() => setIsPracticeOpen(!isPracticeOpen)}
    className="flex items-center justify-between w-full p-3 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
  >
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-primary">exercise</span>
      <span className="font-medium">Luyện tập</span>
    </div>
    <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isPracticeOpen ? 'rotate-180' : ''}`}>
      expand_more
    </span>
  </button>

  {/* Dropdown Content */}
  <div className={`ml-10 space-y-1 overflow-hidden transition-all duration-300 ${isPracticeOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
    <Link
      href="/pronunciation"
      className="flex items-center gap-3 p-2 text-sm text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      onClick={closeMobileMenu}
    >
      <span className="material-symbols-outlined text-primary text-base">record_voice_over</span>
      <span>Phát âm</span>
    </Link>
    <Link
      href="/vocabsetting"
      className="flex items-center gap-3 p-2 text-sm text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      onClick={closeMobileMenu}
    >
      <span className="material-symbols-outlined text-primary text-base">translate</span>
      <span>Từ vựng</span>
    </Link>
    <Link
      href="/reading"
      className="flex items-center gap-3 p-2 text-sm text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      onClick={closeMobileMenu}
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
										onClick={closeMobileMenu}
									>
										<span className="material-symbols-outlined">login</span>
										<span>Đăng nhập</span>
									</Link>
									<Link
										href="/account/register"
										className="flex items-center justify-center gap-2 p-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
										onClick={closeMobileMenu}
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
											<img
												alt="User profile avatar"
												className="w-full h-full object-cover"
												src={user.avatar_url || user.google_avatar_url}
												onError={(e) => {
													const initials = (user.first_name?.[0] || user.email[0] || 'U').toUpperCase();
													e.currentTarget.src = `data:image/svg+xml,<svg xmlns="https://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" fill="%236366f1" rx="128"/><text x="128" y="140" font-family="Arial" font-size="96" fill="white" text-anchor="middle" dy=".3em">${initials}</text></svg>`;
												}}
											/>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-text-main dark:text-white truncate">
												{user.first_name || user.username || user.email.split('@')[0]}
											</p>
											<span className="text-xs text-gray-500 dark:text-gray-400">
												{user.role === 'admin' ? '👑 Quản trị viên' : user.role === 'teacher' ? '👨‍🏫 Giáo viên' : '🎓 Học viên'}
											</span>
										</div>
									</div>

									{/* Nút Vào học Mobile */}
									<button
										onClick={() => {
											router.push('/dashboard');
											closeMobileMenu();
										}}
										className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all duration-300 w-full shadow-md hover:shadow-lg"
									>
										<span className="material-symbols-outlined">school</span>
										<span>Vào học ngay</span>
										<span className="material-symbols-outlined text-base">arrow_forward</span>
									</button>

									{/* Nút Đăng xuất Mobile */}
									<button
										onClick={() => {
											handleLogout();
										}}
										disabled={isLoggingOut}
										className="flex items-center justify-center gap-2 p-3 my-1 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium w-full disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isLoggingOut ? (
											<>
												<span className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></span>
												<span>Đang đăng xuất...</span>
											</>
										) : (
											<>
												<span className="material-symbols-outlined">logout</span>
												<span>Đăng xuất</span>
											</>
										)}
									</button>
								</>
							)}
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
}