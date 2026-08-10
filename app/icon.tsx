import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

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
          background: "#ff2a00",
          color: "#050505",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        SP
      </div>
    ),
    size,
  );
}
