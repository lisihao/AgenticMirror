'use client';

import Link from 'next/link';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
    product: [
        { label: '功能特性', href: '/#features' },
        { label: '技术规格', href: '/#specs' },
        { label: '使用教程', href: '/demo/tutorials' },
        { label: '常见问题', href: '/faq' },
    ],
    company: [
        { label: '关于我们', href: '/about' },
        { label: '联系我们', href: '/contact' },
        { label: '加入我们', href: '/careers' },
        { label: '媒体资源', href: '/press' },
    ],
    legal: [
        { label: '隐私政策', href: '/privacy' },
        { label: '服务条款', href: '/terms' },
        { label: '用户协议', href: '/agreement' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-mirror flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold">
                                AgenticMirror
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            AI 驱动的智能美妆镜，为您提供专业级皮肤分析、个性化妆容推荐和智能购物体验。
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-400">
                                <Mail className="w-5 h-5" />
                                <span>contact@agenticmirror.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <Phone className="w-5 h-5" />
                                <span>400-888-8888</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <MapPin className="w-5 h-5" />
                                <span>深圳市南山区科技园</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold mb-4">产品</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">公司</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">法律</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        &copy; 2024 AgenticMirror. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                            微信
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                            微博
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                            小红书
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
