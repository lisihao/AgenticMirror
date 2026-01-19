# 智能镜语音交互系统设计文档

> 版本: 1.0.0
> 日期: 2025-01-19

---

## 一、需求概述

### 1.1 背景
AgenticMirror 智能美妆镜的核心交互方式应该是语音，用户在化妆过程中双手忙碌，无法进行触屏操作。

### 1.2 目标
实现完整的语音交互流程：
1. 用户通过语音与智能镜对话
2. AI 语音引导用户完成化妆全过程
3. 实时语音反馈和提示

### 1.3 核心场景

```
用户: "开始化妆"
AI: "好的，让我先扫描一下你的面部状态... 检测完成！
     你的皮肤水分度78%，有轻微出油。
     今天推荐清透自然妆，需要我开始引导吗？"
用户: "好的，开始吧"
AI: "第一步，我们先打底。请取适量妆前乳，
     从T区开始向外推开... 做得很好！
     第二步，上粉底液..."
```

---

## 二、技术方案

### 2.1 技术选型

| 功能 | 技术方案 | 备注 |
|------|----------|------|
| 语音识别 | Web Speech API | 浏览器原生，免费，中文支持好 |
| 语音合成 | Web Speech API + 自定义音色 | 支持中文，可调语速语调 |
| 唤醒词 | 本地检测 "小镜" | 简化版，持续监听 |
| 对话管理 | 状态机 + 预设流程 | 本地 Demo 不需要后端 AI |

### 2.2 架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                    Voice Interaction System                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │   Speech    │    │   Dialog    │    │   Speech    │      │
│  │ Recognition │───►│   Manager   │───►│  Synthesis  │      │
│  │             │    │             │    │             │      │
│  │ 语音识别    │    │ 对话状态机  │    │ 语音合成    │      │
│  └─────────────┘    └──────┬──────┘    └─────────────┘      │
│                            │                                  │
│                            ▼                                  │
│                    ┌─────────────┐                           │
│                    │ SketchFace  │                           │
│                    │ Controller  │                           │
│                    │             │                           │
│                    │ 镜子UI联动  │                           │
│                    └─────────────┘                           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 组件设计

```
components/
├── voice/
│   ├── VoiceProvider.tsx      # 语音上下文提供者
│   ├── useSpeechRecognition.ts # 语音识别 Hook
│   ├── useSpeechSynthesis.ts   # 语音合成 Hook
│   ├── VoiceAssistant.tsx      # 语音助手主组件
│   ├── VoiceIndicator.tsx      # 语音状态指示器
│   ├── VoiceWaveform.tsx       # 音波动画
│   └── dialogFlows.ts          # 对话流程定义
```

---

## 三、详细设计

### 3.1 语音识别 (useSpeechRecognition)

```typescript
interface SpeechRecognitionState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
}

interface SpeechRecognitionActions {
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}
```

**特性**:
- 持续监听模式（continuous: true）
- 中文语言设置（lang: 'zh-CN'）
- 实时中间结果显示
- 自动重启（网络断开后）

### 3.2 语音合成 (useSpeechSynthesis)

```typescript
interface SpeechSynthesisOptions {
  voice?: string;      // 音色名称
  rate?: number;       // 语速 0.5-2.0
  pitch?: number;      // 音调 0-2
  volume?: number;     // 音量 0-1
}

interface SpeechSynthesisActions {
  speak: (text: string, options?: SpeechSynthesisOptions) => void;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
  isSpeaking: boolean;
}
```

**音色选择**:
- 优先选择中文女声
- 备选系统默认音色
- 可配置语速（推荐 1.0-1.2）

### 3.3 对话流程状态机

```typescript
type DialogPhase =
  | 'idle'           // 待机
  | 'greeting'       // 问候
  | 'scanning'       // 扫描中
  | 'analysis'       // 分析结果
  | 'style_select'   // 选择风格
  | 'tutorial_intro' // 教程介绍
  | 'step_1'         // 步骤1: 底妆
  | 'step_2'         // 步骤2: 眉毛
  | 'step_3'         // 步骤3: 眼影
  | 'step_4'         // 步骤4: 腮红
  | 'step_5'         // 步骤5: 唇妆
  | 'complete'       // 完成
  | 'feedback';      // 反馈

interface DialogState {
  phase: DialogPhase;
  context: {
    skinAnalysis?: SkinAnalysis;
    selectedStyle?: string;
    currentStep?: number;
    startTime?: Date;
  };
}
```

### 3.4 对话脚本

```typescript
const DIALOG_SCRIPTS = {
  greeting: {
    ai: "你好！我是你的AI美妆助手小镜。今天想让我帮你化妆吗？",
    userIntents: ['开始', '化妆', '好的', '帮我'],
    nextPhase: 'scanning'
  },

  scanning: {
    ai: "好的，请正视镜子，我来扫描一下你的面部状态...",
    duration: 3000,  // 3秒扫描动画
    nextPhase: 'analysis'
  },

  analysis: {
    ai: (ctx) => `扫描完成！你的皮肤状态不错，水分${ctx.moisture}%，
                  油脂平衡度${ctx.oil}分。
                  根据今天的场合，我推荐${ctx.recommendedStyle}妆容，
                  需要开始吗？`,
    userIntents: ['开始', '好的', '可以'],
    nextPhase: 'tutorial_intro'
  },

  tutorial_intro: {
    ai: "好的，今天我们分5个步骤完成妆容。第一步是底妆打底，准备好了吗？",
    userIntents: ['准备好了', '好了', '开始'],
    nextPhase: 'step_1'
  },

  step_1: {
    ai: "第一步，底妆。请取适量粉底液，从脸部中央向外推开。我会高亮显示区域...",
    highlight: 'foundation',
    duration: 15000,
    checkAi: "做得很好！底妆已经很均匀了。准备好进行下一步吗？",
    nextPhase: 'step_2'
  },

  // ... 更多步骤

  complete: {
    ai: "恭喜！今天的妆容已经完成了！整体评分92分，你看起来棒极了！有什么想调整的吗？",
    userIntents: ['没有', '很好', '谢谢'],
    nextPhase: 'idle'
  }
};
```

### 3.5 VoiceAssistant 组件

```typescript
interface VoiceAssistantProps {
  onPhaseChange?: (phase: DialogPhase) => void;
  onCommand?: (command: string) => void;
  autoStart?: boolean;
  showIndicator?: boolean;
}
```

**功能**:
1. 管理对话状态
2. 处理用户语音输入
3. 触发 AI 语音响应
4. 与 SketchFace 联动（高亮区域、化妆步骤）

### 3.6 VoiceIndicator 组件

显示当前语音状态：
- 🎤 监听中（脉冲动画）
- 🔊 AI 说话中（音波动画）
- 💤 待机（静止）
- ❌ 错误（红色提示）

---

## 四、UI/UX 设计

### 4.1 语音助手界面布局

```
┌─────────────────────────────────────────────┐
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │          SketchFace 镜子            │    │
│  │         (化妆区域高亮)              │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  🎤 "请取适量粉底液..."            │    │
│  │  ════════════════════              │    │
│  │  [语音波形动画]                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  步骤进度: ●●○○○ (2/5)             │    │
│  │  已用时间: 5:32                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [静音] [暂停] [跳过] [重新开始]           │
└─────────────────────────────────────────────┘
```

### 4.2 语音指令

| 指令 | 功能 |
|------|------|
| "开始化妆" | 启动化妆流程 |
| "下一步" | 跳到下一步骤 |
| "上一步" | 返回上一步 |
| "暂停" | 暂停当前教程 |
| "继续" | 继续教程 |
| "重新开始" | 从头开始 |
| "帮助" | 显示帮助信息 |
| "什么颜色适合我" | 获取建议 |

---

## 五、实现计划

### 5.1 开发步骤

1. **Phase 1: 基础语音组件**
   - useSpeechRecognition Hook
   - useSpeechSynthesis Hook
   - VoiceIndicator 组件

2. **Phase 2: 对话管理**
   - 对话状态机
   - 对话脚本定义
   - 意图识别（简单关键词匹配）

3. **Phase 3: 集成到 Demo**
   - 新建 `/demo/voice-mirror` 页面
   - 与 SketchFace 联动
   - 步骤进度展示

4. **Phase 4: 优化体验**
   - 音波动画
   - 错误处理
   - 移动端适配

### 5.2 文件清单

```
新增:
├── components/voice/
│   ├── useSpeechRecognition.ts
│   ├── useSpeechSynthesis.ts
│   ├── VoiceAssistant.tsx
│   ├── VoiceIndicator.tsx
│   ├── VoiceWaveform.tsx
│   ├── dialogFlows.ts
│   └── index.ts
├── app/demo/voice-mirror/
│   └── page.tsx

修改:
├── components/workflow/SketchFace.tsx (添加语音联动接口)
```

---

## 六、浏览器兼容性

| 浏览器 | Speech Recognition | Speech Synthesis |
|--------|-------------------|------------------|
| Chrome | ✅ 完整支持 | ✅ 完整支持 |
| Safari | ✅ 需要用户交互 | ✅ 完整支持 |
| Firefox | ❌ 不支持 | ✅ 完整支持 |
| Edge | ✅ 完整支持 | ✅ 完整支持 |

**降级方案**: Firefox 用户显示提示，建议使用 Chrome。

---

*设计完成时间：2025-01-19*
