import Image from 'next/image'
import Link from 'next/link'

const courses = [
  {
    id: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmbJXTYUMJIpaMfgN7bEtWUj3paeqtT3IWo4VwJCTVwuD_SXpDQrFxCl6NjoRcxTJtS4cZNGViu_0diOM1vVmx1VGfulbjrFbHH-2ammzKRHAC4zyDk_UXgxvP28Q3pez3pvyynB1dEO7BchRLhoCjEzGquRgC1fD0RR1BXpBzfdBQdbxfwfqfhKH5q3k3rlT9uWBpsSIzZp2QSESxWAC9NKHFgVAvdCUpWL8ol-14JTgny5gzDtofBcDuw0vIQA7iJUMhzuK4fZY',
    badge: 'Cơ bản',
    badgeColor: 'bg-green-500',
    title: 'HSK 1 - Tiếng Trung Sơ Cấp',
    description: 'Khóa học nền tảng cho người mới bắt đầu. Giới thiệu bảng chữ cái Pinyin, thanh điệu và 150 từ vựng cơ bản theo giáo trình chuẩn HSK 1.',
    duration: '2 tháng',
    level: 'Sơ cấp',
    students: '2.5k học viên',
    rating: 4.9,
    lessons: 30,
    vocabulary: 150,
    price: '1,200,000đ',
    hsk_level: 1
  },
  {
    id: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2U3_Rbugs2x9MoUOh4CvP6oHnsP7N-Og1ZNoOpn0DvyYxpZj-XtANMPywx4w6oAm_duwJxxnmJNqCsLDNT2QFdo5agoLVQC505TDoxegxwGmzOkDzxY4pewM8-3AL7DRPvnxbxnmlnFtJZ9b8UBTSLNCo9Ms0tSgG2GXT1gxYJh7YWaC2O2AuKEzyGzKFKMiivuUx02t2DZvdxtlDmtOkKBFXI2MLeH04dJZS5D21qu3XreoPClnK6eJfLsyvenkBCDMs7wJtBT0',
    badge: 'Cơ bản',
    badgeColor: 'bg-green-500',
    title: 'HSK 2 - Tiếng Trung Sơ Trung Cấp',
    description: 'Tiếp nối HSK 1, khóa học nâng cao với 300 từ vựng, các mẫu câu giao tiếp cơ bản và ngữ pháp phức tạp hơn. Giúp bạn tự tin trong các tình huống hàng ngày.',
    duration: '2.5 tháng',
    level: 'Sơ trung cấp',
    students: '1.8k học viên',
    rating: 4.8,
    lessons: 35,
    vocabulary: 300,
    price: '1,500,000đ',
    hsk_level: 2
  },
  {
    id: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDslZs4BxXtffiZC3tfoUxOFsPZEYTYaE6Ltpe3OMSGfNSKGq3j3CsBs8y27U-UIiS9ZkuVW2JZkRWsCDq7tceK-P6D6_bBWkcKsZQpjpCeT2h-JvVWvSxhCQtS0XFNB1KVrzHE5MycpCwDi0F6smqSiiSum7qyZ5ov7HRwom5YsrGJ2kuz-vXIRhlXLUYJqVtBTNnh_bZAvEZK5HcaLWp9FykzRi7zNXKra00o26rcJTPKRpdOkkZYgSPG2NMiVdwslNugDdIjAK8',
    badge: 'Trung cấp',
    badgeColor: 'bg-orange-500',
    title: 'HSK 3 - Tiếng Trung Trung Cấp',
    description: 'Khóa học quan trọng với 600 từ vựng, các cấu trúc ngữ pháp phức tạp. Luyện tập các kỹ năng đọc hiểu và viết đoạn văn ngắn. Phù hợp cho người đi làm và du học.',
    duration: '3 tháng',
    level: 'Trung cấp',
    students: '1.2k học viên',
    rating: 4.7,
    lessons: 40,
    vocabulary: 600,
    price: '1,800,000đ',
    hsk_level: 3
  },
  {
    id: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9gYz7Xxw5Vt4ZkU3yFp8LgH7nM4kQ9rS2tB5vJ6wX8yA0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV0wX1yZ2',
    badge: 'Trung cấp',
    badgeColor: 'bg-orange-500',
    title: 'HSK 4 - Tiếng Trung Trung Cao Cấp',
    description: 'Nâng cao vốn từ vựng lên 1200 từ. Khóa học tập trung vào các bài đọc dài, viết luận và các tình huống giao tiếp phức tạp trong môi trường học thuật và công sở.',
    duration: '3.5 tháng',
    level: 'Trung cao cấp',
    students: '980 học viên',
    rating: 4.6,
    lessons: 45,
    vocabulary: 1200,
    price: '2,000,000đ',
    hsk_level: 4
  },
  {
    id: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8hY1zWw6uV5tZkU4yFp9LgH8nM5kQrS3tC6vJ7wX9yA1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3',
    badge: 'Cao cấp',
    badgeColor: 'bg-red-500',
    title: 'HSK 5 - Tiếng Trung Cao Cấp',
    description: 'Khóa học dành cho người có nhu cầu du học, làm việc tại Trung Quốc. 2500 từ vựng, đọc hiểu báo chí, tài liệu chuyên ngành và viết báo cáo công việc.',
    duration: '4 tháng',
    level: 'Cao cấp',
    students: '650 học viên',
    rating: 4.5,
    lessons: 50,
    vocabulary: 2500,
    price: '2,500,000đ',
    hsk_level: 5
  },
  {
    id: 6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuE9iZ2xXv7wW6uV5tZkU5yGp0LhI9nM6kRsT4dD8wK9zB2cE3fG4hI5jK6lM7nO8pQ9rS0tU1vW2xY3zA4',
    badge: 'Cao cấp',
    badgeColor: 'bg-red-500',
    title: 'HSK 6 - Tiếng Trung Thành Thạo',
    description: 'Cấp độ cao nhất trong hệ thống HSK. 5000 từ vựng, khả năng đọc hiểu văn bản học thuật, văn học Trung Quốc và viết luận văn phức tạp. Chuẩn bị cho các kỳ thi và công việc đòi hỏi tiếng Trung chuyên sâu.',
    duration: '5 tháng',
    level: 'Thành thạo',
    students: '420 học viên',
    rating: 4.4,
    lessons: 60,
    vocabulary: 5000,
    price: '3,000,000đ',
    hsk_level: 6
  }
];

export default function Courses() {
  return (
    <section id="courses" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white">
              Khóa học nổi bật
            </h3>
            <p className="text-text-sub dark:text-gray-400 mt-2">
              Lộ trình học được thiết kế riêng cho người Việt
            </p>
          </div>
          <a href="#" className="text-primary hover:text-primary-dark text-lg font-semibold flex items-center gap-2">
            Xem tất cả
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group course-card"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-4 left-4 ${course.badgeColor} text-white px-3 py-1 rounded-lg text-sm font-bold`}>
                  {course.badge}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-text-main dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {course.title}
                </h4>
                <p className="text-text-sub dark:text-gray-400 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-sm text-text-sub dark:text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">group</span>
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base text-yellow-500 fill-current">star</span>
                    {course.rating}
                  </div>
                </div>
                <Link
                  href={`/courses/${course.slug}`}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-md shadow-blue-200 dark:shadow-none flex items-center justify-center"
                >
                  Chi tiết khoá học
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}