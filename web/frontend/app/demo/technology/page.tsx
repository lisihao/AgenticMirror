'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Fingerprint,
  Scan,
  Sparkles,
  Brain,
  Cpu,
  Cloud,
  Eye,
  Hand,
  Layers,
  Zap,
  ChevronRight,
  Play,
  MousePointer2,
} from 'lucide-react';

// 动态导入 3D 组件（避免 SSR 问题）
const Face3D = dynamic(() => import('@/components/3d/Face3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-pink-400 animate-pulse">加载 3D 模型...</div>
    </div>
  ),
});

// 核心技术列表
const technologies = [
  {
    id: 'face-touch',
    icon: Fingerprint,
    title: '面部触控交互',
    subtitle: 'Face as Touchpad',
    tagline: '你的脸，就是触摸屏',
    description: '革命性的交互方式：用手指在脸上点触，镜子就能识别你想调整的区域。告别复杂菜单，化妆从未如此直觉。',
    features: [
      { icon: Hand, text: '手指追踪', desc: '毫米级精度识别指尖位置' },
      { icon: Scan, text: '面部映射', desc: '实时将触摸点映射到面部区域' },
      { icon: MousePointer2, text: '手势识别', desc: '支持点击、滑动、缩放等手势' },
      { icon: Zap, text: '零延迟响应', desc: '<16ms 端侧实时处理' },
    ],
    demo: {
      type: 'animation',
      content: 'face-touch',
    },
    techStack: ['MediaPipe Hands', 'Face Mesh 468点', '麒麟 NPU 加速', '手势状态机'],
  },
  {
    id: '3dgs-makeup',
    icon: Layers,
    title: '3D 高斯泼溅渲染',
    subtitle: '3D Gaussian Splatting',
    tagline: '实时预览，秒变女神',
    description: '基于 3DGS 技术的实时妆容渲染，在你动手之前就能看到最终效果。支持任意角度查看，光影自然逼真。',
    features: [
      { icon: Eye, text: '实时渲染', desc: '60FPS 流畅预览妆容效果' },
      { icon: Layers, text: '多层叠加', desc: '底妆/眼妆/唇妆独立渲染' },
      { icon: Sparkles, text: '光影真实', desc: '物理级光照模拟' },
      { icon: Scan, text: '任意视角', desc: '360° 旋转查看效果' },
    ],
    demo: {
      type: 'animation',
      content: '3dgs',
    },
    techStack: ['3D Gaussian Splatting', 'NeRF 神经辐射场', 'WebGL 2.0', '麒麟 GPU'],
  },
  {
    id: 'ai-vision',
    icon: Eye,
    title: '多模态 AI 视觉',
    subtitle: 'Multi-modal AI Vision',
    tagline: '比你更懂你的脸',
    description: '融合 RGB + 深度 + 红外多模态数据，精准分析肤质、肤色、面部结构，为你打造专属美妆方案。',
    features: [
      { icon: Scan, text: '肤质检测', desc: '水分/油脂/毛孔/敏感度' },
      { icon: Layers, text: '肤色分析', desc: '16种肤色精准匹配' },
      { icon: Eye, text: '五官识别', desc: '468特征点精准定位' },
      { icon: Brain, text: '风格推荐', desc: '千人千面 AI 定制' },
    ],
    demo: {
      type: 'animation',
      content: 'ai-vision',
    },
    techStack: ['双目 RGB 48MP', 'ToF 深度传感', '红外成像', '盘古视觉大模型'],
  },
  {
    id: 'edge-cloud',
    icon: Cloud,
    title: '端云协同架构',
    subtitle: 'Edge-Cloud Synergy',
    tagline: '离线能用，在线更强',
    description: '麒麟芯片端侧实时推理 + 华为云盘古大模型深度分析，兼顾隐私安全与智能上限。',
    features: [
      { icon: Cpu, text: '端侧推理', desc: '6 TOPS NPU 本地处理' },
      { icon: Cloud, text: '云端增强', desc: '盘古千亿参数加持' },
      { icon: Zap, text: '智能调度', desc: '网络自适应任务分配' },
      { icon: Brain, text: '持续进化', desc: 'OTA 模型热更新' },
    ],
    demo: {
      type: 'animation',
      content: 'edge-cloud',
    },
    techStack: ['麒麟 9000S', 'HarmonyOS 分布式', '华为云 ModelArts', '盘古大模型 3.0'],
  },
];

// 面部触控演示组件
function FaceTouchDemo() {
  const [touchPoint, setTouchPoint] = useState<{ x: number; y: number } | null>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const zones = [
    { id: 'forehead', label: '额头', x: 50, y: 20, color: 'cyan' },
    { id: 'eyebrow', label: '眉毛', x: 35, y: 32, color: 'purple' },
    { id: 'eye', label: '眼部', x: 35, y: 42, color: 'blue' },
    { id: 'nose', label: '鼻子', x: 50, y: 50, color: 'green' },
    { id: 'cheek', label: '脸颊', x: 25, y: 55, color: 'pink' },
    { id: 'lips', label: '唇部', x: 50, y: 72, color: 'red' },
    { id: 'chin', label: '下巴', x: 50, y: 85, color: 'orange' },
  ];

  return (
    <div className="relative aspect-square max-w-[300px] mx-auto">
      {/* 面部轮廓 */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* 面部椭圆 */}
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="45"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
        />
        {/* 面部网格 */}
        {[20, 35, 50, 65, 80].map((y) => (
          <path
            key={y}
            d={`M ${50 - 35 * Math.sin(Math.acos((y - 50) / 45))} ${y} Q 50 ${y + 5} ${50 + 35 * Math.sin(Math.acos((y - 50) / 45))} ${y}`}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.3"
          />
        ))}

        {/* 交互区域 */}
        {zones.map((zone) => (
          <g key={zone.id}>
            <motion.circle
              cx={zone.x}
              cy={zone.y}
              r={activeZone === zone.id ? 8 : 6}
              fill={activeZone === zone.id ? `rgba(236, 72, 153, 0.5)` : 'rgba(255,255,255,0.1)'}
              stroke={activeZone === zone.id ? '#ec4899' : 'rgba(255,255,255,0.3)'}
              strokeWidth="0.5"
              className="cursor-pointer"
              whileHover={{ scale: 1.3 }}
              onMouseEnter={() => setActiveZone(zone.id)}
              onMouseLeave={() => setActiveZone(null)}
              animate={activeZone === zone.id ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: activeZone === zone.id ? Infinity : 0 }}
            />
            {activeZone === zone.id && (
              <motion.text
                x={zone.x}
                y={zone.y - 12}
                textAnchor="middle"
                fill="white"
                fontSize="4"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {zone.label}
              </motion.text>
            )}
          </g>
        ))}

        {/* 手指指示 */}
        <motion.g
          animate={{
            x: [0, 5, -3, 0],
            y: [0, -5, 3, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <circle cx="70" cy="40" r="3" fill="#ec4899" />
          <path
            d="M 70 43 L 70 55 M 67 48 L 70 43 L 73 48"
            stroke="#ec4899"
            strokeWidth="1"
            fill="none"
          />
        </motion.g>
      </svg>

      {/* 提示文字 */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 text-center text-sm text-gray-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        移动鼠标体验面部触控
      </motion.div>
    </div>
  );
}

// 3DGS 渲染演示 - 真正的 3D 人脸渲染
function GaussianSplattingDemo() {
  const [layer, setLayer] = useState(0);
  const layers = ['素颜', '底妆', '眼妆', '唇妆', '完整妆容'];

  return (
    <div className="relative w-full" style={{ height: '320px' }}>
      {/* 3D 渲染区域 */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
        <Face3D makeupLayer={layer} />
      </div>

      {/* 图层选择器 */}
      <div className="absolute bottom-3 left-0 right-0 z-10">
        <div className="flex justify-center gap-1.5 mb-2">
          {layers.map((l, i) => (
            <motion.button
              key={l}
              onClick={() => setLayer(i)}
              className={`px-2.5 py-1 text-xs rounded-full transition-all ${
                layer === i
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-black/50 text-gray-300 hover:bg-black/70 border border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {l}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 顶部信息 */}
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between">
        <div className="bg-black/50 px-2 py-1 rounded text-xs text-white flex items-center gap-1.5">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-green-400" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          3D 实时渲染
        </div>
        <div className="bg-black/50 px-2 py-1 rounded text-xs text-green-400 font-mono">60 FPS</div>
      </div>

      {/* 拖动提示 */}
      <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs text-gray-500" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
        拖动旋转模型
      </motion.div>
    </div>
  );
}

// 旧版 SVG 备用（已弃用）
function GaussianSplattingDemoOld() {
  const [layer, setLayer] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const layers = ['素颜', '底妆', '眼妆', '唇妆', '完整妆容'];

  // 生成面部区域的高斯点
  const generateGaussianPoints = () => {
    const points: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      layer: number;
      delay: number;
    }> = [];

    // 面部轮廓点 (layer 0 - 素颜基础)
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2;
      const rx = 38 + Math.random() * 5;
      const ry = 45 + Math.random() * 5;
      points.push({
        x: 50 + Math.cos(angle) * rx,
        y: 50 + Math.sin(angle) * ry * 0.95,
        size: 3 + Math.random() * 4,
        color: `rgba(255, 220, 200, ${0.3 + Math.random() * 0.3})`,
        layer: 0,
        delay: i * 0.02,
      });
    }

    // 底妆区域 (layer 1) - 全脸覆盖
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 35;
      points.push({
        x: 50 + Math.cos(angle) * r,
        y: 52 + Math.sin(angle) * r * 1.1,
        size: 8 + Math.random() * 12,
        color: `rgba(255, 200, 180, ${0.2 + Math.random() * 0.3})`,
        layer: 1,
        delay: i * 0.015,
      });
    }

    // 眼妆区域 (layer 2)
    const eyePositions = [
      { cx: 35, cy: 42 }, // 左眼
      { cx: 65, cy: 42 }, // 右眼
    ];
    eyePositions.forEach((eye, ei) => {
      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 10;
        points.push({
          x: eye.cx + Math.cos(angle) * r,
          y: eye.cy + Math.sin(angle) * r * 0.6,
          size: 4 + Math.random() * 8,
          color: `rgba(${150 + Math.random() * 50}, ${80 + Math.random() * 40}, ${120 + Math.random() * 80}, ${0.4 + Math.random() * 0.4})`,
          layer: 2,
          delay: ei * 0.2 + i * 0.02,
        });
      }
    });

    // 腮红区域
    const cheekPositions = [
      { cx: 28, cy: 58 },
      { cx: 72, cy: 58 },
    ];
    cheekPositions.forEach((cheek, ci) => {
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 12;
        points.push({
          x: cheek.cx + Math.cos(angle) * r,
          y: cheek.cy + Math.sin(angle) * r * 0.7,
          size: 10 + Math.random() * 15,
          color: `rgba(255, ${100 + Math.random() * 50}, ${130 + Math.random() * 40}, ${0.2 + Math.random() * 0.25})`,
          layer: 2,
          delay: 0.5 + ci * 0.15 + i * 0.02,
        });
      }
    });

    // 唇妆区域 (layer 3)
    for (let i = 0; i < 30; i++) {
      const t = (i / 30) * Math.PI * 2;
      const lipWidth = 12;
      const lipHeight = 5;
      points.push({
        x: 50 + Math.cos(t) * lipWidth * (1 + 0.3 * Math.sin(t * 2)),
        y: 72 + Math.sin(t) * lipHeight,
        size: 5 + Math.random() * 6,
        color: `rgba(220, ${50 + Math.random() * 30}, ${80 + Math.random() * 40}, ${0.5 + Math.random() * 0.4})`,
        layer: 3,
        delay: i * 0.025,
      });
    }

    return points;
  };

  const points = generateGaussianPoints();

  return (
    <div className="relative aspect-square max-w-[320px] mx-auto">
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-radial from-pink-500/10 via-transparent to-transparent rounded-full" />

      {/* 3DGS 渲染区域 */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* 面部轮廓参考线 */}
        <ellipse
          cx="50"
          cy="50"
          rx="38"
          ry="45"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.3"
          strokeDasharray="2,2"
        />

        {/* 高斯泼溅点 */}
        {points.map((point, i) => {
          const isVisible = layer === 4 || point.layer <= layer;
          const isCurrentLayer = point.layer === layer;

          return (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={point.size / 2}
              fill={point.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isVisible ? (isCurrentLayer ? 1 : 0.7) : 0,
                scale: isVisible ? [1, 1.1, 1] : 0,
              }}
              transition={{
                opacity: { duration: 0.5, delay: isVisible ? point.delay : 0 },
                scale: {
                  duration: 2 + Math.random(),
                  delay: point.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              style={{
                filter: `blur(${point.size / 4}px)`,
              }}
            />
          );
        })}

        {/* 面部特征线条 */}
        <g opacity={layer >= 0 ? 0.3 : 0}>
          {/* 眉毛 */}
          <path d="M 28 38 Q 35 35 42 38" fill="none" stroke="rgba(139,90,60,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 58 38 Q 65 35 72 38" fill="none" stroke="rgba(139,90,60,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          {/* 眼睛 */}
          <ellipse cx="35" cy="43" rx="7" ry="4" fill="none" stroke="rgba(80,60,50,0.4)" strokeWidth="0.5" />
          <ellipse cx="65" cy="43" rx="7" ry="4" fill="none" stroke="rgba(80,60,50,0.4)" strokeWidth="0.5" />
          {/* 鼻子 */}
          <path d="M 50 45 L 50 58 M 46 60 Q 50 62 54 60" fill="none" stroke="rgba(200,180,160,0.3)" strokeWidth="0.5" />
          {/* 嘴唇轮廓 */}
          <path d="M 42 72 Q 50 68 58 72 Q 50 78 42 72" fill="none" stroke="rgba(200,100,100,0.3)" strokeWidth="0.5" />
        </g>

        {/* 当前图层高亮效果 */}
        {layer > 0 && layer < 4 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {layer === 1 && (
              <ellipse cx="50" cy="52" rx="32" ry="38" fill="none" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="3,3" />
            )}
            {layer === 2 && (
              <>
                <circle cx="35" cy="42" r="12" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="65" cy="42" r="12" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="2,2" />
                <ellipse cx="28" cy="58" rx="10" ry="7" fill="none" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="2,2" />
                <ellipse cx="72" cy="58" rx="10" ry="7" fill="none" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="2,2" />
              </>
            )}
            {layer === 3 && (
              <ellipse cx="50" cy="72" rx="12" ry="6" fill="none" stroke="#dc2626" strokeWidth="0.5" strokeDasharray="2,2" />
            )}
          </motion.g>
        )}

        {/* 渲染进度指示 */}
        <motion.text
          x="50"
          y="95"
          textAnchor="middle"
          fill="white"
          fontSize="4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {layer === 0 ? '素颜扫描中...' : layer === 4 ? '✨ 完美妆容' : `渲染 ${layers[layer]}...`}
        </motion.text>
      </svg>

      {/* 图层选择器 */}
      <div className="absolute -bottom-2 left-0 right-0">
        <div className="flex justify-center gap-1.5 mb-2">
          {layers.map((l, i) => (
            <motion.button
              key={l}
              onClick={() => setLayer(i)}
              className={`px-2.5 py-1 text-xs rounded-full transition-all ${
                layer === i
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20 border border-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {l}
            </motion.button>
          ))}
        </div>

        {/* 进度条 */}
        <div className="flex gap-1 px-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="h-1 flex-1 rounded-full overflow-hidden bg-white/10"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                initial={{ width: '0%' }}
                animate={{ width: i <= layer ? '100%' : '0%' }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* FPS 指示器 */}
      <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-green-400 font-mono">
        60 FPS
      </div>
    </div>
  );
}

// AI 视觉演示
function AIVisionDemo() {
  const [scanning, setScanning] = useState(true);

  const metrics = [
    { label: '水分', value: 78, color: 'cyan' },
    { label: '油脂', value: 45, color: 'yellow' },
    { label: '弹性', value: 82, color: 'green' },
    { label: '毛孔', value: 35, color: 'purple' },
  ];

  return (
    <div className="relative aspect-square max-w-[300px] mx-auto">
      {/* 扫描框 */}
      <div className="absolute inset-4 border-2 border-cyan-500/50 rounded-2xl">
        {/* 角标 */}
        {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-4 h-4 border-cyan-400 ${
              i < 2 ? 'border-t-2' : 'border-b-2'
            } ${i % 2 === 0 ? 'border-l-2' : 'border-r-2'}`}
          />
        ))}

        {/* 扫描线 */}
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* 面部轮廓 + 特征点 */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <ellipse
          cx="50"
          cy="50"
          rx="30"
          ry="38"
          fill="none"
          stroke="rgba(6, 182, 212, 0.3)"
          strokeWidth="0.5"
        />
        {/* 468 特征点模拟 */}
        {Array.from({ length: 50 }).map((_, i) => {
          const angle = (i / 50) * Math.PI * 2;
          const rx = 25 + Math.sin(i * 0.5) * 8;
          const ry = 32 + Math.cos(i * 0.5) * 10;
          return (
            <motion.circle
              key={i}
              cx={50 + Math.cos(angle) * rx}
              cy={50 + Math.sin(angle) * ry}
              r="0.8"
              fill="#06b6d4"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, delay: i * 0.05, repeat: Infinity }}
            />
          );
        })}
      </svg>

      {/* 指标显示 */}
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-2">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="text-lg font-bold text-white">{m.value}%</div>
            <div className="text-xs text-gray-400">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 端云协同演示
function EdgeCloudDemo() {
  const [activeNode, setActiveNode] = useState<'edge' | 'cloud' | null>(null);

  return (
    <div className="relative aspect-square max-w-[300px] mx-auto flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* 设备端 */}
        <motion.g
          onMouseEnter={() => setActiveNode('edge')}
          onMouseLeave={() => setActiveNode(null)}
          className="cursor-pointer"
        >
          <rect
            x="10"
            y="60"
            width="30"
            height="30"
            rx="4"
            fill={activeNode === 'edge' ? 'rgba(236, 72, 153, 0.3)' : 'rgba(255,255,255,0.1)'}
            stroke="#ec4899"
            strokeWidth="0.5"
          />
          <text x="25" y="78" textAnchor="middle" fill="white" fontSize="5">麒麟</text>
          <text x="25" y="85" textAnchor="middle" fill="#9ca3af" fontSize="3">6 TOPS NPU</text>
        </motion.g>

        {/* 云端 */}
        <motion.g
          onMouseEnter={() => setActiveNode('cloud')}
          onMouseLeave={() => setActiveNode(null)}
          className="cursor-pointer"
        >
          <ellipse
            cx="70"
            cy="25"
            rx="20"
            ry="12"
            fill={activeNode === 'cloud' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.1)'}
            stroke="#8b5cf6"
            strokeWidth="0.5"
          />
          <text x="70" y="24" textAnchor="middle" fill="white" fontSize="5">盘古</text>
          <text x="70" y="30" textAnchor="middle" fill="#9ca3af" fontSize="3">千亿参数</text>
        </motion.g>

        {/* 连接线 */}
        <motion.path
          d="M 40 65 Q 55 45 60 30"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="1"
          strokeDasharray="4,2"
          animate={{ strokeDashoffset: [0, -12] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M 60 35 Q 55 50 40 70"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="1"
          strokeDasharray="4,2"
          animate={{ strokeDashoffset: [0, 12] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />

        {/* 渐变定义 */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* 数据流标签 */}
        <motion.text
          x="55"
          y="42"
          textAnchor="middle"
          fill="#ec4899"
          fontSize="3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          实时数据
        </motion.text>
        <motion.text
          x="50"
          y="58"
          textAnchor="middle"
          fill="#8b5cf6"
          fontSize="3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          AI 增强
        </motion.text>
      </svg>

      {/* 说明文字 */}
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <AnimatePresence mode="wait">
          {activeNode === 'edge' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-pink-400"
            >
              端侧：实时推理，隐私保护
            </motion.p>
          )}
          {activeNode === 'cloud' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-purple-400"
            >
              云端：深度分析，持续进化
            </motion.p>
          )}
          {!activeNode && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-gray-500"
            >
              鼠标悬停查看详情
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Demo 组件映射
const demoComponents: Record<string, React.FC> = {
  'face-touch': FaceTouchDemo,
  '3dgs': GaussianSplattingDemo,
  'ai-vision': AIVisionDemo,
  'edge-cloud': EdgeCloudDemo,
};

export default function TechnologyPage() {
  const [activeTech, setActiveTech] = useState(technologies[0].id);
  const currentTech = technologies.find((t) => t.id === activeTech)!;
  const DemoComponent = demoComponents[currentTech.demo.content];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </Link>

          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-pink-400" />
            <h1 className="text-white font-bold">核心技术</h1>
          </div>

          <div className="w-20" />
        </div>
      </div>

      {/* Hero */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              黑科技加持
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                颠覆性技术
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              我们不只是做一面镜子，而是重新定义人与美的交互方式
            </p>
          </motion.div>
        </div>
      </section>

      {/* 技术选择器 */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <motion.button
                key={tech.id}
                onClick={() => setActiveTech(tech.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeTech === tech.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tech.icon className="w-4 h-4" />
                <span className="font-medium">{tech.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* 技术详情 */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTech.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* 左侧：演示 */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-6">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Interactive Demo
                  </span>
                </div>
                <DemoComponent />
              </div>

              {/* 右侧：详情 */}
              <div className="space-y-6">
                {/* 标题 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                      <currentTech.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{currentTech.title}</h2>
                      <p className="text-sm text-gray-500">{currentTech.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mt-4">
                    "{currentTech.tagline}"
                  </p>
                  <p className="text-gray-400 mt-3">{currentTech.description}</p>
                </div>

                {/* 特性列表 */}
                <div className="grid grid-cols-2 gap-3">
                  {currentTech.features.map((feature, i) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <feature.icon className="w-5 h-5 text-pink-400 mb-2" />
                      <div className="text-white font-medium text-sm">{feature.text}</div>
                      <div className="text-gray-500 text-xs mt-1">{feature.desc}</div>
                    </motion.div>
                  ))}
                </div>

                {/* 技术栈 */}
                <div>
                  <h3 className="text-sm text-gray-500 mb-3">技术栈</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentTech.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full text-xs text-pink-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 技术对比 */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">为什么选择我们？</h2>
            <p className="text-gray-400">与传统美妆镜的技术对比</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">技术维度</th>
                  <th className="text-center py-4 px-4 text-gray-400 font-medium">传统美妆镜</th>
                  <th className="text-center py-4 px-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-bold">
                      AgenticMirror
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dim: '交互方式', old: '触摸屏/按钮', new: '面部触控 + 语音 + 手势' },
                  { dim: '妆容预览', old: '静态滤镜', new: '3DGS 实时渲染' },
                  { dim: '肤质分析', old: '单一 RGB', new: 'RGB + 深度 + 红外多模态' },
                  { dim: 'AI 能力', old: '规则匹配', new: '盘古大模型 + 端侧推理' },
                  { dim: '个性化', old: '固定模板', new: '越用越懂你' },
                  { dim: '生态', old: '独立设备', new: 'HarmonyOS 万物互联' },
                ].map((row, i) => (
                  <motion.tr
                    key={row.dim}
                    className="border-b border-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <td className="py-4 px-4 text-white font-medium">{row.dim}</td>
                    <td className="py-4 px-4 text-center text-gray-500">{row.old}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-pink-400 font-medium">{row.new}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-3xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              想亲身体验这些黑科技？
            </h2>
            <p className="text-gray-400 mb-6">
              现在就试试我们的在线 Demo，感受未来美妆的魅力
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo/mirror"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all"
              >
                <Play className="w-5 h-5" />
                体验智能镜
              </Link>
              <Link
                href="/demo/voice-mirror"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                <Sparkles className="w-5 h-5" />
                语音交互 Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
