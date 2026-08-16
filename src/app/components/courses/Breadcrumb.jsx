'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BackButton from './BackButton';

const breadcrumbLabels = {
    dashboard: "Bảng điều khiển",
    courses: "Khóa học",
    lessons: "Bài học",
    users: "Người dùng",
    settings: "Cài đặt",
    vocabulary: "Từ vựng",
    grammar: "Ngữ pháp",
};

export default function Breadcrumb() {
    const pathname = usePathname();

    const paths = pathname.split('/').filter(Boolean);

    return (
        <nav className="flex items-center gap-1.5 py-2.5 px-3" aria-label="Breadcrumb">
            {paths.length > 2 && (
               <BackButton />
            )}
            
            {/* Home icon - phiên bản đơn giản hơn */}
            <Link 
                href="/dashboard" 
                className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                aria-label="Trang chủ"
            >
                <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            </Link>

            {paths.length > 0 && (
                <span className="text-gray-300 flex-shrink-0 text-sm">/</span>
            )}

            {paths.map((segment, index) => {
                const href = '/' + paths.slice(0, index + 1).join('/');
                const isLast = index === paths.length - 1;

                const label =
                    breadcrumbLabels[segment] ||
                    decodeURIComponent(segment)
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, c => c.toUpperCase());

                return (
                    <div key={href} className="flex items-center gap-1.5">
                        {isLast ? (
                            <span className="text-sm font-semibold text-gray-800 px-2 py-0.5">
                                {label}
                            </span>
                        ) : (
                            <>
                                <Link
                                    href={href}
                                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 font-medium"
                                >
                                    {label}
                                </Link>
                                <span className="text-gray-300 flex-shrink-0 text-sm">/</span>
                            </>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}