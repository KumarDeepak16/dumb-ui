"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const sections = ["Profile", "Notifications", "Billing", "Security", "Danger zone"]

export default function BlockSettings() {
  const [active, setActive] = React.useState("Profile")

  return (
    <section className="grid w-full gap-8 md:grid-cols-[11rem_minmax(0,1fr)]">
      <nav aria-label="Settings" className="flex gap-1 overflow-x-auto md:flex-col">
        {sections.map((section) => (
          <button
            key={section}
            type="button"
            onClick={() => setActive(section)}
            aria-current={active === section ? "true" : undefined}
            className={
              "h-8 shrink-0 cursor-pointer rounded-(--du-radius-item) px-3 text-left text-sm whitespace-nowrap transition-colors " +
              (active === section
                ? "bg-selection text-selection-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground")
            }
          >
            {section}
          </button>
        ))}
      </nav>

      <div className="grid gap-8 rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-card p-6 shadow-(--du-shadow-surface) sm:p-8">
        <div className="grid gap-5">
          <div className="grid gap-1">
            <h3 className="du-display text-xl">Profile</h3>
            <p className="text-sm text-muted-foreground">How you appear to your team.</p>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarImage src="/avatars/deepak.svg" alt="Deepak Kumar" />
              <AvatarFallback>DK</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Upload</Button>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="settings-name">Name</Label>
              <Input id="settings-name" defaultValue="Deepak Kumar" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="settings-tz">Timezone</Label>
              <Select defaultValue="ist">
                <SelectTrigger id="settings-tz" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ist">India (IST)</SelectItem>
                  <SelectItem value="cet">Berlin (CET)</SelectItem>
                  <SelectItem value="pst">San Francisco (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-5">
          <div className="grid gap-1">
            <h3 className="du-display text-xl">Notifications</h3>
            <p className="text-sm text-muted-foreground">Email only when it matters.</p>
          </div>
          {[
            { id: "fail", title: "Failed deployments", on: true },
            { id: "comments", title: "Comments on my previews", on: true },
            { id: "digest", title: "Weekly usage digest", on: false },
          ].map((row) => (
            <div key={row.id} className="flex items-center justify-between gap-4">
              <Label htmlFor={`settings-${row.id}`}>{row.title}</Label>
              <Switch id={`settings-${row.id}`} defaultChecked={row.on} />
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-(--du-radius-field) border-(length:--du-border-surface) border-destructive/50 bg-destructive/5 p-4">
          <div className="grid gap-0.5">
            <span className="font-medium text-destructive">Delete workspace</span>
            <span className="text-sm text-muted-foreground">Removes 214 deployments and 3 domains. No undo.</span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete 1619 Labs?</AlertDialogTitle>
                <AlertDialogDescription>
                  Every deployment, domain and environment variable goes with it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep it</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Delete workspace</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  )
}
