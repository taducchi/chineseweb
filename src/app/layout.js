import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
        title: 'Học Tiếng Trung - Landing Page',
        description: 'Nền tảng học tiếng Trung trực tuyến hàng đầu Việt Nam',
        icons: {
                icon: [
                        { media: '(prefers-color-scheme: light)', url: '/images/favicon.png', href: '/images/favicon.png' },
                        { media: '(prefers-color-scheme: dark)', url: '/images/favicon.png', href: '/images/favicon.png' },
                ],
        },

}

export default function RootLayout({ children }) {
        return (
                <AuthProvider>
                        <Suspense fallback={<div>Loading...</div>}>
                                <html lang="vi">
                                        <head>
                                                <link rel="icon" href="/favicon.png" sizes="any" />
                                                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

                                                <link
                                                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                                                        rel="stylesheet"
                                                />
                                                <link rel="preconnect" href="https://fonts.googleapis.com" />
                                                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                                                <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&family=Noto+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                                        </head>
                                        <body className={`${inter.className} font-display antialiased`}>
                                                {children}
                                        </body>
                                </html>
                        </Suspense>

                </AuthProvider>

        )
}