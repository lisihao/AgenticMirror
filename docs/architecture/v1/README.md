# AgenticMirror V1 架构设计基线文档

> 版本: 1.0.0
> 创建日期: 2024-01-17
> 状态: 基线锁定

---

## 目录

1. [系统概述](#1-系统概述)
2. [技术栈](#2-技术栈)
3. [系统架构图](#3-系统架构图)
4. [功能模块设计](#4-功能模块设计)
5. [数据模型设计](#5-数据模型设计)
6. [页面路由设计](#6-页面路由设计)
7. [组件设计](#7-组件设计)
8. [AI 能力设计](#8-ai-能力设计)
9. [电商系统设计](#9-电商系统设计)
10. [已知限制](#10-已知限制)

---

## 1. 系统概述

AgenticMirror 是一款 AI 驱动的智能美妆镜产品演示系统，通过多模态 AI 技术实现：

- **皮肤实时分析**：基于计算机视觉的皮肤状态检测
- **个性化推荐**：结合用户画像、行程、天气的妆容推荐
- **Agentic Commerce**：搜推广一体化的智能电商体验
- **情感化交互**：机械臂 + 语音的拟人化陪伴

### 1.1 产品定位

| 维度 | 描述 |
|------|------|
| 目标用户 | 都市女性（25-40岁），注重护肤与化妆 |
| 核心价值 | AI 让美妆变得简单、科学、个性化 |
| 产品形态 | 智能硬件（镜子）+ 软件（App/Web） |
| 定价策略 | Lite ¥2,999 / Pro ¥4,999 / Ultra ¥7,999 |

### 1.2 版本范围

V1 版本实现以下核心功能：
- 11 个演示页面
- 皮肤分析与健康数据集成
- AI 妆容推荐与 3D 预览
- 衣橱管理与搜推广电商
- AI 陪伴与游戏化激励

---

## 2. 技术栈

### 2.1 前端技术

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 14.2.0 | React 框架，App Router |
| React | 18.x | UI 库 |
| TypeScript | 5.x | 类型系统 |
| Tailwind CSS | 3.x | 原子化 CSS |
| Framer Motion | 11.x | 动画库 |
| Lucide React | - | 图标库 |
| Recharts | - | 图表库 |

### 2.2 后端技术（规划）

| 技术 | 用途 |
|------|------|
| FastAPI | Python API 服务 |
| PostgreSQL | 关系型数据库 |
| Redis | 缓存 |
| Celery | 异步任务 |

### 2.3 AI 技术栈

| 模型 | 用途 |
|------|------|
| YOLOv8 | 皱纹实时检测 |
| U-Net + Attention | 毛孔/皱纹分割 |
| EfficientNet-B4 | 皮肤病变检测 |
| 3D ResNet-18 | 皮肤年龄预测 |
| GAN + Diffusion | 妆容生成（规划） |

---

## 3. 系统架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                        用户界面层 (Next.js)                       │
├─────────────────────────────────────────────────────────────────┤
│  Dashboard │ Mirror │ Analysis │ Recommendations │ Styling     │
│  Commerce  │ Inventory │ Tutorials │ Workflow │ Companion      │
├─────────────────────────────────────────────────────────────────┤
│                        组件层 (React Components)                  │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│   Layout     │   Workflow   │   Workbench  │   Common           │
│  DemoSidebar │  SketchFace  │  AgentPanel  │   Cards/Buttons    │
│  DemoLayout  │  SketchAI    │  ChatPanel   │   Charts/Progress  │
├──────────────┴──────────────┴──────────────┴────────────────────┤
│                        状态管理层 (React State)                   │
│               useState / useEffect / Context                     │
├─────────────────────────────────────────────────────────────────┤
│                        数据层 (Mock Data)                         │
│    mockAnalysis │ mockProducts │ mockStyles │ mockInventory     │
├─────────────────────────────────────────────────────────────────┤
│                        API 层 (规划中)                            │
│              REST API │ WebSocket │ GraphQL                      │
├─────────────────────────────────────────────────────────────────┤
│                        AI 服务层 (规划中)                         │
│       皮肤分析 │ 妆容推荐 │ 3D 渲染 │ 视频生成                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. 功能模块设计

### 4.1 模块概览

| 模块 | 路由 | 核心功能 | 状态 |
|------|------|----------|------|
| Dashboard | /demo/dashboard | 个人中心首页 | ✅ 完成 |
| Mirror | /demo/mirror | 实时面部扫描 | ✅ 完成 |
| Analysis | /demo/analysis | 深度皮肤分析 | ✅ 完成 |
| Recommendations | /demo/recommendations | AI 妆容推荐 | ✅ 完成 |
| Styling | /demo/styling | AI 穿搭指导 | ✅ 完成 |
| Commerce | /demo/commerce | 智能购物 | ✅ 完成 |
| Inventory | /demo/inventory | 库存管理 | ✅ 完成 |
| Tutorials | /demo/tutorials | 美妆教程 | ✅ 完成 |
| Workflow | /demo/workflow | 工作流演示 | ✅ 完成 |
| Companion | /demo/companion | AI 陪伴体验 | ✅ 完成 |
| Competition | /demo/competition | 竞争分析 | ✅ 完成 |
| Investment | /demo/investment | 投资分析 | ✅ 完成 |

### 4.2 模块关联图

```
                    ┌─────────────┐
                    │  Dashboard  │
                    └──────┬──────┘
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
    ┌─────────┐      ┌──────────┐      ┌───────────┐
    │ Mirror  │──────│ Analysis │──────│Recommend- │
    └────┬────┘      └──────────┘      │  ations   │
         │                              └─────┬─────┘
         │                                    │
         ▼                                    ▼
    ┌─────────┐                         ┌──────────┐
    │Inventory│◄────────────────────────│ Commerce │
    └─────────┘                         └──────────┘
         │                                    │
         ▼                                    ▼
    ┌─────────┐                         ┌──────────┐
    │Companion│◄────────────────────────│ Styling  │
    └─────────┘                         └──────────┘
```

---

## 5. 数据模型设计

### 5.1 用户模型 (demoUser)

```typescript
interface User {
  name: string;
  skinType: '干性' | '油性' | '混合' | '敏感';
  skinConcerns: string[];
  preferences: {
    style: string;
    colors: string[];
    brands: string[];
  };
  consecutiveDays: number;
}
```

### 5.2 皮肤分析模型 (mockAnalysis)

```typescript
interface SkinAnalysis {
  overallScore: number;
  metrics: {
    hydration: number;
    oilBalance: number;
    poreCondition: number;
    sensitivity: number;
    wrinkles: number;
    pigmentation: number;
    elasticity: number;
    texture: number;
  };
  problemAreas: Array<{
    area: string;
    issue: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  recommendations: string[];
}
```

### 5.3 产品模型 (mockProducts)

```typescript
interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'skincare' | 'makeup' | 'tools';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  aiRecommendReason?: string;
  matchScore?: number;
}
```

### 5.4 妆容风格模型 (mockStyles)

```typescript
interface MakeupStyle {
  id: string;
  name: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: number; // 分钟
  occasion: string;
  products: string[]; // 产品 ID
  steps: MakeupStep[];
  colorPalette: string[];
}
```

### 5.5 衣橱模型

```typescript
interface WardrobeItem {
  id: string;
  name: string;
  category: '上装' | '下装' | '裙装' | '外套' | '鞋子' | '配饰';
  color: string;
  colorHex: string;
  brand: string;
  image: string;
  purchaseDate: string;
  wearCount: number;
}

interface WardrobeAnalysis {
  totalItems: number;
  categories: Array<{ name: string; count: number; ratio: number }>;
  colorDistribution: Array<{ color: string; hex: string; percent: number }>;
  suggestions: string[];
  matchPossibilities: number;
}
```

### 5.6 色彩诊断模型

```typescript
interface PersonalColorDiagnosis {
  skinAnalysis: {
    undertone: 'warm' | 'cool' | 'neutral';
    depth: 'light' | 'light-medium' | 'medium' | 'medium-deep' | 'deep';
    clarity: 'clear' | 'soft';
  };
  seasonType: {
    type: 'spring' | 'summer' | 'autumn' | 'winter';
    subType: string; // e.g., 'soft-autumn'
    label: string;
    description: string;
  };
  confidence: number;
}
```

---

## 6. 页面路由设计

```
/demo
├── layout.tsx .................. Demo 布局（含 DemoSidebar）
├── dashboard/page.tsx ........... 仪表板首页
├── mirror/page.tsx ............. 魔镜体验
├── analysis/page.tsx ........... 深度分析（暗黑模式）
├── recommendations/page.tsx .... AI 推荐系统
├── styling/page.tsx ............ AI 穿搭指导
├── commerce/page.tsx ........... 电商购物
├── inventory/page.tsx .......... 库存管理
├── tutorials/page.tsx .......... 教程库
├── tutorials/[id]/page.tsx ..... 教程详情（占位）
├── workflow/page.tsx ........... 工作流演示
├── companion/page.tsx .......... AI 陪伴体验
├── competition/page.tsx ........ 竞争分析
└── investment/page.tsx ......... 投资分析
```

---

## 7. 组件设计

### 7.1 布局组件

| 组件 | 路径 | 功能 |
|------|------|------|
| DemoSidebar | /components/layout/DemoSidebar.tsx | Demo 侧边导航 |
| Sidebar | /components/layout/Sidebar.tsx | 主应用侧边栏 |

### 7.2 工作流组件

| 组件 | 路径 | 功能 |
|------|------|------|
| SketchFace | /components/workflow/SketchFace.tsx | 手绘风格面部图 |
| SketchAIBrain | /components/workflow/SketchAIBrain.tsx | AI 大脑可视化 |
| PhaseIndicator | /components/workflow/PhaseIndicator.tsx | 阶段指示器 |
| UserContextPanel | /components/workflow/UserContextPanel.tsx | 用户上下文面板 |
| StepGuidePanel | /components/workflow/StepGuidePanel.tsx | 步骤指导面板 |
| FeedbackPanel | /components/workflow/FeedbackPanel.tsx | 反馈面板 |
| ProductAlertCard | /components/workflow/ProductAlertCard.tsx | 产品警告卡片 |

### 7.3 工作台组件

| 组件 | 路径 | 功能 |
|------|------|------|
| AgentDetailPanel | /components/workbench/AgentDetailPanel.tsx | Agent 详情面板 |

---

## 8. AI 能力设计

### 8.1 皮肤分析 AI

```
输入: 面部图像 (RGB)
├── YOLOv8 ────────────────► 皱纹检测 (边界框)
├── U-Net + Attention ─────► 毛孔/皱纹分割 (语义图)
├── EfficientNet-B4 ───────► 皮肤病变检测 (分类)
└── 3D ResNet-18 ──────────► 皮肤年龄预测 (回归)
输出: SkinAnalysis 对象
```

### 8.2 妆容推荐 AI

```
输入:
├── 用户画像 (skinType, preferences)
├── 今日行程 (schedule)
├── 天气数据 (weather)
└── 心情/生理期 (context)

处理:
├── Agent 1: 小红书趋势爬取
├── Agent 2: 抖音热门匹配
├── Agent 3: 用户历史偏好分析
├── Agent 4: 肤色-妆容匹配
└── Agent 5: 场景适配评分

输出: AI 推荐妆容列表 (排序 + 理由)
```

### 8.3 色彩诊断 AI

```
输入: 面部图像 + 穿着图像

分析维度:
├── 肤色底色 (warm/cool/neutral)
├── 肤色深浅 (5级)
├── 肤色清晰度 (clear/soft)
└── 发色/眼色匹配

输出:
├── 四季色彩类型 (spring/summer/autumn/winter)
├── 细分类型 (e.g., soft-autumn)
├── 最佳色彩色卡
├── 避免色彩列表
└── 置信度分数
```

---

## 9. 电商系统设计

### 9.1 搜推广一体化架构

```
┌─────────────────────────────────────────────────────────────┐
│                     Agentic Commerce                        │
├─────────────────┬─────────────────┬─────────────────────────┤
│       搜        │       推        │           广            │
│  (Voice Search) │ (AI Recommend)  │   (Native Ads)          │
├─────────────────┼─────────────────┼─────────────────────────┤
│ • 语音输入      │ • 衣橱缺口分析  │ • AI 优选标签           │
│ • 自然语言理解  │ • 行程关联推荐  │ • 品牌精选专区          │
│ • 多平台搜索    │ • 天气驱动推荐  │ • 专属优惠展示          │
│ • AI 匹配排序   │ • 趋势匹配推荐  │ • 融入场景不突兀        │
└─────────────────┴─────────────────┴─────────────────────────┘
```

### 9.2 数据源集成

| 平台 | 数据类型 |
|------|----------|
| 天猫 | 产品、价格、销量 |
| 京东 | 产品、配送、评价 |
| 小红书 | 趋势、笔记、同款 |
| 得物 | 潮流、真伪、价格 |
| 品牌官网 | 新品、限量、会员价 |

### 9.3 推荐策略

| 策略类型 | 触发条件 | 权重 |
|----------|----------|------|
| 衣橱缺口 | 分析衣橱颜色/品类分布 | 30% |
| 行程匹配 | 日历事件类型 | 25% |
| 天气适配 | 温度/湿度/紫外线 | 15% |
| 趋势热点 | 小红书/抖音热搜 | 15% |
| 个人偏好 | 历史购买/浏览 | 15% |

---

## 10. 已知限制

### 10.1 功能限制

| 限制项 | 描述 | 影响 |
|--------|------|------|
| 无购物车 | 缺少购物车页面和结算流程 | 电商闭环不完整 |
| 无订单系统 | 缺少订单历史和追踪 | 用户无法查看购买记录 |
| 无产品详情页 | 产品信息展示不完整 | 用户决策信息不足 |
| 教程详情占位 | tutorials/[id] 未实现 | 教程无法深入学习 |
| 主题不统一 | Analysis 暗黑模式与其他不一致 | 视觉体验割裂 |

### 10.2 技术限制

| 限制项 | 描述 |
|--------|------|
| 纯前端 Mock | 无真实后端服务 |
| 无状态持久化 | 刷新后数据丢失 |
| 无用户认证 | 无登录/注册系统 |
| 无实时通信 | 无 WebSocket 支持 |

### 10.3 数据限制

| 限制项 | 描述 |
|--------|------|
| 产品无库存 | 缺少 SKU/库存量字段 |
| 无配送信息 | 缺少运费/时效字段 |
| 无优惠券 | 缺少促销规则数据 |
| 无用户行为 | 缺少浏览/点击记录 |

---

## 附录

### A. 文件结构

```
/Users/sihaoli/AgenticMirror/
├── docs/
│   └── architecture/
│       └── v1/
│           ├── README.md (本文档)
│           ├── data-models.md
│           ├── api-design.md
│           └── component-specs.md
├── web/
│   ├── frontend/
│   │   ├── app/
│   │   │   └── demo/
│   │   ├── components/
│   │   └── lib/
│   └── backend/
└── docker-compose.yml
```

### B. 版本历史

| 版本 | 日期 | 描述 |
|------|------|------|
| 1.0.0 | 2024-01-17 | V1 基线锁定 |

---

*文档结束*
