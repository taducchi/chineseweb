// app/dashboard/courses/[courseId]/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CourseDetailPage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(260); // 4:20 in seconds
  const [totalTime, setTotalTime] = useState(765); // 12:45 in seconds
  const [activeLine, setActiveLine] = useState(0);
  const [showVolume, setShowVolume] = useState(false);

  // Subtitles data
  const subtitles = [
    {
      id: 1,
      chinese: '你好，很高兴见到你。',
      pinyin: 'Nǐ hǎo, hěn gāoxìng jiàn dào nǐ.',
      vietnamese: 'Xin chào, rất vui được gặp bạn.',
      active: true
    },
    {
      id: 2,
      chinese: '这是我们的新产品目录。',
      pinyin: 'Zhè shì wǒmen de xīn chǎnpǐn mùlù.',
      vietnamese: 'Đây là danh mục sản phẩm mới của chúng tôi.',
      active: false
    },
    {
      id: 3,
      chinese: '看起来很不错，我们可以详细谈谈吗？',
      pinyin: 'Kàn qǐlái hěn bùcuò, wǒmen kěyǐ xiángxì tántán ma?',
      vietnamese: 'Trông rất tuyệt, chúng ta có thể nói chuyện chi tiết không?',
      active: false
    },
    {
      id: 4,
      chinese: '当然可以，请这边坐。',
      pinyin: 'Dāngrán kěyǐ, qǐng zhè biān zuò.',
      vietnamese: 'Tất nhiên là được, mời ngồi bên này.',
      active: false
    }
  ];

  // Topics data
  const topics = [
    { id: 1, name: 'Thương mại', active: true },
    { id: 2, name: 'Giao tiếp', active: false },
    { id: 3, name: 'Phỏng vấn', active: false },
    { id: 4, name: 'Văn phòng', active: false },
    { id: 5, name: 'Đàm phán', active: false }
  ];

  // Next videos data
  const nextVideos = [
    {
      id: 1,
      title: 'Bài 2: Ký kết hợp đồng và các điều khoản quan trọng',
      course: 'Tiếng Trung Thương Mại',
      duration: '10:25',
      views: '8.5k views',
      timeAgo: '5 ngày trước',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGp5wKUiAsVX3UzaUxWJSv9JHMbjMzuDSzR1jHXjKQ12A0Mx5y6CyPU7bbXbP9XqCJgpbEPp9OZXHPEFvDr6Ld8xy7RODx9_c1qYFyWDxnrcYrKdFB68poP8E_YY2utS6GEAM19CBbVwmDBg3yIk6RlKO8Oz7AvNbIbGLwItt16syEq0b5TiZuDvjjsjOnhXHQmKtIWka1OY1RdbU8Op41Nq9gvuViCuegr31lvCK_Cr3J3EXmrhHDdRkFrjOcnp5XJ3sSvKdCTeM'
    },
    {
      id: 2,
      title: 'Bài 3: Văn hóa bàn tiệc Trung Quốc cần biết',
      course: 'Văn hóa & Đời sống',
      duration: '15:00',
      views: '22k views',
      timeAgo: '1 tuần trước',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHct3BeV-YEWWzjb2RsJ7d4oH9tb_LVyrn-C1SJNjo8Ig5hiWw46sDai34E7_F-ZLVGUnaqPSwyfgauyDjpMwRhVtPfnTPI0x_ZOIXyhSpS4c6vA4rfp78LViHt1Bu0Zy750Gej_cDfp99Jwl9vGH8GaVTgxRt2vX9XPehvRhc1faQTKrim8ThWx89-S8Gb7Xi78YZyyi0Agn2VWvfFComJ6gQPnWrMQ-YF4-FcO53Nmr8NIfXr5wEZwRTOFiGRTLulZTrDG03EVI'
    },
    {
      id: 3,
      title: 'Luyện nghe: Bản tin kinh tế buổi sáng',
      course: 'Luyện nghe nâng cao',
      duration: '08:45',
      views: '5.1k views',
      timeAgo: '2 tuần trước',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKbgToLhAtV_xnDJrMbbB2DDRP3d4z0EE8gl8GhWqxkHF4U5aMMfPPm1qgSOweQIExdNqrKznr_lPt442vLw57AsHN-uHf4JmZPMgqTtYFNleU7p2a8r7MdoP2lGMiuT4k6rV74lJME7IN1hQEd-rnmn1J1iT6tQvecd3SOa1REyr_DoUQHO2eiRDIHzn1BBiFxjviQAGZ1IuIGIN36WuKH_K2H3wPAo3AonfoxGJ_iRxL-ifKBFaPhje9FQseq8onWCAQKXGCvs4'
    },
    {
      id: 4,
      title: 'Hội thoại mẫu: Đặt phòng khách sạn và vé máy bay',
      course: 'Du lịch',
      duration: '12:30',
      views: '18k views',
      timeAgo: '3 tuần trước',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7xPI-AV1AgwZZjhkuKdJLawJAzADz7uIl5qtQkyV1S_3AqEzFzF1rVpqp43UE8uVLDK8sIK44diwBRN-FNecYu8Md7f2Bi9oe9cn1RtsJwgwdVOMfd3e_psWmXlHksVz4jmFBVPQWRYdvDQ8lwH4RwcXVfkltkQGz1hGtd4K2JnknsFm7udRtL3y49e1aVErqc3tsXX_6JC9UYPpb1UUtHaC1HgLSFfA15ZuOrT5D7TlISkbII4IEbKFVg7U7vUiiiKN3BMCtA0A'
    },
    {
      id: 5,
      title: 'Lịch sử Trung Quốc qua các triều đại (Phần 1)',
      course: 'Lịch sử & Văn hóa',
      duration: '20:15',
      views: '45k views',
      timeAgo: '1 tháng trước',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlA-DbZq8SmKPVXf7zHfVdvLGz3_wmXqBIA-ml9iVQ0Zx21MCsS4zF_oLgSPAhimki7SsRmyEr39HJXlFOfGq2IN7E434pSWO7o8PZCYTWaob2Fie5bzHA-HGT8y0mBQsiIbNf0LYx915EuxjYZcHA6jKGjbgxHB6EQOWdXgXsyTxBTQtUHI6f6nHFMKFzQXWbn1K_Z7Ns__XSLWUMeCGD-U1l9SvnUkY-iH-wsZe1P84Wb9oeLtqd7NCi3isHlGCqbhYgZEZbNSo'
    }
  ];

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickPosition / width;
    const newTime = percentage * totalTime;
    setCurrentTime(newTime);
  };

  // Handle subtitle click
  const handleSubtitleClick = (index) => {
    setActiveLine(index);
  };

  // Handle topic click
  const handleTopicClick = (topicId) => {
    console.log('Selected topic:', topicId);
  };

  // Handle next video click
  const handleNextVideoClick = (videoId) => {
    console.log('Navigating to video:', videoId);
    // router.push(`/dashboard/courses/video/${videoId}`);
  };

  // Handle back to list
  const handleBackToList = () => {
    router.back();
  };

  // Calculate progress percentage
  const progressPercentage = (currentTime / totalTime) * 100;

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
     

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Main Video & Content */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmbJXTYUMJIpaMfgN7bEtWUj3paeqtT3IWo4VwJCTVwuD_SXpDQrFxCl6NjoRcxTJtS4cZNGViu_0diOM1vVmx1VGfulbjrFbHH-2ammzKRHAC4zyDk_UXgxvP28Q3pez3pvyynB1dEO7BchRLhoCjEzGquRgC1fD0RR1BXpBzfdBQdbxfwfqfhKH5q3k3rlT9uWBpsSIzZp2QSESxWAC9NKHFgVAvdCUpWL8ol-14JTgny5gzDtofBcDuw0vIQA7iJUMhzuK4fZY")'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
              
              {/* Play Button */}
              <button 
                onClick={handlePlayPause}
                className="absolute inset-0 m-auto size-20 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-primary hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(19,164,236,0.6)]"
              >
                <span className="material-symbols-outlined text-[48px] fill ml-1">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              {/* Video Controls (on hover) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                
                {/* Progress Bar */}
                <div 
                  className="relative w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer hover:h-1.5 transition-all"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="absolute h-full bg-primary rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                  <div 
                    className="absolute h-4 w-4 bg-primary rounded-full -top-1.5 shadow-md scale-0 group-hover:scale-100 transition-transform"
                    style={{ left: `${progressPercentage}%` }}
                  />
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handlePlayPause}
                      className="hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined fill">
                        {isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    
                    <button className="hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">replay_10</span>
                    </button>
                    
                    <button className="hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">forward_10</span>
                    </button>
                    
                    {/* Volume Control */}
                    <div 
                      className="flex items-center gap-2 group/vol"
                      onMouseEnter={() => setShowVolume(true)}
                      onMouseLeave={() => setShowVolume(false)}
                    >
                      <button className="hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">
                          {volume > 50 ? 'volume_up' : volume > 0 ? 'volume_down' : 'volume_mute'}
                        </span>
                      </button>
                      
                      {showVolume && (
                        <div className="w-20 transition-all duration-300">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="h-1 w-16 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                          />
                        </div>
                      )}
                      
                      <span className="text-xs font-medium font-mono ml-2">
                        {formatTime(currentTime)} / {formatTime(totalTime)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="hover:text-primary transition-colors flex items-center gap-1 text-xs font-bold bg-white/10 px-2 py-1 rounded">
                      <span className="material-symbols-outlined text-[18px]">subtitles</span>
                      <span>CN/VI</span>
                    </button>
                    
                    <button className="hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">settings</span>
                    </button>
                    
                    <button className="hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">fullscreen</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Bài 1: Gặp gỡ đối tác kinh doanh - Tiếng Trung Thương Mại
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  <span>12.5k lượt xem</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  <span>2 ngày trước</span>
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-[18px] fill">star</span>
                  <span>4.9 (120 đánh giá)</span>
                </span>
                
                <div className="flex gap-2 ml-auto">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 font-medium text-xs">
                    <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                    <span>Thích</span>
                  </button>
                  
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 font-medium text-xs">
                    <span className="material-symbols-outlined text-[18px]">share</span>
                    <span>Chia sẻ</span>
                  </button>
                  
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 font-medium text-xs">
                    <span className="material-symbols-outlined text-[18px]">playlist_add</span>
                    <span>Lưu</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Subtitles */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">translate</span>
                  Phụ đề song ngữ
                </h3>
                
                <div className="flex gap-2">
                  <button 
                    className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors"
                    title="Tải xuống PDF"
                  >
                    <span className="material-symbols-outlined text-[20px]">download</span>
                  </button>
                  
                  <button 
                    className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors"
                    title="Cài đặt hiển thị"
                  >
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6 max-h-[400px] overflow-y-auto space-y-4 relative scroll-smooth">
                {subtitles.map((subtitle, index) => (
                  <div
                    key={subtitle.id}
                    onClick={() => handleSubtitleClick(index)}
                    className={`pl-6 py-2 rounded-r-lg transition-colors cursor-pointer group ${
                      activeLine === index
                        ? 'relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-full bg-primary/5'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <p className={`text-xl ${
                      activeLine === index 
                        ? 'text-slate-900 dark:text-white font-medium' 
                        : 'text-slate-800 dark:text-slate-200'
                    } mb-1 leading-relaxed`}>
                      {subtitle.chinese}
                    </p>
                    
                    <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mb-2">
                      {subtitle.pinyin}
                    </p>
                    
                    <p className={`text-base ${
                      activeLine === index 
                        ? 'text-primary font-medium' 
                        : 'text-slate-600 dark:text-slate-400 italic'
                    }`}>
                      {subtitle.vietnamese}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6 h-full">
            
            {/* Topics */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Chủ đề</h3>
                <button className="text-primary text-xs font-bold hover:underline">
                  Xem tất cả
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-transform active:scale-95 ${
                      topic.active
                        ? 'bg-primary text-white shadow-sm shadow-primary/30'
                        : 'bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-800 w-full"></div>

            {/* Next Videos */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Video tiếp theo</h3>
              
              {nextVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleNextVideoClick(video.id)}
                  className="group flex gap-3 cursor-pointer p-2 -mx-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-36 aspect-video shrink-0 rounded-lg overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${video.image})` }}
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {video.course}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <span>{video.views}</span>
                      <span>•</span>
                      <span>{video.timeAgo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}