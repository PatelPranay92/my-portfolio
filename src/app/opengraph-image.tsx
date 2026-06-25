import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const alt = "Pranay Patel - Full Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: "linear-gradient(to right, #0f172a, #1e293b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "24px",
            padding: "80px",
            background: "rgba(255, 255, 255, 0.05)",
            width: "100%",
            height: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #38bdf8, #818cf8)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              marginBottom: "20px",
            }}
          >
            Pranay Patel
          </h1>
          <h2
            style={{
              fontSize: "40px",
              color: "#94a3b8",
              margin: 0,
              fontWeight: "normal",
              letterSpacing: "2px",
            }}
          >
            Full Stack Developer
          </h2>
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "60px",
            }}
          >
            <span style={{ fontSize: "28px", color: "#cbd5e1" }}>Next.js</span>
            <span style={{ fontSize: "28px", color: "#64748b" }}>•</span>
            <span style={{ fontSize: "28px", color: "#cbd5e1" }}>React</span>
            <span style={{ fontSize: "28px", color: "#64748b" }}>•</span>
            <span style={{ fontSize: "28px", color: "#cbd5e1" }}>TypeScript</span>
            <span style={{ fontSize: "28px", color: "#64748b" }}>•</span>
            <span style={{ fontSize: "28px", color: "#cbd5e1" }}>Python</span>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
