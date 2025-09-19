-- Schema Updates for Supabase Database
-- This script adds missing fields that the application pages expect

-- Add missing fields to notices table
ALTER TABLE "public"."Notice" 
ADD COLUMN IF NOT EXISTS "attachments" TEXT[],
ADD COLUMN IF NOT EXISTS "priority" TEXT DEFAULT 'NORMAL';

-- Add missing fields to results table  
ALTER TABLE "public"."Result"
ADD COLUMN IF NOT EXISTS "notes" TEXT;

-- Add missing fields to districts table
ALTER TABLE "public"."District"
ADD COLUMN IF NOT EXISTS "address" TEXT,
ADD COLUMN IF NOT EXISTS "phone" TEXT,
ADD COLUMN IF NOT EXISTS "email" TEXT,
ADD COLUMN IF NOT EXISTS "website" TEXT;

-- Update the priority field to have proper constraints
ALTER TABLE "public"."Notice" 
DROP CONSTRAINT IF EXISTS "notice_priority_check";

ALTER TABLE "public"."Notice" 
ADD CONSTRAINT "notice_priority_check" 
CHECK ("priority" IN ('LOW', 'NORMAL', 'HIGH', 'URGENT'));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_notices_category" ON "public"."Notice"("category");
CREATE INDEX IF NOT EXISTS "idx_notices_priority" ON "public"."Notice"("priority");
CREATE INDEX IF NOT EXISTS "idx_notices_published" ON "public"."Notice"("published");
CREATE INDEX IF NOT EXISTS "idx_results_level" ON "public"."Result"("level");
CREATE INDEX IF NOT EXISTS "public"."Result"("published");
CREATE INDEX IF NOT EXISTS "idx_results_date" ON "public"."Result"("date");
CREATE INDEX IF NOT EXISTS "idx_districts_slug" ON "public"."District"("slug");

-- Add comments for documentation
COMMENT ON COLUMN "public"."Notice"."attachments" IS 'Array of file URLs attached to the notice';
COMMENT ON COLUMN "public"."Notice"."priority" IS 'Priority level: LOW, NORMAL, HIGH, URGENT';
COMMENT ON COLUMN "public"."Result"."notes" IS 'Additional notes or comments about the match result';
COMMENT ON COLUMN "public"."District"."address" IS 'Physical address of the district office';
COMMENT ON COLUMN "public"."District"."phone" IS 'Contact phone number for the district';
COMMENT ON COLUMN "public"."District"."email" IS 'Contact email for the district';
COMMENT ON COLUMN "public"."District"."website" IS 'Official website URL for the district';
