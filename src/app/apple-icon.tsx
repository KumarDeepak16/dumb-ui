import { ImageResponse } from "next/og"

import { ELEPHANT_FACETS, ELEPHANT_OUTLINE } from "@/components/site/logo"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

const tones = ["#f4f3ef", "#dcd8cf", "#b9b3a6", "#8f887a"]

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
          background: "#1c1a17",
        }}
      >
        <svg width="140" height="94" viewBox="3.6 12.6 57.2 38.4">
          <path d={ELEPHANT_OUTLINE} fill="#f4f3ef" />
          {ELEPHANT_FACETS.map((facet, i) => (
            <path key={i} d={facet.d} fill={tones[facet.tone]} />
          ))}
        </svg>
      </div>
    ),
    size
  )
}
