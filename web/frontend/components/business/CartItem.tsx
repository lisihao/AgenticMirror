'use client';

import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/components/ui/Toast';

interface CartItemProps {
    item: CartItemType;
    onQuantityChange: (quantity: number) => void;
    onRemove: () => void;
}

export function CartItemComponent({ item, onQuantityChange, onRemove }: CartItemProps) {
    const { addFavorite, isFavorite } = useFavorites();
    const toast = useToast();

    const handleMoveToFavorites = () => {
        if (!isFavorite('product', item.product.id)) {
            addFavorite('product', item.product.id);
            toast.success('已移入收藏');
        }
        onRemove();
    };

    const subtotal = item.product.price * item.quantity;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl"
        >
            {/* Checkbox & Image */}
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    defaultChecked
                    className="mt-6 w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                />
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="text-xs text-gray-500">{item.product.brand}</div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                            {item.product.name}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-red-500">¥{subtotal}</div>
                        {item.quantity > 1 && (
                            <div className="text-xs text-gray-400">
                                ¥{item.product.price} x {item.quantity}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onQuantityChange(item.quantity - 1)}
                            className={cn(
                                'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                                item.quantity <= 1
                                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                            )}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium text-gray-900 dark:text-gray-100">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onQuantityChange(item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleMoveToFavorites}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-amber-600 transition-colors"
                        >
                            <Heart className="w-4 h-4" />
                            <span>移入收藏</span>
                        </button>
                        <button
                            onClick={onRemove}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>删除</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
