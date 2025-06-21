import { createFileRoute, useSearch } from '@tanstack/react-router'
import { LoginForm } from '@/components/auth/LoginForm'

// Define search params schema
interface LoginSearch {
  redirect?: string
  from?: string
  redirectedAt?: string
}

function LoginPage() {
  // ไม่ต้อง auth check - Guest Layout จัดการให้แล้ว!
  const search = useSearch({ from: '/_guest/login' }) as LoginSearch
  
  // Log redirect info เพื่อ debug
  if (search.from) {
    console.log('🔄 Redirected from:', search.from)
    console.log('📍 Original URL:', search.redirect)
    console.log('⏰ Redirected at:', search.redirectedAt)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
          {/* แสดง redirect info หากมี */}
          {search.from && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">
                🔒 Authentication Required
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                You were redirected from: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">{search.from}</code>
              </p>
              {search.redirect && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  You'll be redirected back after login.
                </p>
              )}
            </div>
          )}
          
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_guest/login')({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
    from: typeof search.from === 'string' ? search.from : undefined,
    redirectedAt: typeof search.redirectedAt === 'string' ? search.redirectedAt : undefined,
  }),
})