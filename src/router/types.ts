import type { ComponentType } from 'react'

export interface RouteConfig {
  path: string
  component: ComponentType
  requiresAuth?: boolean
  redirectTo?: string
}

export interface RouterServiceConfig {
  routes: RouteConfig[]
  defaultRoute: string
  loginRoute: string
}