'use client';

import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    clickable?: boolean;
    children: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            variant = 'default',
            padding = 'md',
            hoverable = false,
            clickable = false,
            children,
            className,
            onClick,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'rounded-2xl transition-all duration-200';

        const variants = {
            default: 'bg-white dark:bg-gray-900',
            elevated: 'bg-white dark:bg-gray-900 shadow-lg',
            outlined: 'bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800',
        };

        const paddings = {
            none: '',
            sm: 'p-3',
            md: 'p-4',
            lg: 'p-6',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    paddings[padding],
                    hoverable && 'hover:shadow-md hover:-translate-y-0.5',
                    clickable && 'cursor-pointer active:scale-[0.99] hover:scale-[1.01]',
                    className
                )}
                onClick={onClick}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ children, className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center justify-between mb-4', className)}
            {...props}
        >
            {children}
        </div>
    )
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ children, className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn('font-bold text-gray-800 dark:text-gray-100', className)}
            {...props}
        >
            {children}
        </h3>
    )
);

CardTitle.displayName = 'CardTitle';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={cn('', className)} {...props}>
            {children}
        </div>
    )
);

CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ children, className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('mt-4 pt-4 border-t border-gray-100 dark:border-gray-800', className)}
            {...props}
        >
            {children}
        </div>
    )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
export type { CardProps };
