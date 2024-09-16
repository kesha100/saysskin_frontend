import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const SkinGuidePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3E7D1] via-[#E9D5AC] to-[#F1E2BE]">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-800 mb-6">Skin Care Basics for Everyone</h1>

        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Your Skin</h2>
          <p className="text-gray-600 mb-4">
            Your skin is your body's largest organ and deserves proper care. While everyone's skin is unique, there are some universal principles that can benefit all skin types.
          </p>
          <p className="text-gray-600 mb-4">
            A good skincare routine is essential for maintaining healthy, glowing skin. Here are some key aspects of skin health that everyone should know:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>The importance of cleansing and moisturizing</li>
            <li>Sun protection and its long-term benefits</li>
            <li>The role of nutrition in skin health</li>
            <li>Understanding common skin concerns</li>
            <li>The basics of a daily skincare routine</li>
          </ul>
        </div>

        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">The Basics of Skin Care</h2>
          <div className="relative w-full h-64 mb-4">
            <Image
              src="/guide2.webp"
              alt="Skin care basics illustration"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <p className="text-gray-600">
            Regardless of your skin type, these fundamental principles form the foundation of good skin care. Understanding these basics will help you make informed decisions about your skin care routine and products.
          </p>
        </div>

        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Essential Skin Care Steps</h2>
          <p className="text-gray-600 mb-4">
            While individual needs may vary, here's a basic skincare routine that can benefit most people:
          </p>
          <ol className="list-decimal list-inside text-gray-600">
            <li className="mb-2">Cleanse: Use a gentle cleanser to remove dirt, oil, and makeup twice daily.</li>
            <li className="mb-2">Tone (optional): If needed, use an alcohol-free toner to balance your skin's pH.</li>
            <li className="mb-2">Treat: Apply any serums or treatments for specific skin concerns.</li>
            <li className="mb-2">Moisturize: Use a suitable moisturizer to keep your skin hydrated.</li>
            <li>Protect: Always apply a broad-spectrum sunscreen during the day, regardless of the weather.</li>
          </ol>
          <p className="text-gray-600 mt-4">
            Remember, consistency is key in skincare. It's better to have a simple routine that you follow regularly than a complex one that you struggle to maintain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkinGuidePage;