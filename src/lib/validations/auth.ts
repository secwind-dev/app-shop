import { z } from 'zod'

export const registerSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export type RegisterFormData = z.infer<typeof registerSchema>

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(100, 'Product name must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  price: z
    .number()
    .min(0, 'Price must be a positive number')
    .max(999999, 'Price is too high'),
  amount: z
    .number()
    .int('Amount must be a whole number')
    .min(0, 'Amount must be 0 or greater'),
  discount: z
    .number()
    .min(0, 'Discount must be 0 or greater')
    .max(100, 'Discount cannot be more than 100%'),
  images: z
    .array(z.string().min(1, 'Image URL is required').refine(
      (url) => {
        try {
          new URL(url)
          return true
        } catch {
          return false
        }
      },
      { message: 'Please enter a valid URL' }
    ))
    .min(1, 'At least one image is required')
    .max(10, 'Maximum 10 images allowed'),
  options: z
    .array(z.string())
})

export type ProductFormData = z.infer<typeof productSchema>