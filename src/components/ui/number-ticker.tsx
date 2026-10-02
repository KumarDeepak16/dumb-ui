"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

function Digit({ digit }: { digit: number }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-[1lh] overflow-hidden align-top"
    >
      <span
        data-slot="number-ticker-strip"
        className="flex flex-col"
        style={{ transform: `translateY(${-digit * 10}%)` }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="block h-[1lh] text-center">
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

type NumberTickerProps = Omit<React.ComponentProps<"span">, "children"> & {
  value: number
  /** Intl.NumberFormat options: currency, percent, compact notation, decimals. */
  format?: Intl.NumberFormatOptions
  locales?: Intl.LocalesArgument
  /** Rolls up from zero on first render. */
  animateOnMount?: boolean
}

/**
 * A number whose digits roll to their new value. Formatting comes from
 * Intl.NumberFormat; screen readers get the formatted value once, politely.
 */
function NumberTicker({
  value,
  format,
  locales = "en-US",
  animateOnMount = true,
  className,
  ...props
}: NumberTickerProps) {
  const [shown, setShown] = React.useState(animateOnMount ? 0 : value)

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(value))
    return () => cancelAnimationFrame(frame)
  }, [value])

  const formatter = React.useMemo(
    () => new Intl.NumberFormat(locales, format),
    [locales, format]
  )
  const text = formatter.format(shown)
  const finalText = formatter.format(value)
  const chars = [...text]

  return (
    <span
      className={cn("inline-flex tabular-nums", className)}
      {...props}
      data-slot="number-ticker"
    >
      <span className="sr-only" aria-live="polite">
        {finalText}
      </span>
      {chars.map((char, index) => {
        // keyed from the right so digits keep their column as the length changes
        const key = chars.length - index
        return /\d/.test(char) ? (
          <Digit key={key} digit={Number(char)} />
        ) : (
          <span key={key} aria-hidden="true">
            {char}
          </span>
        )
      })}
    </span>
  )
}

export { NumberTicker, type NumberTickerProps }
