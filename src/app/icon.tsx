import { ImageResponse } from "next/og";
import { theme } from "@/theme/theme";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const { page, shell, lightBar } = theme.color;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: page,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <path d="M6 23 L10 8 H22 L26 23 Z" stroke={shell} strokeWidth="1.6" />
          <path d="M9 17.5 H23" stroke={lightBar} strokeWidth="1.6" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
