"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, TrendingUp, CheckCircle, AlertCircle, DollarSign } from "lucide-react"

interface Payment {
  id: string
  invoiceNumber: string
  patient: string
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
  method: string
}

const mockPayments: Payment[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    patient: "John Doe",
    amount: 7500,
    status: "completed",
    date: "Oct 15, 2024",
    method: "Credit Card",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    patient: "Jane Smith",
    amount: 22500,
    status: "pending",
    date: "Oct 20, 2024",
    method: "Bank Transfer",
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    patient: "Robert Johnson",
    amount: 10000,
    status: "completed",
    date: "Oct 18, 2024",
    method: "Credit Card",
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-004",
    patient: "Sarah Williams",
    amount: 16000,
    status: "failed",
    date: "Oct 22, 2024",
    method: "Credit Card",
  },
]

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments)

  const totalRevenue = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-500" />
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

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Payment Management</h1>
        <p className="text-slate-600 mt-2">Track and manage all hospital payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600 mt-2">₹{totalRevenue.toLocaleString("en-IN")}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-2">₹{pendingAmount.toLocaleString("en-IN")}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">
                  {payments.filter((p) => p.status === "completed").length}
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
                <p className="text-slate-600 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">{payments.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Payments</CardTitle>
          <CardDescription>All payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 overflow-x-auto">
            {payments.map((payment) => (
              <div key={payment.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-slate-900">{payment.patient}</p>
                        <p className="text-xs text-slate-600">{payment.invoiceNumber}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-xs text-slate-600">
                      <span>{payment.date}</span>
                      <span>{payment.method}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold text-slate-900">₹{payment.amount.toLocaleString("en-IN")}</p>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span className="text-xs font-medium capitalize">{payment.status}</span>
                    </div>
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
