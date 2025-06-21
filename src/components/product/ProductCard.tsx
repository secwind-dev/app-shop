import { Button } from '@/components/ui/button'
import type { Product } from '@/services/product'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100)
    : product.price

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
      {/* Product Image */}
      {product.images.length > 0 && (
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image'
            }}
          />
        </div>
      )}

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 font-medium">
                -{product.discount}%
              </span>
            </>
          )}
        </div>

        {/* Stock */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Stock: {product.amount}
          </span>
          
          {product.amount > 0 ? (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              In Stock
            </span>
          ) : (
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Options */}
        {product.options.length > 0 && (
          <div className="text-xs text-muted-foreground">
            Options: {product.options.slice(0, 2).join(', ')}
            {product.options.length > 2 && ` +${product.options.length - 2} more`}
          </div>
        )}

        {/* Actions */}
        <div className="pt-2">
          <Button 
            className="w-full" 
            disabled={product.amount === 0}
          >
            {product.amount > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  )
}