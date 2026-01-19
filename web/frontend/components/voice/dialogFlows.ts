// 对话阶段类型
export type DialogPhase =
  | 'idle'
  | 'greeting'
  | 'scanning'
  | 'analysis'
  | 'style_select'
  | 'tutorial_intro'
  | 'step_1_foundation'
  | 'step_1_doing'
  | 'step_2_eyebrow'
  | 'step_2_doing'
  | 'step_3_eyeshadow'
  | 'step_3_doing'
  | 'step_4_blush'
  | 'step_4_doing'
  | 'step_5_lips'
  | 'step_5_doing'
  | 'complete'
  | 'feedback';

// 皮肤分析结果
export interface SkinAnalysis {
  moisture: number;    // 水分 0-100
  oil: number;         // 油脂 0-100
  sensitivity: number; // 敏感度 0-100
  pores: number;       // 毛孔 0-100
  overall: number;     // 综合评分
}

// 对话上下文
export interface DialogContext {
  skinAnalysis?: SkinAnalysis;
  selectedStyle?: string;
  currentStep: number;
  totalSteps: number;
  startTime?: Date;
  makeupStep: number;  // 对应 SketchFace 的 makeupStep
}

// 对话脚本节点
export interface DialogNode {
  aiText: string | ((ctx: DialogContext) => string);
  duration?: number;              // 等待时间（毫秒）
  userIntents?: string[];         // 触发下一阶段的关键词
  nextPhase?: DialogPhase;        // 下一阶段
  autoAdvance?: boolean;          // 是否自动进入下一阶段
  highlightArea?: string;         // 高亮区域
  makeupStep?: number;            // 设置化妆步骤
  showScanLine?: boolean;         // 显示扫描线
  showMetrics?: boolean;          // 显示指标
}

// 默认皮肤分析
export const DEFAULT_SKIN_ANALYSIS: SkinAnalysis = {
  moisture: 78,
  oil: 45,
  sensitivity: 25,
  pores: 35,
  overall: 82,
};

// 对话脚本
export const DIALOG_SCRIPTS: Record<DialogPhase, DialogNode> = {
  idle: {
    aiText: '你好！我是小镜，你的AI美妆助手。说"开始化妆"唤醒我吧~',
    userIntents: ['开始', '化妆', '开始化妆', '你好', '小镜'],
    nextPhase: 'greeting',
  },

  greeting: {
    aiText: '好的，今天想让我帮你化一个什么场合的妆呢？比如日常、约会、职场或派对？',
    userIntents: ['日常', '约会', '职场', '派对', '随便', '都可以', '你推荐'],
    nextPhase: 'scanning',
  },

  scanning: {
    aiText: '让我先扫描一下你的面部状态，请正视镜子保持3秒...',
    duration: 3500,
    autoAdvance: true,
    nextPhase: 'analysis',
    showScanLine: true,
    makeupStep: 0,
  },

  analysis: {
    aiText: (ctx) => {
      const skin = ctx.skinAnalysis || DEFAULT_SKIN_ANALYSIS;
      return `扫描完成！你的皮肤状态不错哦~ 水分度${skin.moisture}%，油脂平衡${skin.oil}分。
              今天我推荐清透自然的日常妆，整体会显得气色很好。
              准备好开始化妆了吗？`;
    },
    userIntents: ['准备好', '好的', '开始', '可以', '好'],
    nextPhase: 'tutorial_intro',
    showMetrics: true,
  },

  style_select: {
    aiText: '好的，根据你的肤质和脸型，我为你定制了专属妆容方案。现在开始？',
    userIntents: ['开始', '好的', '可以'],
    nextPhase: 'tutorial_intro',
  },

  tutorial_intro: {
    aiText: '太好了！今天的妆容分5个步骤：底妆、眉毛、眼影、腮红和唇妆。我会一步步引导你，放心跟着做就好~',
    duration: 4000,
    autoAdvance: true,
    nextPhase: 'step_1_foundation',
  },

  step_1_foundation: {
    aiText: '第一步：底妆。请取适量粉底液，我会高亮显示需要涂抹的区域。从面部中央开始，向外轻轻推开...',
    highlightArea: 'foundation',
    userIntents: ['好了', '下一步', '完成', '继续'],
    nextPhase: 'step_1_doing',
    makeupStep: 0,
  },

  step_1_doing: {
    aiText: '做得很棒！底妆已经很均匀了，肤色瞬间提亮。准备好画眉毛了吗？',
    userIntents: ['准备好', '好了', '下一步', '继续'],
    nextPhase: 'step_2_eyebrow',
    makeupStep: 1,
  },

  step_2_eyebrow: {
    aiText: '第二步：眉毛。用眉笔轻轻描绘眉形，注意眉头淡、眉尾深。看我高亮的区域...',
    highlightArea: 'eyebrow',
    userIntents: ['好了', '下一步', '完成', '继续'],
    nextPhase: 'step_2_doing',
    makeupStep: 1,
  },

  step_2_doing: {
    aiText: '眉毛画得很自然！整个人看起来精神多了。接下来是眼影，这是让眼睛有神的关键~',
    userIntents: ['准备好', '好了', '下一步', '继续'],
    nextPhase: 'step_3_eyeshadow',
    makeupStep: 2,
  },

  step_3_eyeshadow: {
    aiText: '第三步：眼影。选择大地色系，先用浅色打底，再用深色加深眼尾。跟着我的指引来...',
    highlightArea: 'eyeshadow',
    userIntents: ['好了', '下一步', '完成', '继续'],
    nextPhase: 'step_3_doing',
    makeupStep: 2,
  },

  step_3_doing: {
    aiText: '哇，眼妆效果很赞！眼睛看起来更大更有神了。现在来点腮红增加气色~',
    userIntents: ['准备好', '好了', '下一步', '继续'],
    nextPhase: 'step_4_blush',
    makeupStep: 3,
  },

  step_4_blush: {
    aiText: '第四步：腮红。在苹果肌位置轻扫腮红，微微笑找到最高点，少量多次...',
    highlightArea: 'blush',
    userIntents: ['好了', '下一步', '完成', '继续'],
    nextPhase: 'step_4_doing',
    makeupStep: 3,
  },

  step_4_doing: {
    aiText: '腮红的位置刚刚好！脸颊红润有气色，元气满满的感觉。最后一步，唇妆！',
    userIntents: ['准备好', '好了', '下一步', '继续'],
    nextPhase: 'step_5_lips',
    makeupStep: 4,
  },

  step_5_lips: {
    aiText: '第五步：唇妆。选择裸粉色系，先用唇刷勾勒唇形，再填充颜色。这个颜色很衬你的肤色~',
    highlightArea: 'lips',
    userIntents: ['好了', '完成', '继续'],
    nextPhase: 'step_5_doing',
    makeupStep: 4,
  },

  step_5_doing: {
    aiText: '完美！唇色让整个妆容更加完整了。',
    duration: 2000,
    autoAdvance: true,
    nextPhase: 'complete',
    makeupStep: 5,
  },

  complete: {
    aiText: (ctx) => {
      const duration = ctx.startTime
        ? Math.floor((Date.now() - ctx.startTime.getTime()) / 60000)
        : 5;
      return `恭喜你！今天的妆容完成啦！用时${duration}分钟，整体评分95分！
              你现在看起来真的超美的，自信出门吧！
              需要保存这个妆容方案，或者有什么想调整的吗？`;
    },
    userIntents: ['谢谢', '没有', '很好', '再见', '保存'],
    nextPhase: 'idle',
    makeupStep: 5,
  },

  feedback: {
    aiText: '好的，随时需要我的时候说"小镜"就可以唤醒我哦~祝你今天心情愉快！',
    duration: 3000,
    autoAdvance: true,
    nextPhase: 'idle',
  },
};

// 检查用户输入是否匹配意图
export function matchIntent(transcript: string, intents: string[]): boolean {
  const normalizedTranscript = transcript.toLowerCase().trim();
  return intents.some((intent) =>
    normalizedTranscript.includes(intent.toLowerCase())
  );
}

// 获取当前步骤编号
export function getCurrentStepNumber(phase: DialogPhase): number {
  const stepMap: Record<string, number> = {
    step_1_foundation: 1,
    step_1_doing: 1,
    step_2_eyebrow: 2,
    step_2_doing: 2,
    step_3_eyeshadow: 3,
    step_3_doing: 3,
    step_4_blush: 4,
    step_4_doing: 4,
    step_5_lips: 5,
    step_5_doing: 5,
    complete: 5,
  };
  return stepMap[phase] || 0;
}

// 判断是否在化妆步骤中
export function isInMakeupPhase(phase: DialogPhase): boolean {
  return phase.startsWith('step_') || phase === 'complete';
}
