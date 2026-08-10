"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

/** Pale bone — ink pass will threshold lighting into chalk/ink */
const bone = "#f2f0ea";
const boneDark = "#c9c5bc";
const boneShadow = "#8f8b84";

function BoneMaterial({
  color = bone,
  roughness = 0.92,
  metalness = 0,
}: {
  color?: string;
  roughness?: number;
  metalness?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      envMapIntensity={0.1}
    />
  );
}

export function Vertebra({
  position,
  scale = 1,
  twist = 0,
}: {
  position: [number, number, number];
  scale?: number;
  twist?: number;
}) {
  return (
    <group position={position} scale={scale} rotation={[0, twist, 0]}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.24, 0.5, 14]} />
        <BoneMaterial />
      </mesh>
      <mesh position={[0, 0.02, -0.36]} castShadow rotation={[0.15, 0, 0]}>
        <capsuleGeometry args={[0.05, 0.28, 4, 8]} />
        <BoneMaterial color={boneDark} />
      </mesh>
      <mesh
        position={[-0.4, 0.02, -0.05]}
        rotation={[0, 0, Math.PI / 2 + 0.12]}
        castShadow
      >
        <capsuleGeometry args={[0.04, 0.26, 4, 8]} />
        <BoneMaterial color={boneDark} />
      </mesh>
      <mesh
        position={[0.4, 0.02, -0.05]}
        rotation={[0, 0, Math.PI / 2 - 0.12]}
        castShadow
      >
        <capsuleGeometry args={[0.04, 0.26, 4, 8]} />
        <BoneMaterial color={boneDark} />
      </mesh>
      <mesh position={[0, 0.02, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.04, 10, 24]} />
        <BoneMaterial color={boneShadow} roughness={0.96} />
      </mesh>
    </group>
  );
}

function RealSkull({
  position = [0, 0, 0] as [number, number, number],
  targetHeight = 1.65,
}: {
  position?: [number, number, number];
  targetHeight?: number;
}) {
  const { scene } = useGLTF("/models/skull.glb");

  const skull = useMemo(() => {
    const root = scene.clone(true);

    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const name = mesh.name.toLowerCase();
      const shade =
        name.includes("teeth") || name.includes("tooth") ? "#ffffff" : bone;

      mesh.material = new THREE.MeshStandardMaterial({
        color: shade,
        roughness: 0.9,
        metalness: 0,
        envMapIntensity: 0.08,
      });
    });

    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    root.scale.setScalar(targetHeight / maxDim);

    root.updateMatrixWorld(true);
    const fitted = new THREE.Box3().setFromObject(root);
    const center = fitted.getCenter(new THREE.Vector3());
    root.position.sub(center);

    return root;
  }, [scene, targetHeight]);

  return (
    <group position={position}>
      <primitive object={skull} rotation={[0.06, Math.PI, 0]} />
    </group>
  );
}

useGLTF.preload("/models/skull.glb");

function RibPair({
  y,
  radius,
  open = 0.9,
}: {
  y: number;
  radius: number;
  open?: number;
}) {
  return (
    <group position={[0, y, 0.06]}>
      <mesh rotation={[0.12, 0, Math.PI / 2]}>
        <torusGeometry args={[radius, 0.034, 10, 40, Math.PI * open]} />
        <BoneMaterial color={boneDark} roughness={0.94} />
      </mesh>
      <mesh rotation={[0.12, Math.PI, Math.PI / 2]}>
        <torusGeometry args={[radius, 0.034, 10, 40, Math.PI * open]} />
        <BoneMaterial color={boneDark} roughness={0.94} />
      </mesh>
    </group>
  );
}

/**
 * Continuous column: skull at the top → cervical → thoracic/ribs → lumbar → end.
 * Camera descends this single structure on scroll.
 */
export function AnatomyColumn() {
  const cervical = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        y: 1.85 - i * 0.26,
        scale: 0.78 - i * 0.03,
        twist: i * 0.035,
      })),
    [],
  );

  const thoracic = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        y: 0.45 - i * 0.3,
        scale: 0.92 + Math.sin(i * 0.35) * 0.04,
        twist: Math.sin(i * 0.55) * 0.07,
        rib: i < 8,
        radius: 0.95 + i * 0.055,
        open: 0.88 + i * 0.015,
      })),
    [],
  );

  const lumbar = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        y: -2.65 - i * 0.32,
        scale: 1.05 - i * 0.04,
        twist: (i % 2 === 0 ? 1 : -1) * 0.05,
      })),
    [],
  );

  return (
    <group>
      {/* HEAD */}
      <RealSkull position={[0, 2.85, 0.1]} targetHeight={1.7} />

      {/* cord through whole column */}
      <mesh position={[0, -0.6, -0.05]}>
        <cylinderGeometry args={[0.045, 0.04, 7.4, 12]} />
        <BoneMaterial color={boneShadow} roughness={0.96} />
      </mesh>

      {cervical.map((b, i) => (
        <Vertebra
          key={`c-${i}`}
          position={[0, b.y, -0.04]}
          scale={b.scale}
          twist={b.twist}
        />
      ))}

      {thoracic.map((b, i) => (
        <group key={`t-${i}`}>
          <Vertebra
            position={[0, b.y, -0.04]}
            scale={b.scale}
            twist={b.twist}
          />
          {b.rib ? (
            <RibPair y={b.y} radius={b.radius} open={b.open} />
          ) : null}
        </group>
      ))}

      {lumbar.map((b, i) => (
        <Vertebra
          key={`l-${i}`}
          position={[0, b.y, -0.04]}
          scale={b.scale}
          twist={b.twist}
        />
      ))}

      {/* terminal / sacrum hint */}
      <mesh position={[0, -4.55, 0]} castShadow>
        <capsuleGeometry args={[0.28, 0.35, 6, 12]} />
        <BoneMaterial color={boneDark} />
      </mesh>
    </group>
  );
}

/** Compact skull + upper ribs for /start floating scene */
export function SkullTorso() {
  return (
    <group>
      <RealSkull position={[0, 1.1, 0.08]} targetHeight={1.55} />
      {Array.from({ length: 4 }).map((_, i) => (
        <Vertebra
          key={`c-${i}`}
          position={[0, 0.2 - i * 0.28, -0.05]}
          scale={0.78 - i * 0.04}
          twist={i * 0.04}
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <group key={`r-${i}`}>
          <Vertebra
            position={[0, -1.05 - i * 0.3, -0.04]}
            scale={0.88 + i * 0.02}
            twist={(i % 2 === 0 ? 1 : -1) * 0.04}
          />
          <RibPair y={-1.05 - i * 0.3} radius={1.0 + i * 0.05} open={0.88} />
        </group>
      ))}
    </group>
  );
}

function Nail({
  position,
  rotation,
  length = 0.85,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  length?: number;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* shaft */}
      <mesh castShadow position={[0, -length * 0.35, 0]}>
        <cylinderGeometry args={[0.018, 0.012, length, 8]} />
        <meshStandardMaterial color="#2a2a28" roughness={0.55} metalness={0.35} />
      </mesh>
      {/* flat head */}
      <mesh castShadow position={[0, length * 0.15, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.03, 8]} />
        <meshStandardMaterial color="#1a1a18" roughness={0.45} metalness={0.4} />
      </mesh>
    </group>
  );
}

/**
 * Works portrait — singular skull with pins driven through, matching the xerox reference.
 * No full spine column; this is a fixed specimen, not a descent.
 */
export function NailedSkull() {
  const nails = useMemo(
    () =>
      [
        {
          position: [-0.35, 0.55, 0.15] as [number, number, number],
          rotation: [0.35, 0.2, -0.85] as [number, number, number],
          length: 0.72,
        },
        {
          position: [-0.22, 0.62, 0.05] as [number, number, number],
          rotation: [0.15, 0.1, -0.55] as [number, number, number],
          length: 0.8,
        },
        {
          position: [-0.12, 0.68, -0.08] as [number, number, number],
          rotation: [-0.1, 0.05, -0.4] as [number, number, number],
          length: 0.65,
        },
        {
          position: [-0.28, 0.48, 0.28] as [number, number, number],
          rotation: [0.55, 0.25, -0.7] as [number, number, number],
          length: 0.7,
        },
        {
          position: [0.05, -0.55, 0.35] as [number, number, number],
          rotation: [2.85, 0.1, 0.15] as [number, number, number],
          length: 1.15,
        },
      ] as const,
    [],
  );

  return (
    <group>
      <RealSkull position={[0, 0.05, 0]} targetHeight={1.85} />
      {nails.map((nail, i) => (
        <Nail
          key={`nail-${i}`}
          position={nail.position}
          rotation={nail.rotation}
          length={nail.length}
        />
      ))}
    </group>
  );
}
