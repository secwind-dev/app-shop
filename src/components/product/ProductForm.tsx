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
import { Textarea } from '@/components/ui/textarea'
import { productSchema, type ProductFormData } from '@/lib/validations/auth'
import { createProduct } from '@/services/product'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function ProductForm() {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const navigate = useNavigate()

    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            amount: 0,
            discount: 0,
            images: [''],
            options: [],
        },
    })

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control: form.control,
        name: 'images',
    })

    const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
        control: form.control,
        name: 'options',
    })

    const onSubmit = async (data: ProductFormData) => {
        setLoading(true)
        setError('')

        try {
            // Filter out empty images and options
            const cleanData: ProductFormData = {
                ...data,
                images: data.images.filter((img) => img.trim() !== ''),
                options: data.options.filter((opt) => opt.trim() !== ''),
                discount: data.discount || 0,
            }

            console.log('Submitting product:', cleanData)
            const productId = await createProduct(cleanData)
            console.log('Product created successfully:', productId)

            // Redirect to dashboard or product list
            navigate('/dashboard')
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
    }

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

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    {/* Basic Information */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                            Basic Information
                        </h2>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-foreground">
                                        Product Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter product name"
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-foreground">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter product description"
                                            className="text-base min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Pricing & Inventory */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                            Pricing & Inventory
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-foreground">
                                            Price ($)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                placeholder="0.00"
                                                className="text-base"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-foreground">
                                            Stock Amount
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                className="text-base"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-foreground">
                                            Discount (%)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                max="100"
                                                placeholder="0"
                                                className="text-base"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                                Product Images
                            </h2>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendImage('')}
                                disabled={imageFields.length >= 10}
                            >
                                Add Image
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {imageFields.map((field, index) => (
                                <div key={field.id} className="flex gap-3">
                                    <FormField
                                        control={form.control}
                                        name={`images.${index}`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter image URL"
                                                        className="text-base"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {imageFields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeImage(index)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                                Product Options
                            </h2>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendOption('')}
                            >
                                Add Option
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {optionFields.map((field, index) => (
                                <div key={field.id} className="flex gap-3">
                                    <FormField
                                        control={form.control}
                                        name={`options.${index}`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter option (e.g., Size: Large, Color: Red)"
                                                        className="text-base"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeOption(index)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            {optionFields.length === 0 && (
                                <p className="text-sm text-muted-foreground italic">
                                    No options added. Click "Add Option" to
                                    include product variants.
                                </p>
                            )}
                        </div>
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
                            onClick={() => navigate('/dashboard')}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1"
                        >
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
            </Form>
        </div>
    )
}
