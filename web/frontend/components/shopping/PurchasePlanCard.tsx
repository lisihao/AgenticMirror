'use client';

import { motion } from 'framer-motion';
import {
    Calendar,
    Package,
    TrendingDown,
    Lightbulb,
    ChevronRight,
    Clock,
    Tag,
    Gift,
    Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
    PurchasePlanItem,
    SmartPurchasePlan,
    priorityConfig,
    PlanOptimization,
    TimelineEvent,
} from '@/lib/constants/shoppingData';

interface PurchasePlanCardProps {
    plan: SmartPurchasePlan;
    onItemClick?: (productId: string) => void;
    className?: string;
}

export function PurchasePlanCard({
    plan,
    onItemClick,
    className,
}: PurchasePlanCardProps) {
    return (
        <div className={cn('space-y-6', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            AI 智能购买计划
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            生成于 {new Date(plan.generatedAt).toLocaleDateString('zh-CN')}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">预计可节省</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ¥{plan.totalSavings}
                    </div>
                </div>
            </div>

            {/* Priority List */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Package className="w-4 h-4 text-amber-500" />
                    购买优先级
                </h3>
                {plan.items.map((item, index) => (
                    <PlanItemCard
                        key={item.productId}
                        item={item}
                        index={index}
                        onClick={() => onItemClick?.(item.productId)}
                    />
                ))}
            </div>

            {/* Timeline */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    购买时间线
                </h3>
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

                    {/* Timeline Events */}
                    <div className="space-y-4">
                        {plan.timeline.map((event, index) => (
                            <TimelineEventCard
                                key={index}
                                event={event}
                                isFirst={index === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Optimizations */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    AI 省钱建议
                </h3>
                <div className="space-y-2">
                    {plan.optimizations.map((opt, index) => (
                        <OptimizationCard key={index} optimization={opt} />
                    ))}
                </div>
            </div>

            {/* AI Insights */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI 洞察
                </h3>
                <ul className="space-y-2">
                    {plan.aiInsights.map((insight, index) => (
                        <li
                            key={index}
                            className="text-sm text-blue-600 dark:text-blue-300 flex items-start gap-2"
                        >
                            <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {insight}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// Plan Item Card
interface PlanItemCardProps {
    item: PurchasePlanItem;
    index: number;
    onClick?: () => void;
}

function PlanItemCard({ item, index, onClick }: PlanItemCardProps) {
    const priorityStyle = priorityConfig[item.priority];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={onClick}
            className={cn(
                'p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md',
                priorityStyle.bgColor,
                item.priority === 'urgent'
                    ? 'border-red-300 dark:border-red-700'
                    : item.priority === 'high'
                    ? 'border-amber-300 dark:border-amber-700'
                    : 'border-gray-200 dark:border-gray-700'
            )}
        >
            <div className="flex items-start gap-3">
                {/* Priority Indicator */}
                <div className={cn(
                    'w-3 h-3 rounded-full mt-1.5 flex-shrink-0',
                    priorityStyle.dotColor
                )} />

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={cn('text-xs font-medium px-2 py-0.5 rounded', priorityStyle.bgColor, priorityStyle.color)}>
                            {priorityStyle.label}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {item.productName}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {item.reason}
                    </p>

                    {/* Inventory & Timing */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        {item.inventoryRemaining !== undefined && (
                            <span className="flex items-center gap-1">
                                <Package className="w-3 h-3" />
                                库存 {item.inventoryRemaining}%
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.daysUntilNeeded} 天后需要
                        </span>
                    </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">建议价格</div>
                    <div className="text-lg font-bold text-red-500">
                        ¥{item.estimatedPrice}
                    </div>
                    {item.currentPrice > item.estimatedPrice && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                            省 ¥{item.currentPrice - item.estimatedPrice}
                        </div>
                    )}
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
        </motion.div>
    );
}

// Timeline Event Card
interface TimelineEventCardProps {
    event: TimelineEvent;
    isFirst: boolean;
}

function TimelineEventCard({ event, isFirst }: TimelineEventCardProps) {
    const dateObj = new Date(event.date);
    const isUpcoming = event.isUpcoming;

    return (
        <div className="relative pl-10">
            {/* Dot */}
            <div className={cn(
                'absolute left-2 w-5 h-5 rounded-full border-2 flex items-center justify-center',
                isUpcoming
                    ? 'bg-amber-500 border-amber-500'
                    : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600'
            )}>
                {isUpcoming && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                )}
            </div>

            {/* Content */}
            <div className={cn(
                'p-3 rounded-xl',
                isUpcoming
                    ? 'bg-amber-50 dark:bg-amber-900/20'
                    : 'bg-gray-50 dark:bg-gray-800'
            )}>
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            'text-sm font-medium',
                            isUpcoming ? 'text-amber-700 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'
                        )}>
                            {dateObj.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
                        </span>
                        {event.event && (
                            <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded">
                                {event.event}
                            </span>
                        )}
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        ¥{event.totalCost}
                    </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    {event.items.join('、')}
                </div>
            </div>
        </div>
    );
}

// Optimization Card
function OptimizationCard({ optimization }: { optimization: PlanOptimization }) {
    const typeIcons = {
        timing: Clock,
        bundle: Gift,
        coupon: Tag,
    };
    const Icon = typeIcons[optimization.type];

    return (
        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <Icon className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
                <p className="text-sm text-green-700 dark:text-green-400">
                    {optimization.description}
                </p>
            </div>
            <div className="text-sm font-bold text-green-600 dark:text-green-400">
                -¥{optimization.savings}
            </div>
        </div>
    );
}
