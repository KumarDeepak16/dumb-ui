"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center gap-1 rounded-(--du-radius-control) data-[variant=outline]:gap-0",
        className
      )}
      {...props}
      data-slot="toggle-group"
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)
  const itemVariant = context.variant ?? variant

  return (
    <ToggleGroupPrimitive.Item
      data-variant={itemVariant}
      data-size={context.size ?? size}
      className={cn(
        toggleVariants({ variant: itemVariant, size: context.size ?? size }),
        "min-w-0 shrink-0 focus-visible:z-10",
        itemVariant === "outline" &&
          "rounded-none first:rounded-l-(--du-radius-control) last:rounded-r-(--du-radius-control) not-first:-ml-(--du-border-control)",
        className
      )}
      {...props}
      data-slot="toggle-group-item"
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
