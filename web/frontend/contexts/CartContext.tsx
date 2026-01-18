'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Types
export interface CartProduct {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
}

export interface CartItem {
    id: string;
    productId: string;
    product: CartProduct;
    quantity: number;
    addedAt: string;
}

export interface Coupon {
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    minAmount?: number;
}

interface CartState {
    items: CartItem[];
    appliedCoupon: Coupon | null;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: { product: CartProduct; quantity: number } }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'APPLY_COUPON'; payload: Coupon }
    | { type: 'REMOVE_COUPON' }
    | { type: 'LOAD_CART'; payload: CartState };

interface CartContextType {
    items: CartItem[];
    appliedCoupon: Coupon | null;
    itemCount: number;
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    addItem: (product: CartProduct, quantity?: number) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    applyCoupon: (code: string) => boolean;
    removeCoupon: () => void;
    isInCart: (productId: string) => boolean;
}

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(
                (item) => item.product.id === action.payload.product.id
            );
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === existingItem.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            }
            const newItem: CartItem = {
                id: Math.random().toString(36).substr(2, 9),
                productId: action.payload.product.id,
                product: action.payload.product,
                quantity: action.payload.quantity,
                addedAt: new Date().toISOString(),
            };
            return { ...state, items: [...state.items, newItem] };
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };
        case 'UPDATE_QUANTITY':
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== action.payload.id),
                };
            }
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        case 'CLEAR_CART':
            return { items: [], appliedCoupon: null };
        case 'APPLY_COUPON':
            return { ...state, appliedCoupon: action.payload };
        case 'REMOVE_COUPON':
            return { ...state, appliedCoupon: null };
        case 'LOAD_CART':
            return action.payload;
        default:
            return state;
    }
}

// Mock coupons
const VALID_COUPONS: Record<string, Coupon> = {
    'WELCOME10': { code: 'WELCOME10', type: 'percentage', value: 10 },
    'SAVE50': { code: 'SAVE50', type: 'fixed', value: 50, minAmount: 299 },
    'VIP20': { code: 'VIP20', type: 'percentage', value: 20, minAmount: 500 },
};

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        appliedCoupon: null,
    });

    // Load cart from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('agenticmirror_cart');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                dispatch({ type: 'LOAD_CART', payload: parsed });
            } catch (e) {
                console.error('Failed to load cart:', e);
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('agenticmirror_cart', JSON.stringify(state));
    }, [state]);

    // Calculations
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const shipping = subtotal >= 299 ? 0 : 15;

    let discount = 0;
    if (state.appliedCoupon) {
        if (state.appliedCoupon.type === 'percentage') {
            discount = Math.round(subtotal * (state.appliedCoupon.value / 100));
        } else {
            discount = state.appliedCoupon.value;
        }
    }

    const total = Math.max(0, subtotal + shipping - discount);

    // Actions
    const addItem = (product: CartProduct, quantity = 1) => {
        dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    };

    const removeItem = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const applyCoupon = (code: string): boolean => {
        const coupon = VALID_COUPONS[code.toUpperCase()];
        if (!coupon) return false;
        if (coupon.minAmount && subtotal < coupon.minAmount) return false;
        dispatch({ type: 'APPLY_COUPON', payload: coupon });
        return true;
    };

    const removeCoupon = () => {
        dispatch({ type: 'REMOVE_COUPON' });
    };

    const isInCart = (productId: string): boolean => {
        return state.items.some((item) => item.product.id === productId);
    };

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                appliedCoupon: state.appliedCoupon,
                itemCount,
                subtotal,
                shipping,
                discount,
                total,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                applyCoupon,
                removeCoupon,
                isInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
