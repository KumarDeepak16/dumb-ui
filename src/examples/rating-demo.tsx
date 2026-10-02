"use client"

import * as React from "react"

import { Rating } from "@/components/ui/rating"

const labels = ["", "Not useful", "Could be better", "Good", "Great", "Exactly what I needed"]

export default function RatingDemo() {
  const [value, setValue] = React.useState(4)

  return (
    <div className="grid justify-items-center gap-6">
      <div className="grid justify-items-center gap-2">
        <span id="rating-docs" className="text-sm font-medium">
          How useful were these docs?
        </span>
        <Rating aria-label="How useful were these docs?" value={value} onValueChange={setValue} size="lg" />
        <span className="text-[0.8125rem] text-muted-foreground" aria-live="polite">
          {labels[value]}
        </span>
      </div>
      <div className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
        <Rating readOnly value={4} size="sm" />
        4.0 from 1,284 reviews
      </div>
    </div>
  )
}
