"use client"

import { useState, useEffect } from "react"
import { BarChart3, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for crops and locations
const crops = ["Onion", "Tomato", "Potato", "Rice", "Wheat", "Cotton", "Soybean", "Maize"]
const locations = [
  "Maharashtra",
  "Karnataka",
  "Punjab",
  "Tamil Nadu",
  "Andhra Pradesh",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Gujarat",
]

// Generate mock price data for the last 30 days
const generatePriceData = (crop: string) => {
  const today = new Date()
  const data = []
  let basePrice = 0

  // Set different base prices for different crops
  switch (crop.toLowerCase()) {
    case "onion":
      basePrice = 2500
      break
    case "tomato":
      basePrice = 1800
      break
    case "potato":
      basePrice = 1200
      break
    case "rice":
      basePrice = 3800
      break
    case "wheat":
      basePrice = 2900
      break
    default:
      basePrice = 2000
  }

  // Generate prices with some randomness and a trend
  let currentPrice = basePrice
  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(today.getDate() - i)

    // Add some randomness to the price
    const randomChange = Math.random() * 100 - 50 // -50 to +50

    // Add a trend component (e.g., gradually increasing or decreasing)
    const trendComponent = i > 15 ? -5 : 10 // decreasing first half, increasing second half

    currentPrice += randomChange + trendComponent
    currentPrice = Math.max(currentPrice, basePrice * 0.7) // Ensure price doesn't go too low

    data.push({
      date: date.toISOString().split("T")[0],
      price: Math.round(currentPrice),
    })
  }

  return data
}

// Generate forecast prices for the next 30 days
const generateForecastData = (historicalData: any[], trend: "up" | "down" | "stable") => {
  const lastPrice = historicalData[historicalData.length - 1].price
  const lastDate = new Date(historicalData[historicalData.length - 1].date)
  const data = []

  let trendFactor = 0
  switch (trend) {
    case "up":
      trendFactor = 15
      break
    case "down":
      trendFactor = -15
      break
    case "stable":
      trendFactor = 0
      break
  }

  let currentPrice = lastPrice
  for (let i = 1; i <= 30; i++) {
    const date = new Date(lastDate)
    date.setDate(lastDate.getDate() + i)

    // Add some randomness to the price
    const randomChange = Math.random() * 60 - 30 // -30 to +30

    // Add the trend component
    currentPrice += randomChange + trendFactor

    data.push({
      date: date.toISOString().split("T")[0],
      price: Math.round(currentPrice),
    })
  }

  return data
}

// Determine price trend
const determineTrend = (data: any[]) => {
  const firstHalf = data.slice(0, Math.floor(data.length / 2))
  const secondHalf = data.slice(Math.floor(data.length / 2))

  const firstHalfAvg = firstHalf.reduce((sum, item) => sum + item.price, 0) / firstHalf.length
  const secondHalfAvg = secondHalf.reduce((sum, item) => sum + item.price, 0) / secondHalf.length

  const percentChange = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100

  if (percentChange > 5) return "up"
  if (percentChange < -5) return "down"
  return "stable"
}

export default function MarketPricePredictor() {
  const [selectedCrop, setSelectedCrop] = useState("Onion")
  const [selectedLocation, setSelectedLocation] = useState("Maharashtra")
  const [priceData, setPriceData] = useState<any[]>([])
  const [forecastData, setForecastData] = useState<any[]>([])
  const [priceTrend, setPriceTrend] = useState<"up" | "down" | "stable">("stable")
  const [isLoading, setIsLoading] = useState(true)
  const { translate } = useLanguage()

  useEffect(() => {
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const historicalData = generatePriceData(selectedCrop)
      const trend = determineTrend(historicalData)
      const forecast = generateForecastData(historicalData, trend)

      setPriceData(historicalData)
      setForecastData(forecast)
      setPriceTrend(trend)
      setIsLoading(false)
    }, 1000)
  }, [selectedCrop, selectedLocation])

  // Get advice based on trend
  const getAdvice = () => {
    const currentPrice = priceData[priceData.length - 1]?.price || 0
    const forecastPrice = forecastData[forecastData.length - 1]?.price || 0
    const priceDifference = Math.abs(forecastPrice - currentPrice)

    if (priceTrend === "up") {
      return translate(`Hold ${selectedCrop.toLowerCase()} 2 weeks—prices rising by ₹${priceDifference}/quintal`)
    } else if (priceTrend === "down") {
      return translate(`Sell ${selectedCrop.toLowerCase()} soon—prices falling by ₹${priceDifference}/quintal`)
    } else {
      return translate(`${selectedCrop} prices stable—good time for regular trading`)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-purple-50">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-purple-600" />
          <CardTitle className="text-xl text-purple-800">{translate("Market Price Predictor")}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Select Crop")}</label>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder={translate("Select crop")} />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Select Location")}</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder={translate("Select location")} />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <Tabs defaultValue="price">
                <TabsList className="mb-4">
                  <TabsTrigger value="price">{translate("Price Trend")}</TabsTrigger>
                  <TabsTrigger value="forecast">{translate("Price Forecast")}</TabsTrigger>
                </TabsList>

                <TabsContent value="price">
                  <div className="h-64 bg-white p-4 rounded-lg border">
                    {/* In a real app, this would be a Chart.js or Recharts component */}
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">{translate("Price (₹/quintal)")}</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${priceTrend === "up" ? "bg-green-100 text-green-800" : priceTrend === "down" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {priceTrend === "up" ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : priceTrend === "down" ? (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            ) : null}
                            {priceTrend === "up"
                              ? translate("Rising")
                              : priceTrend === "down"
                                ? translate("Falling")
                                : translate("Stable")}
                          </Badge>
                        </div>
                      </div>

                      {/* Mock chart visualization */}
                      <div className="flex-1 relative">
                        <div className="absolute inset-0 flex items-end">
                          {priceData.slice(-30).map((item, index) => {
                            const height = `${(item.price / 5000) * 100}%`
                            return (
                              <div key={index} className="flex-1 mx-0.5" style={{ height }}>
                                <div
                                  className={`w-full h-full ${
                                    priceTrend === "up"
                                      ? "bg-green-400"
                                      : priceTrend === "down"
                                        ? "bg-red-400"
                                        : "bg-blue-400"
                                  } rounded-t-sm`}
                                ></div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{new Date(priceData[0]?.date).toLocaleDateString()}</span>
                        <span>{new Date(priceData[priceData.length - 1]?.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="forecast">
                  <div className="h-64 bg-white p-4 rounded-lg border">
                    {/* In a real app, this would be a Chart.js or Recharts component */}
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">{translate("Forecast (₹/quintal)")}</span>
                        <span className="text-xs text-gray-500">{translate("Next 30 days")}</span>
                      </div>

                      {/* Mock forecast chart visualization */}
                      <div className="flex-1 relative">
                        <div className="absolute inset-0 flex items-end">
                          {/* Historical data (dimmed) */}
                          {priceData.slice(-10).map((item, index) => {
                            const height = `${(item.price / 5000) * 100}%`
                            return (
                              <div key={`hist-${index}`} className="flex-1 mx-0.5" style={{ height }}>
                                <div className="w-full h-full bg-gray-300 rounded-t-sm"></div>
                              </div>
                            )
                          })}

                          {/* Forecast data (colored) */}
                          {forecastData.slice(0, 20).map((item, index) => {
                            const height = `${(item.price / 5000) * 100}%`
                            return (
                              <div key={`forecast-${index}`} className="flex-1 mx-0.5" style={{ height }}>
                                <div
                                  className={`w-full h-full ${
                                    priceTrend === "up"
                                      ? "bg-green-400"
                                      : priceTrend === "down"
                                        ? "bg-red-400"
                                        : "bg-blue-400"
                                  } rounded-t-sm opacity-80`}
                                ></div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{translate("Today")}</span>
                        <span>{new Date(forecastData[forecastData.length - 1]?.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">{translate("Current Price")}</div>
                <div className="text-2xl font-bold">₹{priceData[priceData.length - 1]?.price}/quintal</div>
                <div
                  className={`text-sm flex items-center gap-1 ${
                    priceTrend === "up" ? "text-green-600" : priceTrend === "down" ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  {priceTrend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : priceTrend === "down" ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  {priceTrend === "up" ? "+5%" : priceTrend === "down" ? "-5%" : "±0%"} {translate("this week")}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">{translate("Forecast (30 days)")}</div>
                <div className="text-2xl font-bold">₹{forecastData[forecastData.length - 1]?.price}/quintal</div>
                <div
                  className={`text-sm flex items-center gap-1 ${
                    priceTrend === "up" ? "text-green-600" : priceTrend === "down" ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  {priceTrend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : priceTrend === "down" ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  {(
                    ((forecastData[forecastData.length - 1]?.price - priceData[priceData.length - 1]?.price) /
                      priceData[priceData.length - 1]?.price) *
                    100
                  ).toFixed(1)}
                  % {translate("expected")}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">{translate("Regional Average")}</div>
                <div className="text-2xl font-bold">
                  ₹{Math.round(priceData[priceData.length - 1]?.price * 0.95)}/quintal
                </div>
                <div className="text-sm text-gray-600">
                  {translate("Across")} 8 {translate("states")}
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                {priceTrend === "up" ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : priceTrend === "down" ? (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                ) : null}
                <p className="text-green-800 font-medium">{getAdvice()}</p>
              </div>
            </div>

            <div className="mt-4 text-right">
              <Button variant="ghost" size="sm" className="text-purple-600">
                {translate("View Detailed Analysis")} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
