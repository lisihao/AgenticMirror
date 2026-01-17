'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Minus,
    Calendar,
    Sparkles,
    Info,
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from 'recharts';
import { cn } from '@/lib/utils/cn';
import {
    mockAnalysis,
    mockAnalysisHistory,
    monkScaleColors,
} from '@/lib/constants/mockData';

// Progress Ring Component
function ProgressRing({
    score,
    size = 160,
    strokeWidth = 12,
}: {
    score: number;
    size?: number;
    strokeWidth?: number;
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="progress-ring" width={size} height={size}>
                {/* Background circle */}
                <circle
                    stroke="#E5E5E5"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Progress circle */}
                <motion.circle
                    stroke="url(#progressGradient)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{
                        strokeDasharray: circumference,
                    }}
                />
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E91E63" />
                        <stop offset="100%" stopColor="#9C27B0" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-5xl font-bold text-gradient"
                >
                    {score}
                </motion.span>
                <span className="text-gray-500 text-sm">综合评分</span>
            </div>
        </div>
    );
}

// Metric Card Component
function MetricCard({
    label,
    score,
    status,
    trend,
    icon,
    delay = 0,
}: {
    label: string;
    score: number;
    status: string;
    trend: string;
    icon: string;
    delay?: number;
}) {
    const trendValue = parseInt(trend);
    const TrendIcon = trendValue > 0 ? TrendingUp : trendValue < 0 ? TrendingDown : Minus;
    const trendColor = trendValue > 0 ? 'text-green-500' : trendValue < 0 ? 'text-red-500' : 'text-gray-400';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="card p-4 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{icon}</span>
                <div className={cn('flex items-center gap-1 text-sm', trendColor)}>
                    <TrendIcon className="w-4 h-4" />
                    <span>{trend}</span>
                </div>
            </div>
            <div className="mb-2">
                <div className="text-2xl font-bold text-gray-900">{score}</div>
                <div className="text-sm text-gray-500">{label}</div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: delay + 0.3 }}
                    className="h-full bg-gradient-mirror rounded-full"
                />
            </div>
            <div className="text-xs text-gray-400 mt-2">{status}</div>
        </motion.div>
    );
}

export default function AnalysisPage() {
    const [selectedToneLevel, setSelectedToneLevel] = useState(mockAnalysis.skinTone.monkScale);

    const metricLabels: Record<string, string> = {
        hydration: '水分',
        oil: '油脂',
        pores: '毛孔',
        wrinkles: '纹理',
        darkCircles: '黑眼圈',
        acne: '痘痘',
        sensitivity: '敏感度',
        brightness: '亮度',
    };

    return (
        <div className="min-h-screen p-6">
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>分析时间：{mockAnalysis.date}</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">皮肤分析报告</h1>
                <p className="text-gray-600">基于 AI 深度分析的皮肤健康评估</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Score & Metrics */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Overall Score Card */}
                    <div className="card p-6">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <ProgressRing score={mockAnalysis.overallScore} />
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    整体状态良好
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    您的皮肤状态评分为 {mockAnalysis.overallScore} 分，高于 72% 的同龄用户。
                                    水分和油脂平衡状况良好，建议继续保持当前护肤方案。
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['水油平衡', '毛孔细腻', '肤色均匀'].map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {['需补水', 'T区出油'].map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Metrics Grid */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">详细指标</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(mockAnalysis.metrics).map(([key, value], index) => (
                                <MetricCard
                                    key={key}
                                    label={metricLabels[key] || key}
                                    score={value.score}
                                    status={value.status}
                                    trend={value.trend}
                                    icon={value.icon}
                                    delay={index * 0.1}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Trend Chart */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">趋势分析</h2>
                                <p className="text-sm text-gray-500">近30天皮肤状态变化</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-mirror-500" />
                                    <span className="text-gray-600">综合评分</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <span className="text-gray-600">水分</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockAnalysisHistory}>
                                    <defs>
                                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#E91E63" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#E91E63" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="hydrationGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) => value.slice(5)}
                                    />
                                    <YAxis domain={[40, 100]} tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #E5E5E5',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#E91E63"
                                        strokeWidth={2}
                                        fill="url(#scoreGradient)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="hydration"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        fill="url(#hydrationGradient)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Skin Tone */}
                    <div className="card p-5">
                        <h2 className="font-semibold text-gray-900 mb-4">肤色分析</h2>
                        <div className="text-center mb-4">
                            <div
                                className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
                                style={{ backgroundColor: mockAnalysis.skinTone.hexColor }}
                            />
                            <div className="text-lg font-medium text-gray-900">
                                Monk Scale {mockAnalysis.skinTone.monkScale}
                            </div>
                            <div className="text-sm text-gray-500">
                                {mockAnalysis.skinTone.undertone === 'warm' ? '暖色调' : '冷色调'}
                            </div>
                        </div>

                        {/* Monk Scale */}
                        <div className="flex justify-center gap-1.5 mb-4">
                            {monkScaleColors.map((color) => (
                                <button
                                    key={color.level}
                                    onClick={() => setSelectedToneLevel(color.level)}
                                    className={cn(
                                        "w-6 h-6 rounded-full transition-transform hover:scale-110",
                                        selectedToneLevel === color.level && "ring-2 ring-mirror-500 ring-offset-2"
                                    )}
                                    style={{ backgroundColor: color.hex }}
                                    title={`Level ${color.level}: ${color.name}`}
                                />
                            ))}
                        </div>

                        <div className="text-center text-sm text-gray-500">
                            Monk Skin Tone Scale
                        </div>
                    </div>

                    {/* Problem Areas */}
                    <div className="card p-5">
                        <h2 className="font-semibold text-gray-900 mb-4">关注区域</h2>
                        <div className="space-y-3">
                            {mockAnalysis.problemAreas.map((area, index) => (
                                <motion.div
                                    key={area.zone}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                "w-3 h-3 rounded-full",
                                                area.severity === 'moderate' ? 'bg-amber-500' : 'bg-green-500'
                                            )}
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {area.zone === 't-zone' ? 'T区' :
                                                 area.zone === 'cheeks' ? '脸颊' :
                                                 area.zone === 'nose' ? '鼻子' :
                                                 area.zone === 'forehead' ? '额头' : area.zone}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {area.issue === 'oil' ? '油脂分泌' :
                                                 area.issue === 'dryness' ? '干燥' :
                                                 area.issue === 'pores' ? '毛孔' :
                                                 area.issue === 'spots' ? '色斑' : area.issue}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "text-xs px-2 py-1 rounded-full",
                                        area.severity === 'moderate'
                                            ? 'bg-amber-100 text-amber-600'
                                            : 'bg-green-100 text-green-600'
                                    )}>
                                        {area.severity === 'moderate' ? '中等' :
                                         area.severity === 'mild' ? '轻微' :
                                         area.severity === 'visible' ? '可见' : area.severity}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="card p-5 bg-gradient-to-br from-mirror-50 to-accent-50">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-mirror-500" />
                            <h2 className="font-semibold text-gray-900">AI 建议</h2>
                        </div>
                        <div className="space-y-3">
                            {mockAnalysis.recommendations.map((rec, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.15 }}
                                    className="flex items-start gap-3 p-3 bg-white rounded-xl"
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-mirror flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-xs font-medium">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700">{rec}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
