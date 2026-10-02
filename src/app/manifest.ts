import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dumb UI",
    short_name: "Dumb UI",
    description: "One component system, three visual languages.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f3ef",
    theme_color: "#1c1a17",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  }
}
