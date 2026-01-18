'use client';

import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
    variant?: 'text' | 'circular' | 'rectangular';
    width?: number | string;
    height?: number | string;
    animation?: 'pulse' | 'wave' | 'none';
    className?: string;
}

const Skeleton = ({
    variant = 'rectangular',
    width,
    height,
    animation = 'pulse',
    className,
}: SkeletonProps) => {
    const baseStyles = 'bg-gray-200 dark:bg-gray-700';

    const variants = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-xl',
    };

    const animations = {
        pulse: 'animate-pulse',
        wave: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%]',
        none: '',
    };

    const style: React.CSSProperties = {
        width: width ?? (variant === 'text' ? '100%' : undefined),
        height: height ?? (variant === 'text' ? '1em' : undefined),
    };

    return (
        <div
            className={cn(
                baseStyles,
                variants[variant],
                animations[animation],
                className
            )}
            style={style}
        />
    );
};

// Preset Skeletons
const SkeletonCard = ({ className }: { className?: string }) => (
    <div className={cn('space-y-3', className)}>
        <Skeleton variant="rectangular" height={160} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
        <div className="flex gap-2">
            <Skeleton variant="rectangular" width={60} height={24} />
            <Skeleton variant="rectangular" width={60} height={24} />
        </div>
    </div>
);

const SkeletonList = ({ count = 3, className }: { count?: number; className?: string }) => (
    <div className={cn('space-y-4', className)}>
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex gap-4">
                <Skeleton variant="rectangular" width={80} height={80} />
                <div className="flex-1 space-y-2">
                    <Skeleton variant="text" width="70%" />
                    <Skeleton variant="text" width="50%" />
                    <Skeleton variant="text" width="30%" />
                </div>
            </div>
        ))}
    </div>
);

export { Skeleton, SkeletonCard, SkeletonList };
export type { SkeletonProps };
