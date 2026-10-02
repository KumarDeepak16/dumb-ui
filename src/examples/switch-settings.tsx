import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const settings = [
  {
    id: "builds",
    title: "Failed builds",
    detail: "Email the commit author when a build fails.",
    on: true,
  },
  {
    id: "comments",
    title: "Preview comments",
    detail: "Notify me when someone comments on a preview.",
    on: true,
  },
  {
    id: "usage",
    title: "Usage alerts",
    detail: "Warn at 80% of the monthly build minutes.",
    on: false,
  },
]

export default function SwitchSettings() {
  return (
    <div className="w-full max-w-md">
      {settings.map((setting, index) => (
        <div key={setting.id}>
          {index > 0 && <Separator className="my-4" />}
          <div className="flex items-start justify-between gap-6">
            <div className="grid gap-1.5">
              <Label htmlFor={`setting-${setting.id}`}>{setting.title}</Label>
              <p className="text-[0.8125rem] text-muted-foreground">
                {setting.detail}
              </p>
            </div>
            <Switch
              id={`setting-${setting.id}`}
              size={index === 2 ? "sm" : "default"}
              defaultChecked={setting.on}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
