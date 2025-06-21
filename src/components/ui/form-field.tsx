import { Label } from '@/components/ui/label'
import React from 'react'

interface FormFieldProps {
    field: any // TanStack form field
    label?: string
    children: React.ReactNode
    description?: string
}

export function FormField({
    field,
    label,
    children,
    description,
}: FormFieldProps) {
    const getErrorMessage = (error: any) => {
        if (typeof error === 'string') {
            return error
        }
        return error?.message || 'Invalid value'
    }

    return (
        <div className="space-y-2">
            {label && (
                <Label className="text-base font-medium text-foreground">
                    {label}
                </Label>
            )}
            {children}
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {field?.state?.meta?.isTouched &&
            field?.state?.meta?.errors.length ? (
                <p className="text-sm text-destructive">
                    {getErrorMessage(field?.state?.meta?.errors[0])}
                </p>
            ) : null}
        </div>
    )
}
