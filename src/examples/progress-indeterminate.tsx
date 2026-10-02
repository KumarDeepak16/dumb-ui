import { Progress } from "@/components/ui/progress"

export default function ProgressIndeterminate() {
  return (
    <div className="grid w-full max-w-sm gap-2.5">
      <span id="progress-queue-label" className="text-sm">
        Waiting for a build slot
      </span>
      <Progress value={null} aria-labelledby="progress-queue-label" />
    </div>
  )
}
