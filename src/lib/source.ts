import "server-only"

import { readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()

/** Reads an example's source for the Code tab. */
export async function readExampleSource(name: string) {
  return readFile(path.join(root, "src", "examples", `${name}.tsx`), "utf8")
}

/** Reads a library component's source for the manual install section. */
export async function readComponentSource(slug: string) {
  return readFile(path.join(root, "src", "components", "ui", `${slug}.tsx`), "utf8")
}
