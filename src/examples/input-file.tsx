import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputFile() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="input-file">Logo</Label>
      <Input id="input-file" type="file" accept="image/png,image/svg+xml" />
    </div>
  )
}
