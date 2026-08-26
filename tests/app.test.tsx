import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from '@/app/App'
import { navItems } from '@content/nav'

describe('page structure', () => {
  it('has exactly one h1 and it names the business', () => {
    const { container } = render(<App />)
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Palamuru Dairy')
  })

  it('exposes the required landmarks', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders every section the nav points at', () => {
    const { container } = render(<App />)
    for (const item of navItems) {
      const id = item.href.slice(1)
      expect(container.querySelector(`#${id}`), `missing section #${id}`).not.toBeNull()
    }
  })

  it('offers a skip link as the first focusable element', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main')
  })

  it('does not announce the hero word letter by letter', () => {
    render(<App />)
    // the staggered spans are aria-hidden; an sr-only plain copy carries the name
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Palamuru Dairy')
  })

  it('gives every external link rel="noopener noreferrer"', () => {
    const { container } = render(<App />)
    const external = container.querySelectorAll('a[target="_blank"]')
    expect(external.length).toBeGreaterThan(0)
    for (const a of external) expect(a).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders no form, no input and no cart anywhere', () => {
    const { container } = render(<App />)
    expect(container.querySelector('form')).toBeNull()
    expect(container.querySelector('input')).toBeNull()
    expect(container.querySelector('textarea')).toBeNull()
    expect(screen.queryByText(/cart/i)).toBeNull()
    expect(screen.queryByText(/newsletter|subscribe/i)).toBeNull()
  })

  it('shows no price and no hours, because neither has been supplied', () => {
    render(<App />)
    expect(screen.queryByText(/₹|Rs\.?\s?\d/)).toBeNull()
    expect(screen.queryByText(/^Hours$/i)).toBeNull()
  })

  it('renders all six products and all three honey varieties', () => {
    const { container } = render(<App />)
    const products = container.querySelector('#products')
    const honey = container.querySelector('#honey')
    expect(within(products as HTMLElement).getAllByRole('article')).toHaveLength(6)
    expect(within(honey as HTMLElement).getAllByRole('article')).toHaveLength(3)
  })

  it('gives every image an explicit width and height to reserve space', () => {
    const { container } = render(<App />)
    const imgs = container.querySelectorAll('img')
    expect(imgs.length).toBeGreaterThan(0)
    for (const img of imgs) {
      expect(img).toHaveAttribute('width')
      expect(img).toHaveAttribute('height')
    }
  })
})
