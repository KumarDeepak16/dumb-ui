/**
 * Generates registry.json from the component docs and the style CSS, then the
 * shadcn CLI turns it into public/r/*.json.
 *
 *   pnpm registry                      # https://ui.1619.in
 *   REGISTRY_URL=http://localhost:3000 pnpm registry
 */
import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import postcss, { type ChildNode } from "postcss"

import { componentDocs } from "../src/docs/components"

const root = path.join(import.meta.dirname, "..")
const base = (process.env.REGISTRY_URL ?? "https://ui.1619.in").replace(/\/$/, "")
const item = (name: string) => `${base}/r/${name}.json`

type CssObject = { [key: string]: string | CssObject }

/**
 * Converts the stylesheet into the nested object shape the shadcn CLI merges
 * into the consumer's CSS. @custom-variant is dropped: shadcn projects already
 * define the dark variant.
 */
function cssToObject(nodes: ChildNode[]): CssObject {
  const out: CssObject = {}
  for (const node of nodes) {
    if (node.type === "decl") {
      out[node.prop] = node.value
    } else if (node.type === "rule") {
      const key = node.selector.replace(/\s+/g, " ")
      out[key] = { ...((out[key] as CssObject) ?? {}), ...cssToObject(node.nodes) }
    } else if (node.type === "atrule") {
      if (node.name === "custom-variant") continue
      const key = `@${node.name}${node.params ? ` ${node.params}` : ""}`
      out[key] = node.nodes
        ? { ...((out[key] as CssObject) ?? {}), ...cssToObject(node.nodes) }
        : {}
    }
  }
  return out
}

const css = cssToObject(
  postcss.parse(readFileSync(path.join(root, "src/styles/dumb-ui.css"), "utf8")).nodes
)

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "dumb",
  homepage: base,
  items: [
    {
      name: "dumb-ui",
      type: "registry:style",
      title: "Dumb UI styles",
      description:
        "Raw, Halo and Volume token sets plus the material layer. Set data-style on <html> to pick one.",
      dependencies: ["clsx", "tailwind-merge"],
      registryDependencies: [],
      css,
      docs: `Dumb UI styles installed. Set data-style="raw" | "halo" | "volume" on <html>, and load the fonts you use: see ${base}/docs/installation.`,
      files: [],
    },
    ...componentDocs.map((doc) => ({
      name: doc.slug,
      type: "registry:ui",
      title: doc.title,
      description: doc.description,
      dependencies: doc.dependencies,
      registryDependencies: [
        item("dumb-ui"),
        ...doc.registryDependencies.map(item),
      ],
      files: [
        {
          path: `src/components/ui/${doc.slug}.tsx`,
          type: "registry:ui",
        },
      ],
    })),
    {
      name: "all",
      type: "registry:item",
      title: "All components",
      description: "Every Dumb UI component and the style layer.",
      registryDependencies: [item("dumb-ui"), ...componentDocs.map((doc) => item(doc.slug))],
      files: [],
    },
  ],
}

writeFileSync(path.join(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n")
console.log(`registry.json: ${registry.items.length} items -> ${base}`)
