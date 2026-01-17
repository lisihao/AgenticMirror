'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Camera,
    CameraOff,
    Sun,
    Sparkles,
    ChevronRight,
    Settings,
    RotateCcw,
    ZoomIn,
    ZoomOut,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { mockAnalysis } from '@/lib/constants/mockData';

const lightingPresets = [
    { id: 'warm', label: '暖光', temp: '2700K', color: '#FFF4E0' },
    { id: 'neutral', label: '自然', temp: '4000K', color: '#FFFAF5' },
    { id: 'cool', label: '冷光', temp: '5500K', color: '#F5F8FF' },
    { id: 'daylight', label: '日光', temp: '6500K', color: '#F0F5FF' },
];

// Simulated face landmarks (simplified for demo)
const generateFaceLandmarks = () => {
    const landmarks: { x: number; y: number }[] = [];
    // Face outline
    for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * 2 * Math.PI;
        const radiusX = 120 + Math.sin(i * 0.5) * 10;
        const radiusY = 150 + Math.cos(i * 0.3) * 10;
        landmarks.push({
            x: 200 + Math.cos(angle) * radiusX,
            y: 200 + Math.sin(angle) * radiusY * 0.9,
        });
    }
    // Eyes
    for (let i = 0; i < 12; i++) {
        landmarks.push({ x: 150 + (i % 6) * 8, y: 170 + Math.floor(i / 6) * 5 });
        landmarks.push({ x: 230 + (i % 6) * 8, y: 170 + Math.floor(i / 6) * 5 });
    }
    // Nose
    for (let i = 0; i < 9; i++) {
        landmarks.push({ x: 195 + (i % 3) * 5, y: 200 + Math.floor(i / 3) * 15 });
    }
    // Mouth
    for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI;
        landmarks.push({
            x: 200 + Math.cos(angle) * 35,
            y: 280 + Math.sin(angle) * 10,
        });
    }
    return landmarks;
};

export default function MirrorPage() {
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showMesh, setShowMesh] = useState(true);
    const [selectedLighting, setSelectedLighting] = useState('neutral');
    const [zoom, setZoom] = useState(1);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [landmarks] = useState(generateFaceLandmarks);
    const [faceDetected, setFaceDetected] = useState(true);

    // Simulate face tracking movement
    const [trackingOffset, setTrackingOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (faceDetected) {
            const interval = setInterval(() => {
                setTrackingOffset({
                    x: Math.sin(Date.now() / 1000) * 3,
                    y: Math.cos(Date.now() / 800) * 2,
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [faceDetected]);

    const handleStartAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            // Navigate to analysis page would happen here
        }, 3000);
    };

    const currentLighting = lightingPresets.find(p => p.id === selectedLighting);

    return (
        <div className="min-h-screen p-6">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">魔镜体验</h1>
                <p className="text-gray-600">实时人脸追踪与皮肤分析</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Mirror View */}
                <div className="lg:col-span-2">
                    <div className="card overflow-hidden">
                        {/* Mirror Surface */}
                        <div
                            className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200"
                            style={{ backgroundColor: currentLighting?.color }}
                        >
                            {/* Demo Face Visualization */}
                            <svg
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 400 400"
                                style={{
                                    transform: `translate(${trackingOffset.x}px, ${trackingOffset.y}px) scale(${zoom})`,
                                    transition: 'transform 0.1s ease-out'
                                }}
                            >
                                {/* Face background */}
                                <ellipse
                                    cx="200"
                                    cy="200"
                                    rx="100"
                                    ry="130"
                                    fill="#f5e6d3"
                                    opacity="0.3"
                                />

                                {/* Face mesh points */}
                                {showMesh && landmarks.map((point, i) => (
                                    <motion.circle
                                        key={i}
                                        cx={point.x}
                                        cy={point.y}
                                        r={2}
                                        fill="#E91E63"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 0.6, scale: 1 }}
                                        transition={{ delay: i * 0.005, duration: 0.3 }}
                                    />
                                ))}

                                {/* Face mesh lines */}
                                {showMesh && (
                                    <g stroke="#E91E63" strokeWidth="0.5" opacity="0.3" fill="none">
                                        {/* Simplified mesh connections */}
                                        <ellipse cx="200" cy="200" rx="100" ry="130" strokeDasharray="4,4" />
                                        <ellipse cx="155" cy="175" rx="20" ry="10" />
                                        <ellipse cx="245" cy="175" rx="20" ry="10" />
                                        <path d="M 180 240 Q 200 260 220 240" />
                                        <line x1="200" y1="185" x2="200" y2="230" />
                                    </g>
                                )}

                                {/* Skin zone highlights */}
                                {mockAnalysis.problemAreas.map((area, i) => (
                                    <motion.circle
                                        key={area.zone}
                                        cx={area.x * 4}
                                        cy={area.y * 4 + 20}
                                        r={15}
                                        fill={area.severity === 'moderate' ? '#F59E0B' : '#22C55E'}
                                        opacity={0.2}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{
                                            delay: i * 0.2 + 0.5,
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                    />
                                ))}
                            </svg>

                            {/* Status Indicators */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <div className="glass rounded-lg px-3 py-2 flex items-center gap-2">
                                    <span className={cn(
                                        "w-2 h-2 rounded-full",
                                        faceDetected ? "bg-green-500 animate-pulse" : "bg-red-500"
                                    )} />
                                    <span className="text-sm font-medium text-gray-700">
                                        {faceDetected ? '面部追踪中' : '未检测到面部'}
                                    </span>
                                </div>
                                {showMesh && (
                                    <div className="glass rounded-lg px-3 py-2 text-sm text-gray-600">
                                        468 特征点检测
                                    </div>
                                )}
                            </div>

                            {/* Quick Score */}
                            <div className="absolute top-4 right-4 glass rounded-lg px-4 py-3 text-center">
                                <div className="text-xs text-gray-500 mb-1">皮肤评分</div>
                                <div className="text-3xl font-bold text-gradient">
                                    {mockAnalysis.overallScore}
                                </div>
                            </div>

                            {/* Zoom Controls */}
                            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                <button
                                    onClick={() => setZoom(Math.max(0.8, zoom - 0.1))}
                                    className="glass p-2 rounded-lg hover:bg-white/90 transition-colors"
                                >
                                    <ZoomOut className="w-5 h-5 text-gray-600" />
                                </button>
                                <span className="glass px-3 py-2 rounded-lg text-sm font-medium">
                                    {Math.round(zoom * 100)}%
                                </span>
                                <button
                                    onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
                                    className="glass p-2 rounded-lg hover:bg-white/90 transition-colors"
                                >
                                    <ZoomIn className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            {/* Analysis Overlay */}
                            {isAnalyzing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                                >
                                    <div className="text-center text-white">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                            className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
                                        />
                                        <div className="text-lg font-medium">AI 分析中...</div>
                                        <div className="text-sm text-white/70">正在检测皮肤状态</div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Controls Bar */}
                        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCameraEnabled(!cameraEnabled)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                                        cameraEnabled
                                            ? "bg-mirror-100 text-mirror-600"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    )}
                                >
                                    {cameraEnabled ? (
                                        <Camera className="w-5 h-5" />
                                    ) : (
                                        <CameraOff className="w-5 h-5" />
                                    )}
                                    <span className="text-sm font-medium">
                                        {cameraEnabled ? '关闭摄像头' : '开启摄像头'}
                                    </span>
                                </button>
                                <button
                                    onClick={() => setShowMesh(!showMesh)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                                        showMesh
                                            ? "bg-accent-100 text-accent-600"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    )}
                                >
                                    <Sparkles className="w-5 h-5" />
                                    <span className="text-sm font-medium">网格</span>
                                </button>
                                <button
                                    onClick={() => setFaceDetected(!faceDetected)}
                                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                            </div>

                            <button
                                onClick={handleStartAnalysis}
                                disabled={isAnalyzing}
                                className="btn-primary"
                            >
                                {isAnalyzing ? '分析中...' : '开始分析'}
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="space-y-6">
                    {/* Lighting Controls */}
                    <div className="card p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Sun className="w-5 h-5 text-gold-500" />
                            <h2 className="font-semibold text-gray-900">灯光控制</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {lightingPresets.map((preset) => (
                                <button
                                    key={preset.id}
                                    onClick={() => setSelectedLighting(preset.id)}
                                    className={cn(
                                        "p-3 rounded-xl border-2 transition-all",
                                        selectedLighting === preset.id
                                            ? "border-mirror-500 bg-mirror-50"
                                            : "border-gray-100 hover:border-gray-200"
                                    )}
                                >
                                    <div
                                        className="w-8 h-8 rounded-full mx-auto mb-2 border border-gray-200"
                                        style={{ backgroundColor: preset.color }}
                                    />
                                    <div className="text-sm font-medium text-gray-900">
                                        {preset.label}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {preset.temp}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Analysis Preview */}
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-gray-900">快速检测</h2>
                            <Link
                                href="/demo/analysis"
                                className="text-sm text-mirror-500 hover:text-mirror-600"
                            >
                                详细报告 →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {Object.entries(mockAnalysis.metrics).slice(0, 4).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span>{value.icon}</span>
                                        <span className="text-sm text-gray-600 capitalize">
                                            {key === 'hydration' ? '水分' :
                                             key === 'oil' ? '油脂' :
                                             key === 'pores' ? '毛孔' :
                                             key === 'wrinkles' ? '纹理' : key}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${value.score}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full bg-gradient-mirror rounded-full"
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 w-8">
                                            {value.score}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Today's Recommendation */}
                    <div className="card p-5 bg-gradient-to-br from-mirror-50 to-accent-50">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-5 h-5 text-mirror-500" />
                            <h2 className="font-semibold text-gray-900">今日推荐</h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            根据您的皮肤状态和今日日程，为您推荐：
                        </p>
                        <Link
                            href="/demo/recommendations"
                            className="block p-3 bg-white rounded-xl hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">清透职场妆</div>
                                    <div className="text-sm text-gray-500">匹配度 95%</div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
