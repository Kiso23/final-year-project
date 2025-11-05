"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"

interface AddPatientDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (patient: any) => void
}

export default function AddPatientDialog({ isOpen, onClose, onAdd }: AddPatientDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    condition: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.age || !formData.phone || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
      })
      return
    }

    const newPatient = {
      ...formData,
      id: `P${Date.now()}`,
      lastVisit: new Date().toISOString().split("T")[0],
      status: "Active",
    }

    onAdd(newPatient)

    toast({
      title: "Patient Added",
      description: `${formData.name} has been added successfully`,
    })

    setFormData({ name: "", age: "", gender: "", phone: "", email: "", condition: "" })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Add New Patient</CardTitle>
            <CardDescription>Fill in the patient information</CardDescription>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Name*</label>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Patient name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">Age*</label>
                <Input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Phone*</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Email*</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="patient@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Condition</label>
              <Input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                placeholder="Medical condition"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Add Patient
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
