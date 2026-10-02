"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export default function ProgressDemo() {
  const [value, setValue] = React.useState(18)

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setValue((v) => (v >= 100 ? 12 : Math.min(100, v + 7)))
    }, 900)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="grid w-full max-w-sm gap-2.5">
      <div className="flex items-center justify-between text-sm">
        <span id="progress-upload-label">Uploading assets</span>
        <span className="font-mono text-muted-foreground tabular-nums">{value}%</span>
      </div>
      <Progress value={value} aria-labelledby="progress-upload-label" />
    </div>
  )
}
