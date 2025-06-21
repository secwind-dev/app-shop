import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { ProductList } from '@/components/product/ProductList'
import { ProductFilters } from '@/components/product/ProductFilters'
import type { ProductFilters as ProductFiltersType } from '@/services/product'

function ProductListPage() {
  const { loading } = useAuth()
  const [filters, setFilters] = useState<ProductFiltersType>({
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  const handleFiltersChange = (newFilters: ProductFiltersType) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      sortBy: 'createdAt',
      sortOrder: 'desc'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-border border-t-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Products</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
                <ProductFilters 
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <ProductList filters={filters} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/product/list')({
  component: ProductListPage,
})