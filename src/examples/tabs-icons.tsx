import {
  ChatCircleIcon,
  CheckCircleIcon,
  CircleDashedIcon,
} from "@phosphor-icons/react/ssr"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsIcons() {
  return (
    <Tabs defaultValue="open" className="w-full max-w-md">
      <TabsList className="w-full">
        <TabsTrigger value="open">
          <CircleDashedIcon />
          Open
          <span className="font-mono text-xs opacity-70">12</span>
        </TabsTrigger>
        <TabsTrigger value="review">
          <ChatCircleIcon />
          In review
          <span className="font-mono text-xs opacity-70">4</span>
        </TabsTrigger>
        <TabsTrigger value="done">
          <CheckCircleIcon />
          Done
        </TabsTrigger>
      </TabsList>
      <TabsContent value="open" className="pt-1 text-sm text-muted-foreground">
        12 issues waiting for an owner.
      </TabsContent>
      <TabsContent value="review" className="pt-1 text-sm text-muted-foreground">
        4 pull requests need a second approval.
      </TabsContent>
      <TabsContent value="done" className="pt-1 text-sm text-muted-foreground">
        Closed issues from the last 14 days.
      </TabsContent>
    </Tabs>
  )
}
