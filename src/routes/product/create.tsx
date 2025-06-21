import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/components/auth/AuthProvider'
import { ProductForm } from '@/components/product/ProductForm'

function ProductCreatePage() {
  const { loading } = useAuth()

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
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Create Product</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-3xl border border-border p-8 shadow-sm">
            <ProductForm />
          </div>
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/product/create')({
  component: ProductCreatePage,
})