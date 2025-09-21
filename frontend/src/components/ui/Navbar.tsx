import { useAuth } from '@/lib/auth-context'
import { Button } from './button'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow fixed top-0 w-full z-50">
    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
      <div className="flex items-center space-x-4">
       {
        user && (
           <>
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <Button variant="outline" className=' cursor-pointer' onClick={() => logout()}>
              Logout
            </Button>
            </>
        )
       }
      </div>
    </div>
  </header>
  )
}

export default Navbar