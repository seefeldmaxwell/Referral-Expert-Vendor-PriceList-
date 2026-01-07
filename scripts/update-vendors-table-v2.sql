-- Add columns for lead rating and follow-ups to the vendors table
ALTER TABLE vendors
ADD COLUMN IF NOT EXISTS lead_rating INTEGER,
ADD COLUMN IF NOT EXISTS follow_up_1_date DATE,
ADD COLUMN IF NOT EXISTS follow_up_1_notes TEXT,
ADD COLUMN IF NOT EXISTS follow_up_2_date DATE,
ADD COLUMN IF NOT EXISTS follow_up_2_notes TEXT,
ADD COLUMN IF NOT EXISTS follow_up_3_date DATE,
ADD COLUMN IF NOT EXISTS follow_up_3_notes TEXT,
ADD COLUMN IF NOT EXISTS follow_up_4_date DATE,
ADD COLUMN IF NOT EXISTS follow_up_4_notes TEXT,
ADD COLUMN IF NOT EXISTS follow_up_5_date DATE,
ADD COLUMN IF NOT EXISTS follow_up_5_notes TEXT,
ADD COLUMN IF NOT EXISTS next_follow_up_date DATE;
