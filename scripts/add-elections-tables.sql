-- Add Elections Tables to Supabase Database
-- Run this in your Supabase SQL Editor

-- Create ElectionStatus enum
CREATE TYPE "ElectionStatus" AS ENUM ('UPCOMING', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- Create CandidateStatus enum
CREATE TYPE "CandidateStatus" AS ENUM ('ACTIVE', 'WITHDRAWN', 'DISQUALIFIED');

-- Create Election table
CREATE TABLE "Election" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "ElectionStatus" NOT NULL DEFAULT 'UPCOMING',
    "type" TEXT NOT NULL DEFAULT 'GENERAL',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create ElectionDocument table
CREATE TABLE "ElectionDocument" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "fileUrl" TEXT,
    "content" TEXT,
    "electionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ElectionDocument_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Candidate table
CREATE TABLE "Candidate" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "districtId" INTEGER,
    "electionId" INTEGER NOT NULL,
    "bio" TEXT,
    "manifesto" TEXT,
    "photoUrl" TEXT,
    "status" "CandidateStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Candidate_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Candidate_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Vote table
CREATE TABLE "Vote" (
    "id" SERIAL PRIMARY KEY,
    "candidateId" INTEGER NOT NULL,
    "electionId" INTEGER NOT NULL,
    "voterId" TEXT,
    "voterEmail" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Vote_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Vote_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create unique constraints for Vote table
CREATE UNIQUE INDEX "Vote_electionId_voterId_key" ON "Vote"("electionId", "voterId");
CREATE UNIQUE INDEX "Vote_electionId_voterEmail_key" ON "Vote"("electionId", "voterEmail");
CREATE UNIQUE INDEX "Vote_electionId_ipAddress_key" ON "Vote"("electionId", "ipAddress");

-- Add indexes for better performance
CREATE INDEX "Election_status_idx" ON "Election"("status");
CREATE INDEX "Election_published_idx" ON "Election"("published");
CREATE INDEX "Election_startDate_idx" ON "Election"("startDate");
CREATE INDEX "Candidate_electionId_idx" ON "Candidate"("electionId");
CREATE INDEX "Candidate_districtId_idx" ON "Candidate"("districtId");
CREATE INDEX "Vote_electionId_idx" ON "Vote"("electionId");
CREATE INDEX "Vote_candidateId_idx" ON "Vote"("candidateId");

-- Insert sample election data
INSERT INTO "Election" ("title", "description", "startDate", "endDate", "status", "type", "published") VALUES
('Elections of Office Bearers & Executive Members', 'Official elections for the term 2024-2028', '2024-11-01 00:00:00', '2024-12-15 23:59:59', 'UPCOMING', 'GENERAL', true),
('By-Election for Secretary Position', 'Special election to fill vacant Secretary position', '2024-10-01 00:00:00', '2024-10-31 23:59:59', 'COMPLETED', 'BY_ELECTION', true);

-- Insert sample election documents
INSERT INTO "ElectionDocument" ("title", "type", "content", "electionId") VALUES
('Election Notice 2024-2028', 'NOTICE', 'Official notice for the election of office bearers and executive members for the term 2024-2028', 1),
('Election Schedule', 'SCHEDULE', 'Detailed schedule of all election-related activities and deadlines', 1),
('Nomination Forms', 'FORM', 'All nomination forms for different positions', 1),
('Electoral College', 'VOTER_INFO', 'Complete list of eligible voters and electoral college composition', 1);

-- Insert sample candidates (assuming you have districts with IDs 1 and 2)
INSERT INTO "Candidate" ("name", "position", "districtId", "electionId", "bio", "status") VALUES
('Rajesh Kumar', 'President', 1, 1, 'Experienced administrator with 10+ years in sports management', 'ACTIVE'),
('Priya Sharma', 'Secretary General', 2, 1, 'Former national player and certified coach', 'ACTIVE'),
('Amit Patel', 'Treasurer', 1, 1, 'Chartered accountant with expertise in sports finance', 'ACTIVE'),
('Dr. Meera Singh', 'Vice President', 2, 1, 'Sports medicine specialist and former international referee', 'ACTIVE');

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE "Election" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ElectionDocument" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Candidate" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Vote" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Elections are viewable by everyone" ON "Election" FOR SELECT USING (published = true);
CREATE POLICY "Election documents are viewable by everyone" ON "ElectionDocument" FOR SELECT USING (true);
CREATE POLICY "Candidates are viewable by everyone" ON "Candidate" FOR SELECT USING (true);
CREATE POLICY "Votes are viewable by everyone" ON "Vote" FOR SELECT USING (true);

-- Create RLS policies for authenticated users (admin operations)
CREATE POLICY "Authenticated users can manage elections" ON "Election" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage election documents" ON "ElectionDocument" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage candidates" ON "Candidate" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage votes" ON "Vote" FOR ALL USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT ALL ON "Election" TO authenticated;
GRANT ALL ON "ElectionDocument" TO authenticated;
GRANT ALL ON "Candidate" TO authenticated;
GRANT ALL ON "Vote" TO authenticated;

GRANT SELECT ON "Election" TO anon;
GRANT SELECT ON "ElectionDocument" TO anon;
GRANT SELECT ON "Candidate" TO anon;
GRANT SELECT ON "Vote" TO anon;

-- Grant sequence permissions
GRANT USAGE, SELECT ON SEQUENCE "Election_id_seq" TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE "ElectionDocument_id_seq" TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE "Candidate_id_seq" TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE "Vote_id_seq" TO authenticated;
