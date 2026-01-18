'use client';

import { motion } from 'framer-motion';
import {
    Bot,
    CheckCircle,
    Clock,
    AlertTriangle,
    TrendingDown,
    Bell,
    ShoppingCart,
    Package,
    Gauge,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
    AIBuyAdvice as AIBuyAdviceType,
    recommendationConfig,
} from '@/lib/constants/shoppingData';

interface AIBuyAdviceProps {
    advice: AIBuyAdviceType;
    productName?: string;
    onAddToCart?: () => void;
    onSetAlert?: () => void;
    className?: string;
}

export function AIBuyAdvice({
    advice,
    productName,
    onAddToCart,
    onSetAlert,
    className,
}: AIBuyAdviceProps) {
    const config = recommendationConfig[advice.recommendation];

    return (
        <div className={cn('space-y-4', className)}>
            {/* Main Recommendation Card */}
            <div className={cn(
                'p-4 rounded-xl border-2',
                config.bgColor,
                advice.recommendation === 'good_time' || advice.recommendation === 'buy_now'
                    ? 'border-green-300 dark:border-green-700'
                    : advice.recommendation === 'urgent'
                    ? 'border-red-300 dark:border-red-700'
                    : advice.recommendation === 'wait_for_sale'
                    ? 'border-amber-300 dark:border-amber-700'
                    : 'border-gray-200 dark:border-gray-700'
            )}>
                <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
                        advice.recommendation === 'good_time' || advice.recommendation === 'buy_now'
                            ? 'bg-green-100 dark:bg-green-900/50'
                            : advice.recommendation === 'urgent'
                            ? 'bg-red-100 dark:bg-red-900/50'
                            : advice.recommendation === 'wait_for_sale'
                            ? 'bg-amber-100 dark:bg-amber-900/50'
                            : 'bg-gray-100 dark:bg-gray-800'
                    )}>
                        {config.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Bot className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                AI 购买建议
                            </span>
                        </div>
                        <h3 className={cn('text-xl font-bold', config.color)}>
                            {config.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {config.description}
                        </p>
                    </div>

                    {/* Confidence */}
                    <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">置信度</div>
                        <div className={cn(
                            'text-2xl font-bold',
                            advice.confidence >= 80 ? 'text-green-600' :
                            advice.confidence >= 60 ? 'text-amber-600' : 'text-gray-600'
                        )}>
                            {advice.confidence}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Factor Scores */}
            <div className="grid grid-cols-3 gap-3">
                <FactorCard
                    label="价格评分"
                    score={advice.factors.priceScore}
                    icon={<TrendingDown className="w-4 h-4" />}
                    description="当前价格水平"
                />
                <FactorCard
                    label="库存评分"
                    score={advice.factors.inventoryScore}
                    icon={<Package className="w-4 h-4" />}
                    description="补货紧急度"
                />
                <FactorCard
                    label="时机评分"
                    score={advice.factors.timingScore}
                    icon={<Clock className="w-4 h-4" />}
                    description="购买时机"
                />
            </div>

            {/* Reasoning */}
            <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-amber-500" />
                    分析依据
                </h4>
                <ul className="space-y-2">
                    {advice.reasoning.map((reason, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {reason}
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Suggested Action */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">建议购买平台</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {advice.suggestedPlatform === 'pdd' ? '拼多多' :
                             advice.suggestedPlatform === 'taobao' ? '淘宝/天猫' :
                             advice.suggestedPlatform === 'jd' ? '京东' :
                             advice.suggestedPlatform}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">建议购买数量</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {advice.suggestedQuantity} 件
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {(advice.recommendation === 'good_time' ||
                      advice.recommendation === 'buy_now' ||
                      advice.recommendation === 'urgent') && (
                        <button
                            onClick={onAddToCart}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            立即加入购物车
                        </button>
                    )}

                    {advice.alternativeAction && (
                        <button
                            onClick={onSetAlert}
                            className={cn(
                                'flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all',
                                advice.recommendation === 'wait_for_sale'
                                    ? 'flex-1 bg-amber-500 text-white hover:bg-amber-600'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                            )}
                        >
                            <Bell className="w-4 h-4" />
                            {advice.alternativeAction.action}
                        </button>
                    )}
                </div>

                {advice.alternativeAction && (
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-2 text-center">
                        {advice.alternativeAction.triggerCondition}
                    </p>
                )}
            </div>
        </div>
    );
}

// Factor Card Component
interface FactorCardProps {
    label: string;
    score: number;
    icon: React.ReactNode;
    description: string;
}

function FactorCard({ label, score, icon, description }: FactorCardProps) {
    const getScoreColor = (s: number) => {
        if (s >= 80) return 'text-green-600 dark:text-green-400';
        if (s >= 60) return 'text-amber-600 dark:text-amber-400';
        if (s >= 40) return 'text-orange-600 dark:text-orange-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getBarColor = (s: number) => {
        if (s >= 80) return 'bg-green-500';
        if (s >= 60) return 'bg-amber-500';
        if (s >= 40) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400">{icon}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
            </div>
            <div className={cn('text-2xl font-bold mb-1', getScoreColor(score))}>
                {score}
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className={cn('h-full rounded-full', getBarColor(score))}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>
            <div className="text-xs text-gray-400 mt-1">{description}</div>
        </div>
    );
}
