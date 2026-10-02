"use client"

import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Gauge } from "@/components/ui/gauge"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Progress } from "@/components/ui/progress"

export default function BlockStats() {
  return (
    <section className="grid w-full gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>September 2026</CardDescription>
          <CardAction>
            <Badge variant="success">
              <ArrowUpRightIcon />
              18.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="grid gap-6">
          <NumberTicker
            value={84210}
            format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
            className="du-display text-5xl"
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "New", value: 62 },
              { label: "Expansion", value: 27 },
              { label: "Churned", value: 11 },
            ].map((row) => (
              <div key={row.label} className="grid gap-2">
                <div className="flex justify-between text-[0.8125rem]">
                  <span id={`stat-${row.label}`} className="text-muted-foreground">{row.label}</span>
                  <span className="font-mono tabular-nums">{row.value}%</span>
                </div>
                <Progress value={row.value} aria-labelledby={`stat-${row.label}`} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Health</CardTitle>
          <CardDescription>Last 24 hours</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-around gap-4">
          <Gauge value={99.4} min={95} max={100} label="Uptime" format={(v) => `${v.toFixed(1)}%`} tone="success" className="size-32" />
          <Gauge value={38} label="Error budget" format={(v) => `${Math.round(v)}%`} tone="warning" className="size-32" />
        </CardContent>
      </Card>
    </section>
  )
}
