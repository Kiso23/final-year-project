"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Calendar, Activity, X } from "lucide-react"

interface PatientDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  patient: any
}

export default function PatientDetailsDialog({ isOpen, onClose, patient }: PatientDetailsDialogProps) {
  if (!isOpen || !patient) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-96 overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>{patient.name}</CardTitle>
            <CardDescription>ID: {patient.id}</CardDescription>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-slate-900 mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-600">Age & Gender</p>
                  <p className="text-sm font-medium text-slate-900">
                    {patient.age} years • {patient.gender}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <p className="text-sm text-slate-600">{patient.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <p className="text-sm text-slate-600">{patient.email}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-4">Medical Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-600">Condition</p>
                  <p className="text-sm font-medium text-slate-900">{patient.condition}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-slate-400" />
                  <p className="text-sm text-slate-600">Status: {patient.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <p className="text-sm text-slate-600">Last Visit: {patient.lastVisit}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
