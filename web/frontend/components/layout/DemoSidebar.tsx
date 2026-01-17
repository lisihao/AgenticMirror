'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Camera,
    BarChart3,
    Palette,
    GraduationCap,
    ShoppingBag,
    Package,
    LayoutDashboard,
    ChevronLeft,
    ChevronRight,
    Home,
    PlayCircle,
    Trophy,
    Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const menuItems = [
    {
        label: '工作流演示',
        labelEn: 'Workflow',
        href: '/demo/workflow',
        icon: PlayCircle,
        highlight: true,
    },
    {
        label: 'AI陪伴体验',
        labelEn: 'Companion',
        href: '/demo/companion',
        icon: Heart,
        highlight: true,
    },
    {
        label: '竞争分析',
        labelEn: 'Competition',
        href: '/demo/competition',
        icon: Trophy,
    },
    {
        label: '魔镜体验',
        labelEn: 'Mirror',
        href: '/demo/mirror',
        icon: Camera,
    },
    {
        label: '皮肤分析',
        labelEn: 'Analysis',
        href: '/demo/analysis',
        icon: BarChart3,
    },
    {
        label: '妆容推荐',
        labelEn: 'Recommendations',
        href: '/demo/recommendations',
        icon: Palette,
    },
    {
        label: '美妆教程',
        labelEn: 'Tutorials',
        href: '/demo/tutorials',
        icon: GraduationCap,
    },
    {
        label: '智能购物',
        labelEn: 'Commerce',
        href: '/demo/commerce',
        icon: ShoppingBag,
    },
    {
        label: '我的库存',
        labelEn: 'Inventory',
        href: '/demo/inventory',
        icon: Package,
    },
    {
        label: '个人中心',
        labelEn: 'Dashboard',
        href: '/demo/dashboard',
        icon: LayoutDashboard,
    },
];

export default function DemoSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 72 : 240 }}
            className="h-screen bg-white border-r border-gray-100 flex flex-col"
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-mirror flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-lg font-bold text-gray-900 whitespace-nowrap"
                        >
                            Mirror
                        </motion.span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto">
                <ul className="space-y-1 px-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        const isHighlight = 'highlight' in item && item.highlight;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                                        isActive
                                            ? 'bg-mirror-50 text-mirror-600'
                                            : isHighlight
                                            ? 'bg-gradient-to-r from-mirror-50 to-accent-50 text-mirror-600 border border-mirror-200'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    )}
                                >
                                    <item.icon className={cn(
                                        'w-5 h-5 flex-shrink-0',
                                        isActive ? 'text-mirror-500' : ''
                                    )} />
                                    {!collapsed && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col"
                                        >
                                            <span className="text-sm font-medium">
                                                {item.label}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {item.labelEn}
                                            </span>
                                        </motion.div>
                                    )}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute right-0 w-1 h-8 bg-mirror-500 rounded-l-full"
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100">
                <Link
                    href="/"
                    className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors',
                        collapsed && 'justify-center'
                    )}
                >
                    <Home className="w-5 h-5" />
                    {!collapsed && (
                        <span className="text-sm font-medium">返回首页</span>
                    )}
                </Link>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors mt-2',
                        collapsed && 'justify-center'
                    )}
                >
                    {collapsed ? (
                        <ChevronRight className="w-5 h-5" />
                    ) : (
                        <>
                            <ChevronLeft className="w-5 h-5" />
                            <span className="text-sm">收起菜单</span>
                        </>
                    )}
                </button>
            </div>
        </motion.aside>
    );
}
