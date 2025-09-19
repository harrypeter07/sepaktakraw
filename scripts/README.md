# Supabase Database Seeding

This directory contains scripts to populate your Supabase database with comprehensive sample data for the Maharashtra Sepaktakraw Association website.

## What Gets Seeded

The seeding script populates the following tables with realistic data:

### 📍 Districts (10 districts)
- Mumbai City, Mumbai Suburban, Pune, Nagpur, Thane, Nashik, Aurangabad, Solapur, Kolhapur, Sangli
- Each district includes name, slug, description, contact information, and website

### 👥 Officials (10 officials)
- Presidents, Secretaries, Treasurers, Vice Presidents, Joint Secretaries
- Contact information and district associations

### 🏆 Teams (16 teams)
- Men's, Women's, and U19 teams across different districts
- Categories: Men, Women, U19

### 📊 Results (8 match results)
- State, District, National, and Training level matches
- Various stages: Finals, Semi-finals, Quarter-finals, League matches
- Complete with scores, venues, dates, and tags

### 📢 Notices (8 notices)
- Tournament announcements, training workshops, compliance notices
- Categories: Tournament, Training, Compliance, Rules, Meeting, Development, International, Safety
- Includes file attachments and publication status

### 👤 Users (6 users)
- Different roles: SUPER_ADMIN, STATE_ADMIN, DISTRICT_ADMIN, EDITOR, VIEWER
- Associated with appropriate districts

### 📄 Static Documents (8 documents)
- Rules for different sepaktakraw formats (Regu, Double, Quad, Beach)
- Compliance documents (Anti-Doping, RTI, MYAS, Elections)

### 📝 Form Definitions (3 forms)
- Player Registration Form
- Team Entry Form
- Event Registration Form
- Complete with field schemas and validation rules

### 📋 Submissions (3 sample submissions)
- Sample form submissions demonstrating the forms in action

## How to Run

### Option 1: Using npm script (Recommended)
```bash
npm run seed
```

### Option 2: Direct TypeScript execution
```bash
npm run seed:supabase
```

### Option 3: Manual execution
```bash
npx tsx scripts/seed-supabase.ts
```

## Prerequisites

1. **Environment Variables**: Make sure your `.env.local` file contains:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Database Schema**: Ensure your Supabase database has the correct schema. The script expects these tables:
   - `districts`
   - `officials`
   - `teams`
   - `results`
   - `notices`
   - `users`
   - `staticdocs`
   - `formdefs`
   - `submissions`

## What Happens During Seeding

1. **Upsert Operations**: The script uses upsert operations, so it's safe to run multiple times
2. **Conflict Resolution**: 
   - Districts are upserted by `slug`
   - Users are upserted by `email`
   - Notices are upserted by `slug`
   - Form definitions are upserted by `key`
3. **Relationships**: All foreign key relationships are properly maintained
4. **Data Validation**: The script includes proper error handling and validation

## After Seeding

Once the seeding is complete, you should be able to:

- ✅ View all districts on `/districts` page
- ✅ See notices categorized on `/notices` page
- ✅ Browse match results on `/results` page
- ✅ Access admin functionality with seeded users
- ✅ View form submissions in admin panel
- ✅ See static documents in compliance sections

## Troubleshooting

### Common Issues

1. **Environment Variables Not Set**
   ```
   Error: Supabase environment variables are not configured
   ```
   Solution: Check your `.env.local` file and ensure Supabase credentials are correct.

2. **Table Not Found**
   ```
   Error: relation "public.districts" does not exist
   ```
   Solution: Run your Prisma migrations first: `npx prisma db push`

3. **Permission Denied**
   ```
   Error: permission denied for table districts
   ```
   Solution: Check your Supabase RLS policies and ensure the anon key has proper permissions.

### Getting Help

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your Supabase project settings
3. Ensure your database schema matches the expected structure
4. Check your environment variables are correctly set

## Customization

You can modify the `seed-supabase.ts` file to:
- Add more districts or officials
- Include additional match results
- Create more notices or documents
- Add custom form definitions
- Include more sample submissions

The script is designed to be easily extensible while maintaining data integrity.
