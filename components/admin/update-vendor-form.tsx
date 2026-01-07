"use client"

import { useActionState } from "react"
import type { Vendor, VendorPricing, VendorFee } from "@/lib/db"
import { updateVendorDetailsAction } from "@/app/actions/update-vendor-details"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StarRating } from "./star-rating"
import { FollowUpSection } from "./follow-up-section"
import { Loader2 } from "lucide-react"

interface UpdateVendorFormProps {
  vendorDetails: {
    vendor: Vendor
    pricing: VendorPricing[]
    fees: VendorFee[]
  }
  onSuccess: () => void
}

export function UpdateVendorForm({ vendorDetails, onSuccess }: UpdateVendorFormProps) {
  const { vendor, pricing, fees } = vendorDetails
  const [state, formAction, isPending] = useActionState(updateVendorDetailsAction, null)

  if (state?.success) {
    onSuccess()
  }

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="vendorId" value={vendor.id} />

      {/* Lead Management Section */}
      <div className="p-4 bg-slate-50 rounded-lg border">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Lead Management</h3>
        <div className="space-y-4">
          <div>
            <Label>Lead Rating</Label>
            <StarRating name="lead_rating" defaultValue={vendor.lead_rating} />
          </div>
          <div>
            <Label htmlFor="next_follow_up_date">Next Follow-up Date</Label>
            <Input
              id="next_follow_up_date"
              name="next_follow_up_date"
              type="date"
              defaultValue={
                vendor.next_follow_up_date ? new Date(vendor.next_follow_up_date).toISOString().split("T")[0] : ""
              }
            />
          </div>
        </div>
      </div>

      {/* Follow-ups Section */}
      <div className="p-4 bg-slate-50 rounded-lg border">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Follow-up History</h3>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <FollowUpSection
              key={i}
              num={i}
              defaultDate={vendor[`follow_up_${i}_date` as keyof Vendor] as Date | undefined}
              defaultNotes={vendor[`follow_up_${i}_notes` as keyof Vendor] as string | undefined}
            />
          ))}
        </div>
      </div>

      {/* Vendor Info Display (Read-only) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-700">Submitted Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Name:</strong> {vendor.name}
          </p>
          <p>
            <strong>Email:</strong> {vendor.email}
          </p>
          <p>
            <strong>Phone:</strong> {vendor.phone || "N/A"}
          </p>
          <p>
            <strong>Business:</strong> {vendor.business_name || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {vendor.location || "N/A"}
          </p>
          <p>
            <strong>Work Area:</strong> {vendor.work_area || "N/A"}
          </p>
          <p>
            <strong>Trade:</strong> {vendor.trade_type}
          </p>
          <p>
            <strong>Licensed:</strong> {vendor.licensed ? "Yes" : "No"}
          </p>
          <p className="md:col-span-2">
            <strong>Specialty:</strong> {vendor.specialty || "N/A"}
          </p>
          {/* password is intentionally excluded from display */}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {state && !state.success && <p className="text-red-600 text-sm self-center">{state.message}</p>}
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  )
}
