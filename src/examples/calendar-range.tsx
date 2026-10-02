"use client"

import * as React from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

export default function CalendarRange() {
  const [range, setRange] = React.useState<DateRange | undefined>(() => {
    const from = new Date()
    return { from, to: addDays(from, 9) }
  })

  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      selected={range}
      onSelect={setRange}
      className="rounded-(--du-radius-surface) border-(length:--du-border-surface) bg-card shadow-(--du-shadow-surface)"
    />
  )
}
