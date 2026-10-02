import {
  ArrowArcLeftIcon,
  ArrowArcRightIcon,
  ChatCircleIcon,
  MagnifyingGlassIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const tools = [
  { label: "Undo", shortcut: "⌘Z", icon: ArrowArcLeftIcon },
  { label: "Redo", shortcut: "⇧⌘Z", icon: ArrowArcRightIcon },
  null,
  { label: "Search", shortcut: "⌘K", icon: MagnifyingGlassIcon },
  { label: "Comment", shortcut: "C", icon: ChatCircleIcon },
  { label: "Share", shortcut: "⌘⇧S", icon: ShareNetworkIcon },
]

export default function TooltipToolbar() {
  return (
    <div
      role="toolbar"
      aria-label="Editor"
      className="flex items-center gap-1 rounded-(--du-radius-control) border-(length:--du-border-control) border-border bg-card p-1 shadow-(--du-shadow-control)"
    >
      {tools.map((tool, index) =>
        tool ? (
          <Tooltip key={tool.label}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label={tool.label}>
                <tool.icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" shortcut={tool.shortcut}>
              {tool.label}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Separator key={index} orientation="vertical" className="mx-1 h-5 self-center" />
        )
      )}
    </div>
  )
}
