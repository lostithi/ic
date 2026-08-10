"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import InkPass from "@/components/spine/InkPass";
import { SkullTorso } from "@/components/spine/SpineModels";

function usePointerTarget() {
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return target;
}

function FloatingSkull({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.current.x * 0.5 + t * 0.12,
      0.05,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -0.15 - pointer.current.y * 0.2,
      0.05,
    );
    group.current.position.y = Math.sin(t * 0.4) * 0.1;
  });

  return (
    <group ref={group} position={[0, -0.15, 0]} scale={1.1}>
      <SkullTorso />
    </group>
  );
}

export default function SpineCanvas() {
  const pointer = usePointerTarget();

  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.2], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 6, 14]} />
      <ambientLight intensity={0.5} color="#ddd8ce" />
      <directionalLight position={[3.5, 5, 4]} intensity={1.0} color="#fff6ea" />
      <directionalLight position={[-4, 0.5, -2]} intensity={0.4} color="#6a6864" />
      <Suspense fallback={null}>
        <FloatingSkull pointer={pointer} />
        <InkPass />
      </Suspense>
    </Canvas>
  );
}
