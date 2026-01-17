# AgenticMirror 项目开发规范

> 此文件定义了 Claude Code 在本项目中的工作流程和规范

## 核心工作流程

### 1. 设计优先原则

每次进行新功能开发或重大修改时，**必须先创建设计文档**：

1. **创建设计文档** (`docs/` 目录)
   - 新功能设计文档命名格式：`docs/<FEATURE_NAME>_DESIGN.md`
   - 文档必须包含：
     - 需求概述
     - 技术方案
     - 组件/接口设计
     - 数据结构
     - 实现步骤

2. **更新相关文档**
   - 如涉及 UI 变更，更新 `docs/UI_UX_DESIGN.md`
   - 如涉及架构变更，更新 `docs/ARCHITECTURE.md`
   - 如涉及 API 变更，更新 `docs/API_DESIGN.md`

3. **实现代码**
   - 按照设计文档实现功能
   - 代码完成后进行测试验证

4. **提交代码和文档**
   - 将设计文档和代码一起提交到 Git
   - 提交信息格式：`<type>: <description>`
     - `feat:` 新功能
     - `fix:` 修复
     - `docs:` 文档更新
     - `refactor:` 重构
     - `style:` 样式调整

### 2. Git 提交规范

每次完成功能开发后，**必须执行以下步骤**：

```bash
# 1. 查看变更
git status
git diff

# 2. 添加所有变更
git add .

# 3. 提交（包含文档和代码）
git commit -m "<type>: <description>"

# 4. 推送到远程（如用户要求）
git push origin main
```

### 3. 文档模板

新功能设计文档应包含以下章节：

```markdown
# <功能名称> - 设计文档

> 版本: x.x.x
> 日期: YYYY-MM-DD

## 一、需求概述
### 1.1 背景
### 1.2 目标

## 二、技术方案
### 2.1 技术选型
### 2.2 架构设计

## 三、详细设计
### 3.1 组件设计
### 3.2 数据结构
### 3.3 接口定义

## 四、实现计划
### 4.1 开发步骤
### 4.2 测试方案

## 五、附录
```

## 项目结构

```
AgenticMirror/
├── CLAUDE.md              # Claude Code 项目规范（本文件）
├── README.md              # 项目说明
├── docs/                  # 设计文档目录
│   ├── ARCHITECTURE.md    # 系统架构
│   ├── UI_UX_DESIGN.md    # UI/UX 设计规范
│   ├── API_DESIGN.md      # API 设计
│   ├── WORKFLOW_DEMO_DESIGN.md  # 工作流演示设计
│   └── <NEW_FEATURE>_DESIGN.md  # 新功能设计文档
├── web/
│   ├── frontend/          # Next.js 前端
│   └── backend/           # FastAPI 后端
└── ...
```

## 技术栈

- **前端**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **后端**: FastAPI, Python
- **图形**: SVG (手绘草图风格)
- **动画**: Framer Motion

## GitHub 仓库

- **远程地址**: https://github.com/lisihao/AgenticMirror
- **主分支**: main

## 提醒事项

- 每次对话结束前，确认所有变更已提交
- 设计文档和代码必须同步提交
- 保持文档与代码的一致性
- 重大功能变更需要更新 README.md
