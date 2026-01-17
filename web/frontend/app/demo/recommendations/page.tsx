'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Palette,
    Calendar,
    Cloud,
    Smile,
    TrendingUp,
    Clock,
    Star,
    ChevronRight,
    Filter,
    Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
    mockStyles,
    mockTrends,
    mockCalendarEvents,
    demoUser,
} from '@/lib/constants/mockData';

const occasions = [
    { id: 'all', label: '全部', icon: Palette },
    { id: 'work', label: '职场', icon: Calendar },
    { id: 'date', label: '约会', icon: Smile },
    { id: 'party', label: '派对', icon: Star },
    { id: 'casual', label: '日常', icon: Cloud },
];

const difficultyStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
        <Star
            key={i}
            className={cn(
                "w-3 h-3",
                i < level ? "fill-gold-500 text-gold-500" : "text-gray-300"
            )}
        />
    ));
};

// Style Card Component
function StyleCard({
    style,
    index,
}: {
    style: typeof mockStyles[0];
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-hover overflow-hidden group"
        >
            {/* Thumbnail */}
            <div className="relative aspect-[4/5] bg-gradient-to-br from-mirror-100 to-accent-100 overflow-hidden">
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Palette className="w-16 h-16 text-mirror-300" />
                </div>

                {/* Match Score Badge */}
                <div className="absolute top-3 left-3 glass rounded-full px-3 py-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-mirror-500" />
                    <span className="text-sm font-medium text-gray-700">
                        {style.matchScore}% 匹配
                    </span>
                </div>

                {/* Trend Badge */}
                {style.trendSource && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full px-2 py-1 text-xs font-medium">
                        {style.trendSource === 'xiaohongshu' ? '📕 小红书' :
                         style.trendSource === 'tiktok' ? '🎵 TikTok' : style.trendSource}
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <Link
                        href={`/demo/tutorials/${style.id}`}
                        className="btn-primary w-full text-center"
                    >
                        开始教程
                    </Link>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{style.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{style.description}</p>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                        {difficultyStars(style.difficulty)}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{style.duration} 分钟</span>
                    </div>
                </div>

                {style.matchReason && (
                    <p className="text-xs text-mirror-500 mt-3 pt-3 border-t border-gray-100">
                        {style.matchReason}
                    </p>
                )}
            </div>
        </motion.div>
    );
}

// Trend Card Component
function TrendCard({
    trend,
    index,
}: {
    trend: typeof mockTrends[0];
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="card-hover p-4 flex items-center gap-4"
        >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mirror-100 to-accent-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{trend.sourceIcon}</span>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 truncate">{trend.name}</h4>
                    <span className="text-xs text-gray-400">{trend.hashtag}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{trend.description}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    <span>{(trend.engagement / 1000).toFixed(1)}K 互动</span>
                </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
        </motion.div>
    );
}

export default function RecommendationsPage() {
    const [selectedOccasion, setSelectedOccasion] = useState('all');

    const filteredStyles = selectedOccasion === 'all'
        ? mockStyles
        : mockStyles.filter(s => s.occasion === selectedOccasion);

    const todayEvent = mockCalendarEvents[0];

    return (
        <div className="min-h-screen p-6">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">妆容推荐</h1>
                <p className="text-gray-600">基于您的肤质、日程和当下趋势的个性化推荐</p>
            </div>

            {/* Context Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
                {/* Today's Schedule */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-4 flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">今日日程</div>
                        <div className="font-medium text-gray-900">
                            {todayEvent?.title || '无日程'}
                        </div>
                        {todayEvent && (
                            <div className="text-xs text-gray-400">{todayEvent.time}</div>
                        )}
                    </div>
                </motion.div>

                {/* Weather */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card p-4 flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                        <Cloud className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">今日天气</div>
                        <div className="font-medium text-gray-900">晴朗 22°C</div>
                        <div className="text-xs text-gray-400">紫外线中等</div>
                    </div>
                </motion.div>

                {/* Mood */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card p-4 flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <Smile className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">今日心情</div>
                        <div className="font-medium text-gray-900">精力充沛</div>
                        <div className="text-xs text-gray-400">适合尝试新妆容</div>
                    </div>
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Occasion Filter */}
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                        {occasions.map((occasion) => (
                            <button
                                key={occasion.id}
                                onClick={() => setSelectedOccasion(occasion.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all",
                                    selectedOccasion === occasion.id
                                        ? "bg-mirror-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                <occasion.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{occasion.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Recommended Styles */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                为您推荐
                            </h2>
                            <button className="text-sm text-mirror-500 hover:text-mirror-600 flex items-center gap-1">
                                <Filter className="w-4 h-4" />
                                筛选
                            </button>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {filteredStyles.map((style, index) => (
                                <StyleCard key={style.id} style={style} index={index} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* AI Pick */}
                    <div className="card p-5 bg-gradient-to-br from-mirror-50 to-accent-50">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-mirror-500" />
                            <h3 className="font-semibold text-gray-900">AI 首选</h3>
                        </div>
                        <div className="bg-white rounded-xl p-4 mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-mirror flex items-center justify-center">
                                    <Palette className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {mockStyles[0].name}
                                    </div>
                                    <div className="text-sm text-mirror-500">
                                        95% 匹配度
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                根据您下午的项目汇报和当前皮肤状态，这款妆容最适合您今天。
                            </p>
                            <Link
                                href={`/demo/tutorials/${mockStyles[0].id}`}
                                className="btn-primary w-full text-center"
                            >
                                立即开始
                            </Link>
                        </div>
                    </div>

                    {/* Trending Now */}
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">正在流行</h3>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="space-y-3">
                            {mockTrends.slice(0, 3).map((trend, index) => (
                                <TrendCard key={trend.id} trend={trend} index={index} />
                            ))}
                        </div>
                        <button className="w-full mt-4 text-sm text-mirror-500 hover:text-mirror-600 font-medium">
                            查看更多趋势 →
                        </button>
                    </div>

                    {/* Upcoming Events */}
                    <div className="card p-5">
                        <h3 className="font-semibold text-gray-900 mb-4">近期日程</h3>
                        <div className="space-y-3">
                            {mockCalendarEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-medium",
                                        event.type === 'work' ? 'bg-blue-500' :
                                        event.type === 'social' ? 'bg-pink-500' :
                                        'bg-purple-500'
                                    )}>
                                        {event.date.slice(-2)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900">
                                            {event.title}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {event.time}
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
