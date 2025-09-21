# Debug Guide for Database Issues

## 🔍 **Step 1: Test Environment Variables**

First, check if your environment variables are being loaded correctly:

```bash
node scripts/test-env.js
```

This should show:
- ✅ NEXT_PUBLIC_SUPABASE_URL: Set
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Set

## 🔍 **Step 2: Add Sample Data**

If environment variables are working, add sample data:

```bash
node scripts/run-sample-data.js
```

This will add:
- 5 sample notices
- 5 sample results  
- 6 sample districts
- 3 sample elections

## 🔍 **Step 3: Check Browser Console**

Open your browser's developer console and look for these logs:

### **Server-side logs (in terminal where you run `npm run dev`):**
```
Fetching results from database...
Results fetched successfully: 5 items
Fetching notices from database...
Notices fetched successfully: 5 items
Fetching districts from database...
Districts fetched successfully: 6 items
Fetching elections from database...
Elections fetched successfully: 3 items
```

### **Client-side logs (in browser console):**
```
ModernHeroSection received data:
recentNotices: 5 items
recentResults: 5 items
recentElections: 3 items
Combined recentContent: 5 items
recentContent details: [array of items]
```

## 🔍 **Step 4: Common Issues & Solutions**

### **Issue 1: Environment Variables Not Loading**
**Symptoms:** `Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables`

**Solutions:**
1. Make sure `.env.local` file exists in project root
2. Check file contents:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Restart your development server: `npm run dev`

### **Issue 2: Database Connection Errors**
**Symptoms:** `Error fetching [table]: [error details]`

**Solutions:**
1. Check if your Supabase project is active
2. Verify table names are correct (Result, Notice, District)
3. Check if you have data in your tables
4. Verify RLS (Row Level Security) policies allow public access

### **Issue 3: No Data Displaying**
**Symptoms:** Console shows data fetched but UI shows empty

**Solutions:**
1. Check if `recentContent.length > 0` in console
2. Verify the data structure matches expected format
3. Check if there are any JavaScript errors in browser console

## 🔍 **Step 5: Manual Database Check**

You can also manually check your Supabase database:

1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Check these tables have data:
   - `Result` (should have 5 rows)
   - `Notice` (should have 5 rows)
   - `District` (should have 6 rows)
   - `Election` (should have 3 rows)

## 🔍 **Step 6: Test Individual Queries**

You can test individual queries in Supabase SQL Editor:

```sql
-- Test notices
SELECT * FROM "Notice" WHERE published = true ORDER BY "createdAt" DESC LIMIT 5;

-- Test results  
SELECT * FROM "Result" WHERE published = true ORDER BY date DESC LIMIT 3;

-- Test districts
SELECT * FROM "District" ORDER BY name ASC LIMIT 6;
```

## 🎯 **Expected Result**

After all steps, you should see:
- **Left Column**: Sepaktakraw Association info with statistics
- **Center Column**: Hero image with medal badge
- **Right Column**: Latest news and notices with real data from database

The right column should show items like:
- "Maharashtra State Championship 2024" (HIGH priority)
- "Youth Development Program Launch" (NORMAL priority)
- "Mumbai District vs Pune District" (Match Result)
- etc.
