"use server"

import { revalidatePath } from "next/cache"
import { updateVendorDetails } from "@/lib/vendor-service"
import type { Vendor } from "@/lib/db"

export async function updateVendorDetailsAction(
  _prevState: { success: boolean; message: string } | null,
  formData: FormData,
) {
  const vendorId = Number(formData.get("vendorId"))
  if (!vendorId) {
    return { success: false, message: "Vendor ID is missing." }
  }

  try {
    const detailsToUpdate: Partial<Omit<Vendor, "id">> = {
      lead_rating: Number(formData.get("lead_rating")) || undefined,
      next_follow_up_date: (formData.get("next_follow_up_date") as string) || undefined,
      follow_up_1_date: (formData.get("follow_up_1_date") as string) || undefined,
      follow_up_1_notes: formData.get("follow_up_1_notes") as string,
      follow_up_2_date: (formData.get("follow_up_2_date") as string) || undefined,
      follow_up_2_notes: formData.get("follow_up_2_notes") as string,
      follow_up_3_date: (formData.get("follow_up_3_date") as string) || undefined,
      follow_up_3_notes: formData.get("follow_up_3_notes") as string,
      follow_up_4_date: (formData.get("follow_up_4_date") as string) || undefined,
      follow_up_4_notes: formData.get("follow_up_4_notes") as string,
      follow_up_5_date: (formData.get("follow_up_5_date") as string) || undefined,
      follow_up_5_notes: formData.get("follow_up_5_notes") as string,
    }

    await updateVendorDetails(vendorId, detailsToUpdate)

    revalidatePath("/admin")
    return { success: true, message: "Vendor details updated successfully." }
  } catch (error) {
    console.error("Failed to update vendor details:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}
