import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { registerUser } from '@/services/auth'
import { debugFirebaseConfig } from '@/utils/firebase-debug'
import React from 'react'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'

interface RegisterFormProps {
    onToggleMode?: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleMode }) => {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')

    const form = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        } as RegisterFormData,
        onSubmit: async ({ value }) => {
            setLoading(true)
            setError('')

            // Debug Firebase configuration
            debugFirebaseConfig()

            try {
                await registerUser(value)
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
        },
        validatorAdapter: zodValidator,
        validators: {
            onChange: registerSchema,
        },
    })


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

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="space-y-6"
            >
                    <form.Field
                        name="username"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label className="text-base font-medium text-foreground">
                                    Username
                                </Label>
                                <Input
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Enter your username"
                                    className="text-base"
                                />
                                {field.state.meta.touchedErrors ? (
                                    <p className="text-sm text-destructive">
                                        {field.state.meta.touchedErrors}
                                    </p>
                                ) : null}
                            </div>
                        )}
                    />

                    <form.Field
                        name="email"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label className="text-base font-medium text-foreground">
                                    Email Address
                                </Label>
                                <Input
                                    name={field.name}
                                    type="email"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="text-base"
                                />
                                {field.state.meta.touchedErrors ? (
                                    <p className="text-sm text-destructive">
                                        {field.state.meta.touchedErrors}
                                    </p>
                                ) : null}
                            </div>
                        )}
                    />

                    <form.Field
                        name="password"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label className="text-base font-medium text-foreground">
                                    Password
                                </Label>
                                <Input
                                    name={field.name}
                                    type="password"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Enter your password"
                                    className="text-base"
                                />
                                {field.state.meta.touchedErrors ? (
                                    <p className="text-sm text-destructive">
                                        {field.state.meta.touchedErrors}
                                    </p>
                                ) : null}
                            </div>
                        )}
                    />

                    <form.Field
                        name="confirmPassword"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label className="text-base font-medium text-foreground">
                                    Confirm Password
                                </Label>
                                <Input
                                    name={field.name}
                                    type="password"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Confirm your password"
                                    className="text-base"
                                />
                                {field.state.meta.touchedErrors ? (
                                    <p className="text-sm text-destructive">
                                        {field.state.meta.touchedErrors}
                                    </p>
                                ) : null}
                            </div>
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
