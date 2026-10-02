"use client"

import * as React from "react"
import { CaretDownIcon } from "@phosphor-icons/react/ssr"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={className}
      {...props}
      data-slot="accordion-item"
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-(--du-radius-item) py-4 text-left text-[0.9375rem] leading-snug disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
        data-slot="accordion-trigger"
      >
        {children}
        <CaretDownIcon
          aria-hidden="true"
          weight="bold"
          className="pointer-events-none mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-(--du-dur-2) ease-(--du-ease-out)"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm"
      {...props}
      data-slot="accordion-content"
    >
      <div className={cn("pt-0 pb-4 text-muted-foreground", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
