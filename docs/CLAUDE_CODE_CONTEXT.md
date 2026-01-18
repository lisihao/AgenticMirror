# Claude Code 开发上下文

> 本文档用于帮助新的 Claude Code 会话快速理解项目状态，继续开发工作。
> **重要**: 每次开发后请更新此文档！

---

## 快速入门

### 项目是什么？

**Agentic Mirror** 是一个 AI 智能美妆镜产品，包含：
- 硬件设备 (智能镜子)
- Web 前端 (Next.js)
- 后端 API (FastAPI - 开发中)
- Mobile App (Flutter - 未开始)

### 当前开发重点

**Web 前端 Demo** - 位于 `/web/frontend/`

### 如何启动

```bash
cd /Users/sihaoli/AgenticMirror/web/frontend
npm install
npm run dev
# 访问 http://localhost:3000/demo
```

---

## 项目结构

```
AgenticMirror/
├── docs/                    # 文档目录
│   ├── ARCHITECTURE.md      # 系统架构
│   ├── COMMERCE.md          # 电商平台设计
│   ├── WEB_FRONTEND_DESIGN.md  # 前端详细设计 ⭐ 主要参考
│   ├── CHANGELOG.md         # 开发日志
│   └── CLAUDE_CODE_CONTEXT.md  # 本文档
│
├── web/
│   ├── frontend/            # Next.js 前端 ⭐ 当前开发重点
│   │   ├── app/demo/        # Demo 页面
│   │   ├── components/      # React 组件
│   │   ├── contexts/        # React Context
│   │   └── lib/             # 工具/常量
│   │
│   └── backend/             # FastAPI 后端 (开发中)
│
└── docker-compose.yml       # Docker 配置
```

---

## 已完成功能

### Web 前端页面 (全部已完成 ✅)

| 路由 | 功能 |
|------|------|
| `/demo/workflow` | 完整工作流演示 |
| `/demo/companion` | AI 陪伴聊天 |
| `/demo/competition` | 竞品分析 |
| `/demo/investment` | 投资分析 |
| `/demo/mirror` | 魔镜体验 |
| `/demo/analysis` | 皮肤分析 |
| `/demo/recommendations` | 妆容推荐 |
| `/demo/styling` | 穿搭指导 |
| `/demo/tutorials` | 美妆教程 |
| `/demo/commerce` | 智能购物 |
| `/demo/smart-buy` | AI 购买计划 ⭐ 新功能 |
| `/demo/product/[id]` | 产品详情 + AI 比价 |
| `/demo/cart` | 购物车 |
| `/demo/checkout` | 结算页 |
| `/demo/orders` | 订单列表 |
| `/demo/inventory` | 我的库存 |
| `/demo/dashboard` | 个人中心 |

### AI 智能购物 (最新开发)

**组件目录**: `/web/frontend/components/shopping/`

| 组件 | 功能 |
|------|------|
| `PriceHistoryChart.tsx` | 价格走势图 (Recharts) |
| `PriceComparisonCard.tsx` | 全网比价 (淘宝/京东/拼多多) |
| `AIBuyAdvice.tsx` | AI 购买建议 |
| `PurchasePlanCard.tsx` | 智能购买计划 |
| `PlatformBadge.tsx` | 平台标识 |

**数据文件**: `/web/frontend/lib/constants/shoppingData.ts`

---

## 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 14 | React 框架 (App Router) |
| TypeScript | 类型安全 |
| Tailwind CSS | 样式 |
| Framer Motion | 动画 |
| Recharts | 图表 |
| Lucide React | 图标 |

---

## 代码规范

### 组件编写

```tsx
'use client';  // 如需客户端功能

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface MyComponentProps {
  title: string;
  className?: string;
}

export function MyComponent({ title, className }: MyComponentProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-gray-900',  // 支持暗色模式
      className
    )}>
      {title}
    </div>
  );
}
```

### 添加新页面

1. 在 `app/demo/` 创建目录
2. 创建 `page.tsx`
3. 在 `components/layout/DemoSidebar.tsx` 添加菜单项

### Mock 数据

- 位置: `lib/constants/`
- 格式: TypeScript 接口 + 导出数据

---

## 待开发任务

### 优先级高

- [ ] 后端 API 开发
- [ ] 数据库设计
- [ ] 用户认证
- [ ] 替换 Mock 数据为真实 API

### 优先级中

- [ ] 支付集成
- [ ] 价格监控系统
- [ ] AI 模型对接

### 优先级低

- [ ] PWA 支持
- [ ] Mobile App

---

## 常用命令

```bash
# 启动开发服务器
npm run dev

# TypeScript 检查
npx tsc --noEmit

# 构建
npm run build

# Git 操作
git status
git add .
git commit -m "描述"
git push
```

---

## 重要文件

| 文件 | 说明 |
|------|------|
| `app/demo/layout.tsx` | Demo 布局 (侧边栏) |
| `components/layout/DemoSidebar.tsx` | 导航菜单 |
| `lib/constants/mockData.ts` | 产品 Mock 数据 |
| `lib/constants/shoppingData.ts` | AI 购物 Mock 数据 |
| `contexts/CartContext.tsx` | 购物车状态 |

---

## 注意事项

1. **暗色模式**: 所有组件需支持 `dark:` 类名
2. **TypeScript**: 确保类型正确，运行 `npx tsc --noEmit`
3. **Mock 数据**: 当前使用静态数据，后续需替换为 API
4. **中文 UI**: 用户界面使用中文

---

*最后更新: 2025-01-18*
*更新内容: AI 智能购物系统完成*
