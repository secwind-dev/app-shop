import { Link } from 'react-router-dom'
import { LoginForm } from '../components/auth/LoginForm'
import { Button } from '../components/ui/button'

export function Login() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
          <div className="text-center mb-8">
            <Link to="/">
              <Button 
                variant="ghost" 
                className="mb-4 text-muted-foreground hover:text-foreground"
              >
                ← Back to Home
              </Button>
            </Link>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}