export async function generateMetadata({ params }) {
  // Trong thực tế, bạn sẽ fetch dữ liệu khóa học từ API/database
  const course = {
    title: 'Luyện thi HSK 3: Từ vựng & Ngữ pháp toàn diện',
    description: 'Nắm vững 600 từ vựng và các cấu trúc ngữ pháp trọng điểm.',
  }
  
  return {
    title: `${course.title} - Chinese Learning`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      type: 'website',
    },
  }
}

export default function CourseDetailLayout({ children }) {
  return <>{children}</>
}