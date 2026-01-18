'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    MapPin,
    CreditCard,
    Truck,
    ShieldCheck,
    CheckCircle,
    ChevronRight,
    Package,
    Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';

// Mock addresses
const mockAddresses = [
    {
        id: '1',
        name: '张小姐',
        phone: '138****8888',
        address: '上海市浦东新区陆家嘴环路1000号 环球金融中心',
        isDefault: true,
    },
    {
        id: '2',
        name: '张小姐',
        phone: '138****8888',
        address: '上海市静安区南京西路1266号 恒隆广场',
        isDefault: false,
    },
];

// Payment methods
const paymentMethods = [
    { id: 'alipay', name: '支付宝', icon: '💳' },
    { id: 'wechat', name: '微信支付', icon: '💬' },
    { id: 'card', name: '银行卡', icon: '💳' },
];

// Shipping options
const shippingOptions = [
    { id: 'standard', name: '标准配送', price: 0, time: '预计 1-3 天', isFree: true },
    { id: 'express', name: '次日达', price: 15, time: '明天送达', isFree: false },
];

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, shipping, discount, total, clearCart } = useCart();
    const toast = useToast();

    const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0].id);
    const [selectedPayment, setSelectedPayment] = useState('alipay');
    const [selectedShipping, setSelectedShipping] = useState('standard');
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedShippingOption = shippingOptions.find((o) => o.id === selectedShipping);
    const finalShipping = selectedShippingOption?.price || 0;
    const finalTotal = subtotal + finalShipping - discount;

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Simulate order creation
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success('订单创建成功！');
        clearCart();

        // Redirect to orders page
        router.push('/demo/orders');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        购物车为空
                    </h2>
                    <p className="text-gray-500 mb-4">请先添加商品到购物车</p>
                    <Link href="/demo/commerce">
                        <Button variant="primary">去购物</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                    <Link href="/demo/cart" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">确认订单</h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-amber-500" />
                                    <h2 className="font-bold text-gray-800 dark:text-gray-200">收货地址</h2>
                                </div>
                                <button className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1">
                                    <Plus className="w-4 h-4" />
                                    新增地址
                                </button>
                            </div>
                            <div className="space-y-3">
                                {mockAddresses.map((addr) => (
                                    <label
                                        key={addr.id}
                                        className={cn(
                                            'flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                                            selectedAddress === addr.id
                                                ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                                                : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="address"
                                            checked={selectedAddress === addr.id}
                                            onChange={() => setSelectedAddress(addr.id)}
                                            className="mt-1"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                                    {addr.name}
                                                </span>
                                                <span className="text-gray-500">{addr.phone}</span>
                                                {addr.isDefault && (
                                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded text-xs">
                                                        默认
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {addr.address}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Package className="w-5 h-5 text-amber-500" />
                                <h2 className="font-bold text-gray-800 dark:text-gray-200">商品清单</h2>
                            </div>
                            <div className="space-y-3">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                                    >
                                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                            <Package className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-gray-500">{item.product.brand}</div>
                                            <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                                {item.product.name}
                                            </div>
                                            <div className="text-sm text-gray-500">x{item.quantity}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-red-500">
                                                ¥{item.product.price * item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Method */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Truck className="w-5 h-5 text-amber-500" />
                                <h2 className="font-bold text-gray-800 dark:text-gray-200">配送方式</h2>
                            </div>
                            <div className="space-y-3">
                                {shippingOptions.map((option) => (
                                    <label
                                        key={option.id}
                                        className={cn(
                                            'flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all',
                                            selectedShipping === option.id
                                                ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                                                : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                checked={selectedShipping === option.id}
                                                onChange={() => setSelectedShipping(option.id)}
                                            />
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                                    {option.name}
                                                </div>
                                                <div className="text-sm text-gray-500">{option.time}</div>
                                            </div>
                                        </div>
                                        <span className={cn(
                                            'font-medium',
                                            option.isFree ? 'text-green-600' : 'text-gray-900 dark:text-gray-100'
                                        )}>
                                            {option.isFree ? '免费' : `+¥${option.price}`}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-amber-500" />
                                <h2 className="font-bold text-gray-800 dark:text-gray-200">支付方式</h2>
                            </div>
                            <div className="flex gap-3">
                                {paymentMethods.map((method) => (
                                    <label
                                        key={method.id}
                                        className={cn(
                                            'flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all',
                                            selectedPayment === method.id
                                                ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                                                : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={selectedPayment === method.id}
                                            onChange={() => setSelectedPayment(method.id)}
                                            className="hidden"
                                        />
                                        <span className="text-xl">{method.icon}</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            {method.name}
                                        </span>
                                        {selectedPayment === method.id && (
                                            <CheckCircle className="w-5 h-5 text-amber-500" />
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Note */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4">订单备注</h2>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="如有特殊要求请填写..."
                                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 sticky top-6">
                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">订单摘要</h3>

                            <div className="space-y-3 py-4 border-t border-b border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">商品总计</span>
                                    <span className="text-gray-900 dark:text-gray-100">¥{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">运费</span>
                                    <span className={cn(
                                        finalShipping === 0 ? 'text-green-600' : 'text-gray-900 dark:text-gray-100'
                                    )}>
                                        {finalShipping === 0 ? '免运费' : `¥${finalShipping}`}
                                    </span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">优惠</span>
                                        <span className="text-red-500">-¥{discount}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center py-4">
                                <span className="font-bold text-gray-800 dark:text-gray-200">应付总计</span>
                                <span className="text-2xl font-bold text-red-500">¥{finalTotal}</span>
                            </div>

                            <Button
                                variant="primary"
                                fullWidth
                                size="lg"
                                loading={isSubmitting}
                                onClick={handleSubmit}
                            >
                                提交订单
                            </Button>

                            <div className="flex items-center justify-center gap-1 mt-4 text-xs text-gray-400">
                                <ShieldCheck className="w-4 h-4" />
                                <span>您的支付信息受安全保护</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
