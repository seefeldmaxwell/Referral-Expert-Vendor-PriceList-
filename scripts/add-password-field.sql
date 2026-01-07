-- Add password field to vendors table
ALTER TABLE vendors 
ADD COLUMN IF NOT EXISTS passwordTEXT VARCHAR(255);

-- Create index for potential future login lookups
CREATE INDEX IF NOT EXISTS idx_vendors_email ON vendors(email);
