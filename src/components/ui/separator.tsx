"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  label,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  /** Text set into a horizontal rule, e.g. "or" between sign-in methods. */
  label?: React.ReactNode
}) {
  if (label != null && orientation === "horizontal") {
    return (
      <div
        data-slot="separator-labelled"
        className={cn(
          "flex w-full items-center gap-3 text-xs text-muted-foreground",
          className
        )}
      >
        <SeparatorPrimitive.Root
          data-slot="separator"
          decorative
          orientation="horizontal"
          className="flex-1 bg-border"
        />
        <span data-slot="separator-label" className="shrink-0">
          {label}
        </span>
        <SeparatorPrimitive.Root
          data-slot="separator"
          decorative
          orientation="horizontal"
          className="flex-1 bg-border"
        />
      </div>
    )
  }

  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:w-full data-[orientation=vertical]:self-stretch",
        className
      )}
      {...props}
      data-slot="separator"
    />
  )
}

export { Separator }
