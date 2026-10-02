"use client"

import * as React from "react"
import { ArrowRightIcon, InfoIcon } from "@phosphor-icons/react/ssr"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export type Control =
  | { type: "select"; name: string; options: string[]; default: string }
  | { type: "boolean"; name: string; default: boolean }
  | { type: "text"; name: string; default: string }
  | { type: "number"; name: string; default: number; min: number; max: number; step?: number }

export type Values = Record<string, string | number | boolean>

export type Playground = {
  controls: Control[]
  render: (v: Values) => React.ReactNode
  code: (v: Values) => string
}

/** Prop string helper: omits defaults so generated code stays minimal. */
function attrs(pairs: [string, unknown, unknown?][]) {
  return pairs
    .filter(([, value, fallback]) => value !== fallback && value !== "" && value !== undefined)
    .map(([key, value]) =>
      value === true ? ` ${key}` : typeof value === "string" ? ` ${key}="${value}"` : ` ${key}={${String(value)}}`
    )
    .join("")
}

const s = (v: unknown) => String(v)

export const playgrounds: Record<string, Playground> = {
  button: {
    controls: [
      { type: "select", name: "variant", options: ["default", "secondary", "outline", "ghost", "destructive", "link"], default: "default" },
      { type: "select", name: "size", options: ["sm", "default", "lg"], default: "default" },
      { type: "text", name: "children", default: "Continue" },
      { type: "boolean", name: "icon", default: true },
      { type: "boolean", name: "loading", default: false },
      { type: "boolean", name: "disabled", default: false },
    ],
    render: (v) => (
      <Button
        variant={s(v.variant) as "default"}
        size={s(v.size) as "default"}
        loading={Boolean(v.loading)}
        disabled={Boolean(v.disabled)}
      >
        {s(v.children)}
        {v.icon ? <ArrowRightIcon weight="bold" /> : null}
      </Button>
    ),
    code: (v) =>
      `<Button${attrs([["variant", v.variant, "default"], ["size", v.size, "default"], ["loading", v.loading, false], ["disabled", v.disabled, false]])}>\n  ${s(v.children)}${v.icon ? "\n  <ArrowRightIcon />" : ""}\n</Button>`,
  },
  badge: {
    controls: [
      { type: "select", name: "variant", options: ["default", "secondary", "outline", "success", "warning", "destructive"], default: "success" },
      { type: "text", name: "children", default: "Live" },
      { type: "boolean", name: "removable", default: false },
    ],
    render: (v) => (
      <Badge variant={s(v.variant) as "default"} onRemove={v.removable ? () => {} : undefined}>
        {s(v.children)}
      </Badge>
    ),
    code: (v) =>
      `<Badge${attrs([["variant", v.variant, "default"]])}${v.removable ? " onRemove={() => remove()}" : ""}>${s(v.children)}</Badge>`,
  },
  input: {
    controls: [
      { type: "text", name: "placeholder", default: "deepak@1619.in" },
      { type: "text", name: "leading", default: "" },
      { type: "text", name: "trailing", default: "" },
      { type: "boolean", name: "invalid", default: false },
      { type: "boolean", name: "disabled", default: false },
    ],
    render: (v) => (
      <div className="grid w-full max-w-sm gap-2">
        <Label htmlFor="pg-input">Email</Label>
        <Input
          id="pg-input"
          placeholder={s(v.placeholder)}
          leading={v.leading ? s(v.leading) : undefined}
          trailing={v.trailing ? s(v.trailing) : undefined}
          aria-invalid={v.invalid ? true : undefined}
          disabled={Boolean(v.disabled)}
        />
      </div>
    ),
    code: (v) =>
      `<Input${attrs([["placeholder", v.placeholder], ["leading", v.leading], ["trailing", v.trailing], ["aria-invalid", v.invalid, false], ["disabled", v.disabled, false]])} />`,
  },
  textarea: {
    controls: [
      { type: "text", name: "placeholder", default: "What changed?" },
      { type: "boolean", name: "showCount", default: true },
      { type: "number", name: "maxLength", default: 140, min: 20, max: 500, step: 10 },
    ],
    render: (v) => (
      <Textarea
        className="max-w-md"
        aria-label="Notes"
        placeholder={s(v.placeholder)}
        showCount={Boolean(v.showCount)}
        maxLength={Number(v.maxLength)}
      />
    ),
    code: (v) =>
      `<Textarea${attrs([["placeholder", v.placeholder], ["showCount", v.showCount, false], ["maxLength", v.maxLength]])} />`,
  },
  switch: {
    controls: [
      { type: "select", name: "size", options: ["default", "sm"], default: "default" },
      { type: "boolean", name: "defaultChecked", default: true },
      { type: "boolean", name: "disabled", default: false },
    ],
    render: (v) => (
      <div className="flex items-center gap-3">
        <Switch
          key={String(v.defaultChecked)}
          id="pg-switch"
          size={s(v.size) as "default"}
          defaultChecked={Boolean(v.defaultChecked)}
          disabled={Boolean(v.disabled)}
        />
        <Label htmlFor="pg-switch">Deploy previews</Label>
      </div>
    ),
    code: (v) =>
      `<Switch${attrs([["size", v.size, "default"], ["defaultChecked", v.defaultChecked, false], ["disabled", v.disabled, false]])} />`,
  },
  checkbox: {
    controls: [
      { type: "select", name: "checked", options: ["false", "true", "indeterminate"], default: "true" },
      { type: "boolean", name: "disabled", default: false },
    ],
    render: (v) => (
      <div className="flex items-center gap-3">
        <Checkbox
          id="pg-checkbox"
          checked={v.checked === "indeterminate" ? "indeterminate" : v.checked === "true"}
          disabled={Boolean(v.disabled)}
        />
        <Label htmlFor="pg-checkbox">Notify the team</Label>
      </div>
    ),
    code: (v) =>
      `<Checkbox checked=${v.checked === "indeterminate" ? `"indeterminate"` : `{${v.checked}}`}${attrs([["disabled", v.disabled, false]])} />`,
  },
  slider: {
    controls: [
      { type: "number", name: "value", default: 40, min: 0, max: 100 },
      { type: "number", name: "step", default: 1, min: 1, max: 25 },
      { type: "select", name: "showValue", options: ["false", "true", "interaction"], default: "true" },
      { type: "boolean", name: "disabled", default: false },
    ],
    render: (v) => (
      <Slider
        key={`${v.value}-${v.step}`}
        className="max-w-sm"
        aria-label="Volume"
        defaultValue={[Number(v.value)]}
        step={Number(v.step)}
        showValue={v.showValue === "interaction" ? "interaction" : v.showValue === "true"}
        formatValue={(n) => `${n}%`}
        disabled={Boolean(v.disabled)}
      />
    ),
    code: (v) =>
      `<Slider\n  defaultValue={[${v.value}]}${Number(v.step) !== 1 ? `\n  step={${v.step}}` : ""}${v.showValue !== "false" ? `\n  showValue${v.showValue === "interaction" ? `="interaction"` : ""}` : ""}\n  formatValue={(n) => \`\${n}%\`}${v.disabled ? "\n  disabled" : ""}\n/>`,
  },
  progress: {
    controls: [
      { type: "number", name: "value", default: 64, min: 0, max: 100 },
      { type: "boolean", name: "indeterminate", default: false },
    ],
    render: (v) => (
      <Progress
        className="max-w-sm"
        aria-label="Progress"
        value={v.indeterminate ? null : Number(v.value)}
      />
    ),
    code: (v) => `<Progress value={${v.indeterminate ? "null" : v.value}} />`,
  },
  alert: {
    controls: [
      { type: "select", name: "variant", options: ["default", "success", "warning", "destructive"], default: "default" },
      { type: "text", name: "title", default: "Build minutes reset on the 1st" },
      { type: "boolean", name: "icon", default: true },
      { type: "boolean", name: "dismissible", default: false },
    ],
    render: (v) => (
      <Alert
        className="max-w-md"
        variant={s(v.variant) as "default"}
        onDismiss={v.dismissible ? () => {} : undefined}
      >
        {v.icon ? <InfoIcon /> : null}
        <AlertTitle>{s(v.title)}</AlertTitle>
        <AlertDescription>You have 1,240 of 6,000 minutes left.</AlertDescription>
      </Alert>
    ),
    code: (v) =>
      `<Alert${attrs([["variant", v.variant, "default"]])}${v.dismissible ? " onDismiss={hide}" : ""}>${v.icon ? "\n  <InfoIcon />" : ""}\n  <AlertTitle>${s(v.title)}</AlertTitle>\n  <AlertDescription>You have 1,240 of 6,000 minutes left.</AlertDescription>\n</Alert>`,
  },
  card: {
    controls: [
      { type: "text", name: "title", default: "Deploy preview" },
      { type: "boolean", name: "interactive", default: false },
      { type: "boolean", name: "footer", default: true },
    ],
    render: (v) => (
      <Card className="w-full max-w-sm" interactive={Boolean(v.interactive)}>
        <CardHeader>
          <CardTitle>{s(v.title)}</CardTitle>
          <CardDescription>Every branch gets its own URL.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          38 previews this week, median build 51s.
        </CardContent>
        {v.footer ? (
          <CardFooter className="justify-end">
            <Button size="sm">Open</Button>
          </CardFooter>
        ) : null}
      </Card>
    ),
    code: (v) =>
      `<Card${attrs([["interactive", v.interactive, false]])}>\n  <CardHeader>\n    <CardTitle>${s(v.title)}</CardTitle>\n    <CardDescription>Every branch gets its own URL.</CardDescription>\n  </CardHeader>\n  <CardContent>38 previews this week, median build 51s.</CardContent>${v.footer ? `\n  <CardFooter>\n    <Button size="sm">Open</Button>\n  </CardFooter>` : ""}\n</Card>`,
  },
  avatar: {
    controls: [
      { type: "select", name: "status", options: ["none", "online", "away", "busy", "offline"], default: "online" },
      { type: "boolean", name: "image", default: true },
      { type: "text", name: "fallback", default: "DK" },
    ],
    render: (v) => (
      <Avatar status={v.status === "none" ? undefined : (s(v.status) as "online")}>
        {v.image ? <AvatarImage src="/avatars/deepak.svg" alt="Deepak Kumar" /> : null}
        <AvatarFallback>{s(v.fallback)}</AvatarFallback>
      </Avatar>
    ),
    code: (v) =>
      `<Avatar${v.status !== "none" ? ` status="${v.status}"` : ""}>${v.image ? `\n  <AvatarImage src="/avatars/deepak.svg" alt="Deepak Kumar" />` : ""}\n  <AvatarFallback>${s(v.fallback)}</AvatarFallback>\n</Avatar>`,
  },
  tabs: {
    controls: [
      { type: "number", name: "tabs", default: 3, min: 2, max: 5 },
      { type: "boolean", name: "fullWidth", default: false },
    ],
    render: (v) => {
      const names = ["Overview", "Logs", "Settings", "Domains", "Usage"].slice(0, Number(v.tabs))
      return (
        <Tabs defaultValue="Overview" className="w-full max-w-md">
          <TabsList className={v.fullWidth ? "w-full" : undefined}>
            {names.map((n) => (
              <TabsTrigger key={n} value={n}>
                {n}
              </TabsTrigger>
            ))}
          </TabsList>
          {names.map((n) => (
            <TabsContent key={n} value={n} className="text-sm text-muted-foreground">
              {n} panel.
            </TabsContent>
          ))}
        </Tabs>
      )
    },
    code: (v) => {
      const names = ["Overview", "Logs", "Settings", "Domains", "Usage"].slice(0, Number(v.tabs))
      return `<Tabs defaultValue="overview">\n  <TabsList${v.fullWidth ? ` className="w-full"` : ""}>\n${names.map((n) => `    <TabsTrigger value="${n.toLowerCase()}">${n}</TabsTrigger>`).join("\n")}\n  </TabsList>\n</Tabs>`
    },
  },
  toggle: {
    controls: [
      { type: "select", name: "variant", options: ["default", "outline"], default: "outline" },
      { type: "select", name: "size", options: ["sm", "default", "lg"], default: "default" },
      { type: "boolean", name: "defaultPressed", default: true },
    ],
    render: (v) => (
      <Toggle
        key={String(v.defaultPressed)}
        aria-label="Bold"
        variant={s(v.variant) as "default"}
        size={s(v.size) as "default"}
        defaultPressed={Boolean(v.defaultPressed)}
      >
        Bold
      </Toggle>
    ),
    code: (v) =>
      `<Toggle${attrs([["variant", v.variant, "default"], ["size", v.size, "default"], ["defaultPressed", v.defaultPressed, false]])}>Bold</Toggle>`,
  },
  separator: {
    controls: [{ type: "text", name: "label", default: "or" }],
    render: (v) => (
      <div className="w-full max-w-xs">
        <Separator label={v.label ? s(v.label) : undefined} />
      </div>
    ),
    code: (v) => `<Separator${attrs([["label", v.label]])} />`,
  },
  skeleton: {
    controls: [
      { type: "number", name: "lines", default: 3, min: 1, max: 6 },
      { type: "boolean", name: "avatar", default: true },
    ],
    render: (v) => (
      <div className="flex w-full max-w-sm gap-3">
        {v.avatar ? <Skeleton className="size-10 shrink-0 rounded-(--du-radius-avatar)" /> : null}
        <div className="grid flex-1 gap-2">
          {Array.from({ length: Number(v.lines) }, (_, i) => (
            <Skeleton key={i} className="h-3" style={{ width: `${90 - i * 14}%` }} />
          ))}
        </div>
      </div>
    ),
    code: (v) =>
      `${v.avatar ? `<Skeleton className="size-10 rounded-full" />\n` : ""}${Array.from({ length: Number(v.lines) }, () => `<Skeleton className="h-3 w-4/5" />`).join("\n")}`,
  },
  spinner: {
    controls: [{ type: "number", name: "size", default: 24, min: 12, max: 64, step: 4 }],
    render: (v) => <Spinner style={{ width: Number(v.size), height: Number(v.size) }} />,
    code: (v) => `<Spinner className="size-[${v.size}px]" />`,
  },
  kbd: {
    controls: [{ type: "text", name: "keys", default: "⌘ K" }],
    render: (v) => (
      <span className="inline-flex gap-1">
        {s(v.keys)
          .split(" ")
          .filter(Boolean)
          .map((k, i) => (
            <Kbd key={i}>{k}</Kbd>
          ))}
      </span>
    ),
    code: (v) =>
      `<KbdGroup>\n${s(v.keys).split(" ").filter(Boolean).map((k) => `  <Kbd>${k}</Kbd>`).join("\n")}\n</KbdGroup>`,
  },
  tooltip: {
    controls: [
      { type: "select", name: "side", options: ["top", "right", "bottom", "left"], default: "top" },
      { type: "text", name: "label", default: "Copy link" },
      { type: "text", name: "shortcut", default: "⌘C" },
    ],
    render: (v) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side={s(v.side) as "top"} shortcut={v.shortcut ? s(v.shortcut) : undefined}>
          {s(v.label)}
        </TooltipContent>
      </Tooltip>
    ),
    code: (v) =>
      `<Tooltip>\n  <TooltipTrigger asChild>\n    <Button variant="outline">Hover me</Button>\n  </TooltipTrigger>\n  <TooltipContent${attrs([["side", v.side, "top"], ["shortcut", v.shortcut]])}>${s(v.label)}</TooltipContent>\n</Tooltip>`,
  },
}

export function defaultValues(playground: Playground): Values {
  return Object.fromEntries(playground.controls.map((c) => [c.name, c.default]))
}
