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
    Sparkles,
    CheckCircle2,
    XCircle,
    Star,
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

                    {/* 三大趋势卡片 - 含 CES 2026 竞品 */}
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
                            <p className="text-gray-500 text-sm mb-3">
                                CES 2026 最热门赛道，从工业走向家庭与个人陪伴
                            </p>
                            <div className="space-y-1.5 mb-4">
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
                            {/* CES 2026 竞品 */}
                            <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                <div className="text-xs text-blue-600 font-semibold mb-2">CES 2026 代表产品</div>
                                <div className="space-y-1.5 text-xs text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        <span className="font-medium">Samsung Ballie</span>
                                        <span className="text-gray-400">- 滚动陪伴机器人</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        <span className="font-medium">Amazon Astro</span>
                                        <span className="text-gray-400">- 家庭助理机器人</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        <span className="font-medium">Unitree Go2</span>
                                        <span className="text-gray-400">- 陪伴宠物机器人</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 border-t border-gray-100">
                                <div className="text-xs text-gray-400 mb-1">AgenticMirror 定位</div>
                                <div className="text-sm text-blue-600 font-medium">
                                    美妆垂直领域的情感陪伴机器人
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
                            <p className="text-gray-500 text-sm mb-3">
                                AI 眼镜、AI Pin、边缘计算，从云端走向设备端
                            </p>
                            <div className="space-y-1.5 mb-4">
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
                            {/* CES 2026 竞品 */}
                            <div className="bg-purple-50 rounded-lg p-3 mb-4">
                                <div className="text-xs text-purple-600 font-semibold mb-2">CES 2026 代表产品</div>
                                <div className="space-y-1.5 text-xs text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                        <span className="font-medium">Ray-Ban Meta</span>
                                        <span className="text-gray-400">- AI 智能眼镜</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                        <span className="font-medium">Humane AI Pin</span>
                                        <span className="text-gray-400">- 可穿戴 AI</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                        <span className="font-medium">Samsung Bespoke AI</span>
                                        <span className="text-gray-400">- 端侧智能家电</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 border-t border-gray-100">
                                <div className="text-xs text-gray-400 mb-1">AgenticMirror 定位</div>
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
                            <p className="text-gray-500 text-sm mb-3">
                                健康监测、预防医学、个性化健康管理的智能化
                            </p>
                            <div className="space-y-1.5 mb-4">
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
                            {/* CES 2026 竞品 */}
                            <div className="bg-emerald-50 rounded-lg p-3 mb-4">
                                <div className="text-xs text-emerald-600 font-semibold mb-2">CES 2026 代表产品</div>
                                <div className="space-y-1.5 text-xs text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <span className="font-medium">Withings BeamO</span>
                                        <span className="text-gray-400">- 四合一健康设备</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <span className="font-medium">L'Oréal Cell BioPrint</span>
                                        <span className="text-gray-400">- 细胞级皮肤分析</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <span className="font-medium">Abbott Lingo</span>
                                        <span className="text-gray-400">- 连续血糖监测</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 border-t border-gray-100">
                                <div className="text-xs text-gray-400 mb-1">AgenticMirror 定位</div>
                                <div className="text-sm text-emerald-600 font-medium">
                                    皮肤健康 → 整体健康入口
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 智能镜：三大趋势的关键载体 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">智能镜：三大趋势的关键载体</h3>
                                <p className="text-sm text-gray-500">为什么"镜子"是 CES 2026 的隐藏主角</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* 左侧：CES 2026 智能镜产品 */}
                            <div>
                                <div className="text-sm font-semibold text-amber-700 mb-3">CES 2026 智能镜赛道玩家</div>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border border-amber-100">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold text-gray-800 text-sm">Samsung Bespoke AI Mirror</span>
                                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">消费电子巨头</span>
                                        </div>
                                        <p className="text-xs text-gray-500">AI 驱动的智能家居镜，支持健康监测、穿搭建议、智能家居控制</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border border-amber-100">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold text-gray-800 text-sm">NuraLogix 魔镜</span>
                                            <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded">健康科技</span>
                                        </div>
                                        <p className="text-xs text-gray-500">通过面部血流分析检测心率、血压、压力水平等 30+ 健康指标</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border border-amber-100">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold text-gray-800 text-sm">CareOS Themis 2.0</span>
                                            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">智能家居</span>
                                        </div>
                                        <p className="text-xs text-gray-500">浴室智能镜平台，集成皮肤分析、牙齿健康、体重管理等功能</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border border-amber-100">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold text-gray-800 text-sm">HiMirror / 初普 AMIRO</span>
                                            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded">美妆垂直</span>
                                        </div>
                                        <p className="text-xs text-gray-500">美妆智能镜先驱，主打皮肤检测和 LED 补光，但缺乏 AI 深度</p>
                                    </div>
                                </div>
                            </div>

                            {/* 右侧：为什么是镜子 */}
                            <div>
                                <div className="text-sm font-semibold text-amber-700 mb-3">为什么"镜子"是最佳载体</div>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-amber-100">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Bot className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 text-sm">天然陪伴场景</div>
                                            <p className="text-xs text-gray-500">每日必看，固定位置，自然形成"面对面"交互关系</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-amber-100">
                                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Glasses className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 text-sm">理想的端侧设备</div>
                                            <p className="text-xs text-gray-500">有电源、有算力空间、固定场景无需考虑功耗和续航</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-amber-100">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <HeartPulse className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 text-sm">非接触式健康入口</div>
                                            <p className="text-xs text-gray-500">面部是最丰富的健康信号源：肤色、血流、表情、眼白...</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-amber-100">
                                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Star className="w-4 h-4 text-amber-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 text-sm">隐私边界清晰</div>
                                            <p className="text-xs text-gray-500">私密空间使用，用户心理接受度高，数据留存意愿强</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AgenticMirror 差异化对比 */}
                        <div className="mt-6 pt-6 border-t border-amber-200">
                            <div className="text-sm font-semibold text-amber-700 mb-3">AgenticMirror vs 竞品：关键差异</div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="bg-amber-100/50">
                                            <th className="text-left py-2 px-3 font-semibold text-gray-700">能力维度</th>
                                            <th className="text-center py-2 px-3 font-semibold text-gray-700">Samsung</th>
                                            <th className="text-center py-2 px-3 font-semibold text-gray-700">NuraLogix</th>
                                            <th className="text-center py-2 px-3 font-semibold text-gray-700">CareOS</th>
                                            <th className="text-center py-2 px-3 font-semibold text-gray-700">HiMirror</th>
                                            <th className="text-center py-2 px-3 font-semibold text-pink-600 bg-pink-50">AgenticMirror</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-amber-100">
                                        <tr className="bg-white">
                                            <td className="py-2 px-3 text-gray-700">多光谱皮肤分析</td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center text-amber-500">部分</td>
                                            <td className="py-2 px-3 text-center bg-pink-50"><CheckCircle2 className="w-4 h-4 text-pink-500 mx-auto" /></td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-2 px-3 text-gray-700">3D 面部建模</td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center bg-pink-50"><CheckCircle2 className="w-4 h-4 text-pink-500 mx-auto" /></td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-2 px-3 text-gray-700">AI 情感陪伴</td>
                                            <td className="py-2 px-3 text-center text-amber-500">部分</td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center bg-pink-50"><CheckCircle2 className="w-4 h-4 text-pink-500 mx-auto" /></td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-2 px-3 text-gray-700">专业美妆指导</td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center text-amber-500">部分</td>
                                            <td className="py-2 px-3 text-center text-amber-500">部分</td>
                                            <td className="py-2 px-3 text-center bg-pink-50"><CheckCircle2 className="w-4 h-4 text-pink-500 mx-auto" /></td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-2 px-3 text-gray-700">动作分解教学</td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center bg-pink-50"><CheckCircle2 className="w-4 h-4 text-pink-500 mx-auto" /></td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-2 px-3 text-gray-700">健康指标监测</td>
                                            <td className="py-2 px-3 text-center text-amber-500">部分</td>
                                            <td className="py-2 px-3 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center text-amber-500">部分</td>
                                            <td className="py-2 px-3 text-center"><XCircle className="w-4 h-4 text-gray-300 mx-auto" /></td>
                                            <td className="py-2 px-3 text-center bg-pink-50"><CheckCircle2 className="w-4 h-4 text-pink-500 mx-auto" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 p-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg border border-pink-200">
                                <div className="text-sm font-semibold text-pink-700 mb-1">AgenticMirror 的独特价值</div>
                                <p className="text-xs text-gray-600">
                                    唯一同时具备<span className="text-pink-600 font-medium">专业美妆深度</span>（垂直知识图谱 + 动作教学）和<span className="text-pink-600 font-medium">硬件传感优势</span>（多光谱 + 3D 建模）的智能镜产品，在三大趋势交汇点占据独特生态位。
                                </p>
                            </div>
                        </div>
                    </motion.div>

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
