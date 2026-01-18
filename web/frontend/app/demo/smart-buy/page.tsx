'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowLeft,
    Brain,
    Calendar,
    Sparkles,
    TrendingDown,
    Package,
    Clock,
    RefreshCw,
    Settings,
    Bell,
    ChevronRight,
    Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { PurchasePlanCard } from '@/components/shopping';
import {
    mockPurchasePlan,
    saleCalendar,
    priorityConfig,
} from '@/lib/constants/shoppingData';

export default function SmartBuyPage() {
    const toast = useToast();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const plan = mockPurchasePlan;

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success('购买计划已更新');
        setIsRefreshing(false);
    };

    const handleItemClick = (productId: string) => {
        window.location.href = `/demo/product/${productId}`;
    };

    // Calculate summary stats
    const urgentCount = plan.items.filter((i) => i.priority === 'urgent').length;
    const totalItems = plan.items.length;
    const upcomingEvents = saleCalendar.slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/demo/commerce"
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                <Brain className="w-6 h-6 text-amber-500" />
                                AI 智能购买
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                让 AI 帮你找到最佳购买时机
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRefresh}
                            icon={<RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />}
                        >
                            刷新
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            icon={<Settings className="w-4 h-4" />}
                        >
                            设置
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <SummaryCard
                        icon={<Package className="w-5 h-5" />}
                        label="待购商品"
                        value={totalItems}
                        color="amber"
                    />
                    <SummaryCard
                        icon={<Clock className="w-5 h-5" />}
                        label="紧急补货"
                        value={urgentCount}
                        color="red"
                    />
                    <SummaryCard
                        icon={<Wallet className="w-5 h-5" />}
                        label="预计节省"
                        value={`¥${plan.totalSavings}`}
                        color="green"
                    />
                    <SummaryCard
                        icon={<TrendingDown className="w-5 h-5" />}
                        label="优化建议"
                        value={plan.optimizations.length}
                        color="blue"
                    />
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Purchase Plan */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
                            <PurchasePlanCard
                                plan={plan}
                                onItemClick={handleItemClick}
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Upcoming Sales */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-amber-500" />
                                即将到来的促销
                            </h3>
                            <div className="space-y-3">
                                {upcomingEvents.map((event, index) => {
                                    const date = new Date(event.date);
                                    const daysUntil = Math.ceil(
                                        (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                                    );
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                                        >
                                            <span className="text-2xl">{event.icon}</span>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                                    {event.event}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {date.toLocaleDateString('zh-CN', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </div>
                                            </div>
                                            <div className={cn(
                                                'px-2 py-1 rounded text-xs font-medium',
                                                daysUntil <= 30
                                                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                            )}>
                                                {daysUntil > 0 ? `${daysUntil}天后` : '进行中'}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                            <button className="w-full mt-3 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center justify-center gap-1">
                                查看完整促销日历
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Price Alerts */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-amber-500" />
                                价格提醒
                            </h3>
                            <div className="space-y-3">
                                <PriceAlertItem
                                    productName="兰蔻小黑瓶"
                                    targetPrice={699}
                                    currentPrice={760}
                                />
                                <PriceAlertItem
                                    productName="SK-II神仙水"
                                    targetPrice={980}
                                    currentPrice={1150}
                                />
                            </div>
                            <Button
                                variant="outline"
                                fullWidth
                                size="sm"
                                className="mt-3"
                                icon={<Bell className="w-4 h-4" />}
                            >
                                添加价格提醒
                            </Button>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white">
                            <h3 className="font-bold mb-2 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                智能购物助手
                            </h3>
                            <p className="text-sm text-amber-100 mb-4">
                                AI 会持续监控价格变化，在最佳时机提醒你购买
                            </p>
                            <div className="space-y-2">
                                <button className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    设置自动补货提醒
                                </button>
                                <button className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-2">
                                    <TrendingDown className="w-4 h-4" />
                                    开启全网比价监控
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Summary Card Component
interface SummaryCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: 'amber' | 'red' | 'green' | 'blue';
}

function SummaryCard({ icon, label, value, color }: SummaryCardProps) {
    const colors = {
        amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
        red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
        green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', colors[color])}>
                {icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        </div>
    );
}

// Price Alert Item Component
interface PriceAlertItemProps {
    productName: string;
    targetPrice: number;
    currentPrice: number;
}

function PriceAlertItem({ productName, targetPrice, currentPrice }: PriceAlertItemProps) {
    const progress = Math.min(100, (targetPrice / currentPrice) * 100);
    const diff = currentPrice - targetPrice;

    return (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {productName}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    目标 ¥{targetPrice}
                </span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    当前 ¥{currentPrice}
                </span>
                <span className="text-xs text-amber-600 dark:text-amber-400">
                    还差 ¥{diff}
                </span>
            </div>
        </div>
    );
}
