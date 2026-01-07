import { neon } from "@neondatabase/serverless"

/**
 * Returns a configured Neon SQL client.
 * If DATABASE_URL is missing we throw _lazily_ so
 * the module can still be imported in non-DB contexts
 * (e.g. browser preview) without crashing.
 */
export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL environment variable is required - this code must run on the server where the variable is present.",
    )
  }
  return neon(process.env.DATABASE_URL)
}

export interface Vendor {
  id?: number
  name: string
  phone?: string
  email?: string
  business_name?: string
  location?: string
  work_area?: string
  specialty?: string
  licensed: boolean
  representative?: string
  trade_type: string
  created_at?: Date
  updated_at?: Date
  password?: string // Add this field - hidden from users
  // New fields for admin dashboard
  lead_rating?: number
  follow_up_1_date?: Date
  follow_up_1_notes?: string
  follow_up_2_date?: Date
  follow_up_2_notes?: string
  follow_up_3_date?: Date
  follow_up_3_notes?: string
  follow_up_4_date?: Date
  follow_up_4_notes?: string
  follow_up_5_date?: Date
  follow_up_5_notes?: string
  next_follow_up_date?: Date
}

export interface VendorPricing {
  id?: number
  vendor_id: number
  service_name: string
  price?: number
  price_range_from?: number
  price_range_to?: number
  description?: string
  created_at?: Date
}

export interface VendorFee {
  id?: number
  vendor_id: number
  fee_type: "service_fee" | "emergency_fee"
  amount?: number
  has_fee: boolean
  created_at?: Date
}
