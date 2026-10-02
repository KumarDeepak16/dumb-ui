"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const statusLabel = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
} as const

type AvatarStatus = keyof typeof statusLabel

function Avatar({
  className,
  status,
  children,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  /** Presence indicator, announced to screen readers. */
  status?: AvatarStatus
}) {
  const root = (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex size-(--du-avatar) shrink-0 overflow-hidden rounded-(--du-radius-avatar)",
        !status && className
      )}
      {...props}
      data-slot="avatar"
    >
      {children}
    </AvatarPrimitive.Root>
  )

  if (!status) return root

  return (
    <span
      data-slot="avatar-presence"
      className={cn("relative inline-flex w-fit shrink-0", className)}
    >
      {root}
      <span
        data-slot="avatar-status"
        data-status={status}
        role="img"
        aria-label={statusLabel[status]}
        className="absolute right-0 bottom-0 size-[28%] min-h-2 min-w-2 rounded-full ring-2 ring-background data-[status=away]:bg-warning data-[status=busy]:bg-destructive data-[status=offline]:bg-muted-foreground data-[status=online]:bg-success"
      />
    </span>
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
      data-slot="avatar-image"
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex size-full items-center justify-center bg-muted text-muted-foreground",
        className
      )}
      {...props}
      data-slot="avatar-fallback"
    />
  )
}

/** Overlapping stack of avatars; collapses anything past `max` into a +N chip. */
function AvatarGroup({
  className,
  max,
  children,
  ...props
}: React.ComponentProps<"div"> & { max?: number }) {
  const items = React.Children.toArray(children)
  const visible = max !== undefined ? items.slice(0, max) : items
  const hidden = items.length - visible.length

  return (
    <div
      className={cn(
        "flex items-center -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
      data-slot="avatar-group"
    >
      {visible}
      {hidden > 0 && (
        <span
          data-slot="avatar"
          aria-label={`${hidden} more`}
          className="relative flex size-(--du-avatar) shrink-0 items-center justify-center overflow-hidden rounded-(--du-radius-avatar) bg-secondary text-xs font-medium text-secondary-foreground ring-2 ring-background"
        >
          +{hidden}
        </span>
      )}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, type AvatarStatus }
