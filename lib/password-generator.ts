/**
 * Generates a secure random password for vendors
 * Format: 3 words + 2 numbers (e.g., "BlueCat47Mountain23")
 */
export function generateVendorPassword(): string {
  const adjectives = [
    "Blue",
    "Red",
    "Green",
    "Fast",
    "Smart",
    "Strong",
    "Bright",
    "Quick",
    "Bold",
    "Cool",
    "Warm",
    "Sharp",
    "Clear",
    "Fresh",
    "Pure",
    "Safe",
  ]

  const nouns = [
    "Cat",
    "Dog",
    "Bird",
    "Fish",
    "Tree",
    "Rock",
    "Star",
    "Moon",
    "Sun",
    "Wind",
    "Fire",
    "Wave",
    "Hill",
    "Lake",
    "Bear",
    "Wolf",
  ]

  const animals = [
    "Tiger",
    "Eagle",
    "Shark",
    "Lion",
    "Hawk",
    "Fox",
    "Deer",
    "Owl",
    "Whale",
    "Panda",
    "Zebra",
    "Rhino",
    "Falcon",
    "Raven",
    "Cobra",
    "Lynx",
  ]

  // Pick random words
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]

  // Generate 2 random numbers (10-99)
  const num1 = Math.floor(Math.random() * 90) + 10
  const num2 = Math.floor(Math.random() * 90) + 10

  return `${adjective}${noun}${num1}${animal}${num2}`
}

/**
 * Alternative: Generate a completely random password
 */
export function generateRandomPassword(length = 12): string {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
  let password = ""

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return password
}
