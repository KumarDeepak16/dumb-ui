import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputInvalid() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="input-handle">Handle</Label>
      <Input
        id="input-handle"
        defaultValue="deepak kumar"
        aria-invalid
        aria-describedby="input-handle-error"
      />
      <p
        id="input-handle-error"
        className="text-[0.8125rem] font-medium text-destructive"
      >
        Handles can’t contain spaces. Try deepak-kumar.
      </p>
    </div>
  )
}
