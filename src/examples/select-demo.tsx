import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectDemo() {
  return (
    <div className="grid w-full max-w-60 gap-2">
      <Label htmlFor="select-region">Region</Label>
      <Select defaultValue="fra1">
        <SelectTrigger id="select-region" className="w-full">
          <SelectValue placeholder="Choose a region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fra1">Frankfurt</SelectItem>
          <SelectItem value="bom1">Mumbai</SelectItem>
          <SelectItem value="iad1">Washington, D.C.</SelectItem>
          <SelectItem value="gru1">São Paulo</SelectItem>
          <SelectItem value="hnd1" disabled>
            Tokyo (at capacity)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
