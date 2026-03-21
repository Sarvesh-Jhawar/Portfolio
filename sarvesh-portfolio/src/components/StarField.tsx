import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

interface StarsProps {
  color: string;
  count: number;
  size: number;
  opacity: number;
  speed?: number;
}

const Stars: React.FC<StarsProps> = ({ color, count, size, opacity, speed = 1 }) => {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02 * speed;
      ref.current.rotation.y = state.clock.elapsedTime * 0.01 * speed;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
};

const StarField: React.FC = () => {
  const { isDark } = useTheme();

  if (!isDark) {
    // Light mode: soft gradient + dark/violet floating stars
    return (
      <div className="fixed inset-0 -z-10" style={{ pointerEvents: 'none' }}>
        {/* Gradient background layer */}
        <div className="absolute inset-0 light-gradient-bg transition-all duration-700" />
        {/* Dark stars canvas on top */}
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          style={{ position: 'absolute', inset: 0, background: 'transparent' }}
          dpr={[1, 1.5]}
        >
          {/* Main dark stars */}
          <Stars color="#1e1b4b" count={1500} size={0.12} opacity={0.35} speed={0.7} />
          {/* Subtle violet accent stars */}
          <Stars color="#6d28d9" count={800} size={0.08} opacity={0.25} speed={0.5} />
          <ambientLight intensity={0.2} />
        </Canvas>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: '#00000f' }}
        dpr={[1, 1.5]}
      >
        {/* Bright purple stars */}
        <Stars color="#a78bfa" count={2500} size={0.15} opacity={0.8} />
        {/* Subtle blue tint stars */}
        <Stars color="#38bdf8" count={500} size={0.1} opacity={0.5} speed={0.6} />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
};

export default StarField;
