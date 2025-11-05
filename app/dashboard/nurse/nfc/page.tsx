"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, Wifi, WifiOff, Clock, Activity } from "lucide-react"

interface NFCCard {
  id: string
  patientId: string
  patientName: string
  status: "synced" | "not-synced" | "error"
  lastModified: string
  vitals: { bp: string; temp: string; pulse: string }
}

const mockCards: NFCCard[] = [
  {
    id: "NFC-001",
    patientId: "P-234",
    patientName: "John Doe",
    status: "synced",
    lastModified: "2 hours ago",
    vitals: { bp: "120/80", temp: "98.6°F", pulse: "72 bpm" },
  },
  {
    id: "NFC-003",
    patientId: "P-890",
    patientName: "Robert Johnson",
    status: "synced",
    lastModified: "30 min ago",
    vitals: { bp: "118/76", temp: "98.4°F", pulse: "68 bpm" },
  },
]

export default function NurseNFCPage() {
  const [cards, setCards] = useState<NFCCard[]>(mockCards)
  const [selectedCard, setSelectedCard] = useState<NFCCard | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "text-green-400 bg-green-400/10"
      case "not-synced":
        return "text-yellow-400 bg-yellow-400/10"
      case "error":
        return "text-red-400 bg-red-400/10"
      default:
        return "text-slate-400 bg-slate-400/10"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "synced":
        return <Wifi className="w-4 h-4" />
      case "not-synced":
        return <WifiOff className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Patient Vitals & NFC Cards</h1>
        <p className="text-slate-400 mt-2">Record and sync patient vital signs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Assigned Patients</CardTitle>
              <CardDescription>Patients under your care</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    className="p-4 bg-slate-700 rounded-lg border border-slate-600 hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="font-medium text-white">{card.patientName}</p>
                            <p className="text-xs text-slate-400">{card.id}</p>
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(card.status)}`}>
                        {getStatusIcon(card.status)}
                        <span className="text-xs font-medium capitalize">{card.status.replace("-", " ")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedCard ? (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Vital Signs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase">Patient</p>
                  <p className="text-white font-medium mt-1">{selectedCard.patientName}</p>
                </div>

                <div className="bg-slate-700 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs text-slate-400">Blood Pressure</p>
                    <p className="text-lg font-bold text-white mt-1">{selectedCard.vitals.bp}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Temperature</p>
                    <p className="text-lg font-bold text-white mt-1">{selectedCard.vitals.temp}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Pulse</p>
                    <p className="text-lg font-bold text-white mt-1">{selectedCard.vitals.pulse}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Last Updated
                  </p>
                  <p className="text-white font-medium mt-1">{selectedCard.lastModified}</p>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Update Vitals</Button>
                  <Button
                    variant="outline"
                    className="w-full text-slate-300 border-slate-600 hover:bg-slate-700 bg-transparent"
                  >
                    Sync to Card
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6 text-center">
                <Smartphone className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">Select a patient to view vitals</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
