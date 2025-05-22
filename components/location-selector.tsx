"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"

interface LocationSelectorProps {
  onLocationChange: (location: string) => void
  defaultLocation?: string
}

export default function LocationSelector({
  onLocationChange,
  defaultLocation = "Maharashtra, India",
}: LocationSelectorProps) {
  const [location, setLocation] = useState(defaultLocation)
  const [isDetecting, setIsDetecting] = useState(false)
  const { translate } = useLanguage()

  // Popular agricultural regions in India
  const popularLocations = [
    "Punjab, India",
    "Maharashtra, India",
    "Karnataka, India",
    "Tamil Nadu, India",
    "Uttar Pradesh, India",
    "Gujarat, India",
    "Andhra Pradesh, India",
    "West Bengal, India",
    "Bihar, India",
    "Haryana, India",
    "Rajasthan, India",
    "Kerala, India",
    "Odisha, India",
    "Telangana, India",
    "Assam, India",
    "Madhya Pradesh, India",
    "Chhattisgarh, India",
    "Jharkhand, India",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      onLocationChange(location)
    }
  }

  const detectLocation = () => {
    setIsDetecting(true)

    // Check if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // In a real app, you would use a reverse geocoding service
            // For example: const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=YOUR_API_KEY`)

            // For demo purposes, we'll just use a random location from our list
            const randomLocation = popularLocations[Math.floor(Math.random() * popularLocations.length)]
            setLocation(randomLocation)
            onLocationChange(randomLocation)
          } catch (error) {
            console.error("Error detecting location:", error)
          } finally {
            setIsDetecting(false)
          }
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsDetecting(false)
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser")
      setIsDetecting(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder={translate("Enter location")}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {translate("Search")}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={detectLocation}
          disabled={isDetecting}
          className="flex items-center gap-1"
        >
          <MapPin size={16} />
          {isDetecting ? (
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-r-transparent"></span>
          ) : (
            <span className="sr-only md:not-sr-only md:inline-block">{translate("Detect")}</span>
          )}
        </Button>
      </form>

      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">{translate("Popular Regions")}</div>
        <div className="flex flex-wrap gap-2">
          {popularLocations.slice(0, 5).map((loc) => (
            <Button
              key={loc}
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => {
                setLocation(loc)
                onLocationChange(loc)
              }}
            >
              {loc.split(",")[0]}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
