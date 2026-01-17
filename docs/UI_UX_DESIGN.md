# AgenticMirror UI/UX 设计规范

## 1. 设计理念

### 1.1 设计原则
- **简约优雅**: 界面清爽，突出核心功能
- **专业可信**: 传达 AI 技术的专业性和准确性
- **温暖亲近**: 美妆场景需要温柔、有亲和力的视觉风格
- **高效直观**: 用户能快速理解和使用各项功能

### 1.2 目标用户画像
- 18-45 岁女性
- 关注美妆和护肤
- 追求便捷和个性化
- 对新技术有接受度

## 2. 品牌视觉

### 2.1 色彩系统

```css
/* 主色调 */
--mirror-primary: #E91E63;    /* 玫瑰粉 - 主品牌色 */
--mirror-secondary: #9C27B0;  /* 紫色 - 强调色 */
--mirror-gold: #FFD700;       /* 金色 - 高级感 */

/* 渐变 */
--gradient-mirror: linear-gradient(135deg, #E91E63 0%, #9C27B0 100%);

/* 功能色 */
--status-success: #22C55E;    /* 成功/良好 */
--status-warning: #F59E0B;    /* 警告/注意 */
--status-error: #EF4444;      /* 错误/紧急 */
--status-info: #3B82F6;       /* 信息 */

/* 中性色 */
--gray-50: #FAFAFA;           /* 背景 */
--gray-100: #F5F5F5;          /* 卡片背景 */
--gray-200: #E5E5E5;          /* 边框 */
--gray-400: #9CA3AF;          /* 次要文字 */
--gray-600: #525252;          /* 正文 */
--gray-900: #171717;          /* 标题 */
```

### 2.2 字体系统

```css
/* 中文主字体 */
font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;

/* 英文/数字 */
font-family: 'Inter', system-ui, sans-serif;

/* 装饰性标题 */
font-family: 'Playfair Display', serif;
```

**字号规范**:
- 大标题: 48px / 40px
- 页面标题: 24px
- 卡片标题: 18px
- 正文: 14px / 16px
- 辅助文字: 12px

### 2.3 圆角规范

```css
--radius-sm: 8px;    /* 小组件 */
--radius-md: 12px;   /* 卡片 */
--radius-lg: 16px;   /* 大卡片 */
--radius-xl: 24px;   /* 特殊组件 */
--radius-full: 9999px; /* 圆形/胶囊 */
```

### 2.4 阴影规范

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-glow: 0 0 20px rgba(233, 30, 99, 0.3);
```

## 3. 组件规范

### 3.1 按钮

**主按钮 (Primary)**
```css
.btn-primary {
    background: var(--gradient-mirror);
    color: white;
    padding: 12px 24px;
    border-radius: var(--radius-full);
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(233, 30, 99, 0.25);
}
```

**次要按钮 (Secondary)**
```css
.btn-secondary {
    background: white;
    color: var(--mirror-primary);
    border: 2px solid var(--mirror-primary);
    padding: 12px 24px;
    border-radius: var(--radius-full);
}
```

**幽灵按钮 (Ghost)**
```css
.btn-ghost {
    background: transparent;
    color: var(--gray-600);
    padding: 8px 16px;
    border-radius: var(--radius-md);
}
```

### 3.2 卡片

**基础卡片**
```css
.card {
    background: white;
    border-radius: var(--radius-lg);
    border: 1px solid var(--gray-100);
    padding: 20px;
}
```

**悬浮卡片**
```css
.card-hover {
    transition: all 0.3s ease;
}
.card-hover:hover {
    box-shadow: var(--shadow-lg);
    border-color: rgba(233, 30, 99, 0.2);
    transform: translateY(-2px);
}
```

### 3.3 输入框

```css
.input {
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-md);
    padding: 12px 16px;
    font-size: 14px;
    transition: border-color 0.2s;
}
.input:focus {
    border-color: var(--mirror-primary);
    outline: none;
    box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
}
```

### 3.4 进度条

**线性进度条**
```css
.progress-bar {
    height: 8px;
    background: var(--gray-100);
    border-radius: var(--radius-full);
    overflow: hidden;
}
.progress-bar-fill {
    height: 100%;
    background: var(--gradient-mirror);
    border-radius: var(--radius-full);
    transition: width 0.5s ease-out;
}
```

**环形进度条**
- 用于皮肤评分展示
- 动画过渡效果
- 中心显示数值

### 3.5 标签/徽章

```css
.badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: var(--radius-full);
    font-size: 12px;
    font-weight: 500;
}
.badge-success { background: #DCFCE7; color: #16A34A; }
.badge-warning { background: #FEF3C7; color: #D97706; }
.badge-error { background: #FEE2E2; color: #DC2626; }
```

## 4. 页面布局

### 4.1 响应式断点

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### 4.2 Grid 系统

- 使用 12 列网格
- 间距: 16px / 24px / 32px
- 最大宽度: 1280px

### 4.3 页面结构

```
+--------------------------------------------------+
|  Header (固定, 64px)                              |
+----------+---------------------------------------+
|          |                                       |
| Sidebar  |  Main Content                        |
| (240px)  |  - Page Header                       |
|          |  - Content Area                      |
|          |                                       |
+----------+---------------------------------------+
```

## 5. 动效规范

### 5.1 过渡时间

```css
--transition-fast: 150ms;    /* 按钮状态 */
--transition-normal: 300ms;  /* 卡片悬浮 */
--transition-slow: 500ms;    /* 页面切换 */
```

### 5.2 缓动函数

```css
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 5.3 常用动画

**淡入滑动**
```css
@keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

**脉冲发光**
```css
@keyframes glow {
    0% { box-shadow: 0 0 20px rgba(233, 30, 99, 0.3); }
    100% { box-shadow: 0 0 40px rgba(233, 30, 99, 0.6); }
}
```

**数字滚动**
- 用于分数展示
- 使用 Framer Motion 的 spring 动画

## 6. 交互规范

### 6.1 加载状态

- **Skeleton**: 内容加载时显示骨架屏
- **Spinner**: 操作进行中显示旋转加载
- **Progress**: 长时间操作显示进度条

### 6.2 反馈提示

- **Toast**: 轻量级提示，自动消失
- **Modal**: 重要确认，需要用户操作
- **Inline**: 表单验证，即时反馈

### 6.3 手势交互

- 卡片悬浮放大
- 按钮点击缩放
- 列表滑动加载
- 图片缩放拖拽

## 7. 无障碍设计

- 对比度符合 WCAG 2.1 AA 标准
- 所有可交互元素有 focus 状态
- 图片有 alt 文本
- 支持键盘导航

## 8. 页面设计稿

### 8.1 Landing 首页
- Hero 区域: 3D 魔镜动画 + 核心卖点
- 功能展示: 4 大核心功能卡片
- 工作流程: 水平时间线动画
- 技术规格: 深色背景区域
- 用户评价: 卡片轮播
- CTA 区域: 渐变背景

### 8.2 Mirror 体验页
- 主视图: 摄像头/模拟画面
- 人脸网格叠加层
- 灯光控制面板
- 快速分析预览
- 今日推荐卡片

### 8.3 Analysis 分析页
- 综合评分环形图
- 8 项指标卡片网格
- 肤色 Monk 标尺
- 问题区域脸部地图
- 趋势折线图
- AI 建议卡片

### 8.4 Recommendations 推荐页
- 情境卡片 (日程/天气/心情)
- AI 首选推荐
- 趋势妆容网格
- 场景筛选器
- 风格画廊

### 8.5 Tutorials 教程页
- 继续学习卡片
- 难度筛选器
- 教程卡片网格
- 教程详情: 视频+步骤+产品

### 8.6 Commerce 商城页
- 智能提醒卡片
- AI 推荐产品
- 价格追踪图表
- 促销预测
- 产品网格

### 8.7 Inventory 库存页
- 库存状态提醒
- 产品列表 (含进度条)
- 订阅管理
- 使用统计

### 8.8 Dashboard 仪表盘
- 用户头像和统计
- 皮肤评分趋势
- 快捷操作
- AI 洞察
- 活动时间线

### 8.9 Workflow 工作流演示页
**页面概述**: 交互式演示 Agentic AI 的完整工作流程

**核心组件 - SketchFace 智能镜**:
- 椭圆形镜框设计（类似三星智能镜）
- 金属渐变边框 + 玻璃反光效果
- 面部草图（含耳朵，支持耳饰推荐）
- 化妆变换动画（底妆→眉毛→眼影→腮红→唇妆）
- 区域引导虚线动画（T区、脸颊、眼部等）
- 智能镜 UI 叠加（状态栏、皮肤指标面板）

**5阶段流程**:

1. **Phase 1 - 面部识别与皮肤分析**
   - 全宽智能镜 + 扫描线动画
   - 镜内显示皮肤指标（水分、油脂、毛孔、敏感度）
   - 镜下详细分析区域：
     - 综合评分卡（85/100）
     - 8项指标网格（含进度条）
     - 问题区域分析
     - AI 护肤建议

2. **Phase 2 - 用户画像采集**
   - 心情状态选择器
   - 生理周期选择
   - 今日场合选择
   - 天气信息展示
   - 日程预览

3. **Phase 3 - AI 智能搜索**
   - 搜索过程打字机动画
   - 雷达扫描效果
   - 推荐结果卡片（含匹配度评分）

4. **Phase 4 - 步骤化妆容指导**
   - 全宽智能镜（显示化妆变换）
   - 横向步骤时间线
   - 当前步骤详情（操作说明、技巧提示、关联产品）
   - 区域高亮引导

5. **Phase 5 - 实时跟踪与反馈**
   - AI 操作监控
   - 问题检测警告卡片
   - 正确操作鼓励
   - 产品补货提醒
   - 购买建议按钮

**交互设计**:
- 手动点击切换阶段
- 自动播放模式（5秒/阶段）
- 阶段指示器（可点击跳转）
- 平滑过渡动画

### 8.10 Competition 竞品分析页
**页面概述**: CES 2026 智能美妆镜竞品分析

**核心内容**:
- 竞品卡片网格（Samsung、L'Oréal、Panasonic、Amazon）
- 每个竞品包含：
  - 品牌 Logo + 名称
  - 产品亮点（绿色标签）
  - 产品局限（红色标签）
  - 目标用户
  - AI 能力列表
  - 硬件规格（显示屏、摄像头、处理器、连接性）
  - 综合评分雷达图

- 竞争力矩阵对比表
- 行业趋势分析
- AgenticMirror 差异化优势
