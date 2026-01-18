'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Minus,
    Calendar,
    Sparkles,
    Info,
    Droplets,
    Sun,
    Eye,
    Shield,
    Zap,
    Palette,
    CircleDot,
    Scan,
    Brain,
    Activity,
    Target,
    AlertCircle,
    CheckCircle2,
    Watch,
    Heart,
    Moon,
    Thermometer,
    Battery,
    Wifi,
    Database,
    BookOpen,
    GraduationCap,
    Microscope,
    RefreshCw,
    Link2,
    Smartphone,
    Scale,
    Dumbbell,
    Utensils,
    Clock,
    Leaf,
    ChevronRight,
    ArrowUpRight,
    Lightbulb,
    Award,
    LineChart,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    BarChart,
    Bar,
    Legend,
} from 'recharts';
import { cn } from '@/lib/utils/cn';
import {
    mockAnalysis,
    mockAnalysisHistory,
    monkScaleColors,
} from '@/lib/constants/mockData';

// 健康设备连接状态
const connectedDevices = [
    { id: 'huawei-watch', name: '华为 Watch GT4', icon: Watch, connected: true, battery: 85, lastSync: '2分钟前' },
    { id: 'huawei-scale', name: '华为智能体脂秤', icon: Scale, connected: true, battery: 100, lastSync: '今早 7:30' },
    { id: 'oura-ring', name: 'Oura Ring', icon: CircleDot, connected: true, battery: 72, lastSync: '刚刚' },
    { id: 'cgm', name: '雅培血糖仪', icon: Activity, connected: false, battery: 0, lastSync: '未连接' },
];

// 实时健康数据
const healthMetrics = {
    heartRate: { current: 72, resting: 58, trend: 'normal', icon: Heart },
    sleep: { hours: 7.5, quality: 82, deepSleep: 1.8, remSleep: 1.5, icon: Moon },
    stress: { level: 32, trend: 'down', icon: Activity },
    temperature: { skin: 32.4, core: 36.8, icon: Thermometer },
    hydration: { level: 68, intake: 1.8, target: 2.5, icon: Droplets },
    steps: { today: 8420, goal: 10000, icon: Dumbbell },
    menstrualPhase: { phase: '卵泡期', day: 8, nextPeriod: 14, icon: Calendar },
    cortisol: { morning: 'normal', evening: 'elevated', icon: Brain },
};

// 科学研究数据
const scientificResearch = [
    {
        id: 1,
        title: '睡眠与皮肤修复的相关性研究',
        journal: 'Nature Medicine',
        year: 2024,
        finding: '深度睡眠时间与胶原蛋白合成正相关 (r=0.89)',
        relevance: 98,
        recommendation: '您的深度睡眠时间充足，有利于皮肤夜间修复',
    },
    {
        id: 2,
        title: '压力激素对皮脂分泌的影响',
        journal: 'Journal of Investigative Dermatology',
        year: 2023,
        finding: '皮质醇升高导致皮脂腺活跃度增加 45%',
        relevance: 85,
        recommendation: '您的晚间皮质醇偏高，建议增加放松活动，可能影响T区控油',
    },
    {
        id: 3,
        title: '经期激素波动与皮肤敏感性研究',
        journal: 'British Journal of Dermatology',
        year: 2024,
        finding: '黄体期皮肤敏感度上升 30%',
        relevance: 75,
        recommendation: '您正处于卵泡期，皮肤状态相对稳定，适合尝试新产品',
    },
    {
        id: 4,
        title: '水分摄入与角质层含水量关联',
        journal: 'Clinical, Cosmetic and Investigational Dermatology',
        year: 2023,
        finding: '日饮水量每增加 500ml，角质层含水量提升 8%',
        relevance: 92,
        recommendation: '您今日饮水 1.8L，未达标 2.5L，建议增加水分摄入',
    },
];

// AI 学习进度
const aiLearningProgress = {
    totalAnalyses: 156,
    skinDataPoints: 12480,
    personalizedModels: 3,
    accuracyImprovement: 23,
    nextMilestone: '200次分析',
    learningAreas: [
        { area: '肤质变化规律', progress: 85, insight: '识别出您的皮肤在换季时更易敏感' },
        { area: '睡眠-皮肤关联', progress: 92, insight: '睡眠不足6小时后，您的黑眼圈指数上升40%' },
        { area: '饮食影响分析', progress: 68, insight: '高糖饮食后24-48小时出现粉刺风险增加' },
        { area: '产品效果追踪', progress: 78, insight: '玻尿酸精华对您的保湿效果最佳（持续8小时）' },
        { area: '环境因素响应', progress: 71, insight: '湿度低于40%时，您的脸颊干燥风险上升' },
    ],
};

// 个性化建议数据（结合健康数据）
const personalizedRecommendations = [
    {
        category: '护肤调整',
        icon: Droplets,
        color: 'from-blue-500 to-cyan-500',
        items: [
            {
                title: '增加夜间保湿强度',
                reason: '基于华为手表数据，您昨晚深度睡眠仅1.8小时，皮肤修复时间不足',
                action: '使用更浓稠的夜间修复霜',
                confidence: 94,
            },
            {
                title: 'T区早晚控油护理',
                reason: '晚间皮质醇偏高 + 近3天高糖饮食记录',
                action: '早晚使用水杨酸产品',
                confidence: 89,
            },
        ],
    },
    {
        category: '生活习惯',
        icon: Heart,
        color: 'from-pink-500 to-rose-500',
        items: [
            {
                title: '增加饮水量至2.5L',
                reason: '智能水杯记录显示日均饮水仅1.8L，角质层含水量偏低',
                action: '每2小时提醒喝水250ml',
                confidence: 96,
            },
            {
                title: '睡前30分钟放松',
                reason: 'Oura Ring 检测到您的 HRV 值偏低，压力未完全释放',
                action: '尝试冥想或轻度拉伸',
                confidence: 88,
            },
        ],
    },
    {
        category: '妆容建议',
        icon: Palette,
        color: 'from-purple-500 to-indigo-500',
        items: [
            {
                title: '选择控油型妆前乳',
                reason: '今日气温28°C + 高湿度 + T区出油预测',
                action: '使用哑光控油妆前乳',
                confidence: 91,
            },
            {
                title: '眼周遮瑕加强',
                reason: '睡眠数据显示深度睡眠不足，黑眼圈风险上升',
                action: '使用提亮型遮瑕膏',
                confidence: 87,
            },
        ],
    },
];

// Progress Ring Component
function ProgressRing({
    score,
    size = 160,
    strokeWidth = 12,
    label = '综合评分',
}: {
    score: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="progress-ring" width={size} height={size}>
                <circle
                    stroke="#1F2937"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <motion.circle
                    stroke="url(#progressGradientDark)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ strokeDasharray: circumference }}
                />
                <defs>
                    <linearGradient id="progressGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06B6D4" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                >
                    {score}
                </motion.span>
                <span className="text-gray-400 text-sm">{label}</span>
            </div>
        </div>
    );
}

// Health Metric Card
function HealthMetricCard({
    title,
    value,
    unit,
    subValue,
    icon: Icon,
    trend,
    status,
}: {
    title: string;
    value: string | number;
    unit?: string;
    subValue?: string;
    icon: React.ElementType;
    trend?: 'up' | 'down' | 'normal';
    status?: 'good' | 'warning' | 'alert';
}) {
    const statusColor = status === 'good' ? 'text-green-400' : status === 'warning' ? 'text-yellow-400' : status === 'alert' ? 'text-red-400' : 'text-gray-400';

    return (
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between mb-2">
                <Icon className={cn("w-5 h-5", statusColor)} />
                {trend && (
                    <div className={cn(
                        "flex items-center gap-1 text-xs",
                        trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
                    )}>
                        {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : trend === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    </div>
                )}
            </div>
            <div className="text-2xl font-bold text-white">
                {value}<span className="text-sm text-gray-400 ml-1">{unit}</span>
            </div>
            <div className="text-xs text-gray-400">{title}</div>
            {subValue && <div className="text-xs text-gray-500 mt-1">{subValue}</div>}
        </div>
    );
}

export default function AnalysisPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'research' | 'learning'>('overview');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [dataRefreshTime, setDataRefreshTime] = useState(new Date());

    const refreshData = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            setDataRefreshTime(new Date());
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* 顶部状态栏 */}
            <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm text-gray-400">实时健康数据同步</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Database className="w-4 h-4" />
                            <span>{connectedDevices.filter(d => d.connected).length} 个设备已连接</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500">上次更新: {dataRefreshTime.toLocaleTimeString()}</span>
                        <button
                            onClick={refreshData}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors",
                                isRefreshing && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={isRefreshing}
                        >
                            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                            {isRefreshing ? '同步中...' : '同步数据'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* 标题区 */}
                <div className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full mb-4"
                    >
                        <Microscope className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-300">基于科学研究的 AI 皮肤分析</span>
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                            智能健康皮肤分析中心
                        </span>
                    </h1>
                    <p className="text-gray-400">整合华为健康生态 · 基于科学研究 · AI 持续学习进化</p>
                </div>

                {/* Tab 导航 */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { id: 'overview', label: '综合分析', icon: BarChart3 },
                        { id: 'health', label: '健康数据', icon: Heart },
                        { id: 'research', label: '科学研究', icon: BookOpen },
                        { id: 'learning', label: 'AI 学习', icon: Brain },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap",
                                activeTab === tab.id
                                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 主内容区 */}
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid lg:grid-cols-3 gap-6"
                        >
                            {/* 左侧主内容 */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* 综合评分卡 */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        <ProgressRing score={mockAnalysis.overallScore} label="综合评分" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <h2 className="text-xl font-bold">皮肤状态优秀</h2>
                                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                                    优于 78% 同龄人
                                                </span>
                                            </div>
                                            <p className="text-gray-400 mb-4">
                                                结合您的 <span className="text-cyan-400">华为手表</span> 健康数据、
                                                <span className="text-purple-400">156次历史分析</span> 和最新
                                                <span className="text-pink-400">科学研究</span>，
                                                为您提供精准的皮肤健康评估。
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {['皱纹控制优秀', '低敏感肤质', '弹性良好'].map((tag) => (
                                                    <span key={tag} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" /> {tag}
                                                    </span>
                                                ))}
                                                {['T区控油', '补水保湿'].map((tag) => (
                                                    <span key={tag} className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" /> {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 健康数据快览 */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Watch className="w-5 h-5 text-cyan-400" />
                                            <h3 className="font-semibold">华为健康数据</h3>
                                        </div>
                                        <span className="text-xs text-gray-500">实时同步中</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <HealthMetricCard
                                            title="心率"
                                            value={healthMetrics.heartRate.current}
                                            unit="bpm"
                                            subValue={`静息 ${healthMetrics.heartRate.resting} bpm`}
                                            icon={Heart}
                                            status="good"
                                        />
                                        <HealthMetricCard
                                            title="睡眠"
                                            value={healthMetrics.sleep.hours}
                                            unit="小时"
                                            subValue={`质量 ${healthMetrics.sleep.quality}%`}
                                            icon={Moon}
                                            status="good"
                                        />
                                        <HealthMetricCard
                                            title="压力指数"
                                            value={healthMetrics.stress.level}
                                            subValue="较昨日下降"
                                            icon={Activity}
                                            trend="down"
                                            status="good"
                                        />
                                        <HealthMetricCard
                                            title="饮水量"
                                            value={healthMetrics.hydration.intake}
                                            unit="L"
                                            subValue={`目标 ${healthMetrics.hydration.target}L`}
                                            icon={Droplets}
                                            status="warning"
                                        />
                                    </div>
                                </div>

                                {/* 个性化建议 */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                                        <h3 className="font-semibold">AI 个性化建议</h3>
                                        <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">基于健康数据</span>
                                    </div>
                                    <div className="space-y-4">
                                        {personalizedRecommendations.map((category, index) => (
                                            <motion.div
                                                key={category.category}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-black/20 rounded-xl p-4"
                                            >
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center", category.color)}>
                                                        <category.icon className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="font-medium">{category.category}</span>
                                                </div>
                                                <div className="space-y-3">
                                                    {category.items.map((item, i) => (
                                                        <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                                            <div className="flex-1">
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <span className="font-medium text-sm">{item.title}</span>
                                                                    <span className="text-xs text-cyan-400">{item.confidence}% 置信度</span>
                                                                </div>
                                                                <p className="text-xs text-gray-400 mb-2">{item.reason}</p>
                                                                <div className="flex items-center gap-1 text-xs text-green-400">
                                                                    <CheckCircle2 className="w-3 h-3" />
                                                                    {item.action}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 右侧边栏 */}
                            <div className="space-y-6">
                                {/* 已连接设备 */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold">已连接设备</h3>
                                        <button className="text-xs text-cyan-400 hover:text-cyan-300">+ 添加</button>
                                    </div>
                                    <div className="space-y-3">
                                        {connectedDevices.map((device) => (
                                            <div key={device.id} className="flex items-center gap-3 p-3 bg-black/20 rounded-xl">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-lg flex items-center justify-center",
                                                    device.connected ? "bg-green-500/20" : "bg-gray-700/50"
                                                )}>
                                                    <device.icon className={cn(
                                                        "w-5 h-5",
                                                        device.connected ? "text-green-400" : "text-gray-500"
                                                    )} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium">{device.name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {device.connected ? (
                                                            <span className="flex items-center gap-1">
                                                                <Battery className="w-3 h-3" /> {device.battery}% · {device.lastSync}
                                                            </span>
                                                        ) : device.lastSync}
                                                    </div>
                                                </div>
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    device.connected ? "bg-green-400" : "bg-gray-500"
                                                )} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 生理周期 */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Calendar className="w-5 h-5 text-pink-400" />
                                        <h3 className="font-semibold">生理周期</h3>
                                    </div>
                                    <div className="text-center py-4">
                                        <div className="text-3xl font-bold text-pink-400 mb-1">
                                            {healthMetrics.menstrualPhase.phase}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            第 {healthMetrics.menstrualPhase.day} 天
                                        </div>
                                        <div className="mt-4 p-3 bg-pink-500/10 rounded-xl">
                                            <p className="text-xs text-gray-400">
                                                <span className="text-pink-400 font-medium">皮肤护理提示：</span> 卵泡期雌激素上升，皮肤状态稳定，适合尝试新护肤品或进行深层清洁
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* AI 学习状态 */}
                                <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl border border-white/10 p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Brain className="w-5 h-5 text-purple-400" />
                                        <h3 className="font-semibold">AI 持续学习</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">已分析次数</span>
                                            <span className="font-bold text-cyan-400">{aiLearningProgress.totalAnalyses} 次</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">皮肤数据点</span>
                                            <span className="font-bold text-purple-400">{aiLearningProgress.skinDataPoints.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">准确度提升</span>
                                            <span className="font-bold text-green-400">+{aiLearningProgress.accuracyImprovement}%</span>
                                        </div>
                                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden mt-2">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                                style={{ width: `${(aiLearningProgress.totalAnalyses / 200) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 text-center">
                                            距离下一个学习里程碑还需 {200 - aiLearningProgress.totalAnalyses} 次分析
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'health' && (
                        <motion.div
                            key="health"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* 健康数据详细视图 */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <HealthMetricCard
                                    title="心率"
                                    value={healthMetrics.heartRate.current}
                                    unit="bpm"
                                    subValue={`静息心率 ${healthMetrics.heartRate.resting} bpm`}
                                    icon={Heart}
                                    status="good"
                                />
                                <HealthMetricCard
                                    title="睡眠时长"
                                    value={healthMetrics.sleep.hours}
                                    unit="小时"
                                    subValue={`深睡 ${healthMetrics.sleep.deepSleep}h / REM ${healthMetrics.sleep.remSleep}h`}
                                    icon={Moon}
                                    status="good"
                                />
                                <HealthMetricCard
                                    title="压力指数"
                                    value={healthMetrics.stress.level}
                                    subValue="处于放松状态"
                                    icon={Activity}
                                    trend="down"
                                    status="good"
                                />
                                <HealthMetricCard
                                    title="皮肤温度"
                                    value={healthMetrics.temperature.skin}
                                    unit="°C"
                                    subValue={`核心温度 ${healthMetrics.temperature.core}°C`}
                                    icon={Thermometer}
                                    status="good"
                                />
                                <HealthMetricCard
                                    title="饮水量"
                                    value={healthMetrics.hydration.intake}
                                    unit="L"
                                    subValue={`目标 ${healthMetrics.hydration.target}L（${Math.round(healthMetrics.hydration.intake / healthMetrics.hydration.target * 100)}%）`}
                                    icon={Droplets}
                                    status="warning"
                                />
                                <HealthMetricCard
                                    title="今日步数"
                                    value={healthMetrics.steps.today.toLocaleString()}
                                    subValue={`目标 ${healthMetrics.steps.goal.toLocaleString()}（${Math.round(healthMetrics.steps.today / healthMetrics.steps.goal * 100)}%）`}
                                    icon={Dumbbell}
                                    status="good"
                                />
                                <HealthMetricCard
                                    title="生理周期"
                                    value={healthMetrics.menstrualPhase.phase}
                                    subValue={`第 ${healthMetrics.menstrualPhase.day} 天`}
                                    icon={Calendar}
                                    status="good"
                                />
                                <HealthMetricCard
                                    title="皮质醇"
                                    value="早正常"
                                    subValue="晚偏高 - 注意放松"
                                    icon={Brain}
                                    status="warning"
                                />
                            </div>

                            {/* 健康-皮肤关联分析 */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <Link2 className="w-5 h-5 text-cyan-400" />
                                    <h3 className="font-semibold">健康数据与皮肤状态关联分析</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            health: '睡眠质量',
                                            skin: '皮肤修复',
                                            correlation: 0.89,
                                            insight: '深度睡眠时间与胶原蛋白合成高度正相关',
                                            currentStatus: '昨晚深度睡眠1.8小时，略低于最佳值2小时',
                                            impact: '可能影响皮肤夜间修复效果',
                                        },
                                        {
                                            health: '压力水平',
                                            skin: 'T区控油',
                                            correlation: 0.76,
                                            insight: '皮质醇升高会刺激皮脂腺分泌',
                                            currentStatus: '晚间皮质醇偏高',
                                            impact: 'T区出油风险增加30%',
                                        },
                                        {
                                            health: '饮水量',
                                            skin: '角质层含水',
                                            correlation: 0.82,
                                            insight: '日饮水量直接影响皮肤保湿能力',
                                            currentStatus: '今日饮水1.8L，低于目标2.5L',
                                            impact: '角质层含水量可能下降8-12%',
                                        },
                                        {
                                            health: '生理周期',
                                            skin: '皮肤敏感度',
                                            correlation: 0.71,
                                            insight: '激素波动影响皮肤屏障功能',
                                            currentStatus: '卵泡期，雌激素上升',
                                            impact: '皮肤状态稳定，适合尝试新产品',
                                        },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-4 bg-black/20 rounded-xl"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-cyan-400">{item.health}</span>
                                                    <ChevronRight className="w-4 h-4 text-gray-500" />
                                                    <span className="text-purple-400">{item.skin}</span>
                                                </div>
                                                <span className="text-sm text-gray-400">r = {item.correlation}</span>
                                            </div>
                                            <p className="text-xs text-gray-400 mb-2">{item.insight}</p>
                                            <div className="p-2 bg-white/5 rounded-lg mb-2">
                                                <p className="text-xs text-white">{item.currentStatus}</p>
                                            </div>
                                            <p className="text-xs text-yellow-400 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {item.impact}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'research' && (
                        <motion.div
                            key="research"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* 科学研究证据 */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <Microscope className="w-5 h-5 text-cyan-400" />
                                    <h3 className="font-semibold">科学研究证据库</h3>
                                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                                        2024-2025 最新研究
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    {scientificResearch.map((research, index) => (
                                        <motion.div
                                            key={research.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-5 bg-black/20 rounded-xl border-l-4 border-cyan-500"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h4 className="font-medium text-white mb-1">{research.title}</h4>
                                                    <p className="text-xs text-gray-500">
                                                        {research.journal} · {research.year}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-bold text-cyan-400">{research.relevance}%</div>
                                                    <div className="text-xs text-gray-500">相关度</div>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-white/5 rounded-lg mb-3">
                                                <p className="text-sm text-gray-300">
                                                    <span className="text-cyan-400 font-medium">研究发现：</span> {research.finding}
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Sparkles className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-yellow-300">{research.recommendation}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* AI 技术说明 */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Cpu className="w-5 h-5 text-purple-400" />
                                    <h3 className="font-semibold">AI 分析技术栈</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        { model: 'YOLOv8', accuracy: '92% mAP', use: '皱纹实时检测', color: 'from-pink-500 to-rose-500' },
                                        { model: 'U-Net + Attention', accuracy: '98.9%', use: '毛孔/皱纹分割', color: 'from-purple-500 to-indigo-500' },
                                        { model: 'EfficientNet-B4', accuracy: '94.1%', use: '皮肤病变检测', color: 'from-blue-500 to-cyan-500' },
                                        { model: '3D ResNet-18', accuracy: 'r=0.937', use: '皮肤年龄预测', color: 'from-green-500 to-emerald-500' },
                                        { model: 'Transformer', accuracy: '96.2%', use: '健康-皮肤关联', color: 'from-orange-500 to-amber-500' },
                                        { model: 'GAN + Diffusion', accuracy: '-', use: '护肤效果模拟', color: 'from-red-500 to-pink-500' },
                                    ].map((tech, index) => (
                                        <motion.div
                                            key={tech.model}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="p-4 bg-black/30 rounded-xl"
                                        >
                                            <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center mb-3", tech.color)}>
                                                <Cpu className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="font-medium text-white text-sm mb-1">{tech.model}</div>
                                            <div className="text-xs text-gray-500 mb-2">{tech.use}</div>
                                            {tech.accuracy !== '-' && (
                                                <div className="text-xs text-cyan-400">准确率: {tech.accuracy}</div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'learning' && (
                        <motion.div
                            key="learning"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* AI 学习进度 */}
                            <div className="grid md:grid-cols-4 gap-4">
                                {[
                                    { label: '总分析次数', value: aiLearningProgress.totalAnalyses, unit: '次', color: 'from-cyan-500 to-blue-500' },
                                    { label: '皮肤数据点', value: aiLearningProgress.skinDataPoints.toLocaleString(), unit: '', color: 'from-purple-500 to-pink-500' },
                                    { label: '个性化模型', value: aiLearningProgress.personalizedModels, unit: '个', color: 'from-green-500 to-emerald-500' },
                                    { label: '准确度提升', value: `+${aiLearningProgress.accuracyImprovement}`, unit: '%', color: 'from-orange-500 to-amber-500' },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5"
                                    >
                                        <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-r flex items-center justify-center mb-3", stat.color)}>
                                            <Award className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-white">{stat.value}{stat.unit}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* 学习领域进度 */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <GraduationCap className="w-5 h-5 text-purple-400" />
                                    <h3 className="font-semibold">AI 学习领域</h3>
                                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                                        持续进化中
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    {aiLearningProgress.learningAreas.map((area, index) => (
                                        <motion.div
                                            key={area.area}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium">{area.area}</span>
                                                <span className="text-sm text-cyan-400">{area.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${area.progress}%` }}
                                                    transition={{ duration: 1, delay: index * 0.1 }}
                                                />
                                            </div>
                                            <div className="p-3 bg-black/20 rounded-lg">
                                                <p className="text-xs text-gray-400 flex items-start gap-2">
                                                    <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                    <span><span className="text-yellow-400 font-medium">AI 洞察：</span> {area.insight}</span>
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* 下一步学习计划 */}
                            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl border border-white/10 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Target className="w-5 h-5 text-cyan-400" />
                                    <h3 className="font-semibold">下一步学习计划</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            title: '饮食-皮肤关联深度学习',
                                            description: '需要更多饮食记录数据来建立准确的食物-皮肤反应模型',
                                            requirement: '连续记录 30 天饮食',
                                            progress: 45,
                                        },
                                        {
                                            title: '季节性皮肤变化预测',
                                            description: '收集更多季节转换期的皮肤数据',
                                            requirement: '经历 2 个完整换季周期',
                                            progress: 60,
                                        },
                                        {
                                            title: '护肤品成分效果分析',
                                            description: '追踪不同成分对您皮肤的具体影响',
                                            requirement: '记录 20 种护肤品使用效果',
                                            progress: 35,
                                        },
                                        {
                                            title: '运动-皮肤状态关联',
                                            description: '分析运动类型和强度对皮肤的影响',
                                            requirement: '记录 50 次运动后皮肤状态',
                                            progress: 28,
                                        },
                                    ].map((plan, index) => (
                                        <motion.div
                                            key={plan.title}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            className="p-4 bg-black/30 rounded-xl"
                                        >
                                            <h4 className="font-medium mb-2">{plan.title}</h4>
                                            <p className="text-xs text-gray-400 mb-3">{plan.description}</p>
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                                <span>{plan.requirement}</span>
                                                <span>{plan.progress}%</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                                    style={{ width: `${plan.progress}%` }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// Add Cpu icon that was missing
function Cpu(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <rect width="16" height="16" x="4" y="4" rx="2" />
            <rect width="6" height="6" x="9" y="9" rx="1" />
            <path d="M15 2v2" />
            <path d="M15 20v2" />
            <path d="M2 15h2" />
            <path d="M2 9h2" />
            <path d="M20 15h2" />
            <path d="M20 9h2" />
            <path d="M9 2v2" />
            <path d="M9 20v2" />
        </svg>
    );
}
