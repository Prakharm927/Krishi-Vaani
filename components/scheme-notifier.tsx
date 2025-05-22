"use client"

import { useState } from "react"
import { AlertTriangle, Search, Check, Volume2, VolumeX } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"

// Mock government schemes data
const mockSchemes = [
  {
    id: 1,
    name: "PM-KISAN",
    description: "Direct income support of ₹6,000 per year to farmer families",
    deadline: "2023-12-31",
    eligibility: ["Small and marginal farmers", "Land ownership required"],
    tags: ["Income Support", "Central Scheme"],
    isEligible: true,
    icon: "💰",
  },
  {
    id: 2,
    name: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme to protect against crop failure due to natural calamities",
    deadline: "2023-10-15",
    eligibility: ["All farmers growing notified crops", "Premium payment required"],
    tags: ["Insurance", "Central Scheme"],
    isEligible: true,
    icon: "🛡️",
  },
  {
    id: 3,
    name: "Soil Health Card Scheme",
    description: "Provides information on soil nutrient status and recommendations for appropriate fertilizer dosage",
    deadline: "Ongoing",
    eligibility: ["All farmers"],
    tags: ["Soil Health", "Central Scheme"],
    isEligible: true,
    icon: "🌱",
  },
  {
    id: 4,
    name: "Maharashtra State Rural Livelihood Mission",
    description: "Provides subsidized loans and training for agricultural activities",
    deadline: "2023-11-30",
    eligibility: ["Maharashtra residents", "Below poverty line families"],
    tags: ["Loan", "State Scheme", "Maharashtra"],
    isEligible: false,
    icon: "🏦",
  },
  {
    id: 5,
    name: "National Mission for Sustainable Agriculture",
    description: "Promotes sustainable farming practices and water use efficiency",
    deadline: "2024-03-31",
    eligibility: ["Farmers adopting sustainable practices", "Documentation of current practices required"],
    tags: ["Sustainability", "Central Scheme"],
    isEligible: true,
    icon: "♻️",
  },
]

export default function SchemeNotifier() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSchemes, setFilteredSchemes] = useState(mockSchemes)
  const [idNumber, setIdNumber] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const { translate } = useLanguage()

  const handleSearch = () => {
    const filtered = mockSchemes.filter(
      (scheme) =>
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredSchemes(filtered)
  }

  const handleIdCheck = () => {
    if (idNumber.length < 8) return

    setIsChecking(true)
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would check eligibility based on the ID
      setIsChecking(false)
    }, 1500)
  }

  // Function to play voice alert
  const playVoiceAlert = () => {
    setIsPlaying(true)

    // Simulate text-to-speech
    const message = translate("New PM-KISAN installment of ₹2,000 has been released. Check your bank account.")

    // In a real app, this would use the Web Speech API or a TTS service
    console.log("Playing voice alert:", message)

    // Simulate speech duration
    setTimeout(() => {
      setIsPlaying(false)
    }, 3000)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-yellow-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <CardTitle className="text-xl text-yellow-800">{translate("Government Scheme Notifier")}</CardTitle>
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
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="text-gray-400" size={20} />
            <Input
              type="text"
              placeholder={translate("Search schemes by name, description, or tag")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch()
              }}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="bg-yellow-600 hover:bg-yellow-700">
              {translate("Search")}
            </Button>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {translate("Enter Aadhaar/PAN Number")}
              </label>
              <Input
                type="text"
                placeholder="e.g., ABCDE1234F or 123456789012"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                maxLength={12}
              />
            </div>
            <Button
              onClick={handleIdCheck}
              className="bg-yellow-600 hover:bg-yellow-700"
              disabled={idNumber.length < 8 || isChecking}
            >
              {isChecking ? translate("Checking...") : translate("Check Eligibility")}
            </Button>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <Check size={18} />
            {translate("You're eligible for these schemes")}
          </h3>
          <p className="text-gray-700 text-sm">
            {translate(
              "Based on your location (Maharashtra) and profile, you qualify for the following schemes. Apply before the deadlines!",
            )}
          </p>
        </div>

        <div className="space-y-4">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className={`p-4 rounded-lg border ${scheme.isEligible ? "border-green-200" : "border-gray-200"}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{scheme.icon}</span>
                  <h3 className="font-semibold text-gray-800">{scheme.name}</h3>
                </div>
                {scheme.isEligible ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{translate("Eligible")}</Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-500">
                    {translate("Not Eligible")}
                  </Badge>
                )}
              </div>
              <p className="text-gray-700 text-sm mb-3">{scheme.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {scheme.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100">
                    {translate(tag)}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-500">{translate("Deadline")}:</span>{" "}
                  <span className="font-medium text-gray-700">{scheme.deadline}</span>
                </div>
                <Button size="sm" variant="outline" className="h-8">
                  {translate("View Details")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
