import { products } from '@content/products'
import { useReveal } from '@shared/hooks'
import { Button, ProductGrid } from '@shared/ui'

import { ProductCard } from './ProductCard'

export function Products() {
  const { ref, revealed } = useReveal()

  return (
    <ProductGrid.Root tone="olive" id="products" labelledBy="products-title">
      <ProductGrid.Heading
        id="products-title"
        action={
          <Button href="#visit" variant="circle" tone="forest" className="hidden shrink-0 md:flex">
            Visit us
          </Button>
        }
      >
        Products
      </ProductGrid.Heading>

      <div ref={ref} className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} revealed={revealed} />
        ))}
      </div>
    </ProductGrid.Root>
  )
}
