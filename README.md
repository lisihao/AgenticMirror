# Agentic Mirror

**智能美妆镜 - 你的 AI 私人形象顾问**

---

## 项目愿景

Agentic Mirror 是一款革命性的智能美妆镜产品，结合了机器人云台技术、多模态传感器、AI 推荐系统和 Agentic Commerce 平台，为女性用户提供个性化的美妆、穿搭建议和一站式购物体验。

## 核心特性

### 1. 智能追踪系统
- **桌面机器人云台**: 2轴/3轴云台，自动追踪面部
- **高清摄像头**: 4K 分辨率，精准捕捉面部细节
- **红外摄像头**: 皮肤深层分析，检测毛孔、色素沉着
- **LED 补光灯**: 可调色温，模拟不同光照环境

### 2. 健康数据采集
- 面部特征分析（肤质、肤色、脸型）
- 皮肤状态监测（水分、油脂、敏感度）
- 可穿戴设备集成（Apple Watch、小米手环等）
- 情绪/心情识别

### 3. AI 推荐引擎
- 实时追踪小红书、抖音等平台美妆潮流
- 结合节假日、生理周期、日程安排
- 个性化妆容推荐（多种风格选择）
- Step-by-step 妆容教程

### 4. Agentic Commerce
- 智能产品推荐（护肤、彩妆、服饰）
- 潮流预测与提前囤货建议
- 一键购买，无缝衔接
- 个人化产品库管理

## Web Demo

我们提供了一个完整的 Web Demo，用于展示产品的核心功能和工作流程。

### 快速启动

**方式一：本地运行**

```bash
# 1. 启动后端
cd web/backend
pip install -r requirements.txt
python -m app.main

# 2. 启动前端 (新终端)
cd web/frontend
npm install
npm run dev
```

访问 http://localhost:3001 体验 Demo

**方式二：Docker 运行**

```bash
cd web
docker-compose up -d
```

### Demo 功能

| 页面 | 功能 |
|------|------|
| **工作流演示** | Agentic AI 完整工作流程展示（5阶段交互式演示） |
| **竞品分析** | CES 2026 智能美妆镜竞品对比分析 |
| 首页 | 产品介绍、功能展示、技术规格 |
| 魔镜体验 | 人脸检测模拟、468点网格、灯光控制 |
| 皮肤分析 | 综合评分、8项指标、趋势图表 |
| 妆容推荐 | 个性化推荐、趋势妆容、场景筛选 |
| 美妆教程 | 步骤引导、AR 叠加、产品关联 |
| 智能购物 | AI推荐、价格追踪、促销预测 |
| 我的库存 | 产品追踪、使用进度、补货提醒 |
| 个人中心 | 数据概览、AI洞察、活动记录 |

### 工作流演示亮点

工作流演示页面 (`/demo/workflow`) 是产品的核心展示，采用**草图风格 SVG 插画**直观展示 Agentic AI 的工作流程：

1. **Phase 1 - 面部识别**: 智能镜扫描人脸，分析皮肤状态（水分、油脂、毛孔、敏感度）
2. **Phase 2 - 用户画像**: 采集心情、生理期、场合、天气等上下文信息
3. **Phase 3 - AI搜索**: 搜索小红书/抖音趋势，智能匹配妆容方案
4. **Phase 4 - 步骤指导**: 分步骤化妆教程，区域高亮引导
5. **Phase 5 - 实时反馈**: AI 监控操作，问题检测与购买建议

**核心组件 - SketchFace 智能镜**:
- 椭圆形镜框设计（类似三星智能镜）
- 面部草图含耳朵（支持耳饰推荐）
- 化妆变换动画效果
- 区域引导虚线动画
- 智能镜 UI 叠加（状态栏、皮肤指标面板）

## 项目结构

```
AgenticMirror/
├── README.md                    # 项目概述
├── docs/                        # 设计文档
│   ├── VISION.md               # 产品愿景
│   ├── ARCHITECTURE.md         # 系统架构
│   ├── HARDWARE.md             # 硬件设计
│   ├── AI_SYSTEM.md            # AI系统设计
│   ├── COMMERCE.md             # 电商平台设计
│   ├── UI_UX_DESIGN.md         # UI/UX 设计规范
│   ├── API_DESIGN.md           # API 设计文档
│   ├── WORKFLOW_DEMO_DESIGN.md # 工作流演示架构设计
│   ├── REQUIREMENTS_ANALYSIS.md # 需求分析
│   ├── COMPETITIVENESS_FEASIBILITY.md # 竞争力与可行性分析
│   └── TECHNOLOGY_ANALYSIS.md  # 技术分析
├── web/                         # Web Demo
│   ├── frontend/               # Next.js 前端
│   │   ├── app/               # 页面
│   │   ├── components/        # 组件
│   │   └── lib/               # 工具库
│   ├── backend/                # FastAPI 后端
│   │   └── app/               # API 服务
│   └── docker-compose.yml      # Docker 配置
├── hardware/                    # 硬件相关
│   ├── schematics/             # 电路图
│   ├── 3d-models/              # 3D模型
│   └── bom/                    # 物料清单
├── software/                    # 软件代码
│   ├── firmware/               # 嵌入式固件
│   ├── mobile-app/             # 移动应用
│   ├── cloud-backend/          # 云端后端
│   └── ai-models/              # AI模型
└── business/                    # 商业文档
    ├── BUSINESS_MODEL.md       # 商业模式
    └── MARKET_ANALYSIS.md      # 市场分析
```

## 技术栈

| 层级 | 技术选型 |
|------|----------|
| 硬件 | ESP32-S3 / STM32, 步进电机, IMX586 CMOS |
| 固件 | C/C++, FreeRTOS |
| 移动端 | Flutter / React Native |
| 后端 | Python FastAPI, PostgreSQL, Redis |
| AI | PyTorch, OpenCV, MediaPipe, LLM (GPT-4/Claude) |
| 电商 | Stripe, 支付宝/微信支付 |

## 目标用户

- 18-45岁女性用户
- 追求时尚、注重个人形象
- 日常有化妆需求
- 对科技产品有接受度

## 商业模式

1. **硬件销售**: 智能镜设备销售
2. **订阅服务**: AI 推荐、潮流预测高级功能
3. **电商分成**: 产品推荐佣金
4. **品牌合作**: B2B 品牌定制服务

---

*Agentic Mirror - Mirror Your Best Self*
