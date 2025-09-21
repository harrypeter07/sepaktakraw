# Database Setup and Sample Data

## Quick Setup

### 1. Add Sample Data to Supabase

Run the sample data script to populate your database with test data:

```bash
# Make sure you have your Supabase environment variables set
node scripts/run-sample-data.js
```

Or manually run the SQL in your Supabase SQL Editor:

```sql
-- Copy and paste the contents of add-sample-data.sql into your Supabase SQL Editor
```

### 2. Environment Variables

Make sure you have these environment variables set in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Schema

The sample data includes:

- **5 Sample Notices** - Various categories (Tournament, Development, Administration, Selection, Equipment)
- **5 Sample Results** - Match results from different levels (State, District)
- **6 Sample Districts** - Major districts in Maharashtra
- **3 Sample Elections** - Different types of elections (General, By-Election)

### 4. What This Fixes

- ✅ **Database Queries**: Fixed table names (Result, Notice, District instead of results, notices, districts)
- ✅ **Layout Spacing**: Reduced padding and added proper borders with 10px gaps
- ✅ **Sample Data**: Added realistic test data for all sections
- ✅ **Type Safety**: Fixed TypeScript types for better development experience

### 5. Testing

After running the sample data script, you should see:

1. **Left Column**: Sepaktakraw Association info with statistics
2. **Center Column**: Hero image with medal badge
3. **Right Column**: Latest news and notices from the database

The news and events should now display properly with real data from your Supabase database!