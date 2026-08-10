import { ImageResponse } from "next/og";

export const alt = "Spine Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const blades = [
  { x: 70, y: 40, w: 28, h: 6, r: 22 },
  { x: 88, y: 78, w: 34, h: 6.5, r: 16 },
  { x: 100, y: 116, w: 38, h: 7, r: 8 },
  { x: 106, y: 154, w: 42, h: 7.5, r: 0 },
  { x: 102, y: 192, w: 42, h: 7.5, r: -8 },
  { x: 90, y: 230, w: 38, h: 7, r: -16 },
  { x: 72, y: 268, w: 34, h: 6.5, r: -22 },
  { x: 56, y: 306, w: 28, h: 6, r: -18 },
  { x: 48, y: 344, w: 24, h: 5.5, r: -10 },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          background: "#050505",
          color: "#f4f4f1",
          padding: 64,
        }}
      >
        <svg width="160" height="400" viewBox="0 0 140 400" fill="#f4f4f1">
          {blades.map((b, i) => (
            <path
              key={i}
              transform={`translate(${b.x} ${b.y}) rotate(${b.r})`}
              d={`M ${-b.w} 0 L 0 ${-b.h} L ${b.w} 0 L 0 ${b.h} Z`}
            />
          ))}
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 500,
              letterSpacing: 28,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Spine
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 36,
              fontWeight: 400,
              letterSpacing: 22,
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            Studio
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: 0.55,
              maxWidth: 520,
            }}
          >
            Web, SEO, and strategy with a backbone.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
