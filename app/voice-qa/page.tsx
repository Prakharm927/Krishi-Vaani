"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MessageSquare } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import VoiceAssistant from "@/components/voice-assistant"

export default function VoiceQAPage() {
  const { translate } = useLanguage()
  const [activeTab, setActiveTab] = useState("voice")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">{translate("Voice-Based Q&A System")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="voice" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="voice" className="flex items-center gap-1">
                <Mic size={16} />
                <span>{translate("Voice Assistant")}</span>
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-1">
                <MessageSquare size={16} />
                <span>{translate("Text Chat")}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voice">
              <VoiceAssistant />
            </TabsContent>

            <TabsContent value="text">
              <Card>
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-xl text-blue-800">{translate("Text-Based Chat")}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center p-12">
                    <p className="text-gray-500">{translate("Text chat functionality coming soon!")}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800">{translate("Popular Questions")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                  {translate("How to identify tomato leaf curl virus?")}
                </li>
                <li className="p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                  {translate("Best fertilizer for rice cultivation?")}
                </li>
                <li className="p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                  {translate("How to control aphids in cotton organically?")}
                </li>
                <li className="p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                  {translate("When to harvest wheat in North India?")}
                </li>
                <li className="p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                  {translate("How to increase sugarcane yield?")}
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800">{translate("Voice Features")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  </div>
                  <span className="text-gray-700">{translate("Supports 10+ Indian languages")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  </div>
                  <span className="text-gray-700">{translate("Works offline for basic queries")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  </div>
                  <span className="text-gray-700">{translate("Trained on Indian agricultural data")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  </div>
                  <span className="text-gray-700">{translate("Automatic language detection")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  </div>
                  <span className="text-gray-700">{translate("Voice responses for non-literate users")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
