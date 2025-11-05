"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const data = [
  { name: "Mon", visits: 240, prescriptions: 120, syncs: 180 },
  { name: "Tue", visits: 320, prescriptions: 150, syncs: 220 },
  { name: "Wed", visits: 280, prescriptions: 140, syncs: 200 },
  { name: "Thu", visits: 390, prescriptions: 180, syncs: 280 },
  { name: "Fri", visits: 450, prescriptions: 210, syncs: 320 },
  { name: "Sat", visits: 380, prescriptions: 190, syncs: 290 },
  { name: "Sun", visits: 320, prescriptions: 160, syncs: 240 },
]

export function ActivityChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">Weekly Activity</CardTitle>
        <CardDescription>Patient visits, prescriptions and syncs</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#475569" : "#e2e8f0"} />
            <XAxis stroke={isDark ? "#94a3b8" : "#64748b"} />
            <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1e293b" : "#ffffff",
                border: `1px solid ${isDark ? "#475569" : "#e2e8f0"}`,
                borderRadius: "8px",
              }}
              labelStyle={{ color: isDark ? "#e2e8f0" : "#0f172a" }}
            />
            <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="prescriptions" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="syncs" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
