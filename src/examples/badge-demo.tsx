import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>New</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="outline">v2.4.0</Badge>
      <Badge variant="success">Live</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
    </div>
  )
}
