import { redirect } from '@tanstack/react-router'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export async function requireAuth(redirectTo: string = '/login') {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) {
        resolve(user)
      } else {
        reject(redirect({ to: redirectTo }))
      }
    })
  })
}

export async function requireGuest(redirectTo: string = '/dashboard') {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (!user) {
        resolve(null)
      } else {
        reject(redirect({ to: redirectTo }))
      }
    })
  })
}