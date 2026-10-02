"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      className={cn("flex flex-col gap-3", className)}
      {...props}
      data-slot="tabs"
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex w-fit items-center justify-center text-muted-foreground",
        className
      )}
      {...props}
      data-slot="tabs-list"
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 px-3 whitespace-nowrap text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-(--du-tabs-active-bg) data-[state=active]:text-(--du-tabs-active-fg) data-[state=active]:shadow-(--du-tabs-active-shadow) data-[state=inactive]:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
      data-slot="tabs-trigger"
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("flex-1 outline-hidden", className)}
      {...props}
      data-slot="tabs-content"
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
