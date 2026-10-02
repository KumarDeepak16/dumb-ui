import { ImageResponse } from "next/og"

import { ELEPHANT_FACETS, ELEPHANT_OUTLINE } from "@/components/site/logo"

export const alt = "Dumb UI: one component system, three visual languages"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const tones = ["#f4f3ef", "#dcd8cf", "#b9b3a6", "#8f887a"]

/** Three buttons, one per style, drawn with plain boxes (satori has no CSS cascade). */
function Sample({
  label,
  bg,
  fg,
  border,
  radius,
  shadow,
}: {
  label: string
  bg: string
  fg: string
  border: string
  radius: number
  shadow: string
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 22, color: "#8f887a", letterSpacing: 2 }}>{label.toUpperCase()}</div>
      <div
        style={{
          display: "flex",
          padding: "18px 34px",
          background: bg,
          color: fg,
          border,
          borderRadius: radius,
          boxShadow: shadow,
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        Continue
      </div>
    </div>
  )
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#1c1a17",
          color: "#f4f3ef",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="96" height="64" viewBox="3.6 12.6 57.2 38.4">
            <path d={ELEPHANT_OUTLINE} fill="#f4f3ef" />
            {ELEPHANT_FACETS.map((facet, i) => (
              <path key={i} d={facet.d} fill={tones[facet.tone]} />
            ))}
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700 }}>Dumb UI</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
            Same components. Three materials.
          </div>
          <div style={{ fontSize: 30, color: "#b9b3a6" }}>
            shadcn-compatible React in Raw, Vector and Volume. ui.1619.in
          </div>
        </div>
        <div style={{ display: "flex", gap: 48 }}>
          <Sample label="Raw" bg="#f4f3ef" fg="#1c1a17" border="4px solid #f4f3ef" radius={0} shadow="8px 8px 0 #e4572e" />
          <Sample label="Vector" bg="#0f1a24" fg="#7fe6f2" border="2px solid #7fe6f2" radius={6} shadow="0 0 28px rgba(127,230,242,0.45)" />
          <Sample label="Volume" bg="#3b4fe0" fg="#ffffff" border="0px solid transparent" radius={16} shadow="0 8px 0 #1f2a8a" />
        </div>
      </div>
    ),
    size
  )
}
