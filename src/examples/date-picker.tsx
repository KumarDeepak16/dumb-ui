"use client"

import * as React from "react"
import { CalendarBlankIcon } from "@phosphor-icons/react/ssr"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date>()

  return (
    <div className="grid gap-2">
      <Label htmlFor="date-picker-trigger">Launch date</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker-trigger"
            variant="outline"
            className="w-60 justify-between font-sans tracking-normal normal-case"
          >
            {date ? format(date, "EEE, d MMM yyyy") : "Pick a date"}
            <CalendarBlankIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(next) => {
              setDate(next)
              setOpen(false)
            }}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
