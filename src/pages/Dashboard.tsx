import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useAuth } from '../components/auth/AuthProvider'
import { FormExample } from '../components/playground/FormExample'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Shop Firebase</h1>
          <div className="flex items-center gap-6">
            <div className="text-sm text-muted-foreground">
              Welcome back, <span className="font-medium text-foreground">{user?.email}</span>
            </div>
            <Link to="/product/create">
              <Button variant="default" size="sm">
                Create Product
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => signOut(auth)}
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Welcome to your Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You're successfully authenticated with Firebase. Explore the form example below 
              to see the power of modern React development.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <FormExample />
          </div>
        </div>
      </main>
    </div>
  )
}