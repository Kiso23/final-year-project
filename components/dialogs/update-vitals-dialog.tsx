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
import { Activity, Thermometer, Heart, Weight, Wind } from "lucide-react"
import { motion } from "framer-motion"

interface UpdateVitalsDialogProps {
  patientName: string
  patientId: string
  onVitalsUpdate?: (vitals: any) => void
}

export function UpdateVitalsDialog({ patientName, patientId, onVitalsUpdate }: UpdateVitalsDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [vitals, setVitals] = useState({
    bp: "",
    temperature: "",
    pulse: "",
    respirationRate: "",
    weight: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setVitals((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    if (!vitals.bp || !vitals.temperature || !vitals.pulse) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields (BP, Temperature, Pulse)",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Vitals Updated Successfully",
      description: `Vitals recorded for ${patientName} (${patientId})`,
    })

    if (onVitalsUpdate) {
      onVitalsUpdate(vitals)
    }

    setVitals({
      bp: "",
      temperature: "",
      pulse: "",
      respirationRate: "",
      weight: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Update Vitals</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Patient Vitals</DialogTitle>
          <DialogDescription>
            {patientName} (ID: {patientId})
          </DialogDescription>
        </DialogHeader>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bp" className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Blood Pressure (mmHg) *
            </Label>
            <Input
              id="bp"
              placeholder="e.g., 120/80"
              value={vitals.bp}
              onChange={(e) => handleInputChange("bp", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature" className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-red-600" />
              Temperature (°F) *
            </Label>
            <Input
              id="temperature"
              placeholder="e.g., 98.6"
              value={vitals.temperature}
              onChange={(e) => handleInputChange("temperature", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pulse" className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-600" />
              Pulse (bpm) *
            </Label>
            <Input
              id="pulse"
              placeholder="e.g., 72"
              value={vitals.pulse}
              onChange={(e) => handleInputChange("pulse", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="respirationRate" className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-teal-600" />
              Respiration Rate (breaths/min)
            </Label>
            <Input
              id="respirationRate"
              placeholder="e.g., 16"
              value={vitals.respirationRate}
              onChange={(e) => handleInputChange("respirationRate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-2">
              <Weight className="w-4 h-4 text-orange-600" />
              Weight (kg)
            </Label>
            <Input
              id="weight"
              placeholder="e.g., 70"
              value={vitals.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Save Vitals
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
