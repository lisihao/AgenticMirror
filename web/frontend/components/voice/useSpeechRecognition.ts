'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface SpeechRecognitionState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
}

interface UseSpeechRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

// Web Speech API 类型声明
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

export default function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}) {
  const {
    continuous = true,
    interimResults = true,
    lang = 'zh-CN',
    onResult,
    onError,
    onEnd,
  } = options;

  const [state, setState] = useState<SpeechRecognitionState>({
    isListening: false,
    transcript: '',
    interimTranscript: '',
    error: null,
    isSupported: false,
  });

  const recognitionRef = useRef<any>(null);
  const isManualStop = useRef(false);

  // 检查浏览器支持
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setState((prev) => ({ ...prev, isSupported: true }));

      const recognition = new SpeechRecognition();
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = lang;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setState((prev) => ({
            ...prev,
            transcript: prev.transcript + finalTranscript,
            interimTranscript: '',
          }));
          onResult?.(finalTranscript, true);
        } else {
          setState((prev) => ({
            ...prev,
            interimTranscript,
          }));
          onResult?.(interimTranscript, false);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        // 忽略 no-speech 和 aborted 错误
        if (event.error === 'no-speech' || event.error === 'aborted') {
          return;
        }

        const errorMessage = getErrorMessage(event.error);
        setState((prev) => ({ ...prev, error: errorMessage }));
        onError?.(errorMessage);
      };

      recognition.onend = () => {
        // 如果是持续模式且不是手动停止，自动重启
        if (continuous && !isManualStop.current && state.isListening) {
          try {
            recognition.start();
          } catch (e) {
            // 忽略重启错误
          }
        } else {
          setState((prev) => ({ ...prev, isListening: false }));
          onEnd?.();
        }
      };

      recognitionRef.current = recognition;
    } else {
      setState((prev) => ({
        ...prev,
        isSupported: false,
        error: '您的浏览器不支持语音识别，请使用 Chrome 浏览器',
      }));
    }

    return () => {
      if (recognitionRef.current) {
        isManualStop.current = true;
        recognitionRef.current.stop();
      }
    };
  }, [continuous, interimResults, lang]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;

    isManualStop.current = false;
    setState((prev) => ({
      ...prev,
      isListening: true,
      error: null,
      transcript: '',
      interimTranscript: '',
    }));

    try {
      recognitionRef.current.start();
    } catch (e) {
      // 可能已经在运行
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;

    isManualStop.current = true;
    recognitionRef.current.stop();
    setState((prev) => ({ ...prev, isListening: false }));
  }, []);

  const resetTranscript = useCallback(() => {
    setState((prev) => ({
      ...prev,
      transcript: '',
      interimTranscript: '',
    }));
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    resetTranscript,
  };
}

function getErrorMessage(error: string): string {
  switch (error) {
    case 'not-allowed':
      return '麦克风权限被拒绝，请在浏览器设置中允许麦克风访问';
    case 'no-speech':
      return '没有检测到语音';
    case 'network':
      return '网络连接错误';
    case 'audio-capture':
      return '未检测到麦克风设备';
    case 'service-not-allowed':
      return '语音服务不可用';
    default:
      return `语音识别错误: ${error}`;
  }
}
