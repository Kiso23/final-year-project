"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardSkeleton } from "@/components/skeleton-loader"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { FilePlus, Download, Calendar, User, Pill } from "lucide-react"
import NewPrescriptionDialog from "@/components/dialogs/new-prescription-dialog"

export default function DoctorPrescriptionsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "RX001",
      patientName: "Rajesh Kumar",
      patientId: "P001",
      date: "2024-01-15",
      medications: ["Metformin 500mg", "Glimepiride 2mg"],
      diagnosis: "Type 2 Diabetes",
      status: "Active",
    },
    {
      id: "RX002",
      patientName: "Priya Sharma",
      patientId: "P002",
      date: "2024-01-18",
      medications: ["Amlodipine 5mg", "Losartan 50mg"],
      diagnosis: "Hypertension",
      status: "Active",
    },
    {
      id: "RX003",
      patientName: "Amit Patel",
      patientId: "P003",
      date: "2024-01-10",
      medications: ["Atorvastatin 20mg", "Aspirin 75mg"],
      diagnosis: "Coronary Artery Disease",
      status: "Completed",
    },
    {
      id: "RX004",
      patientName: "Sneha Reddy",
      patientId: "P004",
      date: "2024-01-20",
      medications: ["Salbutamol Inhaler", "Montelukast 10mg"],
      diagnosis: "Asthma",
      status: "Active",
    },
  ])
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleAddPrescription = (newPrescription: any) => {
    setPrescriptions((prev) => [newPrescription, ...prev])
  }

  const handleDownload = (id: string) => {
    toast({
      title: "Downloading Prescription",
      description: `Prescription ${id} is being downloaded`,
    })
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `Prescription ${id} downloaded successfully`,
      })
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-6 bg-white min-h-screen"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Prescriptions</h1>
          <p className="text-slate-600 mt-2">Manage patient prescriptions</p>
        </div>
        <Button onClick={() => setIsNewDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
          <FilePlus className="w-4 h-4 mr-2" />
          New Prescription
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{prescription.id}</CardTitle>
                    <CardDescription>{prescription.diagnosis}</CardDescription>
                  </div>
                  <Badge variant={prescription.status === "Active" ? "default" : "secondary"}>
                    {prescription.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User className="w-4 h-4" />
                  <span>
                    {prescription.patientName} ({prescription.patientId})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>{prescription.date}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    <Pill className="w-4 h-4" />
                    <span>Medications:</span>
                  </div>
                  <ul className="ml-6 space-y-1">
                    {prescription.medications.map((med, idx) => (
                      <li key={idx} className="text-sm text-slate-600">
                        • {med}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button onClick={() => handleDownload(prescription.id)} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      <NewPrescriptionDialog
        isOpen={isNewDialogOpen}
        onClose={() => setIsNewDialogOpen(false)}
        onAdd={handleAddPrescription}
      />
    </motion.div>
  )
}
