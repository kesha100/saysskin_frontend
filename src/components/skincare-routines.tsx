'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Home, Menu, Loader2 } from "lucide-react"
import LoadingSpinner from './loading-spinner'
import ProductCard from './product-card'
interface Product {
  name: string
  type: string
  price: string
  image: string | null
  reviews: Array<{ author: string; rating: number; comment: string }>
}

interface RoutineData {
  morning_routine: Product[]
  night_routine: Product[]
}

const navItems = [
  { name: "Take a Quiz", href: "/quiz" },
  { name: "Product Scanner", href: "/product-scanner" },
  { name: "Skin Guide", href: "/guide" },
  { name: "AI Dermatologist", href: "/" }
];


export function SkincareRoutines() {
  const [routines, setRoutines] = useState<RoutineData | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [receiveNews, setReceiveNews] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem('skincareRoutines')
      if (storedData) {
        setRoutines(JSON.parse(storedData))
        setIsLoading(false)
      } else {
        try {
          const response = await fetch('https://saysskin.onrender.com/api/v1/quiz/user-quizzes/2/recommend_products/')
          if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          const data = await response.json()
          setRoutines(data)
          localStorage.setItem('skincareRoutines', JSON.stringify(data))
          setIsLoading(false)
        } catch (error) {
          setError('An error occurred while fetching the data. Please try again later.')
          setIsLoading(false)
        }
      }
    }

    fetchData();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthOpen(false)
    setIsConfirmationOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#D1C6F3] via-[#E9BCAC] to-[#BEA8F1]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#D1C6F3] via-[#E9BCAC] to-[#BEA8F1]">
        <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-xl text-white">{error}</p>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#D1C6F3] via-[#E9BCAC] to-[#BEA8F1] animate-gradient-x">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/30 to-blue-600/30 pointer-events-none"></div>
      <nav className="bg-white bg-opacity-10 backdrop-blur-md relative z-10 flex items-center justify-between py-3 px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-white">
            SAYS
          </Link>
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  className="bg-white text-black rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-500 hover:text-white text-xs px-3 py-1 h-8"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["Take a Quiz", "Face Scanner", "Skin Guide", "AI Dermatologist", "Profile"].map((item) => (
                <DropdownMenuItem key={item}>
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="hidden md:flex bg-white text-black rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 p-2 h-8 w-8">
          <Home className="w-4 h-4" />
        </Button>
      </nav>
      
      <div className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-8 text-center">
          Based on your quiz results, AI made a personalized skincare routine just for you!
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Morning Routine</h2>
            <div className="grid grid-cols-2 gap-4">
              {routines?.morning_routine.map((product, index) => (
                <ProductCard key={index} product={product} setSelectedProduct={setSelectedProduct} />
              ))}
            </div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Night Routine</h2>
            <div className="grid grid-cols-2 gap-4">
              {routines?.night_routine.map((product, index) => (
                <ProductCard key={index} product={product} setSelectedProduct={setSelectedProduct} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
          <p className="text-white text-lg mb-4">Would you like to save your routine?</p>
          <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-black hover:bg-gray-200">
                Save
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign In to Save Your Routine</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="receiveNews"
                      checked={receiveNews}
                      onCheckedChange={(checked) => setReceiveNews(checked as boolean)}
                    />
                    <label
                      htmlFor="receiveNews"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I want to receive news and emails from SAYS
                    </label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Routine</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Congratulations!</DialogTitle>
            </DialogHeader>
            <p>Your skincare routine has been saved successfully.</p>
            <DialogFooter>
              <Button onClick={() => setIsConfirmationOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Accordion type="single" collapsible className="mt-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-white">Tap to learn more on how to use these products</AccordionTrigger>
            <AccordionContent>
              <div className="bg-white rounded-lg p-4 text-black">
                <h3 className="font-semibold mb-2">How to Use:</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Start with a clean face. Use the cleanser morning and night.</li>
                  <li>Apply toner with a cotton pad or your hands, gently patting it into your skin.</li>
                  <li>Use a small amount of cream, applying it in upward motions.</li>
                  <li>For daytime, finish with SPF. Reapply every 2 hours if exposed to sun.</li>
                  <li>At night, use micellar water to remove makeup before cleansing.</li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}