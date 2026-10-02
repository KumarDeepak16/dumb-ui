import { Kbd, KbdGroup } from "@/components/ui/kbd"

const shortcuts = [
  { action: "Search", keys: ["⌘", "K"] },
  { action: "New branch", keys: ["⌘", "B"] },
  { action: "Toggle sidebar", keys: ["⌘", "\\"] },
  { action: "Go to deployments", keys: ["G", "D"] },
]

export default function KbdDemo() {
  return (
    <dl className="grid w-full max-w-xs gap-3 text-sm">
      {shortcuts.map((shortcut) => (
        <div key={shortcut.action} className="flex items-center justify-between">
          <dt className="text-muted-foreground">{shortcut.action}</dt>
          <dd>
            <KbdGroup>
              {shortcut.keys.map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </KbdGroup>
          </dd>
        </div>
      ))}
    </dl>
  )
}
