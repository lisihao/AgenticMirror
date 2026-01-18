'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    ExternalLink,
    Truck,
    Tag,
    AlertCircle,
    CheckCircle,
    Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
    PlatformPrice,
    calculateFinalPrice,
    getLowestPlatform,
} from '@/lib/constants/shoppingData';
import { PlatformIcon } from './PlatformBadge';

interface PriceComparisonCardProps {
    prices: PlatformPrice[];
    className?: string;
}

export function PriceComparisonCard({ prices, className }: PriceComparisonCardProps) {
    const sortedPrices = useMemo(() => {
        return [...prices].sort((a, b) => calculateFinalPrice(a) - calculateFinalPrice(b));
    }, [prices]);

    const lowestPrice = sortedPrices[0];
    const lowestFinalPrice = calculateFinalPrice(lowestPrice);

    return (
        <div className={cn('space-y-3', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    全网比价
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    更新于 {new Date(lowestPrice.updatedAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            {/* Price List */}
            <div className="space-y-2">
                {sortedPrices.map((platform, index) => {
                    const finalPrice = calculateFinalPrice(platform);
                    const isLowest = index === 0;
                    const priceDiff = finalPrice - lowestFinalPrice;
                    const isRecommended = platform.isRecommended || isLowest;

                    return (
                        <motion.div
                            key={platform.platform}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                'relative p-3 rounded-xl border-2 transition-all',
                                isRecommended
                                    ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-600'
                                    : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-200 dark:hover:border-gray-700'
                            )}
                        >
                            {/* Recommended Badge */}
                            {isRecommended && (
                                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    AI推荐
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                {/* Platform Icon */}
                                <PlatformIcon platform={platform.platform} size={40} />

                                {/* Platform Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            {platform.platformName}
                                        </span>
                                        {platform.promotion && (
                                            <span className="px-1.5 py-0.5 text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded">
                                                {platform.promotion}
                                            </span>
                                        )}
                                    </div>

                                    {/* Delivery & Stock */}
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Truck className="w-3 h-3" />
                                            {platform.estimatedDelivery}
                                        </span>
                                        <StockIndicator stock={platform.stock} />
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="text-right">
                                    <div className="flex items-baseline gap-1">
                                        <span className={cn(
                                            'text-xl font-bold',
                                            isLowest ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'
                                        )}>
                                            ¥{platform.price}
                                        </span>
                                        {platform.coupon && (
                                            <span className="text-xs text-green-600 dark:text-green-400">
                                                -{platform.coupon.value}
                                            </span>
                                        )}
                                    </div>

                                    {/* Coupon Info */}
                                    {platform.coupon && (
                                        <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-0.5">
                                            <Tag className="w-3 h-3" />
                                            {platform.coupon.name}
                                        </div>
                                    )}

                                    {/* Price Difference */}
                                    {!isLowest && priceDiff > 0 && (
                                        <div className="text-xs text-gray-400 mt-0.5">
                                            比最低贵 ¥{priceDiff}
                                        </div>
                                    )}
                                </div>

                                {/* Link Button */}
                                <button
                                    className={cn(
                                        'p-2 rounded-lg transition-colors',
                                        isRecommended
                                            ? 'bg-amber-500 text-white hover:bg-amber-600'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    )}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700 dark:text-green-400">
                        AI 推荐在 <span className="font-bold">{lowestPrice.platformName}</span> 购买
                    </span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        ¥{lowestFinalPrice}
                    </span>
                </div>
                <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                    含运费和优惠后的最终价格，比最贵渠道便宜 ¥
                    {calculateFinalPrice(sortedPrices[sortedPrices.length - 1]) - lowestFinalPrice}
                </p>
            </div>
        </div>
    );
}

// Stock Indicator Component
function StockIndicator({ stock }: { stock: PlatformPrice['stock'] }) {
    const config = {
        in_stock: { label: '有货', color: 'text-green-600', icon: CheckCircle },
        low_stock: { label: '库存紧张', color: 'text-amber-600', icon: AlertCircle },
        out_of_stock: { label: '缺货', color: 'text-red-600', icon: AlertCircle },
    };

    const { label, color, icon: Icon } = config[stock];

    return (
        <span className={cn('flex items-center gap-1', color)}>
            <Icon className="w-3 h-3" />
            {label}
        </span>
    );
}
