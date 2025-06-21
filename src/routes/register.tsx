import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/components/auth/AuthProvider'
import { RegisterForm } from '@/components/auth/RegisterForm'

function RegisterPage() {
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
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})