import { createFileRoute } from '@tanstack/react-router'
import { ProductForm } from '@/components/product/ProductForm'

function ProductCreatePage() {
  // ไม่ต้อง auth check - Protected Layout จัดการให้แล้ว!

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

export const Route = createFileRoute('/_protected/product/create')({
  component: ProductCreatePage,
})