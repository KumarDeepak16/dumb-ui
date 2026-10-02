"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type TextareaProps = React.ComponentProps<"textarea"> & {
  /** Shows a live character counter. Uses `maxLength` as the limit when set. */
  showCount?: boolean
}

function Textarea({
  className,
  showCount = false,
  onChange,
  ...props
}: TextareaProps) {
  const counterId = React.useId()
  const [length, setLength] = React.useState(
    () => String(props.value ?? props.defaultValue ?? "").length
  )
  const currentLength =
    props.value !== undefined ? String(props.value).length : length

  const textarea = (
    <textarea
      aria-describedby={
        showCount
          ? cn(props["aria-describedby"], counterId)
          : props["aria-describedby"]
      }
      onChange={(event) => {
        setLength(event.currentTarget.value.length)
        onChange?.(event)
      }}
      className={cn(
        "flex field-sizing-content min-h-20 w-full rounded-(--du-radius-field) border-input bg-(--du-field-bg) px-3 py-2 text-base text-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        showCount && "pb-7",
        className
      )}
      {...props}
      data-slot="textarea"
    />
  )

  if (!showCount) return textarea

  const max = props.maxLength
  const over = max !== undefined && currentLength >= max

  return (
    <div data-slot="textarea-wrapper" className="relative w-full">
      {textarea}
      <span
        id={counterId}
        data-slot="textarea-count"
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute right-3 bottom-2 font-mono text-[0.6875rem] text-muted-foreground tabular-nums",
          over && "text-destructive"
        )}
      >
        {max !== undefined ? `${currentLength}/${max}` : currentLength}
      </span>
    </div>
  )
}

export { Textarea, type TextareaProps }
