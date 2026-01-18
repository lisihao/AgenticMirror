'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Bot, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCart, CartProduct } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/components/ui/Toast';

interface ProductCardProps {
    product: CartProduct & {
        rating?: number;
        reviewCount?: number;
        aiReason?: string;
        matchScore?: number;
        colorMatch?: number;
        tags?: string[];
    };
    variant?: 'grid' | 'list' | 'compact';
    showAIReason?: boolean;
    showMatchScore?: boolean;
    onClick?: () => void;
}

export function ProductCard({
    product,
    variant = 'grid',
    showAIReason = false,
    showMatchScore = false,
    onClick,
}: ProductCardProps) {
    const { addItem, isInCart } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();
    const toast = useToast();
    const [imageLoaded, setImageLoaded] = useState(false);

    const inCart = isInCart(product.id);
    const isFav = isFavorite('product', product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!inCart) {
            addItem(product);
            toast.success('已加入购物车');
        }
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite('product', product.id);
        toast.success(isFav ? '已取消收藏' : '已添加收藏');
    };

    if (variant === 'compact') {
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl cursor-pointer"
                onClick={onClick}
            >
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">{product.brand}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {product.name}
                    </div>
                    <div className="text-sm font-bold text-red-500">¥{product.price}</div>
                </div>
            </motion.div>
        );
    }

    if (variant === 'list') {
        return (
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl cursor-pointer"
                onClick={onClick}
            >
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <ShoppingCart className="w-10 h-10 text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="text-xs text-gray-500">{product.brand}</div>
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                                {product.name}
                            </div>
                        </div>
                        <button
                            onClick={handleToggleFavorite}
                            className={cn(
                                'p-2 rounded-lg transition-colors',
                                isFav
                                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                                    : 'text-gray-400 hover:text-red-500'
                            )}
                        >
                            <Heart className={cn('w-5 h-5', isFav && 'fill-current')} />
                        </button>
                    </div>
                    {product.rating && (
                        <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {product.rating} ({product.reviewCount})
                            </span>
                        </div>
                    )}
                    {showAIReason && product.aiReason && (
                        <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-xs text-amber-700 dark:text-amber-300 flex items-start gap-1">
                            <Bot className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span>{product.aiReason}</span>
                        </div>
                    )}
                    <div className="flex items-center justify-between mt-3">
                        <div>
                            <span className="text-lg font-bold text-red-500">¥{product.price}</span>
                            {product.originalPrice && (
                                <span className="ml-2 text-sm text-gray-400 line-through">
                                    ¥{product.originalPrice}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className={cn(
                                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                                inCart
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                            )}
                        >
                            {inCart ? (
                                <span className="flex items-center gap-1">
                                    <Check className="w-4 h-4" /> 已添加
                                </span>
                            ) : (
                                '加入购物车'
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Grid variant (default)
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
            onClick={onClick}
        >
            {/* Image */}
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingCart className="w-16 h-16 text-gray-200 dark:text-gray-700" />
                </div>
                {/* Match Score */}
                {showMatchScore && product.matchScore && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {product.matchScore}%
                    </div>
                )}
                {/* Discount */}
                {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                )}
                {/* Favorite Button */}
                <button
                    onClick={handleToggleFavorite}
                    className={cn(
                        'absolute bottom-3 right-3 p-2 rounded-full transition-all',
                        isFav
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-red-500'
                    )}
                >
                    <Heart className={cn('w-4 h-4', isFav && 'fill-current')} />
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                <div className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
                    {product.name}
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                        {product.tags.slice(0, 2).map((tag, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* AI Reason */}
                {showAIReason && product.aiReason && (
                    <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-xs text-amber-700 dark:text-amber-300 mb-3 flex items-start gap-1">
                        <Bot className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{product.aiReason}</span>
                    </div>
                )}

                {/* Price & CTA */}
                <div className="flex items-end justify-between">
                    <div>
                        <span className="text-lg font-bold text-red-500">¥{product.price}</span>
                        {product.originalPrice && (
                            <span className="ml-1 text-sm text-gray-400 line-through">
                                ¥{product.originalPrice}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className={cn(
                            'p-2 rounded-lg transition-all',
                            inCart
                                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50'
                        )}
                    >
                        {inCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
