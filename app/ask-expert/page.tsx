"use client"

import { useState } from "react"
import { Phone, Send, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/components/language-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock languages for the dropdown
const languages = ["Hindi", "English", "Kannada", "Telugu", "Tamil", "Punjabi", "Marathi", "Bengali", "Gujarati"]

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

export default function AskExpert() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [topic, setTopic] = useState("")
  const [issue, setIssue] = useState("")
  const [language, setLanguage] = useState("")
  const [isCallRequested, setIsCallRequested] = useState(false)
  const [isMessageSent, setIsMessageSent] = useState(false)
  const { translate } = useLanguage()

  const handleCall = () => {
    if (!name || !phone || !topic || !language) return

    // In a real app, this would initiate a call via Twilio or similar service
    console.log("Initiating call with:", { name, phone, topic, language })
    setIsCallRequested(true)

    // Simulate a call being placed
    setTimeout(() => {
      // In a real app, this would be handled by the call service
      window.location.href = `tel:+918000000000`
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!name || !topic || !issue || !language) return

    // In a real app, this would send a message to the expert
    console.log("Sending message to expert:", { name, topic, issue, language })
    setIsMessageSent(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsMessageSent(false)
      setIssue("")
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">{translate("Ask an Expert")}</h1>

      <Tabs defaultValue="call">
        <TabsList className="mb-6">
          <TabsTrigger value="call" className="flex items-center gap-1">
            <Phone size={16} />
            <span>{translate("Call an Expert")}</span>
          </TabsTrigger>
          <TabsTrigger value="message" className="flex items-center gap-1">
            <MessageSquare size={16} />
            <span>{translate("Message an Expert")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="call">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="bg-red-50">
                <div className="flex items-center gap-3">
                  <Phone className="h-8 w-8 text-red-600" />
                  <CardTitle className="text-2xl text-red-800">{translate("Speak with an Expert")}</CardTitle>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {translate("Phone Number")}
                      </label>
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
                        {translate("Preferred Language")}
                      </label>
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
                  <span>{translate("Request Call Now")}</span>
                </Button>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>{translate("Our experts are available from 8 AM to 8 PM, 7 days a week")}</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">{translate("Available Experts")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium text-green-800">Dr. Anand Sharma</h3>
                        <p className="text-sm text-gray-600">
                          {translate("Plant Pathologist with 15 years of experience")}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {translate(
                            "Specializes in rice, wheat, and vegetable diseases. Available in Hindi and English.",
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium text-green-800">Dr. Lakshmi Rao</h3>
                        <p className="text-sm text-gray-600">
                          {translate("Soil Scientist with 12 years of experience")}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {translate(
                            "Specializes in soil health and fertilizer recommendations. Available in Telugu, Tamil, and English.",
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium text-green-800">Dr. Gurpreet Singh</h3>
                        <p className="text-sm text-gray-600">
                          {translate("Agricultural Economist with 10 years of experience")}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {translate(
                            "Specializes in market trends and government schemes. Available in Punjabi, Hindi, and English.",
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">{translate("Frequently Asked Questions")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>{translate("How quickly will I get a response?")}</AccordionTrigger>
                      <AccordionContent>
                        {translate(
                          "For phone calls, our experts typically respond within 30 minutes during business hours (8 AM - 8 PM). For messages, you can expect a response within 2-4 hours.",
                        )}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>{translate("Is this service free?")}</AccordionTrigger>
                      <AccordionContent>
                        {translate(
                          "Basic consultations are free. For detailed analysis or personalized recommendations, a nominal fee may apply. Premium users get unlimited expert consultations.",
                        )}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>{translate("Can I send photos of my crop issues?")}</AccordionTrigger>
                      <AccordionContent>
                        {translate(
                          "Yes, you can send photos through the message option. Clear, well-lit photos help our experts provide more accurate diagnoses and recommendations.",
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="message">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="bg-blue-50">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-2xl text-blue-800">{translate("Message an Expert")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-6">{translate("Send a detailed message to our agricultural experts")}</p>

                {isMessageSent ? (
                  <div className="bg-green-50 p-4 rounded-lg text-center mb-6">
                    <h3 className="font-medium text-green-800 mb-2">{translate("Message Sent Successfully")}</h3>
                    <p className="text-gray-700 mb-4">
                      {translate("Our expert will respond to your query within 2-4 hours")}
                    </p>
                    <Button
                      variant="outline"
                      className="text-green-600 border-green-600"
                      onClick={() => setIsMessageSent(false)}
                    >
                      {translate("Send Another Message")}
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
                        {translate("Describe your issue")}
                      </label>
                      <Textarea
                        placeholder={translate("Provide details about your agricultural query or issue")}
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        rows={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {translate("Preferred Language")}
                      </label>
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
                  onClick={handleSendMessage}
                  disabled={isMessageSent || !name || !topic || !issue || !language}
                  className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  <span>{translate("Send Message")}</span>
                </Button>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>{translate("Response time: 2-4 hours during business hours (8 AM - 8 PM)")}</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">{translate("How It Works")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-blue-600">1</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{translate("Submit Your Query")}</h3>
                        <p className="text-sm text-gray-600">
                          {translate("Fill out the form with details about your agricultural issue or question.")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-blue-600">2</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{translate("Expert Assignment")}</h3>
                        <p className="text-sm text-gray-600">
                          {translate("Your query is assigned to an expert specializing in the relevant field.")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-blue-600">3</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{translate("Receive Expert Advice")}</h3>
                        <p className="text-sm text-gray-600">
                          {translate("Get personalized recommendations and solutions from our agricultural experts.")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-blue-600">4</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{translate("Follow-up Support")}</h3>
                        <p className="text-sm text-gray-600">
                          {translate("Ask follow-up questions or provide feedback on the advice received.")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">{translate("Tips for Better Responses")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700">
                        {translate("Be specific about your crop, its growth stage, and symptoms")}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700">
                        {translate("Mention your location and recent weather conditions")}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700">
                        {translate("Include any treatments or solutions you've already tried")}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700">
                        {translate("Attach clear photos if possible (coming soon)")}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
