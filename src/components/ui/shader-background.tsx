"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const PRESETS = ["press", "satin", "relief", "draft", "signal"] as const
type ShaderPreset = (typeof PRESETS)[number]

/** Each style's natural background. */
const STYLE_PRESET: Record<string, ShaderPreset> = {
  raw: "press",
  silk: "satin",
  volume: "relief",
  vector: "draft",
  halo: "signal",
}

/** Display names and one-line descriptions, for pickers and docs. */
const SHADER_PRESETS: Record<ShaderPreset, { name: string; description: string }> = {
  press: { name: "Press", description: "One-bit ordered dither. Ink blooms under the cursor; clicks send rings." },
  satin: { name: "Satin", description: "Flowing fabric folds with a soft sheen. The cursor bends the cloth." },
  relief: { name: "Relief", description: "A wireframe landscape rolling toward you. The cursor raises a hill." },
  draft: { name: "Draft", description: "A drafting compass that tracks the cursor across a measured grid." },
  signal: { name: "Signal", description: "An LED dot field with a cursor spotlight. Clicks pulse outward." },
}

/**
 * Render resolution per preset, relative to CSS pixels. Soft presets render
 * small and are upscaled by the browser; line work renders near native.
 */
const PRESET_SCALE: Record<ShaderPreset, number> = {
  press: 1,
  satin: 0.75,
  relief: 1,
  draft: 1,
  signal: 1,
}

const VERTEX = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 u_res;        // CSS px
uniform float u_scale;     // device px per CSS px
uniform float u_time;
uniform int u_preset;
uniform vec3 u_bg;
uniform vec3 u_fg;
uniform vec3 u_accent;
uniform vec3 u_primary;
uniform vec2 u_mouse;      // CSS px, smoothed, origin bottom-left
uniform float u_hover;     // 0..1 eased pointer presence
uniform float u_energy;    // 0..1 pointer speed
uniform vec3 u_ripple;     // x, y (CSS px), age in seconds (< 0: none)
uniform float u_intensity;
out vec4 outColor;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm3(vec2 p) { return (0.5 * noise(p) + 0.25 * noise(p * 2.03 + 7.1) + 0.125 * noise(p * 4.01 + 3.7)) / 0.875; }
float aa(float d, float w) { return 1.0 - smoothstep(w, w + 1.0 / u_scale, d); }
float ripple(vec2 px, float speed, float width) {
  if (u_ripple.z < 0.0) return 0.0;
  float r = u_ripple.z * speed;
  float d = length(px - u_ripple.xy);
  return exp(-pow((d - r) / width, 2.0)) * exp(-u_ripple.z * 1.6);
}
float spot(vec2 px, float radius) {
  vec2 d = px - u_mouse;
  return u_hover * exp(-dot(d, d) / (radius * radius));
}
const float BAYER[16] = float[](0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0, 3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0);

void main() {
  vec2 px = gl_FragCoord.xy / u_scale;
  float t = u_time;
  float I = u_intensity;
  vec3 col = u_bg;

  if (u_preset == 0) {
    // PRESS: ordered dither of drifting ink, with a bloom under the cursor
    vec2 uv = px / u_res.y;
    float n = fbm3(uv * 2.4 + vec2(t * 0.045, -t * 0.03));
    float v = smoothstep(0.42, 0.95, n) * 0.7;
    v += spot(px, 150.0) * (0.55 + 0.35 * u_energy);
    v += ripple(px, 520.0, 22.0) * 0.8;
    vec2 cell = floor(px / 2.0);
    int bi = int(mod(cell.y, 4.0)) * 4 + int(mod(cell.x, 4.0));
    float on = step(BAYER[bi] / 16.0 + 0.03, v * I);
    col = mix(u_bg, u_fg, on * 0.82);
  } else if (u_preset == 1) {
    // SATIN: domain-warped silk; crests catch a narrow highlight, the cursor pulls the cloth
    vec2 uv = (px - 0.5 * u_res) / u_res.y * 1.25;
    vec2 m = (u_mouse - 0.5 * u_res) / u_res.y * 1.25;
    vec2 dm = uv - m;
    float pull = u_hover * exp(-dot(dm, dm) * 3.5);
    uv -= dm * pull * 0.45;
    float tt = t * 0.22;
    for (int i = 1; i < 5; i++) {
      float fi = float(i);
      uv.x += 0.55 / fi * sin(fi * 2.3 * uv.y + tt + pull * 1.5);
      uv.y += 0.45 / fi * cos(fi * 1.6 * uv.x - tt * 0.8);
    }
    float phase = uv.x * 2.1 + uv.y * 0.7;
    float fold = 0.5 + 0.5 * sin(phase);
    float crest = pow(max(0.0, sin(phase + 0.7)), 22.0);
    float valley = pow(max(0.0, -sin(phase)), 3.0);
    vec3 silk = mix(u_bg, u_accent, 0.55);
    col = mix(u_bg, silk, fold * 0.7 * I);
    col = mix(col, mix(silk, u_fg, 0.55), valley * 0.28 * I);
    col = mix(col, mix(u_bg, vec3(1.0), 0.9), crest * 0.55 * I);
  } else if (u_preset == 2) {
    // RELIEF: an anti-aliased perspective mesh; the cursor raises a hill
    vec2 uv = px / u_res;
    float horizon = 0.62;
    float aspect = u_res.x / u_res.y;
    float depth = horizon - uv.y;
    if (depth > 0.0) {
      float z = 1.0 / depth;
      vec2 ground = vec2((uv.x - 0.5) * z * aspect, z * 0.6 + t * 0.7) * 1.8;
      float hill = 0.0;
      vec2 mUv = u_mouse / u_res;
      float mDepth = horizon - mUv.y;
      if (mDepth > 0.01) {
        float mz = 1.0 / mDepth;
        vec2 mg = vec2((mUv.x - 0.5) * mz * aspect, mz * 0.6 + t * 0.7) * 1.8;
        vec2 dg = ground - mg;
        hill = u_hover * exp(-dot(dg, dg) * 0.08);
      }
      float h = sin(ground.x * 0.45 + t * 0.6) * 0.35 + sin(ground.y * 0.32 - t * 0.4) * 0.3 + hill * 2.2;
      vec2 gc = vec2(ground.x, ground.y + h);
      vec2 gd = abs(fract(gc - 0.5) - 0.5) / max(fwidth(gc), vec2(1e-4));
      float line = 1.0 - min(min(gd.x, gd.y), 1.0);
      float fog = smoothstep(0.0, 0.45, depth);
      vec3 lineCol = mix(mix(u_fg, u_primary, 0.35), u_primary, clamp(hill * 1.5, 0.0, 1.0));
      col = mix(u_bg, lineCol, line * fog * 0.6 * I);
      col = mix(col, mix(u_bg, u_primary, 0.35), exp(-depth * 60.0) * 0.6 * I);
    } else {
      float glow = exp(depth * 9.0);
      col = mix(u_bg, mix(u_bg, u_primary, 0.4), glow * 0.45 * I);
    }
  } else if (u_preset == 3) {
    // DRAFT: a compass that tracks the cursor across a measured grid
    float minor = max(aa(abs(fract(px.x / 16.0 + 0.5) - 0.5) * 16.0, 0.5), aa(abs(fract(px.y / 16.0 + 0.5) - 0.5) * 16.0, 0.5));
    float major = max(aa(abs(fract(px.x / 80.0 + 0.5) - 0.5) * 80.0, 0.5), aa(abs(fract(px.y / 80.0 + 0.5) - 0.5) * 80.0, 0.5));
    float ink = max(minor * 0.06, major * 0.14);
    vec2 auto_ = u_res * vec2(0.68 + 0.08 * sin(t * 0.21), 0.52 + 0.06 * cos(t * 0.17));
    vec2 c = mix(auto_, u_mouse, u_hover);
    float R = min(u_res.x, u_res.y) * (0.26 + 0.03 * u_energy);
    vec2 d = px - c;
    float r = length(d);
    float ang = atan(d.y, d.x);
    ink = max(ink, aa(abs(r - R), 0.6) * 0.75);
    float dash = step(0.5, fract(ang * 9.549 - t * 0.35));
    ink = max(ink, aa(abs(r - R * 0.62), 0.5) * 0.45 * dash);
    ink = max(ink, aa(abs(r - R * 1.35), 0.5) * 0.22);
    ink = max(ink, aa(abs(d.x), 0.5) * 0.3);
    ink = max(ink, aa(abs(d.y), 0.5) * 0.3);
    float tick = step(0.5, fract(d.x / 8.0)) * step(abs(d.y), 6.0) * step(abs(d.x), R * 1.35);
    ink = max(ink, tick * 0.35);
    float tickY = step(0.5, fract(d.y / 8.0)) * step(abs(d.x), 6.0) * step(abs(d.y), R * 1.35);
    ink = max(ink, tickY * 0.35);
    float sweep = mod(t * 0.6, 6.2831853) - 3.14159265;
    float arc = aa(abs(r - R), 1.6) * step(abs(ang - sweep), 0.35);
    ink = max(ink, arc);
    ink = max(ink, aa(r, 2.5) * 0.9);
    col = mix(u_bg, u_fg, clamp(ink * I, 0.0, 1.0));
  } else {
    // SIGNAL: an LED dot field with a cursor spotlight
    float pitch = 14.0;
    vec2 id = floor(px / pitch);
    vec2 f = fract(px / pitch) - 0.5;
    vec2 center = (id + 0.5) * pitch;
    float wave = fbm3(id * 0.09 + vec2(t * 0.08, t * 0.05));
    float glow = smoothstep(0.45, 0.95, wave) * 0.55;
    vec2 d = center - u_mouse;
    float light = u_hover * exp(-dot(d, d) / (170.0 * 170.0));
    float rp = 0.0;
    if (u_ripple.z >= 0.0) {
      float dist = length(center - u_ripple.xy);
      rp = exp(-pow((dist - u_ripple.z * 420.0) / 28.0, 2.0)) * exp(-u_ripple.z * 1.4);
    }
    float b = clamp(glow + light * 0.9 + rp * 0.9 + 0.06, 0.0, 1.0);
    float radius = mix(0.12, 0.32, b);
    float dotMask = 1.0 - smoothstep(radius - 0.06, radius, length(f));
    // peaks brighten on dark backgrounds and deepen on light ones
    float bgLum = dot(u_bg, vec3(0.299, 0.587, 0.114));
    vec3 peak = bgLum > 0.5 ? mix(u_accent, u_fg, 0.45) : mix(u_accent, vec3(1.0), 0.6);
    vec3 ledCol = mix(u_accent, peak, smoothstep(0.7, 1.0, b));
    col = mix(u_bg, ledCol, dotMask * b * I);
  }

  col += (hash(gl_FragCoord.xy + t) - 0.5) * 0.008;
  outColor = vec4(col, 1.0);
}`

/** Resolves any CSS color (oklch, var-derived) to 0..1 RGB via a 1px canvas. */
function cssToRgb(color: string, ctx: CanvasRenderingContext2D): [number, number, number] {
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = "#000"
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return [r / 255, g / 255, b / 255]
}

type ShaderBackgroundProps = React.ComponentProps<"div"> & {
  /** Defaults to the preset that matches the nearest data-style (Raw: press, Silk: satin, Volume: relief, Vector: draft, Halo: signal). */
  preset?: ShaderPreset
  /** Animation speed multiplier. 0 renders a still frame. */
  speed?: number
  /** How strongly the pattern shows over the background, 0..1. */
  intensity?: number
  /** React to the pointer over the parent element. */
  interactive?: boolean
}

/**
 * A WebGL2 background that paints with the active style's tokens and reacts
 * to the pointer. It renders at a per-preset resolution, adapts resolution if
 * frames run long, pauses offscreen and in hidden tabs, renders a still frame
 * under reduced motion, and falls back to the plain background without WebGL2.
 */
function ShaderBackground({
  preset,
  speed = 1,
  intensity = 1,
  interactive = true,
  className,
  ...props
}: ShaderBackgroundProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    // A fresh canvas per mount: a released context can never be reused.
    const canvas = document.createElement("canvas")
    canvas.style.cssText = "display:block;width:100%;height:100%"
    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      if (process.env.NODE_ENV !== "production" && !gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("ShaderBackground:", gl.getShaderInfoLog(shader))
      }
      return shader
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)
    root.appendChild(canvas)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, "a_pos")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(program, name)
    const U = {
      res: u("u_res"), scale: u("u_scale"), time: u("u_time"), preset: u("u_preset"),
      bg: u("u_bg"), fg: u("u_fg"), accent: u("u_accent"), primary: u("u_primary"),
      mouse: u("u_mouse"), hover: u("u_hover"), energy: u("u_energy"), ripple: u("u_ripple"),
      intensity: u("u_intensity"),
    }

    let resolved: ShaderPreset = preset ?? "satin"
    const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!
    const readColors = () => {
      const cs = getComputedStyle(root)
      const scope = root.closest("[data-style]")?.getAttribute("data-style") ?? "raw"
      resolved = preset ?? STYLE_PRESET[scope] ?? "satin"
      gl.uniform1i(U.preset, PRESETS.indexOf(resolved))
      gl.uniform3fv(U.bg, cssToRgb(cs.getPropertyValue("--background").trim(), probe))
      gl.uniform3fv(U.fg, cssToRgb(cs.getPropertyValue("--foreground").trim(), probe))
      gl.uniform3fv(U.accent, cssToRgb(cs.getPropertyValue("--highlight").trim(), probe))
      gl.uniform3fv(U.primary, cssToRgb(cs.getPropertyValue("--primary").trim(), probe))
    }

    // Resolution: preset scale x capped DPR x adaptive quality.
    let quality = 1
    let width = 1
    let height = 1
    const resize = () => {
      const rect = root.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const scale = Math.min(window.devicePixelRatio || 1, 1.25) * PRESET_SCALE[resolved] * quality
      canvas.width = Math.max(1, Math.round(width * scale))
      canvas.height = Math.max(1, Math.round(height * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(U.res, width, height)
      gl.uniform1f(U.scale, canvas.width / width)
    }

    readColors()
    resize()

    // Pointer: a critically damped follow, eased presence and speed.
    const target = { x: width * 0.6, y: height * 0.5 }
    const mouse = { x: target.x, y: target.y }
    let hoverTarget = 0
    let hover = 0
    let energy = 0
    let time = 8
    let rippleAt = { x: 0, y: 0, start: -1 }
    const host = root.parentElement ?? root
    const toLocal = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: rect.height - (event.clientY - rect.top) }
    }
    const onMove = (event: PointerEvent) => {
      const p = toLocal(event)
      energy = Math.min(1, energy + Math.hypot(p.x - target.x, p.y - target.y) / 400)
      target.x = p.x
      target.y = p.y
      hoverTarget = 1
    }
    const onLeave = () => {
      hoverTarget = 0
    }
    const onDown = (event: PointerEvent) => {
      const p = toLocal(event)
      rippleAt = { x: p.x, y: p.y, start: time }
    }
    if (interactive) {
      host.addEventListener("pointermove", onMove, { passive: true })
      host.addEventListener("pointerleave", onLeave)
      host.addEventListener("pointerdown", onDown, { passive: true })
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    let visible = true
    let frame = 0
    let last = performance.now()
    let slowFrames = 0

    const draw = () => {
      gl.uniform1f(U.time, time)
      gl.uniform2f(U.mouse, mouse.x, mouse.y)
      gl.uniform1f(U.hover, hover)
      gl.uniform1f(U.energy, energy)
      gl.uniform3f(U.ripple, rippleAt.x, rippleAt.y, rippleAt.start < 0 ? -1 : time - rippleAt.start)
      gl.uniform1f(U.intensity, intensity)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      time += dt * speed
      const k = 1 - Math.exp(-dt * 7)
      mouse.x += (target.x - mouse.x) * k
      mouse.y += (target.y - mouse.y) * k
      hover += (hoverTarget - hover) * (1 - Math.exp(-dt * 4))
      energy *= Math.exp(-dt * 2.5)
      if (rippleAt.start >= 0 && time - rippleAt.start > 3) rippleAt.start = -1
      // Adaptive quality: sustained slow frames lower the render resolution.
      if (dt > 0.024) slowFrames++
      else slowFrames = Math.max(0, slowFrames - 1)
      if (slowFrames > 45 && quality > 0.5) {
        quality = Math.max(0.5, quality * 0.75)
        slowFrames = 0
        resize()
      }
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
    const themeWatch = new MutationObserver(() => {
      readColors()
      resize()
      draw()
    })
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-style"] })
    const onVisibility = () => start()
    document.addEventListener("visibilitychange", onVisibility)
    reduce.addEventListener("change", start)
    const onLost = (event: Event) => {
      event.preventDefault()
      cancelAnimationFrame(frame)
      canvas.style.visibility = "hidden"
    }
    canvas.addEventListener("webglcontextlost", onLost)

    return () => {
      cancelAnimationFrame(frame)
      resizer.disconnect()
      io.disconnect()
      themeWatch.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      reduce.removeEventListener("change", start)
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
      host.removeEventListener("pointerdown", onDown)
      canvas.removeEventListener("webglcontextlost", onLost)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
      canvas.remove()
    }
  }, [preset, speed, intensity, interactive])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-background", className)}
      {...props}
      data-slot="shader-background"
    />
  )
}

export { ShaderBackground, SHADER_PRESETS, STYLE_PRESET, type ShaderPreset }
