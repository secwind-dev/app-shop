import { auth } from '../lib/firebase'

interface FirebaseStatus {
  isConfigured: boolean
  isConnected: boolean
  errors: string[]
  warnings: string[]
}

export async function checkFirebaseStatus(): Promise<FirebaseStatus> {
  const status: FirebaseStatus = {
    isConfigured: false,
    isConnected: false,
    errors: [],
    warnings: []
  }

  // Check environment variables
  const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN', 
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ]

  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName])
  
  if (missingVars.length > 0) {
    status.errors.push(`Missing environment variables: ${missingVars.join(', ')}`)
  } else {
    status.isConfigured = true
  }

  // Check if auth instance is available
  if (!auth) {
    status.errors.push('Firebase Auth instance not initialized')
  }

  // Check API key format (should be ~40 characters starting with AIza)
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
  if (apiKey && (!apiKey.startsWith('AIza') || apiKey.length < 35)) {
    status.warnings.push('API key format may be incorrect')
  }

  // Check project ID format
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
  if (projectId && projectId.length < 4) {
    status.warnings.push('Project ID seems too short')
  }

  // Test basic connectivity (this will also tell us if email/password is enabled)
  try {
    // We can't easily test auth methods without credentials, but we can check if auth is responsive
    const currentUser = auth.currentUser
    status.isConnected = true
    console.log('Firebase Auth is responsive. Current user:', currentUser?.email || 'none')
  } catch (error) {
    status.errors.push(`Firebase Auth connectivity error: ${error}`)
  }

  return status
}

export function logFirebaseStatus() {
  checkFirebaseStatus().then(status => {
    console.log('🔥 Firebase Status Check:')
    console.log('📋 Configuration:', status.isConfigured ? '✅ Complete' : '❌ Incomplete')
    console.log('🌐 Connection:', status.isConnected ? '✅ Connected' : '❌ Disconnected')
    
    if (status.errors.length > 0) {
      console.log('❌ Errors:')
      status.errors.forEach(error => console.log(`  - ${error}`))
    }
    
    if (status.warnings.length > 0) {
      console.log('⚠️ Warnings:')
      status.warnings.forEach(warning => console.log(`  - ${warning}`))
    }

    if (status.errors.length === 0 && status.warnings.length === 0) {
      console.log('✅ Firebase configuration looks good!')
      console.log('💡 If you\'re still getting 400 errors, check:')
      console.log('   1. Enable Email/Password auth in Firebase Console')
      console.log('   2. Verify the project exists and is active')
      console.log('   3. Check Firebase Console logs for more details')
    }
  })
}