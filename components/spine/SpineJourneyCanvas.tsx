"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { SkullTorso, UpperSpine } from "@/components/spine/SpineModels";

type ProgressRef = React.MutableRefObject<number>;
type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

const PHASE_SPLIT = 0.42;

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

function JourneyScene({
  progress,
  pointer,
}: {
  progress: ProgressRef;
  pointer: PointerRef;
}) {
  const upperGroup = useRef<THREE.Group>(null);
  const skullGroup = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    const p = progress.current;
    const upperFade = 1 - smoothstep(PHASE_SPLIT - 0.03, PHASE_SPLIT + 0.1, p);
    const lowerFade = smoothstep(PHASE_SPLIT - 0.03, PHASE_SPLIT + 0.12, p);
    const lowerLocal = smoothstep(PHASE_SPLIT, 1, p);

    if (upperGroup.current) {
      upperGroup.current.visible = upperFade > 0.02;
      upperGroup.current.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;
        if ("opacity" in mat) {
          if (mat.userData.baseOpacity == null) {
            mat.userData.baseOpacity = mat.opacity ?? 1;
            mat.transparent = true;
          }
          mat.opacity = mat.userData.baseOpacity * upperFade;
        }
      });
      upperGroup.current.rotation.y =
        smoothstep(0, PHASE_SPLIT, p) * Math.PI * 0.9 +
        pointer.current.x * 0.2;
      upperGroup.current.rotation.x =
        -0.08 + p * 0.1 - pointer.current.y * 0.04;
    }

    if (skullGroup.current) {
      skullGroup.current.visible = lowerFade > 0.02;
      skullGroup.current.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;
        if ("opacity" in mat) {
          if (mat.userData.baseOpacity == null) {
            mat.userData.baseOpacity = mat.opacity ?? 1;
            mat.transparent = true;
          }
          mat.opacity = mat.userData.baseOpacity * lowerFade;
        }
      });

      // Rotate through the face; settle facing mid-ribs
      skullGroup.current.rotation.y =
        lowerLocal * Math.PI * 1.25 + pointer.current.x * 0.25;
      skullGroup.current.rotation.x =
        -0.18 + lowerLocal * 0.35 - pointer.current.y * 0.05;
      skullGroup.current.position.y = THREE.MathUtils.lerp(0.4, -0.85, lowerLocal);
    }

    if (lowerFade < 0.45) {
      const u = smoothstep(0, PHASE_SPLIT, p);
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        Math.sin(u * Math.PI) * 0.45 + pointer.current.x * 0.18,
        0.08,
      );
      camera.position.y = THREE.MathUtils.lerp(3.4, 0.7, u);
      camera.position.z = THREE.MathUtils.lerp(6.2, 5.0, u);
      camera.lookAt(0, camera.position.y * 0.7, 0);
    } else {
      const l = lowerLocal;
      // Orbit from face down toward mid-rib half
      const angle = l * Math.PI * 1.1;
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        Math.sin(angle) * 2.4 + pointer.current.x * 0.2,
        0.08,
      );
      camera.position.y = THREE.MathUtils.lerp(1.6, -0.35, l);
      camera.position.z = THREE.MathUtils.lerp(
        4.8,
        3.2 + Math.cos(angle) * 0.8,
        0.08,
      );
      camera.lookAt(
        Math.sin(angle * 0.5) * 0.2,
        THREE.MathUtils.lerp(1.2, -0.55, l),
        0,
      );
    }
  });

  return (
    <>
      <group ref={upperGroup}>
        <UpperSpine count={10} />
      </group>
      <group ref={skullGroup} visible={false}>
        <SkullTorso />
      </group>
    </>
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
      camera={{ position: [0, 3.4, 6.2], fov: 38, near: 0.1, far: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 18]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.35}
        color="#ffffff"
      />
      <directionalLight
        position={[-5, 1, -3]}
        intensity={0.45}
        color="#a8a8a8"
      />
      <spotLight
        position={[0, 4, 6]}
        angle={0.5}
        penumbra={0.6}
        intensity={1.1}
        color="#ffffff"
      />
      <Suspense fallback={null}>
        <JourneyScene progress={progress} pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
