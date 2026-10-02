"use client"

import * as React from "react"
import {
  ArrowClockwiseIcon,
  ArrowUpIcon,
  CodeIcon,
  CopyIcon,
  GlobeIcon,
  PaperclipIcon,
  SparkleIcon,
} from "@phosphor-icons/react/ssr"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const answer = `<StyleScope name="volume">
  <Button>Continue</Button>
</StyleScope>`

export default function BlockAiChat() {
  const [thinking, setThinking] = React.useState(false)
  const [draft, setDraft] = React.useState("")

  const send = () => {
    if (!draft.trim()) return
    setDraft("")
    setThinking(true)
    window.setTimeout(() => setThinking(false), 1800)
  }

  return (
    <section className="mx-auto flex h-[34rem] w-full max-w-2xl flex-col overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-card shadow-(--du-shadow-surface)">
      <header className="flex items-center gap-2.5 border-b-(length:--du-rule) border-border px-5 py-3.5">
        <span className="inline-flex size-7 items-center justify-center rounded-(--du-radius-item) bg-primary text-primary-foreground">
          <SparkleIcon weight="fill" className="size-4" />
        </span>
        <span className="du-display text-[0.9375rem]">Assistant</span>
        <span className="ml-auto text-xs text-muted-foreground">Knows the Dumb UI docs</span>
      </header>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-6" aria-live="polite">
        <div className="flex items-start justify-end gap-3">
          <p className="max-w-[80%] rounded-(--du-radius-overlay) bg-secondary px-4 py-2.5 text-sm text-secondary-foreground">
            How do I render one button in Volume when the page is Raw?
          </p>
          <Avatar className="size-7">
            <AvatarImage src="/avatars/deepak.svg" alt="Deepak" />
            <AvatarFallback>DK</AvatarFallback>
          </Avatar>
        </div>

        <div className="grid max-w-[88%] gap-3">
          <p className="text-sm leading-relaxed">
            Wrap it in <code className="rounded-(--du-radius-item) bg-muted px-1.5 py-0.5 font-mono text-xs">StyleScope</code>.
            Tokens resolve at the nearest <code className="rounded-(--du-radius-item) bg-muted px-1.5 py-0.5 font-mono text-xs">data-style</code>,
            so everything inside, overlays included, renders in Volume.
          </p>
          <pre className="overflow-x-auto rounded-(--du-radius-field) border-(length:--du-border-surface) border-border bg-sunken p-4 font-mono text-xs leading-relaxed">
            {answer}
          </pre>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Copy answer">
                  <CopyIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Regenerate">
                  <ArrowClockwiseIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Regenerate</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {thinking && (
          <div className="grid max-w-[70%] gap-2" role="status" aria-label="Assistant is thinking">
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        )}
      </div>

      <form
        className="grid gap-2 border-t-(length:--du-rule) border-border p-3"
        onSubmit={(event) => {
          event.preventDefault()
          send()
        }}
      >
        <Textarea
          aria-label="Message"
          placeholder="Ask about components, tokens or styles"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              event.preventDefault()
              send()
            }
          }}
          maxLength={2000}
          showCount
          className="min-h-16 resize-none"
        />
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon-sm" aria-label="Attach a file">
            <PaperclipIcon />
          </Button>
          <ToggleGroup type="multiple" size="sm" aria-label="Tools" defaultValue={["code"]}>
            <ToggleGroupItem value="web" aria-label="Search the web">
              <GlobeIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="code" aria-label="Write code">
              <CodeIcon />
            </ToggleGroupItem>
          </ToggleGroup>
          <span className="ml-auto hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
            <Kbd>⌘</Kbd>
            <Kbd>↵</Kbd>
          </span>
          <Button type="submit" size="icon-sm" aria-label="Send" disabled={!draft.trim()}>
            <ArrowUpIcon weight="bold" />
          </Button>
        </div>
      </form>
    </section>
  )
}
