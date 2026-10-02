"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  /** Shows each thumb's value above it: always, or only while hovered/dragged/focused. */
  showValue?: boolean | "interaction"
  /** Formats the displayed value and the thumb's aria-valuetext. */
  formatValue?: (value: number) => string
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  showValue = false,
  formatValue = String,
  onValueChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SliderProps) {
  const [internal, setInternal] = React.useState<number[]>(
    () => defaultValue ?? [min]
  )
  const values = value ?? internal

  return (
    <SliderPrimitive.Root
      data-show-value={showValue === false ? undefined : String(showValue)}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      onValueChange={(next) => {
        setInternal(next)
        onValueChange?.(next)
      }}
      className={cn(
        "group/slider relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        showValue !== false && "data-[orientation=horizontal]:mt-7",
        className
      )}
      {...props}
      data-slot="slider"
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderPrimitive.Track>
      {values.map((thumbValue, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          aria-label={
            ariaLabel && values.length > 1
              ? `${ariaLabel} ${index === 0 ? "minimum" : index === values.length - 1 ? "maximum" : index + 1}`
              : ariaLabel
          }
          aria-labelledby={ariaLabelledBy}
          aria-valuetext={formatValue(thumbValue)}
          className="group/thumb relative block shrink-0 cursor-grab active:cursor-grabbing disabled:pointer-events-none"
        >
          {showValue !== false && (
            <span
              data-slot="slider-value"
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-(--du-radius-tooltip) bg-(--du-tooltip-bg) px-1.5 py-0.5 font-mono text-[0.6875rem] whitespace-nowrap text-(--du-tooltip-fg) tabular-nums",
                showValue === "interaction" &&
                  "opacity-0 transition-opacity duration-(--du-dur-1) group-hover/thumb:opacity-100 group-focus-visible/thumb:opacity-100 group-active/thumb:opacity-100"
              )}
            >
              {formatValue(thumbValue)}
            </span>
          )}
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider, type SliderProps }
