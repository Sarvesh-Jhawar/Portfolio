import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

const FloatingPlanet: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      // Slower rotation for Moon, faster for Sun
      meshRef.current.rotation.y = state.clock.elapsedTime * (isDark ? 0.3 : 0.6);
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      // Subtle float
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
      <MeshDistortMaterial
        color={isDark ? '#e2e8f0' : '#fbbf24'} // Moon Gray vs Sun Gold
        attach="material"
        distort={isDark ? 0.2 : 0.45} // Solid moon vs energetic sun
        speed={isDark ? 1.5 : 2.5} // Calm vs Active
        roughness={isDark ? 0.4 : 0.1} // Matte moon vs glowing sun
        metalness={isDark ? 0.1 : 0.8}
        emissive={isDark ? '#94a3b8' : '#f59e0b'} // Added subtle emissive glow
        emissiveIntensity={isDark ? 0.2 : 0.5}
      />
    </Sphere>
  );
};

const Hero: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Celestial Object (Moon/Sun) */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] opacity-70 lg:opacity-85 pointer-events-none">
        <Canvas dpr={[1, 2]}>
          <ambientLight intensity={isDark ? 0.4 : 0.8} />
          <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.5 : 1.5} color={isDark ? '#e2e8f0' : '#fff4da'} />
          <pointLight 
            position={[-10, -10, -5]} 
            intensity={isDark ? 0.8 : 2} 
            color={isDark ? '#7dd3fc' : '#fcd34d'} // Cool Moon Light vs Warm Sun Light
          />
          <Suspense fallback={null}>
            <FloatingPlanet isDark={isDark} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
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

      {/* Scroll Indicator */}
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
