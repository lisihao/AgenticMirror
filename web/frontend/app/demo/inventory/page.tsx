'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Package,
    Plus,
    AlertCircle,
    TrendingDown,
    Calendar,
    RefreshCw,
    ShoppingBag,
    Clock,
} from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';
import { cn } from '@/lib/utils/cn';
import { mockInventory, mockProducts } from '@/lib/constants/mockData';

const categories = [
    { id: 'all', label: '全部', count: mockInventory.length },
    { id: 'skincare', label: '护肤', count: 2 },
    { id: 'makeup', label: '彩妆', count: 2 },
];

function getStatusColor(status: string) {
    switch (status) {
        case 'critical':
            return { bg: 'bg-red-500', text: 'text-red-500', light: 'bg-red-50' };
        case 'running_low':
            return { bg: 'bg-amber-500', text: 'text-amber-500', light: 'bg-amber-50' };
        default:
            return { bg: 'bg-green-500', text: 'text-green-500', light: 'bg-green-50' };
    }
}

function getStatusLabel(status: string) {
    switch (status) {
        case 'critical':
            return '即将用完';
        case 'running_low':
            return '库存偏低';
        default:
            return '充足';
    }
}

// Inventory Item Card
function InventoryCard({
    item,
    index,
}: {
    item: typeof mockInventory[0];
    index: number;
}) {
    const statusColor = getStatusColor(item.status);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "card p-4",
                item.status === 'critical' && "border-red-200"
            )}
        >
            <div className="flex items-start gap-4">
                {/* Product Image Placeholder */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center flex-shrink-0">
                    <Package className="w-8 h-8 text-gray-300" />
                </div>

                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="font-medium text-gray-900 truncate">
                                {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-500">{item.product.brand}</p>
                        </div>
                        <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            statusColor.light,
                            statusColor.text
                        )}>
                            {getStatusLabel(item.status)}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-500">剩余</span>
                            <span className={cn("font-medium", statusColor.text)}>
                                {item.remainingPercent}%
                            </span>
                        </div>
                        <Progress.Root className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <Progress.Indicator
                                className={cn("h-full transition-all duration-500", statusColor.bg)}
                                style={{ width: `${item.remainingPercent}%` }}
                            />
                        </Progress.Root>
                    </div>

                    {/* Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            约 {item.estimatedDaysLeft} 天后用完
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.openDate} 开封
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            {(item.status === 'critical' || item.status === 'running_low') && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                    <button className="flex-1 btn-primary text-sm py-2">
                        立即补货
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        等待促销
                    </button>
                </div>
            )}
        </motion.div>
    );
}

export default function InventoryPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const criticalItems = mockInventory.filter(i => i.status === 'critical');
    const runningLowItems = mockInventory.filter(i => i.status === 'running_low');

    return (
        <div className="min-h-screen p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">我的库存</h1>
                    <p className="text-gray-600">追踪您的美妆产品使用情况</p>
                </div>
                <button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    添加产品
                </button>
            </div>

            {/* Alerts Section */}
            {(criticalItems.length > 0 || runningLowItems.length > 0) && (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {criticalItems.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card p-4 bg-red-50 border-red-200"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-red-900">
                                        {criticalItems.length} 件产品即将用完
                                    </h3>
                                    <p className="text-sm text-red-700">
                                        建议尽快补货
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {runningLowItems.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-4 bg-amber-50 border-amber-200"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                    <TrendingDown className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-amber-900">
                                        {runningLowItems.length} 件产品库存偏低
                                    </h3>
                                    <p className="text-sm text-amber-700">
                                        618 大促将近，可考虑补货
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Category Filter */}
                    <div className="flex items-center gap-2 mb-6">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={cn(
                                    "px-4 py-2 rounded-full transition-all text-sm font-medium",
                                    selectedCategory === cat.id
                                        ? "bg-mirror-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                {cat.label}
                                <span className="ml-1 text-xs opacity-70">({cat.count})</span>
                            </button>
                        ))}
                    </div>

                    {/* Inventory Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {mockInventory.map((item, index) => (
                            <InventoryCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Subscriptions */}
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">订阅服务</h3>
                            <RefreshCw className="w-5 h-5 text-mirror-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-900">
                                        兰蔻小黑瓶
                                    </span>
                                    <span className="text-xs text-green-500 font-medium">
                                        活跃
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>每 2 个月</span>
                                    <span>下次: 2/15</span>
                                </div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-900">
                                        眼霜
                                    </span>
                                    <span className="text-xs text-green-500 font-medium">
                                        活跃
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>每 3 个月</span>
                                    <span>下次: 3/1</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-4 btn-secondary text-sm">
                            管理订阅
                        </button>
                    </div>

                    {/* Smart Suggestions */}
                    <div className="card p-5 bg-gradient-to-br from-mirror-50 to-accent-50">
                        <div className="flex items-center gap-2 mb-4">
                            <ShoppingBag className="w-5 h-5 text-mirror-500" />
                            <h3 className="font-semibold text-gray-900">智能建议</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="p-3 bg-white rounded-xl">
                                <p className="text-sm text-gray-700">
                                    您的 MAC Chili 口红预计 7 天后用完，618 大促期间可享 8 折优惠，建议现在加入购物车。
                                </p>
                                <button className="mt-2 text-sm font-medium text-mirror-500 hover:text-mirror-600">
                                    立即购买 →
                                </button>
                            </div>
                            <div className="p-3 bg-white rounded-xl">
                                <p className="text-sm text-gray-700">
                                    根据您的使用频率，建议将兰蔻小黑瓶的订阅周期调整为每 6 周一次。
                                </p>
                                <button className="mt-2 text-sm font-medium text-mirror-500 hover:text-mirror-600">
                                    调整订阅 →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="card p-5">
                        <h3 className="font-semibold text-gray-900 mb-4">使用统计</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-600">护肤品</span>
                                    <span className="font-medium text-gray-900">2 件</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-1/2" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-600">彩妆</span>
                                    <span className="font-medium text-gray-900">2 件</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-mirror-500 w-1/2" />
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">总价值</span>
                                    <span className="font-bold text-gray-900">¥2,120</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
