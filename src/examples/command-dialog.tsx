"use client"

import * as React from "react"
import {
  BookOpenIcon,
  GitBranchIcon,
  MoonIcon,
  SignOutIcon,
} from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "j" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open palette
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>J</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="What do you need?" />
        <CommandList>
          <CommandEmpty>Nothing matches that.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => setOpen(false)}>
              <GitBranchIcon />
              Switch branch
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <BookOpenIcon />
              Open docs
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <MoonIcon />
              Toggle theme
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <SignOutIcon />
              Sign out
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
