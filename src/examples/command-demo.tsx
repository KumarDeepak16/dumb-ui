import {
  ArrowsClockwiseIcon,
  GearSixIcon,
  GitBranchIcon,
  GlobeIcon,
  KeyIcon,
  UserPlusIcon,
} from "@phosphor-icons/react/ssr"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export default function CommandDemo() {
  return (
    <Command className="w-full max-w-md">
      <CommandInput placeholder="Type a command or search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Project">
          <CommandItem>
            <GitBranchIcon />
            New branch
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <ArrowsClockwiseIcon />
            Redeploy production
          </CommandItem>
          <CommandItem>
            <GlobeIcon />
            Add domain
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Team">
          <CommandItem>
            <UserPlusIcon />
            Invite member
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <KeyIcon />
            Create access token
          </CommandItem>
          <CommandItem>
            <GearSixIcon />
            Settings
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
