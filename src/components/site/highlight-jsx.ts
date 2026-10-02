/**
 * Tiny client-side JSX highlighter for live playground code. Shiki stays on
 * the server; this only needs tags, attributes, strings and braces, and emits
 * the same --shiki-* variables so colors match the static code blocks.
 */
const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const color = (variable: string, text: string) =>
  `<span style="color:var(--shiki-token-${variable})">${escape(text)}</span>`

const pattern =
  /("(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(<\/?)([A-Z][\w.]*|[a-z][\w-]*)|([\w-]+)(?==)|([{}()=>/[\]])|(\b\d+(?:\.\d+)?\b|\btrue\b|\bfalse\b|\bnull\b)/g

export function highlightJsx(code: string) {
  let html = ""
  let last = 0
  for (const match of code.matchAll(pattern)) {
    const index = match.index ?? 0
    html += escape(code.slice(last, index))
    const [all, str, open, tag, attr, punct, constant] = match
    if (str) html += color("string", str)
    else if (open) html += color("punctuation", open) + color("function", tag)
    else if (attr) html += color("parameter", attr)
    else if (punct) html += color("punctuation", punct)
    else if (constant) html += color("constant", constant)
    else html += escape(all)
    last = index + all.length
  }
  html += escape(code.slice(last))
  return `<pre class="shiki"><code>${html}</code></pre>`
}
