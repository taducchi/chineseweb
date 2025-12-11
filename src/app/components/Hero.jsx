import Image from 'next/image'

export default function Hero() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-8 md:py-16">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Nền tảng học trực tuyến hàng đầu
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-text-main dark:text-white mb-6">
            Học tiếng Trung không khó mà còn mang lại nhiều lợi ích
          </h2>
          <p className="text-lg text-text-sub dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
            Khám phá lộ trình học tập hiệu quả dành riêng cho người Việt. Tự tin giao tiếp chỉ sau 3 tháng.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all">
              Đăng ký học thử miễn phí
            </button>
            <button className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              Xem lộ trình học
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="bg-gradient-to-br from-primary/20 to-transparent rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGMj7GNLk09X6GKNW826Rm8L69J8ZN_gxIMkhXfkonR42Fe5OYRfNydabk3ABAYyoTk0kgpzmzqYjPf9VYqoozYn73haqWn2UCwQLdxPR0Z9jIUupQdq9Sct0upz0kiGHzhLqBVGu6_Kp1o-SWtgGBdFQeXxf-tG9-PU9z0dckyDLeRA57nG-hr1KcaAISYcp8P2E2cvK4OhE3_AfvED6txssZOE1hGWorA99XlK_Saoyq5j8eM6wHhVr73YEssy7MtQdeDiCNFMQ"
                alt="Học tiếng Trung"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400">star</span>
                </div>
                <div>
                  <p className="font-bold text-lg">4.9/5</p>
                  <p className="text-sm text-text-sub">Đánh giá từ học viên</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}