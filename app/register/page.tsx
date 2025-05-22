"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/components/language-provider"

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी (Hindi)" },
  { value: "mr", label: "मराठी (Marathi)" },
  { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { value: "ta", label: "தமிழ் (Tamil)" },
  { value: "te", label: "తెలుగు (Telugu)" },
  { value: "kn", label: "ಕನ್ನಡ (Kannada)" },
]

const CROPS = [
  { id: "wheat", label: "Wheat" },
  { id: "rice", label: "Rice" },
  { id: "cotton", label: "Cotton" },
  { id: "sugarcane", label: "Sugarcane" },
  { id: "maize", label: "Maize" },
  { id: "pulses", label: "Pulses" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
]

export default function RegisterPage() {
  const { translate } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    language: "en",
    farmSize: "",
  })
  const [selectedCrops, setSelectedCrops] = useState<string[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCropToggle = (cropId: string) => {
    setSelectedCrops((prev) => (prev.includes(cropId) ? prev.filter((id) => id !== cropId) : [...prev, cropId]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(translate("Passwords do not match"))
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, always succeed
      window.location.href = "/"
    } catch (err) {
      setError(err instanceof Error ? err.message : translate("An error occurred during registration"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{translate("Create an Account")}</CardTitle>
          <CardDescription className="text-center">
            {translate("Join Krishi Vaani to access personalized agricultural insights")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{translate("Full Name")}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={translate("Your full name")}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{translate("Email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={translate("your.email@example.com")}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{translate("Password")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{translate("Confirm Password")}</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{translate("Phone Number")}</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder={translate("+91 9876543210")}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">{translate("Location")}</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder={translate("Village, District, State")}
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">{translate("Preferred Language")}</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={translate("Select language")} />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmSize">{translate("Farm Size")}</Label>
                <Input
                  id="farmSize"
                  name="farmSize"
                  placeholder={translate("e.g., 5 acres")}
                  value={formData.farmSize}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{translate("Crops You Grow")}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CROPS.map((crop) => (
                  <div key={crop.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`crop-${crop.id}`}
                      checked={selectedCrops.includes(crop.id)}
                      onCheckedChange={() => handleCropToggle(crop.id)}
                    />
                    <Label htmlFor={`crop-${crop.id}`} className="text-sm font-normal">
                      {translate(crop.label)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? translate("Creating Account...") : translate("Register")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            {translate("Already have an account?")}{" "}
            <Link href="/login" className="text-green-600 hover:text-green-800 font-medium">
              {translate("Login")}
            </Link>
          </div>
          <div className="text-center text-xs text-gray-500">
            {translate("By registering, you agree to our Terms of Service and Privacy Policy")}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
