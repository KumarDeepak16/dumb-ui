"use client"

import * as React from "react"

import { ShaderBackground, type ShaderPreset } from "@/components/ui/shader-background"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const presets: (ShaderPreset | "auto")[] = ["auto", "halftone", "blueprint", "contour", "aurora"]

export default function ShaderBackgroundDemo() {
  const [preset, setPreset] = React.useState<ShaderPreset | "auto">("auto")

  return (
    <div className="relative isolate flex min-h-80 w-full flex-col items-center justify-end overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border p-6">
      <ShaderBackground key={preset} preset={preset === "auto" ? undefined : preset} className="-z-10" />
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={preset}
        onValueChange={(v) => v && setPreset(v as ShaderPreset | "auto")}
        aria-label="Preset"
        className="bg-background"
      >
        {presets.map((p) => (
          <ToggleGroupItem key={p} value={p} className="capitalize">
            {p}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
