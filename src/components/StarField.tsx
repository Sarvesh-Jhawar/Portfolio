import React, { useRef, useMemo, useState } from 'react';
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

const ScoutRocket: React.FC<{ startPos: [number, number, number]; targetPos: [number, number, number]; speed: number; delay: number; baseScale: number; isDark: boolean }> = ({ startPos, targetPos, speed, delay, baseScale, isDark }) => {
  const ref = useRef<THREE.Group>(null!);
  const flameRef = useRef<THREE.Mesh>(null!);
  
  const direction = useMemo(() => {
    const start = new THREE.Vector3(...startPos);
    const end = new THREE.Vector3(...targetPos);
    return end.clone().sub(start).normalize();
  }, [startPos, targetPos]);

  const rotation = useMemo(() => {
    const quaternion = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    quaternion.setFromUnitVectors(up, direction);
    return new THREE.Euler().setFromQuaternion(quaternion);
  }, [direction]);

  useFrame((state, delta) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      if (t < delay) {
        ref.current.visible = false;
        return;
      }
      ref.current.visible = true;
      ref.current.position.addScaledVector(direction, speed * delta);
      
      // Flicker flame
      if (flameRef.current) {
        const s = 1 + Math.sin(t * 25) * 0.15;
        flameRef.current.scale.set(s, s, s);
      }

      // Reset if too far
      if (ref.current.position.length() > 60) {
        ref.current.position.set(...startPos);
      }
    }
  });

  return (
    <group ref={ref} position={startPos} rotation={rotation} scale={baseScale}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.6, 3, 16]} />
        <meshStandardMaterial 
          color={isDark ? "#ffffff" : "#e2e8f0"} 
          emissive={isDark ? "#ffffff" : "#000000"} 
          emissiveIntensity={isDark ? 0.3 : 0} 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[0.5, 1, 16]} />
        <meshStandardMaterial 
          color={isDark ? "#ffffff" : "#ef4444"} 
          emissive={isDark ? "#ffffff" : "#000000"} 
          emissiveIntensity={isDark ? 0.3 : 0} 
        />
      </mesh>
      <mesh ref={flameRef} position={[0, -1.8, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.4, 2, 16]} />
        <meshStandardMaterial color="#ff4d00" emissive="#ffaa00" emissiveIntensity={3} transparent opacity={0.9} />
      </mesh>
    </group>
  );
};

const RandomRockets: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const rockets = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 8; i++) {
      const zStart = -30 - Math.random() * 20;
      const start: [number, number, number] = [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        zStart
      ];
      const target: [number, number, number] = [
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        40
      ];
      const baseScale = 0.05 + Math.random() * 0.1;
      
      temp.push({ 
        start, 
        target, 
        speed: 5 + Math.random() * 8, 
        delay: Math.random() * 5,
        baseScale
      });
    }
    return temp;
  }, []);

  return (
    <group>
      {rockets.map((r, i) => (
        <ScoutRocket 
          key={i} 
          startPos={r.start} 
          targetPos={r.target} 
          speed={r.speed} 
          delay={r.delay}
          baseScale={r.baseScale}
          isDark={isDark}
        />
      ))}
    </group>
  );
};

const CinematicHeroRocket: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const ref = useRef<THREE.Group>(null!);
  const flameRef = useRef<THREE.Mesh>(null!);
  
  const [activePath, setActivePath] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const paths = useMemo(() => [
    { 
      start: new THREE.Vector3(-40, -20, -10), 
      end: new THREE.Vector3(40, 20, -20),
      speed: 20
    },
    { 
      start: new THREE.Vector3(20, -40, 5), 
      end: new THREE.Vector3(-20, 40, -5),
      speed: 25
    },
    { 
      start: new THREE.Vector3(-30, 0, -50), 
      end: new THREE.Vector3(30, 0, 30),
      speed: 30
    }
  ], []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const cycle = 7; // Every 7 seconds as requested
    const progress = (t % cycle) / 3.5; // 3.5 seconds flight
    
    if (progress >= 0 && progress <= 1) {
      if (!isVisible) {
        setIsVisible(true);
        setActivePath(Math.floor(Math.random() * paths.length));
        ref.current.position.copy(paths[activePath].start);
      }
      
      const path = paths[activePath];
      const dir = path.end.clone().sub(path.start).normalize();
      ref.current.position.addScaledVector(dir, path.speed * delta);
      
      const lookAtPos = ref.current.position.clone().add(dir);
      ref.current.lookAt(lookAtPos);
      ref.current.rotateX(Math.PI / 2);

      if (flameRef.current) {
        const s = 1.5 + Math.sin(t * 30) * 0.3;
        flameRef.current.scale.set(s, s, s);
        const mat = flameRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 4 + Math.sin(t * 40) * 2;
      }
    } else {
      if (isVisible) setIsVisible(false);
    }
  });

  return (
    <group ref={ref} visible={isVisible} scale={0.4}>
      <mesh>
        <cylinderGeometry args={[0.6, 0.7, 4, 32]} />
        <meshStandardMaterial 
          color={isDark ? "#ffffff" : "#f8fafc"} 
          emissive={isDark ? "#ffffff" : "#000000"} 
          emissiveIntensity={isDark ? 0.3 : 0} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      <mesh position={[0, 2.8, 0]}>
        <coneGeometry args={[0.6, 1.5, 32]} />
        <meshStandardMaterial 
          color={isDark ? "#ffffff" : "#ef4444"} 
          emissive={isDark ? "#ffffff" : "#000000"} 
          emissiveIntensity={isDark ? 0.3 : 0} 
          metalness={0.8} 
        />
      </mesh>
      <mesh position={[0, 1.5, 0.5]}>
        <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
      </mesh>
      {/* Side Boosters / Fins with Engines */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <group key={i} rotation={[0, angle, 0]}>
          <mesh position={[0, -1.2, 0.8]}>
            <boxGeometry args={[0.1, 1.5, 1.5]} />
            <meshStandardMaterial color={isDark ? "#ffffff" : "#ef4444"} roughness={0.3} />
          </mesh>
          {/* Engine Nozzles */}
          <mesh position={[0, -2.1, 0.7]}>
            <cylinderGeometry args={[0.2, 0.25, 0.5, 16]} />
            <meshStandardMaterial color="#475569" metalness={1} />
          </mesh>
          {/* Secondary Flames */}
          <mesh position={[0, -2.6, 0.7]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.15, 1, 16]} />
            <meshStandardMaterial color="#ff4d00" emissive="#ffaa00" emissiveIntensity={2} transparent opacity={0.8} />
          </mesh>
        </group>
      ))}

      {/* Main Booster Engine */}
      <mesh position={[0, -2.1, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.6, 32]} />
        <meshStandardMaterial color="#334155" metalness={1} />
      </mesh>

      <mesh ref={flameRef} position={[0, -2.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.6, 3.5, 32]} />
        <meshStandardMaterial color="#ff3300" emissive="#ffcc00" emissiveIntensity={6} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, -2.5, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={1.5} transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

const UFO: React.FC<{ startPos: [number, number, number]; isDark: boolean }> = ({ startPos, isDark }) => {
  const ref = useRef<THREE.Group>(null!);
  const lightsRef = useRef<THREE.Group>(null!);
  const [isVisible, setIsVisible] = useState(false);
  
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const cycle = 15; // Every 15 seconds
    const progress = (t % cycle) / 10; // Visible for 10 seconds (increased from 4)
    
    if (progress >= 0 && progress <= 1) {
      if (!isVisible) {
        setIsVisible(true);
        ref.current.position.set(...startPos);
      }
      
      // Zigzag / Wobble Movement - slightly faster and more pronounced
      ref.current.position.x += Math.sin(t * 3) * 0.08;
      ref.current.position.y += Math.cos(t * 1.5) * 0.04;
      ref.current.position.z += 0.08; // Slower drift forward for more "hover" time
      
      // Wobble rotation
      ref.current.rotation.z = Math.sin(t * 5) * 0.2;
      ref.current.rotation.x = Math.cos(t * 2.5) * 0.15;
      
      // Rotate lights faster
      if (lightsRef.current) {
        lightsRef.current.rotation.y += delta * 6;
      }
    } else {
      if (isVisible) setIsVisible(false);
    }
  });

  return (
    <group ref={ref} visible={isVisible} scale={0.3}>
      {/* Saucer Body */}
      <mesh scale={[1.8, 0.4, 1.8]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={isDark ? "#94a3b8" : "#cbd5e1"} 
          metalness={1} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* Dome */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#0ea5e9" 
          transparent 
          opacity={0.6} 
          emissive="#38bdf8" 
          emissiveIntensity={0.5} 
        />
      </mesh>

      {/* Perimeter Lights */}
      <group ref={lightsRef}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI) / 4) * 1.6, 0, Math.sin((i * Math.PI) / 4) * 1.6]}>
            <sphereGeometry args={[0.12]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#10b981" : "#f43f5e"} 
              emissive={i % 2 === 0 ? "#10b981" : "#f43f5e"} 
              emissiveIntensity={2} 
            />
          </mesh>
        ))}
      </group>
      
      {/* Bottom Glow */}
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

const RandomUFOs: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <group>
      {/* Background UFOs */}
      <UFO startPos={[-25, 15, -40]} isDark={isDark} />
      <UFO startPos={[20, -20, -35]} isDark={isDark} />
      
      {/* Near-UI UFOs (Closer to camera) */}
      <UFO startPos={[-12, -8, -15]} isDark={isDark} />
      <UFO startPos={[10, 12, -12]} isDark={isDark} />
      <UFO startPos={[0, -18, -10]} isDark={isDark} />
    </group>
  );
};

const AsteroidField: React.FC<{ count: number; isDark: boolean }> = ({ count, isDark }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 80 - 40;
      const speed = 0.05 + Math.random() * 0.1;
      const rotSpeed = (Math.random() - 0.5) * 0.02;
      const scale = 0.15 + Math.random() * 0.6;
      temp.push({ x, y, z, speed, rotSpeed, scale });
    }
    return temp;
  }, [count]);

  const asteroidGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 1); // Level 1 detail for rocky look
    const position = geo.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      
      // Add random displacement to each vertex to make it irregular
      const offset = 0.2;
      position.setX(i, x + (Math.random() - 0.5) * offset);
      position.setY(i, y + (Math.random() - 0.5) * offset);
      position.setZ(i, z + (Math.random() - 0.5) * offset);
    }
    position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      const t = state.clock.getElapsedTime();
      dummy.position.set(
        p.x + Math.sin(t * p.speed * 0.5) * 3,
        p.y + Math.cos(t * p.speed * 0.5) * 3,
        p.z
      );
      dummy.rotation.set(t * p.rotSpeed, t * p.rotSpeed * 1.5, t * p.rotSpeed * 0.5);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[asteroidGeometry, undefined, count]}>
      <meshStandardMaterial 
        color={isDark ? '#57534e' : '#78716c'} 
        roughness={1} 
        metalness={0}
        transparent
        opacity={isDark ? 0.7 : 0.4}
      />
    </instancedMesh>
  );
};

const StarField: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 -z-10" style={{ pointerEvents: 'none' }}>
      {/* Light mode gradient background */}
      {!isDark && <div className="absolute inset-0 light-gradient-bg transition-all duration-700" />}
      
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: isDark ? '#00000a' : 'transparent' 
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={isDark ? 0.3 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 2} />
        
        {/* Background Stars */}
        <Stars 
          color={isDark ? '#a78bfa' : '#1e1b4b'} 
          count={isDark ? 3000 : 1500} 
          size={isDark ? 0.15 : 0.1} 
          opacity={isDark ? 0.8 : 0.4} 
        />
        
        {/* Persistent Rockets */}
        <RandomRockets isDark={isDark} />
        <CinematicHeroRocket isDark={isDark} />
        
        {/* UFOs */}
        <RandomUFOs isDark={isDark} />
        
        {/* Antigravity Asteroid Field */}
        <AsteroidField count={isDark ? 120 : 60} isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default StarField;
