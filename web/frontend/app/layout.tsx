import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
});

export const metadata: Metadata = {
    title: 'AgenticMirror - AI 智能美妆镜',
    description: '您的 AI 美妆顾问，智能皮肤分析、个性化妆容推荐、步骤化教程指导',
    keywords: ['智能美妆镜', 'AI 美妆', '皮肤分析', '妆容推荐', 'AR 试妆'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-CN" className={`${inter.variable} ${playfair.variable}`}>
            <body className="font-sans">
                {children}
            </body>
        </html>
    );
}
