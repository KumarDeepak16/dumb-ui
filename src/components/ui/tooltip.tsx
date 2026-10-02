"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { usePortalContainer } from "@/components/ui/style-scope"

function TooltipProvider({
  delayDuration = 250,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      {...props}
      data-slot="tooltip-provider"
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 6,
  shortcut,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  /** Keyboard shortcut shown after the label, e.g. "⌘K". */
  shortcut?: React.ReactNode
}) {
  const container = usePortalContainer()

  return (
    <TooltipPrimitive.Portal container={container}>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 flex w-fit max-w-xs items-center gap-2 rounded-(--du-radius-tooltip) bg-(--du-tooltip-bg) px-2.5 py-1.5 text-xs text-balance text-(--du-tooltip-fg)",
          className
        )}
        {...props}
        data-slot="tooltip-content"
      >
        {children}
        {shortcut != null && (
          <kbd
            data-slot="tooltip-shortcut"
            className="font-mono text-[0.6875rem] tracking-normal normal-case opacity-60"
          >
            {shortcut}
          </kbd>
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
