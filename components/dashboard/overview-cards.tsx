"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText, CreditCard, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface OverviewCardsProps {
  role: string
}

export function OverviewCards({ role }: OverviewCardsProps) {
  const getCards = () => {
    const baseCards = [
      { icon: Users, label: "Total Patients", value: "1,234", change: "+12%" },
      { icon: FileText, label: "Reports", value: "456", change: "+8%" },
    ]

    const roleSpecificCards: Record<string, any[]> = {
      admin: [
        { icon: Users, label: "Total Users", value: "2,847", change: "+15%" },
        { icon: FileText, label: "Total Reports", value: "5,234", change: "+23%" },
        { icon: CreditCard, label: "Pending Payments", value: "$45,230", change: "-5%" },
        { icon: TrendingUp, label: "System Health", value: "99.8%", change: "+0.2%" },
      ],
      doctor: [
        { icon: Users, label: "My Patients", value: "156", change: "+5%" },
        { icon: FileText, label: "Prescriptions", value: "89", change: "+12%" },
        { icon: CreditCard, label: "Consultations", value: "34", change: "+8%" },
        { icon: TrendingUp, label: "Avg Rating", value: "4.8/5", change: "+0.1" },
      ],
      nurse: [
        { icon: Users, label: "Assigned Patients", value: "42", change: "+3%" },
        { icon: FileText, label: "Vitals Recorded", value: "234", change: "+18%" },
        { icon: CreditCard, label: "Tasks Completed", value: "156", change: "+22%" },
        { icon: TrendingUp, label: "Efficiency", value: "94%", change: "+6%" },
      ],
      patient: [
        { icon: Users, label: "My Doctors", value: "3", change: "0%" },
        { icon: FileText, label: "Medical Records", value: "12", change: "+2" },
        { icon: CreditCard, label: "Outstanding Bills", value: "$450", change: "-$100" },
        { icon: TrendingUp, label: "Health Score", value: "85/100", change: "+5" },
      ],
    }

    return roleSpecificCards[role] || baseCards
  }

  const cards = getCards()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{card.label}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{card.value}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">{card.change}</p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-600/20 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
