import { BookmarkSimpleIcon } from "@phosphor-icons/react/ssr"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Save to reading list" defaultPressed>
      <BookmarkSimpleIcon />
      Saved
    </Toggle>
  )
}
