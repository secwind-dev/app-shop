import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ProductList } from '@/components/product/ProductList'
import { ProductFilters } from '@/components/product/ProductFilters'
import type { ProductFilters as ProductFiltersType } from '@/services/product'

function ProductListPage() {
  // ไม่ต้อง auth check - Protected Layout จัดการให้แล้ว!
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Products</h1>
      </div>
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
  )
}

export const Route = createFileRoute('/_protected/product/list')({
  component: ProductListPage,
  // Auth check ใน component แทน
})