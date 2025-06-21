import React, { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/components/auth/AuthProvider'
import { ProductList } from '@/components/product/ProductList'
import { ProductFilters } from '@/components/product/ProductFilters'
import { LoadingSpinner } from '@/components/ui/loading'
import type { ProductFilters as ProductFiltersType } from '@/services/product'

function ProductListPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
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

  // Auto-redirect หาก user ไม่ได้ login
  React.useEffect(() => {
    if (!loading && !user) {
      navigate({ to: '/login' })
    }
  }, [user, loading, navigate])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <LoadingSpinner message="Redirecting to login..." />
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
  // Auth check ใน component แทน
})