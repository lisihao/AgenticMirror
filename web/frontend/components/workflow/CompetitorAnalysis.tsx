'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    Check,
    X,
    ChevronRight,
    ExternalLink,
    Sparkles,
    TrendingUp,
    Shield,
    Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
    ces2026Competitors,
    agenticMirrorAdvantages,
    competitiveMatrix,
    ces2026Trends,
} from '@/lib/constants/mockData';

interface CompetitorAnalysisProps {
    showAnimation?: boolean;
}

export default function CompetitorAnalysis({ showAnimation = true }: CompetitorAnalysisProps) {
    const [activeTab, setActiveTab] = useState<'competitors' | 'comparison' | 'advantages'>('competitors');
    const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);

    const tabs = [
        { id: 'competitors', label: 'CES 2026 竞品', icon: '🏆' },
        { id: 'comparison', label: '功能对比', icon: '📊' },
        { id: 'advantages', label: '核心优势', icon: '🚀' },
    ];

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-gray-200 pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all",
                            activeTab === tab.id
                                ? "bg-mirror-50 text-mirror-600 border-b-2 border-mirror-500"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        )}
                    >
                        <span>{tab.icon}</span>
                        <span className="font-medium">{tab.label}</span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* Competitors Tab */}
                {activeTab === 'competitors' && (
                    <motion.div
                        key="competitors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        {/* Industry Trends */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-500 mb-3">CES 2026 行业趋势</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {ces2026Trends.map((trend, i) => (
                                    <motion.div
                                        key={trend.id}
                                        initial={showAnimation ? { opacity: 0, scale: 0.9 } : {}}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100"
                                    >
                                        <div className="text-2xl mb-1">{trend.icon}</div>
                                        <div className="font-medium text-gray-800 text-sm">{trend.name}</div>
                                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">{trend.description}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Competitor Cards */}
                        <h3 className="text-sm font-semibold text-gray-500 mb-3">主要竞品</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {ces2026Competitors.slice(0, 6).map((competitor, i) => (
                                <motion.div
                                    key={competitor.id}
                                    initial={showAnimation ? { opacity: 0, x: -20 } : {}}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setSelectedCompetitor(
                                        selectedCompetitor === competitor.id ? null : competitor.id
                                    )}
                                    className={cn(
                                        "p-4 rounded-xl border-2 cursor-pointer transition-all",
                                        selectedCompetitor === competitor.id
                                            ? "border-mirror-500 bg-mirror-50"
                                            : "border-gray-100 bg-white hover:border-gray-200"
                                    )}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                                                {competitor.companyLogo}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{competitor.nameZh}</h4>
                                                <p className="text-xs text-gray-500">{competitor.company}</p>
                                            </div>
                                        </div>
                                        {competitor.award && (
                                            <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                                                <Trophy className="w-3 h-3" />
                                                <span>获奖</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {selectedCompetitor === competitor.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-4 pt-4 border-t border-gray-100"
                                            >
                                                <div className="space-y-3">
                                                    {/* Features */}
                                                    <div>
                                                        <div className="text-xs font-medium text-gray-500 mb-2">核心功能</div>
                                                        <div className="space-y-2">
                                                            {competitor.features.map((feature, j) => (
                                                                <div key={j} className="flex items-start gap-2">
                                                                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                                    <div>
                                                                        <span className="text-sm font-medium text-gray-700">
                                                                            {feature.name}
                                                                        </span>
                                                                        <span className="text-sm text-gray-500">
                                                                            {' - '}{feature.description}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Strengths & Weaknesses */}
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="p-2 bg-green-50 rounded-lg">
                                                            <div className="text-xs font-medium text-green-700 mb-1">优势</div>
                                                            <div className="space-y-1">
                                                                {competitor.strengths.map((s, j) => (
                                                                    <div key={j} className="text-xs text-green-600">• {s}</div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="p-2 bg-red-50 rounded-lg">
                                                            <div className="text-xs font-medium text-red-700 mb-1">不足</div>
                                                            <div className="space-y-1">
                                                                {competitor.weaknesses.map((w, j) => (
                                                                    <div key={j} className="text-xs text-red-600">• {w}</div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Tech & Price */}
                                                    <div className="flex items-center justify-between text-sm">
                                                        <div className="flex items-center gap-1 text-purple-600">
                                                            <Zap className="w-4 h-4" />
                                                            <span>{competitor.techHighlight}</span>
                                                        </div>
                                                        <div className="text-gray-500">{competitor.price}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Comparison Tab */}
                {activeTab === 'comparison' && (
                    <motion.div
                        key="comparison"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">功能</th>
                                        {competitiveMatrix.products.map((product) => (
                                            <th
                                                key={product.id}
                                                className={cn(
                                                    "text-center py-3 px-4 text-sm font-medium",
                                                    product.isOurs ? "text-mirror-600 bg-mirror-50" : "text-gray-700"
                                                )}
                                            >
                                                {product.name}
                                                {product.isOurs && (
                                                    <span className="ml-1 text-xs text-mirror-500">(我们)</span>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {competitiveMatrix.features.map((feature, i) => (
                                        <motion.tr
                                            key={feature.id}
                                            initial={showAnimation ? { opacity: 0, x: -20 } : {}}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="border-b border-gray-100"
                                        >
                                            <td className="py-3 px-4">
                                                <div className="text-sm font-medium text-gray-800">{feature.name}</div>
                                                <div className="text-xs text-gray-400">{feature.nameEn}</div>
                                            </td>
                                            {competitiveMatrix.products.map((product) => {
                                                const score = product.scores[feature.id as keyof typeof product.scores];
                                                return (
                                                    <td
                                                        key={product.id}
                                                        className={cn(
                                                            "text-center py-3 px-4",
                                                            product.isOurs && "bg-mirror-50/50"
                                                        )}
                                                    >
                                                        <div className="flex justify-center gap-0.5">
                                                            {[1, 2, 3, 4, 5].map((level) => (
                                                                <div
                                                                    key={level}
                                                                    className={cn(
                                                                        "w-3 h-3 rounded-full",
                                                                        level <= score
                                                                            ? product.isOurs
                                                                                ? "bg-mirror-500"
                                                                                : "bg-gray-400"
                                                                            : "bg-gray-200"
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Summary */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-mirror-50 to-accent-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5 text-mirror-500" />
                                <span className="font-semibold text-gray-800">分析总结</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                AgenticMirror 在 <strong>实时化妆反馈</strong>、<strong>产品管理</strong> 和 <strong>趋势整合</strong>
                                三个维度上具有显著领先优势，这是目前 CES 2026 展出的所有竞品都未能覆盖的核心场景。
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Advantages Tab */}
                {activeTab === 'advantages' && (
                    <motion.div
                        key="advantages"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        {agenticMirrorAdvantages.map((advantage, i) => (
                            <motion.div
                                key={advantage.id}
                                initial={showAnimation ? { opacity: 0, y: 20 } : {}}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-mirror flex items-center justify-center text-3xl flex-shrink-0">
                                        {advantage.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-gray-900">{advantage.title}</h4>
                                            <span className="text-xs text-gray-400">{advantage.titleEn}</span>
                                        </div>
                                        <p className="text-gray-600 mb-3">{advantage.description}</p>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs text-gray-500">竞品对比：</span>
                                            {advantage.competitors.map((comp, j) => (
                                                <span
                                                    key={j}
                                                    className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full"
                                                >
                                                    <X className="w-3 h-3 inline mr-0.5" />
                                                    {comp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Call to Action */}
                        <div className="mt-6 p-6 bg-gradient-to-br from-mirror-500 to-accent-500 rounded-2xl text-white">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="w-8 h-8" />
                                <div>
                                    <h4 className="font-bold text-lg">差异化竞争壁垒</h4>
                                    <p className="text-white/80 text-sm">AgenticMirror 独有的三大护城河</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 mt-4">
                                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="font-semibold mb-1">🤖 Agentic AI</div>
                                    <div className="text-sm text-white/80">自主决策的AI代理，非简单问答</div>
                                </div>
                                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="font-semibold mb-1">👁️ 实时反馈闭环</div>
                                    <div className="text-sm text-white/80">操作-检测-建议的完整闭环</div>
                                </div>
                                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="font-semibold mb-1">📱 社交趋势融合</div>
                                    <div className="text-sm text-white/80">小红书/抖音热点实时整合</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
