import * as React from "react"

import { cn } from "@/lib/utils"

const fieldClass =
  "rounded-(--du-radius-field) border-input bg-(--du-field-bg) text-foreground"

type InputProps = React.ComponentProps<"input"> & {
  /** Content rendered inside the field before the text: an icon, a unit, a protocol. */
  leading?: React.ReactNode
  /** Content rendered inside the field after the text: a unit, a kbd hint, a button. */
  trailing?: React.ReactNode
}

function Input({ className, type, leading, trailing, ...props }: InputProps) {
  if (leading == null && trailing == null) {
    return (
      <input
        type={type}
        className={cn(
          fieldClass,
          "flex h-(--du-h-md) w-full min-w-0 px-3 py-1 text-base selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
        data-slot="input"
      />
    )
  }

  return (
    <div
      data-slot="input-wrapper"
      data-disabled={props.disabled || undefined}
      aria-invalid={props["aria-invalid"]}
      className={cn(
        fieldClass,
        "flex h-(--du-h-md) w-full min-w-0 items-center gap-2 px-3 text-muted-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        className
      )}
    >
      {leading != null && (
        <span data-slot="input-leading" className="flex items-center text-sm">
          {leading}
        </span>
      )}
      <input
        type={type}
        className="h-full w-full min-w-0 bg-transparent text-base text-foreground outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed md:text-sm"
        {...props}
        data-slot="input-control"
      />
      {trailing != null && (
        <span data-slot="input-trailing" className="flex items-center text-sm">
          {trailing}
        </span>
      )}
    </div>
  )
}

export { Input, type InputProps }
