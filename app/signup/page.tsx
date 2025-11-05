"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [signupMethod, setSignupMethod] = useState<"email" | "phone" | "google">("email")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "patient" as "patient" | "doctor" | "nurse" | "admin",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      })
      return false
    }

    if (signupMethod === "email") {
      if (!formData.email.trim()) {
        toast({
          title: "Error",
          description: "Please enter your email",
          variant: "destructive",
        })
        return false
      }
      if (formData.password.length < 6) {
        toast({
          title: "Error",
          description: "Password must be at least 6 characters",
          variant: "destructive",
        })
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        })
        return false
      }
    }

    if (signupMethod === "phone") {
      if (!formData.phone.trim()) {
        toast({
          title: "Error",
          description: "Please enter your phone number",
          variant: "destructive",
        })
        return false
      }
      if (formData.phone.length < 10) {
        toast({
          title: "Error",
          description: "Please enter a valid phone number",
          variant: "destructive",
        })
        return false
      }
    }

    return true
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    toast({
      title: "Creating Account",
      description: "Please wait...",
    })

    // Simulate signup - in production, this would call an API
    setTimeout(() => {
      // Store user session
      localStorage.setItem("userRole", formData.role)
      localStorage.setItem("userName", formData.name)
      if (signupMethod === "email") {
        localStorage.setItem("userEmail", formData.email)
      } else if (signupMethod === "phone") {
        localStorage.setItem("userPhone", formData.phone)
      }

      toast({
        title: "Account Created",
        description: `Welcome ${formData.name}!`,
      })

      // Redirect based on role
      const dashboardRoutes: Record<string, string> = {
        admin: "/dashboard/admin",
        doctor: "/dashboard/doctor",
        nurse: "/dashboard/nurse",
        patient: "/dashboard/patient",
      }

      router.push(dashboardRoutes[formData.role])
      setIsLoading(false)
    }, 500)
  }

  const handleGoogleSignup = async () => {
    setIsLoading(true)

    toast({
      title: "Redirecting to Google",
      description: "Please wait...",
    })

    // Simulate Google signup - in production, this would use a real OAuth flow
    setTimeout(() => {
      localStorage.setItem("userRole", formData.role)
      localStorage.setItem("userName", "Google User")
      localStorage.setItem("authMethod", "google")

      toast({
        title: "Signed Up Successfully",
        description: "Welcome!",
      })

      const dashboardRoutes: Record<string, string> = {
        admin: "/dashboard/admin",
        doctor: "/dashboard/doctor",
        nurse: "/dashboard/nurse",
        patient: "/dashboard/patient",
      }

      router.push(dashboardRoutes[formData.role])
      setIsLoading(false)
    }, 500)
  }

  const handlePhoneSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    toast({
      title: "Sending OTP",
      description: `OTP sent to ${formData.phone}`,
    })

    // Simulate OTP - in production, this would send a real SMS
    setTimeout(() => {
      toast({
        title: "OTP Verified",
        description: "Account created successfully",
      })

      localStorage.setItem("userRole", formData.role)
      localStorage.setItem("userName", formData.name)
      localStorage.setItem("userPhone", formData.phone)

      const dashboardRoutes: Record<string, string> = {
        admin: "/dashboard/admin",
        doctor: "/dashboard/doctor",
        nurse: "/dashboard/nurse",
        patient: "/dashboard/patient",
      }

      router.push(dashboardRoutes[formData.role])
      setIsLoading(false)
    }, 1000)
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
            Create your healthcare account
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Sign Up</CardTitle>
              <CardDescription>Choose your preferred signup method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-6">
                <Button
                  type="button"
                  variant={signupMethod === "email" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSignupMethod("email")}
                  className="flex-1"
                >
                  Email
                </Button>
                <Button
                  type="button"
                  variant={signupMethod === "phone" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSignupMethod("phone")}
                  className="flex-1"
                >
                  Phone
                </Button>
                <Button
                  type="button"
                  variant={signupMethod === "google" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSignupMethod("google")}
                  className="flex-1"
                >
                  Google
                </Button>
              </div>

              {signupMethod === "google" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  <Button
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Sign Up with Google
                  </Button>
                </div>
              ) : (
                <form onSubmit={signupMethod === "phone" ? handlePhoneSignup : handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white border-slate-300 text-slate-900"
                      required
                    />
                  </div>

                  {signupMethod === "email" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-white border-slate-300 text-slate-900"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                        <Input
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="bg-white border-slate-300 text-slate-900"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                        <Input
                          type="password"
                          name="confirmPassword"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="bg-white border-slate-300 text-slate-900"
                          required
                        />
                      </div>
                    </>
                  )}

                  {signupMethod === "phone" && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <div className="flex gap-2">
                        <select className="w-16 px-2 py-2 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>+91</option>
                          <option>+1</option>
                          <option>+44</option>
                        </select>
                        <Input
                          type="tel"
                          name="phone"
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-white border-slate-300 text-slate-900 flex-1"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Button>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 text-center">
                  Already have an account?{" "}
                  <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
