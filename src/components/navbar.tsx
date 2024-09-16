import { Button } from "@/components/ui/button"
import { UserCircle } from "lucide-react"

export default function NavBar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">SAYS</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="quiz" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Take quiz
              </a>
              <a href="/product-scanner" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Product Scanner
              </a>
              <a href="/skin-basics" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Skin Basics
              </a>
              <a href="/ai-dermotologist" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                AI Dermotologist
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="outline" className="mr-4">
              Book an online consultation
            </Button>
            <Button variant="ghost" size="icon">
              <UserCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}