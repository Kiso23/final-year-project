"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Shield, LogOut } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"account" | "security" | "notifications">("account")
  const [formData, setFormData] = useState({
    email: "user@hospital.com",
    fullName: "John Doe",
    phone: "+1 (555) 123-4567",
  })

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-2">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="space-y-2">
            {(["account", "security", "notifications"] as const).map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === tab ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                {tab === "account" && "Account"}
                {tab === "security" && "Security"}
                {tab === "notifications" && "Notifications"}
              </Button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === "account" && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Account Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription>Manage your security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="font-medium text-white">Change Password</p>
                        <p className="text-xs text-slate-400">Update your password regularly</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="text-slate-300 border-slate-600 hover:bg-slate-600 bg-transparent"
                    >
                      Change
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="font-medium text-white">Two-Factor Authentication</p>
                        <p className="text-xs text-slate-400">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">Enable</Button>
                  </div>
                </div>

                <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <LogOut className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="font-medium text-white">Logout Everywhere</p>
                        <p className="text-xs text-slate-400">Sign out from all devices</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="text-red-400 border-red-600 hover:bg-red-900/20 bg-transparent"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription>Control how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Email Notifications", description: "Receive updates via email" },
                  { label: "SMS Alerts", description: "Get important alerts via SMS" },
                  { label: "Push Notifications", description: "Receive browser notifications" },
                  { label: "Weekly Reports", description: "Get weekly summary reports" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600"
                  >
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.description}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                  </div>
                ))}

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Save Preferences</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
