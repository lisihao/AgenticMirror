'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Types
export type FavoriteType = 'product' | 'style' | 'tutorial';

export interface FavoriteItem {
    id: string;
    type: FavoriteType;
    itemId: string;
    addedAt: string;
}

interface FavoritesState {
    items: FavoriteItem[];
}

type FavoritesAction =
    | { type: 'ADD_FAVORITE'; payload: { type: FavoriteType; itemId: string } }
    | { type: 'REMOVE_FAVORITE'; payload: string }
    | { type: 'LOAD_FAVORITES'; payload: FavoriteItem[] };

interface FavoritesContextType {
    items: FavoriteItem[];
    addFavorite: (type: FavoriteType, itemId: string) => void;
    removeFavorite: (id: string) => void;
    toggleFavorite: (type: FavoriteType, itemId: string) => void;
    isFavorite: (type: FavoriteType, itemId: string) => boolean;
    getFavoriteId: (type: FavoriteType, itemId: string) => string | undefined;
    getProductFavorites: () => FavoriteItem[];
    getStyleFavorites: () => FavoriteItem[];
    getTutorialFavorites: () => FavoriteItem[];
}

// Reducer
function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
    switch (action.type) {
        case 'ADD_FAVORITE': {
            const exists = state.items.some(
                (item) => item.type === action.payload.type && item.itemId === action.payload.itemId
            );
            if (exists) return state;

            const newItem: FavoriteItem = {
                id: Math.random().toString(36).substr(2, 9),
                type: action.payload.type,
                itemId: action.payload.itemId,
                addedAt: new Date().toISOString(),
            };
            return { items: [...state.items, newItem] };
        }
        case 'REMOVE_FAVORITE':
            return {
                items: state.items.filter((item) => item.id !== action.payload),
            };
        case 'LOAD_FAVORITES':
            return { items: action.payload };
        default:
            return state;
    }
}

// Context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider
export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(favoritesReducer, { items: [] });

    // Load favorites from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('agenticmirror_favorites');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                dispatch({ type: 'LOAD_FAVORITES', payload: parsed });
            } catch (e) {
                console.error('Failed to load favorites:', e);
            }
        }
    }, []);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem('agenticmirror_favorites', JSON.stringify(state.items));
    }, [state.items]);

    // Actions
    const addFavorite = (type: FavoriteType, itemId: string) => {
        dispatch({ type: 'ADD_FAVORITE', payload: { type, itemId } });
    };

    const removeFavorite = (id: string) => {
        dispatch({ type: 'REMOVE_FAVORITE', payload: id });
    };

    const isFavorite = (type: FavoriteType, itemId: string): boolean => {
        return state.items.some((item) => item.type === type && item.itemId === itemId);
    };

    const getFavoriteId = (type: FavoriteType, itemId: string): string | undefined => {
        return state.items.find((item) => item.type === type && item.itemId === itemId)?.id;
    };

    const toggleFavorite = (type: FavoriteType, itemId: string) => {
        const favoriteId = getFavoriteId(type, itemId);
        if (favoriteId) {
            removeFavorite(favoriteId);
        } else {
            addFavorite(type, itemId);
        }
    };

    const getProductFavorites = () => state.items.filter((item) => item.type === 'product');
    const getStyleFavorites = () => state.items.filter((item) => item.type === 'style');
    const getTutorialFavorites = () => state.items.filter((item) => item.type === 'tutorial');

    return (
        <FavoritesContext.Provider
            value={{
                items: state.items,
                addFavorite,
                removeFavorite,
                toggleFavorite,
                isFavorite,
                getFavoriteId,
                getProductFavorites,
                getStyleFavorites,
                getTutorialFavorites,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
