-- Create vendors table to store vendor information
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pricing table to store pricing information
CREATE TABLE IF NOT EXISTS vendor_pricing (
  id SERIAL PRIMARY KEY,
  vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
  service_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2),
  price_range_from DECIMAL(10,2),
  price_range_to DECIMAL(10,2),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create fees table to store service and emergency fees
CREATE TABLE IF NOT EXISTS vendor_fees (
  id SERIAL PRIMARY KEY,
  vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
  fee_type VARCHAR(50) NOT NULL, -- 'service_fee' or 'emergency_fee'
  amount DECIMAL(10,2),
  has_fee BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vendors_trade_type ON vendors(trade_type);
CREATE INDEX IF NOT EXISTS idx_vendors_location ON vendors(location);
CREATE INDEX IF NOT EXISTS idx_vendor_pricing_vendor_id ON vendor_pricing(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_fees_vendor_id ON vendor_fees(vendor_id);
