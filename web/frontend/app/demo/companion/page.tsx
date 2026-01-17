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

// 成瘾使用场景
const addictiveScenarios = [
    {
        id: 'morning-ritual',
        title: '晨间唤醒仪式',
        icon: '🌅',
        description: '每天早起，小镜用温柔的声音叫醒您，递上洁面产品，开启美丽的一天',
        features: [
            '语音唤醒 + 天气播报',
            '机械臂递送洁面乳',
            '3分钟快速护肤指导',
            '今日穿搭建议',
        ],
        reward: '连续7天早起化妆，解锁"早起女神"称号 + 100积分',
        bgColor: 'from-amber-100 to-orange-100',
    },
    {
        id: 'lunch-touch-up',
        title: '午间补妆闺蜜',
        icon: '☀️',
        description: '午餐后，小镜贴心提醒您补妆，帮您整理化妆包，递上补妆产品',
        features: [
            '智能检测妆容脱落',
            '机械臂递送补妆产品',
            '30秒快速补妆教程',
            '拍照记录对比效果',
        ],
        reward: '完成5次午间补妆，解锁"精致女孩"徽章',
        bgColor: 'from-yellow-100 to-amber-100',
    },
    {
        id: 'date-prep',
        title: '约会前紧急美颜',
        icon: '💕',
        description: '约会前1小时，小镜帮您挑选最适合的妆容，全程语音指导',
        features: [
            '根据约会场合推荐妆容',
            '机械臂整理所需产品',
            '实时追踪化妆进度',
            '紧急突发问题处理',
        ],
        reward: '成功完成3次约会妆，获得"恋爱达人"限定教程',
        bgColor: 'from-pink-100 to-rose-100',
    },
    {
        id: 'night-care',
        title: '睡前护肤仪式',
        icon: '🌙',
        description: '晚间护肤时光，小镜陪您卸妆，聊聊今天的心情，推荐助眠音乐',
        features: [
            '卸妆步骤语音指导',
            '机械臂递送护肤品',
            '皮肤修复建议',
            '舒缓音乐 + 晚安问候',
        ],
        reward: '连续14天晚间护肤，解锁"护肤女王"成就',
        bgColor: 'from-purple-100 to-indigo-100',
    },
    {
        id: 'shopping-advisor',
        title: '智能购物顾问',
        icon: '🛍️',
        description: '根据您的使用习惯，小镜自动追踪产品余量，推荐最优购买时机',
        features: [
            '产品余量智能监测',
            '价格波动提醒',
            '双11/618最优购买清单',
            '专属折扣码推送',
        ],
        reward: '省钱超过500元，解锁"省钱小能手"成就',
        bgColor: 'from-green-100 to-emerald-100',
    },
    {
        id: 'skill-upgrade',
        title: '化妆技能升级',
        icon: '📚',
        description: '每周解锁新的化妆教程，从入门到进阶，机械臂手把手示范',
        features: [
            '阶梯式教程解锁',
            '机械臂示范动作',
            'AI评分打分系统',
            '作品晒图社区',
        ],
        reward: '完成10节课程，获得"化妆师认证"电子证书',
        bgColor: 'from-blue-100 to-cyan-100',
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
    const [selectedScenario, setSelectedScenario] = useState(addictiveScenarios[0]);
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

                        {/* Scenario Cards */}
                        <div className="grid md:grid-cols-3 gap-3 mb-4">
                            {addictiveScenarios.map((scenario) => (
                                <motion.div
                                    key={scenario.id}
                                    onClick={() => setSelectedScenario(scenario)}
                                    className={cn(
                                        "p-4 rounded-xl cursor-pointer transition-all border-2",
                                        selectedScenario.id === scenario.id
                                            ? "border-pink-500 bg-pink-50"
                                            : "border-transparent bg-gray-50 hover:bg-gray-100"
                                    )}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="text-2xl mb-2">{scenario.icon}</div>
                                    <h3 className="font-semibold text-gray-800 text-sm">{scenario.title}</h3>
                                </motion.div>
                            ))}
                        </div>

                        {/* Selected Scenario Detail */}
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
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedScenario.title}</h3>
                                        <p className="text-gray-600 mb-4">{selectedScenario.description}</p>

                                        <div className="grid md:grid-cols-2 gap-3 mb-4">
                                            {selectedScenario.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <span className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center text-xs">✓</span>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-white/80 rounded-lg p-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Trophy className="w-4 h-4 text-amber-500" />
                                                <span className="font-medium text-gray-800">坚持奖励:</span>
                                                <span className="text-pink-600">{selectedScenario.reward}</span>
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
