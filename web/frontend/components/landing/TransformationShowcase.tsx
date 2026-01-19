'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, ArrowRight, Play, Pause } from 'lucide-react';

interface TransformationShowcaseProps {
  autoPlay?: boolean;
  interval?: number;
}

const transformationSteps = [
  {
    image: '/demo/transformation/IMG_2239.PNG',
    score: 10,
    label: '素颜起点',
    description: 'AI 扫描分析中...',
    color: 'from-gray-400 to-gray-500',
    textColor: 'text-gray-400',
  },
  {
    image: '/demo/transformation/IMG_2240.PNG',
    score: 25,
    label: '化妆进行中',
    description: 'AI 实时指导化妆',
    color: 'from-pink-400 to-pink-500',
    textColor: 'text-pink-400',
  },
  {
    image: '/demo/transformation/IMG_2241.PNG',
    score: 40,
    label: '惊艳蜕变',
    description: '完美妆容达成！',
    color: 'from-green-400 to-emerald-500',
    textColor: 'text-green-400',
  },
];

export default function TransformationShowcase({
  autoPlay = true,
  interval = 3000,
}: TransformationShowcaseProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showComparison, setShowComparison] = useState(false);

  // 自动播放
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= transformationSteps.length - 1) {
          // 在最后一步停留更长时间，然后显示对比图
          setTimeout(() => {
            setShowComparison(true);
            setTimeout(() => {
              setShowComparison(false);
              setCurrentStep(0);
            }, 4000);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval]);

  const current = transformationSteps[currentStep];

  return (
    <div className="relative">
      {/* 主展示区 */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* 装饰光效 */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-purple-500/10" />

        {/* 顶部状态栏 */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-white text-sm font-medium">LIVE · AI 实时化妆</span>
          </div>
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </motion.button>
        </div>

        {/* 图片展示区 */}
        <div className="relative aspect-[3/4] max-h-[500px]">
          <AnimatePresence mode="wait">
            {showComparison ? (
              // 对比图展示
              <motion.div
                key="comparison"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0"
              >
                <Image
                  src="/demo/transformation/IMG_2238.PNG"
                  alt="蜕变对比"
                  fill
                  className="object-cover"
                  priority
                />
                {/* 对比标签 */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  <Sparkles className="w-5 h-5 inline mr-2" />
                  震撼蜕变！
                </motion.div>
              </motion.div>
            ) : (
              // 步骤展示
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.label}
                  fill
                  className="object-cover"
                  priority
                />

                {/* 扫描线效果 - 仅在第一步 */}
                {currentStep === 0 && (
                  <motion.div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    initial={{ top: '10%' }}
                    animate={{ top: '90%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                )}

                {/* 化妆指引效果 - 在第二步 */}
                {currentStep === 1 && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-pink-400 rounded-full"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 底部信息栏 */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
          {/* 分数显示 */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <motion.div
                key={current.score}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-5xl font-black bg-gradient-to-r ${current.color} bg-clip-text text-transparent`}
              >
                {current.score}
                <span className="text-2xl">分</span>
              </motion.div>
              <p className="text-gray-400 text-sm mt-1">{current.description}</p>
            </div>
            <motion.div
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${current.color} text-white font-bold`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {current.label}
            </motion.div>
          </div>

          {/* 进度条 */}
          <div className="flex gap-2">
            {transformationSteps.map((step, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentStep(index);
                  setShowComparison(false);
                }}
                className="relative flex-1 h-2 rounded-full overflow-hidden bg-white/20"
              >
                <motion.div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${step.color}`}
                  initial={{ width: '0%' }}
                  animate={{ width: index <= currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* 步骤标签 */}
          <div className="flex justify-between mt-2 text-xs">
            {transformationSteps.map((step, index) => (
              <span
                key={index}
                className={index <= currentStep ? step.textColor : 'text-gray-600'}
              >
                {step.score}分
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 蜕变箭头指示 */}
      <motion.div
        className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <ArrowRight className="w-8 h-8 text-pink-400" />
        </motion.div>
        <span className="text-pink-400 text-sm font-bold writing-vertical">
          蜕变中
        </span>
      </motion.div>
    </div>
  );
}
