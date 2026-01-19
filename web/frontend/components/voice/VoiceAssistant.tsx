'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, RotateCcw, SkipForward } from 'lucide-react';
import useSpeechRecognition from './useSpeechRecognition';
import useSpeechSynthesis from './useSpeechSynthesis';
import VoiceWaveform, { VoicePulse, SpeakerWave } from './VoiceWaveform';
import {
  DialogPhase,
  DialogContext,
  DIALOG_SCRIPTS,
  DEFAULT_SKIN_ANALYSIS,
  matchIntent,
  getCurrentStepNumber,
  isInMakeupPhase,
} from './dialogFlows';

interface VoiceAssistantProps {
  onPhaseChange?: (phase: DialogPhase) => void;
  onMakeupStepChange?: (step: number) => void;
  onHighlightAreaChange?: (area: string | null) => void;
  onScanLineChange?: (show: boolean) => void;
  onMetricsChange?: (show: boolean) => void;
  autoStart?: boolean;
}

export default function VoiceAssistant({
  onPhaseChange,
  onMakeupStepChange,
  onHighlightAreaChange,
  onScanLineChange,
  onMetricsChange,
  autoStart = false,
}: VoiceAssistantProps) {
  // 对话状态
  const [phase, setPhase] = useState<DialogPhase>('idle');
  const [context, setContext] = useState<DialogContext>({
    skinAnalysis: DEFAULT_SKIN_ANALYSIS,
    currentStep: 0,
    totalSteps: 5,
    makeupStep: 0,
  });

  // UI 状态
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [userTranscript, setUserTranscript] = useState('');

  // 定时器引用
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 语音识别
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported: isRecognitionSupported,
    error: recognitionError,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    onResult: (text, isFinal) => {
      if (isFinal) {
        handleUserInput(text);
      }
      setUserTranscript(isFinal ? text : interimTranscript);
    },
  });

  // 语音合成
  const {
    isSpeaking,
    isSupported: isSynthesisSupported,
    speak,
    cancel: cancelSpeech,
  } = useSpeechSynthesis({
    defaultRate: 1.1,
    onEnd: () => {
      // AI 说完后检查是否需要自动进入下一阶段
      const currentScript = DIALOG_SCRIPTS[phase];
      if (currentScript.autoAdvance && currentScript.nextPhase) {
        autoAdvanceTimerRef.current = setTimeout(() => {
          transitionToPhase(currentScript.nextPhase!);
        }, currentScript.duration || 1000);
      }
    },
  });

  // 处理用户输入
  const handleUserInput = useCallback(
    (text: string) => {
      const currentScript = DIALOG_SCRIPTS[phase];

      // 检查是否匹配意图
      if (currentScript.userIntents && currentScript.nextPhase) {
        if (matchIntent(text, currentScript.userIntents)) {
          transitionToPhase(currentScript.nextPhase);
        }
      }

      // 特殊命令
      if (matchIntent(text, ['暂停', '停止', '等一下'])) {
        cancelSpeech();
        stopListening();
        setIsActive(false);
      }

      if (matchIntent(text, ['继续', '开始'])) {
        setIsActive(true);
        startListening();
      }

      if (matchIntent(text, ['重新开始', '从头开始'])) {
        resetDialog();
      }

      if (matchIntent(text, ['下一步', '跳过'])) {
        skipToNextStep();
      }
    },
    [phase]
  );

  // 阶段转换
  const transitionToPhase = useCallback(
    (newPhase: DialogPhase) => {
      // 清除之前的定时器
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }

      setPhase(newPhase);
      onPhaseChange?.(newPhase);

      const script = DIALOG_SCRIPTS[newPhase];

      // 更新上下文
      if (script.makeupStep !== undefined) {
        setContext((prev) => ({ ...prev, makeupStep: script.makeupStep! }));
        onMakeupStepChange?.(script.makeupStep);
      }

      // 更新高亮区域
      onHighlightAreaChange?.(script.highlightArea || null);

      // 更新扫描线
      if (script.showScanLine !== undefined) {
        onScanLineChange?.(script.showScanLine);
      }

      // 更新指标显示
      if (script.showMetrics !== undefined) {
        onMetricsChange?.(script.showMetrics);
      }

      // 获取 AI 文本
      const aiText =
        typeof script.aiText === 'function' ? script.aiText(context) : script.aiText;

      setCurrentText(aiText);

      // 播放语音
      if (!isMuted) {
        speak(aiText);
      } else if (script.autoAdvance && script.nextPhase) {
        // 静音模式下也要自动前进
        autoAdvanceTimerRef.current = setTimeout(() => {
          transitionToPhase(script.nextPhase!);
        }, script.duration || 3000);
      }

      // 开始计时（如果是教程开始）
      if (newPhase === 'tutorial_intro') {
        setContext((prev) => ({ ...prev, startTime: new Date() }));
      }

      resetTranscript();
    },
    [context, isMuted, onPhaseChange, onMakeupStepChange, onHighlightAreaChange, speak]
  );

  // 跳到下一步
  const skipToNextStep = useCallback(() => {
    const currentScript = DIALOG_SCRIPTS[phase];
    if (currentScript.nextPhase) {
      cancelSpeech();
      transitionToPhase(currentScript.nextPhase);
    }
  }, [phase, transitionToPhase, cancelSpeech]);

  // 重置对话
  const resetDialog = useCallback(() => {
    cancelSpeech();
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    setPhase('idle');
    setContext({
      skinAnalysis: DEFAULT_SKIN_ANALYSIS,
      currentStep: 0,
      totalSteps: 5,
      makeupStep: 0,
    });
    onPhaseChange?.('idle');
    onMakeupStepChange?.(0);
    onHighlightAreaChange?.(null);
    onScanLineChange?.(false);
    onMetricsChange?.(false);
    resetTranscript();
  }, [cancelSpeech, resetTranscript]);

  // 切换激活状态
  const toggleActive = useCallback(() => {
    if (isActive) {
      stopListening();
      cancelSpeech();
      setIsActive(false);
    } else {
      setIsActive(true);
      startListening();
      // 如果在 idle 状态，开始对话
      if (phase === 'idle') {
        transitionToPhase('idle');
      }
    }
  }, [isActive, phase, startListening, stopListening, cancelSpeech, transitionToPhase]);

  // 自动启动
  useEffect(() => {
    if (autoStart && isRecognitionSupported) {
      setIsActive(true);
      startListening();
      transitionToPhase('idle');
    }
  }, [autoStart, isRecognitionSupported]);

  // 清理
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  // 浏览器不支持
  if (!isRecognitionSupported) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
        <p className="text-red-600 font-medium">
          您的浏览器不支持语音识别
        </p>
        <p className="text-red-500 text-sm mt-1">
          请使用 Chrome 或 Edge 浏览器体验语音交互
        </p>
      </div>
    );
  }

  const currentStep = getCurrentStepNumber(phase);
  const inMakeupPhase = isInMakeupPhase(phase);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 border border-white/10">
      {/* AI 对话区域 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <SpeakerWave isActive={isSpeaking} size={40} color="#8b5cf6" />
          <span className="text-white font-medium">小镜 AI 助手</span>
          {isSpeaking && (
            <span className="text-xs text-purple-400 animate-pulse">正在说话...</span>
          )}
        </div>

        {/* AI 文本显示 */}
        <motion.div
          className="bg-white/5 rounded-xl p-4 min-h-[80px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentText}
              className="text-gray-200 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {currentText || '说"开始化妆"开始体验~'}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 用户语音区域 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <VoicePulse isActive={isListening && isActive} size={40} color="#ec4899" />
          <span className="text-white font-medium">你的声音</span>
          {isListening && isActive && (
            <span className="text-xs text-pink-400 animate-pulse">正在聆听...</span>
          )}
        </div>

        {/* 用户语音显示 */}
        <div className="bg-white/5 rounded-xl p-4 min-h-[60px] flex items-center">
          {isListening && isActive ? (
            <div className="flex items-center gap-4 w-full">
              <VoiceWaveform isActive={true} color="#ec4899" height={30} />
              <p className="text-gray-300 flex-1">
                {interimTranscript || transcript || '请说话...'}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              {userTranscript || '点击麦克风开始对话'}
            </p>
          )}
        </div>
      </div>

      {/* 步骤进度 */}
      {inMakeupPhase && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">化妆进度</span>
            <span className="text-white font-medium">{currentStep}/5</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <motion.div
                key={step}
                className={`h-2 flex-1 rounded-full ${
                  step <= currentStep
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'bg-gray-700'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step <= currentStep ? 1 : 1 }}
                transition={{ delay: step * 0.1 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>底妆</span>
            <span>眉毛</span>
            <span>眼影</span>
            <span>腮红</span>
            <span>唇妆</span>
          </div>
        </div>
      )}

      {/* 控制按钮 */}
      <div className="flex items-center justify-center gap-4">
        {/* 主麦克风按钮 */}
        <motion.button
          onClick={toggleActive}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isActive
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-pink-500/30'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isActive ? (
            <Mic className="w-7 h-7 text-white" />
          ) : (
            <MicOff className="w-7 h-7 text-gray-400" />
          )}
        </motion.button>

        {/* 静音按钮 */}
        <motion.button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isMuted ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-400'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>

        {/* 跳过按钮 */}
        <motion.button
          onClick={skipToNextStep}
          className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SkipForward className="w-5 h-5" />
        </motion.button>

        {/* 重新开始按钮 */}
        <motion.button
          onClick={resetDialog}
          className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
      </div>

      {/* 错误提示 */}
      {recognitionError && (
        <motion.p
          className="mt-4 text-center text-red-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {recognitionError}
        </motion.p>
      )}

      {/* 提示文字 */}
      <p className="mt-4 text-center text-gray-500 text-xs">
        试试说：开始化妆 | 下一步 | 暂停 | 重新开始
      </p>
    </div>
  );
}
