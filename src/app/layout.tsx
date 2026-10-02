import type { Metadata, Viewport } from "next"
import Script from "next/script"
import {
  Archivo,
  Bricolage_Grotesque,
  Chakra_Petch,
  Figtree,
  Geist,
  Geist_Mono,
  Martian_Mono,
  Onest,
} from "next/font/google"

import { cn } from "@/lib/utils"
import { preferenceScript } from "@/lib/site-settings"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SiteSettingsProvider } from "@/components/site/settings-provider"

import "./globals.css"

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

const martian = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
})

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
})

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
})

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
})

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.1619.in"),
  title: {
    default: "Dumb UI: dumb components, smart styles",
    template: "%s | Dumb UI",
  },
  description:
    "Open-source React components on shadcn/ui conventions. The same API renders as Raw, Silk or Volume.",
  openGraph: {
    title: "Dumb UI",
    description:
      "One component system. Three complete visual languages. shadcn-compatible.",
    url: "https://ui.1619.in",
    siteName: "Dumb UI",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#161512" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-style="raw"
      suppressHydrationWarning
      className={cn(
        archivo.variable,
        martian.variable,
        onest.variable,
        bricolage.variable,
        chakra.variable,
        figtree.variable,
        geist.variable,
        geistMono.variable
      )}
    >
      <head>
        <Script id="dumb-preferences" strategy="beforeInteractive">
          {preferenceScript}
        </Script>
      </head>
      <body>
        <SiteSettingsProvider>
          <TooltipProvider>
            {children}
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  )
}
