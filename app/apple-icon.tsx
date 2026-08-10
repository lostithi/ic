import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
          color: "#f4f4f1",
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: -3,
          border: "4px solid #f4f4f1",
        }}
      >
        SP
      </div>
    ),
    size,
  );
}
