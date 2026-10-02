"use client"

import * as React from "react"
import { CheckIcon } from "@phosphor-icons/react/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const SEAT_PRICE = 14
const features = [
  "Unlimited preview deployments",
  "Branch protections and required checks",
  "Comments on every preview",
  "SSO with Google and GitHub",
  "Audit log, 90 days",
  "Priority support, 4 hour response",
]

export default function BlockPricing() {
  const [seats, setSeats] = React.useState([12])
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("yearly")
  const perSeat = billing === "yearly" ? SEAT_PRICE * 0.8 : SEAT_PRICE
  const total = Math.round(perSeat * seats[0])
  const usd = { style: "currency", currency: "USD", maximumFractionDigits: 0 } as const

  return (
    <section className="grid w-full gap-10 rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-card p-6 shadow-(--du-shadow-surface) sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
      <div className="grid content-start gap-8">
        <div className="grid gap-3">
          <h2 className="du-display text-3xl leading-tight text-balance sm:text-4xl">
            Pay for the people who ship.
          </h2>
          <p className="max-w-[44ch] text-muted-foreground">
            One plan, priced per seat. Viewers and reviewers are always free.
          </p>
        </div>

        <ToggleGroup
          type="single"
          variant="outline"
          value={billing}
          onValueChange={(v) => v && setBilling(v as "monthly" | "yearly")}
          aria-label="Billing period"
        >
          <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
          <ToggleGroupItem value="yearly">
            Yearly
            <Badge variant="success" className="ml-1">-20%</Badge>
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="grid gap-4">
          <div className="flex items-baseline justify-between">
            <span id="pricing-seats" className="du-label text-muted-foreground">
              Seats
            </span>
            <span className="font-mono text-sm tabular-nums">{seats[0]}</span>
          </div>
          <Slider
            value={seats}
            onValueChange={setSeats}
            min={1}
            max={50}
            aria-labelledby="pricing-seats"
            formatValue={(v) => `${v} seats`}
          />
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="grid gap-1">
            <NumberTicker value={total} format={usd} className="du-display text-5xl leading-none sm:text-6xl" />
            <span className="text-sm text-muted-foreground">
              per month, {billing === "yearly" ? `billed ${new Intl.NumberFormat("en-US", usd).format(total * 12)} yearly` : "billed monthly"}
            </span>
          </div>
          <Button size="lg">Start 14-day trial</Button>
        </div>
      </div>

      <div className="grid content-start gap-6">
        <div className="grid gap-1">
          <span className="du-label text-muted-foreground">Everything in Team</span>
          <span className="text-sm text-muted-foreground">
            {new Intl.NumberFormat("en-US", { ...usd, maximumFractionDigits: 2 }).format(perSeat)} per seat
          </span>
        </div>
        <ul className="grid gap-3.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-[0.9375rem]">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-(--du-radius-check) bg-primary text-primary-foreground">
                <CheckIcon weight="bold" className="size-3" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <Separator />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="grid gap-0.5">
            <span className="font-medium">Over 50 seats?</span>
            <span className="text-sm text-muted-foreground">Volume pricing, SAML and a named contact.</span>
          </div>
          <Button variant="outline">Talk to us</Button>
        </div>
      </div>
    </section>
  )
}
