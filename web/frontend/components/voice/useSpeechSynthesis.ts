'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface SpeechSynthesisOptions {
  voice?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface UseSpeechSynthesisState {
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  voices: SpeechSynthesisVoice[];
  currentVoice: SpeechSynthesisVoice | null;
}

interface UseSpeechSynthesisOptions {
  defaultVoice?: string;
  defaultRate?: number;
  defaultPitch?: number;
  defaultVolume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export default function useSpeechSynthesis(options: UseSpeechSynthesisOptions = {}) {
  const {
    defaultVoice,
    defaultRate = 1.0,
    defaultPitch = 1.0,
    defaultVolume = 1.0,
    onStart,
    onEnd,
    onError,
  } = options;

  const [state, setState] = useState<UseSpeechSynthesisState>({
    isSpeaking: false,
    isPaused: false,
    isSupported: false,
    voices: [],
    currentVoice: null,
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 加载可用语音
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }

    setState((prev) => ({ ...prev, isSupported: true }));

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();

      // 找到合适的中文女声
      let selectedVoice = availableVoices.find(
        (v) => v.lang.includes('zh') && v.name.includes('Female')
      );

      // 备选：任何中文语音
      if (!selectedVoice) {
        selectedVoice = availableVoices.find((v) => v.lang.includes('zh'));
      }

      // 备选：指定名称
      if (!selectedVoice && defaultVoice) {
        selectedVoice = availableVoices.find((v) =>
          v.name.toLowerCase().includes(defaultVoice.toLowerCase())
        );
      }

      // 最终备选：默认语音
      if (!selectedVoice && availableVoices.length > 0) {
        selectedVoice = availableVoices[0];
      }

      setState((prev) => ({
        ...prev,
        voices: availableVoices,
        currentVoice: selectedVoice || null,
      }));
    };

    // Chrome 需要异步加载
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, [defaultVoice]);

  const speak = useCallback(
    (text: string, options: SpeechSynthesisOptions = {}) => {
      if (!window.speechSynthesis) {
        onError?.('语音合成不可用');
        return;
      }

      // 取消之前的语音
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // 设置语音参数
      if (state.currentVoice) {
        utterance.voice = state.currentVoice;
      }

      // 使用选项或默认值
      utterance.rate = options.rate ?? defaultRate;
      utterance.pitch = options.pitch ?? defaultPitch;
      utterance.volume = options.volume ?? defaultVolume;
      utterance.lang = 'zh-CN';

      utterance.onstart = () => {
        setState((prev) => ({ ...prev, isSpeaking: true, isPaused: false }));
        onStart?.();
      };

      utterance.onend = () => {
        setState((prev) => ({ ...prev, isSpeaking: false, isPaused: false }));
        onEnd?.();
      };

      utterance.onerror = (event) => {
        setState((prev) => ({ ...prev, isSpeaking: false, isPaused: false }));
        onError?.(event.error);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [state.currentVoice, defaultRate, defaultPitch, defaultVolume, onStart, onEnd, onError]
  );

  const pause = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
      setState((prev) => ({ ...prev, isPaused: true }));
    }
  }, []);

  const resume = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
      setState((prev) => ({ ...prev, isPaused: false }));
    }
  }, []);

  const cancel = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setState((prev) => ({ ...prev, isSpeaking: false, isPaused: false }));
    }
  }, []);

  const setVoice = useCallback((voiceName: string) => {
    const voice = state.voices.find((v) =>
      v.name.toLowerCase().includes(voiceName.toLowerCase())
    );
    if (voice) {
      setState((prev) => ({ ...prev, currentVoice: voice }));
    }
  }, [state.voices]);

  return {
    ...state,
    speak,
    pause,
    resume,
    cancel,
    setVoice,
  };
}
