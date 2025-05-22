"use client"

import { useState } from "react"
import { Droplets, Calculator } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

// Mock data for crops and soil types
const cropTypes = ["Rice (Paddy)", "Wheat", "Cotton", "Sugarcane", "Maize", "Tomato", "Potato", "Onion", "Chilli"]

const soilTypes = ["Clay", "Sandy", "Loamy", "Silt", "Black Cotton Soil", "Red Soil", "Alluvial Soil"]

// Mock data for regions
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

export default function Irrigation() {
  const [cropType, setCropType] = useState("")
  const [soilType, setSoilType] = useState("")
  const [region, setRegion] = useState("")
  const [pincode, setPincode] = useState("")
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">{translate("Smart Irrigation Advisor")}</h1>

      <Card className="mb-8">
        <CardHeader className="bg-green-50">
          <div className="flex items-center gap-3">
            <Droplets className="h-8 w-8 text-green-600" />
            <CardTitle className="text-2xl text-green-800">{translate("Water Recommendation Calculator")}</CardTitle>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-800">{translate("Irrigation Best Practices")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-1">{translate("Drip Irrigation")}</h3>
              <p className="text-gray-700">
                {translate(
                  "Saves 30-50% water compared to flood irrigation. Ideal for row crops like vegetables and fruit trees.",
                )}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-1">{translate("Irrigation Timing")}</h3>
              <p className="text-gray-700">
                {translate("Early morning irrigation (5-9 AM) reduces evaporation losses and fungal diseases.")}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-1">{translate("Mulching")}</h3>
              <p className="text-gray-700">
                {translate(
                  "Apply organic mulch around plants to reduce evaporation, suppress weeds, and improve soil health.",
                )}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-1">{translate("Rainwater Harvesting")}</h3>
              <p className="text-gray-700">
                {translate(
                  "Collect and store rainwater during monsoon season to use during dry periods. Can reduce irrigation costs by 20-30%.",
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
