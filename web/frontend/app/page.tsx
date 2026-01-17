'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
    TrendingUp
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const features = [
    {
        icon: Camera,
        title: '智能感知',
        titleEn: 'Smart Perception',
        description: '2轴云台追踪，4K+红外双摄，实时捕捉面部468个特征点',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Sparkles,
        title: 'AI 皮肤分析',
        titleEn: 'AI Skin Analysis',
        description: '深度分析肤质、水油、毛孔、色斑等8项核心指标',
        gradient: 'from-mirror-500 to-pink-500',
    },
    {
        icon: Palette,
        title: '个性化推荐',
        titleEn: 'Personalized Recommendations',
        description: '基于肤质、场合、趋势的智能妆容和产品推荐',
        gradient: 'from-accent-500 to-purple-500',
    },
    {
        icon: ShoppingBag,
        title: 'Agentic Commerce',
        titleEn: 'Smart Shopping',
        description: '主动感知需求、追踪价格、智能补货的购物代理',
        gradient: 'from-gold-500 to-orange-500',
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
        name: '小美',
        role: '时尚博主',
        content: '终于有一款真正懂我的美妆助手了！每天的妆容推荐都很贴合我的风格和日程。',
        rating: 5,
    },
    {
        name: 'Lisa',
        role: '职场白领',
        content: '皮肤分析太准了，用了一个月推荐的护肤方案，肤质明显改善。',
        rating: 5,
    },
    {
        name: '阿雅',
        role: '美妆爱好者',
        content: '智能补货提醒太贴心了，再也不用担心口红用完才发现忘记买。',
        rating: 5,
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
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mirror-100 rounded-full text-mirror-600 text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                AI 驱动的美妆革命
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                遇见您的
                                <span className="text-gradient"> AI 美妆顾问</span>
                            </h1>

                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                AgenticMirror 智能美妆镜，集成先进的 AI 视觉技术和个性化推荐引擎，
                                为您提供专业级皮肤分析、定制化妆容推荐和智能购物体验。
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
                                    <div className="text-3xl font-bold text-gray-900">98%</div>
                                    <div className="text-sm text-gray-500">用户满意度</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-900">50K+</div>
                                    <div className="text-sm text-gray-500">皮肤分析</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-900">4.9</div>
                                    <div className="text-sm text-gray-500">用户评分</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right - Mirror visualization */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative w-full aspect-square max-w-lg mx-auto">
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-mirror rounded-full blur-3xl opacity-20 animate-pulse-slow" />

                                {/* Mirror frame */}
                                <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-2 shadow-2xl">
                                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                        {/* Mirror surface */}
                                        <div className="relative w-full h-full bg-gradient-to-br from-white via-gray-50 to-gray-100">
                                            {/* Face mesh visualization */}
                                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                                                <defs>
                                                    <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor="#E91E63" stopOpacity="0.3" />
                                                        <stop offset="100%" stopColor="#9C27B0" stopOpacity="0.3" />
                                                    </linearGradient>
                                                </defs>
                                                {/* Simplified face mesh dots */}
                                                <g fill="url(#meshGradient)">
                                                    {Array.from({ length: 50 }).map((_, i) => (
                                                        <circle
                                                            key={i}
                                                            cx={150 + Math.cos(i * 0.5) * (50 + i * 1.5)}
                                                            cy={150 + Math.sin(i * 0.3) * (40 + i * 1.2)}
                                                            r={2}
                                                            className="animate-pulse"
                                                            style={{ animationDelay: `${i * 50}ms` }}
                                                        />
                                                    ))}
                                                </g>
                                                {/* Face outline */}
                                                <ellipse
                                                    cx="200"
                                                    cy="200"
                                                    rx="80"
                                                    ry="100"
                                                    fill="none"
                                                    stroke="url(#meshGradient)"
                                                    strokeWidth="2"
                                                    strokeDasharray="5,5"
                                                    className="animate-spin-slow"
                                                    style={{ transformOrigin: 'center' }}
                                                />
                                            </svg>

                                            {/* Analysis indicators */}
                                            <div className="absolute top-8 left-8 glass rounded-lg px-3 py-2 text-xs font-medium text-mirror-600">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                    实时追踪中
                                                </div>
                                            </div>

                                            <div className="absolute bottom-8 right-8 glass rounded-lg px-3 py-2">
                                                <div className="text-xs text-gray-500">皮肤评分</div>
                                                <div className="text-2xl font-bold text-gradient">78</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badges */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-gold-500" />
                                        <span className="font-medium">AI 分析</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <Camera className="w-5 h-5 text-mirror-500" />
                                        <span className="font-medium">4K 超清</span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            四大核心能力
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            融合先进 AI 技术与美妆专业知识，打造您的专属美妆助手
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card-hover p-6 group"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient}
                                    flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3">
                                    {feature.titleEn}
                                </p>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
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
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            用户心声
                        </h2>
                        <p className="text-xl text-gray-600">
                            来自真实用户的使用反馈
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
                                className="card p-6"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-mirror flex items-center justify-center text-white font-medium">
                                        {testimonial.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
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
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            准备好开启您的智能美妆之旅？
                        </h2>
                        <p className="text-xl text-white/80 mb-10">
                            立即体验 Demo，感受 AI 美妆顾问的魅力
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
