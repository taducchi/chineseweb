'use client';

import { useState, useEffect } from 'react';

export default function DragonBoatFestivalVietnamese() {
  // State management
  const [showPinyin, setShowPinyin] = useState(true);
  const [textSize, setTextSize] = useState('normal');
  const [isRead, setIsRead] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showVocabPopup, setShowVocabPopup] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Dữ liệu bài viết bằng tiếng Việt
  const articleData = {
    title: "Lịch Sử Tết Đoan Ngọ (Lễ Hội Thuyền Rồng)",
    subtitle: "Khám phá truyền thuyết Khuất Nguyên và nguồn gốc của một truyền thống sôi động",
    readTime: "8 phút đọc",
    views: "1.2k lượt xem",
    updatedDate: "Cập nhật 12 tháng 6, 2024",
    tags: ["HSK 3", "Văn Hóa", "Lịch Sử", "Lễ Hội"],
    
    paragraphs: [
      {
        id: 1,
        chinese: "端午节是中国最重要的传统节日之一。它在每年的农历五月初五庆祝。",
        vietnamese: "Tết Đoan Ngọ là một trong những lễ hội truyền thống quan trọng nhất của Trung Quốc. Nó được tổ chức vào ngày mùng 5 tháng 5 âm lịch hàng năm.",
        vocabWords: [
          { word: "端午节", pinyin: "Duānwǔ jié", vietnamese: "Tết Đoan Ngọ (Lễ hội thuyền rồng)", meaning: "Dragon Boat Festival" },
          { word: "中国", pinyin: "Zhōngguó", vietnamese: "Trung Quốc", meaning: "China" },
          { word: "传统", pinyin: "chuántǒng", vietnamese: "truyền thống", meaning: "tradition" }
        ]
      },
      {
        id: 2,
        chinese: "这个节日的起源与一位名叫屈原的爱国诗人有关。人们为了纪念他，会吃粽子和赛龙舟。",
        vietnamese: "Nguồn gốc của lễ hội này liên quan đến một nhà thơ yêu nước tên là Khuất Nguyên. Để tưởng nhớ ông, người dân ăn bánh ú và đua thuyền rồng.",
        vocabWords: [
          { word: "起源", pinyin: "qǐyuán", vietnamese: "nguồn gốc", meaning: "origin" },
          { word: "屈原", pinyin: "Qū Yuán", vietnamese: "Khuất Nguyên", meaning: "Qu Yuan (poet)" },
          { word: "粽子", pinyin: "zòngzi", vietnamese: "bánh ú", meaning: "sticky rice dumpling" }
        ]
      },
      {
        id: 3,
        chinese: "龙舟比赛不仅是一项体育活动，更是一种精神的象征，代表着团结和力量。",
        vietnamese: "Cuộc đua thuyền rồng không chỉ là một hoạt động thể thao, mà còn là biểu tượng của tinh thần, đại diện cho sự đoàn kết và sức mạnh.",
        vocabWords: [
          { word: "体育", pinyin: "tǐyù", vietnamese: "thể dục/thể thao", meaning: "sports" },
          { word: "精神", pinyin: "jīngshén", vietnamese: "tinh thần", meaning: "spirit" },
          { word: "团结", pinyin: "tuánjié", vietnamese: "đoàn kết", meaning: "unity" }
        ]
      }
    ],
    
    vocabulary: [
      { 
        id: '1', 
        chinese: "传统", 
        pinyin: "chuán tǒng", 
        vietnamese: "truyền thống", 
        english: "Tradition",
        example: "春节是中国最重要的传统节日。",
        exampleVi: "Tết Nguyên Đán là lễ hội truyền thống quan trọng nhất của Trung Quốc."
      },
      { 
        id: '2', 
        chinese: "起源", 
        pinyin: "qǐ yuán", 
        vietnamese: "nguồn gốc", 
        english: "Origin",
        example: "这个节日的起源非常古老。",
        exampleVi: "Nguồn gốc của lễ hội này rất cổ xưa."
      },
      { 
        id: '3', 
        chinese: "纪念", 
        pinyin: "jì niàn", 
        vietnamese: "tưởng nhớ/kỷ niệm", 
        english: "Commemorate",
        example: "人们纪念伟大的诗人屈原。",
        exampleVi: "Mọi người tưởng nhớ nhà thơ vĩ đại Khuất Nguyên."
      },
      { 
        id: '4', 
        chinese: "团结", 
        pinyin: "tuán jié", 
        vietnamese: "đoàn kết", 
        english: "Unity",
        example: "团结就是力量。",
        exampleVi: "Đoàn kết là sức mạnh."
      },
      { 
        id: '5', 
        chinese: "节日", 
        pinyin: "jié rì", 
        vietnamese: "ngày lễ/lễ hội", 
        english: "Festival",
        example: "中秋节是重要的传统节日。",
        exampleVi: "Tết Trung Thu là ngày lễ truyền thống quan trọng."
      }
    ],
    
    relatedArticles: [
      {
        id: '1',
        title: "Cách làm Bánh Ú truyền thống",
        category: "Ẩm Thực",
        level: "HSK 4",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-_BDA_2ec0U2xKSh6rbSKPdDTw3Oz5JXLUE07hbphUKCjFPoCRQpnHTQyqc00Rkq5GtThGoHF_coDYG4VfbR3yt8VuJSxG-euaSdCk8YqE98CCn0_4VTIlRoWI1tQxTMkN5z_yBqx2_ZrC-PAZAMegJ0VvT2Vv043jORqzfbhqb3QJ8IfJNA8VNK13nB_IwVm8TQlz0lxajVnHbyn-TVQcRpSovYmsQvLDMIFInK5VuBugyzyRvjbi6BNK6ewrx3lRj6n-iRN_sfg",
        href: "#"
      },
      {
        id: '2',
        title: "Những Kiêng Kỵ trong Tết Nguyên Đán",
        category: "Văn Hóa",
        level: "HSK 3",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV_FDP8YKnyk2ggUpc1BD8sHQFSwSJqPGhA9WfMg3WNwMXrzhN819Xgq6g33g0uc7IELVvnxrcJcJmrZGM7uQmHLNoJ2SIICNUXmfOQvqjoJz7A0yAL63VSzahrCD4CsItXWjiAGRrtcFxuJM8ynrsuTsazfFUyq6ZU_nX-pJI8k1WYDXxb1nC6CyGib0JBqhW9teU_bbmj9i6gBAAE_zN3Hi0yR_rdwKZzplKXed4J8SoVW7hYqHOZDfodTqEHLN9BiqXbmbv_a0S",
        href: "#"
      }
    ]
  };

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Event handlers
  const handleTogglePinyin = () => {
    setShowPinyin(!showPinyin);
  };

  const handleChangeTextSize = () => {
    const sizes = ['normal', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(textSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setTextSize(sizes[nextIndex]);
  };

  const handlePlayAudio = () => {
    // Text-to-speech cho tiếng Việt
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = articleData.paragraphs.map(p => p.vietnamese).join(' ');
      speech.lang = 'vi-VN';
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    } else {
      alert('Tính năng đọc văn bản không được hỗ trợ trong trình duyệt của bạn');
    }
  };

  const handleSaveArticle = () => {
    setIsSaved(!isSaved);
    // Lưu vào localStorage
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    if (!isSaved) {
      savedArticles.push(articleData.title);
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    } else {
      const filtered = savedArticles.filter(title => title !== articleData.title);
      localStorage.setItem('savedArticles', JSON.stringify(filtered));
    }
  };

  const handleMarkAsRead = () => {
    setIsRead(!isRead);
  };

  const handleExportFlashcards = () => {
    // Tạo dữ liệu CSV
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Tiếng Trung,Pinyin,Tiếng Việt,Nghĩa tiếng Anh"]
      .concat(articleData.vocabulary.map(v => `"${v.chinese}","${v.pinyin}","${v.vietnamese}","${v.english}"`))
      .join("\n");
    
    // Tải file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tu_vung_tet_doan_ngo.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVocabClick = (vocab) => {
    setSelectedVocab(vocab);
    setShowVocabPopup(true);
  };

  const closeVocabPopup = () => {
    setShowVocabPopup(false);
    setSelectedVocab(null);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const getTextSizeClass = () => {
    switch(textSize) {
      case 'normal': return 'text-2xl md:text-3xl';
      case 'large': return 'text-3xl md:text-4xl';
      case 'xlarge': return 'text-4xl md:text-5xl';
      default: return 'text-2xl md:text-3xl';
    }
  };

  const renderChineseText = (paragraph) => {
    let text = paragraph.chinese;
    
    // Thay thế từ vựng với các span có thể click
    paragraph.vocabWords.forEach(vocab => {
      const word = vocab.word;
      const pinyin = showPinyin ? vocab.pinyin : '';
      
      const replacement = showPinyin 
        ? `<span class="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors" onclick="event.stopPropagation(); window.vocabClickHandler(${JSON.stringify(vocab)})"><ruby>${word}<rt>${pinyin}</rt></ruby></span>`
        : `<span class="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors" onclick="event.stopPropagation(); window.vocabClickHandler(${JSON.stringify(vocab)})">${word}</span>`;
      
      text = text.replace(word, replacement);
    });
    
    return { __html: text };
  };

  // Thiết lập handler toàn cục cho click từ vựng
  useEffect(() => {
    window.vocabClickHandler = (vocab) => {
      handleVocabClick(vocab);
    };
    
    const handleVocabWordClick = (e) => {
      if (e.target.closest('[onclick*="vocabClickHandler"]')) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('click', handleVocabWordClick);
    return () => {
      document.removeEventListener('click', handleVocabWordClick);
      delete window.vocabClickHandler;
    };
  }, []);

  // Thêm click vào từ vựng trong danh sách
  const handleVocabItemClick = (e, vocab) => {
    e.preventDefault();
    handleVocabClick(vocab);
  };

  return (
    <>
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-12 relative">
        {/* Article Column */}
        <div className="flex-1 max-w-[800px] mx-auto w-full">
          {/* Article Header */}
          <div className="flex flex-col gap-6 mb-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {articleData.tags.map((tag, index) => (
                <span 
                  key={index}
                  className={`${tag === 'HSK 3' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  } px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider`}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-gray-900 dark:text-white mb-3">
                {articleData.title}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                {articleData.subtitle}
              </p>
            </div>
            
            {/* Meta Info */}
            <div className="flex flex-col lg:flex-row items-center gap-6 text-sm text-gray-500 dark:text-gray-400 border-y border-gray-200 dark:border-gray-700 py-3">
              <div className="flex items-center gap-2">
                <span className="material-icons text-lg">schedule</span>
                <span>{articleData.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-lg">visibility</span>
                <span>{articleData.views}</span>
              </div>
              <div className="flex items-center gap-2 lg:ml-auto">
                <span className="material-icons text-lg">calendar_today</span>
                <span>{articleData.updatedDate}</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="w-full aspect-video rounded-xl overflow-hidden mb-10 shadow-lg relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10"></div>
            <div 
              className="w-full h-full bg-center bg-cover bg-no-repeat transform group-hover:scale-105 transition-transform duration-700 ease-out"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBL8ZA6Y8M_N0c-wk4kP9whLTdhNl5xi5o2y8FhChfdDo4gxYDzy1NFA4bB_PWkCAiHRXf7MlpIs-VYrylyPl8blCnVbzyB6fole2wTvpM82yhTIV1T5RIpbFrR-eEOt88-66l7qXn-TRcR5LkeHsxSv2N39nBgyRNnyMRjCo2YH64O8B-aHQP9b8rl7znULr2z_opI5L0FAU9VGwykWbQwdgfZpGYcL6B2ggEiwK3bpXoGXLN5B3HkDyIFIoJURWhcrnfY7tyaI4XV")`
              }}
              alt="Hình minh họa thuyền rồng nhiều màu sắc đua trên sông với núi non phía sau"
            />
            <div className="absolute bottom-4 right-4 z-20 text-white/80 text-xs font-medium bg-black/30 backdrop-blur-md px-2 py-1 rounded">
              Ảnh: Đua thuyền truyền thống
            </div>
          </div>
          
          {/* Sticky Toolbar */}
          <div className=" top-20 z-30 mb-8 flex justify-center">
            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl rounded-full px-4 sm:px-6 py-2 flex items-center gap-4 sm:gap-6">
              <button 
                onClick={handleTogglePinyin}
                className="flex flex-col items-center gap-1 group"
                title="Bật/Tắt Pinyin"
              >
                <span className={`material-icons ${showPinyin ? 'text-blue-600' : 'text-gray-500 dark:text-gray-300'} group-hover:text-blue-600 transition-colors`}>
                  translate
                </span>
                <span className={`text-[10px] font-bold ${showPinyin ? 'text-blue-600' : 'text-gray-400 dark:text-gray-400'} group-hover:text-blue-600`}>
                  PINYIN
                </span>
              </button>
              
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
              
              <button 
                onClick={handleChangeTextSize}
                className="flex flex-col items-center gap-1 group"
                title="Cỡ chữ"
              >
                <span className="material-icons text-gray-500 dark:text-gray-300 group-hover:text-blue-600 transition-colors">
                  text_fields
                </span>
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-400 group-hover:text-blue-600">
                  {textSize === 'normal' ? 'NHỎ' : textSize === 'large' ? 'VỪA' : 'LỚN'}
                </span>
              </button>
              
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
              
              <button 
                onClick={handlePlayAudio}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-105 transition-all active:scale-95"
                title="Nghe phát âm"
              >
                <span className="material-icons">play_arrow</span>
              </button>
              
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
              
              <button 
                onClick={handleSaveArticle}
                className="flex flex-col items-center gap-1 group"
                title="Lưu bài viết"
              >
                <span className={`material-icons ${isSaved ? 'text-blue-600' : 'text-gray-500 dark:text-gray-300'} group-hover:text-blue-600 transition-colors`}>
                  {isSaved ? 'bookmark' : 'bookmark_add'}
                </span>
                <span className={`text-[10px] font-bold ${isSaved ? 'text-blue-600' : 'text-gray-400 dark:text-gray-400'} group-hover:text-blue-600`}>
                  {isSaved ? 'ĐÃ LƯU' : 'LƯU'}
                </span>
              </button>
              
              {/* Mobile sidebar toggle */}
              {isMobile && (
                <>
                  <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
                  <button 
                    onClick={toggleSidebar}
                    className="flex flex-col items-center gap-1 group"
                    title="Từ vựng"
                  >
                    <span className="material-icons text-gray-500 dark:text-gray-300 group-hover:text-blue-600">
                      menu_book
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-400">
                      TỪ VỰNG
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Article Body */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {articleData.paragraphs.map((paragraph) => (
              <div key={paragraph.id} className="mb-10">
                <p 
                  className={`chinese-text ${getTextSizeClass()} text-gray-800 dark:text-gray-100 font-light mb-4 leading-relaxed`}
                  dangerouslySetInnerHTML={renderChineseText(paragraph)}
                />
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed border-l-2 border-blue-500/30 pl-4 mt-4">
                  <strong className="text-blue-600 dark:text-blue-400">[Tiếng Việt]:</strong> {paragraph.vietnamese}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm leading-relaxed border-l-2 border-green-500/30 pl-4 mt-2">
                  <strong className="text-green-600 dark:text-green-400">[English]:</strong> {paragraph.english}
                </p>
              </div>
            ))}
            
            {/* Grammar Point */}
            <div className="my-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-icons text-blue-600">school</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Điểm Ngữ Pháp: 为了 (Wèile)</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Có nghĩa là "để", "nhằm mục đích", "vì".
              </p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg text-gray-500 dark:text-gray-400 text-sm">
                Ví dụ: <span className="text-gray-800 dark:text-gray-200 font-medium cursor-pointer hover:text-blue-600" onClick={() => handleVocabClick({word: "为了", pinyin: "wèile", vietnamese: "để, nhằm mục đích", meaning: "in order to"})}>为了</span> 身体健康，我每天跑步。<br/>
                (Để có sức khỏe tốt, tôi chạy bộ mỗi ngày.)
              </div>
            </div>
          </article>
          
          {/* Bottom Action Button */}
          <div className="flex justify-center mt-12 mb-8">
            <button 
              onClick={handleMarkAsRead}
              className={`${isRead ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-105`}
            >
              <span className="material-icons">check_circle</span>
              {isRead ? 'Đã Đọc' : 'Đánh Dấu Đã Đọc'}
            </button>
          </div>
        </div>
        
        {/* Sidebar - Hidden on mobile by default */}
        <aside className={`${isMobile ? (showSidebar ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4 overflow-y-auto' : 'hidden') : 'flex'} lg:flex flex-col w-full lg:w-[300px] shrink-0 gap-6`}>
          {/* Close button for mobile sidebar */}
          {isMobile && showSidebar && (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Từ Vựng Bài Đọc</h2>
              <button 
                onClick={toggleSidebar}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
          )}
          
          {/* Vocabulary Widget */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">Từ Vựng Quan Trọng</h3>
              <span className="text-xs bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">
                {articleData.vocabulary.length} từ
              </span>
            </div>
            
            <div className="flex flex-col gap-3">
              {articleData.vocabulary.map((word) => (
                <div 
                  key={word.id}
                  onClick={(e) => handleVocabItemClick(e, word)}
                  className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">{word.chinese}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{word.pinyin}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{word.vietnamese}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{word.english}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleExportFlashcards}
              className="w-full mt-4 py-2 text-sm font-medium text-blue-600 border border-blue-600/30 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-icons text-sm">download</span>
              Xuất Thẻ Học
            </button>
          </div>
          
          {/* Related Articles */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mt-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Đọc Tiếp</h3>
            <div className="flex flex-col gap-4">
              {articleData.relatedArticles.map((article) => (
                <a 
                  key={article.id} 
                  href={article.href}
                  className="flex gap-3 group"
                >
                  <div 
                    className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url("${article.imageUrl}")` }}
                    alt={article.title}
                  />
                  <div className="flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {article.level} • {article.category}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </main>
      
      {/* Vocabulary Popup Modal */}
      {showVocabPopup && selectedVocab && (
        <div 
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
          onClick={closeVocabPopup}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Chi Tiết Từ Vựng</h3>
              <button 
                onClick={closeVocabPopup}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Word Details */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{selectedVocab.chinese || selectedVocab.word}</p>
                  <p className="text-xl text-gray-600 dark:text-gray-400">{selectedVocab.pinyin}</p>
                </div>
                <div className="text-right">
                  <button 
                    onClick={() => {
                      const speech = new SpeechSynthesisUtterance(selectedVocab.chinese || selectedVocab.word);
                      speech.lang = 'zh-CN';
                      speech.rate = 0.8;
                      window.speechSynthesis.speak(speech);
                    }}
                    className="mb-3 text-blue-600 hover:text-blue-700 flex items-center gap-1 justify-end"
                  >
                    <span className="material-icons text-sm">volume_up</span>
                    Nghe phát âm
                  </button>
                </div>
              </div>
              
              {/* Meanings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">Tiếng Việt</h4>
                  <p className="text-gray-800 dark:text-gray-200">{selectedVocab.vietnamese}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <h4 className="font-medium text-green-700 dark:text-green-400 mb-1">English</h4>
                  <p className="text-gray-800 dark:text-gray-200">{selectedVocab.english || selectedVocab.meaning}</p>
                </div>
              </div>
              
              {/* Example Sentences */}
              {(selectedVocab.example || selectedVocab.exampleVi) && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ví dụ:</h4>
                  <div className="space-y-2">
                    {selectedVocab.example && (
                      <p className="text-gray-800 dark:text-gray-200 p-3 bg-gray-50 dark:bg-gray-900 rounded">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{selectedVocab.chinese || selectedVocab.word}</span> {selectedVocab.example.replace(selectedVocab.chinese || selectedVocab.word, '')}
                      </p>
                    )}
                    {selectedVocab.exampleVi && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm p-3 bg-gray-100 dark:bg-gray-800 rounded">
                        {selectedVocab.exampleVi}
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="flex gap-2 pt-4">
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                  <span className="material-icons text-sm">add</span>
                  Thêm vào Flashcards
                </button>
                <button className="flex-1 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1">
                  <span className="material-icons text-sm">quiz</span>
                  Luyện Tập
                </button>
              </div>
              
              {/* Close button for mobile */}
              <button 
                onClick={closeVocabPopup}
                className="w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      
     
    </>
  );
}