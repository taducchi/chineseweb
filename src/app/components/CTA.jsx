export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Bắt đầu hành trình học tiếng Trung ngay hôm nay!
        </h3>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Đăng ký ngay để nhận ưu đãi đặc biệt 30% và học thử miễn phí 7 ngày
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-colors">
            Đăng ký học thử miễn phí
          </button>
          <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
            Tư vấn lộ trình
          </button>
        </div>
        <p className="text-white/80 text-sm mt-6">
          Ưu đãi chỉ áp dụng trong hôm nay
        </p>
      </div>
    </section>
  )
}