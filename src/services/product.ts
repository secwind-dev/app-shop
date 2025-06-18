import { collection, addDoc, serverTimestamp, type Timestamp, type FieldValue } from 'firebase/firestore'
import { db, auth } from '../lib/firebase'
import type { ProductFormData } from '../lib/validations/auth'

export interface Product extends ProductFormData {
  id?: string
  createdBy: string
  createdAt: FieldValue | Timestamp
  updatedAt: FieldValue | Timestamp
}

export async function createProduct(data: ProductFormData): Promise<string> {
  const user = auth.currentUser
  
  if (!user) {
    throw new Error('You must be logged in to create a product')
  }

  try {
    console.log('Creating product:', data)

    const productData: Omit<Product, 'id'> = {
      ...data,
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const docRef = await addDoc(collection(db, 'products'), productData)
    console.log('Product created with ID:', docRef.id)
    
    return docRef.id
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}