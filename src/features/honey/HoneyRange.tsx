import { useReveal } from '@shared/hooks'
import { useContent } from '@shared/i18n'
import { Heading, Pill, ProductGrid } from '@shared/ui'

/**
 * The banner's "PURE & NATURAL HONEY" band. Reuses ProductGrid as a variant —
 * three columns instead of six items, bullet lists instead of a descriptor.
 * No new layout system, no `isHoney` boolean.
 */
export function HoneyRange() {
  const { honeyVarieties, ui } = useContent()
  const { ref, revealed } = useReveal()

  return (
    <ProductGrid.Root tone="cream" id="honey" labelledBy="honey-title">
      <ProductGrid.Heading id="honey-title">{ui.honey.heading}</ProductGrid.Heading>

      <div ref={ref} className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-3">
        {honeyVarieties.map((variety, i) => (
          <article
            key={variety.id}
            className="reveal rounded-card border border-forest/15 p-8"
            data-revealed={revealed}
            style={{ transitionDelay: `${String(i * 0.08)}s` }}
          >
            <Pill>{variety.name}</Pill>
            <Heading as="h3" variant="card" className="mt-6 text-forest">
              {variety.name}
            </Heading>
            <ul className="mt-6 space-y-3">
              {variety.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 font-body text-sm leading-relaxed text-forest/80"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </ProductGrid.Root>
  )
}
