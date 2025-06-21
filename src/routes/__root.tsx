import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { LoadingSpinner } from '@/components/ui/loading'

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </AuthProvider>
  ),
  pendingComponent: () => <LoadingSpinner message="Loading Application..." size="lg" />,
})