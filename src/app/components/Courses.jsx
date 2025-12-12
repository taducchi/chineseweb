import Image from 'next/image'
import Link from 'next/link'

const courses = [
  {
    id: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmbJXTYUMJIpaMfgN7bEtWUj3paeqtT3IWo4VwJCTVwuD_SXpDQrFxCl6NjoRcxTJtS4cZNGViu_0diOM1vVmx1VGfulbjrFbHH-2ammzKRHAC4zyDk_UXgxvP28Q3pez3pvyynB1dEO7BchRLhoCjEzGquRgC1fD0RR1BXpBzfdBQdbxfwfqfhKH5q3k3rlT9uWBpsSIzZp2QSESxWAC9NKHFgVAvdCUpWL8ol-14JTgny5gzDtofBcDuw0vIQA7iJUMhzuK4fZY',
    badge: 'Phổ biến',
    badgeColor: 'bg-primary',
    title: 'Tiếng Trung cho người mới bắt đầu',
    description: 'Khóa học nền tảng toàn diện 4 kỹ năng Nghe - Nói - Đọc - Viết.',
    duration: '3 tháng',
    slug: 'luyen-thi-hsk-3',
    students: '1.2k học viên',
    rating: 4.9
  },
  {
    id: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2U3_Rbugs2x9MoUOh4CvP6oHnsP7N-Og1ZNoOpn0DvyYxpZj-XtANMPywx4w6oAm_duwJxxnmJNqCsLDNT2QFdo5agoLVQC505TDoxegxwGmzOkDzxY4pewM8-3AL7DRPvnxbxnmlnFtJZ9b8UBTSLNCo9Ms0tSgG2GXT1gxYJh7YWaC2O2AuKEzyGzKFKMiivuUx02t2DZvdxtlDmtOkKBFXI2MLeH04dJZS5D21qu3XreoPClnK6eJfLsyvenkBCDMs7wJtBT0',
    badge: 'Cơ bản',
    badgeColor: 'bg-green-500',
    slug: 'luyen-thi-hsk-3',
    title: 'Nhập môn tiếng Trung',
    description: 'Làm quen với bảng chữ cái Pinyin và các bộ thủ cơ bản.',
    duration: '1 tháng',
    students: '850 học viên',
    rating: 4.8
  },
  {
    id: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDslZs4BxXtffiZC3tfoUxOFsPZEYTYaE6Ltpe3OMSGfNSKGq3j3CsBs8y27U-UIiS9ZkuVW2JZkRWsCDq7tceK-P6D6_bBWkcKsZQpjpCeT2h-JvVWvSxhCQtS0XFNB1KVrzHE5MycpCwDi0F6smqSiiSum7qyZ5ov7HRwom5YsrGJ2kuz-vXIRhlXLUYJqVtBTNnh_bZAvEZK5HcaLWp9FykzRi7zNXKra00o26rcJTPKRpdOkkZYgSPG2NMiVdwslNugDdIjAK8',
    badge: 'Giao tiếp',
    slug: 'luyen-thi-hsk-3',
    badgeColor: 'bg-orange-500',
    title: 'Tiếng Trung giao tiếp cấp tốc',
    description: 'Tự tin nói chuyện với người bản xứ trong các tình huống hàng ngày.',
    duration: '2 tháng',
    students: '500+ học viên',
    rating: 4.7,

  }
]

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