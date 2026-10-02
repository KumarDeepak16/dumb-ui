import { GithubLogoIcon } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function SeparatorLabel() {
  return (
    <div className="grid w-full max-w-xs gap-4">
      <Button variant="outline">
        <GithubLogoIcon />
        Continue with GitHub
      </Button>
      <Separator label="or" />
      <Input type="email" placeholder="you@company.com" aria-label="Email" />
      <Button>Email me a link</Button>
    </div>
  )
}
