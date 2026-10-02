import { Stepper } from "@/components/ui/stepper"

export default function StepperVertical() {
  return (
    <Stepper
      orientation="vertical"
      current={2}
      className="max-w-xs"
      steps={[
        { title: "Order placed", description: "Thu, 1 Oct · 09:41" },
        { title: "Packed", description: "Bengaluru warehouse" },
        { title: "Out for delivery", description: "Arriving by 6 pm" },
        { title: "Delivered" },
      ]}
    />
  )
}
