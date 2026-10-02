import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"

export default function ButtonAsLink() {
  return (
    <Button asChild variant="outline">
      <a href="https://github.com" target="_blank" rel="noreferrer">
        View on GitHub
        <ArrowUpRightIcon />
      </a>
    </Button>
  )
}
