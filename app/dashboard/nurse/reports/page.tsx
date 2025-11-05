"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardSkeleton } from "@/components/skeleton-loader"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Download, Calendar, User } from "lucide-react"
import { NewReportDialog } from "@/components/dialogs/new-report-dialog"

export default function NurseReportsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [reports, setReports] = useState([
    {
      id: "NR001",
      patientName: "Rajesh Kumar",
      patientId: "P001",
      type: "Vital Signs Report",
      date: "2024-01-15",
      shift: "Morning",
      status: "Completed",
    },
    {
      id: "NR002",
      patientName: "Priya Sharma",
      patientId: "P002",
      type: "Medication Administration",
      date: "2024-01-18",
      shift: "Evening",
      status: "Completed",
    },
    {
      id: "NR003",
      patientName: "Amit Patel",
      patientId: "P003",
      type: "Patient Assessment",
      date: "2024-01-10",
      shift: "Night",
      status: "Completed",
    },
    {
      id: "NR004",
      patientName: "Sneha Reddy",
      patientId: "P004",
      type: "Wound Care Report",
      date: "2024-01-20",
      shift: "Morning",
      status: "Pending Review",
    },
  ])
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleNewReport = (newReport: any) => {
    setReports([newReport, ...reports])
  }

  const handleDownload = (id: string) => {
    toast({
      title: "Downloading Report",
      description: `Report ${id} is being downloaded`,
    })
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
          <h1 className="text-3xl font-bold text-slate-900">Nursing Reports</h1>
          <p className="text-slate-600 mt-2">View and manage patient care reports</p>
        </div>
        <NewReportDialog onReportCreate={handleNewReport} />
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
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{report.type}</CardTitle>
                    <CardDescription>{report.id}</CardDescription>
                  </div>
                  <Badge variant={report.status === "Completed" ? "default" : "secondary"}>{report.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User className="w-4 h-4" />
                  <span>
                    {report.patientName} ({report.patientId})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {report.date} - {report.shift} Shift
                  </span>
                </div>
                <Button onClick={() => handleDownload(report.id)} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
