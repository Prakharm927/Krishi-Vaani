"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, Camera, Leaf, AlertTriangle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Progress } from "@/components/ui/progress"

// Mock disease database for detection
const diseasesDatabase = [
  {
    id: "tomato_late_blight",
    name: "Tomato Late Blight",
    scientificName: "Phytophthora infestans",
    confidence: 92,
    severity: "High",
    symptoms: [
      "Dark, water-soaked lesions on leaves",
      "White fuzzy growth on undersides of leaves",
      "Brown lesions on stems and fruits",
    ],
    organicTreatments: [
      "Remove and destroy infected plants",
      "Apply copper-based fungicide (4g/liter water)",
      "Spray compost tea weekly as preventive measure",
      "Maintain good air circulation between plants",
    ],
    preventiveMeasures: [
      "Use resistant varieties",
      "Avoid overhead irrigation",
      "Rotate crops with non-solanaceous plants",
      "Apply mulch to prevent soil splash",
    ],
  },
  {
    id: "rice_blast",
    name: "Rice Blast",
    scientificName: "Magnaporthe oryzae",
    confidence: 88,
    severity: "High",
    symptoms: [
      "Diamond-shaped lesions with gray centers on leaves",
      "Infected nodes turn blackish and break easily",
      "Panicle neck may break, causing empty grains",
    ],
    organicTreatments: [
      "Apply neem oil solution (10ml/liter water)",
      "Spray fermented buttermilk solution (1:10 dilution)",
      "Use Trichoderma viride as biological control",
      "Apply wood ash to strengthen plant resistance",
    ],
    preventiveMeasures: [
      "Use resistant varieties",
      "Apply balanced fertilization (avoid excess nitrogen)",
      "Maintain good field drainage",
      "Adjust planting time to avoid favorable conditions",
    ],
  },
  {
    id: "wheat_rust",
    name: "Wheat Rust (Leaf Rust)",
    scientificName: "Puccinia triticina",
    confidence: 95,
    severity: "Medium",
    symptoms: [
      "Orange-brown pustules on leaves and stems",
      "Circular to oval pustules on upper leaf surface",
      "Severe infections cause leaf yellowing and death",
    ],
    organicTreatments: [
      "Spray garlic extract (100g crushed garlic in 1L water, filtered)",
      "Apply cow urine solution (1:10 dilution)",
      "Use sulfur-based organic fungicides",
      "Spray milk solution (40% milk, 60% water) weekly",
    ],
    preventiveMeasures: [
      "Plant resistant varieties",
      "Early sowing to avoid favorable disease conditions",
      "Crop rotation with non-host crops",
      "Destroy volunteer wheat plants",
    ],
  },
  {
    id: "cotton_leaf_curl",
    name: "Cotton Leaf Curl Virus",
    scientificName: "Cotton leaf curl virus (CLCuV)",
    confidence: 90,
    severity: "High",
    symptoms: [
      "Upward or downward curling of leaves",
      "Thickened veins and enations on undersides of leaves",
      "Stunted growth and reduced yield",
    ],
    organicTreatments: [
      "Control whitefly vectors with yellow sticky traps",
      "Spray neem oil (20ml/liter) to repel whiteflies",
      "Apply garlic-chili extract to reduce vector population",
      "Use reflective mulches to repel whiteflies",
    ],
    preventiveMeasures: [
      "Use resistant varieties",
      "Early sowing to avoid peak whitefly populations",
      "Remove and destroy infected plants",
      "Maintain field sanitation",
    ],
  },
]

export default function CropDiseaseDetector() {
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<(typeof diseasesDatabase)[0] | null>(null)
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
    setProgress(0)
    setResult(null)

    // Simulate TensorFlow.js model loading and analysis with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 5
        if (newProgress >= 100) {
          clearInterval(interval)

          // Select a random disease from our database as the "detected" disease
          setTimeout(() => {
            const randomDisease = diseasesDatabase[Math.floor(Math.random() * diseasesDatabase.length)]
            setResult(randomDisease)
            setIsAnalyzing(false)
          }, 500)

          return 100
        }
        return newProgress
      })
    }, 300)
  }

  const resetAnalysis = () => {
    setImage(null)
    setResult(null)
    setProgress(0)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-50">
        <div className="flex items-center gap-3">
          <Leaf className="h-6 w-6 text-green-600" />
          <CardTitle className="text-xl text-green-800">{translate("AI Crop Disease Detection")}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-gray-700 mb-6">
          {translate(
            "Upload or capture an image of your crop to identify diseases and get organic treatment recommendations.",
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

            {isAnalyzing ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{translate("Analyzing image...")}</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-gray-500 text-center animate-pulse">
                  {progress < 30
                    ? translate("Loading TensorFlow.js model...")
                    : progress < 60
                      ? translate("Detecting patterns...")
                      : translate("Identifying disease...")}
                </p>
              </div>
            ) : (
              <div className="flex justify-between">
                <Button variant="outline" onClick={resetAnalysis} className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  <span>{translate("Try Different Image")}</span>
                </Button>
                {!result && (
                  <Button className="bg-green-600 hover:bg-green-700" onClick={analyzeImage}>
                    {translate("Analyze Image")}
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-green-800 text-lg">{translate("Disease Detected")}</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {result.confidence}% {translate("Confidence")}
                </span>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-800">{result.name}</p>
                <p className="text-sm text-gray-600 italic">{result.scientificName}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
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
              <h3 className="font-semibold text-gray-800 mb-2">{translate("Symptoms")}</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.symptoms.map((symptom, index) => (
                  <li key={index} className="text-gray-700">
                    {translate(symptom)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">{translate("Organic Treatment Recommendations")}</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.organicTreatments.map((treatment, index) => (
                  <li key={index} className="text-gray-700">
                    {translate(treatment)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-1">{translate("Preventive Measures")}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.preventiveMeasures.slice(0, 2).map((measure, index) => (
                      <li key={index} className="text-gray-700">
                        {translate(measure)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
