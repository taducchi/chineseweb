// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center max-w-md px-4">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
          Không tìm thấy trang
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Trang bạn đang tìm kiếm không tồn tại.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}