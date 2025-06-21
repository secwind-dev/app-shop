import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AuthProvider } from '@/components/auth/AuthProvider'

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </AuthProvider>
  ),
})