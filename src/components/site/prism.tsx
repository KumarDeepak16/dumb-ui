"use client"

import * as React from "react"
import { CheckCircleIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"
import { STYLE_META, styleTrio } from "@/lib/site-settings"
import { useSiteSettings } from "@/components/site/settings-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { type DumbStyle } from "@/components/ui/style-scope"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type SceneState = {
  checks: boolean
  previews: boolean
  traffic: number[]
  tab: string
}

/**
 * The homepage piece: one product composition rendered three times, once per
 * style, stacked and clipped by two draggable seams. Seams move through CSS
 * variables on the stage, so dragging never re-renders React. State is shared,
 * so a switch flipped in one style is flipped in all three.
 */
function Prism() {
  const frameRef = React.useRef<HTMLDivElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const captions = React.useRef<(HTMLDivElement | null)[]>([])
  const handles = React.useRef<(HTMLDivElement | null)[]>([])
  const seams = React.useRef<[number, number]>([100 / 3, 200 / 3])
  const { style: siteStyle } = useSiteSettings()
  const trio = styleTrio(siteStyle)
  const [active, setActive] = React.useState<DumbStyle>("silk")
  const [state, setState] = React.useState<SceneState>({
    checks: true,
    previews: true,
    traffic: [35],
    tab: "build",
  })

  const apply = React.useCallback(() => {
    const frame = frameRef.current
    if (!frame) return
    const [a, b] = seams.current
    frame.style.setProperty("--seam-a", `${a}%`)
    frame.style.setProperty("--seam-b", `${b}%`)
    const widths = [a, b - a, 100 - b]
    captions.current.forEach((caption, i) => {
      caption?.toggleAttribute("data-narrow", widths[i] < 14)
    })
    handles.current.forEach((handle, i) => {
      handle?.setAttribute(
        "aria-valuenow",
        String(Math.round(seams.current[i]))
      )
    })
  }, [])

  const setSeam = React.useCallback(
    (index: 0 | 1, value: number) => {
      const [a, b] = seams.current
      const clamped =
        index === 0
          ? Math.min(Math.max(value, 0), b)
          : Math.max(Math.min(value, 100), a)
      seams.current = index === 0 ? [clamped, b] : [a, clamped]
      apply()
    },
    [apply]
  )

  // Opening sweep: all three styles fan out from the left edge.
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      apply()
      return
    }
    const target: [number, number] = [100 / 3, 200 / 3]
    const start = performance.now()
    const duration = 1400
    const ease = (t: number) => 1 - Math.pow(1 - t, 4)
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ta = ease(Math.min(t * 1.25, 1))
      const tb = ease(Math.max(t * 1.25 - 0.25, 0))
      seams.current = [
        target[0] * ta,
        target[0] * ta + (target[1] - target[0] * ta) * tb,
      ]
      apply()
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    seams.current = [0, 0]
    apply()
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [apply])

  const percentAt = (clientX: number) => {
    const rect = stageRef.current!.getBoundingClientRect()
    return ((clientX - rect.left) / rect.width) * 100
  }

  const onStageMove = (event: React.PointerEvent) => {
    const x = percentAt(event.clientX)
    const [a, b] = seams.current
    const next: DumbStyle = x < a ? trio[0] : x < b ? trio[1] : trio[2]
    if (next !== active) setActive(next)
  }

  return (
    <div
      ref={frameRef}
      className="relative flex w-full flex-col [--seam-a:33.333%] [--seam-b:66.666%]"
    >
      {/* Annotation band: what changes in each material, tied to its region. */}
      <div aria-hidden="true" className="relative h-20 shrink-0 sm:h-24">
        {trio.map((style, i) => (
          <div
            key={style}
            ref={(node) => {
              captions.current[i] = node
            }}
            className="site-annotation absolute bottom-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: regionCenter[i], ["--i" as string]: i }}
          >
            <span
              data-style={style}
              className="site-annotation-tag bg-transparent"
            >
              <span className="site-label whitespace-nowrap text-foreground">
                {STYLE_META[style].label}
              </span>
            </span>
            <span className="mt-1 hidden font-mono text-[0.6875rem] whitespace-nowrap text-muted-foreground sm:block">
              {SPECS[style]}
            </span>
            <span className="site-leader mt-2 h-5 w-px bg-foreground/40 sm:h-6" />
            <span className="size-1.5 translate-y-[3px] rounded-full bg-foreground" />
          </div>
        ))}
        {(["--seam-a", "--seam-b"] as const).map((v) => (
          <span
            key={v}
            className="site-seam-guide absolute top-0 bottom-0 w-px"
            style={{ left: `var(${v})` }}
          />
        ))}
      </div>

      <div className="relative min-h-0 flex-1">
        {/* Crop marks: a print-proof frame around the stage. */}
        {CROPS.map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={cn(
              "site-crop pointer-events-none absolute size-4 border-foreground/50",
              pos
            )}
          />
        ))}

        <div
          ref={stageRef}
          onPointerMove={onStageMove}
          className="relative isolate h-full min-h-[32rem] w-full overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border shadow-(--du-shadow-surface)"
        >
          {trio.map((style) => (
            <div
              key={style}
              data-style={style}
              inert={style !== active}
              className="site-canvas absolute inset-0 flex items-center justify-center overflow-hidden"
              style={{
                clipPath:
                  style === trio[0]
                    ? "inset(0 calc(100% - var(--seam-a)) 0 0)"
                    : style === trio[1]
                      ? "inset(0 calc(100% - var(--seam-b)) 0 var(--seam-a))"
                      : "inset(0 0 0 var(--seam-b))",
              }}
            >
              <Scene state={state} setState={setState} />
            </div>
          ))}

          {([0, 1] as const).map((index) => (
            <div
              key={index}
              ref={(node) => {
                handles.current[index] = node
              }}
              role="slider"
              tabIndex={0}
              aria-label={`Seam between ${STYLE_META[trio[index]].label} and ${STYLE_META[trio[index + 1]].label}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={index === 0 ? 33 : 67}
              onKeyDown={(event) => {
                const step = event.shiftKey ? 10 : 2
                const current = seams.current[index]
                if (event.key === "ArrowLeft" || event.key === "ArrowDown")
                  setSeam(index, current - step)
                else if (event.key === "ArrowRight" || event.key === "ArrowUp")
                  setSeam(index, current + step)
                else if (event.key === "Home") setSeam(index, 0)
                else if (event.key === "End") setSeam(index, 100)
                else return
                event.preventDefault()
              }}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId)
              }}
              onPointerMove={(event) => {
                if (!event.currentTarget.hasPointerCapture(event.pointerId))
                  return
                setSeam(index, percentAt(event.clientX))
              }}
              className="group absolute inset-y-0 z-20 -ml-5 flex w-10 cursor-ew-resize touch-none items-center justify-center outline-none"
              style={{ left: index === 0 ? "var(--seam-a)" : "var(--seam-b)" }}
            >
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-foreground/70" />
              <span className="relative flex h-11 w-[1.125rem] items-center justify-center gap-[3px] rounded-full bg-foreground shadow-[0_2px_8px_oklch(0_0_0/0.25)] ring-2 ring-background transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110 group-focus-visible:ring-(--highlight) group-active:scale-95">
                <span className="h-3.5 w-px bg-background/70" />
                <span className="h-3.5 w-px bg-background/70" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SPECS: Record<DumbStyle, string> = {
  raw: "0 radius / 2px rule / hard shadow",
  silk: "pill / soft shadow / squeeze",
  volume: "12px / 4px extrusion / lift",
  vector: "chamfer / line drawing / blueprint",
  halo: "10px / hairline / glow",
}

const regionCenter = [
  "calc(var(--seam-a) / 2)",
  "calc((var(--seam-a) + var(--seam-b)) / 2)",
  "calc((var(--seam-b) + 100%) / 2)",
]

const CROPS = [
  "-top-3 -left-3 border-t border-l",
  "-top-3 -right-3 border-t border-r",
  "-bottom-3 -left-3 border-b border-l",
  "-bottom-3 -right-3 border-b border-r",
] as const

function Scene({
  state,
  setState,
}: {
  state: SceneState
  setState: React.Dispatch<React.SetStateAction<SceneState>>
}) {
  const id = React.useId()
  return (
    <div className="grid w-full max-w-6xl items-center gap-6 px-6 py-16 md:grid-cols-3 md:px-10">
      <Card className="hidden w-full md:flex">
        <CardHeader>
          <CardTitle>Sign in to Dumb UI</CardTitle>
          <CardDescription>Use your work email.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor={`${id}-prism-email`}>Email</Label>
            <Input id={`${id}-prism-email`} placeholder="deepak@1619.in" />
          </div>
          <Button className="w-full">Continue</Button>
          <Separator label="or" />
          <Button variant="outline" className="w-full">
            <GithubLogoIcon />
            GitHub
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Deploy preview</CardTitle>
          <CardDescription>feat/checkout at 8f2c1a</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <Tabs
            value={state.tab}
            onValueChange={(tab) => setState((s) => ({ ...s, tab }))}
          >
            <TabsList className="w-full">
              <TabsTrigger value="build">Build</TabsTrigger>
              <TabsTrigger value="env">Env</TabsTrigger>
              <TabsTrigger value="domains">Domains</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor={`${id}-prism-checks`}>Run checks</Label>
            <Switch
              id={`${id}-prism-checks`}
              checked={state.checks}
              onCheckedChange={(checks) => setState((s) => ({ ...s, checks }))}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor={`${id}-prism-comments`}>Preview comments</Label>
            <Switch
              id={`${id}-prism-comments`}
              checked={state.previews}
              onCheckedChange={(previews) =>
                setState((s) => ({ ...s, previews }))
              }
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label id={`${id}-prism-traffic`}>Canary traffic</Label>
              <span className="font-mono text-xs tabular-nums">
                {state.traffic[0]}%
              </span>
            </div>
            <Slider
              aria-labelledby={`${id}-prism-traffic`}
              value={state.traffic}
              onValueChange={(traffic) => setState((s) => ({ ...s, traffic }))}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>

      <div className="hidden w-full gap-4 md:grid">
        <Alert variant="success">
          <CheckCircleIcon />
          <AlertTitle>Domain verified</AlertTitle>
          <AlertDescription>ui.1619.in is live.</AlertDescription>
        </Alert>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Build minutes
              <Badge variant={state.traffic[0] > 70 ? "warning" : "secondary"}>
                {state.traffic[0] > 70 ? "High" : "Team"}
              </Badge>
            </CardTitle>
            <CardDescription>4,760 of 6,000 used</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Progress value={79} aria-label="Build minutes used" />
            <div className="flex items-center justify-between">
              <AvatarGroup max={3}>
                <Avatar>
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>LS</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JT</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <Button size="sm" variant="secondary">
                Invite
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { Prism }
