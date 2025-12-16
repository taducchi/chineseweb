'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MaterialsPage() {
        const router = useRouter()
        const [searchQuery, setSearchQuery] = useState('')
        const [activeFilter, setActiveFilter] = useState('all')

        const filters = [
                { id: 'all', label: 'Tất cả' },
                { id: 'hsk1', label: 'HSK 1' },
                { id: 'hsk2', label: 'HSK 2' },
                { id: 'hsk3', label: 'HSK 3' },
                { id: 'hsk4', label: 'HSK 4' },
                { id: 'hsk5', label: 'HSK 5' },
                { id: 'hsk6', label: 'HSK 6' },
                { id: 'textbook', label: 'Giáo trình' },
                { id: 'grammar', label: 'Ngữ pháp' },
        ]

        const resources = [
                {
                        id: 1,
                        title: 'Giáo trình Hán Ngữ Quyển 1',
                        description: 'Sách giáo khoa cơ bản nhất cho người mới bắt đầu học tiếng Trung. Bao gồm bài khóa, từ mới và ngữ pháp căn bản.',
                        category: 'Sơ cấp',
                        categoryColor: 'bg-green-100 dark:bg-[#28392f] text-green-700 dark:text-primary',
                        buttonText: 'Xem chi tiết',
                        buttonIcon: 'visibility',
                        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa0uYD_hzk00EpIqXWKT2lVseQwsIrGCYCx3y7l2eM71iLdTO68HzW2CXQRte_92XCz3DVIuAzJNwEAvNMRseLbMoFDMqLdys6m9S3cH40rVCeq2fN6bfuOX4ChSRDzi9YiIFWVY5IOaazX9GVwBSuAoYtoi2it9xkBOoUYgQ-vioQuYX3l3qk1gC-AQZxPdPLGizPFjlqFQboV7tdibmob_pt0NPpSTIUtQC9xbVWzOQ81Cbjh9LTAd1TP2Giw8cRTFzsEL81onw',
                        buttonAction: () => router.push('/materials/3000-common-words')
                },
                {
                        id: 2,
                        title: '3000 Từ Vựng Thông Dụng',
                        description: 'Danh sách từ vựng cốt lõi giúp bạn giao tiếp thành thạo trong cuộc sống hàng ngày và công việc.',
                        category: 'Từ vựng',
                        categoryColor: 'bg-blue-100 dark:bg-[#1e3a5f] text-blue-700 dark:text-blue-300',
                        buttonText: 'Xem chi tiết',
                        buttonIcon: 'visibility',
                        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw-DwsF-LfdC7rFMKD3rBsrWX512pRRHFeOpiIqTi_CLGbMprWut9IIOcbPo10G7H5quIcncsxphtirr_DUYPy_JX6ZTZOiOSQaPq24xF_P7d_GDqt2WJrPU7bkgXdLCVfmlNQrpOkYlcn1RDgM5RN0v_1NKHe01PfmTt3R1DaQobTcQhzU9ADykdI9-oL3Ntg0A665IDInMFXXovNFu2tdEJe73KlLTeMhHLHl0_IGC5TCFQLCsiMAVEs5ZapNquaXHWSw16RpVs',
                        buttonAction: () => router.push('/materials/3000-common-words')
                },
                {
                        id: 3,
                        title: 'Bộ Đề Thi HSK 4 - 2024',
                        description: 'Tổng hợp 10 đề thi thử HSK 4 mới nhất có đáp án và file nghe chi tiết.',
                        category: 'Luyện thi',
                        categoryColor: 'bg-orange-100 dark:bg-[#4a2e15] text-orange-700 dark:text-orange-300',
                        buttonText: 'Xem chi tiết',
                        buttonIcon: 'visibility',
                        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6SPLJubOZFgNeV2eqxgdVMpQW002nl8KkzRMjj1mqUxgX5ffGhnxos-C4RrsOyf02rn4VzNCrH1XOSjJdcmX78J6XHKCHbfyDmdz3vtMh0cRmtQbJLk_KH_fu_m0Bks_0ChNHDjiDxppOS8RScfM-uPoEQrh_zIy1ba6xf72KcFj6_hksxgK8MPNzU3Rn0B3LbKcIhtRI68DszfxcSrG6ot-ujF6kbIFjjOI80xDVFqH6NTqBH69Aeg1MK2DXzuvrqeC5YqvA7mc',
                        buttonAction: () => router.push('/materials/3000-common-words')
                },
                {
                        id: 4,
                        title: 'Ngữ Pháp Tiếng Trung Hiện Đại',
                        description: 'Sổ tay ngữ pháp toàn diện, giải thích chi tiết các cấu trúc câu từ cơ bản đến nâng cao.',
                        category: 'Ngữ pháp',
                        categoryColor: 'bg-purple-100 dark:bg-[#361a45] text-purple-700 dark:text-purple-300',
                        buttonText: 'Xem chi tiết',
                        buttonIcon: 'visibility',
                        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrcZkEv2KVA7DIWVr5SoJ7dBKu7sNLDKW3URG-3uzBvDJVbIQMdarsRB15TUxmcmjdrWheBT1-BENhpQVWqVcvcEARIVHkGa1hJDePEBxV8EirgH_-GWsvDu9rAjA-N37Iao2jsPfn4dXc697_1e2sc_eCcE0KxyZcE79J_coTBGr-z2F7ElZfz2AibDQZZ_Hf57qiV8DVI4XKhoqXBHmudTHwSiZEose4DaXaSs21Mhg_Jghzq-UM7FiSbFfdPiHLExRJgOW6w0k',
                        buttonAction: () => router.push('/materials/3000-common-words')
                },
                {
                        id: 5,
                        title: '100 Truyện Ngụ Ngôn Song Ngữ',
                        description: 'Nâng cao khả năng đọc hiểu qua các câu chuyện ngắn ý nghĩa có phiên âm Pinyin.',
                        category: 'Truyện đọc',
                        categoryColor: 'bg-teal-100 dark:bg-[#1a3835] text-teal-700 dark:text-teal-300',
                        buttonText: 'Xem chi tiết',
                        buttonIcon: 'visibility',
                        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuGZ5Ig9_DN6qw8awlGQ1gwBWR0cSDQh6wWFETiCwHfuVY1k25AYxZdtgV9lTzd7Jd2l92IWQH35LReoNBHCHLCxg-51O3txYNUc9fs6pvuUm3Ssr9Xqq6Eat_epRdew7HBvXipKDbHJ79HkgDhibMA9gq_mKbGw9JJTQTXpH2X1CJf0hQ4XZ_eYESaoX82Q_HyKgUH17X2MVgzeUFYPXScwKrlh9qyO27_4rBFRzLJIXq1qnbzdH2kIfH1RfKekWWIUgxp3biXY',
                        buttonAction: () => router.push('/materials/3000-common-words')
                },
                {
                        id: 6,
                        title: 'Luyện Nghe HSK 5 Cấp Tốc',
                        description: 'File audio chất lượng cao kèm transcript, tập trung vào các chủ đề thường gặp trong đề thi.',
                        category: 'Nghe nói',
                        categoryColor: 'bg-pink-100 dark:bg-[#451a2d] text-pink-700 dark:text-pink-300',
                        buttonText: 'Xem chi tiết',
                        buttonIcon: 'visibility',
                        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARXOqwGsWHhI0hGyxCJHJqSbraFCrqfAbYopL8NGx1OTvokVB6KNVXYZ06dmMqE8nwP1mu9I0ArdsQhchBB184UR-axzmmJdAI_PT9k3SR9ALCzwlrZGN4nJNMx_mmDNYl4H_fAO07BLG8liRH_5TqmWlZzweGQvckTnUd6LTIrNqW8i8dxAVW7KZjKlmu6UkXnHAwCi7ur62LhjDWJulDXieijXmzfZ1Q-6_dBhV_OzsMfIhRHchDpkCCiIIeLScjJvGbuh7B308',
                        buttonAction: () => router.push('/materials/3000-common-words')
                },
        ]

        const handleSearch = (e) => {
                e.preventDefault()
                if (searchQuery.trim()) {
                        console.log('Searching for:', searchQuery)
                        // Implement search logic here
                }
        }

        const handleFilterClick = (filterId) => {
                setActiveFilter(filterId)
                console.log('Filter applied:', filterId)
        }

        const handleViewAll = () => {
                console.log('View all resources')
        }

        return (
                <main className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col">
                        {/* Hero Section */}
                        <div className="px-4 py-6 md:px-10 lg:px-40 flex justify-center">
                                <div className="w-full max-w-[960px]">
                                        <div
                                                className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-2xl items-center justify-center p-6 relative overflow-hidden"
                                                style={{
                                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLsB0rLN6_wQka_NkV6Uvlh4KOe2UfrN3nPqOc-77lVXPC0eq9spUeRa2Jcld7ZG-oAXM8_Xc_PMD6jl33z_Ysm6io79A0KWFpUuz6IVAQf_mXutrWY4s52yGA98xbWYRROMbTMBvqIHUbZVkEuXkGf53moM6lhDSyNzB2RauInYIf0fPdHfn3mlXi097a6o_mmFslodRIs7UA47bgOi5WVthgJsPCwnOU1BxUWlO_mfRGBICzT1ksXEae8nyeDAqdt1dL3suld8k")`
                                                }}
                                        >
                                                <div className="flex flex-col gap-3 text-center z-10 max-w-2xl">
                                                        <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                                                                Kho Tài Liệu Tiếng Trung
                                                        </h1>
                                                        <p className="text-gray-200 text-sm md:text-base font-normal">
                                                                Hàng ngàn giáo trình, đề thi, và tài liệu học tiếng Trung miễn phí dành cho mọi cấp độ từ sơ cấp đến cao cấp.
                                                        </p>
                                                </div>
                                                <form onSubmit={handleSearch} className="flex flex-col w-full max-w-[540px] z-10 mt-4">
                                                        <div className="flex w-full items-stretch rounded-full h-12 md:h-14 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#3b5445] shadow-lg overflow-hidden group focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                                                                <div className="text-gray-400 dark:text-[#9db9a8] flex items-center justify-center pl-4 md:pl-5">
                                                                        <span className="material-symbols-outlined">search</span>
                                                                </div>
                                                                <input
                                                                        type="text"
                                                                        value={searchQuery}
                                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                                        className="flex-1 w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#9db9a8] px-3 text-sm md:text-base"
                                                                        placeholder="Tìm kiếm giáo trình, từ vựng, đề thi..."
                                                                />
                                                                <div className="p-1">
                                                                        <button
                                                                                type="submit"
                                                                                className="flex h-full px-6 cursor-pointer items-center justify-center rounded-full bg-primary text-[#111814] text-sm md:text-base font-bold tracking-[0.015em] hover:brightness-105 transition-all"
                                                                        >
                                                                                Tìm kiếm
                                                                        </button>
                                                                </div>
                                                        </div>
                                                </form>
                                        </div>
                                </div>
                        </div>

                        {/* Filter Chips */}
                        <div className="px-4 md:px-10 lg:px-40 pb-6 flex justify-center">
                                <div className="w-full max-w-[960px] overflow-x-auto">
                                        <div className="flex gap-3 p-1 min-w-max">
                                                {filters.map((filter) => (
                                                        <button
                                                                key={filter.id}
                                                                onClick={() => handleFilterClick(filter.id)}
                                                                className={`flex h-9 items-center justify-center px-5 rounded-full font-medium text-sm transition-all whitespace-nowrap ${activeFilter === filter.id
                                                                                ? 'bg-primary text-[#111814] font-bold shadow-md transform scale-105'
                                                                                : 'bg-white dark:bg-[#28392f] border border-gray-200 dark:border-transparent text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#3b5445]'
                                                                        }`}
                                                        >
                                                                {filter.label}
                                                        </button>
                                                ))}
                                        </div>
                                </div>
                        </div>

                        {/* Resources Grid */}
                        <div className="px-4 md:px-10 lg:px-40 pb-12 flex justify-center flex-1">
                                <div className="w-full max-w-[960px] flex flex-col gap-8">
                                        <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tài liệu nổi bật</h3>
                                                <button
                                                        onClick={handleViewAll}
                                                        className="text-sm font-medium text-primary hover:underline"
                                                >
                                                        Xem tất cả
                                                </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                {resources.map((resource) => (
                                                        <div
                                                                key={resource.id}
                                                                className="group flex flex-col sm:flex-row items-stretch gap-4 rounded-xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm border border-gray-100 dark:border-[#28392f] hover:border-primary/50 transition-all hover:shadow-md"
                                                        >
                                                                <div className="flex flex-1 flex-col justify-between gap-4">
                                                                        <div className="flex flex-col gap-2">
                                                                                <span className={`w-fit rounded-md px-2 py-0.5 text-xs font-bold ${resource.categoryColor}`}>
                                                                                        {resource.category}
                                                                                </span>
                                                                                <h4 className="text-base font-bold leading-tight text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                                                                        {resource.title}
                                                                                </h4>
                                                                                <p className="text-gray-500 dark:text-[#9db9a8] text-sm line-clamp-2">
                                                                                        {resource.description}
                                                                                </p>
                                                                        </div>
                                                                        <button
                                                                                onClick={resource.buttonAction}
                                                                                className="flex h-8 w-fit px-4 cursor-pointer items-center justify-center rounded-full bg-gray-100 dark:bg-[#28392f] text-gray-900 dark:text-white text-sm font-medium hover:bg-primary hover:text-[#111814] transition-colors gap-2"
                                                                        >
                                                                                <span className="material-symbols-outlined text-[18px]">
                                                                                        {resource.buttonIcon}
                                                                                </span>
                                                                                <span>{resource.buttonText}</span>
                                                                        </button>
                                                                </div>
                                                                <div
                                                                        className="w-full sm:w-32 aspect-[3/4] sm:aspect-square bg-cover bg-center rounded-lg shrink-0"
                                                                        style={{ backgroundImage: `url("${resource.imageUrl}")` }}
                                                                />
                                                        </div>
                                                ))}
                                        </div>

                                        <div className="flex justify-center mt-4">
                                                <button className="flex h-12 px-8 cursor-pointer items-center justify-center rounded-full bg-surface-light dark:bg-[#28392f] border border-gray-200 dark:border-transparent text-gray-900 dark:text-white text-sm font-bold tracking-[0.015em] hover:bg-gray-100 dark:hover:bg-[#3b5445] transition-all gap-2">
                                                        <span>Xem thêm tài liệu</span>
                                                        <span className="material-symbols-outlined">expand_more</span>
                                                </button>
                                        </div>
                                </div>
                        </div>
                </main>
        )
}