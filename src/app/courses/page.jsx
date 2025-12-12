// pages/courses.js
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function CoursesPage() {
        const courses = [
                {
                        id: 1,
                        level: "HSK 1",
                        levelColor: "text-primary",
                        title: "Tiếng Trung Nhập Môn",
                        rating: 4.9,
                        description: "Làm quen với thanh điệu, phiên âm Pinyin và những câu giao tiếp cơ bản nhất.",
                        lessons: 12,
                        duration: "3 giờ",
                        students: "1.2k",
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEmmPpEMLdAdAsWJDd153rs8nh1-DPTYzvTZvWU7OfkKjf3EGo3tXIxUCRU_s0DXprchkAgaJkAfGrqdpv1cBLYxfBFtfFfvUetsSAa4Kr3oLvZrRMAnbXgfHyE22yL9scomk5KVoo1izgwHkqjQSfF7-e8O8QgaOnu5Y8olbpISBQtfBKNqLRIKS2rN0T3xrvLszLesRejevaJBGpwaHDUM88ehiRuHIKCq_Qz87kQBJvRdBQEWdKbUrffpgh-bWer971oIZObT0W"
                },
                {
                        id: 2,
                        level: "HSK 3",
                        levelColor: "text-emerald-600",
                        title: "Giao Tiếp Văn Phòng",
                        rating: 4.8,
                        description: "Học các mẫu câu thông dụng trong môi trường công sở, viết email và thuyết trình.",
                        lessons: 20,
                        duration: "5 giờ",
                        students: "850",
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRefRuTIratEe07FVaDZYxiZyhrvw8fUQ9AsFR2-3R8ScXk78Ad4x59lufp9wo7dsuWCi3BK0zWYAyxqzlwboHQer2ZnuqRv6A6DqV667emKC-XGv4e3AlWyTjIt3jn1GKpKpLPYQ35IuV4y1uPpxctNpyJ606tblPc3K-XKTS0u2EIKrMcD9Osyv4PKTpa9eGT8XM-FMOX5uWeMkxqqA--A3k9xdrhEOpfaqb5wy_IXAzRrR-wkOQoDeRn2GSVgy2sQH7aLJPgMr6"
                },
                {
                        id: 3,
                        level: "HSK 4",
                        levelColor: "text-orange-600",
                        title: "Luyện Thi HSK 4 Cấp Tốc",
                        rating: 5.0,
                        description: "Chiến thuật làm bài, giải đề thi thử và tổng hợp 1200 từ vựng quan trọng.",
                        lessons: 30,
                        duration: "8 giờ",
                        students: "2.5k",
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn7-S0iV0QJj-5lO-SJuRsXJQw-2hHpUztaj19R4JnBEFDcrqwporCDyraSrK47I7onLP4ZcLDo4HWvZ-APQSkB6ej_2YnKT5NWZotCKbT3V_wCWvtYftHGctvtxgHML-sMNcCc6lNjJnpNQLy6SeH7pg3NbttjnFCh2G1HzbTVBdesBsWHfI-qsiXtQA4UafCPiKYOLpSkdl-Qy62dFTUdVLes-1CZyDB0bTeD2Cr2wJIsG2VH3IORhj7XRLXpvGnzp2B4j5DHpTF"
                },
                {
                        id: 4,
                        level: "HSK 2",
                        levelColor: "text-primary",
                        title: "Viết Chữ Hán Cơ Bản",
                        rating: 4.7,
                        description: "Tìm hiểu về 214 bộ thủ, quy tắc bút thuận và luyện viết chữ đẹp.",
                        lessons: 15,
                        duration: "4 giờ",
                        students: "540",
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBL7iDtIrFYRNC9jYiTj6KaXlSivB3Tjk0X1L9ke_ILX6gPp3QB7MoHgtIlG05rBTLzLBd0VKqBC7L3-Gdapx2w0xkjBJSWujgEe5hh1LhgLQbpmV2yXcnb01mUZ_n-V5Zi59eNaZNehxd-_wf0oH_L_cQ9pL21nffNVcLvOfwsyIsGfi-Y19GP8sGn0qQC9oEvmD8gfelHZ0ZGaptDzXeE8_q5gK3G5Ghf25E6GTT-Vy2sjfysEDY7v1ktSM5JoDOP8Ly-ZPE51T6z"
                },
                {
                        id: 5,
                        level: "Giao Tiếp",
                        levelColor: "text-purple-600",
                        title: "Tiếng Trung Du Lịch",
                        rating: 4.9,
                        description: "Tự tin đi khắp Trung Quốc với các chủ đề: đặt phòng, hỏi đường, mua sắm.",
                        lessons: 18,
                        duration: "4.5 giờ",
                        students: "920",
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNK-VNRRv4Q791mXkwcpzBkQjuBF1ziBbJ6nn-y7I9Q88tsIod86kbCno_lWSgj5lqUA142qpSYItZkPDW-RkiWfGxkIww9Eijk2fbgoM7uOvZAmQRT5Vm6iTWWv_Szgn4PJp4QR07CjfuYSIXVLnCHL_DDgBGuR4vlxSl9Y9tcn1DXJVC-0jC5jYDCKq5NpG2_zsMTaWKdP-1DeLT-p-mwAEltOXMPmNd57-Z0hhKNNeLfPAst_AnWXwLL3r_OAyrlnWH_WKZ5jHw"
                },
                {
                        id: 6,
                        level: "HSK 6",
                        levelColor: "text-rose-600",
                        title: "Thành Ngữ & Văn Hóa",
                        rating: 5.0,
                        description: "Khám phá chiều sâu ngôn ngữ qua các câu thành ngữ và điển tích lịch sử nổi tiếng.",
                        lessons: 25,
                        duration: "10 giờ",
                        students: "300",
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL7agOZitg9wnxKFJny1bDD0ymAS9TQQF_BR22ODraxBx71eF5FzuboMEBYO2OjCcUIJhZgN-YblnCEyLyzzRLitMa4thQPLzUUm48CZN0LkQwiIsFR3jz1BBjjt_wEQLjNJug6Q6qoJtWGR8FYq1D1hrEWaI0mTDUjrs_bcXy7wEFbAvwj1U2OSqVU_UY1wlBWmYoyEjHM0lIYRL3uJYNqRuu-4im_HiyJxPe2Fl9tsZWIeSOCgY3bI-6LJC01QcTKU2Y5jC59jOQ"
                }
        ];

        const categories = [
                { id: 1, name: "Tất cả", active: true },
                { id: 2, name: "Giao tiếp", active: false },
                { id: 3, name: "Ngữ pháp", active: false },
                { id: 4, name: "Luyện thi HSK", active: false },
                { id: 5, name: "Văn hóa", active: false },
                { id: 6, name: "Du lịch", active: false }
        ];

        return (
                <>
                        <Head>
                                <title>Danh sách khóa học - Chinese Learning</title>
                                <meta name="description" content="Khám phá các khóa học tiếng Trung phù hợp với trình độ của bạn" />
                                <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
                        </Head>

                        <div className="min-h-screen bg-background-light dark:bg-background-dark">
                                <Header /> 
                                <main className="px-4 md:px-10 lg:px-2 py-8 max-w-[1200px] mx-auto">
                                        {/* Page Heading */}
                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 p-4 mb-2">
                                                <div className="flex flex-col gap-2 min-w-72">
                                                        <h1 className="text-3xl md:text-[32px] font-bold text-text-main dark:text-white tracking-tight leading-tight">Danh sách khóa học</h1>
                                                        <p className="text-sm font-normal text-text-sub dark:text-slate-400 leading-normal">Khám phá các khóa học tiếng Trung phù hợp với trình độ của bạn</p>
                                                </div>
                                        </div>

                                        {/* Search and Filters */}
                                        <div className="flex flex-col lg:flex-row gap-4 px-4 py-2 mb-6">
                                                {/* Search Bar */}
                                                <div className="flex-1">
                                                        <div className="flex w-full h-12 items-stretch rounded-lg overflow-hidden shadow-sm">
                                                                <div className="flex items-center justify-center pl-4 pr-2 bg-white dark:bg-background-dark text-text-sub">
                                                                        <span className="material-symbols-outlined">search</span>
                                                                </div>
                                                                <input
                                                                        className="flex-1 w-full min-w-0 h-full px-2 pl-0 bg-white dark:bg-background-dark text-text-main dark:text-white placeholder:text-text-sub border-none focus:outline-none focus:ring-0 text-base font-normal"
                                                                        placeholder="Tìm kiếm khóa học theo tên hoặc chủ đề..."
                                                                />
                                                        </div>
                                                </div>

                                                {/* Filter & Sort Options */}
                                                <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0">
                                                        {/* Category Filter */}
                                                        <div className="relative min-w-[140px]">
                                                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-sub">
                                                                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                                                </div>
                                                                <select className="appearance-none w-full h-12 pl-10 pr-8 bg-white dark:bg-background-dark text-text-main dark:text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-primary shadow-sm cursor-pointer border-none">
                                                                        <option>Tất cả cấp độ</option>
                                                                        <option>Sơ cấp (HSK 1-2)</option>
                                                                        <option>Trung cấp (HSK 3-4)</option>
                                                                        <option>Cao cấp (HSK 5-6)</option>
                                                                </select>
                                                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-sub">
                                                                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                                                </div>
                                                        </div>

                                                        {/* Sort Option */}
                                                        <div className="relative min-w-[140px]">
                                                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-sub">
                                                                        <span className="material-symbols-outlined text-[20px]">sort</span>
                                                                </div>
                                                                <select className="appearance-none w-full h-12 pl-10 pr-8 bg-white dark:bg-background-dark text-text-main dark:text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-primary shadow-sm cursor-pointer border-none">
                                                                        <option>Phổ biến nhất</option>
                                                                        <option>Mới nhất</option>
                                                                        <option>Giá: Thấp đến cao</option>
                                                                        <option>Giá: Cao đến thấp</option>
                                                                </select>
                                                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-sub">
                                                                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Quick Categories */}
                                        <div className="px-4 mb-8">
                                                <div className="flex gap-3 flex-wrap">
                                                        {categories.map((category) => (
                                                                <button
                                                                        key={category.id}
                                                                        className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 shadow-sm transition-all active:scale-95 ${category.active
                                                                                ? 'bg-primary text-white hover:scale-105'
                                                                                : 'bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-700 text-text-sub dark:text-slate-300 hover:border-primary/50 hover:text-primary'
                                                                                }`}
                                                                >
                                                                        <span className="text-sm font-medium">{category.name}</span>
                                                                </button>
                                                        ))}
                                                </div>
                                        </div>

                                        {/* Course Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-10">
                                                {courses.map((course) => (
                                                        <div key={course.id} className="group flex flex-col bg-white dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:-translate-y-1">
                                                                <div className="relative h-48 overflow-hidden">
                                                                        <div className={`absolute top-3 left-3 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm border border-slate-200 dark:border-slate-700 ${course.levelColor}`}>
                                                                                {course.level}
                                                                        </div>
                                                                        <div
                                                                                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                                                                style={{ backgroundImage: `url('${course.image}')` }}
                                                                        ></div>
                                                                </div>

                                                                <div className="flex flex-col flex-1 p-5">
                                                                        <div className="flex justify-between items-start mb-2">
                                                                                <h3 className="text-lg font-bold text-text-main dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                                                                                        {course.title}
                                                                                </h3>
                                                                                <div className="flex items-center gap-1 text-amber-400">
                                                                                        <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                                                                                        <span className="text-sm font-bold text-text-main dark:text-slate-300">{course.rating}</span>
                                                                                </div>
                                                                        </div>

                                                                        <p className="text-sm text-text-sub dark:text-slate-400 mb-4 line-clamp-2 flex-1">
                                                                                {course.description}
                                                                        </p>

                                                                        <div className="flex items-center gap-4 text-xs text-text-sub dark:text-slate-400 mb-4 border-t border-slate-100 dark:border-slate-700 pt-3">
                                                                                <div className="flex items-center gap-1">
                                                                                        <span className="material-symbols-outlined text-[16px]">menu_book</span>
                                                                                        <span>{course.lessons} bài học</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-1">
                                                                                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                                                                                        <span>{course.duration}</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-1">
                                                                                        <span className="material-symbols-outlined text-[16px]">group</span>
                                                                                        <span>{course.students} học viên</span>
                                                                                </div>
                                                                        </div>

                                                                        <div className="flex gap-3 mt-auto">
                                                                                <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-md shadow-blue-200 dark:shadow-none">
                                                                                        Đăng ký ngay
                                                                                </button>
                                                                                <button className="px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-text-main dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" title="Xem chi tiết">
                                                                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>

                                        {/* Pagination */}
                                        <div className="flex justify-center pb-10">
                                                <nav className="flex items-center gap-2">
                                                        <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-text-sub dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                                                <span className="material-symbols-outlined">chevron_left</span>
                                                        </button>
                                                        <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white font-bold shadow-md shadow-blue-200 dark:shadow-none">1</button>
                                                        <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-text-main dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium">2</button>
                                                        <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-text-main dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium">3</button>
                                                        <span className="flex items-center justify-center w-10 h-10 text-text-sub">...</span>
                                                        <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-text-main dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium">8</button>
                                                        <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-text-sub dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                                                <span className="material-symbols-outlined">chevron_right</span>
                                                        </button>
                                                </nav>
                                        </div>
                                </main>
                        </div>
                        <Footer />
                </>
        );
}