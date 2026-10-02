"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"

function CopyButton({
  value,
  label = "Copy code",
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timeout)
  }, [copied])

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
        } catch {
          setCopied(false)
        }
      }}
      className={cn(
        "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-(--du-radius-item) text-current opacity-70 transition-[opacity,background-color] hover:bg-current/10 hover:opacity-100",
        className
      )}
    >
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
      {copied ? (
        <CheckIcon weight="bold" className="size-4" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </button>
  )
}

export { CopyButton }
