import { getSql } from "./db"
import type { Vendor, VendorPricing, VendorFee } from "./db"
import { generateVendorPassword } from "./password-generator"

let schemaInitialized = false

async function initializeSchema() {
  if (schemaInitialized) return

  const sql = getSql()

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS vendors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        email VARCHAR(255),
        business_name VARCHAR(255),
        location VARCHAR(255),
        work_area VARCHAR(255),
        specialty TEXT,
        licensed BOOLEAN DEFAULT false,
        representative VARCHAR(100),
        trade_type VARCHAR(50) NOT NULL,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS vendor_pricing (
        id SERIAL PRIMARY KEY,
        vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
        service_name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2),
        price_range_from DECIMAL(10,2),
        price_range_to DECIMAL(10,2),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS vendor_fees (
        id SERIAL PRIMARY KEY,
        vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
        fee_type VARCHAR(50) NOT NULL,
        amount DECIMAL(10,2),
        has_fee BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_vendors_trade_type ON vendors(trade_type)`
    await sql`CREATE INDEX IF NOT EXISTS idx_vendors_location ON vendors(location)`
    await sql`CREATE INDEX IF NOT EXISTS idx_vendors_email ON vendors(email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_vendor_pricing_vendor_id ON vendor_pricing(vendor_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_vendor_fees_vendor_id ON vendor_fees(vendor_id)`

    schemaInitialized = true
  } catch (error) {
    console.error("Error initializing schema:", error)
    throw error
  }
}

export async function createVendor(
  vendor: Omit<Vendor, "id" | "created_at" | "updated_at" | "password">,
): Promise<number> {
  await initializeSchema()
  const sql = getSql()

  // Generate a secure password for the vendor
  const generatedPassword = generateVendorPassword()

  const result = await sql`
    INSERT INTO vendors (
      name, phone, email, business_name, location, work_area, 
      specialty, licensed, representative, trade_type, password
    ) VALUES (
      ${vendor.name}, ${vendor.phone}, ${vendor.email}, ${vendor.business_name},
      ${vendor.location}, ${vendor.work_area}, ${vendor.specialty}, ${vendor.licensed},
      ${vendor.representative}, ${vendor.trade_type}, ${generatedPassword}
    ) RETURNING id
  `
  return result[0].id
}

export async function createVendorPricing(pricing: Omit<VendorPricing, "id" | "created_at">[]): Promise<void> {
  if (pricing.length === 0) return

  await initializeSchema()
  const sql = getSql()

  for (const p of pricing) {
    await sql`
      INSERT INTO vendor_pricing (vendor_id, service_name, price, price_range_from, price_range_to, description)
      VALUES (${p.vendor_id}, ${p.service_name}, ${p.price || null}, ${p.price_range_from || null}, ${p.price_range_to || null}, ${p.description || ""})
    `
  }
}

export async function createVendorFees(fees: Omit<VendorFee, "id" | "created_at">[]): Promise<void> {
  if (fees.length === 0) return

  await initializeSchema()
  const sql = getSql()

  for (const fee of fees) {
    await sql`
      INSERT INTO vendor_fees (vendor_id, fee_type, amount, has_fee)
      VALUES (${fee.vendor_id}, ${fee.fee_type}, ${fee.amount || null}, ${fee.has_fee})
    `
  }
}

export async function getAllVendors(): Promise<Vendor[]> {
  await initializeSchema()
  const sql = getSql()
  const result = await sql`SELECT * FROM vendors ORDER BY created_at DESC`
  return result as Vendor[]
}

export async function getVendorsByTrade(tradeType: string): Promise<Vendor[]> {
  await initializeSchema()
  const sql = getSql()

  const result = await sql`
    SELECT * FROM vendors 
    WHERE trade_type = ${tradeType}
    ORDER BY created_at DESC
  `
  return result as Vendor[]
}

export async function searchVendors(filters: {
  work_area?: string
  business_name?: string
  representative?: string
}): Promise<Vendor[]> {
  await initializeSchema()
  const sql = getSql()

  const conditions = []
  if (filters.work_area) {
    conditions.push(sql`work_area ILIKE ${"%" + filters.work_area + "%"}`)
  }
  if (filters.business_name) {
    conditions.push(sql`business_name ILIKE ${"%" + filters.business_name + "%"}`)
  }
  if (filters.representative) {
    conditions.push(sql`representative ILIKE ${"%" + filters.representative + "%"}`)
  }

  if (conditions.length === 0) {
    return getAllVendors()
  }

  const whereClause = sql`WHERE ${sql.join(conditions, sql` AND `)}`

  const result = await sql`
    SELECT * FROM vendors
    ${whereClause}
    ORDER BY created_at DESC
  `
  return result as Vendor[]
}

export async function getVendorWithPricing(vendorId: number) {
  await initializeSchema()
  const sql = getSql()

  const vendorResult = await sql`
    SELECT * FROM vendors WHERE id = ${vendorId}
  `

  const pricing = await sql`
    SELECT * FROM vendor_pricing WHERE vendor_id = ${vendorId}
  `

  const fees = await sql`
    SELECT * FROM vendor_fees WHERE vendor_id = ${vendorId}
  `

  return {
    vendor: vendorResult[0] as Vendor,
    pricing: pricing as VendorPricing[],
    fees: fees as VendorFee[],
  }
}

export async function updateVendorDetails(
  vendorId: number,
  details: Partial<Omit<Vendor, "id" | "created_at" | "updated_at">>,
) {
  await initializeSchema()
  const sql = getSql()

  const fieldsToUpdate = Object.entries(details)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      // Handle empty strings for notes, but null for dates
      if (key.includes("notes") && value === "") {
        return sql`${sql(key)} = ${value}`
      }
      if (value === "" || value === null) {
        return sql`${sql(key)} = NULL`
      }
      return sql`${sql(key)} = ${value}`
    })

  if (fieldsToUpdate.length === 0) {
    return
  }

  await sql`
    UPDATE vendors
    SET ${sql.join(fieldsToUpdate, sql`, `)}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${vendorId}
  `
}
