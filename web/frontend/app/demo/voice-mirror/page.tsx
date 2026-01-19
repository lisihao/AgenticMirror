'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mic, Info, Volume2 } from 'lucide-react';
import SketchFace from '@/components/workflow/SketchFace';
import { VoiceAssistant, DialogPhase } from '@/components/voice';

export default function VoiceMirrorPage() {
  // SketchFace 状态
  const [makeupStep, setMakeupStep] = useState(0);
  const [showScanLine, setShowScanLine] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [highlightArea, setHighlightArea] = useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = useState<DialogPhase>('idle');

  // 回调函数
  const handlePhaseChange = useCallback((phase: DialogPhase) => {
    setCurrentPhase(phase);
  }, []);

  const handleMakeupStepChange = useCallback((step: number) => {
    setMakeupStep(step);
  }, []);

  const handleHighlightAreaChange = useCallback((area: string | null) => {
    setHighlightArea(area);
  }, []);

  const handleScanLineChange = useCallback((show: boolean) => {
    setShowScanLine(show);
  }, []);

  const handleMetricsChange = useCallback((show: boolean) => {
    setShowMetrics(show);
  }, []);

  // 映射高亮区域到 SketchFace 的格式
  const mapHighlightArea = (area: string | null) => {
    if (!area) return null;
    const mapping: Record<string, any> = {
      foundation: 'full_face',
      eyebrow: 'eyebrow',
      eyeshadow: 'eyeshadow',
      blush: 'blush',
      lips: 'lips',
    };
    return mapping[area] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/demo/mirror"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </Link>

          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-pink-400" />
            <h1 className="text-white font-bold">语音智能镜</h1>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Volume2 className="w-4 h-4" />
            <span className="text-sm">请允许麦克风权限</span>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 提示信息 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-4 flex items-start gap-3"
          >
            <Info className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">语音交互模式</p>
              <p className="text-gray-400 text-sm mt-1">
                点击麦克风按钮开始，然后说 <span className="text-pink-400">"开始化妆"</span> 开始体验完整的 AI 化妆指导流程。
                支持语音命令：开始化妆、下一步、暂停、重新开始
              </p>
            </div>
          </motion.div>

          {/* 主布局：镜子 + 语音助手 */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 左侧：智能镜 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* 镜子容器 */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-white/10 shadow-2xl">
                {/* 状态指示器 */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <motion.div
                      className={`w-2 h-2 rounded-full ${
                        currentPhase === 'idle'
                          ? 'bg-gray-400'
                          : currentPhase.includes('scanning')
                          ? 'bg-blue-400'
                          : 'bg-green-400'
                      }`}
                      animate={
                        currentPhase !== 'idle'
                          ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
                          : {}
                      }
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-xs text-white font-medium">
                      {getPhaseLabel(currentPhase)}
                    </span>
                  </div>

                  {makeupStep > 0 && (
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      美颜指数 {10 + makeupStep * 6} 分
                    </div>
                  )}
                </div>

                {/* SketchFace 镜子 */}
                <div className="max-w-[400px] mx-auto">
                  <SketchFace
                    makeupStep={makeupStep}
                    showScanLine={showScanLine}
                    showMetrics={showMetrics}
                    highlightArea={mapHighlightArea(highlightArea)}
                    showZoneGuides={!!highlightArea}
                    activeZone={highlightArea as any}
                    showRoboticArms={true}
                    armAction={makeupStep > 0 ? 'handing' : 'idle'}
                    beautyScore={10 + makeupStep * 6}
                  />
                </div>

                {/* 底部状态 */}
                <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <span>💄</span>
                    <span>化妆步骤: {makeupStep}/5</span>
                  </div>
                  {highlightArea && (
                    <div className="flex items-center gap-1 text-pink-400">
                      <span>✨</span>
                      <span>当前: {getAreaLabel(highlightArea)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 装饰光效 */}
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-3xl -z-10 rounded-3xl" />
            </motion.div>

            {/* 右侧：语音助手 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <VoiceAssistant
                onPhaseChange={handlePhaseChange}
                onMakeupStepChange={handleMakeupStepChange}
                onHighlightAreaChange={handleHighlightAreaChange}
                onScanLineChange={handleScanLineChange}
                onMetricsChange={handleMetricsChange}
                autoStart={false}
              />

              {/* 语音命令提示 */}
              <div className="mt-6 bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-pink-400" />
                  语音命令
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    { cmd: '开始化妆', desc: '启动化妆流程' },
                    { cmd: '下一步', desc: '跳到下一步骤' },
                    { cmd: '暂停', desc: '暂停当前操作' },
                    { cmd: '继续', desc: '继续化妆' },
                    { cmd: '重新开始', desc: '从头开始' },
                    { cmd: '好了/完成', desc: '确认当前步骤' },
                  ].map((item) => (
                    <div
                      key={item.cmd}
                      className="flex items-center gap-2 bg-gray-700/50 rounded-lg px-3 py-2"
                    >
                      <span className="text-pink-400 font-medium">"{item.cmd}"</span>
                      <span className="text-gray-500 text-xs">- {item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* 底部说明 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-gray-500 text-sm"
          >
            <p>
              本演示使用浏览器原生 Web Speech API，推荐使用 Chrome 浏览器获得最佳体验
            </p>
            <p className="mt-1">
              首次使用需要允许麦克风权限
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// 获取阶段标签
function getPhaseLabel(phase: DialogPhase): string {
  const labels: Record<DialogPhase, string> = {
    idle: '待机',
    greeting: '问候',
    scanning: '扫描中',
    analysis: '分析结果',
    style_select: '选择风格',
    tutorial_intro: '教程准备',
    step_1_foundation: '底妆指导',
    step_1_doing: '底妆中',
    step_2_eyebrow: '眉毛指导',
    step_2_doing: '画眉中',
    step_3_eyeshadow: '眼影指导',
    step_3_doing: '眼影中',
    step_4_blush: '腮红指导',
    step_4_doing: '腮红中',
    step_5_lips: '唇妆指导',
    step_5_doing: '唇妆中',
    complete: '完成',
    feedback: '反馈',
  };
  return labels[phase] || phase;
}

// 获取区域标签
function getAreaLabel(area: string): string {
  const labels: Record<string, string> = {
    foundation: '底妆区域',
    eyebrow: '眉毛',
    eyeshadow: '眼影',
    blush: '腮红',
    lips: '唇部',
  };
  return labels[area] || area;
}
