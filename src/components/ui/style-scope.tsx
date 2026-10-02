"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const DUMB_STYLES = ["raw", "silk", "volume", "vector", "halo"] as const

type DumbStyle = (typeof DUMB_STYLES)[number]

const PortalContainerContext = React.createContext<HTMLElement | null>(null)

/**
 * Renders a subtree in a specific Dumb UI style. Overlays opened inside the
 * scope (dialogs, menus, tooltips) portal into the scope as well, so they
 * keep the scope's style instead of inheriting the page style.
 */
function StyleScope({
  name,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { name: DumbStyle }) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(
    null
  )

  return (
    <div
      data-style={name}
      className={cn("bg-background text-foreground", className)}
      {...props}
      data-slot="style-scope"
    >
      <PortalContainerContext.Provider value={container}>
        {children}
      </PortalContainerContext.Provider>
      <div ref={setContainer} data-slot="style-scope-portal" />
    </div>
  )
}

/** Portal target for overlay components; `undefined` means document.body. */
function usePortalContainer() {
  return React.useContext(PortalContainerContext) ?? undefined
}

export { StyleScope, usePortalContainer, DUMB_STYLES, type DumbStyle }
