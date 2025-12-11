export default function Features() {
  const features = [
    {
      icon: 'work',
      title: 'Cơ hội việc làm',
      description: 'Mở rộng cơ hội tại các công ty đa quốc gia với mức lương hấp dẫn.'
    },
    {
      icon: 'flight_takeoff',
      title: 'Du lịch dễ dàng',
      description: 'Tự tin giao tiếp khi đi du lịch Trung Quốc và các nước sử dụng tiếng Trung.'
    },
    {
      icon: 'psychology',
      title: 'Phát triển tư duy',
      description: 'Mở rộng cơ hội du học phát triển năng lực chuyên môn tại các trường Đại học top đầu tại Trung Quốc'
    },
    {
      icon: 'language',
      title: 'Văn hóa phong phú',
      description: 'Khám phá nền văn hóa lâu đời với 5000 năm lịch sử.'
    }
  ]

  return (
    <section id="features" className="bg-white dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-4">
            Tại sao nên học tiếng Trung?
          </h3>
          <p className="text-lg text-text-sub dark:text-gray-400">
            Ngôn ngữ mở ra cơ hội nghề nghiệp và văn hóa phong phú.
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
              <h4 className="text-xl font-bold text-text-main dark:text-white mb-3">
                {feature.title}
              </h4>
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