'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    GraduationCap,
    Clock,
    Star,
    Play,
    ChevronRight,
    Filter,
    BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { mockTutorials, mockStyles } from '@/lib/constants/mockData';

const difficultyLabels = ['入门', '简单', '中等', '进阶', '专业'];

const difficultyStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
        <Star
            key={i}
            className={cn(
                "w-3 h-3",
                i < level ? "fill-gold-500 text-gold-500" : "text-gray-300"
            )}
        />
    ));
};

// Tutorial Card
function TutorialCard({
    tutorial,
    index,
    progress = 0,
}: {
    tutorial: typeof mockTutorials[0];
    index: number;
    progress?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-hover overflow-hidden group"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-mirror-100 to-accent-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="w-12 h-12 text-mirror-300" />
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {tutorial.duration} 分钟
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-mirror-500 ml-1" />
                    </div>
                </div>

                {/* Progress Bar */}
                {progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                        <div
                            className="h-full bg-mirror-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{tutorial.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{tutorial.description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            {difficultyStars(tutorial.difficulty)}
                        </div>
                        <span className="text-xs text-gray-400">
                            {difficultyLabels[tutorial.difficulty - 1]}
                        </span>
                    </div>
                    <span className="text-xs text-gray-400">
                        {tutorial.steps.length} 步骤
                    </span>
                </div>

                {progress > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-mirror-500 font-medium">
                                继续学习
                            </span>
                            <span className="text-gray-400">{progress}% 完成</span>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function TutorialsPage() {
    const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);

    // Simulate in-progress tutorial
    const inProgressTutorial = mockTutorials[0];
    const inProgressStep = 3;
    const inProgressPercent = Math.round((inProgressStep / inProgressTutorial.steps.length) * 100);

    return (
        <div className="min-h-screen p-6">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">美妆教程</h1>
                <p className="text-gray-600">跟随 AI 指导，轻松学会各种妆容</p>
            </div>

            {/* Continue Learning */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">继续学习</h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-4 bg-gradient-to-r from-mirror-50 to-accent-50"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Thumbnail */}
                        <div className="relative w-full md:w-48 aspect-video md:aspect-auto md:h-32 rounded-xl bg-gradient-to-br from-mirror-100 to-accent-100 overflow-hidden flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <GraduationCap className="w-10 h-10 text-mirror-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                                <div
                                    className="h-full bg-mirror-500"
                                    style={{ width: `${inProgressPercent}%` }}
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {inProgressTutorial.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                                {inProgressTutorial.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <span className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    步骤 {inProgressStep}/{inProgressTutorial.steps.length}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    剩余约 {Math.round((inProgressTutorial.steps.length - inProgressStep) * 1.5)} 分钟
                                </span>
                            </div>
                            <Link
                                href={`/demo/tutorials/${inProgressTutorial.id}?step=${inProgressStep}`}
                                className="btn-primary inline-flex"
                            >
                                继续
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedDifficulty(null)}
                    className={cn(
                        "px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium",
                        selectedDifficulty === null
                            ? "bg-mirror-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                >
                    全部
                </button>
                {difficultyLabels.map((label, index) => (
                    <button
                        key={label}
                        onClick={() => setSelectedDifficulty(index + 1)}
                        className={cn(
                            "px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium flex items-center gap-1",
                            selectedDifficulty === index + 1
                                ? "bg-mirror-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                    >
                        <span>{label}</span>
                    </button>
                ))}
            </div>

            {/* Tutorials Grid */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {selectedDifficulty
                            ? `${difficultyLabels[selectedDifficulty - 1]}教程`
                            : '全部教程'}
                    </h2>
                    <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                        <Filter className="w-4 h-4" />
                        更多筛选
                    </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockTutorials.map((tutorial, index) => (
                        <Link key={tutorial.id} href={`/demo/tutorials/${tutorial.id}`}>
                            <TutorialCard tutorial={tutorial} index={index} />
                        </Link>
                    ))}
                    {/* Add more placeholder tutorials */}
                    {mockStyles.slice(1).map((style, index) => (
                        <motion.div
                            key={`placeholder-${style.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (index + mockTutorials.length) * 0.1 }}
                            className="card-hover overflow-hidden"
                        >
                            <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <GraduationCap className="w-12 h-12 text-gray-300" />
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {style.duration} 分钟
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-1">{style.name}教程</h3>
                                <p className="text-sm text-gray-500 mb-3">{style.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-0.5">
                                        {difficultyStars(style.difficulty)}
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {style.steps} 步骤
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
