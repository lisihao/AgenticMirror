# AgenticMirror 工作流演示系统 - 架构设计文档

> 版本: 1.0.0
> 日期: 2025-01-17
> 作者: AgenticMirror Team

---

## 一、系统概述

### 1.1 项目背景

AgenticMirror 工作流演示系统是一个基于 Web 的交互式演示平台，用于展示 Agentic AI 智能美妆镜的完整工作流程。该系统采用草图风格的 SVG 插画，直观展示从面部识别到智能购物建议的完整用户体验。

### 1.2 设计目标

- **直观展示**: 通过5个阶段的交互式演示，清晰展示 Agentic AI 的工作流程
- **视觉吸引**: 采用手绘草图风格，营造友好、亲切的用户体验
- **智能交互**: 模拟真实的 AI 分析和推荐过程
- **响应式设计**: 适配不同屏幕尺寸的设备

---

## 二、系统架构

### 2.1 技术栈

```
┌─────────────────────────────────────────────────────────────┐
│                     前端技术栈                               │
├─────────────────────────────────────────────────────────────┤
│  Framework    │  Next.js 14 (App Router)                    │
│  Language     │  TypeScript                                  │
│  Styling      │  Tailwind CSS + CSS Modules                 │
│  Animation    │  Framer Motion                              │
│  Icons        │  Lucide React                               │
│  Graphics     │  SVG (手绘风格)                              │
│  State        │  React Hooks (useState, useEffect)          │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 目录结构

```
web/frontend/
├── app/
│   └── demo/
│       ├── workflow/
│       │   └── page.tsx          # 工作流演示主页面
│       ├── competition/
│       │   └── page.tsx          # 竞品分析页面
│       └── layout.tsx            # Demo 布局
├── components/
│   ├── workflow/
│   │   ├── SketchFace.tsx        # 智能镜面部草图组件
│   │   ├── PhaseIndicator.tsx    # 阶段指示器
│   │   ├── UserContextPanel.tsx  # 用户画像面板
│   │   ├── StepGuidePanel.tsx    # 步骤指导面板
│   │   └── FeedbackPanel.tsx     # 实时反馈面板
│   └── layout/
│       └── DemoSidebar.tsx       # 演示侧边栏导航
└── lib/
    └── constants/
        └── mockData.ts           # Mock 数据
```

---

## 三、核心组件设计

### 3.1 SketchFace 智能镜组件

#### 3.1.1 组件概述

`SketchFace` 是系统的核心视觉组件，实现了类似三星智能镜的椭圆形镜面设计，支持：

- 面部草图展示（含耳朵，支持耳饰推荐）
- 化妆变换动画
- 皮肤分析指标叠加
- 区域引导动画
- 智能镜 UI 元素

#### 3.1.2 Props 接口

```typescript
interface SketchFaceProps {
  makeupStep?: number;                    // 当前化妆步骤 (1-5)
  showScanLine?: boolean;                 // 显示扫描线动画
  showMetrics?: boolean;                  // 显示皮肤指标
  highlightArea?: HighlightAreaType;      // 高亮区域
  showTransformation?: boolean;           // 显示化妆变换
  beautyScore?: number;                   // 美妆评分
  showZoneGuides?: boolean;               // 显示区域引导
  activeZone?: ZoneType;                  // 当前活跃区域
  showEarringRecommend?: boolean;         // 显示耳饰推荐
}

type HighlightAreaType =
  | 'full_face' | 'eyebrow' | 'eyeshadow' | 'lips'
  | 'foundation' | 'blush' | 't_zone' | 'cheeks' | 'ears' | null;

type ZoneType =
  | 'foundation' | 'eyebrow' | 'eyeshadow'
  | 'blush' | 'lips' | 't_zone' | 'cheeks' | null;
```

#### 3.1.3 SVG 结构

```
┌─────────────────────────────────────────┐
│            智能镜 SVG 结构               │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │     椭圆镜框 (金属渐变)          │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │   玻璃效果层            │   │   │
│  │  │  ┌───────────────────┐ │   │   │
│  │  │  │   状态栏 (顶部)    │ │   │   │
│  │  │  ├───────────────────┤ │   │   │
│  │  │  │                   │ │   │   │
│  │  │  │   面部草图        │ │   │   │
│  │  │  │   + 化妆变换      │ │   │   │
│  │  │  │   + 区域引导      │ │   │   │
│  │  │  │                   │ │   │   │
│  │  │  ├───────────────────┤ │   │   │
│  │  │  │  皮肤指标面板     │ │   │   │
│  │  │  └───────────────────┘ │   │   │
│  │  └─────────────────────────┘   │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

#### 3.1.4 关键特性

**1. 椭圆镜框设计**
```tsx
// 镜框渐变定义
<linearGradient id="mirrorFrameGradient">
  <stop offset="0%" stopColor="#C0C0C0" />    // 银色
  <stop offset="30%" stopColor="#E8E8E8" />   // 浅银
  <stop offset="50%" stopColor="#FFFFFF" />   // 高光
  <stop offset="70%" stopColor="#D4D4D4" />   // 中银
  <stop offset="100%" stopColor="#A0A0A0" />  // 深银
</linearGradient>

// 椭圆镜框
<ellipse cx="210" cy="260" rx="195" ry="245"
  fill="url(#mirrorFrameGradient)" />
```

**2. 区域引导动画**
```tsx
// 使用 Framer Motion 实现虚线边框动画
<motion.ellipse
  animate={{
    strokeDashoffset: [0, 20],
    opacity: [0.6, 1, 0.6],
  }}
  transition={{
    strokeDashoffset: { duration: 1, repeat: Infinity },
    opacity: { duration: 2, repeat: Infinity },
  }}
  stroke="#E91E63"
  strokeDasharray="8 4"
  fill="rgba(233, 30, 99, 0.1)"
/>
```

**3. 化妆变换效果**
```tsx
// 根据 makeupStep 显示不同化妆效果
{showTransformation && makeupStep >= 1 && (
  <g className="foundation-layer">
    {/* 底妆效果 - 肤色均匀化 */}
  </g>
)}
{showTransformation && makeupStep >= 2 && (
  <g className="eyebrow-layer">
    {/* 眉毛塑形效果 */}
  </g>
)}
// ... 更多步骤
```

**4. 智能镜 UI 叠加**
```tsx
// 顶部状态栏
<rect x="50" y="35" width="320" height="24" rx="12"
  fill="rgba(0,0,0,0.3)" />
<text fill="white" fontSize="10">10:30 AM</text>
<text fill="white" fontSize="10">85%</text>

// 皮肤指标面板
{showMetrics && (
  <g className="metrics-panel">
    <rect fill="rgba(0,0,0,0.5)" />
    {/* 水分、油脂、毛孔、敏感度指标 */}
  </g>
)}
```

---

### 3.2 工作流阶段设计

#### 3.2.1 五阶段流程

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Phase 1 │───▶│  Phase 2 │───▶│  Phase 3 │───▶│  Phase 4 │───▶│  Phase 5 │
│  面部识别 │    │  用户画像 │    │  AI搜索  │    │  步骤指导 │    │  实时反馈 │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
     │               │               │               │               │
     ▼               ▼               ▼               ▼               ▼
  皮肤分析        心情/场合        妆容匹配        化妆教程        问题检测
  指标检测        信息采集        趋势搜索        产品关联        购买建议
```

#### 3.2.2 Phase 1: 面部识别与皮肤分析

**布局结构:**
```
┌─────────────────────────────────────────────────────────────┐
│                    全宽智能镜                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │              SketchFace 组件                        │   │
│  │              (showScanLine, showMetrics)            │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    详细皮肤分析区域                          │
│  ┌──────────────┐  ┌────────────────────────────────────┐  │
│  │   综合评分    │  │         8项指标网格                │  │
│  │    85/100    │  │  水分│油脂│毛孔│敏感│弹性│光泽│纹理│均匀 │  │
│  └──────────────┘  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    问题区域分析                         │ │
│  │  T区 - 出油较多    │    脸颊 - 轻微干燥                │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    AI 护肤建议                          │ │
│  │  1. 建议使用控油妆前乳   2. 加强补水保湿              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**皮肤指标数据结构:**
```typescript
const skinMetrics = [
  { label: '水分度', value: 72, status: 'good', icon: Droplets },
  { label: '油脂平衡', value: 58, status: 'warning', icon: Sun },
  { label: '毛孔状态', value: 65, status: 'normal', icon: Circle },
  { label: '敏感度', value: 25, status: 'good', icon: Shield },
  { label: '弹性度', value: 78, status: 'good', icon: Zap },
  { label: '光泽度', value: 70, status: 'normal', icon: Sparkles },
  { label: '纹理', value: 68, status: 'normal', icon: Layers },
  { label: '均匀度', value: 75, status: 'good', icon: Palette },
];
```

#### 3.2.3 Phase 2: 用户画像采集

**采集维度:**
- 心情状态: 开心 / 平静 / 疲惫
- 生理周期: 正常期 / 经期 / 经前期
- 今日场合: 上班 / 约会 / 派对 / 休闲
- 天气环境: 温度 / 湿度 / 紫外线指数

#### 3.2.4 Phase 3: AI 智能搜索与匹配

**搜索过程动画:**
```typescript
const searchSteps = [
  { text: '分析您的肤色和肤质...', delay: 0 },
  { text: '搜索小红书热门妆容趋势...', delay: 800 },
  { text: '匹配适合混合肌的产品...', delay: 1600 },
  { text: '考虑职场场合需求...', delay: 2400 },
  { text: '生成个性化推荐...', delay: 3200 },
];
```

**推荐结果卡片:**
- 妆容名称 + 缩略图
- 匹配度评分 (如 95%)
- 推荐理由
- 点击查看详情

#### 3.2.5 Phase 4: 步骤化妆容指导

**布局结构:**
```
┌─────────────────────────────────────────────────────────────┐
│                    全宽智能镜                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              SketchFace 组件                        │   │
│  │              (showTransformation, highlightArea)    │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    步骤时间线 (横向滚动)                     │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐                   │
│  │ 1  │──│ 2  │──│ 3  │──│ 4  │──│ 5  │                   │
│  │底妆│  │眉毛│  │眼影│  │腮红│  │唇妆│                   │
│  └────┘  └────┘  └────┘  └────┘  └────┘                   │
├─────────────────────────────────────────────────────────────┤
│  当前步骤详情                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ 操作说明  │  │ 技巧提示  │  │ 关联产品  │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

**化妆步骤数据:**
```typescript
const makeupSteps = [
  {
    id: 1,
    title: '妆前打底',
    area: 'full_face',
    duration: 60,
    description: '使用妆前乳均匀涂抹全脸，轻拍至吸收',
    tips: ['由内向外推开', '少量多次', 'T区重点控油'],
    product: { name: '兰蔻妆前乳', brand: 'Lancôme' },
  },
  // ... 更多步骤
];
```

#### 3.2.6 Phase 5: 实时跟踪与反馈

**反馈类型:**
```typescript
type FeedbackSeverity = 'success' | 'warning' | 'error';

interface OperationFeedback {
  step: number;
  issue: string;
  suggestion: string;
  severity: FeedbackSeverity;
  area: string;
}

// 示例反馈
const feedbacks = [
  {
    step: 4,
    issue: '眼影晕染范围过小',
    suggestion: '建议向眼尾方向延伸，打造更深邃的眼型',
    severity: 'warning',
    area: 'eyeshadow',
  },
];
```

**产品警告:**
```typescript
interface ProductAlert {
  productName: string;
  alertType: 'low_quantity' | 'not_suitable' | 'expiring';
  remaining?: number;
  message: string;
  suggestedProduct?: string;
  price?: number;
}
```

---

## 四、动画系统设计

### 4.1 Framer Motion 动画

**扫描线动画:**
```tsx
<motion.line
  x1="50" x2="370"
  animate={{ y1: [60, 460], y2: [60, 460] }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "linear"
  }}
  stroke="url(#scanGradient)"
  strokeWidth="2"
/>
```

**区域引导脉冲:**
```tsx
<motion.ellipse
  animate={{
    strokeDashoffset: [0, 20],
    opacity: [0.6, 1, 0.6],
  }}
  transition={{
    strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" },
    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  }}
/>
```

**卡片入场动画:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
/>
```

### 4.2 SVG 滤镜效果

**手绘线条滤镜:**
```svg
<filter id="sketch-filter">
  <feTurbulence type="turbulence" baseFrequency="0.05"
    numOctaves="2" result="noise"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
</filter>
```

**玻璃反光效果:**
```svg
<linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
  <stop offset="50%" stopColor="rgba(255,255,255,0)" />
  <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
</linearGradient>
```

---

## 五、竞品分析模块

### 5.1 独立页面设计

竞品分析已从工作流演示中分离，作为独立模块存在于 `/demo/competition`。

### 5.2 CES 2026 竞品数据

```typescript
interface Competitor {
  id: string;
  name: string;
  brand: string;
  logo: string;
  tagline: string;
  price: string;
  releaseDate: string;
  highlights: string[];
  limitations: string[];
  targetAudience: string;
  aiCapabilities: string[];
  hardwareSpecs: {
    display: string;
    camera: string;
    processor: string;
    connectivity: string;
  };
  score: {
    ai: number;
    hardware: number;
    ecosystem: number;
    price: number;
    overall: number;
  };
}
```

### 5.3 竞争力矩阵

| 维度 | Samsung | L'Oréal | Panasonic | Amazon | AgenticMirror |
|------|---------|---------|-----------|--------|---------------|
| AI 能力 | 85 | 90 | 70 | 80 | 95 |
| 硬件规格 | 95 | 75 | 85 | 70 | 88 |
| 生态整合 | 90 | 85 | 65 | 95 | 92 |
| 价格竞争力 | 60 | 70 | 80 | 85 | 75 |

---

## 六、响应式设计

### 6.1 断点策略

```css
/* 移动端优先 */
@media (min-width: 640px)  { /* sm - 平板竖屏 */ }
@media (min-width: 768px)  { /* md - 平板横屏 */ }
@media (min-width: 1024px) { /* lg - 桌面端 */ }
@media (min-width: 1280px) { /* xl - 大屏桌面 */ }
```

### 6.2 智能镜响应式

```tsx
// SketchFace 响应式配置
<div className="w-full max-w-2xl mx-auto">
  <svg
    viewBox="0 0 420 520"
    className="w-full h-auto"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* SVG 内容 */}
  </svg>
</div>
```

---

## 七、数据流设计

### 7.1 状态管理

```typescript
// 页面级状态
const [currentPhase, setCurrentPhase] = useState(1);
const [isAutoPlaying, setIsAutoPlaying] = useState(false);
const [scanProgress, setScanProgress] = useState(0);
const [currentMakeupStep, setCurrentMakeupStep] = useState(1);

// 阶段切换逻辑
const handleNextPhase = () => {
  if (currentPhase < 5) {
    setCurrentPhase(currentPhase + 1);
  }
};

// 自动播放控制
useEffect(() => {
  if (isAutoPlaying) {
    const timer = setInterval(() => {
      setCurrentPhase(prev => prev < 5 ? prev + 1 : 1);
    }, 5000);
    return () => clearInterval(timer);
  }
}, [isAutoPlaying]);
```

### 7.2 Mock 数据结构

详见 `/lib/constants/mockData.ts`，包含：
- `mockSkinAnalysis` - 皮肤分析数据
- `mockUserContext` - 用户上下文
- `mockAISearchSteps` - AI 搜索步骤
- `mockMakeupSteps` - 化妆步骤
- `mockOperationFeedback` - 操作反馈
- `mockProductAlerts` - 产品警告
- `cesCompetitors` - CES 竞品数据

---

## 八、性能优化

### 8.1 SVG 优化

- 使用 `preserveAspectRatio` 保持比例
- 合理使用 `<defs>` 复用渐变和滤镜
- 避免过多的 `<filter>` 使用

### 8.2 动画优化

- 使用 `transform` 和 `opacity` 进行 GPU 加速
- 合理设置 `will-change` 属性
- 使用 `React.memo` 避免不必要的重渲染

### 8.3 代码分割

- 使用 Next.js 动态导入
- 按路由分割代码
- 延迟加载非关键组件

---

## 九、未来扩展

### 9.1 计划功能

- [ ] 真实摄像头集成
- [ ] AR 试妆效果
- [ ] 语音交互
- [ ] 多语言支持
- [ ] 深色模式

### 9.2 API 集成预留

- 皮肤分析 API 接口
- 产品推荐 API 接口
- 用户数据同步 API
- 电商平台对接 API

---

## 十、附录

### 10.1 配色方案

| 用途 | 颜色代码 | 说明 |
|------|---------|------|
| 品牌主色 | #E91E63 | 玫瑰粉 |
| 品牌辅色 | #9C27B0 | 紫色 |
| 成功状态 | #10B981 | 绿色 |
| 警告状态 | #F59E0B | 琥珀色 |
| 错误状态 | #EF4444 | 红色 |
| 镜框银色 | #C0C0C0 | 金属银 |

### 10.2 图标使用

使用 Lucide React 图标库：
- `Sparkles` - AI/智能
- `Camera` - 镜子/拍照
- `BarChart3` - 分析
- `Palette` - 妆容
- `ShoppingBag` - 购物
- `Trophy` - 竞品分析

### 10.3 相关文档

- [系统架构设计](./ARCHITECTURE.md)
- [UI/UX 设计规范](./UI_UX_DESIGN.md)
- [AI 系统设计](./AI_SYSTEM.md)
- [商业系统设计](./COMMERCE.md)
- [竞争力分析](./COMPETITIVENESS_FEASIBILITY.md)
