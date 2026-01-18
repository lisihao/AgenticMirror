'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    Heart,
    Share2,
    Star,
    ShoppingCart,
    Zap,
    Bot,
    CheckCircle,
    Truck,
    ShieldCheck,
    RotateCcw,
    ChevronRight,
    Package,
    Sparkles,
    TrendingDown,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
    PriceHistoryChart,
    PriceComparisonCard,
    AIBuyAdvice,
} from '@/components/shopping';
import {
    mockPlatformPrices,
    mockPriceHistory,
    mockPriceStatistics,
    mockPricePrediction,
    mockAIAdvice,
} from '@/lib/constants/shoppingData';

// Mock product data
const mockProduct = {
    id: 'product-1',
    name: '兰蔻小黑瓶精华肌底液',
    nameEn: 'Advanced Genifique Youth Activating Serum',
    brand: 'Lancome',
    category: 'skincare',
    price: 760,
    originalPrice: 980,
    rating: 4.9,
    reviewCount: 12847,
    salesCount: '50万+',
    description: '兰蔻明星产品，富含益生菌精粹，帮助肌肤焕发年轻光彩。独特的滴管设计，精准用量，每一滴都蕴含强大修护力。',
    specifications: [
        { label: '容量', options: ['30ml', '50ml', '75ml', '100ml'], selected: '50ml' },
    ],
    images: ['/product-1.jpg', '/product-2.jpg', '/product-3.jpg'],
    features: [
        { icon: Truck, text: '顺丰包邮' },
        { icon: ShieldCheck, text: '正品保证' },
        { icon: RotateCcw, text: '7天无理由' },
    ],
    aiAnalysis: {
        colorMatch: 96,
        skinMatch: 94,
        overallScore: 95,
        reason: '这款精华非常适合您的混合肌肤，益生菌成分能够改善您T区出油的问题，同时为两颊提供充足水分。建议在早晚护肤流程中使用。',
    },
    ingredients: [
        { name: '益生菌精粹', benefit: '强化肌肤屏障' },
        { name: '玻尿酸', benefit: '深层补水' },
        { name: '维生素E', benefit: '抗氧化' },
        { name: '腺苷', benefit: '抗皱紧致' },
    ],
    reviews: [
        { id: '1', user: '小美', rating: 5, content: '用了一个月，皮肤真的变好了！', date: '2024-01-15' },
        { id: '2', user: '护肤达人', rating: 5, content: '回购无数次，永远的真爱！', date: '2024-01-14' },
        { id: '3', user: '敏感肌用户', rating: 4, content: '敏感肌也能用，很温和', date: '2024-01-13' },
    ],
    relatedProducts: [
        { id: '2', name: 'SK-II神仙水', brand: 'SK-II', price: 1150 },
        { id: '3', name: '雅诗兰黛眼霜', brand: 'Estee Lauder', price: 520 },
        { id: '4', name: 'La Mer面霜', brand: 'La Mer', price: 2680 },
    ],
};

export default function ProductDetailPage() {
    const params = useParams();
    const toast = useToast();
    const { addItem, isInCart } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();

    const [selectedSpec, setSelectedSpec] = useState<Record<string, string>>({
        容量: '50ml',
    });
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'detail' | 'ingredients' | 'reviews' | 'ai_pricing' | 'tutorial'>('detail');
    const [selectedImage, setSelectedImage] = useState(0);

    const product = mockProduct;
    const inCart = isInCart(product.id);
    const isFav = isFavorite('product', product.id);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images[0],
            category: product.category,
        }, quantity);
        toast.success('已加入购物车');
    };

    const handleBuyNow = () => {
        handleAddToCart();
        // Navigate to cart
        window.location.href = '/demo/cart';
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/demo/commerce" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                toggleFavorite('product', product.id);
                                toast.success(isFav ? '已取消收藏' : '已添加收藏');
                            }}
                            className={cn(
                                'p-2 rounded-lg transition-colors',
                                isFav
                                    ? 'bg-red-50 text-red-500 dark:bg-red-900/20'
                                    : 'hover:bg-gray-100 text-gray-600 dark:hover:bg-gray-800 dark:text-gray-400'
                            )}
                        >
                            <Heart className={cn('w-5 h-5', isFav && 'fill-current')} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white dark:bg-gray-900 rounded-2xl overflow-hidden flex items-center justify-center">
                            <Package className="w-32 h-32 text-gray-200 dark:text-gray-700" />
                        </div>
                        <div className="flex gap-2">
                            {[0, 1, 2].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={cn(
                                        'w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center transition-all',
                                        selectedImage === i
                                            ? 'ring-2 ring-amber-500'
                                            : 'bg-gray-100 dark:bg-gray-800'
                                    )}
                                >
                                    <Package className="w-8 h-8 text-gray-300" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Brand & Name */}
                        <div>
                            <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                                {product.name}
                            </h1>
                            <div className="text-sm text-gray-400">{product.nameEn}</div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-amber-400 fill-current" />
                                <span className="font-bold text-gray-900 dark:text-gray-100">{product.rating}</span>
                                <span className="text-gray-400">({product.reviewCount})</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500">销量 {product.salesCount}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-bold text-red-500">¥{product.price}</span>
                            <span className="text-lg text-gray-400 line-through">¥{product.originalPrice}</span>
                            <Badge variant="danger" size="sm">
                                省¥{product.originalPrice - product.price}
                            </Badge>
                        </div>

                        {/* AI Analysis */}
                        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                <span className="font-bold text-gray-800 dark:text-gray-200">AI 匹配分析</span>
                            </div>
                            <div className="flex gap-4 mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <span className="text-sm font-bold text-green-600">{product.aiAnalysis.colorMatch}%</span>
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">肤色匹配</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <span className="text-sm font-bold text-blue-600">{product.aiAnalysis.skinMatch}%</span>
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">肤质适合</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                        <span className="text-sm font-bold text-amber-600">{product.aiAnalysis.overallScore}%</span>
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">综合推荐</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300">
                                <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{product.aiAnalysis.reason}</span>
                            </div>
                        </div>

                        {/* Specifications */}
                        {product.specifications.map((spec) => (
                            <div key={spec.label}>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {spec.label}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {spec.options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => setSelectedSpec({ ...selectedSpec, [spec.label]: option })}
                                            className={cn(
                                                'px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                                                selectedSpec[spec.label] === option
                                                    ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                                                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                                            )}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Quantity */}
                        <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">数量</div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-medium text-gray-900 dark:text-gray-100">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="flex gap-6 py-4 border-t border-b border-gray-100 dark:border-gray-800">
                            {product.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <feature.icon className="w-4 h-4 text-amber-500" />
                                    <span>{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleAddToCart}
                                icon={inCart ? <CheckCircle className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                                className="flex-1"
                            >
                                {inCart ? '已在购物车' : '加入购物车'}
                            </Button>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleBuyNow}
                                icon={<Zap className="w-5 h-5" />}
                                className="flex-1"
                            >
                                立即购买
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-12">
                    <div className="flex gap-6 border-b border-gray-200 dark:border-gray-800">
                        {[
                            { id: 'detail', label: '商品详情' },
                            { id: 'ingredients', label: '成分表' },
                            { id: 'reviews', label: `用户评价 (${product.reviewCount})` },
                            { id: 'ai_pricing', label: 'AI比价分析', highlight: true },
                            { id: 'tutorial', label: '使用教程' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={cn(
                                    'pb-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-1',
                                    activeTab === tab.id
                                        ? 'border-amber-500 text-amber-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                )}
                            >
                                {'highlight' in tab && tab.highlight && (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                {tab.label}
                                {'highlight' in tab && tab.highlight && (
                                    <span className="px-1.5 py-0.5 text-xs bg-amber-500 text-white rounded-full">NEW</span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="py-8">
                        {activeTab === 'detail' && (
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
                            </div>
                        )}

                        {activeTab === 'ingredients' && (
                            <div className="grid md:grid-cols-2 gap-4">
                                {product.ingredients.map((ing, i) => (
                                    <div key={i} className="p-4 bg-white dark:bg-gray-900 rounded-xl">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">{ing.name}</div>
                                        <div className="text-sm text-gray-500">{ing.benefit}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-4">
                                {product.reviews.map((review) => (
                                    <div key={review.id} className="p-4 bg-white dark:bg-gray-900 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-amber-600">{review.user[0]}</span>
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-gray-100">{review.user}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: review.rating }).map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">{review.content}</p>
                                        <div className="text-xs text-gray-400 mt-2">{review.date}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'ai_pricing' && (
                            <div className="space-y-8">
                                {/* AI Buy Advice */}
                                {mockAIAdvice[product.id] && (
                                    <AIBuyAdvice
                                        advice={mockAIAdvice[product.id]}
                                        productName={product.name}
                                        onAddToCart={handleAddToCart}
                                        onSetAlert={() => toast.info('已设置价格提醒')}
                                    />
                                )}

                                {/* Price History Chart */}
                                {mockPriceHistory[product.id] && mockPriceStatistics[product.id] && (
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                            <TrendingDown className="w-5 h-5 text-amber-500" />
                                            价格走势分析
                                        </h3>
                                        <PriceHistoryChart
                                            history={mockPriceHistory[product.id]}
                                            statistics={mockPriceStatistics[product.id]}
                                            prediction={mockPricePrediction[product.id]}
                                        />
                                    </div>
                                )}

                                {/* Cross-Platform Comparison */}
                                {mockPlatformPrices[product.id] && (
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                                        <PriceComparisonCard prices={mockPlatformPrices[product.id]} />
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'tutorial' && (
                            <div className="text-center py-12">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">使用教程正在制作中...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">相似推荐</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {product.relatedProducts.map((p) => (
                            <Link
                                key={p.id}
                                href={`/demo/product/${p.id}`}
                                className="bg-white dark:bg-gray-900 rounded-xl p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-3">
                                    <Package className="w-12 h-12 text-gray-300" />
                                </div>
                                <div className="text-xs text-gray-500">{p.brand}</div>
                                <div className="font-medium text-gray-900 dark:text-gray-100 truncate">{p.name}</div>
                                <div className="text-red-500 font-bold mt-1">¥{p.price}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
