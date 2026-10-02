"use client"

import * as React from "react"
import { XIcon } from "@phosphor-icons/react/ssr"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { usePortalContainer } from "@/components/ui/style-scope"

const dialogSizes = {
  sm: "sm:max-w-sm",
  default: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
  full: "sm:max-w-[calc(100vw-4rem)] sm:h-[calc(100dvh-4rem)]",
} as const

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  const container = usePortalContainer()
  return (
    <DialogPrimitive.Portal
      container={container}
      {...props}
      data-slot="dialog-portal"
    />
  )
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn("fixed inset-0 z-50", className)}
      {...props}
      data-slot="dialog-overlay"
    />
  )
}

function DialogContent({
  className,
  children,
  size = "default",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  /** Max width preset; `full` fills the viewport minus a margin. */
  size?: keyof typeof dialogSizes
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-size={size}
        className={cn(
          "fixed top-[50%] left-[50%] z-50 grid max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-auto rounded-(--du-radius-surface) bg-background p-(--du-pad-surface) text-foreground outline-hidden",
          dialogSizes[size],
          className
        )}
        {...props}
        data-slot="dialog-content"
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-3.5 right-3.5 inline-flex size-7 cursor-pointer items-center justify-center rounded-(--du-radius-item) text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none"
          >
            <XIcon weight="bold" className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 pr-8 text-left", className)}
      {...props}
      data-slot="dialog-header"
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
      data-slot="dialog-footer"
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg leading-tight", className)}
      {...props}
      data-slot="dialog-title"
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
      data-slot="dialog-description"
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
