import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react/ssr"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleOutline() {
  return (
    <div className="flex gap-2">
      <Toggle variant="outline" aria-label="Bold" defaultPressed>
        <TextBIcon weight="bold" />
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        <TextItalicIcon weight="bold" />
      </Toggle>
      <Toggle variant="outline" aria-label="Underline">
        <TextUnderlineIcon weight="bold" />
      </Toggle>
    </div>
  )
}
