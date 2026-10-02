import * as React from "react"
import { CheckIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"

type StepperStep = {
  title: React.ReactNode
  description?: React.ReactNode
}

type StepState = "complete" | "current" | "upcoming"

type StepperProps = Omit<React.ComponentProps<"ol">, "children"> & {
  steps: StepperStep[]
  /** Zero-based index of the current step. Steps before it are complete. */
  current: number
  orientation?: "horizontal" | "vertical"
  /** Makes completed steps clickable, e.g. to go back in a wizard. */
  onStepSelect?: (index: number) => void
}

/** Progress through a multi-step flow. Markers, rules and type follow the style. */
function Stepper({
  steps,
  current,
  orientation = "horizontal",
  onStepSelect,
  className,
  ...props
}: StepperProps) {
  return (
    <ol
      aria-label="Progress"
      className={cn(
        "flex w-full",
        orientation === "horizontal" ? "flex-row items-start" : "flex-col",
        className
      )}
      {...props}
      data-slot="stepper"
      data-orientation={orientation}
    >
      {steps.map((step, index) => {
        const state: StepState =
          index < current ? "complete" : index === current ? "current" : "upcoming"
        const last = index === steps.length - 1
        const clickable = onStepSelect && state === "complete"
        const marker = (
          <span
            data-slot="stepper-marker"
            className={cn(
              "relative z-10 inline-flex size-[calc(var(--du-h-sm)*0.95)] shrink-0 items-center justify-center rounded-(--du-radius-avatar) bg-background text-xs tabular-nums",
              state === "complete" && "bg-primary text-primary-foreground",
              state === "current" && "text-foreground",
              state === "upcoming" && "text-muted-foreground"
            )}
          >
            {state === "complete" ? (
              <CheckIcon weight="bold" className="size-3.5" />
            ) : (
              index + 1
            )}
          </span>
        )

        return (
          <li
            key={index}
            aria-current={state === "current" ? "step" : undefined}
            className={cn(
              "relative flex",
              orientation === "horizontal"
                ? "flex-1 flex-col gap-3 pr-4 last:flex-none last:pr-0"
                : "gap-4 pb-8 last:pb-0"
            )}
            data-slot="stepper-item"
            data-state={state}
          >
            {!last && (
              <span
                aria-hidden="true"
                data-slot="stepper-connector"
                className={cn(
                  "absolute bg-border",
                  orientation === "horizontal"
                    ? "top-[calc(var(--du-h-sm)*0.475)] right-0 left-[calc(var(--du-h-sm)*0.95+0.5rem)] h-(--du-rule) -translate-y-1/2 mr-2"
                    : "top-[calc(var(--du-h-sm)*0.95+0.375rem)] bottom-1.5 left-[calc(var(--du-h-sm)*0.475)] w-(--du-rule) -translate-x-1/2",
                  state === "complete" && "bg-primary"
                )}
              />
            )}
            {clickable ? (
              <button
                type="button"
                onClick={() => onStepSelect(index)}
                className="w-fit cursor-pointer rounded-(--du-radius-avatar)"
                aria-label={`Go back to step ${index + 1}`}
              >
                {marker}
              </button>
            ) : (
              marker
            )}
            <span className="grid gap-0.5 pt-0.5">
              <span
                data-slot="stepper-title"
                className={cn(
                  "leading-tight",
                  state === "upcoming" ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {step.title}
              </span>
              {step.description ? (
                <span className="text-[0.8125rem] leading-snug text-muted-foreground">
                  {step.description}
                </span>
              ) : null}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export { Stepper, type StepperStep, type StepperProps }
