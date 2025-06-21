import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/components/auth/AuthProvider'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { LoadingSpinner } from '@/components/ui/loading'

function RegisterPage() {
    const { loading } = useAuth()

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

export const Route = createFileRoute('/register')({
    component: RegisterPage,
    // Auth check ใน component แทน
})
