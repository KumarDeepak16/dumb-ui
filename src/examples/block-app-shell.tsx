import {
  ArrowsClockwiseIcon,
  ChartLineIcon,
  CloudArrowUpIcon,
  DotsThreeIcon,
  GearSixIcon,
  GitBranchIcon,
  GlobeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react/ssr"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const nav = [
  { label: "Deployments", icon: CloudArrowUpIcon, active: true },
  { label: "Analytics", icon: ChartLineIcon },
  { label: "Domains", icon: GlobeIcon },
  { label: "Settings", icon: GearSixIcon },
]

const rows = [
  { message: "Fix checkout rounding", branch: "main", status: "Ready", who: "deepak", when: "2m" },
  { message: "Add Silk style tokens", branch: "feat/silk", status: "Building", who: "lena", when: "9m" },
  { message: "Shader adaptive quality", branch: "perf/shader", status: "Ready", who: "ravi", when: "1h" },
  { message: "Bump radix-ui", branch: "deps/radix", status: "Failed", who: "aditi", when: "3h" },
]

const tone = { Ready: "success", Building: "secondary", Failed: "destructive" } as const

export default function BlockAppShell() {
  return (
    <section className="grid min-h-[34rem] w-full overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-background shadow-(--du-shadow-surface) md:grid-cols-[13rem_minmax(0,1fr)]">
      <aside className="hidden flex-col gap-1 border-r-(length:--du-rule) border-border bg-sunken p-3 md:flex">
        <div className="mb-3 flex items-center gap-2 px-2 py-1.5">
          <span className="inline-flex size-6 items-center justify-center rounded-(--du-radius-item) bg-primary text-[0.625rem] font-bold text-primary-foreground">
            16
          </span>
          <span className="du-display text-sm">1619 Labs</span>
        </div>
        {nav.map((item) => (
          <a
            key={item.label}
            href="#"
            aria-current={item.active ? "page" : undefined}
            className={
              "flex h-8 items-center gap-2.5 rounded-(--du-radius-item) px-2 text-sm transition-colors " +
              (item.active
                ? "bg-selection text-selection-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground")
            }
          >
            <item.icon className="size-4" />
            {item.label}
          </a>
        ))}
        <div className="mt-auto flex items-center gap-2.5 rounded-(--du-radius-item) px-2 py-2">
          <Avatar className="size-7">
            <AvatarImage src="/avatars/deepak.svg" alt="" />
            <AvatarFallback>DK</AvatarFallback>
          </Avatar>
          <span className="grid text-xs leading-tight">
            <span className="font-medium">Deepak Kumar</span>
            <span className="text-muted-foreground">Owner</span>
          </span>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex items-center gap-3 border-b-(length:--du-rule) border-border px-4 py-3">
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>dumb-ui</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Deployments</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Input
            aria-label="Search deployments"
            placeholder="Search"
            className="ml-auto h-(--du-h-sm) max-w-56"
            leading={<MagnifyingGlassIcon />}
            trailing={<Kbd>⌘K</Kbd>}
          />
        </header>

        <div className="grid gap-5 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="grid gap-0.5">
              <h2 className="du-display text-2xl">Deployments</h2>
              <p className="text-sm text-muted-foreground">Every push gets a preview. Production follows main.</p>
            </div>
            <Button>
              <PlusIcon weight="bold" />
              New deployment
            </Button>
          </div>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="production">Production</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="overflow-hidden rounded-(--du-radius-field) border-(length:--du-border-surface) border-border bg-card">
            <Table className="min-w-[36rem]">
              <TableHeader>
                <TableRow>
                  <TableHead>Commit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-right">Age</TableHead>
                  <TableHead className="w-10"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.message}>
                    <TableCell>
                      <span className="grid gap-0.5">
                        <span className="font-medium">{row.message}</span>
                        <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                          <GitBranchIcon className="size-3" />
                          {row.branch}
                        </span>
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={tone[row.status as keyof typeof tone]}>{row.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Avatar className="size-7">
                        <AvatarImage src={`/avatars/${row.who}.svg`} alt={row.who} />
                        <AvatarFallback>{row.who.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-muted-foreground">{row.when}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${row.message}`}>
                            <DotsThreeIcon weight="bold" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <ArrowsClockwiseIcon />
                            Redeploy
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <GlobeIcon />
                            Visit preview
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            <TrashIcon />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  )
}
