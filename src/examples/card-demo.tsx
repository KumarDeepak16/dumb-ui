import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const usage = [
  { label: "Build minutes", used: 4760, limit: 6000, unit: "min" },
  { label: "Bandwidth", used: 312, limit: 1000, unit: "GB" },
  { label: "Image optimizations", used: 4100, limit: 5000, unit: "" },
]

export default function CardDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Usage this cycle</CardTitle>
        <CardDescription>Resets in 9 days, on 11 October.</CardDescription>
        <CardAction>
          <Badge variant="outline">Team plan</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-5">
        {usage.map((item) => {
          const pct = Math.round((item.used / item.limit) * 100)
          return (
            <div key={item.label} className="grid gap-2">
              <div className="flex items-baseline justify-between text-sm">
                <span id={`usage-${item.label}`}>{item.label}</span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {item.used.toLocaleString("en-US")} / {item.limit.toLocaleString("en-US")} {item.unit}
                </span>
              </div>
              <Progress value={pct} aria-labelledby={`usage-${item.label}`} />
            </div>
          )
        })}
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-[0.8125rem] text-muted-foreground">
          Overage billed at $0.008/min
        </span>
        <Button size="sm">Upgrade</Button>
      </CardFooter>
    </Card>
  )
}
