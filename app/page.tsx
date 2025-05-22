"use client"

import Link from "next/link"
import { Mic, Bug, CloudRain, Droplets, BarChart3, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import FeatureCard from "@/components/feature-card"
import VoiceAssistant from "@/components/voice-assistant"

export default function Home() {
  const { translate } = useLanguage()

  // Core features for the homepage
  const features = [
    {
      title: "Voice-Based Q&A",
      description: "Ask your farming questions by voice in any language",
      icon: <Mic className="h-8 w-8 text-green-600" />,
      href: "/voice-qa",
      color: "bg-green-50",
    },
    {
      title: "Crop Disease Detection",
      description: "Upload crop photos to identify diseases",
      icon: <Bug className="h-8 w-8 text-red-600" />,
      href: "/crop-disease",
      color: "bg-red-50",
    },
    {
      title: "Weather Alerts",
      description: "Get hyperlocal weather forecasts and alerts",
      icon: <CloudRain className="h-8 w-8 text-blue-600" />,
      href: "/weather",
      color: "bg-blue-50",
    },
    {
      title: "Smart Irrigation",
      description: "Personalized irrigation schedules for your crops",
      icon: <Droplets className="h-8 w-8 text-cyan-600" />,
      href: "/irrigation",
      color: "bg-cyan-50",
    },
    {
      title: "Market Prices",
      description: "AI-powered market price predictions",
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      href: "/market-prices",
      color: "bg-purple-50",
    },
    {
      title: "Government Schemes",
      description: "Get notified about relevant government schemes",
      icon: <FileText className="h-8 w-8 text-yellow-600" />,
      href: "/schemes",
      color: "bg-yellow-50",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            {translate("Voice-First Agricultural Advisory for Rural Farmers")}
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            {translate(
              "Krishi Vaani provides AI-powered agricultural advice through voice in 10+ Indian languages, designed for rural farmers with limited connectivity.",
            )}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/voice-qa">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 rounded-lg">
                {translate("Get Started")}
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-6 rounded-lg"
              >
                {translate("Learn More")}
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <VoiceAssistant />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => (
          <FeatureCard
            key={feature.href}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            href={feature.href}
            color={feature.color}
          />
        ))}
      </div>
    </div>
  )
}
