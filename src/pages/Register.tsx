import { Link } from 'react-router-dom'
import { RegisterForm } from '../components/auth/RegisterForm'
import { Button } from '../components/ui/button'

export function Register() {
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
          <RegisterForm />
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground mb-2">
              Already have an account?
            </p>
            <Link to="/login">
              <Button variant="link" className="text-primary font-medium">
                Sign in here
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}