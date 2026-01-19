'use client';

import { useState, useRef } from 'react';
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

// 智能化妆笔系列
const smartPens = [
  {
    id: 'foundation',
    name: '智能粉底笔',
    icon: '🖌️',
    head: '海绵头',
    color: '#fdd5c0',
    smartFeatures: [
      '压感检测：轻压薄涂，重压遮瑕',
      '肤色扫描：自动匹配最佳色号',
      '用量提醒：剩余量实时显示',
    ],
  },
  {
    id: 'eyebrow',
    name: '智能眉笔',
    icon: '✏️',
    head: '斜角笔头',
    color: '#4a3728',
    smartFeatures: [
      '角度感应：45°最佳上妆角度提示',
      '眉形导航：根据脸型推荐眉形',
      '对称辅助：左右眉毛对称度检测',
    ],
  },
  {
    id: 'eyeshadow',
    name: '智能眼影刷',
    icon: '🎨',
    head: '晕染刷头',
    color: '#a855f7',
    smartFeatures: [
      '区域识别：眼窝/眼尾智能分区',
      '晕染指导：震动提示晕染方向',
      '配色推荐：根据肤色推荐眼影盘',
    ],
  },
  {
    id: 'blush',
    name: '智能腮红刷',
    icon: '🌸',
    head: '散粉刷头',
    color: '#f472b6',
    smartFeatures: [
      '位置定位：苹果肌精准定位',
      '力度反馈：下手轻重实时提示',
      '范围控制：防止腮红画太大',
    ],
  },
  {
    id: 'lips',
    name: '智能唇釉笔',
    icon: '💄',
    head: '唇刷头',
    color: '#e11d48',
    smartFeatures: [
      '唇线勾勒：自动识别唇线边缘',
      '颜色试色：AR预览不同色号',
      '持妆检测：提醒补妆时机',
    ],
  },
  {
    id: 'contour',
    name: '智能修容笔',
    icon: '🔲',
    head: '斜角刷头',
    color: '#92400e',
    smartFeatures: [
      '脸型分析：推荐修容位置',
      '阴影导航：高光/阴影区域提示',
      '晕染检测：边缘是否自然',
    ],
  },
];

// 面部区域信息
const faceZones = {
  tzone: {
    name: 'T区',
    fullName: 'T型区（额头+鼻子）',
    tips: ['容易出油，建议用控油底妆', '定妆散粉重点照顾', '高光打在鼻梁提亮'],
  },
  forehead: {
    name: '额头',
    fullName: '额头区域',
    tips: ['遮盖抬头纹用遮瑕膏', '发际线处要晕染自然', '可以用高光提亮眉骨'],
  },
  eyebrow: {
    name: '眉毛',
    fullName: '眉毛区域',
    tips: ['根据脸型选择眉形', '眉头淡眉尾深更自然', '用眉刷晕染避免生硬'],
  },
  eyeshadow: {
    name: '眼部',
    fullName: '眼周区域',
    tips: ['先打底防止眼影飞粉', '浅色提亮深色加深', '眼尾上扬显精神'],
  },
  nose: {
    name: '鼻子',
    fullName: '鼻部区域',
    tips: ['山根阴影让鼻子更挺', '鼻头两侧轻扫修容', '鼻梁高光不要太宽'],
  },
  blush: {
    name: '脸颊',
    fullName: '苹果肌区域',
    tips: ['微笑找到苹果肌位置', '斜向上扫显脸小', '腮红颜色要配口红'],
  },
  uzone: {
    name: 'U区',
    fullName: 'U型区（两颊+下巴）',
    tips: ['容易干燥要做好保湿', '修容打在颧骨下方', '下颌线修容显脸小'],
  },
  lips: {
    name: '嘴唇',
    fullName: '唇部区域',
    tips: ['先用润唇膏打底', '唇线笔勾勒更精致', '咬唇妆显得更少女'],
  },
  chin: {
    name: '下巴',
    fullName: '下巴区域',
    tips: ['下巴高光显脸立体', 'V脸修容在下颌角', '注意和脖子衔接自然'],
  },
};

// 面部触控演示组件 - 智能化妆笔绘制
function FaceTouchDemo() {
  const [makeup, setMakeup] = useState({
    foundation: false,
    eyeshadow: false,
    blush: false,
    lips: false,
    eyebrow: false,
    contour: false,
  });
  const [selectedPen, setSelectedPen] = useState(smartPens[0]);
  const [brushPos, setBrushPos] = useState({ x: 100, y: 100 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Array<{ x: number; y: number; color: string; size: number }>>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // 肤色
  const skin = { light: '#ffe4d6', medium: '#fdd5c0', dark: '#f5c4a8' };

  // 鼠标移动 - 更新画笔位置
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 200;
    const y = ((e.clientY - rect.top) / rect.height) * 260;
    setBrushPos({ x, y });

    // 如果正在绘制，添加笔迹
    if (isDrawing && x > 30 && x < 170 && y > 30 && y < 230) {
      setStrokes(prev => [...prev.slice(-100), { x, y, color: selectedPen.color, size: 3 + Math.random() * 2 }]);
    }
  };

  // 开始绘制
  const handleMouseDown = () => {
    setIsDrawing(true);
    // 自动应用对应妆容
    if (selectedPen.id in makeup) {
      setMakeup(prev => ({ ...prev, [selectedPen.id]: true }));
    }
  };

  // 停止绘制
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // 重置
  const resetAll = () => {
    setMakeup({
      foundation: false,
      eyeshadow: false,
      blush: false,
      lips: false,
      eyebrow: false,
      contour: false,
    });
    setStrokes([]);
  };

  const currentPen = selectedPen;

  return (
    <div className="relative flex flex-col gap-2" style={{ height: '400px' }}>
      {/* 顶部：智能化妆笔选择器 */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {smartPens.map((pen) => (
          <button
            key={pen.id}
            onClick={() => setSelectedPen(pen)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-all ${
              selectedPen.id === pen.id
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            <span>{pen.icon}</span>
            <span>{pen.name}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3 flex-1">
        {/* 左侧：人脸绘制区 */}
        <div className="relative flex-1">
          <svg
            ref={svgRef}
            viewBox="0 0 200 260"
            className="w-full h-full cursor-none"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <defs>
              <radialGradient id="touchSkinGradient" cx="40%" cy="35%" r="70%">
                <stop offset="0%" stopColor={makeup.foundation ? '#fff0e8' : skin.light} />
                <stop offset="50%" stopColor={makeup.foundation ? '#ffe4d8' : skin.medium} />
                <stop offset="100%" stopColor={makeup.foundation ? '#fdd5c4' : skin.dark} />
              </radialGradient>
              <radialGradient id="touchEyeshadow" cx="50%" cy="70%" r="80%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.7)" />
                <stop offset="40%" stopColor="rgba(236, 72, 153, 0.5)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id="touchBlush" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(244, 114, 182, 0.6)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <linearGradient id="touchLipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={makeup.lips ? '#e11d48' : '#d4a5a5'} />
                <stop offset="50%" stopColor={makeup.lips ? '#be123c' : '#c99090'} />
                <stop offset="100%" stopColor={makeup.lips ? '#9f1239' : '#b88080'} />
              </linearGradient>
              <filter id="touchBlur"><feGaussianBlur stdDeviation="3" /></filter>
              <filter id="strokeBlur"><feGaussianBlur stdDeviation="1.5" /></filter>
            </defs>

            {/* 长发 */}
            <g>
              <path d="M 15 90 C 5 120, 0 180, 10 240 C 15 260, 25 270, 35 260 L 40 200 C 35 150, 35 100, 50 60 C 70 25, 130 25, 150 60 C 165 100, 165 150, 160 200 L 165 260 C 175 270, 185 260, 190 240 C 200 180, 195 120, 185 90 C 175 50, 140 15, 100 15 C 60 15, 25 50, 15 90" fill="#1a1209" />
              <path d="M 20 95 C 12 125, 8 175, 15 230 L 42 190 C 38 145, 40 100, 55 65 C 72 32, 128 32, 145 65 C 160 100, 162 145, 158 190 L 185 230 C 192 175, 188 125, 180 95 C 170 55, 138 25, 100 25 C 62 25, 30 55, 20 95" fill="#2d1f14" />
              <path d="M 45 75 C 50 55, 75 40, 100 40 C 125 40, 150 55, 155 75 C 150 70, 130 60, 100 60 C 70 60, 50 70, 45 75" fill="#2d1f14" />
            </g>

            {/* 耳朵 */}
            <path d="M 35 110 C 25 100, 20 115, 22 130 C 24 145, 30 152, 35 147 C 32 142, 30 132, 32 120 C 33 115, 35 112, 35 110" fill={skin.medium} />
            <path d="M 165 110 C 175 100, 180 115, 178 130 C 176 145, 170 152, 165 147 C 168 142, 170 132, 168 120 C 167 115, 165 112, 165 110" fill={skin.medium} />

            {/* 面部主体 */}
            <path d="M 100 30 C 145 30, 165 70, 165 110 C 165 150, 155 180, 140 200 Q 120 225, 100 230 Q 80 225, 60 200 C 45 180, 35 150, 35 110 C 35 70, 55 30, 100 30" fill="url(#touchSkinGradient)" />

            {/* 妆容效果 */}
            {makeup.foundation && <motion.ellipse cx="85" cy="90" rx="45" ry="55" fill="rgba(255,255,255,0.2)" filter="url(#touchBlur)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />}
            {makeup.eyeshadow && (
              <>
                <motion.ellipse cx="67" cy="112" rx="22" ry="14" fill="url(#touchEyeshadow)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                <motion.ellipse cx="133" cy="112" rx="22" ry="14" fill="url(#touchEyeshadow)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
              </>
            )}
            {makeup.blush && (
              <>
                <motion.ellipse cx="48" cy="145" rx="22" ry="18" fill="url(#touchBlush)" filter="url(#touchBlur)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                <motion.ellipse cx="152" cy="145" rx="22" ry="18" fill="url(#touchBlush)" filter="url(#touchBlur)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
              </>
            )}
            {makeup.contour && (
              <>
                <motion.path d="M 45 130 Q 40 150, 50 180" fill="none" stroke="rgba(139,69,19,0.3)" strokeWidth="8" filter="url(#touchBlur)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                <motion.path d="M 155 130 Q 160 150, 150 180" fill="none" stroke="rgba(139,69,19,0.3)" strokeWidth="8" filter="url(#touchBlur)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
              </>
            )}

            {/* 眉毛 */}
            <path d="M 52 95 Q 65 88, 82 92" fill="none" stroke={makeup.eyebrow ? '#2d1f14' : '#4a3728'} strokeWidth={makeup.eyebrow ? '4.5' : '3.5'} strokeLinecap="round" />
            <path d="M 118 92 Q 135 88, 148 95" fill="none" stroke={makeup.eyebrow ? '#2d1f14' : '#4a3728'} strokeWidth={makeup.eyebrow ? '4.5' : '3.5'} strokeLinecap="round" />

            {/* 眼睛 */}
            <ellipse cx="67" cy="115" rx="16" ry="10" fill="white" />
            <circle cx="67" cy="115" r="7" fill="#4a3728" /><circle cx="67" cy="115" r="4" fill="#1a1a1a" /><circle cx="64" cy="112" r="2.5" fill="white" opacity="0.9" />
            <path d="M 51 115 Q 60 105, 67 105 Q 74 105, 83 115" fill="none" stroke="#2d1f1a" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="133" cy="115" rx="16" ry="10" fill="white" />
            <circle cx="133" cy="115" r="7" fill="#4a3728" /><circle cx="133" cy="115" r="4" fill="#1a1a1a" /><circle cx="130" cy="112" r="2.5" fill="white" opacity="0.9" />
            <path d="M 117 115 Q 126 105, 133 105 Q 140 105, 149 115" fill="none" stroke="#2d1f1a" strokeWidth="1.5" strokeLinecap="round" />

            {/* 鼻子 */}
            <path d="M 100 118 C 98 125, 97 135, 96 155 L 104 155 C 103 135, 102 125, 100 118" fill={skin.light} />
            <ellipse cx="100" cy="158" rx="10" ry="7" fill={skin.medium} />

            {/* 嘴唇 */}
            <path d="M 80 182 Q 90 176, 100 178 Q 110 176, 120 182 Q 110 180, 100 182 Q 90 180, 80 182" fill="url(#touchLipGradient)" />
            <path d="M 80 182 Q 85 195, 100 198 Q 115 195, 120 182 Q 110 185, 100 186 Q 90 185, 80 182" fill="url(#touchLipGradient)" />
            {makeup.lips && <motion.ellipse cx="100" cy="188" rx="12" ry="5" fill="rgba(255,255,255,0.3)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />}

            {/* 绘制的笔迹 */}
            {strokes.map((stroke, i) => (
              <circle
                key={i}
                cx={stroke.x}
                cy={stroke.y}
                r={stroke.size}
                fill={stroke.color}
                opacity="0.6"
                filter="url(#strokeBlur)"
              />
            ))}

            {/* 智能化妆笔光标 */}
            <g transform={`translate(${brushPos.x}, ${brushPos.y})`}>
              {/* 笔身 */}
              <rect x="-3" y="-35" width="6" height="30" rx="2" fill="linear-gradient(180deg, #4a4a4a, #2a2a2a)" stroke="#666" strokeWidth="0.5" />
              {/* 笔头 */}
              <path d="M -4 -5 L 0 5 L 4 -5 Z" fill={selectedPen.color} />
              {/* 智能指示灯 */}
              <motion.circle
                cx="0"
                cy="-30"
                r="2"
                fill="#22c55e"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              {/* 压感指示 */}
              {isDrawing && (
                <motion.circle
                  cx="0"
                  cy="0"
                  r="8"
                  fill="none"
                  stroke={selectedPen.color}
                  strokeWidth="1"
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </g>
          </svg>

          {/* 绘制提示 */}
          <div className="absolute bottom-1 left-0 right-0 text-center text-xs text-gray-500">
            按住鼠标在脸上绘制 • 当前：{selectedPen.name}
          </div>
        </div>

        {/* 右侧：智能化妆笔信息 */}
        <div className="w-40 flex flex-col gap-2">
          {/* 当前笔信息 */}
          <motion.div
            key={currentPen.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-pink-500/20 to-purple-500/20 rounded-xl p-3 border border-pink-500/30"
          >
            <div className="text-center mb-2">
              <div className="text-3xl mb-1">{currentPen.icon}</div>
              <div className="text-sm font-bold text-white">{currentPen.name}</div>
              <div className="text-xs text-gray-400">笔头：{currentPen.head}</div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs text-pink-300 font-medium">智能功能：</div>
              {currentPen.smartFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-1 text-xs text-gray-300"
                >
                  <Zap className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 已上妆部位 */}
          <div className="bg-white/5 rounded-lg p-2">
            <div className="text-xs text-gray-400 mb-1.5">已上妆：</div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(makeup).map(([key, value]) => value && (
                <span key={key} className="px-1.5 py-0.5 text-xs bg-pink-500/30 text-pink-300 rounded">
                  {key === 'foundation' ? '底妆' : key === 'eyebrow' ? '眉毛' : key === 'eyeshadow' ? '眼妆' : key === 'blush' ? '腮红' : key === 'lips' ? '唇妆' : '修容'}
                </span>
              ))}
              {!Object.values(makeup).some(v => v) && (
                <span className="text-xs text-gray-500">无</span>
              )}
            </div>
          </div>

          {/* 重置按钮 */}
          <button
            onClick={resetAll}
            className="py-1.5 text-xs bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg transition-colors"
          >
            卸妆重置
          </button>
        </div>
      </div>
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
