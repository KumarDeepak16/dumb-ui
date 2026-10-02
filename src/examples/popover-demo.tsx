import { LinkSimpleIcon } from "@phosphor-icons/react/ssr"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const people = [
  { initials: "DK", name: "Deepak Kumar", role: "Owner", img: "deepak" },
  { initials: "RM", name: "Ravi Menon", role: "Can edit", img: "ravi" },
]

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <LinkSimpleIcon />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <h4 className="du-display text-[0.9375rem]">Share preview</h4>
            <p className="text-[0.8125rem] text-muted-foreground">
              Anyone in 1619 Labs can open this link.
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              aria-label="Email to invite"
              placeholder="name@1619.in"
              className="h-(--du-h-sm)"
            />
            <Button size="sm">Invite</Button>
          </div>
          <ul className="grid gap-3">
            {people.map((person) => (
              <li key={person.name} className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage src={`/avatars/${person.img}.svg`} alt="" />
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
                <span className="flex-1 text-sm">{person.name}</span>
                {person.role === "Owner" ? (
                  <span className="text-[0.8125rem] text-muted-foreground">Owner</span>
                ) : (
                  <Select defaultValue="edit">
                    <SelectTrigger size="sm" aria-label={`${person.name} access`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">Can view</SelectItem>
                      <SelectItem value="edit">Can edit</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
