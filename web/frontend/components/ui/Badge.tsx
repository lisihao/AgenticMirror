'use client';

import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
    size?: 'sm' | 'md';
    dot?: boolean;
    children?: ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ variant = 'default', size = 'md', dot = false, children, className, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center font-medium rounded-full';

        const variants = {
            default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
            success: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
            warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
            danger: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
            info: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
            primary: 'bg-amber-500 text-white',
        };

        const sizes = {
            sm: 'px-2 py-0.5 text-xs',
            md: 'px-2.5 py-1 text-xs',
        };

        const dotColors = {
            default: 'bg-gray-400',
            success: 'bg-green-500',
            warning: 'bg-amber-500',
            danger: 'bg-red-500',
            info: 'bg-blue-500',
            primary: 'bg-white',
        };

        return (
            <span
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {dot && (
                    <span
                        className={cn('w-1.5 h-1.5 rounded-full mr-1.5', dotColors[variant])}
                    />
                )}
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };
