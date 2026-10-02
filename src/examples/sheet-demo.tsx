import { FunnelSimpleIcon } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

const statuses = ["Ready", "Building", "Failed", "Canceled"]

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <FunnelSimpleIcon />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter deployments</SheetTitle>
          <SheetDescription>Narrow the list. Filters apply instantly.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 px-(--du-pad-surface)">
          <fieldset className="grid gap-3">
            <legend className="site-label mb-3 text-muted-foreground">Status</legend>
            {statuses.map((status) => (
              <div key={status} className="flex items-center gap-3">
                <Checkbox id={`status-${status}`} defaultChecked={status !== "Canceled"} />
                <Label htmlFor={`status-${status}`}>{status}</Label>
              </div>
            ))}
          </fieldset>
          <Separator />
          <div className="grid gap-3">
            <Label>Build duration (min)</Label>
            <Slider defaultValue={[0, 12]} max={30} showValue="interaction" aria-label="Duration" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Show 38 results</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
