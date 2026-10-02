import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const routes = [
  "/", "/pricing", "/docs", "/docs/install", "/docs/styles", "/blog",
  "/blog/three-materials", "/changelog", "/login", "/signup", "/account",
  "/account/billing", "/account/tokens", "/status",
]

export default function TableSticky() {
  return (
    <div className="h-72 w-full max-w-md overflow-auto rounded-(--du-radius-field) border-(length:--du-border-surface) border-border">
      <Table>
        <TableHeader sticky>
          <TableRow>
            <TableHead>Route</TableHead>
            <TableHead className="text-right">p75 LCP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route, index) => (
            <TableRow key={route}>
              <TableCell className="font-mono text-xs">{route}</TableCell>
              <TableCell className="text-right font-mono text-xs tabular-nums">
                {(0.9 + ((index * 37) % 17) / 10).toFixed(2)}s
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
