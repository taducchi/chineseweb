'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChinesePromoPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Auto close after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      >
        {/* Overlay click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={() => setIsOpen(false)}
        />

        {/* Main Popup with Bounce Animation */}
        <motion.div
          initial={{ 
            scale: 0.2, 
            y: 100, 
            opacity: 0,
            rotate: -10
          }}
          animate={{ 
            scale: 1, 
            y: 0, 
            opacity: 1,
            rotate: 0
          }}
          exit={{ 
            scale: 0.2, 
            y: 100, 
            opacity: 0,
            rotate: 10
          }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 200,
            duration: 0.8,
            delay: 0.1
          }}
          className="relative w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-gradient-to-br from-blue-600 to-blue-500"
        >
          {/* Chinese Pattern Background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />
          
          {/* Close Button */}
          <motion.button 
            onClick={() => setIsOpen(false)}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              damping: 10,
              stiffness: 200,
              delay: 0.5 
            }}
            className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/30 text-white rounded-full transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Main Content */}
          <div className="relative flex flex-col md:flex-row min-h-[500px]">
            {/* Left Side - Visuals */}
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                damping: 15,
                stiffness: 150,
                delay: 0.2 
              }}
              className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center relative bg-white/5 backdrop-blur-sm"
            >
              <div className="relative">
                {/* Main Card */}
                <motion.div 
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: -2, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    damping: 12,
                    stiffness: 180,
                    delay: 0.3 
                  }}
                  className="relative w-48 md:w-64 h-32 md:h-44 bg-slate-800 rounded-lg p-1 border-4 border-slate-700 shadow-xl overflow-hidden transform -rotate-2"
                >
                  <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-white p-3 md:p-4">
                    <span className="text-xs font-mono text-blue-400 mb-2">Lesson 01: Hello</span>
                    <div className="text-3xl md:text-4xl font-bold mb-1">你好</div>
                    <div className="text-xs opacity-60">nǐ hǎo</div>
                    <div className="mt-3 md:mt-4 flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Side Card */}
                <motion.div 
                  initial={{ rotate: 15, scale: 0.5, y: 50 }}
                  animate={{ rotate: 6, scale: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    damping: 12,
                    stiffness: 150,
                    delay: 0.4 
                  }}
                  className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 md:w-32 h-40 md:h-64 bg-slate-800 rounded-2xl p-1 border-4 border-slate-700 shadow-2xl transform rotate-6 overflow-hidden"
                >
                  <div className="w-full h-full bg-white rounded-xl flex flex-col items-center p-2 md:p-3">
                    <div className="w-8 md:w-12 h-1 bg-slate-200 rounded-full mb-3 md:mb-4"></div>
                    <div className="w-full aspect-square bg-blue-50 rounded-lg flex items-center justify-center mb-2 md:mb-3">
                      <span className="text-2xl md:text-3xl">🍵</span>
                    </div>
                    <div className="text-center">
                      <div className="text-sm md:text-lg font-bold text-slate-800">喝茶</div>
                      <div className="text-[8px] md:text-[10px] text-slate-500">hē chá</div>
                      <div className="mt-1 md:mt-2 text-[8px] md:text-[10px] text-slate-400">
                        Drinking tea is an essential part of Chinese culture.
                      </div>
                    </div>
                    <div className="mt-auto w-full h-6 md:h-8 bg-blue-600 rounded-lg"></div>
                  </div>
                </motion.div>

                {/* Decorative Icon */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    damping: 10,
                    stiffness: 150,
                    delay: 0.6 
                  }}
                  className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-20"
                >
                  <span className="text-6xl md:text-8xl text-white">📚</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Text & CTA */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                damping: 15,
                stiffness: 150,
                delay: 0.3 
              }}
              className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-white"
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-4 md:mb-6 flex items-center gap-2"
              >
                <span className="text-yellow-400">✨</span>
                <span className="uppercase tracking-widest text-xs md:text-sm font-semibold text-blue-100">
                  Ưu đãi đặc biệt
                </span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              >
                Học Tiếng Trung Dễ Dàng!
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-base md:text-lg text-blue-100 mb-6 md:mb-8 leading-relaxed"
              >
                Giảm giá <span className="font-bold text-yellow-300">40%</span> khóa học tháng này! 
                Nhận ngay lộ trình cá nhân hóa và 14 ngày học thử.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <motion.button 
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(251, 146, 60, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 md:py-4 px-6 md:px-8 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base md:text-lg rounded-xl shadow-lg shadow-orange-900/20 transform transition-all duration-200"
                >
                  HỌC THỬ MIỄN PHÍ
                </motion.button>
                <p className="text-center text-xs text-blue-200/60 italic">
                  * Áp dụng cho học viên đăng ký mới trước 30/06
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/10 backdrop-blur-md border-t border-white/10 p-4 md:p-6"
          >
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-10">
              {[
                { icon: '🎯', label: 'Cấp độ HSK' },
                { icon: '🖌️', label: 'Thư pháp' },
                { icon: '🥟', label: 'Ẩm thực' },
                { icon: '🏯', label: 'Văn hóa' },
                { icon: '🎶', label: 'Âm nhạc' }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 1 + (index * 0.1),
                    type: "spring",
                    damping: 10,
                    stiffness: 200
                  }}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <motion.div 
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 10,
                      backgroundColor: "rgba(255,255,255,0.4)"
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center text-lg md:text-xl transition-all duration-200"
                  >
                    {feature.icon}
                  </motion.div>
                  <span className="text-[10px] md:text-[10px] text-white/70 uppercase tracking-tighter">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Blur Effects */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}