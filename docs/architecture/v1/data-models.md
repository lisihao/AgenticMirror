# AgenticMirror V1 数据模型详细设计

> 版本: 1.0.0
> 创建日期: 2024-01-17

---

## 1. 用户相关模型

### 1.1 用户基础信息

```typescript
// 文件: lib/types/user.ts

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DemoUser extends User {
  skinType: SkinType;
  skinConcerns: string[];
  preferences: UserPreferences;
  consecutiveDays: number;
  beautyPoints: number;
}

export type SkinType = '干性' | '油性' | '混合' | '敏感' | '中性';

export interface UserPreferences {
  style: string;
  colors: string[];
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
}
```

### 1.2 用户身材档案

```typescript
export interface UserBodyProfile {
  height: number;        // cm
  weight: number;        // kg
  bodyType: BodyType;
  bodyTypeDesc: string;
  skinTone: string;
  seasonType: string;
  measurements: {
    shoulder: number;    // cm
    bust: number;
    waist: number;
    hip: number;
  };
  strengths: string[];
  challenges: string[];
}

export type BodyType =
  | '梨形身材'
  | '苹果形身材'
  | '沙漏形身材'
  | 'H形身材'
  | '倒三角形身材';
```

---

## 2. 皮肤分析模型

### 2.1 皮肤分析结果

```typescript
// 文件: lib/types/analysis.ts

export interface SkinAnalysis {
  id: string;
  userId: string;
  timestamp: string;
  overallScore: number;  // 0-100
  metrics: SkinMetrics;
  problemAreas: ProblemArea[];
  recommendations: string[];
  aiConfidence: number;  // 0-100
}

export interface SkinMetrics {
  hydration: MetricValue;      // 水分度
  oilBalance: MetricValue;     // 油脂平衡
  poreCondition: MetricValue;  // 毛孔状态
  sensitivity: MetricValue;    // 敏感度
  wrinkles: MetricValue;       // 皱纹
  pigmentation: MetricValue;   // 色素沉着
  elasticity: MetricValue;     // 弹性
  texture: MetricValue;        // 纹理
}

export interface MetricValue {
  value: number;         // 0-100
  label: string;         // e.g., '良好', '偏低'
  trend: 'up' | 'down' | 'stable';
  change: number;        // 相比上次的变化
}

export interface ProblemArea {
  area: FaceArea;
  issue: string;
  severity: 'low' | 'medium' | 'high';
  suggestion: string;
}

export type FaceArea =
  | 'T区'
  | '脸颊'
  | '眉毛'
  | '眼部'
  | '唇部'
  | '下巴'
  | '额头';
```

### 2.2 健康设备数据

```typescript
export interface HealthDevice {
  id: string;
  name: string;
  type: DeviceType;
  brand: string;
  connected: boolean;
  batteryLevel: number;
  lastSync: string;
  icon: string;
}

export type DeviceType =
  | 'watch'
  | 'scale'
  | 'ring'
  | 'thermometer'
  | 'other';

export interface HealthMetrics {
  heartRate: HealthMetricItem;
  sleep: HealthMetricItem;
  stress: HealthMetricItem;
  temperature: HealthMetricItem;
  hydration: HealthMetricItem;
  steps: HealthMetricItem;
  menstrualCycle: HealthMetricItem;
  cortisol: HealthMetricItem;
}

export interface HealthMetricItem {
  id: string;
  label: string;
  value: string;
  unit: string;
  status: 'good' | 'warning' | 'alert';
  skinImpact: string;
  trend: number[];
  icon: string;
}

export interface HealthSkinCorrelation {
  healthMetric: string;
  skinMetric: string;
  correlation: number;  // -1 to 1
  description: string;
  recommendation: string;
}
```

---

## 3. 产品相关模型

### 3.1 产品基础模型

```typescript
// 文件: lib/types/product.ts

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  description?: string;
  ingredients?: string[];
  tags: string[];
  inStock: boolean;
  createdAt: string;
}

export type ProductCategory =
  | 'skincare'
  | 'makeup'
  | 'tools'
  | 'fragrance'
  | 'haircare';

export interface ProductRecommendation extends Product {
  aiRecommendReason: string;
  matchScore: number;
  colorMatch?: number;
  bodyMatch?: number;
  occasionMatch?: number;
  type: 'organic' | 'sponsored';
  sponsorLabel?: string;
  source: string;
  salesCount: string;
}
```

### 3.2 库存模型

```typescript
export interface InventoryItem {
  id: string;
  productId: string;
  product: Product;
  status: InventoryStatus;
  remainingPercent: number;
  openDate: string;
  expiryDate?: string;
  daysRemaining: number;
  usageFrequency: 'daily' | 'weekly' | 'occasional';
  lastUsed?: string;
}

export type InventoryStatus =
  | 'sufficient'    // 充足
  | 'low'           // 偏低
  | 'critical'      // 即将用完
  | 'empty';        // 已用完

export interface InventoryAlert {
  id: string;
  productId: string;
  productName: string;
  alertType: 'low_stock' | 'expiring' | 'reorder';
  urgency: 'high' | 'medium' | 'low';
  message: string;
  suggestedAction: string;
}
```

---

## 4. 妆容与穿搭模型

### 4.1 妆容风格

```typescript
// 文件: lib/types/style.ts

export interface MakeupStyle {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: number;  // 分钟
  occasion: string;
  style: string;
  products: ProductReference[];
  steps: MakeupStep[];
  colorPalette: ColorItem[];
  thumbnail: string;
  video?: string;
}

export interface ProductReference {
  productId: string;
  role: string;  // e.g., '底妆', '眼影'
  required: boolean;
}

export interface MakeupStep {
  id: number;
  title: string;
  area: FaceArea;
  duration: number;  // 秒
  description: string;
  tips: string[];
  productId?: string;
}

export interface ColorItem {
  name: string;
  hex: string;
  usage: string;
}
```

### 4.2 AI 推荐妆容

```typescript
export interface AIGeneratedLook {
  id: string;
  name: string;
  nameEn: string;
  style: string;
  occasion: string;
  matchScore: number;
  colorPalette: ColorItem[];
  aiReason: string;
  linkedSchedule?: ScheduleEvent;
  tutorial: TutorialStep[];
}

export interface TutorialStep {
  step: number;
  title: string;
  duration: string;
  description: string;
  aiTip: string;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  type: 'work' | 'social' | 'date' | 'casual';
  dressCode?: string;
}
```

### 4.3 穿搭推荐

```typescript
export interface OutfitRecommendation {
  id: string;
  name: string;
  occasion: string;
  style: string;
  items: OutfitItem[];
  colorScore: number;
  bodyScore: number;
  totalPrice: number;
  alternatives?: string;
  aiReason: string;
  colorAnalysis: string;
}

export interface OutfitItem {
  type: '上装' | '下装' | '外套' | '鞋子' | '配饰';
  name: string;
  brand: string;
  color: string;
  image?: string;
}
```

---

## 5. 色彩诊断模型

### 5.1 个人色彩诊断

```typescript
// 文件: lib/types/color.ts

export interface PersonalColorDiagnosis {
  skinAnalysis: SkinColorAnalysis;
  seasonType: SeasonType;
  confidence: number;
  analysisDate: string;
  dataPoints: number;
}

export interface SkinColorAnalysis {
  undertone: 'warm' | 'cool' | 'neutral';
  undertoneLabel: string;
  undertoneDesc: string;
  depth: ColorDepth;
  depthLabel: string;
  clarity: 'clear' | 'soft';
  clarityLabel: string;
  clarityDesc: string;
}

export type ColorDepth =
  | 'light'
  | 'light-medium'
  | 'medium'
  | 'medium-deep'
  | 'deep';

export interface SeasonType {
  type: 'spring' | 'summer' | 'autumn' | 'winter';
  subType: string;
  label: string;
  description: string;
  characteristics: string[];
  celebrities: string[];
}
```

### 5.2 色彩色卡

```typescript
export interface SeasonalColorPalette {
  name: string;
  description: string;
  bestColors: ColorRecommendation[];
  neutralColors: ColorRecommendation[];
  avoidColors: ColorAvoid[];
}

export interface ColorRecommendation {
  name: string;
  hex: string;
  effect: string;
}

export interface ColorAvoid {
  name: string;
  hex: string;
  reason: string;
}

export interface ColorSimulationResult {
  color: string;
  hex: string;
  onYou: {
    skinEffect: string;
    faceEffect: string;
    overallScore: number;
    aiComment: string;
  };
}
```

### 5.3 天气/季节色彩指南

```typescript
export interface WeatherColorGuide {
  sunny: WeatherColorSet;
  cloudy: WeatherColorSet;
  rainy: WeatherColorSet;
}

export interface WeatherColorSet {
  recommended: Array<{
    color: string;
    hex: string;
    reason: string;
  }>;
  avoid: Array<{
    color: string;
    hex: string;
    reason: string;
  }>;
  colorAdvice: string;
}

export interface SeasonColorGuide {
  spring: SeasonColorSet;
  summer: SeasonColorSet;
  autumn: SeasonColorSet;
  winter: SeasonColorSet;
}

export interface SeasonColorSet {
  label: string;
  months: string;
  theme: string;
  palette: Array<{
    name: string;
    hex: string;
    desc: string;
  }>;
  yourBest: string;
  tip: string;
}
```

---

## 6. 电商相关模型

### 6.1 购物提醒

```typescript
// 文件: lib/types/commerce.ts

export interface ShoppingAlert {
  id: string;
  type: 'restock' | 'price_drop' | 'promotion' | 'new_arrival';
  urgency: 'high' | 'medium' | 'low';
  productId: string;
  productName: string;
  message: string;
  action: string;
  expiresAt?: string;
}
```

### 6.2 价格追踪

```typescript
export interface PriceHistory {
  productId: string;
  prices: PricePoint[];
  currentPrice: number;
  lowestPrice: number;
  averagePrice: number;
  priceDropAlert: boolean;
  nextPromotionPrediction?: {
    event: string;
    predictedPrice: number;
    confidence: number;
  };
}

export interface PricePoint {
  date: string;
  price: number;
  event?: string;  // e.g., '618大促'
}
```

### 6.3 语音搜索结果

```typescript
export interface VoiceSearchResult {
  query: string;
  aiUnderstanding: Record<string, string>;
  searchSources: string[];
  results: ProductRecommendation[];
  searchTime: number;  // ms
}
```

### 6.4 品牌合作

```typescript
export interface BrandPartner {
  brand: string;
  logo: string;
  matchReason: string;
  matchScore: number;
  featuredProduct: {
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    aiReason: string;
  };
  exclusive: string;
}
```

---

## 7. 教程模型

```typescript
// 文件: lib/types/tutorial.ts

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;  // 分钟
  difficulty: 1 | 2 | 3 | 4 | 5;
  stepsCount: number;
  category: TutorialCategory;
  tags: string[];
  views: number;
  likes: number;
  progress?: number;  // 用户进度 0-100
  completed?: boolean;
}

export type TutorialCategory =
  | '日常妆容'
  | '职场妆容'
  | '约会妆容'
  | '派对妆容'
  | '护肤技巧';

export interface TutorialDetail extends Tutorial {
  steps: TutorialDetailStep[];
  products: Product[];
  relatedTutorials: string[];
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
}

export interface TutorialDetailStep {
  id: number;
  title: string;
  description: string;
  duration: number;  // 秒
  videoTimestamp: number;
  tips: string[];
  productUsed?: string;
}
```

---

## 8. AI Agent 模型

```typescript
// 文件: lib/types/agent.ts

export interface AIAgent {
  id: string;
  name: string;
  type: AgentType;
  status: 'idle' | 'searching' | 'processing' | 'completed' | 'error';
  progress: number;
  currentTask?: string;
  results?: any;
}

export type AgentType =
  | 'trend_crawler'       // 趋势爬取
  | 'color_matcher'       // 色彩匹配
  | 'style_recommender'   // 风格推荐
  | 'price_tracker'       // 价格追踪
  | 'inventory_analyzer'; // 库存分析

export interface AgentSearchProgress {
  agentId: string;
  source: string;
  status: 'pending' | 'searching' | 'completed';
  resultsCount?: number;
  timestamp: string;
}
```

---

## 9. 游戏化模型

```typescript
// 文件: lib/types/gamification.ts

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  points: number;
  type: TaskType;
  completed: boolean;
  progress?: number;
  target?: number;
}

export type TaskType =
  | 'scan'       // 扫描任务
  | 'tutorial'   // 教程任务
  | 'share'      // 分享任务
  | 'purchase'   // 购买任务
  | 'streak';    // 连续签到

export interface LimitedEvent {
  id: string;
  title: string;
  description: string;
  reward: string;
  deadline: string;
  progress: number;
  target: number;
}

export interface BeautyPoints {
  total: number;
  todayEarned: number;
  history: PointTransaction[];
}

export interface PointTransaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  reason: string;
  timestamp: string;
}
```

---

## 10. 通用模型

```typescript
// 文件: lib/types/common.ts

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface TrendData {
  date: string;
  value: number;
  label?: string;
}
```

---

*文档结束*
