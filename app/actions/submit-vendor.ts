"use server"

import { createVendor, createVendorPricing, createVendorFees } from "@/lib/vendor-service"

// first arg is the previous state, second is FormData
export async function submitVendorForm(_prevState: { success: boolean; message: string } | null, formData: FormData) {
  try {
    // Extract vendor information with only basic validation
    const vendor = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      business_name: formData.get("business-name") as string,
      location: formData.get("location") as string,
      work_area: formData.get("work-area") as string,
      specialty: formData.get("specialty") as string,
      licensed: formData.get("licensed") === "yes",
      representative: formData.get("representative") as string,
      trade_type: formData.get("trade-type") as string,
      // password will be auto-generated in createVendor function
    }

    // Only validate truly required fields
    if (!vendor.name || vendor.name.trim() === "") {
      return { success: false, message: "Name is required." }
    }

    if (!vendor.email || vendor.email.trim() === "") {
      return { success: false, message: "Email is required." }
    }

    if (!vendor.trade_type || vendor.trade_type.trim() === "") {
      return { success: false, message: "Please select your trade type." }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(vendor.email)) {
      return { success: false, message: "Please enter a valid email address." }
    }

    // Create vendor record
    const vendorId = await createVendor(vendor)

    // Extract pricing information based on trade type (allow empty fields)
    const pricing = extractPricingData(formData, vendorId, vendor.trade_type)
    if (pricing.length > 0) {
      await createVendorPricing(pricing)
    }

    // Extract fee information (allow empty fields)
    const fees = extractFeeData(formData, vendorId)
    if (fees.length > 0) {
      await createVendorFees(fees)
    }

    return { success: true, message: "Vendor information submitted successfully!", redirect: "/success" }
  } catch (error) {
    console.error("Error submitting vendor form:", error)
    return { success: false, message: "Failed to submit vendor information. Please try again." }
  }
}

function extractPricingData(formData: FormData, vendorId: number, tradeType: string) {
  const pricing = []

  switch (tradeType) {
    case "handyman":
      const handymanServices = ["drywall", "painting", "flooring", "cabinets", "ptrap", "valve"]
      for (const service of handymanServices) {
        const price = formData.get(service) as string
        if (price && price.trim() !== "" && !isNaN(Number(price))) {
          pricing.push({
            vendor_id: vendorId,
            service_name: service,
            price: Number.parseFloat(price),
            description: getServiceDescription(service),
          })
        }
      }
      break

    case "plumber":
      const plumberServices = [
        "water-heater",
        "leak-detection",
        "sewer-inspection",
        "plumber-ptrap",
        "snaking",
        "trenching",
      ]
      for (const service of plumberServices) {
        const price = formData.get(service) as string
        if (price && price.trim() !== "" && !isNaN(Number(price))) {
          pricing.push({
            vendor_id: vendorId,
            service_name: service,
            price: Number.parseFloat(price),
            description: getServiceDescription(service),
          })
        }
      }
      break

    case "hvac":
      const hvacServices = ["maintenance", "ac-install", "ac-line", "coil-cleaning", "duct-cleaning"]
      for (const service of hvacServices) {
        const price = formData.get(service) as string
        if (price && price.trim() !== "" && !isNaN(Number(price))) {
          pricing.push({
            vendor_id: vendorId,
            service_name: service,
            price: Number.parseFloat(price),
            description: getServiceDescription(service),
          })
        }
      }
      break

    case "roofer":
      const rooferServices = ["shingle-3tab", "shingle-dim", "tile-sq", "metal-sq", "osb-included", "osb-extra"]
      for (const service of rooferServices) {
        const price = formData.get(service) as string
        if (price && price.trim() !== "" && !isNaN(Number(price))) {
          pricing.push({
            vendor_id: vendorId,
            service_name: service,
            price: Number.parseFloat(price),
            description: getServiceDescription(service),
          })
        }
      }

      // Handle roof repair range (both fields optional)
      const repairFrom = formData.get("roof-repair-from") as string
      const repairTo = formData.get("roof-repair-to") as string
      if (
        repairFrom &&
        repairTo &&
        repairFrom.trim() !== "" &&
        repairTo.trim() !== "" &&
        !isNaN(Number(repairFrom)) &&
        !isNaN(Number(repairTo))
      ) {
        pricing.push({
          vendor_id: vendorId,
          service_name: "roof-repair-5x5",
          price_range_from: Number.parseFloat(repairFrom),
          price_range_to: Number.parseFloat(repairTo),
          description: "Roof repair Shingles 5x5",
        })
      }
      break

    case "gc":
      for (let i = 1; i <= 3; i++) {
        const description = formData.get(`specialty-${i}-description`) as string
        const priceFrom = formData.get(`specialty-${i}-from`) as string
        const priceTo = formData.get(`specialty-${i}-to`) as string

        if (
          description &&
          priceFrom &&
          priceTo &&
          description.trim() !== "" &&
          priceFrom.trim() !== "" &&
          priceTo.trim() !== "" &&
          !isNaN(Number(priceFrom)) &&
          !isNaN(Number(priceTo))
        ) {
          pricing.push({
            vendor_id: vendorId,
            service_name: `specialty-${i}`,
            price_range_from: Number.parseFloat(priceFrom),
            price_range_to: Number.parseFloat(priceTo),
            description: description,
          })
        }
      }
      break
  }

  return pricing
}

function extractFeeData(formData: FormData, vendorId: number) {
  const fees = []

  // Service fee (optional)
  const hasServiceFee = formData.get("service-fee") === "yes"
  const serviceFeeAmount = formData.get("service-fee-amount") as string

  let serviceFeeValue = undefined
  if (hasServiceFee && serviceFeeAmount && serviceFeeAmount.trim() !== "" && !isNaN(Number(serviceFeeAmount))) {
    serviceFeeValue = Number.parseFloat(serviceFeeAmount)
  }

  fees.push({
    vendor_id: vendorId,
    fee_type: "service_fee" as const,
    has_fee: hasServiceFee,
    amount: serviceFeeValue,
  })

  // Emergency fee (optional)
  const hasEmergencyFee = formData.get("emergency-fee") === "yes"
  const emergencyFeeAmount = formData.get("emergency-fee-amount") as string

  let emergencyFeeValue = undefined
  if (hasEmergencyFee && emergencyFeeAmount && emergencyFeeAmount.trim() !== "" && !isNaN(Number(emergencyFeeAmount))) {
    emergencyFeeValue = Number.parseFloat(emergencyFeeAmount)
  }

  fees.push({
    vendor_id: vendorId,
    fee_type: "emergency_fee" as const,
    has_fee: hasEmergencyFee,
    amount: emergencyFeeValue,
  })

  return fees
}

function getServiceDescription(service: string): string {
  const descriptions: Record<string, string> = {
    drywall: "Replace drywall 8x8 ceiling cavity including mud",
    painting: "Painting 10x10 Room",
    flooring: "Wood/Vinyl floor installation 10x10 room",
    cabinets: "Kitchen Cabinet installation (10x10), 20 Lf, 5 base 5 wall cabinets",
    ptrap: "Kitchen sink p-trap replacement",
    valve: "Angled fixture shut-off valve replacement",
    "water-heater": "Water heater installation (electric)",
    "leak-detection": "Water leak detection 2000 sqft home 1 Kitchen, 2 Bathrooms",
    "sewer-inspection": "Sewer Line Inspection with report",
    "plumber-ptrap": "Kitchen sink p-trap replacement",
    snaking: "Snaking the sewer line of a single clogged bathroom",
    trenching: "Trenching per Lf",
    maintenance: "Routine Maintenance service",
    "ac-install": "Air handler and condenser installation (4 ton)",
    "ac-line": "Clear clogged AC line",
    "coil-cleaning": "Coil cleaning",
    "duct-cleaning": "Duct cleaning service",
    "shingle-3tab": "Price per SQ 3 tab Shingle",
    "shingle-dim": "Price per SQ Dimensional Shingle",
    "tile-sq": "Price per SQ Tile",
    "metal-sq": "Price per SQ Metal",
    "osb-included": "OSB boards included in price",
    "osb-extra": "Price for every extra board",
  }
  return descriptions[service] || service
}
