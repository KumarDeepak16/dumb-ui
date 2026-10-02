import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { StyleScope, type DumbStyle } from "@/components/ui/style-scope"

const styles: DumbStyle[] = ["raw", "vector", "volume"]

export default function StyleScopeDemo() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {styles.map((name) => (
        <StyleScope
          key={name}
          name={name}
          className="flex flex-col items-start gap-4 rounded-(--du-radius-surface) p-5"
        >
          <code className="font-mono text-xs text-muted-foreground">
            name=&quot;{name}&quot;
          </code>
          <Switch defaultChecked aria-label={`Example switch in ${name}`} />
          <Button size="sm">Continue</Button>
        </StyleScope>
      ))}
    </div>
  )
}
