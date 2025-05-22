"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Upload, Camera, Leaf, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function CropDisease() {
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<null | {
    disease: string
    confidence: number
    severity: "Low" | "Medium" | "High"
    treatment: string
    preventionTips: string[]
  }>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { translate } = useLanguage()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        analyzeImage()
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    // In a real app, this would open the device camera
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)
    setResult(null)

    // Simulate AI analysis with timeout
    setTimeout(() => {
      // Mock result
      setResult({
        disease: "Tomato Leaf Curl Virus",
        confidence: 92,
        severity: "Medium",
        treatment:
          "Remove and destroy infected plants. Apply neem oil spray (10ml/liter water) to control whitefly vectors. Use yellow sticky traps around plants to catch whiteflies.",
        preventionTips: [
          "Use disease-resistant varieties",
          "Control whitefly population with regular monitoring",
          "Maintain field sanitation by removing plant debris",
          "Avoid planting new tomato crops near older ones",
          "Use reflective mulches to repel whiteflies",
        ],
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const resetAnalysis = () => {
    setImage(null)
    setResult(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-green-600 hover:text-green-800 flex items-center gap-1">
          <ArrowLeft size={16} />
          <span>{translate("Back to Home")}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="bg-green-50">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-green-600" />
              <CardTitle className="text-2xl text-green-800">{translate("AI Crop Disease Detection")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-6">
              {translate(
                "Upload or capture an image of your crop to identify diseases and get treatment recommendations.",
              )}
            </p>

            {!image ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} ref={fileInputRef} />
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Leaf className="h-12 w-12 text-green-200" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">{translate("Upload a crop image")}</h3>
                  <p className="text-sm text-gray-500">
                    {translate("Take a clear photo of the affected leaf, fruit, or plant part")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Upload size={16} />
                      <span>{translate("Upload Image")}</span>
                    </Button>
                    <Button
                      onClick={handleCameraCapture}
                      className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    >
                      <Camera size={16} />
                      <span>{translate("Take Photo")}</span>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <Image src={image || "/placeholder.svg"} alt="Crop image" fill className="object-contain" />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetAnalysis}>
                    {translate("Upload Different Image")}
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={analyzeImage} disabled={isAnalyzing}>
                    {isAnalyzing ? translate("Analyzing...") : translate("Analyze Image")}
                  </Button>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-2"></div>
                <p>{translate("Analyzing your crop image...")}</p>
              </div>
            )}

            {result && (
              <div className="mt-6 space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 text-lg mb-2">{translate("Disease Detected")}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{result.disease}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {result.confidence}% {translate("Confidence")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{translate("Severity")}:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        result.severity === "High"
                          ? "bg-red-100 text-red-800"
                          : result.severity === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {translate(result.severity)}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{translate("Treatment Recommendation")}</h3>
                  <p className="text-gray-700">{result.treatment}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{translate("Prevention Tips")}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.preventionTips.map((tip, index) => (
                      <li key={index} className="text-gray-700">
                        {translate(tip)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800">{translate("Common Crop Diseases")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-1">{translate("Rice Blast")}</h3>
                  <p className="text-gray-700 text-sm">
                    {translate(
                      "Appears as diamond-shaped lesions with gray centers on leaves. Treat with fungicides containing tricyclazole.",
                    )}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-1">{translate("Wheat Rust")}</h3>
                  <p className="text-gray-700 text-sm">
                    {translate(
                      "Appears as orange-brown pustules on leaves and stems. Use resistant varieties and apply fungicides with propiconazole.",
                    )}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-1">{translate("Cotton Bollworm")}</h3>
                  <p className="text-gray-700 text-sm">
                    {translate(
                      "Larvae feed on cotton bolls causing yield loss. Use pheromone traps and apply neem-based insecticides.",
                    )}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-1">{translate("Tomato Leaf Curl")}</h3>
                  <p className="text-gray-700 text-sm">
                    {translate(
                      "Viral disease causing leaves to curl upward. Control whitefly vectors and remove infected plants.",
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-yellow-50">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <CardTitle className="text-xl text-yellow-800">{translate("Disease Alert")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                {translate("Recent weather conditions in your area increase the risk of:")}
              </p>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-800 mb-1">{translate("Powdery Mildew")}</h3>
                <p className="text-gray-700 text-sm">
                  {translate(
                    "High humidity and moderate temperatures create ideal conditions for powdery mildew. Monitor your crops closely and apply preventive measures.",
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
