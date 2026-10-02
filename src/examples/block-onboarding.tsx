"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ShaderBackground } from "@/components/ui/shader-background"
import { Stepper } from "@/components/ui/stepper"

const steps = [{ title: "Workspace" }, { title: "Region" }, { title: "Invite" }]
const regions = [
  { id: "bom", name: "Mumbai", note: "Closest to you" },
  { id: "fra", name: "Frankfurt", note: "EU data residency" },
  { id: "iad", name: "Washington, D.C.", note: "Lowest US latency" },
]

export default function BlockOnboarding() {
  const [step, setStep] = React.useState(1)

  return (
    <section className="relative isolate grid min-h-[36rem] w-full place-items-center overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border p-6">
      <ShaderBackground className="-z-10" intensity={0.7} speed={0.6} />
      <div className="grid w-full max-w-lg gap-8 rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-card p-(--du-pad-surface) shadow-(--du-shadow-surface)">
        <Stepper steps={steps} current={step} onStepSelect={setStep} />
        {step === 0 && (
          <div className="grid gap-2">
            <Label htmlFor="ob-name">Workspace name</Label>
            <Input id="ob-name" defaultValue="1619 Labs" trailing=".1619.in" />
          </div>
        )}
        {step === 1 && (
          <RadioGroup defaultValue="bom" aria-label="Region" className="gap-2.5">
            {regions.map((r) => (
              <Label
                key={r.id}
                htmlFor={`ob-${r.id}`}
                className="flex cursor-pointer items-center gap-3 rounded-(--du-radius-field) border-(length:--du-border-field) border-border p-3 font-sans text-sm tracking-normal normal-case has-data-[state=checked]:border-primary"
              >
                <RadioGroupItem value={r.id} id={`ob-${r.id}`} />
                <span className="flex-1 font-medium">{r.name}</span>
                <span className="text-[0.8125rem] font-normal text-muted-foreground">{r.note}</span>
              </Label>
            ))}
          </RadioGroup>
        )}
        {step >= 2 && (
          <div className="grid gap-2">
            <Label htmlFor="ob-invite">Invite teammates</Label>
            <Input id="ob-invite" placeholder="ravi@1619.in, lena@1619.in" />
          </div>
        )}
        <div className="flex justify-between">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
          <Button onClick={() => setStep((s) => Math.min(s + 1, steps.length))}>
            {step >= steps.length - 1 ? "Create workspace" : "Continue"}
          </Button>
        </div>
      </div>
    </section>
  )
}
