"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, Wifi, Clock, Building2, FileText } from "lucide-react"

export default function PatientCardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">My NFC Card</h1>
        <p className="text-slate-400 mt-2">View and manage your personal health card</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Card Information</CardTitle>
              <CardDescription>Your NFC health card details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-8 text-white">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-sm opacity-75">PATIENT HEALTH CARD</p>
                    <p className="text-2xl font-bold mt-2">John Doe</p>
                  </div>
                  <Smartphone className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs opacity-75">Card ID</p>
                    <p className="font-mono text-lg">NFC-001-2024</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">Patient ID</p>
                    <p className="font-mono text-lg">P-234-5678</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="text-xs text-slate-400 uppercase">Blood Type</p>
                  <p className="text-xl font-bold text-white mt-2">O+</p>
                </div>
                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="text-xs text-slate-400 uppercase">Allergies</p>
                  <p className="text-sm text-white mt-2">Penicillin</p>
                </div>
                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="text-xs text-slate-400 uppercase">Emergency Contact</p>
                  <p className="text-sm text-white mt-2">Jane Doe</p>
                </div>
                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="text-xs text-slate-400 uppercase">Phone</p>
                  <p className="text-sm text-white mt-2">555-0123</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Update Card Information</Button>
                <Button
                  variant="outline"
                  className="w-full text-slate-300 border-slate-600 hover:bg-slate-700 bg-transparent"
                >
                  View Card History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Sync Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-white">Synced</p>
                  <p className="text-xs text-slate-400">All data up to date</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-400 uppercase flex items-center gap-2 mb-2">
                  <Clock className="w-3 h-3" />
                  Last Synced
                </p>
                <p className="text-white font-medium">2 hours ago</p>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-400 uppercase flex items-center gap-2 mb-2">
                  <Building2 className="w-3 h-3" />
                  Last Hospital
                </p>
                <p className="text-white font-medium">Central Hospital</p>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-4">Sync Now</Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Card read</p>
                  <p className="text-xs text-slate-400">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Data updated</p>
                  <p className="text-xs text-slate-400">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Prescription added</p>
                  <p className="text-xs text-slate-400">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
