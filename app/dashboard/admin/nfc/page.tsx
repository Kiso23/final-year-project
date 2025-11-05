"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Smartphone, Wifi, WifiOff, Clock, Building2, Activity } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

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
    patientName: "Raj Kumar",
    status: "synced",
    lastModified: "2 hours ago",
    hospital: "Central Hospital",
    dataSize: "2.4 MB",
  },
  {
    id: "NFC-002",
    patientId: "P-567",
    patientName: "Priya Sharma",
    status: "not-synced",
    lastModified: "1 day ago",
    hospital: "City Medical Center",
    dataSize: "1.8 MB",
  },
  {
    id: "NFC-003",
    patientId: "P-890",
    patientName: "Amit Patel",
    status: "synced",
    lastModified: "30 minutes ago",
    hospital: "Central Hospital",
    dataSize: "3.1 MB",
  },
]

export default function NFCManagementPage() {
  const { toast } = useToast()
  const [cards, setCards] = useState<NFCCard[]>(mockCards)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCard, setSelectedCard] = useState<NFCCard | null>(null)

  const filteredCards = cards.filter(
    (card) =>
      card.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSync = (cardId: string) => {
    toast({
      title: "Syncing Card",
      description: "Please wait...",
    })

    setTimeout(() => {
      setCards(
        cards.map((card) => (card.id === cardId ? { ...card, status: "synced", lastModified: "Just now" } : card)),
      )
      toast({
        title: "Sync Successful",
        description: "Card has been synced successfully",
      })
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
        <h1 className="text-3xl font-bold text-slate-900">NFC Card Management</h1>
        <p className="text-slate-600 mt-2">Monitor and manage patient NFC cards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Total Cards",
            value: cards.length,
            icon: Smartphone,
            color: "bg-blue-100 text-blue-600",
          },
          {
            label: "Synced",
            value: cards.filter((c) => c.status === "synced").length,
            icon: Wifi,
            color: "bg-green-100 text-green-600",
          },
          {
            label: "Not Synced",
            value: cards.filter((c) => c.status === "not-synced").length,
            icon: WifiOff,
            color: "bg-yellow-100 text-yellow-600",
          },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">NFC Cards</CardTitle>
              <CardDescription>All registered patient cards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search by patient name or card ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border-slate-300 text-slate-900"
                />
              </div>

              <div className="space-y-3">
                {filteredCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedCard(card)}
                    className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          {selectedCard ? (
            <Card className="bg-white border-slate-200 sticky top-4">
              <CardHeader>
                <CardTitle className="text-slate-900">Card Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-slate-600 uppercase">Patient Name</p>
                  <p className="text-slate-900 font-medium mt-1">{selectedCard.patientName}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 uppercase">Card ID</p>
                  <p className="text-slate-900 font-medium mt-1">{selectedCard.id}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 uppercase">Patient ID</p>
                  <p className="text-slate-900 font-medium mt-1">{selectedCard.patientId}</p>
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

                <div>
                  <p className="text-xs text-slate-600 uppercase flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Last Modified
                  </p>
                  <p className="text-slate-900 font-medium mt-1">{selectedCard.lastModified}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 uppercase flex items-center gap-2">
                    <Building2 className="w-3 h-3" />
                    Hospital
                  </p>
                  <p className="text-slate-900 font-medium mt-1">{selectedCard.hospital}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 uppercase">Data Size</p>
                  <p className="text-slate-900 font-medium mt-1">{selectedCard.dataSize}</p>
                </div>

                <div className="pt-4 space-y-2">
                  <Button
                    onClick={() => handleSync(selectedCard.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Sync Card
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-slate-700 border-slate-300 hover:bg-slate-100 bg-white"
                  >
                    View History
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white border-slate-200">
              <CardContent className="p-6 text-center">
                <Smartphone className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Select a card to view details</p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
