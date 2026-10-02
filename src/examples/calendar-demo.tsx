"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(
    () => new Date()
  )

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-(--du-radius-surface) border-(length:--du-border-surface) bg-card shadow-(--du-shadow-surface)"
    />
  )
}
