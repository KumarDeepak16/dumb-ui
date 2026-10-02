import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  { id: "INV-2041", client: "Fernhill Studio", status: "Paid", amount: 1284 },
  { id: "INV-2042", client: "Kumar & Co", status: "Due", amount: 312.5 },
  { id: "INV-2043", client: "Marlow Press", status: "Paid", amount: 2045.9 },
  { id: "INV-2044", client: "Tidepool Labs", status: "Overdue", amount: 860 },
]

const tone = {
  Paid: "success",
  Due: "warning",
  Overdue: "destructive",
} as const

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

export default function TableDemo() {
  return (
    <Table className="min-w-[30rem]">
      <TableCaption>Invoices issued in September 2026.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
            <TableCell>{invoice.client}</TableCell>
            <TableCell>
              <Badge variant={tone[invoice.status as keyof typeof tone]}>
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-mono tabular-nums">
              {usd.format(invoice.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
