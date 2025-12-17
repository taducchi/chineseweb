// app/dashboard/library/page.jsx
'use client';

import { useState } from 'react';

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Reading articles data
  const articles = [
    {
      id: 1,
      title: 'Một ngày bình thường của sinh viên Bắc Kinh',
      description: 'Khám phá lịch trình học tập và sinh hoạt của sinh viên đại học tại Bắc Kinh. Bài đọc sử dụng từ vựng đơn giản về trường học và giao thông.',
      level: 'HSK 2',
      levelColor: 'bg-green-500',
      category: 'daily',
      categoryName: 'Đời sống',
      categoryIcon: 'local_cafe',
      categoryIconColor: 'text-primary',
      readTime: '5 phút',
      timeAgo: '2 ngày trước',
      author: 'Ms. Lin',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxB4ytGrDqH5AVw5p842WlI8YK2kpI5xyv6kYg0AO6FKW7wuTayNbuR9NUchAROGkqVzefP7pg1lgahWl-SUz_UEsEd4sBhB9IwCZNGyVkOZYS3LukeyCeCJL__ThpYUlumV-y8xPkWQqk6FwcTjXwH45bpWG3KlKzHWRYXkkaxwvnuMAVius2V5JRv6Te_YKlvf1m8M2H6t9ZBDhvFetUvUxJTf2FtinOltO14hqvG6Eq5o4clfTB1IC-BTVIEoN-RyhUYajshXM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARey2F_QLsbsv1kZf8PABMTYn-M7kXvDWwY9j8NInhMx34G_BRlJ7JlRUjXhfxcumT01m_TED5tOZqMeFlh00guYUzswzuKzogE2tJBGEJCa_Uuli3-XP_oyHFZWlE2wX-p1A-83wncwlj2neFdl4ibf40VWWucb2wjwyQnd7z5X-AIiLui5qwhqyLPGG3JhF6RPP5KMUCzd5mKdCBU5GJHCa-OvRpLZ68jN_EycCmsiYN-7s3tTdNnDiNWIiJd2Htj1lx03B5la4'
    },
    {
      id: 2,
      title: 'Ý nghĩa của bánh Trung Thu và câu chuyện Hằng Nga',
      description: 'Tìm hiểu về nguồn gốc tết Trung Thu và truyền thuyết Hằng Nga - Hậu Nghệ. Bài viết cung cấp từ vựng phong phú về lễ hội.',
      level: 'HSK 3',
      levelColor: 'bg-yellow-500',
      category: 'culture',
      categoryName: 'Văn hóa',
      categoryIcon: 'celebration',
      categoryIconColor: 'text-orange-500',
      readTime: '8 phút',
      timeAgo: '1 tuần trước',
      author: 'Admin',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQt7hjcBW-wWSZ9y4sJ3Lgzf3C5uhNgCUpEjO5vV9EvbxW_AFZnnym0SuTHQu7hNns-e6t94uxbEN271irRQx5b9EMRwHnjFq8ywJU8LjFzkXaU_jzfEpYN3fM_ozy99w0tL6J1374rMlqjafCaF_dL4vM7jpAwj63IjVNQgypAZuWK3gKkX402rufRUXnyh2QCLYrh1LztF0QlbGP5FWESVTFtpoIpYdgY06lTmYKiFSokOMvw-Jrm_Fw6zFEBmV0Thm4QYJPJxo',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuzlfm0ELSDixneh02RqRInjjIjMZlYTsU9RCu71vD2SKHxYWFaZKeWct3ZznXaCzoMBVJ2MEm9RyQAGcgVB6UhtJcBSZJFOHa9FL80dmh1-oYcOPQG413nbI1pgb_2lRhNK-RtLq5wjxqMFRyT2rBrn0aORF-7Ll4DmWdreCVghgSOejrIN9CK14H_pvNCXuoXzRyfeAoWhLcyJlAJKcsi5YVY-iU6yKmwq9qZZos5Rs0N_V5MrZbIG6VLTLY59k4a-udWMbHa34'
    },
    {
      id: 3,
      title: 'Chuẩn bị hành lý đi Thượng Hải',
      description: 'Những đồ vật cần thiết khi đi du lịch Trung Quốc. Mẫu câu hỏi đường và mua sắm cơ bản cho người mới bắt đầu.',
      level: 'HSK 1',
      levelColor: 'bg-blue-500',
      category: 'travel',
      categoryName: 'Du lịch',
      categoryIcon: 'flight',
      categoryIconColor: 'text-blue-500',
      readTime: '3 phút',
      timeAgo: '3 tuần trước',
      author: 'Ms. Lin',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxB4ytGrDqH5AVw5p842WlI8YK2kpI5xyv6kYg0AO6FKW7wuTayNbuR9NUchAROGkqVzefP7pg1lgahWl-SUz_UEsEd4sBhB9IwCZNGyVkOZYS3LukeyCeCJL__ThpYUlumV-y8xPkWQqk6FwcTjXwH45bpWG3KlKzHWRYXkkaxwvnuMAVius2V5JRv6Te_YKlvf1m8M2H6t9ZBDhvFetUvUxJTf2FtinOltO14hqvG6Eq5o4clfTB1IC-BTVIEoN-RyhUYajshXM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMJGRWuhoQJKh3TKN2C9zC6Mu2E3q-0Ma8Kt0792ecp3O8vmr1inrjxFcKT1qM4NC8DTgoqwUGAfUElu2RBo2lSlueSQ9u_n1nygQeeUS6QcPHWVdoLaKok3UVWfaBDqFPAsywznRC60B7v3kTVsCSSIC5DCQDFsZ4fSf41vlbzZ2TJUOId0kjCJaRUKYFko5S4tusuXCVEZlROXNgwfF1OhdMQ7PABcd0VDMBnmCclq0DOAfzUH4BUHtwxU2jLuNh1eVmSL5ZU90'
    },
    {
      id: 4,
      title: 'Văn hóa bàn tiệc trong kinh doanh tại Trung Quốc',
      description: 'Những quy tắc ngầm cần biết khi tham gia tiệc chiêu đãi đối tác. Cách mời rượu và sắp xếp chỗ ngồi hợp lý.',
      level: 'HSK 5',
      levelColor: 'bg-red-500',
      category: 'business',
      categoryName: 'Kinh doanh',
      categoryIcon: 'business_center',
      categoryIconColor: 'text-purple-500',
      readTime: '12 phút',
      timeAgo: '1 tháng trước',
      author: 'Admin',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQt7hjcBW-wWSZ9y4sJ3Lgzf3C5uhNgCUpEjO5vV9EvbxW_AFZnnym0SuTHQu7hNns-e6t94uxbEN271irRQx5b9EMRwHnjFq8ywJU8LjFzkXaU_jzfEpYN3fM_ozy99w0tL6J1374rMlqjafCaF_dL4vM7jpAwj63IjVNQgypAZuWK3gKkX402rufRUXnyh2QCLYrh1LztF0QlbGP5FWESVTFtpoIpYdgY06lTmYKiFSokOMvw-Jrm_Fw6zFEBmV0Thm4QYJPJxo',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKHj7sFsIi4d-eE39b_2wDdQ32x8-dfgYmOuwZO_Pl0RJY1BN1KXv5WCpOxPecMFUJa9Heikt2XGfqQWhA0mqBbaukQej0m3siS_YX5a5KxMEw80UabqttxY3GRy8lOebDLqK6d6uLlHpYxckD6vccOwfMto1GC6oIe7b944fk788UHRaukSscttklTxVicEt1ZTr0D4nR5pPkQNxk7n3JqZtNQKCas8v7DS3FnbUXewQUS3vi_PTOXIbmXyi1DX-lCNpcCRT6WXM'
    },
    {
      id: 5,
      title: 'Cách làm sủi cảo truyền thống ngày Tết',
      description: 'Hướng dẫn từng bước làm sủi cảo nhân thịt heo và bắp cải. Công thức gia truyền đơn giản dễ làm tại nhà.',
      level: 'HSK 3',
      levelColor: 'bg-yellow-500',
      category: 'daily',
      categoryName: 'Đời sống',
      categoryIcon: 'local_cafe',
      categoryIconColor: 'text-primary',
      readTime: '6 phút',
      timeAgo: '2 tháng trước',
      author: 'Ms. Lin',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxB4ytGrDqH5AVw5p842WlI8YK2kpI5xyv6kYg0AO6FKW7wuTayNbuR9NUchAROGkqVzefP7pg1lgahWl-SUz_UEsEd4sBhB9IwCZNGyVkOZYS3LukeyCeCJL__ThpYUlumV-y8xPkWQqk6FwcTjXwH45bpWG3KlKzHWRYXkkaxwvnuMAVius2V5JRv6Te_YKlvf1m8M2H6t9ZBDhvFetUvUxJTf2FtinOltO14hqvG6Eq5o4clfTB1IC-BTVIEoN-RyhUYajshXM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfjFMwnTi1sQhvNc0HMTJPzPw3mpx-duOS3LtBLcfYNMKw3vJSvIpC0EH-KExB44iQdeeR1I1-wsLye2NWAsJVRJJMKMmez9IKq_HJ_sRzBnHYeAHsFPmzP_B2nOMhOmT0IN4XcXepeiYiuTWpq1XJp3WfPI-i6VKSiY5VN6Iub27dIdeQM7_M0kFbUdOhpGeR9GazrhlyIVeGqKZOE9vPo9idPl7jUSEdc6Y4NS0JA5_GRkCdryxI7o5UM0aEDAnNluZGy4UE3rk'
    }
  ];

  // Popular tags
  const popularTags = [
    { id: 'newest', label: 'Mới nhất' },
    { id: 'popular', label: 'Đọc nhiều' },
    { id: 'culture', label: 'Văn hóa Trung Hoa' },
    { id: 'hsk', label: 'Luyện thi HSK' },
    { id: 'idioms', label: 'Thành ngữ' }
  ];

  // Filter articles based on selections
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === '' || 
      article.level.toLowerCase().includes(selectedLevel.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || article.category === selectedCategory;
    
    // For tags, we'll just use the first tag as example logic
    const matchesTag = selectedTag === 'newest' || 
      (selectedTag === 'culture' && article.category === 'culture') ||
      (selectedTag === 'hsk' && article.level.includes('HSK'));
    
    return matchesSearch && matchesLevel && matchesCategory && matchesTag;
  });

  // Event handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTagClick = (tagId) => {
    setSelectedTag(tagId);
  };

  const handleArticleClick = (articleId) => {
    console.log('Opening article:', articleId);
    // Navigate to article detail page
    // router.push(`/dashboard/library/${articleId}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleContributeClick = () => {
    console.log('Opening contribution form...');
    // Open contribution modal or navigate to contribution page
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 12) { // Assuming 12 total pages
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <main className="flex flex-1 flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
      
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 flex-shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-1 text-slate-500">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-primary">library_books</span>
            <h2 className="text-lg font-bold tracking-tight">Thư Viện Bài Đọc</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
            </div>
            <input
              type="text"
              className="block w-full rounded-full border-none bg-slate-100 dark:bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary placeholder:text-slate-400"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div 
            className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white dark:border-slate-800 shadow-sm cursor-pointer"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQt7hjcBW-wWSZ9y4sJ3Lgzf3C5uhNgCUpEjO5vV9EvbxW_AFZnnym0SuTHQu7hNns-e6t94uxbEN271irRQx5b9EMRwHnjFq8ywJU8LjFzkXaU_jzfEpYN3fM_ozy99w0tL6J1374rMlqjafCaF_dL4vM7jpAwj63IjVNQgypAZuWK3gKkX402rufRUXnyh2QCLYrh1LztF0QlbGP5FWESVTFtpoIpYdgY06lTmYKiFSokOMvw-Jrm_Fw6zFEBmV0Thm4QYJPJxo")'
            }}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
          
          {/* Header Section with Filters */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Khám phá bài đọc</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Nâng cao kỹ năng đọc hiểu qua các chủ đề đa dạng và thú vị.
                </p>
              </div>
              
              {/* Filter Dropdowns */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Level Filter */}
                <div className="relative w-full sm:w-48">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">equalizer</span>
                  <select
                    value={selectedLevel}
                    onChange={handleLevelChange}
                    className="w-full pl-10 pr-8 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:ring-primary focus:border-primary cursor-pointer appearance-none"
                  >
                    <option value="">Tất cả trình độ</option>
                    <option value="hsk1">HSK 1 - Sơ cấp</option>
                    <option value="hsk2">HSK 2 - Sơ cấp</option>
                    <option value="hsk3">HSK 3 - Trung cấp</option>
                    <option value="hsk4">HSK 4 - Trung cấp</option>
                    <option value="hsk5">HSK 5 - Cao cấp</option>
                    <option value="hsk6">HSK 6 - Cao cấp</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none material-symbols-outlined text-[20px]">expand_more</span>
                </div>
                
                {/* Category Filter */}
                <div className="relative w-full sm:w-48">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">category</span>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full pl-10 pr-8 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:ring-primary focus:border-primary cursor-pointer appearance-none"
                  >
                    <option value="">Tất cả chủ đề</option>
                    <option value="daily">Đời sống</option>
                    <option value="culture">Văn hóa</option>
                    <option value="business">Kinh doanh</option>
                    <option value="travel">Du lịch</option>
                    <option value="news">Tin tức</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </div>
            </div>
            
            {/* Popular Tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap mr-2">Phổ biến:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap border ${
                    selectedTag === tag.id
                      ? 'bg-primary/10 text-primary border-transparent'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            
            {/* Article Cards */}
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer flex flex-col h-full"
              >
                {/* Article Image */}
                <div 
                  className="h-48 w-full bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${article.image})` }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  
                  {/* Level Badge */}
                  <span className={`absolute top-3 left-3 px-2 py-1 ${article.levelColor} text-white text-[10px] font-bold uppercase tracking-wider rounded`}>
                    {article.level}
                  </span>
                  
                  {/* Read Time */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                {/* Article Content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Category and Date */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <span className={`material-symbols-outlined text-[16px] ${article.categoryIconColor}`}>
                        {article.categoryIcon}
                      </span>
                      {article.categoryName}
                    </span>
                    <span className="size-1 rounded-full bg-slate-300"></span>
                    <span>{article.timeAgo}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-2 flex-1">
                    {article.description}
                  </p>
                  
                  {/* Author and CTA */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div 
                        className="size-6 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${article.authorAvatar})` }}
                      />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {article.author}
                      </span>
                    </div>
                    <span className="text-xs text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Đọc ngay
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
            
            {/* Contribute Card */}
            <article
              onClick={handleContributeClick}
              className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer flex flex-col h-full bg-slate-50 dark:bg-slate-800/50"
            >
              <div className="h-full flex flex-col items-center justify-center p-8 text-center min-h-[200px]">
                <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">add</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Đóng góp bài viết
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Chia sẻ kiến thức của bạn với cộng đồng LearnChinese.
                </p>
              </div>
            </article>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-4">
            <nav aria-label="Pagination" className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              
              {/* Page Numbers */}
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <span className="px-2 text-slate-400">...</span>
              
              <button
                onClick={() => handlePageChange(12)}
                className={`px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium ${
                  currentPage === 12 ? 'bg-primary text-white border-primary' : ''
                }`}
              >
                12
              </button>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === 12}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}