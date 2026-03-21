import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

const OrbitingObject: React.FC<{ radius: number; speed: number; children: React.ReactNode }> = ({ radius, speed, children }) => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * 0.5, Math.sin(t) * radius);
    ref.current.rotation.y = -t + Math.PI / 2;
  });
  return <group ref={ref}>{children}</group>;
};

const Satellite: React.FC = () => (
  <group scale={0.08}>
    <mesh>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.1} />
    </mesh>
    {/* Solar Panels */}
    <mesh position={[2.5, 0, 0]}>
      <boxGeometry args={[3, 1.2, 0.05]} />
      <meshStandardMaterial color="#1e40af" emissive="#1d4ed8" emissiveIntensity={0.5} />
    </mesh>
    <mesh position={[-2.5, 0, 0]}>
      <boxGeometry args={[3, 1.2, 0.05]} />
      <meshStandardMaterial color="#1e40af" emissive="#1d4ed8" emissiveIntensity={0.5} />
    </mesh>
    {/* Dish */}
    <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
      <coneGeometry args={[0.8, 0.5, 16]} />
      <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
    </mesh>
  </group>
);

const SolarProbe: React.FC = () => (
  <group scale={0.08}>
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.1} />
    </mesh>
    <mesh position={[2, 0, 0]}>
      <boxGeometry args={[3, 1.5, 0.1]} />
      <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.5} />
    </mesh>
    <mesh position={[-2, 0, 0]}>
      <boxGeometry args={[3, 1.5, 0.1]} />
      <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.5} />
    </mesh>
  </group>
);

const SunCorona: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <mesh ref={meshRef} scale={3.2}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#f59e0b"
        transparent
        opacity={0.15}
        emissive="#fbbf24"
        emissiveIntensity={2}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

const FloatingPlanet: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [sunTexture, moonTexture] = useLoader(THREE.TextureLoader, [
    '/assets/sun.png',
    '/assets/moon.png'
  ]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * (isDark ? 0.2 : 0.4);
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group>
      {!isDark && <SunCorona />}
      
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
        <meshStandardMaterial
          map={isDark ? moonTexture : sunTexture}
          bumpMap={isDark ? moonTexture : undefined}
          bumpScale={isDark ? 0.05 : 0}
          roughness={isDark ? 0.8 : 0.4}
          metalness={isDark ? 0.2 : 0.6}
          emissive={isDark ? '#475569' : '#f59e0b'}
          emissiveIntensity={isDark ? 0.4 : 1.8}
        />
      </Sphere>
      
      <OrbitingObject radius={4.5} speed={isDark ? 0.4 : 0.6}>
        {isDark ? <Satellite /> : <SolarProbe />}
      </OrbitingObject>
    </group>
  );
};

const Hero: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[750px] lg:h-[750px] opacity-80 lg:opacity-95 pointer-events-none">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={isDark ? 0.3 : 1} />
          <directionalLight position={[10, 10, 5]} intensity={isDark ? 1 : 2.5} color={isDark ? '#e2e8f0' : '#fff4da'} />
          <pointLight 
            position={[-10, 5, -5]} 
            intensity={isDark ? 1.5 : 5} 
            color={isDark ? '#7dd3fc' : '#fbbf24'}
          />
          <Suspense fallback={null}>
            <FloatingPlanet isDark={isDark} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 section-padding w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`font-body text-sm sm:text-base font-medium mb-4 ${
              isDark ? 'text-cosmos-blue' : 'text-cosmos-skyBlue'
            }`}
          >
            👋 Hello, World! I'm
          </motion.p>

          <h1
            className={`font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-tight ${
              isDark ? 'shimmer-text' : 'shimmer-text-light'
            }`}
          >
            SARVESH
            <br />
            JHAWAR
          </h1>

          <div
            className={`text-lg sm:text-xl md:text-2xl font-body font-medium mb-8 h-[32px] sm:h-[36px] ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <TypeAnimation
              sequence={[
                'Backend Engineer.',
                2000,
                'AI Developer.',
                2000,
                'Building systems that scale.',
                2000,
                'I make things that think.',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-body font-semibold text-sm sm:text-base transition-all duration-300 ${
                isDark
                  ? 'bg-cosmos-purple text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105'
                  : 'bg-cosmos-deepViolet text-white hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105'
              }`}
            >
              Explore My Work 🚀
            </a>
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-body font-semibold text-sm sm:text-base transition-all duration-300 ${
                isDark
                  ? 'border border-cosmos-blue text-cosmos-blue hover:bg-cosmos-blue/10'
                  : 'border border-cosmos-skyBlue text-cosmos-skyBlue hover:bg-cosmos-skyBlue/10'
              }`}
            >
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl sm:text-3xl"
        >
          🚀
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
