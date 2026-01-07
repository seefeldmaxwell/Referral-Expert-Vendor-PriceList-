"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HandymanForm } from "@/components/vendor-forms/handyman-form"
import { PlumberForm } from "@/components/vendor-forms/plumber-form"
import { HvacForm } from "@/components/vendor-forms/hvac-form"
import { RooferForm } from "@/components/vendor-forms/roofer-form"
import { GcForm } from "@/components/vendor-forms/gc-form"
import { submitVendorForm } from "@/app/actions/submit-vendor"
import { useActionState } from "react"

const formOptions = {
  handyman: { label: "Handyman", component: <HandymanForm /> },
  plumber: { label: "Plumber", component: <PlumberForm /> },
  hvac: { label: "HVAC", component: <HvacForm /> },
  roofer: { label: "Roofer", component: <RooferForm /> },
  gc: { label: "General Contractor", component: <GcForm /> },
}

type FormKey = keyof typeof formOptions

export default function PriceListQuestionnaire() {
  const [selectedForm, setSelectedForm] = useState<FormKey>("handyman")
  const [state, action, isPending] = useActionState(submitVendorForm, null)
  const router = useRouter()

  const handleFormChange = (value: string) => {
    setSelectedForm(value as FormKey)
  }

  // Handle redirect after successful submission
  useEffect(() => {
    if (state?.success && state?.redirect) {
      router.push(state.redirect)
    }
  }, [state, router])

  const SelectedComponent = formOptions[selectedForm].component

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Vendor Price List Submission</h1>
        <p className="mt-2 text-lg text-white max-w-2xl mx-auto">
          Please select your primary trade and fill out the form below to submit your pricing information. You'll also
          receive exclusive offers for jobs in your area.
        </p>
      </div>

      <form action={action}>
        <Card className="w-full border shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="representative">Our Representative (Optional)</Label>
                <Select name="representative">
                  <SelectTrigger id="representative">
                    <SelectValue placeholder="Select a representative" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chaya">Chaya</SelectItem>
                    <SelectItem value="cc">CC</SelectItem>
                    <SelectItem value="mike">Mike</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trade-selection">Select Your Primary Trade *</Label>
                <Select name="trade-type" onValueChange={handleFormChange} defaultValue={selectedForm} required>
                  <SelectTrigger id="trade-selection">
                    <SelectValue placeholder="Select your trade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(formOptions).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-t -mx-6 my-6" />
            {SelectedComponent}

            {state && !state.success && (
              <div className="mt-4 p-4 rounded-md bg-red-50 text-red-800">{state.message}</div>
            )}

            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                disabled={isPending}
                style={{ backgroundColor: "#003366" }}
                className="hover:opacity-90 w-full sm:w-auto"
              >
                {isPending ? "Submitting..." : "Submit Price List"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
