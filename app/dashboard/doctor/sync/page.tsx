"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, ImageIcon, Download, Eye } from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  type: "pdf" | "image"
  size: string
  uploadedAt: string
  patient: string
}

const mockFiles: UploadedFile[] = [
  {
    id: "1",
    name: "patient_report_001.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedAt: "2 hours ago",
    patient: "John Doe",
  },
  {
    id: "2",
    name: "xray_scan.jpg",
    type: "image",
    size: "5.1 MB",
    uploadedAt: "1 hour ago",
    patient: "Jane Smith",
  },
]

export default function DoctorSyncPage() {
  const [files, setFiles] = useState<UploadedFile[]>(mockFiles)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const getFileIcon = (type: string) => {
    return type === "pdf" ? (
      <FileText className="w-5 h-5 text-red-400" />
    ) : (
      <ImageIcon className="w-5 h-5 text-blue-400" />
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Upload & Manage Files</h1>
        <p className="text-slate-400 mt-2">Upload prescriptions, reports, and medical documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Files</p>
                <p className="text-2xl font-bold text-white mt-2">{files.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Size</p>
                <p className="text-2xl font-bold text-white mt-2">7.5 MB</p>
              </div>
              <Upload className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <Button
              onClick={() => setShowUploadModal(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">My Files</CardTitle>
          <CardDescription>Files you have uploaded</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{file.name}</p>
                      <div className="flex gap-4 text-xs text-slate-400 mt-1">
                        <span>{file.size}</span>
                        <span>{file.patient}</span>
                        <span>{file.uploadedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-slate-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-green-400 hover:bg-slate-600">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-white">Upload Medical File</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Select Patient</label>
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Robert Johnson</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">File Type</label>
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Prescription</option>
                  <option>Lab Report</option>
                  <option>X-Ray</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Drag and drop your file here</p>
                <p className="text-xs text-slate-500 mt-1">or click to browse</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setShowUploadModal(false)}
                  variant="outline"
                  className="flex-1 text-slate-300 border-slate-600 hover:bg-slate-700"
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Upload</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
