'use client';

import { useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    ReferenceDot,
} from 'recharts';
import { TrendingDown, TrendingUp, Minus, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
    PriceHistoryPoint,
    PriceStatistics,
    PricePrediction,
} from '@/lib/constants/shoppingData';

interface PriceHistoryChartProps {
    history: PriceHistoryPoint[];
    statistics: PriceStatistics;
    prediction?: PricePrediction;
    className?: string;
}

export function PriceHistoryChart({
    history,
    statistics,
    prediction,
    className,
}: PriceHistoryChartProps) {
    const chartData = useMemo(() => {
        return history.map((point) => ({
            ...point,
            dateLabel: new Date(point.date).toLocaleDateString('zh-CN', {
                month: 'short',
                day: 'numeric',
            }),
        }));
    }, [history]);

    const lowestPoint = useMemo(() => {
        return history.find((p) => p.isLowest);
    }, [history]);

    const priceRange = useMemo(() => {
        const prices = history.map((p) => p.price);
        return {
            min: Math.min(...prices) - 50,
            max: Math.max(...prices) + 50,
        };
    }, [history]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{data.dateLabel}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        ¥{data.price}
                    </p>
                    {data.event && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                            {data.event}
                        </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                        平台: {data.platform}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={cn('space-y-4', className)}>
            {/* Statistics Cards */}
            <div className="grid grid-cols-4 gap-3">
                <StatCard
                    label="历史最低"
                    value={statistics.lowest.price}
                    subtext={statistics.lowest.event}
                    variant="success"
                />
                <StatCard
                    label="历史最高"
                    value={statistics.highest.price}
                    variant="danger"
                />
                <StatCard
                    label="历史均价"
                    value={statistics.average}
                    variant="neutral"
                />
                <StatCard
                    label="当前价格"
                    value={statistics.current}
                    trend={
                        statistics.currentPosition === 'below_avg'
                            ? 'down'
                            : statistics.currentPosition === 'above_avg'
                            ? 'up'
                            : 'neutral'
                    }
                    variant={
                        statistics.currentPosition === 'below_avg'
                            ? 'success'
                            : statistics.currentPosition === 'above_avg'
                            ? 'danger'
                            : 'neutral'
                    }
                />
            </div>

            {/* Chart */}
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="dateLabel"
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            tickLine={false}
                            axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis
                            domain={[priceRange.min, priceRange.max]}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            tickLine={false}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickFormatter={(value) => `¥${value}`}
                        />
                        <Tooltip content={<CustomTooltip />} />

                        {/* Average Line */}
                        <ReferenceLine
                            y={statistics.average}
                            stroke="#f59e0b"
                            strokeDasharray="5 5"
                            label={{
                                value: `均价 ¥${statistics.average}`,
                                position: 'right',
                                fill: '#f59e0b',
                                fontSize: 10,
                            }}
                        />

                        {/* Price Line */}
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#ec4899"
                            strokeWidth={2}
                            dot={(props: any) => {
                                const { cx, cy, payload } = props;
                                if (payload.event) {
                                    return (
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r={6}
                                            fill={payload.isLowest ? '#10b981' : '#f59e0b'}
                                            stroke="#fff"
                                            strokeWidth={2}
                                        />
                                    );
                                }
                                return (
                                    <circle
                                        cx={cx}
                                        cy={cy}
                                        r={3}
                                        fill="#ec4899"
                                    />
                                );
                            }}
                            activeDot={{ r: 6, fill: '#ec4899', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Price Position Indicator */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        当前价格位于历史
                        <span className={cn(
                            'font-bold mx-1',
                            statistics.percentileRank <= 30 ? 'text-green-600' :
                            statistics.percentileRank >= 70 ? 'text-red-600' : 'text-amber-600'
                        )}>
                            {statistics.percentileRank}%
                        </span>
                        分位
                    </span>
                </div>
                <span className={cn(
                    'text-sm font-medium px-2 py-0.5 rounded',
                    statistics.currentPosition === 'below_avg'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : statistics.currentPosition === 'above_avg'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                )}>
                    {statistics.currentPosition === 'below_avg' ? '低于均价' :
                     statistics.currentPosition === 'above_avg' ? '高于均价' : '接近均价'}
                </span>
            </div>

            {/* Prediction */}
            {prediction && (
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                            AI 价格预测
                        </span>
                        <span className="text-xs text-amber-500 ml-auto">
                            置信度 {prediction.confidence}%
                        </span>
                    </div>
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                        预计 <span className="font-bold">{prediction.nextSaleEvent}</span>
                        （{prediction.expectedDate}）降至
                        <span className="font-bold text-green-600 dark:text-green-400 mx-1">
                            ¥{prediction.predictedPrice}
                        </span>
                        ，还有 <span className="font-medium">{prediction.daysUntil}</span> 天
                    </p>
                </div>
            )}
        </div>
    );
}

// Stat Card Component
interface StatCardProps {
    label: string;
    value: number;
    subtext?: string;
    trend?: 'up' | 'down' | 'neutral';
    variant: 'success' | 'danger' | 'neutral';
}

function StatCard({ label, value, subtext, trend, variant }: StatCardProps) {
    const variantStyles = {
        success: 'border-green-200 dark:border-green-800',
        danger: 'border-red-200 dark:border-red-800',
        neutral: 'border-gray-200 dark:border-gray-700',
    };

    const valueStyles = {
        success: 'text-green-600 dark:text-green-400',
        danger: 'text-red-600 dark:text-red-400',
        neutral: 'text-gray-900 dark:text-gray-100',
    };

    return (
        <div className={cn(
            'p-3 bg-white dark:bg-gray-900 rounded-xl border',
            variantStyles[variant]
        )}>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</div>
            <div className="flex items-center gap-1">
                <span className={cn('text-lg font-bold', valueStyles[variant])}>
                    ¥{value}
                </span>
                {trend && (
                    <span>
                        {trend === 'down' && <TrendingDown className="w-4 h-4 text-green-500" />}
                        {trend === 'up' && <TrendingUp className="w-4 h-4 text-red-500" />}
                        {trend === 'neutral' && <Minus className="w-4 h-4 text-gray-400" />}
                    </span>
                )}
            </div>
            {subtext && (
                <div className="text-xs text-amber-600 dark:text-amber-400 mt-0.5 truncate">
                    {subtext}
                </div>
            )}
        </div>
    );
}
