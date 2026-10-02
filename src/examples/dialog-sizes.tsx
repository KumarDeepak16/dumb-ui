import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const sizes = ["sm", "default", "lg", "xl"] as const

export default function DialogSizes() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              {size}
            </Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>size=&quot;{size}&quot;</DialogTitle>
              <DialogDescription>
                Width presets keep dialogs consistent across a product. Pass
                className for one-offs.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
