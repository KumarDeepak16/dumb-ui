import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-(--du-radius-control) whitespace-nowrap select-none disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[loading=true]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-input bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-(--du-h-md) px-(--du-pad-control) has-[>svg]:px-[calc(var(--du-pad-control)*0.8)]",
        sm: "h-(--du-h-sm) gap-1.5 px-[calc(var(--du-pad-control)*0.75)]",
        lg: "h-(--du-h-lg) px-[calc(var(--du-pad-control)*1.5)]",
        icon: "size-(--du-h-md)",
        "icon-sm": "size-(--du-h-sm)",
        "icon-lg": "size-(--du-h-lg)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Shows a spinner, sets aria-busy and blocks interaction. Width stays stable. */
    loading?: boolean
    /** Replaces the label while loading. Without it the label is kept invisible to hold the width. */
    loadingText?: React.ReactNode
  }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  loadingText,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={asChild ? undefined : disabled || loading}
      aria-disabled={asChild && (disabled || loading) ? true : undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      data-slot="button"
    >
      {loading && !asChild ? (
        loadingText ? (
          <>
            <Spinner aria-hidden="true" role={undefined} />
            {loadingText}
          </>
        ) : (
          <>
            <span className="invisible contents" aria-hidden="true">
              {children}
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </span>
          </>
        )
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants, type ButtonProps }
