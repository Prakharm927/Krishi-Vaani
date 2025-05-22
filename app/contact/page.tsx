"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"

export default function ContactPage() {
  const { translate } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Contact Hero */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">{translate("Get In Touch")}</h1>
          <p className="text-xl text-gray-700 mb-8">
            {translate("Have questions about Krishi Vaani? We're here to help farmers, partners, and supporters.")}
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-green-800 mb-6">{translate("Send Us a Message")}</h2>

            {isSubmitted ? (
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h3 className="text-xl font-medium text-green-800 mb-2">{translate("Thank You!")}</h3>
                <p className="text-gray-700 mb-4">
                  {translate("Your message has been sent successfully. We'll get back to you soon.")}
                </p>
                <Button onClick={() => setIsSubmitted(false)} className="bg-green-600 hover:bg-green-700">
                  {translate("Send Another Message")}
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      {translate("First Name")}
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={translate("Your first name")}
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      {translate("Last Name")}
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={translate("Your last name")}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {translate("Email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder={translate("Your email address")}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    {translate("Phone Number")}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={translate("Your phone number")}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    {translate("Message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={translate("How can we help you?")}
                    className="w-full min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-6" disabled={isSubmitting}>
                  {isSubmitting ? translate("Sending...") : translate("Send Message")}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-green-800 mb-6">{translate("Contact Information")}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-green-800 mb-1">{translate("Phone")}</h3>
                    <p className="text-gray-600">+91 1234567890</p>
                    <p className="text-gray-600">+91 9876543210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-green-800 mb-1">{translate("Email")}</h3>
                    <p className="text-gray-600">info@krishivaani.com</p>
                    <p className="text-gray-600">support@krishivaani.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-green-800 mb-1">{translate("Address")}</h3>
                    <p className="text-gray-600">
                      Krishi Vaani Headquarters
                      <br />
                      123 Innovation Street
                      <br />
                      Bengaluru, Karnataka 560001
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-green-800 mb-6">{translate("Office Hours")}</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{translate("Monday - Friday")}:</span>
                  <span className="text-gray-800 font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{translate("Saturday")}:</span>
                  <span className="text-gray-800 font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{translate("Sunday")}:</span>
                  <span className="text-gray-800 font-medium">{translate("Closed")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="h-[400px] w-full bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">{translate("Interactive Map Would Be Displayed Here")}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
