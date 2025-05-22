import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/profile-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProfilePage() {
  const session = await getSession()

  if (!session.user) {
    redirect("/login")
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal details</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
                <img
                  src={session.user.profileImage || "/placeholder.svg?height=128&width=128"}
                  alt={session.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold">{session.user.name}</h2>
              <p className="text-gray-500">{session.user.location}</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm user={session.user} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Farm Information</CardTitle>
              <CardDescription>Your agricultural details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Farm Size</h3>
                  <p>{session.user.farmSize || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Crops</h3>
                  {session.user.crops && session.user.crops.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {session.user.crops.map((crop) => (
                        <span key={crop} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {crop.charAt(0).toUpperCase() + crop.slice(1)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>No crops specified</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{session.user.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p>{session.user.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Preferred Language</h3>
                  <p>{LANGUAGES.find((l) => l.value === session.user.language)?.label || session.user.language}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी (Hindi)" },
  { value: "mr", label: "मराठी (Marathi)" },
  { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { value: "ta", label: "தமிழ் (Tamil)" },
  { value: "te", label: "తెలుగు (Telugu)" },
  { value: "bn", label: "বাংলা (Bengali)" },
]
