"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CardSkeleton } from "@/components/skeleton-loader"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Search, UserPlus, Phone, Mail, Calendar, Activity } from "lucide-react"
import AddPatientDialog from "@/components/dialogs/add-patient-dialog"
import PatientDetailsDialog from "@/components/dialogs/patient-details-dialog"

export default function DoctorPatientsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [patients, setPatients] = useState([
    {
      id: "P001",
      name: "Rajesh Kumar",
      age: 45,
      gender: "Male",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
      lastVisit: "2024-01-15",
      condition: "Diabetes",
      status: "Active",
    },
    {
      id: "P002",
      name: "Priya Sharma",
      age: 32,
      gender: "Female",
      phone: "+91 98765 43211",
      email: "priya.sharma@email.com",
      lastVisit: "2024-01-18",
      condition: "Hypertension",
      status: "Active",
    },
    {
      id: "P003",
      name: "Amit Patel",
      age: 58,
      gender: "Male",
      phone: "+91 98765 43212",
      email: "amit.patel@email.com",
      lastVisit: "2024-01-10",
      condition: "Heart Disease",
      status: "Follow-up",
    },
    {
      id: "P004",
      name: "Sneha Reddy",
      age: 28,
      gender: "Female",
      phone: "+91 98765 43213",
      email: "sneha.reddy@email.com",
      lastVisit: "2024-01-20",
      condition: "Asthma",
      status: "Active",
    },
    {
      id: "P005",
      name: "Vikram Singh",
      age: 41,
      gender: "Male",
      phone: "+91 98765 43214",
      email: "vikram.singh@email.com",
      lastVisit: "2024-01-12",
      condition: "Arthritis",
      status: "Recovered",
    },
  ])
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewDetails = (patient: any) => {
    setSelectedPatient(patient)
    setIsDetailsDialogOpen(true)
  }

  const handleAddPatient = (newPatient: any) => {
    setPatients((prev) => [newPatient, ...prev])
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
          <h1 className="text-3xl font-bold text-slate-900">My Patients</h1>
          <p className="text-slate-600 mt-2">Manage and view patient information</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Patients</CardTitle>
          <CardDescription>Search by name, ID, or condition</CardDescription>
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
          {Array.from({ length: 6 }).map((_, i) => (
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
                    <CardDescription>ID: {patient.id}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      patient.status === "Active" ? "default" : patient.status === "Follow-up" ? "secondary" : "outline"
                    }
                  >
                    {patient.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Activity className="w-4 h-4" />
                  <span>
                    {patient.age} years • {patient.gender}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>Last Visit: {patient.lastVisit}</span>
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium text-slate-900">Condition: {patient.condition}</p>
                </div>
                <Button onClick={() => handleViewDetails(patient)} variant="outline" className="w-full mt-2">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {!isLoading && filteredPatients.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-slate-600">No patients found matching your search.</p>
          </CardContent>
        </Card>
      )}

      <AddPatientDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onAdd={handleAddPatient} />
      <PatientDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        patient={selectedPatient}
      />
    </motion.div>
  )
}
