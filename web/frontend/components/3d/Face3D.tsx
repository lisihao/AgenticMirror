'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';

// 简化版 3D 面部渲染 - 使用 CSS 3D 变换
interface Face3DProps {
  makeupLayer?: number;
  className?: string;
}

export default function Face3D({ makeupLayer = 0, className = '' }: Face3DProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  // 自动旋转
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x,
        y: prev.y + 0.5,
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [isDragging]);

  // 拖动处理
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPos.current.x;
    const deltaY = e.clientY - lastPos.current.y;
    setRotation((prev) => ({
      x: Math.max(-30, Math.min(30, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5,
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 颜色配置
  const skinColors = ['#ffd5c8', '#ffe0d0', '#ffd8cc', '#ffd0c0', '#ffd4c8'];
  const skinColor = skinColors[makeupLayer] || skinColors[0];

  return (
    <div
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ perspective: '800px' }}
    >
      {/* 3D 场景容器 */}
      <div
        className="relative"
        style={{
          width: '200px',
          height: '260px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {/* 主面部 */}
        <div
          className="absolute inset-0 rounded-[50%] shadow-2xl"
          style={{
            background: `radial-gradient(ellipse at 40% 30%, ${skinColor}, #e8b8a8)`,
            transform: 'translateZ(20px)',
            boxShadow: `
              inset -20px -20px 40px rgba(0,0,0,0.1),
              inset 20px 20px 40px rgba(255,255,255,0.3),
              0 20px 60px rgba(0,0,0,0.3)
            `,
          }}
        />

        {/* 底妆效果 - 光泽层 */}
        {makeupLayer >= 1 && (
          <motion.div
            className="absolute inset-0 rounded-[50%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            style={{
              background: 'radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.6), transparent 50%)',
              transform: 'translateZ(22px)',
            }}
          />
        )}

        {/* 眉毛 */}
        <div
          className="absolute"
          style={{
            top: '28%',
            left: '20%',
            width: '22%',
            height: '4%',
            background: 'linear-gradient(90deg, transparent, #5c4033 20%, #5c4033 80%, transparent)',
            borderRadius: '50%',
            transform: 'translateZ(25px) rotate(-5deg)',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '28%',
            right: '20%',
            width: '22%',
            height: '4%',
            background: 'linear-gradient(90deg, transparent, #5c4033 20%, #5c4033 80%, transparent)',
            borderRadius: '50%',
            transform: 'translateZ(25px) rotate(5deg)',
          }}
        />

        {/* 眼睛 */}
        <div
          className="absolute bg-white rounded-[50%] shadow-inner"
          style={{
            top: '36%',
            left: '22%',
            width: '18%',
            height: '10%',
            transform: 'translateZ(28px)',
          }}
        >
          {/* 眼珠 */}
          <div
            className="absolute bg-gradient-to-br from-gray-800 to-gray-900 rounded-full"
            style={{
              top: '20%',
              left: '35%',
              width: '35%',
              height: '60%',
            }}
          >
            {/* 高光 */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80" />
          </div>
        </div>
        <div
          className="absolute bg-white rounded-[50%] shadow-inner"
          style={{
            top: '36%',
            right: '22%',
            width: '18%',
            height: '10%',
            transform: 'translateZ(28px)',
          }}
        >
          <div
            className="absolute bg-gradient-to-br from-gray-800 to-gray-900 rounded-full"
            style={{
              top: '20%',
              left: '35%',
              width: '35%',
              height: '60%',
            }}
          >
            <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80" />
          </div>
        </div>

        {/* 眼影 */}
        {makeupLayer >= 2 && (
          <>
            <motion.div
              className="absolute rounded-[50%]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              style={{
                top: '32%',
                left: '18%',
                width: '24%',
                height: '12%',
                background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.7), transparent 70%)',
                transform: 'translateZ(26px)',
                filter: 'blur(3px)',
              }}
            />
            <motion.div
              className="absolute rounded-[50%]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              style={{
                top: '32%',
                right: '18%',
                width: '24%',
                height: '12%',
                background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.7), transparent 70%)',
                transform: 'translateZ(26px)',
                filter: 'blur(3px)',
              }}
            />
            {/* 腮红 */}
            <motion.div
              className="absolute rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              style={{
                top: '50%',
                left: '8%',
                width: '25%',
                height: '18%',
                background: 'radial-gradient(ellipse, rgba(244, 114, 182, 0.6), transparent 70%)',
                transform: 'translateZ(24px)',
                filter: 'blur(8px)',
              }}
            />
            <motion.div
              className="absolute rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              style={{
                top: '50%',
                right: '8%',
                width: '25%',
                height: '18%',
                background: 'radial-gradient(ellipse, rgba(244, 114, 182, 0.6), transparent 70%)',
                transform: 'translateZ(24px)',
                filter: 'blur(8px)',
              }}
            />
          </>
        )}

        {/* 鼻子 */}
        <div
          className="absolute"
          style={{
            top: '42%',
            left: '50%',
            width: '12%',
            height: '22%',
            transform: 'translateX(-50%) translateZ(35px)',
            background: `linear-gradient(180deg, transparent, ${skinColor} 30%, ${skinColor})`,
            borderRadius: '0 0 50% 50%',
            boxShadow: '-5px 0 10px rgba(0,0,0,0.05), 5px 0 10px rgba(0,0,0,0.05)',
          }}
        />

        {/* 嘴唇 */}
        <div
          className="absolute"
          style={{
            top: '72%',
            left: '50%',
            width: '28%',
            height: '10%',
            transform: 'translateX(-50%) translateZ(28px)',
          }}
        >
          {/* 上唇 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              width: '80%',
              height: '45%',
              background: makeupLayer >= 3
                ? 'linear-gradient(180deg, #dc2626, #ef4444)'
                : 'linear-gradient(180deg, #d4a5a5, #c99090)',
              borderRadius: '50% 50% 0 0',
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            }}
          />
          {/* 下唇 */}
          <motion.div
            initial={makeupLayer >= 3 ? { background: '#d4a5a5' } : {}}
            animate={makeupLayer >= 3 ? { background: '#e11d48' } : {}}
            style={{
              position: 'absolute',
              bottom: 0,
              left: '5%',
              width: '90%',
              height: '60%',
              background: makeupLayer >= 3
                ? 'linear-gradient(180deg, #ef4444, #dc2626)'
                : 'linear-gradient(180deg, #c99090, #b88080)',
              borderRadius: '0 0 50% 50%',
              boxShadow: makeupLayer >= 3 ? '0 2px 10px rgba(220, 38, 38, 0.5)' : 'none',
            }}
          />
          {/* 唇部高光 */}
          {makeupLayer >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="absolute"
              style={{
                bottom: '20%',
                left: '30%',
                width: '40%',
                height: '30%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)',
                borderRadius: '50%',
              }}
            />
          )}
        </div>

        {/* 高斯粒子效果 */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 130 + Math.sin(i * 2) * 20;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const colors = ['#ec4899', '#a855f7', '#6366f1', '#f472b6'];
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 6 + Math.random() * 6,
                height: 6 + Math.random() * 6,
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                background: colors[i % colors.length],
                filter: 'blur(2px)',
                transform: `translateZ(${-20 + Math.random() * 40}px)`,
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
