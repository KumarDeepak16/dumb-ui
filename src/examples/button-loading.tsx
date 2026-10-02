"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

export default function ButtonLoading() {
  const [saving, setSaving] = React.useState(false)
  const [publishing, setPublishing] = React.useState(false)

  const run = (set: (value: boolean) => void) => {
    set(true)
    window.setTimeout(() => set(false), 1800)
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button loading={saving} onClick={() => run(setSaving)}>
        Save changes
      </Button>
      <Button
        variant="outline"
        loading={publishing}
        loadingText="Publishing"
        onClick={() => run(setPublishing)}
      >
        Publish
      </Button>
    </div>
  )
}
