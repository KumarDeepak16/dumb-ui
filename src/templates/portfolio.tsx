"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react/ssr"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShaderBackground } from "@/components/ui/shader-background"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/*
 * "A portfolio with props." Deepak builds a component library, so the
 * portfolio reads like one, and visitors can re-skin it with that library.
 * Portrait lives in /public/portfolio; project and post photos are Pexels
 * demo images (free to use, no attribution required).
 */

const EMAIL = "deepak@1619.in"
const container = "mx-auto w-full max-w-6xl px-5 sm:px-8"

function pexels(id: number, width = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

function pexelsSet(id: number) {
  return `${pexels(id, 800)} 800w, ${pexels(id, 1400)} 1400w, ${pexels(id, 2000)} 2000w`
}

/* ------------------------------------------------------------------ hooks */

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function useInView<T extends HTMLElement>(margin = "0px 0px -10% 0px") {
  const ref = React.useRef<T>(null)
  const [inView, setInView] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setInView(true) // eslint-disable-line react-hooks/set-state-in-effect
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: margin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return [ref, inView] as const
}

/** Eases a 2D value toward a target on rAF; `apply` writes it to the DOM. */
function useLerp(apply: (x: number, y: number) => void, factor = 0.16) {
  const applyRef = React.useRef(apply)
  const state = React.useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 })
  React.useEffect(() => {
    applyRef.current = apply
  })
  React.useEffect(() => {
    const s = state.current
    return () => cancelAnimationFrame(s.raf)
  }, [])
  return React.useCallback(
    (tx: number, ty: number, snap = false) => {
      const s = state.current
      s.tx = tx
      s.ty = ty
      if (snap) {
        s.x = tx
        s.y = ty
      }
      const tick = () => {
        s.x += (s.tx - s.x) * factor
        s.y += (s.ty - s.y) * factor
        applyRef.current(s.x, s.y)
        s.raf = Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > 0.05 ? requestAnimationFrame(tick) : 0
      }
      if (!s.raf) s.raf = requestAnimationFrame(tick)
    },
    [factor]
  )
}

/** A label that trails the mouse. Hidden for touch and reduced motion. */
function useFollower() {
  const ref = React.useRef<HTMLDivElement>(null)
  const move = useLerp((x, y) => {
    if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }, 0.2)
  const handlers = {
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType !== "mouse" || prefersReducedMotion()) return
      move(event.clientX, event.clientY, true)
      ref.current?.setAttribute("data-active", "")
    },
    onPointerMove: (event: React.PointerEvent) => {
      if (event.pointerType === "mouse") move(event.clientX, event.clientY)
    },
    onPointerLeave: () => ref.current?.removeAttribute("data-active"),
  }
  return [ref, handlers] as const
}

function Reveal({ className, delay = 0, ...props }: React.ComponentProps<"div"> & { delay?: number }) {
  const [ref, shown] = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      data-shown={shown || undefined}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "translate-y-8 opacity-0 transition-[opacity,translate] duration-900 ease-(--du-ease-out) data-shown:translate-y-0 data-shown:opacity-100",
        className
      )}
      {...props}
    />
  )
}

/** Visitors can re-skin the page with Deepak's own library. */
function useDocumentStyle() {
  const [style, setStyle] = React.useState("raw")
  React.useEffect(() => {
    const read = () => setStyle(document.documentElement.getAttribute("data-style") ?? "raw")
    read()
    const mo = new MutationObserver(read)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-style"] })
    return () => mo.disconnect()
  }, [])
  const set = (next: string) => {
    document.documentElement.setAttribute("data-style", next)
    try {
      localStorage.setItem("dumb-style", next)
    } catch {}
  }
  return [style, set] as const
}

/* ------------------------------------------------------------- floating nav */

function FloatingNav() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="pointer-events-auto flex animate-[pf-drop_0.9s_var(--du-ease-out)_both] items-center gap-1 rounded-(--du-radius-control) border-(length:--du-border-overlay) border-border bg-popover/85 p-1.5 shadow-(--du-shadow-overlay) backdrop-blur-xl motion-reduce:animate-none"
      >
        <a
          href="#top"
          aria-label="Deepak Kumar, top of page"
          className="du-display inline-flex size-9 items-center justify-center rounded-(--du-radius-control) bg-primary text-sm text-primary-foreground transition-transform duration-500 ease-(--du-ease-out) hover:rotate-[-8deg]"
        >
          DK
        </a>
        {["Work", "About", "Writing"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hidden h-9 items-center rounded-(--du-radius-control) px-3.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:inline-flex"
          >
            {item}
          </a>
        ))}
        <Button size="sm" asChild className="ml-1">
          <a href="#contact">Say hello</a>
        </Button>
      </nav>
    </div>
  )
}

/* ------------------------------------------------------------------- hero */

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return text.split("").map((char, index) => (
    <span
      key={index}
      aria-hidden="true"
      style={{ animationDelay: `${150 + (offset + index) * 45}ms` }}
      className="inline-block animate-[pf-letter_1.1s_var(--du-ease-out)_both] transition-[translate] duration-500 ease-(--du-ease-out) hover:-translate-y-[0.08em] motion-reduce:animate-none"
    >
      {char}
    </span>
  ))
}

const chips = [
  { name: "role", value: '"design engineer"', className: "-left-6 top-10 sm:-left-16" },
  { name: "stack", value: '{["React", "TS", "GLSL"]}', className: "-right-4 top-1/3 sm:-right-24" },
  { name: "based", value: '"India"', className: "-left-4 bottom-24 sm:-left-20" },
  { name: "available", value: "", className: "-right-2 bottom-8 sm:-right-10" },
]

function Portrait() {
  const ref = React.useRef<HTMLDivElement>(null)
  const tilt = useLerp((x, y) => {
    ref.current?.style.setProperty("--rx", `${y}deg`)
    ref.current?.style.setProperty("--ry", `${x}deg`)
  }, 0.12)

  return (
    <div
      className="relative mx-auto w-full max-w-sm [perspective:1200px]"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || prefersReducedMotion()) return
        const box = event.currentTarget.getBoundingClientRect()
        tilt(((event.clientX - box.left) / box.width - 0.5) * 14, -((event.clientY - box.top) / box.height - 0.5) * 14)
      }}
      onPointerLeave={() => tilt(0, 0)}
    >
      <div
        ref={ref}
        className="relative animate-[pf-portrait_1.4s_var(--du-ease-out)_0.35s_both] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transform-style:preserve-3d] motion-reduce:animate-none"
      >
        <figure className="group/portrait relative m-0 overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-muted shadow-(--du-shadow-overlay)">
          <div className="group-hover/portrait:animate-[pf-glitch_0.45s_steps(1)_1] motion-reduce:animate-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portfolio/deepak-1080.webp"
              srcSet="/portfolio/deepak-640.webp 640w, /portfolio/deepak-1080.webp 1080w"
              sizes="(min-width: 1024px) 384px, 90vw"
              alt="Deepak Kumar in front of a television test pattern"
              fetchPriority="high"
              className="block aspect-[4/5] w-full animate-[pf-kenburns_18s_ease-in-out_infinite_alternate] object-cover object-[50%_35%] motion-reduce:animate-none"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-black/75 to-transparent p-4 pt-16 font-mono text-xs text-white/90">
            <span>Deepak Kumar</span>
            <span>New Delhi, IN</span>
          </figcaption>
        </figure>
        {chips.map((chip, index) => (
          <span
            key={chip.name}
            style={{ animationDelay: `${0.9 + index * 0.12}s, ${index * -1.3}s` }}
            className={cn(
              "absolute hidden animate-[pf-pop_0.7s_var(--du-ease-out)_both,pf-float_6s_ease-in-out_infinite] rounded-(--du-radius-item) border-(length:--du-border-overlay) border-border bg-popover px-3 py-1.5 font-mono text-xs whitespace-nowrap text-popover-foreground shadow-(--du-shadow-overlay) [transform:translateZ(60px)] motion-reduce:animate-none sm:block",
              chip.className
            )}
          >
            <span className="text-muted-foreground">{chip.name}</span>
            {chip.value ? (
              <>
                <span className="text-muted-foreground">=</span>
                <span>{chip.value}</span>
              </>
            ) : (
              <span className="ml-2 inline-block size-1.5 animate-pulse rounded-full bg-success align-middle" />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <ShaderBackground intensity={0.45} className="-z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className={cn(container, "grid items-center gap-14 pb-20 lg:min-h-[calc(100dvh-8rem)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]")}>
        <div className="grid gap-8">
          <span className="inline-flex animate-[pf-fade_0.8s_ease-out_both] items-center gap-2 font-mono text-sm text-muted-foreground motion-reduce:animate-none">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            Taking on two projects from November
          </span>
          <h1 aria-label="Deepak Kumar" className="du-display text-[3.4rem] leading-[0.95] sm:text-[5.5rem] lg:text-[7.25rem]">
            <span className="block">
              <Letters text="Deepak" />
            </span>
            <span className="block">
              <Letters text="Kumar" offset={6} />
            </span>
          </h1>
          <div className="grid animate-[pf-rise_1s_var(--du-ease-out)_0.7s_both] gap-6 motion-reduce:animate-none">
            <p className="max-w-[40ch] text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Design engineer at 1619.in. I design interfaces and then build them, so nothing gets lost in between.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#work">See the work</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-background">
                <a href="#contact">Start a project</a>
              </Button>
            </div>
          </div>
        </div>
        <Portrait />
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- ticker */

const skills = ["Design systems", "React", "TypeScript", "Accessibility", "WebGL", "Motion", "Tokens", "Next.js", "Radix", "Tailwind"]

function Ticker() {
  return (
    <div className="group overflow-hidden border-y-(length:--du-rule) border-border bg-sunken py-5" aria-label="Skills">
      <div className="flex w-max animate-[pf-marquee_40s_linear_infinite] gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...skills, ...skills].map((skill, i) => (
          <span key={i} aria-hidden={i >= skills.length || undefined} className="du-display flex items-center gap-10 text-2xl whitespace-nowrap text-muted-foreground">
            {skill}
            <span className="size-2 rotate-45 bg-(--highlight)" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- work */

const projects = [
  { title: "Dumb UI", kind: "Design system", year: "2026", image: 15764763, summary: "One component API, three visual languages. Tokens, a shadcn registry and a docs playground." },
  { title: "1619 Deploy", kind: "Product", year: "2025", image: 17323801, summary: "Preview environments for every branch, with comments pinned to the real page." },
  { title: "Atlas Status", kind: "Dashboard", year: "2025", image: 31650949, summary: "Uptime and error budgets for forty services, readable at a glance during an incident." },
  { title: "Fernhill Studio", kind: "Brand site", year: "2024", image: 4140941, summary: "A print studio's website that feels like the paper they sell." },
  { title: "Terrain", kind: "Data visualisation", year: "2024", image: 9544058, summary: "Elevation maps for trail planning, drawn on the GPU at sixty frames a second." },
]

function ProjectCard({ project, index, onActive }: { project: (typeof projects)[number]; index: number; onActive: (index: number) => void }) {
  const [ref, shown] = useInView<HTMLAnchorElement>("0px 0px -15% 0px")

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && onActive(index), { rootMargin: "-45% 0px -45% 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [index, onActive, ref])

  return (
    <a ref={ref} href="#" data-shown={shown || undefined} className="group/card grid gap-5">
      <div className="relative overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-muted shadow-(--du-shadow-surface) transition-[clip-path] duration-[1.4s] ease-(--du-ease-out) [clip-path:inset(10%_6%_10%_6%)] group-data-shown/card:[clip-path:inset(0)] motion-reduce:[clip-path:none]">
        <div className="pf-parallax absolute -inset-y-[8%] inset-x-0 scale-125 transition-[scale] duration-[1.6s] ease-(--du-ease-out) group-data-shown/card:scale-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pexels(project.image)}
            srcSet={pexelsSet(project.image)}
            sizes="(min-width: 1024px) 720px, 92vw"
            alt={`${project.title} cover`}
            loading="lazy"
            className="size-full object-cover saturate-[.85] transition-[scale,filter] duration-700 ease-(--du-ease-out) group-hover/card:scale-[1.05] group-hover/card:saturate-100"
          />
        </div>
        <div className="aspect-[3/2]" />
        <span className="absolute top-4 left-4 rounded-(--du-radius-item) bg-background/85 px-2.5 py-1 font-mono text-xs backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
        <h3 className="du-display text-3xl transition-transform duration-500 ease-(--du-ease-out) group-hover/card:translate-x-1.5">{project.title}</h3>
        <span className="flex items-center gap-2">
          <Badge variant="secondary">{project.kind}</Badge>
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        </span>
        <p className="max-w-[52ch] text-muted-foreground sm:col-span-2">{project.summary}</p>
      </div>
    </a>
  )
}

function Work() {
  const [active, setActive] = React.useState(0)
  const [follower, handlers] = useFollower()

  return (
    <section id="work" className={cn(container, "grid gap-12 py-24 sm:py-32 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-16")}>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal className="grid gap-4">
          <h2 className="du-display text-5xl leading-none sm:text-6xl">Selected work</h2>
          <p className="max-w-[30ch] text-muted-foreground">Five projects from the last three years. Each one shipped.</p>
          <div className="mt-6 hidden items-end gap-3 lg:flex" aria-hidden="true">
            <span className="du-display relative h-[1em] overflow-hidden text-8xl leading-none">
              <span key={active} className="block animate-[pf-count_0.6s_var(--du-ease-out)_both]">
                {String(active + 1).padStart(2, "0")}
              </span>
            </span>
            <span className="pb-2 font-mono text-sm text-muted-foreground">/ {String(projects.length).padStart(2, "0")}</span>
          </div>
          <span key={`t${active}`} className="hidden animate-[pf-fade_0.5s_ease-out_both] font-mono text-sm text-muted-foreground lg:block" aria-hidden="true">
            {projects[active].title}, {projects[active].year}
          </span>
        </Reveal>
      </div>
      <div className="grid gap-20" {...handlers}>
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} onActive={setActive} />
        ))}
      </div>
      <div ref={follower} aria-hidden="true" className="group/f pointer-events-none fixed top-0 left-0 z-40">
        <span className="flex size-24 -translate-1/2 scale-0 items-center justify-center gap-1 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-(--du-shadow-overlay) transition-[scale] duration-500 ease-(--du-ease-out) group-data-active/f:scale-100">
          View
          <ArrowUpRightIcon weight="bold" className="size-3.5" />
        </span>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- re-skin */

function Reskin() {
  const [style, setStyle] = useDocumentStyle()
  return (
    <section className="relative isolate overflow-hidden border-y-(length:--du-rule) border-border">
      <ShaderBackground className="-z-10" intensity={0.8} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background/60" />
      <div className={cn(container, "grid items-center gap-10 py-24 sm:py-28 lg:grid-cols-2")}>
        <Reveal className="grid gap-4">
          <h2 className="du-display text-4xl leading-tight sm:text-5xl">This site runs on my own library.</h2>
          <p className="max-w-[42ch] text-lg text-muted-foreground">Pick a material. Every button, field and surface on this page changes with it.</p>
        </Reveal>
        <Reveal delay={120} className="grid gap-6 justify-self-start rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-card p-6 shadow-(--du-shadow-surface) lg:justify-self-end">
          <ToggleGroup type="single" variant="outline" value={style} onValueChange={(value) => value && setStyle(value)} aria-label="Page style">
            <ToggleGroupItem value="raw">Raw</ToggleGroupItem>
            <ToggleGroupItem value="silk">Silk</ToggleGroupItem>
            <ToggleGroupItem value="volume">Volume</ToggleGroupItem>
          </ToggleGroup>
          <div className="flex items-center justify-between gap-6">
            <Label htmlFor="pf-demo-switch">Notify me about new work</Label>
            <Switch id="pf-demo-switch" defaultChecked />
          </div>
          <Button className="w-full" asChild>
            <a href="https://ui.1619.in">Get Dumb UI</a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ about */

const capabilities = {
  systems: ["Token architectures that survive rebrands", "Component APIs five teams can share", "Docs, registries and a release process"],
  engineering: ["React, Next.js and TypeScript in production", "Accessible primitives on Radix", "WebGL and shaders for the moments that matter"],
  product: ["From a rough flow to a shipped screen", "Prototypes on real data, not lorem ipsum", "Design review on the branch, not a screenshot"],
}

const roles = [
  { years: "2024 to now", role: "Design engineer", place: "1619.in" },
  { years: "2021 to 2024", role: "Front-end lead", place: "Fernhill Studio" },
  { years: "2019 to 2021", role: "UI engineer", place: "Atlas Maps" },
]

function About() {
  return (
    <section id="about" className={cn(container, "grid gap-16 py-24 sm:py-32 lg:grid-cols-2")}>
      <Reveal className="grid content-start gap-8">
        <h2 className="du-display text-4xl leading-tight sm:text-5xl">Design and code. One person, no handoff.</h2>
        <Tabs defaultValue="systems">
          <TabsList>
            <TabsTrigger value="systems">Systems</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="product">Product</TabsTrigger>
          </TabsList>
          {Object.entries(capabilities).map(([key, items]) => (
            <TabsContent key={key} value={key} className="pt-3">
              <ul className="grid gap-3.5">
                {items.map((item, index) => (
                  <li
                    key={item}
                    style={{ animationDelay: `${index * 70}ms` }}
                    className="flex animate-[pf-rise_0.6s_var(--du-ease-out)_both] items-start gap-3 text-[1.0625rem] motion-reduce:animate-none"
                  >
                    <CheckIcon weight="bold" className="mt-1 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </Reveal>
      <div className="grid content-start">
        <Reveal>
          <span className="du-label mb-6 block text-muted-foreground">Experience</span>
        </Reveal>
        {roles.map((role, index) => (
          <Reveal key={role.place} delay={index * 100}>
            {index > 0 && <Separator className="my-6" />}
            <div className="grid gap-1 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
              <span className="font-mono text-sm text-muted-foreground">{role.years}</span>
              <span className="grid">
                <span className="du-display text-2xl">{role.role}</span>
                <span className="text-muted-foreground">{role.place}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- writing */

const posts = [
  { title: "Dumb components, smart styles", date: "Oct 2026", read: "6 min", image: 4716292 },
  { title: "Tokens are an API. Version them like one.", date: "Aug 2026", read: "8 min", image: 92628 },
  { title: "What a shader taught me about frame budgets", date: "May 2026", read: "5 min", image: 30894683 },
]

function Writing() {
  const [hovered, setHovered] = React.useState(0)
  const [follower, handlers] = useFollower()

  return (
    <section id="writing" className={cn(container, "pb-24 sm:pb-32")}>
      <Reveal className="mb-6">
        <h2 className="du-display text-4xl sm:text-5xl">Writing</h2>
      </Reveal>
      <ul {...handlers}>
        {posts.map((post, index) => (
          <Reveal key={post.title} delay={index * 80}>
            <li onPointerEnter={() => setHovered(index)}>
              <a href="#" className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b-(length:--du-rule) border-border py-7">
                <span className="du-display flex-1 text-2xl transition-transform duration-500 ease-(--du-ease-out) group-hover:translate-x-2 sm:text-[2rem]">{post.title}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {post.date} · {post.read}
                </span>
                <ArrowUpRightIcon className="size-5 text-muted-foreground transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
      <div ref={follower} aria-hidden="true" className="group/f pointer-events-none fixed top-0 left-0 z-40">
        <div className="relative ml-6 aspect-[4/3] w-60 -translate-y-1/2 scale-50 -rotate-6 overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-overlay) border-border bg-muted opacity-0 shadow-(--du-shadow-overlay) transition-[scale,opacity,rotate] duration-500 ease-(--du-ease-out) group-data-active/f:scale-100 group-data-active/f:rotate-3 group-data-active/f:opacity-100">
          {posts.map((post, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={post.title}
              src={pexels(post.image, 500)}
              alt=""
              loading="lazy"
              className={cn("absolute inset-0 size-full object-cover transition-opacity duration-300", hovered === index ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- contact */

function Contact() {
  const [copied, setCopied] = React.useState(false)
  const [sending, setSending] = React.useState(false)
  const [mark, markShown] = useInView<HTMLDivElement>("0px")

  return (
    <section id="contact" className="overflow-hidden border-t-(length:--du-rule) border-border bg-sunken">
      <div className={cn(container, "grid gap-14 py-24 sm:py-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]")}>
        <Reveal className="grid content-start gap-8">
          <h2 className="du-display text-5xl leading-[0.95] sm:text-7xl">Have something to build?</h2>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(EMAIL)
                setCopied(true)
                window.setTimeout(() => setCopied(false), 1600)
              } catch {}
            }}
            className="group relative inline-flex w-fit cursor-pointer items-center gap-3 text-2xl sm:text-3xl"
          >
            <span className="relative">
              {EMAIL}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 origin-left bg-(--highlight) transition-transform duration-500 ease-(--du-ease-out) group-hover:scale-x-0" />
            </span>
            {copied ? <CheckIcon className="size-6" /> : <CopyIcon className="size-6 opacity-50 transition-opacity group-hover:opacity-100" />}
            <span className="sr-only" aria-live="polite">
              {copied ? "Copied" : ""}
            </span>
          </button>
          <div className="flex gap-2">
            {[
              { label: "GitHub", icon: GithubLogoIcon, href: "https://github.com/KumarDeepak16" },
              { label: "LinkedIn", icon: LinkedinLogoIcon, href: "#" },
              { label: "X", icon: XLogoIcon, href: "#" },
            ].map((link) => (
              <Button key={link.label} variant="outline" size="icon" asChild className="transition-transform hover:-translate-y-0.5">
                <a href={link.href} aria-label={link.label}>
                  <link.icon />
                </a>
              </Button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <form
            className="grid gap-4 rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-card p-6 shadow-(--du-shadow-surface) sm:p-8"
            onSubmit={(event) => {
              event.preventDefault()
              const form = event.currentTarget
              setSending(true)
              window.setTimeout(() => {
                setSending(false)
                toast.success("Message sent", { description: "I reply within two working days." })
                form.reset()
              }, 1200)
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="pf-name">Name</Label>
              <Input id="pf-name" required autoComplete="name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pf-email">Email</Label>
              <Input id="pf-email" type="email" required autoComplete="email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pf-message">Project</Label>
              <Textarea id="pf-message" required showCount maxLength={600} placeholder="What are you building, and by when?" />
            </div>
            <Button type="submit" loading={sending} className="w-full">
              Send message
            </Button>
          </form>
        </Reveal>
      </div>
      <div className={cn(container, "flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground")}>
        <span>© 2026 Deepak Kumar</span>
        <a href="https://ui.1619.in" className="hover:text-foreground">
          Built with Dumb UI
        </a>
      </div>
      <div ref={mark} data-shown={markShown || undefined} aria-hidden="true" className="group/mark mt-8 -mb-[0.22em] flex justify-center overflow-hidden px-2 select-none">
        {"DEEPAK".split("").map((char, index) => (
          <span
            key={index}
            style={{ transitionDelay: `${index * 60}ms` }}
            className="du-display inline-block translate-y-full text-[clamp(4rem,17vw,17rem)] leading-[0.8] text-foreground/90 transition-transform duration-1000 ease-(--du-ease-out) group-data-shown/mark:translate-y-0"
          >
            {char}
          </span>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- page */

const keyframes = `
@keyframes pf-letter { from { opacity: 0; transform: translateY(0.5em) rotate(8deg); filter: blur(8px) } to { opacity: 1; transform: none; filter: none } }
@keyframes pf-rise { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }
@keyframes pf-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes pf-drop { from { opacity: 0; transform: translateY(-140%) } to { opacity: 1; transform: none } }
@keyframes pf-pop { from { opacity: 0; scale: 0.6 } to { opacity: 1; scale: 1 } }
@keyframes pf-portrait { from { opacity: 0; translate: 0 60px; scale: 0.92 } to { opacity: 1; translate: 0 0; scale: 1 } }
@keyframes pf-glitch { 0% { translate: 0 0; filter: none } 20% { translate: -6px 2px; filter: hue-rotate(70deg) saturate(1.6) } 40% { translate: 5px -3px; filter: hue-rotate(-50deg) contrast(1.3) } 60% { translate: -3px 0; filter: hue-rotate(140deg) } 80% { translate: 2px 1px; filter: saturate(2) } 100% { translate: 0 0; filter: none } }
@keyframes pf-kenburns { from { scale: 1 } to { scale: 1.08 } }
@keyframes pf-float { 0%, 100% { translate: 0 0 } 50% { translate: 0 -8px } }
@keyframes pf-marquee { to { transform: translateX(-50%) } }
@keyframes pf-count { from { transform: translateY(100%) } to { transform: none } }
@keyframes pf-parallax { from { translate: 0 -6% } to { translate: 0 6% } }
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .pf-parallax { animation: pf-parallax linear both; animation-timeline: view(); }
  }
}
`

export default function PortfolioTemplate() {
  return (
    <div className="min-h-dvh overflow-x-clip bg-background text-foreground">
      <style>{keyframes}</style>
      <FloatingNav />
      <main>
        <Hero />
        <Ticker />
        <Work />
        <Reskin />
        <About />
        <Writing />
        <Contact />
      </main>
    </div>
  )
}
