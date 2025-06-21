import { useAuth } from '@/components/auth/AuthProvider'
import { FormExample } from '@/components/playground/FormExample'
import { LoadingSpinner } from '@/components/ui/loading'
import { auth } from '@/lib/firebase'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { signOut } from 'firebase/auth'

function DashboardPage() {
    const { user } = useAuth() // ไม่ต้อง check loading แล้ว (layout จัดการให้)
    const navigate = useNavigate()

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            navigate({ to: '/login', search: { redirect: undefined } })
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }

    // ไม่ต้องมี useEffect auth check แล้ว - layout จัดการให้หมด!

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-6 py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                            Welcome to your Dashboard
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            You're successfully authenticated with Firebase.
                            Explore the form example below to see the power of
                            modern React development.
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

export const Route = createFileRoute('/_protected/dashboard')({
    component: DashboardPage,
    loader: async () => {
        // จำลอง loading data
        await new Promise((resolve) => setTimeout(resolve, 500))
        return { message: 'Dashboard loaded!' }
    },
    pendingComponent: () => <LoadingSpinner message="Loading Dashboard..." />,
})
