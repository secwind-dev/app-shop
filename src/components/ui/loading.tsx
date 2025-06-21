interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ 
  message = 'Loading...', 
  size = 'md',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-2', 
    lg: 'h-12 w-12 border-4'
  }

  const textSizeClasses = {
    sm: 'text-sm mt-2',
    md: 'text-base mt-4',
    lg: 'text-lg mt-6'
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-background ${className}`}>
      <div className="text-center">
        <div className={`animate-spin rounded-full border-border border-t-primary mx-auto ${sizeClasses[size]}`}></div>
        <p className={`text-muted-foreground font-medium ${textSizeClasses[size]}`}>
          {message}
        </p>
      </div>
    </div>
  )
}

export function LoadingSpinnerInline({ 
  message = 'Loading...', 
  size = 'sm',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2', 
    lg: 'h-8 w-8 border-2'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center gap-2">
        <div className={`animate-spin rounded-full border-border border-t-primary ${sizeClasses[size]}`}></div>
        <span className="text-muted-foreground text-sm">{message}</span>
      </div>
    </div>
  )
}