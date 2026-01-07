"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, Mail, Phone } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

export default function SuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 min-h-screen" style={{ backgroundColor: "#003366" }}>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="w-full border shadow-lg bg-white">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-green-700">Submission Successful!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-slate-600 mb-4">
                    Thank you for submitting your vendor price list. Your information has been successfully received and
                    stored in our system.
                  </p>
                  <p className="text-slate-600">
                    Our team will review your submission and contact you within 24-48 hours regarding potential job
                    opportunities in your area.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Your pricing information is now in our vendor database</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>You'll receive exclusive job offers matching your trade and location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Our representatives will contact you for high-priority projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>You can update your pricing information anytime by resubmitting</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-800 mb-3">Need to contact us?</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-4 w-4" />
                      <span>office@globalpublicadjustersfla.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-4 w-4" />
                      <span>(833) 782-5246</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Submit Another Price List
                    </Button>
                  </Link>
                  <Button
                    style={{ backgroundColor: "#003366" }}
                    className="hover:opacity-90 flex-1"
                    onClick={() => window.close()}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
