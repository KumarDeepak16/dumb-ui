"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChatCircleTextIcon,
  CheckIcon,
  GitBranchIcon,
  GitMergeIcon,
  GlobeHemisphereWestIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/ssr"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { Gauge } from "@/components/ui/gauge"
import { Input } from "@/components/ui/input"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Progress } from "@/components/ui/progress"
import { Rating } from "@/components/ui/rating"
import { Separator } from "@/components/ui/separator"
import { ShaderBackground } from "@/components/ui/shader-background"
import { Slider } from "@/components/ui/slider"
import { Stepper } from "@/components/ui/stepper"
import { Textarea } from "@/components/ui/textarea"

/* ------------------------------------------------------------------ utils */

function Reveal({ className, delay = 0, ...props }: React.ComponentProps<"div"> & { delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [shown, setShown] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true) // eslint-disable-line react-hooks/set-state-in-effect
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      data-shown={shown || undefined}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "translate-y-6 opacity-0 transition-[opacity,translate] duration-700 ease-(--du-ease-out) data-shown:translate-y-0 data-shown:opacity-100",
        className
      )}
      {...props}
    />
  )
}

const container = "mx-auto w-full max-w-6xl px-5 sm:px-8"

/* ----------------------------------------------------------------- header */

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-(length:--du-rule) border-border bg-background/90 backdrop-blur-md">
      <div className={cn(container, "flex h-16 items-center gap-6")}>
        <a href="#top" className="flex items-center gap-2.5">
          <span className="inline-flex size-7 items-center justify-center rounded-(--du-radius-item) bg-primary text-primary-foreground">
            <RocketLaunchIcon weight="fill" className="size-4" />
          </span>
          <span className="du-display text-[1.0625rem]">1619 Deploy</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 text-sm md:flex">
          {["Product", "Workflow", "Pricing", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-(--du-radius-item) px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="sm">Start free</Button>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------- hero */

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <ShaderBackground intensity={0.6} className="-z-10 [mask-image:linear-gradient(to_left,black_20%,transparent_75%)]" />
      <div className={cn(container, "grid min-h-[calc(100dvh-4rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:py-20")}>
        <Reveal className="grid gap-7">
          <h1 className="du-display text-[2.75rem] leading-[1] text-balance sm:text-6xl lg:text-[4.25rem]">
            Ship the branch, not a screenshot.
          </h1>
          <p className="max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
            Every push becomes a live preview with checks and comments, so reviews happen on the real thing.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg">
              Start free
              <ArrowRightIcon weight="bold" />
            </Button>
            <Button size="lg" variant="outline" className="bg-background">
              See a live preview
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-md">
          <Card className="relative z-10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                feat/checkout
                <Badge variant="success">Ready</Badge>
              </CardTitle>
              <CardDescription className="flex items-center gap-1.5 font-mono text-xs">
                <GitBranchIcon /> 8f2c1a · 51s
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {[
                { label: "Type check", value: 100 },
                { label: "Unit tests", value: 100 },
                { label: "Lighthouse", value: 96 },
              ].map((check) => (
                <div key={check.label} className="grid gap-1.5">
                  <div className="flex justify-between text-sm">
                    <span id={`hero-${check.label}`}>{check.label}</span>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">{check.value}</span>
                  </div>
                  <Progress value={check.value} aria-labelledby={`hero-${check.label}`} />
                </div>
              ))}
              <div className="flex items-center justify-between pt-1">
                <AvatarGroup max={3}>
                  {["deepak", "lena", "ravi", "aditi"].map((who) => (
                    <Avatar key={who} className="size-8">
                      <AvatarImage src={`/avatars/${who}.svg`} alt={who} />
                      <AvatarFallback>{who.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
                <Button size="sm" variant="secondary">
                  <GitMergeIcon />
                  Merge
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="absolute -right-4 -bottom-10 z-20 hidden w-64 items-start gap-3 rounded-(--du-radius-overlay) border-(length:--du-border-overlay) border-border bg-popover p-3.5 shadow-(--du-shadow-overlay) sm:flex">
            <Avatar className="size-8">
              <AvatarImage src="/avatars/lena.svg" alt="Lena" />
              <AvatarFallback>LS</AvatarFallback>
            </Avatar>
            <p className="text-[0.8125rem] leading-snug">
              <span className="font-medium">Lena</span> commented on the button spacing.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ bento */

function Bento() {
  return (
    <section id="product" className={cn(container, "py-24 sm:py-32")}>
      <Reveal className="mb-12 grid max-w-2xl gap-3">
        <h2 className="du-display text-4xl leading-tight sm:text-5xl">Review on the real thing.</h2>
        <p className="text-lg text-muted-foreground">Previews, checks, comments and a fast global edge, in one place.</p>
      </Reveal>
      <div className="grid grid-flow-dense gap-4 md:grid-cols-4 md:grid-rows-[auto_auto]">
        <Reveal className="md:col-span-2 md:row-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>A preview for every push</CardTitle>
              <CardDescription>Branches deploy in under a minute, each on its own URL.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2.5">
              {[
                { branch: "main", msg: "Fix checkout rounding", status: "Ready" },
                { branch: "feat/silk", msg: "Silk style tokens", status: "Building" },
                { branch: "perf/edge", msg: "Cache headers for /r", status: "Ready" },
                { branch: "deps/radix", msg: "Bump radix-ui", status: "Failed" },
              ].map((row) => (
                <div key={row.branch} className="flex items-center gap-3 rounded-(--du-radius-field) border-(length:--du-rule) border-border px-3 py-2.5">
                  <GitBranchIcon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="grid min-w-0 flex-1">
                    <span className="truncate text-sm font-medium">{row.msg}</span>
                    <span className="font-mono text-xs text-muted-foreground">{row.branch}</span>
                  </span>
                  <Badge variant={row.status === "Ready" ? "success" : row.status === "Failed" ? "destructive" : "secondary"}>
                    {row.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={80}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheckIcon /> Checks that block
              </CardTitle>
            </CardHeader>
            <CardContent className="grid place-items-center">
              <Gauge value={97.4} label="checks passing" format={(v) => `${v.toFixed(1)}%`} tone="success" className="size-32" />
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={140}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChatCircleTextIcon /> Comments in place
              </CardTitle>
              <CardDescription>Pin feedback to the element, not a ticket.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea aria-label="Comment" defaultValue="Can this button breathe 4px more?" className="min-h-16" />
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative isolate h-full min-h-56 overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border shadow-(--du-shadow-surface)">
            <ShaderBackground preset="signal" className="-z-10" />
            <div className="absolute inset-x-4 bottom-4 grid gap-1 rounded-(--du-radius-item) bg-background/85 p-3 backdrop-blur-sm">
              <span className="flex items-center gap-2 font-medium">
                <GlobeHemisphereWestIcon /> Edge in 38 regions
              </span>
              <span className="text-xs text-muted-foreground">Move your pointer across the map.</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <Command className="h-full">
            <CommandInput placeholder="Jump to…" />
            <CommandList>
              <CommandGroup heading="Actions">
                <CommandItem>
                  <MagnifyingGlassIcon /> Find deployment
                  <CommandShortcut>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <GitMergeIcon /> Promote to production
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- workflow */

const steps = [
  { title: "Connect", description: "Link a repository", body: "Install the GitHub app, pick a repo, and we detect the framework. No config file to write." },
  { title: "Push", description: "Every branch builds", body: "Each push gets an immutable URL. Builds run in parallel and finish in under a minute." },
  { title: "Review", description: "Comment on the page", body: "Reviewers pin comments to elements on the live preview. Checks report inline." },
  { title: "Merge", description: "Promote with one click", body: "Merging promotes the exact build you reviewed. Rollbacks are one click too." },
]

function Workflow() {
  const [current, setCurrent] = React.useState(1)
  return (
    <section id="workflow" className="border-y-(length:--du-rule) border-border bg-sunken">
      <div className={cn(container, "grid gap-12 py-24 sm:py-32 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20")}>
        <Reveal className="grid content-start gap-4">
          <h2 className="du-display text-4xl leading-tight sm:text-5xl">From push to production in four steps.</h2>
          <p className="max-w-[40ch] text-lg text-muted-foreground">Click a step to see what happens.</p>
        </Reveal>
        <Reveal delay={120} className="grid content-start gap-10">
          <Stepper
            steps={steps.map(({ title, description }) => ({ title, description }))}
            current={current}
            onStepSelect={setCurrent}
          />
          <div className="grid gap-4 rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-card p-6 shadow-(--du-shadow-surface)">
            <span className="du-label text-muted-foreground">Step {Math.min(current, 3) + 1}</span>
            <p className="du-display text-2xl leading-snug">{steps[Math.min(current, 3)].body}</p>
            <div className="flex gap-2">
              <Button variant="ghost" disabled={current === 0} onClick={() => setCurrent((c) => Math.max(0, c - 1))}>
                Back
              </Button>
              <Button onClick={() => setCurrent((c) => (c >= 3 ? 0 : c + 1))}>{current >= 3 ? "Start over" : "Next step"}</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ testimonial */

function Testimonial() {
  return (
    <section className={cn(container, "py-24 sm:py-32")}>
      <Reveal className="mx-auto grid max-w-4xl gap-8">
        <Rating readOnly value={5} />
        <blockquote className="du-display text-3xl leading-[1.15] text-balance sm:text-[2.75rem]">
          “We stopped arguing over screenshots. Design review now happens on the branch, and it ships the same day.”
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <Avatar className="size-11">
            <AvatarImage src="/avatars/lena.svg" alt="Lena Sato" />
            <AvatarFallback>LS</AvatarFallback>
          </Avatar>
          <span className="grid">
            <span className="font-medium">Lena Sato</span>
            <span className="text-sm text-muted-foreground">Design lead, Fernhill Studio</span>
          </span>
        </figcaption>
      </Reveal>
    </section>
  )
}

/* ---------------------------------------------------------------- pricing */

function Pricing() {
  const [seats, setSeats] = React.useState([8])
  const total = seats[0] * 14
  return (
    <section id="pricing" className={cn(container, "pb-24 sm:pb-32")}>
      <Reveal className="mb-12 grid max-w-2xl gap-3">
        <h2 className="du-display text-4xl leading-tight sm:text-5xl">Free to start. Fair to grow.</h2>
        <p className="text-lg text-muted-foreground">Reviewers never count as seats.</p>
      </Reveal>
      <Reveal className="grid overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-card shadow-(--du-shadow-surface) lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="grid content-start gap-5 p-8">
          <span className="du-label text-muted-foreground">Hobby</span>
          <span className="du-display text-5xl">$0</span>
          <p className="text-muted-foreground">One project, unlimited previews, community support.</p>
          <Button variant="outline" className="w-fit">Start free</Button>
        </div>
        <div className="grid gap-6 border-t-(length:--du-rule) border-border p-8 lg:border-t-0 lg:border-l-(length:--du-rule)">
          <div className="flex items-start justify-between gap-4">
            <span className="du-label text-muted-foreground">Team</span>
            <Badge>Most teams</Badge>
          </div>
          <div className="flex items-baseline gap-2">
            <NumberTicker value={total} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} className="du-display text-5xl" />
            <span className="text-muted-foreground">/ month</span>
          </div>
          <div className="grid gap-3">
            <div className="flex justify-between text-sm">
              <span id="lp-seats">Seats</span>
              <span className="font-mono tabular-nums">{seats[0]}</span>
            </div>
            <Slider value={seats} onValueChange={setSeats} min={1} max={40} aria-labelledby="lp-seats" />
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {["Unlimited projects", "Required checks", "Comments and mentions", "SSO", "Audit log", "Priority support"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <CheckIcon weight="bold" className="size-4 text-primary" />
                {f}
              </li>
            ))}
          </ul>
          <Button className="w-fit">Start 14-day trial</Button>
        </div>
      </Reveal>
    </section>
  )
}

/* -------------------------------------------------------------------- faq */

function Faq() {
  return (
    <section id="faq" className={cn(container, "grid gap-10 pb-24 sm:pb-32 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]")}>
      <Reveal>
        <h2 className="du-display text-4xl leading-tight sm:text-5xl">Questions, answered.</h2>
      </Reveal>
      <Reveal delay={100}>
        <Accordion type="single" collapsible defaultValue="q0">
          {[
            ["Which frameworks work?", "Anything that builds to static files or a Node server: Next.js, Astro, Remix, Vite, SvelteKit."],
            ["Do reviewers need an account?", "No. Anyone with the link can view; commenting asks for a one-click sign in."],
            ["Can we self-host?", "Previews run on our edge. Enterprise plans can pin builds to a region for data residency."],
            ["What happens when we cancel?", "Previews stay up for 30 days so you can export comments. Then they are deleted."],
          ].map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

/* -------------------------------------------------------------------- cta */

function FinalCta() {
  const [loading, setLoading] = React.useState(false)
  return (
    <section className="relative isolate overflow-hidden border-t-(length:--du-rule) border-border">
      <ShaderBackground className="-z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-background via-background/70 to-background/30" />
      <div className={cn(container, "grid justify-items-start gap-8 py-28 sm:py-40")}>
        <h2 className="du-display max-w-3xl text-5xl leading-[1] text-balance sm:text-7xl">Your next review happens on a URL.</h2>
        <form
          className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault()
            setLoading(true)
            window.setTimeout(() => {
              setLoading(false)
              toast.success("Check your inbox", { description: "We sent a sign-in link." })
            }, 1200)
          }}
        >
          <Input type="email" required placeholder="you@company.com" aria-label="Work email" className="bg-background" />
          <Button type="submit" loading={loading}>Start free</Button>
        </form>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="border-t-(length:--du-rule) border-border">
      <div className={cn(container, "grid gap-10 py-14 sm:grid-cols-[1.4fr_repeat(3,1fr)]")}>
        <div className="grid content-start gap-3">
          <span className="du-display text-lg">1619 Deploy</span>
          <p className="max-w-[28ch] text-sm text-muted-foreground">Previews for every branch. Built with Dumb UI.</p>
        </div>
        {[
          ["Product", ["Previews", "Checks", "Comments", "Edge"]],
          ["Company", ["About", "Blog", "Careers"]],
          ["Legal", ["Privacy", "Terms"]],
        ].map(([title, links]) => (
          <div key={title as string} className="grid content-start gap-3">
            <span className="du-label text-muted-foreground">{title as string}</span>
            {(links as string[]).map((link) => (
              <a key={link} href="#" className="text-sm transition-colors hover:text-muted-foreground">
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
      <Separator />
      <div className={cn(container, "flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-muted-foreground")}>
        <span>© 2026 1619.in</span>
        <a href="https://ui.1619.in" className="inline-flex items-center gap-1 hover:text-foreground">
          Made with Dumb UI <ArrowUpRightIcon />
        </a>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------- page */

export default function LandingTemplate() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Bento />
        <Workflow />
        <Testimonial />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
