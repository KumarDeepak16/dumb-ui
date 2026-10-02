import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div
      className="grid w-full max-w-sm gap-5"
      role="status"
      aria-label="Loading activity"
    >
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-(--du-radius-avatar)" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
