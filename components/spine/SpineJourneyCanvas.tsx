"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type ProgressRef = React.MutableRefObject<number>;
type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

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

function SpineColumn({
  progress,
  pointer,
}: {
  progress: ProgressRef;
  pointer: PointerRef;
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

  const vertebrae = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => {
        const t = index / 13;
        return {
          y: 5.4 - t * 10.8,
          scale: 1.15 - t * 0.35,
          rot: (index % 2 === 0 ? 1 : -1) * 0.08,
        };
      }),
    [],
  );

  useFrame(({ camera }) => {
    const p = progress.current;
    const ease = p * p * (3 - 2 * p);

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      Math.sin(ease * Math.PI * 2) * 0.55 + pointer.current.x * 0.2,
      0.08,
    );
    camera.position.y = THREE.MathUtils.lerp(4.6, -4.4, ease);
    camera.position.z = THREE.MathUtils.lerp(5.8, 4.1, ease);
    camera.lookAt(0, camera.position.y * 0.82, 0);

    if (!group.current) return;
    group.current.rotation.y = ease * Math.PI * 1.35 + pointer.current.x * 0.25;
    group.current.rotation.x =
      -0.08 + ease * 0.18 - pointer.current.y * 0.06;
    group.current.position.y = THREE.MathUtils.lerp(0.2, -0.2, ease);
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, -3.2]} scale={[14, 16, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={path} transparent opacity={0.18} depthWrite={false} />
      </mesh>

      {vertebrae.map((bone, index) => (
        <mesh
          key={`bone-${index}`}
          position={[0, bone.y, 0]}
          scale={[bone.scale * 2.1, bone.scale * 1.35, 1]}
          rotation={[0, bone.rot, 0]}
        >
          <planeGeometry />
          <meshBasicMaterial
            map={index % 3 === 0 ? sigil : anatomy}
            transparent
            opacity={index % 3 === 0 ? 0.55 : 0.9}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      ))}

      <mesh position={[0, 0, -0.2]} scale={[0.08, 12.5, 1]}>
        <planeGeometry />
        <meshBasicMaterial color="#f4f4f1" transparent opacity={0.22} />
      </mesh>
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
      camera={{ position: [0, 4.6, 5.8], fov: 40, near: 0.1, far: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 5, 14]} />
      <ambientLight intensity={0.9} />
      <Suspense fallback={null}>
        <SpineColumn progress={progress} pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
