"use client"

import { useState, useEffect } from "react"
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Thermometer,
  Droplets,
  AlertTriangle,
  Tractor,
  Leaf,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/language-provider"
import { getWeatherData, getAgriculturalAdvice, type WeatherData } from "@/lib/weather-service"
import LocationSelector from "@/components/location-selector"

// Helper function to get weather icon component
function getWeatherIcon(condition: string, size = 24) {
  const lowerCondition = condition.toLowerCase()

  if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle") || lowerCondition.includes("shower")) {
    return <CloudRain size={size} className="text-blue-500" />
  } else if (lowerCondition.includes("cloud")) {
    return <Cloud size={size} className="text-gray-500" />
  } else if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) {
    return <Sun size={size} className="text-yellow-500" />
  } else {
    return <Cloud size={size} className="text-gray-500" />
  }
}

export default function WeatherPage() {
  const [location, setLocation] = useState("Maharashtra, India")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const { translate } = useLanguage()

  // Popular crops for agricultural advice
  const popularCrops = ["Rice", "Wheat", "Cotton", "Sugarcane", "Maize", "Tomato", "Potato", "Onion"]

  useEffect(() => {
    async function loadWeatherData() {
      try {
        setIsLoading(true)
        const data = await getWeatherData(location)
        setWeatherData(data)
      } catch (error) {
        console.error("Error loading weather data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadWeatherData()
  }, [location])

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">{translate("Weather Forecast")}</h1>

      <div className="mb-6">
        <LocationSelector onLocationChange={handleLocationChange} defaultLocation={location} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        </div>
      ) : weatherData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-blue-50">
                <div className="flex items-center gap-3">
                  {getWeatherIcon(weatherData.current.condition, 24)}
                  <CardTitle className="text-2xl text-blue-800">
                    {weatherData.location.name}, {weatherData.location.region}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 p-6 rounded-lg flex items-center">
                    <div className="mr-4">{getWeatherIcon(weatherData.current.condition, 64)}</div>
                    <div>
                      <div className="text-4xl font-bold text-gray-800">{Math.round(weatherData.current.temp)}°C</div>
                      <div className="text-gray-600">{weatherData.current.condition}</div>
                      <div className="text-sm text-gray-500">
                        {translate("Feels like")} {Math.round(weatherData.current.feelsLike)}°C
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                      <Droplets className="h-8 w-8 text-blue-500 mb-2" />
                      <div className="text-sm text-gray-600">{translate("Humidity")}</div>
                      <div className="text-xl font-semibold text-gray-800">
                        {Math.round(weatherData.current.humidity)}%
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                      <Wind className="h-8 w-8 text-blue-500 mb-2" />
                      <div className="text-sm text-gray-600">{translate("Wind")}</div>
                      <div className="text-xl font-semibold text-gray-800">
                        {Math.round(weatherData.current.windSpeed)} km/h
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                      <CloudRain className="h-8 w-8 text-blue-500 mb-2" />
                      <div className="text-sm text-gray-600">{translate("Rainfall")}</div>
                      <div className="text-xl font-semibold text-gray-800">{weatherData.current.precipitation} mm</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                      <Thermometer className="h-8 w-8 text-blue-500 mb-2" />
                      <div className="text-sm text-gray-600">{translate("Pressure")}</div>
                      <div className="text-xl font-semibold text-gray-800">
                        {Math.round(weatherData.current.pressure)} hPa
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-4">{translate("7-Day Forecast")}</h3>
                <div className="overflow-x-auto">
                  <div className="flex gap-3 min-w-max pb-2">
                    {weatherData.forecast.map((day, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg text-center min-w-[100px]">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          {index === 0
                            ? translate("Today")
                            : index === 1
                              ? translate("Tomorrow")
                              : new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
                        </div>
                        <div className="flex justify-center mb-2">{getWeatherIcon(day.condition, 28)}</div>
                        <div className="text-lg font-semibold text-gray-800">{Math.round(day.tempMax)}°C</div>
                        <div className="text-sm text-gray-600">{Math.round(day.tempMin)}°C</div>
                        <div className="text-xs text-gray-500 mt-1">{translate(day.condition)}</div>
                        <div className="text-xs mt-2">
                          <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                            {Math.round(day.rainChance)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-red-800 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-red-600" />
                  {translate("Weather Alerts")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weatherData.alerts.length > 0 ? (
                    weatherData.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg flex items-start gap-3 ${
                          alert.severity === "high"
                            ? "bg-red-50"
                            : alert.severity === "medium"
                              ? "bg-yellow-50"
                              : "bg-blue-50"
                        }`}
                      >
                        <AlertTriangle
                          size={20}
                          className={
                            alert.severity === "high"
                              ? "text-red-600"
                              : alert.severity === "medium"
                                ? "text-yellow-600"
                                : "text-blue-600"
                          }
                        />
                        <div>
                          <h4
                            className={`font-medium ${
                              alert.severity === "high"
                                ? "text-red-800"
                                : alert.severity === "medium"
                                  ? "text-yellow-800"
                                  : "text-blue-800"
                            } mb-1`}
                          >
                            {translate(alert.type)}
                          </h4>
                          <p className="text-gray-700">{translate(alert.message)}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(alert.startTime).toLocaleDateString()} -{" "}
                            {new Date(alert.endTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-green-800">{translate("No weather alerts for your area at this time.")}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                  <Tractor size={20} className="text-green-600" />
                  {translate("Agricultural Weather")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-1">{translate("Soil Moisture")}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${weatherData.agriculturalMetrics.soilMoisture}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {weatherData.agriculturalMetrics.soilMoisture < 30
                        ? translate("Low - Irrigation recommended")
                        : weatherData.agriculturalMetrics.soilMoisture > 70
                          ? translate("High - Reduce irrigation")
                          : translate("Optimal for most crops")}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-1">{translate("Evapotranspiration")}</h3>
                    <p className="text-gray-700">
                      {weatherData.agriculturalMetrics.evapotranspiration.toFixed(1)} mm/day
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {translate("Water loss from soil and plant transpiration")}
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium text-yellow-800 mb-1">{translate("Growing Degree Days")}</h3>
                    <p className="text-gray-700">{Math.round(weatherData.agriculturalMetrics.growingDegreeDays)} GDD</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {translate("Accumulated heat units for crop development")}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">{translate("Crop-Specific Advice")}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {popularCrops.map((crop) => (
                      <Button
                        key={crop}
                        variant={selectedCrop === crop ? "default" : "outline"}
                        size="sm"
                        className={selectedCrop === crop ? "bg-green-600" : ""}
                        onClick={() => setSelectedCrop(crop)}
                      >
                        {crop}
                      </Button>
                    ))}
                  </div>

                  {selectedCrop ? (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium text-green-800">
                          {translate("Advice for")} {selectedCrop}
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {getAgriculturalAdvice(weatherData, selectedCrop).map((advice, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-green-600"></div>
                            </div>
                            <span className="text-gray-700">{translate(advice)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">{translate("Select a crop for specific advice")}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-purple-800 flex items-center gap-2">
                  <Calendar size={20} className="text-purple-600" />
                  {translate("Seasonal Outlook")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="rainfall">
                  <TabsList className="mb-4">
                    <TabsTrigger value="rainfall">{translate("Rainfall")}</TabsTrigger>
                    <TabsTrigger value="temperature">{translate("Temperature")}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="rainfall">
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-blue-800 mb-1">{translate("Monsoon Prediction")}</h3>
                        <p className="text-gray-700">
                          {translate(
                            "This year's monsoon is expected to be 5% above normal in your region, with good distribution throughout the season.",
                          )}
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-blue-800 mb-1">{translate("Rainfall Distribution")}</h3>
                        <p className="text-gray-700">
                          {translate(
                            "Expected to be well-distributed with occasional heavy spells in July and August. Prepare drainage systems in advance.",
                          )}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="temperature">
                    <div className="space-y-4">
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h3 className="font-medium text-orange-800 mb-1">{translate("Temperature Trend")}</h3>
                        <p className="text-gray-700">
                          {translate(
                            "Temperatures are expected to remain 2-3°C above normal for the next month, which may accelerate crop growth.",
                          )}
                        </p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h3 className="font-medium text-orange-800 mb-1">{translate("Heat Stress Risk")}</h3>
                        <p className="text-gray-700">
                          {translate(
                            "Moderate risk of heat stress for sensitive crops. Consider shade cloth or increased irrigation during peak afternoon hours.",
                          )}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-700">{translate("Failed to load weather data. Please try again.")}</p>
          <Button onClick={() => setIsLoading(true)} className="mt-4 bg-blue-600 hover:bg-blue-700">
            {translate("Retry")}
          </Button>
        </div>
      )}
    </div>
  )
}
