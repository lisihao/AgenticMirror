'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Camera,
    Sun,
    Sparkles,
    ChevronRight,
    Play,
    Pause,
    Eye,
    Droplets,
    Shield,
    Zap,
    Box,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { mockAnalysis } from '@/lib/constants/mockData';
import { HyperSkinDemo, MicroFace3DDemo } from '@/components/demos/SkinDemos';

// 智能镜3D人脸组件 - 与核心技术页面一致
function MirrorFace3D({ isScanning, showMetrics }: { isScanning: boolean; showMetrics: boolean }) {
    return (
        <div className="relative w-full aspect-[3/4] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-rose-500/20">
            {/* 3D点阵人脸 */}
            <svg viewBox="0 0 200 250" className="w-full h-full">
                {/* 面部轮廓 */}
                <ellipse cx="100" cy="120" rx="55" ry="70" fill="none" stroke="#fb7185" strokeWidth="0.5" opacity="0.5" />

                {/* 结构光点阵 */}
                {Array.from({ length: 35 }).map((_, row) =>
                    Array.from({ length: 25 }).map((_, col) => {
                        const x = 45 + col * 4.5;
                        const y = 50 + row * 5;
                        const dx = x - 100;
                        const dy = y - 120;
                        const dist = Math.sqrt(dx * dx + (dy * 0.8) ** 2);
                        const isInFace = dist < 55;
                        if (!isInFace) return null;

                        return (
                            <motion.circle
                                key={`${row}-${col}`}
                                cx={x}
                                cy={y}
                                r={showMetrics ? 1.2 : 0.8}
                                fill="#38bdf8"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: isScanning
                                        ? [0.2, 0.9, 0.2]
                                        : showMetrics ? 0.7 : 0.4
                                }}
                                transition={{
                                    duration: isScanning ? 0.8 : 1.5,
                                    delay: (row + col) * 0.01,
                                    repeat: isScanning ? Infinity : 0
                                }}
                            />
                        );
                    })
                )}

                {/* 五官轮廓 */}
                <g opacity={showMetrics ? 0.8 : 0.4}>
                    {/* 眼睛 */}
                    <ellipse cx="75" cy="105" rx="12" ry="6" fill="none" stroke="#a78bfa" strokeWidth="1" />
                    <ellipse cx="125" cy="105" rx="12" ry="6" fill="none" stroke="#a78bfa" strokeWidth="1" />
                    <circle cx="75" cy="105" r="3" fill="#a78bfa" opacity="0.5" />
                    <circle cx="125" cy="105" r="3" fill="#a78bfa" opacity="0.5" />
                    {/* 眉毛 */}
                    <path d="M60 92 Q75 88 90 92" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
                    <path d="M110 92 Q125 88 140 92" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
                    {/* 鼻子 */}
                    <path d="M100 100 L100 130 M92 133 Q100 140 108 133" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
                    {/* 嘴巴 */}
                    <path d="M82 155 Q100 165 118 155" fill="none" stroke="#fb7185" strokeWidth="1" />
                    <path d="M85 155 Q100 160 115 155" fill="none" stroke="#fb7185" strokeWidth="0.5" opacity="0.5" />
                </g>

                {/* 区域标注 */}
                {showMetrics && (
                    <g>
                        {/* T区 */}
                        <rect x="85" y="95" width="30" height="40" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="3,2" rx="2" />
                        <text x="100" y="90" textAnchor="middle" fill="#22d3ee" fontSize="6">T区</text>

                        {/* 脸颊 */}
                        <circle cx="55" cy="130" r="15" fill="none" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="3,2" />
                        <circle cx="145" cy="130" r="15" fill="none" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="3,2" />
                    </g>
                )}
            </svg>

            {/* 扫描线 */}
            {isScanning && (
                <motion.div
                    className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
                    animate={{ top: ['10%', '90%', '10%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
            )}

            {/* 顶部状态 */}
            <div className="absolute top-3 left-3 right-3 flex justify-between">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="text-rose-400 text-[10px] font-medium">AgenticMirror</div>
                </div>
                <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className={cn(
                        "text-[10px] font-medium",
                        isScanning ? "text-sky-400" : showMetrics ? "text-green-400" : "text-gray-400"
                    )}>
                        {isScanning ? '扫描中...' : showMetrics ? '分析完成' : '待扫描'}
                    </div>
                </div>
            </div>

            {/* 底部数据 */}
            {showMetrics && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg p-2"
                >
                    <div className="grid grid-cols-4 gap-1 text-center">
                        <div>
                            <div className="text-sky-400 text-xs font-bold">72%</div>
                            <div className="text-gray-500 text-[8px]">水分</div>
                        </div>
                        <div>
                            <div className="text-amber-400 text-xs font-bold">35%</div>
                            <div className="text-gray-500 text-[8px]">油脂</div>
                        </div>
                        <div>
                            <div className="text-green-400 text-xs font-bold">68</div>
                            <div className="text-gray-500 text-[8px]">弹性</div>
                        </div>
                        <div>
                            <div className="text-rose-400 text-xs font-bold">85</div>
                            <div className="text-gray-500 text-[8px]">综合</div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* 参数信息 */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px]">
                <div className="text-sky-400">50,000+ 点</div>
                <div className="text-gray-500">亚毫米级精度</div>
            </div>
        </div>
    );
}

const lightingPresets = [
    { id: 'warm', label: '暖光', temp: '2700K', color: 'from-amber-50 to-orange-50' },
    { id: 'neutral', label: '自然', temp: '4000K', color: 'from-slate-100 to-gray-100' },
    { id: 'cool', label: '冷光', temp: '5500K', color: 'from-blue-50 to-cyan-50' },
    { id: 'daylight', label: '日光', temp: '6500K', color: 'from-sky-50 to-indigo-50' },
];

const zoneOptions = [
    { id: 't_zone', label: 'T区', icon: '🔺' },
    { id: 'cheeks', label: '脸颊', icon: '🔴' },
    { id: 'eyebrow', label: '眉毛', icon: '〰️' },
    { id: 'eyeshadow', label: '眼部', icon: '👁️' },
    { id: 'lips', label: '唇部', icon: '👄' },
];

export default function MirrorPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);
    const [selectedLighting, setSelectedLighting] = useState('neutral');
    const [activeZone, setActiveZone] = useState<string | null>(null);
    const [showZoneGuides, setShowZoneGuides] = useState(false);
    const [isAutoDemo, setIsAutoDemo] = useState(false);
    const [currentDemoStep, setCurrentDemoStep] = useState(0);

    // Auto demo mode - cycle through features
    useEffect(() => {
        if (!isAutoDemo) return;

        const steps = [
            () => { setIsScanning(true); setScanComplete(false); },
            () => { setIsScanning(false); setScanComplete(true); },
            () => { setShowZoneGuides(true); setActiveZone('t_zone'); },
            () => { setActiveZone('cheeks'); },
            () => { setActiveZone('eyeshadow'); },
            () => { setActiveZone('lips'); },
            () => { setShowZoneGuides(false); setActiveZone(null); },
        ];

        const timer = setInterval(() => {
            setCurrentDemoStep(prev => {
                const next = (prev + 1) % steps.length;
                steps[next]();
                return next;
            });
        }, 2000);

        // Initialize first step
        steps[0]();

        return () => clearInterval(timer);
    }, [isAutoDemo]);

    const handleStartScan = () => {
        setIsScanning(true);
        setScanComplete(false);
        setTimeout(() => {
            setIsScanning(false);
            setScanComplete(true);
        }, 3000);
    };

    const currentLighting = lightingPresets.find(p => p.id === selectedLighting);

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">魔镜体验</h1>
                    <p className="text-gray-600">AI 智能美妆镜 - 实时皮肤分析与妆容指导</p>
                </div>
                <button
                    onClick={() => setIsAutoDemo(!isAutoDemo)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                        isAutoDemo
                            ? "bg-mirror-500 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-mirror-300"
                    )}
                >
                    {isAutoDemo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span className="text-sm font-medium">
                        {isAutoDemo ? '停止演示' : '自动演示'}
                    </span>
                </button>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Main Mirror View - Full Width */}
                <div className="lg:col-span-3">
                    <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl shadow-lg overflow-hidden border border-rose-500/20">
                        {/* Mirror Surface */}
                        <div className="relative p-6">
                            {/* Smart Mirror - 3D点阵风格 */}
                            <div className="max-w-md mx-auto">
                                <MirrorFace3D
                                    isScanning={isScanning}
                                    showMetrics={scanComplete}
                                />
                            </div>

                        </div>

                        {/* Control Bar */}
                        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/80">
                            {/* Zone Selection */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400 mr-2">区域:</span>
                                {zoneOptions.map((zone) => (
                                    <button
                                        key={zone.id}
                                        onClick={() => {
                                            setShowZoneGuides(true);
                                            setActiveZone(activeZone === zone.id ? null : zone.id);
                                        }}
                                        className={cn(
                                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all",
                                            activeZone === zone.id
                                                ? "bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/50"
                                                : "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-gray-300"
                                        )}
                                    >
                                        <span>{zone.icon}</span>
                                        <span>{zone.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleStartScan}
                                disabled={isScanning}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all",
                                    isScanning
                                        ? "bg-slate-700 text-gray-500 cursor-not-allowed"
                                        : "bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-xl hover:scale-105"
                                )}
                            >
                                <Camera className="w-5 h-5" />
                                {isScanning ? '分析中...' : '开始扫描'}
                            </button>
                        </div>
                    </div>

                    {/* Quick Metrics Row */}
                    {scanComplete && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-4 gap-4 mt-6"
                        >
                            {[
                                { icon: Droplets, label: '水分度', value: 72, color: 'text-blue-500', bg: 'bg-blue-50' },
                                { icon: Sun, label: '油脂平衡', value: 58, color: 'text-amber-500', bg: 'bg-amber-50' },
                                { icon: Eye, label: '毛孔状态', value: 65, color: 'text-purple-500', bg: 'bg-purple-50' },
                                { icon: Shield, label: '敏感度', value: 25, color: 'text-green-500', bg: 'bg-green-50' },
                            ].map((metric, index) => (
                                <motion.div
                                    key={metric.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl p-4 shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn("p-2 rounded-lg", metric.bg)}>
                                            <metric.icon className={cn("w-5 h-5", metric.color)} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-500">{metric.label}</div>
                                            <div className="text-xl font-bold text-gray-900">{metric.value}%</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${metric.value}%` }}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                            className={cn("h-full rounded-full",
                                                metric.value >= 70 ? "bg-green-500" :
                                                metric.value >= 50 ? "bg-amber-500" : "bg-red-500"
                                            )}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Lighting Controls */}
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Sun className="w-5 h-5 text-amber-500" />
                            <h2 className="font-semibold text-gray-900">灯光控制</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {lightingPresets.map((preset) => (
                                <button
                                    key={preset.id}
                                    onClick={() => setSelectedLighting(preset.id)}
                                    className={cn(
                                        "p-3 rounded-xl border-2 transition-all",
                                        selectedLighting === preset.id
                                            ? "border-mirror-500 bg-mirror-50"
                                            : "border-gray-100 hover:border-gray-200"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full mx-auto mb-2 bg-gradient-to-br",
                                        preset.color
                                    )} />
                                    <div className="text-sm font-medium text-gray-900">
                                        {preset.label}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {preset.temp}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 核心技术展示 */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 shadow-sm">
                        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-rose-400" />
                            核心技术
                        </h2>
                        <div className="space-y-4">
                            {/* HyperSkin 光谱传感 */}
                            <div className="bg-black/30 rounded-lg p-3">
                                <div className="text-rose-400 text-xs font-medium mb-2">HyperSkin 光谱传感</div>
                                <div className="h-48">
                                    <HyperSkinDemo />
                                </div>
                            </div>
                            {/* MicroFace 3D */}
                            <div className="bg-black/30 rounded-lg p-3">
                                <div className="text-sky-400 text-xs font-medium mb-2">MicroFace 3D 建模</div>
                                <div className="h-48">
                                    <MicroFace3DDemo />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature Highlights */}
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <h2 className="font-semibold text-gray-900 mb-4">智能镜功能</h2>
                        <div className="space-y-3">
                            {[
                                { icon: '🔍', title: '皮肤扫描', desc: '8通道光谱分析' },
                                { icon: '🎯', title: '3D建模', desc: '50,000点结构光' },
                                { icon: '💎', title: '耳饰推荐', desc: 'AI 配饰搭配建议' },
                                { icon: '✨', title: '实时渲染', desc: '60fps AR试妆' },
                            ].map((feature) => (
                                <div key={feature.title} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                                    <span className="text-xl">{feature.icon}</span>
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm">{feature.title}</div>
                                        <div className="text-xs text-gray-500">{feature.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-gradient-to-br from-mirror-50 to-accent-50 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-5 h-5 text-mirror-500" />
                            <h2 className="font-semibold text-gray-900">快速导航</h2>
                        </div>
                        <div className="space-y-2">
                            <Link
                                href="/demo/analysis"
                                className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                            >
                                <span className="text-sm font-medium text-gray-900">详细皮肤报告</span>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </Link>
                            <Link
                                href="/demo/workflow"
                                className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                            >
                                <span className="text-sm font-medium text-gray-900">完整工作流演示</span>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </Link>
                            <Link
                                href="/demo/recommendations"
                                className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                            >
                                <span className="text-sm font-medium text-gray-900">今日妆容推荐</span>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
