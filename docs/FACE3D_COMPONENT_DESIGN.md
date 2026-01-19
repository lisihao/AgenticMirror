# Face3D 组件设计文档

> 版本: 1.0.0 | 日期: 2025-01-19

## 一、需求概述

### 1.1 背景

AgenticMirror 智能美妆镜需要一个逼真的 3D 人脸渲染组件，用于：
- 技术展示页面的妆容预览演示
- 用户交互时的视觉反馈
- 智能化妆笔的绘制目标

### 1.2 需求列表

| 需求ID | 需求描述 | 优先级 |
|--------|----------|--------|
| F3D-01 | 渲染逼真的女性面部轮廓 | P0 |
| F3D-02 | 支持多层妆容叠加（底妆/眼妆/腮红/唇妆/修容） | P0 |
| F3D-03 | 支持耳朵和耳饰渲染 | P1 |
| F3D-04 | 支持长发造型渲染 | P1 |
| F3D-05 | 支持脸型自定义（捏脸） | P1 |
| F3D-06 | 支持鼠标拖动旋转 3D 视角 | P2 |

### 1.3 用户故事

- 作为用户，我希望看到一个美观逼真的 3D 人脸，而不是简单的椭圆形状
- 作为用户，我希望能够看到不同妆容层次的效果
- 作为用户，我希望能够调整脸型参数，预览不同脸型的妆容效果
- 作为用户，我希望能够选择不同的耳饰样式

## 二、技术方案

### 2.1 技术选型

| 方案 | 优点 | 缺点 | 选择 |
|------|------|------|------|
| Three.js WebGL | 真正的 3D 渲染 | 包体积大，学习曲线陡 | 否 |
| CSS 3D Transform | 轻量，兼容性好 | 仅支持简单 3D 效果 | 否 |
| **SVG + CSS Transform** | 轻量，矢量清晰，易于控制 | 非真正 3D | **是** |

**选择理由**：SVG 提供矢量图形的清晰度和可编程性，CSS Transform 提供 3D 透视效果，两者结合既能实现视觉上的 3D 感，又保持轻量和易维护。

### 2.2 架构设计

```
Face3D Component
├── SVG 渲染层
│   ├── Defs (渐变/滤镜定义)
│   ├── Hair Layer (头发)
│   ├── Ears Layer (耳朵 + 耳饰)
│   ├── Face Contour (面部轮廓)
│   ├── Makeup Layers (妆容层)
│   │   ├── Foundation (底妆)
│   │   ├── Eyeshadow (眼影)
│   │   ├── Blush (腮红)
│   │   └── Contour (修容)
│   ├── Features Layer (五官)
│   │   ├── Eyebrows (眉毛)
│   │   ├── Eyes (眼睛)
│   │   ├── Nose (鼻子)
│   │   └── Lips (嘴唇)
│   └── Highlights (高光)
├── CSS 3D Transform 容器
│   └── perspective + rotateX/Y
└── React State 管理
    ├── makeupLayer (妆容层级)
    ├── rotation (旋转角度)
    ├── earringStyle (耳饰样式)
    └── faceParams (脸型参数)
```

### 2.3 数据流

```
Props (makeupLayer)
    ↓
State 计算 (rotation, isDragging)
    ↓
SVG 渲染 (条件渲染妆容层)
    ↓
CSS Transform (3D 透视)
    ↓
用户交互 (鼠标拖动)
    ↓
State 更新 → 重新渲染
```

## 三、详细设计

### 3.1 组件接口

```typescript
interface Face3DProps {
  makeupLayer?: number;  // 妆容层级 0-4
}

// 内部状态
interface Face3DState {
  rotation: { x: number; y: number };  // 3D 旋转角度
  isDragging: boolean;                  // 是否正在拖动
  earringStyle: EarringStyle;           // 耳饰样式
  faceParams: FaceParams;               // 脸型参数
}

type EarringStyle = 'none' | 'pearl' | 'diamond' | 'gold_hoop' | 'tassel';

interface FaceParams {
  faceWidth: number;      // 脸宽 0.8-1.2
  eyeSize: number;        // 眼睛大小 0.8-1.2
  eyeDistance: number;    // 眼距 0.9-1.1
  lipFullness: number;    // 唇部丰满度 0.8-1.2
}
```

### 3.2 SVG 结构设计

#### 3.2.1 渐变和滤镜定义

```xml
<defs>
  <!-- 肤色渐变 -->
  <radialGradient id="skinGradient" cx="40%" cy="35%" r="70%">
    <stop offset="0%" stopColor="#fff0e8" />   <!-- 高光区 -->
    <stop offset="50%" stopColor="#fdd5c0" />  <!-- 中间色 -->
    <stop offset="100%" stopColor="#f5c4a8" /> <!-- 阴影区 -->
  </radialGradient>

  <!-- 妆容渐变 -->
  <radialGradient id="eyeshadowGradient">...</radialGradient>
  <radialGradient id="blushGradient">...</radialGradient>
  <linearGradient id="lipGradient">...</linearGradient>

  <!-- 模糊滤镜 -->
  <filter id="blur"><feGaussianBlur stdDeviation="3" /></filter>
</defs>
```

#### 3.2.2 面部轮廓（贝塞尔曲线）

```xml
<!-- 使用贝塞尔曲线绘制自然脸型 -->
<path d="M 100 30
         C 145 30, 165 70, 165 110
         C 165 150, 155 180, 140 200
         Q 120 225, 100 230
         Q 80 225, 60 200
         C 45 180, 35 150, 35 110
         C 35 70, 55 30, 100 30"
      fill="url(#skinGradient)" />
```

#### 3.2.3 长发造型（多层叠加）

```xml
<!-- 底层深色 -->
<path d="M 15 90 C 5 120, 0 180, 10 240..." fill="#1a1209" />
<!-- 中层棕色 -->
<path d="M 20 95 C 12 125, 8 175, 15 230..." fill="#2d1f14" />
<!-- 刘海层 -->
<path d="M 45 75 C 50 55, 75 40, 100 40..." fill="#2d1f14" />
```

#### 3.2.4 五官细节

**眼睛结构**：
- 眼白（椭圆）
- 虹膜（圆形 + 渐变）
- 瞳孔（深色圆形）
- 高光点（白色小圆）
- 眼线（贝塞尔曲线）

**鼻子结构**：
- 鼻梁高光
- 鼻翼阴影
- 鼻头
- 鼻孔暗示

**嘴唇结构**：
- 上唇（M 形贝塞尔曲线）
- 下唇（弧形）
- 唇珠高光

### 3.3 耳饰系统

```typescript
const earringStyles = {
  none: null,
  pearl: {
    type: 'circle',
    color: '#fef3c7',
    size: 4,
    gradient: 'pearlGradient'
  },
  diamond: {
    type: 'polygon',
    color: '#e0f2fe',
    points: '0,-5 3,0 0,5 -3,0',
    filter: 'sparkle'
  },
  gold_hoop: {
    type: 'circle',
    stroke: '#fbbf24',
    strokeWidth: 1.5,
    fill: 'none',
    size: 8
  },
  tassel: {
    type: 'path',
    color: '#ec4899',
    path: 'M 0,0 L 0,15 M -2,0 L -3,12 M 2,0 L 3,12'
  }
};
```

### 3.4 脸型自定义参数

| 参数 | 默认值 | 范围 | 影响区域 |
|------|--------|------|----------|
| faceWidth | 1.0 | 0.8-1.2 | 面部轮廓宽度 |
| eyeSize | 1.0 | 0.8-1.2 | 眼睛整体缩放 |
| eyeDistance | 1.0 | 0.9-1.1 | 两眼间距 |
| lipFullness | 1.0 | 0.8-1.2 | 嘴唇厚度 |

### 3.5 3D 交互

```typescript
// 鼠标拖动旋转
const handleMouseMove = (e: React.MouseEvent) => {
  if (!isDragging) return;
  const deltaX = e.clientX - lastPos.x;
  const deltaY = e.clientY - lastPos.y;
  setRotation({
    x: clamp(rotation.x + deltaY * 0.5, -30, 30),
    y: clamp(rotation.y + deltaX * 0.5, -45, 45)
  });
};

// CSS Transform 应用
<div style={{
  transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
  transformStyle: 'preserve-3d'
}}>
```

## 四、实现计划

### 4.1 已完成功能

| 功能 | 状态 | 提交 |
|------|------|------|
| 基础面部轮廓（贝塞尔曲线） | ✅ 完成 | fix: Improve Face3D aesthetics |
| 详细五官（眼睛/眉毛/鼻子/嘴唇） | ✅ 完成 | fix: Improve Face3D aesthetics |
| 耳朵渲染 | ✅ 完成 | fix: Add ears and disable auto-rotation |
| 耳饰系统（5种样式） | ✅ 完成 | feat: Add earrings and face customization |
| 脸型自定义滑块 | ✅ 完成 | feat: Add earrings and face customization |
| 长发造型 | ✅ 完成 | style: Add long flowing hair |
| 鼻子细节优化 | ✅ 完成 | style: Add long flowing hair |
| 禁用自动旋转 | ✅ 完成 | fix: Add ears and disable auto-rotation |
| 妆容层级切换 | ✅ 完成 | 初始实现 |
| 鼠标拖动旋转 | ✅ 完成 | 初始实现 |

### 4.2 文件清单

| 文件 | 说明 |
|------|------|
| `web/frontend/components/3d/Face3D.tsx` | 主组件文件 |
| `web/frontend/app/demo/technology/page.tsx` | 使用组件的页面 |

## 五、测试要点

1. **视觉测试**：面部比例是否自然，五官位置是否协调
2. **妆容测试**：不同妆容层级切换是否平滑
3. **交互测试**：鼠标拖动旋转是否流畅
4. **参数测试**：脸型参数调整是否实时生效
5. **耳饰测试**：5 种耳饰样式是否正确渲染

## 六、后续优化方向

1. 添加更多发型选择
2. 支持肤色选择
3. 添加眼镜/美瞳等配饰
4. 支持导出渲染结果为图片
