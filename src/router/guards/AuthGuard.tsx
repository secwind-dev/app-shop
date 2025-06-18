import { Navigate } from 'react-router-dom'
import { useAuth } from '../../components/auth/AuthProvider'

interface AuthGuardProps {
  children: React.ReactNode
  requiresAuth: boolean
  redirectTo: string
}

export function AuthGuard({ children, requiresAuth, redirectTo }: AuthGuardProps) {
  const { user, loading } = useAuth()

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

  if (requiresAuth && !user) {
    return <Navigate to={redirectTo} replace />
  }

  if (!requiresAuth && user) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}