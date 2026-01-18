'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    Sparkles,
    Gift,
    Calendar,
    Trophy,
    Star,
    Clock,
    ShoppingBag,
    Camera,
    MessageCircle,
    Volume2,
    VolumeX,
    Play,
    Pause,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import SketchFace from '@/components/workflow/SketchFace';
import CompanionChat from '@/components/workflow/CompanionChat';

// 核心体验场景 - 获得感、成就感、仪式感、炫耀感
const coreExperiences = [
    {
        id: 'social-share',
        title: '妆容打卡分享',
        icon: '📸',
        category: '炫耀感',
        description: '一键生成精美妆容对比图，分享到小红书/朋友圈，收获点赞和羡慕',
        features: [
            'Before/After 智能对比图生成',
            '自动添加产品标签水印',
            '一键分享小红书/抖音/朋友圈',
            '闺蜜圈互动点赞评论',
        ],
        reward: '分享获赞超100，兑换YSL口红小样',
        stats: '已有 12,847 位姐妹分享',
        bgColor: 'from-pink-100 to-rose-100',
    },
    {
        id: 'points-exchange',
        title: '积分兑换彩妆',
        icon: '🎁',
        category: '获得感',
        description: '每日打卡、完成任务、分享互动都能获得积分，兑换真实大牌彩妆',
        features: [
            '500分兑换口红小样',
            '1500分兑换眼影盘',
            '3000分兑换正装护肤品',
            '限量联名款优先兑换权',
        ],
        reward: '本月已有 2,341 人成功兑换',
        stats: '合作品牌：MAC、YSL、兰蔻、雅诗兰黛',
        bgColor: 'from-amber-100 to-orange-100',
    },
    {
        id: 'live-makeover',
        title: '直播变装秀',
        icon: '🎬',
        category: '仪式感',
        description: '开启直播模式，AI全程指导化妆，闺蜜实时围观打气，记录蜕变全过程',
        features: [
            '直播化妆全程记录',
            '闺蜜可连线围观+弹幕',
            'AI实时点评鼓励',
            '自动剪辑精彩片段',
        ],
        reward: '直播时长超30分钟，获得"直播女王"勋章',
        stats: '平均每场直播收获 156 条打气弹幕',
        bgColor: 'from-purple-100 to-indigo-100',
    },
    {
        id: 'ai-compliment',
        title: 'AI闺蜜夸夸群',
        icon: '💬',
        category: '成就感',
        description: 'AI化身您的专属闺蜜团，随时随地花式夸奖，治愈您的每一天',
        features: [
            '每日定制甜言蜜语',
            '化妆进步实时表扬',
            '低落时暖心鼓励',
            '生日/纪念日特别惊喜',
        ],
        reward: '累计收到1000条夸奖，解锁"万人迷"称号',
        stats: '今日已发送 89,234 条甜言蜜语',
        bgColor: 'from-pink-100 to-purple-100',
    },
    {
        id: 'ranking-glory',
        title: '变美排行榜',
        icon: '🏆',
        category: '成就感',
        description: '每周评选进步最大的美妆达人，登上荣誉榜，获得专属奖励',
        features: [
            '周榜/月榜/总榜三榜齐发',
            '进步值、分享量、互动量多维度',
            '前10名获得实物奖励',
            '登榜专属头像框+称号',
        ],
        reward: '登上周榜 Top10，获得 500 积分 + 限定头像框',
        stats: '本周榜首：@小仙女Coco 进步值 +89',
        bgColor: 'from-yellow-100 to-amber-100',
    },
    {
        id: 'bestie-circle',
        title: '闺蜜美妆圈',
        icon: '👯',
        category: '炫耀感',
        description: '邀请闺蜜一起变美，组建专属美妆圈，互相监督打卡，一起兑换奖励',
        features: [
            '创建/加入闺蜜圈（最多8人）',
            '圈内打卡互相可见',
            '组队任务双倍积分',
            '圈内排名良性竞争',
        ],
        reward: '邀请3位闺蜜加入，双方各得200积分',
        stats: '已有 5,621 个闺蜜圈在一起变美',
        bgColor: 'from-green-100 to-emerald-100',
    },
];

// 今日任务
const dailyTasks = [
    { id: 1, title: '完成晨间护肤', points: 20, completed: true, icon: '🌅' },
    { id: 2, title: '今日首次化妆', points: 30, completed: true, icon: '💄' },
    { id: 3, title: '午间补妆打卡', points: 15, completed: false, icon: '☀️' },
    { id: 4, title: '晚间护肤仪式', points: 25, completed: false, icon: '🌙' },
    { id: 5, title: '分享今日妆容', points: 50, completed: false, icon: '📸' },
];

// 限时活动
const limitedEvents = [
    {
        id: 1,
        title: '春日樱花妆挑战',
        endTime: '2天后结束',
        reward: '限定樱花唇釉小样',
        participants: 2847,
        icon: '🌸',
    },
    {
        id: 2,
        title: '连续签到7天',
        endTime: '还差2天',
        reward: '高级眼影教程解锁',
        participants: 5621,
        icon: '🎁',
    },
];

export default function CompanionPage() {
    const [selectedScenario, setSelectedScenario] = useState(coreExperiences[0]);
    const [armAction, setArmAction] = useState<'idle' | 'picking' | 'handing' | 'waving' | 'organizing'>('idle');
    const [isPlaying, setIsPlaying] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [totalPoints, setTotalPoints] = useState(2680);

    // 自动演示机械臂动作
    useEffect(() => {
        if (!isPlaying) return;

        const actions: ('idle' | 'picking' | 'handing' | 'waving' | 'organizing')[] = [
            'waving', 'picking', 'handing', 'organizing', 'idle'
        ];
        let index = 0;

        const interval = setInterval(() => {
            setArmAction(actions[index]);
            index = (index + 1) % actions.length;
        }, 3000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleTaskComplete = (taskId: number, points: number) => {
        setTotalPoints(prev => prev + points);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="text-3xl">🤖</span>
                            AI陪伴体验
                        </h1>
                        <p className="text-gray-600">您的专属美妆闺蜜，24小时贴心陪伴</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Voice Toggle */}
                        <button
                            onClick={() => setVoiceEnabled(!voiceEnabled)}
                            className={cn(
                                "p-3 rounded-full transition-all",
                                voiceEnabled ? "bg-pink-100 text-pink-600" : "bg-gray-100 text-gray-400"
                            )}
                        >
                            {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                        </button>
                        {/* Demo Toggle */}
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                                isPlaying
                                    ? "bg-pink-500 text-white"
                                    : "bg-white text-gray-700 border border-gray-200"
                            )}
                        >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            <span>{isPlaying ? '停止演示' : '开始演示'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left: Robot Mirror with Arms */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Mirror Display */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <motion.div
                                    className="w-3 h-3 bg-green-500 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                                <span className="text-sm text-gray-600">小镜在线中</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">机械臂状态:</span>
                                <span className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium",
                                    armAction === 'idle' ? "bg-gray-100 text-gray-600" :
                                    armAction === 'waving' ? "bg-pink-100 text-pink-600" :
                                    armAction === 'picking' ? "bg-blue-100 text-blue-600" :
                                    armAction === 'handing' ? "bg-green-100 text-green-600" :
                                    "bg-purple-100 text-purple-600"
                                )}>
                                    {armAction === 'idle' ? '待命' :
                                     armAction === 'waving' ? '打招呼' :
                                     armAction === 'picking' ? '拾取中' :
                                     armAction === 'handing' ? '递送中' : '整理中'}
                                </span>
                            </div>
                        </div>

                        {/* Voice Bubble */}
                        {voiceEnabled && (
                            <motion.div
                                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-3 rounded-xl mb-4 flex items-center gap-3"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                >
                                    🔊
                                </motion.div>
                                <div className="flex-1">
                                    <p className="text-sm">
                                        {armAction === 'waving' && "女主人好~今天也是美美的一天呢！"}
                                        {armAction === 'picking' && "让我帮您拿一下口红..."}
                                        {armAction === 'handing' && "请接好，这是您下一步需要的产品~"}
                                        {armAction === 'organizing' && "我来帮您整理一下化妆台..."}
                                        {armAction === 'idle' && "需要我帮忙吗？随时叫我哦~"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[1,2,3,4].map(i => (
                                        <motion.div
                                            key={i}
                                            className="w-1 h-3 bg-white rounded-full"
                                            animate={{ scaleY: [0.3, 1, 0.3] }}
                                            transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        <div className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl p-4">
                            <SketchFace
                                showMetrics={true}
                                showRoboticArms={true}
                                armAction={armAction}
                                heldItem={armAction === 'handing' || armAction === 'picking' ? '口红' : ''}
                                beautyScore={78}
                            />
                        </div>

                        {/* Arm Control Buttons */}
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                            {[
                                { action: 'idle' as const, label: '待命', icon: '🤖' },
                                { action: 'waving' as const, label: '打招呼', icon: '👋' },
                                { action: 'picking' as const, label: '拾取', icon: '✋' },
                                { action: 'handing' as const, label: '递送', icon: '🤲' },
                                { action: 'organizing' as const, label: '整理', icon: '🧹' },
                            ].map(({ action, label, icon }) => (
                                <motion.button
                                    key={action}
                                    onClick={() => setArmAction(action)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                                        armAction === action
                                            ? "bg-pink-500 text-white shadow-lg"
                                            : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300"
                                    )}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Daily Beauty Rituals */}
                    <div className="bg-white rounded-2xl shadow-lg p-5">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-pink-500" />
                            专属美丽时刻
                        </h2>

                        {/* Category Filter */}
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {['全部', '获得感', '成就感', '仪式感', '炫耀感'].map((cat) => (
                                <button
                                    key={cat}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                                        cat === '全部'
                                            ? "bg-pink-500 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Experience Cards */}
                        <div className="grid md:grid-cols-3 gap-3 mb-4">
                            {coreExperiences.map((scenario) => (
                                <motion.div
                                    key={scenario.id}
                                    onClick={() => setSelectedScenario(scenario)}
                                    className={cn(
                                        "p-4 rounded-xl cursor-pointer transition-all border-2 relative",
                                        selectedScenario.id === scenario.id
                                            ? "border-pink-500 bg-pink-50"
                                            : "border-transparent bg-gray-50 hover:bg-gray-100"
                                    )}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Category Badge */}
                                    <span className={cn(
                                        "absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full",
                                        scenario.category === '获得感' ? "bg-amber-100 text-amber-700" :
                                        scenario.category === '成就感' ? "bg-purple-100 text-purple-700" :
                                        scenario.category === '仪式感' ? "bg-blue-100 text-blue-700" :
                                        "bg-pink-100 text-pink-700"
                                    )}>
                                        {scenario.category}
                                    </span>
                                    <div className="text-2xl mb-2">{scenario.icon}</div>
                                    <h3 className="font-semibold text-gray-800 text-sm">{scenario.title}</h3>
                                </motion.div>
                            ))}
                        </div>

                        {/* Selected Experience Detail */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedScenario.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={cn(
                                    "rounded-xl p-5 bg-gradient-to-br",
                                    selectedScenario.bgColor
                                )}
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-4xl">{selectedScenario.icon}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-xl font-bold text-gray-800">{selectedScenario.title}</h3>
                                            <span className={cn(
                                                "text-xs px-2 py-0.5 rounded-full",
                                                selectedScenario.category === '获得感' ? "bg-amber-200 text-amber-800" :
                                                selectedScenario.category === '成就感' ? "bg-purple-200 text-purple-800" :
                                                selectedScenario.category === '仪式感' ? "bg-blue-200 text-blue-800" :
                                                "bg-pink-200 text-pink-800"
                                            )}>
                                                {selectedScenario.category}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4">{selectedScenario.description}</p>

                                        <div className="grid md:grid-cols-2 gap-3 mb-4">
                                            {selectedScenario.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <span className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center text-xs">✓</span>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="bg-white/80 rounded-lg p-3">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Gift className="w-4 h-4 text-pink-500" />
                                                    <span className="font-medium text-gray-800">奖励:</span>
                                                    <span className="text-pink-600">{selectedScenario.reward}</span>
                                                </div>
                                            </div>
                                            <div className="bg-white/60 rounded-lg p-2">
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Sparkles className="w-3 h-3" />
                                                    {selectedScenario.stats}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right: Chat + Tasks + Events */}
                <div className="space-y-6">
                    {/* Companion Chat */}
                    <div className="relative">
                        <CompanionChat
                            userName="小美"
                            timeOfDay="morning"
                            skinScore={78}
                            isActive={true}
                        />
                    </div>

                    {/* Daily Tasks */}
                    <div className="bg-white rounded-2xl shadow-lg p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Star className="w-5 h-5 text-amber-500" />
                                今日任务
                            </h3>
                            <div className="text-sm text-gray-500">
                                {dailyTasks.filter(t => t.completed).length}/{dailyTasks.length} 已完成
                            </div>
                        </div>
                        <div className="space-y-2">
                            {dailyTasks.map((task) => (
                                <motion.div
                                    key={task.id}
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-lg transition-all",
                                        task.completed ? "bg-green-50" : "bg-gray-50 hover:bg-gray-100 cursor-pointer"
                                    )}
                                    whileHover={{ scale: task.completed ? 1 : 1.02 }}
                                    onClick={() => !task.completed && handleTaskComplete(task.id, task.points)}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{task.icon}</span>
                                        <span className={cn(
                                            "text-sm",
                                            task.completed ? "text-gray-400 line-through" : "text-gray-700"
                                        )}>
                                            {task.title}
                                        </span>
                                    </div>
                                    <div className={cn(
                                        "px-2 py-1 rounded-full text-xs font-medium",
                                        task.completed
                                            ? "bg-green-100 text-green-600"
                                            : "bg-amber-100 text-amber-600"
                                    )}>
                                        {task.completed ? '✓ 已完成' : `+${task.points}分`}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Limited Events */}
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-lg p-5 text-white">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            限时活动
                        </h3>
                        <div className="space-y-3">
                            {limitedEvents.map((event) => (
                                <motion.div
                                    key={event.id}
                                    className="bg-white/20 backdrop-blur rounded-xl p-4"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">{event.icon}</span>
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{event.title}</h4>
                                            <p className="text-xs text-white/80 mt-1">{event.reward}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs text-white/60">{event.participants} 人参与</span>
                                                <span className="text-xs bg-white/30 px-2 py-1 rounded-full">{event.endTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Total Points */}
                    <motion.div
                        className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-5 text-white text-center"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Sparkles className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-4xl font-bold">{totalPoints}</div>
                        <div className="text-white/80">美丽积分</div>
                        <p className="text-xs mt-2 text-white/60">再获得320分可兑换口红小样</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
