"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Download, Eye, AlertCircle, CheckCircle } from "lucide-react"

interface Invoice {
  id: string
  invoiceNumber: string
  date: string
  amount: number
  status: "paid" | "pending" | "overdue"
  description: string
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    date: "Oct 15, 2024",
    amount: 7500,
    status: "paid",
    description: "General Checkup",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    date: "Oct 20, 2024",
    amount: 22500,
    status: "pending",
    description: "Lab Tests & X-Ray",
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    date: "Oct 25, 2024",
    amount: 10000,
    status: "overdue",
    description: "Specialist Consultation",
  },
]

export default function PatientBillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "overdue":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "overdue":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const totalOutstanding = invoices.filter((i) => i.status !== "paid").reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Billing & Invoices</h1>
        <p className="text-slate-600 mt-2">View and manage your medical bills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Invoices</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">{invoices.length}</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Paid</p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  ₹
                  {invoices
                    .filter((i) => i.status === "paid")
                    .reduce((sum, i) => sum + i.amount, 0)
                    .toLocaleString("en-IN")}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Outstanding</p>
                <p className="text-2xl font-bold text-red-600 mt-2">₹{totalOutstanding.toLocaleString("en-IN")}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Invoices</CardTitle>
          <CardDescription>Your billing history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 overflow-x-auto">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-medium text-slate-900">{invoice.invoiceNumber}</p>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded flex items-center gap-1 w-fit ${getStatusColor(invoice.status)}`}
                      >
                        {getStatusIcon(invoice.status)}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-sm text-slate-600">
                      <span>{invoice.date}</span>
                      <span>{invoice.description}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold text-slate-900">₹{invoice.amount.toLocaleString("en-IN")}</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
