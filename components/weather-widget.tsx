"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/components/language-provider"
import { getWeatherData, type WeatherData } from "@/lib/weather-service"

interface WeatherWidgetProps {
  location?: string
  compact?: boolean
}

export default function WeatherWidget({ location = "Maharashtra, India", compact = false }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { translate } = useLanguage()

  useEffect(() => {
    async function loadWeatherData() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getWeatherData(location)
        setWeatherData(data)
      } catch (err) {
        console.error("Error loading weather data:", err)
        setError("Failed to load weather data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadWeatherData()
  }, [location])

  // Function to get the appropriate weather icon
  const getWeatherIcon = (condition: string, size = 24) => {
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
          ) : weatherData ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center">
                  {getWeatherIcon(weatherData.current.condition, 32)}
                </div>
                <div>
                  <div className="font-medium">{Math.round(weatherData.current.temp)}°C</div>
                  <div className="text-sm text-gray-500">{weatherData.location.name}</div>
                </div>
              </div>
              <Link href="/weather">
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
      <CardHeader className="bg-blue-50 pb-2">
        <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
          {getWeatherIcon(weatherData?.current.condition || "cloudy", 20)}
          <span>{translate("Weather Forecast")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : weatherData ? (
          <>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">
                {weatherData.location.name}, {weatherData.location.region}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date(weatherData.location.localtime).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{getWeatherIcon(weatherData.current.condition, 48)}</div>
              <div>
                <div className="text-3xl font-bold">{Math.round(weatherData.current.temp)}°C</div>
                <div className="text-gray-600">{weatherData.current.condition}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gray-50 p-2 rounded-lg flex flex-col items-center">
                <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                <div className="text-xs text-gray-600">{translate("Humidity")}</div>
                <div className="text-sm font-medium">{Math.round(weatherData.current.humidity)}%</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg flex flex-col items-center">
                <Wind className="h-5 w-5 text-blue-500 mb-1" />
                <div className="text-xs text-gray-600">{translate("Wind")}</div>
                <div className="text-sm font-medium">{Math.round(weatherData.current.windSpeed)} km/h</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg flex flex-col items-center">
                <CloudRain className="h-5 w-5 text-blue-500 mb-1" />
                <div className="text-xs text-gray-600">{translate("Rain Chance")}</div>
                <div className="text-sm font-medium">{Math.round(weatherData.forecast[0].rainChance)}%</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg flex flex-col items-center">
                <Sun className="h-5 w-5 text-yellow-500 mb-1" />
                <div className="text-xs text-gray-600">{translate("UV Index")}</div>
                <div className="text-sm font-medium">{Math.round(weatherData.current.uv)}</div>
              </div>
            </div>

            {weatherData.alerts.length > 0 && (
              <div className="bg-yellow-50 p-3 rounded-lg flex items-start gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-800">{weatherData.alerts[0].type}</div>
                  <div className="text-sm text-gray-700">{weatherData.alerts[0].message}</div>
                </div>
              </div>
            )}

            <div className="flex overflow-x-auto gap-2 pb-1">
              {weatherData.forecast.slice(1, 5).map((day, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded-lg text-center min-w-[70px]">
                  <div className="text-xs font-medium text-gray-700">
                    {new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
                  </div>
                  <div className="my-1">{getWeatherIcon(day.condition, 20)}</div>
                  <div className="text-xs">
                    <span className="font-medium">{Math.round(day.tempMax)}°</span>
                    <span className="text-gray-500 ml-1">{Math.round(day.tempMin)}°</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </CardContent>
      <CardFooter className="bg-gray-50 p-3 flex justify-between">
        <div className="text-sm text-gray-600">{translate("Hyperlocal forecast for agriculture")}</div>
        <Link href="/weather">
          <Button variant="ghost" size="sm" className="h-8 text-blue-600">
            {translate("Full Forecast")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
