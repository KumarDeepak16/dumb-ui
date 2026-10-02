import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const plans = [
  { id: "hobby", name: "Hobby", price: "$0", detail: "1 project, community support" },
  { id: "team", name: "Team", price: "$24", detail: "Unlimited projects, 10 seats" },
  { id: "scale", name: "Scale", price: "$96", detail: "SSO, audit log, priority support" },
]

export default function RadioGroupCards() {
  return (
    <RadioGroup defaultValue="team" aria-label="Plan" className="w-full max-w-md gap-2.5">
      {plans.map((plan) => (
        <Label
          key={plan.id}
          htmlFor={`plan-${plan.id}`}
          className="flex cursor-pointer items-center gap-3 rounded-(--du-radius-field) border-(length:--du-border-field) border-border bg-card p-3.5 font-sans text-sm tracking-normal normal-case shadow-(--du-shadow-field) has-data-[state=checked]:border-primary"
        >
          <RadioGroupItem value={plan.id} id={`plan-${plan.id}`} />
          <span className="grid flex-1 gap-0.5">
            <span className="font-medium">{plan.name}</span>
            <span className="text-[0.8125rem] font-normal text-muted-foreground">
              {plan.detail}
            </span>
          </span>
          <span className="font-mono text-sm tabular-nums">
            {plan.price}
            <span className="text-muted-foreground">/mo</span>
          </span>
        </Label>
      ))}
    </RadioGroup>
  )
}
