import * as React from "react"

import { cn } from "@/lib/utils"

// 270° arc on a 100-unit canvas, open at the bottom.
const ARC = "M 22.4 77.6 A 39 39 0 1 1 77.6 77.6"

type GaugeProps = Omit<React.ComponentProps<"div">, "children"> & {
  value: number
  min?: number
  max?: number
  /** Accessible name and caption under the number. */
  label: string
  /** Formats the number in the middle. */
  format?: (value: number) => string
  /** Color of the value arc; defaults to the style's primary. */
  tone?: "primary" | "success" | "warning" | "destructive"
}

/**
 * A radial meter. Stroke weight, caps and tick marks come from the style's
 * --du-gauge-* tokens; the value arc animates with the style's motion.
 */
function Gauge({
  value,
  min = 0,
  max = 100,
  label,
  format = (v) => String(Math.round(v)),
  tone = "primary",
  className,
  ...props
}: GaugeProps) {
  const clamped = Math.min(Math.max(value, min), max)
  const pct = ((clamped - min) / (max - min)) * 100
  const stroke = {
    strokeWidth: "var(--du-gauge-stroke)",
    strokeLinecap: "var(--du-gauge-cap)" as React.CSSProperties["strokeLinecap"],
  }

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={format(clamped)}
      className={cn("relative inline-grid size-40 place-items-center", className)}
      {...props}
      data-slot="gauge"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <path d={ARC} pathLength={100} fill="none" className="stroke-muted" style={stroke} />
        <path
          d={ARC}
          pathLength={100}
          fill="none"
          className="stroke-foreground"
          style={{
            strokeWidth: 1,
            strokeDasharray: "0.4 4.6",
            opacity: "calc(var(--du-gauge-ticks) * 0.35)",
            transform: "scale(0.82)",
            transformOrigin: "50% 50%",
          }}
        />
        <path
          d={ARC}
          pathLength={100}
          fill="none"
          data-slot="gauge-value"
          className={cn(
            tone === "primary" && "stroke-primary",
            tone === "success" && "stroke-success",
            tone === "warning" && "stroke-warning",
            tone === "destructive" && "stroke-destructive"
          )}
          style={{ ...stroke, strokeDasharray: `${pct} 100` }}
        />
      </svg>
      <span className="relative grid place-items-center gap-0.5 text-center">
        <span data-slot="gauge-number" className="text-[1.625rem] leading-none tabular-nums">
          {format(clamped)}
        </span>
        <span className="text-[0.6875rem] text-muted-foreground">{label}</span>
      </span>
    </div>
  )
}

export { Gauge, type GaugeProps }
