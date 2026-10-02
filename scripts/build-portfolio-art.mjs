// Generates the portfolio template's own artwork: project covers and a portrait.
// Deterministic SVG, no stock imagery. Run: node scripts/build-portfolio-art.mjs
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const out = join(import.meta.dirname, "..", "public", "work")
mkdirSync(out, { recursive: true })

// deterministic pseudo random
let seed = 1619
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)

const W = 1200
const H = 800
const svg = (body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${bg}"/>${body}</svg>\n`
const font = `font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"`

/* Dumb UI: one button, three materials */
{
  const y = 300
  const body = `
  <g ${font} font-weight="700" font-size="40">
    <rect x="86" y="${y + 14}" width="320" height="120" fill="#E4572E"/>
    <rect x="72" y="${y}" width="320" height="120" fill="#1B1A17"/>
    <text x="232" y="${y + 72}" fill="#F4F3EF" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" letter-spacing="3">CONTINUE</text>

    <ellipse cx="600" cy="${y + 140}" rx="150" ry="16" fill="#2A221D" opacity=".18"/>
    <rect x="440" y="${y}" width="320" height="120" rx="60" fill="#2A221D"/>
    <text x="600" y="${y + 72}" fill="#FBF8F4" text-anchor="middle">Continue</text>

    <rect x="808" y="${y + 18}" width="320" height="120" rx="26" fill="#1F2A8A"/>
    <rect x="808" y="${y}" width="320" height="120" rx="26" fill="#3B4FE0"/>
    <rect x="822" y="${y + 8}" width="292" height="36" rx="16" fill="#FFFFFF" opacity=".12"/>
    <text x="968" y="${y + 72}" fill="#FFFFFF" text-anchor="middle">Continue</text>
  </g>
  <g ${font} font-size="22" fill="#5E5A52" letter-spacing="3">
    <text x="232" y="520" text-anchor="middle">RAW</text>
    <text x="600" y="520" text-anchor="middle">SILK</text>
    <text x="968" y="520" text-anchor="middle">VOLUME</text>
  </g>`
  writeFileSync(join(out, "dumb-ui.svg"), svg(body, "#EDEBE6"))
}

/* 1619 Deploy: branches merging into main */
{
  const lanes = [250, 400, 550]
  let body = ""
  body += `<path d="M80 ${lanes[1]} H1120" stroke="#3A4B7A" stroke-width="6" fill="none"/>`
  const branches = [
    { from: 160, to: 520, lane: 0, color: "#7CE0C3" },
    { from: 420, to: 760, lane: 2, color: "#F2C14E" },
    { from: 700, to: 1000, lane: 0, color: "#9DB4FF" },
  ]
  for (const b of branches) {
    const ly = lanes[b.lane]
    body += `<path d="M${b.from} ${lanes[1]} C${b.from + 60} ${lanes[1]} ${b.from + 40} ${ly} ${b.from + 100} ${ly} H${b.to - 100} C${b.to - 40} ${ly} ${b.to - 60} ${lanes[1]} ${b.to} ${lanes[1]}" stroke="${b.color}" stroke-width="6" fill="none"/>`
    for (let x = b.from + 140; x < b.to - 120; x += 90) body += `<circle cx="${x}" cy="${ly}" r="13" fill="#10162A" stroke="${b.color}" stroke-width="6"/>`
    body += `<circle cx="${b.to}" cy="${lanes[1]}" r="20" fill="${b.color}"/>`
  }
  body += `<g ${font} font-weight="600" font-size="24"><rect x="900" y="110" width="200" height="54" rx="27" fill="#7CE0C3"/><text x="1000" y="145" text-anchor="middle" fill="#0B2A22">Ready · 51s</text></g>`
  writeFileSync(join(out, "deploy.svg"), svg(body, "#10162A"))
}

/* Atlas Status: gauges */
{
  let body = ""
  const gauges = [
    { cx: 330, value: 0.94, color: "#7CE0C3" },
    { cx: 870, value: 0.62, color: "#F2C14E" },
  ]
  for (const g of gauges) {
    const r = 190
    const start = Math.PI * 0.75
    const sweep = Math.PI * 1.5
    const arc = (v) => {
      const a = start + sweep * v
      const x = g.cx + r * Math.cos(a)
      const y = 420 + r * Math.sin(a)
      return `M${g.cx + r * Math.cos(start)} ${420 + r * Math.sin(start)} A${r} ${r} 0 ${sweep * v > Math.PI ? 1 : 0} 1 ${x} ${y}`
    }
    body += `<path d="${arc(1)}" stroke="#1E4A40" stroke-width="34" fill="none" stroke-linecap="round"/>`
    body += `<path d="${arc(g.value)}" stroke="${g.color}" stroke-width="34" fill="none" stroke-linecap="round"/>`
    for (let i = 0; i <= 30; i++) {
      const a = start + (sweep * i) / 30
      body += `<line x1="${g.cx + 140 * Math.cos(a)}" y1="${420 + 140 * Math.sin(a)}" x2="${g.cx + 150 * Math.cos(a)}" y2="${420 + 150 * Math.sin(a)}" stroke="#4E8C7D" stroke-width="3"/>`
    }
    body += `<text x="${g.cx}" y="440" ${font} font-weight="700" font-size="64" fill="#EAF7F2" text-anchor="middle">${Math.round(g.value * 100)}</text>`
  }
  writeFileSync(join(out, "atlas.svg"), svg(body, "#0F2A24"))
}

/* Fernhill Studio: halftone print */
{
  let body = ""
  for (let y = 20; y < H; y += 26) {
    for (let x = 20; x < W; x += 26) {
      const d = Math.hypot(x - 760, y - 380)
      const r = Math.max(0, 11 - d / 34)
      if (r > 0.6) body += `<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" fill="#1B1A17"/>`
    }
  }
  body += `<circle cx="360" cy="420" r="150" fill="#D9452B"/>`
  body += `<text x="120" y="720" ${font} font-weight="800" font-size="72" fill="#1B1A17" letter-spacing="-2">Fernhill</text>`
  writeFileSync(join(out, "fernhill.svg"), svg(body, "#E9E4DA"))
}

/* Terrain: contour lines */
{
  let body = ""
  for (let i = 0; i < 26; i++) {
    const base = 120 + i * 24
    let d = `M -20 ${base}`
    for (let x = 0; x <= W + 40; x += 40) {
      const y = base + 70 * Math.sin(x / 210 + i * 0.35) * Math.cos(x / 520 - i * 0.12) + 30 * Math.sin(x / 90 + i)
      d += ` L ${x} ${y.toFixed(1)}`
    }
    const color = i % 5 === 0 ? "#FFB38A" : "#8E86D8"
    body += `<path d="${d}" stroke="${color}" stroke-width="${i % 5 === 0 ? 3 : 1.6}" fill="none" opacity="${0.45 + rand() * 0.5}"/>`
  }
  writeFileSync(join(out, "terrain.svg"), svg(body, "#1A1B2E"))
}

/* Portrait: the Deepak character, large, on a geometric field */
{
  const s = 7.2
  const tx = 400 - 48 * s
  const ty = 1000 - 96 * s
  const hair = "#1E1B18"
  const skin = "#C68B59"
  const portrait = `
  <rect width="800" height="1000" fill="#2F4858"/>
  <circle cx="610" cy="240" r="190" fill="#F2C14E" opacity=".95"/>
  <circle cx="160" cy="760" r="120" fill="none" stroke="#7CE0C3" stroke-width="10"/>
  <g transform="translate(${tx} ${ty}) scale(${s})">
    <path d="M14 96c0-19 14-29 34-29s34 10 34 29z" fill="#F4F3EF"/>
    <rect x="42" y="54" width="12" height="12" rx="3" fill="${skin}"/>
    <circle cx="48" cy="42" r="17" fill="${skin}"/>
    <circle cx="41.5" cy="43" r="1.9" fill="#1b1916"/>
    <circle cx="54.5" cy="43" r="1.9" fill="#1b1916"/>
    <path d="M44 50.5q4 3 8 0" fill="none" stroke="#1b1916" stroke-width="1.6" stroke-linecap="round" opacity=".75"/>
    <path d="M30.5 43c-3-17 12-24 24-21 9 2 13 10 11 21-5-9-14-13-25-8l-4 1z" fill="${hair}"/>
    <rect x="34" y="38.5" width="11" height="8" rx="3" fill="none" stroke="#1b1916" stroke-width="1.2"/>
    <rect x="51" y="38.5" width="11" height="8" rx="3" fill="none" stroke="#1b1916" stroke-width="1.2"/>
    <path d="M45 41.5h6" stroke="#1b1916" stroke-width="1.2"/>
  </g>`
  writeFileSync(join(out, "portrait.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">${portrait}</svg>\n`)
}

console.log("portfolio art written to public/work")
