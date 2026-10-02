"use client"

import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const scopes = ["Read repositories", "Write issues", "Manage deployments"]

export default function CheckboxIndeterminate() {
  const [checked, setChecked] = React.useState([true, false, true])
  const all = checked.every(Boolean)
  const some = checked.some(Boolean)

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-3">
        <Checkbox
          id="scopes-all"
          checked={all ? true : some ? "indeterminate" : false}
          onCheckedChange={(value) =>
            setChecked(checked.map(() => value === true))
          }
        />
        <Label htmlFor="scopes-all">All permissions</Label>
      </div>
      <div className="grid gap-3 pl-8">
        {scopes.map((scope, index) => (
          <div key={scope} className="flex items-center gap-3">
            <Checkbox
              id={`scope-${index}`}
              checked={checked[index]}
              onCheckedChange={(value) =>
                setChecked(
                  checked.map((item, i) => (i === index ? value === true : item))
                )
              }
            />
            <Label htmlFor={`scope-${index}`}>{scope}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}
