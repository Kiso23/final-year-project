"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { motion } from "framer-motion"

const activities = [
  { id: 1, action: "Card Synced", user: "Raj Kumar", time: "2 mins ago" },
  { id: 2, action: "Prescription Issued", user: "Dr. Priya Sharma", time: "15 mins ago" },
  { id: 3, action: "Report Uploaded", user: "Lab #5", time: "1 hour ago" },
  { id: 4, action: "Payment Received", user: "Amit Patel", time: "2 hours ago" },
  { id: 5, action: "Card Read", user: "Nurse #12", time: "3 hours ago" },
]

export function RecentActivity() {
  return (
    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">Recent Activity</CardTitle>
        <CardDescription>Latest system events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0"
            >
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.action}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{activity.user}</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 flex-shrink-0 whitespace-nowrap">
                {activity.time}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
