import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Kowloon Aarhus — kinesisk, thai & vietnamesisk køkken";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #1A153F 0%, #2C2276 55%, #0B0A14 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(221,38,39,0.35)",
            filter: "blur(40px)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#E8B873",
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 60, height: 3, background: "#E8B873", display: "flex" }} />
          Aarhus · siden 1999
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 110,
            fontWeight: 800,
            color: "#F7F1E6",
            marginTop: 24,
            lineHeight: 1,
          }}
        >
          KOWLOON
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 44,
            color: "#F2D6A8",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          Kinesisk · Thai · Vietnamesisk køkken
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "rgba(247,241,230,0.7)",
            marginTop: 40,
          }}
        >
          www.kowloon.dk
        </div>
      </div>
    ),
    { ...size }
  );
}
