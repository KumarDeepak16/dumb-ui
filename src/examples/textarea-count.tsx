import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaCount() {
  return (
    <div className="grid w-full max-w-md gap-2">
      <Label htmlFor="textarea-bio">Bio</Label>
      <Textarea
        id="textarea-bio"
        showCount
        maxLength={160}
        defaultValue="Builds Dumb UI at 1619.in. Writes about type, motion and the space between them."
      />
    </div>
  )
}
