'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function DocumentDetailPage({ params }) {
        const router = useRouter()
        const [activeTab, setActiveTab] = useState('introduction')

        // Mock data
        const document = {
                id: params.id,
                slug: '3000-common-words',
                title: 'Giáo Trình Hán Ngữ Quyển 1 - Phiên Bản Mới',
                subtitle: '汉语教程 (第一册) - 上',
                description: 'Đây là cuốn đầu tiên trong bộ Giáo trình Hán ngữ 6 quyển nổi tiếng. Tài liệu học tiếng Trung cơ bản dành cho người mới bắt đầu, xây dựng nền tảng vững chắc về phát âm, ngữ pháp và từ vựng giao tiếp hàng ngày.',
                rating: 4.9,
                downloads: '12.5k+',
                fileSize: '45 MB',
                format: 'PDF + MP3',
                author: 'Dương Ký Châu',
                level: 'HSK 1-2',
                type: 'Sách giáo khoa',
                coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4h4NUmFHCpjX1-EcBGxJ5tf5v71srhjrGJGhO1xt5sbA2zISU6n9ldWIX0yV2ZrJ73_4nsevVXZcOQDa9FQrBxLxEQ4PuarnsPxRkEvlBK3BBSqwdGvS4iQTFXSN1cQ48-rAWBNMjUfUhrRJoXkXBjh_wQMhNI3POBWFMmBEm8HWPuMAi38PnX0iXzSqx5CNDIPeYRtqyrACQf7hiclJuMN96b3dZBu33s0uZjYlSwsJWwxazGKEhryALucoWOFFra7nr4AODGCE',
        }

        const previewImages = [
                {
                        id: 1,
                        title: 'Mục lục',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4i3unSREfT4wYFhHabn_aCrZhDHBsh0ZRD4htaVwjXjZmyz6qbJVOEvwR79Gy1aYcYi-4wGMKaj6y86HiBd5y3zdn06aoBfLHAyx2DRaMuXR9CnbtPh7LupWhW96v09qM5NOx6Bwriy5SCdOgKosMbqLXZ0lsFTd3phoOocZCPkcFPEGGmlNuIEN2mTjja5L3sCeTy0GiipeJXameexNalUETGbVx_ALONyigf14QfxeVNzTn4hQHB8uJcfRnsR-z6DnzO1REeoE',
                },
                {
                        id: 2,
                        title: 'Bài 1: Xin chào',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB7YDgonc2zNhWEuSHuqCTJQkanSkhY2HxAZoLqYWwMimvSHeFis8VVmC2Esy0AADV0-gzwf-rDcLp_JuF7RlY42w4B4C1SiIx5U9D5geuudtkzWb-0I56pwvn5hBh7BmO36oFUxhssgJ7L8ETMhfCQSmHEhE1Nsc3XmNNnliFH1woTSKv2QUbM9TW-u5LKQEtiriqbmJ81KI2P6VZYW8RCz4TLBWKm4jucsDwJgEBaRVm0BOs2b5ketxnWITGDEcEVs5aHs3lb68',
                },
                {
                        id: 3,
                        title: 'Từ vựng mới',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnklOQ-HA9JaU_bQdOf2ETqtBOEKW3EYd58tb7ltxmyB3UpsGzr5wfexaK-hrxgEfNhGUKg0G8B9P2OPevm28PKOMg4HMpgG9lTKT9sgRsAQQs4jwvgXL2fAqnApkNHLEjD_TUi0QKLkgJlm6oRHweJKg6YA5DTN5inZH3_wpXoLhepY-vQm8iGXV3PbHVXw1E5bKzue0lPPRzl3EytH7kzYIERQwA3X3IkVnJ9xf5emeNdE1S7RcciYDJBcajchXAvjvzstOUtj4',
                },
        ]

        const relatedDocuments = [
                {
                        id: 'hanyu-2',
                        title: 'Giáo Trình Hán Ngữ Quyển 2 (Tập 1 - Quyển Hạ)',
                        subtitle: 'HSK 2 • Dương Ký Châu',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo5CsdNz_s1mC6XT_SMOiXWK-E_foMPBsx-zb_1X5QFND8So-h_1nDqWFDduWjYalMMfKD_6ZWDPxNfMmYed6v_5WKVp6G2XFIjkbsttk2CjmMiwFKutNk6hmVQWUhNAaMksBKlQ4BtukEllpl4OVeyEMYewn_gzoc-oPGGVojJqX1lBTpxPgoErDrgv2LRAsan2QE4Bkd6m2MIQh3X_J0a-Ix_bB4Y-pV3kUve526FxMFKQjQk_x6O7Uwsk0fvLinlg9wByGJNLs',
                },
                {
                        id: 'hsk3-tests',
                        title: 'Bộ Đề Luyện Thi HSK 3 Mới Nhất',
                        subtitle: 'HSK 3 • Luyện thi',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1g5H6H-dU26nCVsG8nSsNwuVC2eKVIYrxMurPYXjbHOlh7c1gXvnQS9r2ExyQ04rY-R_K7RJPbAEWw8aiwCvtDTXUPWoqD0ZsiJMzDmFREUoZbqJ1lZQKXSQv2MgZKvjPZOFuYuJIk9sD6zavcx0l8CveegJ0I6VYOijh2QHrqa4B3owc1sZ2e7YkHBoRQiJBYzwHksPHj9qBJ1UvDlwtXBINshe1kpnZVD-SpgSZcGPOTCz1jEIWSw6k09-_Y3vLh2EAWkhU8Q8',
                },
                {
                        id: 'writing-practice',
                        title: 'Vở Tập Viết Chữ Hán (Kẻ Ô Mễ)',
                        subtitle: 'Sơ cấp • Tập viết',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCva3NyyD3nLhHnCBVDYZz9zacMdjyuBlC4GyujiN77Z41AT_v4RbBwh8kk9A3qDMAYFXd4FwjfU9GBLhi5iYOzm063Z2oJN8H_uKacAwl0yizmSbrcAcZcuXjvkZUcxe7CuFVfsmTC7ZbYmW0An3Qjdnb_yzU7R5XyEUP74TJCCCSZy1sO1MPmqhxh0ztn7-HPd214fw_2I5undZ6mMLnupdT79GVOq3Ajacstzc4vRP792wSPn7mEtkFvzsSxqeiSmlw0JwdBn0M',
                },
        ]

        const tags = [
                '#tiengtrungcoban',
                '#hsk1',
                '#giaotrinhhanngu',
                '#luyennghe',
                '#pdfmienphi',
        ]

        const tabs = [
                { id: 'introduction', label: 'Giới thiệu' },
                { id: 'tableOfContents', label: 'Mục lục' },
                { id: 'reviews', label: 'Đánh giá (124)' },
        ]

        const handleDownload = () => {
                console.log('Downloading document:', document.id)
                // Implement download logic here
        }

        const handleSaveToLibrary = () => {
                console.log('Saving to library:', document.id)
                // Implement save logic here
        }

        const handleShare = () => {
                if (navigator.share) {
                        navigator.share({
                                title: document.title,
                                text: document.description,
                                url: window.location.href,
                        })
                } else {
                        navigator.clipboard.writeText(window.location.href)
                        alert('Đã sao chép liên kết vào clipboard!')
                }
        }

        const handlePreviewClick = (imageId) => {
                console.log('Opening preview for image:', imageId)
                // Implement preview modal logic here
        }

        const handleRelatedDocumentClick = (docId) => {
                router.push(`/documents/${docId}`)
        }

        return (
                 <main className="flex h-full grow flex-col min-h-screen bg-background-light">
      <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-8">
        <div className="flex flex-col max-w-[1100px] flex-1 gap-12">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex text-sm text-gray-500">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined mr-1" style={{ fontSize: '16px' }}>home</span>
                  Trang chủ
                </button>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                  <button
                    onClick={() => router.push('/materials')}
                    className="ml-1 hover:text-primary md:ml-2 transition-colors"
                  >
                    Tài liệu sơ cấp
                  </button>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                  <span className="ml-1 text-gray-900 md:ml-2 font-medium">{document.title}</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Hero Section - Responsive Layout */}
          <div className="@container">
            <div className="flex flex-col gap-8 @[864px]:flex-row @[864px]:items-start lg:flex-row" >
              
              {/* Cover Image */}
              <div className="relative group w-full @[864px]:w-[350px] shrink-0 flex-1 ">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl shadow-lg border border-gray-200"
                  style={{ backgroundImage: `url("${document.coverImage}")` }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                  <button
                    className="bg-white/80 backdrop-blur-md text-gray-900 p-3 rounded-full hover:bg-white transition-all shadow-lg hover:scale-105"
                    onClick={() => console.log('View preview clicked')}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>visibility</span>
                  </button>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex flex-col gap-6 flex-1">
                <div className="flex flex-col gap-3 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                      {document.level}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {document.type}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-600/20">
                      <span className="material-symbols-outlined filled" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>star</span>
                      {document.rating}
                    </span>
                  </div>
                  <h1 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                    {document.title}
                  </h1>
                  <p className="text-lg text-emerald-600 font-medium">{document.subtitle}</p>
                  <p className="text-gray-600 text-base font-normal leading-relaxed mt-2 line-clamp-3">
                    {document.description}
                  </p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-200">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">Tác giả</span>
                    <span className="text-sm font-semibold text-gray-900">{document.author}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">Định dạng</span>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-red-500" style={{ fontSize: '16px' }}>picture_as_pdf</span>
                      <span className="text-sm font-semibold text-gray-900">{document.format}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">Dung lượng</span>
                    <span className="text-sm font-semibold text-gray-900">{document.fileSize}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">Lượt tải</span>
                    <span className="text-sm font-semibold text-gray-900">{document.downloads}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-2">
                  <button
                    onClick={handleDownload}
                    className="flex flex-1 sm:flex-none min-w-[200px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-all shadow-md shadow-emerald-100 hover:shadow-lg"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>download</span>
                    <span className="truncate">Tải xuống miễn phí</span>
                  </button>
                  <button
                    onClick={handleSaveToLibrary}
                    className="flex flex-1 sm:flex-none min-w-[160px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-white border border-gray-300 text-gray-700 text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 hover:text-gray-900 transition-all"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>bookmark_border</span>
                    <span className="truncate">Lưu thư viện</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex size-12 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all hover:scale-105"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            
            {/* Left Column: Tabs & Content */}
            <div className="flex flex-col gap-6">
              
              {/* Tabs Header */}
              <div className="border-b border-gray-200 w-full">
                <nav aria-label="Tabs" className="-mb-px flex gap-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`border-b-2 py-4 px-1 text-sm font-medium transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-primary text-primary font-bold'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'introduction' && (
                <div className="text-gray-700 text-base leading-7 space-y-4">
                  <h3 className="text-gray-900 text-xl font-bold mb-2">Tổng quan về tài liệu</h3>
                  <p>
                    Giáo trình Hán ngữ quyển 1 (phiên bản mới) là cuốn đầu tiên trong bộ giáo trình Hán ngữ 6 quyển, được biên soạn bởi Đại học Ngôn ngữ và Văn hóa Bắc Kinh. Đây là bộ giáo trình kinh điển, được sử dụng rộng rãi nhất tại Việt Nam cho người bắt đầu học tiếng Trung.
                  </p>
                  <p>
                    Cuốn sách bao gồm 15 bài học, đi từ những kiến thức cơ bản nhất về ngữ âm (phiên âm Pinyin), nét chữ Hán, quy tắc bút thuận cho đến các mẫu câu giao tiếp đơn giản như chào hỏi, giới thiệu bản thân, mua sắm...
                  </p>
                  <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                    <li><strong className="text-gray-900">Phần 1 (Bài 1-5):</strong> Tập trung vào ngữ âm, thanh mẫu, vận mẫu và thanh điệu.</li>
                    <li><strong className="text-gray-900">Phần 2 (Bài 6-10):</strong> Kết cấu chữ Hán và các đoạn hội thoại ngắn.</li>
                    <li><strong className="text-gray-900">Phần 3 (Bài 11-15):</strong> Mở rộng từ vựng và ngữ pháp cơ bản.</li>
                  </ul>
                </div>
              )}

              {/* Preview Section */}
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-900 text-xl font-bold">Xem trước tài liệu</h3>
                  <button
                    onClick={() => console.log('View all previews')}
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Xem tất cả
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewImages.map((image) => (
                    <div
                      key={image.id}
                      onClick={() => handlePreviewClick(image.id)}
                      className="group relative cursor-pointer overflow-hidden rounded-lg bg-white border border-gray-200 hover:border-primary transition-colors shadow-sm hover:shadow-md"
                    >
                      <div
                        className="aspect-[3/4] w-full bg-center bg-cover bg-no-repeat opacity-90 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundImage: `url("${image.image}")` }}
                      />
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-xs text-white font-medium text-center">{image.title}</p>
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={() => console.log('View more previews')}
                    className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-50 border border-gray-200 hover:border-primary transition-colors flex items-center justify-center hover:bg-white"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20">
                        <span className="material-symbols-outlined">add</span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Xem thêm 12 trang</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Related & Tags */}
            <div className="flex flex-col gap-8">
              
              {/* Tags Card */}
              <div className="rounded-xl border border-gray-200 bg-surface-light p-6 shadow-sm">
                <h4 className="text-gray-900 font-bold mb-4">Từ khóa phổ biến</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => console.log('Search tag:', tag)}
                      className="px-3 py-1.5 rounded-full bg-gray-100 text-xs text-gray-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Related Docs */}
              <div>
                <h4 className="text-gray-900 font-bold mb-4 flex items-center justify-between">
                  Tài liệu liên quan
                  <button
                    onClick={() => router.push('/materials')}
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    Xem thêm
                  </button>
                </h4>
                <div className="flex flex-col gap-4">
                  {relatedDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => handleRelatedDocumentClick(doc.id)}
                      className="flex gap-4 group cursor-pointer"
                    >
                      <div
                        className="w-16 h-20 shrink-0 rounded bg-cover bg-center shadow-sm"
                        style={{ backgroundImage: `url("${doc.image}")` }}
                      />
                      <div className="flex flex-col justify-center">
                        <h5 className="text-gray-900 text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">
                          {doc.title}
                        </h5>
                        <p className="text-gray-500 text-xs mt-1">{doc.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
        )
}