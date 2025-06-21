import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/components/auth/AuthProvider'
import { LoginForm } from '@/components/auth/LoginForm'
import { LoadingSpinner } from '@/components/ui/loading'

function LoginPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  // Auto-redirect หาก user login แล้ว
  React.useEffect(() => {
    if (!loading && user) {
      navigate({ to: '/dashboard' })
    }
  }, [user, loading, navigate])

  if (loading) {
    return <LoadingSpinner />
  }

  if (user) {
    return <LoadingSpinner message="Redirecting to dashboard..." />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/login')({
  component: LoginPage,
  // Auth check ใน component แทน
})