"use client"

import * as React from "react"

import { Gauge } from "@/components/ui/gauge"
import { Slider } from "@/components/ui/slider"

export default function GaugeDemo() {
  const [load, setLoad] = React.useState([64])

  return (
    <div className="grid w-full max-w-xl justify-items-center gap-8">
      <div className="flex flex-wrap justify-center gap-6">
        <Gauge value={load[0]} label="CPU load" format={(v) => `${Math.round(v)}%`} tone={load[0] > 85 ? "destructive" : "primary"} />
        <Gauge value={99.2} min={95} max={100} label="Uptime" format={(v) => `${v.toFixed(1)}%`} tone="success" />
        <Gauge value={412} max={600} label="ms p95" tone="warning" />
      </div>
      <Slider
        className="max-w-xs"
        value={load}
        onValueChange={setLoad}
        aria-label="CPU load"
        formatValue={(v) => `${v}%`}
      />
    </div>
  )
}
