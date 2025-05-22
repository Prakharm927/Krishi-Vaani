import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function SettingsPage() {
  const session = await getSession()

  if (!session.user) {
    redirect("/login")
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Alert Preferences</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weather-alerts">Weather Alerts</Label>
                      <p className="text-sm text-gray-500">Receive notifications about weather changes</p>
                    </div>
                    <Switch id="weather-alerts" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="disease-alerts">Disease Risk Alerts</Label>
                      <p className="text-sm text-gray-500">Get notified about potential crop disease risks</p>
                    </div>
                    <Switch id="disease-alerts" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="market-alerts">Market Price Alerts</Label>
                      <p className="text-sm text-gray-500">Receive updates when crop prices change significantly</p>
                    </div>
                    <Switch id="market-alerts" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="scheme-alerts">Government Scheme Alerts</Label>
                      <p className="text-sm text-gray-500">Get notified about new government schemes</p>
                    </div>
                    <Switch id="scheme-alerts" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Methods</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-notifications">In-App Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications within the app</p>
                    </div>
                    <Switch id="app-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="voice-notifications">Voice Call Alerts</Label>
                      <p className="text-sm text-gray-500">Receive critical alerts via voice call</p>
                    </div>
                    <Switch id="voice-notifications" />
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>App Preferences</CardTitle>
                <CardDescription>Customize your Krishi Vaani experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Display Settings</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-gray-500">Use dark theme for the app</p>
                    </div>
                    <Switch id="dark-mode" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="large-text">Large Text</Label>
                      <p className="text-sm text-gray-500">Increase text size for better readability</p>
                    </div>
                    <Switch id="large-text" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Usage</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-saver">Data Saver Mode</Label>
                      <p className="text-sm text-gray-500">Reduce data usage when on mobile networks</p>
                    </div>
                    <Switch id="data-saver" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="offline-mode">Offline Mode</Label>
                      <p className="text-sm text-gray-500">Download essential data for offline use</p>
                    </div>
                    <Switch id="offline-mode" defaultChecked />
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account security and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security</h3>

                  <div className="space-y-2">
                    <Label htmlFor="change-password">Change Password</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Change Password
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Privacy</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="location-sharing">Location Sharing</Label>
                      <p className="text-sm text-gray-500">Allow the app to access your precise location</p>
                    </div>
                    <Switch id="location-sharing" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection">Data Collection</Label>
                      <p className="text-sm text-gray-500">Allow anonymous usage data collection to improve the app</p>
                    </div>
                    <Switch id="data-collection" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Management</h3>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      Delete Account
                    </Button>
                    <p className="text-xs text-gray-500 text-center">This action is permanent and cannot be undone</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
