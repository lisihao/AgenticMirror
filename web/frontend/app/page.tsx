'use client';

import { motion } from 'framer-motion';
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
import SketchFace from '@/components/workflow/SketchFace';

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
        emoji: '💰',
    },
];

const steps = [
    { number: '01', title: '面部扫描', description: '智能追踪捕捉' },
    { number: '02', title: 'AI 分析', description: '深度皮肤检测' },
    { number: '03', title: '个性推荐', description: '妆容风格匹配' },
    { number: '04', title: '教程指导', description: 'AR 步骤引导' },
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
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-mirror-50 via-white to-accent-50" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mirror-100/50 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left content */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full text-pink-600 text-sm font-bold mb-6">
                                <span>✨</span>
                                小红书爆款 · 已帮助 50000+ 女生变美
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                手残党的
                                <span className="text-gradient"> 逆袭神器</span>
                            </h1>

                            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                                还在对着镜子发愁不知道怎么变美？
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                <span className="font-semibold text-mirror-500">3 秒诊断肤质</span> →
                                <span className="font-semibold text-accent-500"> AI 定制妆容</span> →
                                <span className="font-semibold text-gold-600"> 手把手教你画</span>
                                <br/>
                                <span className="text-gray-500 text-base">就算是化妆小白，也能轻松 get 精致妆容！</span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/demo/mirror" className="btn-primary">
                                    体验 Demo
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Link>
                                <button className="btn-secondary">
                                    <Play className="w-4 h-4 mr-2" />
                                    观看视频
                                </button>
                            </div>

                            <div className="flex items-center gap-8 mt-10 pt-10 border-t border-gray-200">
                                <div>
                                    <div className="text-3xl font-bold text-mirror-500">+40分</div>
                                    <div className="text-sm text-gray-500">平均颜值提升</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-accent-500">50K+</div>
                                    <div className="text-sm text-gray-500">女生已变美</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gold-500">92%</div>
                                    <div className="text-sm text-gray-500">复购推荐率</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right - Mirror with SketchFace */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative w-full max-w-lg mx-auto">
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-mirror rounded-full blur-3xl opacity-20 animate-pulse-slow" />

                                {/* SketchFace Mirror */}
                                <div className="relative">
                                    <SketchFace
                                        showScanLine={true}
                                        showMetrics={true}
                                        showEarringRecommend={true}
                                        beautyScore={78}
                                    />
                                </div>

                                {/* Floating badges */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute -top-2 -right-2 bg-white rounded-xl shadow-lg px-4 py-2 z-10"
                                >
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-gold-500" />
                                        <span className="font-medium text-sm">AI 智能分析</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -bottom-2 -left-2 bg-white rounded-xl shadow-lg px-4 py-2 z-10"
                                >
                                    <div className="flex items-center gap-2">
                                        <Camera className="w-5 h-5 text-mirror-500" />
                                        <span className="font-medium text-sm">实时追踪</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity }}
                                    className="absolute top-1/2 -right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl shadow-lg px-3 py-2 z-10"
                                >
                                    <div className="text-xs font-bold">+40分</div>
                                    <div className="text-[10px] opacity-80">变美指数</div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section - 变美逆袭 */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-pink-600 text-sm font-bold mb-4">
                            <span>🔥</span>
                            小红书 10w+ 收藏的变美神器
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            素颜 40 分 → 精致 80 分
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
                                className="card-hover p-6 group relative overflow-hidden"
                            >
                                {/* 提升标签 */}
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {feature.boost} {feature.boostLabel}
                                </div>

                                {/* Emoji + 图标 */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient}
                                        flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
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
                            <div key={i} className="bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-2 rounded-full">
                                <span className="text-sm text-gray-600">{quote.text}</span>
                                <span className="text-xs text-mirror-500 ml-2">{quote.author}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-gradient-to-br from-gray-50 to-mirror-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                className="relative text-center"
                            >
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-mirror-300 to-mirror-100" />
                                )}
                                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-mirror text-white text-xl font-bold mb-4 shadow-lg shadow-mirror-500/30">
                                    {step.number}
                                </div>
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

            {/* Real Transformation Showcase - 真实蜕变案例 */}
            <section className="py-24 bg-gradient-to-b from-pink-50 via-white to-purple-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white text-sm font-bold mb-4 shadow-lg">
                            <span>🔥</span>
                            小红书 154 万点赞 · 真实案例
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            素颜 10 分 → 精致 40 分
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            不是整容，是<span className="text-pink-500 font-bold">化妆的力量</span>！<br/>
                            AgenticMirror 让每个人都能掌握变美的秘密
                        </p>
                    </motion.div>

                    {/* Main Transformation Display */}
                    <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
                        {/* Before/After Compare Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src="/demo/transformation/compare.png"
                                    alt="化妆前后对比"
                                    width={600}
                                    height={800}
                                    className="w-full h-auto"
                                />
                                {/* Overlay badges */}
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold">
                                    化妆前 vs 化妆后
                                </div>
                                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                    ❤️ 154万+ 点赞
                                </div>
                            </div>
                            {/* Floating stats */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 z-10"
                            >
                                <div className="text-3xl font-bold text-pink-500">+30分</div>
                                <div className="text-sm text-gray-500">颜值飙升</div>
                            </motion.div>
                        </motion.div>

                        {/* Transformation Steps */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                AI 指导的完整蜕变过程
                            </h3>

                            {/* Step 1: Before */}
                            <div className="flex gap-4 items-start">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gray-200">
                                    <Image
                                        src="/demo/transformation/before.png"
                                        alt="素颜状态"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">1</div>
                                        <span className="font-bold text-gray-900">素颜状态</span>
                                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">10分</span>
                                    </div>
                                    <p className="text-sm text-gray-600">AI 扫描分析：肤色偏黄、眼睛较小、脸型圆润</p>
                                    <p className="text-xs text-pink-500 mt-1">→ 推荐：提亮底妆 + 放大双眼 + 修容瘦脸</p>
                                </div>
                            </div>

                            {/* Step 2: Process */}
                            <div className="flex gap-4 items-start">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 border-pink-200">
                                    <Image
                                        src="/demo/transformation/process.png"
                                        alt="化妆过程"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-xs font-bold text-pink-600">2</div>
                                        <span className="font-bold text-gray-900">AI 实时指导</span>
                                        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">进行中</span>
                                    </div>
                                    <p className="text-sm text-gray-600">跟着镜子一步步画，语音提示手法技巧</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">底妆 ✓</span>
                                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">眉毛 ✓</span>
                                        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">眼妆...</span>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3: After */}
                            <div className="flex gap-4 items-start">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 border-green-300 shadow-lg">
                                    <Image
                                        src="/demo/transformation/after.png"
                                        alt="完成妆容"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-white">✓</div>
                                        <span className="font-bold text-gray-900">蜕变完成</span>
                                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">40分 🎉</span>
                                    </div>
                                    <p className="text-sm text-gray-600">精致大眼妆 + 立体小脸 + 元气少女感</p>
                                    <p className="text-xs text-green-600 mt-1 font-medium">完美！这就是化妆的魔法 ✨</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mt-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">🪄</div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900">你也可以做到！</p>
                                        <p className="text-sm text-gray-600">AgenticMirror 的 AI 会根据你的脸型定制方案</p>
                                    </div>
                                    <Link href="/demo/workflow" className="btn-primary text-sm">
                                        体验流程
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Social Proof Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl p-6"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {['🙋‍♀️', '👩', '💁‍♀️', '👧', '🧑‍🦰'].map((emoji, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-lg border-2 border-white">
                                            {emoji}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">50,000+ 女生已蜕变</p>
                                    <p className="text-sm text-gray-500">加入她们，开启你的变美之旅</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-pink-500">92%</div>
                                    <div className="text-xs text-gray-500">推荐给闺蜜</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-500">4.9</div>
                                    <div className="text-xs text-gray-500">用户评分</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-500">154万</div>
                                    <div className="text-xs text-gray-500">小红书点赞</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tech Specs Section */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            <motion.div
                                key={spec.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition-colors"
                            >
                                <div className="text-2xl font-bold text-gradient mb-2">
                                    {spec.value}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {spec.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-mirror-500/20 flex items-center justify-center flex-shrink-0">
                                <Zap className="w-6 h-6 text-mirror-400" />
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">RK3588 旗舰芯片</h3>
                                <p className="text-gray-400 text-sm">
                                    6 TOPS NPU 算力，支持边缘端实时 AI 推理
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                                <Shield className="w-6 h-6 text-accent-400" />
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">隐私安全</h3>
                                <p className="text-gray-400 text-sm">
                                    端侧处理，数据不上云，符合 GDPR 标准
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="w-6 h-6 text-gold-400" />
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">OTA 升级</h3>
                                <p className="text-gray-400 text-sm">
                                    持续更新 AI 模型和功能，产品越用越智能
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-gradient-to-b from-white to-pink-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                className="card p-6 relative"
                            >
                                {/* 标签 */}
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {testimonial.tag}
                                </div>

                                <div className="flex items-center gap-1 mb-4">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-mirror-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-mirror relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-6xl mb-6">✨</div>
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
                            <Link
                                href="/demo/mirror"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-mirror-600 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                立即体验
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Link>
                            <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/50 rounded-full hover:bg-white/10 transition-colors">
                                预约演示
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
