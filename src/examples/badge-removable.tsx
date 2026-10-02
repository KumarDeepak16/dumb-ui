"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const initial = ["design-system", "react", "accessibility", "tokens"]

export default function BadgeRemovable() {
  const [tags, setTags] = React.useState(initial)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          onRemove={() => setTags((t) => t.filter((x) => x !== tag))}
        >
          {tag}
        </Badge>
      ))}
      {tags.length < initial.length && (
        <Button variant="link" size="sm" onClick={() => setTags(initial)}>
          Reset
        </Button>
      )}
    </div>
  )
}
