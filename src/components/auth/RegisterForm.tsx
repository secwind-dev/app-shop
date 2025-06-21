import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { registerUser } from '@/services/auth'
import { debugFirebaseConfig } from '@/utils/firebase-debug'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

interface RegisterFormProps {
    onToggleMode?: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleMode }) => {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true)
        setError('')

        // Debug Firebase configuration
        debugFirebaseConfig()

        try {
            await registerUser(data)
        } catch (err: unknown) {
            console.error('Registration form error:', err)
            setError(
                err instanceof Error
                    ? err.message
                    : 'An error occurred during registration'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                    Create Account
                </h2>
                <p className="text-muted-foreground">
                    Sign up to get started with your account
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-foreground">
                                    Username
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your username"
                                        className="text-base"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-foreground">
                                    Email Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="text-base"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-foreground">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="text-base"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-foreground">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="text-base"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                            <p className="text-sm text-destructive font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full text-base"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Creating account...
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </Button>
                </form>
            </Form>

            {onToggleMode && (
                <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                        Already have an account?
                    </p>
                    <Button
                        variant="link"
                        onClick={onToggleMode}
                        className="text-primary font-medium"
                    >
                        Sign in instead
                    </Button>
                </div>
            )}
        </div>
    )
}
