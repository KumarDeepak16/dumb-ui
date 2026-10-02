"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function SliderDemo() {
  const [value, setValue] = React.useState([62])

  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex items-center justify-between">
        <Label id="slider-traffic-label">Traffic to canary</Label>
        <span className="font-mono text-sm tabular-nums">{value[0]}%</span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
        aria-labelledby="slider-traffic-label"
        formatValue={(v) => `${v}%`}
      />
    </div>
  )
}
