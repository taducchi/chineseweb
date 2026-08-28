// components/dashboard/DashboardSidebar.jsx

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import Logo from '../Logo';

export default function DashboardSidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const pathname = usePathname();

  // Trạng thái thu gọn / mở rộng
  const [collapsed, setCollapsed] = useState(false);

  // Tự động đóng sidebar khi chuyển trang trên mobile
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    // Lắng nghe sự kiện click trên mobile
    const handleClickOutside = (e) => {
      if (window.innerWidth < 768) {
        const sidebar = e.target.closest('aside');
        const toggleBtn = e.target.closest('[data-sidebar-toggle]');
        if (!sidebar && !toggleBtn && sidebarOpen) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sidebarOpen, setSidebarOpen]);

  // Nhóm nav chính
  const mainNavItems = [
    {
      icon: 'dashboard',
      label: 'Bảng Điều Khiển',
      href: '/dashboard',
    },
    {
      icon: 'cast_for_education',
      label: 'Khóa Học',
      href: '/dashboard/courses',
    },
    {
      icon: 'match_word',
      label: 'Luyện từ vựng',
      href: '/dashboard/vocabulary',
    },
    {
      icon: 'videocam',
      label: 'Xem video',
      href: '/dashboard/video',
    },
    {
      icon: 'auto_stories',
      label: 'Luyện đọc',
      href: '/dashboard/reading',
    },
    {
      icon: 'edit',
      label: 'Chép chính tả',
      href: '/dashboard/notetaking',
    },
  ];

  // Nhóm nav phía dưới
  const bottomNavItems = [
    {
      icon: 'help',
      label: 'Giúp đỡ',
      href: '/dashboard/help',
    },
    {
      icon: 'settings',
      label: 'Cài đặt',
      href: '/dashboard/settings',
    },
  ];

  // Component NavItem để tránh lặp code
  const NavItem = ({ item, isBottom = false }) => {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        onClick={() => {
          if (window.innerWidth < 768) {
            setSidebarOpen(false);
          }
        }}
        title={collapsed ? item.label : undefined}
        className={`
          group
          relative

          flex
          items-center

          h-10

          rounded-xl

          transition-all
          duration-200
          ease-in-out

          ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'}

          ${
            isActive
              ? `
                bg-primary/10
                text-primary
                font-semibold
                shadow-sm
              `
              : `
                text-slate-600
                dark:text-slate-400

                hover:bg-slate-100
                dark:hover:bg-slate-800

                hover:text-slate-900
                dark:hover:text-white
              `
          }

          ${!collapsed && 'hover:translate-x-0.5'}
        `}
      >
        {/* Active indicator */}
        {isActive && (
          <span
            className={`
              absolute
              left-0
              top-1/2
              -translate-y-1/2

              w-1
              ${isBottom ? 'h-5' : 'h-6'}

              rounded-r-full
              bg-primary
              shadow-sm
            `}
          />
        )}

        {/* Icon */}
        <span
          className={`
            material-symbols-outlined

            text-[22px]

            transition-all
            duration-200

            ${isActive ? 'filled' : ''}

            group-hover:scale-110
            group-hover:rotate-[-2deg]
          `}
          style={{
            fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          {item.icon}
        </span>

        {/* Text */}
        {!collapsed && (
          <span
            className={`
              text-sm
              whitespace-nowrap
              overflow-hidden
              transition-opacity
              duration-200
              ${!collapsed ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {item.label}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Overlay cho mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed
          md:relative
          z-50
          md:z-auto

          flex
          flex-col

          h-full
          bg-white
          dark:bg-[#15222b]

          border-r
          border-slate-200
          dark:border-slate-800

          shadow-lg
          md:shadow-none

          transition-all
          duration-300
          ease-in-out

          ${collapsed ? 'w-[72px]' : 'w-64'}

          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* =====================================================
            LOGO
        ====================================================== */}

        <div
          className={`
            relative
            h-[76px]

            flex
            items-center

            border-b
            border-slate-100
            dark:border-slate-800

            ${collapsed ? 'justify-center px-2' : 'justify-start px-4'}
          `}
        >
          {/* Logo mở rộng */}
          {!collapsed && (
            <div className="overflow-hidden transition-opacity duration-200">
              <Logo />
            </div>
          )}

          {/* Logo thu gọn */}
          {collapsed && (
            <div
              className="
                w-11 h-11
                rounded-xl
                flex items-center justify-center
                bg-gradient-to-br from-primary to-primary/80
                text-white
                shadow-lg
                font-bold
                text-xl
                select-none
                transition-transform
                hover:scale-105
                duration-200
              "
            >
              M
            </div>
          )}

          {/* Nút đóng sidebar trên mobile */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="
              md:hidden
              absolute
              right-3
              top-1/2
              -translate-y-1/2

              w-8 h-8
              rounded-lg

              flex
              items-center
              justify-center

              text-slate-500

              hover:bg-slate-100
              hover:text-slate-700

              dark:hover:bg-slate-800
              dark:hover:text-white

              transition-colors
              duration-200
            "
            aria-label="Đóng menu"
            data-sidebar-toggle
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* =====================================================
            NÚT THU / MỞ SIDEBAR
        ====================================================== */}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="
            hidden
            md:flex

            absolute
            -right-3
            top-[64px]
            z-50

            w-7 h-7
            rounded-full

            items-center
            justify-center

            bg-white
            dark:bg-[#15222b]

            border
            border-slate-200
            dark:border-slate-700

            text-slate-500
            dark:text-slate-400

            shadow-sm

            hover:text-primary
            hover:border-primary

            transition-all
            duration-200

            hover:scale-110
          "
          aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
          title={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
        >
          <span className="material-symbols-outlined text-[18px]">
            {collapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>

        {/* =====================================================
            MAIN NAVIGATION
        ====================================================== */}

        <div className="flex-1 px-3 py-5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          {/* Label */}
          {!collapsed && (
            <div
              className="
                px-3
                mb-3
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
                dark:text-slate-500
              "
            >
              Menu
            </div>
          )}

          <nav className="flex flex-col gap-1.5">
            {mainNavItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}

        <div className="px-3">
          <div
            className="
              border-t
              border-slate-200
              dark:border-slate-700
            "
          />
        </div>

        {/* =====================================================
            BOTTOM NAV
        ====================================================== */}

        <div className="px-3 py-4">
          <nav className="flex flex-col gap-1.5">
            {bottomNavItems.map((item) => (
              <NavItem key={item.href} item={item} isBottom />
            ))}
          </nav>
        </div>

        {/* =====================================================
            USER INFO (Optional)
        ====================================================== */}

        {!collapsed && (
          <div className="px-3 pb-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">person</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                  Người dùng
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 truncate">
                  user@example.com
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}