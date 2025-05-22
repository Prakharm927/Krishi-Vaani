"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"
import VoiceInterface from "@/components/voice-interface"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "नमस्ते! मैं कृषि वाणी हूँ। आप कृषि से संबंधित कोई भी प्रश्न पूछ सकते हैं।",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { translate, currentLanguage } = useLanguage()

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (message: string = inputMessage) => {
    if (!message.trim()) return

    setIsProcessing(true)

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: message }])
    setInputMessage("")

    // Simulate AI response with agricultural knowledge
    setTimeout(() => {
      let response = ""

      // Simple keyword-based responses
      const lowerMessage = message.toLowerCase()

      if (lowerMessage.includes("tomato") || lowerMessage.includes("टमाटर") || lowerMessage.includes("ಟೊಮೆಟೊ")) {
        response = getTranslatedResponse("tomato", currentLanguage.code)
      } else if (lowerMessage.includes("mango") || lowerMessage.includes("आम") || lowerMessage.includes("manguier")) {
        response = getTranslatedResponse("mango", currentLanguage.code)
      } else if (lowerMessage.includes("rice") || lowerMessage.includes("धान") || lowerMessage.includes("paddy")) {
        response = getTranslatedResponse("rice", currentLanguage.code)
      } else if (lowerMessage.includes("fertilizer") || lowerMessage.includes("उर्वरक")) {
        response = getTranslatedResponse("fertilizer", currentLanguage.code)
      } else if (lowerMessage.includes("pest") || lowerMessage.includes("कीट") || lowerMessage.includes("insect")) {
        response = getTranslatedResponse("pest", currentLanguage.code)
      } else {
        response = getTranslatedResponse("default", currentLanguage.code)
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsProcessing(false)
    }, 1500)
  }

  // Function to get translated responses based on keywords and language
  function getTranslatedResponse(keyword: string, langCode: string): string {
    // In a real app, these would come from a backend API with proper translations
    const responses: Record<string, Record<string, string>> = {
      tomato: {
        en: "For tomato leaf curl or white spots, this is likely powdery mildew. Treatment: 1. Remove affected leaves. 2. Apply neem oil spray (10ml/liter water). 3. Spray twice a week in the morning. 4. Ensure good air circulation around plants.",
        hi: "टमाटर के पत्तों पर सफेद धब्बे पाउडरी मिल्ड्यू के कारण हो सकते हैं। इसके लिए निम्न उपाय करें: 1. प्रभावित पत्तियों को हटा दें। 2. नीम के तेल का स्प्रे करें (10ml/लीटर पानी)। 3. सप्ताह में दो बार सुबह के समय स्प्रे करें। 4. पौधों के आसपास अच्छा वायु संचार सुनिश्चित करें।",
        kn: "ಟೊಮೆಟೊ ಎಲೆಗಳ ಮೇಲೆ ಬಿಳಿ ಚುಕ್ಕೆಗಳು ಪೌಡರಿ ಮಿಲ್ಡ್ಯೂ ಕಾರಣದಿಂದಾಗಿರಬಹುದು. ಚಿಕಿತ್ಸೆ: 1. ಪ್ರಭಾವಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ. 2. ಬೇವಿನ ಎಣ್ಣೆ ಸ್ಪ್ರೇ ಮಾಡಿ (10ml/ಲೀಟರ್ ನೀರು). 3. ವಾರಕ್ಕೆ ಎರಡು ಬಾರಿ ಬೆಳಗ್ಗೆ ಸ್ಪ್ರೇ ಮಾಡಿ. 4. ಸಸ್ಯಗಳ ಸುತ್ತಲೂ ಉತ್ತಮ ಗಾಳಿ ಸಂಚಾರವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
      },
      mango: {
        en: "For powdery mildew in mango trees: 1. Apply wettable sulfur (2g/liter water). 2. Ensure good air circulation around the tree. 3. Avoid excess watering as moisture promotes this disease. 4. Prune affected branches and burn them.",
        hi: "आम के पेड़ों में पाउडरी मिल्ड्यू के लिए: 1. वेटेबल सल्फर 2g/लीटर पानी में मिलाकर स्प्रे करें। 2. पेड़ के आसपास अच्छा वायु संचार सुनिश्चित करें। 3. अधिक पानी न दें, क्योंकि नमी इस बीमारी को बढ़ावा देती है। 4. प्रभावित शाखाओं को काटकर जला दें।",
        kn: "ಮಾವಿನ ಮರಗಳಲ್ಲಿ ಪೌಡರಿ ಮಿಲ್ಡ್ಯೂಗೆ: 1. ವೆಟ್ಟಬಲ್ ಸಲ್ಫರ್ (2g/ಲೀಟರ್ ನೀರು) ಅನ್ನು ಬಳಸಿ. 2. ಮರದ ಸುತ್ತಲೂ ಉತ್ತಮ ಗಾಳಿ ಸಂಚಾರವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. 3. ತೇವಾಂಶವು ಈ ರೋಗವನ್ನು ಉತ್ತೇಜಿಸುವುದರಿಂದ ಹೆಚ್ಚಿನ ನೀರಾವರಿಯನ್ನು ತಪ್ಪಿಸಿ. 4. ಪ್ರಭಾವಿತ ಕೊಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಮತ್ತು ಸುಡಿ.",
      },
      rice: {
        en: "For rice cultivation, use balanced fertilizers: 1. Nitrogen (Urea): 100 kg/hectare, divided into 2-3 applications. 2. Phosphorus (DAP): 50 kg/hectare at planting. 3. Potash (MOP): 50 kg/hectare. 4. Zinc Sulfate: 25 kg/hectare once every 3 years.",
        hi: "धान की फसल के लिए संतुलित उर्वरक प्रयोग करें: 1. नाइट्रोजन (यूरिया): 100 kg/हेक्टेयर, 2-3 बार विभाजित करके। 2. फॉस्फोरस (DAP): 50 kg/हेक्टेयर, रोपाई के समय। 3. पोटाश (MOP): 50 kg/हेक्टेयर। 4. जिंक सल्फेट: 25 kg/हेक्टेयर, हर 3 साल में एक बार।",
        kn: "ಭತ್ತದ ಬೇಸಾಯಕ್ಕೆ, ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರಗಳನ್ನು ಬಳಸಿ: 1. ನೈಟ್ರೋಜನ್ (ಯೂರಿಯಾ): 100 kg/ಹೆಕ್ಟೇರ್, 2-3 ಬಾರಿ ವಿಭಜಿಸಿ. 2. ಫಾಸ್ಫರಸ್ (DAP): 50 kg/ಹೆಕ್ಟೇರ್ ನಾಟಿ ಮಾಡುವಾಗ. 3. ಪೊಟ್ಯಾಷ್ (MOP): 50 kg/ಹೆಕ್ಟೇರ್. 4. ಜಿಂಕ್ ಸಲ್ಫೇಟ್: 25 kg/ಹೆಕ್ಟೇರ್ ಪ್ರತಿ 3 ವರ್ಷಕ್ಕೊಮ್ಮೆ.",
      },
      fertilizer: {
        en: "For most crops, a balanced NPK fertilizer (like 10-10-10) is a good starting point. Apply organic fertilizers like compost or vermicompost 2-3 weeks before sowing. For flowering and fruiting, use fertilizers higher in phosphorus and potassium. Always follow package instructions for application rates.",
        hi: "अधिकांश फसलों के लिए, संतुलित NPK उर्वरक (जैसे 10-10-10) एक अच्छा प्रारंभिक बिंदु है। बुवाई से 2-3 सप्ताह पहले कंपोस्ट या वर्मीकंपोस्ट जैसे जैविक उर्वरकों का प्रयोग करें। फूल और फल के लिए, फॉस्फोरस और पोटैशियम में अधिक उर्वरकों का उपयोग करें। हमेशा अनुप्रयोग दरों के लिए पैकेज निर्देशों का पालन करें।",
        kn: "ಹೆಚ್ಚಿನ ಬೆಳೆಗಳಿಗೆ, ಸಮತೋಲಿತ NPK ರಸಗೊಬ್ಬರ (10-10-10 ನಂತಹ) ಒಳ್ಳೆಯ ಪ್ರಾರಂಭಿಕ ಬಿಂದುವಾಗಿದೆ. ಬಿತ್ತನೆಗೆ 2-3 ವಾರಗಳ ಮೊದಲು ಕಾಂಪೋಸ್ಟ್ ಅಥವಾ ವರ್ಮಿಕಾಂಪೋಸ್ಟ್ ನಂತಹ ಸಾವಯವ ಗೊಬ್ಬರಗಳನ್ನು ಹಾಕಿ. ಹೂವು ಮತ್ತು ಹಣ್ಣುಗಳಿಗೆ, ಫಾಸ್ಫರಸ್ ಮತ್ತು ಪೊಟ್ಯಾಷಿಯಂನಲ್ಲಿ ಹೆಚ್ಚಿನ ರಸಗೊಬ್ಬರಗಳನ್ನು ಬಳಸಿ. ಅಪ್ಲಿಕೇಶನ್ ದರಗಳಿಗೆ ಯಾವಾಗಲೂ ಪ್ಯಾಕೇಜ್ ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ.",
      },
      pest: {
        en: "For general pest management: 1. Identify the pest correctly before treatment. 2. Start with non-chemical methods like neem oil (20ml/liter) or soap spray (10g/liter). 3. Use yellow sticky traps for flying insects. 4. For severe infestations, use recommended pesticides at correct dosage and follow safety precautions.",
        hi: "सामान्य कीट प्रबंधन के लिए: 1. उपचार से पहले कीट की सही पहचान करें। 2. नीम के तेल (20ml/लीटर) या साबुन स्प्रे (10g/लीटर) जैसे गैर-रासायनिक तरीकों से शुरू करें। 3. उड़ने वाले कीड़ों के लिए पीले चिपचिपे जाल का उपयोग करें। 4. गंभीर संक्रमण के लिए, सही खुराक पर अनुशंसित कीटनाशकों का उपयोग करें और सुरक्षा सावधानियों का पालन करें।",
        kn: "ಸಾಮಾನ್ಯ ಕೀಟ ನಿರ್ವಹಣೆಗೆ: 1. ಚಿಕಿತ್ಸೆಗೆ ಮೊದಲು ಕೀಟವನ್ನು ಸರಿಯಾಗಿ ಗುರುತಿಸಿ. 2. ಬೇವಿನ ಎಣ್ಣೆ (20ml/ಲೀಟರ್) ಅಥವಾ ಸೋಪ್ ಸ್ಪ್ರೇ (10g/ಲೀಟರ್) ನಂತಹ ರಾಸಾಯನಿಕವಲ್ಲದ ವಿಧಾನಗಳೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ. 3. ಹಾರುವ ಕೀಟಗಳಿಗೆ ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಬಳಸಿ. 4. ತೀವ್ರ ಕೀಟ ಬಾಧೆಗಳಿಗೆ, ಸರಿಯಾದ ಡೋಸೇಜ್‌ನಲ್ಲಿ ಶಿಫಾರಸು ಮಾಡಿದ ಕೀಟನಾಶಕಗಳನ್ನು ಬಳಸಿ ಮತ್ತು ಸುರಕ್ಷತಾ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ಅನುಸರಿಸಿ.",
      },
      default: {
        en: "Thank you for your question. Please provide more details about your crop, the specific issue you're facing, or what agricultural information you need. I can help with crop diseases, fertilizer recommendations, pest management, irrigation advice, and more.",
        hi: "आपके प्रश्न के लिए धन्यवाद। कृपया अपनी फसल, आप जिस विशिष्ट समस्या का सामना कर रहे हैं, या आपको किस कृषि जानकारी की आवश्यकता है, के बारे में अधिक विवरण प्रदान करें। मैं फसल रोगों, उर्वरक सिफारिशों, कीट प्रबंधन, सिंचाई सलाह, और अधिक में मदद कर सकता हूं।",
        kn: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಧನ್ಯವಾದಗಳು. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬೆಳೆ, ನೀವು ಎದುರಿಸುತ್ತಿರುವ ನಿರ್ದಿಷ್ಟ ಸಮಸ್ಯೆ, ಅಥವಾ ನಿಮಗೆ ಯಾವ ಕೃಷಿ ಮಾಹಿತಿ ಬೇಕು ಎಂಬುದರ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ಒದಗಿಸಿ. ನಾನು ಬೆಳೆ ರೋಗಗಳು, ರಸಗೊಬ್ಬರ ಶಿಫಾರಸುಗಳು, ಕೀಟ ನಿರ್ವಹಣೆ, ನೀರಾವರಿ ಸಲಹೆ ಮತ್ತು ಇನ್ನೂ ಹೆಚ್ಚಿನದರಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.",
      },
    }

    // Return the response in the requested language, or English if not available
    return responses[keyword][langCode] || responses[keyword].en || responses.default.en
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
          <span>{translate("Voice Assistant")}</span>
          {isProcessing && <span className="inline-block h-2 w-2 rounded-full bg-green-600 animate-pulse"></span>}
        </h2>
        <p className="text-gray-600 text-sm">{translate("Speak to get agricultural advice")}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-3 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === "user" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <VoiceInterface onSendMessage={handleSendMessage} isProcessing={isProcessing} />

      <div className="flex gap-2 mt-4">
        <Input
          type="text"
          placeholder={translate("Ask a question...")}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage()
          }}
          disabled={isProcessing}
        />
        <Button
          type="button"
          onClick={() => handleSendMessage()}
          className="bg-green-600 hover:bg-green-700"
          disabled={isProcessing || !inputMessage.trim()}
        >
          <Send size={20} />
          <span className="sr-only">{translate("Send")}</span>
        </Button>
      </div>
    </div>
  )
}
