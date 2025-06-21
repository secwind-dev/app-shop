import React from 'react'
import { createFileRoute, Outlet, useNavigate, useLocation } from '@tanstack/react-router'
import { useAuth } from '@/components/auth/AuthProvider'
import { LoadingSpinner } from '@/components/ui/loading'

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

  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />
  }

  if (!user) {
    return <LoadingSpinner message="Redirecting to login..." />
  }

  // เมื่อ user login แล้ว ให้แสดง child routes
  return <Outlet />
}

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
})