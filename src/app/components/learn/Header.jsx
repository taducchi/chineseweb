// components/Layout/Header.js
'use client';

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-6 py-3 shrink-0 z-20">
      <div className="flex items-center gap-4">
        <div className="size-8 text-primary">
          <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6_319)">
              <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
            </g>
            <defs>
              <clipPath id="clip0_6_319"><rect fill="white" height="48" width="48" /></clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">
          Zhoo 中文
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8 items-center">
        <div className="hidden md:flex items-center gap-9">
          <a className="text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">
            Dashboard
          </a>
          <a className="text-sm font-medium leading-normal text-primary" href="#">
            Khoá học
          </a>
       
        </div>
        <div className="flex items-center gap-4">
          <button className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full hover:bg-background-light dark:hover:bg-border-dark transition-colors text-text-main-light dark:text-text-main-dark">
            <span className="material-symbols-outlined text-[24px]">
              notifications
            </span>
          </button>
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCm9GebosGwxxmhDpkEDpKH09Hp2pQkMtLDkbu_fLMCRiDglXASNtNkHDcVLhnjWXPoERO02BaIVpRbE0vxKirsvNdKc0NgIyAArQ9KuawVL8nsNGqYMV5iFHMOcL0wm909E58hdr8-fRgFAZX12pMJ_isI2o22xRGFfOsJAHbqUOWlfMsDDG9qo_95D3vnNgLShXop9G1Ccx9fgZ4YVTECKPzSd7PMScPdW62fcuaMJsiOCt6-Z6ZeojfrWvqkpsd1Zg-9MoPz-Gl")'
            }}
          />
        </div>
      </div>
    </header>
  ); 
}