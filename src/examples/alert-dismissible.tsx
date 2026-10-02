"use client"

import * as React from "react"
import { SparkleIcon } from "@phosphor-icons/react/ssr"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AlertDismissible() {
  const [open, setOpen] = React.useState(true)

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        Show the alert again
      </Button>
    )
  }

  return (
    <Alert className="max-w-md" onDismiss={() => setOpen(false)}>
      <SparkleIcon />
      <AlertTitle>New: branch protections</AlertTitle>
      <AlertDescription>
        Require a passing build before merging into main.
      </AlertDescription>
    </Alert>
  )
}
