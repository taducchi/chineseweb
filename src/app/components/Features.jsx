import Link from "next/link";

export default function Features() {
 const features = [
    {
        icon: 'auto_awesome',
        title: 'Lộ trình học được thiết kế riêng',
        description: 'Mỗi học viên có một lộ trình học khác nhau, phù hợp với mục tiêu và thời gian học của bạn.'
    },
    {
        icon: 'ondemand_video',
        title: 'Bài giảng video chất lượng cao',
        description: 'Hệ thống video bài giảng sinh động, dễ hiểu, kèm infographic và bài tập thực hành đa dạng.'
    },
    {
        icon: 'record_voice_over',
        title: 'Rèn luyện phản xạ giao tiếp',
        description: 'Thực hành các tình huống giao tiếp thực tế, cải thiện phát âm và phản xạ tự nhiên.'
    },
    {
        icon: 'groups',
        title: 'Lớp học tương tác trực tiếp',
        description: 'Học tập trong môi trường lớp học năng động, tương tác trực tiếp với giáo viên và bạn học.'
    }
];
  return (
   <section className="relative py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-4 border border-blue-200/30 dark:border-blue-800/30">
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            Tính năng nổi bật
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Mô hình học tiếng Trung{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              3 trong 1
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Kết hợp 3 yếu tố then chốt giúp bạn học tiếng Trung hiệu quả và bền vững.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colors = [
              { icon: 'text-blue-500', border: 'border-blue-200 dark:border-blue-800', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: 'text-green-500', border: 'border-green-200 dark:border-green-800', bg: 'bg-green-50 dark:bg-green-900/20' },
              { icon: 'text-purple-500', border: 'border-purple-200 dark:border-purple-800', bg: 'bg-purple-50 dark:bg-purple-900/20' },
              { icon: 'text-orange-500', border: 'border-orange-200 dark:border-orange-800', bg: 'bg-orange-50 dark:bg-orange-900/20' }
            ];
            const color = colors[index % 4];

            return (
              <div 
                key={index}
                className={`
                  group p-6 rounded-2xl border ${color.border}
                  bg-white dark:bg-gray-800/50
                  hover:shadow-xl transition-all duration-300
                  hover:-translate-y-1
                `}
              >
                <div className={`w-14 h-14 rounded-2xl ${color.bg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}>
                  <span className={`material-symbols-outlined text-2xl ${color.icon}`}>
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/account/login"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Bắt đầu học ngay</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}