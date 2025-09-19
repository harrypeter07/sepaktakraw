# 🚀 Supabase Database Setup Instructions

This guide will help you populate your Supabase database with comprehensive sample data so all pages work properly.

## 📋 Prerequisites

1. **Supabase Project**: Make sure you have a Supabase project set up
2. **Environment Variables**: Ensure your `.env.local` file contains:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 🎯 Quick Setup (Recommended)

Run this single command to set up everything:

```bash
npm run setup:db
```

This will:
- ✅ Update your database schema
- ✅ Seed all tables with realistic data
- ✅ Verify everything is working

## 🔧 Manual Setup (Step by Step)

If you prefer to run each step manually:

### Step 1: Update Database Schema
```bash
npx prisma db push
```

### Step 2: Run Schema Updates (Optional)
You may need to manually run the SQL commands in `scripts/update-schema.sql` in your Supabase dashboard to add missing fields.

### Step 3: Seed the Database
```bash
npm run seed
```

## 📊 What Gets Created

After running the setup, you'll have:

### 🏢 **Districts** (10 districts)
- Mumbai City, Mumbai Suburban, Pune, Nagpur, Thane, Nashik, Aurangabad, Solapur, Kolhapur, Sangli
- Complete with contact information, addresses, and websites

### 👥 **Officials** (10 officials)
- Presidents, Secretaries, Treasurers across districts
- Contact details and positions

### 🏆 **Teams** (16 teams)
- Men's, Women's, and U19 teams
- Distributed across different districts

### 📊 **Results** (8 match results)
- State, District, National level matches
- Complete with scores, venues, dates, and notes

### 📢 **Notices** (8 notices)
- Tournament announcements, training workshops, compliance notices
- With attachments, priorities, and categories

### 👤 **Users** (6 users)
- Different roles: SUPER_ADMIN, STATE_ADMIN, DISTRICT_ADMIN, EDITOR, VIEWER
- Ready for admin access

### 📄 **Static Documents** (8 documents)
- Rules for different sepaktakraw formats
- Compliance documents (Anti-Doping, RTI, MYAS, Elections)

### 📝 **Forms** (3 form definitions)
- Player Registration Form
- Team Entry Form  
- Event Registration Form

### 📋 **Submissions** (3 sample submissions)
- Example form submissions

## 🎉 After Setup

Once the setup is complete, you can:

- ✅ **View Districts**: Visit `/districts` to see all districts with contact info
- ✅ **Browse Notices**: Visit `/notices` to see categorized notices with attachments
- ✅ **Check Results**: Visit `/results` to see match results with scores and notes
- ✅ **Access Admin**: Visit `/admin` to manage content (use admin@mskt.org)
- ✅ **View Forms**: Check out the dynamic forms system
- ✅ **Browse Documents**: Access compliance and rules documents

## 🔍 Testing Your Setup

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Visit these pages to verify everything works**:
   - `/districts` - Should show 10 districts with contact info
   - `/notices` - Should show 8 notices in different categories
   - `/results` - Should show 8 match results with scores
   - `/admin` - Should allow admin access

## 🛠️ Troubleshooting

### Environment Variables Not Set
```
Error: Supabase environment variables are not configured
```
**Solution**: Check your `.env.local` file and ensure Supabase credentials are correct.

### Database Schema Issues
```
Error: relation "public.districts" does not exist
```
**Solution**: Run `npx prisma db push` first to create the schema.

### Permission Issues
```
Error: permission denied for table districts
```
**Solution**: Check your Supabase RLS policies and ensure the anon key has proper permissions.

## 🎨 Customization

You can modify the sample data by editing:
- `scripts/seed-supabase.ts` - Main seeding script
- `scripts/update-schema.sql` - Database schema updates

## 📞 Support

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your Supabase project settings
3. Ensure your environment variables are correctly set
4. Check your internet connection

---

**🎯 Ready to go!** Your Maharashtra Sepaktakraw Association website should now be fully functional with realistic data across all pages.
