"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

// Mock farmer stories data
const farmerStories = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Bihar",
    crop: "Rice",
    title: "How Krishi Vaani helped me triple my rice yield!",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
    story:
      "I've been farming rice for 15 years, but was struggling with low yields due to pests. Krishi Vaani's voice assistant helped me identify the exact pest and recommended an organic solution. This year, my yield increased by 40% and I saved ₹8,000 on pesticides!",
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    location: "Telangana",
    crop: "Cotton",
    title: "Voice advice that saved my cotton crop from disease",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
    story:
      "I noticed strange spots on my cotton plants but didn't know what it was. I used Krishi Vaani's voice feature to describe the symptoms in Telugu. The app identified it as bacterial blight and suggested immediate treatment. I followed the advice and saved my entire crop!",
  },
  {
    id: 3,
    name: "Gurpreet Singh",
    location: "Punjab",
    crop: "Wheat",
    title: "How I reduced water usage by 30% with smart irrigation advice",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
    story:
      "Water scarcity is a big problem in our area. Krishi Vaani's irrigation advisor suggested specific watering schedules based on my soil type and local weather. By following this advice, I reduced my water usage by 30% while maintaining the same wheat yield!",
  },
  {
    id: 4,
    name: "Anita Patel",
    location: "Gujarat",
    crop: "Groundnut",
    title: "Market price predictions helped me maximize profits",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
    story:
      "I was planning to sell my groundnut harvest immediately after harvesting. Krishi Vaani's price predictor suggested waiting for 2 weeks as prices were likely to rise. I waited and sold at ₹7,500 per quintal instead of ₹6,200 - an extra profit of ₹26,000!",
  },
]

export default function FarmerStories() {
  const [selectedStory, setSelectedStory] = useState<null | (typeof farmerStories)[0]>(null)
  const { translate } = useLanguage()

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-xl text-green-800">{translate("Farmer Success Stories")}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {farmerStories.map((story) => (
            <Card key={story.id} className="overflow-hidden">
              <div className="relative h-36 cursor-pointer" onClick={() => setSelectedStory(story)}>
                <Image src={story.thumbnail || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <Play className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm text-green-800 line-clamp-2 mb-1">{story.title}</h3>
                <p className="text-xs text-gray-600">
                  {story.name}, {story.location} - {story.crop} {translate("Farmer")}
                </p>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-green-600 border-green-600 text-xs"
                  onClick={() => setSelectedStory(story)}
                >
                  {translate("Watch Story")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="font-semibold text-lg">{selectedStory.title}</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedStory(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <div className="aspect-video relative mb-4">
                <iframe
                  src={selectedStory.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={selectedStory.title}
                ></iframe>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-green-800">
                  {selectedStory.name}, {selectedStory.location}
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedStory.crop} {translate("Farmer")}
                </p>
              </div>
              <p className="text-gray-700">{selectedStory.story}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
