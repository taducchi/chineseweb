'use client';

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {

  const {user, logout} = useAuth();
  return (
    <>
        <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 border-b border-gray-200 dark:border-gray-800 justify-between container mx-auto">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary p-2 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined">school</span>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight text-primary dark:text-white md:text-xl ">
          Zhoo中文
        </h1>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Trang chủ</Link>
        <Link href="/courses" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Khóa học</ Link >
        <Link href="/materials" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Tài liệu</ Link >

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
              <Link
                href="/vocabsetting"
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-t-lg"
              >
                <span className="material-symbols-outlined text-primary text-base">translate</span>
                <span>Luyện tập từ vựng</span>
              </ Link >
              <Link
                href="/reading"
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-b-lg"
              >
                <span className="material-symbols-outlined text-primary text-base">menu_book</span>
                <span>Luyện đọc</span>
              </ Link >
            </div>
          </div>
        </div>
      </nav>

    {user ? (
      <div className="flex items-center gap-4">

        <button class="rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 hover:ring-primary transition-all size-9 relative">
<img alt="User profile avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkskUJXCz2I7je8YY3L9UDNmIFiNNOxQdvehuIl7Kjk7chgrPknB-T-4r05Bct69eqatdt_i71qh-iFcDrn4eHPEQHUv52WomaT6q5B_OvMj8rmpdRZGU-3MjY7VhTsitv4mNDIWvvhTwjdQC5dZhOcc-oHAmt1oxSSxmVInFWtxgIwjC6BIDLuwBITgV_KbaB0FMma4iXwNJ6sPUaFjsAAL2GPVg0nGV3YlglcHbCcB4k-351poWs7FVQwhGPT6-5q1P8c1oO_FI"/>
</button>
      <p> {user.email} </p> 
      </div>
      
      
      ) :  (<div className="flex items-center gap-4">
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
      </div>)
      
    }
    </header>
    </>

  )
}