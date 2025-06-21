import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import { productSchema, type ProductFormData } from '@/lib/validations/auth'
import { createProduct } from '@/services/product'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'

export function ProductForm() {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            amount: 0,
            discount: 0,
            images: [''],
            options: [],
        } as ProductFormData,
        validators: {
            onChange: productSchema,
        },
        onSubmit: async ({ value }) => {
            setLoading(true)
            setError('')

            try {
                // Filter out empty images and options
                const cleanData: ProductFormData = {
                    ...value,
                    images: value.images.filter((img) => img.trim() !== ''),
                    options: value.options.filter((opt) => opt.trim() !== ''),
                    discount: value.discount || 0,
                }

                console.log('Submitting product:', cleanData)
                const productId = await createProduct(cleanData)
                console.log('Product created successfully:', productId)

                // Redirect to dashboard or product list
                navigate({ to: '/dashboard' })
            } catch (err: unknown) {
                console.error('Product creation error:', err)
                setError(
                    err instanceof Error
                        ? err.message
                        : 'An error occurred while creating the product'
                )
            } finally {
                setLoading(false)
            }
        },
    })

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                    Create New Product
                </h1>
                <p className="text-muted-foreground">
                    Add a new product to your store
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="space-y-8"
            >
                {/* Basic Information */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                        Basic Information
                    </h2>

                    <form.Field
                        name="name"
                        children={(field) => (
                            <FormField field={field} label="Product Name">
                                <Input
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    placeholder="Enter product name"
                                    className="text-base"
                                />
                            </FormField>
                        )}
                    />

                    <form.Field
                        name="description"
                        children={(field) => (
                            <FormField field={field} label="Description">
                                <Textarea
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    placeholder="Enter product description"
                                    className="text-base min-h-[120px]"
                                />
                            </FormField>
                        )}
                    />
                </div>

                {/* Pricing & Inventory */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                        Pricing & Inventory
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <form.Field
                            name="price"
                            children={(field) => (
                                <FormField field={field} label="Price ($)">
                                    <Input
                                        name={field.name}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        className="text-base"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(
                                                parseFloat(e.target.value) || 0
                                            )
                                        }
                                    />
                                </FormField>
                            )}
                        />

                        <form.Field
                            name="amount"
                            children={(field) => (
                                <FormField field={field} label="Stock Amount">
                                    <Input
                                        name={field.name}
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        className="text-base"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                    />
                                </FormField>
                            )}
                        />

                        <form.Field
                            name="discount"
                            children={(field) => (
                                <FormField field={field} label="Discount (%)">
                                    <Input
                                        name={field.name}
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="0"
                                        className="text-base"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(
                                                parseFloat(e.target.value) || 0
                                            )
                                        }
                                    />
                                </FormField>
                            )}
                        />
                    </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                        Product Images
                    </h2>
                    <form.Field
                        name="images"
                        children={(field) => (
                            <FormField field={field} label="Image URLs (one per line)">
                                <Textarea
                                    name={field.name}
                                    placeholder="Enter image URLs, one per line"
                                    className="text-base min-h-[100px]"
                                    value={field.state.value.join('\n')}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        const urls = e.target.value
                                            .split('\n')
                                            .filter((url) => url.trim())
                                        field.handleChange(
                                            urls.length > 0 ? urls : ['']
                                        )
                                    }}
                                />
                            </FormField>
                        )}
                    />
                </div>

                {/* Options */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                        Product Options
                    </h2>
                    <form.Field
                        name="options"
                        children={(field) => (
                            <FormField 
                                field={field} 
                                label="Options (one per line, optional)"
                                description="e.g., Size: Large, Color: Red"
                            >
                                <Textarea
                                    name={field.name}
                                    placeholder="Enter options, one per line"
                                    className="text-base min-h-[80px]"
                                    value={field.state.value.join('\n')}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        const options = e.target.value
                                            .split('\n')
                                            .filter((opt) => opt.trim())
                                        field.handleChange(options)
                                    }}
                                />
                            </FormField>
                        )}
                    />
                </div>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <p className="text-sm text-destructive font-medium">
                            {error}
                        </p>
                    </div>
                )}

                <div className="flex gap-4 pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate({ to: '/dashboard' })}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Creating Product...
                            </div>
                        ) : (
                            'Create Product'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
