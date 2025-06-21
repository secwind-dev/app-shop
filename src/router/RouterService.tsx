import { Routes, Route } from 'react-router-dom'
import { AuthGuard } from './guards/AuthGuard'
import { routerConfig } from './config'

export function RouterService() {
  return (
    <Routes>
      {routerConfig.routes.map((route) => {
        const Component = route.component
        
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AuthGuard
                requiresAuth={route.requiresAuth || false}
                redirectTo={route.redirectTo || routerConfig.loginRoute}
              >
                <Component />
              </AuthGuard>
            }
          />
        )
      })}
    </Routes>
  )
}