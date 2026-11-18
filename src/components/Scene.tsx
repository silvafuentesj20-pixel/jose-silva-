'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Component, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Group } from 'three';

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

function Sculpture() {
  const group = useRef<Group>(null);
  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    const easing = 1 - Math.exp(-4 * delta);
    group.current.rotation.x += (pointer.y * .22 - group.current.rotation.x) * easing;
    group.current.rotation.y += (pointer.x * .28 - group.current.rotation.y) * easing;
  });

  return <group ref={group}>
    <Float speed={1.1} rotationIntensity={.14} floatIntensity={.32}>
      <mesh rotation={[.52, -.35, .25]}>
        <torusKnotGeometry args={[.89, .23, 112, 14, 2, 3]} />
        <meshStandardMaterial color="#a78bfa" roughness={.25} metalness={.16} />
      </mesh>
      <mesh position={[1.33, .86, .2]}><sphereGeometry args={[.23, 24, 16]} /><meshStandardMaterial color="#35c9c3" roughness={.24} /></mesh>
      <mesh position={[-1.43, -.74, .35]}><sphereGeometry args={[.15, 20, 12]} /><meshStandardMaterial color="#83e5df" /></mesh>
    </Float>
  </group>;
}

export default function Scene() {
  return <SceneBoundary><div className="canvas-layer">
    <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 5.3], fov: 45 }} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}>
      <ambientLight intensity={1.4} /><directionalLight position={[3, 4, 5]} intensity={3} /><pointLight position={[-4, -1, 2]} intensity={32} color="#35c9c3" />
      <Sculpture />
    </Canvas>
  </div></SceneBoundary>;
}
