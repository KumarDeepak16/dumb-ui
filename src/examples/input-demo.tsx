import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="input-demo-email">Work email</Label>
      <Input
        id="input-demo-email"
        type="email"
        placeholder="deepak@1619.in"
        aria-describedby="input-demo-help"
      />
      <p id="input-demo-help" className="text-[0.8125rem] text-muted-foreground">
        We send the invite here. No marketing.
      </p>
    </div>
  )
}
