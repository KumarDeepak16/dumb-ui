import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export default function SliderRange() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Label>Price range</Label>
      <Slider
        defaultValue={[120, 480]}
        min={0}
        max={800}
        step={10}
        showValue
        aria-label="Price"
        formatValue={(v) => currency.format(v)}
      />
    </div>
  )
}
