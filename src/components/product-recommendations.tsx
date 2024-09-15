/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ExternalLink, Loader2 } from 'lucide-react'

interface Product {
  name: string
  price: string
  link: string
  image: string | null  // Allow for the possibility of null
  step: string
}

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div className="relative h-48">
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
          <span>No image available</span>
        </div>
      )}
    </div>
    <div className="p-4 text-center">
      <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.step}</h3>
      <p className="font-medium text-gray-600 mb-1">{product.name}</p>
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-teal-500 text-white px-6 py-2 mt-4 rounded-full inline-flex items-center hover:bg-teal-600 transition-colors duration-300 text-sm font-medium"
      >
        Buy from {product.price}
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </div>
  </div>
)

export function ProductRecommendationsComponent() {
  const [morningRoutine, setMorningRoutine] = useState<Product[]>([])
  const [nightRoutine, setNightRoutine] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/quiz/user-quizzes/2/recommend_products/')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setMorningRoutine(data.morning_routine || [])  // Set to empty array if undefined
        setNightRoutine(data.night_routine || [])  // Set to empty array if undefined
        setIsLoading(false)
      } catch (error) {
        setError('An error occurred while fetching the data. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-xl text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Here's your perfect routine!</h1>
        <p className="text-xl text-center mb-8 text-gray-600">Discover the best products tailored just for you</p>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Morning Routine</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {morningRoutine?.length > 0 ? (
              morningRoutine.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            ) : (
              <p>No products found for the morning routine.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Night Routine</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {nightRoutine?.length > 0 ? (
              nightRoutine.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            ) : (
              <p>No products found for the night routine.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
