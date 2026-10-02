"use client"

import * as React from "react"

import {
  SHADER_PRESETS,
  ShaderBackground,
  type ShaderPreset,
} from "@/components/ui/shader-background"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const presets = Object.keys(SHADER_PRESETS) as ShaderPreset[]

export default function ShaderBackgroundDemo() {
  const [preset, setPreset] = React.useState<ShaderPreset>("satin")
  const meta = SHADER_PRESETS[preset]

  return (
    <div className="grid w-full gap-4">
      <div className="relative isolate aspect-video w-full overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border">
        <ShaderBackground key={preset} preset={preset} className="-z-10" />
        <div className="absolute bottom-4 left-4 grid max-w-[calc(100%-2rem)] gap-1 rounded-(--du-radius-overlay) bg-background/85 px-4 py-3 backdrop-blur-sm sm:bottom-6 sm:left-6">
          <span className="du-display text-2xl sm:text-3xl">{meta.name}</span>
          <span className="max-w-[40ch] text-sm text-muted-foreground">
            {meta.description}
          </span>
        </div>
      </div>
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={preset}
        onValueChange={(v) => v && setPreset(v as ShaderPreset)}
        aria-label="Shader preset"
        className="site-scroll-none max-w-full justify-self-center overflow-x-auto"
      >
        {presets.map((p) => (
          <ToggleGroupItem key={p} value={p}>
            {SHADER_PRESETS[p].name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
