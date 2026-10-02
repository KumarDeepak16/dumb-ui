"use client"

import * as React from "react"
import {
  CaretRightIcon,
  CheckIcon,
  CircleIcon,
} from "@phosphor-icons/react/ssr"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { usePortalContainer } from "@/components/ui/style-scope"

const itemClass =
  "relative flex cursor-default items-center gap-2 rounded-(--du-radius-item) px-2 py-1.5 text-sm outline-hidden select-none focus:bg-selection focus:text-selection-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground focus:[&_svg:not([class*='text-'])]:text-current"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      {...props}
      data-slot="dropdown-menu-trigger"
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  const container = usePortalContainer()

  return (
    <DropdownMenuPrimitive.Portal container={container}>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[9rem] overflow-x-hidden overflow-y-auto rounded-(--du-radius-overlay) p-1 text-popover-foreground outline-hidden",
          className
        )}
        {...props}
        data-slot="dropdown-menu-content"
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-inset={inset}
      data-variant={variant}
      className={cn(
        itemClass,
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-current",
        className
      )}
      {...props}
      data-slot="dropdown-menu-item"
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(itemClass, "pl-8", className)}
      checked={checked}
      {...props}
      data-slot="dropdown-menu-checkbox-item"
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon weight="bold" className="size-3.5 text-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      {...props}
      data-slot="dropdown-menu-radio-group"
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(itemClass, "pl-8", className)}
      {...props}
      data-slot="dropdown-menu-radio-item"
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon weight="fill" className="size-2 text-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-xs text-muted-foreground data-inset:pl-8",
        className
      )}
      {...props}
      data-slot="dropdown-menu-label"
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("-mx-1 my-1 h-(--du-rule) bg-border", className)}
      {...props}
      data-slot="dropdown-menu-separator"
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ml-auto pl-4 text-[0.6875rem] tracking-wide text-muted-foreground in-data-highlighted:text-current in-data-highlighted:opacity-75",
        className
      )}
      {...props}
      data-slot="dropdown-menu-shortcut"
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-inset={inset}
      className={cn(
        itemClass,
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className
      )}
      {...props}
      data-slot="dropdown-menu-sub-trigger"
    >
      {children}
      <CaretRightIcon weight="bold" className="ml-auto size-3.5" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  const container = usePortalContainer()

  return (
    <DropdownMenuPrimitive.Portal container={container}>
      <DropdownMenuPrimitive.SubContent
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-(--du-radius-overlay) p-1 text-popover-foreground",
          className
        )}
        {...props}
        data-slot="dropdown-menu-sub-content"
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
