import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('dark-mode')
    if (saved === 'true') {
      document.documentElement.classList.add('dark')
      setEnabled(true)
    }
  }, [])

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('dark-mode', String(enabled))
  }, [enabled])

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setEnabled((v) => !v)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? 'bg-indigo-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}
