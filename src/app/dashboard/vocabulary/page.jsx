// app/dashboard/vocabulary/page.jsx
'use client';

import { useState } from 'react';

export default function VocabularyPage() {
        const [searchTerm, setSearchTerm] = useState('');

        // Dữ liệu mẫu cho bộ từ vựng
        const vocabularyDecks = [
                {
                        id: 1,
                        title: 'HSK Cấp 1',
                        description: '150 Từ • Giao tiếp cơ bản',
                        mastery: 100,
                        type: 'Chính Thức',
                        typeColor: 'emerald',
                        character: '一'
                },
                {
                        id: 2,
                        title: 'HSK Cấp 2',
                        description: '300 Từ • Hội thoại hàng ngày',
                        mastery: 45,
                        type: 'Chính Thức',
                        typeColor: 'emerald',
                        character: '二'
                },
                {
                        id: 3,
                        title: 'Ẩm Thực & Nhà Hàng',
                        description: '25 Từ • Tạo 2 ngày trước',
                        mastery: 0,
                        type: 'Tùy Chỉnh',
                        typeColor: 'blue',
                        character: '食'
                },
                {
                        id: 4,
                        title: 'Cơ Bản Kinh Doanh',
                        description: '80 Từ • Từ vựng văn phòng',
                        mastery: 12,
                        type: 'Nâng Cao',
                        typeColor: 'purple',
                        character: '商'
                }
        ];

        // Lọc bộ từ vựng dựa trên từ khóa tìm kiếm
        const filteredDecks = vocabularyDecks.filter(deck =>
                deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                deck.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const handleCreateNewDeck = () => {
                // Logic để tạo bộ từ vựng mới
                console.log('Đang tạo bộ từ vựng mới...');
        };

        const handleStartPractice = () => {
                // Logic để bắt đầu luyện tập
                console.log('Bắt đầu luyện tập...');
        };

        return (
                <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
                        <div className="flex-1 overflow-y-auto">
                                <div className="layout-content-container flex flex-col max-w-[1200px] mx-auto w-full p-6 md:p-8 pb-32">

                                        {/* Thanh điều hướng */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                                <a
                                                        className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
                                                        href="/dashboard"
                                                >
                                                        Trang Chủ
                                                </a>
                                                <span className="text-slate-400 text-sm font-medium">/</span>
                                                <span className="text-slate-900 dark:text-white text-sm font-medium">
                                                        Bộ Từ Vựng
                                                </span>
                                        </div>

                                        {/* Tiêu đề Trang */}
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                                                <div className="flex flex-col gap-2 max-w-2xl">
                                                        <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                                                Bộ Từ Vựng
                                                        </h1>
                                                        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg">
                                                                Quản lý danh sách từ vựng, theo dõi tiến độ và mở rộng vốn từ tiếng Trung của bạn.
                                                        </p>
                                                </div>

                                                {/* Thanh Tìm Kiếm */}
                                                <div className="w-full md:w-auto md:min-w-[320px]">
                                                        <label className="flex flex-col w-full h-12 relative group">
                                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                                                                                search
                                                                        </span>
                                                                </div>
                                                                <input
                                                                        type="text"
                                                                        className="form-input flex w-full h-full rounded-xl border-none bg-white dark:bg-[#1a2c35] text-slate-900 dark:text-white placeholder:text-slate-400 pl-10 pr-4 text-base shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                                                        placeholder="Tìm kiếm bộ từ vựng hoặc từ..."
                                                                        value={searchTerm}
                                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                                />
                                                        </label>
                                                </div>
                                        </div>

                                        {/* Phần: Bộ Sưu Tập */}
                                        <div className="flex items-center gap-2 mb-6">
                                                <span className="material-symbols-outlined text-primary">library_books</span>
                                                <h2 className="text-slate-900 dark:text-white text-xl font-bold">Bộ Sưu Tập Của Bạn</h2>
                                        </div>

                                        {/* Lưới Bộ Từ Vựng */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">

                                                {/* Thẻ Tạo Bộ Mới */}
                                                <button
                                                        onClick={handleCreateNewDeck}
                                                        className="flex flex-col items-center justify-center min-h-[200px] rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-transparent hover:bg-white/50 dark:hover:bg-slate-800/50 hover:border-primary/50 transition-all group cursor-pointer text-center p-6"
                                                >
                                                        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                                <span className="material-symbols-outlined text-primary text-3xl">add</span>
                                                        </div>
                                                        <h3 className="text-slate-900 dark:text-white font-semibold text-lg">Tạo Bộ Mới</h3>
                                                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Xây dựng danh sách tùy chỉnh từ đầu</p>
                                                </button>

                                                {/* Thẻ Bộ Từ Vựng */}
                                                {filteredDecks.map((deck) => (
                                                        <div
                                                                key={deck.id}
                                                                className="flex flex-col bg-white dark:bg-[#1a2c35] rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-slate-100 dark:border-slate-800 relative group overflow-hidden"
                                                        >
                                                                {/* Chữ Hán Nền */}
                                                                <div className="absolute -right-4 -top-4 text-[120px] font-black text-slate-50 dark:text-slate-800/50 select-none z-0 pointer-events-none opacity-50">
                                                                        {deck.character}
                                                                </div>

                                                                <div className="relative z-10 flex flex-col h-full">
                                                                        {/* Header của Bộ */}
                                                                        <div className="flex justify-between items-start mb-4">
                                                                                <div className={`bg-${deck.typeColor}-100 dark:bg-${deck.typeColor}-900/30 text-${deck.typeColor}-700 dark:text-${deck.typeColor}-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider`}>
                                                                                        {deck.type}
                                                                                </div>
                                                                                <button className="text-slate-400 hover:text-primary transition-colors">
                                                                                        <span className="material-symbols-outlined text-xl">more_horiz</span>
                                                                                </button>
                                                                        </div>

                                                                        {/* Thông Tin Bộ */}
                                                                        <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-1">
                                                                                {deck.title}
                                                                        </h3>
                                                                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                                                                                {deck.description}
                                                                        </p>

                                                                        {/* Thanh Tiến Độ */}
                                                                        <div className="mt-auto">
                                                                                <div className="flex justify-between text-xs mb-2 font-medium">
                                                                                        <span className="text-slate-700 dark:text-slate-300">Mức độ thành thạo</span>
                                                                                        <span className={deck.mastery > 0 ? 'text-primary' : 'text-slate-400'}>
                                                                                                {deck.mastery}%
                                                                                        </span>
                                                                                </div>
                                                                                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                                                        <div
                                                                                                className="h-full bg-primary rounded-full transition-all duration-300"
                                                                                                style={{ width: `${deck.mastery}%` }}
                                                                                        />
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                </div>
                        </div>

                       
                </main>
        );
}