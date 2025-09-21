# 🗳️ Elections System Setup Guide

This guide will help you set up the complete elections system for the Maharashtra Sepaktakraw Association website.

## 📋 What's Included

The elections system provides:

- ✅ **Database Tables**: Elections, Candidates, Votes, Election Documents
- ✅ **API Routes**: Full CRUD operations for elections management
- ✅ **Admin Pages**: Complete election management interface
- ✅ **Public Pages**: Elections display for members
- ✅ **Voting System**: Secure voting with IP and email tracking
- ✅ **Document Management**: Election notices, forms, and schedules
- ✅ **Dashboard Integration**: Elections statistics in admin dashboard

## 🚀 Quick Setup

Run this single command to set up everything:

```bash
npm run setup:elections
```

This will:
- ✅ Update your database schema
- ✅ Create all election tables
- ✅ Seed sample election data
- ✅ Verify everything is working

## 🔧 Manual Setup (Step by Step)

If you prefer to run each step manually:

### Step 1: Update Database Schema
```bash
npx prisma db push
```

### Step 2: Generate Prisma Client
```bash
npx prisma generate
```

### Step 3: Seed Elections Data
```bash
npm run seed:elections
```

### Step 4: Alternative - Run SQL Script
If the above doesn't work, run the SQL script manually in your Supabase dashboard:
```sql
-- Copy and paste the contents of scripts/add-elections-tables.sql
```

## 📊 Database Schema

The elections system adds these tables:

### Election
- `id`: Primary key
- `title`: Election title
- `description`: Election description
- `startDate`: When voting begins
- `endDate`: When voting ends
- `status`: UPCOMING, ACTIVE, COMPLETED, CANCELLED
- `type`: GENERAL, BY_ELECTION, SPECIAL
- `published`: Whether election is public

### Candidate
- `id`: Primary key
- `name`: Candidate name
- `position`: Position they're running for
- `districtId`: Associated district (optional)
- `electionId`: Which election
- `bio`: Candidate biography
- `manifesto`: Candidate manifesto
- `status`: ACTIVE, WITHDRAWN, DISQUALIFIED

### Vote
- `id`: Primary key
- `candidateId`: Who they voted for
- `electionId`: Which election
- `voterId`: User ID (if authenticated)
- `voterEmail`: Email (for anonymous voting)
- `ipAddress`: IP address for tracking

### ElectionDocument
- `id`: Primary key
- `title`: Document title
- `type`: NOTICE, SCHEDULE, FORM, RESULT
- `fileUrl`: Link to document file
- `content`: Document content
- `electionId`: Associated election

## 🔗 API Endpoints

### Elections
- `GET /api/elections` - List all elections
- `POST /api/elections` - Create new election
- `GET /api/elections/[id]` - Get specific election
- `PUT /api/elections/[id]` - Update election
- `DELETE /api/elections/[id]` - Delete election

### Candidates
- `GET /api/elections/[id]/candidates` - Get candidates for election
- `POST /api/elections/[id]/candidates` - Add candidate to election
- `GET /api/candidates/[id]` - Get specific candidate
- `PUT /api/candidates/[id]` - Update candidate
- `DELETE /api/candidates/[id]` - Delete candidate

### Voting
- `POST /api/elections/[id]/vote` - Cast a vote
- `GET /api/elections/[id]/vote` - Get vote statistics

## 🎯 Admin Features

### Election Management (`/admin/elections`)
- ✅ View all elections with statistics
- ✅ Create new elections
- ✅ Edit election details
- ✅ Delete elections
- ✅ View candidates for each election

### Candidate Management
- ✅ Add candidates to elections
- ✅ Edit candidate information
- ✅ Manage candidate status
- ✅ View candidate profiles

### Voting Management
- ✅ View vote statistics
- ✅ Monitor voting progress
- ✅ Export vote results

## 🌐 Public Features

### Elections Page (`/elections`)
- ✅ View current and upcoming elections
- ✅ Download election documents
- ✅ View candidate information
- ✅ See election timeline
- ✅ Access voting interface

### Voting System
- ✅ Secure voting with duplicate prevention
- ✅ IP address and email tracking
- ✅ Real-time vote counting
- ✅ Anonymous and authenticated voting

## 📱 Sample Data

After setup, you'll have:

### Elections
- **General Election 2024-2028**: Upcoming election for office bearers
- **By-Election for Secretary**: Completed special election

### Candidates
- **6 candidates** for the general election
- **2 candidates** for the by-election
- Complete with bios, manifestos, and district associations

### Documents
- **6 election documents** including notices, schedules, and forms
- Ready for download and public access

### Votes
- **5 sample votes** for the completed election
- Demonstrates voting system functionality

## 🔐 Security Features

- ✅ **Row Level Security (RLS)** enabled on all tables
- ✅ **Authentication required** for admin operations
- ✅ **Public read access** for published elections
- ✅ **Vote tracking** prevents duplicate voting
- ✅ **IP and email validation** for anonymous voting

## 🎨 Customization

### Adding New Election Types
Edit the `ElectionStatus` and `CandidateStatus` enums in the Prisma schema.

### Customizing Election Documents
Add new document types by updating the `type` field in `ElectionDocument`.

### Styling
All components use the existing design system with Tailwind CSS classes.

## 🛠️ Troubleshooting

### Database Connection Issues
```bash
# Check your .env.local file
DATABASE_URL=your_supabase_connection_string
DIRECT_URL=your_supabase_direct_connection_string
```

### Prisma Issues
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (WARNING: This will delete all data)
npx prisma db push --force-reset
```

### Permission Issues
Make sure your Supabase RLS policies are correctly set up. The SQL script includes all necessary policies.

## 📞 Support

If you encounter issues:

1. **Check the console output** for specific error messages
2. **Verify your Supabase project settings**
3. **Ensure your environment variables are correctly set**
4. **Check your internet connection**
5. **Review the Prisma schema** for any syntax errors

## 🎉 After Setup

Once the elections system is set up, you can:

- ✅ **Visit `/admin/elections`** to manage elections
- ✅ **Visit `/elections`** to view public elections
- ✅ **Create new elections** and add candidates
- ✅ **Upload election documents** and forms
- ✅ **Monitor voting progress** in real-time
- ✅ **Export election results** and statistics
- ✅ **View elections in admin dashboard**

---

**🎯 Ready to go!** Your elections system should now be fully functional with realistic data and complete CRUD operations.
