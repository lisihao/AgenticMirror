'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Box, Eye, Cpu, Palette, Zap } from 'lucide-react';

const specs = [
  { icon: Eye, label: '光谱传感', value: '8通道', desc: 'HyperSkin 多光谱分析' },
  { icon: Box, label: '3D建模', value: '50,000点', desc: 'MicroFace 结构光' },
  { icon: Zap, label: '渲染帧率', value: '60fps', desc: 'LiveRender Pro' },
  { icon: Cpu, label: '渲染延迟', value: '<16ms', desc: 'GPU实时渲染' },
  { icon: Palette, label: '色彩精度', value: 'ΔE<1', desc: 'TrueColor 标定' },
  { icon: Sparkles, label: '偏好学习', value: '128维', desc: 'Beauty Genome' },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      {/* 导航 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/demo/mirror"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回魔镜体验</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-400" />
            <span className="text-white font-semibold">产品介绍</span>
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div className="pt-20 pb-16">
        {/* Hero 区域 - 产品渲染图 */}
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/20 border border-rose-500/30 rounded-full text-rose-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AgenticMirror Pro
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              全栈美妆智能镜
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              环境智能 × 可穿戴健康 × 生成式AI 三大趋势的交汇点
            </p>
          </motion.div>

          {/* 产品渲染图 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden border border-rose-500/20 shadow-2xl shadow-rose-500/10 mb-16"
          >
            <img
              src="/images/agenticmirror-product.png"
              alt="AgenticMirror 产品渲染图"
              className="w-full h-auto"
            />
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

            {/* 底部产品信息 */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-rose-400 text-sm font-medium mb-2">Premium Edition</div>
                  <div className="text-white text-3xl font-bold">AgenticMirror Pro 27"</div>
                </div>
                <div className="flex gap-3">
                  <span className="px-4 py-2 bg-rose-500/20 backdrop-blur text-rose-300 rounded-full text-sm">
                    玫瑰金边框
                  </span>
                  <span className="px-4 py-2 bg-sky-500/20 backdrop-blur text-sky-300 rounded-full text-sm">
                    4K 显示
                  </span>
                  <span className="px-4 py-2 bg-fuchsia-500/20 backdrop-blur text-fuchsia-300 rounded-full text-sm">
                    环形补光
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 核心规格 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white text-center mb-8">核心技术规格</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center hover:border-rose-500/50 transition-colors"
                >
                  <spec.icon className="w-8 h-8 text-rose-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{spec.value}</div>
                  <div className="text-rose-400 text-sm font-medium">{spec.label}</div>
                  <div className="text-gray-500 text-xs mt-1">{spec.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 产品尺寸 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 bg-slate-800/30 border border-slate-700 rounded-2xl p-8"
          >
            <h2 className="text-xl font-bold text-white mb-6 text-center">产品系列</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Compact', size: '15"', price: '¥2,999', desc: '便携款，适合旅行' },
                { name: 'Standard', size: '21"', price: '¥4,999', desc: '家用款，日常必备', featured: true },
                { name: 'Pro', size: '27"', price: '¥7,999', desc: '专业款，极致体验' },
              ].map((product) => (
                <div
                  key={product.name}
                  className={`rounded-xl p-6 text-center transition-all ${
                    product.featured
                      ? 'bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 border-2 border-rose-500/50 scale-105'
                      : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {product.featured && (
                    <div className="text-rose-400 text-xs font-medium mb-2">最受欢迎</div>
                  )}
                  <div className="text-white text-lg font-bold">{product.name}</div>
                  <div className="text-4xl font-bold text-white my-3">{product.size}</div>
                  <div className="text-rose-400 text-xl font-bold mb-2">{product.price}</div>
                  <div className="text-gray-400 text-sm">{product.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <Link
              href="/demo/differentiation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              查看十大技术壁垒
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
