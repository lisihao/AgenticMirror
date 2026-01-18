'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shirt,
    Sparkles,
    Camera,
    Scan,
    Palette,
    Sun,
    Cloud,
    Thermometer,
    Calendar,
    MapPin,
    TrendingUp,
    Heart,
    Share2,
    ShoppingBag,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    RefreshCw,
    Zap,
    Eye,
    Ruler,
    User,
    Star,
    Clock,
    Bot,
    Wand2,
    Layers,
    Target,
    Award,
    ThumbsUp,
    ThumbsDown,
    Lightbulb,
    ArrowRight,
    Play,
    Volume2,
    Mic,
    MicOff,
    Search,
    ExternalLink,
    Flame,
    Gift,
    Crown,
    BadgeCheck,
    Truck,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// ============================================
// 🎨 AI 色彩智能分析系统 - 核心数据
// ============================================

// 用户个人色彩诊断结果
const personalColorDiagnosis = {
    // 基础肤色分析
    skinAnalysis: {
        undertone: 'warm', // warm/cool/neutral
        undertoneLabel: '暖色调',
        undertoneDesc: '您的皮肤底色偏黄，血管呈绿色，金色饰品比银色更衬肤色',
        depth: 'light-medium', // light/light-medium/medium/medium-deep/deep
        depthLabel: '浅-中等',
        clarity: 'soft', // clear/soft
        clarityLabel: '柔和型',
        clarityDesc: '眼睛、头发、皮肤对比度较低，适合柔和不刺眼的颜色',
    },
    // 四季色彩类型
    seasonType: {
        type: 'autumn',
        subType: 'soft-autumn',
        label: '柔和秋季型',
        description: '您属于暖色调+柔和感的组合，适合大地色系、秋叶色系等温暖而不张扬的颜色',
        characteristics: [
            '皮肤：象牙白或暖米色，可能有雀斑',
            '头发：深棕色或栗色，带暖调',
            '眼睛：深棕色或榛色，虹膜有金色斑点',
        ],
        celebrities: ['宋慧乔', '刘诗诗', 'Taylor Swift'],
    },
    // AI 置信度
    confidence: 94,
    analysisDate: '2024-01-15',
    dataPoints: 2847, // 基于多少个数据点分析
};

// 四季色彩完整色卡
const seasonalColorPalettes = {
    'soft-autumn': {
        name: '柔和秋季型',
        description: '温暖、柔和、自然的大地色系',
        bestColors: [
            { name: '焦糖棕', hex: '#D2691E', effect: '最佳代表色，极致显白' },
            { name: '橄榄绿', hex: '#808000', effect: '提升气质，显高级' },
            { name: '暖米色', hex: '#F5DEB3', effect: '柔和衬肤，日常百搭' },
            { name: '南瓜橙', hex: '#FF7518', effect: '提亮气色，活力感' },
            { name: '森林绿', hex: '#228B22', effect: '沉稳大气，衬白' },
            { name: '砖红色', hex: '#CB4154', effect: '显气色好，有活力' },
            { name: '驼色', hex: '#C19A6B', effect: '百搭高级，秋冬必备' },
            { name: '珊瑚粉', hex: '#F88379', effect: '温柔显白，约会首选' },
        ],
        neutralColors: [
            { name: '暖白', hex: '#FAF0E6', effect: '比纯白更衬肤' },
            { name: '深棕', hex: '#654321', effect: '代替黑色更和谐' },
            { name: '米灰', hex: '#C4B7A6', effect: '柔和中性色' },
        ],
        avoidColors: [
            { name: '纯黑', hex: '#000000', reason: '与柔和肤色对比过强，显脸色暗沉' },
            { name: '纯白', hex: '#FFFFFF', reason: '过于刺眼，不如暖白和谐' },
            { name: '荧光粉', hex: '#FF69B4', reason: '冷艳色调与暖肤色冲突，显黄显老' },
            { name: '宝蓝色', hex: '#0000FF', reason: '冷色调过重，与暖底色不协调' },
            { name: '银灰', hex: '#C0C0C0', reason: '冷灰色显脸色苍白无血色' },
            { name: '薰衣草紫', hex: '#E6E6FA', reason: '冷紫色不衬暖色调皮肤' },
        ],
    },
    'spring': {
        name: '春季型',
        description: '温暖、明亮、清新的色彩',
        preview: ['#FFD700', '#FF6347', '#98FB98', '#FFA500'],
    },
    'summer': {
        name: '夏季型',
        description: '冷色调、柔和、优雅的色彩',
        preview: ['#E6E6FA', '#DDA0DD', '#B0C4DE', '#FFC0CB'],
    },
    'winter': {
        name: '冬季型',
        description: '冷色调、高对比、鲜艳的色彩',
        preview: ['#000000', '#FF0000', '#0000FF', '#FFFFFF'],
    },
};

// 天气与色彩关系
const weatherColorGuide = {
    sunny: {
        label: '晴天',
        icon: '☀️',
        colorAdvice: '阳光充足时，可以驾驭更饱和的颜色',
        recommended: [
            { color: '珊瑚橙', hex: '#FF7F50', reason: '阳光下更显活力' },
            { color: '草木绿', hex: '#3CB371', reason: '与自然光线呼应' },
        ],
        avoid: [
            { color: '荧光色', hex: '#00FF00', reason: '阳光下过于刺眼' },
        ],
    },
    cloudy: {
        label: '阴天',
        icon: '☁️',
        colorAdvice: '光线柔和，适合穿着柔和的中间色调',
        recommended: [
            { color: '暖米色', hex: '#F5DEB3', reason: '阴天不显暗沉' },
            { color: '砖红色', hex: '#CB4154', reason: '提亮阴天气色' },
        ],
        avoid: [
            { color: '深灰', hex: '#696969', reason: '阴天穿着显沉闷' },
        ],
    },
    rainy: {
        label: '雨天',
        icon: '🌧️',
        colorAdvice: '光线暗淡，需要明亮色彩提升气色',
        recommended: [
            { color: '明黄色', hex: '#FFD700', reason: '雨天心情调节色' },
            { color: '暖橙色', hex: '#FFA500', reason: '增添活力感' },
        ],
        avoid: [
            { color: '藏蓝', hex: '#191970', reason: '雨天穿着过于沉闷' },
        ],
    },
};

// 季节与色彩关系
const seasonColorGuide = {
    spring: {
        label: '春季',
        months: '3-5月',
        theme: '万物复苏，色彩渐暖',
        palette: [
            { name: '樱花粉', hex: '#FFB7C5', desc: '春日专属浪漫色' },
            { name: '嫩草绿', hex: '#90EE90', desc: '新生命的颜色' },
            { name: '杏色', hex: '#FBCEB1', desc: '温柔过渡色' },
        ],
        yourBest: '珊瑚粉、暖杏色',
        tip: '春季光线渐强，您可以尝试更明亮的暖色调',
    },
    summer: {
        label: '夏季',
        months: '6-8月',
        theme: '热烈明艳，清爽为主',
        palette: [
            { name: '薄荷绿', hex: '#98FF98', desc: '视觉降温色' },
            { name: '天空蓝', hex: '#87CEEB', desc: '清爽感首选' },
            { name: '纯白', hex: '#FFFFFF', desc: '夏日经典' },
        ],
        yourBest: '暖白色、浅卡其（避免冷蓝色）',
        tip: '夏季虽热，但您是暖色调肤色，仍应以暖色为主',
    },
    autumn: {
        label: '秋季',
        months: '9-11月',
        theme: '丰收暖意，大地色系',
        palette: [
            { name: '枫叶红', hex: '#C41E3A', desc: '秋季代表色' },
            { name: '焦糖棕', hex: '#D2691E', desc: '高级感首选' },
            { name: '南瓜橙', hex: '#FF7518', desc: '活力暖色' },
        ],
        yourBest: '焦糖棕、驼色、橄榄绿（这是您的主场！）',
        tip: '秋季是您的黄金季节，大胆尝试各种大地色',
    },
    winter: {
        label: '冬季',
        months: '12-2月',
        theme: '沉稳厚重，质感为王',
        palette: [
            { name: '酒红', hex: '#722F37', desc: '冬日高级色' },
            { name: '墨绿', hex: '#004225', desc: '沉稳大气' },
            { name: '驼色', hex: '#C19A6B', desc: '百搭暖色' },
        ],
        yourBest: '驼色、酒红、深棕（避免纯黑大面积）',
        tip: '冬季可用深棕代替黑色，更衬您的暖色调',
    },
};

// 色彩搭配原理
const colorMatchingPrinciples = [
    {
        name: '同色系搭配',
        nameEn: 'Monochromatic',
        description: '使用同一颜色的不同深浅，最安全高级的搭配方式',
        example: ['#D2691E', '#DEB887', '#F5DEB3'],
        exampleDesc: '焦糖 + 驼色 + 米色',
        difficulty: '简单',
        yourTip: '您穿全身驼色系会非常高级',
    },
    {
        name: '邻近色搭配',
        nameEn: 'Analogous',
        description: '色轮上相邻的颜色，和谐自然',
        example: ['#D2691E', '#FF7518', '#FFD700'],
        exampleDesc: '棕色 + 橙色 + 金色',
        difficulty: '简单',
        yourTip: '橙棕色系是您的安全区',
    },
    {
        name: '对比色搭配',
        nameEn: 'Complementary',
        description: '色轮上对立的颜色，视觉冲击强',
        example: ['#D2691E', '#4169E1'],
        exampleDesc: '棕色 + 蓝色',
        difficulty: '中等',
        yourTip: '蓝色需选择偏暖的牛仔蓝，避免宝蓝',
    },
    {
        name: '三角色搭配',
        nameEn: 'Triadic',
        description: '色轮上等距的三个颜色，丰富有层次',
        example: ['#D2691E', '#228B22', '#9932CC'],
        exampleDesc: '棕色 + 绿色 + 紫色',
        difficulty: '高级',
        yourTip: '紫色选择偏暖的茄紫色',
    },
];

// AI 色彩模拟对比
const colorSimulationResults = [
    {
        color: '焦糖棕',
        hex: '#D2691E',
        onYou: {
            skinEffect: '显白提亮',
            faceEffect: '气色红润',
            overallScore: 98,
            aiComment: '这是您的命定色！穿上立刻提升2个色号',
        },
    },
    {
        color: '宝蓝色',
        hex: '#0000FF',
        onYou: {
            skinEffect: '显黄暗沉',
            faceEffect: '气色蜡黄',
            overallScore: 35,
            aiComment: '强冷色调与您的暖底色严重冲突，建议避免',
        },
    },
    {
        color: '橄榄绿',
        hex: '#808000',
        onYou: {
            skinEffect: '衬白显贵',
            faceEffect: '沉稳高级',
            overallScore: 92,
            aiComment: '大地色系绿色非常适合您，显得成熟有质感',
        },
    },
    {
        color: '荧光粉',
        hex: '#FF69B4',
        onYou: {
            skinEffect: '显黑显老',
            faceEffect: '肤色不均',
            overallScore: 28,
            aiComment: '高饱和冷粉色会让您的皮肤看起来暗沉发黄',
        },
    },
    {
        color: '纯黑',
        hex: '#000000',
        onYou: {
            skinEffect: '对比过强',
            faceEffect: '显脸大',
            overallScore: 55,
            aiComment: '可小面积使用，大面积穿着显得沉闷，建议用深棕代替',
        },
    },
    {
        color: '珊瑚粉',
        hex: '#F88379',
        onYou: {
            skinEffect: '温柔提亮',
            faceEffect: '显年轻',
            overallScore: 90,
            aiComment: '暖粉色非常适合您，比冷粉色更衬您的肤色',
        },
    },
];

// 用户身材数据
const userBodyProfile = {
    height: 165,
    weight: 52,
    bodyType: '梨形身材',
    bodyTypeDesc: '肩窄臀宽，腰线明显',
    skinTone: '暖白色调',
    seasonType: '柔和秋季型',
    measurements: {
        shoulder: 38,
        bust: 84,
        waist: 66,
        hip: 92,
    },
    strengths: ['腰线纤细', '腿型修长', '锁骨好看'],
    challenges: ['胯部较宽', '肩膀较窄'],
};

// 今日穿搭分析
const currentOutfitAnalysis = {
    overallScore: 72,
    items: [
        { type: '上装', name: '白色衬衫', color: '#FFFFFF', fit: 'good', score: 85 },
        { type: '下装', name: '深蓝牛仔裤', color: '#1E3A5F', fit: 'tight', score: 65 },
        { type: '鞋子', name: '白色运动鞋', color: '#F5F5F5', fit: 'good', score: 80 },
        { type: '配饰', name: '金色项链', color: '#FFD700', fit: 'good', score: 88 },
    ],
    colorHarmony: 78,
    styleConsistency: 82,
    occasionMatch: 68,
    issues: [
        {
            severity: 'warning',
            item: '深蓝牛仔裤',
            issue: '版型偏紧，强调了胯部宽度',
            suggestion: '建议换成直筒或阔腿裤，视觉上拉长腿型',
        },
        {
            severity: 'info',
            item: '整体搭配',
            issue: '上下装颜色对比较强',
            suggestion: '可加入中间色过渡，如米色腰带',
        },
    ],
    highlights: [
        { item: '金色项链', reason: '暖色调配饰与您的暖秋型肤色完美匹配' },
        { item: '白色衬衫', reason: '简洁大方，展现锁骨优势' },
    ],
};

// AI 推荐穿搭方案
const aiOutfitRecommendations = [
    {
        id: 1,
        name: '职场优雅风',
        occasion: '今日部门会议',
        matchScore: 96,
        style: '知性干练',
        items: [
            { type: '上装', name: '奶白色西装外套', color: '#FAF0E6', brand: 'Theory' },
            { type: '内搭', name: '黑色高领针织', color: '#1A1A1A', brand: 'COS' },
            { type: '下装', name: '卡其色阔腿裤', color: '#C3B091', brand: 'Massimo Dutti' },
            { type: '鞋子', name: '裸色尖头高跟', color: '#E8CDAD', brand: 'Jimmy Choo' },
            { type: '包包', name: '棕色托特包', color: '#8B4513', brand: 'Celine' },
        ],
        aiReason: '阔腿裤平衡胯部比例，西装外套增加肩宽，打造完美X型身材',
        colorAnalysis: '奶白+卡其+棕色，同色系渐变，高级感十足',
        totalPrice: '约¥15,800',
        alternatives: '平替方案约¥1,200',
    },
    {
        id: 2,
        name: '约会甜美风',
        occasion: '周末约会',
        matchScore: 94,
        style: '温柔甜美',
        items: [
            { type: '上装', name: '浅粉针织开衫', color: '#FFB6C1', brand: 'Sandro' },
            { type: '内搭', name: '白色吊带', color: '#FFFFFF', brand: 'Reformation' },
            { type: '下装', name: 'A字半裙', color: '#F5DEB3', brand: 'Maje' },
            { type: '鞋子', name: '芭蕾舞鞋', color: '#FFC0CB', brand: 'Repetto' },
            { type: '配饰', name: '珍珠耳环', color: '#FFFAF0', brand: 'Mikimoto' },
        ],
        aiReason: 'A字裙完美遮盖胯部，高腰设计拉长腿部比例',
        colorAnalysis: '粉白杏三色，温柔配色显肤白',
        totalPrice: '约¥12,500',
        alternatives: '平替方案约¥800',
    },
    {
        id: 3,
        name: '周末休闲风',
        occasion: '闺蜜下午茶',
        matchScore: 91,
        style: '慵懒时髦',
        items: [
            { type: '上装', name: '焦糖色毛衣', color: '#D2691E', brand: 'Acne Studios' },
            { type: '下装', name: '米白阔腿裤', color: '#F5F5DC', brand: 'The Row' },
            { type: '外套', name: '驼色大衣', color: '#C19A6B', brand: 'Max Mara' },
            { type: '鞋子', name: '乐福鞋', color: '#8B4513', brand: "Tod's" },
            { type: '包包', name: '棋盘格腋下包', color: '#DEB887', brand: 'Bottega Veneta' },
        ],
        aiReason: '全身暖色调与您的暖秋型肤色完美呼应，大衣增加气场',
        colorAnalysis: '焦糖+驼色+米白，秋冬最in配色',
        totalPrice: '约¥45,000',
        alternatives: '平替方案约¥2,500',
    },
];

// 今日天气与场合
const todayContext = {
    weather: { temp: 18, condition: '多云', humidity: 65, uv: 2 },
    schedule: [
        { time: '09:00', event: '部门会议', dress: 'business casual' },
        { time: '12:30', event: '客户午餐', dress: 'business' },
        { time: '19:00', event: '闺蜜聚会', dress: 'casual chic' },
    ],
};

// 色彩搭配建议
const colorRecommendations = {
    bestColors: [
        { name: '暖白', hex: '#FAF0E6', reason: '提亮肤色' },
        { name: '焦糖', hex: '#D2691E', reason: '暖秋型最佳色' },
        { name: '橄榄绿', hex: '#808000', reason: '显白显贵' },
        { name: '珊瑚橙', hex: '#FF7F50', reason: '增添气色' },
    ],
    avoidColors: [
        { name: '荧光色', hex: '#00FF00', reason: '显黑显老' },
        { name: '冷灰', hex: '#708090', reason: '与肤色不协调' },
        { name: '正黑', hex: '#000000', reason: '大面积穿着显沉闷' },
    ],
};

// 身材穿搭技巧
const stylingTips = [
    {
        category: '上半身',
        tips: [
            { tip: '选择有肩部设计的上衣', effect: '视觉上增加肩宽' },
            { tip: '领口选择V领或方领', effect: '拉长颈部线条' },
            { tip: '腰线上移，选择短款上衣', effect: '优化身材比例' },
        ],
    },
    {
        category: '下半身',
        tips: [
            { tip: '首选A字裙或阔腿裤', effect: '遮盖胯部宽度' },
            { tip: '避免紧身裤和铅笔裙', effect: '减少对胯部的强调' },
            { tip: '高腰设计是关键', effect: '拉长腿部比例' },
        ],
    },
    {
        category: '配饰',
        tips: [
            { tip: '选择暖金色金属', effect: '与暖秋型肤色呼应' },
            { tip: '项链选择锁骨链', effect: '展示锁骨优势' },
            { tip: '腰带强调腰线', effect: '打造沙漏曲线' },
        ],
    },
];

// 衣橱分析
const wardrobeAnalysis = {
    totalItems: 156,
    categories: [
        { name: '上装', count: 45, ratio: 29 },
        { name: '下装', count: 32, ratio: 21 },
        { name: '裙装', count: 18, ratio: 12 },
        { name: '外套', count: 23, ratio: 15 },
        { name: '鞋子', count: 28, ratio: 18 },
        { name: '配饰', count: 10, ratio: 5 },
    ],
    colorDistribution: [
        { color: '黑色', hex: '#000000', percent: 35 },
        { color: '白色', hex: '#FFFFFF', percent: 25 },
        { color: '蓝色', hex: '#4169E1', percent: 15 },
        { color: '米色', hex: '#F5F5DC', percent: 10 },
        { color: '其他', hex: '#808080', percent: 15 },
    ],
    suggestions: [
        '黑色单品过多，建议增加暖色调单品',
        '缺少A字裙，这是您身材的最佳单品',
        '外套数量充足，但缺少浅色款',
    ],
    matchPossibilities: 2847,
};

// ============================================
// 🛒 Agentic Commerce - 搜推广一体化系统
// ============================================

// 语音搜索 - 自然语言理解示例
const voiceSearchExamples = [
    '帮我找一件适合约会穿的焦糖色连衣裙',
    '我明天有面试，帮我搭配一套职业装',
    '有没有适合秋天穿的针织开衫',
    '给我推荐一条显瘦的裤子',
    '找一双百搭的通勤鞋',
];

// 语音搜索结果 - 模拟AI理解后的搜索
const voiceSearchResult = {
    query: '帮我找一件适合约会穿的焦糖色连衣裙',
    aiUnderstanding: {
        场景: '约会',
        品类: '连衣裙',
        颜色: '焦糖色',
        风格: '浪漫、显气质',
        您的适合度: '焦糖色是您的命定色',
    },
    searchSources: ['天猫', '京东', '小红书同款', '得物', '品牌官网'],
    results: [
        {
            id: 'prod-001',
            name: '秋冬新款焦糖色法式复古连衣裙',
            brand: 'UR',
            price: 459,
            originalPrice: 599,
            image: '/demo/dress-caramel-1.jpg',
            colorMatch: 98,
            bodyMatch: 95,
            occasionMatch: 92,
            overallScore: 95,
            aiReason: '焦糖色完美匹配您的肤色，A字版型修饰梨形身材，法式设计约会首选',
            tags: ['显白神器', '约会必备', '小红书爆款'],
            source: '天猫',
            salesCount: '2.3万+',
            rating: 4.9,
            type: 'organic', // organic = 自然搜索结果
        },
        {
            id: 'prod-002',
            name: '轻奢焦糖色针织连衣裙',
            brand: 'MO&Co.',
            price: 899,
            originalPrice: 1299,
            image: '/demo/dress-caramel-2.jpg',
            colorMatch: 96,
            bodyMatch: 92,
            occasionMatch: 90,
            overallScore: 93,
            aiReason: '高级针织面料，收腰设计突出您的腰线优势，质感满分',
            tags: ['大牌品质', '约会穿搭', '显瘦'],
            source: '京东',
            salesCount: '8600+',
            rating: 4.8,
            type: 'organic',
        },
        {
            id: 'prod-003',
            name: 'EDITION 焦糖色缎面连衣裙',
            brand: 'EDITION',
            price: 1580,
            originalPrice: 2280,
            image: '/demo/dress-caramel-3.jpg',
            colorMatch: 97,
            bodyMatch: 94,
            occasionMatch: 95,
            overallScore: 95,
            aiReason: '缎面材质高级感十足，V领设计延长颈线，适合重要约会',
            tags: ['轻奢首选', '高级感', '适合重要场合'],
            source: '品牌官网',
            salesCount: '3200+',
            rating: 4.9,
            type: 'sponsored', // sponsored = 付费广告，但展示方式自然
            sponsorLabel: 'AI 优选',
        },
    ],
};

// AI 智能推荐 - 基于衣橱缺口
const aiRecommendations = {
    // 基于衣橱分析的缺口推荐
    wardrobeGap: [
        {
            id: 'gap-001',
            gapAnalysis: '您的衣橱缺少暖色调单品，35%是黑色',
            category: 'A字裙',
            reason: '完美修饰梨形身材，遮盖胯部',
            urgency: 'high',
            products: [
                {
                    id: 'rec-001',
                    name: '焦糖色高腰A字半身裙',
                    brand: 'ZARA',
                    price: 299,
                    originalPrice: 399,
                    colorMatch: 98,
                    aiReason: '这是您衣橱最需要的单品！焦糖色+A字版型=完美',
                    image: '/demo/skirt-a-1.jpg',
                    tags: ['衣橱必备', '显瘦神裙'],
                    type: 'recommendation',
                },
                {
                    id: 'rec-002',
                    name: '驼色羊毛A字裙',
                    brand: 'Theory',
                    price: 1280,
                    originalPrice: 1680,
                    colorMatch: 94,
                    aiReason: '高端面料，秋冬必备，可与您现有的32件上装完美搭配',
                    image: '/demo/skirt-a-2.jpg',
                    tags: ['高级质感', '百搭单品'],
                    type: 'sponsored',
                    sponsorLabel: 'AI 发现',
                },
            ],
        },
        {
            id: 'gap-002',
            gapAnalysis: '您有45件上装但只有10件配饰',
            category: '金色配饰',
            reason: '金色更衬您的暖色调肤色',
            urgency: 'medium',
            products: [
                {
                    id: 'rec-003',
                    name: '轻奢金色锁骨链',
                    brand: 'APM Monaco',
                    price: 680,
                    originalPrice: 980,
                    colorMatch: 96,
                    aiReason: '金色饰品比银色更衬您，这款锁骨链能突出您的颈线优势',
                    image: '/demo/necklace-gold.jpg',
                    tags: ['显锁骨', '百搭款'],
                    type: 'recommendation',
                },
            ],
        },
    ],

    // 基于场景和行程的推荐
    scheduleBasedPicks: {
        title: '为您的下周行程准备',
        events: [
            {
                date: '周三',
                event: '客户提案会议',
                suggestion: '职业感但不沉闷',
                product: {
                    id: 'sche-001',
                    name: '奶白色西装套装',
                    brand: 'COS',
                    price: 1599,
                    image: '/demo/suit-white.jpg',
                    aiReason: '白色西装增加肩宽视觉效果，弥补您肩窄的特点，提案会议专业感满分',
                    type: 'recommendation',
                },
            },
            {
                date: '周六',
                event: '闺蜜下午茶',
                suggestion: '休闲浪漫',
                product: {
                    id: 'sche-002',
                    name: '珊瑚粉针织套装',
                    brand: 'Massimo Dutti',
                    price: 899,
                    image: '/demo/knit-coral.jpg',
                    aiReason: '珊瑚粉是您的约会最佳色，针织材质下午茶刚刚好',
                    type: 'sponsored',
                    sponsorLabel: '为您发现',
                },
            },
        ],
    },

    // 基于天气的推荐
    weatherBasedPicks: {
        title: '本周天气穿搭',
        forecast: '周四降温至12°C，周末有小雨',
        products: [
            {
                id: 'weather-001',
                name: '驼色羊绒大衣',
                brand: 'Max Mara',
                price: 8900,
                originalPrice: 12800,
                image: '/demo/coat-camel.jpg',
                aiReason: '驼色是您的秋冬主色调，这件大衣能让您在降温天依然显白有气质',
                urgency: '周四前入手',
                type: 'sponsored',
                sponsorLabel: 'AI 优选',
            },
        ],
    },

    // 小红书/抖音趋势匹配
    trendingPicks: {
        title: '适合您的流行趋势',
        source: '小红书热搜 · 抖音同款',
        items: [
            {
                id: 'trend-001',
                trendName: '#秋日奶茶色穿搭',
                hotness: '3.2万笔记',
                product: {
                    name: '奶茶色针织开衫',
                    brand: 'Uniqlo U',
                    price: 299,
                    image: '/demo/cardigan-milk.jpg',
                    colorMatch: 92,
                    aiReason: '奶茶色属于您的柔和秋季色板，这波热搜您完全能驾驭',
                    type: 'organic',
                },
            },
            {
                id: 'trend-002',
                trendName: '#老钱风穿搭',
                hotness: '5.8万笔记',
                product: {
                    name: '墨绿色丝绒西装',
                    brand: 'Sandro',
                    price: 2990,
                    originalPrice: 4290,
                    image: '/demo/blazer-green.jpg',
                    colorMatch: 88,
                    aiReason: '老钱风的墨绿色您能hold住，但建议搭配暖色内搭中和',
                    type: 'sponsored',
                    sponsorLabel: 'AI 发现',
                },
            },
        ],
    },
};

// 品牌合作专区 - 原生广告
const brandPartnerShowcase = {
    title: 'AI 为您精选品牌',
    subtitle: '根据您的色彩和身材特点，这些品牌最适合您',
    partners: [
        {
            brand: 'Theory',
            logo: '/brands/theory.png',
            matchReason: '极简风格，版型修身，非常适合梨形身材',
            matchScore: 94,
            featuredProduct: {
                name: '驼色羊毛阔腿裤',
                price: 2280,
                originalPrice: 3280,
                image: '/demo/pants-camel.jpg',
                aiReason: '阔腿版型平衡您的胯宽，驼色显白又高级',
            },
            exclusive: '镜子用户专享 8 折',
        },
        {
            brand: 'COS',
            logo: '/brands/cos.png',
            matchReason: '北欧简约，剪裁利落，适合职场穿搭',
            matchScore: 91,
            featuredProduct: {
                name: '奶白色V领毛衣',
                price: 890,
                image: '/demo/sweater-white.jpg',
                aiReason: 'V领延长颈线，奶白色比纯白更衬您的暖肤色',
            },
            exclusive: '新品首发',
        },
        {
            brand: 'ICICLE',
            logo: '/brands/icicle.png',
            matchReason: '天然面料，舒适优雅，适合您的柔和气质',
            matchScore: 89,
            featuredProduct: {
                name: '焦糖色羊绒围巾',
                price: 1280,
                image: '/demo/scarf-caramel.jpg',
                aiReason: '羊绒围巾是秋冬点睛单品，焦糖色让您气色翻倍',
            },
            exclusive: '限量款',
        },
    ],
};

export default function StylingPage() {
    const [activeTab, setActiveTab] = useState<'color' | 'analysis' | 'recommend' | 'wardrobe' | 'tips'>('color');
    const [selectedOutfit, setSelectedOutfit] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    // Agentic Commerce 状态
    const [isListening, setIsListening] = useState(false);
    const [voiceQuery, setVoiceQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchingProgress, setSearchingProgress] = useState(0);
    const [activeCommerceTab, setActiveCommerceTab] = useState<'search' | 'recommend' | 'trending' | 'brands'>('recommend');

    // 模拟语音搜索
    const startVoiceSearch = () => {
        setIsListening(true);
        setVoiceQuery('');
        setShowSearchResults(false);

        // 模拟语音识别过程
        setTimeout(() => {
            setVoiceQuery('帮我找一件适合约会穿的焦糖色连衣裙');
            setIsListening(false);

            // 开始搜索动画
            setSearchingProgress(0);
            const interval = setInterval(() => {
                setSearchingProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setShowSearchResults(true);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 80);
        }, 2000);
    };

    // 模拟扫描动画
    const startScan = () => {
        setIsScanning(true);
        setScanProgress(0);
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
    };

    useEffect(() => {
        startScan();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
            {/* 顶部状态栏 */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-3 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm text-gray-600">AI 穿搭顾问在线</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Cloud className="w-4 h-4" />
                            <span>{todayContext.weather.temp}°C {todayContext.weather.condition}</span>
                        </div>
                    </div>
                    <button
                        onClick={startScan}
                        disabled={isScanning}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                            isScanning
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg"
                        )}
                    >
                        {isScanning ? (
                            <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                分析中...
                            </>
                        ) : (
                            <>
                                <Camera className="w-4 h-4" />
                                重新扫描穿搭
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="p-6">
                {/* 标题区 */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4"
                    >
                        <Shirt className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-amber-700">AI Agentic 智能穿搭系统</span>
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500">
                            您的专属 AI 穿搭顾问
                        </span>
                    </h1>
                    <p className="text-gray-500">基于身材分析 · 场合智能匹配 · 色彩科学搭配</p>
                </div>

                {/* Tab 导航 */}
                <div className="flex justify-center gap-2 mb-8 flex-wrap">
                    {[
                        { id: 'color', label: 'AI 色彩诊断', icon: Palette, highlight: true },
                        { id: 'analysis', label: '今日穿搭分析', icon: Scan },
                        { id: 'recommend', label: 'AI 推荐方案', icon: Sparkles },
                        { id: 'wardrobe', label: '衣橱管理', icon: Layers },
                        { id: 'tips', label: '穿搭技巧', icon: Lightbulb },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all",
                                activeTab === tab.id
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                                    : "bg-white text-gray-600 hover:bg-amber-50"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* AI 色彩诊断 */}
                    {activeTab === 'color' && (
                        <motion.div
                            key="color"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* 个人色彩诊断卡 */}
                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* 左侧：诊断结果 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                                                <Palette className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">您的色彩类型</h3>
                                                <p className="text-xs text-gray-500">基于 {personalColorDiagnosis.dataPoints} 个数据点分析</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-amber-600">{personalColorDiagnosis.confidence}%</div>
                                            <div className="text-xs text-gray-400">置信度</div>
                                        </div>
                                    </div>

                                    <div className="text-center py-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl mb-4">
                                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-1">
                                            {personalColorDiagnosis.seasonType.label}
                                        </div>
                                        <div className="text-sm text-gray-600">{personalColorDiagnosis.seasonType.description}</div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="p-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-gray-600">肤色底调</span>
                                                <span className="text-sm font-bold text-amber-600">{personalColorDiagnosis.skinAnalysis.undertoneLabel}</span>
                                            </div>
                                            <p className="text-xs text-gray-500">{personalColorDiagnosis.skinAnalysis.undertoneDesc}</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-gray-600">色彩感觉</span>
                                                <span className="text-sm font-bold text-amber-600">{personalColorDiagnosis.skinAnalysis.clarityLabel}</span>
                                            </div>
                                            <p className="text-xs text-gray-500">{personalColorDiagnosis.skinAnalysis.clarityDesc}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t">
                                        <div className="text-xs text-gray-500 mb-2">同类型明星</div>
                                        <div className="flex gap-2">
                                            {personalColorDiagnosis.seasonType.celebrities.map((celeb, i) => (
                                                <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                                                    {celeb}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 中间：专属色卡 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Star className="w-5 h-5 text-amber-500" />
                                        您的专属色卡
                                    </h3>

                                    <div className="mb-6">
                                        <div className="text-sm font-medium text-green-700 mb-3 flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4" /> 推荐色彩（穿上立刻显白）
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            {seasonalColorPalettes['soft-autumn'].bestColors.map((color, i) => (
                                                <div key={i} className="text-center group cursor-pointer">
                                                    <div
                                                        className="aspect-square rounded-xl mb-1 shadow-sm group-hover:scale-110 transition-transform ring-2 ring-transparent group-hover:ring-amber-400"
                                                        style={{ backgroundColor: color.hex }}
                                                    />
                                                    <div className="text-xs text-gray-600 truncate">{color.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="text-sm font-medium text-gray-600 mb-3">百搭中性色</div>
                                        <div className="flex gap-2">
                                            {seasonalColorPalettes['soft-autumn'].neutralColors.map((color, i) => (
                                                <div key={i} className="flex-1 text-center">
                                                    <div
                                                        className="aspect-square rounded-xl mb-1 shadow-sm border"
                                                        style={{ backgroundColor: color.hex }}
                                                    />
                                                    <div className="text-xs text-gray-500">{color.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium text-red-600 mb-3 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" /> 避免色彩（显黑显老）
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            {seasonalColorPalettes['soft-autumn'].avoidColors.slice(0, 6).map((color, i) => (
                                                <div key={i} className="text-center opacity-70">
                                                    <div className="relative">
                                                        <div
                                                            className="aspect-square rounded-xl mb-1 shadow-sm"
                                                            style={{ backgroundColor: color.hex }}
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-8 h-0.5 bg-red-500 rotate-45 rounded" />
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-gray-400 truncate">{color.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 右侧：AI 模拟效果 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Wand2 className="w-5 h-5 text-amber-500" />
                                        AI 色彩模拟
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-4">看看不同颜色穿在您身上的效果</p>

                                    <div className="space-y-3">
                                        {colorSimulationResults.map((sim, i) => (
                                            <div key={i} className={cn(
                                                "p-3 rounded-xl border-2 transition-all",
                                                sim.onYou.overallScore >= 80
                                                    ? "bg-green-50 border-green-200"
                                                    : sim.onYou.overallScore >= 50
                                                    ? "bg-amber-50 border-amber-200"
                                                    : "bg-red-50 border-red-200"
                                            )}>
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-12 h-12 rounded-xl shadow-inner flex-shrink-0"
                                                        style={{ backgroundColor: sim.hex }}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium text-gray-800">{sim.color}</span>
                                                            <span className={cn(
                                                                "text-lg font-bold",
                                                                sim.onYou.overallScore >= 80 ? "text-green-600" :
                                                                sim.onYou.overallScore >= 50 ? "text-amber-600" : "text-red-600"
                                                            )}>
                                                                {sim.onYou.overallScore}分
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-2 mt-1">
                                                            <span className={cn(
                                                                "text-xs px-2 py-0.5 rounded",
                                                                sim.onYou.overallScore >= 80 ? "bg-green-100 text-green-700" :
                                                                sim.onYou.overallScore >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                                                            )}>
                                                                {sim.onYou.skinEffect}
                                                            </span>
                                                            <span className={cn(
                                                                "text-xs px-2 py-0.5 rounded",
                                                                sim.onYou.overallScore >= 80 ? "bg-green-100 text-green-700" :
                                                                sim.onYou.overallScore >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                                                            )}>
                                                                {sim.onYou.faceEffect}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1 truncate">{sim.onYou.aiComment}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 天气与季节色彩指南 */}
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* 今日天气色彩建议 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                            <Cloud className="w-5 h-5 text-blue-500" />
                                            今日天气色彩建议
                                        </h3>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                            {todayContext.weather.condition} {todayContext.weather.temp}°C
                                        </span>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-4">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">AI 分析：</span>
                                            {weatherColorGuide.cloudy.colorAdvice}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm font-medium text-green-700 mb-2">今日推荐</div>
                                            {weatherColorGuide.cloudy.recommended.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 mb-2">
                                                    <div className="w-6 h-6 rounded" style={{ backgroundColor: item.hex }} />
                                                    <div>
                                                        <div className="text-sm font-medium">{item.color}</div>
                                                        <div className="text-xs text-gray-500">{item.reason}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-red-600 mb-2">今日避免</div>
                                            {weatherColorGuide.cloudy.avoid.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 mb-2 opacity-70">
                                                    <div className="w-6 h-6 rounded relative" style={{ backgroundColor: item.hex }}>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-4 h-0.5 bg-red-500 rotate-45" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-500">{item.color}</div>
                                                        <div className="text-xs text-gray-400">{item.reason}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 当前季节色彩指南 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-orange-500" />
                                            秋季专属色彩
                                        </h3>
                                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                                            {seasonColorGuide.autumn.months}
                                        </span>
                                    </div>

                                    <div className="flex gap-2 mb-4">
                                        {seasonColorGuide.autumn.palette.map((color, i) => (
                                            <div key={i} className="flex-1 text-center">
                                                <div
                                                    className="aspect-square rounded-xl mb-1 shadow-sm"
                                                    style={{ backgroundColor: color.hex }}
                                                />
                                                <div className="text-xs font-medium text-gray-700">{color.name}</div>
                                                <div className="text-xs text-gray-400">{color.desc}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                                        <div className="text-sm font-medium text-orange-700 mb-1">🎯 您的秋季最佳色</div>
                                        <div className="text-sm text-gray-700 mb-2">{seasonColorGuide.autumn.yourBest}</div>
                                        <div className="text-xs text-gray-500">💡 {seasonColorGuide.autumn.tip}</div>
                                    </div>
                                </div>
                            </div>

                            {/* 色彩搭配原理 */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-amber-500" />
                                    AI 色彩搭配原理
                                </h3>

                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {colorMatchingPrinciples.map((principle, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-gray-800">{principle.name}</span>
                                                <span className={cn(
                                                    "text-xs px-2 py-0.5 rounded",
                                                    principle.difficulty === '简单' ? 'bg-green-100 text-green-700' :
                                                    principle.difficulty === '中等' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                                )}>
                                                    {principle.difficulty}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500 mb-3">{principle.description}</div>
                                            <div className="flex gap-1 mb-2">
                                                {principle.example.map((color, j) => (
                                                    <div
                                                        key={j}
                                                        className="flex-1 h-8 first:rounded-l-lg last:rounded-r-lg"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-xs text-gray-600 mb-2">{principle.exampleDesc}</div>
                                            <div className="text-xs text-amber-600 font-medium">
                                                ✨ {principle.yourTip}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* 四季色彩对比 */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-amber-500" />
                                    四季色彩类型对比
                                </h3>
                                <p className="text-sm text-gray-500 mb-6">了解不同色彩类型的特点，您属于暖秋型</p>

                                <div className="grid md:grid-cols-4 gap-4">
                                    {['spring', 'summer', 'autumn', 'winter'].map((season) => {
                                        const data = seasonColorGuide[season as keyof typeof seasonColorGuide];
                                        const isYou = season === 'autumn';
                                        return (
                                            <div
                                                key={season}
                                                className={cn(
                                                    "p-4 rounded-xl border-2 transition-all",
                                                    isYou ? "bg-amber-50 border-amber-400 ring-2 ring-amber-200" : "bg-gray-50 border-gray-200"
                                                )}
                                            >
                                                {isYou && (
                                                    <div className="text-xs font-bold text-amber-600 mb-2 flex items-center gap-1">
                                                        <Star className="w-3 h-3" /> 您的类型
                                                    </div>
                                                )}
                                                <div className="text-lg font-bold text-gray-800 mb-1">{data.label}</div>
                                                <div className="text-xs text-gray-500 mb-3">{data.theme}</div>
                                                <div className="flex gap-1 mb-2">
                                                    {data.palette.map((color, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex-1 h-6 first:rounded-l last:rounded-r"
                                                            style={{ backgroundColor: color.hex }}
                                                        />
                                                    ))}
                                                </div>
                                                {isYou && (
                                                    <div className="text-xs text-amber-700 font-medium mt-2">
                                                        最佳：{data.yourBest}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* 今日穿搭分析 */}
                    {activeTab === 'analysis' && (
                        <motion.div
                            key="analysis"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid lg:grid-cols-3 gap-6"
                        >
                            {/* 左侧：身材数据 */}
                            <div className="space-y-6">
                                {/* 身材档案 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <User className="w-5 h-5 text-amber-500" />
                                        <h3 className="font-bold text-gray-800">我的身材档案</h3>
                                    </div>

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                                            <User className="w-10 h-10 text-amber-500" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-gray-800">{userBodyProfile.bodyType}</div>
                                            <div className="text-sm text-gray-500">{userBodyProfile.bodyTypeDesc}</div>
                                            <div className="text-sm text-amber-600 mt-1">{userBodyProfile.seasonType}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="p-3 bg-amber-50 rounded-xl text-center">
                                            <div className="text-xs text-gray-500">身高</div>
                                            <div className="text-lg font-bold text-amber-700">{userBodyProfile.height}cm</div>
                                        </div>
                                        <div className="p-3 bg-orange-50 rounded-xl text-center">
                                            <div className="text-xs text-gray-500">体重</div>
                                            <div className="text-lg font-bold text-orange-700">{userBodyProfile.weight}kg</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="text-xs text-gray-500">身材优势</div>
                                        <div className="flex flex-wrap gap-2">
                                            {userBodyProfile.strengths.map((s, i) => (
                                                <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                                    ✓ {s}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2">需要修饰</div>
                                        <div className="flex flex-wrap gap-2">
                                            {userBodyProfile.challenges.map((c, i) => (
                                                <span key={i} className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 适合色彩 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Palette className="w-5 h-5 text-amber-500" />
                                        <h3 className="font-bold text-gray-800">您的专属色卡</h3>
                                    </div>

                                    <div className="mb-4">
                                        <div className="text-xs text-gray-500 mb-2">推荐色彩</div>
                                        <div className="flex gap-2">
                                            {colorRecommendations.bestColors.map((color, i) => (
                                                <div key={i} className="flex-1 text-center">
                                                    <div
                                                        className="w-full aspect-square rounded-lg mb-1 border border-gray-200"
                                                        style={{ backgroundColor: color.hex }}
                                                    />
                                                    <div className="text-xs text-gray-600">{color.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500 mb-2">避免色彩</div>
                                        <div className="flex gap-2">
                                            {colorRecommendations.avoidColors.map((color, i) => (
                                                <div key={i} className="flex-1 text-center opacity-60">
                                                    <div
                                                        className="w-full aspect-square rounded-lg mb-1 border border-gray-200 relative"
                                                        style={{ backgroundColor: color.hex }}
                                                    >
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-full h-0.5 bg-red-500 rotate-45" />
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-gray-400">{color.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 中间：穿搭扫描 */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200">
                                    {/* 扫描效果 */}
                                    {isScanning && (
                                        <motion.div
                                            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                                            animate={{ top: ['0%', '100%', '0%'] }}
                                            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                                        />
                                    )}

                                    {/* 人形轮廓 */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative w-32 h-56">
                                            {/* 简化人形 */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-amber-200 border-2 border-amber-400" />
                                            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-20 h-24 rounded-t-xl bg-white border-2 border-amber-400" />
                                            <div className="absolute top-36 left-1/2 -translate-x-1/2 w-24 h-20 bg-blue-900 border-2 border-amber-400 rounded-b-lg" />
                                        </div>
                                    </div>

                                    {/* 扫描进度 */}
                                    {isScanning && (
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                                <span>AI 分析中...</span>
                                                <span>{scanProgress}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                                                    style={{ width: `${scanProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* 评分显示 */}
                                    {!isScanning && (
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                                            <div className="text-xs text-gray-500">今日穿搭评分</div>
                                            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                                                {currentOutfitAnalysis.overallScore}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* 单品分析 */}
                                <div className="p-4 bg-gray-50">
                                    <div className="text-sm font-medium text-gray-700 mb-3">单品识别</div>
                                    <div className="space-y-2">
                                        {currentOutfitAnalysis.items.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 p-2 bg-white rounded-lg">
                                                <div
                                                    className="w-8 h-8 rounded-lg border"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium">{item.name}</div>
                                                    <div className="text-xs text-gray-400">{item.type}</div>
                                                </div>
                                                <div className={cn(
                                                    "text-sm font-bold",
                                                    item.score >= 80 ? "text-green-500" :
                                                    item.score >= 60 ? "text-amber-500" : "text-red-500"
                                                )}>
                                                    {item.score}分
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 右侧：问题与建议 */}
                            <div className="space-y-6">
                                {/* 评分细则 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <h3 className="font-bold text-gray-800 mb-4">评分细则</h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: '色彩协调', score: currentOutfitAnalysis.colorHarmony, icon: Palette },
                                            { label: '风格统一', score: currentOutfitAnalysis.styleConsistency, icon: Layers },
                                            { label: '场合匹配', score: currentOutfitAnalysis.occasionMatch, icon: Target },
                                        ].map((item, i) => (
                                            <div key={i}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <item.icon className="w-4 h-4 text-gray-400" />
                                                        {item.label}
                                                    </div>
                                                    <span className="text-sm font-bold text-amber-600">{item.score}</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                                                        style={{ width: `${item.score}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* AI 诊断 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Bot className="w-5 h-5 text-amber-500" />
                                        <h3 className="font-bold text-gray-800">AI 诊断</h3>
                                    </div>

                                    {currentOutfitAnalysis.issues.map((issue, i) => (
                                        <div key={i} className={cn(
                                            "p-3 rounded-xl mb-3",
                                            issue.severity === 'warning' ? "bg-amber-50 border border-amber-200" : "bg-blue-50 border border-blue-200"
                                        )}>
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className={cn(
                                                    "w-4 h-4 mt-0.5 flex-shrink-0",
                                                    issue.severity === 'warning' ? "text-amber-500" : "text-blue-500"
                                                )} />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-800">{issue.item}</div>
                                                    <div className="text-xs text-gray-500 mb-1">{issue.issue}</div>
                                                    <div className="text-xs text-green-600">💡 {issue.suggestion}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="border-t pt-3 mt-3">
                                        <div className="text-xs text-gray-500 mb-2">亮点单品</div>
                                        {currentOutfitAnalysis.highlights.map((h, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm mb-2">
                                                <ThumbsUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                <span><strong>{h.item}</strong>：{h.reason}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 快速优化 */}
                                <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                    <Wand2 className="w-5 h-5" />
                                    查看 AI 优化方案
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* AI 推荐方案 */}
                    {activeTab === 'recommend' && (
                        <motion.div
                            key="recommend"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* 今日行程 */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar className="w-5 h-5 text-amber-500" />
                                    <h3 className="font-bold text-gray-800">今日行程 & 穿搭需求</h3>
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {todayContext.schedule.map((event, i) => (
                                        <div key={i} className="flex-shrink-0 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl min-w-[200px]">
                                            <div className="text-lg font-bold text-amber-600">{event.time}</div>
                                            <div className="text-sm font-medium text-gray-800">{event.event}</div>
                                            <div className="text-xs text-gray-500 mt-1">着装要求：{event.dress}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 推荐方案列表 */}
                            <div className="grid lg:grid-cols-3 gap-6">
                                {aiOutfitRecommendations.map((outfit, index) => (
                                    <motion.div
                                        key={outfit.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={cn(
                                            "bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all",
                                            selectedOutfit === index ? "ring-2 ring-amber-500" : "hover:shadow-xl"
                                        )}
                                        onClick={() => setSelectedOutfit(index)}
                                    >
                                        <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm opacity-80">{outfit.occasion}</span>
                                                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                                    匹配度 {outfit.matchScore}%
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold">{outfit.name}</h3>
                                            <p className="text-sm opacity-80">{outfit.style}</p>
                                        </div>

                                        <div className="p-4">
                                            {/* 单品列表 */}
                                            <div className="space-y-2 mb-4">
                                                {outfit.items.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-3">
                                                        <div
                                                            className="w-6 h-6 rounded border"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                        <div className="flex-1">
                                                            <div className="text-sm">{item.name}</div>
                                                            <div className="text-xs text-gray-400">{item.brand}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* AI 分析 */}
                                            <div className="p-3 bg-amber-50 rounded-xl mb-4">
                                                <div className="flex items-start gap-2">
                                                    <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <div className="text-xs text-amber-700">{outfit.aiReason}</div>
                                                        <div className="text-xs text-amber-600 mt-1">{outfit.colorAnalysis}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 价格 */}
                                            <div className="flex items-center justify-between text-sm">
                                                <div>
                                                    <span className="text-gray-500">品牌原价</span>
                                                    <span className="ml-2 font-bold text-gray-800">{outfit.totalPrice}</span>
                                                </div>
                                                <div className="text-green-600 text-xs">{outfit.alternatives}</div>
                                            </div>
                                        </div>

                                        <div className="px-4 pb-4 flex gap-2">
                                            <button className="flex-1 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors">
                                                查看平替
                                            </button>
                                            <button className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all">
                                                一键购买
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* 衣橱管理 - Agentic Commerce 搜推广一体化 */}
                    {activeTab === 'wardrobe' && (
                        <motion.div
                            key="wardrobe"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* 顶部：语音搜索 + 衣橱概览 */}
                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* 语音智能搜索 - 搜 */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Bot className="w-5 h-5 text-amber-600" />
                                        <h3 className="font-bold text-gray-800">AI 购物助手</h3>
                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">语音搜索</span>
                                    </div>

                                    {/* 语音搜索按钮 */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <button
                                            onClick={startVoiceSearch}
                                            className={cn(
                                                "relative w-16 h-16 rounded-full flex items-center justify-center transition-all",
                                                isListening
                                                    ? "bg-red-500 animate-pulse"
                                                    : "bg-gradient-to-br from-amber-500 to-orange-500 hover:shadow-lg hover:scale-105"
                                            )}
                                        >
                                            {isListening ? (
                                                <MicOff className="w-7 h-7 text-white" />
                                            ) : (
                                                <Mic className="w-7 h-7 text-white" />
                                            )}
                                            {isListening && (
                                                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
                                            )}
                                        </button>
                                        <div className="flex-1">
                                            {isListening ? (
                                                <div className="text-lg text-amber-700 font-medium animate-pulse">正在聆听...</div>
                                            ) : voiceQuery ? (
                                                <div className="p-3 bg-white rounded-xl border-2 border-amber-200">
                                                    <div className="text-sm text-gray-500 mb-1">您说：</div>
                                                    <div className="text-gray-800 font-medium">&quot;{voiceQuery}&quot;</div>
                                                </div>
                                            ) : (
                                                <div className="text-gray-500 text-sm">点击麦克风，告诉我您想找什么...</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* 搜索示例 */}
                                    {!voiceQuery && !isListening && (
                                        <div>
                                            <div className="text-xs text-gray-500 mb-2">试试这样说：</div>
                                            <div className="flex flex-wrap gap-2">
                                                {voiceSearchExamples.slice(0, 3).map((example, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => {
                                                            setVoiceQuery(example);
                                                            setSearchingProgress(0);
                                                            const interval = setInterval(() => {
                                                                setSearchingProgress(prev => {
                                                                    if (prev >= 100) {
                                                                        clearInterval(interval);
                                                                        setShowSearchResults(true);
                                                                        return 100;
                                                                    }
                                                                    return prev + 5;
                                                                });
                                                            }, 80);
                                                        }}
                                                        className="px-3 py-1.5 bg-white/80 rounded-full text-xs text-gray-600 hover:bg-white hover:text-amber-600 transition-colors"
                                                    >
                                                        &quot;{example}&quot;
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* AI 理解过程 */}
                                    {voiceQuery && searchingProgress > 0 && searchingProgress < 100 && (
                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                                <span className="text-sm text-amber-700">AI 正在为您搜索全网...</span>
                                            </div>
                                            <div className="h-2 bg-white rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${searchingProgress}%` }}
                                                />
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                {voiceSearchResult.searchSources.map((source, i) => (
                                                    <span
                                                        key={i}
                                                        className={cn(
                                                            "px-2 py-1 rounded-full transition-all",
                                                            searchingProgress > (i + 1) * 18
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-gray-100 text-gray-400"
                                                        )}
                                                    >
                                                        {searchingProgress > (i + 1) * 18 && <CheckCircle className="w-3 h-3 inline mr-1" />}
                                                        {source}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* 衣橱概览 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Layers className="w-5 h-5 text-amber-500" />
                                            <h3 className="font-bold text-gray-800">我的衣橱</h3>
                                        </div>
                                        <span className="text-xl font-bold text-amber-600">{wardrobeAnalysis.totalItems}件</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        {wardrobeAnalysis.categories.slice(0, 6).map((cat, i) => (
                                            <div key={i} className="p-2 bg-gray-50 rounded-lg text-center">
                                                <div className="text-sm font-bold text-gray-700">{cat.count}</div>
                                                <div className="text-xs text-gray-400">{cat.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                                        <div className="flex items-center gap-2 text-amber-700">
                                            <Zap className="w-4 h-4" />
                                            <span className="text-sm font-medium">{wardrobeAnalysis.matchPossibilities.toLocaleString()} 种智能搭配</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 搜索结果 - 展示搜推广融合 */}
                            {showSearchResults && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-amber-500" />
                                                AI 为您找到 {voiceSearchResult.results.length} 款完美匹配
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1">
                                                已分析您的肤色、身材、风格偏好，为您精选最适合的单品
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            {Object.entries(voiceSearchResult.aiUnderstanding).slice(0, 3).map(([key, value], i) => (
                                                <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">
                                                    {key}: {value}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        {voiceSearchResult.results.map((product, i) => (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className={cn(
                                                    "relative rounded-xl overflow-hidden border-2 transition-all hover:shadow-lg",
                                                    product.type === 'sponsored'
                                                        ? "border-amber-300 bg-gradient-to-b from-amber-50 to-white"
                                                        : "border-gray-100 bg-white"
                                                )}
                                            >
                                                {/* 产品图片区域 */}
                                                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                                                    <Shirt className="w-20 h-20 text-gray-300" />
                                                    {/* AI 匹配分数 */}
                                                    <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                                                        {product.overallScore}分
                                                    </div>
                                                    {/* 标签 */}
                                                    {product.type === 'sponsored' && (
                                                        <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs flex items-center gap-1">
                                                            <Crown className="w-3 h-3" />
                                                            {product.sponsorLabel}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-4">
                                                    {/* 品牌和名称 */}
                                                    <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                                                    <div className="font-medium text-gray-800 mb-2 line-clamp-2">{product.name}</div>

                                                    {/* AI 推荐理由 */}
                                                    <div className="p-2 bg-amber-50 rounded-lg mb-3">
                                                        <div className="text-xs text-amber-700 flex items-start gap-1">
                                                            <Bot className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                            <span>{product.aiReason}</span>
                                                        </div>
                                                    </div>

                                                    {/* 匹配度指标 */}
                                                    <div className="flex gap-2 mb-3">
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                                                            肤色 {product.colorMatch}%
                                                        </span>
                                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                                            身材 {product.bodyMatch}%
                                                        </span>
                                                    </div>

                                                    {/* 价格和来源 */}
                                                    <div className="flex items-end justify-between">
                                                        <div>
                                                            <span className="text-xl font-bold text-red-500">¥{product.price}</span>
                                                            {product.originalPrice && (
                                                                <span className="ml-2 text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            <span className="text-amber-600">{product.source}</span> · {product.salesCount}人购买
                                                        </div>
                                                    </div>

                                                    {/* 标签 */}
                                                    <div className="flex flex-wrap gap-1 mt-3">
                                                        {product.tags.map((tag, j) => (
                                                            <span key={j} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* 购买按钮 */}
                                                <div className="px-4 pb-4">
                                                    <button className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-medium hover:shadow-md transition-all flex items-center justify-center gap-2">
                                                        <ShoppingBag className="w-4 h-4" />
                                                        加入购物车
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* 智能导航标签 */}
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {[
                                    { id: 'recommend', label: 'AI 为您挑选', icon: Sparkles },
                                    { id: 'trending', label: '流行趋势', icon: Flame },
                                    { id: 'brands', label: '品牌精选', icon: Crown },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveCommerceTab(tab.id as typeof activeCommerceTab)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                                            activeCommerceTab === tab.id
                                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                                                : "bg-white text-gray-600 hover:bg-gray-50"
                                        )}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* AI 推荐区 - 推 */}
                            {activeCommerceTab === 'recommend' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-6"
                                >
                                    {/* 衣橱缺口推荐 */}
                                    {aiRecommendations.wardrobeGap.map((gap, gapIndex) => (
                                        <div key={gap.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-xl flex items-center justify-center",
                                                        gap.urgency === 'high' ? "bg-red-100" : "bg-amber-100"
                                                    )}>
                                                        <AlertCircle className={cn(
                                                            "w-5 h-5",
                                                            gap.urgency === 'high' ? "text-red-500" : "text-amber-500"
                                                        )} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-800">AI 发现您的衣橱缺口</div>
                                                        <div className="text-xs text-gray-600">{gap.gapAnalysis}</div>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <span className={cn(
                                                            "px-3 py-1 rounded-full text-xs font-medium",
                                                            gap.urgency === 'high'
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-amber-100 text-amber-700"
                                                        )}>
                                                            {gap.urgency === 'high' ? '必备单品' : '推荐添加'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex gap-4 overflow-x-auto pb-2">
                                                    {gap.products.map((product, i) => (
                                                        <div
                                                            key={product.id}
                                                            className={cn(
                                                                "flex-shrink-0 w-64 rounded-xl border-2 overflow-hidden transition-all hover:shadow-md",
                                                                product.type === 'sponsored'
                                                                    ? "border-amber-200 bg-gradient-to-b from-amber-50/50 to-white"
                                                                    : "border-gray-100"
                                                            )}
                                                        >
                                                            <div className="relative h-36 bg-gray-50 flex items-center justify-center">
                                                                <Shirt className="w-16 h-16 text-gray-200" />
                                                                {product.type === 'sponsored' && (
                                                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-white rounded-full text-xs flex items-center gap-1">
                                                                        <BadgeCheck className="w-3 h-3" />
                                                                        {product.sponsorLabel}
                                                                    </div>
                                                                )}
                                                                <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-white rounded-full text-xs">
                                                                    肤色匹配 {product.colorMatch}%
                                                                </div>
                                                            </div>
                                                            <div className="p-3">
                                                                <div className="text-xs text-gray-500">{product.brand}</div>
                                                                <div className="font-medium text-sm text-gray-800 mb-2">{product.name}</div>
                                                                <div className="p-2 bg-amber-50 rounded-lg text-xs text-amber-700 mb-2">
                                                                    <Bot className="w-3 h-3 inline mr-1" />
                                                                    {product.aiReason}
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <div>
                                                                        <span className="text-lg font-bold text-red-500">¥{product.price}</span>
                                                                        {product.originalPrice && (
                                                                            <span className="ml-1 text-xs text-gray-400 line-through">¥{product.originalPrice}</span>
                                                                        )}
                                                                    </div>
                                                                    <button className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-xs font-medium">
                                                                        立即查看
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* 行程推荐 */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Calendar className="w-5 h-5 text-amber-500" />
                                            <h3 className="font-bold text-gray-800">{aiRecommendations.scheduleBasedPicks.title}</h3>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {aiRecommendations.scheduleBasedPicks.events.map((event, i) => (
                                                <div key={i} className={cn(
                                                    "p-4 rounded-xl border-2 transition-all hover:shadow-md",
                                                    event.product.type === 'sponsored'
                                                        ? "border-amber-200 bg-gradient-to-br from-amber-50/50 to-white"
                                                        : "border-gray-100"
                                                )}>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">
                                                            {event.date}
                                                        </div>
                                                        <div className="text-sm text-gray-800">{event.event}</div>
                                                        {event.product.type === 'sponsored' && (
                                                            <span className="ml-auto px-2 py-0.5 bg-amber-500 text-white rounded-full text-xs">
                                                                {event.product.sponsorLabel}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <Shirt className="w-10 h-10 text-gray-200" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-xs text-gray-500">{event.product.brand}</div>
                                                            <div className="font-medium text-gray-800 mb-1">{event.product.name}</div>
                                                            <div className="text-xs text-amber-700 mb-2">{event.product.aiReason}</div>
                                                            <span className="text-lg font-bold text-red-500">¥{event.product.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 天气推荐 */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <Cloud className="w-5 h-5 text-blue-500" />
                                                <h3 className="font-bold text-gray-800">{aiRecommendations.weatherBasedPicks.title}</h3>
                                            </div>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                                {aiRecommendations.weatherBasedPicks.forecast}
                                            </span>
                                        </div>
                                        {aiRecommendations.weatherBasedPicks.products.map((product, i) => (
                                            <div key={i} className="flex gap-4 p-4 bg-white rounded-xl">
                                                <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Shirt className="w-12 h-12 text-gray-200" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs text-gray-500">{product.brand}</span>
                                                        <span className="px-2 py-0.5 bg-amber-500 text-white rounded-full text-xs">
                                                            {product.sponsorLabel}
                                                        </span>
                                                        <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
                                                            {product.urgency}
                                                        </span>
                                                    </div>
                                                    <div className="font-medium text-gray-800 mb-1">{product.name}</div>
                                                    <div className="text-sm text-amber-700 mb-2">{product.aiReason}</div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl font-bold text-red-500">¥{product.price}</span>
                                                        <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
                                                        <button className="ml-auto px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                                                            <Truck className="w-4 h-4" />
                                                            明日达
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* 流行趋势区 */}
                            {activeCommerceTab === 'trending' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <Flame className="w-5 h-5 text-orange-500" />
                                            <h3 className="font-bold text-gray-800">{aiRecommendations.trendingPicks.title}</h3>
                                        </div>
                                        <span className="text-xs text-gray-500">{aiRecommendations.trendingPicks.source}</span>
                                    </div>
                                    <div className="space-y-4">
                                        {aiRecommendations.trendingPicks.items.map((item, i) => (
                                            <div key={item.id} className={cn(
                                                "flex gap-4 p-4 rounded-xl border-2 transition-all hover:shadow-md",
                                                item.product.type === 'sponsored'
                                                    ? "border-amber-200 bg-gradient-to-r from-amber-50/50 to-white"
                                                    : "border-gray-100"
                                            )}>
                                                <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                                                    <Shirt className="w-12 h-12 text-gray-200" />
                                                    {item.product.type === 'sponsored' && (
                                                        <div className="absolute -top-2 -left-2 px-2 py-0.5 bg-amber-500 text-white rounded-full text-xs">
                                                            {item.product.sponsorLabel}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium">
                                                            {item.trendName}
                                                        </span>
                                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                                            <Flame className="w-3 h-3 text-orange-400" />
                                                            {item.hotness}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">{item.product.brand}</div>
                                                    <div className="font-medium text-gray-800 mb-1">{item.product.name}</div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                                                            肤色匹配 {item.product.colorMatch}%
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-amber-700 mb-2">{item.product.aiReason}</div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="text-lg font-bold text-red-500">¥{item.product.price}</span>
                                                            {item.product.originalPrice && (
                                                                <span className="ml-2 text-sm text-gray-400 line-through">¥{item.product.originalPrice}</span>
                                                            )}
                                                        </div>
                                                        <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium">
                                                            跟上潮流
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* 品牌精选区 - 广 */}
                            {activeCommerceTab === 'brands' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 rounded-2xl shadow-lg p-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                                                <Crown className="w-6 h-6 text-amber-500" />
                                                {brandPartnerShowcase.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">{brandPartnerShowcase.subtitle}</p>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-6">
                                            {brandPartnerShowcase.partners.map((partner, i) => (
                                                <div key={i} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="text-lg font-bold text-gray-800">{partner.brand}</div>
                                                        <div className="flex items-center gap-1 text-green-600">
                                                            <CheckCircle className="w-4 h-4" />
                                                            <span className="text-sm font-medium">{partner.matchScore}%</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-600 mb-4">{partner.matchReason}</p>

                                                    <div className="relative h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                                                        <Shirt className="w-16 h-16 text-gray-200" />
                                                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white rounded text-xs">
                                                            {partner.exclusive}
                                                        </div>
                                                    </div>

                                                    <div className="text-sm font-medium text-gray-800 mb-1">
                                                        {partner.featuredProduct.name}
                                                    </div>
                                                    <div className="text-xs text-amber-700 mb-3">
                                                        {partner.featuredProduct.aiReason}
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="text-lg font-bold text-red-500">¥{partner.featuredProduct.price}</span>
                                                            {partner.featuredProduct.originalPrice && (
                                                                <span className="ml-1 text-xs text-gray-400 line-through">¥{partner.featuredProduct.originalPrice}</span>
                                                            )}
                                                        </div>
                                                        <button className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium flex items-center gap-1">
                                                            <Gift className="w-3 h-3" />
                                                            专属优惠
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* 穿搭技巧 */}
                    {activeTab === 'tips' && (
                        <motion.div
                            key="tips"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">
                                    专属于 <span className="text-amber-600">{userBodyProfile.bodyType}</span> 的穿搭技巧
                                </h2>
                                <p className="text-sm text-gray-500">基于您的身材特点，AI 为您定制的穿搭指南</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {stylingTips.map((category, index) => (
                                    <motion.div
                                        key={category.category}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-2xl shadow-lg p-6"
                                    >
                                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            {category.category === '上半身' && <Shirt className="w-5 h-5 text-amber-500" />}
                                            {category.category === '下半身' && <span className="text-amber-500">👖</span>}
                                            {category.category === '配饰' && <span className="text-amber-500">💎</span>}
                                            {category.category}
                                        </h3>
                                        <div className="space-y-4">
                                            {category.tips.map((tip, i) => (
                                                <div key={i} className="p-3 bg-gray-50 rounded-xl">
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-800">{tip.tip}</div>
                                                            <div className="text-xs text-amber-600 mt-1">✨ {tip.effect}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* 视频教程入口 */}
                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">AI 穿搭视频教程</h3>
                                        <p className="text-sm opacity-80">
                                            根据您的身材特点，AI 生成专属穿搭教学视频
                                        </p>
                                    </div>
                                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl font-medium hover:shadow-lg transition-all">
                                        <Play className="w-5 h-5" />
                                        观看教程
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
