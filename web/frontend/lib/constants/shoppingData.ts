// AI 智能购物系统 - Mock 数据

// ============ 类型定义 ============

export type Platform = 'taobao' | 'jd' | 'pdd' | 'kaola' | 'xiaohongshu';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
export type BuyRecommendation =
    | 'buy_now'
    | 'wait_for_sale'
    | 'good_time'
    | 'urgent'
    | 'stock_up'
    | 'not_recommended';
export type Priority = 'urgent' | 'high' | 'medium' | 'low';

export interface PlatformPrice {
    platform: Platform;
    platformName: string;
    platformIcon: string;
    platformColor: string;
    price: number;
    originalPrice: number;
    coupon?: { value: number; threshold: number; name: string };
    promotion?: string;
    shipping: number;
    estimatedDelivery: string;
    stock: StockStatus;
    url: string;
    updatedAt: string;
    isRecommended?: boolean;
}

export interface PriceHistoryPoint {
    date: string;
    price: number;
    platform: string;
    event?: string;
    isLowest?: boolean;
}

export interface PriceStatistics {
    lowest: { price: number; date: string; event?: string };
    highest: { price: number; date: string };
    average: number;
    current: number;
    currentPosition: 'below_avg' | 'avg' | 'above_avg';
    percentileRank: number;
}

export interface PricePrediction {
    nextSaleEvent: string;
    expectedDate: string;
    predictedPrice: number;
    confidence: number;
    daysUntil: number;
}

export interface AIBuyAdvice {
    productId: string;
    recommendation: BuyRecommendation;
    confidence: number;
    reasoning: string[];
    factors: {
        priceScore: number;
        inventoryScore: number;
        timingScore: number;
    };
    suggestedQuantity: number;
    suggestedPlatform: string;
    alternativeAction?: {
        action: string;
        triggerCondition: string;
    };
}

export interface PurchasePlanItem {
    productId: string;
    productName: string;
    productImage?: string;
    brand: string;
    priority: Priority;
    currentPrice: number;
    recommendedBuyDate: string;
    recommendedPlatform: string;
    estimatedPrice: number;
    reason: string;
    canWait: boolean;
    daysUntilNeeded: number;
    inventoryRemaining?: number;
}

export interface PlanOptimization {
    type: 'bundle' | 'coupon' | 'timing';
    description: string;
    savings: number;
    icon: string;
}

export interface TimelineEvent {
    date: string;
    event?: string;
    items: string[];
    totalCost: number;
    isUpcoming?: boolean;
}

export interface SmartPurchasePlan {
    userId: string;
    generatedAt: string;
    totalBudget?: number;
    items: PurchasePlanItem[];
    optimizations: PlanOptimization[];
    timeline: TimelineEvent[];
    totalSavings: number;
    aiInsights: string[];
}

// ============ 平台信息 ============

export const platformInfo: Record<Platform, { name: string; icon: string; color: string }> = {
    taobao: { name: '淘宝/天猫', icon: '🏪', color: '#FF5000' },
    jd: { name: '京东', icon: '🔴', color: '#E2231A' },
    pdd: { name: '拼多多', icon: '🟠', color: '#E02E24' },
    kaola: { name: '考拉海购', icon: '🐨', color: '#FF6A00' },
    xiaohongshu: { name: '小红书', icon: '📕', color: '#FE2C55' },
};

// ============ 全网比价数据 ============

export const mockPlatformPrices: Record<string, PlatformPrice[]> = {
    'product-1': [
        {
            platform: 'taobao',
            platformName: '淘宝/天猫',
            platformIcon: '🏪',
            platformColor: '#FF5000',
            price: 760,
            originalPrice: 980,
            coupon: { value: 50, threshold: 699, name: '美妆券' },
            promotion: '品牌会员日',
            shipping: 0,
            estimatedDelivery: '预计后天送达',
            stock: 'in_stock',
            url: '#',
            updatedAt: '2025-01-17T10:00:00',
            isRecommended: false,
        },
        {
            platform: 'jd',
            platformName: '京东',
            platformIcon: '🔴',
            platformColor: '#E2231A',
            price: 789,
            originalPrice: 980,
            coupon: { value: 20, threshold: 199, name: '全品类券' },
            shipping: 0,
            estimatedDelivery: '明天送达',
            stock: 'in_stock',
            url: '#',
            updatedAt: '2025-01-17T10:00:00',
        },
        {
            platform: 'pdd',
            platformName: '拼多多',
            platformIcon: '🟠',
            platformColor: '#E02E24',
            price: 725,
            originalPrice: 980,
            promotion: '百亿补贴',
            shipping: 0,
            estimatedDelivery: '预计3天送达',
            stock: 'low_stock',
            url: '#',
            updatedAt: '2025-01-17T10:00:00',
            isRecommended: true,
        },
        {
            platform: 'kaola',
            platformName: '考拉海购',
            platformIcon: '🐨',
            platformColor: '#FF6A00',
            price: 799,
            originalPrice: 980,
            coupon: { value: 50, threshold: 499, name: '新人专享' },
            shipping: 0,
            estimatedDelivery: '预计4天送达',
            stock: 'in_stock',
            url: '#',
            updatedAt: '2025-01-17T10:00:00',
        },
        {
            platform: 'xiaohongshu',
            platformName: '小红书',
            platformIcon: '📕',
            platformColor: '#FE2C55',
            price: 779,
            originalPrice: 980,
            promotion: '限时折扣',
            shipping: 0,
            estimatedDelivery: '预计2天送达',
            stock: 'in_stock',
            url: '#',
            updatedAt: '2025-01-17T10:00:00',
        },
    ],
};

// ============ 价格历史数据 ============

export const mockPriceHistory: Record<string, PriceHistoryPoint[]> = {
    'product-1': [
        { date: '2024-07-01', price: 950, platform: 'taobao' },
        { date: '2024-07-15', price: 930, platform: 'taobao' },
        { date: '2024-08-01', price: 920, platform: 'taobao' },
        { date: '2024-08-15', price: 900, platform: 'jd' },
        { date: '2024-09-01', price: 880, platform: 'taobao' },
        { date: '2024-09-15', price: 860, platform: 'taobao' },
        { date: '2024-10-01', price: 850, platform: 'jd' },
        { date: '2024-10-15', price: 830, platform: 'taobao' },
        { date: '2024-11-01', price: 800, platform: 'taobao' },
        { date: '2024-11-11', price: 680, platform: 'taobao', event: '双11大促', isLowest: true },
        { date: '2024-11-15', price: 820, platform: 'taobao' },
        { date: '2024-12-01', price: 850, platform: 'taobao' },
        { date: '2024-12-12', price: 720, platform: 'pdd', event: '双12' },
        { date: '2024-12-25', price: 800, platform: 'taobao' },
        { date: '2025-01-01', price: 820, platform: 'taobao', event: '元旦' },
        { date: '2025-01-10', price: 780, platform: 'jd' },
        { date: '2025-01-17', price: 760, platform: 'taobao' },
    ],
};

// ============ 价格统计数据 ============

export const mockPriceStatistics: Record<string, PriceStatistics> = {
    'product-1': {
        lowest: { price: 680, date: '2024-11-11', event: '双11大促' },
        highest: { price: 950, date: '2024-07-01' },
        average: 832,
        current: 760,
        currentPosition: 'below_avg',
        percentileRank: 25,
    },
};

// ============ 价格预测数据 ============

export const mockPricePrediction: Record<string, PricePrediction> = {
    'product-1': {
        nextSaleEvent: '38女神节',
        expectedDate: '2025-03-08',
        predictedPrice: 699,
        confidence: 78,
        daysUntil: 50,
    },
};

// ============ AI 购买建议 ============

export const mockAIAdvice: Record<string, AIBuyAdvice> = {
    'product-1': {
        productId: 'product-1',
        recommendation: 'good_time',
        confidence: 87,
        reasoning: [
            '当前价格 ¥760 低于历史均价 ¥832',
            '价格处于历史 25% 分位，属于较低水平',
            '距离下次大促（38女神节）还有 50 天',
            '您的库存预计还能使用 3 周',
            '综合考虑，现在购买性价比较高',
        ],
        factors: {
            priceScore: 85,
            inventoryScore: 70,
            timingScore: 78,
        },
        suggestedQuantity: 1,
        suggestedPlatform: 'pdd',
        alternativeAction: {
            action: '设置价格提醒',
            triggerCondition: '当价格降至 ¥699 以下时通知您',
        },
    },
    'product-2': {
        productId: 'product-2',
        recommendation: 'wait_for_sale',
        confidence: 82,
        reasoning: [
            '当前价格 ¥170 高于历史均价 ¥145',
            '库存充足，预计还能使用 2 个月',
            '618大促预计降至 ¥120，可节省 ¥50',
            '建议等待618大促再购买',
        ],
        factors: {
            priceScore: 45,
            inventoryScore: 30,
            timingScore: 65,
        },
        suggestedQuantity: 1,
        suggestedPlatform: 'taobao',
        alternativeAction: {
            action: '设置促销提醒',
            triggerCondition: '618大促开始时通知您',
        },
    },
    'product-3': {
        productId: 'product-3',
        recommendation: 'urgent',
        confidence: 95,
        reasoning: [
            '库存仅剩 15%，预计 1 周内用完',
            '当前价格接近历史低点',
            '等待促销可能导致断货',
            '建议立即购买补货',
        ],
        factors: {
            priceScore: 75,
            inventoryScore: 95,
            timingScore: 80,
        },
        suggestedQuantity: 2,
        suggestedPlatform: 'jd',
    },
};

// ============ 推荐类型配置 ============

export const recommendationConfig: Record<BuyRecommendation, {
    label: string;
    labelEn: string;
    color: string;
    bgColor: string;
    icon: string;
    description: string;
}> = {
    buy_now: {
        label: '立即购买',
        labelEn: 'Buy Now',
        color: 'text-red-600',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        icon: '🔥',
        description: '价格低 + 库存紧张',
    },
    wait_for_sale: {
        label: '等待促销',
        labelEn: 'Wait for Sale',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20',
        icon: '⏰',
        description: '价格偏高 + 库存充足',
    },
    good_time: {
        label: '好时机',
        labelEn: 'Good Time',
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        icon: '✅',
        description: '价格接近历史低点',
    },
    urgent: {
        label: '紧急补货',
        labelEn: 'Urgent',
        color: 'text-red-600',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        icon: '🚨',
        description: '即将用完',
    },
    stock_up: {
        label: '建议囤货',
        labelEn: 'Stock Up',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        icon: '📦',
        description: '历史低价 + 保质期长',
    },
    not_recommended: {
        label: '暂不推荐',
        labelEn: 'Not Recommended',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50 dark:bg-gray-800',
        icon: '⏸️',
        description: '价格过高',
    },
};

// ============ 优先级配置 ============

export const priorityConfig: Record<Priority, {
    label: string;
    color: string;
    bgColor: string;
    dotColor: string;
}> = {
    urgent: {
        label: '紧急',
        color: 'text-red-600',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        dotColor: 'bg-red-500',
    },
    high: {
        label: '推荐',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20',
        dotColor: 'bg-amber-500',
    },
    medium: {
        label: '一般',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        dotColor: 'bg-blue-500',
    },
    low: {
        label: '可等',
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        dotColor: 'bg-green-500',
    },
};

// ============ 智能购买计划 ============

export const mockPurchasePlan: SmartPurchasePlan = {
    userId: 'user-001',
    generatedAt: '2025-01-17T12:00:00',
    totalBudget: 3000,
    items: [
        {
            productId: 'product-1',
            productName: '兰蔻小黑瓶精华',
            brand: 'Lancome',
            priority: 'urgent',
            currentPrice: 760,
            recommendedBuyDate: '2025-01-20',
            recommendedPlatform: 'pdd',
            estimatedPrice: 725,
            reason: '库存仅剩 15%，当前价格接近历史低点，建议立即购买',
            canWait: false,
            daysUntilNeeded: 7,
            inventoryRemaining: 15,
        },
        {
            productId: 'product-2',
            productName: 'MAC口红 Chili',
            brand: 'MAC',
            priority: 'medium',
            currentPrice: 170,
            recommendedBuyDate: '2025-06-18',
            recommendedPlatform: 'taobao',
            estimatedPrice: 120,
            reason: '库存充足，618预计有大幅优惠，建议等待促销',
            canWait: true,
            daysUntilNeeded: 60,
            inventoryRemaining: 65,
        },
        {
            productId: 'product-3',
            productName: 'SK-II神仙水',
            brand: 'SK-II',
            priority: 'low',
            currentPrice: 1150,
            recommendedBuyDate: '2025-03-08',
            recommendedPlatform: 'jd',
            estimatedPrice: 980,
            reason: '当前价格偏高，建议等待38女神节，预计降至 ¥980',
            canWait: true,
            daysUntilNeeded: 90,
            inventoryRemaining: 40,
        },
        {
            productId: 'product-4',
            productName: 'NARS腮红',
            brand: 'NARS',
            priority: 'high',
            currentPrice: 320,
            recommendedBuyDate: '2025-01-25',
            recommendedPlatform: 'xiaohongshu',
            estimatedPrice: 289,
            reason: '小红书限时特惠，比其他平台便宜 ¥30+，推荐现在入手',
            canWait: false,
            daysUntilNeeded: 14,
            inventoryRemaining: 25,
        },
    ],
    optimizations: [
        {
            type: 'timing',
            description: 'MAC口红等到618购买，预计节省 ¥50',
            savings: 50,
            icon: '⏰',
        },
        {
            type: 'timing',
            description: 'SK-II神仙水等到38女神节，预计节省 ¥170',
            savings: 170,
            icon: '⏰',
        },
        {
            type: 'bundle',
            description: '小黑瓶+神仙水同时在京东购买，满 1500 减 150',
            savings: 150,
            icon: '🎁',
        },
        {
            type: 'coupon',
            description: '使用新人券在考拉海购购买可额外减 50',
            savings: 50,
            icon: '🎫',
        },
    ],
    timeline: [
        {
            date: '2025-01-20',
            items: ['兰蔻小黑瓶精华'],
            totalCost: 725,
            isUpcoming: true,
        },
        {
            date: '2025-01-25',
            items: ['NARS腮红'],
            totalCost: 289,
            isUpcoming: true,
        },
        {
            date: '2025-03-08',
            event: '38女神节',
            items: ['SK-II神仙水'],
            totalCost: 980,
        },
        {
            date: '2025-06-18',
            event: '618大促',
            items: ['MAC口红 Chili'],
            totalCost: 120,
        },
    ],
    totalSavings: 420,
    aiInsights: [
        '基于您的使用习惯，小黑瓶精华建议本周内补货，避免断货',
        'MAC口红库存充足，等待618可节省约 30%',
        'SK-II神仙水38女神节预计降价 15%，建议设置价格提醒',
        '整体购买计划预计可为您节省 ¥420',
        '建议优先购买库存告急的商品，非紧急商品可等待促销',
    ],
};

// ============ 促销日历 ============

export const saleCalendar = [
    { date: '2025-02-14', event: '情人节', icon: '💝' },
    { date: '2025-03-08', event: '38女神节', icon: '👑' },
    { date: '2025-05-20', event: '520', icon: '💕' },
    { date: '2025-06-01', event: '儿童节', icon: '🎈' },
    { date: '2025-06-18', event: '618大促', icon: '🛒' },
    { date: '2025-08-08', event: '88会员日', icon: '⭐' },
    { date: '2025-09-09', event: '99划算节', icon: '💰' },
    { date: '2025-11-01', event: '双11预售', icon: '🔥' },
    { date: '2025-11-11', event: '双11大促', icon: '🎉' },
    { date: '2025-12-12', event: '双12', icon: '🎁' },
];

// ============ 辅助函数 ============

export function getLowestPlatform(prices: PlatformPrice[]): PlatformPrice | undefined {
    return prices.reduce((lowest, current) => {
        const lowestFinalPrice = lowest.price - (lowest.coupon?.value || 0);
        const currentFinalPrice = current.price - (current.coupon?.value || 0);
        return currentFinalPrice < lowestFinalPrice ? current : lowest;
    }, prices[0]);
}

export function calculateFinalPrice(platformPrice: PlatformPrice): number {
    const couponDiscount = platformPrice.coupon?.value || 0;
    return platformPrice.price - couponDiscount + platformPrice.shipping;
}

export function formatPriceChange(current: number, previous: number): string {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    if (change > 0) return `+¥${change} (+${percentage}%)`;
    if (change < 0) return `-¥${Math.abs(change)} (${percentage}%)`;
    return '持平';
}
