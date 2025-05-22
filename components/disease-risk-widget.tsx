"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bug, AlertTriangle, Shield, ArrowRight, Leaf, WormIcon as Virus } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import {
  calculateDiseaseRisk,
  getPreventiveRecommendations,
  type CropDiseaseRisk,
} from "@/lib/disease-prediction-service"
import { getWeatherData, type WeatherData } from "@/lib/weather-service"

interface DiseaseRiskWidgetProps {
  location?: string
  crop?: string
  compact?: boolean
}

export default function DiseaseRiskWidget({
  location = "Maharashtra, India",
  crop = "Rice",
  compact = false,
}: DiseaseRiskWidgetProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [diseaseRisk, setDiseaseRisk] = useState<CropDiseaseRisk | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { translate } = useLanguage()

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        setError(null)

        // First, get weather data
        const weather = await getWeatherData(location)
        setWeatherData(weather)

        // Then calculate disease risk based on weather
        const risk = calculateDiseaseRisk(weather, crop)

        if ("error" in risk) {
          setError(risk.error)
        } else {
          setDiseaseRisk(risk)
        }
      } catch (err) {
        console.error("Error loading disease risk data:", err)
        setError("Failed to load disease risk data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [location, crop])

  // Function to get color based on risk level
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "severe":
        return "text-red-600 bg-red-50"
      case "high":
        return "text-orange-600 bg-orange-50"
      case "moderate":
        return "text-yellow-600 bg-yellow-50"
      default:
        return "text-green-600 bg-green-50"
    }
  }

  // Function to get icon based on risk level
  const getRiskIcon = (riskLevel: string, size = 20) => {
    switch (riskLevel) {
      case "severe":
        return <AlertTriangle size={size} className="text-red-600" />
      case "high":
        return <Bug size={size} className="text-orange-600" />
      case "moderate":
        return <Virus size={size} className="text-yellow-600" />
      default:
        return <Shield size={size} className="text-green-600" />
    }
  }

  if (compact) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          {isLoading ? (
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : diseaseRisk ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center">
                  {getRiskIcon(diseaseRisk.overallRisk, 24)}
                </div>
                <div>
                  <div className="font-medium">
                    {crop} {translate("Disease Risk")}
                  </div>
                  <div
                    className={`text-sm ${
                      diseaseRisk.overallRisk === "severe"
                        ? "text-red-600"
                        : diseaseRisk.overallRisk === "high"
                          ? "text-orange-600"
                          : diseaseRisk.overallRisk === "moderate"
                            ? "text-yellow-600"
                            : "text-green-600"
                    }`}
                  >
                    {translate(diseaseRisk.overallRisk.charAt(0).toUpperCase() + diseaseRisk.overallRisk.slice(1))}
                  </div>
                </div>
              </div>
              <Link href="/disease-risk">
                <Button variant="ghost" size="sm" className="text-green-600">
                  <span className="sr-only md:not-sr-only md:inline-block">{translate("Details")}</span>
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
          ) : null}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className={`${diseaseRisk ? getRiskColor(diseaseRisk.overallRisk) : "bg-gray-50"} pb-2`}>
        <CardTitle className="text-xl flex items-center gap-2">
          {diseaseRisk ? getRiskIcon(diseaseRisk.overallRisk, 20) : <Bug size={20} />}
          <span>{translate("Disease Risk Prediction")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : diseaseRisk ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">{crop}</h3>
              <Badge className={getRiskColor(diseaseRisk.overallRisk)}>
                {translate(diseaseRisk.overallRisk.charAt(0).toUpperCase() + diseaseRisk.overallRisk.slice(1))}{" "}
                {translate("Risk")}
              </Badge>
            </div>

            {diseaseRisk.diseases.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{translate("Top Disease Threats")}</h4>
                <div className="space-y-3">
                  {diseaseRisk.diseases.slice(0, 2).map((disease, index) => (
                    <div key={index} className={`p-3 rounded-lg ${getRiskColor(disease.riskLevel)}`}>
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-medium">{disease.diseaseName}</h5>
                        <span className="text-xs font-medium">
                          {translate("Risk")}: {Math.round(disease.riskScore)}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{disease.riskFactors[0]}</p>
                      <div className="text-xs text-gray-600">
                        {translate("Symptoms")}: {disease.symptoms[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">{translate("Recommended Actions")}</h4>
              <ul className="space-y-2">
                {getPreventiveRecommendations(diseaseRisk)
                  .slice(0, 3)
                  .map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      {recommendation.startsWith("-") ? (
                        <>
                          <span className="text-gray-400 mt-0.5">•</span>
                          <span className="text-gray-600">{recommendation.substring(2)}</span>
                        </>
                      ) : (
                        <>
                          <Leaf className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{recommendation}</span>
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </>
        ) : null}
      </CardContent>
      <CardFooter className="bg-gray-50 p-3 flex justify-between">
        <div className="text-sm text-gray-600">{translate("Based on current weather conditions")}</div>
        <Link href="/disease-risk">
          <Button variant="ghost" size="sm" className="h-8 text-green-600">
            {translate("Full Analysis")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
