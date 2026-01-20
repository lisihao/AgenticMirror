'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// HyperSkin 光谱传感演示
export function HyperSkinDemo() {
  const [activeChannel, setActiveChannel] = useState<'vis' | 'nir' | 'uvf'>('vis');

  const channels = {
    vis: { name: '可见光', color: '#38bdf8', range: '400-700nm', depth: '表皮 0.1mm' },
    nir: { name: '近红外', color: '#fda4af', range: '800-1000nm', depth: '真皮 1-2mm' },
    uvf: { name: '紫外荧光', color: '#a78bfa', range: '320-400nm', depth: '皮脂层' },
  };

  return (
    <div className="relative h-80">
      {/* 皮肤层次图 */}
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <defs>
          <linearGradient id="skinLayer1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe4d6" />
            <stop offset="100%" stopColor="#fdd5c0" />
          </linearGradient>
          <linearGradient id="skinLayer2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5c4a8" />
            <stop offset="100%" stopColor="#e8a98a" />
          </linearGradient>
          <linearGradient id="skinLayer3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dba080" />
            <stop offset="100%" stopColor="#c98a6a" />
          </linearGradient>
        </defs>

        {/* 皮肤层次 */}
        <rect x="20" y="30" width="160" height="25" rx="3" fill="url(#skinLayer1)" opacity={activeChannel === 'vis' ? 1 : 0.3} />
        <rect x="20" y="55" width="160" height="35" rx="3" fill="url(#skinLayer2)" opacity={activeChannel === 'nir' ? 1 : 0.3} />
        <rect x="20" y="90" width="160" height="30" rx="3" fill="url(#skinLayer3)" opacity={activeChannel === 'uvf' ? 1 : 0.3} />

        {/* 层次标签 */}
        <text x="185" y="45" fill="#9ca3af" fontSize="8" textAnchor="end">表皮层</text>
        <text x="185" y="75" fill="#9ca3af" fontSize="8" textAnchor="end">真皮层</text>
        <text x="185" y="108" fill="#9ca3af" fontSize="8" textAnchor="end">皮下组织</text>

        {/* 光线穿透动画 */}
        <motion.line
          x1="100"
          y1="10"
          x2="100"
          y2={activeChannel === 'vis' ? 55 : activeChannel === 'nir' ? 90 : 70}
          stroke={channels[activeChannel].color}
          strokeWidth="3"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />

        {/* 传感器 */}
        <rect x="80" y="2" width="40" height="8" rx="2" fill="#1f2937" stroke={channels[activeChannel].color} strokeWidth="1" />
        <motion.circle cx="100" cy="6" r="2" fill={channels[activeChannel].color} animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />

        {/* 检测指标 */}
        <g transform="translate(20, 130)">
          {activeChannel === 'vis' && (
            <>
              <text fill="#38bdf8" fontSize="7">肤色 L*58.2</text>
              <text x="50" fill="#38bdf8" fontSize="7">毛孔 23个/cm²</text>
              <text x="110" fill="#38bdf8" fontSize="7">纹理 细腻</text>
            </>
          )}
          {activeChannel === 'nir' && (
            <>
              <text fill="#fda4af" fontSize="7">水分 42%</text>
              <text x="45" fill="#fda4af" fontSize="7">血红蛋白 正常</text>
              <text x="110" fill="#fda4af" fontSize="7">黑色素 中等</text>
            </>
          )}
          {activeChannel === 'uvf' && (
            <>
              <text fill="#a78bfa" fontSize="7">油脂 T区3级</text>
              <text x="55" fill="#a78bfa" fontSize="7">卟啉 低</text>
              <text x="95" fill="#a78bfa" fontSize="7">痤疮风险 低</text>
            </>
          )}
        </g>
      </svg>

      {/* 通道选择器 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
        {(Object.keys(channels) as Array<keyof typeof channels>).map((ch) => (
          <motion.button
            key={ch}
            onClick={() => setActiveChannel(ch)}
            className={`px-3 py-1.5 rounded-full text-xs transition-all ${
              activeChannel === ch
                ? 'bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {channels[ch].name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// MicroFace 3D 建模演示
export function MicroFace3DDemo() {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="relative h-80 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs">
        {/* 面部轮廓 */}
        <ellipse cx="100" cy="100" rx="55" ry="70" fill="none" stroke="#fb7185" strokeWidth="0.5" opacity="0.5" />

        {/* 结构光点阵 */}
        {Array.from({ length: 30 }).map((_, row) =>
          Array.from({ length: 25 }).map((_, col) => {
            const x = 45 + col * 4.5;
            const y = 30 + row * 5;
            const dx = x - 100;
            const dy = y - 100;
            const dist = Math.sqrt(dx * dx + (dy * 0.8) ** 2);
            const isInFace = dist < 55;
            if (!isInFace) return null;

            return (
              <motion.circle
                key={`${row}-${col}`}
                cx={x}
                cy={y}
                r={showDetail ? 1.2 : 0.8}
                fill="#38bdf8"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, delay: (row + col) * 0.02, repeat: Infinity }}
              />
            );
          })
        )}

        {/* 五官轮廓 */}
        <g opacity="0.6">
          {/* 眼睛 */}
          <ellipse cx="75" cy="90" rx="12" ry="6" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
          <ellipse cx="125" cy="90" rx="12" ry="6" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
          {/* 鼻子 */}
          <path d="M100 85 L100 115 M92 118 Q100 125 108 118" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
          {/* 嘴巴 */}
          <path d="M82 140 Q100 150 118 140" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
        </g>

        {/* 深度信息 */}
        {showDetail && (
          <g>
            <text x="100" y="20" textAnchor="middle" fill="#38bdf8" fontSize="8">深度图</text>
            <motion.rect
              x="30" y="170" width="140" height="8" rx="2" fill="url(#depthGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <defs>
              <linearGradient id="depthGradient">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#fda4af" />
              </linearGradient>
            </defs>
            <text x="30" y="185" fill="#9ca3af" fontSize="6">近</text>
            <text x="170" y="185" fill="#9ca3af" fontSize="6" textAnchor="end">远</text>
          </g>
        )}
      </svg>

      {/* 切换按钮 */}
      <button
        onClick={() => setShowDetail(!showDetail)}
        className="absolute bottom-4 px-4 py-2 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white text-xs rounded-full"
      >
        {showDetail ? '简化视图' : '查看深度图'}
      </button>

      {/* 参数信息 */}
      <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs">
        <div className="text-sky-400">50,000+ 点</div>
        <div className="text-gray-500">亚毫米级精度</div>
      </div>
    </div>
  );
}

// 智能镜产品展示组件
export function SmartMirrorDisplay({
  imageUrl,
  showScanEffect = false,
  showDataOverlay = true,
}: {
  imageUrl?: string;
  showScanEffect?: boolean;
  showDataOverlay?: boolean;
}) {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-rose-500/20 shadow-2xl shadow-rose-500/10">
      {/* 镜子边框 - 玫瑰金 */}
      <div className="absolute inset-0 rounded-3xl border-4 border-rose-400/30 pointer-events-none" />

      {/* 镜面内容 */}
      <div className="relative aspect-[3/4] flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="AgenticMirror"
            className="w-full h-full object-cover"
          />
        ) : (
          <MicroFace3DDemo />
        )}

        {/* 扫描线效果 */}
        {(showScanEffect || isScanning) && (
          <motion.div
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* 数据叠加层 */}
        {showDataOverlay && (
          <div className="absolute inset-0 pointer-events-none">
            {/* 顶部状态栏 */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="text-rose-400 text-xs font-medium">AgenticMirror</div>
                <div className="text-gray-400 text-[10px]">AI Beauty System</div>
              </div>
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-right">
                <div className="text-sky-400 text-xs">60 FPS</div>
                <div className="text-gray-400 text-[10px]">实时渲染</div>
              </div>
            </div>

            {/* 底部指标 */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 grid grid-cols-4 gap-2">
                {[
                  { label: '水分', value: '72%', color: 'text-blue-400' },
                  { label: '油脂', value: '35%', color: 'text-amber-400' },
                  { label: '弹性', value: '68%', color: 'text-green-400' },
                  { label: '匹配', value: '94%', color: 'text-rose-400' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className={`text-sm font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-gray-500 text-[10px]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部控制栏 */}
      <div className="bg-slate-900/80 backdrop-blur-sm p-4 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-rose-500/20 text-rose-400 rounded-full text-xs hover:bg-rose-500/30 transition-colors">
              皮肤分析
            </button>
            <button className="px-3 py-1.5 bg-fuchsia-500/20 text-fuchsia-400 rounded-full text-xs hover:bg-fuchsia-500/30 transition-colors">
              AR试妆
            </button>
          </div>
          <button
            onClick={() => setIsScanning(!isScanning)}
            className="px-4 py-1.5 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white rounded-full text-xs font-medium"
          >
            {isScanning ? '停止扫描' : '开始扫描'}
          </button>
        </div>
      </div>
    </div>
  );
}
