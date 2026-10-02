"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const PRESETS = ["halftone", "blueprint", "contour", "aurora"] as const
type ShaderPreset = (typeof PRESETS)[number]

/** Each style's natural background. */
const STYLE_PRESET: Record<string, ShaderPreset> = {
  raw: "halftone",
  vector: "blueprint",
  volume: "contour",
}

const VERTEX = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_dpr;
uniform int u_preset;
uniform vec3 u_bg;
uniform vec3 u_fg;
uniform vec3 u_accent;
uniform vec2 u_mouse;
uniform float u_intensity;
out vec4 outColor;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return v;
}
// anti-aliased line coverage for a distance in device pixels
float line(float d, float w) { return 1.0 - smoothstep(w * 0.5, w * 0.5 + 1.0, d); }
float grid(vec2 px, float step) {
  vec2 g = abs(fract(px / step + 0.5) - 0.5) * step;
  return max(line(g.x, u_dpr), line(g.y, u_dpr));
}

void main() {
  vec2 px = gl_FragCoord.xy;
  vec2 uv = px / u_res;
  vec2 p = (px - 0.5 * u_res) / u_res.y;
  float t = u_time;
  float ink = 0.0;
  vec3 col = u_bg;

  if (u_preset == 0) {
    // halftone: a print dot field whose dot size follows drifting noise
    float cell = 11.0 * u_dpr;
    vec2 id = floor(px / cell);
    vec2 f = fract(px / cell) - 0.5;
    float n = fbm(id * 0.045 + vec2(t * 0.04, -t * 0.025));
    float r = smoothstep(0.38, 0.82, n) * 0.48;
    ink = 1.0 - smoothstep(r - 0.06, r, length(f));
    col = mix(u_bg, u_fg, ink * 0.85 * u_intensity);
  } else if (u_preset == 1) {
    // blueprint: drafting grid + construction geometry that draws itself
    float minor = grid(px, 16.0 * u_dpr);
    float major = grid(px, 80.0 * u_dpr);
    ink = max(minor * 0.07, major * 0.16);
    vec2 c = u_res * vec2(0.68, 0.5);
    float R = u_res.y * 0.34;
    float d = length(px - c);
    float ang = atan(px.y - c.y, px.x - c.x) / 6.2831853 + 0.5;
    float drawn = step(ang, fract(t * 0.05));
    ink = max(ink, line(abs(d - R), u_dpr * 1.2) * 0.75 * drawn);
    float dash = step(0.5, fract(ang * 48.0 - t * 0.2));
    ink = max(ink, line(abs(d - R * 0.62), u_dpr) * 0.45 * dash);
    ink = max(ink, line(abs(d - R * 1.32), u_dpr) * 0.25);
    ink = max(ink, line(abs(px.y - c.y), u_dpr) * 0.3 * step(abs(px.x - c.x), R * 1.45));
    ink = max(ink, line(abs(px.x - c.x), u_dpr) * 0.3 * step(abs(px.y - c.y), R * 1.45));
    float sweepA = fract(t * 0.035) * 6.2831853;
    vec2 dir = vec2(cos(sweepA), sin(sweepA));
    float along = dot(px - c, dir);
    float across = abs(dot(px - c, vec2(-dir.y, dir.x)));
    ink = max(ink, line(across, u_dpr) * 0.55 * step(0.0, along) * step(along, R * 1.32));
    if (u_mouse.x >= 0.0) {
      vec2 m = u_mouse * u_dpr;
      ink = max(ink, line(abs(px.x - m.x), u_dpr) * 0.22 + line(abs(px.y - m.y), u_dpr) * 0.22);
      ink = max(ink, line(abs(length(px - m) - 14.0 * u_dpr), u_dpr) * 0.6);
    }
    col = mix(u_bg, u_fg, clamp(ink * u_intensity, 0.0, 1.0));
  } else if (u_preset == 2) {
    // contour: topographic lines over slowly shifting terrain
    float h = fbm(p * 1.7 + vec2(t * 0.02, t * 0.015));
    float k = h * 16.0;
    float w = fwidth(k);
    float l = 1.0 - smoothstep(0.0, w * 1.4, abs(fract(k) - 0.5) * 2.0 * 0.5);
    float majorLine = step(0.5, fract(k / 5.0 + 0.1)) < 0.5 ? 1.0 : 0.0;
    col = mix(u_bg, u_fg, l * 0.22 * u_intensity);
    col = mix(col, u_accent, l * majorLine * 0.45 * u_intensity);
  } else {
    // aurora: soft bands in the accent color
    float n = fbm(vec2(p.x * 1.1 + t * 0.05, p.y * 2.4 - t * 0.03));
    float band = smoothstep(0.35, 0.95, n) * smoothstep(1.1, 0.1, uv.y);
    col = mix(u_bg, u_accent, band * 0.55 * u_intensity);
    col = mix(col, u_fg, smoothstep(0.75, 1.0, n) * 0.08 * u_intensity);
  }

  // whisper of grain keeps gradients from banding
  col += (hash(px + t) - 0.5) * 0.012;
  outColor = vec4(col, 1.0);
}`

/** Resolves any CSS color (oklch, var-derived) to linear 0..1 RGB via a 1px canvas. */
function cssToRgb(color: string, ctx: CanvasRenderingContext2D): [number, number, number] {
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = "#000"
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return [r / 255, g / 255, b / 255]
}

type ShaderBackgroundProps = React.ComponentProps<"div"> & {
  /** Defaults to the preset that matches the nearest data-style. */
  preset?: ShaderPreset
  /** Animation speed multiplier. 0 renders a still frame. */
  speed?: number
  /** How strongly the pattern shows over the background, 0..1. */
  intensity?: number
}

/**
 * A WebGL2 background that paints with the active style's tokens. It pauses
 * offscreen and in hidden tabs, renders a single frame under reduced motion,
 * and falls back to the plain background color without WebGL2.
 */
function ShaderBackground({
  preset,
  speed = 1,
  intensity = 1,
  className,
  ...props
}: ShaderBackgroundProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return shader
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, "a_pos")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(program, name)
    const uniforms = {
      res: u("u_res"), time: u("u_time"), dpr: u("u_dpr"), preset: u("u_preset"),
      bg: u("u_bg"), fg: u("u_fg"), accent: u("u_accent"), mouse: u("u_mouse"), intensity: u("u_intensity"),
    }

    const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!
    const readColors = () => {
      const cs = getComputedStyle(root)
      const scope = root.closest("[data-style]")?.getAttribute("data-style") ?? "raw"
      const resolved = preset ?? STYLE_PRESET[scope] ?? "aurora"
      gl.uniform1i(uniforms.preset, PRESETS.indexOf(resolved))
      gl.uniform3fv(uniforms.bg, cssToRgb(cs.getPropertyValue("--background").trim(), probe))
      gl.uniform3fv(uniforms.fg, cssToRgb(cs.getPropertyValue("--foreground").trim(), probe))
      gl.uniform3fv(uniforms.accent, cssToRgb(cs.getPropertyValue("--highlight").trim(), probe))
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      const { width, height } = root.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uniforms.res, canvas.width, canvas.height)
      gl.uniform1f(uniforms.dpr, dpr)
    }

    let mouse: [number, number] = [-1, -1]
    const onPointer = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      mouse = [event.clientX - rect.left, rect.height - (event.clientY - rect.top)]
    }
    const onLeave = () => (mouse = [-1, -1])
    const host = root.parentElement ?? root
    host.addEventListener("pointermove", onPointer)
    host.addEventListener("pointerleave", onLeave)

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    let visible = true
    let frame = 0
    let last = performance.now()
    let time = 12.0

    const draw = () => {
      gl.uniform1f(uniforms.time, time)
      gl.uniform2f(uniforms.mouse, mouse[0], mouse[1])
      gl.uniform1f(uniforms.intensity, intensity)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const loop = (now: number) => {
      time += ((now - last) / 1000) * speed
      last = now
      draw()
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      cancelAnimationFrame(frame)
      if (!visible || document.hidden || reduce.matches || speed === 0) {
        draw()
        return
      }
      last = performance.now()
      frame = requestAnimationFrame(loop)
    }

    resize()
    readColors()
    start()

    const resizer = new ResizeObserver(() => {
      resize()
      draw()
    })
    resizer.observe(root)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })
    io.observe(root)
    // Style or color-scheme switches re-read the tokens.
    const themeWatch = new MutationObserver(() => {
      readColors()
      draw()
    })
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-style"] })
    const onVisibility = () => start()
    document.addEventListener("visibilitychange", onVisibility)
    reduce.addEventListener("change", start)

    return () => {
      cancelAnimationFrame(frame)
      resizer.disconnect()
      io.disconnect()
      themeWatch.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      reduce.removeEventListener("change", start)
      host.removeEventListener("pointermove", onPointer)
      host.removeEventListener("pointerleave", onLeave)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [preset, speed, intensity])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-background", className)}
      {...props}
      data-slot="shader-background"
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  )
}

export { ShaderBackground, type ShaderPreset }
