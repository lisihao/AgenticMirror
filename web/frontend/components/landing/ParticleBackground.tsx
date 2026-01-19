'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  colors?: string[];
  className?: string;
  interactive?: boolean;
}

export default function ParticleBackground({
  particleCount = 30,
  colors = ['#ec4899', '#a855f7', '#6366f1', '#06b6d4'],
  className = '',
  interactive = true,
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  // 初始化粒子
  useEffect(() => {
    const initialParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    setParticles(initialParticles);
  }, [particleCount, colors]);

  // 粒子动画
  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => {
          let newX = p.x + p.speedX;
          let newY = p.y + p.speedY;

          // 边界反弹
          if (newX < 0 || newX > 100) {
            p.speedX *= -1;
            newX = Math.max(0, Math.min(100, newX));
          }
          if (newY < 0 || newY > 100) {
            p.speedY *= -1;
            newY = Math.max(0, Math.min(100, newY));
          }

          return { ...p, x: newX, y: newY };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // 鼠标交互
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: interactive ? 'auto' : 'none' }}
    >
      {particles.map((particle) => {
        // 计算与鼠标的距离，实现躲避效果
        const dx = particle.x - mousePos.x;
        const dy = particle.y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 15;

        let offsetX = 0;
        let offsetY = 0;

        if (interactive && distance < maxDistance && distance > 0) {
          const force = (maxDistance - distance) / maxDistance;
          offsetX = (dx / distance) * force * 8;
          offsetY = (dy / distance) * force * 8;
        }

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              filter: `blur(${particle.size > 4 ? 1 : 0}px)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            animate={{
              x: offsetX,
              y: offsetY,
              scale: [1, 1.2, 1],
            }}
            transition={{
              x: { duration: 0.3, ease: 'easeOut' },
              y: { duration: 0.3, ease: 'easeOut' },
              scale: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        );
      })}

      {/* 大型模糊光斑 */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-pink-500/20 blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-purple-500/20 blur-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ bottom: '10%', right: '10%' }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-cyan-500/15 blur-[80px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
}
