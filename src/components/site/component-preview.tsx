"use client"

import * as React from "react"
import {
  ArrowsOutSimpleIcon,
  ArrowCounterClockwiseIcon,
  ColumnsIcon,
  DesktopIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
} from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"
import { STYLE_META } from "@/lib/site-settings"
import { examples } from "@/examples/__index"
import { defaultValues, playgrounds, type Control, type Values } from "@/docs/playgrounds"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { DUMB_STYLES, StyleScope } from "@/components/ui/style-scope"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CodeFrame } from "@/components/site/code-frame"
import { useSiteSettings } from "@/components/site/settings-provider"
import { highlightJsx } from "@/components/site/highlight-jsx"

type Viewport = "fill" | "tablet" | "mobile"

const viewportWidth: Record<Exclude<Viewport, "fill">, number> = {
  tablet: 768,
  mobile: 390,
}

function ComponentPreview({
  name,
  code,
  codeHtml,
  playground,
  minHeight = "22rem",
  className,
}: {
  name: string
  code: string
  codeHtml: string
  playground?: string
  minHeight?: string
  className?: string
}) {
  const Example = examples[name]
  const pg = playground ? playgrounds[playground] : undefined
  const [values, setValues] = React.useState<Values>(() => (pg ? defaultValues(pg) : {}))
  const [compare, setCompare] = React.useState(false)
  const [viewport, setViewport] = React.useState<Viewport>("fill")
  const { style, resolvedTheme } = useSiteSettings()

  const content = pg ? pg.render(values) : Example ? <Example /> : null
  const liveCode = pg ? pg.code(values) : code
  const liveHtml = React.useMemo(() => (pg ? highlightJsx(liveCode) : codeHtml), [pg, liveCode, codeHtml])

  if (!Example && !pg) {
    return <p className="text-sm text-destructive">Example “{name}” not found.</p>
  }

  const stage = (
    <div
      className={cn(
        "site-canvas flex w-full items-center justify-center overflow-x-auto p-6 sm:p-10",
        compare && "p-0 sm:p-0"
      )}
      style={{ minHeight }}
    >
      {viewport !== "fill" ? (
        <ViewportFrame name={name} width={viewportWidth[viewport]} style={style} theme={resolvedTheme} />
      ) : compare ? (
        <div className="grid w-full self-stretch md:grid-cols-3">
          {DUMB_STYLES.map((value) => (
            <StyleScope
              key={value}
              name={value}
              className="site-canvas relative flex min-h-64 items-center justify-center border-border p-6 pt-12 not-last:border-b-(length:--du-rule) md:not-last:border-r-(length:--du-rule) md:not-last:border-b-0"
            >
              <span className="site-label absolute top-4 left-4 text-muted-foreground">
                {STYLE_META[value].label}
              </span>
              {content}
            </StyleScope>
          ))}
        </div>
      ) : (
        content
      )}
    </div>
  )

  return (
    <div
      data-slot="component-preview"
      className={cn(
        "overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-card shadow-(--du-shadow-surface)",
        className
      )}
    >
      <Tabs defaultValue="preview" className="gap-0">
        <div className="site-scroll-none flex items-center justify-between gap-2 overflow-x-auto border-b-(length:--du-rule) border-border p-2">
          <TabsList aria-label="View">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  aria-label="Compare all three styles"
                  pressed={compare}
                  onPressedChange={(on) => {
                    setCompare(on)
                    if (on) setViewport("fill")
                  }}
                >
                  <ColumnsIcon />
                  <span className="hidden sm:inline">Compare</span>
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Render in all three styles</TooltipContent>
            </Tooltip>
            <ToggleGroup
              type="single"
              size="sm"
              value={viewport}
              onValueChange={(value) => {
                if (!value) return
                setViewport(value as Viewport)
                if (value !== "fill") setCompare(false)
              }}
              aria-label="Viewport"
              className="hidden sm:flex"
            >
              <ToggleGroupItem value="fill" aria-label="Fill width">
                <DesktopIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="tablet" aria-label="Tablet, 768 pixels">
                <DeviceTabletIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="mobile" aria-label="Mobile, 390 pixels">
                <DeviceMobileIcon />
              </ToggleGroupItem>
            </ToggleGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" asChild>
                  <a href={`/view/${name}`} target="_blank" rel="noreferrer" aria-label="Open preview in a new tab">
                    <ArrowsOutSimpleIcon />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open in a new tab</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <TabsContent value="preview" className="min-w-0">
          {pg ? (
            <div className="grid lg:grid-cols-[minmax(0,1fr)_16rem]">
              {stage}
              <PlaygroundControls
                controls={pg.controls}
                values={values}
                onChange={setValues}
                onReset={() => setValues(defaultValues(pg))}
              />
            </div>
          ) : (
            stage
          )}
        </TabsContent>
        <TabsContent value="code" className="min-w-0">
          <CodeFrame
            html={liveHtml}
            raw={liveCode}
            className="rounded-none border-0 shadow-none"
            maxHeight="32rem"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ViewportFrame({
  name,
  width,
  style,
  theme,
}: {
  name: string
  width: number
  style: string
  theme: string
}) {
  return (
    <div className="flex w-full flex-col items-center gap-3 py-6">
      <div
        className="max-w-full resize-x overflow-hidden rounded-(--du-radius-overlay) border-(length:--du-border-surface) border-border bg-background shadow-(--du-shadow-overlay)"
        style={{ width }}
      >
        <iframe
          title={`${name} at ${width}px`}
          src={`/view/${name}?style=${style}&theme=${theme}`}
          loading="lazy"
          className="block h-[32rem] w-full"
        />
      </div>
      <span className="font-mono text-xs text-muted-foreground">
        {width}px · drag the corner to resize
      </span>
    </div>
  )
}

function PlaygroundControls({
  controls,
  values,
  onChange,
  onReset,
}: {
  controls: Control[]
  values: Values
  onChange: (values: Values) => void
  onReset: () => void
}) {
  const set = (name: string, value: Values[string]) => onChange({ ...values, [name]: value })

  return (
    <div className="grid content-start gap-4 border-t-(length:--du-rule) border-border bg-card p-4 lg:border-t-0 lg:border-l-(length:--du-rule)">
      <div className="flex items-center justify-between">
        <span className="site-label text-muted-foreground">Props</span>
        <Button variant="ghost" size="icon-sm" onClick={onReset} aria-label="Reset props">
          <ArrowCounterClockwiseIcon />
        </Button>
      </div>
      {controls.map((control) => {
        const id = `pg-control-${control.name}`
        switch (control.type) {
          case "select":
            return (
              <div key={control.name} className="grid gap-1.5">
                <Label htmlFor={id} className="font-mono">{control.name}</Label>
                <Select value={String(values[control.name])} onValueChange={(v) => set(control.name, v)}>
                  <SelectTrigger id={id} size="sm" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {control.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          case "boolean":
            return (
              <div key={control.name} className="flex items-center justify-between gap-3">
                <Label htmlFor={id} className="font-mono">{control.name}</Label>
                <Switch
                  id={id}
                  size="sm"
                  checked={Boolean(values[control.name])}
                  onCheckedChange={(v) => set(control.name, v)}
                />
              </div>
            )
          case "text":
            return (
              <div key={control.name} className="grid gap-1.5">
                <Label htmlFor={id} className="font-mono">{control.name}</Label>
                <Input
                  id={id}
                  className="h-(--du-h-sm)"
                  value={String(values[control.name])}
                  onChange={(e) => set(control.name, e.target.value)}
                />
              </div>
            )
          case "number":
            return (
              <div key={control.name} className="grid gap-2.5">
                <div className="flex items-center justify-between">
                  <Label id={id} className="font-mono">{control.name}</Label>
                  <span className="font-mono text-xs tabular-nums">{String(values[control.name])}</span>
                </div>
                <Slider
                  aria-labelledby={id}
                  min={control.min}
                  max={control.max}
                  step={control.step ?? 1}
                  value={[Number(values[control.name])]}
                  onValueChange={([v]) => set(control.name, v)}
                />
              </div>
            )
        }
      })}
    </div>
  )
}

export { ComponentPreview }
