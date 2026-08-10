"use client";

import { useMemo } from "react";

const bone = "#f2f2f0";
const boneDark = "#c8c8c4";
const voidBlack = "#050505";

function BoneMaterial({
  color = bone,
  roughness = 0.62,
  metalness = 0.08,
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
      {/* vertebral body */}
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.22, 0.42]} />
        <BoneMaterial />
      </mesh>
      {/* spinous process */}
      <mesh position={[0, 0.02, -0.38]} castShadow>
        <boxGeometry args={[0.12, 0.16, 0.42]} />
        <BoneMaterial color={boneDark} />
      </mesh>
      {/* transverse processes */}
      <mesh position={[-0.42, 0.02, -0.05]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.38, 0.1, 0.14]} />
        <BoneMaterial color={boneDark} />
      </mesh>
      <mesh position={[0.42, 0.02, -0.05]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[0.38, 0.1, 0.14]} />
        <BoneMaterial color={boneDark} />
      </mesh>
      {/* neural arch ring */}
      <mesh position={[0, 0.02, -0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.045, 8, 20]} />
        <BoneMaterial />
      </mesh>
    </group>
  );
}

export function UpperSpine({ count = 10 }: { count?: number }) {
  const bones = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const t = i / (count - 1);
        return {
          y: 3.2 - t * 4.6,
          scale: 1.05 - t * 0.18,
          twist: Math.sin(i * 0.7) * 0.08,
        };
      }),
    [count],
  );

  const ribs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        y: 2.7 - i * 0.38,
        radius: 0.95 + i * 0.05,
      })),
    [],
  );

  return (
    <group>
      {/* spinal cord */}
      <mesh position={[0, 1.0, -0.05]}>
        <cylinderGeometry args={[0.05, 0.045, 5.2, 12]} />
        <meshStandardMaterial color="#dcdcd8" roughness={0.4} metalness={0.2} />
      </mesh>

      {bones.map((b, i) => (
        <Vertebra
          key={`v-${i}`}
          position={[0, b.y, 0]}
          scale={b.scale}
          twist={b.twist}
        />
      ))}

      {ribs.map((rib, i) => (
        <group key={`rib-${i}`} position={[0, rib.y, 0.05]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[rib.radius, 0.035, 8, 28, Math.PI * 0.92]} />
            <BoneMaterial color={boneDark} roughness={0.7} />
          </mesh>
          <mesh rotation={[0, Math.PI, Math.PI / 2]}>
            <torusGeometry args={[rib.radius, 0.035, 8, 28, Math.PI * 0.92]} />
            <BoneMaterial color={boneDark} roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function SkullAssembly() {
  return (
    <group>
      {/* cranium */}
      <mesh position={[0, 1.35, 0.05]} scale={[1.05, 1.15, 1.2]} castShadow>
        <sphereGeometry args={[0.72, 40, 40]} />
        <BoneMaterial roughness={0.55} />
      </mesh>

      {/* brow / face plate */}
      <mesh position={[0, 1.15, 0.55]} castShadow>
        <boxGeometry args={[0.95, 0.35, 0.35]} />
        <BoneMaterial />
      </mesh>

      {/* eye sockets */}
      <mesh position={[-0.28, 1.2, 0.72]}>
        <sphereGeometry args={[0.17, 20, 20]} />
        <meshBasicMaterial color={voidBlack} />
      </mesh>
      <mesh position={[0.28, 1.2, 0.72]}>
        <sphereGeometry args={[0.17, 20, 20]} />
        <meshBasicMaterial color={voidBlack} />
      </mesh>

      {/* nasal cavity */}
      <mesh position={[0, 0.98, 0.78]} rotation={[0.2, 0, 0]}>
        <coneGeometry args={[0.1, 0.28, 3]} />
        <meshBasicMaterial color={voidBlack} />
      </mesh>

      {/* upper teeth bar */}
      <mesh position={[0, 0.78, 0.62]}>
        <boxGeometry args={[0.55, 0.08, 0.18]} />
        <BoneMaterial color="#ffffff" roughness={0.35} />
      </mesh>

      {/* jaw */}
      <mesh position={[0, 0.55, 0.25]} castShadow>
        <boxGeometry args={[0.85, 0.28, 0.7]} />
        <BoneMaterial />
      </mesh>
      <mesh position={[0, 0.42, 0.55]}>
        <boxGeometry args={[0.5, 0.07, 0.16]} />
        <BoneMaterial color="#ffffff" roughness={0.35} />
      </mesh>

      {/* cervical stack under skull */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Vertebra
          key={`c-${i}`}
          position={[0, 0.15 - i * 0.28, -0.05]}
          scale={0.78 - i * 0.04}
          twist={i * 0.04}
        />
      ))}
    </group>
  );
}

export function RibHalfCage({
  startY = -0.2,
  count = 7,
}: {
  startY?: number;
  count?: number;
}) {
  const ribs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        y: startY - i * 0.32,
        radius: 1.05 + i * 0.06,
        open: 0.85 + i * 0.02,
      })),
    [count, startY],
  );

  return (
    <group>
      <mesh position={[0, startY - count * 0.14, -0.05]}>
        <cylinderGeometry args={[0.05, 0.05, count * 0.34, 12]} />
        <meshStandardMaterial color="#dcdcd8" roughness={0.4} metalness={0.2} />
      </mesh>

      {ribs.map((rib, i) => (
        <group key={`hr-${i}`} position={[0, rib.y, 0.08]}>
          <mesh rotation={[0.15, 0, Math.PI / 2]}>
            <torusGeometry args={[rib.radius, 0.04, 8, 32, Math.PI * rib.open]} />
            <BoneMaterial color={boneDark} roughness={0.72} />
          </mesh>
          <mesh rotation={[0.15, Math.PI, Math.PI / 2]}>
            <torusGeometry args={[rib.radius, 0.04, 8, 32, Math.PI * rib.open]} />
            <BoneMaterial color={boneDark} roughness={0.72} />
          </mesh>
          <Vertebra
            position={[0, 0, -0.08]}
            scale={0.85 + i * 0.02}
            twist={(i % 2 === 0 ? 1 : -1) * 0.05}
          />
        </group>
      ))}
    </group>
  );
}

export function SkullTorso() {
  return (
    <group>
      <SkullAssembly />
      {/* Only upper/mid ribs — journey ends at half */}
      <RibHalfCage startY={-0.15} count={5} />
    </group>
  );
}
