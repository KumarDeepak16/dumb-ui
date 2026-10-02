// Generates public/avatars/*.svg: Dumb UI's own character set for demos.
// Flat, geometric, one palette. Run: node scripts/build-avatars.mjs
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const out = join(import.meta.dirname, "..", "public", "avatars")
mkdirSync(out, { recursive: true })

const people = [
  { id: "deepak", bg: "#2F4858", skin: "#C68B59", hair: "#1E1B18", top: "#F2C14E", style: "side" },
  { id: "ravi", bg: "#6B4E71", skin: "#A86B4C", hair: "#2B2220", top: "#E8D7C1", style: "short", beard: true },
  { id: "lena", bg: "#C98E99", skin: "#F1C9A5", hair: "#3A2E2A", top: "#33415C", style: "long" },
  { id: "jonas", bg: "#5B8E7D", skin: "#E8B998", hair: "#C9A15D", top: "#2D3142", style: "short" },
  { id: "aditi", bg: "#D9714E", skin: "#B9805A", hair: "#1F1A17", top: "#F4F1DE", style: "bun" },
  { id: "tomas", bg: "#3D5A80", skin: "#D49A6A", hair: "#4A3428", top: "#EE6C4D", style: "curly" },
  { id: "sara", bg: "#7FA88F", skin: "#8D5A3B", hair: "#141414", top: "#F2CC8F", style: "curly" },
  { id: "noor", bg: "#2B2D42", skin: "#C99A72", hair: "#8D99AE", top: "#EDF2F4", style: "hijab" },
]

const head = (p) => `<circle cx="48" cy="42" r="17" fill="${p.skin}"/>`
const neck = (p) => `<rect x="42" y="54" width="12" height="12" rx="3" fill="${p.skin}"/>`
const body = (p) => `<path d="M14 96c0-19 14-29 34-29s34 10 34 29z" fill="${p.top}"/>`
const face = () =>
  `<circle cx="41.5" cy="43" r="1.9" fill="#1b1916"/><circle cx="54.5" cy="43" r="1.9" fill="#1b1916"/>` +
  `<path d="M44 50.5q4 3 8 0" fill="none" stroke="#1b1916" stroke-width="1.6" stroke-linecap="round" opacity=".75"/>`

const hair = {
  short: (p) => `<path d="M31 41c-1-14 7-20 17-20s18 6 17 20c-3-7-9-11-17-11s-14 4-17 11z" fill="${p.hair}"/>`,
  side: (p) => `<path d="M30.5 43c-3-17 12-24 24-21 9 2 13 10 11 21-5-9-14-13-25-8l-4 1z" fill="${p.hair}"/>`,
  long: (p) => ({
    back: `<path d="M27 44c0-22 42-22 42 0v26c-8 5-34 5-42 0z" fill="${p.hair}"/>`,
    front: `<path d="M31 41c0-14 9-19 17-19 9 0 17 5 17 19-6-6-11-9-17-9-5 0-12 3-17 9z" fill="${p.hair}"/>`,
  }),
  bun: (p) =>
    `<circle cx="48" cy="19" r="8" fill="${p.hair}"/><path d="M31 41c-1-14 7-20 17-20s18 6 17 20c-3-7-9-11-17-11s-14 4-17 11z" fill="${p.hair}"/>`,
  curly: (p) =>
    [
      [33, 35], [35, 27], [42, 22], [50, 21], [58, 24], [63, 31], [64, 38], [31, 41],
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${p.hair}"/>`)
      .join(""),
  hijab: (p) => ({
    back: `<path d="M26 46c0-26 44-26 44 0v22c-10 8-34 8-44 0z" fill="${p.hair}"/>`,
    front: `<path d="M31 40c2-13 32-13 34 0-7-6-27-6-34 0z" fill="${p.hair}"/>`,
  }),
}

for (const p of people) {
  const h = hair[p.style](p)
  const back = typeof h === "object" ? h.back : ""
  const front = typeof h === "object" ? h.front : h
  const beard = p.beard
    ? `<path d="M33 45c2 12 8 16 15 16s13-4 15-16c-3 5-8 7-15 7s-12-2-15-7z" fill="${p.hair}"/>`
    : ""
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="${p.bg}"/>${back}${body(p)}${neck(p)}${head(p)}${face()}${beard}${front}</svg>\n`
  writeFileSync(join(out, `${p.id}.svg`), svg)
}

console.log(`avatars: ${people.length} written to public/avatars`)
