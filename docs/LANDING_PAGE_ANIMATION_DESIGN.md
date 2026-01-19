# Landing Page 动画优化设计文档

> 版本: 1.0.0
> 日期: 2025-01-19

---

## 一、需求概述

### 1.1 背景
当前首页已有基础的 Framer Motion 动画，但视觉冲击力不够强。需要增强动画效果以提升用户体验和转化率。

### 1.2 目标
1. **Hero 区域增强** - 添加 SketchFace 智能镜动画、粒子效果、数字跳动
2. **视差滚动** - 多层次背景滚动效果，增强深度感
3. **卡片交互** - 3D 翻转、光晕追踪、微动效果

---

## 二、技术方案

### 2.1 技术选型
- **Framer Motion** - 主动画库（已有）
- **CSS Transform** - 3D 效果
- **IntersectionObserver** - 滚动触发（Framer Motion 内置）
- **requestAnimationFrame** - 高性能动画

### 2.2 架构设计

```
components/
├── landing/
│   ├── HeroSection.tsx         # Hero 区域（含 SketchFace）
│   ├── AnimatedCounter.tsx     # 数字跳动组件
│   ├── ParticleBackground.tsx  # 粒子背景
│   ├── ParallaxSection.tsx     # 视差滚动容器
│   ├── TiltCard.tsx            # 3D 倾斜卡片
│   └── GlowEffect.tsx          # 光晕追踪效果
```

---

## 三、详细设计

### 3.1 Hero 区域增强

#### 3.1.1 SketchFace 智能镜动画
- 在 Hero 区域添加 SketchFace 组件作为主视觉
- 配置 `scanMode` 自动循环扫描动画
- 显示实时皮肤指标数据

#### 3.1.2 数字跳动动画 (AnimatedCounter)
```typescript
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}
```
- 用于展示 "50,000+ 用户"、"4.9 评分" 等数据
- 滚动进入视口时触发
- 缓动函数：easeOutExpo

#### 3.1.3 粒子背景 (ParticleBackground)
- 浮动粒子效果（粉色、紫色渐变）
- 鼠标交互：粒子跟随/躲避
- 性能优化：限制粒子数量，使用 CSS transform

### 3.2 视差滚动 (Parallax)

#### 3.2.1 实现方式
```typescript
const scrollY = useScroll();
const y = useTransform(scrollY, [0, 1000], [0, -200]);
```

#### 3.2.2 应用区域
| 区域 | 效果 |
|------|------|
| Hero 背景 | 慢速下移（0.3x） |
| Features 背景装饰 | 反向移动 |
| Tech Specs | 渐变遮罩滚动 |

### 3.3 卡片悬停交互

#### 3.3.1 TiltCard 3D 倾斜
```typescript
interface TiltCardProps {
  children: React.ReactNode;
  maxTilt?: number;      // 最大倾斜角度，默认 10
  scale?: number;        // 悬停缩放，默认 1.02
  perspective?: number;  // 透视距离，默认 1000
}
```
- 鼠标位置映射到 rotateX/rotateY
- 添加高光层随鼠标移动

#### 3.3.2 GlowEffect 光晕追踪
- 渐变圆形光晕
- 跟随鼠标位置
- 模糊半径动态变化

---

## 四、实现计划

### 4.1 开发步骤

1. **创建动画组件**
   - AnimatedCounter.tsx
   - ParticleBackground.tsx
   - TiltCard.tsx

2. **修改首页**
   - 重构 Hero 区域，集成 SketchFace
   - 添加视差滚动
   - Features 卡片使用 TiltCard

3. **性能优化**
   - 懒加载非首屏动画
   - 使用 will-change 优化 GPU 渲染
   - 移动端降级处理

### 4.2 文件变更清单

| 文件 | 操作 |
|------|------|
| `components/landing/AnimatedCounter.tsx` | 新增 |
| `components/landing/ParticleBackground.tsx` | 新增 |
| `components/landing/TiltCard.tsx` | 新增 |
| `app/page.tsx` | 修改 |

---

## 五、预期效果

1. **Hero 区域**：SketchFace 智能镜实时扫描动画 + 粒子飘浮 + 数字跳动
2. **滚动体验**：多层视差效果，增强沉浸感
3. **卡片交互**：悬停 3D 倾斜 + 光晕追踪，提升互动性
4. **性能**：60fps 流畅动画，移动端友好

---

*设计完成时间：2025-01-19*
