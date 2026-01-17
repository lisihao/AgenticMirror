'use client';

import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, ExternalLink } from 'lucide-react';
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
            </motion.div>
        </div>
    );
}
