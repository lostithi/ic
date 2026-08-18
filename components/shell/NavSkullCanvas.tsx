"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const SKULL = "/brand/nav-skull.jpg";
const VOID = "/brand/nav-void.png";
const PLANE_W = 2.15;
const PLANE_H = 2.15 * (640 / 800);

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D map;
  uniform sampler2D paper;
  uniform float opacity;
  uniform float time;
  uniform float jitter;
  uniform float smearAmt;
  uniform float glitch;
  varying vec2 vUv;

  float luma(vec3 c) {
    return dot(c, vec3(0.299, 0.587, 0.114));
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv + vec2(jitter, jitter * -0.28);

    vec3 paperCol = texture2D(paper, vec2(uv.x * 0.92 + 0.04, uv.y)).rgb;
    float paperL = luma(paperCol);
    float ray = texture2D(paper, vec2(uv.x * 1.7, fract(uv.y * 0.18 + time * 0.08))).r;
    vec2 smear = vec2(
      (hash(uv * 40.0 + time) - 0.5) * glitch * 0.08,
      (ray - 0.42) * (0.09 + smearAmt * 0.22)
    );

    vec3 skull = texture2D(map, uv + smear).rgb;
    skull.r = texture2D(map, uv + smear + vec2(glitch * 0.018, 0.0)).r;
    skull.b = texture2D(map, uv + smear - vec2(glitch * 0.014, smearAmt * 0.01)).b;

    float l = luma(skull);
    l *= mix(0.72, 1.22, ray);
    l += (hash(uv * 180.0 + time * 1.8) - 0.5) * (0.16 + glitch * 0.35);
    l += (paperL - 0.5) * 0.22;

    float ink = smoothstep(0.07, 0.36, l);
    ink = pow(ink, 1.45);

    vec3 toasted = vec3(0.78, 0.62, 0.38);
    vec3 paperWhite = vec3(0.93, 0.89, 0.78);
    vec3 highlight = mix(paperWhite, toasted, clamp(paperL * 1.4, 0.0, 1.0));
    vec3 color = mix(vec3(0.025), highlight, ink);

    float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    float dissolve = smoothstep(0.0, 0.1, edge + paperL * 0.07);
    float alpha = smoothstep(0.03, 0.18, l) * opacity * dissolve;

    gl_FragColor = vec4(color, alpha);
  }
`;

const voidFragmentShader = /* glsl */ `
  uniform sampler2D paper;
  uniform float time;
  uniform float energy;
  varying vec2 vUv;

  float luma(vec3 c) {
    return dot(c, vec3(0.299, 0.587, 0.114));
  }

  void main() {
    vec2 uv = vec2(vUv.x, vUv.y * 1.15 + energy * 0.04);
    vec3 paperCol = texture2D(paper, uv).rgb;
    float l = luma(paperCol);
    float ray = texture2D(paper, vec2(uv.x * 1.4, fract(uv.y * 0.22 + time * 0.06))).r;
    vec3 toasted = vec3(0.42, 0.32, 0.18);
    float wash = pow(max(l, ray * 0.65), 2.4) * (0.42 + energy * 0.28);
    vec3 color = mix(vec3(0.035), toasted, wash);
    gl_FragColor = vec4(color, 1.0);
  }
`;

type PointerState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  dragging: boolean;
  dragX: number;
  dragY: number;
};

type PointerRef = React.MutableRefObject<PointerState>;

function usePointer(): PointerRef {
  const pointer = useRef<PointerState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    dragging: false,
    dragX: 0,
    dragY: 0,
  });
  const last = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      const now = performance.now();
      const dt = Math.max(8, now - last.current.t);
      pointer.current.vx = (x - last.current.x) / (dt / 16.67);
      pointer.current.vy = (y - last.current.y) / (dt / 16.67);
      pointer.current.x = x;
      pointer.current.y = y;
      if (pointer.current.dragging) {
        pointer.current.dragX += pointer.current.vx * 0.045;
        pointer.current.dragY += pointer.current.vy * 0.035;
      }
      last.current = { x, y, t: now };
    };

    const onDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button")) return;
      pointer.current.dragging = true;
    };

    const onUp = () => {
      pointer.current.dragging = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return pointer;
}

function VoidField({ energy }: { energy: React.MutableRefObject<number> }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const paper = useLoader(THREE.TextureLoader, VOID);

  useEffect(() => {
    paper.colorSpace = THREE.SRGBColorSpace;
    paper.wrapS = THREE.RepeatWrapping;
    paper.wrapT = THREE.RepeatWrapping;
    paper.minFilter = THREE.LinearFilter;
    paper.needsUpdate = true;
  }, [paper]);

  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.time.value = state.clock.getElapsedTime();
    material.current.uniforms.energy.value = energy.current;
  });

  return (
    <mesh position={[0, 0, -1.2]} scale={[6.4, 6.4, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        toneMapped={false}
        uniforms={{
          paper: { value: paper },
          time: { value: 0 },
          energy: { value: 0 },
        }}
        vertexShader={vertexShader}
        fragmentShader={voidFragmentShader}
      />
    </mesh>
  );
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
}

function XeroxStack({
  pointer,
  energy,
}: {
  pointer: PointerRef;
  energy: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);
  const { clock } = useThree();
  const born = useRef(clock.getElapsedTime());
  const glitchHold = useRef(0);
  const [texture, paper] = useLoader(THREE.TextureLoader, [SKULL, VOID]);

  useEffect(() => {
    for (const map of [texture, paper]) {
      map.colorSpace = THREE.SRGBColorSpace;
      map.minFilter = THREE.LinearFilter;
      map.magFilter = THREE.LinearFilter;
      map.needsUpdate = true;
    }
    paper.wrapS = THREE.RepeatWrapping;
    paper.wrapT = THREE.RepeatWrapping;
  }, [texture, paper]);

  const layers = useMemo(
    () =>
      [
        { z: -0.42, x: 0.16, opacity: 0.16, scale: 1.08, trail: 1 },
        { z: -0.22, x: 0.08, opacity: 0.32, scale: 1.04, trail: 0.62 },
        { z: -0.08, x: 0.03, opacity: 0.55, scale: 1.015, trail: 0.28 },
        { z: 0, x: 0, opacity: 0.97, scale: 1, trail: 0 },
      ].map((layer) => ({
        ...layer,
        material: new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          toneMapped: false,
          uniforms: {
            map: { value: texture },
            paper: { value: paper },
            opacity: { value: layer.opacity },
            time: { value: 0 },
            jitter: { value: 0 },
            smearAmt: { value: 0 },
            glitch: { value: 0 },
          },
          vertexShader,
          fragmentShader,
        }),
      })),
    [texture, paper],
  );

  useEffect(() => {
    return () => {
      for (const layer of layers) layer.material.dispose();
    };
  }, [layers]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const age = t - born.current;
    const intro = easeOut(age / 1.15);
    const p = pointer.current;

    p.vx *= 0.9;
    p.vy *= 0.9;
    p.dragX = THREE.MathUtils.lerp(p.dragX, p.dragging ? p.dragX : p.dragX * 0.985, 0.2);
    p.dragY = THREE.MathUtils.lerp(p.dragY, p.dragging ? p.dragY : p.dragY * 0.985, 0.2);

    const speed = Math.min(1.6, Math.hypot(p.vx, p.vy));
    const pulse = Math.pow(Math.max(0, Math.sin(t * 1.15)), 18);
    const scream = pulse * 0.85 + speed * 0.55;
    if (pulse > 0.72) glitchHold.current = 0.22;
    glitchHold.current = Math.max(0, glitchHold.current - delta);
    const glitch = glitchHold.current > 0 ? 0.55 + speed * 0.4 : speed * 0.25;
    energy.current = THREE.MathUtils.lerp(energy.current, scream + glitch * 0.4, 0.12);

    if (group.current) {
      const fallY = THREE.MathUtils.lerp(2.35, 0, intro);
      const spinIn = THREE.MathUtils.lerp(0.55, 0, intro);
      const lookY = p.x * 0.42 + p.dragX;
      const lookX = -p.y * 0.28 + p.dragY;
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        lookY,
        4.2,
        delta,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        lookX,
        4.2,
        delta,
      );
      group.current.rotation.z = spinIn + Math.sin(t * 0.7) * 0.04 + glitch * 0.06;
      group.current.position.x = Math.sin(t * 0.55) * 0.08 + p.x * 0.12;
      group.current.position.y = fallY + Math.cos(t * 0.42) * 0.07 - p.y * 0.08;
      const breathe = 0.9 + intro * 0.08 + Math.sin(t * 1.6) * 0.025 + scream * 0.04;
      group.current.scale.setScalar(breathe);
    }

    layers.forEach((layer, index) => {
      layer.material.uniforms.time.value = t;
      layer.material.uniforms.jitter.value =
        Math.sin(t * 31 + index * 1.4) * 0.003 * (index + 1) + glitch * 0.012;
      layer.material.uniforms.smearAmt.value = scream;
      layer.material.uniforms.glitch.value = glitch;
      layer.material.uniforms.opacity.value =
        layer.opacity * (0.55 + intro * 0.45) * (1 - layer.trail * 0.15 + scream * layer.trail);

      const mesh = meshes.current[index];
      if (!mesh) return;
      const trail = layer.trail * (0.18 + scream * 0.55);
      mesh.position.x = layer.x + p.vx * trail * 0.55 + Math.sin(t * 2.1 + index) * trail * 0.12;
      mesh.position.y = p.vy * trail * -0.4 + pulse * layer.trail * 0.16;
      mesh.position.z = layer.z - scream * layer.trail * 0.2;
      mesh.rotation.z = trail * p.vx * 0.15;
    });
  });

  return (
    <group ref={group} position={[0, 2.2, 0]} scale={0.72}>
      {layers.map((layer, index) => (
        <mesh
          key={index}
          ref={(node) => {
            if (node) meshes.current[index] = node;
          }}
          position={[layer.x, 0, layer.z]}
          scale={layer.scale}
          material={layer.material}
        >
          <planeGeometry args={[PLANE_W, PLANE_H]} />
        </mesh>
      ))}
    </group>
  );
}

export default function NavSkullCanvas() {
  const pointer = usePointer();
  const energy = useRef(0);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.55], fov: 32 }}
      dpr={[1, 1.4]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
    >
      <color attach="background" args={["#090807"]} />
      <Suspense fallback={null}>
        <VoidField energy={energy} />
        <XeroxStack pointer={pointer} energy={energy} />
      </Suspense>
    </Canvas>
  );
}
