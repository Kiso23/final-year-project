"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CardSkeleton } from "@/components/skeleton-loader"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Search, Activity, Heart, Thermometer } from "lucide-react"
import { UpdateVitalsDialog } from "@/components/dialogs/update-vitals-dialog"

export default function NursePatientsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const patients = [
    {
      id: "P001",
      name: "Rajesh Kumar",
      room: "101",
      bed: "A",
      vitals: { bp: "130/85", temp: "98.6°F", pulse: "78 bpm" },
      status: "Stable",
    },
    {
      id: "P002",
      name: "Priya Sharma",
      room: "102",
      bed: "B",
      vitals: { bp: "140/90", temp: "99.1°F", pulse: "82 bpm" },
      status: "Monitoring",
    },
    {
      id: "P003",
      name: "Amit Patel",
      room: "103",
      bed: "A",
      vitals: { bp: "125/80", temp: "98.4°F", pulse: "75 bpm" },
      status: "Stable",
    },
    {
      id: "P004",
      name: "Sneha Reddy",
      room: "104",
      bed: "C",
      vitals: { bp: "120/75", temp: "98.2°F", pulse: "72 bpm" },
      status: "Stable",
    },
  ]

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.room.includes(searchQuery),
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-6 bg-white min-h-screen"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Patient Care</h1>
        <p className="text-slate-600 mt-2">Monitor and update patient vitals</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Patients</CardTitle>
          <CardDescription>Search by name, ID, or room number</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <CardDescription>
                      Room {patient.room} - Bed {patient.bed}
                    </CardDescription>
                  </div>
                  <Badge variant={patient.status === "Stable" ? "default" : "secondary"}>{patient.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-900">Current Vitals:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span>BP: {patient.vitals.bp}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Thermometer className="w-4 h-4 text-red-600" />
                      <span>Temp: {patient.vitals.temp}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Heart className="w-4 h-4 text-pink-600" />
                      <span>Pulse: {patient.vitals.pulse}</span>
                    </div>
                  </div>
                </div>
                <UpdateVitalsDialog patientName={patient.name} patientId={patient.id} />
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
