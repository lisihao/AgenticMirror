'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ShoppingBag,
    Bell,
    TrendingDown,
    TrendingUp,
    Star,
    ChevronRight,
    Sparkles,
    Clock,
    AlertCircle,
    Tag,
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';
import { cn } from '@/lib/utils/cn';
import {
    mockProducts,
    mockShoppingAlerts,
    mockPriceHistory,
    mockTrends,
} from '@/lib/constants/mockData';

const categories = [
    { id: 'all', label: '全部' },
    { id: 'skincare', label: '护肤' },
    { id: 'makeup', label: '彩妆' },
    { id: 'tools', label: '工具' },
];

// Alert Card
function AlertCard({ alert }: { alert: typeof mockShoppingAlerts[0] }) {
    const urgencyColors = {
        high: 'border-red-200 bg-red-50',
        medium: 'border-amber-200 bg-amber-50',
        low: 'border-blue-200 bg-blue-50',
    };

    const urgencyIcons = {
        high: <AlertCircle className="w-5 h-5 text-red-500" />,
        medium: <TrendingDown className="w-5 h-5 text-amber-500" />,
        low: <TrendingUp className="w-5 h-5 text-blue-500" />,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "p-4 rounded-xl border",
                urgencyColors[alert.urgency as keyof typeof urgencyColors]
            )}
        >
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    {urgencyIcons[alert.urgency as keyof typeof urgencyIcons]}
                </div>
                <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{alert.message}</h4>
                    <p className="text-sm text-gray-600 mb-3">{alert.detail}</p>
                    <div className="flex items-center gap-2">
                        <button className="text-sm font-medium text-mirror-500 hover:text-mirror-600">
                            {alert.suggestedAction}
                        </button>
                        {alert.expectedPrice && (
                            <span className="text-sm text-gray-400">
                                | 预计价格 ¥{alert.expectedPrice}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Product Card
function ProductCard({
    product,
    index,
    recommendation,
}: {
    product: typeof mockProducts[0];
    index: number;
    recommendation?: string;
}) {
    const hasDiscount = product.price < product.originalPrice;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-hover overflow-hidden group"
        >
            {/* Image */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-gray-300" />
                </div>

                {/* Discount Badge */}
                {hasDiscount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                )}

                {/* AI Recommended Badge */}
                {recommendation && (
                    <div className="absolute top-2 right-2 bg-mirror-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI推荐
                    </div>
                )}

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors">
                        加入购物车
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <div className="text-xs text-gray-400 mb-1">{product.brand}</div>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-mirror-500">
                        ¥{product.price}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through">
                            ¥{product.originalPrice}
                        </span>
                    )}
                </div>

                {/* Recommendation reason */}
                {recommendation && (
                    <p className="text-xs text-mirror-500 mt-2 pt-2 border-t border-gray-100">
                        {recommendation}
                    </p>
                )}
            </div>
        </motion.div>
    );
}

export default function CommercePage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);

    const priceData = mockPriceHistory[selectedProduct.id as keyof typeof mockPriceHistory] || [];
    const avgPrice = priceData.length > 0
        ? Math.round(priceData.reduce((sum, p) => sum + p.price, 0) / priceData.length)
        : selectedProduct.price;

    const filteredProducts = selectedCategory === 'all'
        ? mockProducts
        : mockProducts.filter(p => p.category === selectedCategory);

    const recommendations = [
        { product: mockProducts[0], reason: '适合您的干性肌肤，补水效果好' },
        { product: mockProducts[1], reason: '与当前流行的"拿铁妆"趋势匹配' },
        { product: mockProducts[4], reason: '根据您的眼型推荐的配色' },
    ];

    return (
        <div className="min-h-screen p-6">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">智能购物</h1>
                <p className="text-gray-600">AI 驱动的个性化产品推荐</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Smart Alerts */}
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Bell className="w-5 h-5 text-mirror-500" />
                                <h2 className="font-semibold text-gray-900">智能提醒</h2>
                            </div>
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                {mockShoppingAlerts.length} 条
                            </span>
                        </div>
                        <div className="space-y-3">
                            {mockShoppingAlerts.map((alert) => (
                                <AlertCard key={alert.id} alert={alert} />
                            ))}
                        </div>
                    </div>

                    {/* AI Recommendations */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-mirror-500" />
                                <h2 className="font-semibold text-gray-900">AI 推荐</h2>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {recommendations.map((rec, index) => (
                                <ProductCard
                                    key={rec.product.id}
                                    product={rec.product}
                                    index={index}
                                    recommendation={rec.reason}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Category Products */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-gray-900">浏览商品</h2>
                            <div className="flex items-center gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                                            selectedCategory === cat.id
                                                ? "bg-mirror-500 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        )}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {filteredProducts.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Price Tracking */}
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">价格追踪</h3>
                            <TrendingDown className="w-5 h-5 text-green-500" />
                        </div>

                        {/* Product Selector */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-mirror-100 to-accent-100 flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 text-mirror-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                    {selectedProduct.name}
                                </div>
                                <div className="text-xs text-gray-500">{selectedProduct.brand}</div>
                            </div>
                        </div>

                        {/* Price Chart */}
                        <div className="h-48 mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={priceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 10 }}
                                        tickFormatter={(value) => value.slice(5)}
                                    />
                                    <YAxis
                                        domain={['dataMin - 50', 'dataMax + 50']}
                                        tick={{ fontSize: 10 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #E5E5E5',
                                            borderRadius: '8px',
                                        }}
                                        formatter={(value: number) => [`¥${value}`, '价格']}
                                    />
                                    <ReferenceLine y={avgPrice} stroke="#9CA3AF" strokeDasharray="3 3" />
                                    <Line
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#E91E63"
                                        strokeWidth={2}
                                        dot={{ fill: '#E91E63', r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Price Stats */}
                        <div className="grid grid-cols-3 gap-2 text-center mb-4">
                            <div className="p-2 bg-gray-50 rounded-lg">
                                <div className="text-lg font-bold text-gray-900">¥{selectedProduct.price}</div>
                                <div className="text-xs text-gray-500">当前价格</div>
                            </div>
                            <div className="p-2 bg-green-50 rounded-lg">
                                <div className="text-lg font-bold text-green-600">
                                    ¥{priceData.length > 0 ? Math.min(...priceData.map(p => p.price)) : selectedProduct.price}
                                </div>
                                <div className="text-xs text-gray-500">历史最低</div>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-lg">
                                <div className="text-lg font-bold text-gray-900">¥{avgPrice}</div>
                                <div className="text-xs text-gray-500">平均价格</div>
                            </div>
                        </div>

                        {/* Sale Prediction */}
                        <div className="p-3 bg-amber-50 rounded-xl">
                            <div className="flex items-center gap-2 text-amber-600 font-medium text-sm mb-1">
                                <Clock className="w-4 h-4" />
                                促销预测
                            </div>
                            <p className="text-sm text-amber-700">
                                预计 618 大促期间将降至 ¥760，建议等待
                            </p>
                        </div>

                        <button className="w-full mt-4 btn-secondary">
                            设置降价提醒
                        </button>
                    </div>

                    {/* Trending Products */}
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">趋势热品</h3>
                            <Tag className="w-5 h-5 text-mirror-500" />
                        </div>
                        <div className="space-y-3">
                            {mockTrends.slice(0, 3).map((trend, index) => (
                                <div
                                    key={trend.id}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    <span className="text-xl">{trend.sourceIcon}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900">{trend.name}</div>
                                        <div className="text-xs text-gray-500">{trend.hashtag}</div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
