"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { FileText } from "lucide-react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewReportDialogProps {
  onReportCreate?: (report: any) => void
}

export function NewReportDialog({ onReportCreate }: NewReportDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    reportType: "",
    shift: "",
    notes: "",
  })

  const reportTypes = [
    "Vital Signs Report",
    "Medication Administration",
    "Patient Assessment",
    "Wound Care Report",
    "Fluid Intake & Output",
    "Patient Education",
  ]

  const shifts = ["Morning", "Evening", "Night"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    if (!formData.patientName || !formData.patientId || !formData.reportType || !formData.shift) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newReport = {
      id: `NR${Date.now()}`,
      patientName: formData.patientName,
      patientId: formData.patientId,
      type: formData.reportType,
      date: new Date().toISOString().split("T")[0],
      shift: formData.shift,
      notes: formData.notes,
      status: "Completed",
    }

    toast({
      title: "Report Created Successfully",
      description: `New ${formData.reportType} created for ${formData.patientName}`,
    })

    if (onReportCreate) {
      onReportCreate(newReport)
    }

    setFormData({
      patientName: "",
      patientId: "",
      reportType: "",
      shift: "",
      notes: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
          <FileText className="w-4 h-4 mr-2" />
          New Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
          <DialogDescription>Fill in the report details for a patient</DialogDescription>
        </DialogHeader>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name *</Label>
            <Input
              id="patientName"
              placeholder="Enter patient name"
              value={formData.patientName}
              onChange={(e) => handleInputChange("patientName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="patientId">Patient ID *</Label>
            <Input
              id="patientId"
              placeholder="e.g., P001"
              value={formData.patientId}
              onChange={(e) => handleInputChange("patientId", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportType">Report Type *</Label>
            <Select value={formData.reportType} onValueChange={(value) => handleInputChange("reportType", value)}>
              <SelectTrigger id="reportType">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shift">Shift *</Label>
            <Select value={formData.shift} onValueChange={(value) => handleInputChange("shift", value)}>
              <SelectTrigger id="shift">
                <SelectValue placeholder="Select shift" />
              </SelectTrigger>
              <SelectContent>
                {shifts.map((shift) => (
                  <SelectItem key={shift} value={shift}>
                    {shift}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              placeholder="Additional notes or observations..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Create Report
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
