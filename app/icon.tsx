import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

const blades = [
  { x: 16.2, y: 3.5, w: 4.2, r: 20 },
  { x: 18.2, y: 6.4, w: 5.0, r: 15 },
  { x: 19.6, y: 9.3, w: 5.6, r: 8 },
  { x: 20.2, y: 12.2, w: 6.0, r: 0 },
  { x: 19.8, y: 15.1, w: 6.1, r: -8 },
  { x: 18.4, y: 18.0, w: 5.8, r: -15 },
  { x: 16.4, y: 20.9, w: 5.3, r: -20 },
  { x: 14.4, y: 23.8, w: 4.7, r: -18 },
  { x: 13.0, y: 26.7, w: 4.2, r: -12 },
];

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
        }}
      >
        <svg width="24" height="28" viewBox="0 0 32 32" fill="#f4f4f1">
          {blades.map((b, i) => (
            <path
              key={i}
              transform={`translate(${b.x} ${b.y}) rotate(${b.r})`}
              d={`M ${-b.w} 0 L 0 -1.35 L ${b.w} 0 L 0 1.35 Z`}
            />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
