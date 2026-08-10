"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

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

function SpinePlanes({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const [anatomy, sigil, path] = useTexture([
    "/spine/anatomy.png",
    "/spine/sigil.png",
    "/spine/path.png",
  ]);

  useEffect(() => {
    [anatomy, sigil, path].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
    });
  }, [anatomy, sigil, path]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.current.x * 0.28,
      0.045,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.current.y * 0.14,
      0.045,
    );
    group.current.position.y = Math.sin(t * 0.35) * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.25}>
        <mesh position={[0, 0.1, -1.5]} scale={[8.4, 5.4, 1]}>
          <planeGeometry />
          <meshBasicMaterial map={path} transparent opacity={0.22} depthWrite={false} />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh position={[0, 0.05, 0]} scale={[2.7, 4.5, 1]}>
          <planeGeometry />
          <meshBasicMaterial map={anatomy} transparent toneMapped={false} />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.55}>
        <mesh
          position={[1.55, 0.15, 0.55]}
          scale={[1.35, 2.8, 1]}
          rotation={[0, -0.25, 0.04]}
        >
          <planeGeometry />
          <meshBasicMaterial map={sigil} transparent opacity={0.78} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

export default function SpineCanvas() {
  const pointer = usePointerTarget();

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 4.5, 9]} />
      <ambientLight intensity={0.85} />
      <Suspense fallback={null}>
        <SpinePlanes pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
