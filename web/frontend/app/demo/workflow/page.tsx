'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    Pause,
    ChevronRight,
    ChevronLeft,
    Camera,
    User,
    Brain,
    ListChecks,
    Eye,
    Check,
    AlertTriangle,
    Info,
    ShoppingCart,
    Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import SketchFace from '@/components/workflow/SketchFace';
import SketchAIBrain from '@/components/workflow/SketchAIBrain';
import {
    workflowPhases,
    mockAnalysis,
    mockUserContext,
    moodOptions,
    occasionOptions,
    mockAISearchSteps,
    mockStyles,
    mockMakeupSteps,
    mockOperationFeedback,
    mockProductAlerts,
} from '@/lib/constants/mockData';

export default function WorkflowPage() {
    const [currentPhase, setCurrentPhase] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [aiSearchStep, setAiSearchStep] = useState(0);
    const [currentMakeupStep, setCurrentMakeupStep] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;

        // Calculate delay based on current phase
        const getPhaseDelay = () => {
            switch (currentPhase) {
                case 1: return 4000; // Face scan
                case 2: return 4000; // User context
                case 3: return 5000; // AI search
                case 4: return 5000; // Step guide
                case 5: return 6000; // Feedback
                default: return 4000;
            }
        };

        const timer = setTimeout(() => {
            if (currentPhase < 5) {
                setCurrentPhase(prev => prev + 1);
            } else {
                setIsAutoPlaying(false);
                setCurrentPhase(1); // Reset to beginning
            }
        }, getPhaseDelay());

        return () => clearTimeout(timer);
    }, [isAutoPlaying, currentPhase]);

    // Handle auto-play toggle
    const handleAutoPlayToggle = () => {
        if (!isAutoPlaying) {
            // Start from phase 1 when starting auto-play
            setCurrentPhase(1);
            setScanProgress(0);
            setAiSearchStep(0);
            setCurrentMakeupStep(0);
            setShowFeedback(false);
        }
        setIsAutoPlaying(!isAutoPlaying);
    };

    // Phase 1: Scan animation
    useEffect(() => {
        if (currentPhase !== 1) return;
        setScanProgress(0);
        const interval = setInterval(() => {
            setScanProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [currentPhase]);

    // Phase 3: AI search animation
    useEffect(() => {
        if (currentPhase !== 3) return;
        setAiSearchStep(0);
        const interval = setInterval(() => {
            setAiSearchStep((prev) => {
                if (prev >= mockAISearchSteps.length) {
                    clearInterval(interval);
                    return mockAISearchSteps.length;
                }
                return prev + 1;
            });
        }, 800);
        return () => clearInterval(interval);
    }, [currentPhase]);

    // Phase 5: Show feedback
    useEffect(() => {
        if (currentPhase !== 5) return;
        setShowFeedback(false);
        const timer = setTimeout(() => setShowFeedback(true), 1000);
        return () => clearTimeout(timer);
    }, [currentPhase]);

    const handleNextPhase = () => {
        if (currentPhase < 5) setCurrentPhase(currentPhase + 1);
    };

    const handlePrevPhase = () => {
        if (currentPhase > 1) setCurrentPhase(currentPhase - 1);
    };

    const phaseIcons = [Camera, User, Brain, ListChecks, Eye];

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Agentic AI 工作流演示</h1>
                <p className="text-gray-600">展示从面部识别到智能推荐的完整流程</p>
            </div>

            {/* Phase Indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between max-w-3xl mx-auto">
                    {workflowPhases.map((phase, index) => {
                        const Icon = phaseIcons[index];
                        const isActive = currentPhase === phase.id;
                        const isCompleted = currentPhase > phase.id;

                        return (
                            <div key={phase.id} className="flex items-center">
                                <button
                                    onClick={() => setCurrentPhase(phase.id)}
                                    className={cn(
                                        "flex flex-col items-center gap-2 transition-all",
                                        isActive && "scale-110"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                                            isActive
                                                ? "bg-gradient-mirror text-white shadow-lg"
                                                : isCompleted
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-200 text-gray-500"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            <Icon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <span
                                        className={cn(
                                            "text-xs font-medium hidden sm:block",
                                            isActive ? "text-mirror-600" : "text-gray-500"
                                        )}
                                    >
                                        {phase.title}
                                    </span>
                                </button>
                                {index < workflowPhases.length - 1 && (
                                    <div
                                        className={cn(
                                            "w-12 md:w-20 h-1 mx-2 rounded transition-colors",
                                            currentPhase > phase.id ? "bg-green-500" : "bg-gray-200"
                                        )}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto">
                <div className="card overflow-hidden">
                    <AnimatePresence mode="wait">
                        {/* Phase 1: Face Scan - Full Width Mirror */}
                        {currentPhase === 1 && (
                            <motion.div
                                key="phase1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-4"
                            >
                                {/* Header */}
                                <div className="text-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {workflowPhases[0].icon} 智能镜面部扫描
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        4K 摄像头 + 红外传感器 | 468 特征点识别
                                    </p>
                                </div>

                                {/* Full Width Mirror */}
                                <div className="flex justify-center bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl p-4">
                                    <div className="w-full max-w-2xl">
                                        <SketchFace
                                            showScanLine={scanProgress < 100}
                                            showMetrics={scanProgress >= 100}
                                            showZoneGuides={scanProgress >= 100}
                                            activeZone={scanProgress >= 100 ? 't_zone' : null}
                                            showEarringRecommend={scanProgress >= 100}
                                        />
                                    </div>
                                </div>

                                {/* Scan Progress Bar */}
                                <div className="mt-4 max-w-md mx-auto">
                                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                                        <span>{scanProgress < 100 ? '正在扫描...' : '扫描完成'}</span>
                                        <span>{scanProgress}%</span>
                                    </div>
                                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-mirror"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${scanProgress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Detailed Skin Analysis Section - Below Mirror */}
                                {scanProgress >= 100 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6 space-y-4"
                                    >
                                        {/* Overall Score Card */}
                                        <div className="bg-gradient-to-r from-mirror-500 to-accent-500 rounded-2xl p-5 text-white">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Sparkles className="w-6 h-6" />
                                                        <span className="text-lg font-semibold">皮肤综合评分</span>
                                                    </div>
                                                    <p className="text-white/80 text-sm">
                                                        混合性肌肤 | 暖色调 | Monk 色阶 5
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-5xl font-bold">{mockAnalysis.overallScore}</div>
                                                    <div className="text-white/80 text-sm">/ 100 分</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Detailed Metrics Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {Object.entries(mockAnalysis.metrics).slice(0, 8).map(([key, value], i) => {
                                                const labels: Record<string, string> = {
                                                    hydration: '水分度',
                                                    oil: '油脂分泌',
                                                    pores: '毛孔状态',
                                                    wrinkles: '细纹程度',
                                                    darkCircles: '黑眼圈',
                                                    acne: '痘痘/粉刺',
                                                    sensitivity: '敏感度',
                                                    brightness: '肤色亮度',
                                                };
                                                const statusColors: Record<string, string> = {
                                                    good: 'text-green-600 bg-green-50',
                                                    moderate: 'text-amber-600 bg-amber-50',
                                                    visible: 'text-orange-600 bg-orange-50',
                                                    minimal: 'text-green-600 bg-green-50',
                                                    mild: 'text-amber-600 bg-amber-50',
                                                    few: 'text-green-600 bg-green-50',
                                                    low: 'text-green-600 bg-green-50',
                                                };
                                                return (
                                                    <motion.div
                                                        key={key}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                                                    >
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-xl">{value.icon}</span>
                                                            <span className="text-sm text-gray-600">{labels[key] || key}</span>
                                                        </div>
                                                        <div className="flex items-end justify-between">
                                                            <div className="text-2xl font-bold text-gray-900">{value.score}</div>
                                                            <div className={cn(
                                                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                                                statusColors[value.status] || 'text-gray-600 bg-gray-50'
                                                            )}>
                                                                {value.trend !== '0' && (
                                                                    <span className={value.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                                                                        {value.trend}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Mini Progress Bar */}
                                                        <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                            <motion.div
                                                                className={cn(
                                                                    "h-full rounded-full",
                                                                    value.score >= 70 ? 'bg-green-500' :
                                                                    value.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                                                )}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${value.score}%` }}
                                                                transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                                                            />
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Problem Areas & Recommendations */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {/* Problem Areas */}
                                            <div className="bg-white rounded-xl p-5 border border-gray-100">
                                                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                                                    问题区域分析
                                                </h3>
                                                <div className="space-y-3">
                                                    {mockAnalysis.problemAreas.map((area, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={cn(
                                                                    "w-3 h-3 rounded-full",
                                                                    area.severity === 'moderate' ? 'bg-amber-500' :
                                                                    area.severity === 'mild' ? 'bg-yellow-400' : 'bg-orange-500'
                                                                )} />
                                                                <div>
                                                                    <div className="font-medium text-gray-800">
                                                                        {area.zone === 't-zone' ? 'T区' :
                                                                         area.zone === 'cheeks' ? '脸颊' :
                                                                         area.zone === 'nose' ? '鼻翼' : '额头'}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {area.issue === 'oil' ? '出油较多' :
                                                                         area.issue === 'dryness' ? '轻微干燥' :
                                                                         area.issue === 'pores' ? '毛孔明显' : '轻微色斑'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span className={cn(
                                                                "px-2 py-1 rounded-full text-xs",
                                                                area.severity === 'moderate' ? 'bg-amber-100 text-amber-700' :
                                                                'bg-yellow-100 text-yellow-700'
                                                            )}>
                                                                {area.severity === 'moderate' ? '中等' :
                                                                 area.severity === 'mild' ? '轻微' : '明显'}
                                                            </span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* AI Recommendations */}
                                            <div className="bg-white rounded-xl p-5 border border-gray-100">
                                                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                    <Sparkles className="w-5 h-5 text-mirror-500" />
                                                    AI 护肤建议
                                                </h3>
                                                <div className="space-y-3">
                                                    {mockAnalysis.recommendations.map((rec, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: 10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="flex items-start gap-3 p-3 bg-mirror-50 rounded-lg"
                                                        >
                                                            <div className="w-6 h-6 rounded-full bg-mirror-500 text-white flex items-center justify-center text-sm flex-shrink-0">
                                                                {i + 1}
                                                            </div>
                                                            <p className="text-sm text-gray-700">{rec}</p>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* Phase 2: User Context */}
                        {currentPhase === 2 && (
                            <motion.div
                                key="phase2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6"
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    {workflowPhases[1].icon} 用户画像采集
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    根据您的心情、生理期、今日日程等信息，为您定制最适合的妆容方案。
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Mood Selection */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="bg-gray-50 rounded-xl p-5"
                                    >
                                        <h3 className="font-semibold text-gray-800 mb-3">今日心情</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {moodOptions.map((mood) => (
                                                <div
                                                    key={mood.id}
                                                    className={cn(
                                                        "p-3 rounded-lg border-2 transition-all cursor-pointer",
                                                        mockUserContext.mood === mood.id
                                                            ? "border-mirror-500 bg-mirror-50"
                                                            : "border-gray-200 hover:border-gray-300"
                                                    )}
                                                >
                                                    <div className="text-2xl mb-1">{mood.icon}</div>
                                                    <div className="text-sm font-medium">{mood.label}</div>
                                                    <div className="text-xs text-gray-500">{mood.skinEffect}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Occasion Selection */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-gray-50 rounded-xl p-5"
                                    >
                                        <h3 className="font-semibold text-gray-800 mb-3">今日场合</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {occasionOptions.map((occasion) => (
                                                <div
                                                    key={occasion.id}
                                                    className={cn(
                                                        "p-3 rounded-lg border-2 transition-all cursor-pointer",
                                                        mockUserContext.occasion === occasion.id
                                                            ? "border-mirror-500 bg-mirror-50"
                                                            : "border-gray-200 hover:border-gray-300"
                                                    )}
                                                >
                                                    <div className="text-2xl mb-1">{occasion.icon}</div>
                                                    <div className="text-sm font-medium">{occasion.label}</div>
                                                    <div className="text-xs text-gray-500">{occasion.style}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Schedule */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-gray-50 rounded-xl p-5"
                                    >
                                        <h3 className="font-semibold text-gray-800 mb-3">📅 今日日程</h3>
                                        <div className="space-y-2">
                                            {mockUserContext.schedule.map((event, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-3 p-2 bg-white rounded-lg"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-mirror-500" />
                                                    <span className="text-sm text-gray-700">{event}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Weather & Period */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="bg-gray-50 rounded-xl p-5 space-y-4"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-2">🌤️ 今日天气</h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span>{mockUserContext.weather.temp}°C</span>
                                                <span>湿度 {mockUserContext.weather.humidity}%</span>
                                                <span>UV {mockUserContext.weather.uv}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-2">🩺 生理期</h3>
                                            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                                {mockUserContext.menstrualLabel} - 皮肤状态稳定
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {/* Phase 3: AI Search */}
                        {currentPhase === 3 && (
                            <motion.div
                                key="phase3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6"
                            >
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="flex flex-col items-center justify-center">
                                        <SketchAIBrain
                                            isSearching={aiSearchStep < mockAISearchSteps.length}
                                            searchProgress={(aiSearchStep / mockAISearchSteps.length) * 100}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {workflowPhases[2].icon} AI 智能搜索与匹配
                                        </h2>
                                        <p className="text-gray-600">
                                            Agentic AI 搜索小红书、抖音等平台的流行趋势，结合您的肤质和场合需求，
                                            智能匹配最适合的妆容。
                                        </p>

                                        {/* Search Steps */}
                                        <div className="space-y-2 mt-4">
                                            {mockAISearchSteps.map((step, index) => (
                                                <motion.div
                                                    key={step.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{
                                                        opacity: index < aiSearchStep ? 1 : 0.3,
                                                        x: 0,
                                                    }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className={cn(
                                                        "flex items-center gap-3 p-3 rounded-lg transition-all",
                                                        index < aiSearchStep
                                                            ? "bg-green-50"
                                                            : "bg-gray-50"
                                                    )}
                                                >
                                                    <span className="text-xl">{step.icon}</span>
                                                    <span className="text-sm text-gray-700">{step.text}</span>
                                                    {index < aiSearchStep && (
                                                        <Check className="w-4 h-4 text-green-500 ml-auto" />
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Results */}
                                        {aiSearchStep >= mockAISearchSteps.length && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-6"
                                            >
                                                <h3 className="font-semibold text-gray-800 mb-3">
                                                    🎯 为您推荐的妆容
                                                </h3>
                                                <div className="space-y-3">
                                                    {mockStyles.slice(0, 3).map((style, i) => (
                                                        <div
                                                            key={style.id}
                                                            className={cn(
                                                                "p-4 rounded-xl border-2 transition-all",
                                                                i === 0
                                                                    ? "border-mirror-500 bg-mirror-50"
                                                                    : "border-gray-200"
                                                            )}
                                                        >
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-semibold text-gray-900">
                                                                            {style.name}
                                                                        </span>
                                                                        {i === 0 && (
                                                                            <span className="px-2 py-0.5 bg-mirror-500 text-white text-xs rounded-full">
                                                                                最佳匹配
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-sm text-gray-500 mt-1">
                                                                        {style.matchReason}
                                                                    </p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-2xl font-bold text-mirror-600">
                                                                        {style.matchScore}%
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">匹配度</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Phase 4: Step Guide - Full Width Mirror with Steps Below */}
                        {currentPhase === 4 && (
                            <motion.div
                                key="phase4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-4"
                            >
                                {/* Header with Beauty Score */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {workflowPhases[3].icon} 妆容实时演示
                                        </h2>
                                        <p className="text-gray-500 text-sm">
                                            点击下方步骤，在镜中查看实时效果变化
                                        </p>
                                    </div>
                                    {/* Beauty Score Progress */}
                                    <div className="flex items-center gap-4 bg-gradient-to-r from-mirror-500 to-accent-500 px-5 py-3 rounded-2xl text-white">
                                        <div>
                                            <div className="text-xs opacity-80">颜值评分</div>
                                            <motion.div
                                                className="text-3xl font-bold"
                                                key={currentMakeupStep}
                                                initial={{ scale: 1.3 }}
                                                animate={{ scale: 1 }}
                                            >
                                                {60 + (currentMakeupStep + 1) * 4}
                                            </motion.div>
                                        </div>
                                        <div className="w-px h-10 bg-white/30" />
                                        <div>
                                            <div className="text-xs opacity-80">提升</div>
                                            <div className="text-xl font-bold">+{(currentMakeupStep + 1) * 4}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Full Width Mirror */}
                                <div className="flex justify-center bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl p-4 mb-4">
                                    <div className="w-full max-w-2xl">
                                        <SketchFace
                                            makeupStep={currentMakeupStep + 1}
                                            highlightArea={
                                                currentMakeupStep === 0 ? 'foundation' :
                                                currentMakeupStep === 1 ? 'eyebrow' :
                                                currentMakeupStep === 2 ? 'eyeshadow' :
                                                currentMakeupStep === 3 ? 'blush' :
                                                'lips'
                                            }
                                            showTransformation={true}
                                            beautyScore={60 + (currentMakeupStep + 1) * 4}
                                            showZoneGuides={true}
                                            activeZone={
                                                currentMakeupStep === 0 ? 'foundation' :
                                                currentMakeupStep === 1 ? 'eyebrow' :
                                                currentMakeupStep === 2 ? 'eyeshadow' :
                                                currentMakeupStep === 3 ? 'blush' :
                                                'lips'
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Step Timeline - Horizontal Scroll */}
                                <div className="mb-4">
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        {mockMakeupSteps.map((step, i) => {
                                            const isActive = currentMakeupStep === i;
                                            const isCompleted = currentMakeupStep > i;
                                            const zoneColors = ['#F59E0B', '#92400E', '#8B5CF6', '#EC4899', '#EF4444'];

                                            return (
                                                <motion.div
                                                    key={step.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    onClick={() => setCurrentMakeupStep(i)}
                                                    className={cn(
                                                        "flex-shrink-0 w-32 p-3 rounded-xl cursor-pointer transition-all border-2",
                                                        isActive
                                                            ? "border-mirror-500 bg-white shadow-lg"
                                                            : isCompleted
                                                            ? "border-green-300 bg-green-50"
                                                            : "border-gray-200 bg-white hover:border-gray-300"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div
                                                            className={cn(
                                                                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                                                                isActive ? "text-white" : isCompleted ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"
                                                            )}
                                                            style={isActive ? { backgroundColor: zoneColors[i] } : {}}
                                                        >
                                                            {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                                                        </div>
                                                        <span className={cn(
                                                            "font-semibold text-sm",
                                                            isActive ? "text-mirror-600" : "text-gray-700"
                                                        )}>
                                                            {step.title}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">{step.duration}秒</div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Active Step Details */}
                                <motion.div
                                    key={currentMakeupStep}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid md:grid-cols-3 gap-4"
                                >
                                    {/* Step Description */}
                                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-mirror-500 text-white flex items-center justify-center text-sm">
                                                {currentMakeupStep + 1}
                                            </span>
                                            {mockMakeupSteps[currentMakeupStep].title}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-3">
                                            {mockMakeupSteps[currentMakeupStep].description}
                                        </p>
                                        <div className="space-y-1">
                                            {mockMakeupSteps[currentMakeupStep].detailedSteps.map((ds, j) => (
                                                <div key={j} className="flex items-start gap-2 text-sm">
                                                    <span className="text-mirror-500">•</span>
                                                    <span className="text-gray-600">{ds}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tips & Warnings */}
                                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                        <h4 className="font-semibold text-amber-800 mb-2">💡 技巧提示</h4>
                                        <div className="space-y-2">
                                            {mockMakeupSteps[currentMakeupStep].tips.map((tip, j) => (
                                                <div key={j} className="flex items-start gap-2 text-sm text-amber-700">
                                                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                                    <span>{tip}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-amber-200">
                                            <div className="text-xs text-amber-600 font-medium mb-1">常见问题</div>
                                            {mockMakeupSteps[currentMakeupStep].commonIssues.map((issue, j) => (
                                                <div key={j} className="text-sm text-amber-700">⚠️ {issue}</div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Product Recommendation */}
                                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                                        <h4 className="font-semibold text-gray-800 mb-3">🛍️ 推荐产品</h4>
                                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-mirror-50 to-accent-50 rounded-lg">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-mirror flex items-center justify-center">
                                                <ShoppingCart className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-500">
                                                    {mockMakeupSteps[currentMakeupStep].product.brand}
                                                </div>
                                                <div className="font-semibold text-gray-800">
                                                    {mockMakeupSteps[currentMakeupStep].product.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="text-sm text-gray-500">预计用时</div>
                                            <div className="font-bold text-mirror-600">
                                                {mockMakeupSteps[currentMakeupStep].duration}秒
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Phase 5: Real-time Feedback */}
                        {currentPhase === 5 && (
                            <motion.div
                                key="phase5"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6"
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {workflowPhases[4].icon} 实时跟踪与反馈
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    AI 监控您的化妆过程，实时发现问题并给出专业建议，同时监控彩妆用品状态。
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Operation Feedback */}
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-3">
                                            🎯 操作反馈
                                        </h3>
                                        <div className="space-y-3">
                                            {showFeedback &&
                                                mockOperationFeedback.map((feedback, i) => (
                                                    <motion.div
                                                        key={feedback.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.3 }}
                                                        className={cn(
                                                            "p-4 rounded-xl border-l-4",
                                                            feedback.severity === 'warning'
                                                                ? "bg-amber-50 border-amber-500"
                                                                : feedback.severity === 'success'
                                                                ? "bg-green-50 border-green-500"
                                                                : "bg-blue-50 border-blue-500"
                                                        )}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            {feedback.severity === 'warning' ? (
                                                                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                                            ) : feedback.severity === 'success' ? (
                                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                            ) : (
                                                                <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                                            )}
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium text-gray-900">
                                                                        {feedback.issue}
                                                                    </span>
                                                                    <span className="text-xs text-gray-400">
                                                                        {feedback.timestamp}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    {feedback.suggestion}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                        </div>
                                    </div>

                                    {/* Product Alerts */}
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-3">
                                            📦 产品监控
                                        </h3>
                                        <div className="space-y-3">
                                            {showFeedback &&
                                                mockProductAlerts.map((alert, i) => (
                                                    <motion.div
                                                        key={alert.id}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.3 + 0.5 }}
                                                        className={cn(
                                                            "p-4 rounded-xl",
                                                            alert.urgency === 'high'
                                                                ? "bg-red-50 border border-red-200"
                                                                : "bg-gray-50 border border-gray-200"
                                                        )}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    {alert.urgency === 'high' && (
                                                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                                                    )}
                                                                    <span className="font-medium text-gray-900">
                                                                        {alert.productName}
                                                                    </span>
                                                                    {alert.brand && (
                                                                        <span className="text-xs text-gray-500">
                                                                            {alert.brand}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    {alert.message}
                                                                </p>
                                                                {alert.remaining && (
                                                                    <div className="mt-2">
                                                                        <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                                                                            <div
                                                                                className={cn(
                                                                                    "h-full rounded-full",
                                                                                    alert.remaining < 30
                                                                                        ? "bg-red-500"
                                                                                        : "bg-green-500"
                                                                                )}
                                                                                style={{ width: `${alert.remaining}%` }}
                                                                            />
                                                                        </div>
                                                                        <span className="text-xs text-gray-500">
                                                                            剩余 {alert.remaining}%
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {alert.suggestedAction && (
                                                                <button className="flex items-center gap-1 px-3 py-1.5 bg-mirror-500 text-white text-sm rounded-lg hover:bg-mirror-600 transition-colors">
                                                                    <ShoppingCart className="w-4 h-4" />
                                                                    {alert.suggestedAction}
                                                                </button>
                                                            )}
                                                        </div>
                                                        {alert.suggestedProduct && (
                                                            <div className="mt-3 p-2 bg-white rounded-lg flex items-center justify-between">
                                                                <div className="text-sm">
                                                                    <span className="text-gray-500">推荐替代：</span>
                                                                    <span className="font-medium text-gray-900">
                                                                        {alert.suggestedProduct}
                                                                    </span>
                                                                </div>
                                                                <span className="text-mirror-600 font-medium">
                                                                    ¥{alert.price}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {alert.salePrice && (
                                                            <div className="mt-2 text-sm text-green-600">
                                                                🏷️ {alert.nextSale}特惠价 ¥{alert.salePrice}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                        <button
                            onClick={handlePrevPhase}
                            disabled={currentPhase === 1}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                                currentPhase === 1
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            上一步
                        </button>

                        <button
                            onClick={handleAutoPlayToggle}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                                isAutoPlaying
                                    ? "bg-mirror-100 text-mirror-600 animate-pulse"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            )}
                        >
                            {isAutoPlaying ? (
                                <>
                                    <Pause className="w-5 h-5" />
                                    暂停演示
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5" />
                                    自动演示
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleNextPhase}
                            disabled={currentPhase === 5}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                                currentPhase === 5
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "bg-gradient-mirror text-white hover:opacity-90"
                            )}
                        >
                            下一步
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
