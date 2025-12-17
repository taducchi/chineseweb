export default function Footer() {
        const quickLinks = {
                courses: ['Cơ bản', 'Giao tiếp', 'Nâng cao', 'Luyện thi HSK'],
                about: ['Giới thiệu', 'Đội ngũ giảng viên', 'Phương pháp học', 'Liên hệ']
        }

        return (
                <footer className="bg-gray-900 text-white py-12">
                        <div className="container mx-auto px-4 md:px-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        <div>
                                                <div className="flex items-center gap-3 mb-6">
                                                        <div className="bg-primary/20 text-primary p-2 rounded-lg">
                                                                <span className="material-symbols-outlined">school</span>
                                                        </div>
                                                        <h3 className="text-xl font-bold">Zhoo中文</h3>
                                                </div>
                                                <p className="text-gray-400 mb-6">
                                                        Nền tảng học tiếng Trung trực tuyến hàng đầu Việt Nam, giúp bạn chinh phục tiếng Trung dễ dàng.
                                                </p>
                                                <div className="flex gap-4">
                                                        <a href="https://www.facebook.com/zhoozhongwen" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                                                <span className="material-symbols-outlined">facebook</span>
                                                        </a>
                                                        <a href="https://www.youtube.com/@zhoozhongwen" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                                                <span className="material-symbols-outlined">youtube_activity</span>
                                                        </a>
                                                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                                                <span className="material-symbols-outlined">tiktok</span>
                                                        </a>
                                                </div>
                                        </div>

                                        <div>
                                                <h4 className="text-lg font-bold mb-6">Khóa học</h4>
                                                <ul className="space-y-3">
                                                        {quickLinks.courses.map((course, index) => (
                                                                <li key={index}>
                                                                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                                                                {course}
                                                                        </a>
                                                                </li>
                                                        ))}
                                                </ul>
                                        </div>

                                        <div>
                                                <h4 className="text-lg font-bold mb-6">Về chúng tôi</h4>
                                                <ul className="space-y-3">
                                                        {quickLinks.about.map((item, index) => (
                                                                <li key={index}>
                                                                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                                                                {item}
                                                                        </a>
                                                                </li>
                                                        ))}
                                                </ul>
                                        </div>

                                        <div>
                                                <h4 className="text-lg font-bold mb-6">Liên hệ</h4>
                                                <ul className="space-y-3">
                                                        <li className="flex items-center gap-2 text-gray-400">
                                                                <span className="material-symbols-outlined">mail</span>
                                                                support@hoctiengtrung.vn
                                                        </li>
                                                        <li className="flex items-center gap-2 text-gray-400">
                                                                <span className="material-symbols-outlined">call</span>
                                                                1900 1234
                                                        </li>
                                                        <li className="flex items-center gap-2 text-gray-400">
                                                                <span className="material-symbols-outlined">location_on</span>
                                                                Hà Nội, Việt Nam
                                                        </li>
                                                </ul>
                                        </div>
                                </div>

                                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                                        <p>© 2024 ZhooZhongWen.vn - Tất cả các quyền được bảo lưu.</p>
                                </div>
                        </div>
                </footer>
        )
}