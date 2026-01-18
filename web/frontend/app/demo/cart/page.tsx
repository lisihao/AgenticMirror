'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ShoppingCart,
    ArrowLeft,
    Trash2,
    Tag,
    Truck,
    ShieldCheck,
    Sparkles,
    ChevronRight,
    Package,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/Toast';
import { CartItemComponent } from '@/components/business/CartItem';
import { Button } from '@/components/ui/Button';

// Mock recommended products
const recommendedProducts = [
    { id: 'rec-1', name: '兰蔻小黑瓶精华', brand: 'Lancome', price: 760, originalPrice: 980 },
    { id: 'rec-2', name: 'SK-II神仙水', brand: 'SK-II', price: 1150, originalPrice: 1370 },
    { id: 'rec-3', name: '雅诗兰黛眼霜', brand: 'Estee Lauder', price: 520, originalPrice: 650 },
];

export default function CartPage() {
    const {
        items,
        itemCount,
        subtotal,
        shipping,
        discount,
        total,
        appliedCoupon,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
    } = useCart();
    const toast = useToast();
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');

    const handleApplyCoupon = () => {
        setCouponError('');
        if (!couponCode.trim()) {
            setCouponError('请输入优惠码');
            return;
        }
        const success = applyCoupon(couponCode.trim());
        if (success) {
            toast.success('优惠券已应用');
            setCouponCode('');
        } else {
            setCouponError('无效的优惠码或不满足使用条件');
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <Link href="/demo/commerce" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">购物车</h1>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            购物车是空的
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            去看看有什么好东西吧
                        </p>
                        <Link href="/demo/commerce">
                            <Button variant="primary" size="lg">
                                去购物
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Link href="/demo/commerce" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            购物车 ({itemCount})
                        </h1>
                    </div>
                    <button
                        onClick={() => {
                            clearCart();
                            toast.info('购物车已清空');
                        }}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        清空购物车
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {items.map((item) => (
                                <CartItemComponent
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                                    onRemove={() => {
                                        removeItem(item.id);
                                        toast.success('已从购物车移除');
                                    }}
                                />
                            ))}
                        </AnimatePresence>

                        {/* Recommended Products */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 mt-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                <h3 className="font-bold text-gray-800 dark:text-gray-200">
                                    搭配购买更优惠
                                </h3>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {recommendedProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex-shrink-0 w-40 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                                    >
                                        <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-2">
                                            <Package className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <div className="text-xs text-gray-500">{product.brand}</div>
                                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                                            {product.name}
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-red-500 font-bold">¥{product.price}</span>
                                            <span className="text-xs text-gray-400 line-through">
                                                ¥{product.originalPrice}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 sticky top-6">
                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">
                                订单摘要
                            </h3>

                            {/* Coupon */}
                            <div className="mb-4">
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="输入优惠码"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        应用
                                    </button>
                                </div>
                                {couponError && (
                                    <p className="text-xs text-red-500 mt-1">{couponError}</p>
                                )}
                                {appliedCoupon && (
                                    <div className="flex items-center justify-between mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <span className="text-sm text-green-700 dark:text-green-400">
                                            {appliedCoupon.code} 已应用
                                        </span>
                                        <button
                                            onClick={removeCoupon}
                                            className="text-xs text-green-600 hover:text-green-800"
                                        >
                                            移除
                                        </button>
                                    </div>
                                )}
                                <p className="text-xs text-gray-400 mt-2">
                                    可用优惠码：WELCOME10, SAVE50, VIP20
                                </p>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 py-4 border-t border-b border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">商品总计</span>
                                    <span className="text-gray-900 dark:text-gray-100">¥{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">运费</span>
                                    <span className={cn(
                                        shipping === 0 ? 'text-green-600' : 'text-gray-900 dark:text-gray-100'
                                    )}>
                                        {shipping === 0 ? '免运费' : `¥${shipping}`}
                                    </span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">优惠</span>
                                        <span className="text-red-500">-¥{discount}</span>
                                    </div>
                                )}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center py-4">
                                <span className="font-bold text-gray-800 dark:text-gray-200">应付总计</span>
                                <span className="text-2xl font-bold text-red-500">¥{total}</span>
                            </div>

                            {/* Checkout Button */}
                            <Link href="/demo/checkout">
                                <Button variant="primary" fullWidth size="lg">
                                    去结算 ({itemCount} 件)
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </Link>

                            {/* Trust Badges */}
                            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                                <div className="flex items-center gap-1">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>正品保证</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Truck className="w-4 h-4" />
                                    <span>满299免运费</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
