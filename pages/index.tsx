import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [code, setCode] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = code.trim()
    if (trimmed) {
      router.push(`/product/${trimmed.toUpperCase()}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Product Lookup
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter a product code to find your item
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Product Code"
            className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </form>
      </div>
    </div>
  )
}
