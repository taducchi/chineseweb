'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function SettingsPage() {
        const router = useRouter()
        const [selectedLevel, setSelectedLevel] = useState(3)
        const [wordCount, setWordCount] = useState(20)
        const [estimatedTime, setEstimatedTime] = useState(5)

        const hskLevels = [
                { id: 1, name: 'HSK 1', words: 150 },
                { id: 2, name: 'HSK 2', words: 300 },
                { id: 3, name: 'HSK 3', words: 600 },
                { id: 4, name: 'HSK 4', words: 1200 },
                { id: 5, name: 'HSK 5', words: 2500 },
                { id: 6, name: 'HSK 6', words: 5000 },
                { id: 7, name: 'HSK 7-9', words: 5414 },
        ]

        useEffect(() => {
                const minutes = Math.ceil((wordCount * 15) / 60)
                setEstimatedTime(minutes)
        }, [wordCount])

        const handleLevelSelect = (levelId) => {
                setSelectedLevel(levelId)
        }

        const handleSliderChange = (e) => {
                setWordCount(parseInt(e.target.value))
        }

        const handleStartPractice = () => {
                router.push(`/vocabulary?level=${selectedLevel}&words=${wordCount}`)
        }

        const handleBack = () => {
                router.back()
        }

        return (
                <div className="min-h-screen bg-background-light dark:bg-background-dark font-body text-text-main dark:text-white transition-colors duration-200">
                        <Header />

                        <main className="flex-1 pb-8">
                                {/* Container chính - đồng bộ với Header và Footer */}
                                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1200px]">
                                        {/* Hero Banner */}
                                        <div className="overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-blue-500 to-primary shadow-lg mt-4 md:mt-6 lg:mt-8 min-h-[160px] md:min-h-[180px] lg:min-h-[200px]">
                                                <div className="p-6 md:p-8 lg:p-10 h-full flex flex-col justify-end">
                                                        <span className="inline-block px-3 py-1.5 bg-white/90 text-primary text-sm md:text-base font-bold rounded-lg md:rounded-xl mb-3 md:mb-4 w-fit">
                                                                Học từ mới
                                                        </span>
                                                        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                                                                Sẵn sàng chưa?
                                                        </h1>
                                                        <p className="text-white/90 text-sm md:text-base lg:text-lg mt-2">
                                                                Chọn mục tiêu luyện tập của bạn.
                                                        </p>
                                                </div>
                                        </div>

                                        {/* HSK Levels Section */}
                                        <div className="mt-6 md:mt-8 lg:mt-10">
                                                <div className="flex items-center justify-between mb-4 md:mb-6">
                                                        <h3 className="text-text-main dark:text-white text-xl md:text-2xl font-bold">
                                                                Chọn cấp độ
                                                        </h3>
                                                        <button className="text-sm md:text-base font-medium text-text-sub hover:text-primary transition-colors px-3 py-1.5 hover:bg-primary/5 rounded-lg">
                                                                Chi tiết HSK
                                                        </button>
                                                </div>

                                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-5">
                                                        {hskLevels.map((level) => (
                                                                <button
                                                                        key={level.id}
                                                                        onClick={() => handleLevelSelect(level.id)}
                                                                        className={`group flex flex-col items-start justify-center p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-left h-[88px] md:h-[100px] lg:h-[110px] ${
                                                                                selectedLevel === level.id
                                                                                        ? 'bg-primary border-primary shadow-lg shadow-primary/30'
                                                                                        : 'bg-surface-light dark:bg-surface-dark border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-md'
                                                                        }`}
                                                                >
                                                                        {selectedLevel === level.id && (
                                                                                <div className="mb-1 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                                                        <span className="material-symbols-outlined text-white text-sm">
                                                                                                check
                                                                                        </span>
                                                                                </div>
                                                                        )}
                                                                        <span className={`font-bold leading-tight ${
                                                                                selectedLevel === level.id
                                                                                        ? 'text-white text-lg md:text-xl'
                                                                                        : 'text-text-main dark:text-white text-base md:text-lg'
                                                                        }`}>
                                                                                {level.name}
                                                                        </span>
                                                                        <span className={`mt-1 ${
                                                                                selectedLevel === level.id
                                                                                        ? 'text-white/90 text-sm'
                                                                                        : 'text-text-sub text-sm'
                                                                        }`}>
                                                                                {level.words.toLocaleString()} từ
                                                                        </span>
                                                                </button>
                                                        ))}
                                                </div>
                                        </div>

                                        {/* Word Count Section */}
                                        <div className="mt-8 md:mt-10 lg:mt-12">
                                                <h3 className="text-text-main dark:text-white text-xl md:text-2xl font-bold mb-5 md:mb-6">
                                                        Số lượng từ
                                                </h3>

                                                <div className="bg-surface-light dark:bg-surface-dark rounded-xl md:rounded-2xl p-5 md:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                                                        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-8">
                                                                <div>
                                                                        <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-main dark:text-white tracking-tight">
                                                                                {wordCount}
                                                                        </span>
                                                                        <span className="text-xl md:text-2xl text-text-sub font-medium ml-2">từ</span>
                                                                </div>
                                                                <div className="mt-3 md:mt-0">
                                                                        <div className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold inline-block">
                                                                                Vừa sức
                                                                        </div>
                                                                </div>
                                                        </div>

                                                        {/* Custom Slider */}
                                                        <div className="space-y-4">
                                                                <div className="relative w-full h-10 md:h-12 flex items-center">
                                                                        <input
                                                                                type="range"
                                                                                min="5"
                                                                                max="50"
                                                                                value={wordCount}
                                                                                onChange={handleSliderChange}
                                                                                className="w-full absolute z-20 opacity-0 cursor-pointer h-10 md:h-12"
                                                                                aria-label="Chọn số lượng từ"
                                                                        />
                                                                        <div className="w-full h-2.5 md:h-3 bg-gray-200 dark:bg-gray-700 rounded-full absolute z-0 overflow-hidden">
                                                                                <div
                                                                                        className="h-full bg-primary rounded-full"
                                                                                        style={{ width: `${((wordCount - 5) / (50 - 5)) * 100}%` }}
                                                                                />
                                                                        </div>
                                                                        <div
                                                                                className="size-8 md:size-10 bg-white dark:bg-gray-200 border-4 border-primary rounded-full absolute z-10 shadow-lg pointer-events-none"
                                                                                style={{ left: `${((wordCount - 5) / (50 - 5)) * 100}%`, transform: 'translateX(-50%)' }}
                                                                        />
                                                                </div>

                                                                <div className="flex justify-between text-sm md:text-base font-medium text-text-sub">
                                                                        <span>5 từ</span>
                                                                        <span>50 từ</span>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Estimated Time */}
                                        <div className="mt-6 md:mt-8 lg:mt-10">
                                                <div className="flex items-center justify-center gap-3 p-5 md:p-6 rounded-xl md:rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800">
                                                        <span className="material-symbols-outlined text-text-sub text-2xl">
                                                                timer
                                                        </span>
                                                        <span className="text-text-sub dark:text-gray-400 text-base md:text-lg font-medium">
                                                                Thời gian dự kiến:{' '}
                                                                <span className="text-text-main dark:text-white font-bold">
                                                                        ~{estimatedTime} phút
                                                                </span>
                                                        </span>
                                                </div>
                                        </div>

                                        {/* Start Practice Button */}
                                        <div className="mt-8 md:mt-10 lg:mt-12">
                                                <button
                                                        onClick={handleStartPractice}
                                                        className="w-full h-14 md:h-16 bg-primary hover:bg-primary-dark active:scale-[0.99] transition-all duration-200 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                                                >
                                                        <span className="text-white text-lg md:text-xl font-bold tracking-tight">
                                                                Bắt đầu luyện tập
                                                        </span>
                                                        <span className="material-symbols-outlined text-white text-2xl font-bold">
                                                                arrow_forward
                                                        </span>
                                                </button>
                                        </div>
                                </div>
                        </main>

                        <Footer />
                </div>
        )
}