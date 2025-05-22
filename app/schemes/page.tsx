"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, Search, Check, X } from "lucide-react"
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
  },
  {
    id: 2,
    name: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme to protect against crop failure due to natural calamities",
    deadline: "2023-10-15",
    eligibility: ["All farmers growing notified crops", "Premium payment required"],
    tags: ["Insurance", "Central Scheme"],
    isEligible: true,
  },
  {
    id: 3,
    name: "Soil Health Card Scheme",
    description: "Provides information on soil nutrient status and recommendations for appropriate fertilizer dosage",
    deadline: "Ongoing",
    eligibility: ["All farmers"],
    tags: ["Soil Health", "Central Scheme"],
    isEligible: true,
  },
  {
    id: 4,
    name: "Maharashtra State Rural Livelihood Mission",
    description: "Provides subsidized loans and training for agricultural activities",
    deadline: "2023-11-30",
    eligibility: ["Maharashtra residents", "Below poverty line families"],
    tags: ["Loan", "State Scheme", "Maharashtra"],
    isEligible: false,
  },
  {
    id: 5,
    name: "National Mission for Sustainable Agriculture",
    description: "Promotes sustainable farming practices and water use efficiency",
    deadline: "2024-03-31",
    eligibility: ["Farmers adopting sustainable practices", "Documentation of current practices required"],
    tags: ["Sustainability", "Central Scheme"],
    isEligible: true,
  },
]

export default function Schemes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSchemes, setFilteredSchemes] = useState(mockSchemes)
  const [pincode, setPincode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { translate } = useLanguage()

  useEffect(() => {
    const filtered = mockSchemes.filter(
      (scheme) =>
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredSchemes(filtered)
  }, [searchTerm])

  const handlePincodeSubmit = () => {
    if (pincode.length !== 6) return

    setIsLoading(true)
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would fetch schemes based on the pincode
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-green-600 hover:text-green-800 flex items-center gap-1">
          <ArrowLeft size={16} />
          <span>{translate("Back to Home")}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="bg-yellow-50">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
                <CardTitle className="text-2xl text-yellow-800">{translate("Government Scheme Notifier")}</CardTitle>
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
                    className="flex-1"
                  />
                </div>

                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Enter Pincode")}</label>
                    <Input
                      type="text"
                      placeholder="e.g., 411001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      maxLength={6}
                    />
                  </div>
                  <Button
                    onClick={handlePincodeSubmit}
                    className="bg-yellow-600 hover:bg-yellow-700"
                    disabled={pincode.length !== 6 || isLoading}
                  >
                    {isLoading ? translate("Loading...") : translate("Find Schemes")}
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
                  <Card key={scheme.id} className={scheme.isEligible ? "border-green-200" : ""}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">{scheme.name}</h3>
                        {scheme.isEligible ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            {translate("Eligible")}
                          </Badge>
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-yellow-800">{translate("Document Checklist")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{translate("Aadhaar Card")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{translate("Land Records / Patta")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{translate("Bank Account Details")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{translate("Passport Size Photographs")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{translate("Caste Certificate (if applicable)")}</span>
                </li>
              </ul>
              <div className="mt-4">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  {translate("Upload Missing Documents")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-yellow-800">{translate("Application Status")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-green-800">PM-KISAN</h3>
                    <Badge className="bg-green-100 text-green-800">{translate("Approved")}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{translate("Next installment due in 45 days")}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-yellow-800">{translate("Soil Health Card")}</h3>
                    <Badge className="bg-yellow-100 text-yellow-800">{translate("Pending")}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{translate("Application under review")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-yellow-800">{translate("Upcoming Deadlines")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <span className="text-red-800 font-medium">{translate("Pradhan Mantri Fasal Bima Yojana")}</span>
                  <span className="text-sm text-red-600 font-medium">15 {translate("Oct")}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-800 font-medium">
                    {translate("Maharashtra Rural Livelihood Mission")}
                  </span>
                  <span className="text-sm text-yellow-600 font-medium">30 {translate("Nov")}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <span className="text-green-800 font-medium">PM-KISAN</span>
                  <span className="text-sm text-green-600 font-medium">31 {translate("Dec")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
