"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

export function SearchVendorsForm() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((formData: FormData) => {
    const params = new URLSearchParams(searchParams)
    const work_area = formData.get("work_area") as string
    const business_name = formData.get("business_name") as string
    const representative = formData.get("representative") as string

    if (work_area) params.set("work_area", work_area)
    else params.delete("work_area")
    if (business_name) params.set("business_name", business_name)
    else params.delete("business_name")
    if (representative) params.set("representative", representative)
    else params.delete("representative")

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  const clearSearch = () => {
    replace(pathname)
  }

  return (
    <form
      onChange={(e) => handleSearch(new FormData(e.currentTarget))}
      className="bg-white p-6 rounded-lg shadow-sm border"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Input
          name="work_area"
          placeholder="Area of service (e.g. Miami)"
          defaultValue={searchParams.get("work_area")?.toString()}
          className="w-full"
        />
        <Input
          name="business_name"
          placeholder="Name of Business"
          defaultValue={searchParams.get("business_name")?.toString()}
          className="w-full"
        />
        <Input
          name="representative"
          placeholder="Representative (e.g. Chaya)"
          defaultValue={searchParams.get("representative")?.toString()}
          className="w-full"
        />
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" onClick={clearSearch} className="w-full">
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>
    </form>
  )
}
