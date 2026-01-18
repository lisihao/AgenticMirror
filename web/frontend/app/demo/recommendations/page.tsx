'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Search,
    Bot,
    Cpu,
    Scan,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Video,
    Camera,
    RotateCcw,
    ChevronRight,
    ChevronLeft,
    Heart,
    Share2,
    Download,
    Wand2,
    Layers,
    User,
    Shirt,
    Glasses,
    Watch,
    MessageCircle,
    TrendingUp,
    Zap,
    Eye,
    Palette,
    RefreshCw,
    CheckCircle,
    ArrowRight,
    Globe,
    Wifi,
    Calendar,
    Clock,
    MapPin,
    Users,
    Briefcase,
    Coffee,
    Utensils,
    PartyPopper,
    Sun,
    Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// 今日行程数据
const todaySchedule = [
    {
        id: 1,
        time: '09:00',
        endTime: '10:30',
        title: '部门周会',
        type: 'work',
        location: '会议室 A',
        icon: Briefcase,
        importance: 'high',
        attendees: 12,
        recommendedLook: 1, // 关联妆容ID
        notes: '需要汇报Q1业绩',
    },
    {
        id: 2,
        time: '12:00',
        endTime: '13:00',
        title: '与闺蜜午餐',
        type: 'social',
        location: '网红餐厅',
        icon: Utensils,
        importance: 'medium',
        attendees: 3,
        recommendedLook: 0, // 关联妆容ID
        notes: '拍照打卡',
    },
    {
        id: 3,
        time: '14:00',
        endTime: '16:00',
        title: '客户提案演示',
        type: 'work',
        location: '客户公司',
        icon: Users,
        importance: 'critical',
        attendees: 8,
        recommendedLook: 1,
        notes: '重要客户，需要专业形象',
    },
    {
        id: 4,
        time: '19:00',
        endTime: '22:00',
        title: '生日派对',
        type: 'party',
        location: 'SKP 顶层酒吧',
        icon: PartyPopper,
        importance: 'high',
        attendees: 20,
        recommendedLook: 2,
        notes: '闺蜜生日，需要惊艳出场',
    },
];

// AI Agent 搜索状态
const agentSearchStages = [
    { id: 1, platform: '小红书', icon: '📕', status: 'searching', count: 0, color: 'from-red-500 to-pink-500' },
    { id: 2, platform: '抖音', icon: '🎵', status: 'pending', count: 0, color: 'from-gray-900 to-gray-700' },
    { id: 3, platform: 'Instagram', icon: '📷', status: 'pending', count: 0, color: 'from-purple-500 to-pink-500' },
    { id: 4, platform: 'Pinterest', icon: '📌', status: 'pending', count: 0, color: 'from-red-600 to-red-500' },
    { id: 5, platform: '您的日历', icon: '📅', status: 'pending', count: 0, color: 'from-blue-500 to-cyan-500' },
];

// AI 生成的推荐妆容（与行程关联）
const aiGeneratedLooks = [
    {
        id: 1,
        name: '初春樱花妆',
        source: '小红书热榜 #1',
        matchScore: 98,
        style: '清新甜美',
        occasion: '约会/日常',
        trendViews: '1240万',
        colors: ['#FFB6C1', '#FFC0CB', '#FF69B4'],
        aiReason: '根据您的暖色调肤色和圆脸型，这款妆容能最大化提升您的甜美气质',
        generationTime: '2.3秒',
        renderQuality: '4K Ultra HD',
        // 行程关联
        linkedSchedule: {
            eventId: 2,
            eventTitle: '与闺蜜午餐',
            eventTime: '12:00',
            reason: '网红餐厅适合清新甜美风格，方便拍照打卡',
        },
    },
    {
        id: 2,
        name: '都市精英妆',
        source: '抖音同款 Top 3',
        matchScore: 94,
        style: '干练知性',
        occasion: '职场/会议',
        trendViews: '890万',
        colors: ['#8B4513', '#D2691E', '#CD853F'],
        aiReason: '针对您今日的商务会议，这款妆容展现专业与优雅的完美平衡',
        generationTime: '1.8秒',
        renderQuality: '4K Ultra HD',
        // 行程关联
        linkedSchedule: {
            eventId: 3,
            eventTitle: '客户提案演示',
            eventTime: '14:00',
            reason: '重要客户会议需要专业形象，大地色系显得稳重可信',
        },
    },
    {
        id: 3,
        name: '氛围感晚妆',
        source: 'Instagram 全球趋势',
        matchScore: 91,
        style: '性感魅惑',
        occasion: '派对/晚宴',
        trendViews: '2100万',
        colors: ['#8B0000', '#DC143C', '#FF1493'],
        aiReason: '基于您的五官特征，AI 优化了眼妆深度，打造立体深邃感',
        generationTime: '3.1秒',
        renderQuality: '4K Ultra HD',
        // 行程关联
        linkedSchedule: {
            eventId: 4,
            eventTitle: '生日派对',
            eventTime: '19:00',
            reason: 'SKP顶层酒吧灯光偏暗，深色妆容更出彩，适合惊艳出场',
        },
    },
];

// AI 穿搭推荐
const aiOutfitSuggestions = [
    { id: 1, name: '法式优雅套装', match: '与初春樱花妆绝配', price: '¥1,280' },
    { id: 2, name: '商务西装三件套', match: '搭配都市精英妆', price: '¥2,680' },
    { id: 3, name: '小黑裙 + 珍珠项链', match: '晚宴妆完美搭配', price: '¥1,890' },
];

// 步骤教程数据
const tutorialSteps = [
    { step: 1, title: '妆前护理', duration: '3分钟', voiceGuide: true, videoGenerated: true },
    { step: 2, title: '底妆打造', duration: '5分钟', voiceGuide: true, videoGenerated: true },
    { step: 3, title: '眉眼塑形', duration: '8分钟', voiceGuide: true, videoGenerated: true },
    { step: 4, title: '腮红修容', duration: '4分钟', voiceGuide: true, videoGenerated: true },
    { step: 5, title: '唇妆点缀', duration: '2分钟', voiceGuide: true, videoGenerated: true },
];

// 3D 模型参数
const modelParams = {
    faceShape: '鹅蛋脸',
    skinTone: '暖白色调 (NW20)',
    eyeShape: '杏眼',
    lipShape: '微笑唇',
    features: ['高颧骨', '饱满额头', '精致下巴'],
};

export default function RecommendationsPage() {
    const [searchStages, setSearchStages] = useState(agentSearchStages);
    const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
    const [isSearching, setIsSearching] = useState(true);
    const [selectedLook, setSelectedLook] = useState(0);
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [modelRotation, setModelRotation] = useState(0);
    const [renderProgress, setRenderProgress] = useState(0);
    const [showTutorial, setShowTutorial] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // 模拟 AI Agent 搜索过程
    useEffect(() => {
        if (!isSearching) return;

        const interval = setInterval(() => {
            setSearchStages(prev => {
                const updated = [...prev];
                if (currentSearchIndex < updated.length) {
                    const current = updated[currentSearchIndex];
                    if (current.count < 100) {
                        updated[currentSearchIndex] = {
                            ...current,
                            status: 'searching',
                            count: Math.min(current.count + Math.floor(Math.random() * 15) + 5, 100),
                        };
                    } else {
                        updated[currentSearchIndex] = { ...current, status: 'complete' };
                        if (currentSearchIndex < updated.length - 1) {
                            updated[currentSearchIndex + 1] = { ...updated[currentSearchIndex + 1], status: 'searching' };
                            setCurrentSearchIndex(i => i + 1);
                        } else {
                            setIsSearching(false);
                        }
                    }
                }
                return updated;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [isSearching, currentSearchIndex]);

    // 渲染进度动画
    useEffect(() => {
        if (renderProgress < 100) {
            const timer = setTimeout(() => {
                setRenderProgress(prev => Math.min(prev + 2, 100));
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [renderProgress]);

    const resetSearch = () => {
        setSearchStages(agentSearchStages);
        setCurrentSearchIndex(0);
        setIsSearching(true);
        setRenderProgress(0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* 顶部状态栏 */}
            <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm text-gray-400">AI Agent 在线</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Wifi className="w-4 h-4" />
                            <span>连接 4 个数据源</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
                        </button>
                        <button
                            onClick={resetSearch}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            重新搜索
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* 标题区 */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-pink-400" />
                        <span className="text-sm text-pink-300">AI Agentic 智能推荐系统</span>
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                            您的专属 AI 造型师
                        </span>
                    </h1>
                    <p className="text-gray-400">实时搜索全网趋势 · 3D建模实时渲染 · AI生成视频教程</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* 左侧：AI Agent 搜索面板 */}
                    <div className="space-y-6">
                        {/* AI Agent 搜索状态 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">AI Agent</h3>
                                        <p className="text-xs text-gray-400">正在搜索最新趋势...</p>
                                    </div>
                                </div>
                                <div className={cn(
                                    "px-2 py-1 rounded-full text-xs",
                                    isSearching ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                                )}>
                                    {isSearching ? '搜索中' : '已完成'}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {searchStages.map((stage, index) => (
                                    <div key={stage.id} className="relative">
                                        <div className="flex items-center gap-3 p-3 bg-black/20 rounded-xl">
                                            <div className={cn(
                                                "w-10 h-10 rounded-lg flex items-center justify-center text-xl",
                                                stage.status === 'complete' ? 'bg-green-500/20' :
                                                stage.status === 'searching' ? `bg-gradient-to-r ${stage.color}` :
                                                'bg-gray-700/50'
                                            )}>
                                                {stage.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium">{stage.platform}</span>
                                                    {stage.status === 'complete' && (
                                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                                    )}
                                                </div>
                                                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className={cn(
                                                            "h-full rounded-full",
                                                            stage.status === 'complete' ? 'bg-green-500' :
                                                            stage.status === 'searching' ? 'bg-gradient-to-r from-pink-500 to-purple-500' :
                                                            'bg-gray-600'
                                                        )}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${stage.count}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {stage.status === 'searching' && (
                                            <motion.div
                                                className="absolute -right-1 -top-1 w-3 h-3 bg-pink-500 rounded-full"
                                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {!isSearching && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl"
                                >
                                    <div className="flex items-center gap-2 text-green-400 text-sm">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>已分析 12,847 个妆容趋势</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">为您精选 3 款最匹配妆容</p>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* 3D 模型参数 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Scan className="w-5 h-5 text-cyan-400" />
                                <h3 className="font-semibold">您的 3D 数字分身</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-3 bg-black/20 rounded-xl">
                                    <div className="text-xs text-gray-400 mb-1">脸型</div>
                                    <div className="text-sm font-medium">{modelParams.faceShape}</div>
                                </div>
                                <div className="p-3 bg-black/20 rounded-xl">
                                    <div className="text-xs text-gray-400 mb-1">肤色</div>
                                    <div className="text-sm font-medium">{modelParams.skinTone}</div>
                                </div>
                                <div className="p-3 bg-black/20 rounded-xl">
                                    <div className="text-xs text-gray-400 mb-1">眼型</div>
                                    <div className="text-sm font-medium">{modelParams.eyeShape}</div>
                                </div>
                                <div className="p-3 bg-black/20 rounded-xl">
                                    <div className="text-xs text-gray-400 mb-1">唇型</div>
                                    <div className="text-sm font-medium">{modelParams.lipShape}</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {modelParams.features.map((feature, i) => (
                                    <span key={i} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            <button className="w-full mt-4 py-2 border border-cyan-500/50 text-cyan-400 rounded-xl text-sm hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2">
                                <Camera className="w-4 h-4" />
                                更新面部数据
                            </button>
                        </motion.div>

                        {/* 今日行程 - AI 关联推荐 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-orange-400" />
                                    <h3 className="font-semibold">今日行程</h3>
                                </div>
                                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                                    已同步日历
                                </span>
                            </div>

                            <div className="space-y-3">
                                {todaySchedule.map((event, index) => {
                                    const EventIcon = event.icon;
                                    const isLinkedToCurrentLook = aiGeneratedLooks[selectedLook]?.linkedSchedule?.eventId === event.id;
                                    return (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            className={cn(
                                                "p-3 rounded-xl transition-all cursor-pointer",
                                                isLinkedToCurrentLook
                                                    ? "bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30"
                                                    : "bg-black/20 hover:bg-black/30"
                                            )}
                                            onClick={() => {
                                                // 找到与该事件关联的妆容
                                                const lookIndex = aiGeneratedLooks.findIndex(
                                                    look => look.linkedSchedule?.eventId === event.id
                                                );
                                                if (lookIndex !== -1) {
                                                    setSelectedLook(lookIndex);
                                                    setRenderProgress(0);
                                                }
                                            }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                                    event.type === 'work' ? "bg-blue-500/20" :
                                                    event.type === 'social' ? "bg-green-500/20" :
                                                    event.type === 'party' ? "bg-purple-500/20" :
                                                    "bg-gray-500/20"
                                                )}>
                                                    <EventIcon className={cn(
                                                        "w-5 h-5",
                                                        event.type === 'work' ? "text-blue-400" :
                                                        event.type === 'social' ? "text-green-400" :
                                                        event.type === 'party' ? "text-purple-400" :
                                                        "text-gray-400"
                                                    )} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm font-medium truncate">{event.title}</span>
                                                        {event.importance === 'critical' && (
                                                            <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[10px] rounded">重要</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{event.time} - {event.endTime}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                        <MapPin className="w-3 h-3" />
                                                        <span className="truncate">{event.location}</span>
                                                    </div>
                                                </div>
                                                {isLinkedToCurrentLook && (
                                                    <div className="flex-shrink-0">
                                                        <CheckCircle className="w-5 h-5 text-orange-400" />
                                                    </div>
                                                )}
                                            </div>
                                            {isLinkedToCurrentLook && (
                                                <div className="mt-2 pt-2 border-t border-white/10">
                                                    <p className="text-xs text-orange-300">
                                                        ✨ 已为此场合推荐 "{aiGeneratedLooks[selectedLook].name}"
                                                    </p>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="mt-4 p-3 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-xl">
                                <p className="text-xs text-gray-400">
                                    <span className="text-orange-400 font-medium">AI 智能分析：</span> 根据您今日 4 个行程，
                                    AI 已为每个场合匹配最佳妆容，点击行程可快速切换推荐
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* 中间：3D 模型预览 + 实时渲染 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                    >
                        {/* 3D 模型展示区 */}
                        <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-800 via-gray-900 to-black">
                            {/* 模拟 3D 模型 */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    {/* 头部轮廓 */}
                                    <motion.div
                                        className="w-48 h-64 rounded-[50%] border-2 border-pink-500/50 relative overflow-hidden"
                                        style={{ transform: `rotateY(${modelRotation}deg)` }}
                                    >
                                        {/* 面部网格 */}
                                        <div className="absolute inset-0 opacity-30">
                                            {[...Array(8)].map((_, i) => (
                                                <div key={i} className="absolute w-full h-px bg-cyan-500/50" style={{ top: `${(i + 1) * 12}%` }} />
                                            ))}
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="absolute h-full w-px bg-cyan-500/50" style={{ left: `${(i + 1) * 16}%` }} />
                                            ))}
                                        </div>

                                        {/* 妆容渲染层 */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-transparent to-purple-500/30"
                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                        />

                                        {/* 眼妆区域 */}
                                        <div className="absolute top-[35%] left-[20%] w-[25%] h-[12%] rounded-full bg-gradient-to-r from-pink-400/40 to-purple-400/40" />
                                        <div className="absolute top-[35%] right-[20%] w-[25%] h-[12%] rounded-full bg-gradient-to-r from-purple-400/40 to-pink-400/40" />

                                        {/* 唇部区域 */}
                                        <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[35%] h-[8%] rounded-full bg-gradient-to-r from-red-400/50 via-pink-400/50 to-red-400/50" />
                                    </motion.div>

                                    {/* 扫描线效果 */}
                                    <motion.div
                                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                                    />
                                </div>
                            </div>

                            {/* 渲染进度 */}
                            {renderProgress < 100 && (
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                                        <span>AI 渲染中...</span>
                                        <span>{renderProgress}%</span>
                                    </div>
                                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-pink-500 to-cyan-500"
                                            style={{ width: `${renderProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 控制按钮 */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button
                                    onClick={() => setModelRotation(r => r - 15)}
                                    className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            </div>

                            {/* 当前妆容信息 */}
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl p-3">
                                <div className="text-xs text-gray-400 mb-1">当前渲染</div>
                                <div className="font-semibold text-pink-400">{aiGeneratedLooks[selectedLook].name}</div>
                                <div className="text-xs text-gray-400 mt-1">{aiGeneratedLooks[selectedLook].renderQuality}</div>
                            </div>
                        </div>

                        {/* 妆容切换控制 */}
                        <div className="p-4 bg-black/30">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">AI 推荐妆容</span>
                                <span className="text-xs text-pink-400">{selectedLook + 1} / {aiGeneratedLooks.length}</span>
                            </div>
                            <div className="flex gap-2">
                                {aiGeneratedLooks.map((look, index) => (
                                    <button
                                        key={look.id}
                                        onClick={() => {
                                            setSelectedLook(index);
                                            setRenderProgress(0);
                                        }}
                                        className={cn(
                                            "flex-1 p-3 rounded-xl border transition-all",
                                            selectedLook === index
                                                ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/50"
                                                : "bg-black/30 border-white/10 hover:border-white/30"
                                        )}
                                    >
                                        <div className="flex gap-1 mb-2">
                                            {look.colors.map((color, i) => (
                                                <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                                            ))}
                                        </div>
                                        <div className="text-xs font-medium truncate">{look.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 右侧：推荐详情 + 教程 */}
                    <div className="space-y-6">
                        {/* 当前推荐详情 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                                        <Wand2 className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{aiGeneratedLooks[selectedLook].name}</h3>
                                        <p className="text-xs text-gray-400">{aiGeneratedLooks[selectedLook].source}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                                        {aiGeneratedLooks[selectedLook].matchScore}%
                                    </div>
                                    <div className="text-xs text-gray-400">匹配度</div>
                                </div>
                            </div>

                            <div className="p-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl mb-4">
                                <div className="flex items-start gap-2">
                                    <Sparkles className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-300">{aiGeneratedLooks[selectedLook].aiReason}</p>
                                </div>
                            </div>

                            {/* 关联行程信息 */}
                            {aiGeneratedLooks[selectedLook].linkedSchedule && (
                                <div className="p-3 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-4 h-4 text-orange-400" />
                                        <span className="text-sm font-medium text-orange-300">为此行程专属推荐</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 bg-black/20 rounded-lg mb-2">
                                        <div className="text-lg font-bold text-orange-400">
                                            {aiGeneratedLooks[selectedLook].linkedSchedule.eventTime}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">
                                                {aiGeneratedLooks[selectedLook].linkedSchedule.eventTitle}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        <span className="text-orange-400">推荐理由：</span>
                                        {aiGeneratedLooks[selectedLook].linkedSchedule.reason}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-3 bg-black/20 rounded-xl">
                                    <div className="text-xs text-gray-400">风格</div>
                                    <div className="text-sm font-medium">{aiGeneratedLooks[selectedLook].style}</div>
                                </div>
                                <div className="p-3 bg-black/20 rounded-xl">
                                    <div className="text-xs text-gray-400">场合</div>
                                    <div className="text-sm font-medium">{aiGeneratedLooks[selectedLook].occasion}</div>
                                </div>
                                <div className="p-3 bg-black/20 rounded-xl">
                                    <div className="text-xs text-gray-400">全网热度</div>
                                    <div className="text-sm font-medium flex items-center gap-1">
                                        <Eye className="w-3 h-3 text-pink-400" />
                                        {aiGeneratedLooks[selectedLook].trendViews}
                                    </div>
                                </div>
                                <div className="p-3 bg-black/20 rounded-xl">
                                    <div className="text-xs text-gray-400">AI生成耗时</div>
                                    <div className="text-sm font-medium flex items-center gap-1">
                                        <Zap className="w-3 h-3 text-yellow-400" />
                                        {aiGeneratedLooks[selectedLook].generationTime}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors">
                                    <Heart className="w-4 h-4" />
                                    收藏
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    分享
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors">
                                    <Download className="w-4 h-4" />
                                    导出
                                </button>
                            </div>
                        </motion.div>

                        {/* AI 视频教程生成 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Video className="w-5 h-5 text-cyan-400" />
                                    <h3 className="font-semibold">AI 视频教程</h3>
                                </div>
                                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                                    AI 生成
                                </span>
                            </div>

                            <div className="relative aspect-video bg-black/40 rounded-xl mb-4 overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button
                                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                                        className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        {isVideoPlaying ? (
                                            <Pause className="w-8 h-8 text-white" />
                                        ) : (
                                            <Play className="w-8 h-8 text-white ml-1" />
                                        )}
                                    </button>
                                </div>
                                <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 text-xs text-white/70">
                                    <span>00:00</span>
                                    <div className="flex-1 h-1 bg-white/20 rounded-full">
                                        <div className="w-0 h-full bg-cyan-400 rounded-full" />
                                    </div>
                                    <span>22:00</span>
                                </div>
                                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/50 rounded-full text-xs">
                                    <Volume2 className="w-3 h-3" />
                                    语音指导
                                </div>
                            </div>

                            {/* 步骤列表 */}
                            <div className="space-y-2">
                                {tutorialSteps.map((step, index) => (
                                    <button
                                        key={step.step}
                                        onClick={() => setCurrentStep(index)}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
                                            currentStep === index
                                                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30"
                                                : "bg-black/20 hover:bg-black/30"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                                            currentStep === index ? "bg-cyan-500 text-white" : "bg-gray-700 text-gray-400"
                                        )}>
                                            {step.step}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="text-sm font-medium">{step.title}</div>
                                            <div className="text-xs text-gray-400">{step.duration}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {step.voiceGuide && <Volume2 className="w-4 h-4 text-green-400" />}
                                            {step.videoGenerated && <Video className="w-4 h-4 text-cyan-400" />}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                                <Play className="w-5 h-5" />
                                开始 AI 教程
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* 底部：穿搭推荐 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Shirt className="w-5 h-5 text-purple-400" />
                            <h3 className="font-semibold">AI 穿搭建议</h3>
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                                妆容联动
                            </span>
                        </div>
                        <button className="text-sm text-purple-400 hover:text-purple-300">
                            查看更多 <ChevronRight className="w-4 h-4 inline" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {aiOutfitSuggestions.map((outfit, index) => (
                            <motion.div
                                key={outfit.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="p-4 bg-black/30 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors cursor-pointer group"
                            >
                                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-3 flex items-center justify-center">
                                    <Shirt className="w-12 h-12 text-purple-300/50 group-hover:text-purple-300 transition-colors" />
                                </div>
                                <h4 className="font-medium mb-1">{outfit.name}</h4>
                                <p className="text-xs text-gray-400 mb-2">{outfit.match}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-purple-400">{outfit.price}</span>
                                    <button className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs rounded-full transition-colors">
                                        试穿
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* AI 能力说明 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 grid md:grid-cols-4 gap-4"
                >
                    {[
                        { icon: Search, title: '全网趋势搜索', desc: '实时爬取 4 大平台', color: 'from-pink-500 to-rose-500' },
                        { icon: Cpu, title: '3D 实时渲染', desc: '4K 超清数字分身', color: 'from-cyan-500 to-blue-500' },
                        { icon: Video, title: 'AI 视频生成', desc: '个性化教程生成', color: 'from-purple-500 to-indigo-500' },
                        { icon: MessageCircle, title: '语音智能指导', desc: '实时语音互动', color: 'from-green-500 to-emerald-500' },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center",
                                feature.color
                            )}>
                                <feature.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="text-sm font-medium">{feature.title}</div>
                                <div className="text-xs text-gray-400">{feature.desc}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
