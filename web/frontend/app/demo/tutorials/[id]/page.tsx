'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    Star,
    ShoppingBag,
    Play,
    Pause,
    RotateCcw,
    Lightbulb,
    Check,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { mockTutorials, mockProducts } from '@/lib/constants/mockData';

export default function TutorialDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const tutorial = mockTutorials[0]; // Use first tutorial for demo
    const [currentStep, setCurrentStep] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    const step = tutorial.steps[currentStep - 1];
    const progress = Math.round((currentStep / tutorial.steps.length) * 100);

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleNextStep = () => {
        if (currentStep < tutorial.steps.length) {
            if (!completedSteps.includes(currentStep)) {
                setCompletedSteps([...completedSteps, currentStep]);
            }
            setCurrentStep(currentStep + 1);
        }
    };

    const handleCompleteStep = () => {
        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps([...completedSteps, currentStep]);
        }
        handleNextStep();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/demo/tutorials"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="font-semibold text-gray-900">{tutorial.title}</h1>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {tutorial.duration} 分钟
                                </span>
                                <span>步骤 {currentStep}/{tutorial.steps.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-mirror"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <span className="text-sm text-gray-500">{progress}%</span>
                        </div>
                        <button className="btn-primary">
                            完成教程
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Video/Preview Area */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Video Player */}
                            <div className="card overflow-hidden">
                                <div className="relative aspect-video bg-gradient-to-br from-mirror-100 to-accent-100">
                                    {/* AR Overlay Visualization */}
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                                        {/* Face outline */}
                                        <ellipse
                                            cx="200"
                                            cy="150"
                                            rx="80"
                                            ry="100"
                                            fill="none"
                                            stroke="#E91E63"
                                            strokeWidth="2"
                                            strokeDasharray="5,5"
                                            opacity="0.5"
                                        />

                                        {/* Highlight current area based on step */}
                                        {step.arOverlayType === 'eyeshadow' && (
                                            <>
                                                <ellipse cx="160" cy="120" rx="25" ry="12" fill="#E91E63" opacity="0.3">
                                                    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
                                                </ellipse>
                                                <ellipse cx="240" cy="120" rx="25" ry="12" fill="#E91E63" opacity="0.3">
                                                    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
                                                </ellipse>
                                            </>
                                        )}
                                        {step.arOverlayType === 'lips' && (
                                            <path
                                                d="M 170 200 Q 200 220 230 200"
                                                fill="#E91E63"
                                                opacity="0.3"
                                            >
                                                <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
                                            </path>
                                        )}
                                        {step.arOverlayType === 'eyebrow' && (
                                            <>
                                                <path d="M 130 100 Q 160 90 180 100" fill="none" stroke="#E91E63" strokeWidth="8" opacity="0.3" strokeLinecap="round">
                                                    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
                                                </path>
                                                <path d="M 220 100 Q 250 90 270 100" fill="none" stroke="#E91E63" strokeWidth="8" opacity="0.3" strokeLinecap="round">
                                                    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
                                                </path>
                                            </>
                                        )}
                                        {step.arOverlayType === 'full_face' && (
                                            <ellipse cx="200" cy="150" rx="75" ry="95" fill="#E91E63" opacity="0.1">
                                                <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2s" repeatCount="indefinite" />
                                            </ellipse>
                                        )}
                                    </svg>

                                    {/* Step indicator */}
                                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                                        步骤 {currentStep}: {step.title}
                                    </div>

                                    {/* Play controls */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                                        <button
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                                        >
                                            {isPlaying ? (
                                                <Pause className="w-5 h-5 text-gray-700" />
                                            ) : (
                                                <Play className="w-5 h-5 text-gray-700 ml-0.5" />
                                            )}
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                                            <RotateCcw className="w-4 h-4 text-gray-700" />
                                        </button>
                                    </div>
                                </div>

                                {/* Step Navigation */}
                                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                                    <button
                                        onClick={handlePrevStep}
                                        disabled={currentStep === 1}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                                            currentStep === 1
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-gray-600 hover:bg-gray-100"
                                        )}
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        上一步
                                    </button>

                                    <button
                                        onClick={handleCompleteStep}
                                        className="btn-primary"
                                    >
                                        {currentStep === tutorial.steps.length ? (
                                            <>
                                                完成教程
                                                <Check className="w-4 h-4 ml-1" />
                                            </>
                                        ) : (
                                            <>
                                                下一步
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Step Details */}
                            <div className="card p-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-mirror flex items-center justify-center text-white font-bold flex-shrink-0">
                                        {currentStep}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                            {step.title}
                                        </h2>
                                        <p className="text-gray-600 mb-4">{step.description}</p>

                                        {/* Tips */}
                                        {step.tips.length > 0 && (
                                            <div className="bg-amber-50 rounded-xl p-4">
                                                <div className="flex items-center gap-2 text-amber-600 font-medium mb-2">
                                                    <Lightbulb className="w-4 h-4" />
                                                    小技巧
                                                </div>
                                                <ul className="space-y-1">
                                                    {step.tips.map((tip, i) => (
                                                        <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                                                            <span className="text-amber-400">•</span>
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Steps Progress */}
                            <div className="card p-5">
                                <h3 className="font-semibold text-gray-900 mb-4">教程步骤</h3>
                                <div className="space-y-2">
                                    {tutorial.steps.map((s, index) => (
                                        <button
                                            key={s.stepNumber}
                                            onClick={() => setCurrentStep(index + 1)}
                                            className={cn(
                                                "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left",
                                                currentStep === index + 1
                                                    ? "bg-mirror-50 border border-mirror-200"
                                                    : completedSteps.includes(index + 1)
                                                    ? "bg-green-50"
                                                    : "hover:bg-gray-50"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0",
                                                currentStep === index + 1
                                                    ? "bg-gradient-mirror text-white"
                                                    : completedSteps.includes(index + 1)
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-100 text-gray-500"
                                            )}>
                                                {completedSteps.includes(index + 1) ? (
                                                    <Check className="w-4 h-4" />
                                                ) : (
                                                    index + 1
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={cn(
                                                    "text-sm font-medium truncate",
                                                    currentStep === index + 1 ? "text-mirror-600" : "text-gray-700"
                                                )}>
                                                    {s.title}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {s.duration} 秒
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Products for this step */}
                            <div className="card p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900">使用产品</h3>
                                    <ShoppingBag className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="space-y-3">
                                    {step.products.length > 0 ? (
                                        step.products.map((productId) => {
                                            const product = mockProducts.find(p => p.id === productId);
                                            if (!product) return null;
                                            return (
                                                <div
                                                    key={product.id}
                                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                                                >
                                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mirror-100 to-accent-100 flex items-center justify-center flex-shrink-0">
                                                        <ShoppingBag className="w-5 h-5 text-mirror-400" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-medium text-gray-900 truncate">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {product.brand}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-medium text-mirror-500">
                                                        ¥{product.price}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-4">
                                            此步骤无需特定产品
                                        </p>
                                    )}
                                </div>
                                {step.products.length > 0 && (
                                    <Link
                                        href="/demo/commerce"
                                        className="btn-secondary w-full mt-4 text-center"
                                    >
                                        查看全部产品
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
