'use client';

import { cn } from '@/lib/utils/cn';
import { Platform, platformInfo } from '@/lib/constants/shoppingData';

interface PlatformBadgeProps {
    platform: Platform;
    size?: 'sm' | 'md' | 'lg';
    showName?: boolean;
    className?: string;
}

export function PlatformBadge({
    platform,
    size = 'md',
    showName = true,
    className,
}: PlatformBadgeProps) {
    const info = platformInfo[platform];

    const sizes = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-1',
        lg: 'text-base px-3 py-1.5',
    };

    const iconSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-lg font-medium',
                'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
                sizes[size],
                className
            )}
            style={{
                borderLeft: `3px solid ${info.color}`,
            }}
        >
            <span className={iconSizes[size]}>{info.icon}</span>
            {showName && <span>{info.name}</span>}
        </span>
    );
}

interface PlatformIconProps {
    platform: Platform;
    size?: number;
    className?: string;
}

export function PlatformIcon({ platform, size = 24, className }: PlatformIconProps) {
    const info = platformInfo[platform];

    return (
        <span
            className={cn(
                'inline-flex items-center justify-center rounded-lg',
                className
            )}
            style={{
                width: size,
                height: size,
                backgroundColor: `${info.color}20`,
                fontSize: size * 0.6,
            }}
        >
            {info.icon}
        </span>
    );
}
