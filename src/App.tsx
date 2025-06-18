import { useState } from 'react'
import { AuthProvider, useAuth } from './components/auth/AuthProvider'
import { LoginForm } from './components/auth/LoginForm'
import { FormExample } from './components/playground/FormExample'
import { Button } from './components/ui/button'
import { signOut } from 'firebase/auth'
import { auth } from './lib/firebase'
import { FaReact } from 'react-icons/fa'
import { SiTailwindcss, SiZod, SiFirebase } from 'react-icons/si'

function AppContent() {
  const { user, loading } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-border border-t-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user && !showLogin) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
                Shop Firebase
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                A modern TypeScript React application with Firebase integration, 
                featuring clean design and seamless user experience
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button onClick={() => setShowLogin(true)} size="lg" className="text-base">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="text-base">
                  View Demo
                </Button>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="mb-20">
              <h2 className="text-2xl font-semibold text-center text-foreground mb-12">
                Built with Modern Technologies
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
                  <FaReact className="h-12 w-12 text-apple-blue mb-4" />
                  <span className="font-medium text-card-foreground">React</span>
                  <span className="text-sm text-muted-foreground mt-1">TypeScript</span>
                </div>
                <div className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
                  <SiFirebase className="h-12 w-12 text-orange-500 mb-4" />
                  <span className="font-medium text-card-foreground">Firebase</span>
                  <span className="text-sm text-muted-foreground mt-1">Backend</span>
                </div>
                <div className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
                  <SiTailwindcss className="h-12 w-12 text-cyan-500 mb-4" />
                  <span className="font-medium text-card-foreground">Tailwind</span>
                  <span className="text-sm text-muted-foreground mt-1">Styling</span>
                </div>
                <div className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
                  <SiZod className="h-12 w-12 text-apple-blue mb-4" />
                  <span className="font-medium text-card-foreground">Zod</span>
                  <span className="text-sm text-muted-foreground mt-1">Validation</span>
                </div>
              </div>
            </div>

            {/* Form Demo Section */}
            <div className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
              <FormExample />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user && showLogin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
            <div className="text-center mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setShowLogin(false)}
                className="mb-4 text-muted-foreground hover:text-foreground"
              >
                ← Back to Home
              </Button>
            </div>
            <LoginForm onToggleMode={() => setShowLogin(false)} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Shop Firebase</h1>
          <div className="flex items-center gap-6">
            <div className="text-sm text-muted-foreground">
              Welcome back, <span className="font-medium text-foreground">{user?.email}</span>
            </div>
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
