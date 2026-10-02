import { highlight } from "@/lib/highlight"
import { CodeFrame } from "@/components/site/code-frame"

/** Server-rendered, syntax-highlighted code with a copy button. */
async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
  maxHeight,
}: {
  code: string
  lang?: "tsx" | "ts" | "bash" | "json" | "css"
  title?: string
  className?: string
  maxHeight?: string
}) {
  const html = await highlight(code, lang)
  return (
    <CodeFrame
      html={html}
      raw={code}
      title={title}
      className={className}
      maxHeight={maxHeight}
    />
  )
}

export { CodeBlock }
