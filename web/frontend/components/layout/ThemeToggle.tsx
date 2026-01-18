'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts';
import { cn } from '@/lib/utils/cn';

interface ThemeToggleProps {
    variant?: 'button' | 'dropdown';
    showLabel?: boolean;
    className?: string;
}

export function ThemeToggle({ variant = 'button', showLabel = false, className }: ThemeToggleProps) {
    const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

    if (variant === 'button') {
        return (
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={cn(
                    'p-2 rounded-xl transition-colors',
                    'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
                    'text-gray-600 dark:text-gray-400',
                    className
                )}
                aria-label="Toggle theme"
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: resolvedTheme === 'dark' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {resolvedTheme === 'dark' ? (
                        <Moon className="w-5 h-5" />
                    ) : (
                        <Sun className="w-5 h-5" />
                    )}
                </motion.div>
            </motion.button>
        );
    }

    const options = [
        { value: 'light', icon: Sun, label: '浅色' },
        { value: 'dark', icon: Moon, label: '深色' },
        { value: 'system', icon: Monitor, label: '跟随系统' },
    ] as const;

    return (
        <div className={cn('flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl', className)}>
            {options.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;
                return (
                    <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={cn(
                            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all',
                            isActive
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        {showLabel && <span>{option.label}</span>}
                    </button>
                );
            })}
        </div>
    );
}
