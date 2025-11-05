"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Smartphone, Wifi, WifiOff, Activity, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface NFCCard {
  id: string
  patientId: string
  patientName: string
  status: "synced" | "not-synced" | "error"
  lastModified: string
  hospital: string
  dataSize: string
}

const mockCards: NFCCard[] = [
  {
    id: "NFC-001",
    patientId: "P-234",
    patientName: "John Doe",
    status: "synced",
    lastModified: "2 hours ago",
    hospital: "Central Hospital",
    dataSize: "2.4 MB",
  },
  {
    id: "NFC-003",
    patientId: "P-890",
    patientName: "Robert Johnson",
    status: "synced",
    lastModified: "30 min ago",
    hospital: "Central Hospital",
    dataSize: "3.1 MB",
  },
]

export default function DoctorNFCPage() {
  const { toast } = useToast()
  const [cards, setCards] = useState<NFCCard[]>(mockCards)
  const [selectedCard, setSelectedCard] = useState<NFCCard | null>(null)
  const [showWriteModal, setShowWriteModal] = useState(false)

  const handleReadCard = () => {
    if (!selectedCard) return
    toast({
      title: "Reading NFC Card",
      description: `Reading data from ${selectedCard.patientName}'s card...`,
    })
    setTimeout(() => {
      toast({
        title: "Card Data Read",
        description: "Patient data successfully read from NFC card",
      })
    }, 1500)
  }

  const handleWritePrescription = () => {
    toast({
      title: "Writing Prescription",
      description: "Writing prescription to NFC card...",
    })
    setTimeout(() => {
      toast({
        title: "Prescription Written",
        description: "Prescription successfully written to NFC card",
      })
      setShowWriteModal(false)
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "text-green-600 bg-green-100"
      case "not-synced":
        return "text-yellow-600 bg-yellow-100"
      case "error":
        return "text-red-600 bg-red-100"
      default:
        return "text-slate-600 bg-slate-100"
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-8 bg-white min-h-screen"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900">NFC Card Operations</h1>
        <p className="text-slate-600 mt-2">Read and write patient data to NFC cards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">My Patient Cards</CardTitle>
              <CardDescription>Cards assigned to your patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedCard(card)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCard?.id === card.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-blue-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-slate-900">{card.patientName}</p>
                            <p className="text-xs text-slate-600">{card.id}</p>
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(card.status)}`}>
                        {getStatusIcon(card.status)}
                        <span className="text-xs font-medium capitalize">{card.status.replace("-", " ")}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedCard ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">Card Operations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-600 uppercase">Patient</p>
                    <p className="text-slate-900 font-medium mt-1">{selectedCard.patientName}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600 uppercase">Card ID</p>
                    <p className="text-slate-900 font-medium mt-1">{selectedCard.id}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600 uppercase">Status</p>
                    <div
                      className={`flex items-center gap-2 mt-1 px-3 py-2 rounded-lg w-fit ${getStatusColor(selectedCard.status)}`}
                    >
                      {getStatusIcon(selectedCard.status)}
                      <span className="text-sm font-medium capitalize">{selectedCard.status.replace("-", " ")}</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button onClick={handleReadCard} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Read Card Data
                    </Button>
                    <Button
                      onClick={() => setShowWriteModal(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Write Prescription
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-slate-700 border-slate-300 hover:bg-slate-100 bg-transparent"
                    >
                      View Card History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="bg-white border-slate-200">
              <CardContent className="p-6 text-center">
                <Smartphone className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Select a card to perform operations</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {showWriteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <Card className="bg-white border-slate-200 w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-slate-900">Write Prescription to Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Medication Name</label>
                  <Input placeholder="e.g., Aspirin" className="bg-white border-slate-300 text-slate-900" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Dosage</label>
                  <Input placeholder="e.g., 500mg" className="bg-white border-slate-300 text-slate-900" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Frequency</label>
                  <Input placeholder="e.g., Twice daily" className="bg-white border-slate-300 text-slate-900" />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => setShowWriteModal(false)}
                    variant="outline"
                    className="flex-1 text-slate-700 border-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleWritePrescription}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Write to Card
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
