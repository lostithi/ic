"use client";

import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";

export type InkVariant = "chalk" | "xerox";

type InkOptions = {
  threshold?: number;
  softness?: number;
  blur?: number;
  grain?: number;
  /** 0 = chalk (white on black), 1 = xerox (black ink on white) */
  invert?: number;
  blendFunction?: BlendFunction;
};

/**
 * Photocopy / screen-print ink: soft blur → luminance → grainy threshold.
 * chalk  = white bone on black (homepage descent)
 * xerox  = black ink on white paper (works portrait)
 */
class InkEffectImpl extends Effect {
  constructor({
    threshold = 0.42,
    softness = 0.14,
    blur = 1.6,
    grain = 0.26,
    invert = 0,
    blendFunction = BlendFunction.NORMAL,
  }: InkOptions = {}) {
    super(
      "InkEffect",
      /* glsl */ `
      uniform float threshold;
      uniform float softness;
      uniform float blur;
      uniform float grain;
      uniform float invert;
      uniform float time;

      float luma(vec3 c) {
        return dot(c, vec3(0.299, 0.587, 0.114));
      }

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec2 px = blur / resolution;

        vec3 c = vec3(0.0);
        c += texture2D(inputBuffer, uv).rgb * 0.22;
        c += texture2D(inputBuffer, uv + vec2( px.x,  0.0)).rgb * 0.14;
        c += texture2D(inputBuffer, uv + vec2(-px.x,  0.0)).rgb * 0.14;
        c += texture2D(inputBuffer, uv + vec2( 0.0,  px.y)).rgb * 0.14;
        c += texture2D(inputBuffer, uv + vec2( 0.0, -px.y)).rgb * 0.14;
        c += texture2D(inputBuffer, uv + vec2( px.x,  px.y)).rgb * 0.055;
        c += texture2D(inputBuffer, uv + vec2(-px.x,  px.y)).rgb * 0.055;
        c += texture2D(inputBuffer, uv + vec2( px.x, -px.y)).rgb * 0.055;
        c += texture2D(inputBuffer, uv + vec2(-px.x, -px.y)).rgb * 0.055;

        float n = hash(uv * resolution * 0.65 + vec2(time * 0.4, time * 0.21));
        float stipple = hash(floor(uv * resolution * 0.45) + time * 0.7);

        float l = luma(c);
        l += (n - 0.5) * grain;
        l += (stipple - 0.5) * grain * 0.7;

        float ink = smoothstep(threshold - softness, threshold + softness, l);
        ink = pow(ink, 0.85);

        // chalk: bright bone; xerox: invert to black ink on paper
        float tone = mix(ink, 1.0 - ink, invert);
        outputColor = vec4(vec3(tone), 1.0);
      }
      `,
      {
        blendFunction,
        uniforms: new Map<string, Uniform>([
          ["threshold", new Uniform(threshold)],
          ["softness", new Uniform(softness)],
          ["blur", new Uniform(blur)],
          ["grain", new Uniform(grain)],
          ["invert", new Uniform(invert)],
          ["time", new Uniform(0)],
        ]),
      },
    );
  }

  update(_renderer: unknown, _inputBuffer: unknown, deltaTime = 0) {
    const time = this.uniforms.get("time");
    if (time) time.value += deltaTime;
  }
}

const Ink = wrapEffect(InkEffectImpl);

const PRESETS: Record<
  InkVariant,
  { threshold: number; softness: number; blur: number; grain: number; invert: number }
> = {
  chalk: { threshold: 0.42, softness: 0.14, blur: 1.6, grain: 0.26, invert: 0 },
  xerox: { threshold: 0.48, softness: 0.1, blur: 2.1, grain: 0.34, invert: 1 },
};

export default function InkPass({
  variant = "chalk",
}: {
  variant?: InkVariant;
}) {
  const preset = PRESETS[variant];
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Ink {...preset} />
    </EffectComposer>
  );
}
