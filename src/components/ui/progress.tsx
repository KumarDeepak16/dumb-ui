"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/** Pass `value={null}` (or omit it) for an indeterminate bar. */
function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const indeterminate = value == null

  return (
    <ProgressPrimitive.Root
      className={cn("relative w-full overflow-hidden", className)}
      value={value}
      {...props}
      data-slot="progress"
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1",
          indeterminate && "w-2/5 animate-[du-indeterminate_1.4s_var(--du-ease)_infinite]"
        )}
        style={
          indeterminate
            ? undefined
            : { transform: `translateX(-${100 - (value ?? 0)}%)` }
        }
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
