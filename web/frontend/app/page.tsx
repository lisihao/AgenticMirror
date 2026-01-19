'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    Sparkles,
    Camera,
    Palette,
    ShoppingBag,
    ChevronRight,
    Play,
    Star,
    Zap,
    Shield,
    TrendingUp,
    Heart,
    Eye,
    Wand2
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
    AnimatedCounter,
    ParticleBackground,
    TiltCard,
    ParallaxY,
    TransformationShowcase,
} from '@/components/landing';

const features = [
    {
        icon: Camera,
        title: '一键诊断',
        subtitle: '告别盲目护肤',
        before: '每天照镜子不知道自己啥肤质',
        after: '3秒精准定位问题，对症下药',
        boost: '+35',
        boostLabel: '护肤效率',
        gradient: 'from-blue-500 to-cyan-500',
        glowColor: 'rgba(6, 182, 212, 0.3)',
        emoji: '🔍',
    },
    {
        icon: Sparkles,
        title: '手残党救星',
        subtitle: 'AI手把手教学',
        before: '看了100个教程还是画不好',
        after: '跟着指引画，新手也能出门见人',
        boost: '+40',
        boostLabel: '妆容完成度',
        gradient: 'from-mirror-500 to-pink-500',
        glowColor: 'rgba(236, 72, 153, 0.3)',
        emoji: '✨',
    },
    {
        icon: Palette,
        title: '专属变美方案',
        subtitle: '千人千面定制',
        before: '跟风买了一堆不适合自己的',
        after: '每款推荐都是为你量身定制',
        boost: '+30',
        boostLabel: '产品匹配度',
        gradient: 'from-accent-500 to-purple-500',
        glowColor: 'rgba(168, 85, 247, 0.3)',
        emoji: '💄',
    },
    {
        icon: ShoppingBag,
        title: '省钱小助手',
        subtitle: '智能比价补货',
        before: '口红用完才发现忘了买',
        after: '自动提醒+全网比价，省心省钱',
        boost: '-30%',
        boostLabel: '美妆开支',
        gradient: 'from-gold-500 to-orange-500',
        glowColor: 'rgba(245, 158, 11, 0.3)',
        emoji: '💰',
    },
];

const steps = [
    { number: '01', title: '面部扫描', description: '智能追踪捕捉', icon: Camera },
    { number: '02', title: 'AI 分析', description: '深度皮肤检测', icon: Eye },
    { number: '03', title: '个性推荐', description: '妆容风格匹配', icon: Sparkles },
    { number: '04', title: '教程指导', description: 'AR 步骤引导', icon: Wand2 },
];

const specs = [
    { label: '4K RGB摄像头', value: '48MP' },
    { label: '红外深度感知', value: '双目+ToF' },
    { label: '面部特征点', value: '468点' },
    { label: 'AI 算力', value: '6 TOPS' },
    { label: '云台精度', value: '<1°' },
    { label: 'LED 色温', value: '2700-6500K' },
];

const testimonials = [
    {
        name: '糖糖',
        role: '化妆小白 → 现在被夸',
        avatar: '🙋‍♀️',
        content: '之前画眼线像毛毛虫，用了AI指导一周后，闺蜜问我是不是报班学化妆了哈哈哈！',
        rating: 5,
        tag: '新手逆袭',
    },
    {
        name: 'Coco',
        role: '敏感肌 · 终于找到适合的',
        avatar: '👩',
        content: '以前买护肤品全靠博主推荐，踩了无数坑。现在AI根据我的肤质推荐，皮肤真的稳定多了！',
        rating: 5,
        tag: '敏感肌友好',
    },
    {
        name: '奶茶',
        role: '省钱达人',
        avatar: '💁‍♀️',
        content: '它会帮我比价！同款口红便宜了60块！每个月能省下好几百，够我喝奶茶了~',
        rating: 5,
        tag: '省钱秘籍',
    },
];

export default function LandingPage() {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            <Header />

            {/* HERO - 震撼开场：真实蜕变案例 */}
            <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-[90vh]">
                {/* 粒子背景 */}
                <ParticleBackground
                    particleCount={40}
                    colors={['#ec4899', '#a855f7', '#6366f1', '#06b6d4']}
                    interactive={true}
                />

                {/* 视差背景层 */}
                <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{ y: heroY, opacity: heroOpacity }}
                >
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[128px]" />
                </motion.div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 核心营销口号 */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm font-bold mb-6 backdrop-blur"
                        >
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                🔥
                            </motion.span>
                            小红书 <AnimatedCounter end={154} suffix="万" className="font-bold" /> 点赞 · 抖音 <AnimatedCounter end={2000} suffix="万" className="font-bold" /> 播放
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
                            <motion.span
                                className="block"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <AnimatedCounter end={10} className="text-red-400" /> 分变 <AnimatedCounter end={40} className="text-green-400" /> 分
                            </motion.span>
                            <motion.span
                                className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                这不是整容，是 AI
                            </motion.span>
                        </h1>

                        <motion.p
                            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            化妆界的 ChatGPT，让每张脸都被 AI 重新点亮
                        </motion.p>
                    </motion.div>

                    {/* 真实蜕变展示 - 真实用户案例 */}
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* 左侧：真实蜕变展示 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative"
                        >
                            <TransformationShowcase autoPlay={true} interval={3500} />

                            {/* 光晕效果 */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-2xl -z-10 rounded-3xl" />
                        </motion.div>

                        {/* 右侧：蜕变过程 + CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="space-y-6"
                        >
                            {/* 蜕变三步骤 - 真实图片展示 */}
                            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                    <Wand2 className="w-5 h-5 text-pink-400" />
                                    真实蜕变过程
                                </h3>
                                <div className="space-y-4">
                                    {/* Step 1 */}
                                    <motion.div
                                        className="flex gap-4 items-center"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gray-600">
                                            <Image
                                                src="/demo/transformation/IMG_2239.PNG"
                                                alt="素颜"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white font-bold">1</span>
                                                <span className="text-white font-medium">素颜起点</span>
                                                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">10分</span>
                                            </div>
                                            <p className="text-sm text-gray-400">AI 扫描分析肤质与五官</p>
                                        </div>
                                    </motion.div>
                                    {/* Step 2 */}
                                    <motion.div
                                        className="flex gap-4 items-center"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-pink-500/50">
                                            <Image
                                                src="/demo/transformation/IMG_2240.PNG"
                                                alt="化妆中"
                                                fill
                                                className="object-cover"
                                            />
                                            <motion.div
                                                className="absolute inset-0 bg-pink-500/20"
                                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-xs text-white font-bold">2</span>
                                                <span className="text-white font-medium">AI 实时指导</span>
                                                <motion.span
                                                    className="text-xs bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full"
                                                    animate={{ opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    进行中
                                                </motion.span>
                                            </div>
                                            <p className="text-sm text-gray-400">语音+AR 手把手教化妆</p>
                                        </div>
                                    </motion.div>
                                    {/* Step 3 */}
                                    <motion.div
                                        className="flex gap-4 items-center"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.1 }}
                                    >
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-green-400 shadow-lg shadow-green-400/20">
                                            <Image
                                                src="/demo/transformation/IMG_2241.PNG"
                                                alt="完成蜕变"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-white font-bold">✓</span>
                                                <span className="text-white font-medium">惊艳蜕变</span>
                                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">40分 🎉</span>
                                            </div>
                                            <p className="text-sm text-gray-400">完美妆容，自信出门！</p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* 对比图展示 */}
                                <motion.div
                                    className="mt-4 pt-4 border-t border-white/10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.3 }}
                                >
                                    <div className="relative rounded-xl overflow-hidden aspect-video">
                                        <Image
                                            src="/demo/transformation/IMG_2238.PNG"
                                            alt="蜕变对比"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <motion.div
                                                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm"
                                                animate={{ scale: [1, 1.05, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                ✨ 真实用户蜕变
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* CTA 按钮 */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.3 }}
                            >
                                <Link
                                    href="/demo/workflow"
                                    className="flex-1 inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg shadow-pink-500/30 group"
                                >
                                    立即体验 AI 蜕变
                                    <motion.span
                                        className="ml-2"
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </motion.span>
                                </Link>
                                <button className="flex-1 inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all">
                                    <Play className="w-5 h-5 mr-2" />
                                    观看完整视频
                                </button>
                            </motion.div>

                            {/* 社交证明 */}
                            <motion.div
                                className="flex items-center justify-between bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {['🙋‍♀️', '👩', '💁‍♀️', '👧'].map((emoji, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-sm border-2 border-gray-800"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 1.6 + i * 0.1 }}
                                            >
                                                {emoji}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <span className="text-white text-sm">
                                        <AnimatedCounter end={50000} suffix="+" className="font-bold" /> 女生已蜕变
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[1,2,3,4,5].map(i => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: 1.8 + i * 0.05 }}
                                        >
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        </motion.div>
                                    ))}
                                    <span className="text-white text-sm ml-1 font-bold">
                                        <AnimatedCounter end={4.9} decimals={1} />
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* 向下滚动提示 */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-white"
                            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Features Section - 变美逆袭 */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* 装饰背景 */}
                <ParallaxY speed={30} className="absolute top-20 -left-20 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50" />
                <ParallaxY speed={-20} className="absolute bottom-20 -right-20 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-pink-600 text-sm font-bold mb-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span>🔥</span>
                            小红书 10w+ 收藏的变美神器
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            素颜 <span className="text-red-400">40</span> 分 → 精致 <span className="text-green-500">80</span> 分
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            不是你不够美，是没找对方法！<br/>
                            <span className="text-mirror-500 font-semibold">AI 帮你找到最适合自己的变美路径</span>
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <TiltCard
                                    className="h-full"
                                    glowColor={feature.glowColor}
                                    maxTilt={8}
                                >
                                    <div className="card-hover p-6 h-full relative overflow-hidden bg-white rounded-2xl border border-gray-100">
                                        {/* 提升标签 */}
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {feature.boost} {feature.boostLabel}
                                        </div>

                                        {/* Emoji + 图标 */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <motion.div
                                                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                            >
                                                <feature.icon className="w-6 h-6 text-white" />
                                            </motion.div>
                                            <span className="text-2xl">{feature.emoji}</span>
                                        </div>

                                        {/* 标题 */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-mirror-500 font-medium mb-4">
                                            {feature.subtitle}
                                        </p>

                                        {/* Before / After */}
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-2">
                                                <span className="text-red-400 text-lg">😩</span>
                                                <div>
                                                    <div className="text-xs text-gray-400 mb-0.5">以前</div>
                                                    <p className="text-sm text-gray-500 line-through decoration-red-300">
                                                        {feature.before}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-green-500 text-lg">🥳</span>
                                                <div>
                                                    <div className="text-xs text-gray-400 mb-0.5">现在</div>
                                                    <p className="text-sm text-gray-700 font-medium">
                                                        {feature.after}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* 用户证言条 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                        {[
                            { text: '"用了一周，同事问我是不是偷偷做医美了"', author: '@小甜甜' },
                            { text: '"手残党终于画出了完整的眼妆！"', author: '@化妆小白' },
                            { text: '"省下的钱够买两支口红了"', author: '@精打细算的Lisa' },
                        ].map((quote, i) => (
                            <motion.div
                                key={i}
                                className="bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-2 rounded-full"
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                <span className="text-sm text-gray-600">{quote.text}</span>
                                <span className="text-xs text-mirror-500 ml-2">{quote.author}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-gradient-to-br from-gray-50 to-mirror-50/30 relative overflow-hidden">
                <ParallaxY speed={-40} className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            如何使用
                        </h2>
                        <p className="text-xl text-gray-600">
                            简单四步，开启您的智能美妆之旅
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative text-center group"
                            >
                                {index < steps.length - 1 && (
                                    <motion.div
                                        className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-mirror-300 to-mirror-100"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                                    />
                                )}
                                <motion.div
                                    className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-mirror text-white text-xl font-bold mb-4 shadow-lg shadow-mirror-500/30"
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                >
                                    <step.icon className="w-7 h-7" />
                                </motion.div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Specs Section */}
            <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
                <ParallaxY speed={50} className="absolute -top-20 -left-20 w-80 h-80 bg-mirror-500/10 rounded-full blur-3xl" />
                <ParallaxY speed={-30} className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            硬核技术规格
                        </h2>
                        <p className="text-xl text-gray-400">
                            专业级硬件配置，为您提供卓越体验
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {specs.map((spec, index) => (
                            <TiltCard
                                key={spec.label}
                                maxTilt={15}
                                glowColor="rgba(236, 72, 153, 0.2)"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition-colors border border-gray-700"
                                >
                                    <div className="text-2xl font-bold text-gradient mb-2">
                                        {spec.value}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {spec.label}
                                    </div>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </div>

                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, color: 'mirror', title: 'RK3588 旗舰芯片', desc: '6 TOPS NPU 算力，支持边缘端实时 AI 推理' },
                            { icon: Shield, color: 'accent', title: '隐私安全', desc: '端侧处理，数据不上云，符合 GDPR 标准' },
                            { icon: TrendingUp, color: 'gold', title: 'OTA 升级', desc: '持续更新 AI 模型和功能，产品越用越智能' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="flex items-start gap-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <motion.div
                                    className={`w-12 h-12 rounded-xl bg-${item.color}-500/20 flex items-center justify-center flex-shrink-0`}
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                >
                                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                                </motion.div>
                                <div>
                                    <h3 className="font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-gradient-to-b from-white to-pink-50/30 relative overflow-hidden">
                <ParallaxY speed={20} className="absolute top-10 left-10 w-32 h-32 bg-pink-200/50 rounded-full blur-2xl" />
                <ParallaxY speed={-20} className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200/50 rounded-full blur-2xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-pink-600 text-sm font-bold mb-4">
                            <span>💬</span>
                            真实用户反馈
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            她们都变美了
                        </h2>
                        <p className="text-xl text-gray-600">
                            看看姐妹们怎么说 👇
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <TiltCard
                                    maxTilt={6}
                                    glowColor="rgba(236, 72, 153, 0.15)"
                                >
                                    <div className="card p-6 relative bg-white rounded-2xl border border-gray-100 shadow-sm">
                                        {/* 标签 */}
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {testimonial.tag}
                                        </div>

                                        <div className="flex items-center gap-1 mb-4">
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    whileInView={{ scale: 1, rotate: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 + i * 0.05 }}
                                                >
                                                    <Star className="w-5 h-5 fill-gold-500 text-gold-500" />
                                                </motion.div>
                                            ))}
                                        </div>
                                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                                            "{testimonial.content}"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <motion.div
                                                className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl"
                                                whileHover={{ scale: 1.1, rotate: 10 }}
                                            >
                                                {testimonial.avatar}
                                            </motion.div>
                                            <div>
                                                <div className="font-bold text-gray-900">{testimonial.name}</div>
                                                <div className="text-sm text-mirror-500">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-mirror relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />

                {/* 动态背景 */}
                <motion.div
                    className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
                    animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="text-6xl mb-6"
                            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            ✨
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            今天开始，做更美的自己
                        </h2>
                        <p className="text-xl text-white/90 mb-4">
                            别再羡慕别人了，你也可以！
                        </p>
                        <p className="text-lg text-white/70 mb-10">
                            立即体验，3分钟获取你的专属变美方案 💖
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/demo/mirror"
                                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-mirror-600 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    立即体验
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Link>
                            </motion.div>
                            <motion.button
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/50 rounded-full hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                预约演示
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
