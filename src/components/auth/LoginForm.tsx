import React from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { debugFirebaseConfig } from '@/utils/firebase-debug'
import { logFirebaseStatus } from '@/utils/firebase-status'
interface LoginFormProps {
  onToggleMode?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Debug Firebase configuration
    debugFirebaseConfig()
    logFirebaseStatus()
    console.log('Attempting to sign in with:', { email, passwordLength: password.length })

    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log('✅ Login successful:', result.user.uid)
      
      // 🎯 ไม่ต้อง redirect ที่นี่ - Guest Layout จะจัดการให้
      console.log('🔄 Auth state changed, Guest Layout will handle redirect...')
      
      // Clear form
      setEmail('')
      setPassword('')
    } catch (err: unknown) {
      console.error('Login error:', err)
      
      if (err instanceof Error) {
        // Firebase Auth errors have specific error codes
        if ('code' in err) {
          const firebaseError = err as { code: string; message: string }
          console.error('Firebase error code:', firebaseError.code)
          
          switch (firebaseError.code) {
            case 'auth/user-not-found':
              setError('No account found with this email address. Please check your email or create an account.')
              break
            case 'auth/wrong-password':
              setError('Incorrect password. Please try again.')
              break
            case 'auth/invalid-email':
              setError('Please enter a valid email address.')
              break
            case 'auth/user-disabled':
              setError('This account has been disabled. Please contact support.')
              break
            case 'auth/too-many-requests':
              setError('Too many failed login attempts. Please try again later.')
              break
            case 'auth/operation-not-allowed':
              setError('Email/password sign-in is not enabled. Please contact support.')
              break
            default:
              setError(`Login failed: ${firebaseError.message}`)
          }
        } else {
          setError(err.message)
        }
      } else {
        setError('An unexpected error occurred during login.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="email" className="text-base font-medium text-foreground">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="text-base"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="password" className="text-base font-medium text-foreground">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="text-base"
          />
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive font-medium">{error}</p>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full text-base" disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Signing in...
            </div>
          ) : 'Sign In'}
        </Button>
      </form>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground mb-2">
          Don't have an account yet?
        </p>
        {onToggleMode ? (
          <Button variant="link" onClick={onToggleMode} className="text-primary font-medium">
            Create an account
          </Button>
        ) : (
          <a href="/register" className="text-primary font-medium hover:underline">
            Create an account
          </a>
        )}
      </div>
    </div>
  );
};