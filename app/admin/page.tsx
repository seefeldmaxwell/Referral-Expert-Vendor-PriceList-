import { searchVendors } from "@/lib/vendor-service"
import { SiteHeader } from "@/components/site-header"
import { SearchVendorsForm } from "@/components/admin/search-vendors-form"
import { VendorList } from "@/components/admin/vendor-list"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: {
    work_area?: string
    business_name?: string
    representative?: string
    query?: string
  }
}) {
  const workArea = searchParams?.work_area || ""
  const businessName = searchParams?.business_name || ""
  const representative = searchParams?.representative || ""

  const vendors = await searchVendors({
    work_area: workArea,
    business_name: businessName,
    representative: representative,
  })

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Vendor Dashboard</h1>
            <p className="mt-2 text-lg text-slate-600">Search, view, and manage vendor submissions.</p>
          </div>

          <SearchVendorsForm />

          <div className="border-t my-8" />

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            }
          >
            <VendorList vendors={vendors} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
