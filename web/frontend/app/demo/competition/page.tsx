'use client';

import { motion } from 'framer-motion';
import {
    Trophy,
    ArrowLeft,
    ExternalLink,
    Bot,
    Glasses,
    HeartPulse,
    Rocket,
    CircleDot,
    TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import CompetitorAnalysis from '@/components/workflow/CompetitorAnalysis';

export default function CompetitionPage() {
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            {/* Page Header */}
            <div className="mb-6">
                <Link
                    href="/demo/workflow"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">返回工作流演示</span>
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <Trophy className="w-7 h-7 text-amber-500" />
                            CES 2026 竞争分析
                        </h1>
                        <p className="text-gray-600 mt-1">
                            基于 CES 2026 最新展品的行业竞争格局分析
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm border border-amber-200"
                    >
                        <Trophy className="w-4 h-4" />
                        <span className="font-medium">CES 2026 最新数据</span>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
            >
                <div className="card p-6">
                    <CompetitorAnalysis showAnimation={true} />
                </div>

                {/* Data Sources */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-white rounded-xl border border-gray-200"
                >
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">数据来源</h3>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { name: 'Cosmetics Design Europe', url: 'https://www.cosmeticsdesign-europe.com' },
                            { name: 'PR Newswire', url: 'https://www.prnewswire.com' },
                            { name: 'Business Wire', url: 'https://www.businesswire.com' },
                            { name: 'BeautyMatter', url: 'https://beautymatter.com' },
                            { name: 'Personal Care Insights', url: 'https://www.personalcareinsights.com' },
                        ].map((source) => (
                            <a
                                key={source.name}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm rounded-lg transition-colors"
                            >
                                <span>{source.name}</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* CES 2026 三大趋势分析 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8"
                >
                    {/* 板块标题 */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 border border-cyan-300 rounded-full text-cyan-700 text-sm font-bold mb-4">
                            <Rocket className="w-4 h-4" />
                            CES 2026 趋势对标
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            三大趋势交汇点
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            AgenticMirror 是陪伴机器人、端侧 AI、健康科技三大 CES 2026 核心趋势的完美融合
                        </p>
                    </div>

                    {/* 三大趋势卡片 */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {/* 趋势一：陪伴机器人 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Bot className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">陪伴机器人 & 桌面机器人</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                CES 2026 最热门赛道，从工业走向家庭与个人陪伴
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <CircleDot className="w-3 h-3 text-blue-500" />
                                    <span className="text-gray-600">情感交互能力</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CircleDot className="w-3 h-3 text-blue-500" />
                                    <span className="text-gray-600">场景化理解</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CircleDot className="w-3 h-3 text-blue-500" />
                                    <span className="text-gray-600">持续陪伴关系</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="text-xs text-gray-400 mb-1">AgenticMirror 对标</div>
                                <div className="text-sm text-blue-600 font-medium">
                                    垂直领域的情感陪伴机器人
                                </div>
                            </div>
                        </motion.div>

                        {/* 趋势二：端侧 AI */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Glasses className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">端侧 AI / AI on Edge</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                AI 眼镜、AI Pin、边缘计算，从云端走向设备端
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <CircleDot className="w-3 h-3 text-purple-500" />
                                    <span className="text-gray-600">本地隐私保护</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CircleDot className="w-3 h-3 text-purple-500" />
                                    <span className="text-gray-600">低延迟实时响应</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CircleDot className="w-3 h-3 text-purple-500" />
                                    <span className="text-gray-600">离线可用能力</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="text-xs text-gray-400 mb-1">AgenticMirror 对标</div>
                                <div className="text-sm text-purple-600 font-medium">
                                    端侧 NPU + 云端协同架构
                                </div>
                            </div>
                        </motion.div>

                        {/* 趋势三：AI + 健康 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl p-6 border border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <HeartPulse className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">AI + 健康</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                健康监测、预防医学、个性化健康管理的智能化
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <CircleDot className="w-3 h-3 text-emerald-500" />
                                    <span className="text-gray-600">非接触式健康监测</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CircleDot className="w-3 h-3 text-emerald-500" />
                                    <span className="text-gray-600">长期趋势追踪</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CircleDot className="w-3 h-3 text-emerald-500" />
                                    <span className="text-gray-600">早期预警能力</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="text-xs text-gray-400 mb-1">AgenticMirror 对标</div>
                                <div className="text-sm text-emerald-600 font-medium">
                                    皮肤健康 → 整体健康入口
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 趋势融合图 */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 text-center mb-6">
                            三大趋势融合：AgenticMirror 的独特定位
                        </h3>

                        {/* 维恩图可视化 */}
                        <div className="relative h-72 max-w-md mx-auto">
                            <svg viewBox="0 0 400 320" className="w-full h-full">
                                {/* 三个圆圈 */}
                                <motion.circle
                                    cx="200" cy="120" r="90"
                                    fill="url(#blueGrad)" fillOpacity="0.2"
                                    stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.6"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <motion.circle
                                    cx="130" cy="220" r="90"
                                    fill="url(#purpleGrad)" fillOpacity="0.2"
                                    stroke="#a855f7" strokeWidth="2" strokeOpacity="0.6"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                />
                                <motion.circle
                                    cx="270" cy="220" r="90"
                                    fill="url(#greenGrad)" fillOpacity="0.2"
                                    stroke="#10b981" strokeWidth="2" strokeOpacity="0.6"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                />

                                {/* 渐变定义 */}
                                <defs>
                                    <radialGradient id="blueGrad">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#1e40af" />
                                    </radialGradient>
                                    <radialGradient id="purpleGrad">
                                        <stop offset="0%" stopColor="#a855f7" />
                                        <stop offset="100%" stopColor="#7c3aed" />
                                    </radialGradient>
                                    <radialGradient id="greenGrad">
                                        <stop offset="0%" stopColor="#10b981" />
                                        <stop offset="100%" stopColor="#059669" />
                                    </radialGradient>
                                    <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ec4899" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                </defs>

                                {/* 圈内标签 */}
                                <text x="200" y="70" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">陪伴机器人</text>
                                <text x="80" y="245" textAnchor="middle" fill="#a855f7" fontSize="13" fontWeight="bold">端侧 AI</text>
                                <text x="320" y="245" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">AI+健康</text>

                                {/* 中心交汇区域 */}
                                <motion.circle
                                    cx="200" cy="180" r="38"
                                    fill="url(#centerGrad)"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                />
                                <motion.text
                                    x="200" y="175" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    Agentic
                                </motion.text>
                                <motion.text
                                    x="200" y="190" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    Mirror
                                </motion.text>

                                {/* 两两交集标签 */}
                                <text x="155" y="145" textAnchor="middle" fill="#6b7280" fontSize="9">情感AI助手</text>
                                <text x="245" y="145" textAnchor="middle" fill="#6b7280" fontSize="9">健康陪伴</text>
                                <text x="200" y="268" textAnchor="middle" fill="#6b7280" fontSize="9">边缘健康监测</text>
                            </svg>
                        </div>

                        {/* 底部总结 */}
                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                <div className="text-blue-600 font-bold text-sm mb-1">陪伴 × 端侧</div>
                                <div className="text-gray-500 text-xs">情感化 AI 助手，本地化隐私保护，持续在线陪伴</div>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                <div className="text-purple-600 font-bold text-sm mb-1">陪伴 × 健康</div>
                                <div className="text-gray-500 text-xs">日常关怀与健康监测结合，建立长期信任关系</div>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                <div className="text-emerald-600 font-bold text-sm mb-1">端侧 × 健康</div>
                                <div className="text-gray-500 text-xs">敏感数据本地处理，实时健康反馈，无需网络依赖</div>
                            </div>
                        </div>
                    </div>

                    {/* 投资叙事框架 */}
                    <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-pink-500" />
                            投资叙事框架
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-gray-600 text-sm mb-3">
                                    <span className="text-pink-600 font-bold">短期价值：</span>
                                    CES 热门赛道的垂直玩家
                                </div>
                                <ul className="space-y-2 text-sm text-gray-500">
                                    <li className="flex items-start gap-2">
                                        <span className="text-pink-500 mt-0.5">•</span>
                                        <span>美妆赛道的"桌面陪伴机器人"</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-pink-500 mt-0.5">•</span>
                                        <span>端侧 AI 在消费电子的应用典范</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-pink-500 mt-0.5">•</span>
                                        <span>皮肤健康的非接触式监测入口</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className="text-gray-600 text-sm mb-3">
                                    <span className="text-purple-600 font-bold">长期愿景：</span>
                                    个人健康管理入口级产品
                                </div>
                                <ul className="space-y-2 text-sm text-gray-500">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-0.5">•</span>
                                        <span>每日必用触点 → 数据积累 → 健康预警</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-0.5">•</span>
                                        <span>从"美"到"健康"的自然延伸</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-0.5">•</span>
                                        <span>家庭健康管理中心的原型</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
