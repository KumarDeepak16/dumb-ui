import { GithubLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShaderBackground } from "@/components/ui/shader-background"

export default function BlockSignIn() {
  return (
    <section className="relative isolate grid min-h-[34rem] w-full place-items-center overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border p-6">
      <ShaderBackground className="-z-10" intensity={0.8} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in to Dumb UI</CardTitle>
          <CardDescription>Welcome back, Deepak.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">
              <GithubLogoIcon />
              GitHub
            </Button>
            <Button variant="outline">
              <GoogleLogoIcon />
              Google
            </Button>
          </div>
          <Separator label="or with email" />
          <div className="grid gap-2">
            <Label htmlFor="block-email">Email</Label>
            <Input id="block-email" type="email" placeholder="deepak@1619.in" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="block-password">Password</Label>
              <a href="#" className="text-[0.8125rem] text-muted-foreground underline underline-offset-4 hover:text-foreground">
                Forgot?
              </a>
            </div>
            <Input id="block-password" type="password" />
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox id="block-remember" defaultChecked />
            <Label htmlFor="block-remember">Keep me signed in</Label>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button className="w-full">Sign in</Button>
          <p className="text-[0.8125rem] text-muted-foreground">
            New here? <a href="#" className="text-foreground underline underline-offset-4">Create an account</a>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}
