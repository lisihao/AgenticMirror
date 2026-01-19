'use client';

import { motion } from 'framer-motion';

interface VoiceWaveformProps {
  isActive: boolean;
  barCount?: number;
  color?: string;
  height?: number;
  className?: string;
}

export default function VoiceWaveform({
  isActive,
  barCount = 5,
  color = '#ec4899',
  height = 40,
  className = '',
}: VoiceWaveformProps) {
  return (
    <div
      className={`flex items-center justify-center gap-1 ${className}`}
      style={{ height }}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: 4,
            backgroundColor: color,
          }}
          animate={
            isActive
              ? {
                  height: [8, height * 0.3, height * 0.8, height * 0.5, height * 0.9, 8],
                }
              : { height: 8 }
          }
          transition={
            isActive
              ? {
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

// 圆形脉冲动画
export function VoicePulse({
  isActive,
  color = '#ec4899',
  size = 60,
  className = '',
}: {
  isActive: boolean;
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* 脉冲环 */}
      {isActive && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: color, opacity: 0.3 }}
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.3, 0, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: color, opacity: 0.3 }}
            animate={{ scale: [1, 1.8, 1.8], opacity: [0.2, 0, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
        </>
      )}

      {/* 中心圆 */}
      <motion.div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
        animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
      >
        {/* 麦克风图标 */}
        <svg
          width={size * 0.4}
          height={size * 0.4}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </motion.div>
    </div>
  );
}

// 扬声器动画
export function SpeakerWave({
  isActive,
  color = '#8b5cf6',
  size = 60,
  className = '',
}: {
  isActive: boolean;
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* 声波 */}
      {isActive && (
        <>
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              borderColor: color,
              top: '50%',
              left: '50%',
              width: size * 0.8,
              height: size * 0.8,
              marginTop: -size * 0.4,
              marginLeft: -size * 0.4,
            }}
            animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              borderColor: color,
              top: '50%',
              left: '50%',
              width: size * 0.8,
              height: size * 0.8,
              marginTop: -size * 0.4,
              marginLeft: -size * 0.4,
            }}
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          />
        </>
      )}

      {/* 中心圆 */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        {/* 扬声器图标 */}
        <svg
          width={size * 0.4}
          height={size * 0.4}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          {isActive && (
            <>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
