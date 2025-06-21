import { signInAnonymously } from 'firebase/auth'
import { auth } from '../lib/firebase'

export async function testFirebaseConnection(): Promise<boolean> {
  try {
    console.log('🧪 Testing Firebase connection...')
    
    // Test anonymous sign-in (this doesn't require email/password setup)
    const result = await signInAnonymously(auth)
    console.log('✅ Firebase connection successful:', result.user.uid)
    
    // Sign out immediately
    await auth.signOut()
    console.log('✅ Firebase sign-out successful')
    
    return true
  } catch (error) {
    console.error('❌ Firebase connection failed:', error)
    return false
  }
}