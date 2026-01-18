'use client';

import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, ShoppingCart, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/Badge';

export type OrderStatus =
    | 'pending_payment'
    | 'paid'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'completed'
    | 'cancelled';

export interface OrderItem {
    id: string;
    name: string;
    brand: string;
    image?: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    items: OrderItem[];
    total: number;
    createdAt: string;
    estimatedDelivery?: string;
}

interface OrderCardProps {
    order: Order;
    variant?: 'list' | 'detail';
    onViewDetail?: () => void;
    onTrackShipping?: () => void;
    onReorder?: () => void;
    onReview?: () => void;
}

const statusConfig: Record<OrderStatus, { label: string; color: 'warning' | 'info' | 'success' | 'danger' | 'default'; icon: React.ElementType }> = {
    pending_payment: { label: '待付款', color: 'warning', icon: Clock },
    paid: { label: '已付款', color: 'info', icon: CheckCircle },
    processing: { label: '处理中', color: 'info', icon: Package },
    shipped: { label: '已发货', color: 'info', icon: Truck },
    delivered: { label: '已送达', color: 'success', icon: CheckCircle },
    completed: { label: '已完成', color: 'success', icon: CheckCircle },
    cancelled: { label: '已取消', color: 'danger', icon: Clock },
};

export function OrderCard({
    order,
    variant = 'list',
    onViewDetail,
    onTrackShipping,
    onReorder,
    onReview,
}: OrderCardProps) {
    const config = statusConfig[order.status];
    const StatusIcon = config.icon;
    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">订单号: {order.orderNumber}</span>
                    <span className="text-sm text-gray-400">{formatDate(order.createdAt)}</span>
                </div>
                <Badge variant={config.color} size="sm">
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {config.label}
                </Badge>
            </div>

            {/* Items */}
            <div className="p-4">
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {order.items.slice(0, 4).map((item) => (
                        <div
                            key={item.id}
                            className="flex-shrink-0 flex items-center gap-2"
                        >
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                            </div>
                            <div className="text-xs">
                                <div className="text-gray-600 dark:text-gray-400 line-clamp-2 w-20">
                                    {item.name}
                                </div>
                                <div className="text-gray-400">x{item.quantity}</div>
                            </div>
                        </div>
                    ))}
                    {order.items.length > 4 && (
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-sm text-gray-500">
                            +{order.items.length - 4}
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        共 {itemCount} 件商品
                    </div>
                    <div className="text-sm">
                        合计: <span className="text-lg font-bold text-red-500">¥{order.total}</span>
                    </div>
                </div>

                {/* Delivery Info */}
                {order.status === 'shipped' && order.estimatedDelivery && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                        <Truck className="w-4 h-4" />
                        <span>预计 {order.estimatedDelivery} 送达</span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
                {onViewDetail && (
                    <button
                        onClick={onViewDetail}
                        className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                    >
                        订单详情
                        <ChevronRight className="w-4 h-4" />
                    </button>
                )}
                {order.status === 'shipped' && onTrackShipping && (
                    <button
                        onClick={onTrackShipping}
                        className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                        查看物流
                    </button>
                )}
                {order.status === 'delivered' && (
                    <button
                        onClick={onTrackShipping}
                        className="px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    >
                        确认收货
                    </button>
                )}
                {order.status === 'completed' && (
                    <>
                        {onReview && (
                            <button
                                onClick={onReview}
                                className="px-4 py-2 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                            >
                                评价商品
                            </button>
                        )}
                        {onReorder && (
                            <button
                                onClick={onReorder}
                                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
                            >
                                再次购买
                            </button>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
}
