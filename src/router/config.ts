import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Dashboard } from '../pages/Dashboard'
import { ProductCreate } from '../pages/ProductCreate'
import type { RouterServiceConfig } from './types'

export const routerConfig: RouterServiceConfig = {
  routes: [
    {
      path: '/',
      component: Home,
      requiresAuth: false,
      redirectTo: '/dashboard'
    },
    {
      path: '/login',
      component: Login,
      requiresAuth: false,
      redirectTo: '/dashboard'
    },
    {
      path: '/register',
      component: Register,
      requiresAuth: false,
      redirectTo: '/dashboard'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      requiresAuth: true,
      redirectTo: '/login'
    },
    {
      path: '/product/create',
      component: ProductCreate,
      requiresAuth: true,
      redirectTo: '/login'
    }
  ],
  defaultRoute: '/',
  loginRoute: '/login'
}