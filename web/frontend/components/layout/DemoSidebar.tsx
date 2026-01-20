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
    ChevronDown,
    Home,
    PlayCircle,
    Trophy,
    Heart,
    TrendingUp,
    Shirt,
    ShoppingCart,
    ClipboardList,
    Brain,
    Target,
    Cpu,
    PieChart,
    Wand2,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCart } from '@/contexts/CartContext';
import { ThemeToggle } from './ThemeToggle';

// 分类菜单结构
const menuCategories = [
    {
        id: 'investment',
        label: '产品投资与竞争分析',
        labelEn: 'Investment & Competition',
        icon: PieChart,
        items: [
            {
                label: '竞争分析',
                labelEn: 'Competition',
                href: '/demo/competition',
                icon: Trophy,
                highlight: true,
            },
            {
                label: '投资分析',
                labelEn: 'Investment',
                href: '/demo/investment',
                icon: TrendingUp,
                highlight: true,
            },
            {
                label: '差异化竞争力',
                labelEn: 'Differentiation',
                href: '/demo/differentiation',
                icon: Target,
                highlight: true,
            },
            {
                label: '核心技术',
                labelEn: 'Technology',
                href: '/demo/technology',
                icon: Cpu,
                highlight: true,
            },
        ],
    },
    {
        id: 'demo',
        label: '产品能力演示',
        labelEn: 'Product Demo',
        icon: Wand2,
        items: [
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
                label: '穿搭指导',
                labelEn: 'Styling',
                href: '/demo/styling',
                icon: Shirt,
                highlight: true,
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
                label: 'AI购买计划',
                labelEn: 'Smart Buy',
                href: '/demo/smart-buy',
                icon: Brain,
                highlight: true,
            },
            {
                label: '购物车',
                labelEn: 'Cart',
                href: '/demo/cart',
                icon: ShoppingCart,
                showBadge: true,
            },
            {
                label: '我的订单',
                labelEn: 'Orders',
                href: '/demo/orders',
                icon: ClipboardList,
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
        ],
    },
];

export default function DemoSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<string[]>(['investment', 'demo']);
    const pathname = usePathname();
    const { itemCount } = useCart();

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 72 : 260 }}
            className="h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col transition-colors"
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-mirror flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-lg font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap"
                        >
                            Mirror
                        </motion.span>
                    )}
                </Link>
                {!collapsed && <ThemeToggle />}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto">
                <div className="space-y-4 px-2">
                    {menuCategories.map((category) => {
                        const isExpanded = expandedCategories.includes(category.id);
                        const CategoryIcon = category.icon;

                        return (
                            <div key={category.id}>
                                {/* 分类标题 */}
                                {!collapsed ? (
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="w-full flex items-center justify-between px-3 py-2 mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <CategoryIcon className="w-4 h-4" />
                                            <span>{category.label}</span>
                                        </div>
                                        <ChevronDown
                                            className={cn(
                                                'w-4 h-4 transition-transform',
                                                isExpanded ? '' : '-rotate-90'
                                            )}
                                        />
                                    </button>
                                ) : (
                                    <div className="flex justify-center py-2 mb-1">
                                        <CategoryIcon className="w-4 h-4 text-gray-400" />
                                    </div>
                                )}

                                {/* 分类下的菜单项 */}
                                {(isExpanded || collapsed) && (
                                    <ul className="space-y-1">
                                        {category.items.map((item) => {
                                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                                            const isHighlight = 'highlight' in item && item.highlight;
                                            const showBadge = 'showBadge' in item && item.showBadge && itemCount > 0;
                                            return (
                                                <li key={item.href}>
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            'relative flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200',
                                                            isActive
                                                                ? 'bg-mirror-50 text-mirror-600 dark:bg-mirror-900/20 dark:text-mirror-400'
                                                                : isHighlight
                                                                ? 'bg-gradient-to-r from-mirror-50/50 to-accent-50/50 text-mirror-600 border border-mirror-200/50 dark:from-mirror-900/10 dark:to-accent-900/10 dark:border-mirror-800/50'
                                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                                                        )}
                                                    >
                                                        <div className="relative">
                                                            <item.icon className={cn(
                                                                'w-5 h-5 flex-shrink-0',
                                                                isActive ? 'text-mirror-500' : ''
                                                            )} />
                                                            {showBadge && (
                                                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                                                    {itemCount > 9 ? '9+' : itemCount}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {!collapsed && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className="flex flex-col flex-1"
                                                            >
                                                                <span className="text-sm font-medium">
                                                                    {item.label}
                                                                </span>
                                                                <span className="text-xs text-gray-400 dark:text-gray-500">
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
                                )}
                            </div>
                        );
                    })}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                {collapsed && (
                    <div className="flex justify-center mb-2">
                        <ThemeToggle />
                    </div>
                )}
                <Link
                    href="/"
                    className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors',
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
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors mt-2',
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
