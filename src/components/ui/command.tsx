"use client"

import * as React from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-(--du-radius-overlay) bg-popover text-popover-foreground",
        className
      )}
      {...props}
      data-slot="command"
    />
  )
}

function CommandDialog({
  title = "Command palette",
  description = "Search for a command to run",
  children,
  className,
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-[18dvh] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl",
          className
        )}
        showCloseButton={showCloseButton}
      >
        <Command className="rounded-none bg-transparent **:data-[slot=command-input-wrapper]:h-13 [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-item]]:px-2.5 [&_[cmdk-item]]:py-2">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-11 items-center gap-2 border-b-(length:--du-rule) border-border px-3"
    >
      <MagnifyingGlassIcon
        weight="bold"
        aria-hidden="true"
        className="size-4 shrink-0 text-muted-foreground"
      />
      <CommandPrimitive.Input
        className={cn(
          "flex h-10 w-full bg-transparent py-3 text-sm text-foreground outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
        data-slot="command-input"
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn(
        "max-h-[min(360px,60dvh)] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
      data-slot="command-list"
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className="py-8 text-center text-sm text-muted-foreground"
      {...props}
      data-slot="command-empty"
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[0.6875rem] [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
      data-slot="command-group"
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      className={cn("-mx-1 h-(--du-rule) bg-border", className)}
      {...props}
      data-slot="command-separator"
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-(--du-radius-item) px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-selection data-[selected=true]:text-selection-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[selected=true]:[&_svg:not([class*='text-'])]:text-current",
        className
      )}
      {...props}
      data-slot="command-item"
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ml-auto text-[0.6875rem] tracking-wide text-muted-foreground in-data-[selected=true]:text-current in-data-[selected=true]:opacity-75",
        className
      )}
      {...props}
      data-slot="command-shortcut"
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
