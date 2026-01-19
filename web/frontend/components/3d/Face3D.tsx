'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 高斯泼溅粒子组件
function GaussianParticles({
  count = 500,
  layer = 0,
  color = '#ffccaa'
}: {
  count?: number;
  layer?: number;
  color?: string;
}) {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  // 生成面部形状的粒子位置
  const [positions, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // 创建面部椭球形状的分布
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      // 面部椭球参数 - 稍扁的椭球
      const rx = 1.0 + Math.random() * 0.1;
      const ry = 1.3 + Math.random() * 0.1;
      const rz = 0.8 + Math.random() * 0.1;

      const r = 0.8 + Math.random() * 0.2;

      pos[i * 3] = r * rx * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * ry * Math.sin(phi) * Math.sin(theta) - 0.2;
      pos[i * 3 + 2] = r * rz * Math.cos(phi);

      // 粒子大小
      size[i] = 0.02 + Math.random() * 0.04;

      // 颜色 - 基于层级
      const baseColor = new THREE.Color(color);
      col[i * 3] = baseColor.r + (Math.random() - 0.5) * 0.1;
      col[i * 3 + 1] = baseColor.g + (Math.random() - 0.5) * 0.1;
      col[i * 3 + 2] = baseColor.b + (Math.random() - 0.5) * 0.1;
    }

    return [pos, size, col];
  }, [count, color]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3D 面部网格
function FaceMesh({ makeupLayer = 0 }: { makeupLayer?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // 根据化妆层级调整颜色
  const skinColor = useMemo(() => {
    const colors = [
      '#ffccaa', // 素颜
      '#ffe0cc', // 底妆 - 更均匀的肤色
      '#ffd4cc', // 眼妆
      '#ffcccc', // 唇妆
      '#ffd0c8', // 完整
    ];
    return colors[makeupLayer] || colors[0];
  }, [makeupLayer]);

  return (
    <group>
      {/* 主面部 - 使用扭曲材质模拟柔和的高斯效果 */}
      <mesh ref={meshRef} scale={[1, 1.3, 0.9]}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={skinColor}
          speed={2}
          distort={0.1}
          radius={1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* 眼妆层 */}
      {makeupLayer >= 2 && (
        <>
          {/* 左眼影 */}
          <mesh position={[-0.35, 0.2, 0.75]} scale={[0.25, 0.12, 0.1]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color="#c084fc"
              transparent
              opacity={0.6}
              roughness={0.8}
            />
          </mesh>
          {/* 右眼影 */}
          <mesh position={[0.35, 0.2, 0.75]} scale={[0.25, 0.12, 0.1]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color="#c084fc"
              transparent
              opacity={0.6}
              roughness={0.8}
            />
          </mesh>
          {/* 左腮红 */}
          <mesh position={[-0.55, -0.15, 0.6]} scale={[0.3, 0.2, 0.1]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color="#f472b6"
              transparent
              opacity={0.4}
              roughness={0.9}
            />
          </mesh>
          {/* 右腮红 */}
          <mesh position={[0.55, -0.15, 0.6]} scale={[0.3, 0.2, 0.1]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color="#f472b6"
              transparent
              opacity={0.4}
              roughness={0.9}
            />
          </mesh>
        </>
      )}

      {/* 唇妆层 */}
      {makeupLayer >= 3 && (
        <mesh position={[0, -0.45, 0.8]} scale={[0.25, 0.1, 0.1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#e11d48"
            transparent
            opacity={0.8}
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>
      )}

      {/* 眉毛 */}
      <mesh position={[-0.35, 0.45, 0.7]} rotation={[0, 0, 0.2]} scale={[0.2, 0.03, 0.05]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#5c4033" />
      </mesh>
      <mesh position={[0.35, 0.45, 0.7]} rotation={[0, 0, -0.2]} scale={[0.2, 0.03, 0.05]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#5c4033" />
      </mesh>

      {/* 眼睛 */}
      <mesh position={[-0.35, 0.2, 0.85]} scale={[0.12, 0.08, 0.05]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.35, 0.2, 0.92]} scale={[0.06, 0.06, 0.02]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#3b2f2f" />
      </mesh>
      <mesh position={[0.35, 0.2, 0.85]} scale={[0.12, 0.08, 0.05]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.35, 0.2, 0.92]} scale={[0.06, 0.06, 0.02]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#3b2f2f" />
      </mesh>

      {/* 鼻子 */}
      <mesh position={[0, 0, 0.95]} scale={[0.08, 0.15, 0.1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* 嘴唇基础 */}
      <mesh position={[0, -0.45, 0.78]} scale={[0.2, 0.08, 0.08]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={makeupLayer >= 3 ? '#e11d48' : '#cc8888'} />
      </mesh>
    </group>
  );
}

// 环绕的高斯粒子效果
function SurroundingParticles({ layer = 0 }: { layer?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const particleColors = ['#ec4899', '#a855f7', '#6366f1', '#f472b6', '#fbbf24'];

  return (
    <group ref={groupRef}>
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 2 + Math.sin(i * 0.5) * 0.3;
        const y = (Math.random() - 0.5) * 2;
        return (
          <Float key={i} speed={2} rotationIntensity={0} floatIntensity={1}>
            <mesh
              position={[
                Math.cos(angle) * radius,
                y,
                Math.sin(angle) * radius,
              ]}
            >
              <sphereGeometry args={[0.03 + Math.random() * 0.02, 16, 16]} />
              <meshStandardMaterial
                color={particleColors[i % particleColors.length]}
                emissive={particleColors[i % particleColors.length]}
                emissiveIntensity={0.5}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// 主组件
interface Face3DProps {
  makeupLayer?: number;
  className?: string;
}

export default function Face3D({ makeupLayer = 0, className = '' }: Face3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* 环境光 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ec4899" />
        <pointLight position={[5, -5, 5]} intensity={0.3} color="#a855f7" />

        {/* 3D 面部 */}
        <FaceMesh makeupLayer={makeupLayer} />

        {/* 高斯粒子效果 */}
        <GaussianParticles count={300} layer={makeupLayer} />

        {/* 环绕粒子 */}
        <SurroundingParticles layer={makeupLayer} />

        {/* 轨道控制 */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
