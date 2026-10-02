import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const releases = [
  {
    version: "0.4.0",
    date: "Oct 14",
    title: "Shader backgrounds learn to follow you",
    body: "Press, Satin, Relief and Signal now track the pointer and ripple on click, at a third of the GPU cost.",
    tags: ["Originals", "Performance"],
    people: ["deepak", "ravi"],
  },
  {
    version: "0.3.0",
    date: "Oct 07",
    title: "Silk joins the core styles",
    body: "Soft, everyday product UI. Pill controls, filled fields and a rose accent. Vector and Halo move to extras.",
    tags: ["Styles"],
    people: ["lena", "deepak", "aditi"],
  },
  {
    version: "0.2.0",
    date: "Sep 30",
    title: "Blocks",
    body: "Whole sections you can install with one command, re-skinned by whichever style is active.",
    tags: ["Blocks", "Registry"],
    people: ["tomas"],
  },
]

export default function BlockChangelog() {
  return (
    <section className="mx-auto grid w-full max-w-3xl gap-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="grid gap-2">
          <h2 className="du-display text-3xl sm:text-4xl">Changelog</h2>
          <p className="text-muted-foreground">What shipped, every week.</p>
        </div>
        <form className="flex w-full max-w-xs gap-2">
          <Input type="email" placeholder="deepak@1619.in" aria-label="Email for updates" />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>

      <ol className="relative grid gap-10 before:absolute before:top-2 before:bottom-2 before:left-[0.4375rem] before:w-(--du-rule) before:bg-border sm:before:left-[7.4375rem]">
        {releases.map((release) => (
          <li key={release.version} className="relative grid gap-3 pl-8 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8 sm:pl-0">
            <span className="absolute top-1.5 left-0 size-[0.9375rem] rounded-full border-(length:--du-border-check) border-primary bg-background sm:left-[7rem]" aria-hidden="true" />
            <div className="grid content-start gap-1 sm:pr-5 sm:text-right">
              <Badge variant="outline" className="w-fit sm:justify-self-end">v{release.version}</Badge>
              <time className="font-mono text-xs text-muted-foreground">{release.date}</time>
            </div>
            <article className="grid gap-3 sm:pl-8">
              <h3 className="du-display text-xl leading-snug">{release.title}</h3>
              <p className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted-foreground">{release.body}</p>
              <div className="flex flex-wrap items-center gap-3">
                <AvatarGroup>
                  {release.people.map((who) => (
                    <Avatar key={who} className="size-7">
                      <AvatarImage src={`/avatars/${who}.svg`} alt={who} />
                      <AvatarFallback>{who.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
                {release.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
                <Button variant="link" size="sm" className="ml-auto px-0">
                  Read more
                  <ArrowRightIcon />
                </Button>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
