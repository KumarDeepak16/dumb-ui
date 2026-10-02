import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const logs = [
  { time: "14:02:11", line: "Cloning dumb-ui (main@8f2c1a)" },
  { time: "14:02:19", line: "Installing 412 packages" },
  { time: "14:03:02", line: "Compiled 96 routes in 38.4s" },
]

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="grid gap-3 pt-1 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Status</span>
          <Badge variant="success">Ready</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Duration</span>
          <span className="font-mono tabular-nums">51s</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Branch</span>
          <span className="font-mono">main</span>
        </div>
      </TabsContent>
      <TabsContent value="logs" className="pt-1">
        <ol className="grid gap-1.5 font-mono text-xs">
          {logs.map((log) => (
            <li key={log.time} className="flex gap-3">
              <span className="text-muted-foreground tabular-nums">{log.time}</span>
              {log.line}
            </li>
          ))}
        </ol>
      </TabsContent>
      <TabsContent value="settings" className="pt-1 text-sm text-muted-foreground">
        Build settings are inherited from the team defaults.
      </TabsContent>
    </Tabs>
  )
}
