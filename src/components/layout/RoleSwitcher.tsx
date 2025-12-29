import { useNavigate, useLocation } from 'react-router-dom'
import { User, Users, BarChart3 } from 'lucide-react'
import DarkModeToggle from '../DarkModeToggle'

const RoleSwitcher = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const roles = [
    { path: '/employee', label: 'Employee', icon: User },
    { path: '/manager', label: 'Manager', icon: Users },
    { path: '/finance', label: 'Finance', icon: BarChart3 }
  ]

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-2">
        {roles.map(({ path, label, icon: Icon }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md transition ${
              location.pathname === path
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>
      <DarkModeToggle />
    </div>
  )
}

export default RoleSwitcher
