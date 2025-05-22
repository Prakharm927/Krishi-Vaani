// Weather API service for Krishi Vaani
// This service handles all interactions with the weather API

import { cache } from "react"

// Types for weather data
export type WeatherForecast = {
  date: string
  tempMax: number
  tempMin: number
  condition: string
  humidity: number
  windSpeed: number
  rainChance: number
  rainfall: number
  icon: string
}

export type WeatherAlert = {
  type: string
  severity: "low" | "medium" | "high"
  message: string
  startTime: string
  endTime: string
}

export type WeatherData = {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    localtime: string
  }
  current: {
    temp: number
    feelsLike: number
    condition: string
    humidity: number
    windSpeed: number
    windDirection: string
    pressure: number
    precipitation: number
    uv: number
    visibility: number
    isDay: boolean
    icon: string
  }
  forecast: WeatherForecast[]
  alerts: WeatherAlert[]
  agriculturalMetrics: {
    soilMoisture: number
    evapotranspiration: number
    growingDegreeDays: number
  }
}

// Cache the weather data for 30 minutes
export const getWeatherData = cache(async (location: string): Promise<WeatherData> => {
  try {
    // In a real implementation, this would be an API call to a weather service
    // For example: const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`)

    console.log(`Fetching weather data for ${location}...`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data for demonstration
    return generateMockWeatherData(location)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw new Error("Failed to fetch weather data. Please try again later.")
  }
})

// Function to get agricultural advice based on weather conditions
export function getAgriculturalAdvice(weatherData: WeatherData, crop?: string): string[] {
  const advice: string[] = []

  // Temperature-based advice
  if (weatherData.current.temp > 35) {
    advice.push("High temperatures detected. Increase irrigation frequency and consider shade for sensitive crops.")
  } else if (weatherData.current.temp < 10) {
    advice.push("Low temperatures detected. Protect sensitive crops with covers and avoid irrigation in the evening.")
  }

  // Rain-based advice
  const rainForecast = weatherData.forecast.slice(0, 3).some((day) => day.rainChance > 60)
  if (rainForecast) {
    advice.push(
      "High chance of rain in the next 3 days. Consider delaying fertilizer application and pesticide spraying.",
    )
  }

  // Wind-based advice
  if (weatherData.current.windSpeed > 20) {
    advice.push("Strong winds detected. Delay spraying operations and provide support for tall crops.")
  }

  // Humidity-based advice
  if (weatherData.current.humidity > 80) {
    advice.push("High humidity detected. Monitor for fungal diseases and ensure good air circulation around plants.")
  }

  // Crop-specific advice
  if (crop) {
    switch (crop.toLowerCase()) {
      case "rice":
        if (weatherData.agriculturalMetrics.soilMoisture < 50) {
          advice.push("Soil moisture levels are low for rice cultivation. Increase irrigation.")
        }
        break
      case "wheat":
        if (weatherData.forecast.some((day) => day.tempMax > 30)) {
          advice.push("High temperatures forecasted which may affect wheat grain filling. Ensure adequate irrigation.")
        }
        break
      case "cotton":
        if (weatherData.current.humidity > 70) {
          advice.push(
            "High humidity may increase risk of bollworm in cotton. Monitor closely and consider preventive measures.",
          )
        }
        break
      default:
        // General advice for other crops
        break
    }
  }

  // If no specific advice, provide general advice
  if (advice.length === 0) {
    advice.push("Weather conditions are favorable for general farming activities.")
  }

  return advice
}

// Mock data generator for demonstration
function generateMockWeatherData(location: string): WeatherData {
  // Parse location to generate somewhat realistic data based on region
  const isNorth =
    location.toLowerCase().includes("north") ||
    location.toLowerCase().includes("punjab") ||
    location.toLowerCase().includes("haryana")

  const isSouth =
    location.toLowerCase().includes("south") ||
    location.toLowerCase().includes("kerala") ||
    location.toLowerCase().includes("tamil")

  const isCoastal =
    location.toLowerCase().includes("coastal") ||
    location.toLowerCase().includes("mumbai") ||
    location.toLowerCase().includes("chennai")

  // Base temperature adjusted by region
  let baseTemp = 28
  if (isNorth) baseTemp = 22
  if (isSouth) baseTemp = 30
  if (isCoastal) baseTemp = 29

  // Generate random variations
  const currentTemp = baseTemp + (Math.random() * 6 - 3)
  const humidity = isCoastal ? 70 + Math.random() * 15 : 50 + Math.random() * 20
  const windSpeed = isCoastal ? 12 + Math.random() * 8 : 8 + Math.random() * 6

  // Generate forecast
  const forecast: WeatherForecast[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)

    const tempVariation = Math.random() * 6 - 3
    const rainChance = isCoastal ? 40 + Math.random() * 40 : 20 + Math.random() * 30

    let condition = "Sunny"
    let icon = "sun"
    let rainfall = 0

    if (rainChance > 70) {
      condition = "Heavy Rain"
      icon = "cloud-rain"
      rainfall = 15 + Math.random() * 25
    } else if (rainChance > 40) {
      condition = "Light Rain"
      icon = "cloud-drizzle"
      rainfall = 2 + Math.random() * 8
    } else if (rainChance > 20) {
      condition = "Partly Cloudy"
      icon = "cloud-sun"
      rainfall = 0
    }

    forecast.push({
      date: date.toISOString().split("T")[0],
      tempMax: baseTemp + tempVariation + 4,
      tempMin: baseTemp + tempVariation - 4,
      condition,
      humidity: humidity + (Math.random() * 10 - 5),
      windSpeed: windSpeed + (Math.random() * 4 - 2),
      rainChance,
      rainfall,
      icon,
    })
  }

  // Generate alerts based on conditions
  const alerts: WeatherAlert[] = []

  if (forecast[0].rainChance > 75 || forecast[1].rainChance > 75) {
    alerts.push({
      type: "Heavy Rain",
      severity: "medium",
      message: "Heavy rainfall expected in the next 48 hours. Secure crops and ensure proper drainage.",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    })
  }

  if (currentTemp > 35) {
    alerts.push({
      type: "Heat Wave",
      severity: "high",
      message: "Heat wave conditions expected. Increase irrigation and provide shade for sensitive crops.",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    })
  }

  if (windSpeed > 15) {
    alerts.push({
      type: "Strong Winds",
      severity: "medium",
      message: "Strong winds expected. Secure tall crops and delay spraying operations.",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })
  }

  return {
    location: {
      name: location.split(",")[0] || location,
      region: location.split(",")[1]?.trim() || "Region",
      country: "India",
      lat: 20 + Math.random() * 10,
      lon: 75 + Math.random() * 10,
      localtime: new Date().toISOString(),
    },
    current: {
      temp: currentTemp,
      feelsLike: currentTemp + (humidity > 70 ? 2 : -1),
      condition: forecast[0].condition,
      humidity,
      windSpeed,
      windDirection: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
      pressure: 1010 + Math.random() * 10,
      precipitation: forecast[0].rainfall,
      uv: 7 + Math.random() * 4,
      visibility: 10 - (forecast[0].condition === "Heavy Rain" ? 5 : 0),
      isDay: true,
      icon: forecast[0].icon,
    },
    forecast,
    alerts,
    agriculturalMetrics: {
      soilMoisture: 40 + Math.random() * 30 + (forecast[0].rainfall > 0 ? 20 : 0),
      evapotranspiration: 4 + Math.random() * 2,
      growingDegreeDays: 10 + Math.random() * 5,
    },
  }
}
