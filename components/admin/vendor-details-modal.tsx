"use client"

import { useState } from "react"
import { getVendorWithPricing } from "@/lib/vendor-service"
import type { Vendor, VendorPricing, VendorFee } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Pencil } from "lucide-react"
import { UpdateVendorForm } from "./update-vendor-form"

interface VendorDetailsModalProps {
  vendorId: number
}

type VendorDetails = {
  vendor: Vendor
  pricing: VendorPricing[]
  fees: VendorFee[]
}

export function VendorDetailsModal({ vendorId }: VendorDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [details, setDetails] = useState<VendorDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open)
    if (open && !details) {
      setIsLoading(true)
      try {
        const data = await getVendorWithPricing(vendorId)
        setDetails(data)
      } catch (error) {
        console.error("Failed to fetch vendor details", error)
        // You could add a toast notification here
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Pencil className="h-4 w-4 mr-2" />
          View & Edit Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vendor Details</DialogTitle>
        </DialogHeader>
        {isLoading && (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
          </div>
        )}
        {details && <UpdateVendorForm vendorDetails={details} onSuccess={() => setIsOpen(false)} />}
      </DialogContent>
    </Dialog>
  )
}
