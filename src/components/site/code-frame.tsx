import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/site/copy-button"

/** Frame for pre-highlighted code (shiki on the server or highlightJsx on the client). */
function CodeFrame({
  html,
  raw,
  title,
  className,
  maxHeight,
}: {
  html: string
  raw: string
  title?: string
  className?: string
  maxHeight?: string
}) {
  return (
    <div
      data-slot="code-block"
      className={cn(
        "site-code relative overflow-hidden rounded-(--du-radius-overlay) border-(length:--du-border-surface) border-(--code-border) bg-(--code-bg) text-(--code-fg)",
        className
      )}
    >
      {title ? (
        <div className="flex h-10 items-center justify-between border-b-(length:--du-rule) border-current/15 pr-1.5 pl-4">
          <span className="font-mono text-xs opacity-70">{title}</span>
          <CopyButton value={raw} />
        </div>
      ) : (
        <CopyButton value={raw} className="absolute top-2 right-2 z-10" />
      )}
      <div
        className="overflow-auto"
        style={maxHeight ? { maxHeight } : undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export { CodeFrame }
