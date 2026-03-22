import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader, extend, ThreeElement } from '@react-three/fiber';
import { Sphere, shaderMaterial, useAnimations } from '@react-three/drei';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

// Custom Sun Shader Material
const SunShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color('#fbbf24'), // Bright Yellow
    uColor2: new THREE.Color('#f59e0b'), // Deep Orange
    uColor3: new THREE.Color('#fb7185'), // Soft Red
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying vec3 vPosition;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    float fBm(vec3 p) {
      float sum = 0.0;
      float amp = 1.0;
      for(int i = 0; i < 4; i++) {
        sum += snoise(p) * amp;
        p *= 2.0;
        amp *= 0.5;
      }
      return sum;
    }

    void main() {
      float noise = fBm(vPosition * 1.5 + uTime * 0.3);
      float brightness = noise * 0.5 + 0.5;
      
      // Fresnel effect - brighter on edges
      float fresnel = 1.0 - dot(normalize(vPosition), vec3(0.0, 0.0, 1.0));
      fresnel = pow(fresnel, 3.0);
      
      vec3 finalColor = mix(uColor3, uColor2, brightness);
      finalColor = mix(finalColor, uColor1, pow(brightness, 1.5));
      finalColor += fresnel * uColor1 * 0.5; // Edge glow
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ SunShaderMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    sunShaderMaterial: ThreeElement<typeof SunShaderMaterial>;
  }
}

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
  const shaderRef = useRef<any>(null!);
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_sunTexture, moonTexture] = useLoader(THREE.TextureLoader, [
    '/assets/sun.png',
    '/assets/moon.png'
  ]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * (isDark ? 0.2 : 0.4);
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }
    if (shaderRef.current) {
      shaderRef.current.uTime = t;
    }
  });

  return (
    <group>
      {!isDark && <SunCorona />}
      
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
        {isDark ? (
          <meshStandardMaterial
            map={moonTexture}
            bumpMap={moonTexture}
            bumpScale={0.05}
            roughness={0.8}
            metalness={0.2}
            emissive="#475569"
            emissiveIntensity={0.4}
          />
        ) : (
          <sunShaderMaterial ref={shaderRef} transparent />
        )}
      </Sphere>
      
      <OrbitingObject radius={4.5} speed={isDark ? 0.4 : 0.6}>
        {isDark ? <Satellite /> : <SolarProbe />}
      </OrbitingObject>
    </group>
  );
};

const Astronaut: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  
  // NOTE: GLB file might not exist yet, using a detailed placeholder structure
  // that follows the user's requested logic for bone movement and physics.
  // Fallback to placeholder until astronaut.glb is provided in public/assets/
  // const { scene, animations } = useGLTF('/assets/astronaut.glb', true) || { scene: null, animations: [] };
  const scene: THREE.Group | null = null;
  const animations = [] as any[];
  const { actions } = useAnimations(animations, scene || new THREE.Group());

  useEffect(() => {
    if (actions && actions['Floating']) {
      actions['Floating']?.play();
    }
  }, [actions]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // 1. Realistic Floating Physics (Lissajous path + drifting)
    // Create a slow, unpredictable drifting pattern
    const driftX = Math.sin(t * 0.4) * 2.5;
    const driftY = Math.cos(t * 0.25) * 1.5;
    const driftZ = Math.sin(t * 0.15) * 1.0;
    
    if (groupRef.current) {
      groupRef.current.position.set(driftX - 10, driftY + 2, driftZ - 12);
      
      // 2. Tumbling (Slow, multi-axis rotation)
      groupRef.current.rotation.x = t * 0.05;
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.z += 0.001;
    }

    // 3. Manual Limb Control (Bone Movement) - Only needed for GLB model
    /*
    if (scene) {
      const rightArm = scene.getObjectByName('RightArm');
      const leftLeg = scene.getObjectByName('LeftLeg');
      if (rightArm) {
        rightArm.rotation.z = Math.sin(t * 1.2) * 0.25;
      }
      if (leftLeg) {
        leftLeg.rotation.x = Math.cos(t * 0.8) * 0.15;
      }
    }
    */
  });

  if (!scene) {
    // Elegant Placeholder Astronaut (Suit-like shapes)
    return (
      <group ref={groupRef} scale={1.2}>
        {/* Head */}
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.1} />
        </mesh>
        {/* Visor */}
        <mesh position={[0, 0.48, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#1e293b" metalness={1} roughness={0} emissive="#0ea5e9" emissiveIntensity={0.5} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.22, 0.5, 4, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Backpack */}
        <mesh position={[0, 0.05, -0.2]}>
          <boxGeometry args={[0.3, 0.4, 0.15]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.2} />
        </mesh>
        {/* Limbs (Static placeholders for when GLB is missing) */}
        {[[-0.3, 0.2, 0], [0.3, 0.2, 0]].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]} rotation={[0, 0, i === 0 ? 0.4 : -0.4]}>
            <capsuleGeometry args={[0.07, 0.4, 4, 8]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        ))}
        {/* Glow / Jetpack particles area */}
        <pointLight position={[0, -0.3, -0.3]} intensity={0.5} color="#0ea5e9" />
      </group>
    );
  }

  return <primitive ref={groupRef} object={scene} scale={0.5} />;
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
            <Astronaut />
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
