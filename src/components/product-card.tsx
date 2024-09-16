import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Product {
  name: string
  type: string
  price: string
  image: string | null
  reviews: Array<{ author: string; rating: number; comment: string }>
}

interface ProductCardProps {
  product: Product
  setSelectedProduct: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, setSelectedProduct }) => (
  <Card className="w-full h-auto flex flex-col">
    <CardHeader className="p-2">
      <CardTitle className="text-xs">{product.type}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col justify-between p-2">
      <div className="relative flex-grow" style={{ height: '150px' }}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <CardDescription className="text-xs">{product.name}</CardDescription>
        <p className="text-sm font-bold">${product.price}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="sm" 
              className="mt-2 text-xs w-full py-1"
              onClick={() => setSelectedProduct(product)}
            >
              Buy Now
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
            </DialogHeader>
            <p>Price: {product.price}</p>
            <Button asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Go to Store
              </a>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <Accordion type="single" collapsible className="w-full mt-2">
        <AccordionItem value="reviews">
          <AccordionTrigger className="text-sm">Reviews</AccordionTrigger>
          <AccordionContent>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <div className="font-semibold text-sm">{review.author}</div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-xs">{review.comment}</div>
                </div>
              ))
            ) : (
              <p>No reviews available for this product.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>
)

export default ProductCard