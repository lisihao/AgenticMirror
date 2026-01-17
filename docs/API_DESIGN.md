# AgenticMirror API 设计文档

## 1. API 概述

### 1.1 基本信息
- **Base URL**: `http://localhost:8001/api`
- **协议**: HTTP/HTTPS
- **数据格式**: JSON
- **认证方式**: JWT Bearer Token (Demo 模式无需认证)

### 1.2 通用响应格式

**成功响应**
```json
{
    "data": { ... },
    "message": "Success"
}
```

**错误响应**
```json
{
    "detail": "Error message",
    "status_code": 400
}
```

### 1.3 HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 2. API 端点

### 2.1 分析 API (Analysis)

#### POST /api/analysis/scan
皮肤分析扫描

**请求体**
```json
{
    "image": "base64_encoded_image",
    "mode": "quick" | "detailed"
}
```

**响应**
```json
{
    "id": "analysis-001",
    "date": "2024-12-15",
    "overall_score": 78,
    "metrics": {
        "hydration": { "score": 65, "status": "moderate", "trend": "+5" },
        "oil": { "score": 42, "status": "good", "trend": "-3" },
        "pores": { "score": 55, "status": "visible", "trend": "+2" },
        "wrinkles": { "score": 85, "status": "minimal", "trend": "0" },
        "dark_circles": { "score": 60, "status": "mild", "trend": "+8" },
        "acne": { "score": 72, "status": "few", "trend": "+10" },
        "sensitivity": { "score": 80, "status": "low", "trend": "0" },
        "brightness": { "score": 70, "status": "good", "trend": "+3" }
    },
    "skin_tone": {
        "monk_scale": 5,
        "hex_color": "#d7bd96",
        "undertone": "warm"
    },
    "problem_areas": [
        { "zone": "t-zone", "issue": "oil", "severity": "moderate" }
    ],
    "recommendations": [
        "建议使用平衡型爽肤水调理T区油脂分泌"
    ]
}
```

#### GET /api/analysis/history
获取分析历史记录

**查询参数**
- `limit`: 返回数量 (默认: 10)

**响应**
```json
{
    "analyses": [
        { "date": "2024-12-13", "score": 78, "hydration": 65, "oil": 42 }
    ],
    "total": 5
}
```

#### GET /api/analysis/trends
获取皮肤趋势数据

**查询参数**
- `period`: 时间范围 (7d, 30d, 90d)

**响应**
```json
{
    "period": "30d",
    "data_points": [...],
    "summary": {
        "score_change": "+6",
        "hydration_change": "+7",
        "oil_change": "-6"
    }
}
```

---

### 2.2 推荐 API (Recommendations)

#### GET /api/recommendations/makeup
获取妆容推荐

**查询参数**
- `occasion`: 场合 (work, date, party, casual)
- `skin_type`: 肤质
- `mood`: 心情
- `limit`: 返回数量

**响应**
```json
{
    "personalized": [
        {
            "id": "style-001",
            "name": "清透职场妆",
            "difficulty": 2,
            "duration": 8,
            "match_score": 95,
            "match_reason": "与您的肤色和职业风格完美匹配"
        }
    ],
    "trending": [...]
}
```

#### GET /api/recommendations/products
获取产品推荐

**查询参数**
- `category`: 分类 (skincare, makeup)
- `skin_concerns`: 皮肤问题

**响应**
```json
{
    "recommended": [
        {
            "id": "product-001",
            "name": "小黑瓶精华液",
            "brand": "Lancome",
            "price": 950,
            "match_reason": "适合您的干性肌肤"
        }
    ]
}
```

#### GET /api/recommendations/styles/{style_id}
获取妆容风格详情

**响应**
```json
{
    "id": "style-001",
    "name": "清透职场妆",
    "description": "简约清新，适合日常办公场合",
    "difficulty": 2,
    "duration": 8,
    "products": ["product-001", "product-002"],
    "product_details": [...]
}
```

#### POST /api/recommendations/ar-preview
获取 AR 试妆预览

**请求体**
```json
{
    "style_id": "style-001",
    "face_image": "base64_encoded_image"
}
```

---

### 2.3 教程 API (Tutorials)

#### GET /api/tutorials
获取教程列表

**查询参数**
- `difficulty`: 难度 (1-5)
- `category`: 分类
- `limit`: 返回数量

**响应**
```json
{
    "tutorials": [
        {
            "id": "tutorial-001",
            "title": "清透职场妆教程",
            "difficulty": 2,
            "duration": 8,
            "steps": 5
        }
    ],
    "total": 2
}
```

#### GET /api/tutorials/{tutorial_id}
获取教程详情

**响应**
```json
{
    "id": "tutorial-001",
    "title": "清透职场妆教程",
    "steps": [
        {
            "step_number": 1,
            "title": "底妆打底",
            "description": "使用妆前乳均匀涂抹全脸",
            "ar_overlay_type": "full_face",
            "products": ["product-004"],
            "product_details": [...],
            "tips": ["少量多次，避免厚重"],
            "duration": 60
        }
    ]
}
```

#### POST /api/tutorials/{tutorial_id}/progress
更新教程进度

**请求体**
```json
{
    "current_step": 3,
    "completed": false
}
```

---

### 2.4 产品 API (Products)

#### GET /api/products
获取产品列表

**查询参数**
- `category`: 分类
- `subcategory`: 子分类
- `sort`: 排序 (popular, price_low, price_high, rating)
- `limit`: 返回数量

**响应**
```json
{
    "products": [
        {
            "id": "product-001",
            "name": "小黑瓶精华液",
            "brand": "Lancome",
            "category": "skincare",
            "price": 950,
            "original_price": 1100,
            "rating": 4.8,
            "review_count": 12500
        }
    ],
    "total": 6
}
```

#### GET /api/products/{product_id}
获取产品详情

#### GET /api/products/{product_id}/price-history
获取价格历史

**响应**
```json
{
    "product_id": "product-001",
    "prices": [
        { "date": "2024-11-11", "price": 760 }
    ],
    "statistics": {
        "current": 950,
        "average": 920,
        "lowest": 760
    },
    "prediction": {
        "next_sale": "2025-06-18",
        "expected_price": 760
    }
}
```

#### GET /api/products/smart-recommendations
获取智能购物推荐

**响应**
```json
{
    "replenish_soon": [...],
    "trending_match": [...],
    "skin_based": [...],
    "alerts": [
        {
            "type": "replenish",
            "product_id": "product-002",
            "message": "您的 MAC Chili 口红即将用完",
            "urgency": "high"
        }
    ]
}
```

---

### 2.5 库存 API (Inventory)

#### GET /api/inventory
获取用户库存

**响应**
```json
{
    "categories": {
        "skincare": [...],
        "makeup": [...]
    },
    "alerts": [...],
    "total_items": 4,
    "total_value": 2120
}
```

#### POST /api/inventory
添加产品到库存

**请求体**
```json
{
    "product_id": "product-001",
    "purchase_date": "2024-12-15",
    "amount": 50
}
```

#### PATCH /api/inventory/{inventory_id}
更新库存使用情况

**请求体**
```json
{
    "remaining_percent": 40
}
```

#### GET /api/inventory/subscriptions
获取订阅列表

#### POST /api/inventory/subscriptions
创建订阅

---

### 2.6 趋势 API (Trends)

#### GET /api/trends/makeup
获取妆容趋势

**查询参数**
- `source`: 来源 (xiaohongshu, tiktok, instagram)
- `period`: 时间范围
- `limit`: 返回数量

**响应**
```json
{
    "trends": [
        {
            "id": "trend-001",
            "name": "水光肌",
            "source": "xiaohongshu",
            "engagement": 125000,
            "trend_score": 95,
            "hashtag": "#水光肌"
        }
    ]
}
```

#### GET /api/trends/products
获取产品趋势

---

### 2.7 用户 API (Users)

#### GET /api/users/profile
获取用户资料

**响应**
```json
{
    "id": "demo-user-001",
    "name": "Amy",
    "email": "amy@demo.com",
    "skin_profile": {
        "skin_type": "combination",
        "skin_tone_monk": 5,
        "concerns": ["pores", "mild_acne"]
    },
    "streak": 15
}
```

#### PATCH /api/users/profile
更新用户资料

#### GET /api/users/skin-profile
获取皮肤档案

#### POST /api/users/skin-profile
更新皮肤档案

#### GET /api/users/activity
获取活动记录

#### GET /api/users/calendar
获取日程安排

#### GET /api/users/dashboard
获取仪表盘汇总数据

## 3. 数据模型

### 3.1 User
```typescript
interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    skin_profile: SkinProfile;
    preferences: UserPreferences;
    streak: number;
    join_date: string;
}
```

### 3.2 SkinAnalysis
```typescript
interface SkinAnalysis {
    id: string;
    user_id: string;
    date: string;
    overall_score: number;
    metrics: {
        [key: string]: {
            score: number;
            status: string;
            trend: string;
        }
    };
    skin_tone: SkinTone;
    problem_areas: ProblemArea[];
    recommendations: string[];
}
```

### 3.3 MakeupStyle
```typescript
interface MakeupStyle {
    id: string;
    name: string;
    name_en: string;
    description: string;
    difficulty: number;
    duration: number;
    occasion: string;
    thumbnail: string;
    match_score?: number;
    match_reason?: string;
    trend_source?: string;
    products: string[];
}
```

### 3.4 Product
```typescript
interface Product {
    id: string;
    name: string;
    name_en: string;
    brand: string;
    category: string;
    subcategory: string;
    price: number;
    original_price: number;
    currency: string;
    volume: string;
    rating: number;
    review_count: number;
    image: string;
    suitable_skin_types: string[];
    skin_concerns: string[];
    description: string;
}
```

### 3.5 InventoryItem
```typescript
interface InventoryItem {
    id: string;
    user_id: string;
    product_id: string;
    product?: Product;
    purchase_date: string;
    open_date?: string;
    total_amount: number;
    remaining_percent: number;
    estimated_days_left: number;
    status: 'good' | 'running_low' | 'critical';
}
```

## 4. 错误处理

### 4.1 错误代码

| 错误代码 | 说明 |
|----------|------|
| INVALID_REQUEST | 请求参数无效 |
| NOT_FOUND | 资源不存在 |
| UNAUTHORIZED | 未授权访问 |
| ANALYSIS_FAILED | 分析失败 |
| QUOTA_EXCEEDED | 配额超限 |

### 4.2 错误响应示例

```json
{
    "detail": "Product not found",
    "error_code": "NOT_FOUND",
    "status_code": 404
}
```

## 5. 速率限制

- Demo 模式: 无限制
- 生产环境: 100 请求/分钟

## 6. 版本控制

当前版本: v1
URL 前缀: `/api/v1/` (未来版本)
