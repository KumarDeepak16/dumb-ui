import { DocsSidebarNav } from "@/components/site/docs-sidebar"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only z-50 bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <SiteHeader progress fluid />
      {/* Fixed to the viewport: the sidebar never moves with the page, it scrolls on its own. */}
      <aside
        data-sidebar-scroll
        className="site-sidebar-scroll site-scroll-quiet fixed top-16 bottom-0 left-0 z-30 hidden w-60 overflow-y-auto border-r-(length:--du-rule) border-border bg-background px-4 py-8 lg:block"
      >
        <DocsSidebarNav />
      </aside>
      <div className="lg:pl-60">
        <main id="content" className="mx-auto w-full max-w-[72rem] min-w-0 px-4 pt-8 pb-24 sm:px-8 lg:px-12 lg:pt-10">
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
