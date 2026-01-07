import type { Vendor } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, User, Building, MapPin, Briefcase } from "lucide-react"
import { VendorDetailsModal } from "./vendor-details-modal"

interface VendorCardProps {
  vendor: Vendor
}

export function VendorCard({ vendor }: VendorCardProps) {
  const tradeColors: { [key: string]: string } = {
    handyman: "bg-sky-100 text-sky-800",
    plumber: "bg-blue-100 text-blue-800",
    hvac: "bg-orange-100 text-orange-800",
    roofer: "bg-slate-200 text-slate-800",
    gc: "bg-amber-100 text-amber-800",
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-slate-800">{vendor.name}</CardTitle>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-5 w-5" />
            <span className="font-bold text-lg">{vendor.lead_rating || "N/A"}</span>
          </div>
        </div>
        <CardDescription className="flex items-center gap-2 text-sm text-slate-500">
          <Building className="h-4 w-4" />
          {vendor.business_name || "N/A"}
        </CardDescription>
        <Badge variant="secondary" className={`mt-2 w-fit ${tradeColors[vendor.trade_type] || "bg-gray-100"}`}>
          {vendor.trade_type}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="h-4 w-4" />
          <span>
            Based in <span className="font-medium">{vendor.location || "N/A"}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Briefcase className="h-4 w-4" />
          <span>
            Works in <span className="font-medium">{vendor.work_area || "N/A"}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <User className="h-4 w-4" />
          <span>
            Rep: <span className="font-medium">{vendor.representative || "N/A"}</span>
          </span>
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <VendorDetailsModal vendorId={vendor.id!} />
      </div>
    </Card>
  )
}
