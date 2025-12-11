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
        <a href="#courses" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Khóa học</a>
        <a href="#testimonials" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Đánh giá</a>
        <a href="#planning" className="text-text-main dark:text-white hover:text-primary transition-colors font-medium">Lộ trình học</a>
      </nav>
      
      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center justify-center text-text-main dark:text-white hover:text-primary transition-colors">
          <span className="font-medium">Đăng nhập</span>
        </button>
        <button className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors">
          <span>Đăng ký</span>
        </button>
      </div>
    </header>
  )
}