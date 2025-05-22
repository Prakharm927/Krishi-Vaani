"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import type { User } from "@/lib/auth"

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी (Hindi)" },
  { value: "mr", label: "मराठी (Marathi)" },
  { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { value: "ta", label: "தமிழ் (Tamil)" },
  { value: "te", label: "తెలుగు (Telugu)" },
  { value: "bn", label: "বাংলা (Bengali)" },
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

interface ProfileFormProps {
  user: User
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    location: user.location,
    language: user.language,
    farmSize: user.farmSize || "",
  })
  const [selectedCrops, setSelectedCrops] = useState<string[]>(user.crops || [])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
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
    setSuccess("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          crops: selectedCrops,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile")
      }

      setSuccess("Profile updated successfully")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while updating profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Preferred Language</Label>
          <Select
            value={formData.language}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
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
          <Label htmlFor="farmSize">Farm Size</Label>
          <Input
            id="farmSize"
            name="farmSize"
            placeholder="e.g., 5 acres"
            value={formData.farmSize}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Crops You Grow</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CROPS.map((crop) => (
            <div key={crop.id} className="flex items-center space-x-2">
              <Checkbox
                id={`crop-${crop.id}`}
                checked={selectedCrops.includes(crop.id)}
                onCheckedChange={() => handleCropToggle(crop.id)}
              />
              <Label htmlFor={`crop-${crop.id}`} className="text-sm font-normal">
                {crop.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
