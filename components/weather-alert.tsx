"use client"

import { useState, useEffect } from "react"
import { CloudRain, Wind, Droplets, Volume2, VolumeX, Cloud, Sun, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"

// Mock weather data
const mockWeatherData = {
  location: "Maharashtra, India",
  current: {
    temp: 32,
    condition: "Partly Cloudy",
    humidity: 78,
    windSpeed: 12,
    rainChance: 60,
  },
  forecast: [
    {
      day: "Today",
      temp: { min: 28, max: 34 },
      condition: "Scattered Showers",
      rainChance: 60,
      humidity: 78,
    },
    {
      day: "Tomorrow",
      temp: { min: 27, max: 33 },
      condition: "Rain",
      rainChance: 80,
      humidity: 85,
    },
    {
      day: "Wednesday",
      temp: { min: 26, max: 31 },
      condition: "Thunderstorms",
      rainChance: 70,
      humidity: 80,
    },
  ],
  alerts: [
    {
      type: "Rain",
      message: "Heavy rainfall expected in the next 48 hours. Delay wheat sowing.",
      severity: "moderate",
    },
  ],
  agriculturalAdvice: [
    "Delay wheat sowing until rainfall subsides",
    "Ensure proper drainage in rice fields",
    "Apply fungicide to vegetable crops to prevent disease in humid conditions",
  ],
}

export default function WeatherAlert() {
  const [weatherData, setWeatherData] = useState(mockWeatherData)
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { translate, currentLanguage } = useLanguage()

  // Simulate geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true)
      // Simulate geolocation delay
      setTimeout(() => {
        setUserLocation("Maharashtra, India")
        setIsLoading(false)
      }, 1000)
    }
  }, [])

  // Function to play voice alert
  const playVoiceAlert = () => {
    setIsPlaying(true)

    // Simulate text-to-speech
    const message = translate("Rain expected tomorrow—delay wheat sowing!")

    // In a real app, this would use the Web Speech API or a TTS service
    console.log("Playing voice alert:", message)

    // Simulate speech duration
    setTimeout(() => {
      setIsPlaying(false)
    }, 3000)
  }

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes("rain") || condition.toLowerCase().includes("shower")) {
      return <CloudRain className="h-6 w-6 text-blue-500" />
    } else if (condition.toLowerCase().includes("cloud")) {
      return <Cloud className="h-6 w-6 text-gray-500" />
    } else {
      return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CloudRain className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-xl text-blue-800">{translate("Hyperlocal Weather Alerts")}</CardTitle>
          </div>
          {!isLoading && userLocation && (
            <Badge variant="outline" className="text-blue-600">
              {userLocation}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                {getWeatherIcon(weatherData.current.condition)}
                <div>
                  <div className="text-2xl font-bold">{weatherData.current.temp}°C</div>
                  <div className="text-gray-600">{translate(weatherData.current.condition)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>{weatherData.current.humidity}%</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span>{weatherData.current.windSpeed} km/h</span>
                </div>
              </div>
            </div>

            <div className="flex overflow-x-auto gap-3 pb-2 mb-4">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg text-center min-w-[100px]">
                  <div className="text-sm font-medium">{translate(day.day)}</div>
                  <div className="my-2">{getWeatherIcon(day.condition)}</div>
                  <div className="text-sm">
                    <span className="font-medium">{day.temp.max}°</span>
                    <span className="text-gray-500 mx-1">|</span>
                    <span>{day.temp.min}°</span>
                  </div>
                  <div className="mt-1 text-xs text-blue-600">{day.rainChance}%</div>
                </div>
              ))}
            </div>

            {weatherData.alerts.length > 0 && (
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800 mb-1">{translate("Weather Alert")}</h3>
                      <p className="text-gray-700">{translate(weatherData.alerts[0].message)}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={isPlaying ? "destructive" : "outline"}
                    className="flex-shrink-0"
                    onClick={playVoiceAlert}
                  >
                    {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </Button>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-medium text-gray-800 mb-2">{translate("Agricultural Advice")}</h3>
              <ul className="space-y-2">
                {weatherData.agriculturalAdvice.map((advice, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-gray-700">{translate(advice)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
