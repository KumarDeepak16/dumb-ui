import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-md gap-2">
      <Label htmlFor="textarea-notes">Release notes</Label>
      <Textarea
        id="textarea-notes"
        placeholder="What changed in this release?"
      />
    </div>
  )
}
