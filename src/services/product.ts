import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  serverTimestamp, 
  type Timestamp, 
  type FieldValue 
} from 'firebase/firestore'
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

export interface ProductFilters {
  search?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'name' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  try {
    console.log('Fetching products with filters:', filters)

    let q = query(collection(db, 'products'))

    // Add sorting
    const sortField = filters.sortBy || 'createdAt'
    const sortDirection = filters.sortOrder || 'desc'
    q = query(q, orderBy(sortField, sortDirection))

    const querySnapshot = await getDocs(q)
    let products: Product[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      products.push({
        id: doc.id,
        ...data
      } as Product)
    })

    // Apply client-side filters (since Firestore has limited query capabilities)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.minPrice !== undefined) {
      products = products.filter(product => product.price >= filters.minPrice!)
    }

    if (filters.maxPrice !== undefined) {
      products = products.filter(product => product.price <= filters.maxPrice!)
    }

    console.log(`Found ${products.length} products`)
    return products

  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function getUserProducts(userId?: string): Promise<Product[]> {
  try {
    const user = userId || auth.currentUser?.uid
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    console.log('Fetching products for user:', user)

    const q = query(
      collection(db, 'products'),
      where('createdBy', '==', user),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)
    const products: Product[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      products.push({
        id: doc.id,
        ...data
      } as Product)
    })

    console.log(`Found ${products.length} products for user`)
    return products

  } catch (error) {
    console.error('Error fetching user products:', error)
    throw error
  }
}