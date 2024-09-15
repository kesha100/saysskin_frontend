import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  name: string;
  price: string;
  link: string;
  image: string | null;
}

interface ProductRecommendationsProps {
  morningRoutine?: Product[];
  nightRoutine?: Product[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-48 w-full">
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-200">
          <span className="text-gray-500">No image available</span>
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.price}</p>
      <Link href={product.link} passHref>
        <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          View Product
        </a>
      </Link>
    </div>
  </div>
);

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  morningRoutine = [],
  nightRoutine = [],
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Product Recommendations</h1>
      
      {morningRoutine.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Morning Routine</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {morningRoutine.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </section>
      )}
      
      {nightRoutine.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Night Routine</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {nightRoutine.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </section>
      )}
      
      {morningRoutine.length === 0 && nightRoutine.length === 0 && (
        <p className="text-center text-gray-600">No product recommendations available.</p>
      )}
    </div>
  );
};

export default ProductRecommendations;