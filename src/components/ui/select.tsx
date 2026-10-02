"use client"

import * as React from "react"
import {
  CaretDownIcon,
  CaretUpIcon,
  CaretUpDownIcon,
  CheckIcon,
} from "@phosphor-icons/react/ssr"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { usePortalContainer } from "@/components/ui/style-scope"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-size={size}
      className={cn(
        "flex w-fit min-w-0 cursor-pointer items-center justify-between gap-2 rounded-(--du-radius-field) border-input bg-(--du-field-bg) px-3 text-sm whitespace-nowrap text-foreground disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-muted-foreground data-[size=default]:h-(--du-h-md) data-[size=sm]:h-(--du-h-sm) *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
      data-slot="select-trigger"
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <CaretUpDownIcon weight="bold" className="size-3.5 opacity-60" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "start",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const container = usePortalContainer()

  return (
    <SelectPrimitive.Portal container={container}>
      <SelectPrimitive.Content
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-(--du-radius-overlay) text-popover-foreground",
          position === "popper" &&
            "w-full min-w-(--radix-select-trigger-width) data-[side=bottom]:translate-y-1.5 data-[side=top]:-translate-y-1.5",
          className
        )}
        position={position}
        align={align}
        {...props}
        data-slot="select-content"
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
      data-slot="select-label"
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-(--du-radius-item) py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-selection focus:text-selection-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
      data-slot="select-item"
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon weight="bold" className="size-3.5" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn(
        "pointer-events-none -mx-1 my-1 h-(--du-rule) bg-border",
        className
      )}
      {...props}
      data-slot="select-separator"
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
      data-slot="select-scroll-up-button"
    >
      <CaretUpIcon weight="bold" className="size-3.5" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
      data-slot="select-scroll-down-button"
    >
      <CaretDownIcon weight="bold" className="size-3.5" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
