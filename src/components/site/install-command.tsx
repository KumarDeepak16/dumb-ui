"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/site/copy-button"

const managers = {
  pnpm: (args: string) => `pnpm dlx ${args}`,
  npm: (args: string) => `npx ${args}`,
  yarn: (args: string) => `yarn dlx ${args}`,
  bun: (args: string) => `bunx --bun ${args}`,
} as const

type Manager = keyof typeof managers

const installers = {
  pnpm: (pkgs: string) => `pnpm add ${pkgs}`,
  npm: (pkgs: string) => `npm install ${pkgs}`,
  yarn: (pkgs: string) => `yarn add ${pkgs}`,
  bun: (pkgs: string) => `bun add ${pkgs}`,
} as const

const STORAGE_KEY = "dumb-pm"
const listeners = new Set<() => void>()

function useManager(): [Manager, (m: Manager) => void] {
  const manager = React.useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => {
      try {
        const value = localStorage.getItem(STORAGE_KEY)
        return value && value in managers ? (value as Manager) : "pnpm"
      } catch {
        return "pnpm"
      }
    },
    () => "pnpm" as Manager
  )
  const set = React.useCallback((m: Manager) => {
    try {
      localStorage.setItem(STORAGE_KEY, m)
    } catch {}
    listeners.forEach((cb) => cb())
  }, [])
  return [manager, set]
}

/**
 * Package-manager aware command. The chosen manager is remembered and shared
 * by every command on the page.
 */
function InstallCommand({
  command,
  kind = "dlx",
  className,
}: {
  /** For kind="dlx": the CLI invocation, e.g. `shadcn@latest add @dumb/button`. For "add": package names. */
  command: string
  kind?: "dlx" | "add"
  className?: string
}) {
  const [manager, setManager] = useManager()
  const full = kind === "dlx" ? managers[manager](command) : installers[manager](command)

  return (
    <div
      className={cn(
        "site-code overflow-hidden rounded-(--du-radius-overlay) border-(length:--du-border-surface) border-(--code-border) bg-(--code-bg) text-(--code-fg)",
        className
      )}
    >
      <div className="flex items-center justify-between border-b-(length:--du-rule) border-current/15 pr-1.5 pl-2">
        <div role="tablist" aria-label="Package manager" className="flex">
          {(Object.keys(managers) as Manager[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={m === manager}
              onClick={() => setManager(m)}
              className={cn(
                "h-9 cursor-pointer px-2.5 font-mono text-xs opacity-60 transition-opacity hover:opacity-100",
                m === manager && "underline decoration-2 underline-offset-[0.9em] opacity-100"
              )}
            >
              {m}
            </button>
          ))}
        </div>
        <CopyButton value={full} label="Copy command" />
      </div>
      <pre className="overflow-x-auto">
        <code>
          <span className="opacity-50 select-none">$ </span>
          {full}
        </code>
      </pre>
    </div>
  )
}

export { InstallCommand }
