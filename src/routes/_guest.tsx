import React from 'react'
import { createFileRoute, Outlet, useNavigate, useSearch } from '@tanstack/react-router'
import { useAuth } from '@/components/auth/AuthProvider'
import { LoadingSpinner } from '@/components/ui/loading'
import { safeRedirect } from '@/lib/redirect-utils'

function GuestLayout() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const search = useSearch({ from: '/_guest' }) as { redirect?: string }

  // Guest layout - redirect หลัง login สำเร็จ
  React.useEffect(() => {
    if (!loading && user) {
      console.log('🎯 User logged in, processing redirect...')
      
      // ใช้ safe redirect utility
      const redirectUrl = safeRedirect(search.redirect)
      
      if (redirectUrl === '/dashboard') {
        console.log('🏠 Redirecting to dashboard')
        navigate({ to: '/dashboard' })
      } else {
        console.log('✅ Valid redirect URL, navigating to:', redirectUrl)
        window.location.href = redirectUrl
      }
    }
  }, [user, loading, navigate, search.redirect])

  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />
  }

  if (user) {
    return <LoadingSpinner message="Redirecting to dashboard..." />
  }

  // เมื่อ user ยังไม่ login ให้แสดง child routes (login/register)
  return <Outlet />
}

export const Route = createFileRoute('/_guest')({
  component: GuestLayout,
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
})