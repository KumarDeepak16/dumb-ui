"use client"

import * as React from "react"
import { CheckIcon, MinusIcon } from "@phosphor-icons/react/ssr"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer group/checkbox inline-flex size-(--du-check-size) shrink-0 cursor-pointer items-center justify-center rounded-(--du-radius-check) bg-(--du-field-bg) text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary",
        className
      )}
      {...props}
      data-slot="checkbox"
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon
          weight="bold"
          className="size-[0.8em] group-data-[state=indeterminate]/checkbox:hidden"
        />
        <MinusIcon
          weight="bold"
          className="hidden size-[0.8em] group-data-[state=indeterminate]/checkbox:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
