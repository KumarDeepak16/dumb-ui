import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable" aria-label="Density">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compact" id="density-compact" />
        <Label htmlFor="density-compact">Compact</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="comfortable" id="density-comfortable" />
        <Label htmlFor="density-comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="spacious" id="density-spacious" />
        <Label htmlFor="density-spacious">Spacious</Label>
      </div>
    </RadioGroup>
  )
}
