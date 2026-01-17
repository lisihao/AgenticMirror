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
                    stroke="#E5E5E5"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
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
                    style={{ strokeDasharray: circumference }}
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
                    className="text-4xl font-bold text-gradient"
                >
                    {score}
                </motion.span>
                <span className="text-gray-500 text-sm">{label}</span>
            </div>
        </div>
    );
}

// Enhanced Metric Card with AI accuracy badge
function MetricCard({
    label,
    score,
    status,
    trend,
    icon: Icon,
    percentile,
    aiModel,
    delay = 0,
}: {
    label: string;
    score: number;
    status: string;
    trend: string;
    icon: React.ElementType;
    percentile?: number;
    aiModel?: string;
    delay?: number;
}) {
    const trendValue = parseInt(trend);
    const TrendIcon = trendValue > 0 ? TrendingUp : trendValue < 0 ? TrendingDown : Minus;
    const trendColor = trendValue > 0 ? 'text-green-500' : trendValue < 0 ? 'text-red-500' : 'text-gray-400';
    const scoreColor = score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="card p-4 hover:shadow-md transition-shadow group"
        >
            <div className="flex items-start justify-between mb-3">
                <div className={cn("p-2 rounded-lg",
                    score >= 70 ? 'bg-green-50' : score >= 50 ? 'bg-amber-50' : 'bg-red-50'
                )}>
                    <Icon className={cn("w-5 h-5",
                        score >= 70 ? 'text-green-500' : score >= 50 ? 'text-amber-500' : 'text-red-500'
                    )} />
                </div>
                <div className={cn('flex items-center gap-1 text-sm', trendColor)}>
                    <TrendIcon className="w-4 h-4" />
                    <span>{trend}</span>
                </div>
            </div>
            <div className="mb-2">
                <div className="text-2xl font-bold text-gray-900">{score}%</div>
                <div className="text-sm text-gray-500">{label}</div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: delay + 0.3 }}
                    className={cn("h-full rounded-full", scoreColor)}
                />
            </div>
            <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">{status}</span>
                {percentile && (
                    <span className="text-xs text-mirror-500">优于{percentile}%同龄人</span>
                )}
            </div>
            {aiModel && (
                <div className="mt-2 pt-2 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Brain className="w-3 h-3" /> {aiModel}
                    </span>
                </div>
            )}
        </motion.div>
    );
}

// Advanced Indicator Component
function AdvancedIndicator({
    label,
    value,
    maxValue = 100,
    unit = '',
    status,
    description,
}: {
    label: string;
    value: number;
    maxValue?: number;
    unit?: string;
    status: 'good' | 'moderate' | 'warning';
    description: string;
}) {
    const statusConfig = {
        good: { color: 'text-green-500', bg: 'bg-green-50', icon: CheckCircle2 },
        moderate: { color: 'text-amber-500', bg: 'bg-amber-50', icon: AlertCircle },
        warning: { color: 'text-red-500', bg: 'bg-red-50', icon: AlertCircle },
    };
    const config = statusConfig[status];
    const StatusIcon = config.icon;

    return (
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
            <div className={cn("p-2 rounded-lg", config.bg)}>
                <StatusIcon className={cn("w-5 h-5", config.color)} />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{label}</span>
                    <span className={cn("text-lg font-bold", config.color)}>
                        {value}{unit}
                    </span>
                </div>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </div>
    );
}

export default function AnalysisPage() {
    const [selectedToneLevel, setSelectedToneLevel] = useState(mockAnalysis.skinTone.monkScale);
    const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'regions'>('basic');

    // Mock enhanced data based on latest AI research
    const enhancedMetrics = [
        { key: 'hydration', label: '水分度', score: 72, status: '正常', trend: '+3', icon: Droplets, percentile: 68, aiModel: 'TEWL-CNN v2.1' },
        { key: 'oilBalance', label: '油脂平衡', score: 58, status: '偏油', trend: '-2', icon: Sun, percentile: 45, aiModel: '64区域皮脂分析' },
        { key: 'pores', label: '毛孔状态', score: 65, status: '中等', trend: '+1', icon: CircleDot, percentile: 52, aiModel: 'U-Net 分割' },
        { key: 'wrinkles', label: '皱纹程度', score: 82, status: '优秀', trend: '0', icon: Activity, percentile: 85, aiModel: 'YOLOv8 (mAP 92%)' },
        { key: 'evenness', label: '肤色均匀', score: 75, status: '良好', trend: '+2', icon: Palette, percentile: 70, aiModel: 'L*a*b* 色差分析' },
        { key: 'sensitivity', label: '敏感度', score: 25, status: '低敏', trend: '-5', icon: Shield, percentile: 82, aiModel: '血管检测 CNN' },
        { key: 'elasticity', label: '弹性度', score: 78, status: '良好', trend: '+1', icon: Zap, percentile: 75, aiModel: '胶原密度估算' },
        { key: 'radiance', label: '光泽度', score: 70, status: '正常', trend: '0', icon: Sparkles, percentile: 60, aiModel: '镜面反射分析' },
    ];

    // Advanced indicators from research
    const advancedIndicators = [
        { label: '皮肤年龄', value: 28, unit: '岁', status: 'good' as const, description: '比实际年龄年轻2岁 (MAE 4.2年, r=0.937)' },
        { label: 'UV损伤指数', value: 32, unit: '', status: 'good' as const, description: '累积紫外线损伤较低，继续保持防晒' },
        { label: '胶原蛋白指数', value: 68, unit: '', status: 'moderate' as const, description: '基于LC-OCT深层分析，建议补充胶原蛋白' },
        { label: '黑色素指数', value: 45, unit: '', status: 'good' as const, description: '色素分布均匀，无明显沉着' },
        { label: '卟啉指数', value: 28, unit: '', status: 'good' as const, description: '细菌代谢产物较少，毛孔健康' },
        { label: '角质层含水', value: 42, unit: '%', status: 'moderate' as const, description: '建议增加保湿护理频率' },
    ];

    // Radar chart data
    const radarData = enhancedMetrics.map(m => ({
        metric: m.label,
        value: m.score,
        fullMark: 100,
    }));

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>分析时间：{mockAnalysis.date}</span>
                    <span className="mx-2">|</span>
                    <Brain className="w-4 h-4" />
                    <span>AI 模型: YOLOv8 + U-Net + EfficientNet</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">AI 皮肤深度分析报告</h1>
                <p className="text-gray-600">基于 2024-2025 最新深度学习算法 | 150+ 生物标记分析</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6">
                {[
                    { id: 'basic', label: '基础分析', icon: BarChart3 },
                    { id: 'advanced', label: '高级指标', icon: Scan },
                    { id: 'regions', label: '区域分析', icon: Target },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                            activeTab === tab.id
                                ? "bg-mirror-500 text-white shadow-lg"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Score & Metrics */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Overall Score Card */}
                    <div className="card p-6">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex gap-6">
                                <ProgressRing score={mockAnalysis.overallScore} label="综合评分" />
                                <div className="flex flex-col justify-center">
                                    <div className="text-center mb-2">
                                        <div className="text-3xl font-bold text-mirror-600">28</div>
                                        <div className="text-sm text-gray-500">皮肤年龄</div>
                                    </div>
                                    <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs text-center">
                                        比实际年龄年轻2岁
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    皮肤状态优秀
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    基于 <span className="text-mirror-500 font-medium">8项核心指标</span> 和{' '}
                                    <span className="text-mirror-500 font-medium">6项高级生物标记</span> 分析，
                                    您的皮肤综合评分为 {mockAnalysis.overallScore} 分，优于 78% 的同龄用户。
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['皱纹控制优秀', '低敏感肤质', '弹性良好'].map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> {tag}
                                        </span>
                                    ))}
                                    {['T区控油', '补水保湿'].map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-sm flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" /> {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'basic' && (
                        <>
                            {/* Detailed Metrics Grid */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900">8项核心指标</h2>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <Brain className="w-3 h-3" /> 悬停查看AI模型
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {enhancedMetrics.map((metric, index) => (
                                        <MetricCard
                                            key={metric.key}
                                            label={metric.label}
                                            score={metric.score}
                                            status={metric.status}
                                            trend={metric.trend}
                                            icon={metric.icon}
                                            percentile={metric.percentile}
                                            aiModel={metric.aiModel}
                                            delay={index * 0.1}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Radar Chart */}
                            <div className="card p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">指标雷达图</h2>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart data={radarData}>
                                            <PolarGrid stroke="#E5E5E5" />
                                            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                                            <Radar
                                                name="当前状态"
                                                dataKey="value"
                                                stroke="#E91E63"
                                                fill="#E91E63"
                                                fillOpacity={0.3}
                                                strokeWidth={2}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'advanced' && (
                        <div className="space-y-6">
                            {/* Advanced Indicators */}
                            <div className="card p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Scan className="w-5 h-5 text-mirror-500" />
                                    <h2 className="text-lg font-semibold text-gray-900">高级生物标记分析</h2>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">
                                    基于 LC-OCT 线场共聚焦光学相干断层扫描 + 3D ResNet-18 深度学习模型
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {advancedIndicators.map((indicator, index) => (
                                        <motion.div
                                            key={indicator.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <AdvancedIndicator {...indicator} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* AI Technology Explanation */}
                            <div className="card p-6 bg-gradient-to-br from-slate-50 to-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">AI 技术说明</h2>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        { model: 'YOLOv8', accuracy: '92%', use: '皱纹实时检测' },
                                        { model: 'U-Net + Attention', accuracy: '98.9%', use: '毛孔/皱纹分割' },
                                        { model: 'EfficientNet-B4', accuracy: '94.1%', use: '皮肤病变检测' },
                                        { model: '3D ResNet-18', accuracy: 'r=0.937', use: '皮肤年龄预测' },
                                        { model: 'GAN', accuracy: '-', use: '护肤效果模拟' },
                                        { model: '64区域分析', accuracy: '-', use: '皮脂分布量化' },
                                    ].map((tech) => (
                                        <div key={tech.model} className="p-3 bg-white rounded-lg">
                                            <div className="font-medium text-gray-900 text-sm">{tech.model}</div>
                                            <div className="text-xs text-gray-500">{tech.use}</div>
                                            {tech.accuracy !== '-' && (
                                                <div className="text-xs text-mirror-500 mt-1">准确率: {tech.accuracy}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'regions' && (
                        <div className="card p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">64区域面部分析</h2>
                            <p className="text-sm text-gray-500 mb-6">
                                基于专业皮肤分析设备的64区域划分系统，精确定位每个区域的皮肤状态
                            </p>
                            {/* Simplified face zone visualization */}
                            <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-b from-pink-50 to-orange-50 rounded-2xl p-8">
                                <svg viewBox="0 0 200 240" className="w-full h-full">
                                    {/* Face outline */}
                                    <ellipse cx="100" cy="120" rx="70" ry="90" fill="#FDF2F8" stroke="#E91E63" strokeWidth="1" opacity="0.5" />

                                    {/* Forehead zone */}
                                    <rect x="40" y="45" width="120" height="30" rx="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" opacity="0.6" />
                                    <text x="100" y="65" textAnchor="middle" fontSize="8" fill="#92400E">额头区 (7区)</text>

                                    {/* T-zone */}
                                    <path d="M 85 75 L 115 75 L 110 140 L 90 140 Z" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1" opacity="0.6" />
                                    <text x="100" y="110" textAnchor="middle" fontSize="7" fill="#991B1B">T区</text>

                                    {/* Eye zones */}
                                    <ellipse cx="65" cy="95" rx="20" ry="10" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
                                    <ellipse cx="135" cy="95" rx="20" ry="10" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
                                    <text x="65" y="98" textAnchor="middle" fontSize="6" fill="#1E40AF">眼周</text>
                                    <text x="135" y="98" textAnchor="middle" fontSize="6" fill="#1E40AF">眼周</text>

                                    {/* Cheek zones */}
                                    <ellipse cx="50" cy="140" rx="25" ry="30" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" opacity="0.6" />
                                    <ellipse cx="150" cy="140" rx="25" ry="30" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" opacity="0.6" />
                                    <text x="50" y="143" textAnchor="middle" fontSize="7" fill="#065F46">脸颊</text>
                                    <text x="150" y="143" textAnchor="middle" fontSize="7" fill="#065F46">脸颊</text>

                                    {/* Lip zone */}
                                    <ellipse cx="100" cy="175" rx="25" ry="12" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1" opacity="0.6" />
                                    <text x="100" y="178" textAnchor="middle" fontSize="7" fill="#9D174D">唇周</text>

                                    {/* Chin zone */}
                                    <ellipse cx="100" cy="200" rx="30" ry="15" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1" opacity="0.6" />
                                    <text x="100" y="203" textAnchor="middle" fontSize="7" fill="#3730A3">下巴</text>
                                </svg>
                            </div>

                            {/* Region Analysis Results */}
                            <div className="mt-6 grid md:grid-cols-2 gap-4">
                                {[
                                    { zone: 'T区', status: 'warning', issue: '油脂分泌偏多', value: 72, advice: '使用控油产品' },
                                    { zone: '脸颊', status: 'moderate', issue: '轻微干燥', value: 45, advice: '加强保湿' },
                                    { zone: '眼周', status: 'good', issue: '状态良好', value: 78, advice: '继续使用眼霜' },
                                    { zone: '额头', status: 'good', issue: '水油平衡', value: 70, advice: '保持当前护理' },
                                ].map((region) => (
                                    <div key={region.zone} className={cn(
                                        "p-4 rounded-xl border-l-4",
                                        region.status === 'good' ? 'bg-green-50 border-green-500' :
                                        region.status === 'warning' ? 'bg-red-50 border-red-500' :
                                        'bg-amber-50 border-amber-500'
                                    )}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-gray-900">{region.zone}</span>
                                            <span className={cn(
                                                "text-sm font-bold",
                                                region.status === 'good' ? 'text-green-600' :
                                                region.status === 'warning' ? 'text-red-600' :
                                                'text-amber-600'
                                            )}>{region.value}%</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{region.issue}</p>
                                        <p className="text-xs text-gray-500 mt-1">建议: {region.advice}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Trend Chart */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">趋势分析</h2>
                                <p className="text-sm text-gray-500">近30天皮肤状态变化追踪</p>
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
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(value) => value.slice(5)} />
                                    <YAxis domain={[40, 100]} tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #E5E5E5',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Area type="monotone" dataKey="score" stroke="#E91E63" strokeWidth={2} fill="url(#scoreGradient)" />
                                    <Area type="monotone" dataKey="hydration" stroke="#3B82F6" strokeWidth={2} fill="url(#hydrationGradient)" />
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
                        <div className="text-center text-sm text-gray-500">Monk Skin Tone Scale (包容性肤色标准)</div>
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
                                        <div className={cn(
                                            "w-3 h-3 rounded-full",
                                            area.severity === 'moderate' ? 'bg-amber-500' : 'bg-green-500'
                                        )} />
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
                            <h2 className="font-semibold text-gray-900">AI 个性化建议</h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                { icon: '💧', text: '增加玻尿酸精华使用频率，提升角质层含水量' },
                                { icon: '🌿', text: 'T区使用水杨酸产品，控制皮脂分泌' },
                                { icon: '☀️', text: '继续使用SPF30+防晒，UV损伤指数保持良好' },
                                { icon: '🧴', text: '建议补充胶原蛋白，维持皮肤弹性' },
                            ].map((rec, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.15 }}
                                    className="flex items-start gap-3 p-3 bg-white rounded-xl"
                                >
                                    <span className="text-xl">{rec.icon}</span>
                                    <p className="text-sm text-gray-700">{rec.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Data Source */}
                    <div className="text-xs text-gray-400 p-4 bg-gray-50 rounded-xl">
                        <div className="font-medium mb-2">数据来源与参考</div>
                        <ul className="space-y-1">
                            <li>• Nature Medicine 2024 AI皮肤分析研究</li>
                            <li>• L'Oréal SkinConsult AI 算法</li>
                            <li>• VISIA 皮肤分析系统标准</li>
                            <li>• Haut.AI 150+生物标记体系</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
