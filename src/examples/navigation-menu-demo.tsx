import {
  BrowsersIcon,
  ChartLineUpIcon,
  CloudArrowUpIcon,
  LockKeyIcon,
} from "@phosphor-icons/react/ssr"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const product = [
  {
    title: "Deployments",
    text: "Preview every branch on its own URL.",
    icon: CloudArrowUpIcon,
  },
  {
    title: "Analytics",
    text: "Core Web Vitals from real visitors.",
    icon: ChartLineUpIcon,
  },
  {
    title: "Edge config",
    text: "Flags that update in milliseconds.",
    icon: BrowsersIcon,
  },
  {
    title: "Access control",
    text: "SSO, roles and audit history.",
    icon: LockKeyIcon,
  },
]

export default function NavigationMenuDemo() {
  return (
    // Reserve room below the bar so the open panel fits inside the preview.
    <div className="flex min-h-[22rem] w-full justify-center pt-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[min(28rem,calc(100vw-3rem))] gap-1 sm:grid-cols-2">
                {product.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink href="#">
                      <span className="flex items-center gap-2 font-medium">
                        <item.icon />
                        {item.title}
                      </span>
                      <span className="text-[0.8125rem] leading-snug text-muted-foreground">
                        {item.text}
                      </span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-56 gap-1">
                {["Docs", "Guides", "Changelog", "Status"].map((title) => (
                  <li key={title}>
                    <NavigationMenuLink href="#">{title}</NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              className={navigationMenuTriggerStyle()}
            >
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
