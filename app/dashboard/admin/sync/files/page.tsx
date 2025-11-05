"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, ImageIcon, Download, Trash2, Eye, Search, Filter } from "lucide-react"

interface StorageFile {
  id: string
  name: string
  type: "pdf" | "image" | "document"
  size: string
  uploadedBy: string
  uploadedAt: string
  hospital: string
}

const mockFiles: StorageFile[] = [
  {
    id: "1",
    name: "patient_report_001.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: "Dr. Smith",
    uploadedAt: "2 hours ago",
    hospital: "Central Hospital",
  },
  {
    id: "2",
    name: "xray_scan_patient_234.jpg",
    type: "image",
    size: "5.1 MB",
    uploadedBy: "Nurse Johnson",
    uploadedAt: "1 hour ago",
    hospital: "City Medical Center",
  },
  {
    id: "3",
    name: "lab_results_batch.pdf",
    type: "pdf",
    size: "1.8 MB",
    uploadedBy: "Lab Technician",
    uploadedAt: "30 min ago",
    hospital: "Central Hospital",
  },
  {
    id: "4",
    name: "ct_scan_patient_567.png",
    type: "image",
    size: "8.2 MB",
    uploadedBy: "Dr. Wilson",
    uploadedAt: "15 min ago",
    hospital: "City Medical Center",
  },
]

export default function FilesPage() {
  const [files, setFiles] = useState<StorageFile[]>(mockFiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "pdf" | "image" | "document">("all")

  const filteredFiles = files.filter(
    (file) =>
      (filterType === "all" || file.type === filterType) && file.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-400" />
      case "image":
        return <ImageIcon className="w-5 h-5 text-blue-400" />
      default:
        return <FileText className="w-5 h-5 text-slate-400" />
    }
  }

  const handleDelete = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">File Manager</h1>
        <p className="text-slate-400 mt-2">Browse and manage uploaded medical files</p>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Medical Files</CardTitle>
          <CardDescription>All uploaded documents and images</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <Button variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="flex gap-2">
            {(["all", "pdf", "image", "document"] as const).map((type) => (
              <Button
                key={type}
                onClick={() => setFilterType(type)}
                variant={filterType === type ? "default" : "outline"}
                className={
                  filterType === type
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-slate-300 border-slate-600 hover:bg-slate-700"
                }
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="p-4 bg-slate-700 rounded-lg border border-slate-600 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{file.name}</p>
                      <div className="flex gap-4 text-xs text-slate-400 mt-1">
                        <span>{file.size}</span>
                        <span>{file.uploadedBy}</span>
                        <span>{file.hospital}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{file.uploadedAt}</span>
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-slate-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-green-400 hover:bg-slate-600">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:bg-slate-600"
                      onClick={() => handleDelete(file.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
