import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button, Heading, Pill, Section } from './index'

describe('Button', () => {
  it('renders an anchor when href is present', () => {
    render(<Button href="tel:+10000000000">Call</Button>)
    const el = screen.getByRole('link', { name: 'Call' })
    expect(el.tagName).toBe('A')
    expect(el).toHaveAttribute('href', 'tel:+10000000000')
  })

  it('renders a button when href is absent', () => {
    render(<Button onClick={() => undefined}>Menu</Button>)
    expect(screen.getByRole('button', { name: 'Menu' }).tagName).toBe('BUTTON')
  })

  it('adds rel="noopener noreferrer" to external links only', () => {
    const { rerender } = render(
      <Button href="https://example.com/external" external>
        External
      </Button>,
    )
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer')

    rerender(<Button href="#products">Products</Button>)
    expect(screen.getByRole('link')).not.toHaveAttribute('rel')
  })
})

describe('Heading', () => {
  it('honours `as` independently of `variant`', () => {
    render(
      <Heading as="h2" variant="card">
        Example Card Title
      </Heading>,
    )
    // sized like a card, but semantically a level-2 heading
    expect(
      screen.getByRole('heading', { level: 2, name: 'Example Card Title' }),
    ).toBeInTheDocument()
  })
})

describe('Section', () => {
  it('applies the requested tone and wires aria-labelledby', () => {
    render(
      <Section tone="olive" id="products" labelledBy="products-title">
        <Heading as="h2" variant="section" id="products-title">
          Products
        </Heading>
      </Section>,
    )
    const section = screen.getByRole('region', { name: 'Products' })
    expect(section).toHaveClass('bg-olive')
    expect(section).toHaveAttribute('id', 'products')
  })

  it('renders the gold seam only when asked', () => {
    const { container, rerender } = render(<Section tone="cream">x</Section>)
    expect(container.querySelector('.bg-gold')).toBeNull()

    rerender(
      <Section tone="cream" seam>
        x
      </Section>,
    )
    expect(container.querySelector('.bg-gold')).not.toBeNull()
  })
})

describe('Pill', () => {
  it('pairs a gold fill with forest text, never gold text', () => {
    const { container } = render(<Pill>Example</Pill>)
    const el = container.firstElementChild
    expect(el).toHaveClass('bg-gold')
    expect(el).toHaveClass('text-forest')
  })
})
