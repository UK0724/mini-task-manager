import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './lib/auth-context'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { Spinner } from './components/ui/shadcn-io/spinner'

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>
      <Spinner color='blue' width={40} height={40} variant='ellipsis' />
    </div>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || "/"

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>
      <Spinner color='blue' width={40} height={40} variant='ellipsis' />
    </div>
  }

  if (user) {
    return <Navigate to={from} replace />
  }

  return <>{children}</>
}

export default App