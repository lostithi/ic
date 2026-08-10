"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import InkPass from "@/components/spine/InkPass";
import { AnatomyColumn } from "@/components/spine/SpineModels";

type ProgressRef = React.MutableRefObject<number>;
type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

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

/**
 * Head-first descent:
 * 0.00–0.28  face the skull / orbit
 * 0.28–1.00  travel down cervical → thoracic → lumbar → end
 */
function JourneyScene({
  progress,
  pointer,
}: {
  progress: ProgressRef;
  pointer: PointerRef;
}) {
  const column = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    const p = progress.current;
    const headPhase = smoothstep(0, 0.28, p);
    const spineLocal = smoothstep(0.22, 1, p);

    if (column.current) {
      // Early: rotate through the face. Later: slow turn as we drop.
      column.current.rotation.y =
        headPhase * Math.PI * 0.85 +
        spineLocal * Math.PI * 0.55 +
        pointer.current.x * 0.22;
      column.current.rotation.x =
        -0.12 + headPhase * 0.18 + spineLocal * 0.08 - pointer.current.y * 0.05;
    }

    // Camera look target rides down the column
    const lookY = THREE.MathUtils.lerp(2.85, -4.35, spineLocal);
    const lookX = Math.sin(spineLocal * Math.PI) * 0.15;

    if (p < 0.3) {
      // Orbit the skull face
      const a = headPhase * Math.PI * 0.95;
      const radius = THREE.MathUtils.lerp(3.4, 2.9, headPhase);
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        Math.sin(a) * radius + pointer.current.x * 0.2,
        0.08,
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        2.7 + Math.cos(a * 0.4) * 0.15,
        0.08,
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        Math.cos(a) * radius * 0.85 + 1.6,
        0.08,
      );
      camera.lookAt(lookX, 2.75, 0.1);
    } else {
      // Descend the spine to the terminal
      const drop = spineLocal;
      const sway = Math.sin(drop * Math.PI * 1.2) * 0.55;
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        sway + pointer.current.x * 0.18,
        0.08,
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        THREE.MathUtils.lerp(2.4, -4.1, drop),
        0.08,
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        THREE.MathUtils.lerp(4.2, 3.6, drop),
        0.08,
      );
      camera.lookAt(lookX, lookY, 0);
    }
  });

  return (
    <group ref={column}>
      <AnatomyColumn />
    </group>
  );
}

export default function SpineJourneyCanvas({
  progress,
}: {
  progress: ProgressRef;
}) {
  const pointer = usePointer();

  return (
    <Canvas
      camera={{ position: [0, 2.7, 4.8], fov: 36, near: 0.1, far: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 8, 22]} />
      <ambientLight intensity={0.5} color="#ddd8ce" />
      <directionalLight
        position={[3.2, 4.5, 3.5]}
        intensity={1.05}
        color="#fff6ea"
      />
      <directionalLight
        position={[-3.5, 1, -2]}
        intensity={0.45}
        color="#6a6864"
      />
      <spotLight
        position={[1.2, 3.8, 4]}
        angle={0.45}
        penumbra={0.9}
        intensity={0.7}
        color="#f2ebe0"
      />
      <Suspense fallback={null}>
        <JourneyScene progress={progress} pointer={pointer} />
        <InkPass />
      </Suspense>
    </Canvas>
  );
}
