import { Button } from "@/components/ui/button"

export default function MainPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-300 to-pink-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-start justify-center h-full relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          SOMETHING ABOUT YOUR SKIN
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white">
          Find your personalized basic<br />skincare routine in 2 minutes
        </p>
        <Button className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-3 rounded-full">
          Take the quiz!
        </Button>
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-transparent to-white/20 rounded-tl-full"></div>
      <div className="absolute bottom-4 right-4 w-64 h-64 bg-white/10 rounded-full flex items-center justify-center text-white/50">
        Skincare Products Illustration
      </div>
    </div>
  )
}