"use client"

import { useState, useEffect } from "react"
import { Download, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import dynamic from "next/dynamic"

// Dynamically import Chart component to avoid SSR issues
const Chart = dynamic(() => import("@/components/price-chart"), { ssr: false })

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

// Mock market data
const marketData = {
  onion: {
    current: 2450, // price per quintal in INR
    trend: "up", // up, down, stable
    forecast: 2650,
    history: [2100, 2250, 2350, 2450],
    regional: {
      Maharashtra: 2450,
      Karnataka: 2380,
      Punjab: 2520,
      "Tamil Nadu": 2490,
      "Andhra Pradesh": 2400,
      "Uttar Pradesh": 2350,
      "Madhya Pradesh": 2420,
      Gujarat: 2480,
    },
  },
  tomato: {
    current: 1850,
    trend: "down",
    forecast: 1750,
    history: [2100, 2000, 1900, 1850],
    regional: {
      Maharashtra: 1850,
      Karnataka: 1780,
      Punjab: 1920,
      "Tamil Nadu": 1890,
      "Andhra Pradesh": 1800,
      "Uttar Pradesh": 1750,
      "Madhya Pradesh": 1820,
      Gujarat: 1880,
    },
  },
  potato: {
    current: 1250,
    trend: "stable",
    forecast: 1280,
    history: [1200, 1220, 1240, 1250],
    regional: {
      Maharashtra: 1250,
      Karnataka: 1180,
      Punjab: 1320,
      "Tamil Nadu": 1290,
      "Andhra Pradesh": 1200,
      "Uttar Pradesh": 1150,
      "Madhya Pradesh": 1220,
      Gujarat: 1280,
    },
  },
  rice: {
    current: 3850,
    trend: "up",
    forecast: 4050,
    history: [3600, 3700, 3800, 3850],
    regional: {
      Maharashtra: 3850,
      Karnataka: 3780,
      Punjab: 3920,
      "Tamil Nadu": 3890,
      "Andhra Pradesh": 3800,
      "Uttar Pradesh": 3750,
      "Madhya Pradesh": 3820,
      Gujarat: 3880,
    },
  },
  wheat: {
    current: 2950,
    trend: "up",
    forecast: 3150,
    history: [2700, 2800, 2900, 2950],
    regional: {
      Maharashtra: 2950,
      Karnataka: 2880,
      Punjab: 3020,
      "Tamil Nadu": 2990,
      "Andhra Pradesh": 2900,
      "Uttar Pradesh": 2850,
      "Madhya Pradesh": 2920,
      Gujarat: 2980,
    },
  },
  cotton: {
    current: 6250,
    trend: "stable",
    forecast: 6300,
    history: [6200, 6220, 6240, 6250],
    regional: {
      Maharashtra: 6250,
      Karnataka: 6180,
      Punjab: 6320,
      "Tamil Nadu": 6290,
      "Andhra Pradesh": 6200,
      "Uttar Pradesh": 6150,
      "Madhya Pradesh": 6220,
      Gujarat: 6280,
    },
  },
  soybean: {
    current: 4150,
    trend: "down",
    forecast: 4050,
    history: [4300, 4250, 4200, 4150],
    regional: {
      Maharashtra: 4150,
      Karnataka: 4080,
      Punjab: 4220,
      "Tamil Nadu": 4190,
      "Andhra Pradesh": 4100,
      "Uttar Pradesh": 4050,
      "Madhya Pradesh": 4120,
      Gujarat: 4180,
    },
  },
  maize: {
    current: 2050,
    trend: "up",
    forecast: 2150,
    history: [1900, 1950, 2000, 2050],
    regional: {
      Maharashtra: 2050,
      Karnataka: 1980,
      Punjab: 2120,
      "Tamil Nadu": 2090,
      "Andhra Pradesh": 2000,
      "Uttar Pradesh": 1950,
      "Madhya Pradesh": 2020,
      Gujarat: 2080,
    },
  },
}

// Get current date and generate dates for the past month
const getCurrentDate = () => {
  const today = new Date()
  return today.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

const generatePastMonthDates = () => {
  const dates = []
  const today = new Date()

  for (let i = 28; i >= 0; i -= 7) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date.toLocaleDateString("en-IN", { day: "numeric", month: "short" }))
  }

  return dates
}

export default function MarketPrices() {
  const [selectedCrop, setSelectedCrop] = useState("onion")
  const [selectedLocation, setSelectedLocation] = useState("Maharashtra")
  const [isLoading, setIsLoading] = useState(false)
  const { translate } = useLanguage()

  // Generate dates for the past month
  const dates = generatePastMonthDates()

  // Get data for the selected crop
  const cropData = marketData[selectedCrop as keyof typeof marketData]

  // Prepare price data for chart
  const priceData = {
    labels: dates,
    datasets: [
      {
        label: `${selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} ${translate("Price")} (₹/quintal)`,
        data: cropData.history.concat([cropData.forecast]),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  }

  // Simulate loading data when crop or location changes
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [selectedCrop, selectedLocation])

  // Get trend color and icon
  const getTrendInfo = (trend: string) => {
    if (trend === "up") {
      return { color: "text-green-600", icon: "↑" }
    } else if (trend === "down") {
      return { color: "text-red-600", icon: "↓" }
    } else {
      return { color: "text-gray-600", icon: "→" }
    }
  }

  const trendInfo = getTrendInfo(cropData.trend)

  // Get advice based on trend
  const getAdvice = (crop: string, trend: string) => {
    if (trend === "up") {
      return translate(
        `Wait 1-2 weeks to sell ${crop} — prices may rise by ₹${cropData.forecast - cropData.current}/quintal`,
      )
    } else if (trend === "down") {
      return translate(
        `Consider selling ${crop} soon — prices may fall by ₹${cropData.current - cropData.forecast}/quintal`,
      )
    } else {
      return translate(`${crop} prices are stable — good time for regular trading`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">{translate("Market Price Predictor")}</h1>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-green-800">{translate("Market Price Analysis")}</CardTitle>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download size={16} />
              <span>{translate("Export Data")}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Select Crop")}</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder={translate("Select Crop")} />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop.toLowerCase()} value={crop.toLowerCase()}>
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
                  <SelectValue placeholder={translate("Select Location")} />
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

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">{translate("Price Trend")}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {translate("Last updated")}: {getCurrentDate()}
                </span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsLoading(true)}>
                  <Filter size={16} />
                  <span className="sr-only">{translate("Filter")}</span>
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
              </div>
            ) : (
              <div className="h-64 bg-white p-4 rounded-lg">
                <Chart data={priceData} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">{translate("Current Price")}</div>
              <div className="text-2xl font-bold">₹{cropData.current}/quintal</div>
              <div className={`text-sm ${trendInfo.color} flex items-center gap-1`}>
                {trendInfo.icon} {cropData.trend === "up" ? "+5%" : cropData.trend === "down" ? "-5%" : "±0%"}{" "}
                {translate("this week")}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">{translate("Forecast (7 days)")}</div>
              <div className="text-2xl font-bold">₹{cropData.forecast}/quintal</div>
              <div className={`text-sm ${trendInfo.color} flex items-center gap-1`}>
                {trendInfo.icon} {(((cropData.forecast - cropData.current) / cropData.current) * 100).toFixed(1)}%{" "}
                {translate("expected")}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">{translate("Regional Average")}</div>
              <div className="text-2xl font-bold">
                ₹{Object.values(cropData.regional).reduce((a, b) => a + b, 0) / Object.values(cropData.regional).length}
                /quintal
              </div>
              <div className="text-sm text-gray-600">
                {translate("Across")} {Object.keys(cropData.regional).length} {translate("states")}
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-green-800 font-medium">{getAdvice(selectedCrop, cropData.trend)}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="regional">
        <TabsList className="mb-4">
          <TabsTrigger value="regional">{translate("Regional Comparison")}</TabsTrigger>
          <TabsTrigger value="historical">{translate("Historical Data")}</TabsTrigger>
        </TabsList>

        <TabsContent value="regional">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800">{translate("Regional Price Comparison")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{translate("State")}</TableHead>
                    <TableHead>{translate("Price (₹/quintal)")}</TableHead>
                    <TableHead>{translate("Difference")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(cropData.regional).map(([state, price]) => (
                    <TableRow key={state} className={state === selectedLocation ? "bg-green-50" : ""}>
                      <TableCell className="font-medium">{state}</TableCell>
                      <TableCell>₹{price}</TableCell>
                      <TableCell>
                        {price > cropData.current ? (
                          <span className="text-green-600">+₹{price - cropData.current}</span>
                        ) : price < cropData.current ? (
                          <span className="text-red-600">-₹{cropData.current - price}</span>
                        ) : (
                          <span className="text-gray-600">₹0</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historical">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800">{translate("Historical Price Data")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{translate("Date")}</TableHead>
                    <TableHead>{translate("Price (₹/quintal)")}</TableHead>
                    <TableHead>{translate("Change")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dates.slice(0, 4).map((date, index) => (
                    <TableRow key={date}>
                      <TableCell className="font-medium">{date}</TableCell>
                      <TableCell>₹{cropData.history[index]}</TableCell>
                      <TableCell>
                        {index > 0 ? (
                          cropData.history[index] > cropData.history[index - 1] ? (
                            <span className="text-green-600">
                              +₹{cropData.history[index] - cropData.history[index - 1]}
                            </span>
                          ) : cropData.history[index] < cropData.history[index - 1] ? (
                            <span className="text-red-600">
                              -₹{cropData.history[index - 1] - cropData.history[index]}
                            </span>
                          ) : (
                            <span className="text-gray-600">₹0</span>
                          )
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
