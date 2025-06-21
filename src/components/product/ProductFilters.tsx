import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ProductFilters } from '@/services/product'

interface ProductFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  onClearFilters: () => void
}

export function ProductFilters({ filters, onFiltersChange, onClearFilters }: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '')

  // Sync local search state with filters prop
  useEffect(() => {
    setSearchTerm(filters.search || '')
  }, [filters.search])

  const handleSearch = () => {
    onFiltersChange({ ...filters, search: searchTerm || undefined })
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleMinPriceChange = (value: string) => {
    const price = parseFloat(value)
    onFiltersChange({ ...filters, minPrice: isNaN(price) ? undefined : price })
  }

  const handleMaxPriceChange = (value: string) => {
    const price = parseFloat(value)
    onFiltersChange({ ...filters, maxPrice: isNaN(price) ? undefined : price })
  }

  const handleSortChange = (sortBy: ProductFilters['sortBy'], sortOrder: ProductFilters['sortOrder']) => {
    onFiltersChange({ ...filters, sortBy, sortOrder })
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    onClearFilters()
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button variant="outline" size="sm" onClick={handleClearFilters}>
          Clear All
        </Button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium">Search</Label>
        <div className="flex gap-2">
          <Input
            id="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="flex-1"
          />
          <Button 
            onClick={handleSearch}
            size="sm"
            type="button"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Price Range</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              placeholder="Min ($)"
              type="number"
              min="0"
              step="0.01"
              value={filters.minPrice || ''}
              onChange={(e) => handleMinPriceChange(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Max ($)"
              type="number"
              min="0"
              step="0.01"
              value={filters.maxPrice || ''}
              onChange={(e) => handleMaxPriceChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Sort By</Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              variant={filters.sortBy === 'name' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('name', filters.sortOrder)}
              className="flex-1"
            >
              Name
            </Button>
            <Button
              variant={filters.sortBy === 'price' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('price', filters.sortOrder)}
              className="flex-1"
            >
              Price
            </Button>
            <Button
              variant={filters.sortBy === 'createdAt' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('createdAt', filters.sortOrder)}
              className="flex-1"
            >
              Date
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filters.sortOrder === 'asc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange(filters.sortBy, 'asc')}
              className="flex-1"
            >
              ↑ Ascending
            </Button>
            <Button
              variant={filters.sortOrder === 'desc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange(filters.sortBy, 'desc')}
              className="flex-1"
            >
              ↓ Descending
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}