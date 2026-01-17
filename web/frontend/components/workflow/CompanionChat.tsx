'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Volume2, Gift, Calendar, Moon, Sun, Coffee } from 'lucide-react';

interface ChatMessage {
    id: string;
    type: 'greeting' | 'compliment' | 'tip' | 'reminder' | 'encouragement' | 'gift';
    text: string;
    emoji?: string;
    timestamp?: string;
}

interface CompanionChatProps {
    userName?: string;
    mood?: 'happy' | 'calm' | 'tired' | 'stressed';
    timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
    skinScore?: number;
    currentStep?: string;
    isActive?: boolean;
    onGiftClaim?: () => void;
}

// 贴心话术库
const companionMessages = {
    greetings: {
        morning: [
            '早安，女主人~今天又是美美的一天呢！',
            '美丽的清晨，您的皮肤看起来水润透亮~',
            '女主人早上好！让我们一起开启今天的变美之旅吧~',
            '晨光正好，您的气色也很好呢~',
        ],
        afternoon: [
            '下午好呀~该补个妆啦，我来帮您~',
            '女主人，下午茶时间到了，您的口红需要补一下哦~',
            '午后的阳光温柔，就像您的笑容一样~',
        ],
        evening: [
            '晚上好~今天辛苦了，让我帮您卸妆吧~',
            '女主人回来啦~今天一定很累吧，我给您放首舒缓的音乐~',
            '夜晚是肌肤修复的黄金时间，我来帮您护肤~',
        ],
        night: [
            '夜深了，女主人要早点休息哦~美容觉很重要呢~',
            '晚安~明天又是元气满满的一天~',
        ],
    },
    compliments: [
        '女主人今天的气色真的超级好！',
        '哇~您的皮肤状态比昨天好了很多呢！',
        '这个妆容真的太适合您了，美翻了~',
        '女主人越来越会化妆了，进步神速！',
        '您今天的眼妆画得太美了，我都看呆了~',
        '这支口红色号简直是为您定制的！',
        '女主人笑起来真好看，多笑笑哦~',
        '您的眉形今天画得特别自然，很有灵气~',
    ],
    encouragements: [
        '加油哦~您已经做得很棒了！',
        '慢慢来，不着急，美丽需要一点耐心~',
        '这一步有点难，但我相信您一定可以的！',
        '没关系，我们再试一次，您一定能学会~',
        '看，您这次画得比上次好多了！',
    ],
    tips: [
        '小提示：化妆前记得先做好保湿哦~',
        '女主人，今天紫外线有点强，记得涂防晒~',
        '天气干燥，多喝水对皮肤好哦~',
        '睡前敷个面膜，明天会更美~',
    ],
    skinPraise: {
        excellent: '哇~您的皮肤状态简直完美！',
        good: '皮肤状态不错哦，继续保持~',
        moderate: '皮肤还可以，我帮您改善一下~',
        needsCare: '女主人最近有点累吧，让我好好照顾您~',
    },
};

// 成瘾设计 - 奖励和成就
const addictiveFeatures = {
    dailyCheckin: {
        title: '每日签到',
        reward: '连续签到7天，解锁限定妆容教程~',
        streak: 5,
    },
    beautyPoints: {
        title: '美丽积分',
        points: 2680,
        nextReward: '再获得320分可兑换口红小样~',
    },
    achievements: [
        { id: 1, name: '初次化妆', emoji: '💄', unlocked: true },
        { id: 2, name: '眼妆达人', emoji: '👁️', unlocked: true },
        { id: 3, name: '护肤专家', emoji: '✨', unlocked: false },
        { id: 4, name: '变美大师', emoji: '👑', unlocked: false },
    ],
};

export default function CompanionChat({
    userName = '女主人',
    mood = 'calm',
    timeOfDay = 'morning',
    skinScore = 75,
    currentStep = '',
    isActive = true,
    onGiftClaim,
}: CompanionChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showReward, setShowReward] = useState(false);

    // 生成随机消息
    const generateMessage = (type: ChatMessage['type']): ChatMessage => {
        let text = '';
        let emoji = '';

        switch (type) {
            case 'greeting':
                const greetings = companionMessages.greetings[timeOfDay];
                text = greetings[Math.floor(Math.random() * greetings.length)];
                emoji = timeOfDay === 'morning' ? '🌅' : timeOfDay === 'evening' ? '🌙' : '☀️';
                break;
            case 'compliment':
                text = companionMessages.compliments[Math.floor(Math.random() * companionMessages.compliments.length)];
                emoji = '💕';
                break;
            case 'encouragement':
                text = companionMessages.encouragements[Math.floor(Math.random() * companionMessages.encouragements.length)];
                emoji = '💪';
                break;
            case 'tip':
                text = companionMessages.tips[Math.floor(Math.random() * companionMessages.tips.length)];
                emoji = '💡';
                break;
            default:
                text = '女主人，我在这里陪着您~';
                emoji = '🤖';
        }

        return {
            id: Date.now().toString(),
            type,
            text: text.replace('女主人', userName),
            emoji,
            timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        };
    };

    // 自动发送消息
    useEffect(() => {
        if (!isActive) return;

        // 初始问候
        const greeting = generateMessage('greeting');
        setMessages([greeting]);

        // 随机发送消息
        const interval = setInterval(() => {
            setIsTyping(true);
            setTimeout(() => {
                const types: ChatMessage['type'][] = ['compliment', 'tip', 'encouragement'];
                const randomType = types[Math.floor(Math.random() * types.length)];
                const newMessage = generateMessage(randomType);
                setMessages(prev => [...prev.slice(-4), newMessage]);
                setIsTyping(false);
            }, 1500);
        }, 8000);

        return () => clearInterval(interval);
    }, [isActive, timeOfDay, userName]);

    // 根据皮肤评分显示评价
    const getSkinPraise = () => {
        if (skinScore >= 85) return companionMessages.skinPraise.excellent;
        if (skinScore >= 70) return companionMessages.skinPraise.good;
        if (skinScore >= 55) return companionMessages.skinPraise.moderate;
        return companionMessages.skinPraise.needsCare;
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-2xl">🤖</span>
                        </motion.div>
                        <div>
                            <h3 className="font-bold">小镜 · AI陪伴助手</h3>
                            <div className="flex items-center gap-1 text-xs text-white/80">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                在线陪伴中
                            </div>
                        </div>
                    </div>
                    <motion.button
                        className="p-2 bg-white/20 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Volume2 className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-64 overflow-y-auto space-y-3 bg-gradient-to-b from-pink-50/50 to-white">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-start gap-2"
                        >
                            <span className="text-xl">{msg.emoji}</span>
                            <div className="flex-1">
                                <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm border border-pink-100">
                                    <p className="text-gray-700 text-sm">{msg.text}</p>
                                </div>
                                <span className="text-xs text-gray-400 ml-2">{msg.timestamp}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-xl">🤖</span>
                        <div className="bg-white rounded-2xl p-3 shadow-sm border border-pink-100">
                            <div className="flex gap-1">
                                <motion.span
                                    className="w-2 h-2 bg-pink-400 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                />
                                <motion.span
                                    className="w-2 h-2 bg-pink-400 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                                />
                                <motion.span
                                    className="w-2 h-2 bg-pink-400 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Quick Actions & Rewards */}
            <div className="p-4 border-t border-gray-100 space-y-3">
                {/* Daily Check-in */}
                <motion.div
                    className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowReward(true)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-amber-500" />
                            <div>
                                <div className="text-sm font-medium text-gray-800">每日签到</div>
                                <div className="text-xs text-amber-600">已连续签到 {addictiveFeatures.dailyCheckin.streak} 天</div>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {[...Array(7)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-4 h-4 rounded-full ${
                                        i < addictiveFeatures.dailyCheckin.streak
                                            ? 'bg-amber-500'
                                            : 'bg-gray-200'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Beauty Points */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-pink-500" />
                            <div>
                                <div className="text-sm font-medium text-gray-800">美丽积分</div>
                                <div className="text-xs text-pink-600">{addictiveFeatures.beautyPoints.nextReward}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-pink-600">{addictiveFeatures.beautyPoints.points}</div>
                            <div className="text-xs text-gray-500">积分</div>
                        </div>
                    </div>
                    <div className="mt-2 h-2 bg-white rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: '89%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </div>
                </div>

                {/* Achievements */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">我的成就</span>
                    <div className="flex gap-2">
                        {addictiveFeatures.achievements.map((achievement) => (
                            <motion.div
                                key={achievement.id}
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    achievement.unlocked
                                        ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                                        : 'bg-gray-200'
                                }`}
                                whileHover={{ scale: 1.2 }}
                                title={achievement.name}
                            >
                                <span className={achievement.unlocked ? '' : 'opacity-30'}>{achievement.emoji}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reward Popup */}
            <AnimatePresence>
                {showReward && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowReward(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.5, y: 50 }}
                            className="bg-white rounded-2xl p-6 m-4 text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                className="text-6xl mb-4"
                                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5 }}
                            >
                                🎁
                            </motion.div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">签到成功！</h3>
                            <p className="text-gray-600 mb-4">获得 +50 美丽积分</p>
                            <p className="text-sm text-pink-600 mb-4">再签到2天，即可获得限定妆容教程~</p>
                            <motion.button
                                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setShowReward(false);
                                    onGiftClaim?.();
                                }}
                            >
                                开心收下
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
