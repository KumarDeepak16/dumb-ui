import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The Dumb UI elephant: a folded-paper elephant. Facets are tinted with the
 * active style's highlight color at four steps; the fold lines use the text
 * color. Source artwork: elephant.svg (64-unit grid, cropped to the figure).
 */
const ELEPHANT_VIEWBOX = "3.6 12.6 57.2 38.4"

const ELEPHANT_FACETS: { tone: 0 | 1 | 2 | 3; d: string }[] = [
  { tone: 2, d: "M9.91,25.94v-2.65l-2.52-.81c-.3,.14-.55,.35-.75,.61l-1.38,1.89c-.36,.49-.37,1.15-.02,1.66l.66,.96c.31,.46,.95,.57,1.39,.24l2.61-1.9Z" },
  { tone: 1, d: "M14.26,31.5l3.65-2.14-1.67-3.44-3.05-2.94c-.47-.45-1.09-.7-1.75-.7h-3.18c-.3,0-.6,.07-.87,.21l2.52,3.46,3.65,5.02c.18,.24,.42,.43,.69,.54h0Z" },
  { tone: 2, d: "M55.68,33.44l-1.25,3.18,1.25,3.16,3.08-3.08c.37-.37,.31-.99-.12-1.28l-2.95-1.98Z" },
  { tone: 3, d: "M55.68,33.44l-1.25,3.18,1.25,3.16,1.4-1.4v-4l-1.4-.94Z" },
  { tone: 1, d: "M55.42,28.04l-8.87,4.84-4.21,7.07,4.66,7.98c.32,.54,.9,.88,1.53,.88h6.14c.56,0,1.01-.46,1.01-1.02V28.81c-.01-.28-.1-.55-.26-.78h0Z" },
  { tone: 0, d: "M40.51,22.17l-14.62,9.61v16c0,.56,.45,1.02,1.01,1.02h4.69c.65,0,1.28-.24,1.77-.68l8.97-8.17,13.08-11.91c-.16-.27-.4-.47-.69-.59l-14.22-5.28Z" },
  { tone: 1, d: "M38.88,15.48l-10.22,5.95-4.47,8.72,1.74,1.62,4.27,3.96c.44,.41,1.09,.5,1.63,.24l9.47-4.65c.53-.26,.82-.84,.71-1.42l-1.5-7.73-1.15-5.97c-.07-.29-.24-.54-.48-.71h0Z" },
  { tone: 0, d: "M21.06,15.2c-.61,0-1.15,.38-1.35,.96l-3.46,9.76-1.98,5.59c.28,.12,.6,.16,.9,.11l9.01-1.46h0l14.7-14.67c-.21-.17-.46-.27-.73-.28H21.06Z" },
  { tone: 3, d: "M7.4,22.48l1.21,4.41,1.31-.95-2.52-3.46Z" },
  { tone: 2, d: "M14.26,31.5l1.98-5.59-1.6-1.54-.38,7.13Z" },
  { tone: 2, d: "M55.42,28.04l-10.75,15.9-2.33-3.99,13.08-11.91Z" },
]

const ELEPHANT_OUTLINE =
  "M55.07,26.51l-13.69-5.08-1.05-5.42c-.2-1.05-1.12-1.81-2.19-1.81H21.06c-1.03,0-1.95,.65-2.3,1.62l-2.94,8.29-1.93-1.86c-.66-.63-1.52-.98-2.44-.98h-3.19c-.95,0-1.86,.46-2.42,1.23l-1.37,1.89c-.61,.83-.62,1.96-.04,2.81l.66,.96c.3,.44,.75,.73,1.27,.83,.52,.1,1.05-.01,1.53-.35l1.8-1.31,3.07,4.21c.59,.81,1.57,1.22,2.57,1.06l8.53-1.38,1.04,.96v15.6c0,1.11,.9,2.02,2.01,2.02h4.69c.9,0,1.77-.33,2.44-.94l8.06-7.34,4.04,6.91c.5,.85,1.41,1.37,2.39,1.37h6.14c1.11,0,2.01-.9,2.01-2.02v-7.59l2.78-2.79c.71-.71,.71-1.88,0-2.59-.09-.09-.18-.17-.28-.23l-2.51-1.68v-4.09c0-1.02-.64-1.95-1.6-2.31Zm-28.47,4.53l-.98-.91,12.92-12.89,.99,5.12h0l1.54,7.97-9.96,4.89-4.5-4.17Zm-5.96-14.55c.06-.17,.23-.29,.41-.29h15.69l-13.04,13.02-8.03,1.3,4.97-14.03ZM6.73,27.03l-.66-.96c-.1-.15-.1-.35,0-.5l1.16-1.6,1.27,1.75-1.78,1.31Zm2.48-3.76h2.24c.39,0,.77,.15,1.05,.42l2.59,2.49-1.23,3.47-4.64-6.38Zm23.47,24.1c-.3,.27-.69,.42-1.09,.42l-4.7-.02v-13.74l3.36,3.11c.31,.29,.76,.34,1.12,.16l11.27-5.53c.41-.2,.63-.64,.54-1.09l-1.35-6.97,11.96,4.44-21.11,19.21Zm21.98,.42h-6.14c-.27,0-.53-.15-.66-.38l-4.25-7.28,11.07-10.08v17.74Zm3.23-11.66l-1.23,1.23v-2.05l1.23,.82Z"

const facetOpacity = [0.08, 0.2, 0.34, 0.55] as const

function ElephantMark({
  className,
  title,
  ...props
}: React.ComponentProps<"svg"> & { title?: string }) {
  return (
    <svg
      viewBox={ELEPHANT_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn("h-6 w-auto shrink-0", className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g fill="var(--logo-facet, currentColor)">
        {ELEPHANT_FACETS.map((facet, index) => (
          <path key={index} d={facet.d} fillOpacity={facetOpacity[facet.tone]} />
        ))}
      </g>
      <path d={ELEPHANT_OUTLINE} fill="currentColor" />
    </svg>
  )
}

function Logo({
  className,
  withWordmark = true,
}: {
  className?: string
  withWordmark?: boolean
}) {
  return (
    <span
      data-slot="site-logo"
      className={cn("inline-flex items-center gap-2.5 text-foreground", className)}
    >
      <ElephantMark className="site-logo-mark h-6" />
      {withWordmark && (
        <span className="site-display text-[1.0625rem] leading-none">
          Dumb UI
        </span>
      )}
    </span>
  )
}

export { ElephantMark, Logo, ELEPHANT_FACETS, ELEPHANT_OUTLINE, ELEPHANT_VIEWBOX }
