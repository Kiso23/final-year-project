"use client"

import { useState, useEffect } from "react"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { CardSkeleton, ChartSkeleton } from "@/components/skeleton-loader"
import { motion } from "framer-motion"

export default function DoctorDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-8 bg-white dark:bg-slate-900 min-h-screen"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Doctor Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Patient management and prescriptions</p>
      </div>

      {isLoading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChartSkeleton />
            </div>
            <ChartSkeleton />
          </div>
        </>
      ) : (
        <>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <OverviewCards role="doctor" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2">
              <ActivityChart />
            </div>
            <div>
              <RecentActivity />
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
