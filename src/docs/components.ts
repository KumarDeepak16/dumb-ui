export type ComponentGroup =
  | "Actions"
  | "Forms"
  | "Overlays"
  | "Navigation"
  | "Feedback"
  | "Display"
  | "Utilities"
  | "Originals"

export type PropRow = {
  prop: string
  type: string
  default?: string
  description: string
  /** Not in shadcn/ui: added by Dumb UI. */
  extra?: boolean
}

export type ComponentDoc = {
  slug: string
  title: string
  description: string
  group: ComponentGroup
  /** Upstream primitive docs, when there is one. */
  primitive?: { name: string; href: string }
  dependencies: string[]
  registryDependencies: string[]
  /** Example names in src/examples. The first one is the hero preview. */
  examples: { name: string; title: string; description?: string }[]
  usage: { imports: string; code: string }
  props?: { component: string; rows: PropRow[] }[]
  keyboard?: { keys: string; action: string }[]
}

const radix = (name: string, path: string) => ({
  name: `Radix ${name}`,
  href: `https://www.radix-ui.com/primitives/docs/components/${path}`,
})

export const componentDocs: ComponentDoc[] = [
  // ------------------------------------------------------------- Actions
  {
    slug: "button",
    title: "Button",
    description:
      "Triggers an action. Six variants, six sizes, a loading state that keeps its width, and asChild for links.",
    group: "Actions",
    dependencies: ["radix-ui", "class-variance-authority"],
    registryDependencies: ["spinner"],
    examples: [
      { name: "button-demo", title: "Button" },
      {
        name: "button-variants",
        title: "Variants",
        description:
          "Same six variants as shadcn/ui. Each style decides what a variant feels like when pressed.",
      },
      {
        name: "button-loading",
        title: "Loading",
        description:
          "`loading` blocks interaction, sets aria-busy and holds the button's width. `loadingText` swaps the label.",
      },
      {
        name: "button-icons",
        title: "With icons",
        description: "Icons size themselves; `icon` sizes make square buttons.",
      },
      {
        name: "button-as-link",
        title: "As a link",
        description: "`asChild` merges the button onto its child, keeping link semantics.",
      },
    ],
    usage: {
      imports: `import { Button } from "@/components/ui/button"`,
      code: `<Button>Continue</Button>`,
    },
    props: [
      {
        component: "Button",
        rows: [
          { prop: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"', default: '"default"', description: "Visual weight of the action." },
          { prop: "size", type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"', default: '"default"', description: "Height comes from the style's --du-h-* tokens." },
          { prop: "asChild", type: "boolean", default: "false", description: "Render the child element with button styling." },
          { prop: "loading", type: "boolean", default: "false", description: "Shows a spinner, sets aria-busy, disables the button and keeps its width.", extra: true },
          { prop: "loadingText", type: "ReactNode", description: "Label shown next to the spinner while loading.", extra: true },
        ],
      },
    ],
    keyboard: [
      { keys: "Enter", action: "Activates the button." },
      { keys: "Space", action: "Activates the button." },
    ],
  },
  {
    slug: "toggle",
    title: "Toggle",
    description: "A two-state button. Pressed state is physical in every style: it latches down.",
    group: "Actions",
    primitive: radix("Toggle", "toggle"),
    dependencies: ["radix-ui", "class-variance-authority"],
    registryDependencies: [],
    examples: [
      { name: "toggle-demo", title: "Toggle" },
      { name: "toggle-outline", title: "Outline", description: "Outline toggles read as keys on a toolbar." },
    ],
    usage: {
      imports: `import { Toggle } from "@/components/ui/toggle"`,
      code: `<Toggle aria-label="Toggle bold">\n  <TextBIcon />\n</Toggle>`,
    },
    props: [
      {
        component: "Toggle",
        rows: [
          { prop: "variant", type: '"default" | "outline"', default: '"default"', description: "Ghost or outlined key." },
          { prop: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Height from --du-h-* tokens." },
          { prop: "pressed", type: "boolean", description: "Controlled pressed state." },
          { prop: "onPressedChange", type: "(pressed: boolean) => void", description: "Called when the pressed state changes." },
        ],
      },
    ],
    keyboard: [
      { keys: "Space", action: "Toggles the pressed state." },
      { keys: "Enter", action: "Toggles the pressed state." },
    ],
  },
  {
    slug: "toggle-group",
    title: "Toggle Group",
    description: "A set of toggles that work as one control: single choice or multiple.",
    group: "Actions",
    primitive: radix("Toggle Group", "toggle-group"),
    dependencies: ["radix-ui"],
    registryDependencies: ["toggle"],
    examples: [
      { name: "toggle-group-demo", title: "Toggle Group" },
      { name: "toggle-group-multiple", title: "Multiple", description: "Text formatting with independent toggles." },
    ],
    usage: {
      imports: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`,
      code: `<ToggleGroup type="single" variant="outline">\n  <ToggleGroupItem value="day">Day</ToggleGroupItem>\n  <ToggleGroupItem value="week">Week</ToggleGroupItem>\n</ToggleGroup>`,
    },
    keyboard: [
      { keys: "Tab", action: "Moves focus into and out of the group." },
      { keys: "ArrowLeft / ArrowRight", action: "Moves focus between items." },
      { keys: "Space / Enter", action: "Toggles the focused item." },
    ],
  },

  // --------------------------------------------------------------- Forms
  {
    slug: "input",
    title: "Input",
    description:
      "A text field. Leading and trailing slots hold icons, units, prefixes or a keyboard hint without extra wrappers.",
    group: "Forms",
    dependencies: [],
    registryDependencies: [],
    examples: [
      { name: "input-demo", title: "Input" },
      { name: "input-adornments", title: "Leading and trailing", description: "`leading` and `trailing` render inside the field; focus styling moves to the wrapper." },
      { name: "input-invalid", title: "Invalid", description: "Set aria-invalid. Each style has its own error treatment." },
      { name: "input-file", title: "File", description: "Native file input with styled button." },
    ],
    usage: {
      imports: `import { Input } from "@/components/ui/input"`,
      code: `<Input type="email" placeholder="you@company.com" />`,
    },
    props: [
      {
        component: "Input",
        rows: [
          { prop: "leading", type: "ReactNode", description: "Rendered inside the field before the text.", extra: true },
          { prop: "trailing", type: "ReactNode", description: "Rendered inside the field after the text.", extra: true },
          { prop: "...props", type: 'ComponentProps<"input">', description: "All native input props." },
        ],
      },
    ],
  },
  {
    slug: "textarea",
    title: "Textarea",
    description: "Multi-line text that grows with its content, with an optional live character count.",
    group: "Forms",
    dependencies: [],
    registryDependencies: [],
    examples: [
      { name: "textarea-demo", title: "Textarea" },
      { name: "textarea-count", title: "Character count", description: "`showCount` reads `maxLength` and announces changes politely." },
    ],
    usage: {
      imports: `import { Textarea } from "@/components/ui/textarea"`,
      code: `<Textarea placeholder="What changed?" />`,
    },
    props: [
      {
        component: "Textarea",
        rows: [
          { prop: "showCount", type: "boolean", default: "false", description: "Shows a counter; uses maxLength as the limit.", extra: true },
          { prop: "...props", type: 'ComponentProps<"textarea">', description: "All native textarea props." },
        ],
      },
    ],
  },
  {
    slug: "label",
    title: "Label",
    description: "Accessible label for a control. Raw and Vector set labels in mono capitals; Silk and Volume stay sentence case.",
    group: "Forms",
    primitive: radix("Label", "label"),
    dependencies: ["radix-ui"],
    registryDependencies: [],
    examples: [{ name: "label-demo", title: "Label" }],
    usage: {
      imports: `import { Label } from "@/components/ui/label"`,
      code: `<Label htmlFor="email">Email</Label>`,
    },
  },
  {
    slug: "select",
    title: "Select",
    description: "Pick one option from a list. Keyboard typeahead, groups, and a popper that animates in the style's motion.",
    group: "Forms",
    primitive: radix("Select", "select"),
    dependencies: ["radix-ui", "@phosphor-icons/react"],
    registryDependencies: ["style-scope"],
    examples: [
      { name: "select-demo", title: "Select" },
      { name: "select-groups", title: "Groups", description: "Labelled groups with separators." },
    ],
    usage: {
      imports: `import {\n  Select,\n  SelectContent,\n  SelectItem,\n  SelectTrigger,\n  SelectValue,\n} from "@/components/ui/select"`,
      code: `<Select>\n  <SelectTrigger className="w-48">\n    <SelectValue placeholder="Region" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="fra">Frankfurt</SelectItem>\n    <SelectItem value="bom">Mumbai</SelectItem>\n  </SelectContent>\n</Select>`,
    },
    props: [
      {
        component: "SelectTrigger",
        rows: [{ prop: "size", type: '"default" | "sm"', default: '"default"', description: "Trigger height." }],
      },
      {
        component: "SelectContent",
        rows: [
          { prop: "position", type: '"popper" | "item-aligned"', default: '"popper"', description: "Popper anchors below the trigger; item-aligned overlays it like macOS." },
        ],
      },
    ],
    keyboard: [
      { keys: "Space / Enter", action: "Opens the list, or selects the focused item." },
      { keys: "ArrowUp / ArrowDown", action: "Moves between items." },
      { keys: "Esc", action: "Closes the list." },
      { keys: "A to Z", action: "Typeahead to matching item." },
    ],
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description: "Binary or mixed choice. Supports the indeterminate state for select-all rows.",
    group: "Forms",
    primitive: radix("Checkbox", "checkbox"),
    dependencies: ["radix-ui", "@phosphor-icons/react"],
    registryDependencies: [],
    examples: [
      { name: "checkbox-demo", title: "Checkbox" },
      { name: "checkbox-indeterminate", title: "Indeterminate", description: "A parent checkbox that reflects a partial selection." },
    ],
    usage: {
      imports: `import { Checkbox } from "@/components/ui/checkbox"`,
      code: `<Checkbox id="terms" />`,
    },
    keyboard: [{ keys: "Space", action: "Toggles the checkbox." }],
  },
  {
    slug: "radio-group",
    title: "Radio Group",
    description: "One choice from a short list. Radios stay round in every style so they never read as checkboxes.",
    group: "Forms",
    primitive: radix("Radio Group", "radio-group"),
    dependencies: ["radix-ui"],
    registryDependencies: [],
    examples: [
      { name: "radio-group-demo", title: "Radio Group" },
      { name: "radio-group-cards", title: "Choice cards", description: "Composed with Label to make whole rows clickable." },
    ],
    usage: {
      imports: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
      code: `<RadioGroup defaultValue="monthly">\n  <RadioGroupItem value="monthly" id="monthly" />\n  <RadioGroupItem value="yearly" id="yearly" />\n</RadioGroup>`,
    },
    keyboard: [
      { keys: "Tab", action: "Moves focus to the checked item." },
      { keys: "Arrow keys", action: "Moves and checks the next item." },
    ],
  },
  {
    slug: "switch",
    title: "Switch",
    description: "Instant on/off. Raw snaps a square block, Silk stretches a soft pill, Volume slides a 3D knob along a raised track.",
    group: "Forms",
    primitive: radix("Switch", "switch"),
    dependencies: ["radix-ui"],
    registryDependencies: [],
    examples: [
      { name: "switch-demo", title: "Switch" },
      { name: "switch-settings", title: "Settings list", description: "Rows of switches with descriptions, plus the `sm` size." },
    ],
    usage: {
      imports: `import { Switch } from "@/components/ui/switch"`,
      code: `<Switch id="previews" />`,
    },
    props: [
      {
        component: "Switch",
        rows: [
          { prop: "size", type: '"default" | "sm"', default: '"default"', description: "Scales the style's switch geometry by 0.78.", extra: true },
          { prop: "checked / defaultChecked", type: "boolean", description: "Controlled or initial state." },
          { prop: "onCheckedChange", type: "(checked: boolean) => void", description: "Called on change." },
        ],
      },
    ],
    keyboard: [{ keys: "Space / Enter", action: "Toggles the switch." }],
  },
  {
    slug: "slider",
    title: "Slider",
    description: "Pick a value or range by dragging. Optional value bubbles and formatted aria-valuetext.",
    group: "Forms",
    primitive: radix("Slider", "slider"),
    dependencies: ["radix-ui"],
    registryDependencies: [],
    examples: [
      { name: "slider-demo", title: "Slider" },
      { name: "slider-range", title: "Range with values", description: "Two thumbs, `showValue` and `formatValue` for currency." },
    ],
    usage: {
      imports: `import { Slider } from "@/components/ui/slider"`,
      code: `<Slider defaultValue={[40]} max={100} step={1} aria-label="Volume" />`,
    },
    props: [
      {
        component: "Slider",
        rows: [
          { prop: "showValue", type: 'boolean | "interaction"', default: "false", description: "Shows each thumb's value; \"interaction\" only while hovered, focused or dragged.", extra: true },
          { prop: "formatValue", type: "(value: number) => string", default: "String", description: "Formats the bubble and aria-valuetext.", extra: true },
          { prop: "aria-label", type: "string", description: "Forwarded to every thumb (with minimum/maximum suffixes for ranges)." },
        ],
      },
    ],
    keyboard: [
      { keys: "ArrowLeft / ArrowDown", action: "Decreases by one step." },
      { keys: "ArrowRight / ArrowUp", action: "Increases by one step." },
      { keys: "PageUp / PageDown", action: "Moves by a larger step." },
      { keys: "Home / End", action: "Jumps to min or max." },
    ],
  },
  {
    slug: "form",
    title: "Form",
    description: "react-hook-form + zod wiring with accessible labels, descriptions and error messages.",
    group: "Forms",
    dependencies: ["radix-ui", "react-hook-form", "@hookform/resolvers", "zod"],
    registryDependencies: ["label"],
    examples: [{ name: "form-demo", title: "Form" }],
    usage: {
      imports: `import {\n  Form,\n  FormControl,\n  FormDescription,\n  FormField,\n  FormItem,\n  FormLabel,\n  FormMessage,\n} from "@/components/ui/form"`,
      code: `<Form {...form}>\n  <form onSubmit={form.handleSubmit(onSubmit)}>\n    <FormField\n      control={form.control}\n      name="handle"\n      render={({ field }) => (\n        <FormItem>\n          <FormLabel>Handle</FormLabel>\n          <FormControl>\n            <Input {...field} />\n          </FormControl>\n          <FormMessage />\n        </FormItem>\n      )}\n    />\n  </form>\n</Form>`,
    },
  },
  {
    slug: "calendar",
    title: "Calendar",
    description: "Date and range picking on react-day-picker. Day cells use the style's ghost button physics.",
    group: "Forms",
    dependencies: ["react-day-picker", "date-fns", "@phosphor-icons/react"],
    registryDependencies: ["button"],
    examples: [
      { name: "calendar-demo", title: "Calendar" },
      { name: "calendar-range", title: "Range", description: "Two months, range selection." },
      { name: "date-picker", title: "Date picker", description: "Calendar in a Popover, triggered by an outline button." },
    ],
    usage: {
      imports: `import { Calendar } from "@/components/ui/calendar"`,
      code: `const [date, setDate] = React.useState<Date | undefined>(new Date())\n\n<Calendar mode="single" selected={date} onSelect={setDate} />`,
    },
    keyboard: [
      { keys: "Arrow keys", action: "Moves between days." },
      { keys: "PageUp / PageDown", action: "Previous / next month." },
      { keys: "Home / End", action: "Start / end of week." },
      { keys: "Enter / Space", action: "Selects the focused day." },
    ],
  },

  // ------------------------------------------------------------ Overlays
  {
    slug: "dialog",
    title: "Dialog",
    description: "A modal window for focused tasks. Raw drops in, Silk pops softly, Volume tilts up in perspective, Vector draws open from a center line.",
    group: "Overlays",
    primitive: radix("Dialog", "dialog"),
    dependencies: ["radix-ui", "@phosphor-icons/react"],
    registryDependencies: ["style-scope"],
    examples: [
      { name: "dialog-demo", title: "Dialog" },
      { name: "dialog-sizes", title: "Sizes", description: "`size` presets from sm to full." },
    ],
    usage: {
      imports: `import {\n  Dialog,\n  DialogContent,\n  DialogDescription,\n  DialogHeader,\n  DialogTitle,\n  DialogTrigger,\n} from "@/components/ui/dialog"`,
      code: `<Dialog>\n  <DialogTrigger asChild>\n    <Button variant="outline">Rename</Button>\n  </DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Rename project</DialogTitle>\n      <DialogDescription>Shown in URLs and invites.</DialogDescription>\n    </DialogHeader>\n  </DialogContent>\n</Dialog>`,
    },
    props: [
      {
        component: "DialogContent",
        rows: [
          { prop: "size", type: '"sm" | "default" | "lg" | "xl" | "full"', default: '"default"', description: "Max-width preset.", extra: true },
          { prop: "showCloseButton", type: "boolean", default: "true", description: "Renders the corner close button." },
        ],
      },
    ],
    keyboard: [
      { keys: "Esc", action: "Closes the dialog and returns focus to the trigger." },
      { keys: "Tab / Shift+Tab", action: "Cycles focus inside the dialog." },
    ],
  },
  {
    slug: "alert-dialog",
    title: "Alert Dialog",
    description: "Interrupts for a decision that cannot be undone. No dismiss on outside click.",
    group: "Overlays",
    primitive: radix("Alert Dialog", "alert-dialog"),
    dependencies: ["radix-ui"],
    registryDependencies: ["button", "style-scope"],
    examples: [{ name: "alert-dialog-demo", title: "Alert Dialog" }],
    usage: {
      imports: `import {\n  AlertDialog,\n  AlertDialogAction,\n  AlertDialogCancel,\n  AlertDialogContent,\n  AlertDialogDescription,\n  AlertDialogFooter,\n  AlertDialogHeader,\n  AlertDialogTitle,\n  AlertDialogTrigger,\n} from "@/components/ui/alert-dialog"`,
      code: `<AlertDialog>\n  <AlertDialogTrigger asChild>\n    <Button variant="destructive">Delete</Button>\n  </AlertDialogTrigger>\n  <AlertDialogContent>\n    ...\n  </AlertDialogContent>\n</AlertDialog>`,
    },
    props: [
      {
        component: "AlertDialogAction",
        rows: [{ prop: "variant", type: '"default" | "destructive"', default: '"default"', description: "Use destructive for irreversible actions.", extra: true }],
      },
    ],
    keyboard: [
      { keys: "Esc", action: "Cancels." },
      { keys: "Tab", action: "Moves between Cancel and Action." },
    ],
  },
  {
    slug: "sheet",
    title: "Sheet",
    description: "A panel that slides in from an edge for secondary tasks and navigation.",
    group: "Overlays",
    primitive: radix("Dialog", "dialog"),
    dependencies: ["radix-ui", "@phosphor-icons/react"],
    registryDependencies: ["style-scope"],
    examples: [
      { name: "sheet-demo", title: "Sheet" },
      { name: "sheet-sides", title: "Sides", description: "Top, right, bottom and left." },
    ],
    usage: {
      imports: `import {\n  Sheet,\n  SheetContent,\n  SheetHeader,\n  SheetTitle,\n  SheetTrigger,\n} from "@/components/ui/sheet"`,
      code: `<Sheet>\n  <SheetTrigger asChild>\n    <Button variant="outline">Filters</Button>\n  </SheetTrigger>\n  <SheetContent side="right" size="lg">\n    <SheetHeader>\n      <SheetTitle>Filters</SheetTitle>\n    </SheetHeader>\n  </SheetContent>\n</Sheet>`,
    },
    props: [
      {
        component: "SheetContent",
        rows: [
          { prop: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "Edge the sheet slides from." },
          { prop: "size", type: '"sm" | "default" | "lg" | "xl"', default: '"default"', description: "Width preset for left and right sheets.", extra: true },
          { prop: "showCloseButton", type: "boolean", default: "true", description: "Renders the corner close button." },
        ],
      },
    ],
    keyboard: [{ keys: "Esc", action: "Closes the sheet." }],
  },
  {
    slug: "drawer",
    title: "Drawer",
    description: "A bottom sheet with drag-to-dismiss, built on Vaul. Best on touch screens.",
    group: "Overlays",
    primitive: { name: "Vaul", href: "https://vaul.emilkowal.ski" },
    dependencies: ["vaul"],
    registryDependencies: ["style-scope"],
    examples: [{ name: "drawer-demo", title: "Drawer" }],
    usage: {
      imports: `import {\n  Drawer,\n  DrawerContent,\n  DrawerHeader,\n  DrawerTitle,\n  DrawerTrigger,\n} from "@/components/ui/drawer"`,
      code: `<Drawer>\n  <DrawerTrigger asChild>\n    <Button variant="outline">Open</Button>\n  </DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Move goal</DrawerTitle>\n    </DrawerHeader>\n  </DrawerContent>\n</Drawer>`,
    },
    keyboard: [{ keys: "Esc", action: "Closes the drawer." }],
  },
  {
    slug: "popover",
    title: "Popover",
    description: "Rich content anchored to a trigger. Non-modal; closes on outside click.",
    group: "Overlays",
    primitive: radix("Popover", "popover"),
    dependencies: ["radix-ui"],
    registryDependencies: ["style-scope"],
    examples: [{ name: "popover-demo", title: "Popover" }],
    usage: {
      imports: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`,
      code: `<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Share</Button>\n  </PopoverTrigger>\n  <PopoverContent>...</PopoverContent>\n</Popover>`,
    },
    keyboard: [
      { keys: "Space / Enter", action: "Opens the popover." },
      { keys: "Esc", action: "Closes it and returns focus." },
    ],
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "A short label on hover or focus, with an optional keyboard shortcut.",
    group: "Overlays",
    primitive: radix("Tooltip", "tooltip"),
    dependencies: ["radix-ui"],
    registryDependencies: ["style-scope"],
    examples: [
      { name: "tooltip-demo", title: "Tooltip" },
      { name: "tooltip-toolbar", title: "Toolbar with shortcuts", description: "`shortcut` renders a kbd hint after the label." },
    ],
    usage: {
      imports: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"`,
      code: `<Tooltip>\n  <TooltipTrigger asChild>\n    <Button size="icon" variant="ghost" aria-label="Search">\n      <MagnifyingGlassIcon />\n    </Button>\n  </TooltipTrigger>\n  <TooltipContent shortcut="⌘K">Search</TooltipContent>\n</Tooltip>`,
    },
    props: [
      {
        component: "TooltipContent",
        rows: [
          { prop: "shortcut", type: "ReactNode", description: "Keyboard shortcut shown after the label.", extra: true },
          { prop: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Preferred side." },
        ],
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Focus on the trigger opens the tooltip." },
      { keys: "Esc", action: "Closes it." },
    ],
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    description: "Actions and options in a menu: items, checkboxes, radio groups, submenus and shortcuts.",
    group: "Overlays",
    primitive: radix("Dropdown Menu", "dropdown-menu"),
    dependencies: ["radix-ui", "@phosphor-icons/react"],
    registryDependencies: ["style-scope"],
    examples: [
      { name: "dropdown-menu-demo", title: "Dropdown Menu" },
      { name: "dropdown-menu-options", title: "Checkbox and radio items", description: "View options in a toolbar menu." },
    ],
    usage: {
      imports: `import {\n  DropdownMenu,\n  DropdownMenuContent,\n  DropdownMenuItem,\n  DropdownMenuTrigger,\n} from "@/components/ui/dropdown-menu"`,
      code: `<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline">Open</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Rename</DropdownMenuItem>\n    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
    },
    keyboard: [
      { keys: "Space / Enter", action: "Opens the menu or activates an item." },
      { keys: "ArrowUp / ArrowDown", action: "Moves between items." },
      { keys: "ArrowRight / ArrowLeft", action: "Opens or closes a submenu." },
      { keys: "Esc", action: "Closes the menu." },
    ],
  },
  {
    slug: "command",
    title: "Command",
    description: "Fast, filterable command menu on cmdk. Inline or as a ⌘K dialog.",
    group: "Overlays",
    primitive: { name: "cmdk", href: "https://cmdk.paco.me" },
    dependencies: ["cmdk", "@phosphor-icons/react"],
    registryDependencies: ["dialog"],
    examples: [
      { name: "command-demo", title: "Command" },
      { name: "command-dialog", title: "Dialog", description: "Opens with ⌘K / Ctrl+K." },
    ],
    usage: {
      imports: `import {\n  Command,\n  CommandEmpty,\n  CommandGroup,\n  CommandInput,\n  CommandItem,\n  CommandList,\n} from "@/components/ui/command"`,
      code: `<Command>\n  <CommandInput placeholder="Type a command" />\n  <CommandList>\n    <CommandEmpty>No results.</CommandEmpty>\n    <CommandGroup heading="Project">\n      <CommandItem>New branch</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>`,
    },
    keyboard: [
      { keys: "ArrowUp / ArrowDown", action: "Moves the selection." },
      { keys: "Enter", action: "Runs the selected item." },
    ],
  },

  // ---------------------------------------------------------- Navigation
  {
    slug: "tabs",
    title: "Tabs",
    description: "Switch between views in place. Raw inverts, Silk slides a pill, Volume presses the active key down.",
    group: "Navigation",
    primitive: radix("Tabs", "tabs"),
    dependencies: ["radix-ui"],
    registryDependencies: [],
    examples: [
      { name: "tabs-demo", title: "Tabs" },
      { name: "tabs-icons", title: "With icons", description: "Icons and counts inside triggers." },
    ],
    usage: {
      imports: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`,
      code: `<Tabs defaultValue="overview">\n  <TabsList>\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="logs">Logs</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">...</TabsContent>\n</Tabs>`,
    },
    keyboard: [
      { keys: "Tab", action: "Moves focus to the active trigger, then into the panel." },
      { keys: "ArrowLeft / ArrowRight", action: "Moves between triggers." },
      { keys: "Home / End", action: "First / last trigger." },
    ],
  },
  {
    slug: "accordion",
    title: "Accordion",
    description: "Stacked sections that expand in place. Heavy rules in Raw, soft floating cards in Silk, raised blocks in Volume.",
    group: "Navigation",
    primitive: radix("Accordion", "accordion"),
    dependencies: ["radix-ui", "@phosphor-icons/react"],
    registryDependencies: [],
    examples: [{ name: "accordion-demo", title: "Accordion" }],
    usage: {
      imports: `import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from "@/components/ui/accordion"`,
      code: `<Accordion type="single" collapsible>\n  <AccordionItem value="refunds">\n    <AccordionTrigger>Do you offer refunds?</AccordionTrigger>\n    <AccordionContent>Within 30 days.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
    },
    keyboard: [
      { keys: "Space / Enter", action: "Expands or collapses the focused section." },
      { keys: "ArrowUp / ArrowDown", action: "Moves between triggers." },
    ],
  },
  {
    slug: "breadcrumb",
    title: "Breadcrumb",
    description: "Shows where the current page sits in a hierarchy.",
    group: "Navigation",
    dependencies: ["radix-ui", "@phosphor-icons/react"],
    registryDependencies: [],
    examples: [{ name: "breadcrumb-demo", title: "Breadcrumb" }],
    usage: {
      imports: `import {\n  Breadcrumb,\n  BreadcrumbItem,\n  BreadcrumbLink,\n  BreadcrumbList,\n  BreadcrumbPage,\n  BreadcrumbSeparator,\n} from "@/components/ui/breadcrumb"`,
      code: `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Billing</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`,
    },
  },
  {
    slug: "pagination",
    title: "Pagination",
    description: "Page navigation for long lists. Links use the button material, so the current page carries weight.",
    group: "Navigation",
    dependencies: ["@phosphor-icons/react"],
    registryDependencies: ["button"],
    examples: [{ name: "pagination-demo", title: "Pagination" }],
    usage: {
      imports: `import {\n  Pagination,\n  PaginationContent,\n  PaginationItem,\n  PaginationLink,\n  PaginationNext,\n  PaginationPrevious,\n} from "@/components/ui/pagination"`,
      code: `<Pagination>\n  <PaginationContent>\n    <PaginationItem>\n      <PaginationPrevious href="#" />\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink href="#" isActive>1</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationNext href="#" />\n    </PaginationItem>\n  </PaginationContent>\n</Pagination>`,
    },
  },
  {
    slug: "navigation-menu",
    title: "Navigation Menu",
    description: "Site navigation with rich dropdown panels and a shared, animated viewport.",
    group: "Navigation",
    primitive: radix("Navigation Menu", "navigation-menu"),
    dependencies: ["radix-ui", "class-variance-authority", "@phosphor-icons/react"],
    registryDependencies: [],
    examples: [{ name: "navigation-menu-demo", title: "Navigation Menu" }],
    usage: {
      imports: `import {\n  NavigationMenu,\n  NavigationMenuContent,\n  NavigationMenuItem,\n  NavigationMenuLink,\n  NavigationMenuList,\n  NavigationMenuTrigger,\n} from "@/components/ui/navigation-menu"`,
      code: `<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Product</NavigationMenuTrigger>\n      <NavigationMenuContent>...</NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`,
    },
    keyboard: [
      { keys: "Space / Enter", action: "Opens the focused trigger's panel." },
      { keys: "ArrowLeft / ArrowRight", action: "Moves between triggers." },
      { keys: "ArrowDown", action: "Moves into the open panel." },
      { keys: "Esc", action: "Closes the panel." },
    ],
  },

  // ------------------------------------------------------------ Feedback
  {
    slug: "alert",
    title: "Alert",
    description: "An inline message that stays in the page flow. Four variants and an optional dismiss button.",
    group: "Feedback",
    dependencies: ["class-variance-authority", "@phosphor-icons/react"],
    registryDependencies: [],
    examples: [
      { name: "alert-demo", title: "Alert" },
      { name: "alert-variants", title: "Variants", description: "Default, success, warning, destructive." },
      { name: "alert-dismissible", title: "Dismissible", description: "`onDismiss` renders a close button; you own the visibility." },
    ],
    usage: {
      imports: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"`,
      code: `<Alert>\n  <InfoIcon />\n  <AlertTitle>Build minutes reset on the 1st</AlertTitle>\n  <AlertDescription>You have 1,240 left this month.</AlertDescription>\n</Alert>`,
    },
    props: [
      {
        component: "Alert",
        rows: [
          { prop: "variant", type: '"default" | "success" | "warning" | "destructive"', default: '"default"', description: "Tone of the message. Destructive uses role=alert; others role=status." },
          { prop: "onDismiss", type: "() => void", description: "Renders a close button.", extra: true },
          { prop: "dismissLabel", type: "string", default: '"Dismiss"', description: "Accessible label for the close button.", extra: true },
        ],
      },
    ],
  },
  {
    slug: "sonner",
    title: "Toast",
    description: "Transient notifications on Sonner, rendered unstyled so each style owns the surface.",
    group: "Feedback",
    primitive: { name: "Sonner", href: "https://sonner.emilkowal.ski" },
    dependencies: ["sonner", "@phosphor-icons/react"],
    registryDependencies: ["button", "spinner"],
    examples: [
      { name: "sonner-demo", title: "Toast" },
      { name: "sonner-types", title: "Types", description: "Success, warning, error, and promise toasts." },
    ],
    usage: {
      imports: `import { toast } from "sonner"\nimport { Toaster } from "@/components/ui/sonner"`,
      code: `// once, in your root layout\n<Toaster />\n\n// anywhere\ntoast("Invite sent", { description: "deepak@1619.in" })`,
    },
  },
  {
    slug: "progress",
    title: "Progress",
    description: "Completion of a task. Omit the value for an indeterminate bar.",
    group: "Feedback",
    primitive: radix("Progress", "progress"),
    dependencies: ["radix-ui"],
    registryDependencies: [],
    examples: [
      { name: "progress-demo", title: "Progress" },
      { name: "progress-indeterminate", title: "Indeterminate", description: "`value={null}` when the duration is unknown." },
    ],
    usage: {
      imports: `import { Progress } from "@/components/ui/progress"`,
      code: `<Progress value={64} aria-label="Upload progress" />`,
    },
    props: [
      {
        component: "Progress",
        rows: [
          { prop: "value", type: "number | null", description: "0 to 100. null or omitted renders the indeterminate animation.", extra: true },
          { prop: "max", type: "number", default: "100", description: "Maximum value." },
        ],
      },
    ],
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    description: "Placeholder in the shape of content that is loading. Hatched, shimmering or breathing, by style.",
    group: "Feedback",
    dependencies: [],
    registryDependencies: [],
    examples: [{ name: "skeleton-demo", title: "Skeleton" }],
    usage: {
      imports: `import { Skeleton } from "@/components/ui/skeleton"`,
      code: `<Skeleton className="h-4 w-48" />`,
    },
  },
  {
    slug: "spinner",
    title: "Spinner",
    description: "Indeterminate loading indicator. Raw ticks in eight steps; Silk and Volume turn smoothly.",
    group: "Feedback",
    dependencies: ["@phosphor-icons/react"],
    registryDependencies: [],
    examples: [{ name: "spinner-demo", title: "Spinner" }],
    usage: {
      imports: `import { Spinner } from "@/components/ui/spinner"`,
      code: `<Spinner />`,
    },
  },
  {
    slug: "badge",
    title: "Badge",
    description: "Small status or category label. Removable for tags and filter chips.",
    group: "Feedback",
    dependencies: ["radix-ui", "class-variance-authority", "@phosphor-icons/react"],
    registryDependencies: [],
    examples: [
      { name: "badge-demo", title: "Badge" },
      { name: "badge-removable", title: "Removable", description: "`onRemove` renders an accessible remove button." },
    ],
    usage: {
      imports: `import { Badge } from "@/components/ui/badge"`,
      code: `<Badge variant="success">Live</Badge>`,
    },
    props: [
      {
        component: "Badge",
        rows: [
          { prop: "variant", type: '"default" | "secondary" | "outline" | "success" | "warning" | "destructive"', default: '"default"', description: "Tone." },
          { prop: "asChild", type: "boolean", default: "false", description: "Render as the child element (e.g. a link)." },
          { prop: "onRemove", type: "() => void", description: "Renders a remove button.", extra: true },
          { prop: "removeLabel", type: "string", description: 'Accessible label; defaults to "Remove {text}".', extra: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------- Display
  {
    slug: "card",
    title: "Card",
    description: "A surface that groups related content and actions. Interactive cards move with the style's physics.",
    group: "Display",
    dependencies: ["radix-ui"],
    registryDependencies: [],
    examples: [
      { name: "card-demo", title: "Card" },
      { name: "card-interactive", title: "Interactive", description: "`interactive` with `asChild` on a link: shift, lift or tint on hover." },
    ],
    usage: {
      imports: `import {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from "@/components/ui/card"`,
      code: `<Card>\n  <CardHeader>\n    <CardTitle>Usage</CardTitle>\n    <CardDescription>Resets on the 1st.</CardDescription>\n  </CardHeader>\n  <CardContent>...</CardContent>\n</Card>`,
    },
    props: [
      {
        component: "Card",
        rows: [
          { prop: "interactive", type: "boolean", default: "false", description: "Hover and press feedback using the style's surface physics.", extra: true },
          { prop: "asChild", type: "boolean", default: "false", description: "Render as the child element, e.g. a link.", extra: true },
        ],
      },
    ],
  },
  {
    slug: "avatar",
    title: "Avatar",
    description: "A person or team image with fallback initials, presence status and grouped stacks.",
    group: "Display",
    primitive: radix("Avatar", "avatar"),
    dependencies: ["radix-ui"],
    registryDependencies: [],
    examples: [
      { name: "avatar-demo", title: "Avatar" },
      { name: "avatar-group", title: "Group", description: "`AvatarGroup` with `max` collapses the rest into +N." },
    ],
    usage: {
      imports: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`,
      code: `<Avatar status="online">\n  <AvatarImage src="/avatars/deepak.svg" alt="Deepak Kumar" />\n  <AvatarFallback>DK</AvatarFallback>\n</Avatar>`,
    },
    props: [
      {
        component: "Avatar",
        rows: [{ prop: "status", type: '"online" | "away" | "busy" | "offline"', description: "Presence dot, announced to screen readers.", extra: true }],
      },
      {
        component: "AvatarGroup",
        rows: [{ prop: "max", type: "number", description: "Avatars beyond this collapse into a +N chip.", extra: true }],
      },
    ],
  },
  {
    slug: "table",
    title: "Table",
    description: "Semantic table markup with style-aware headers. Optional sticky header for scroll containers.",
    group: "Display",
    dependencies: [],
    registryDependencies: [],
    examples: [
      { name: "table-demo", title: "Table" },
      { name: "table-sticky", title: "Sticky header", description: "`<TableHeader sticky>` inside a fixed-height scroll area." },
    ],
    usage: {
      imports: `import {\n  Table,\n  TableBody,\n  TableCell,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from "@/components/ui/table"`,
      code: `<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Invoice</TableHead>\n      <TableHead>Amount</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>...</TableBody>\n</Table>`,
    },
    props: [
      {
        component: "TableHeader",
        rows: [{ prop: "sticky", type: "boolean", default: "false", description: "Keeps the header visible while the scroll parent scrolls.", extra: true }],
      },
    ],
  },
  {
    slug: "separator",
    title: "Separator",
    description: "A rule between content. Takes a label for “or” dividers.",
    group: "Display",
    primitive: radix("Separator", "separator"),
    dependencies: ["radix-ui"],
    registryDependencies: [],
    examples: [
      { name: "separator-demo", title: "Separator" },
      { name: "separator-label", title: "With label", description: "`label` sets text into the rule." },
    ],
    usage: {
      imports: `import { Separator } from "@/components/ui/separator"`,
      code: `<Separator label="or" />`,
    },
    props: [
      {
        component: "Separator",
        rows: [
          { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction of the rule." },
          { prop: "label", type: "ReactNode", description: "Text set into a horizontal rule.", extra: true },
        ],
      },
    ],
  },
  {
    slug: "kbd",
    title: "Kbd",
    description: "Keyboard keys and shortcuts. A raised keycap in Volume, a stamped block in Raw.",
    group: "Display",
    dependencies: [],
    registryDependencies: [],
    examples: [{ name: "kbd-demo", title: "Kbd" }],
    usage: {
      imports: `import { Kbd, KbdGroup } from "@/components/ui/kbd"`,
      code: `<KbdGroup>\n  <Kbd>⌘</Kbd>\n  <Kbd>K</Kbd>\n</KbdGroup>`,
    },
  },


  // ----------------------------------------------------------- Originals
  {
    slug: "number-ticker",
    title: "Number Ticker",
    description: "A number whose digits roll to each new value. Intl formatting for currency, percent and compact numbers.",
    group: "Originals",
    dependencies: [],
    registryDependencies: [],
    examples: [{ name: "number-ticker-demo", title: "Number Ticker" }],
    usage: {
      imports: `import { NumberTicker } from "@/components/ui/number-ticker"`,
      code: `<NumberTicker value={48210} format={{ style: "currency", currency: "USD" }} />`,
    },
    props: [
      {
        component: "NumberTicker",
        rows: [
          { prop: "value", type: "number", description: "The number to show. Changes roll digit by digit.", extra: true },
          { prop: "format", type: "Intl.NumberFormatOptions", description: "Currency, percent, compact notation, decimals.", extra: true },
          { prop: "locales", type: "Intl.LocalesArgument", default: '"en-US"', description: "Locale for formatting.", extra: true },
          { prop: "animateOnMount", type: "boolean", default: "true", description: "Roll up from zero on first render.", extra: true },
        ],
      },
    ],
  },
  {
    slug: "stepper",
    title: "Stepper",
    description: "Progress through a multi-step flow, horizontal or vertical. Completed steps can be revisited.",
    group: "Originals",
    dependencies: ["@phosphor-icons/react"],
    registryDependencies: [],
    examples: [
      { name: "stepper-demo", title: "Stepper" },
      { name: "stepper-vertical", title: "Vertical", description: "A delivery timeline." },
    ],
    usage: {
      imports: `import { Stepper } from "@/components/ui/stepper"`,
      code: `<Stepper\n  current={1}\n  steps={[{ title: "Account" }, { title: "Workspace" }, { title: "Deploy" }]}\n/>`,
    },
    props: [
      {
        component: "Stepper",
        rows: [
          { prop: "steps", type: "{ title: ReactNode; description?: ReactNode }[]", description: "The steps, in order.", extra: true },
          { prop: "current", type: "number", description: "Zero-based current step; earlier steps are complete.", extra: true },
          { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction.", extra: true },
          { prop: "onStepSelect", type: "(index: number) => void", description: "Makes completed steps clickable.", extra: true },
        ],
      },
    ],
  },
  {
    slug: "gauge",
    title: "Gauge",
    description: "A radial meter with role=meter. Stroke weight, caps and tick marks come from the style.",
    group: "Originals",
    dependencies: [],
    registryDependencies: [],
    examples: [{ name: "gauge-demo", title: "Gauge" }],
    usage: {
      imports: `import { Gauge } from "@/components/ui/gauge"`,
      code: `<Gauge value={64} label="CPU load" format={(v) => \`\${v}%\`} />`,
    },
    props: [
      {
        component: "Gauge",
        rows: [
          { prop: "value", type: "number", description: "Current value.", extra: true },
          { prop: "min / max", type: "number", default: "0 / 100", description: "Range.", extra: true },
          { prop: "label", type: "string", description: "Accessible name and caption.", extra: true },
          { prop: "format", type: "(value: number) => string", description: "Formats the center number and aria-valuetext.", extra: true },
          { prop: "tone", type: '"primary" | "success" | "warning" | "destructive"', default: '"primary"', description: "Color of the value arc.", extra: true },
        ],
      },
    ],
  },
  {
    slug: "rating",
    title: "Rating",
    description: "Star rating on a radio group: arrow keys, hover preview, and a read-only display mode.",
    group: "Originals",
    dependencies: ["radix-ui", "@phosphor-icons/react"],
    registryDependencies: [],
    examples: [{ name: "rating-demo", title: "Rating" }],
    usage: {
      imports: `import { Rating } from "@/components/ui/rating"`,
      code: `<Rating defaultValue={4} aria-label="Rate this article" />`,
    },
    props: [
      {
        component: "Rating",
        rows: [
          { prop: "value / defaultValue", type: "number", description: "Controlled or initial rating.", extra: true },
          { prop: "onValueChange", type: "(value: number) => void", description: "Called when the rating changes.", extra: true },
          { prop: "max", type: "number", default: "5", description: "Number of stars.", extra: true },
          { prop: "readOnly", type: "boolean", default: "false", description: "Static display, announced as Rated x out of y.", extra: true },
          { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Star size.", extra: true },
        ],
      },
    ],
    keyboard: [{ keys: "ArrowLeft / ArrowRight", action: "Changes the rating." }],
  },
  {
    slug: "shader-background",
    title: "Shader Background",
    description: "An interactive WebGL2 background painted with the active style's colors. Five presets: Press, Satin, Relief, Draft and Signal. Follows the pointer, ripples on click.",
    group: "Originals",
    dependencies: [],
    registryDependencies: [],
    examples: [
      { name: "shader-background-demo", title: "Shader Background" },
      { name: "shader-background-gallery", title: "All presets", description: "Every preset side by side, each in the current style's colors." },
    ],
    usage: {
      imports: `import { ShaderBackground } from "@/components/ui/shader-background"`,
      code: `<section className="relative isolate">\n  <ShaderBackground className="-z-10" />\n  ...\n</section>`,
    },
    props: [
      {
        component: "ShaderBackground",
        rows: [
          { prop: "preset", type: '"press" | "satin" | "relief" | "draft" | "signal"', description: "Pattern. Defaults to the one matching the nearest data-style.", extra: true },
          { prop: "interactive", type: "boolean", default: "true", description: "Follow the pointer over the parent element; click for a ripple.", extra: true },
          { prop: "speed", type: "number", default: "1", description: "Animation speed. 0 renders a still frame.", extra: true },
          { prop: "intensity", type: "number", default: "1", description: "Pattern strength, 0 to 1.", extra: true },
        ],
      },
    ],
  },

  // ----------------------------------------------------------- Utilities
  {
    slug: "style-scope",
    title: "Style Scope",
    description:
      "Renders a subtree in a different style, including overlays opened inside it. Use it for previews, theming a section, or comparing styles.",
    group: "Utilities",
    dependencies: [],
    registryDependencies: [],
    examples: [{ name: "style-scope-demo", title: "Style Scope" }],
    usage: {
      imports: `import { StyleScope } from "@/components/ui/style-scope"`,
      code: `<StyleScope name="volume">\n  <Button>Rendered in Volume</Button>\n</StyleScope>`,
    },
    props: [
      {
        component: "StyleScope",
        rows: [
          { prop: "name", type: '"raw" | "vector" | "volume"', description: "Style for this subtree.", extra: true },
          { prop: "...props", type: 'ComponentProps<"div">', description: "Native div props." },
        ],
      },
    ],
  },
]

export const componentGroups: ComponentGroup[] = [
  "Originals",
  "Actions",
  "Forms",
  "Overlays",
  "Navigation",
  "Feedback",
  "Display",
  "Utilities",
]

export function getComponentDoc(slug: string) {
  return componentDocs.find((doc) => doc.slug === slug)
}
