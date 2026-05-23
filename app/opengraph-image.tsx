/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { profile } from "@/data/content";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.titles[0]}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #14102a 50%, #0a0a0f 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            opacity: 0.4,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "8px 18px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 9999,
            fontSize: 22,
            color: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: "#34d399",
              borderRadius: 9999,
            }}
          />
          {profile.titles[0]}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.0,
              backgroundImage:
                "linear-gradient(120deg, #a78bfa 0%, #d946ef 50%, #67e8f9 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.7)", maxWidth: 900 }}>
            {profile.shortTagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span>Portfolio · 2025</span>
          <span>{(process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
