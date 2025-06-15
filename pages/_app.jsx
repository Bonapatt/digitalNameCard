import '../styles/globals.css'
import ThemeToggle from '../components/ThemeToggle'

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <header className="p-4 flex justify-end max-w-5xl mx-auto">
        <ThemeToggle />
      </header>
      <Component {...pageProps} />
    </div>
  )
}
