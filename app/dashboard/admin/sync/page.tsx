"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Download, Upload, CheckCircle, AlertCircle, Clock, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface SyncOperation {
  id: string
  type: "upload" | "download"
  fileName: string
  status: "completed" | "pending" | "failed"
  progress: number
  timestamp: string
  size: string
}

const mockOperations: SyncOperation[] = [
  {
    id: "1",
    type: "upload",
    fileName: "patient_report_001.pdf",
    status: "completed",
    progress: 100,
    timestamp: "2 hours ago",
    size: "2.4 MB",
  },
  {
    id: "2",
    type: "download",
    fileName: "prescription_batch.zip",
    status: "completed",
    progress: 100,
    timestamp: "1 hour ago",
    size: "5.1 MB",
  },
  {
    id: "3",
    type: "upload",
    fileName: "lab_results_002.pdf",
    status: "pending",
    progress: 65,
    timestamp: "5 minutes ago",
    size: "1.8 MB",
  },
  {
    id: "4",
    type: "download",
    fileName: "patient_history.json",
    status: "completed",
    progress: 100,
    timestamp: "30 minutes ago",
    size: "3.2 MB",
  },
]

export default function CloudSyncPage() {
  const { toast } = useToast()
  const [operations, setOperations] = useState<SyncOperation[]>(mockOperations)
  const [filter, setFilter] = useState<"all" | "upload" | "download">("all")
  const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set())

  const filteredOperations = operations.filter((op) => filter === "all" || op.type === filter)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const handleSync = () => {
    toast({
      title: "Sync Started",
      description: "Synchronizing all files to cloud...",
    })
    setTimeout(() => {
      toast({
        title: "Sync Completed",
        description: "All files synchronized successfully",
      })
    }, 2000)
  }

  const handleDownloadAll = () => {
    toast({
      title: "Download Started",
      description: "Downloading all files...",
    })
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "All files downloaded successfully",
      })
    }, 1500)
  }

  const toggleHideItem = (id: string) => {
    setHiddenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
        toast({
          title: "File Visible",
          description: "File is now visible",
        })
      } else {
        newSet.add(id)
        toast({
          title: "File Hidden",
          description: "File is now hidden from list",
        })
      }
      return newSet
    })
  }

  const handleDownload = (fileName: string, id: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}...`,
    })
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${fileName} downloaded successfully`,
      })
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-8 bg-white min-h-screen"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Cloud Sync and Storage</h1>
        <p className="text-slate-600 mt-2">Manage file uploads, downloads and synchronization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Operations",
            value: operations.length,
            icon: Cloud,
            color: "bg-blue-100 text-blue-600",
          },
          {
            label: "Completed",
            value: operations.filter((o) => o.status === "completed").length,
            icon: CheckCircle,
            color: "bg-green-100 text-green-600",
          },
          {
            label: "Pending",
            value: operations.filter((o) => o.status === "pending").length,
            icon: Clock,
            color: "bg-yellow-100 text-yellow-600",
          },
          {
            label: "Total Size",
            value: "12.5 GB",
            icon: Zap,
            color: "bg-blue-100 text-blue-600",
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
              <Card className="bg-white border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
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
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Sync Operations</CardTitle>
            <CardDescription>Upload and download history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {(["all", "upload", "download"] as const).map((f) => (
                <Button
                  key={f}
                  onClick={() => setFilter(f)}
                  variant={filter === f ? "default" : "outline"}
                  className={
                    filter === f
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-slate-700 border-slate-300 hover:bg-slate-100"
                  }
                >
                  {f === "all" ? "All" : f === "upload" ? "Upload" : "Download"}
                </Button>
              ))}
              <div className="flex-grow" />
              <Button onClick={handleSync} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Cloud className="w-4 h-4 mr-2" />
                Sync Now
              </Button>
              <Button onClick={handleDownloadAll} className="bg-green-600 hover:bg-green-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>

            <div className="space-y-3">
              {filteredOperations.map(
                (op, index) =>
                  !hiddenItems.has(op.id) && (
                    <motion.div
                      key={op.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1">
                          {op.type === "upload" ? (
                            <Upload className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          ) : (
                            <Download className="w-5 h-5 text-green-600 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 truncate">{op.fileName}</p>
                            <p className="text-xs text-slate-600">{op.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {op.status === "completed" && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {op.status === "pending" && <Clock className="w-5 h-5 text-yellow-600" />}
                          {op.status === "failed" && <AlertCircle className="w-5 h-5 text-red-600" />}
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${
                              op.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : op.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {op.status === "completed" ? "Completed" : op.status === "pending" ? "Pending" : "Failed"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs text-slate-600">
                          <span>Progress</span>
                          <span>{op.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-300 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${op.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 text-right">{op.timestamp}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleDownload(op.fileName, op.id)}
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button
                          onClick={() => toggleHideItem(op.id)}
                          size="sm"
                          variant="outline"
                          className="px-3 text-xs"
                        >
                          Hide
                        </Button>
                      </div>
                    </motion.div>
                  ),
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
