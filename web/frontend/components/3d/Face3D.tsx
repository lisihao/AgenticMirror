'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Face3DProps {
  makeupLayer?: number;
  className?: string;
}

export default function Face3D({ makeupLayer = 0, className = '' }: Face3DProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  // 自动旋转
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x,
        y: prev.y + 0.3,
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [isDragging]);

  // 拖动处理
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPos.current.x;
    const deltaY = e.clientY - lastPos.current.y;
    setRotation((prev) => ({
      x: Math.max(-20, Math.min(20, prev.x - deltaY * 0.3)),
      y: prev.y + deltaX * 0.3,
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 根据妆容层级调整肤色
  const getSkinColor = () => {
    const baseColors = [
      { light: '#ffe4d6', medium: '#fdd5c0', dark: '#f5c4a8' }, // 素颜
      { light: '#fff0e8', medium: '#ffe4d8', dark: '#fdd5c4' }, // 底妆 - 更亮更均匀
      { light: '#fff2ea', medium: '#ffe6da', dark: '#fdd8c8' }, // 眼妆
      { light: '#fff2ea', medium: '#ffe6da', dark: '#fdd8c8' }, // 唇妆
      { light: '#fff5ef', medium: '#ffebe0', dark: '#fdddd0' }, // 完整妆容 - 最完美
    ];
    return baseColors[makeupLayer] || baseColors[0];
  };

  const skin = getSkinColor();

  return (
    <div
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ perspective: '600px' }}
    >
      {/* 3D 场景容器 */}
      <div
        className="relative"
        style={{
          width: '220px',
          height: '280px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {/* SVG 面部 */}
        <svg
          viewBox="0 0 200 260"
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'translateZ(0px)' }}
        >
          <defs>
            {/* 面部渐变 */}
            <radialGradient id="skinGradient" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor={skin.light} />
              <stop offset="50%" stopColor={skin.medium} />
              <stop offset="100%" stopColor={skin.dark} />
            </radialGradient>

            {/* 鼻梁高光 */}
            <linearGradient id="noseHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* 唇部渐变 */}
            <linearGradient id="lipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={makeupLayer >= 3 ? '#e11d48' : '#d4a5a5'} />
              <stop offset="50%" stopColor={makeupLayer >= 3 ? '#be123c' : '#c99090'} />
              <stop offset="100%" stopColor={makeupLayer >= 3 ? '#9f1239' : '#b88080'} />
            </linearGradient>

            {/* 唇部高光 */}
            <linearGradient id="lipShine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* 眼影渐变 - 左眼 */}
            <radialGradient id="eyeshadowLeft" cx="50%" cy="70%" r="80%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
              <stop offset="40%" stopColor="rgba(236, 72, 153, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* 眼影渐变 - 右眼 */}
            <radialGradient id="eyeshadowRight" cx="50%" cy="70%" r="80%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
              <stop offset="40%" stopColor="rgba(236, 72, 153, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* 腮红渐变 */}
            <radialGradient id="blushLeft" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(244, 114, 182, 0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="blushRight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(244, 114, 182, 0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* 面部阴影 */}
            <linearGradient id="faceShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
            </linearGradient>

            {/* 高光滤镜 */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 柔和模糊 */}
            <filter id="softBlur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* 头发背景 - 增加层次感 */}
          <ellipse
            cx="100"
            cy="70"
            rx="75"
            ry="60"
            fill="#2d1f1a"
          />
          <ellipse
            cx="100"
            cy="65"
            rx="70"
            ry="55"
            fill="#3d2a22"
          />

          {/* 面部主体 - 更精致的轮廓 */}
          <path
            d="M 100 30
               C 145 30, 165 70, 165 110
               C 165 150, 155 180, 140 200
               Q 120 225, 100 230
               Q 80 225, 60 200
               C 45 180, 35 150, 35 110
               C 35 70, 55 30, 100 30"
            fill="url(#skinGradient)"
            stroke="none"
          />

          {/* 面部阴影层 */}
          <path
            d="M 100 30
               C 145 30, 165 70, 165 110
               C 165 150, 155 180, 140 200
               Q 120 225, 100 230
               Q 80 225, 60 200
               C 45 180, 35 150, 35 110
               C 35 70, 55 30, 100 30"
            fill="url(#faceShadow)"
            opacity="0.3"
          />

          {/* 底妆光泽层 */}
          {makeupLayer >= 1 && (
            <motion.ellipse
              cx="85"
              cy="90"
              rx="45"
              ry="55"
              fill="rgba(255,255,255,0.15)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              filter="url(#softBlur)"
            />
          )}

          {/* 眉毛 */}
          <g>
            {/* 左眉 */}
            <path
              d="M 52 95 Q 65 88, 82 92"
              fill="none"
              stroke="#4a3728"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 54 95 Q 65 90, 80 93"
              fill="none"
              stroke="#5c4033"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* 右眉 */}
            <path
              d="M 118 92 Q 135 88, 148 95"
              fill="none"
              stroke="#4a3728"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 120 93 Q 135 90, 146 95"
              fill="none"
              stroke="#5c4033"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* 眼影 */}
          {makeupLayer >= 2 && (
            <g>
              <motion.ellipse
                cx="67"
                cy="112"
                rx="22"
                ry="14"
                fill="url(#eyeshadowLeft)"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.ellipse
                cx="133"
                cy="112"
                rx="22"
                ry="14"
                fill="url(#eyeshadowRight)"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </g>
          )}

          {/* 眼睛 */}
          <g>
            {/* 左眼 */}
            <ellipse cx="67" cy="115" rx="16" ry="10" fill="white" />
            <ellipse cx="67" cy="115" rx="16" ry="10" fill="rgba(0,0,0,0.03)" />
            {/* 虹膜 */}
            <circle cx="67" cy="115" r="7" fill="#4a3728" />
            <circle cx="67" cy="115" r="4" fill="#1a1a1a" />
            {/* 高光 */}
            <circle cx="64" cy="112" r="2.5" fill="white" opacity="0.9" />
            <circle cx="70" cy="117" r="1" fill="white" opacity="0.5" />
            {/* 上眼线 */}
            <path
              d="M 51 115 Q 60 105, 67 105 Q 74 105, 83 115"
              fill="none"
              stroke="#2d1f1a"
              strokeWidth={makeupLayer >= 2 ? "2" : "1.5"}
              strokeLinecap="round"
            />
            {/* 睫毛 */}
            {makeupLayer >= 2 && (
              <g stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round">
                <line x1="54" y1="110" x2="52" y2="105" />
                <line x1="58" y1="107" x2="56" y2="102" />
                <line x1="63" y1="105" x2="62" y2="100" />
                <line x1="68" y1="105" x2="68" y2="100" />
                <line x1="73" y1="106" x2="74" y2="101" />
                <line x1="78" y1="108" x2="80" y2="104" />
              </g>
            )}

            {/* 右眼 */}
            <ellipse cx="133" cy="115" rx="16" ry="10" fill="white" />
            <ellipse cx="133" cy="115" rx="16" ry="10" fill="rgba(0,0,0,0.03)" />
            {/* 虹膜 */}
            <circle cx="133" cy="115" r="7" fill="#4a3728" />
            <circle cx="133" cy="115" r="4" fill="#1a1a1a" />
            {/* 高光 */}
            <circle cx="130" cy="112" r="2.5" fill="white" opacity="0.9" />
            <circle cx="136" cy="117" r="1" fill="white" opacity="0.5" />
            {/* 上眼线 */}
            <path
              d="M 117 115 Q 126 105, 133 105 Q 140 105, 149 115"
              fill="none"
              stroke="#2d1f1a"
              strokeWidth={makeupLayer >= 2 ? "2" : "1.5"}
              strokeLinecap="round"
            />
            {/* 睫毛 */}
            {makeupLayer >= 2 && (
              <g stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round">
                <line x1="122" y1="108" x2="120" y2="104" />
                <line x1="127" y1="106" x2="126" y2="101" />
                <line x1="132" y1="105" x2="132" y2="100" />
                <line x1="137" y1="105" x2="138" y2="100" />
                <line x1="142" y1="107" x2="144" y2="102" />
                <line x1="146" y1="110" x2="148" y2="105" />
              </g>
            )}
          </g>

          {/* 鼻子 */}
          <g>
            {/* 鼻梁 */}
            <path
              d="M 100 120 L 100 155"
              stroke="url(#noseHighlight)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* 鼻头 */}
            <ellipse cx="100" cy="158" rx="8" ry="5" fill={skin.medium} />
            {/* 鼻翼阴影 */}
            <path
              d="M 92 160 Q 88 162, 88 158"
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="2"
            />
            <path
              d="M 108 160 Q 112 162, 112 158"
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="2"
            />
          </g>

          {/* 腮红 */}
          {makeupLayer >= 2 && (
            <g>
              <motion.ellipse
                cx="48"
                cy="145"
                rx="20"
                ry="15"
                fill="url(#blushLeft)"
                filter="url(#softBlur)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.ellipse
                cx="152"
                cy="145"
                rx="20"
                ry="15"
                fill="url(#blushRight)"
                filter="url(#softBlur)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </g>
          )}

          {/* 嘴唇 */}
          <g>
            {/* 上唇 */}
            <path
              d="M 80 182
                 Q 90 176, 100 178
                 Q 110 176, 120 182
                 Q 110 180, 100 182
                 Q 90 180, 80 182"
              fill="url(#lipGradient)"
            />
            {/* 下唇 */}
            <path
              d="M 80 182
                 Q 85 195, 100 198
                 Q 115 195, 120 182
                 Q 110 185, 100 186
                 Q 90 185, 80 182"
              fill="url(#lipGradient)"
            />
            {/* 唇部高光 */}
            {makeupLayer >= 3 && (
              <motion.path
                d="M 88 188 Q 100 185, 112 188"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            {/* 唇线 */}
            <path
              d="M 80 182 Q 100 178, 120 182"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="0.5"
            />
          </g>

          {/* 下巴高光 */}
          <ellipse
            cx="100"
            cy="215"
            rx="15"
            ry="8"
            fill="rgba(255,255,255,0.1)"
            filter="url(#softBlur)"
          />
        </svg>

        {/* 装饰粒子 */}
        {makeupLayer >= 1 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => {
              const angle = (i / 15) * Math.PI * 2;
              const radius = 100 + Math.sin(i * 1.5) * 20;
              const x = Math.cos(angle) * radius + 110;
              const y = Math.sin(angle) * radius + 140;
              const colors = ['#ec4899', '#a855f7', '#6366f1', '#f472b6', '#c084fc'];
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 4 + Math.random() * 4,
                    height: 4 + Math.random() * 4,
                    left: x,
                    top: y,
                    background: colors[i % colors.length],
                    filter: 'blur(1px)',
                  }}
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.3, 1],
                    x: [0, Math.sin(i) * 5, 0],
                    y: [0, Math.cos(i) * 5, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* 光晕效果 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 30%, rgba(255,200,200,0.1), transparent 50%)',
            transform: 'translateZ(5px)',
          }}
        />
      </div>
    </div>
  );
}
