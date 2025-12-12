'use client'

import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'

export default function CourseDetailPage() {
  const params = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeChapter, setActiveChapter] = useState(0)
  const [showAllReviews, setShowAllReviews] = useState(false)

  // Dữ liệu mẫu - thực tế sẽ fetch từ API
  const mockCourses = {
    'luyen-thi-hsk-3': {
      id: 1,
      slug: 'luyen-thi-hsk-3',
      title: 'Luyện thi HSK 3: Từ vựng & Ngữ pháp toàn diện',
      description: 'Nắm vững 600 từ vựng và các cấu trúc ngữ pháp trọng điểm. Khóa học được thiết kế đặc biệt giúp bạn tự tin đạt điểm cao trong kỳ thi HSK 3 chỉ sau 8 tuần.',
      level: 'Intermediate',
      duration: '8 tuần',
      lessons: 42,
      students: 3800,
      rating: 4.8,
      price: 1299000,
      originalPrice: 2500000,
      instructor: 'Tiến sĩ Wang Li',
      category: 'Luyện thi HSK',
    }
  }

  useEffect(() => {
    // Giả lập fetch API
    setTimeout(() => {
      const foundCourse = mockCourses[params.slug]
      if (foundCourse) {
        setCourse(foundCourse)
      }
      setLoading(false)
    }, 500)
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!course) {
    notFound()
  }

  // Dữ liệu mẫu cho nội dung chi tiết
  const courseData = {
    ...course,
    instructor: {
      name: "Tiến sĩ Wang Li",
      title: "Giảng viên cao cấp Đại học Ngôn ngữ Bắc Kinh",
      experience: "15 năm kinh nghiệm",
      avatar: "/api/placeholder/96/96"
    },
    reviews: [
      {
        id: 1,
        name: "Minh Hoàng",
        rating: 5,
        date: "2 tuần trước",
        comment: "Khóa học rất chi tiết và dễ hiểu. Cô Wang dạy rất nhiệt tình, phần ngữ pháp giải thích cặn kẽ. Mình đã thi đỗ HSK 3 với 280 điểm nhờ khóa học này.",
        avatarColor: "bg-green-100 text-green-600"
      },
      {
        id: 2,
        name: "Thùy Anh",
        rating: 4.5,
        date: "1 tháng trước",
        comment: "Nội dung bài giảng phong phú, có nhiều ví dụ thực tế. Tuy nhiên phần bài tập nghe đôi khi hơi khó với người mới bắt đầu.",
        avatarColor: "bg-purple-100 text-purple-600"
      },
      {
        id: 3,
        name: "Khánh Duy",
        rating: 5,
        date: "2 tháng trước",
        comment: "Tuyệt vời! Mình thích nhất là tính năng thi thử online, giao diện giống hệt thi thật giúp mình làm quen áp lực thời gian.",
        avatarColor: "bg-blue-100 text-blue-600"
      }
    ],
    chapters: [
      {
        title: "Chương 1: Khởi động & Ôn tập nền tảng",
        duration: "45m",
        lessons: 4,
        topics: [
          { title: "Giới thiệu cấu trúc đề thi HSK 3 mới nhất", duration: "10:20", type: "video" },
          { title: "Ôn tập 150 từ vựng HSK 1 & 2 quan trọng", duration: "15:45", type: "video" },
          { title: "Bài kiểm tra đánh giá đầu vào", duration: "20:00", type: "quiz" }
        ]
      },
      {
        title: "Chương 2: Chủ đề Sinh hoạt & Mua sắm",
        duration: "1h 20m",
        lessons: 6,
        topics: [
          { title: "Từ vựng về mua sắm và mặc cả", duration: "12:10", type: "video" },
          { title: "Hội thoại tại siêu thị", duration: "18:30", type: "video" },
          { title: "Bài tập nghe chủ đề mua sắm", duration: "25:00", type: "quiz" }
        ]
      },
      {
        title: "Chương 3: Cấu trúc ngữ pháp trọng điểm",
        duration: "1h 05m",
        lessons: 5,
        topics: [
          { title: "Câu chữ 把 (Bả) và 被 (Bèi)", duration: "18:30", type: "video" },
          { title: "Cấu trúc so sánh phức tạp", duration: "22:15", type: "video" },
          { title: "Bài tập ngữ pháp nâng cao", duration: "24:15", type: "quiz" }
        ]
      }
    ],
    highlights: [
      "Nắm vững 600 từ vựng HSK 3 cốt lõi",
      "Thành thạo các cấu trúc ngữ pháp phức hợp",
      "Kỹ năng nghe hiểu các đoạn hội thoại dài",
      "Phương pháp làm bài thi HSK đạt điểm tối đa",
      "Viết được các đoạn văn ngắn 300 từ",
      "Tự tin giao tiếp chủ đề đời sống, công việc"
    ],
    includes: [
      { icon: "videocam", text: "12.5 giờ video bài giảng" },
      { icon: "description", text: "42 tài liệu có thể tải xuống" },
      { icon: "quiz", text: "8 bài kiểm tra thực hành" },
      { icon: "all_inclusive", text: "Truy cập trọn đời" },
      { icon: "devices", text: "Học trên Mobile và Desktop" },
      { icon: "emoji_events", text: "Chứng chỉ hoàn thành khóa học" }
    ]
  }

  const ratingStats = {
    average: 4.8,
    total: 1245,
    breakdown: [
      { stars: 5, percentage: 75 },
      { stars: 4, percentage: 18 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 }
    ]
  }

  const displayReviews = showAllReviews ? courseData.reviews : courseData.reviews.slice(0, 2)

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}


      <main className="w-full bg-white dark:bg-background-dark">
        {/* Course Hero Section */}
        <div className="bg-[#1a2632] dark:bg-slate-900 text-white py-8 md:py-12">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-slate-400 gap-2 mb-4 md:mb-6 flex-wrap">
              <Link href="/courses" className="hover:text-white transition-colors">
                Khóa học
              </Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <Link href="/courses" className="hover:text-white transition-colors">
                Tiếng Trung
              </Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-white">Luyện thi HSK</span>
            </div>

            {/* Course Title and Info */}
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
              <div className="lg:w-2/3 flex flex-col gap-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                  {course.title}
                </h1>
                
                <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2">
                  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded text-xs font-bold uppercase border border-yellow-500/30">
                    Bestseller
                  </span>
                  
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span className="text-sm font-bold">{ratingStats.average}</span>
                    <div className="flex text-base md:text-lg">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="material-symbols-outlined fill-1">
                          {star <= Math.floor(ratingStats.average) ? 'star' : 
                           star === Math.ceil(ratingStats.average) && ratingStats.average % 1 !== 0 ? 'star_half' : 'star'}
                        </span>
                      ))}
                    </div>
                    <span className="text-slate-400 text-sm ml-1">
                      ({ratingStats.total.toLocaleString()} đánh giá)
                    </span>
                  </div>
                  
                  <span className="hidden sm:inline text-slate-400 text-sm">•</span>
                  <span className="text-slate-300 text-sm">
                    {course.students.toLocaleString()} học viên
                  </span>
                </div>

                {/* Instructor Info */}
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4 text-sm">
                  <span className="text-slate-400">Giảng viên:</span>
                  <Link href="#" className="text-primary hover:underline font-medium">
                    {courseData.instructor.name}
                  </Link>
                  
                  <span className="hidden md:inline text-slate-400 ml-4">Cập nhật lần cuối: 10/2023</span>
                  
                  <div className="flex items-center gap-1 text-slate-300">
                    <span className="material-symbols-outlined text-base">language</span>
                    <span>Tiếng Việt, Tiếng Trung</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Video Preview */}
            <div className="w-full">
              <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg group cursor-pointer border border-slate-200 dark:border-slate-800">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 md:p-6 text-center">
                  <div className="size-16 md:size-20 rounded-full bg-primary/90 text-white flex items-center justify-center mb-3 md:mb-4 ring-4 md:ring-8 ring-primary/20 group-hover:scale-110 transition-transform duration-300 shadow-lg backdrop-blur-sm">
                    <span className="material-symbols-outlined text-3xl md:text-4xl fill-1 ml-1">play_arrow</span>
                  </div>
                  <h3 className="text-white text-lg md:text-2xl font-bold drop-shadow-lg mb-2">
                    Video giới thiệu khóa học
                  </h3>
                  <p className="text-white/90 text-sm md:text-base font-medium max-w-lg drop-shadow-md hidden sm:block">
                    Khám phá tổng quan về nội dung, phương pháp giảng dạy và những lợi ích đặc biệt mà khóa học mang lại.
                  </p>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-3 md:gap-4 text-white">
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                      play_arrow
                    </span>
                    <div className="h-1 bg-white/30 flex-1 rounded-full overflow-hidden cursor-pointer group/progress">
                      <div className="h-full w-0 bg-primary group-hover/progress:w-1/3 transition-all duration-500"></div>
                    </div>
                    <span className="text-xs font-mono font-medium">05:30</span>
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                      volume_up
                    </span>
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                      fullscreen
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="border border-[#e7edf3] dark:border-slate-700 rounded-xl p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50">
              <h3 className="text-xl font-bold mb-4 md:mb-6 text-[#0d141b] dark:text-white">
                Bạn sẽ học được gì
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {courseData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-0.5 text-xl">
                      check
                    </span>
                    <span className="text-sm text-[#4c739a] dark:text-slate-300">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Description */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#0d141b] dark:text-white">
                Giới thiệu khóa học
              </h3>
              <div className="text-[#4c739a] dark:text-slate-300 leading-relaxed space-y-4 text-sm md:text-base">
                <p>
                  Bạn đã hoàn thành HSK 2 và muốn tiến xa hơn trên con đường chinh phục tiếng Trung? 
                  Khóa học <strong>Luyện thi HSK 3</strong> này được thiết kế chính xác cho nhu cầu của bạn.
                </p>
                <p>
                  Khóa học bao gồm 8 tuần học tập trung, mỗi tuần đi sâu vào một chủ đề cụ thể thường gặp trong đề thi. 
                  Chúng tôi không chỉ dạy từ vựng và ngữ pháp, mà còn cung cấp các chiến lược làm bài thi hiệu quả, 
                  giúp bạn quản lý thời gian và tránh các bẫy thường gặp.
                </p>
                <p>
                  Với hệ thống bài tập tương tác, video bài giảng chất lượng cao và sự hỗ trợ trực tiếp từ đội ngũ trợ giảng, 
                  bạn sẽ thấy việc học tiếng Trung trở nên thú vị và hiệu quả hơn bao giờ hết.
                </p>
              </div>
            </div>

            {/* Course Curriculum */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#0d141b] dark:text-white">
                Nội dung khóa học
              </h3>
              <div className="flex items-center gap-3 md:gap-4 text-sm text-[#4c739a] dark:text-slate-400 mb-4 flex-wrap">
                <span>{courseData.chapters.length} Chương</span>
                <span className="text-slate-400">•</span>
                <span>{courseData.chapters.reduce((acc, ch) => acc + ch.lessons, 0)} Bài học</span>
                <span className="text-slate-400">•</span>
                <span>Tổng thời lượng 12h 30m</span>
              </div>
              
              <div className="border border-[#e7edf3] dark:border-slate-700 rounded-lg divide-y divide-[#e7edf3] dark:divide-slate-700 overflow-hidden">
                {courseData.chapters.map((chapter, index) => (
                  <details 
                    key={index}
                    className="group bg-white dark:bg-[#1a2632]"
                    open={index === activeChapter}
                    onToggle={() => setActiveChapter(index)}
                  >
                    <summary className="flex items-center justify-between p-3 md:p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors list-none">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400 transition-transform group-open:rotate-180">
                          expand_more
                        </span>
                        <span className="font-bold text-[#0d141b] dark:text-white text-sm md:text-base">
                          {chapter.title}
                        </span>
                      </div>
                      <span className="text-xs md:text-sm text-slate-500">
                        {chapter.lessons} bài học • {chapter.duration}
                      </span>
                    </summary>
                    
                    <div className="p-3 md:p-4 pt-0 text-sm text-[#4c739a] dark:text-slate-300 space-y-2 md:space-y-3 bg-white dark:bg-[#1a2632]">
                      {chapter.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex justify-between pl-8 md:pl-9 py-2 border-t border-slate-100 dark:border-slate-700/50">
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="material-symbols-outlined text-base">
                              {topic.type === 'video' ? 'play_circle' : 'description'}
                            </span>
                            <span className="text-sm">{topic.title}</span>
                          </div>
                          <span className="text-slate-400 text-xs md:text-sm">{topic.duration}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-[#0d141b] dark:text-white">
                Giảng viên
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <div className="shrink-0 flex justify-center sm:justify-start">
                  <div className="size-20 md:size-24 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-primary">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-slate-300" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-[#0d141b] dark:text-white">
                    {courseData.instructor.name}
                  </h4>
                  <p className="text-primary text-sm md:text-base font-medium mb-2">
                    {courseData.instructor.title}
                  </p>
                  
                  <div className="flex gap-3 md:gap-4 text-xs md:text-sm text-slate-500 mb-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">school</span>
                      {courseData.instructor.experience} kinh nghiệm
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">play_lesson</span>
                      20 khóa học
                    </span>
                  </div>
                  
                  <p className="text-sm text-[#4c739a] dark:text-slate-300 leading-relaxed">
                    Cô Wang Li có hơn 15 năm kinh nghiệm giảng dạy tiếng Trung cho người nước ngoài. 
                    Cô là tác giả của nhiều giáo trình luyện thi HSK nổi tiếng và được yêu thích bởi phương pháp giảng dạy hiện đại, dễ hiểu và truyền cảm hứng.
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="pt-8 md:pt-10 border-t border-[#e7edf3] dark:border-slate-700">
              <h3 className="text-xl font-bold mb-6 md:mb-8 text-[#0d141b] dark:text-white">
                Đánh giá từ học viên
              </h3>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-10">
                {/* Rating Summary */}
                <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl min-w-[200px]">
                  <div className="text-4xl md:text-5xl font-bold text-[#0d141b] dark:text-white mb-2">
                    {ratingStats.average}
                  </div>
                  <div className="flex text-yellow-400 text-lg md:text-xl mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="material-symbols-outlined fill-1">
                        {star <= Math.floor(ratingStats.average) ? 'star' : 
                         star === Math.ceil(ratingStats.average) && ratingStats.average % 1 !== 0 ? 'star_half' : 'star'}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-slate-500">
                    {ratingStats.total.toLocaleString()} đánh giá
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="flex-1 flex flex-col justify-center space-y-2 md:space-y-3">
                  {ratingStats.breakdown.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex text-yellow-400 text-xs gap-1 w-20 md:w-24 shrink-0">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <span 
                            key={star} 
                            className={`material-symbols-outlined ${
                              star <= stat.stars ? 'fill-1' : 'text-slate-300'
                            } text-sm`}
                          >
                            star
                          </span>
                        ))}
                        <span className="text-slate-500 ml-1">{stat.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {displayReviews.map((review) => (
                  <div key={review.id} className="border-b border-[#e7edf3] dark:border-slate-800 pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <div className={`size-10 rounded-full flex items-center justify-center font-bold shrink-0 ${review.avatarColor}`}>
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                          <h5 className="font-bold text-[#0d141b] dark:text-white text-sm">
                            {review.name}
                          </h5>
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                        
                        <div className="flex text-yellow-400 text-sm mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="material-symbols-outlined fill-1 text-sm">
                              {star <= Math.floor(review.rating) ? 'star' : 
                               star === Math.ceil(review.rating) && review.rating % 1 !== 0 ? 'star_half' : 'star'}
                            </span>
                          ))}
                        </div>
                        
                        <p className="text-sm text-[#4c739a] dark:text-slate-300 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More Reviews Button */}
              {courseData.reviews.length > 2 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="w-full py-3 border border-[#e7edf3] dark:border-slate-700 rounded-lg text-sm font-bold text-[#0d141b] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mt-6"
                >
                  {showAllReviews ? 'Ẩn bớt đánh giá' : `Xem thêm ${courseData.reviews.length - 2} đánh giá`}
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Course Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-700 rounded-xl shadow-lg overflow-hidden lg:-mt-32 z-10">
              {/* Course Preview Image */}
              <div className="relative w-full aspect-video bg-slate-900 group cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-slate-300 opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-12 md:size-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-3xl md:text-4xl fill-1">play_arrow</span>
                  </div>
                </div>
                
                <div className="absolute bottom-3 md:bottom-4 left-0 w-full text-center text-white text-sm font-medium">
                  Xem trước khóa học
                </div>
              </div>

              {/* Pricing and Enrollment */}
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl md:text-3xl font-bold text-[#0d141b] dark:text-white">
                    {course.price.toLocaleString()}đ
                  </span>
                  {course.originalPrice && (
                    <span className="text-lg text-slate-400 line-through decoration-slate-400">
                      {course.originalPrice.toLocaleString()}đ
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-red-500 text-sm font-medium mb-4 md:mb-6">
                  <span className="material-symbols-outlined text-lg">alarm</span>
                  <span>Ưu đãi kết thúc sau 2 ngày!</span>
                </div>

                <button className="w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg mb-3 transition-colors shadow-md">
                  Đăng ký ngay
                </button>

                <p className="text-center text-xs text-slate-500 mb-4 md:mb-6">
                  Đảm bảo hoàn tiền trong 30 ngày
                </p>

                {/* Course Includes */}
                <div className="space-y-3 md:space-y-4 pt-4 md:pt-6 border-t border-[#e7edf3] dark:border-slate-700">
                  <h5 className="font-bold text-[#0d141b] dark:text-white text-sm">
                    Khóa học này bao gồm:
                  </h5>
                  
                  <ul className="space-y-2 md:space-y-3">
                    {courseData.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-[#4c739a] dark:text-slate-300">
                        <span className="material-symbols-outlined text-lg shrink-0">
                          {item.icon}
                        </span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Share Course */}
                <div className="pt-4 md:pt-6 border-t border-[#e7edf3] dark:border-slate-700">
                  <h5 className="font-bold text-[#0d141b] dark:text-white text-sm mb-3">
                    Chia sẻ khóa học
                  </h5>
                  <div className="flex gap-3">
                    {['facebook', 'twitter', 'link'].map((platform) => (
                      <button
                        key={platform}
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#e7edf3] dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {platform === 'facebook' ? 'share' : 
                           platform === 'twitter' ? 'edit' : 'link'}
                        </span>
                        <span className="text-xs font-medium capitalize">{platform}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}