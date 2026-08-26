import type { Product } from '@content/types'
import { interpolate, useContent } from '@shared/i18n'
import { cn, whatsappHref } from '@shared/lib'
import { Illustration, Pill } from '@shared/ui'

export interface ProductCardProps {
  product: Product
  /** Stagger index for the reveal. */
  index: number
  revealed: boolean
}

/**
 * template.md product card, behaviour unchanged: aspect-[4/5] image at 2.5rem
 * radius, image scales 1.1x on hover, blur-reveal overlay
 * (rgba(forest,0.3) + blur(2px)) with an inner button translating up 32px.
 *
 * TWO CHANGES, both required and both in PLAN.md:
 *  - A5.2: the caption is a gold Pill, mirroring the banner's product chips.
 *  - B6:   the overlay opens on :focus-within as well as :hover. As written,
 *          template.md's hover-only reveal is invisible to keyboard users.
 */
export function ProductCard({ product, index, revealed }: ProductCardProps) {
  const { business, ui } = useContent()
  const enquiry = whatsappHref(
    business.whatsapp,
    interpolate(ui.products.enquiryMessage, { business: business.name, product: product.name }),
  )

  return (
    <article
      className="reveal group"
      data-revealed={revealed}
      style={{ transitionDelay: `${String(index * 0.08)}s` }}
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-card bg-cream">
        {product.image ? (
          <Illustration
            name={product.image.key}
            alt={product.image.alt}
            className="h-full object-contain p-6 transition-transform duration-700 ease-signature group-hover:scale-110"
          />
        ) : (
          // No matching illustration exists for Honey, Sweets or Ice Creams.
          // A typographic card is honest; a stand-in image would not be.
          <div className="flex h-full w-full items-center justify-center p-8">
            <span className="text-center font-display text-6xl leading-[0.85] text-forest/15 uppercase md:text-7xl">
              {product.name}
            </span>
          </div>
        )}

        <div
          className={cn(
            'absolute inset-0 flex items-end justify-center bg-forest/30 pb-8',
            'opacity-0 backdrop-blur-[2px] transition-opacity duration-500',
            'ease-signature group-focus-within:opacity-100 group-hover:opacity-100',
          )}
        >
          <a
            href={enquiry}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'translate-y-8 rounded-full bg-white px-6 py-3 text-forest',
              'text-[11px] font-bold tracking-widest uppercase',
              'transition-transform duration-500 ease-signature',
              'group-focus-within:translate-y-0 group-hover:translate-y-0',
              'focus-visible:translate-y-0',
            )}
          >
            {ui.products.enquire}
          </a>
        </div>
      </div>

      <div className="mt-5">
        <Pill>{product.name}</Pill>
        <p className="mt-3 font-body text-sm leading-relaxed text-forest/80">
          {product.descriptor}
        </p>
      </div>
    </article>
  )
}
