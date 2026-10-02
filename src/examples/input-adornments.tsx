import {
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/ssr"

import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"

export default function InputAdornments() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <Input
        aria-label="Search projects"
        placeholder="Search projects"
        leading={<MagnifyingGlassIcon />}
        trailing={<Kbd>⌘K</Kbd>}
      />
      <div className="grid gap-2">
        <Label htmlFor="input-domain">Custom domain</Label>
        <Input
          id="input-domain"
          placeholder="docs"
          leading={<span>https://</span>}
          trailing={<span>.1619.in</span>}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="input-budget">Monthly budget</Label>
        <Input
          id="input-budget"
          type="number"
          defaultValue={240}
          leading={<CurrencyDollarIcon />}
          trailing={<span>USD</span>}
        />
      </div>
    </div>
  )
}
