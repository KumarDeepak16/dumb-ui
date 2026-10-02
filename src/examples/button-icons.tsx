import {
  DownloadSimpleIcon,
  GitBranchIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"

export default function ButtonIcons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>
        <PlusIcon weight="bold" />
        New project
      </Button>
      <Button variant="secondary">
        <GitBranchIcon />
        Branch
      </Button>
      <Button variant="outline" size="icon" aria-label="Download">
        <DownloadSimpleIcon />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Delete">
        <TrashIcon />
      </Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
