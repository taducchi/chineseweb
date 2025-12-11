import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
        title: 'Học Tiếng Trung - Landing Page',
        description: 'Nền tảng học tiếng Trung trực tuyến số 1 Việt Nam',
}

export default function RootLayout({ children }) {
        return (
                <html lang="vi">
                        <head>
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
        )
}