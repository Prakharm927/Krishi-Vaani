"use client"

import { useState, useEffect } from "react"
import {
  Bug,
  AlertTriangle,
  Shield,
  Leaf,
  WormIcon as Virus,
  Microscope,
  Droplets,
  Thermometer,
  Wind,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/language-provider"
import {
  calculateDiseaseRisk,
  getPreventiveRecommendations,
  type CropDiseaseRisk,
  type DiseaseRisk,
} from "@/lib/disease-prediction-service"
import { getWeatherData, type WeatherData } from "@/lib/weather-service"
import LocationSelector from "@/components/location-selector"

// List of crops supported by our disease prediction model
const supportedCrops = ["Rice", "Wheat", "Tomato", "Potato", "Cotton", "Maize", "Onion", "Sugarcane"]

export default function DiseaseRiskPage() {
  const [location, setLocation] = useState("Maharashtra, India")
  const [selectedCrop, setSelectedCrop] = useState("Rice")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [diseaseRisk, setDiseaseRisk] = useState<CropDiseaseRisk | null>(null)
  const [selectedDisease, setSelectedDisease] = useState<DiseaseRisk | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { translate } = useLanguage()

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        setError(null)
        setSelectedDisease(null)

        // First, get weather data
        const weather = await getWeatherData(location)
        setWeatherData(weather)

        // Then calculate disease risk based on weather
        const risk = calculateDiseaseRisk(weather, selectedCrop)

        if ("error" in risk) {
          setError(risk.error)
          setDiseaseRisk(null)
        } else {
          setDiseaseRisk(risk)
          // Set the first disease as selected by default
          if (risk.diseases.length > 0) {
            setSelectedDisease(risk.diseases[0])
          }
        }
      } catch (err) {
        console.error("Error loading disease risk data:", err)
        setError("Failed to load disease risk data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [location, selectedCrop])

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation)
  }

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

  // Function to get icon based on disease icon name
  const getDiseaseIcon = (iconName: string, size = 20) => {
    switch (iconName) {
      case "leaf-off":
        return <Leaf size={size} className="text-gray-600" />
      case "bacteria":
        return <Microscope size={size} className="text-purple-600" />
      case "alert-circle":
        return <AlertTriangle size={size} className="text-orange-600" />
      case "snowflake":
        return <Droplets size={size} className="text-blue-600" />
      case "cloud-rain":
        return <Droplets size={size} className="text-blue-600" />
      case "target":
        return <Virus size={size} className="text-red-600" />
      case "bug":
        return <Bug size={size} className="text-orange-600" />
      case "disc":
        return <Virus size={size} className="text-gray-600" />
      case "flame":
        return <Thermometer size={size} className="text-red-600" />
      case "wind":
        return <Wind size={size} className="text-blue-600" />
      case "droplets":
        return <Droplets size={size} className="text-blue-600" />
      default:
        return <Bug size={size} className="text-gray-600" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">{translate("Crop Disease Risk Prediction")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <LocationSelector onLocationChange={handleLocationChange} defaultLocation={location} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Select Crop")}</label>
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger>
              <SelectValue placeholder={translate("Select crop")} />
            </SelectTrigger>
            <SelectContent>
              {supportedCrops.map((crop) => (
                <SelectItem key={crop} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-red-50 rounded-lg">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-red-800 mb-2">{translate("Error")}</h3>
          <p className="text-red-600">{error}</p>
          <Button onClick={() => setIsLoading(true)} className="mt-4 bg-red-600 hover:bg-red-700">
            {translate("Retry")}
          </Button>
        </div>
      ) : diseaseRisk && weatherData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className={getRiskColor(diseaseRisk.overallRisk)}>
                <div className="flex items-center gap-3">
                  {getRiskIcon(diseaseRisk.overallRisk, 24)}
                  <CardTitle className="text-2xl">
                    {selectedCrop} {translate("Disease Risk Assessment")}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{translate("Overall Disease Risk")}</h3>
                    <span
                      className={`text-sm font-medium ${
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
                    </span>
                  </div>
                  <Progress
                    value={diseaseRisk.overallRiskScore}
                    className={`h-2 ${
                      diseaseRisk.overallRisk === "severe"
                        ? "bg-red-100"
                        : diseaseRisk.overallRisk === "high"
                          ? "bg-orange-100"
                          : diseaseRisk.overallRisk === "moderate"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                    }`}
                    indicatorClassName={
                      diseaseRisk.overallRisk === "severe"
                        ? "bg-red-600"
                        : diseaseRisk.overallRisk === "high"
                          ? "bg-orange-600"
                          : diseaseRisk.overallRisk === "moderate"
                            ? "bg-yellow-600"
                            : "bg-green-600"
                    }
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{translate("Low")}</span>
                    <span>{translate("Moderate")}</span>
                    <span>{translate("High")}</span>
                    <span>{translate("Severe")}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-3">{translate("Disease Threats")}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {diseaseRisk.diseases.map((disease, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg cursor-pointer border-2 ${
                          selectedDisease?.diseaseName === disease.diseaseName
                            ? `border-${
                                disease.riskLevel === "severe"
                                  ? "red"
                                  : disease.riskLevel === "high"
                                    ? "orange"
                                    : disease.riskLevel === "moderate"
                                      ? "yellow"
                                      : "green"
                              }-600`
                            : "border-transparent"
                        } ${getRiskColor(disease.riskLevel)}`}
                        onClick={() => setSelectedDisease(disease)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            {getDiseaseIcon(disease.icon, 20)}
                            <h4 className="font-medium">{disease.diseaseName}</h4>
                          </div>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                            {Math.round(disease.riskScore)}%
                          </span>
                        </div>
                        <Progress
                          value={disease.riskScore}
                          className="h-1.5 bg-white bg-opacity-50"
                          indicatorClassName={
                            disease.riskLevel === "severe"
                              ? "bg-red-600"
                              : disease.riskLevel === "high"
                                ? "bg-orange-600"
                                : disease.riskLevel === "moderate"
                                  ? "bg-yellow-600"
                                  : "bg-green-600"
                          }
                        />
                        <p className="text-sm mt-2 line-clamp-2">{disease.riskFactors[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">{translate("Weather Factors Affecting Disease Risk")}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Thermometer className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">{translate("Temperature")}</span>
                      </div>
                      <div className="text-lg font-semibold">{Math.round(weatherData.current.temp)}°C</div>
                      <div className="text-xs text-gray-500">
                        {weatherData.current.temp > 28
                          ? translate("High - favorable for many diseases")
                          : weatherData.current.temp < 15
                            ? translate("Low - reduced disease activity")
                            : translate("Moderate - monitor regularly")}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">{translate("Humidity")}</span>
                      </div>
                      <div className="text-lg font-semibold">{Math.round(weatherData.current.humidity)}%</div>
                      <div className="text-xs text-gray-500">
                        {weatherData.current.humidity > 80
                          ? translate("High - increased disease risk")
                          : weatherData.current.humidity < 60
                            ? translate("Low - reduced disease risk")
                            : translate("Moderate - monitor regularly")}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">{translate("Rainfall")}</span>
                      </div>
                      <div className="text-lg font-semibold">
                        {weatherData.forecast
                          .slice(0, 3)
                          .reduce((sum, day) => sum + day.rainfall, 0)
                          .toFixed(1)}{" "}
                        mm
                      </div>
                      <div className="text-xs text-gray-500">{translate("3-day total")}</div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Wind className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">{translate("Leaf Wetness")}</span>
                      </div>
                      <div className="text-lg font-semibold">
                        {weatherData.current.humidity >= 85
                          ? translate("High")
                          : weatherData.current.humidity >= 75
                            ? translate("Medium")
                            : translate("Low")}
                      </div>
                      <div className="text-xs text-gray-500">
                        {weatherData.current.humidity >= 85
                          ? translate("Favorable for infection")
                          : translate("Less favorable for infection")}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedDisease && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {getDiseaseIcon(selectedDisease.icon, 20)}
                    <CardTitle>{selectedDisease.diseaseName}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="overview">{translate("Overview")}</TabsTrigger>
                      <TabsTrigger value="symptoms">{translate("Symptoms")}</TabsTrigger>
                      <TabsTrigger value="prevention">{translate("Prevention")}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-2">{translate("Risk Factors")}</h3>
                          <ul className="space-y-2">
                            {selectedDisease.riskFactors.map((factor, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-2">{translate("Affected Crops")}</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedDisease.affectedCrops.map((crop, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                {crop}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className={`p-4 rounded-lg ${getRiskColor(selectedDisease.riskLevel)}`}>
                          <div className="flex items-center gap-2 mb-2">
                            {getRiskIcon(selectedDisease.riskLevel, 16)}
                            <h3 className="font-medium">
                              {translate("Current Risk Level")}:{" "}
                              {translate(
                                selectedDisease.riskLevel.charAt(0).toUpperCase() + selectedDisease.riskLevel.slice(1),
                              )}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-700">
                            {selectedDisease.riskLevel === "severe"
                              ? translate("Immediate action recommended. High likelihood of disease outbreak.")
                              : selectedDisease.riskLevel === "high"
                                ? translate(
                                    "Preventive action strongly recommended. Significant risk of disease development.",
                                  )
                                : selectedDisease.riskLevel === "moderate"
                                  ? translate(
                                      "Monitor closely and prepare preventive measures. Moderate risk of disease.",
                                    )
                                  : translate("Continue regular monitoring. Low risk of disease at this time.")}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="symptoms">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">{translate("Identifying Symptoms")}</h3>
                        <ul className="space-y-3">
                          {selectedDisease.symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-orange-600 font-medium">{index + 1}</span>
                              </div>
                              <span className="text-gray-700">{symptom}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Microscope className="h-5 w-5 text-blue-600" />
                            <h3 className="font-medium text-blue-800">{translate("Diagnostic Tip")}</h3>
                          </div>
                          <p className="text-sm text-gray-700">
                            {translate(
                              "If you observe these symptoms, consider taking clear photos of affected plant parts and consulting with an agricultural expert for confirmation.",
                            )}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="prevention">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">{translate("Preventive Measures")}</h3>
                        <ul className="space-y-3">
                          {selectedDisease.preventiveMeasures.map((measure, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                              <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{measure}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Leaf className="h-5 w-5 text-green-600" />
                            <h3 className="font-medium text-green-800">{translate("Recommended Action Now")}</h3>
                          </div>
                          <p className="text-sm text-gray-700">
                            {selectedDisease.riskLevel === "severe" || selectedDisease.riskLevel === "high"
                              ? translate(
                                  "Based on current conditions, implementing preventive measures immediately is strongly recommended.",
                                )
                              : translate(
                                  "Monitor your crop regularly and prepare preventive measures for application if early symptoms appear.",
                                )}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>{translate("Recommended Actions")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {getPreventiveRecommendations(diseaseRisk).map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-600" />
                  <span>{translate("Weather Forecast")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  {translate("Weather conditions for the next 5 days and their impact on disease development:")}
                </p>
                <div className="space-y-3">
                  {weatherData.forecast.slice(0, 5).map((day, index) => {
                    // Calculate a simple disease favorability score for this day
                    const isFavorable = day.humidity > 75 && day.tempMax > 25 && day.tempMax < 32
                    const isHighlyFavorable =
                      day.humidity > 85 && day.rainChance > 60 && day.tempMax > 22 && day.tempMax < 30

                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            {index === 0 ? (
                              <span className="font-medium text-blue-800">{translate("Today")}</span>
                            ) : index === 1 ? (
                              <span className="font-medium text-blue-800">{translate("Tmrw")}</span>
                            ) : (
                              <span className="font-medium text-blue-800">
                                {new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <Thermometer className="h-3 w-3 text-red-500" />
                              <span className="text-sm">{Math.round(day.tempMax)}°C</span>
                              <span className="text-xs text-gray-500 mx-1">|</span>
                              <Droplets className="h-3 w-3 text-blue-500" />
                              <span className="text-sm">{Math.round(day.humidity)}%</span>
                              <span className="text-xs text-gray-500 mx-1">|</span>
                              <span className="text-sm">{Math.round(day.rainChance)}%</span>
                            </div>
                            <div className="text-xs text-gray-600">{day.condition}</div>
                          </div>
                        </div>
                        <div>
                          {isHighlyFavorable ? (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                              {translate("High Risk")}
                            </span>
                          ) : isFavorable ? (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                              {translate("Moderate Risk")}
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {translate("Low Risk")}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-purple-800 flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-purple-600" />
                  <span>{translate("Disease Management Resources")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-left">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span>{translate("Organic Disease Control Methods")}</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <div className="flex items-center gap-2">
                      <Microscope className="h-4 w-4 text-purple-600" />
                      <span>{translate("Disease Identification Guide")}</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>{translate("Preventive Spraying Calendar")}</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span>{translate("Local Disease Alerts")}</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-700">{translate("Failed to load disease risk data. Please try again.")}</p>
          <Button onClick={() => setIsLoading(true)} className="mt-4 bg-green-600 hover:bg-green-700">
            {translate("Retry")}
          </Button>
        </div>
      )}
    </div>
  )
}
