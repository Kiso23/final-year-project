"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CardSkeleton } from "@/components/skeleton-loader"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Search, UserPlus, Mail, Shield, Edit, Trash2 } from "lucide-react"

export default function AdminUsersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const users = [
    {
      id: "U001",
      name: "Dr. Arun Mehta",
      email: "arun.mehta@hospital.com",
      role: "Doctor",
      department: "Cardiology",
      status: "Active",
    },
    {
      id: "U002",
      name: "Dr. Kavita Desai",
      email: "kavita.desai@hospital.com",
      role: "Doctor",
      department: "Pediatrics",
      status: "Active",
    },
    {
      id: "U003",
      name: "Nurse Sunita Rao",
      email: "sunita.rao@hospital.com",
      role: "Nurse",
      department: "Emergency",
      status: "Active",
    },
    {
      id: "U004",
      name: "Nurse Ramesh Kumar",
      email: "ramesh.kumar@hospital.com",
      role: "Nurse",
      department: "ICU",
      status: "Active",
    },
    {
      id: "U005",
      name: "Admin Priya Singh",
      email: "priya.singh@hospital.com",
      role: "Admin",
      department: "Administration",
      status: "Active",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEdit = (userName: string) => {
    toast({
      title: "Edit User",
      description: `Editing ${userName}`,
    })
  }

  const handleDelete = (userName: string) => {
    toast({
      title: "Delete User",
      description: `${userName} has been removed`,
      variant: "destructive",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-6 bg-white min-h-screen"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-600 mt-2">Manage system users and permissions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
          <CardDescription>Search by name, email, or role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>{user.id}</CardDescription>
                  </div>
                  <Badge variant="default">{user.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Shield className="w-4 h-4" />
                  <span>
                    {user.role} - {user.department}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(user.name)} variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.name)}
                    variant="outline"
                    className="flex-1 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
