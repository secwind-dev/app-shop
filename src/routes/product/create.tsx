import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/components/auth/AuthProvider'
import { ProductForm } from '@/components/product/ProductForm'
import { LoadingSpinner } from '@/components/ui/loading'

function ProductCreatePage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

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
  // Auth check ใน component แทน
})