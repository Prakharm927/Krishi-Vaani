"use client"

import { useState, useRef } from "react"
import { Mic, MicOff, Volume2, VolumeX, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VoiceAssistantProps {
  onSendMessage?: (message: string) => void
  compact?: boolean
}

export default function VoiceAssistant({ onSendMessage, compact = false }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<string | null>(null)
  const { currentLanguage, translate } = useLanguage()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Simulate Dwani AI API call for speech recognition
  const startListening = async () => {
    setTranscript("")
    setIsListening(true)
    setError(null)
    setIsLoading(true)
    setResponse(null)

    try {
      // Simulate Dwani AI API call
      console.log("Calling Dwani AI STT API with language:", currentLanguage.code)

      // Simulate recording for 3 seconds then generate a mock transcript
      setTimeout(() => {
        // Check if we should simulate an error (10% chance)
        const shouldError = Math.random() < 0.1

        if (shouldError) {
          throw new Error("Failed to connect to Dwani AI services")
        }

        const mockTranscripts = [
          "मेरे टमाटर के पत्तों पर सफेद धब्बे हैं, क्या करूं?",
          "आम के पेड़ों में पाउडरी मिल्ड्यू का इलाज क्या है?",
          "धान की फसल के लिए सबसे अच्छा उर्वरक कौन सा है?",
          "What is the best fertilizer for rice crops?",
          "How to treat powdery mildew in mango trees?",
          "ಟೊಮೆಟೊ ಎಲೆಗಳಲ್ಲಿ ಬಿಳಿ ಚುಕ್ಕೆಗಳಿವೆ, ನಾನು ಏನು ಮಾಡಬೇಕು?",
        ]

        // Select a transcript based on the current language
        let randomTranscript
        if (currentLanguage.code === "hi") {
          randomTranscript = mockTranscripts[Math.floor(Math.random() * 3)]
        } else if (currentLanguage.code === "kn") {
          randomTranscript = mockTranscripts[5]
        } else {
          randomTranscript = mockTranscripts[Math.floor(Math.random() * 2) + 3]
        }

        setTranscript(randomTranscript)
        setIsListening(false)
        setIsLoading(false)

        // Generate a response
        generateResponse(randomTranscript)

        // Send the message if callback provided
        if (onSendMessage) {
          onSendMessage(randomTranscript)
        }
      }, 3000)
    } catch (err) {
      console.error("Error with Dwani AI STT:", err)
      setError("Could not connect to Dwani AI voice services. Please check your connection and try again.")
      setIsListening(false)
      setIsLoading(false)
    }
  }

  const stopListening = () => {
    setIsListening(false)
    setIsLoading(false)
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Generate a response based on the transcript
  const generateResponse = (text: string) => {
    // Simple keyword-based responses
    const lowerText = text.toLowerCase()

    setTimeout(() => {
      let responseText = ""

      if (lowerText.includes("tomato") || lowerText.includes("टमाटर") || lowerText.includes("ಟೊಮೆಟೊ")) {
        responseText =
          "For tomato leaf spots, this is likely powdery mildew. Treatment: 1. Remove affected leaves. 2. Apply neem oil spray (10ml/liter water). 3. Spray twice a week in the morning. 4. Ensure good air circulation around plants."
      } else if (lowerText.includes("mango") || lowerText.includes("आम")) {
        responseText =
          "For powdery mildew in mango trees: 1. Apply wettable sulfur (2g/liter water). 2. Ensure good air circulation around the tree. 3. Avoid excess watering as moisture promotes this disease. 4. Prune affected branches and burn them."
      } else if (lowerText.includes("rice") || lowerText.includes("धान")) {
        responseText =
          "For rice cultivation, use balanced fertilizers: 1. Nitrogen (Urea): 100 kg/hectare, divided into 2-3 applications. 2. Phosphorus (DAP): 50 kg/hectare at planting. 3. Potash (MOP): 50 kg/hectare. 4. Zinc Sulfate: 25 kg/hectare once every 3 years."
      } else if (lowerText.includes("fertilizer") || lowerText.includes("उर्वरक")) {
        responseText =
          "For most crops, a balanced NPK fertilizer (like 10-10-10) is a good starting point. Apply organic fertilizers like compost or vermicompost 2-3 weeks before sowing. For flowering and fruiting, use fertilizers higher in phosphorus and potassium."
      } else {
        responseText =
          "Thank you for your question. Please provide more details about your crop, the specific issue you're facing, or what agricultural information you need. I can help with crop diseases, fertilizer recommendations, pest management, irrigation advice, and more."
      }

      setResponse(responseText)

      // Automatically speak the response
      speakText(responseText)
    }, 1000)
  }

  // Text-to-Speech function using Dwani AI
  const speakText = (text: string) => {
    if (isSpeaking) return
    setIsSpeaking(true)
    setError(null)

    try {
      // Simulate Dwani AI TTS API call
      console.log("Calling Dwani AI TTS API with:", text, "in language:", currentLanguage.code)

      // Simulate API response with a timeout
      setTimeout(() => {
        // Check if we should simulate an error (5% chance)
        const shouldError = Math.random() < 0.05

        if (shouldError) {
          throw new Error("Failed to generate speech with Dwani AI")
        }

        // In a real implementation, you would play the audio returned by the API
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              // Audio started playing
            })
            .catch((err) => {
              console.error("Error playing audio:", err)
              setIsSpeaking(false)
              setError("Could not play audio. Please check your device settings.")
            })
        } else {
          setIsSpeaking(false)
        }
      }, 500)
    } catch (err) {
      console.error("Error with Dwani AI TTS:", err)
      setError("Could not generate speech with Dwani AI. Please try again later.")
      setIsSpeaking(false)
    }
  }

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsSpeaking(false)
  }

  if (compact) {
    return (
      <div className="flex flex-col items-center">
        <audio ref={audioRef} onEnded={() => setIsSpeaking(false)} src="/placeholder-audio.mp3" />

        <Button
          onClick={toggleListening}
          disabled={isSpeaking}
          className={`rounded-full p-6 ${
            isListening ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
          }`}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </Button>

        <p className="text-sm text-center mt-2">
          {isListening ? translate("Listening...") : isLoading ? translate("Processing...") : translate("Tap to speak")}
        </p>
      </div>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-50">
        <div className="flex items-center gap-3">
          <Mic className="h-6 w-6 text-green-600" />
          <CardTitle className="text-xl text-green-800">{translate("Dwani AI Voice Assistant")}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Hidden audio element for TTS playback */}
        <audio
          ref={audioRef}
          onEnded={() => setIsSpeaking(false)}
          src="/placeholder-audio.mp3" // In a real app, this would be dynamically set
        />

        {/* Error message */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Transcription box */}
        {(transcript || isListening || isLoading) && (
          <div className="bg-green-50 rounded-lg p-3 mb-4 text-green-800 text-sm">
            <div className="flex items-center justify-between">
              <p className="font-medium">{translate("You said")}:</p>
              {isListening && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full animate-pulse">
                  {translate("Listening with Dwani AI...")}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-2 mt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="mt-1">{transcript || (isListening ? translate("Listening...") : "")}</p>
            )}
          </div>
        )}

        {/* Response box */}
        {response && (
          <div className="bg-blue-50 rounded-lg p-3 mb-4 text-blue-800 text-sm">
            <div className="flex items-center justify-between">
              <p className="font-medium">{translate("Krishi Vaani")}:</p>
              {isSpeaking && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full animate-pulse">
                  {translate("Speaking...")}
                </span>
              )}
            </div>
            <p className="mt-1">{response}</p>
          </div>
        )}

        {/* Voice controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={toggleListening}
            disabled={isSpeaking}
            className={`rounded-full p-6 ${
              isListening ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
            }`}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </Button>

          {response && (
            <Button
              onClick={isSpeaking ? stopSpeaking : () => speakText(response)}
              className={`rounded-full p-6 ${isSpeaking ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
              aria-label={isSpeaking ? "Stop speaking" : "Speak response"}
            >
              {isSpeaking ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </Button>
          )}
        </div>

        <div className="text-xs text-center text-gray-500 mt-4">{translate("Powered by Dwani AI voice services")}</div>
      </CardContent>
    </Card>
  )
}
