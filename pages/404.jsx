import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="p-4 text-center">
      <p>Page not found.</p>
      <Link href="/" className="text-blue-500 underline">Go Home</Link>
    </div>
  )
}
