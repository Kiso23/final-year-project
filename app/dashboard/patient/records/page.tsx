"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Calendar, User, Pill } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface MedicalRecord {
  id: string
  type: "prescription" | "report" | "appointment"
  title: string
  doctor: string
  date: string
  description: string
}

const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    type: "prescription",
    title: "Aspirin 500mg",
    doctor: "Dr. Priya Sharma",
    date: "2 days ago",
    description: "Take twice daily for 7 days",
  },
  {
    id: "2",
    type: "report",
    title: "Blood Test Results",
    doctor: "Lab Center",
    date: "1 week ago",
    description: "All values within normal range",
  },
  {
    id: "3",
    type: "appointment",
    title: "Follow-up Checkup",
    doctor: "Dr. Raj Verma",
    date: "Next Monday",
    description: "General health examination",
  },
  {
    id: "4",
    type: "prescription",
    title: "Vitamin D Supplement",
    doctor: "Dr. Priya Sharma",
    date: "2 weeks ago",
    description: "Take once daily",
  },
]

export default function PatientRecordsPage() {
  const { toast } = useToast()
  const [records, setRecords] = useState<MedicalRecord[]>(mockRecords)
  const [filterType, setFilterType] = useState<"all" | "prescription" | "report" | "appointment">("all")
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null)

  const filteredRecords = records.filter((r) => filterType === "all" || r.type === filterType)

  const handleDownload = (title: string) => {
    toast({
      title: "Download Started",
      description: `${title} is downloading...`,
    })
    setTimeout(() => {
      toast({
        title: "Download Completed",
        description: `${title} has been downloaded successfully`,
      })
    }, 2000)
  }

  const handleView = (recordId: string, title: string) => {
    setExpandedRecordId(expandedRecordId === recordId ? null : recordId)
    toast({
      title: "Record Opened",
      description: `Viewing ${title}`,
    })
  }

  const getRecordIcon = (type: string) => {
    switch (type) {
      case "prescription":
        return <Pill className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      case "report":
        return <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
      case "appointment":
        return <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      default:
        return <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
    }
  }

  const getRecordColor = (type: string) => {
    switch (type) {
      case "prescription":
        return "bg-blue-100 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400"
      case "report":
        return "bg-green-100 dark:bg-green-400/10 text-green-600 dark:text-green-400"
      case "appointment":
        return "bg-purple-100 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400"
      default:
        return "bg-slate-100 dark:bg-slate-400/10 text-slate-600 dark:text-slate-400"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-8 bg-white dark:bg-slate-900 min-h-screen"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Medical Records</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">View your prescriptions, reports, and appointments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Records",
            value: records.length,
            icon: FileText,
            color: "bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400",
          },
          {
            label: "Prescriptions",
            value: records.filter((r) => r.type === "prescription").length,
            icon: Pill,
            color: "bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400",
          },
          {
            label: "Reports",
            value: records.filter((r) => r.type === "report").length,
            icon: FileText,
            color: "bg-green-100 dark:bg-green-600/20 text-green-600 dark:text-green-400",
          },
          {
            label: "Appointments",
            value: records.filter((r) => r.type === "appointment").length,
            icon: Calendar,
            color: "bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400",
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
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</p>
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

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">Your Records</CardTitle>
            <CardDescription>All your medical documents and appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {(["all", "prescription", "report", "appointment"] as const).map((type) => (
                <Button
                  key={type}
                  onClick={() => setFilterType(type)}
                  variant={filterType === type ? "default" : "outline"}
                  className={
                    filterType === type
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }
                >
                  {type === "all"
                    ? "All"
                    : type === "prescription"
                      ? "Prescriptions"
                      : type === "report"
                        ? "Reports"
                        : "Appointments"}
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredRecords.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${getRecordColor(record.type)}`}>
                        {getRecordIcon(record.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 dark:text-white">{record.title}</p>
                        <div className="flex gap-4 text-xs text-slate-600 dark:text-slate-400 mt-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {record.doctor}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {record.date}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{record.description}</p>
                        {expandedRecordId === record.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-500 space-y-2"
                          >
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Full Details:</p>
                            <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-600">
                              <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                                {record.type === "prescription"
                                  ? `Prescription Details:\n\nMedicine: ${record.title}\nDosage: As per description\nDuration: 7 days\nPrescribed by: ${record.doctor}`
                                  : record.type === "report"
                                    ? `Report Details:\n\nReport Type: ${record.title}\nDate: ${record.date}\nStatus: ${record.description}\nIssued by: ${record.doctor}`
                                    : `Appointment Details:\n\nType: ${record.title}\nDate: ${record.date}\nDoctor: ${record.doctor}\nNotes: ${record.description}`}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleView(record.id, record.title)}
                        className={`transition-colors ${
                          expandedRecordId === record.id
                            ? "text-blue-600 dark:text-blue-400 bg-slate-200 dark:bg-slate-600"
                            : "text-blue-600 dark:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                        }`}
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownload(record.title)}
                        className="text-green-600 dark:text-green-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                        title="Download record"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
