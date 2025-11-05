"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

const DEMO_CREDENTIALS = [
  { role: "admin", email: "admin@hospital.com", name: "Admin" },
  { role: "doctor", email: "doctor@hospital.com", name: "Dr. Sharma" },
  { role: "nurse", email: "nurse@hospital.com", name: "Nurse Priya" },
  { role: "patient", email: "patient@hospital.com", name: "Patient" },
]

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"admin" | "doctor" | "nurse" | "patient">("patient")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    toast({
      title: "Signing in",
      description: "Please wait...",
    })

    // Simulate login - in production, this would call an API
    setTimeout(() => {
      // Store user session
      localStorage.setItem("userRole", role)
      localStorage.setItem("userEmail", email)

      toast({
        title: "Login Successful",
        description: `Welcome as ${role}`,
      })

      // Redirect based on role
      const dashboardRoutes: Record<string, string> = {
        admin: "/dashboard/admin",
        doctor: "/dashboard/doctor",
        nurse: "/dashboard/nurse",
        patient: "/dashboard/patient",
      }

      router.push(dashboardRoutes[role])
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 mb-2"
          >
            HealthHub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600"
          >
            Integrated Healthcare Management System
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Sign In</CardTitle>
              <CardDescription>Access your healthcare dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-slate-300 text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border-slate-300 text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 text-center">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign Up
                  </Link>
                </p>
                <p className="text-sm text-slate-600 text-center mb-4">Demo Credentials:</p>
                <div className="space-y-2 text-xs text-slate-600">
                  {DEMO_CREDENTIALS.map((cred) => (
                    <p key={cred.role}>
                      {cred.name}: {cred.email} / password
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
