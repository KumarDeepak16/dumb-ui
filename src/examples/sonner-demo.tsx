"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Invite sent", {
          description: "deepak@1619.in can join until Friday.",
          action: { label: "Undo", onClick: () => {} },
        })
      }
    >
      Send invite
    </Button>
  )
}
