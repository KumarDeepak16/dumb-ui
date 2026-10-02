import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

function Card({
  className,
  interactive = false,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  /** Hover and press feedback in the style's own physics (shift, lift or tint). Pair with `asChild` + a link or button. */
  interactive?: boolean
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-interactive={interactive || undefined}
      className={cn(
        "flex flex-col gap-(--du-gap-surface) rounded-(--du-radius-surface) bg-card py-(--du-pad-surface) text-card-foreground",
        interactive && "cursor-pointer",
        className
      )}
      {...props}
      data-slot="card"
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-(--du-pad-surface) has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      {...props}
      data-slot="card-header"
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-[1.0625rem] leading-snug", className)}
      {...props}
      data-slot="card-title"
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
      data-slot="card-description"
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
      data-slot="card-action"
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-(--du-pad-surface)", className)}
      {...props}
      data-slot="card-content"
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-(--du-pad-surface) [.border-t]:pt-(--du-pad-surface)",
        className
      )}
      {...props}
      data-slot="card-footer"
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
