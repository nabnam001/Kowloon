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
            "radial-gradient(ellipse at 78% 18%, rgba(178,58,46,0.30), transparent 55%), linear-gradient(135deg, #131315 0%, #0B0B0C 60%, #060607 100%)",
          position: "relative",
        }}
      >
        {/* faint kanji watermark */}
        <div
          style={{
            position: "absolute",
            right: -40,
            bottom: -120,
            fontSize: 460,
            fontWeight: 800,
            color: "rgba(236,230,218,0.05)",
            display: "flex",
            lineHeight: 1,
          }}
        >
          味
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#B23A2E",
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 60, height: 3, background: "#B23A2E", display: "flex" }} />
          Aarhus · siden 1999
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 110,
            fontWeight: 800,
            color: "#ECE6DA",
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
            color: "rgba(236,230,218,0.85)",
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
            color: "rgba(236,230,218,0.6)",
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
