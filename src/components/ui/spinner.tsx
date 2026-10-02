import * as React from "react"
import { CircleNotchIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"

function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof CircleNotchIcon>) {
  return (
    <CircleNotchIcon
      role="status"
      aria-label="Loading"
      weight="bold"
      className={cn("size-4", className)}
      {...props}
      data-slot="spinner"
    />
  )
}

export { Spinner }
