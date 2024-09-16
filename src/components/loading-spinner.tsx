import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#D1C6F3] via-[#E9BCAC] to-[#BEA8F1]">
      <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
      <p className="text-white text-xl font-semibold">Loading your personalized skincare routine...</p>
    </div>
  );
};

export default LoadingSpinner;
