export default function Features() {
  const features = [
    {
      icon: 'auto_awesome',
      title: 'Lộ trình học cá nhân hóa với AI',
      description: 'Hệ thống AI phân tích điểm mạnh/yếu và xây dựng lộ trình học tối ưu, tập trung vào kỹ năng bạn cần cải thiện nhất.'
    },
    {
      icon: 'ondemand_video',
      title: 'Bài giảng số chuẩn hóa (MOOC)',
      description: 'Học chủ động với hệ thống video, infographic, bài tập tương tác chuẩn theo chứng chỉ HSK/HSKK, xây dựng nền tảng vững chắc.'
    },
    {
      icon: 'record_voice_over',
      title: 'Luyện phản xạ nghe-nói cùng AI',
      description: 'Tương tác với AI huấn luyện viên 24/7 để luyện phát âm, giao tiếp phản xạ trong các tình huống thực tế, nhận phản hồi tức thì.'
    },
    {
      icon: 'groups',
      title: 'Lớp học thực hành với giáo viên',
      description: 'Tham gia lớp học tương tác trực tiếp với giáo viên để thảo luận, mô phỏng tình huống và hoàn thiện kỹ năng giao tiếp thực tế.'
    }
  ]

  return (
    <section id="features" className="bg-white dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-4">
            Mô hình học tiếng Trung 3 trong 1 hiệu quả vượt trội
          </h1>
          <p className="text-lg text-text-sub dark:text-gray-400">
            Kết hợp sức mạnh của <strong>Công nghệ AI</strong>, <strong>Hệ thống bài giảng chuẩn</strong> và <strong>Giáo viên chuyên môn</strong> - Giải pháp toàn diện giúp bạn thành thạo tiếng Trung thực tế, không chỉ để thi.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-background-light dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 feature-card"
            >
              <div className="bg-primary/10 text-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
              </div>
              <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">
                {feature.title}
              </h2>
              <p className="text-text-sub dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}