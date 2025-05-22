"use client"

import { useState, useRef } from "react"
import { Mic, MicOff, Volume2, VolumeX, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface VoiceInterfaceProps {
  onSendMessage: (message: string) => void
  isProcessing: boolean
}

export default function VoiceInterface({ onSendMessage, isProcessing }: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { currentLanguage, translate } = useLanguage()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Simulate Dwani AI API call for speech recognition
  const startListening = async () => {
    setTranscript("")
    setIsListening(true)
    setError(null)
    setIsLoading(true)

    try {
      // Simulate Dwani AI API call
      console.log("Calling Dwani AI STT API with language:", currentLanguage.code)

      // Simulate recording for 3 seconds then generate a mock transcript
      setTimeout(() => {
        // Check if we should simulate an error (20% chance)
        const shouldError = Math.random() < 0.2

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

        // Send the message after a short delay
        setTimeout(() => {
          onSendMessage(randomTranscript)
        }, 500)
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

    // In a real implementation, you would cancel the Dwani AI API call here
    console.log("Stopping Dwani AI STT")
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
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
        // Check if we should simulate an error (10% chance)
        const shouldError = Math.random() < 0.1

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
      }, 1000)
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

  return (
    <div className="space-y-4">
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
            <p className="font-medium">{translate("Transcription")}:</p>
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

      {/* Voice controls */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={toggleListening}
          disabled={isProcessing}
          className={`rounded-full p-3 ${
            isListening ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
          }`}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </Button>

        <Button
          type="button"
          onClick={
            isSpeaking
              ? stopSpeaking
              : () =>
                  speakText(
                    "This is a test of the Dwani AI text-to-speech functionality. In a real implementation, this would speak the latest message from the assistant.",
                  )
          }
          className={`rounded-full p-3 ${isSpeaking ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
          aria-label={isSpeaking ? "Stop speaking" : "Speak last message"}
        >
          {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>

        <div className="text-xs text-gray-500 ml-2">{translate("Powered by Dwani AI voice services")}</div>
      </div>
    </div>
  )
}
