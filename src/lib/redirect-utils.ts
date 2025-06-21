/**
 * Validates and sanitizes redirect URLs to prevent infinite loops
 */
export function validateRedirectUrl(url: string | undefined): string | null {
  if (!url) return null
  
  try {
    // Decode URL to handle encoded characters
    const decodedUrl = decodeURIComponent(url)
    
    // Block auth routes
    if (decodedUrl.includes('/login') || decodedUrl.includes('/register')) {
      console.warn('🚫 Blocked redirect to auth route:', decodedUrl)
      return null
    }
    
    // Block nested redirects
    if (decodedUrl.includes('redirect=')) {
      console.warn('🚫 Blocked nested redirect:', decodedUrl)
      return null
    }
    
    // Block extremely long URLs (possible attack)
    if (decodedUrl.length > 500) {
      console.warn('🚫 Blocked long URL:', decodedUrl.length, 'chars')
      return null
    }
    
    // Extract clean URL (remove redirect params)
    const cleanUrl = decodedUrl.split('?redirect=')[0]
    
    // Basic URL validation
    if (cleanUrl.startsWith('/') || cleanUrl.startsWith('http')) {
      return cleanUrl
    }
    
    console.warn('🚫 Invalid URL format:', cleanUrl)
    return null
    
  } catch (error) {
    console.error('🚫 URL validation error:', error)
    return null
  }
}

/**
 * Safe redirect function that validates URLs
 */
export function safeRedirect(url: string | undefined, fallback: string = '/dashboard'): string {
  const validUrl = validateRedirectUrl(url)
  return validUrl || fallback
}