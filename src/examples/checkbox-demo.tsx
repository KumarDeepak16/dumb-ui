import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CheckboxDemo() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="checkbox-digest" defaultChecked />
        <Label htmlFor="checkbox-digest">Weekly digest</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="checkbox-mentions" className="mt-0.5" />
        <div className="grid gap-1.5">
          <Label htmlFor="checkbox-mentions">Mentions only</Label>
          <p className="text-[0.8125rem] text-muted-foreground">
            Skip notifications unless someone tags you.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="checkbox-sms" disabled />
        <Label htmlFor="checkbox-sms">SMS alerts (Pro)</Label>
      </div>
    </div>
  )
}
