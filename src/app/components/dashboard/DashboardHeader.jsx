// components/dashboard/DashboardHeader.jsx
'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function DashboardHeader({ setSidebarOpen }) {


	const { user, logout } = useAuth();
	const router = useRouter();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			await logout();
			router.push('/');
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			setIsLoggingOut(false);
		}
	};
	return (
		<header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-[#15222b] border-b border-slate-200 dark:border-slate-800 shrink-0 z-10">
			<div className="flex md:hidden items-center gap-3">
				<button
					className="text-slate-500"
					onClick={() => setSidebarOpen(true)}
				>
					<span className="material-symbols-outlined">menu</span>
				</button>

			</div>

			<div className="hidden md:flex flex-1 max-w-md">
				<div className="relative w-full">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
						<span className="material-symbols-outlined">search</span>
					</div>
					<input
						type="text"
						className="block w-full p-2 pl-10 text-sm text-slate-900 border border-transparent rounded-lg bg-slate-100 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary placeholder-slate-500"
						placeholder="Tìm kiếm từ vựng, ngữ pháp hoặc bài học..."
					/>
				</div>
			</div>

			<div className="flex items-center gap-4">
				<button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
					<span className="material-symbols-outlined">notifications</span>
					<span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#15222b]" />
				</button>
				<div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />
				{user && (<>
					{/* User Info */}

					{/* Mobile */}

					{/* Mobile/Tablet: Only avatar + logout icon */}
					<div className="flex md:hidden items-center gap-2">
						{/* Avatar - smaller */}
						<button
							className="flex-shrink-0 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-blue-500 dark:hover:ring-blue-400 transition-all duration-300 hover:scale-110"
							onClick={() => router.push('/profile')}
							title="Hồ sơ cá nhân"
						>
							<div className="relative w-8 h-8">
								<img
									alt="User avatar"
									className="w-full h-full object-cover rounded-full border-2 border-white/80 dark:border-gray-800/80"
									src={user.avatar_url || user.google_avatar_url}
									onError={(e) => {
										const initials = (user.first_name?.[0] || user.email[0] || 'U').toUpperCase();
										e.currentTarget.src = `data:image/svg+xml,<svg xmlns="https://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" fill="%236366f1" rx="128"/><text x="128" y="140" font-family="Arial" font-size="96" fill="white" text-anchor="middle" dy=".3em">${initials}</text></svg>`;
									}}
								/>
								<span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white dark:border-gray-800 rounded-full"></span>
							</div>
						</button>
						<div className="min-w-0 flex flex-col">
							<p className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[150px] leading-tight">
								{user.first_name || user.username || user.email.split('@')[0]}
							</p>
							<span className="text-xs text-gray-500 dark:text-gray-400">
								{user.role === 'admin' ? '👑 Quản trị viên' : user.role === 'teacher' ? '👨‍🏫 Giáo viên' : '🎓 Học viên'}
							</span>
						</div>
						{/* Logout button - Mobile (icon only) */}
						<button
							onClick={handleLogout}
							disabled={isLoggingOut}
							className="flex items-center justify-center p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
							title="Đăng xuất"
						>
							{isLoggingOut ? (
								<span className="animate-spin rounded-full h-5 w-5 border-2 border-red-600 border-t-transparent"></span>
							) : (
								<span className="material-symbols-outlined text-lg">logout</span>
							)}
						</button>
					</div>
					{/* Desktop */}
					<div className="hidden md:flex items-center gap-3">
						{/* Avatar với hiệu ứng đẹp */}
						<button
							className="flex-shrink-0 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-blue-500 dark:hover:ring-blue-400 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/20 group relative"
							onClick={() => router.push('/profile')}
							title="Hồ sơ cá nhân"
						>
							<div className="relative w-9 h-9">
								{/* Background glow effect */}
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

								{/* Online status dot */}
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


						{/* Nút Đăng xuất - Thiết kế đẹp hơn */}
						<button
							onClick={logout}
							className="group relative flex items-center gap-1.5 px-3 py-2 text-red-600 dark:text-red-400 hover:text-red font-medium rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95"
							title="Đăng xuất"
						>
							<span className="absolute inset-0 bg-red-50 dark:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 "></span>

							<span className="material-symbols-outlined text-lg relative z-10 group-hover:rotate-12 transition-transform duration-300">
								logout
							</span>
							<span className="relative z-10 hidden lg:inline text-sm">Đăng xuất</span>
						</button>
					</div>


				</>
				)

				}
			</div>
		</header>
	);
}