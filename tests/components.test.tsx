import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it, vi } from "vitest"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { StyleScope } from "@/components/ui/style-scope"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

async function expectNoAxeViolations(container: HTMLElement) {
  const result = await axe.run(container, { rules: { "color-contrast": { enabled: false } } })
  expect(result.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([])
}

describe("Button", () => {
  it("keeps the shadcn API and its own slot under asChild triggers", () => {
    render(
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Save</Button>
        </TooltipTrigger>
        <TooltipContent>Saves</TooltipContent>
      </Tooltip>
    )
    const button = screen.getByRole("button", { name: "Save" })
    expect(button).toHaveAttribute("data-slot", "button")
    expect(button).toHaveAttribute("data-variant", "outline")
  })

  it("loading blocks clicks, sets aria-busy and keeps the label for width", async () => {
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Publish
      </Button>
    )
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-busy", "true")
    expect(button).toHaveTextContent("Publish")
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it("asChild renders a link with button material", () => {
    render(
      <Button asChild>
        <a href="/docs">Docs</a>
      </Button>
    )
    const link = screen.getByRole("link", { name: "Docs" })
    expect(link).toHaveAttribute("data-slot", "button")
  })
})

describe("Form controls", () => {
  it("Input with adornments stays labelled and passes axe", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="domain">Domain</Label>
        <Input id="domain" leading="https://" trailing=".1619.in" />
      </div>
    )
    expect(screen.getByLabelText("Domain")).toHaveAttribute("data-slot", "input-control")
    await expectNoAxeViolations(container)
  })

  it("Textarea counts characters against maxLength", async () => {
    render(<Textarea aria-label="Bio" showCount maxLength={10} />)
    await userEvent.type(screen.getByLabelText("Bio"), "hello")
    expect(screen.getByText("5/10")).toBeInTheDocument()
  })

  it("Switch toggles with keyboard", async () => {
    render(<Switch aria-label="Previews" />)
    const control = screen.getByRole("switch", { name: "Previews" })
    control.focus()
    await userEvent.keyboard(" ")
    expect(control).toHaveAttribute("data-state", "checked")
  })

  it("Checkbox supports the indeterminate state", () => {
    render(<Checkbox aria-label="All" checked="indeterminate" />)
    expect(screen.getByRole("checkbox", { name: "All" })).toHaveAttribute(
      "aria-checked",
      "mixed"
    )
  })
})

describe("Tabs", () => {
  it("moves between triggers with arrow keys", async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Overview</TabsTrigger>
          <TabsTrigger value="b">Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="a">One</TabsContent>
        <TabsContent value="b">Two</TabsContent>
      </Tabs>
    )
    screen.getByRole("tab", { name: "Overview" }).focus()
    await userEvent.keyboard("{ArrowRight}")
    expect(screen.getByRole("tab", { name: "Logs" })).toHaveAttribute("data-state", "active")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Two")
  })
})

describe("Dialog", () => {
  it("opens, traps focus, closes on Escape and restores focus", async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Rename</Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>Shown in URLs.</DialogDescription>
          <Input aria-label="Name" />
        </DialogContent>
      </Dialog>
    )
    const trigger = screen.getByRole("button", { name: "Rename" })
    await userEvent.click(trigger)
    const dialog = screen.getByRole("dialog", { name: "Rename project" })
    expect(dialog).toHaveAttribute("data-size", "sm")
    expect(within(dialog).getByRole("button", { name: "Close" })).toBeInTheDocument()
    await userEvent.keyboard("{Escape}")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it("portals into a StyleScope so overlays keep the scope's style", async () => {
    render(
      <StyleScope name="volume">
        <Dialog defaultOpen>
          <DialogContent>
            <DialogTitle>Scoped</DialogTitle>
            <DialogDescription>Inside volume.</DialogDescription>
          </DialogContent>
        </Dialog>
      </StyleScope>
    )
    const dialog = await screen.findByRole("dialog")
    expect(dialog.closest('[data-style="volume"]')).not.toBeNull()
  })
})

describe("Display extras", () => {
  it("Badge onRemove renders a labelled remove button", async () => {
    const onRemove = vi.fn()
    render(<Badge onRemove={onRemove}>react</Badge>)
    await userEvent.click(screen.getByRole("button", { name: "Remove react" }))
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it("Alert onDismiss renders a dismiss button", async () => {
    const onDismiss = vi.fn()
    render(
      <Alert onDismiss={onDismiss}>
        <AlertTitle>Heads up</AlertTitle>
      </Alert>
    )
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it("AvatarGroup collapses past max and Avatar announces status", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar status="online"><AvatarFallback>DK</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>RM</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>LS</AvatarFallback></Avatar>
      </AvatarGroup>
    )
    expect(screen.getByLabelText("1 more")).toHaveTextContent("+1")
    expect(screen.getByRole("img", { name: "Online" })).toBeInTheDocument()
  })

  it("Separator label renders text between two rules", () => {
    const { container } = render(<Separator label="or" />)
    expect(screen.getByText("or")).toBeInTheDocument()
    expect(container.querySelectorAll('[data-slot="separator"]')).toHaveLength(2)
  })
})
