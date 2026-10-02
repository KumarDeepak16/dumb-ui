"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

function deploy() {
  return new Promise<{ url: string }>((resolve) =>
    window.setTimeout(() => resolve({ url: "dumb-ui-8f2c.1619.in" }), 1800)
  )
}

export default function SonnerTypes() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast.success("Domain verified")}>
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Usage at 82%", {
            description: "You will hit the build minute cap in ~4 days.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Build failed", { description: "Exit code 1" })}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(deploy(), {
            loading: "Deploying preview",
            success: (data) => `Live at ${data.url}`,
            error: "Deploy failed",
          })
        }
      >
        Promise
      </Button>
    </div>
  )
}
