'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Face3DProps {
  makeupLayer?: number;
  className?: string;
  showControls?: boolean;
}

// 捏脸参数
interface FaceParams {
  faceWidth: number;      // 脸宽 0.8-1.2
  faceLength: number;     // 脸长 0.9-1.1
  eyeSize: number;        // 眼睛大小 0.8-1.3
  eyeDistance: number;    // 眼距 0.9-1.1
  noseLength: number;     // 鼻子长度 0.9-1.1
  lipFullness: number;    // 嘴唇丰满度 0.8-1.3
  earringStyle: number;   // 耳饰样式 0-4
}

const defaultParams: FaceParams = {
  faceWidth: 1,
  faceLength: 1,
  eyeSize: 1,
  eyeDistance: 1,
  noseLength: 1,
  lipFullness: 1,
  earringStyle: 1,
};

// 耳饰样式
const earringStyles = [
  { name: '无', render: null },
  { name: '珍珠耳钉', type: 'pearl' },
  { name: '钻石耳钉', type: 'diamond' },
  { name: '金色耳环', type: 'gold-hoop' },
  { name: '流苏耳坠', type: 'tassel' },
];

export default function Face3D({ makeupLayer = 0, className = '', showControls = true }: Face3DProps) {
  const [params, setParams] = useState<FaceParams>(defaultParams);

  // 根据妆容层级调整肤色
  const getSkinColor = () => {
    const baseColors = [
      { light: '#ffe4d6', medium: '#fdd5c0', dark: '#f5c4a8' },
      { light: '#fff0e8', medium: '#ffe4d8', dark: '#fdd5c4' },
      { light: '#fff2ea', medium: '#ffe6da', dark: '#fdd8c8' },
      { light: '#fff2ea', medium: '#ffe6da', dark: '#fdd8c8' },
      { light: '#fff5ef', medium: '#ffebe0', dark: '#fdddd0' },
    ];
    return baseColors[makeupLayer] || baseColors[0];
  };

  const skin = getSkinColor();

  // 计算面部路径
  const getFacePath = () => {
    const w = params.faceWidth;
    const h = params.faceLength;
    return `M 100 ${30 * h}
            C ${145 * w} ${30 * h}, ${165 * w} ${70 * h}, ${165 * w} ${110 * h}
            C ${165 * w} ${150 * h}, ${155 * w} ${180 * h}, ${140 * w} ${200 * h}
            Q ${120 * w} ${225 * h}, 100 ${230 * h}
            Q ${80 / w} ${225 * h}, ${60 / w} ${200 * h}
            C ${45 / w} ${180 * h}, ${35 / w} ${150 * h}, ${35 / w} ${110 * h}
            C ${35 / w} ${70 * h}, ${55 / w} ${30 * h}, 100 ${30 * h}`;
  };

  // 渲染耳饰
  const renderEarring = (side: 'left' | 'right') => {
    const style = earringStyles[params.earringStyle];
    if (!style || !style.type) return null;

    const x = side === 'left' ? 24 : 176;
    const baseY = 148;

    switch (style.type) {
      case 'pearl':
        return (
          <g>
            <circle cx={x} cy={baseY} r="6" fill="url(#pearlGradient)" />
            <circle cx={x - 2} cy={baseY - 2} r="2" fill="rgba(255,255,255,0.8)" />
          </g>
        );
      case 'diamond':
        return (
          <g>
            <polygon
              points={`${x},${baseY - 7} ${x + 5},${baseY} ${x},${baseY + 7} ${x - 5},${baseY}`}
              fill="url(#diamondGradient)"
            />
            <polygon
              points={`${x},${baseY - 4} ${x + 2},${baseY} ${x},${baseY + 4} ${x - 2},${baseY}`}
              fill="rgba(255,255,255,0.6)"
            />
          </g>
        );
      case 'gold-hoop':
        return (
          <g>
            <ellipse
              cx={x}
              cy={baseY + 8}
              rx="8"
              ry="12"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="3"
            />
            <circle cx={x} cy={baseY - 2} r="3" fill="#ffd700" />
          </g>
        );
      case 'tassel':
        return (
          <g>
            <circle cx={x} cy={baseY} r="4" fill="#e11d48" />
            <line x1={x} y1={baseY + 4} x2={x} y2={baseY + 25} stroke="#e11d48" strokeWidth="1.5" />
            <line x1={x - 3} y1={baseY + 4} x2={x - 5} y2={baseY + 22} stroke="#e11d48" strokeWidth="1" />
            <line x1={x + 3} y1={baseY + 4} x2={x + 5} y2={baseY + 22} stroke="#e11d48" strokeWidth="1" />
            {/* 流苏末端小珠子 */}
            <circle cx={x} cy={baseY + 27} r="2" fill="#e11d48" />
            <circle cx={x - 5} cy={baseY + 24} r="1.5" fill="#e11d48" />
            <circle cx={x + 5} cy={baseY + 24} r="1.5" fill="#e11d48" />
          </g>
        );
      default:
        return null;
    }
  };

  // 更新参数
  const updateParam = (key: keyof FaceParams, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  // 眼睛位置计算
  const eyeY = 115;
  const leftEyeX = 67 - (params.eyeDistance - 1) * 15;
  const rightEyeX = 133 + (params.eyeDistance - 1) * 15;
  const eyeRx = 16 * params.eyeSize;
  const eyeRy = 10 * params.eyeSize;

  // 嘴唇位置
  const lipY = 182;
  const lipWidth = 20 * params.lipFullness;

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* 面部渲染 */}
      <div className="relative" style={{ width: '220px', height: '280px' }}>
        <svg viewBox="0 0 200 260" className="w-full h-full">
          <defs>
            {/* 面部渐变 */}
            <radialGradient id="skinGradient" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor={skin.light} />
              <stop offset="50%" stopColor={skin.medium} />
              <stop offset="100%" stopColor={skin.dark} />
            </radialGradient>

            {/* 珍珠渐变 */}
            <radialGradient id="pearlGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f5f5f5" />
              <stop offset="100%" stopColor="#e8e0d8" />
            </radialGradient>

            {/* 钻石渐变 */}
            <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f7ff" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#b8e8ff" />
            </linearGradient>

            {/* 金色渐变 */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#ffec8b" />
              <stop offset="100%" stopColor="#daa520" />
            </linearGradient>

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

            {/* 眼影渐变 */}
            <radialGradient id="eyeshadow" cx="50%" cy="70%" r="80%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
              <stop offset="40%" stopColor="rgba(236, 72, 153, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* 腮红渐变 */}
            <radialGradient id="blush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(244, 114, 182, 0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* 柔和模糊 */}
            <filter id="softBlur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* 头发背景 */}
          <ellipse cx="100" cy="70" rx="75" ry="60" fill="#2d1f1a" />
          <ellipse cx="100" cy="65" rx="70" ry="55" fill="#3d2a22" />

          {/* 耳朵 - 左 */}
          <g>
            <path
              d="M 35 110
                 C 25 100, 20 115, 22 130
                 C 24 145, 30 152, 35 147
                 C 32 142, 30 132, 32 120
                 C 33 115, 35 112, 35 110"
              fill={skin.medium}
            />
            <path
              d="M 32 120 C 28 125, 28 137, 32 142"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1.5"
            />
            {/* 左耳饰 */}
            {renderEarring('left')}
          </g>

          {/* 耳朵 - 右 */}
          <g>
            <path
              d="M 165 110
                 C 175 100, 180 115, 178 130
                 C 176 145, 170 152, 165 147
                 C 168 142, 170 132, 168 120
                 C 167 115, 165 112, 165 110"
              fill={skin.medium}
            />
            <path
              d="M 168 120 C 172 125, 172 137, 168 142"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1.5"
            />
            {/* 右耳饰 */}
            {renderEarring('right')}
          </g>

          {/* 面部主体 */}
          <path d={getFacePath()} fill="url(#skinGradient)" />

          {/* 底妆光泽 */}
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
            <path d={`M ${leftEyeX - 15} 95 Q ${leftEyeX} 88, ${leftEyeX + 15} 92`} fill="none" stroke="#4a3728" strokeWidth="3.5" strokeLinecap="round" />
            <path d={`M ${rightEyeX - 15} 92 Q ${rightEyeX} 88, ${rightEyeX + 15} 95`} fill="none" stroke="#4a3728" strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* 眼影 */}
          {makeupLayer >= 2 && (
            <g>
              <motion.ellipse cx={leftEyeX} cy={eyeY - 3} rx={eyeRx + 6} ry={eyeRy + 4} fill="url(#eyeshadow)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
              <motion.ellipse cx={rightEyeX} cy={eyeY - 3} rx={eyeRx + 6} ry={eyeRy + 4} fill="url(#eyeshadow)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            </g>
          )}

          {/* 眼睛 */}
          <g>
            {/* 左眼 */}
            <ellipse cx={leftEyeX} cy={eyeY} rx={eyeRx} ry={eyeRy} fill="white" />
            <circle cx={leftEyeX} cy={eyeY} r={7 * params.eyeSize} fill="#4a3728" />
            <circle cx={leftEyeX} cy={eyeY} r={4 * params.eyeSize} fill="#1a1a1a" />
            <circle cx={leftEyeX - 3} cy={eyeY - 3} r={2.5 * params.eyeSize} fill="white" opacity="0.9" />
            <path
              d={`M ${leftEyeX - eyeRx} ${eyeY} Q ${leftEyeX} ${eyeY - eyeRy - 2}, ${leftEyeX + eyeRx} ${eyeY}`}
              fill="none"
              stroke="#2d1f1a"
              strokeWidth={makeupLayer >= 2 ? '2' : '1.5'}
              strokeLinecap="round"
            />
            {/* 睫毛 */}
            {makeupLayer >= 2 && (
              <g stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round">
                <line x1={leftEyeX - 12} y1={eyeY - 6} x2={leftEyeX - 14} y2={eyeY - 12} />
                <line x1={leftEyeX - 6} y1={eyeY - 9} x2={leftEyeX - 7} y2={eyeY - 15} />
                <line x1={leftEyeX} y1={eyeY - 10} x2={leftEyeX} y2={eyeY - 16} />
                <line x1={leftEyeX + 6} y1={eyeY - 9} x2={leftEyeX + 7} y2={eyeY - 15} />
                <line x1={leftEyeX + 12} y1={eyeY - 6} x2={leftEyeX + 14} y2={eyeY - 12} />
              </g>
            )}

            {/* 右眼 */}
            <ellipse cx={rightEyeX} cy={eyeY} rx={eyeRx} ry={eyeRy} fill="white" />
            <circle cx={rightEyeX} cy={eyeY} r={7 * params.eyeSize} fill="#4a3728" />
            <circle cx={rightEyeX} cy={eyeY} r={4 * params.eyeSize} fill="#1a1a1a" />
            <circle cx={rightEyeX - 3} cy={eyeY - 3} r={2.5 * params.eyeSize} fill="white" opacity="0.9" />
            <path
              d={`M ${rightEyeX - eyeRx} ${eyeY} Q ${rightEyeX} ${eyeY - eyeRy - 2}, ${rightEyeX + eyeRx} ${eyeY}`}
              fill="none"
              stroke="#2d1f1a"
              strokeWidth={makeupLayer >= 2 ? '2' : '1.5'}
              strokeLinecap="round"
            />
            {/* 睫毛 */}
            {makeupLayer >= 2 && (
              <g stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round">
                <line x1={rightEyeX - 12} y1={eyeY - 6} x2={rightEyeX - 14} y2={eyeY - 12} />
                <line x1={rightEyeX - 6} y1={eyeY - 9} x2={rightEyeX - 7} y2={eyeY - 15} />
                <line x1={rightEyeX} y1={eyeY - 10} x2={rightEyeX} y2={eyeY - 16} />
                <line x1={rightEyeX + 6} y1={eyeY - 9} x2={rightEyeX + 7} y2={eyeY - 15} />
                <line x1={rightEyeX + 12} y1={eyeY - 6} x2={rightEyeX + 14} y2={eyeY - 12} />
              </g>
            )}
          </g>

          {/* 鼻子 */}
          <g>
            <path
              d={`M 100 120 L 100 ${120 + 35 * params.noseLength}`}
              stroke="url(#noseHighlight)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <ellipse cx="100" cy={123 + 35 * params.noseLength} rx="8" ry="5" fill={skin.medium} />
            <path d={`M 92 ${125 + 35 * params.noseLength} Q 88 ${127 + 35 * params.noseLength}, 88 ${123 + 35 * params.noseLength}`} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
            <path d={`M 108 ${125 + 35 * params.noseLength} Q 112 ${127 + 35 * params.noseLength}, 112 ${123 + 35 * params.noseLength}`} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
          </g>

          {/* 腮红 */}
          {makeupLayer >= 2 && (
            <g>
              <motion.ellipse cx="48" cy="145" rx="20" ry="15" fill="url(#blush)" filter="url(#softBlur)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
              <motion.ellipse cx="152" cy="145" rx="20" ry="15" fill="url(#blush)" filter="url(#softBlur)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            </g>
          )}

          {/* 嘴唇 */}
          <g>
            {/* 上唇 */}
            <path
              d={`M ${100 - lipWidth} ${lipY}
                  Q ${100 - lipWidth / 2} ${lipY - 6 * params.lipFullness}, 100 ${lipY - 4 * params.lipFullness}
                  Q ${100 + lipWidth / 2} ${lipY - 6 * params.lipFullness}, ${100 + lipWidth} ${lipY}
                  Q ${100 + lipWidth / 2} ${lipY - 2}, 100 ${lipY}
                  Q ${100 - lipWidth / 2} ${lipY - 2}, ${100 - lipWidth} ${lipY}`}
              fill="url(#lipGradient)"
            />
            {/* 下唇 */}
            <path
              d={`M ${100 - lipWidth} ${lipY}
                  Q ${100 - lipWidth / 2} ${lipY + 12 * params.lipFullness}, 100 ${lipY + 14 * params.lipFullness}
                  Q ${100 + lipWidth / 2} ${lipY + 12 * params.lipFullness}, ${100 + lipWidth} ${lipY}
                  Q ${100 + lipWidth / 2} ${lipY + 3}, 100 ${lipY + 4}
                  Q ${100 - lipWidth / 2} ${lipY + 3}, ${100 - lipWidth} ${lipY}`}
              fill="url(#lipGradient)"
            />
            {/* 唇部高光 */}
            {makeupLayer >= 3 && (
              <motion.ellipse
                cx="100"
                cy={lipY + 6 * params.lipFullness}
                rx={lipWidth * 0.6}
                ry={4 * params.lipFullness}
                fill="rgba(255,255,255,0.25)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </g>

          {/* 下巴高光 */}
          <ellipse cx="100" cy="215" rx="15" ry="8" fill="rgba(255,255,255,0.1)" filter="url(#softBlur)" />
        </svg>
      </div>

      {/* 捏脸控制面板 */}
      {showControls && (
        <div className="w-full max-w-xs space-y-3 bg-black/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-center text-white/80 text-sm font-medium mb-3">捏脸调整</div>

          {/* 耳饰选择 */}
          <div className="space-y-1">
            <div className="text-xs text-gray-400">耳饰</div>
            <div className="flex gap-1.5 flex-wrap">
              {earringStyles.map((style, i) => (
                <button
                  key={i}
                  onClick={() => updateParam('earringStyle', i)}
                  className={`px-2 py-1 text-xs rounded-full transition-all ${
                    params.earringStyle === i
                      ? 'bg-pink-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          {/* 脸型 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">脸宽</span>
              <span className="text-pink-400">{Math.round(params.faceWidth * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.85"
              max="1.15"
              step="0.01"
              value={params.faceWidth}
              onChange={(e) => updateParam('faceWidth', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
            />
          </div>

          {/* 眼睛大小 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">眼睛大小</span>
              <span className="text-pink-400">{Math.round(params.eyeSize * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.01"
              value={params.eyeSize}
              onChange={(e) => updateParam('eyeSize', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
            />
          </div>

          {/* 眼距 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">眼距</span>
              <span className="text-pink-400">{Math.round(params.eyeDistance * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.9"
              max="1.1"
              step="0.01"
              value={params.eyeDistance}
              onChange={(e) => updateParam('eyeDistance', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
            />
          </div>

          {/* 嘴唇丰满度 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">嘴唇丰满度</span>
              <span className="text-pink-400">{Math.round(params.lipFullness * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.4"
              step="0.01"
              value={params.lipFullness}
              onChange={(e) => updateParam('lipFullness', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
            />
          </div>

          {/* 重置按钮 */}
          <button
            onClick={() => setParams(defaultParams)}
            className="w-full py-1.5 text-xs bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg transition-colors"
          >
            重置默认
          </button>
        </div>
      )}
    </div>
  );
}
