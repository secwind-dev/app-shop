import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './components/auth/AuthProvider'
import { RouterService } from './router'

function App() {
  return (
    <Router>
      <AuthProvider>
        <RouterService />
      </AuthProvider>
    </Router>
  )
}

export default App
