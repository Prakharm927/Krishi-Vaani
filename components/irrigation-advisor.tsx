"use client"

import { useState } from "react"
import { Droplets, Calculator } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"

// Mock data for crops and soil types
const cropTypes = ["Rice (Paddy)", "Wheat", "Cotton", "Sugarcane", "Maize", "Tomato", "Potato", "Onion", "Chilli"]
const soilTypes = ["Clay", "Sandy", "Loamy", "Silt", "Black Cotton Soil", "Red Soil", "Alluvial Soil"]
const regions = [
  "North India",
  "South India",
  "East India",
  "West India",
  "Central India",
  "North-East India",
  "Coastal Regions",
  "Himalayan Regions",
]

export default function IrrigationAdvisor() {
  const [cropType, setCropType] = useState("")
  const [soilType, setSoilType] = useState("")
  const [region, setRegion] = useState("")
  const [pincode, setPincode] = useState("")
  const [useIoT, setUseIoT] = useState(false)
  const [soilMoisture, setSoilMoisture] = useState("45")
  const [recommendation, setRecommendation] = useState<null | {
    waterQuantity: string
    irrigationTime: string
    waterSavingTip: string
    schedule: {
      frequency: string
      duration: string
      bestTime: string
    }
    costEstimate: string
  }>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { translate } = useLanguage()

  const handleCalculate = () => {
    if (!cropType || !soilType || !region) return

    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock recommendations based on crop and soil type
      let waterQuantity = "0"
      let irrigationTime = ""
      let waterSavingTip = ""
      let frequency = ""
      let duration = ""
      let bestTime = ""
      let costEstimate = ""

      if (cropType === "Rice (Paddy)") {
        waterQuantity = "50-60"
        irrigationTime = "Early morning (6-8 AM)"
        waterSavingTip = "Use alternate wetting and drying technique to save 30% water"
        frequency = "Every 3-4 days"
        duration = "4-6 hours"
        bestTime = "Early morning"
        costEstimate = "₹1,200-1,500 per acre per month"
      } else if (cropType === "Wheat") {
        waterQuantity = "35-45"
        irrigationTime = "Evening (4-6 PM)"
        waterSavingTip = "Skip irrigation if there's rainfall above 10mm"
        frequency = "Every 10-15 days"
        duration = "3-4 hours"
        bestTime = "Evening"
        costEstimate = "₹800-1,000 per acre per month"
      } else if (cropType === "Cotton") {
        waterQuantity = "40-50"
        irrigationTime = "Early morning (5-7 AM)"
        waterSavingTip = "Use drip irrigation to save up to 60% water compared to flood irrigation"
        frequency = "Every 7-10 days"
        duration = "3-5 hours"
        bestTime = "Early morning"
        costEstimate = "₹900-1,200 per acre per month"
      } else if (cropType === "Sugarcane") {
        waterQuantity = "60-70"
        irrigationTime = "Early morning (5-7 AM)"
        waterSavingTip = "Use furrow irrigation instead of flood irrigation to save water"
        frequency = "Every 5-7 days"
        duration = "5-7 hours"
        bestTime = "Early morning"
        costEstimate = "₹1,500-1,800 per acre per month"
      } else {
        waterQuantity = "30-40"
        irrigationTime = "Early morning (6-8 AM)"
        waterSavingTip = "Mulch around plants to reduce evaporation and water needs"
        frequency = "Every 5-7 days"
        duration = "2-3 hours"
        bestTime = "Early morning"
        costEstimate = "₹700-900 per acre per month"
      }

      // Adjust based on soil type
      if (soilType === "Sandy") {
        waterQuantity =
          Number.parseInt(waterQuantity.split("-")[0]) + 10 + "-" + (Number.parseInt(waterQuantity.split("-")[1]) + 10)
        frequency =
          "More frequent, " +
          frequency.replace(/Every (\d+)-(\d+)/, (_, min, max) => `Every ${Number(min) - 2}-${Number(max) - 2}`)
      } else if (soilType === "Clay") {
        waterQuantity =
          Number.parseInt(waterQuantity.split("-")[0]) - 5 + "-" + (Number.parseInt(waterQuantity.split("-")[1]) - 5)
        frequency =
          "Less frequent, " +
          frequency.replace(/Every (\d+)-(\d+)/, (_, min, max) => `Every ${Number(min) + 2}-${Number(max) + 2}`)
      }

      // Adjust based on region
      if (region === "North India" || region === "Central India") {
        irrigationTime = "Early morning (5-7 AM) or Evening (5-7 PM)"
      } else if (region === "South India" || region === "Coastal Regions") {
        irrigationTime = "Early morning (6-8 AM)"
      }

      // Adjust based on IoT soil moisture if enabled
      if (useIoT) {
        const moistureLevel = Number.parseInt(soilMoisture)
        if (moistureLevel < 30) {
          waterQuantity =
            (Number.parseInt(waterQuantity.split("-")[1]) + 10).toString() + " (increased due to dry soil)"
          frequency = "Immediate irrigation needed, then " + frequency
        } else if (moistureLevel > 70) {
          waterQuantity =
            (Number.parseInt(waterQuantity.split("-")[0]) - 10).toString() + " (reduced due to moist soil)"
          frequency = "Delay irrigation by 2-3 days, then " + frequency
        }
      }

      setRecommendation({
        waterQuantity: waterQuantity + " liters per square meter",
        irrigationTime,
        waterSavingTip,
        schedule: {
          frequency,
          duration,
          bestTime,
        },
        costEstimate,
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-50">
        <div className="flex items-center gap-3">
          <Droplets className="h-6 w-6 text-green-600" />
          <CardTitle className="text-xl text-green-800">{translate("Smart Irrigation Advisor")}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-gray-700 mb-6">
          {translate(
            "Get personalized irrigation recommendations based on your crop, soil, and local weather conditions.",
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Crop Type")}</label>
            <Select value={cropType} onValueChange={setCropType}>
              <SelectTrigger>
                <SelectValue placeholder={translate("Select crop")} />
              </SelectTrigger>
              <SelectContent>
                {cropTypes.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Soil Type")}</label>
            <Select value={soilType} onValueChange={setSoilType}>
              <SelectTrigger>
                <SelectValue placeholder={translate("Select soil type")} />
              </SelectTrigger>
              <SelectContent>
                {soilTypes.map((soil) => (
                  <SelectItem key={soil} value={soil}>
                    {soil}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Region")}</label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue placeholder={translate("Select region")} />
              </SelectTrigger>
              <SelectContent>
                {regions.map((reg) => (
                  <SelectItem key={reg} value={reg}>
                    {reg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Pincode (Optional)")}</label>
            <Input
              type="text"
              placeholder="e.g., 411001"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <Switch id="iot-mode" checked={useIoT} onCheckedChange={setUseIoT} />
          <Label htmlFor="iot-mode">{translate("Use IoT Soil Moisture Sensor Data")}</Label>
        </div>

        {useIoT && (
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-blue-700 mb-2">
              {translate("Current Soil Moisture (%)")}
            </label>
            <div className="flex gap-4 items-center">
              <Input
                type="range"
                min="0"
                max="100"
                value={soilMoisture}
                onChange={(e) => setSoilMoisture(e.target.value)}
                className="flex-1"
              />
              <span className="text-blue-700 font-medium w-10">{soilMoisture}%</span>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              {translate("In a real deployment, this data would come automatically from your field sensors")}
            </p>
          </div>
        )}

        <Button
          onClick={handleCalculate}
          className="bg-green-600 hover:bg-green-700 w-full md:w-auto flex items-center gap-2"
          disabled={!cropType || !soilType || !region || isLoading}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
              <span>{translate("Calculating...")}</span>
            </>
          ) : (
            <>
              <Calculator size={16} />
              <span>{translate("Calculate")}</span>
            </>
          )}
        </Button>

        {recommendation && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-green-800 mb-4">{translate("Water Recommendation")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">{translate("Recommended Water Quantity")}</h4>
                <p className="text-gray-700">{recommendation.waterQuantity}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">{translate("Best Time to Irrigate")}</h4>
                <p className="text-gray-700">{recommendation.irrigationTime}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">{translate("Water Saving Tip")}</h4>
                <p className="text-gray-700">{recommendation.waterSavingTip}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-800 mb-3">{translate("Irrigation Schedule")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{translate("Frequency")}</p>
                  <p className="font-medium">{recommendation.schedule.frequency}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{translate("Duration")}</p>
                  <p className="font-medium">{recommendation.schedule.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{translate("Best Time")}</p>
                  <p className="font-medium">{recommendation.schedule.bestTime}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">{translate("Estimated Cost")}</h4>
              <p className="text-gray-700">{recommendation.costEstimate}</p>
              <p className="text-sm text-gray-500 mt-1">
                {translate("Based on average electricity and water rates in your region")}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
