import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '@/components/auth/RegisterForm'

function RegisterPage() {
    // ไม่ต้อง auth check - Guest Layout จัดการให้แล้ว!

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

export const Route = createFileRoute('/_guest/register')({
    component: RegisterPage,
})
