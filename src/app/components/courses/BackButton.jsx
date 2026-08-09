'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BackButton() {
    const pathname = usePathname();

    const segments = pathname.split('/').filter(Boolean);

    // Đang ở cấp cao nhất
    if (segments.length <= 1) {
        return null;
    }

    const parentPath =
        '/' + segments.slice(0, segments.length - 1).join('/');

    return (
        <Link
            href={parentPath}
            className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50/70 transition-all duration-200 border border-transparent hover:border-blue-200"
        >
            <svg 
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
            <span className="text-sm font-medium">Quay lại</span>
            
            {/* Tooltip mở rộng */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {parentPath}
            </span>
        </Link>
    );
}