import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true'
    setIsDark(saved)
    document.documentElement.classList.toggle('dark', saved)
  }, [])

  const toggleDark = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem('darkMode', newIsDark.toString())
    document.documentElement.classList.toggle('dark', newIsDark)
  }

  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

export default DarkModeToggle