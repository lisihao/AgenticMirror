'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowLeft,
    ClipboardList,
    Package,
    Truck,
    CheckCircle,
    Clock,
    ShoppingCart,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { OrderCard, Order } from '@/components/business/OrderCard';
import { useToast } from '@/components/ui/Toast';

// Mock orders
const mockOrders: Order[] = [
    {
        id: '1',
        orderNumber: '2024011700001',
        status: 'shipped',
        items: [
            { id: '1', name: '兰蔻小黑瓶精华 50ml', brand: 'Lancome', quantity: 1, price: 760 },
            { id: '2', name: 'SK-II神仙水 230ml', brand: 'SK-II', quantity: 1, price: 1150 },
        ],
        total: 1860,
        createdAt: '2024-01-17T14:30:00',
        estimatedDelivery: '明天',
    },
    {
        id: '2',
        orderNumber: '2024011600002',
        status: 'completed',
        items: [
            { id: '3', name: '雅诗兰黛眼霜 15ml', brand: 'Estee Lauder', quantity: 2, price: 520 },
        ],
        total: 1040,
        createdAt: '2024-01-16T10:15:00',
    },
    {
        id: '3',
        orderNumber: '2024011500003',
        status: 'completed',
        items: [
            { id: '4', name: 'CPB肌肤之钥 隔离霜', brand: 'CPB', quantity: 1, price: 890 },
            { id: '5', name: 'MAC口红 Chili色号', brand: 'MAC', quantity: 1, price: 230 },
            { id: '6', name: 'NARS腮红 Orgasm', brand: 'NARS', quantity: 1, price: 320 },
        ],
        total: 1440,
        createdAt: '2024-01-15T09:20:00',
    },
    {
        id: '4',
        orderNumber: '2024011400004',
        status: 'delivered',
        items: [
            { id: '7', name: 'La Mer海蓝之谜面霜 30ml', brand: 'La Mer', quantity: 1, price: 2680 },
        ],
        total: 2680,
        createdAt: '2024-01-14T16:45:00',
    },
];

type TabType = 'all' | 'pending_payment' | 'shipped' | 'delivered' | 'completed';

const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'all', label: '全部' },
    { id: 'pending_payment', label: '待付款' },
    { id: 'shipped', label: '待收货', count: 1 },
    { id: 'delivered', label: '待评价', count: 1 },
    { id: 'completed', label: '已完成' },
];

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const toast = useToast();

    const filteredOrders = activeTab === 'all'
        ? mockOrders
        : mockOrders.filter((order) => order.status === activeTab);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                    <Link href="/demo/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">我的订单</h1>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'relative px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                                activeTab === tab.id
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            )}
                        >
                            {tab.label}
                            {tab.count && tab.count > 0 && (
                                <span className={cn(
                                    'absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center',
                                    activeTab === tab.id
                                        ? 'bg-white text-amber-500'
                                        : 'bg-red-500 text-white'
                                )}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-12 text-center">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ClipboardList className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                                暂无订单
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                去逛逛，发现心仪的商品
                            </p>
                            <Link
                                href="/demo/commerce"
                                className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                去购物
                            </Link>
                        </div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <OrderCard
                                    order={order}
                                    onViewDetail={() => toast.info('查看订单详情')}
                                    onTrackShipping={() => toast.info('查看物流信息')}
                                    onReorder={() => toast.success('商品已加入购物车')}
                                    onReview={() => toast.info('前往评价')}
                                />
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Stats */}
                {mockOrders.length > 0 && (
                    <div className="mt-8 grid grid-cols-4 gap-4">
                        {[
                            { label: '总订单', value: mockOrders.length, icon: ClipboardList },
                            { label: '待收货', value: 1, icon: Truck },
                            { label: '待评价', value: 1, icon: Clock },
                            { label: '已完成', value: 2, icon: CheckCircle },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center"
                            >
                                <stat.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
