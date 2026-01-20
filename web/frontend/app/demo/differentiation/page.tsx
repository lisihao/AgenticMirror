'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Scan,
  Box,
  Palette,
  Move3D,
  Dna,
  Clock,
  Sparkles,
  MapPin,
  FlaskConical,
  Brain,
  ChevronRight,
  Play,
  Zap,
  Shield,
  Target,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Crown,
} from 'lucide-react';

// 十大差异化特性定义
const differentiationFeatures = [
  {
    id: 'hyperskin',
    icon: Scan,
    title: 'HyperSkin Sensor',
    subtitle: '多光谱皮肤传感',
    tagline: '三通道透视你的肌肤',
    description: '可见光 + 近红外 + 紫外荧光三通道协同成像，从表皮到真皮层全方位分析，比专业皮肤检测仪更精准。',
    barrierLevel: 5,
    features: [
      { label: '表皮分析', value: 'VIS 400-700nm', desc: '肤色、纹理、毛孔' },
      { label: '真皮分析', value: 'NIR 800-1000nm', desc: '血管、水分、色素' },
      { label: '皮脂检测', value: 'UV-F 320-400nm', desc: '油脂分布、痤疮菌' },
      { label: '综合评估', value: '10+ 指标', desc: '皮肤年龄、健康分' },
    ],
    competitors: [
      { name: 'HiMirror', support: 'partial', note: '仅 RGB 分析' },
      { name: '初普', support: 'partial', note: '无光谱传感' },
      { name: '玫琳凯', support: 'no', note: '手持仪器' },
    ],
  },
  {
    id: 'microface',
    icon: Box,
    title: 'MicroFace 3D',
    subtitle: '亚毫米级 3D 建模',
    tagline: '50,000点精准捕捉每个细节',
    description: '结构光 + 双目立体视觉，亚毫米级精度重建面部三维结构，毛孔级可视化与高相关性美容指标评估。',
    barrierLevel: 5,
    features: [
      { label: '投射点数', value: '50,000+', desc: 'DOE 衍射光学' },
      { label: '深度精度', value: '0.2-0.5mm', desc: '亚毫米级' },
      { label: '帧率', value: '30fps', desc: '实时追踪' },
      { label: '应用', value: '皱纹/轮廓/AR', desc: '多场景适配' },
    ],
    competitors: [
      { name: 'iPhone', support: 'partial', note: '10K 点阵' },
      { name: 'HiMirror', support: 'no', note: '仅 2D' },
      { name: '初普', support: 'no', note: '仅 2D' },
    ],
  },
  {
    id: 'truecolor',
    icon: Palette,
    title: 'TrueColor Adapt',
    subtitle: '环境自适应色彩',
    tagline: '任何光线下都是真实的你',
    description: '16 通道光谱传感器实时感知环境光，AI 色彩映射确保妆容在任何场景下都呈现最真实的效果。',
    barrierLevel: 4,
    features: [
      { label: '光谱通道', value: '16 通道', desc: '410-940nm 全覆盖' },
      { label: '色温检测', value: '±50K', desc: '2000-10000K' },
      { label: '肤色还原', value: 'ΔE < 1.5', desc: '专业级色准' },
      { label: '响应时间', value: '< 50ms', desc: '实时校准' },
    ],
    competitors: [
      { name: '华为原色', support: 'partial', note: '手机端' },
      { name: '普通镜', support: 'no', note: '无校准' },
      { name: '补光镜', support: 'no', note: '固定色温' },
    ],
  },
  {
    id: 'motionbreak',
    icon: Move3D,
    title: 'MotionBreak AI',
    subtitle: '动作分解教学',
    tagline: '大师手法一键学会',
    description: '毫米波雷达 + RGB 融合，骨骼级化妆动作捕捉和分解，将专业化妆师手法转化为可学习的分步教程。',
    barrierLevel: 4,
    features: [
      { label: '雷达精度', value: '0.5mm', desc: '60GHz mmWave' },
      { label: '关节追踪', value: '21 点', desc: '手部骨骼' },
      { label: '动作识别', value: '95%+', desc: '6 类原子动作' },
      { label: '延迟', value: '< 20ms', desc: '实时反馈' },
    ],
    competitors: [
      { name: '教程 App', support: 'partial', note: '视频观看' },
      { name: 'AR 试妆', support: 'no', note: '无动作指导' },
      { name: '线下课', support: 'partial', note: '非实时' },
    ],
  },
  {
    id: 'beautygenome',
    icon: Dna,
    title: 'Beauty Genome',
    subtitle: '美妆偏好表征系统',
    tagline: '用户×脸×场景 → 妆容偏好向量',
    description: '基于认知科学的偏好学习框架：美感存在个体差异与文化差异，我们学习的是"你喜欢什么"，而非"什么是客观美"。',
    barrierLevel: 5,
    features: [
      { label: 'Face Rep', value: '48D', desc: '面部结构/肤色/关键区域' },
      { label: 'Style Rep', value: '48D', desc: '妆容参数/色相/风格' },
      { label: 'Preference', value: '32D', desc: 'Pairwise偏好学习' },
      { label: '训练方式', value: 'A/B对比', desc: '比打分更稳定' },
    ],
    competitors: [
      { name: '问卷推荐', support: 'partial', note: '静态规则' },
      { name: 'AI 滤镜', support: 'no', note: '无偏好学习' },
      { name: '柜姐推荐', support: 'partial', note: '无法量化' },
    ],
  },
  {
    id: 'skintimeline',
    icon: Clock,
    title: 'SkinTimeline',
    subtitle: '时序皮肤追踪',
    tagline: '见证你的美丽蜕变',
    description: '建立个人皮肤健康时间序列数据库，追踪变化、量化护肤效果、预测皮肤趋势，让护肤有据可依。',
    barrierLevel: 3,
    features: [
      { label: '数据维度', value: '10+', desc: '水分/油脂/毛孔...' },
      { label: '存储周期', value: '永久', desc: '本地+云备份' },
      { label: '效果评估', value: '统计检验', desc: 'p-value 验证' },
      { label: '预测模型', value: 'LSTM', desc: '7天趋势预测' },
    ],
    competitors: [
      { name: '护肤日记', support: 'partial', note: '手动记录' },
      { name: '体检报告', support: 'partial', note: '非连续' },
      { name: '普通镜', support: 'no', note: '无记录' },
    ],
  },
  {
    id: 'photoreal',
    icon: Sparkles,
    title: 'LiveRender Pro',
    subtitle: '实时高帧率渲染引擎',
    tagline: '60fps 捕捉 · 实时渲染 · 所见即所得',
    description: '60fps 高帧率实时捕捉化妆动作，毫秒级渲染上妆效果，PBR + SSS 物理级光照，让智能镜成为真正的"化妆实时预览器"。',
    barrierLevel: 5,
    features: [
      { label: '捕捉帧率', value: '60fps', desc: '动作无卡顿' },
      { label: '渲染延迟', value: '< 16ms', desc: '实时响应' },
      { label: '渲染技术', value: 'PBR + SSS', desc: '皮肤次表面散射' },
      { label: '输出分辨率', value: '1080p', desc: 'GPU 实时渲染' },
    ],
    competitors: [
      { name: '传统镜子', support: 'no', note: '无 AR 叠加' },
      { name: 'AR 试妆 App', support: 'partial', note: '15-30fps 卡顿' },
      { name: '美图滤镜', support: 'no', note: '静态照片' },
    ],
  },
  {
    id: 'contextbeauty',
    icon: MapPin,
    title: 'ContextBeauty',
    subtitle: '场景感知推荐',
    tagline: '懂你的场合懂你的美',
    description: '综合时间、地点、天气、日程、社交场合等多维上下文，智能推荐最适合当前场景的妆容和产品。',
    barrierLevel: 3,
    features: [
      { label: '上下文源', value: '8+', desc: '时间/位置/天气...' },
      { label: '场景类型', value: '9 种', desc: '工作/约会/派对...' },
      { label: '天气适配', value: '实时', desc: 'UV/湿度/温度' },
      { label: '日历集成', value: '同步', desc: '活动场合判断' },
    ],
    competitors: [
      { name: '小红书', support: 'partial', note: '搜索查找' },
      { name: 'AI 推荐', support: 'partial', note: '无场景感知' },
      { name: '柜姐', support: 'partial', note: '主观判断' },
    ],
  },
  {
    id: 'ingredimatch',
    icon: FlaskConical,
    title: 'IngrediMatch',
    subtitle: '成分匹配安全',
    tagline: '科学护肤不踩雷',
    description: '15,000+ 成分知识库，2,000+ 配伍规则，智能分析产品成分功效、安全性、配伍禁忌，守护你的皮肤健康。',
    barrierLevel: 4,
    features: [
      { label: '成分库', value: '15,000+', desc: 'INCI 标准名称' },
      { label: '配伍规则', value: '2,000+', desc: '协同/冲突/禁忌' },
      { label: '产品库', value: '50,000+', desc: 'OCR 成分表识别' },
      { label: '安全评分', value: 'EWG 1-10', desc: '国际标准' },
    ],
    competitors: [
      { name: '美丽修行', support: 'partial', note: '查询工具' },
      { name: '透明标签', support: 'partial', note: '成分列表' },
      { name: '专柜咨询', support: 'partial', note: '品牌局限' },
    ],
  },
  {
    id: 'mastermind',
    icon: Brain,
    title: 'MasterMind KG',
    subtitle: '化妆大师知识图谱',
    tagline: '顶级化妆师的大脑',
    description: '融合顶级化妆师经验、美学理论、色彩科学的专业知识图谱，支持复杂美妆问题的推理和回答。',
    barrierLevel: 5,
    features: [
      { label: '实体数', value: '100,000+', desc: '技法/产品/化妆师...' },
      { label: '关系数', value: '500,000+', desc: '多跳推理支持' },
      { label: '技法库', value: '600+', desc: '大师级技巧' },
      { label: '推理能力', value: '多跳', desc: '复杂问题求解' },
    ],
    competitors: [
      { name: '教程视频', support: 'partial', note: '单向输出' },
      { name: 'ChatGPT', support: 'partial', note: '通用非专业' },
      { name: '化妆师', support: 'yes', note: '成本高' },
    ],
  },
];

// 壁垒等级显示组件
function BarrierLevel({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-gray-500 mr-1">技术壁垒</span>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i <= level
              ? 'bg-gradient-to-r from-pink-500 to-purple-500'
              : 'bg-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

// 竞品对比标签
function CompetitorBadge({ support }: { support: 'yes' | 'partial' | 'no' }) {
  const config = {
    yes: { bg: 'bg-green-500/20', text: 'text-green-400', label: '支持' },
    partial: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: '部分' },
    no: { bg: 'bg-red-500/20', text: 'text-red-400', label: '不支持' },
  };
  const c = config[support];
  return (
    <span className={`px-2 py-0.5 rounded text-xs ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

// HyperSkin 传感器演示
function HyperSkinDemo() {
  const [activeChannel, setActiveChannel] = useState<'vis' | 'nir' | 'uvf'>('vis');

  const channels = {
    vis: { name: '可见光', color: '#22d3ee', range: '400-700nm', depth: '表皮 0.1mm' },
    nir: { name: '近红外', color: '#f472b6', range: '800-1000nm', depth: '真皮 1-2mm' },
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
              <text fill="#22d3ee" fontSize="7">肤色 L*58.2</text>
              <text x="50" fill="#22d3ee" fontSize="7">毛孔 23个/cm²</text>
              <text x="110" fill="#22d3ee" fontSize="7">纹理 细腻</text>
            </>
          )}
          {activeChannel === 'nir' && (
            <>
              <text fill="#f472b6" fontSize="7">水分 42%</text>
              <text x="45" fill="#f472b6" fontSize="7">血红蛋白 正常</text>
              <text x="110" fill="#f472b6" fontSize="7">黑色素 中等</text>
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
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
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

// MicroFace 3D 演示
function MicroFace3DDemo() {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="relative h-80 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs">
        {/* 面部轮廓 */}
        <ellipse cx="100" cy="100" rx="55" ry="70" fill="none" stroke="#ec4899" strokeWidth="0.5" opacity="0.5" />

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
                fill="#22d3ee"
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
            <text x="100" y="20" textAnchor="middle" fill="#22d3ee" fontSize="8">深度图</text>
            <motion.rect
              x="30" y="170" width="140" height="8" rx="2" fill="url(#depthGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <defs>
              <linearGradient id="depthGradient">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#f472b6" />
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
        className="absolute bottom-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full"
      >
        {showDetail ? '简化视图' : '查看深度图'}
      </button>

      {/* 参数信息 */}
      <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs">
        <div className="text-cyan-400">50,000+ 点</div>
        <div className="text-gray-500">亚毫米级精度</div>
      </div>
    </div>
  );
}

// Beauty Genome 演示 - 三部分偏好学习架构
function BeautyGenomeDemo() {
  const [activePhase, setActivePhase] = useState<'face' | 'style' | 'preference'>('face');
  const [pairSelection, setPairSelection] = useState<'A' | 'B' | null>(null);

  const phases = [
    { id: 'face', label: 'Face Rep', dim: '48D', color: '#ec4899' },
    { id: 'style', label: 'Style Rep', dim: '48D', color: '#8b5cf6' },
    { id: 'preference', label: 'Preference', dim: '32D', color: '#22d3ee' },
  ];

  const faceFeatures = ['脸型轮廓', '眼部结构', '唇部特征', '眉形', '肤色', '肤质'];
  const styleFeatures = ['底妆质感', '遮瑕强度', '色相风格', '眼影系', '唇色域', '眉形'];

  return (
    <div className="relative h-80 flex flex-col">
      {/* 三部分架构图 */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {phases.map((phase, i) => (
          <React.Fragment key={phase.id}>
            <motion.button
              onClick={() => setActivePhase(phase.id as typeof activePhase)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activePhase === phase.id
                  ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/50'
                  : 'bg-gray-800/50 border border-gray-700 hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-white">{phase.label}</div>
              <div className="text-gray-400 text-[10px]">{phase.dim}</div>
            </motion.button>
            {i < phases.length - 1 && (
              <div className="text-gray-600">→</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 动态内容区 */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {activePhase === 'face' && (
            <motion.div
              key="face"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute inset-0"
            >
              <div className="text-center mb-3">
                <div className="text-pink-400 text-xs font-medium">Face Representation</div>
                <div className="text-gray-500 text-[10px]">面部结构 + 肤色质感 + 关键区域</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {faceFeatures.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-2 text-center"
                  >
                    <div className="text-white text-xs">{f}</div>
                    <div className="text-pink-400 text-[10px]">8D</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activePhase === 'style' && (
            <motion.div
              key="style"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute inset-0"
            >
              <div className="text-center mb-3">
                <div className="text-purple-400 text-xs font-medium">Style/Makeup Representation</div>
                <div className="text-gray-500 text-[10px]">妆容参数向量 · 行业标准表征</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {styleFeatures.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-2 text-center"
                  >
                    <div className="text-white text-xs">{f}</div>
                    <div className="text-purple-400 text-[10px]">8D</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activePhase === 'preference' && (
            <motion.div
              key="preference"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute inset-0"
            >
              <div className="text-center mb-3">
                <div className="text-cyan-400 text-xs font-medium">Preference Learning</div>
                <div className="text-gray-500 text-[10px]">Pairwise A/B 对比 · 比打分更稳定</div>
              </div>
              {/* A/B 选择演示 */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  onClick={() => setPairSelection('A')}
                  className={`w-24 h-28 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                    pairSelection === 'A'
                      ? 'border-cyan-400 bg-cyan-500/20'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-1">💄</div>
                  <div className="text-white text-xs">妆容 A</div>
                  <div className="text-gray-400 text-[10px]">自然裸妆</div>
                </motion.button>
                <div className="text-gray-500 text-xs">vs</div>
                <motion.button
                  onClick={() => setPairSelection('B')}
                  className={`w-24 h-28 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                    pairSelection === 'B'
                      ? 'border-cyan-400 bg-cyan-500/20'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-1">💋</div>
                  <div className="text-white text-xs">妆容 B</div>
                  <div className="text-gray-400 text-[10px]">精致浓妆</div>
                </motion.button>
              </div>
              {pairSelection && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-3"
                >
                  <div className="text-cyan-400 text-xs">✓ 偏好记录: {pairSelection === 'A' ? '自然风格' : '精致风格'}</div>
                  <div className="text-gray-500 text-[10px]">持续学习优化偏好向量</div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部公式 */}
      <div className="text-center pt-2 border-t border-gray-800">
        <div className="text-gray-400 text-[10px]">
          <span className="text-pink-400">Face(48D)</span> × <span className="text-purple-400">Style(48D)</span> → <span className="text-cyan-400">Preference(32D)</span>
        </div>
        <div className="text-gray-500 text-[10px]">学习的是"你喜欢什么"，而非"什么是客观美"</div>
      </div>
    </div>
  );
}

// MasterMind 知识图谱演示
function MasterMindDemo() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes = [
    { id: 'center', x: 100, y: 100, r: 20, label: '妆容推荐', color: '#ec4899' },
    { id: 'face', x: 45, y: 60, r: 12, label: '脸型', color: '#f472b6' },
    { id: 'skin', x: 155, y: 60, r: 12, label: '肤质', color: '#a78bfa' },
    { id: 'color', x: 45, y: 140, r: 12, label: '色彩', color: '#818cf8' },
    { id: 'tech', x: 155, y: 140, r: 12, label: '技法', color: '#22d3ee' },
    { id: 'product', x: 100, y: 170, r: 12, label: '产品', color: '#34d399' },
    { id: 'style', x: 100, y: 30, r: 12, label: '风格', color: '#fbbf24' },
  ];

  const edges = [
    ['center', 'face'], ['center', 'skin'], ['center', 'color'],
    ['center', 'tech'], ['center', 'product'], ['center', 'style'],
    ['face', 'tech'], ['skin', 'product'], ['color', 'style'],
  ];

  return (
    <div className="relative h-80">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* 边 */}
        {edges.map(([from, to], i) => {
          const fromNode = nodes.find(n => n.id === from)!;
          const toNode = nodes.find(n => n.id === to)!;
          return (
            <motion.line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          );
        })}

        {/* 节点 */}
        {nodes.map((node) => (
          <g
            key={node.id}
            onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
            className="cursor-pointer"
          >
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={node.color}
              opacity={selectedNode === node.id ? 1 : 0.7}
              animate={{
                scale: selectedNode === node.id ? 1.2 : 1,
                opacity: selectedNode === node.id ? 1 : 0.7,
              }}
              transition={{ type: 'spring' }}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={node.id === 'center' ? 7 : 6}
              fontWeight="bold"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* 数据流动画 */}
        {selectedNode && (
          <motion.circle
            cx={0}
            cy={0}
            r={3}
            fill="#22d3ee"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [nodes.find(n => n.id === selectedNode)!.x, 100],
              cy: [nodes.find(n => n.id === selectedNode)!.y, 100],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </svg>

      {/* 统计信息 */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 text-xs">
        <div className="text-center">
          <div className="text-white font-bold">100,000+</div>
          <div className="text-gray-500">实体</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold">500,000+</div>
          <div className="text-gray-500">关系</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold">600+</div>
          <div className="text-gray-500">技法</div>
        </div>
      </div>
    </div>
  );
}

// 通用简单演示组件
function SimpleDemo({ feature }: { feature: typeof differentiationFeatures[0] }) {
  return (
    <div className="h-80 flex flex-col items-center justify-center">
      <motion.div
        className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <feature.icon className="w-12 h-12 text-white" />
      </motion.div>
      <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
      <p className="text-gray-400 text-sm text-center max-w-xs">{feature.tagline}</p>

      {/* 特性网格 */}
      <div className="grid grid-cols-2 gap-2 mt-4 w-full max-w-xs">
        {feature.features.slice(0, 4).map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 rounded-lg p-2 text-center"
          >
            <div className="text-pink-400 text-xs font-bold">{f.value}</div>
            <div className="text-gray-500 text-xs">{f.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Demo 组件映射
const demoComponents: Record<string, React.FC<{ feature: typeof differentiationFeatures[0] }>> = {
  hyperskin: () => <HyperSkinDemo />,
  microface: () => <MicroFace3DDemo />,
  beautygenome: () => <BeautyGenomeDemo />,
  mastermind: () => <MasterMindDemo />,
};

export default function DifferentiationPage() {
  const [activeFeature, setActiveFeature] = useState(differentiationFeatures[0].id);
  const currentFeature = differentiationFeatures.find((f) => f.id === activeFeature)!;

  const DemoComponent = demoComponents[currentFeature.id];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/demo/technology"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>核心技术</span>
          </Link>

          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-pink-400" />
            <h1 className="text-white font-bold">差异化竞争力</h1>
          </div>

          <div className="w-20" />
        </div>
      </div>

      {/* Hero */}
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm font-bold mb-6">
              <Shield className="w-4 h-4" />
              人无我有 · 人有我优
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                十大技术壁垒
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              友商难以复制的核心竞争力，构筑长期护城河
            </p>
          </motion.div>
        </div>
      </section>

      {/* 特性选择器 - 横向滚动 */}
      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {differentiationFeatures.map((feature, i) => (
              <motion.button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeFeature === feature.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <feature.icon className="w-4 h-4" />
                <span className="font-medium text-sm whitespace-nowrap">{feature.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* 特性详情 */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* 左侧：演示 */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Interactive Demo
                  </span>
                  <BarrierLevel level={currentFeature.barrierLevel} />
                </div>
                {DemoComponent ? <DemoComponent feature={currentFeature} /> : <SimpleDemo feature={currentFeature} />}
              </div>

              {/* 右侧：详情 */}
              <div className="space-y-6">
                {/* 标题 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                      <currentFeature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{currentFeature.title}</h2>
                      <p className="text-sm text-gray-500">{currentFeature.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mt-4">
                    "{currentFeature.tagline}"
                  </p>
                  <p className="text-gray-400 mt-3">{currentFeature.description}</p>
                </div>

                {/* 技术参数 */}
                <div>
                  <h3 className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    技术参数
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {currentFeature.features.map((f, i) => (
                      <motion.div
                        key={f.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 rounded-xl p-3 border border-white/10"
                      >
                        <div className="text-pink-400 font-bold text-sm">{f.value}</div>
                        <div className="text-white text-xs font-medium">{f.label}</div>
                        <div className="text-gray-500 text-xs mt-1">{f.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 竞品对比 */}
                <div>
                  <h3 className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    竞品对比
                  </h3>
                  <div className="space-y-2">
                    {currentFeature.competitors.map((c, i) => (
                      <motion.div
                        key={c.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10"
                      >
                        <span className="text-white text-sm">{c.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs">{c.note}</span>
                          <CompetitorBadge support={c.support} />
                        </div>
                      </motion.div>
                    ))}
                    {/* 我们的优势 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center justify-between bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-3 border border-pink-500/30"
                    >
                      <span className="text-pink-400 text-sm font-bold">AgenticMirror</span>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-300 text-xs">完整实现</span>
                        <span className="px-2 py-0.5 rounded bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs">
                          领先
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 总览表格 */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">十大特性总览</h2>
            <p className="text-gray-400">技术壁垒等级 & 实现优先级</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">特性</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium text-sm">技术壁垒</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium text-sm">核心价值</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium text-sm">优先级</th>
                </tr>
              </thead>
              <tbody>
                {differentiationFeatures.map((f, i) => (
                  <motion.tr
                    key={f.id}
                    className={`border-b border-white/5 cursor-pointer ${
                      activeFeature === f.id ? 'bg-pink-500/10' : 'hover:bg-white/5'
                    }`}
                    onClick={() => setActiveFeature(f.id)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <f.icon className="w-5 h-5 text-pink-400" />
                        <div>
                          <div className="text-white font-medium text-sm">{f.title}</div>
                          <div className="text-gray-500 text-xs">{f.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((l) => (
                          <div
                            key={l}
                            className={`w-2 h-2 rounded-full mx-0.5 ${
                              l <= f.barrierLevel ? 'bg-pink-500' : 'bg-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-400 text-xs max-w-[200px]">
                      {f.tagline}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          f.barrierLevel >= 5
                            ? 'bg-red-500/20 text-red-400'
                            : f.barrierLevel >= 4
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {f.barrierLevel >= 5 ? 'P0' : f.barrierLevel >= 4 ? 'P1' : 'P2'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 竞品技术对比 */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm font-bold mb-4">
              <Crown className="w-4 h-4" />
              CES 2026 竞品技术对标
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">十大技术壁垒 vs 行业巨头</h2>
            <p className="text-gray-400">全面领先三星、欧莱雅、NuraLogix 等国际大厂</p>
          </motion.div>

          {/* 竞品对比表格 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold sticky left-0 bg-gray-800/90 backdrop-blur z-10 min-w-[180px]">
                      技术能力
                    </th>
                    <th className="text-center py-4 px-3 text-gray-300 font-semibold min-w-[100px]">
                      <div className="flex flex-col items-center">
                        <span className="text-blue-400">Samsung</span>
                        <span className="text-xs text-gray-500">Bespoke AI</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-3 text-gray-300 font-semibold min-w-[100px]">
                      <div className="flex flex-col items-center">
                        <span className="text-purple-400">L'Oréal</span>
                        <span className="text-xs text-gray-500">Cell BioPrint</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-3 text-gray-300 font-semibold min-w-[100px]">
                      <div className="flex flex-col items-center">
                        <span className="text-emerald-400">NuraLogix</span>
                        <span className="text-xs text-gray-500">Magic Mirror</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-3 text-gray-300 font-semibold min-w-[100px]">
                      <div className="flex flex-col items-center">
                        <span className="text-cyan-400">CareOS</span>
                        <span className="text-xs text-gray-500">Themis 2.0</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-3 text-gray-300 font-semibold min-w-[100px]">
                      <div className="flex flex-col items-center">
                        <span className="text-orange-400">HiMirror</span>
                        <span className="text-xs text-gray-500">Plus+</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 font-semibold min-w-[120px] bg-gradient-to-r from-pink-500/20 to-purple-500/20">
                      <div className="flex flex-col items-center">
                        <span className="text-pink-400 font-bold">AgenticMirror</span>
                        <span className="text-xs text-pink-300">我们</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {/* HyperSkin 多光谱皮肤传感 */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 sticky left-0 bg-gray-800/90 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <Scan className="w-4 h-4 text-pink-400" />
                        <div>
                          <div className="text-white font-medium">HyperSkin Sensor</div>
                          <div className="text-gray-500 text-xs">多光谱皮肤传感</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">单通道</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">仅RGB</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center bg-pink-500/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-pink-500" />
                        <span className="text-xs text-pink-400 mt-1 font-medium">三通道</span>
                      </div>
                    </td>
                  </tr>

                  {/* MicroFace 3D */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 sticky left-0 bg-gray-800/90 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <Box className="w-4 h-4 text-pink-400" />
                        <div>
                          <div className="text-white font-medium">MicroFace 3D</div>
                          <div className="text-gray-500 text-xs">亚毫米级3D建模</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-center bg-pink-500/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-pink-500" />
                        <span className="text-xs text-pink-400 mt-1 font-medium">50K点阵</span>
                      </div>
                    </td>
                  </tr>

                  {/* TrueColor Adapt */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 sticky left-0 bg-gray-800/90 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-pink-400" />
                        <div>
                          <div className="text-white font-medium">TrueColor Adapt</div>
                          <div className="text-gray-500 text-xs">环境自适应色彩</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">基础</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">LED补光</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center bg-pink-500/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-pink-500" />
                        <span className="text-xs text-pink-400 mt-1 font-medium">16通道</span>
                      </div>
                    </td>
                  </tr>

                  {/* MotionBreak AI */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 sticky left-0 bg-gray-800/90 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <Move3D className="w-4 h-4 text-pink-400" />
                        <div>
                          <div className="text-white font-medium">MotionBreak AI</div>
                          <div className="text-gray-500 text-xs">动作分解教学</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-center bg-pink-500/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-pink-500" />
                        <span className="text-xs text-pink-400 mt-1 font-medium">mmWave</span>
                      </div>
                    </td>
                  </tr>

                  {/* Beauty Genome */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 sticky left-0 bg-gray-800/90 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <Dna className="w-4 h-4 text-pink-400" />
                        <div>
                          <div className="text-white font-medium">Beauty Genome</div>
                          <div className="text-gray-500 text-xs">美妆偏好表征</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">简单</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">肤质</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">问卷</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center bg-pink-500/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-pink-500" />
                        <span className="text-xs text-pink-400 mt-1 font-medium">偏好学习</span>
                      </div>
                    </td>
                  </tr>

                  {/* SkinTimeline */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 sticky left-0 bg-gray-800/90 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-pink-400" />
                        <div>
                          <div className="text-white font-medium">SkinTimeline</div>
                          <div className="text-gray-500 text-xs">时序皮肤追踪</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">短期</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs text-gray-500 mt-1">健康</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">基础</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">手动</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center bg-pink-500/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-pink-500" />
                        <span className="text-xs text-pink-400 mt-1 font-medium">LSTM预测</span>
                      </div>
                    </td>
                  </tr>

                  {/* LiveRender Pro */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 sticky left-0 bg-gray-800/90 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-pink-400" />
                        <div>
                          <div className="text-white font-medium">LiveRender Pro</div>
                          <div className="text-gray-500 text-xs">60fps实时渲染</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">30fps</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">15fps</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center bg-pink-500/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-pink-500" />
                        <span className="text-xs text-pink-400 mt-1 font-medium">60fps</span>
                      </div>
                    </td>
                  </tr>

                  {/* ContextBeauty */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 sticky left-0 bg-gray-800/90 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-pink-400" />
                        <div>
                          <div className="text-white font-medium">ContextBeauty</div>
                          <div className="text-gray-500 text-xs">场景感知推荐</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">智能家居</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">天气</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-center bg-pink-500/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-pink-500" />
                        <span className="text-xs text-pink-400 mt-1 font-medium">8维上下文</span>
                      </div>
                    </td>
                  </tr>

                  {/* IngrediMatch */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 sticky left-0 bg-gray-800/90 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-pink-400" />
                        <div>
                          <div className="text-white font-medium">IngrediMatch</div>
                          <div className="text-gray-500 text-xs">成分匹配安全</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs text-gray-500 mt-1">自有品牌</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">查询</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center bg-pink-500/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-pink-500" />
                        <span className="text-xs text-pink-400 mt-1 font-medium">15K+成分</span>
                      </div>
                    </td>
                  </tr>

                  {/* MasterMind KG */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 sticky left-0 bg-gray-800/90 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-pink-400" />
                        <div>
                          <div className="text-white font-medium">MasterMind KG</div>
                          <div className="text-gray-500 text-xs">化妆大师知识图谱</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs text-gray-500 mt-1">品牌知识</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-3 text-center"><XCircle className="w-5 h-5 text-gray-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-center bg-pink-500/5">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-5 h-5 text-pink-500" />
                        <span className="text-xs text-pink-400 mt-1 font-medium">100K实体</span>
                      </div>
                    </td>
                  </tr>
                </tbody>

                {/* 统计行 */}
                <tfoot>
                  <tr className="bg-white/5 border-t border-white/10">
                    <td className="py-4 px-4 sticky left-0 bg-gray-800/90 backdrop-blur">
                      <div className="text-white font-bold">技术领先项</div>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="text-2xl font-bold text-gray-500">0</span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="text-2xl font-bold text-gray-500">1</span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="text-2xl font-bold text-gray-500">1</span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="text-2xl font-bold text-gray-500">0</span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="text-2xl font-bold text-gray-500">0</span>
                    </td>
                    <td className="py-4 px-4 text-center bg-pink-500/10">
                      <span className="text-2xl font-bold text-pink-400">10</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* 图例 */}
            <div className="flex flex-wrap items-center justify-center gap-6 p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-500" />
                <span className="text-xs text-gray-400">完整支持</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-gray-400">竞品领先</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-gray-400">部分支持</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-400">不支持</span>
              </div>
            </div>
          </motion.div>

          {/* 竞争优势总结 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-4 mt-8"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">vs</span>
                </div>
                <span className="text-blue-400 font-bold">Samsung</span>
              </div>
              <p className="text-gray-400 text-sm">
                三星强在智能家居生态，但<span className="text-white">缺乏美妆垂直深度</span>。
                无专业皮肤分析、无3D建模、无动作教学，"美妆"只是附属功能。
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-5 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400 font-bold">vs</span>
                </div>
                <span className="text-purple-400 font-bold">L'Oréal</span>
              </div>
              <p className="text-gray-400 text-sm">
                欧莱雅有品牌和AR技术，但<span className="text-white">局限于自有品牌推广</span>。
                非中立平台、无硬件优势、无持续陪伴，本质是"数字柜姐"。
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-5 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 font-bold">vs</span>
                </div>
                <span className="text-emerald-400 font-bold">NuraLogix</span>
              </div>
              <p className="text-gray-400 text-sm">
                NuraLogix 专注健康监测，但<span className="text-white">完全不涉及美妆场景</span>。
                纯健康工具定位、无情感交互、无个性化推荐，用户粘性不足。
              </p>
            </div>
          </motion.div>

          {/* 结论 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-pink-500/20 text-center"
          >
            <Crown className="w-10 h-10 text-pink-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">
              唯一的全栈美妆智能镜
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              AgenticMirror 是市场上<span className="text-pink-400 font-medium">唯一同时具备</span>专业传感硬件（多光谱+3D）、
              垂直AI能力（知识图谱+动作分解）、情感陪伴交互的智能镜产品。
              <br />
              <span className="text-white font-medium">10项技术全部领先，这不是单点突破，而是系统性碾压。</span>
            </p>
          </motion.div>
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
              这些技术，只有我们能做到
            </h2>
            <p className="text-gray-400 mb-6">
              深度技术积累 + 硬件定制能力 = 难以逾越的护城河
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo/workflow"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all"
              >
                <Play className="w-5 h-5" />
                体验完整流程
              </Link>
              <Link
                href="/demo/mirror"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                <Sparkles className="w-5 h-5" />
                智能镜 Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
