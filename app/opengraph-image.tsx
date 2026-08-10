import { ImageResponse } from "next/og";

export const alt = "Spine";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ff2a00",
          color: "#050505",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>[SP-01]</span>
          <span>STATUS: UPRIGHT</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 160,
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: -8,
              textTransform: "uppercase",
              lineHeight: 0.9,
            }}
          >
            Spine
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 48,
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: -2,
              textTransform: "uppercase",
              lineHeight: 0.9,
              border: "3px solid #050505",
              padding: "10px 18px",
              display: "flex",
            }}
          >
            Structure
          </div>
        </div>

        <div
          style={{
            fontSize: 28,
            letterSpacing: 2,
            textTransform: "uppercase",
            maxWidth: 900,
          }}
        >
          Web, SEO, and strategy with a backbone.
        </div>
      </div>
    ),
    size,
  );
}
