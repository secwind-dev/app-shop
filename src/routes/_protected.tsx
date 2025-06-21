import React from 'react'
import { createFileRoute, Outlet, useNavigate, useLocation, Link } from '@tanstack/react-router'
import { useAuth } from '@/components/auth/AuthProvider'
import { LoadingSpinner } from '@/components/ui/loading'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'

function ProtectedLayout() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Centralized auth check - ใช้ที่เดียวสำหรับทุก protected routes
  React.useEffect(() => {
    if (!loading && !user) {
      // 🚫 ป้องกัน infinite loop - ไม่ส่ง login/register routes เป็น redirect
      const isAuthRoute = location.pathname.includes('/login') || location.pathname.includes('/register')
      
      if (!isAuthRoute) {
        console.log('🔒 Unauthorized access to:', location.pathname)
        navigate({ 
          to: '/login',
          search: {
            // ส่ง current path เพื่อ redirect กลับหลัง login
            redirect: location.href,
            // ส่ง source page info
            from: location.pathname,
            // timestamp เมื่อถูก redirect
            redirectedAt: new Date().toISOString()
          }
        })
      } else {
        console.log('🚫 Already on auth route, not redirecting')
      }
    }
  }, [user, loading, navigate, location])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate({ to: '/', search: { redirect: undefined } })
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />
  }

  if (!user) {
    return <LoadingSpinner message="Redirecting to login..." />
  }

  // เมื่อ user login แล้ว ให้แสดง navbar + child routes
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link 
              to="/dashboard" 
              className="text-2xl font-bold text-foreground tracking-tight hover:text-primary transition-colors"
            >
              Shop Firebase
            </Link>
            <nav className="flex items-center gap-6">
              <Link 
                to="/dashboard" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}
              >
                Dashboard
              </Link>
              <Link 
                to="/product/list" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}
              >
                Products
              </Link>
              <Link 
                to="/product/create" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}
              >
                Create Product
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm text-muted-foreground">
              Welcome back,{' '}
              <span className="font-medium text-foreground">
                {user?.email}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
})