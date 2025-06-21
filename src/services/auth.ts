import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {
    doc,
    serverTimestamp,
    setDoc,
    type FieldValue,
    type Timestamp,
} from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import type { RegisterFormData } from '../lib/validations'

export interface UserProfile {
    uid: string
    username: string
    email: string
    createdAt: FieldValue | Timestamp
    updatedAt: FieldValue | Timestamp
}

export async function registerUser(data: RegisterFormData): Promise<void> {
    try {
        console.log('Attempting to register user with:', { 
            email: data.email, 
            username: data.username,
            passwordLength: data.password.length 
        })

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        )
        const user = userCredential.user

        console.log('User registered successfully:', user.uid)

        await updateProfile(user, {
            displayName: data.username,
        })

        const userProfile: UserProfile = {
            uid: user.uid,
            username: data.username,
            email: data.email,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }

        await setDoc(doc(db, 'users', user.uid), userProfile)
        console.log('User profile saved to Firestore')
        
    } catch (error: unknown) {
        console.error('Registration error:', error)
        
        if (error instanceof Error) {
            // Firebase Auth errors have specific error codes
            if ('code' in error) {
                const firebaseError = error as { code: string; message: string }
                console.error('Firebase error code:', firebaseError.code)
                
                switch (firebaseError.code) {
                    case 'auth/email-already-in-use':
                        throw new Error('This email is already registered. Please use a different email or try signing in.')
                    case 'auth/invalid-email':
                        throw new Error('Please enter a valid email address.')
                    case 'auth/operation-not-allowed':
                        throw new Error('Email/password registration is not enabled. Please contact support.')
                    case 'auth/weak-password':
                        throw new Error('Password is too weak. Please choose a stronger password.')
                    default:
                        throw new Error(`Registration failed: ${firebaseError.message}`)
                }
            }
            throw error
        }
        
        throw new Error('An unexpected error occurred during registration.')
    }
}
