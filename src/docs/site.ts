import { componentDocs, componentGroups } from "@/docs/components"

export const siteConfig = {
  name: "Dumb UI",
  url: "https://ui.1619.in",
  description:
    "Open-source React components on shadcn/ui conventions. The same API renders as Raw, Silk or Volume.",
  github: "https://github.com/KumarDeepak16/dumb-ui",
  author: { name: "Deepak Kumar", url: "https://1619.in", github: "KumarDeepak16" },
  registry: "https://ui.1619.in/r",
  namespace: "@dumb",
}

export type NavItem = { title: string; href: string; badge?: string }
export type NavSection = { title: string; items: NavItem[] }

export const guideNav: NavItem[] = [
  { title: "Introduction", href: "/docs" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Styles", href: "/docs/styles" },
  { title: "Blocks", href: "/docs/blocks" },
  { title: "Templates", href: "/docs/templates" },
  { title: "Tokens", href: "/docs/tokens" },
  { title: "Create a component", href: "/docs/create-a-component" },
  { title: "Publishing", href: "/docs/publishing" },
  { title: "Changelog", href: "/docs/changelog" },
]

export const docsNav: NavSection[] = [
  { title: "Getting started", items: guideNav },
  ...componentGroups.map((group) => ({
    title: group,
    items: componentDocs
      .filter((doc) => doc.group === group)
      .map((doc) => ({ title: doc.title, href: `/docs/components/${doc.slug}` })),
  })),
]

/** Flat ordered list for previous/next links. */
export const docsOrder: NavItem[] = docsNav.flatMap((section) => section.items)
