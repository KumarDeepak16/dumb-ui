"use client"

import { examples } from "@/examples/__index"

function ViewExample({ name }: { name: string }) {
  const Example = examples[name]
  return Example ? <Example /> : null
}

export { ViewExample }
