"""Mock data for AgenticMirror Demo API"""

from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional

# Demo User
DEMO_USER = {
    "id": "demo-user-001",
    "name": "Amy",
    "email": "amy@demo.com",
    "avatar": "/images/demo/avatar.jpg",
    "skin_profile": {
        "skin_type": "combination",
        "skin_tone_monk": 5,
        "skin_tone_hex": "#d7bd96",
        "undertone": "warm",
        "concerns": ["pores", "mild_acne", "uneven_tone"],
        "allergies": [],
    },
    "preferences": {
        "style": "natural",
        "brands": ["MAC", "Lancome", "YSL"],
        "budget_range": [100, 500],
    },
    "streak": 15,
    "join_date": "2024-10-01",
}

# Skin Analysis
MOCK_ANALYSIS = {
    "id": "analysis-001",
    "user_id": "demo-user-001",
    "date": datetime.now().strftime("%Y-%m-%d"),
    "overall_score": 78,
    "metrics": {
        "hydration": {"score": 65, "status": "moderate", "trend": "+5"},
        "oil": {"score": 42, "status": "good", "trend": "-3"},
        "pores": {"score": 55, "status": "visible", "trend": "+2"},
        "wrinkles": {"score": 85, "status": "minimal", "trend": "0"},
        "dark_circles": {"score": 60, "status": "mild", "trend": "+8"},
        "acne": {"score": 72, "status": "few", "trend": "+10"},
        "sensitivity": {"score": 80, "status": "low", "trend": "0"},
        "brightness": {"score": 70, "status": "good", "trend": "+3"},
    },
    "skin_tone": {
        "monk_scale": 5,
        "hex_color": "#d7bd96",
        "undertone": "warm",
    },
    "problem_areas": [
        {"zone": "t-zone", "issue": "oil", "severity": "moderate"},
        {"zone": "cheeks", "issue": "dryness", "severity": "mild"},
        {"zone": "nose", "issue": "pores", "severity": "visible"},
        {"zone": "forehead", "issue": "spots", "severity": "mild"},
    ],
    "recommendations": [
        "建议使用平衡型爽肤水调理T区油脂分泌",
        "晚间护肤可加入补水精华，改善面颊干燥",
        "您的皮肤状态较上月提升了5%，继续保持！",
    ],
}

# Analysis History
MOCK_ANALYSIS_HISTORY = [
    {"date": "2024-11-15", "score": 72, "hydration": 58, "oil": 48},
    {"date": "2024-11-22", "score": 74, "hydration": 60, "oil": 46},
    {"date": "2024-11-29", "score": 75, "hydration": 62, "oil": 45},
    {"date": "2024-12-06", "score": 76, "hydration": 63, "oil": 44},
    {"date": "2024-12-13", "score": 78, "hydration": 65, "oil": 42},
]

# Makeup Styles
MOCK_STYLES = [
    {
        "id": "style-001",
        "name": "清透职场妆",
        "name_en": "Natural Office Glow",
        "description": "简约清新，适合日常办公场合",
        "difficulty": 2,
        "duration": 8,
        "occasion": "work",
        "thumbnail": "/images/styles/natural-office.jpg",
        "match_score": 95,
        "match_reason": "与您的肤色和职业风格完美匹配",
        "trend_source": None,
        "products": ["product-001", "product-002", "product-003"],
        "steps": 5,
    },
    {
        "id": "style-002",
        "name": "温柔约会妆",
        "name_en": "Soft Glam Date Night",
        "description": "温柔甜美，适合约会和聚会",
        "difficulty": 3,
        "duration": 15,
        "occasion": "date",
        "thumbnail": "/images/styles/soft-glam.jpg",
        "match_score": 88,
        "match_reason": "暖色调与您的肤色相得益彰",
        "trend_source": "xiaohongshu",
        "trend_engagement": 15200,
        "products": ["product-002", "product-004", "product-005"],
        "steps": 7,
    },
    {
        "id": "style-003",
        "name": "清冷感妆容",
        "name_en": "Clean Girl Aesthetic",
        "description": "当下最流行的清冷高级感",
        "difficulty": 2,
        "duration": 10,
        "occasion": "casual",
        "thumbnail": "/images/styles/clean-girl.jpg",
        "match_score": 82,
        "match_reason": "简约风格突出您的自然美",
        "trend_source": "tiktok",
        "trend_engagement": 89000,
        "products": ["product-001", "product-006"],
        "steps": 4,
    },
    {
        "id": "style-004",
        "name": "复古港风妆",
        "name_en": "Retro HK Style",
        "description": "经典港风，气场全开",
        "difficulty": 4,
        "duration": 20,
        "occasion": "party",
        "thumbnail": "/images/styles/retro-hk.jpg",
        "match_score": 75,
        "match_reason": "红唇与您的五官相配",
        "trend_source": "xiaohongshu",
        "trend_engagement": 25600,
        "products": ["product-003", "product-007", "product-008"],
        "steps": 8,
    },
]

# Products
MOCK_PRODUCTS = [
    {
        "id": "product-001",
        "name": "小黑瓶精华液",
        "name_en": "Advanced Genifique Serum",
        "brand": "Lancome",
        "category": "skincare",
        "subcategory": "serum",
        "price": 950,
        "original_price": 1100,
        "currency": "CNY",
        "volume": "50ml",
        "rating": 4.8,
        "review_count": 12500,
        "image": "/images/products/lancome-serum.jpg",
        "suitable_skin_types": ["all"],
        "skin_concerns": ["anti-aging", "hydration", "brightness"],
        "description": "经典抗老精华，富含益生菌精粹",
    },
    {
        "id": "product-002",
        "name": "子弹头口红 Chili色",
        "name_en": "Matte Revolution Lipstick - Chili",
        "brand": "MAC",
        "category": "makeup",
        "subcategory": "lipstick",
        "price": 170,
        "original_price": 170,
        "currency": "CNY",
        "volume": "3g",
        "rating": 4.7,
        "review_count": 8900,
        "image": "/images/products/mac-chili.jpg",
        "suitable_skin_types": ["all"],
        "skin_concerns": [],
        "description": "经典砖红色，显白百搭",
    },
    {
        "id": "product-003",
        "name": "五花肉高光盘",
        "name_en": "Highlighting Powder Palette",
        "brand": "NARS",
        "category": "makeup",
        "subcategory": "highlighter",
        "price": 420,
        "original_price": 420,
        "currency": "CNY",
        "volume": "14g",
        "rating": 4.6,
        "review_count": 5600,
        "image": "/images/products/nars-highlighter.jpg",
        "suitable_skin_types": ["all"],
        "skin_concerns": [],
        "description": "四色高光，打造立体妆容",
    },
    {
        "id": "product-004",
        "name": "持妆粉底液",
        "name_en": "Teint Idole Ultra Wear Foundation",
        "brand": "Lancome",
        "category": "makeup",
        "subcategory": "foundation",
        "price": 480,
        "original_price": 480,
        "currency": "CNY",
        "volume": "30ml",
        "rating": 4.5,
        "review_count": 7800,
        "image": "/images/products/lancome-foundation.jpg",
        "suitable_skin_types": ["combination", "oily"],
        "skin_concerns": ["coverage", "longevity"],
        "description": "24小时持妆，自然遮瑕",
    },
    {
        "id": "product-005",
        "name": "九色眼影盘",
        "name_en": "Eye Palette - Soft Glam",
        "brand": "Anastasia",
        "category": "makeup",
        "subcategory": "eyeshadow",
        "price": 520,
        "original_price": 580,
        "currency": "CNY",
        "volume": "1pc",
        "rating": 4.8,
        "review_count": 9200,
        "image": "/images/products/abh-palette.jpg",
        "suitable_skin_types": ["all"],
        "skin_concerns": [],
        "description": "大地色系，日常百搭",
    },
    {
        "id": "product-006",
        "name": "丝绒哑光唇釉",
        "name_en": "Velvet Matte Lip Stain",
        "brand": "YSL",
        "category": "makeup",
        "subcategory": "lipstick",
        "price": 320,
        "original_price": 320,
        "currency": "CNY",
        "volume": "6ml",
        "rating": 4.7,
        "review_count": 6300,
        "image": "/images/products/ysl-lip.jpg",
        "suitable_skin_types": ["all"],
        "skin_concerns": [],
        "description": "丝绒质地，显色持久",
    },
]

# Tutorials
MOCK_TUTORIALS = [
    {
        "id": "tutorial-001",
        "style_id": "style-001",
        "title": "清透职场妆教程",
        "title_en": "Natural Office Glow Tutorial",
        "description": "5分钟搞定日常通勤妆容",
        "difficulty": 2,
        "duration": 8,
        "thumbnail": "/images/tutorials/natural-office.jpg",
        "steps": [
            {
                "step_number": 1,
                "title": "底妆打底",
                "description": "使用妆前乳均匀涂抹全脸，重点在T区",
                "ar_overlay_type": "full_face",
                "products": ["product-004"],
                "tips": ["少量多次，避免厚重"],
                "duration": 60,
            },
            {
                "step_number": 2,
                "title": "粉底上妆",
                "description": "用美妆蛋将粉底液轻拍上脸",
                "ar_overlay_type": "full_face",
                "products": ["product-004"],
                "tips": ["从中心向外晕染", "鼻翼处仔细遮盖"],
                "duration": 90,
            },
            {
                "step_number": 3,
                "title": "眉毛修饰",
                "description": "顺着眉毛生长方向轻轻描画",
                "ar_overlay_type": "eyebrow",
                "products": [],
                "tips": ["眉头轻、眉尾重"],
                "duration": 60,
            },
            {
                "step_number": 4,
                "title": "眼影晕染",
                "description": "大地色打底，加深眼尾",
                "ar_overlay_type": "eyeshadow",
                "products": ["product-005"],
                "tips": ["少量多次叠加"],
                "duration": 90,
            },
            {
                "step_number": 5,
                "title": "唇部上色",
                "description": "涂抹唇膏，打造自然唇色",
                "ar_overlay_type": "lips",
                "products": ["product-002"],
                "tips": ["先用唇刷勾勒唇形"],
                "duration": 45,
            },
        ],
        "related_products": ["product-002", "product-004", "product-005"],
    },
    {
        "id": "tutorial-002",
        "style_id": "style-002",
        "title": "温柔约会妆教程",
        "title_en": "Soft Glam Date Tutorial",
        "description": "打造甜美温柔的约会妆容",
        "difficulty": 3,
        "duration": 15,
        "thumbnail": "/images/tutorials/soft-glam.jpg",
        "steps": [
            {
                "step_number": 1,
                "title": "妆前护肤",
                "description": "做好保湿打底",
                "ar_overlay_type": "full_face",
                "products": ["product-001"],
                "tips": ["等待精华完全吸收"],
                "duration": 60,
            },
        ],
        "related_products": ["product-001", "product-002", "product-005"],
    },
]

# Trends
MOCK_TRENDS = [
    {
        "id": "trend-001",
        "name": "水光肌",
        "name_en": "Glass Skin",
        "source": "xiaohongshu",
        "engagement": 125000,
        "trend_score": 95,
        "description": "打造通透水润的玻璃肌效果",
        "hashtag": "#水光肌",
    },
    {
        "id": "trend-002",
        "name": "拿铁妆",
        "name_en": "Latte Makeup",
        "source": "tiktok",
        "engagement": 89000,
        "trend_score": 88,
        "description": "温暖咖啡色系，知性优雅",
        "hashtag": "#LatteGirl",
    },
    {
        "id": "trend-003",
        "name": "氛围感眼妆",
        "name_en": "Soft Focus Eyes",
        "source": "xiaohongshu",
        "engagement": 76000,
        "trend_score": 82,
        "description": "柔焦晕染，打造迷离眼神",
        "hashtag": "#氛围感",
    },
    {
        "id": "trend-004",
        "name": "果汁唇",
        "name_en": "Juicy Lips",
        "source": "instagram",
        "engagement": 65000,
        "trend_score": 78,
        "description": "水润果冻感，元气满满",
        "hashtag": "#JuicyLips",
    },
]

# User Inventory
MOCK_INVENTORY = [
    {
        "id": "inv-001",
        "user_id": "demo-user-001",
        "product_id": "product-001",
        "purchase_date": "2024-11-01",
        "open_date": "2024-11-05",
        "total_amount": 50,
        "remaining_percent": 40,
        "estimated_days_left": 15,
        "status": "running_low",
    },
    {
        "id": "inv-002",
        "user_id": "demo-user-001",
        "product_id": "product-002",
        "purchase_date": "2024-10-15",
        "open_date": "2024-10-15",
        "total_amount": 3,
        "remaining_percent": 15,
        "estimated_days_left": 7,
        "status": "critical",
    },
    {
        "id": "inv-003",
        "user_id": "demo-user-001",
        "product_id": "product-004",
        "purchase_date": "2024-11-20",
        "open_date": "2024-11-20",
        "total_amount": 30,
        "remaining_percent": 70,
        "estimated_days_left": 45,
        "status": "good",
    },
    {
        "id": "inv-004",
        "user_id": "demo-user-001",
        "product_id": "product-005",
        "purchase_date": "2024-09-01",
        "open_date": "2024-09-01",
        "total_amount": 1,
        "remaining_percent": 55,
        "estimated_days_left": 60,
        "status": "good",
    },
]

# Price History
MOCK_PRICE_HISTORY = {
    "product-001": [
        {"date": "2024-09-01", "price": 1100},
        {"date": "2024-10-01", "price": 1050},
        {"date": "2024-11-01", "price": 980},
        {"date": "2024-11-11", "price": 760},
        {"date": "2024-11-15", "price": 950},
        {"date": "2024-12-01", "price": 950},
        {"date": "2024-12-12", "price": 850},
        {"date": "2024-12-15", "price": 950},
    ],
    "product-002": [
        {"date": "2024-09-01", "price": 170},
        {"date": "2024-10-01", "price": 170},
        {"date": "2024-11-11", "price": 136},
        {"date": "2024-12-01", "price": 170},
    ],
}

# Shopping Alerts
MOCK_SHOPPING_ALERTS = [
    {
        "id": "alert-001",
        "type": "replenish",
        "product_id": "product-002",
        "message": "您的 MAC Chili 口红即将用完",
        "detail": "预计还能使用 7 天，618 大促即将到来",
        "urgency": "high",
        "suggested_action": "立即补货",
        "expected_sale": "2025-06-18",
        "expected_price": 136,
    },
    {
        "id": "alert-002",
        "type": "price_drop",
        "product_id": "product-001",
        "message": "兰蔻小黑瓶降价提醒",
        "detail": "当前价格 ¥950，低于您设定的 ¥1000 提醒价",
        "urgency": "medium",
        "suggested_action": "查看详情",
    },
    {
        "id": "alert-003",
        "type": "trending",
        "product_id": "product-006",
        "message": "YSL 唇釉正在流行",
        "detail": "与您关注的「拿铁妆」趋势相关",
        "urgency": "low",
        "suggested_action": "了解更多",
    },
]

# Activity Feed
MOCK_ACTIVITY_FEED = [
    {
        "id": "activity-001",
        "type": "tutorial_completed",
        "title": "完成教程：清透职场妆",
        "timestamp": "2024-12-15 09:30",
    },
    {
        "id": "activity-002",
        "type": "inventory_added",
        "title": "添加产品：YSL 唇釉",
        "timestamp": "2024-12-14 18:20",
    },
    {
        "id": "activity-003",
        "type": "analysis_completed",
        "title": "皮肤分析：评分提升至 78",
        "timestamp": "2024-12-13 08:15",
    },
    {
        "id": "activity-004",
        "type": "streak",
        "title": "连续使用 15 天",
        "timestamp": "2024-12-12 08:00",
    },
]

# Calendar Events
MOCK_CALENDAR_EVENTS = [
    {
        "id": "event-001",
        "title": "项目汇报",
        "date": "2024-12-16",
        "time": "14:00",
        "type": "work",
        "suggested_style": "style-001",
    },
    {
        "id": "event-002",
        "title": "闺蜜聚会",
        "date": "2024-12-17",
        "time": "19:00",
        "type": "social",
        "suggested_style": "style-002",
    },
    {
        "id": "event-003",
        "title": "年会",
        "date": "2024-12-20",
        "time": "18:00",
        "type": "party",
        "suggested_style": "style-004",
    },
]


def get_product_by_id(product_id: str) -> Optional[Dict]:
    for product in MOCK_PRODUCTS:
        if product["id"] == product_id:
            return product
    return None


def get_style_by_id(style_id: str) -> Optional[Dict]:
    for style in MOCK_STYLES:
        if style["id"] == style_id:
            return style
    return None


def get_tutorial_by_id(tutorial_id: str) -> Optional[Dict]:
    for tutorial in MOCK_TUTORIALS:
        if tutorial["id"] == tutorial_id:
            return tutorial
    return None
