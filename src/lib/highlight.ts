import "server-only"

import {
  createCssVariablesTheme,
  createHighlighter,
  type Highlighter,
} from "shiki"

const theme = createCssVariablesTheme({
  name: "dumb",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
})

let highlighter: Promise<Highlighter> | undefined

function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: [theme],
    langs: ["tsx", "ts", "bash", "json", "css"],
  })
  return highlighter
}

/** Highlights at build/request time on the server; colors come from per-style CSS variables. */
export async function highlight(
  code: string,
  lang: "tsx" | "ts" | "bash" | "json" | "css" = "tsx"
) {
  const h = await getHighlighter()
  return h.codeToHtml(code.trimEnd(), { lang, theme: "dumb" })
}
