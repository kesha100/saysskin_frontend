'use client'

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Home, Camera, Microscope, Loader2 } from "lucide-react"

interface AnalysisResult {
  description: string;
}
const navItems = [
  { name: "Take a Quiz", href: "/quiz" },
  { name: "Product Scanner", href: "/product-scanner" },
  { name: "Skin Guide", href: "skin-basics" },
  { name: "AI Dermatologist", href: "/" }
];


export default function ProductAnalysisScanner() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://product-scaner.onrender.com/analyze/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const data: AnalysisResult = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error analyzing image.");
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisResult = () => {
    if (!analysisResult) return null;

    const sections = analysisResult.description.split('###').filter(Boolean).map(section => {
      const [title, ...content] = section.split('\n').filter(Boolean);
      return { title: title.trim(), content: content.join('\n').trim() };
    });

    return (
      <Card className="mt-6 bg-white bg-opacity-20 backdrop-blur-md border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">Analysis Result</CardTitle>
        </CardHeader>
        <CardContent>
          {sections.map((section, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
              <p className="text-white whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#D1C6F3] via-[#E9BCAC] to-[#BEA8F1] animate-gradient-x">
      <header className="bg-white bg-opacity-10 backdrop-blur-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white hover:text-purple-200 transition-colors">
              SAYS
            </Link>
            <div className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    {/* {item.icon && <item.icon className="w-4 h-4 mr-2" />} */}
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <div className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Product Analysis Scanner</h1>

        <div className="max-w-md mx-auto">
          <Card className="bg-white bg-opacity-10 backdrop-blur-md border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white text-center">Choose an Option</CardTitle>
              <CardDescription className="text-white text-center">
                Take a picture or upload an existing one for product analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <Button 
                className="bg-blue-500 bg-opacity-20 hover:bg-opacity-30 text-white border border-blue-300 border-opacity-50 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 py-8"
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                <Camera className="w-8 h-8 mr-4" />
                Upload a Picture
              </Button>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {previewUrl && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={previewUrl}
                    alt="Uploaded product"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}

              <Button 
                className="bg-black text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 py-8"
                onClick={analyzeImage}
                disabled={loading || !selectedFile}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-8 h-8 mr-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Microscope className="w-8 h-8 mr-4" />
                    Analyze Image
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {renderAnalysisResult()}
        </div>
      </div>
    </div>
  );
}