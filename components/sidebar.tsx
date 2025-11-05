"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Smartphone,
  Cloud,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Users,
  FileText,
  Menu,
  X,
} from "lucide-react"

interface SidebarProps {
  role: string
}

export function Sidebar({ role }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    })

    router.push("/")
  }

  const getMenuItems = () => {
    const baseItems = [{ icon: LayoutDashboard, label: "Dashboard", href: `/dashboard/${role}` }]

    const roleSpecificItems: Record<string, any[]> = {
      admin: [
        { icon: Users, label: "User Management", href: `/dashboard/${role}/users` },
        { icon: Smartphone, label: "NFC Cards", href: `/dashboard/${role}/nfc` },
        { icon: Cloud, label: "Cloud Sync", href: `/dashboard/${role}/sync` },
        { icon: BarChart3, label: "Analytics", href: `/dashboard/${role}/analytics` },
        { icon: CreditCard, label: "Payments", href: `/dashboard/${role}/payments` },
      ],
      doctor: [
        { icon: Users, label: "Patients", href: `/dashboard/${role}/patients` },
        { icon: Smartphone, label: "NFC Cards", href: `/dashboard/${role}/nfc` },
        { icon: Cloud, label: "Cloud Sync", href: `/dashboard/${role}/sync` },
        { icon: FileText, label: "Prescriptions", href: `/dashboard/${role}/prescriptions` },
      ],
      nurse: [
        { icon: Users, label: "Patients", href: `/dashboard/${role}/patients` },
        { icon: Smartphone, label: "NFC Cards", href: `/dashboard/${role}/nfc` },
        { icon: FileText, label: "Reports", href: `/dashboard/${role}/reports` },
      ],
      patient: [
        { icon: FileText, label: "Medical Records", href: `/dashboard/${role}/records` },
        { icon: CreditCard, label: "Billing", href: `/dashboard/${role}/billing` },
        { icon: Smartphone, label: "My Card", href: `/dashboard/${role}/card` },
        { icon: CreditCard, label: "Checkout", href: `/dashboard/${role}/checkout` },
      ],
    }

    return [...baseItems, ...(roleSpecificItems[role] || [])]
  }

  const menuItems = getMenuItems()

  const roleLabels: Record<string, string> = {
    admin: "Administrator",
    doctor: "Doctor",
    nurse: "Nurse",
    patient: "Patient",
  }

  return (
    <motion.div
      animate={{ width: isCollapsed ? "80px" : "256px" }}
      transition={{ duration: 0.3 }}
      className="bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0"
    >
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        {!isCollapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className="text-xl font-bold text-slate-900">HealthHub</h2>
            <p className="text-xs text-slate-600 mt-1 capitalize">{roleLabels[role] || role}</p>
          </motion.div>
        )}
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="ghost"
          size="sm"
          className="ml-auto text-slate-700 hover:bg-slate-100"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  isActive ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-slate-700 hover:bg-slate-100"
                } ${isCollapsed ? "px-2" : ""}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 space-y-2">
        <Link href="/dashboard/settings">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-slate-700 hover:bg-slate-100 ${isCollapsed ? "px-2" : ""}`}
            title={isCollapsed ? "Settings" : undefined}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Settings</span>}
          </Button>
        </Link>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={`w-full justify-start gap-3 text-red-600 hover:bg-red-50 ${isCollapsed ? "px-2" : ""}`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span className="truncate">Logout</span>}
        </Button>
      </div>
    </motion.div>
  )
}
