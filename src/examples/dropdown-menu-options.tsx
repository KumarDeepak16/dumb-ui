"use client"

import * as React from "react"
import { SlidersHorizontalIcon } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenuOptions() {
  const [columns, setColumns] = React.useState({
    branch: true,
    author: true,
    duration: false,
  })
  const [sort, setSort] = React.useState("newest")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontalIcon />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start">
        <DropdownMenuLabel>Columns</DropdownMenuLabel>
        {(Object.keys(columns) as (keyof typeof columns)[]).map((key) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={columns[key]}
            onCheckedChange={(value) =>
              setColumns((prev) => ({ ...prev, [key]: value === true }))
            }
            className="capitalize"
          >
            {key}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sort</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="slowest">Slowest build</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
