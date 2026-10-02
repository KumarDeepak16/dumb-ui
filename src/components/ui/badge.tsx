import * as React from "react"
import { XIcon } from "@phosphor-icons/react/ssr"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex h-(--du-badge-h) w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-(--du-radius-badge) px-(--du-badge-px) whitespace-nowrap transition-colors [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "border-(--du-btn-border) bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-(--du-btn-border) bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        destructive:
          "border-(--du-btn-border) bg-destructive text-destructive-foreground",
        success: "border-(--du-btn-border) bg-success text-success-foreground",
        warning: "border-(--du-btn-border) bg-warning text-warning-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    /** Renders a remove button inside the badge, for tags and filter chips. */
    onRemove?: () => void
    /** Accessible label for the remove button. */
    removeLabel?: string
  }

function Badge({
  className,
  variant = "default",
  asChild = false,
  onRemove,
  removeLabel,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span"

  if (onRemove && !asChild) {
    return (
      <span
        data-variant={variant}
        className={cn(badgeVariants({ variant }), "pr-0.5", className)}
        {...props}
        data-slot="badge"
      >
        {children}
        <button
          type="button"
          data-slot="badge-remove"
          onClick={onRemove}
          aria-label={
            removeLabel ??
            (typeof children === "string" ? `Remove ${children}` : "Remove")
          }
          className="inline-flex size-4 cursor-pointer items-center justify-center rounded-(--du-radius-item) opacity-70 transition-opacity hover:opacity-100"
        >
          <XIcon weight="bold" className="size-2.5" />
        </button>
      </span>
    )
  }

  return (
    <Comp
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
      data-slot="badge"
    >
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants, type BadgeProps }
