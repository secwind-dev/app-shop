import { Link } from 'react-router-dom'
import { FormExample } from '../components/playground/FormExample'
import { Button } from '../components/ui/button'
import { FaReact } from 'react-icons/fa'
import { SiTailwindcss, SiZod, SiFirebase } from 'react-icons/si'

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
              Shop Firebase
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              A modern TypeScript React application with Firebase integration, 
              featuring clean design and seamless user experience
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/register">
                <Button size="lg" className="text-base">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-base">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

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

          <div className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <FormExample />
          </div>
        </div>
      </div>
    </div>
  )
}