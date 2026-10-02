"use client"

import * as React from "react"
import { XIcon } from "@phosphor-icons/react/ssr"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { usePortalContainer } from "@/components/ui/style-scope"

const sheetSizes = {
  sm: "sm:max-w-xs",
  default: "sm:max-w-sm",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-2xl",
} as const

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  const container = usePortalContainer()
  return (
    <SheetPrimitive.Portal
      container={container}
      {...props}
      data-slot="sheet-portal"
    />
  )
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn("fixed inset-0 z-50", className)}
      {...props}
      data-slot="sheet-overlay"
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  size = "default",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  /** Width preset for left/right sheets. */
  size?: keyof typeof sheetSizes
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background text-foreground outline-hidden",
          side === "right" && "inset-y-0 right-0 h-full w-3/4",
          side === "left" && "inset-y-0 left-0 h-full w-3/4",
          (side === "right" || side === "left") && sheetSizes[size],
          side === "top" &&
            "inset-x-0 top-0 h-auto rounded-b-(--du-radius-surface)",
          side === "bottom" &&
            "inset-x-0 bottom-0 h-auto rounded-t-(--du-radius-surface)",
          className
        )}
        {...props}
        data-slot="sheet-content"
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            className="absolute top-3.5 right-3.5 inline-flex size-7 cursor-pointer items-center justify-center rounded-(--du-radius-item) text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <XIcon weight="bold" className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 p-(--du-pad-surface) pr-12",
        className
      )}
      {...props}
      data-slot="sheet-header"
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-(--du-pad-surface)", className)}
      {...props}
      data-slot="sheet-footer"
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={cn("text-lg leading-tight text-foreground", className)}
      {...props}
      data-slot="sheet-title"
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
      data-slot="sheet-description"
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
