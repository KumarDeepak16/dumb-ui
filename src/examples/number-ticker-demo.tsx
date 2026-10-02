"use client"

import * as React from "react"
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { NumberTicker } from "@/components/ui/number-ticker"

const usd = { style: "currency", currency: "USD", maximumFractionDigits: 0 } as const

export default function NumberTickerDemo() {
  const [revenue, setRevenue] = React.useState(48210)
  const [deploys, setDeploys] = React.useState(1284)

  return (
    <div className="grid w-full max-w-md gap-8">
      <div className="grid grid-cols-2 gap-6">
        <div className="grid gap-1">
          <span className="text-[0.8125rem] text-muted-foreground">Monthly revenue</span>
          <NumberTicker value={revenue} format={usd} className="du-display text-3xl" />
        </div>
        <div className="grid gap-1">
          <span className="text-[0.8125rem] text-muted-foreground">Deploys this week</span>
          <NumberTicker value={deploys} className="du-display text-3xl" />
        </div>
      </div>
      <Button
        variant="outline"
        className="w-fit"
        onClick={() => {
          setRevenue((v) => v + Math.round(1200 + Math.random() * 9000))
          setDeploys((v) => v + Math.round(20 + Math.random() * 300))
        }}
      >
        <ArrowsClockwiseIcon />
        New numbers
      </Button>
    </div>
  )
}
