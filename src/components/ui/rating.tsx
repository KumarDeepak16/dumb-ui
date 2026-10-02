"use client"

import * as React from "react"
import { StarIcon } from "@phosphor-icons/react/ssr"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type RatingProps = {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  max?: number
  /** Renders a static, non-interactive rating (announced as "Rated x out of y"). */
  readOnly?: boolean
  size?: "sm" | "default" | "lg"
  "aria-label"?: string
  className?: string
}

const sizes = { sm: "size-4", default: "size-5", lg: "size-7" }

/**
 * Star rating on Radix RadioGroup: arrow keys move, hover previews, and the
 * filled color is the style's highlight.
 */
function Rating({
  value,
  defaultValue = 0,
  onValueChange,
  max = 5,
  readOnly = false,
  size = "default",
  "aria-label": ariaLabel = "Rating",
  className,
}: RatingProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const [hover, setHover] = React.useState<number | null>(null)
  const current = value ?? internal
  const shown = hover ?? current
  const stars = Array.from({ length: max }, (_, i) => i + 1)

  if (readOnly) {
    return (
      <span
        role="img"
        aria-label={`Rated ${current} out of ${max}`}
        className={cn("inline-flex items-center gap-0.5", className)}
        data-slot="rating"
      >
        {stars.map((star) => (
          <StarIcon
            key={star}
            weight={star <= current ? "fill" : "regular"}
            className={cn(sizes[size], star <= current ? "text-(--highlight)" : "text-muted-foreground/60")}
          />
        ))}
      </span>
    )
  }

  return (
    <RadioGroupPrimitive.Root
      aria-label={ariaLabel}
      orientation="horizontal"
      value={current ? String(current) : ""}
      onValueChange={(v) => {
        const next = Number(v)
        setInternal(next)
        onValueChange?.(next)
      }}
      onPointerLeave={() => setHover(null)}
      className={cn("inline-flex items-center gap-0.5", className)}
      data-slot="rating"
    >
      {stars.map((star) => (
        <RadioGroupPrimitive.Item
          key={star}
          value={String(star)}
          aria-label={`${star} star${star === 1 ? "" : "s"}`}
          onPointerEnter={() => setHover(star)}
          className={cn(
            "inline-flex cursor-pointer items-center justify-center rounded-(--du-radius-item) p-0.5",
            star <= shown ? "text-(--highlight)" : "text-muted-foreground/60"
          )}
          data-slot="rating-item"
        >
          <StarIcon weight={star <= shown ? "fill" : "regular"} className={sizes[size]} />
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  )
}

export { Rating, type RatingProps }
