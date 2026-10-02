"use client"

import {
  SHADER_PRESETS,
  ShaderBackground,
  type ShaderPreset,
} from "@/components/ui/shader-background"

const presets = Object.keys(SHADER_PRESETS) as ShaderPreset[]

export default function ShaderBackgroundGallery() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-2">
      {presets.map((preset, index) => (
        <figure
          key={preset}
          className={
            "relative isolate m-0 aspect-video overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border" +
            (index === 0 ? " sm:col-span-2" : "")
          }
        >
          <ShaderBackground preset={preset} className="-z-10" />
          <figcaption className="absolute bottom-3 left-3 grid gap-0.5 rounded-(--du-radius-item) bg-background/85 px-3 py-2 backdrop-blur-sm">
            <span className="du-display text-lg">{SHADER_PRESETS[preset].name}</span>
            <code className="font-mono text-[0.6875rem] text-muted-foreground">
              preset=&quot;{preset}&quot;
            </code>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
