"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { X, Plus, Trash2 } from "lucide-react"

interface NewPrescriptionDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (prescription: any) => void
}

export default function NewPrescriptionDialog({ isOpen, onClose, onAdd }: NewPrescriptionDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    diagnosis: "",
    medications: [""],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMedicationChange = (index: number, value: string) => {
    const newMeds = [...formData.medications]
    newMeds[index] = value
    setFormData((prev) => ({ ...prev, medications: newMeds }))
  }

  const addMedicationField = () => {
    setFormData((prev) => ({ ...prev, medications: [...prev.medications, ""] }))
  }

  const removeMedicationField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.patientName || !formData.patientId || !formData.diagnosis) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
      })
      return
    }

    const validMeds = formData.medications.filter((med) => med.trim())
    if (validMeds.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one medication",
      })
      return
    }

    const newPrescription = {
      id: `RX${Date.now()}`,
      patientName: formData.patientName,
      patientId: formData.patientId,
      diagnosis: formData.diagnosis,
      medications: validMeds,
      date: new Date().toISOString().split("T")[0],
      status: "Active",
    }

    onAdd(newPrescription)

    toast({
      title: "Prescription Created",
      description: `Prescription for ${formData.patientName} created successfully`,
    })

    setFormData({ patientName: "", patientId: "", diagnosis: "", medications: [""] })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-96 overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>New Prescription</CardTitle>
            <CardDescription>Create a new prescription</CardDescription>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Patient Name*</label>
              <Input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Patient name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Patient ID*</label>
              <Input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                placeholder="e.g., P001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Diagnosis*</label>
              <Input
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                placeholder="Medical diagnosis"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Medications*</label>
              <div className="space-y-2">
                {formData.medications.map((med, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="text"
                      value={med}
                      onChange={(e) => handleMedicationChange(index, e.target.value)}
                      placeholder="e.g., Metformin 500mg"
                    />
                    {formData.medications.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeMedicationField(index)}
                        variant="outline"
                        size="sm"
                        className="px-3"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" onClick={addMedicationField} variant="outline" className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Medication
                </Button>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
