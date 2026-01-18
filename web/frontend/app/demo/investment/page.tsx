'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    Globe,
    DollarSign,
    Target,
    BarChart3,
    PieChart,
    MapPin,
    Calendar,
    CheckCircle,
    AlertTriangle,
    Zap,
    Building2,
    ShoppingBag,
    Smartphone,
    Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// 市场数据
const marketData = {
    global: {
        beautyMarket2024: 6300, // 亿美元
        growthRate: 5.2,
        smartBeautyMarket: 450,
        smartGrowthRate: 18.5,
    },
    china: {
        beautyMarket2024: 5800, // 亿人民币
        growthRate: 8.2,
        smartDeviceMarket: 320,
        smartGrowthRate: 25.3,
        onlineBeautyRate: 42,
        targetPopulation: 4.2, // 亿
    },
    southeastAsia: {
        beautyMarket2024: 320, // 亿美元
        growthRate: 9.8,
        countries: [
            { name: '印尼', market: 85, growth: 11.2, population: 2.7 },
            { name: '泰国', market: 65, growth: 8.5, population: 0.7 },
            { name: '越南', market: 45, growth: 12.3, population: 1.0 },
            { name: '菲律宾', market: 38, growth: 10.1, population: 1.1 },
            { name: '马来西亚', market: 42, growth: 7.8, population: 0.32 },
            { name: '新加坡', market: 28, growth: 5.2, population: 0.058 },
        ],
    },
};

// 目标用户画像
const targetAudience = {
    primary: {
        title: '核心用户',
        percentage: 45,
        demographics: {
            age: '18-35岁',
            income: '月收入 8000-30000 元',
            education: '本科及以上',
            location: '一二线城市',
        },
        characteristics: [
            '追求精致生活，愿意为美丽投资',
            '重度社交媒体用户（小红书、抖音）',
            '对新科技接受度高',
            '有一定化妆基础但希望提升',
            '注重性价比但愿意为品质买单',
        ],
        painPoints: [
            '化妆技术不够专业',
            '不知道什么产品适合自己',
            '化妆耗时长，效果不稳定',
            '缺乏专业指导和反馈',
        ],
    },
    secondary: {
        title: '次核心用户',
        percentage: 35,
        demographics: {
            age: '35-50岁',
            income: '月收入 15000-50000 元',
            education: '本科及以上',
            location: '一二三线城市',
        },
        characteristics: [
            '事业有成，时间宝贵',
            '对抗衰老有强需求',
            '追求高效便捷的解决方案',
            '有较强消费能力',
            '注重产品品质和品牌',
        ],
        painPoints: [
            '时间有限，无法花大量时间化妆',
            '皮肤状态变化需要精准护理',
            '想要专业但不想去美容院',
            '需要个性化的护肤方案',
        ],
    },
    emerging: {
        title: '新兴用户',
        percentage: 20,
        demographics: {
            age: '16-22岁',
            income: '月零用 2000-5000 元',
            education: '高中/大学在读',
            location: '全国各线城市',
        },
        characteristics: [
            'Z世代，数字原住民',
            '热衷尝试新事物',
            '社交分享意愿强',
            '受KOL影响大',
            '价格敏感但愿意攒钱购买心仪产品',
        ],
        painPoints: [
            '刚开始学化妆，缺乏基础',
            '预算有限，容易买错产品',
            '信息过载，不知道听谁的',
            '希望得到认可和鼓励',
        ],
    },
};

// 销售预测
const salesProjection = {
    years: ['2025', '2026', '2027', '2028', '2029'],
    china: {
        units: [50000, 180000, 420000, 750000, 1200000],
        revenue: [1.5, 5.4, 12.6, 22.5, 36], // 亿人民币
        marketShare: [0.5, 1.8, 4.2, 7.5, 12],
    },
    southeastAsia: {
        units: [8000, 35000, 95000, 200000, 380000],
        revenue: [0.3, 1.2, 3.3, 7.0, 13.3], // 亿人民币
        marketShare: [0.3, 1.2, 3.0, 5.8, 10],
    },
};

// 产品定价策略
const pricingStrategy = [
    {
        tier: '标准版',
        price: 2999,
        target: '年轻用户入门',
        features: ['AI皮肤分析', '基础化妆指导', '产品推荐', '社区功能'],
        margin: 35,
    },
    {
        tier: '专业版',
        price: 4999,
        target: '核心用户主推',
        features: ['全部标准版功能', '云台追踪', '机械臂辅助', '高级AI教程', 'VIP社区'],
        margin: 42,
    },
    {
        tier: '旗舰版',
        price: 7999,
        target: '高端用户/送礼',
        features: ['全部专业版功能', '真皮肤检测传感器', '限量设计款', '专属客服', '终身免费升级'],
        margin: 48,
    },
];

// 竞争格局
const competitors = [
    {
        name: 'HiMirror',
        country: '美国',
        price: '$259-$399',
        strengths: ['先发优势', '品牌知名度'],
        weaknesses: ['无中文支持', '功能较单一', '无机械臂'],
    },
    {
        name: 'Simplehuman',
        country: '美国',
        price: '$200-$400',
        strengths: ['设计精美', '渠道成熟'],
        weaknesses: ['非AI产品', '无个性化功能'],
    },
    {
        name: 'Opté',
        country: '美国/宝洁',
        price: '$599',
        strengths: ['大厂背书', '技术领先'],
        weaknesses: ['定位遮瑕笔', '价格高昂'],
    },
    {
        name: '国内智能镜',
        country: '中国',
        price: '¥500-2000',
        strengths: ['价格低', '本地化'],
        weaknesses: ['功能简单', '无AI', '同质化严重'],
    },
];

// 风险因素
const riskFactors = [
    {
        category: '市场风险',
        level: 'medium',
        items: [
            { risk: '用户接受度不确定', mitigation: '前期大量用户调研和产品迭代' },
            { risk: '市场教育成本高', mitigation: '与KOL合作，内容营销先行' },
        ],
    },
    {
        category: '技术风险',
        level: 'low',
        items: [
            { risk: 'AI精度不足', mitigation: '持续算法优化，用户反馈闭环' },
            { risk: '硬件成本控制', mitigation: '规模化采购，本地化供应链' },
        ],
    },
    {
        category: '竞争风险',
        level: 'medium',
        items: [
            { risk: '巨头入场', mitigation: '快速占领市场，建立品牌壁垒' },
            { risk: '低价竞争', mitigation: '差异化功能，提升用户粘性' },
        ],
    },
    {
        category: '运营风险',
        level: 'low',
        items: [
            { risk: '供应链波动', mitigation: '多供应商策略，库存管理' },
            { risk: '售后服务压力', mitigation: '建立完善的客服和维修体系' },
        ],
    },
];

// 投资亮点
const investmentHighlights = [
    {
        icon: TrendingUp,
        title: '高增长赛道',
        description: '智能美妆设备市场年增速超18%，远高于传统美妆市场',
    },
    {
        icon: Target,
        title: '精准定位',
        description: '瞄准4.2亿中国女性用户中的核心变美需求人群',
    },
    {
        icon: Zap,
        title: '技术壁垒',
        description: '具身智能+AI算法+云台追踪，形成独特技术护城河',
    },
    {
        icon: Heart,
        title: '高用户粘性',
        description: '社交+积分+陪伴设计，用户日活留存率预计超40%',
    },
    {
        icon: Globe,
        title: '出海潜力',
        description: '东南亚美妆市场增速近10%，华人文化圈接受度高',
    },
    {
        icon: ShoppingBag,
        title: '多元变现',
        description: '硬件销售+耗材复购+电商分佣+会员订阅多种收入来源',
    },
];

export default function InvestmentPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'market' | 'audience' | 'projection' | 'competition' | 'risk'>('overview');

    const tabs = [
        { id: 'overview', label: '投资概览', icon: BarChart3 },
        { id: 'market', label: '市场分析', icon: Globe },
        { id: 'audience', label: '目标用户', icon: Users },
        { id: 'projection', label: '销售预测', icon: TrendingUp },
        { id: 'competition', label: '竞争格局', icon: Target },
        { id: 'risk', label: '风险分析', icon: AlertTriangle },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-3xl">📊</span>
                    投资分析报告
                </h1>
                <p className="text-gray-600">AgenticMirror 智能美妆镜 - 商业计划与市场分析</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                            activeTab === tab.id
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="space-y-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Executive Summary */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Building2 className="w-6 h-6 text-blue-600" />
                                执行摘要
                            </h2>
                            <div className="prose text-gray-600 max-w-none">
                                <p className="text-lg leading-relaxed">
                                    <strong>AgenticMirror</strong> 是全球首款<strong>具身智能美妆机器人</strong>，
                                    集成 AI 皮肤分析、云台人脸追踪、机械臂辅助、实时化妆指导于一体。
                                    产品瞄准中国及东南亚地区 <strong>5亿+</strong> 潜在女性用户，
                                    预计 <strong>2029年</strong> 实现年收入 <strong>50亿+</strong> 人民币。
                                </p>
                            </div>

                            {/* Key Metrics */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                {[
                                    { label: '目标市场规模', value: '6,120亿', unit: '人民币', growth: '+8.5%' },
                                    { label: '潜在用户', value: '4.2亿', unit: '人', growth: '中国女性' },
                                    { label: '2029年预计收入', value: '49.3亿', unit: '人民币', growth: 'CAGR 85%' },
                                    { label: '预计市场占有率', value: '11%', unit: '', growth: '智能美妆赛道' },
                                ].map((metric, i) => (
                                    <div key={i} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                                        <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
                                        <div className="text-sm text-gray-500">{metric.unit}</div>
                                        <div className="text-xs text-gray-600 mt-1">{metric.label}</div>
                                        <div className="text-xs text-green-600 mt-1">{metric.growth}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Investment Highlights */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">投资亮点</h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                {investmentHighlights.map((highlight, i) => (
                                    <motion.div
                                        key={i}
                                        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <highlight.icon className="w-8 h-8 text-blue-600 mb-3" />
                                        <h3 className="font-bold text-gray-800 mb-1">{highlight.title}</h3>
                                        <p className="text-sm text-gray-600">{highlight.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Pricing Strategy */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">产品定价策略</h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                {pricingStrategy.map((tier, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "rounded-xl p-5 border-2 transition-all",
                                            i === 1 ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
                                        )}
                                    >
                                        {i === 1 && (
                                            <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full w-fit mb-2">
                                                主推款
                                            </div>
                                        )}
                                        <h3 className="text-lg font-bold text-gray-800">{tier.tier}</h3>
                                        <div className="text-3xl font-bold text-blue-600 my-2">
                                            ¥{tier.price.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-500 mb-3">{tier.target}</div>
                                        <ul className="space-y-2">
                                            {tier.features.map((feature, j) => (
                                                <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="text-sm text-gray-500">
                                                毛利率: <span className="font-bold text-green-600">{tier.margin}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Market Tab */}
                {activeTab === 'market' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Global Market */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Globe className="w-6 h-6 text-blue-600" />
                                全球美妆市场概况
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
                                        <div className="text-sm text-gray-500">全球美妆市场规模 (2024)</div>
                                        <div className="text-3xl font-bold text-purple-600">
                                            ${marketData.global.beautyMarket2024.toLocaleString()}亿
                                        </div>
                                        <div className="text-sm text-green-600">
                                            年增速 +{marketData.global.growthRate}%
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                                        <div className="text-sm text-gray-500">智能美妆设备市场 (2024)</div>
                                        <div className="text-3xl font-bold text-blue-600">
                                            ${marketData.global.smartBeautyMarket}亿
                                        </div>
                                        <div className="text-sm text-green-600">
                                            年增速 +{marketData.global.smartGrowthRate}%
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-bold text-gray-800 mb-3">市场趋势</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">▲</span>
                                            <span>个性化美妆需求持续增长，AI技术渗透率提升</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">▲</span>
                                            <span>直播电商推动线上美妆消费，用户更注重效果展示</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">▲</span>
                                            <span>智能家居普及，消费者对智能美妆设备接受度提高</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">▲</span>
                                            <span>疫情后居家美容习惯延续，专业级家用设备需求上升</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* China Market */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-2xl">🇨🇳</span>
                                中国市场分析
                            </h2>
                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                {[
                                    { label: '美妆市场规模', value: `¥${marketData.china.beautyMarket2024}亿`, sub: `年增速 +${marketData.china.growthRate}%` },
                                    { label: '智能设备市场', value: `¥${marketData.china.smartDeviceMarket}亿`, sub: `年增速 +${marketData.china.smartGrowthRate}%` },
                                    { label: '目标女性用户', value: `${marketData.china.targetPopulation}亿`, sub: '18-50岁城市女性' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-red-50 rounded-xl p-4 text-center">
                                        <div className="text-2xl font-bold text-red-600">{item.value}</div>
                                        <div className="text-sm text-gray-600">{item.label}</div>
                                        <div className="text-xs text-green-600 mt-1">{item.sub}</div>
                                    </div>
                                ))}
                            </div>

                            {/* City Tier Analysis */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="font-bold text-gray-800 mb-3">城市层级分析</h3>
                                <div className="space-y-3">
                                    {[
                                        { tier: '一线城市', cities: '北上广深', percentage: 35, strategy: '品牌旗舰店+高端商场' },
                                        { tier: '新一线城市', cities: '杭州、成都、武汉等', percentage: 40, strategy: '电商主推+体验店' },
                                        { tier: '二三线城市', cities: '其他省会及发达地级市', percentage: 25, strategy: '电商渠道+社交传播' },
                                    ].map((tier, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-24 text-sm font-medium text-gray-700">{tier.tier}</div>
                                            <div className="flex-1">
                                                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${tier.percentage}%` }}
                                                        transition={{ duration: 1, delay: i * 0.2 }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-12 text-sm font-bold text-gray-700">{tier.percentage}%</div>
                                            <div className="w-40 text-xs text-gray-500">{tier.strategy}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Southeast Asia Market */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-2xl">🌏</span>
                                东南亚市场分析
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <div className="bg-emerald-50 rounded-xl p-4 mb-4">
                                        <div className="text-sm text-gray-500">东南亚美妆市场规模 (2024)</div>
                                        <div className="text-3xl font-bold text-emerald-600">
                                            ${marketData.southeastAsia.beautyMarket2024}亿
                                        </div>
                                        <div className="text-sm text-green-600">
                                            年增速 +{marketData.southeastAsia.growthRate}%（高于全球平均）
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h3 className="font-bold text-gray-800 mb-2">市场优势</h3>
                                        <ul className="space-y-1 text-sm text-gray-600">
                                            <li>• 年轻人口结构，平均年龄 30 岁以下</li>
                                            <li>• 社交媒体渗透率高，TikTok/Instagram 活跃</li>
                                            <li>• 华人文化圈影响，接受度高</li>
                                            <li>• 中产阶级快速崛起，消费升级明显</li>
                                            <li>• 电商基础设施完善（Shopee、Lazada）</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-3">国家市场细分</h3>
                                    <div className="space-y-2">
                                        {marketData.southeastAsia.countries.map((country, i) => (
                                            <div key={i} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="w-4 h-4 text-emerald-500" />
                                                    <span className="font-medium text-gray-700">{country.name}</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm">
                                                    <span className="text-gray-500">${country.market}亿</span>
                                                    <span className="text-green-600">+{country.growth}%</span>
                                                    <span className="text-gray-400">{country.population}亿人</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Audience Tab */}
                {activeTab === 'audience' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* User Segments */}
                        {[targetAudience.primary, targetAudience.secondary, targetAudience.emerging].map((segment, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <Users className="w-6 h-6 text-blue-600" />
                                        {segment.title}
                                    </h2>
                                    <div className={cn(
                                        "text-2xl font-bold px-4 py-2 rounded-full",
                                        i === 0 ? "bg-pink-100 text-pink-600" :
                                        i === 1 ? "bg-purple-100 text-purple-600" :
                                        "bg-blue-100 text-blue-600"
                                    )}>
                                        {segment.percentage}%
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Demographics */}
                                    <div>
                                        <h3 className="font-bold text-gray-700 mb-3">人口统计</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {Object.entries(segment.demographics).map(([key, value]) => (
                                                <div key={key} className="bg-gray-50 rounded-lg p-3">
                                                    <div className="text-xs text-gray-500">
                                                        {key === 'age' ? '年龄' :
                                                         key === 'income' ? '收入' :
                                                         key === 'education' ? '学历' : '地区'}
                                                    </div>
                                                    <div className="font-medium text-gray-800">{value}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <h3 className="font-bold text-gray-700 mt-4 mb-3">用户特征</h3>
                                        <ul className="space-y-2">
                                            {segment.characteristics.map((char, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <span className="text-green-500 mt-0.5">✓</span>
                                                    {char}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Pain Points */}
                                    <div>
                                        <h3 className="font-bold text-gray-700 mb-3">痛点分析</h3>
                                        <div className="space-y-3">
                                            {segment.painPoints.map((pain, j) => (
                                                <div key={j} className="bg-red-50 rounded-lg p-3 flex items-start gap-2">
                                                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-gray-700">{pain}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <h3 className="font-bold text-gray-700 mt-4 mb-3">我们的解决方案</h3>
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    AI 实时指导，化妆技术立刻提升
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    个性化推荐，告别盲目购买
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    机械臂辅助，化妆更快更轻松
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* User Journey */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">用户转化路径</h2>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                {[
                                    { stage: '认知', icon: Smartphone, rate: '100%', desc: '小红书/抖音种草' },
                                    { stage: '兴趣', icon: Heart, rate: '35%', desc: '关注/收藏/对比' },
                                    { stage: '体验', icon: Target, rate: '15%', desc: '线下体验/直播演示' },
                                    { stage: '购买', icon: ShoppingBag, rate: '8%', desc: '电商/门店下单' },
                                    { stage: '复购', icon: TrendingUp, rate: '45%', desc: '耗材/升级/推荐' },
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="text-center">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-2">
                                                <step.icon className="w-8 h-8 text-blue-600" />
                                            </div>
                                            <div className="font-bold text-gray-800">{step.stage}</div>
                                            <div className="text-lg font-bold text-blue-600">{step.rate}</div>
                                            <div className="text-xs text-gray-500">{step.desc}</div>
                                        </div>
                                        {i < 4 && (
                                            <div className="text-gray-300 text-2xl">→</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Projection Tab */}
                {activeTab === 'projection' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Revenue Projection */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                                五年销售预测 (2025-2029)
                            </h2>

                            {/* Chart Visualization */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                {/* China */}
                                <div className="bg-red-50 rounded-xl p-4">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <span>🇨🇳</span> 中国市场
                                    </h3>
                                    <div className="space-y-3">
                                        {salesProjection.years.map((year, i) => (
                                            <div key={year} className="flex items-center gap-3">
                                                <div className="w-12 text-sm font-medium text-gray-600">{year}</div>
                                                <div className="flex-1">
                                                    <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(salesProjection.china.revenue[i] / 36) * 100}%` }}
                                                            transition={{ duration: 1, delay: i * 0.1 }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-20 text-right">
                                                    <div className="font-bold text-red-600">¥{salesProjection.china.revenue[i]}亿</div>
                                                    <div className="text-xs text-gray-500">{salesProjection.china.units[i].toLocaleString()}台</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Southeast Asia */}
                                <div className="bg-emerald-50 rounded-xl p-4">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <span>🌏</span> 东南亚市场
                                    </h3>
                                    <div className="space-y-3">
                                        {salesProjection.years.map((year, i) => (
                                            <div key={year} className="flex items-center gap-3">
                                                <div className="w-12 text-sm font-medium text-gray-600">{year}</div>
                                                <div className="flex-1">
                                                    <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(salesProjection.southeastAsia.revenue[i] / 13.3) * 100}%` }}
                                                            transition={{ duration: 1, delay: i * 0.1 }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-20 text-right">
                                                    <div className="font-bold text-emerald-600">¥{salesProjection.southeastAsia.revenue[i]}亿</div>
                                                    <div className="text-xs text-gray-500">{salesProjection.southeastAsia.units[i].toLocaleString()}台</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                                <div className="grid md:grid-cols-4 gap-4 text-center">
                                    <div>
                                        <div className="text-3xl font-bold">158万</div>
                                        <div className="text-blue-200">2029年总销量</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold">¥49.3亿</div>
                                        <div className="text-blue-200">2029年总收入</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold">85%</div>
                                        <div className="text-blue-200">5年CAGR</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold">11%</div>
                                        <div className="text-blue-200">目标市占率</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Revenue Breakdown */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">收入构成分析 (2029年预测)</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    {[
                                        { source: '硬件销售', amount: 35.2, percentage: 71, color: 'bg-blue-500' },
                                        { source: '耗材复购', amount: 6.8, percentage: 14, color: 'bg-purple-500' },
                                        { source: '电商分佣', amount: 4.4, percentage: 9, color: 'bg-pink-500' },
                                        { source: '会员订阅', amount: 2.9, percentage: 6, color: 'bg-orange-500' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className={`w-4 h-4 rounded-full ${item.color}`} />
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-700">{item.source}</span>
                                                    <span className="text-sm text-gray-500">¥{item.amount}亿 ({item.percentage}%)</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className={`h-full ${item.color}`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.percentage}%` }}
                                                        transition={{ duration: 1, delay: i * 0.2 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-bold text-gray-800 mb-3">收入增长策略</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500">●</span>
                                            <span><strong>硬件销售:</strong> 差异化产品线，覆盖不同价位段</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-500">●</span>
                                            <span><strong>耗材复购:</strong> 专属化妆棉、清洁液、滤镜膜等周边</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-pink-500">●</span>
                                            <span><strong>电商分佣:</strong> 推荐购买彩妆产品，与品牌分成</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-500">●</span>
                                            <span><strong>会员订阅:</strong> 高级AI功能、独家教程、优先服务</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Milestones */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-blue-600" />
                                关键里程碑
                            </h2>
                            <div className="relative">
                                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
                                <div className="space-y-6">
                                    {[
                                        { year: '2025 Q1', milestone: '产品发布', desc: '标准版上市，开启预售' },
                                        { year: '2025 Q3', milestone: '销量破5万', desc: '完成种子用户积累，口碑传播' },
                                        { year: '2026 Q1', milestone: '东南亚出海', desc: '新加坡、马来西亚首发' },
                                        { year: '2026 Q4', milestone: '销量破20万', desc: '完成A轮融资，扩大产能' },
                                        { year: '2027 Q2', milestone: '推出旗舰版', desc: '高端市场布局，提升品牌' },
                                        { year: '2028 Q1', milestone: '销量破100万', desc: '成为品类头部玩家' },
                                        { year: '2029 Q4', milestone: '年收入50亿', desc: '筹备IPO' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 relative">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs text-center z-10">
                                                {item.year}
                                            </div>
                                            <div className="flex-1 pt-2">
                                                <h3 className="font-bold text-gray-800">{item.milestone}</h3>
                                                <p className="text-sm text-gray-600">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Competition Tab */}
                {activeTab === 'competition' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Competitive Landscape */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Target className="w-6 h-6 text-blue-600" />
                                竞争格局分析
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">竞品</th>
                                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">地区</th>
                                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">价格</th>
                                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">优势</th>
                                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">劣势</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {competitors.map((comp, i) => (
                                            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4 font-medium text-gray-800">{comp.name}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600">{comp.country}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600">{comp.price}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {comp.strengths.map((s, j) => (
                                                            <span key={j} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                                {s}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {comp.weaknesses.map((w, j) => (
                                                            <span key={j} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                                                {w}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bg-blue-50">
                                            <td className="py-3 px-4 font-bold text-blue-600">AgenticMirror</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">中国</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">¥2999-7999</td>
                                            <td className="py-3 px-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {['具身AI', '云台追踪', '机械臂', '本地化', '社交功能'].map((s, j) => (
                                                        <span key={j} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                                                    品牌知名度待建立
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Competitive Advantages */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">核心竞争优势</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {
                                        title: '技术壁垒',
                                        icon: Zap,
                                        items: [
                                            '具身智能 = 云台 + 机械臂 + AI，形态创新',
                                            '人脸追踪算法，实时动态分析',
                                            '化妆步骤识别，专利技术',
                                            '多模态交互（语音+视觉+触控）',
                                        ],
                                    },
                                    {
                                        title: '产品壁垒',
                                        icon: Target,
                                        items: [
                                            '机械臂辅助，差异化明显',
                                            '陪伴式交互，情感连接',
                                            '社交功能内置，用户粘性强',
                                            '产品矩阵完整，覆盖多价位',
                                        ],
                                    },
                                    {
                                        title: '市场壁垒',
                                        icon: Globe,
                                        items: [
                                            '本土化深度定制（小红书、抖音）',
                                            '中国供应链优势，成本可控',
                                            '华人文化圈，出海有基础',
                                            '先发优势，快速占领心智',
                                        ],
                                    },
                                    {
                                        title: '生态壁垒',
                                        icon: Users,
                                        items: [
                                            '积分体系+品牌合作，商业闭环',
                                            '内容社区沉淀，UGC 生产力',
                                            '用户数据积累，AI 持续进化',
                                            '闺蜜圈裂变，社交传播',
                                        ],
                                    },
                                ].map((advantage, i) => (
                                    <div key={i} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <advantage.icon className="w-5 h-5 text-blue-600" />
                                            <h3 className="font-bold text-gray-800">{advantage.title}</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {advantage.items.map((item, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Market Position */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">市场定位矩阵</h2>
                            <div className="relative h-80 bg-gray-50 rounded-xl p-6">
                                {/* Axes */}
                                <div className="absolute left-12 top-6 bottom-12 w-0.5 bg-gray-300" />
                                <div className="absolute left-12 right-6 bottom-12 h-0.5 bg-gray-300" />
                                <div className="absolute left-6 top-6 text-xs text-gray-500">高价</div>
                                <div className="absolute left-6 bottom-16 text-xs text-gray-500">低价</div>
                                <div className="absolute left-16 bottom-6 text-xs text-gray-500">功能简单</div>
                                <div className="absolute right-6 bottom-6 text-xs text-gray-500">功能丰富</div>

                                {/* Competitors */}
                                <motion.div
                                    className="absolute bg-gray-200 rounded-full px-3 py-1 text-xs"
                                    style={{ left: '30%', top: '30%' }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Opté ($599)
                                </motion.div>
                                <motion.div
                                    className="absolute bg-gray-200 rounded-full px-3 py-1 text-xs"
                                    style={{ left: '40%', top: '45%' }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    HiMirror
                                </motion.div>
                                <motion.div
                                    className="absolute bg-gray-200 rounded-full px-3 py-1 text-xs"
                                    style={{ left: '25%', top: '55%' }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Simplehuman
                                </motion.div>
                                <motion.div
                                    className="absolute bg-gray-200 rounded-full px-3 py-1 text-xs"
                                    style={{ left: '20%', top: '75%' }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    国内智能镜
                                </motion.div>

                                {/* Our Product */}
                                <motion.div
                                    className="absolute bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-4 py-2 text-sm font-bold shadow-lg"
                                    style={{ right: '15%', top: '35%' }}
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    AgenticMirror ⭐
                                </motion.div>

                                {/* Highlight Zone */}
                                <div
                                    className="absolute border-2 border-dashed border-green-400 rounded-xl"
                                    style={{ right: '5%', top: '20%', width: '30%', height: '35%' }}
                                >
                                    <div className="absolute -top-3 right-4 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
                                        蓝海区域
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Risk Tab */}
                {activeTab === 'risk' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Risk Overview */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-6 h-6 text-amber-500" />
                                风险评估与应对
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {riskFactors.map((category, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "rounded-xl p-4 border-2",
                                            category.level === 'low' ? 'border-green-200 bg-green-50' :
                                            category.level === 'medium' ? 'border-amber-200 bg-amber-50' :
                                            'border-red-200 bg-red-50'
                                        )}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-bold text-gray-800">{category.category}</h3>
                                            <span className={cn(
                                                "text-xs px-2 py-1 rounded-full",
                                                category.level === 'low' ? 'bg-green-200 text-green-700' :
                                                category.level === 'medium' ? 'bg-amber-200 text-amber-700' :
                                                'bg-red-200 text-red-700'
                                            )}>
                                                {category.level === 'low' ? '低风险' :
                                                 category.level === 'medium' ? '中风险' : '高风险'}
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            {category.items.map((item, j) => (
                                                <div key={j} className="bg-white rounded-lg p-3">
                                                    <div className="flex items-start gap-2 mb-2">
                                                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm font-medium text-gray-700">{item.risk}</span>
                                                    </div>
                                                    <div className="flex items-start gap-2 ml-6">
                                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm text-gray-600">{item.mitigation}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SWOT Analysis */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">SWOT 分析</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {
                                        title: '优势 Strengths',
                                        color: 'from-green-100 to-emerald-100',
                                        items: [
                                            '具身智能形态，全球首创',
                                            '本土化团队，理解中国用户',
                                            '供应链优势，成本可控',
                                            '社交功能深度整合',
                                        ],
                                    },
                                    {
                                        title: '劣势 Weaknesses',
                                        color: 'from-red-100 to-orange-100',
                                        items: [
                                            '品牌知名度低，需要市场教育',
                                            '硬件+软件双线作战，资源分散',
                                            '售后服务体系待完善',
                                            '初期产能有限',
                                        ],
                                    },
                                    {
                                        title: '机会 Opportunities',
                                        color: 'from-blue-100 to-indigo-100',
                                        items: [
                                            '智能美妆赛道高速增长',
                                            '直播电商/社交媒体红利',
                                            '东南亚市场快速崛起',
                                            '消费升级趋势持续',
                                        ],
                                    },
                                    {
                                        title: '威胁 Threats',
                                        color: 'from-amber-100 to-yellow-100',
                                        items: [
                                            '大厂可能入局',
                                            '用户对新品类接受需要时间',
                                            '山寨/低价竞品冲击',
                                            '宏观经济波动影响消费',
                                        ],
                                    },
                                ].map((section, i) => (
                                    <div key={i} className={`bg-gradient-to-br ${section.color} rounded-xl p-4`}>
                                        <h3 className="font-bold text-gray-800 mb-3">{section.title}</h3>
                                        <ul className="space-y-2">
                                            {section.items.map((item, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <span className={
                                                        i === 0 ? 'text-green-500' :
                                                        i === 1 ? 'text-red-500' :
                                                        i === 2 ? 'text-blue-500' : 'text-amber-500'
                                                    }>●</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Investment Ask */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                            <h2 className="text-xl font-bold mb-4">融资计划</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                                    <div className="text-sm text-blue-200">天使轮</div>
                                    <div className="text-2xl font-bold mt-1">¥3000万</div>
                                    <div className="text-sm text-blue-200 mt-2">用途: 产品研发、团队扩张</div>
                                    <div className="text-xs text-blue-300 mt-1">释放股权: 15%</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                                    <div className="text-sm text-blue-200">A轮</div>
                                    <div className="text-2xl font-bold mt-1">¥1.5亿</div>
                                    <div className="text-sm text-blue-200 mt-2">用途: 量产、市场推广</div>
                                    <div className="text-xs text-blue-300 mt-1">释放股权: 20%</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                                    <div className="text-sm text-blue-200">B轮</div>
                                    <div className="text-2xl font-bold mt-1">¥5亿</div>
                                    <div className="text-sm text-blue-200 mt-2">用途: 出海、生态建设</div>
                                    <div className="text-xs text-blue-300 mt-1">释放股权: 15%</div>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-blue-200">
                                    目前寻求天使轮投资，诚邀有美妆、消费电子、AI背景的战略投资人
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
