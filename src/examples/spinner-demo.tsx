import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Spinner className="size-6" />
      <Badge variant="secondary">
        <Spinner aria-hidden="true" role={undefined} className="size-3" />
        Building
      </Badge>
      <Button disabled>
        <Spinner aria-hidden="true" role={undefined} />
        Connecting
      </Button>
    </div>
  )
}
