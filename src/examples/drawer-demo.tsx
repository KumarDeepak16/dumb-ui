"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function DrawerDemo() {
  const [goal, setGoal] = React.useState(350)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Set daily goal</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move goal</DrawerTitle>
            <DrawerDescription>Active calories per day.</DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center justify-center gap-6 px-(--du-pad-surface) py-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Decrease"
              onClick={() => setGoal((g) => Math.max(200, g - 10))}
              disabled={goal <= 200}
            >
              <MinusIcon weight="bold" />
            </Button>
            <div className="w-32 text-center">
              <div className="site-display text-6xl tabular-nums" aria-live="polite">
                {goal}
              </div>
              <div className="site-label mt-1 text-muted-foreground">kcal/day</div>
            </div>
            <Button
              variant="outline"
              size="icon"
              aria-label="Increase"
              onClick={() => setGoal((g) => Math.min(800, g + 10))}
              disabled={goal >= 800}
            >
              <PlusIcon weight="bold" />
            </Button>
          </div>
          <DrawerFooter>
            <Button>Save goal</Button>
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
