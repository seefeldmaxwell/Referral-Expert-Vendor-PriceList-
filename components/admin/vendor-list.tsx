import type { Vendor } from "@/lib/db"
import { VendorCard } from "./vendor-card"

interface VendorListProps {
  vendors: Vendor[]
}

export function VendorList({ vendors }: VendorListProps) {
  if (vendors.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold text-slate-700">No Vendors Found</h3>
        <p className="text-slate-500 mt-2">Try adjusting your search filters or wait for new submissions.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  )
}
