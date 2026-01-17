'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    LayoutDashboard,
    Camera,
    BarChart3,
    Palette,
    GraduationCap,
    ShoppingBag,
    TrendingUp,
    Calendar,
    Sparkles,
    ChevronRight,
    Flame,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils/cn';
import {
    demoUser,
    mockAnalysis,
    mockAnalysisHistory,
    mockActivityFeed,
    mockCalendarEvents,
    mockStyles,
} from '@/lib/constants/mockData';

const quickActions = [
    { icon: Camera, label: '新扫描', href: '/demo/mirror', color: 'bg-blue-500' },
    { icon: TrendingUp, label: '查看趋势', href: '/demo/recommendations', color: 'bg-green-500' },
    { icon: ShoppingBag, label: '智能购物', href: '/demo/commerce', color: 'bg-mirror-500' },
    { icon: GraduationCap, label: '我的教程', href: '/demo/tutorials', color: 'bg-purple-500' },
];

export default function DashboardPage() {
    const todayEvent = mockCalendarEvents[0];
    const suggestedStyle = mockStyles.find(s => s.id === todayEvent?.suggestedStyle) || mockStyles[0];

    return (
        <div className="min-h-screen p-6">
            {/* Welcome Header */}
            <div className="mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            早上好，{demoUser.name}！
                        </h1>
                        <p className="text-gray-600">
                            您已连续使用 {demoUser.streak} 天，继续保持！
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
                        <Flame className="w-5 h-5 text-orange-500" />
                        <span className="font-bold text-orange-600">{demoUser.streak}</span>
                        <span className="text-sm text-orange-500">天连续</span>
                    </div>
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <motion.div
                                key={action.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={action.href}
                                    className="card p-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
                                >
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center",
                                        action.color
                                    )}>
                                        <action.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {action.label}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Skin Score & Trend */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">皮肤状态</h2>
                                <p className="text-sm text-gray-500">近30天变化趋势</p>
                            </div>
                            <Link
                                href="/demo/analysis"
                                className="text-sm text-mirror-500 hover:text-mirror-600 flex items-center gap-1"
                            >
                                详细报告
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Score Display */}
                            <div className="text-center">
                                <div className="relative inline-flex">
                                    <svg className="w-32 h-32 transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="#E5E5E5"
                                            strokeWidth="8"
                                            fill="none"
                                        />
                                        <motion.circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="url(#scoreGradientDash)"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeLinecap="round"
                                            initial={{ strokeDashoffset: 352 }}
                                            animate={{ strokeDashoffset: 352 - (352 * mockAnalysis.overallScore) / 100 }}
                                            transition={{ duration: 1.5, ease: 'easeOut' }}
                                            style={{ strokeDasharray: 352 }}
                                        />
                                        <defs>
                                            <linearGradient id="scoreGradientDash" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#E91E63" />
                                                <stop offset="100%" stopColor="#9C27B0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-bold text-gradient">
                                            {mockAnalysis.overallScore}
                                        </span>
                                        <span className="text-sm text-gray-500">综合评分</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-1 mt-2 text-green-500 text-sm">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>较上周 +5</span>
                                </div>
                            </div>

                            {/* Trend Chart */}
                            <div className="md:col-span-2 h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={mockAnalysisHistory}>
                                        <defs>
                                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#E91E63" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#E91E63" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                                        <XAxis
                                            dataKey="date"
                                            tick={{ fontSize: 11 }}
                                            tickFormatter={(value) => value.slice(5)}
                                        />
                                        <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
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
                                            fill="url(#colorScore)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Today's Recommendation */}
                    <div className="card p-6 bg-gradient-to-br from-mirror-50 to-accent-50">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-mirror-500" />
                            <h2 className="font-semibold text-gray-900">今日推荐</h2>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            {todayEvent && (
                                <div className="p-3 bg-white rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {todayEvent.title}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {todayEvent.time}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex-1 p-3 bg-white rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            推荐妆容：{suggestedStyle.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {suggestedStyle.duration} 分钟 · 匹配度 {suggestedStyle.matchScore}%
                                        </div>
                                    </div>
                                    <Link
                                        href={`/demo/tutorials/${suggestedStyle.id}`}
                                        className="btn-primary text-sm py-2 px-4"
                                    >
                                        开始
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Profile Card */}
                    <div className="card p-5 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-mirror mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                            {demoUser.name[0]}
                        </div>
                        <h3 className="font-semibold text-gray-900">{demoUser.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{demoUser.email}</p>

                        <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100">
                            <div>
                                <div className="text-xl font-bold text-gradient">
                                    {mockAnalysis.overallScore}
                                </div>
                                <div className="text-xs text-gray-500">皮肤评分</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900">
                                    {demoUser.streak}
                                </div>
                                <div className="text-xs text-gray-500">连续天数</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900">12</div>
                                <div className="text-xs text-gray-500">完成教程</div>
                            </div>
                        </div>

                        <Link
                            href="/demo/analysis"
                            className="block mt-4 text-sm text-mirror-500 hover:text-mirror-600"
                        >
                            查看完整档案 →
                        </Link>
                    </div>

                    {/* AI Insights */}
                    <div className="card p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-mirror-500" />
                            <h3 className="font-semibold text-gray-900">AI 洞察</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="p-3 bg-green-50 rounded-xl">
                                <p className="text-sm text-green-700">
                                    您的皮肤水分近两周持续改善，新的精华液效果显著！
                                </p>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-xl">
                                <p className="text-sm text-amber-700">
                                    T区出油情况有所增加，建议增加控油产品使用频率。
                                </p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <p className="text-sm text-blue-700">
                                    根据天气预报，明天紫外线较强，请做好防晒。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="card p-5">
                        <h3 className="font-semibold text-gray-900 mb-4">最近动态</h3>
                        <div className="space-y-4">
                            {mockActivityFeed.map((activity, index) => (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <span className="text-xl">{activity.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-900">{activity.title}</p>
                                        <p className="text-xs text-gray-400">{activity.timestamp}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
