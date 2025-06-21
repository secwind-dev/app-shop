import React from 'react'
import { Button } from '@/components/ui/button'
import { ProductCard } from './ProductCard'
import { getProducts, type Product, type ProductFilters as Filters } from '@/services/product'

interface ProductListProps {
  filters: Filters
}

export function ProductList({ filters }: ProductListProps) {
  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  const fetchProducts = React.useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const fetchedProducts = await getProducts(filters)
      setProducts(fetchedProducts)
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [filters])

  React.useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-border border-t-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground font-medium">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive font-medium mb-4">{error}</p>
          <Button onClick={fetchProducts}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Products</h2>
          <p className="text-muted-foreground">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={fetchProducts}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div>
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No products found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or check back later for new products.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}