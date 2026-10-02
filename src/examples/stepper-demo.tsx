"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Stepper } from "@/components/ui/stepper"

const steps = [
  { title: "Account", description: "Name and email" },
  { title: "Workspace", description: "Team and region" },
  { title: "Connect", description: "Link a repository" },
  { title: "Deploy", description: "First preview" },
]

export default function StepperDemo() {
  const [current, setCurrent] = React.useState(1)

  return (
    <div className="grid w-full max-w-2xl gap-8">
      <Stepper steps={steps} current={current} onStepSelect={setCurrent} />
      <div className="flex justify-between">
        <Button variant="ghost" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
          Back
        </Button>
        <Button
          disabled={current === steps.length}
          onClick={() => setCurrent((c) => Math.min(c + 1, steps.length))}
        >
          {current >= steps.length - 1 ? "Finish" : "Continue"}
        </Button>
      </div>
    </div>
  )
}
