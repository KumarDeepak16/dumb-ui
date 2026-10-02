import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextItalicIcon,
} from "@phosphor-icons/react/ssr"

import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupMultiple() {
  return (
    <div className="flex items-center gap-2">
      <ToggleGroup
        type="multiple"
        aria-label="Formatting"
        defaultValue={["bold"]}
      >
        <ToggleGroupItem value="bold" aria-label="Bold">
          <TextBIcon weight="bold" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <TextItalicIcon weight="bold" />
        </ToggleGroupItem>
      </ToggleGroup>
      <Separator orientation="vertical" className="h-6 self-center" />
      <ToggleGroup type="single" aria-label="Alignment" defaultValue="left">
        <ToggleGroupItem value="left" aria-label="Align left">
          <TextAlignLeftIcon weight="bold" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <TextAlignCenterIcon weight="bold" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <TextAlignRightIcon weight="bold" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
