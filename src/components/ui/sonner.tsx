"use client"

import * as React from "react"
import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
} from "@phosphor-icons/react/ssr"
import { Toaster as Sonner, type ToasterProps } from "sonner"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

/**
 * Sonner in unstyled mode: Sonner keeps stacking, swipe and timing; the
 * surface, type and motion come from the active Dumb UI style.
 */
function Toaster({ toastOptions, ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CheckCircleIcon weight="fill" className="text-success" />,
        info: <InfoIcon weight="fill" className="text-muted-foreground" />,
        warning: <WarningIcon weight="fill" className="text-warning" />,
        error: <XCircleIcon weight="fill" className="text-destructive" />,
        loading: <Spinner />,
      }}
      toastOptions={{
        unstyled: true,
        ...toastOptions,
        classNames: {
          toast: cn(
            "group/toast flex w-full items-start gap-3 rounded-(--du-radius-overlay) p-4 text-popover-foreground sm:w-(--width)"
          ),
          icon: "relative mt-0.5 flex size-4 shrink-0 items-center justify-center [&>svg]:size-4",
          loader: "absolute inset-0 flex items-center justify-center [&_svg]:size-4",
          content: "flex flex-1 flex-col gap-1",
          title: "leading-tight",
          description: "text-sm text-muted-foreground",
          actionButton: cn(
            buttonVariants({ size: "sm" }),
            "ml-auto shrink-0 self-center"
          ),
          cancelButton: cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "shrink-0 self-center"
          ),
          closeButton:
            "absolute top-2 right-2 inline-flex size-6 items-center justify-center rounded-(--du-radius-item) text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
