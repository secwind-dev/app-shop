import { auth } from '../lib/firebase'

export function debugFirebaseConfig() {
  console.log('🔥 Firebase Configuration Debug:')
  console.log('- API Key:', import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing')
  console.log('- Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing')
  console.log('- Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing')
  console.log('- Storage Bucket:', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing')
  console.log('- Messaging Sender ID:', import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing')
  console.log('- App ID:', import.meta.env.VITE_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing')
  console.log('- Auth Instance:', auth ? '✅ Initialized' : '❌ Not Initialized')
  console.log('- Current User:', auth.currentUser?.email || 'None')
  
  // Log the actual values (for debugging only - remove in production)
  console.log('📋 Config Values:')
  console.log('  API Key:', import.meta.env.VITE_FIREBASE_API_KEY)
  console.log('  Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID)
  console.log('  Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN)
}