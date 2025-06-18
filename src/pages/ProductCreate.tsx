import { Link } from 'react-router-dom'
import { ProductForm } from '../components/product/ProductForm'
import { Button } from '../components/ui/button'

export function ProductCreate() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Shop Firebase</h1>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                ← Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <ProductForm />
      </main>
    </div>
  )
}