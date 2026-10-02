import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        Continue
        <ArrowRightIcon weight="bold" />
      </Button>
      <Button variant="outline">Save draft</Button>
    </div>
  )
}
