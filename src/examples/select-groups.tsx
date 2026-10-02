import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectGroups() {
  return (
    <Select>
      <SelectTrigger className="w-60" aria-label="Timezone">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="ist">India (IST)</SelectItem>
          <SelectItem value="jst">Japan (JST)</SelectItem>
          <SelectItem value="sgt">Singapore (SGT)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">London (GMT)</SelectItem>
          <SelectItem value="cet">Berlin (CET)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Americas</SelectLabel>
          <SelectItem value="est">New York (EST)</SelectItem>
          <SelectItem value="pst">San Francisco (PST)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
