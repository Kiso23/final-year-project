"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Lock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function CheckoutPage() {
  const { toast } = useToast()
  const [step, setStep] = useState<"review" | "payment" | "confirmation">("review")
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const invoiceAmount = 22500

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Processing Payment",
      description: "Please wait while we process your payment...",
    })

    setTimeout(() => {
      setStep("confirmation")
      toast({
        title: "Payment Successful",
        description: `Payment of ₹${invoiceAmount.toLocaleString("en-IN")} has been processed`,
      })
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 space-y-8 min-h-screen bg-white"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Secure Payment</h1>
        <p className="text-slate-600 mt-2">Complete your payment securely</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {step === "review" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">Order Review</CardTitle>
                  <CardDescription>Review your invoice before payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-slate-900">
                      <span>Lab Tests & X-Ray</span>
                      <span>₹22,500</span>
                    </div>
                    <div className="flex justify-between text-slate-900">
                      <span>Consultation Fee</span>
                      <span>₹0</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-bold text-slate-900">
                      <span>Total</span>
                      <span>₹{invoiceAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setStep("payment")
                      toast({
                        title: "Proceeding to Payment",
                        description: "Enter your card details to continue",
                      })
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">Payment Information</CardTitle>
                  <CardDescription>Enter your card details securely</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Cardholder Name</label>
                      <Input
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        className="bg-white border-slate-300 text-slate-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="bg-white border-slate-300 text-slate-900"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                        <Input
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                          className="bg-white border-slate-300 text-slate-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">CVV</label>
                        <Input
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          className="bg-white border-slate-300 text-slate-900"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        onClick={() => {
                          setStep("review")
                          toast({
                            title: "Payment Cancelled",
                            description: "Returning to order review",
                          })
                        }}
                        variant="outline"
                        className="flex-1 text-slate-700 border-slate-300 hover:bg-slate-100"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                        <Lock className="w-4 h-4 mr-2" />
                        Pay ₹{invoiceAmount.toLocaleString("en-IN")}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "confirmation" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white border-slate-200">
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex justify-center mb-6"
                  >
                    <div className="bg-green-100 p-4 rounded-full">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  </motion.div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful</h2>
                  <p className="text-slate-600 mb-6">Your payment has been processed successfully</p>
                  <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
                    <div className="flex justify-between text-slate-900 mb-2">
                      <span>Transaction ID:</span>
                      <span className="font-mono">TXN-2024-001234</span>
                    </div>
                    <div className="flex justify-between text-slate-900 mb-2">
                      <span>Amount:</span>
                      <span>₹{invoiceAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Download Receipt</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        <div>
          <Card className="bg-white border-slate-200 sticky top-8">
            <CardHeader>
              <CardTitle className="text-slate-900">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-slate-600 uppercase">Invoice</p>
                <p className="text-slate-900 font-medium mt-1">INV-2024-002</p>
              </div>

              <div>
                <p className="text-xs text-slate-600 uppercase">Amount Due</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">₹{invoiceAmount.toLocaleString("en-IN")}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-700">
                  <Lock className="w-4 h-4" />
                  <span className="text-xs font-medium">Secure Payment</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600">Payment Methods Accepted</p>
                <div className="flex gap-2 mt-3">
                  <div className="flex-1 bg-slate-100 rounded p-2 text-center">
                    <CreditCard className="w-4 h-4 text-blue-600 mx-auto" />
                  </div>
                  <div className="flex-1 bg-slate-100 rounded p-2 text-center">
                    <span className="text-xs text-slate-600">Bank</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
