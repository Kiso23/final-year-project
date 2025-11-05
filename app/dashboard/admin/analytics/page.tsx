"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download } from "lucide-react"

const visitData = [
  { month: "Jan", visits: 400, patients: 240, syncs: 180 },
  { month: "Feb", visits: 520, patients: 320, syncs: 220 },
  { month: "Mar", visits: 480, patients: 280, syncs: 200 },
  { month: "Apr", visits: 620, patients: 390, syncs: 280 },
  { month: "May", visits: 750, patients: 450, syncs: 320 },
  { month: "Jun", visits: 890, patients: 520, syncs: 380 },
]

const departmentData = [
  { name: "Cardiology", value: 280, fill: "#3b82f6" },
  { name: "Neurology", value: 220, fill: "#10b981" },
  { name: "Orthopedics", value: 180, fill: "#f59e0b" },
  { name: "Pediatrics", value: 150, fill: "#8b5cf6" },
  { name: "Others", value: 170, fill: "#ec4899" },
]

const paymentData = [
  { month: "Jan", completed: 12000, pending: 3000, failed: 1000 },
  { month: "Feb", completed: 15000, pending: 4000, failed: 800 },
  { month: "Mar", completed: 14000, pending: 3500, failed: 1200 },
  { month: "Apr", completed: 18000, pending: 5000, failed: 900 },
  { month: "May", completed: 21000, pending: 6000, failed: 1100 },
  { month: "Jun", completed: 24000, pending: 7000, failed: 1300 },
]

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("6m")

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-slate-400 mt-2">System performance and usage metrics</p>
        </div>
        <div className="flex gap-2">
          {(["1m", "3m", "6m", "1y"] as const).map((range) => (
            <Button
              key={range}
              onClick={() => setTimeRange(range)}
              variant={timeRange === range ? "default" : "outline"}
              className={
                timeRange === range
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "text-slate-300 border-slate-600 hover:bg-slate-700"
              }
            >
              {range === "1m" ? "1 Month" : range === "3m" ? "3 Months" : range === "6m" ? "6 Months" : "1 Year"}
            </Button>
          ))}
          <Button variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Patient Visits & Syncs</CardTitle>
            <CardDescription>Monthly trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Legend />
                <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="syncs" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Department Distribution</CardTitle>
            <CardDescription>Patient visits by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Payment Analytics</CardTitle>
          <CardDescription>Revenue trends and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" />
              <Bar dataKey="pending" fill="#f59e0b" />
              <Bar dataKey="failed" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-slate-400 uppercase">Avg Visits/Day</p>
              <p className="text-2xl font-bold text-white mt-2">148</p>
              <p className="text-xs text-green-400 mt-1">+12% from last month</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Sync Success Rate</p>
              <p className="text-2xl font-bold text-white mt-2">98.5%</p>
              <p className="text-xs text-green-400 mt-1">+2% from last month</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Avg Response Time</p>
              <p className="text-2xl font-bold text-white mt-2">245ms</p>
              <p className="text-xs text-green-400 mt-1">-15% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">User Growth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-slate-400 uppercase">Total Users</p>
              <p className="text-2xl font-bold text-white mt-2">2,847</p>
              <p className="text-xs text-green-400 mt-1">+156 this month</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Active Users</p>
              <p className="text-2xl font-bold text-white mt-2">1,923</p>
              <p className="text-xs text-green-400 mt-1">67.6% engagement</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">New Registrations</p>
              <p className="text-2xl font-bold text-white mt-2">234</p>
              <p className="text-xs text-green-400 mt-1">+45% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-slate-400 uppercase">Uptime</p>
              <p className="text-2xl font-bold text-white mt-2">99.8%</p>
              <p className="text-xs text-green-400 mt-1">Excellent</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">API Calls/Day</p>
              <p className="text-2xl font-bold text-white mt-2">1.2M</p>
              <p className="text-xs text-green-400 mt-1">+8% from last month</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Storage Used</p>
              <p className="text-2xl font-bold text-white mt-2">245 GB</p>
              <p className="text-xs text-yellow-400 mt-1">68% capacity</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
