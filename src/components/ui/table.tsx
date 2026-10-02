import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
        data-slot="table"
      />
    </div>
  )
}

function TableHeader({
  className,
  sticky = false,
  ...props
}: React.ComponentProps<"thead"> & {
  /** Keeps the header row visible while the table (or its scroll parent) scrolls. */
  sticky?: boolean
}) {
  return (
    <thead
      data-sticky={sticky || undefined}
      className={cn(
        sticky &&
          "sticky top-0 z-10 [&_th]:bg-(--du-table-head-bg-solid,var(--background))",
        className
      )}
      {...props}
      data-slot="table-header"
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
      data-slot="table-body"
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      className={cn("bg-muted/50 [&>tr]:last:border-b-0", className)}
      {...props}
      data-slot="table-footer"
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
      data-slot="table-row"
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-10 px-3 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
      data-slot="table-head"
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "px-3 py-2.5 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
      data-slot="table-cell"
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
      data-slot="table-caption"
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
