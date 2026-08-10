"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import InkPass from "@/components/spine/InkPass";
import { NailedSkull } from "@/components/spine/SpineModels";

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pointer;
}

/** Full turn about every 18s — page is short, so spin is time-driven, not scroll */
const SPIN_RAD_PER_SEC = (Math.PI * 2) / 18;

function WorkSpecimen({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    group.current.rotation.y += SPIN_RAD_PER_SEC * delta;
    // Keep a specimen tilt; pointer only nudges, never owns the spin
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      0.18 - pointer.current.y * 0.1 + Math.sin(t * 0.4) * 0.04,
      0.05,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      pointer.current.x * 0.06,
      0.05,
    );
    group.current.position.y = Math.sin(t * 0.35) * 0.04;
  });

  return (
    <group ref={group} position={[0.35, -0.15, 0]} scale={1.15}>
      <NailedSkull />
    </group>
  );
}

export default function WorkCanvas() {
  const pointer = usePointer();

  return (
    <Canvas
      camera={{ position: [0.2, 0.15, 3.6], fov: 34, near: 0.1, far: 40 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Paper field — xerox opposite of the homepage void */}
      <color attach="background" args={["#f2f0ea"]} />
      <fog attach="fog" args={["#f2f0ea", 7, 16]} />

      {/* Harsh key from upper-right like the reference; thin fill */}
      <ambientLight intensity={0.22} color="#e8e4dc" />
      <directionalLight
        position={[4.5, 5.5, 2.5]}
        intensity={1.55}
        color="#ffffff"
      />
      <directionalLight
        position={[-3.5, -0.5, -2]}
        intensity={0.18}
        color="#6a6864"
      />
      <spotLight
        position={[2.5, 3.2, 3]}
        angle={0.4}
        penumbra={0.7}
        intensity={0.85}
        color="#fffaf0"
      />

      <Suspense fallback={null}>
        <WorkSpecimen pointer={pointer} />
        <InkPass variant="xerox" />
      </Suspense>
    </Canvas>
  );
}
