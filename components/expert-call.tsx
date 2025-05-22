"use client"

import { useState } from "react"
import { Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"

// Mock topics for the dropdown
const topics = [
  "Crop Disease",
  "Pest Management",
  "Fertilizer Recommendation",
  "Irrigation Advice",
  "Market Prices",
  "Government Schemes",
  "Seed Selection",
  "Organic Farming",
  "Weather Impact",
]

// Mock languages for the dropdown
const languages = ["Hindi", "English", "Marathi", "Tamil", "Telugu", "Kannada", "Punjabi"]

export default function ExpertCall() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [topic, setTopic] = useState("")
  const [question, setQuestion] = useState("")
  const [language, setLanguage] = useState("")
  const [isCallRequested, setIsCallRequested] = useState(false)
  const { translate } = useLanguage()

  const handleCall = () => {
    if (!name || !phone || !topic || !language) return

    // In a real app, this would initiate a call via Twilio or similar service
    console.log("Initiating call with:", { name, phone, topic, question, language })
    setIsCallRequested(true)

    // Simulate a call being placed
    setTimeout(() => {
      // In a real app, this would be handled by the call service
      window.location.href = `tel:+918000000000`
    }, 1500)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-red-50">
        <div className="flex items-center gap-3">
          <Phone className="h-6 w-6 text-red-600" />
          <CardTitle className="text-xl text-red-800">{translate("Ask an Expert (Live Call)")}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-gray-700 mb-6">
          {translate("Get immediate help from our agricultural experts via phone call")}
        </p>

        {isCallRequested ? (
          <div className="bg-green-50 p-4 rounded-lg text-center mb-6">
            <h3 className="font-medium text-green-800 mb-2">{translate("Call Request Received")}</h3>
            <p className="text-gray-700 mb-4">
              {translate("Our expert will call you shortly at")} {phone}
            </p>
            <Button
              variant="outline"
              className="text-green-600 border-green-600"
              onClick={() => setIsCallRequested(false)}
            >
              {translate("Request Another Call")}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Your Name")}</label>
              <Input
                type="text"
                placeholder={translate("Enter your name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Phone Number")}</label>
              <Input
                type="tel"
                placeholder={translate("Enter your phone number")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Topic")}</label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger>
                  <SelectValue placeholder={translate("Select topic")} />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((t) => (
                    <SelectItem key={t} value={t}>
                      {translate(t)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {translate("Your Question (Voice)")}
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder={translate("Type or record your question")}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" className="flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{translate("Preferred Language")}</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder={translate("Select language")} />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <Button
          onClick={handleCall}
          disabled={isCallRequested || !name || !phone || !topic || !language}
          className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
        >
          <Phone size={16} />
          <span>{translate("Call Now")}</span>
        </Button>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>{translate("Our experts are available from 8 AM to 8 PM, 7 days a week")}</p>
        </div>
      </CardContent>
    </Card>
  )
}
