import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvfmFwj-w6-sztsxD6GMbSu_yRqaAdZ3X25h9n1WOiR1zaLfhv56d8xMlUNnUugoAzRLLvtu0ZnXnxVLp5ClVEkpS-3TXQDUlDeQGsioyViN6VteRrQNha3LasxCcMsMZ6BED9WUZGT4sCS2l37YlCvvGDIuvR2RKcAGomAP846tqqEYuj4mBPeFyK9ddyU1isS1Lh0fF8_fSY5kr_HglBWNYg04-YeZBLGgzIDddrwwRuM7yud-AOrmn0HYPqhYgF9uW1UZsUHvg',
    name: 'Minh Anh',
    role: 'Học viên khóa Nhập môn',
    rating: 5,
    comment: '"Phương pháp học rất thú vị và dễ nhớ. Mình đã có thể giao tiếp cơ bản chỉ sau 1 tháng! Giảng viên nhiệt tình, tài liệu phong phú."',
    time: '3 tháng trước'
  },
  {
    id: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdjC23EWLK04sleji8XLxTHA6xsCLGfX5nKAHnaxzQXESStcb_1VVn7Ss4d6TzR9_LWZ-tqiF4Q47Q2kL63vMWt6vPOJ7iFwmednmMNRv3KQ3WNk9PgBikXYBf_Y_JQ9kQd_MQVFVbEi7M4W0W4xJUPQLIAyENpeFGq48M_BjDegVX05GKe71Lxx1IcUnLlmfjRzWmouyz1JJmuaDNW2haQm1umENWK9lfGPBSq8qGnq1mKKgTEe5bBIC-goZnqVkVcQVt7Lj0apQ',
    name: 'Tuấn Anh',
    role: 'Học viên khóa Giao tiếp',
    rating: 4.5,
    comment: '"Khóa học giao tiếp thực tế, nhiều tình huống thực tế. Tôi đã tự tin hơn khi làm việc với đối tác Trung Quốc. Rất đáng giá!"',
    time: '2 tháng trước'
  },
  {
    id: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDhUsPfQuPcQm0xfvT0Ggzeg0CjS0G55zMbj0TLbPKo2jRniZMtR0H4JIu60e5aOzJfw2W980VQcugyPJy03ty9bGkj2Lmqq5mqnyhAJ8ado79EbCvuTMg2Fl4LWO5xfvcfSr347eq086H7bLIQykREwoHzDDqNIoktLDISSAdFFl6yGeeGfN32568QWipExqKvlpaaWJ1ew3WwPOiITe6GEzg9pX3VUPP_HMO01OvGdSzW2KKnyG21KwNhTQZy0JcMXR2PUDy5KQ',
    name: 'Hương Giang',
    role: 'Học viên khóa Nâng cao',
    rating: 5,
    comment: '"Lộ trình học rõ ràng, hệ thống bài tập đa dạng. Đặc biệt thích phần luyện phát âm với công nghệ AI, rất hiệu quả!"',
    time: '1 tháng trước'
  }
]

export default function Testimonials() {
  const stats = [
    { value: '10,000+', label: 'Học viên đã tham gia' },
    { value: '98%', label: 'Hài lòng với khóa học' },
    { value: '4.9/5', label: 'Đánh giá trung bình' },
    { value: '50+', label: 'Giảng viên kinh nghiệm' }
  ]

  return (
    <section id="testimonials" className="bg-white dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-4">
            Học viên nói gì về chúng tôi
          </h3>
          <p className="text-lg text-text-sub dark:text-gray-400">
            Hàng nghìn học viên đã thành công với phương pháp học của chúng tôi
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-background-light dark:bg-gray-800 rounded-2xl p-8 shadow-lg testimonial-card"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-text-main dark:text-white">{testimonial.name}</h4>
                  <p className="text-text-sub dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i}
                    className={`material-symbols-outlined ${i < Math.floor(testimonial.rating) ? 'fill-current' : ''}`}
                  >
                    {i < testimonial.rating ? 'star' : testimonial.rating % 1 !== 0 && i === Math.floor(testimonial.rating) ? 'star_half' : 'star'}
                  </span>
                ))}
              </div>
              <p className="text-text-main dark:text-white italic mb-6">
                {testimonial.comment}
              </p>
              <div className="flex items-center gap-2 text-sm text-text-sub dark:text-gray-400">
                <span className="material-symbols-outlined text-base">calendar_month</span>
                {testimonial.time}
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-text-sub dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}