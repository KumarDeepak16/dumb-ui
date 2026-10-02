import * as React from "react"
import { XIcon } from "@phosphor-icons/react/ssr"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-(--du-radius-overlay) px-4 py-3.5 text-sm has-[>svg]:grid-cols-[1.25rem_1fr] has-[>svg]:gap-x-3 has-data-[slot=alert-dismiss]:pr-11 [&>svg]:size-5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "border-destructive/60 bg-destructive/6 text-destructive *:data-[slot=alert-description]:text-foreground/80",
        success:
          "border-success/60 bg-success/6 text-success *:data-[slot=alert-description]:text-foreground/80",
        warning:
          "border-warning bg-warning/12 text-foreground [&>svg]:text-warning-foreground dark:[&>svg]:text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant = "default",
  onDismiss,
  dismissLabel = "Dismiss",
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    /** Renders a close button; you own the visibility state. */
    onDismiss?: () => void
    dismissLabel?: string
  }) {
  return (
    <div
      data-variant={variant}
      role={variant === "destructive" ? "alert" : "status"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
      data-slot="alert"
    >
      {children}
      {onDismiss && (
        <button
          type="button"
          data-slot="alert-dismiss"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className="absolute top-3 right-3 inline-flex size-6 cursor-pointer items-center justify-center rounded-(--du-radius-item) text-current opacity-60 transition-opacity hover:opacity-100"
        >
          <XIcon weight="bold" className="size-3.5" />
        </button>
      )}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("col-start-2 line-clamp-1 min-h-5 leading-5", className)}
      {...props}
      data-slot="alert-title"
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
        className
      )}
      {...props}
      data-slot="alert-description"
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
