import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const templates = [
  { name: "Docs site", text: "MDX, search and versioned sidebars.", tag: "Next.js" },
  { name: "Storefront", text: "Cart, checkout and a product grid.", tag: "Commerce" },
]

export default function CardInteractive() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      {templates.map((template) => (
        <Card key={template.name} interactive asChild>
          <a href="#" aria-label={`Use the ${template.name} template`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {template.name}
                <ArrowUpRightIcon className="size-4 text-muted-foreground" />
              </CardTitle>
              <CardDescription>{template.text}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">{template.tag}</Badge>
            </CardContent>
          </a>
        </Card>
      ))}
    </div>
  )
}
