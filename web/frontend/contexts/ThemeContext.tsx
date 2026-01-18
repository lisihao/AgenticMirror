'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
    const [mounted, setMounted] = useState(false);

    // Load theme from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('agenticmirror_theme') as Theme | null;
        if (saved && ['light', 'dark', 'system'].includes(saved)) {
            setThemeState(saved);
        }
        setMounted(true);
    }, []);

    // Resolve theme based on system preference
    useEffect(() => {
        const updateResolvedTheme = () => {
            if (theme === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
                setResolvedTheme(systemTheme);
            } else {
                setResolvedTheme(theme);
            }
        };

        updateResolvedTheme();

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => {
            if (theme === 'system') {
                updateResolvedTheme();
            }
        };
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, [theme]);

    // Apply theme to document
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedTheme);
        root.setAttribute('data-theme', resolvedTheme);
    }, [resolvedTheme, mounted]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('agenticmirror_theme', newTheme);
    };

    const toggleTheme = () => {
        const next = resolvedTheme === 'light' ? 'dark' : 'light';
        setTheme(next);
    };

    // Prevent flash
    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                resolvedTheme,
                setTheme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
