"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type ProgressRef = React.MutableRefObject<number>;
type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

const PHASE_SPLIT = 0.42; // roughly through T1 / manifesto

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
  const upperMats = useRef<THREE.MeshBasicMaterial[]>([]);
  const skullMats = useRef<THREE.MeshBasicMaterial[]>([]);

  const [anatomy, sigil, path, skull] = useTexture([
    "/spine/anatomy.png",
    "/spine/sigil.png",
    "/spine/path.png",
    "/spine/skull.png",
  ]);

  useEffect(() => {
    [anatomy, sigil, path, skull].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
    });
  }, [anatomy, sigil, path, skull]);

  const vertebrae = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => {
        const t = index / 7;
        return {
          y: 3.4 - t * 5.2,
          scale: 1.2 - t * 0.25,
          rot: (index % 2 === 0 ? 1 : -1) * 0.07,
        };
      }),
    [],
  );

  useFrame(({ camera }) => {
    const p = progress.current;
    const upper = 1 - smoothstep(PHASE_SPLIT - 0.04, PHASE_SPLIT + 0.1, p);
    const lower = smoothstep(PHASE_SPLIT - 0.04, PHASE_SPLIT + 0.12, p);
    const lowerLocal = smoothstep(PHASE_SPLIT, 1, p);

    upperMats.current.forEach((mat) => {
      if (!mat) return;
      mat.opacity = mat.userData.baseOpacity * upper;
      mat.visible = upper > 0.02;
    });
    skullMats.current.forEach((mat) => {
      if (!mat) return;
      mat.opacity = mat.userData.baseOpacity * lower;
      mat.visible = lower > 0.02;
    });

    if (upperGroup.current) {
      upperGroup.current.visible = upper > 0.02;
      upperGroup.current.rotation.y =
        p * Math.PI * 0.85 + pointer.current.x * 0.2;
      upperGroup.current.rotation.x =
        -0.06 + p * 0.1 - pointer.current.y * 0.04;
    }

    if (skullGroup.current) {
      skullGroup.current.visible = lower > 0.02;
      // Keep rotating through the face as we descend to mid-ribs
      skullGroup.current.rotation.y =
        lowerLocal * Math.PI * 1.15 + pointer.current.x * 0.22;
      skullGroup.current.rotation.x =
        -0.12 + lowerLocal * 0.2 - pointer.current.y * 0.05;
      // Image is framed so top = skull, midpoint ≈ mid-ribs
      skullGroup.current.position.y = THREE.MathUtils.lerp(1.15, -0.35, lowerLocal);
    }

    if (lower < 0.5) {
      // Phase 1: descend upper spine until T1
      const u = smoothstep(0, PHASE_SPLIT, p);
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        Math.sin(u * Math.PI) * 0.35 + pointer.current.x * 0.15,
        0.08,
      );
      camera.position.y = THREE.MathUtils.lerp(3.8, 0.55, u);
      camera.position.z = THREE.MathUtils.lerp(5.4, 4.5, u);
      camera.lookAt(0, camera.position.y * 0.75, 0);
    } else {
      // Phase 2: through the face, rotating, end at half (mid-ribs)
      const l = lowerLocal;
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        Math.sin(l * Math.PI * 1.4) * 0.9 + pointer.current.x * 0.2,
        0.08,
      );
      camera.position.y = THREE.MathUtils.lerp(1.35, -0.15, l);
      camera.position.z = THREE.MathUtils.lerp(4.8, 3.6, l);
      camera.lookAt(
        Math.sin(l * Math.PI) * 0.25,
        THREE.MathUtils.lerp(1.0, -0.25, l),
        0,
      );
    }
  });

  return (
    <>
      <group ref={upperGroup}>
        <mesh position={[0, 1.2, -3]}>
          <planeGeometry args={[12, 10]} />
          <meshBasicMaterial
            ref={(mat) => {
              if (mat) {
                mat.userData.baseOpacity = 0.16;
                upperMats.current[0] = mat;
              }
            }}
            map={path}
            transparent
            depthWrite={false}
            opacity={0.16}
          />
        </mesh>

        {vertebrae.map((bone, index) => (
          <mesh
            key={`bone-${index}`}
            position={[0, bone.y, 0]}
            scale={[bone.scale * 2.05, bone.scale * 1.3, 1]}
            rotation={[0, bone.rot, 0]}
          >
            <planeGeometry />
            <meshBasicMaterial
              ref={(mat) => {
                if (mat) {
                  mat.userData.baseOpacity = index % 3 === 0 ? 0.5 : 0.92;
                  upperMats.current[index + 1] = mat;
                }
              }}
              map={index % 3 === 0 ? sigil : anatomy}
              transparent
              toneMapped={false}
              depthWrite={false}
              opacity={index % 3 === 0 ? 0.5 : 0.92}
            />
          </mesh>
        ))}
      </group>

      <group ref={skullGroup}>
        {/* Main skull-to-ribs plate: framed so end state shows ~half the figure */}
        <mesh position={[0, 0, 0]} scale={[3.4, 4.6, 1]}>
          <planeGeometry />
          <meshBasicMaterial
            ref={(mat) => {
              if (mat) {
                mat.userData.baseOpacity = 0.98;
                skullMats.current[0] = mat;
              }
            }}
            map={skull}
            transparent
            toneMapped={false}
            depthWrite={false}
            opacity={0}
          />
        </mesh>
        <mesh position={[-1.35, 0.2, -0.35]} scale={[1.7, 2.4, 1]} rotation={[0, 0.4, 0]}>
          <planeGeometry />
          <meshBasicMaterial
            ref={(mat) => {
              if (mat) {
                mat.userData.baseOpacity = 0.35;
                skullMats.current[1] = mat;
              }
            }}
            map={skull}
            transparent
            toneMapped={false}
            depthWrite={false}
            opacity={0}
          />
        </mesh>
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
      camera={{ position: [0, 3.8, 5.4], fov: 40, near: 0.1, far: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 6, 16]} />
      <ambientLight intensity={0.95} />
      <Suspense fallback={null}>
        <JourneyScene progress={progress} pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
