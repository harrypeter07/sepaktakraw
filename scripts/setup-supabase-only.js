#!/usr/bin/env node
/**
 * Supabase-Only Database Setup Script
 * 
 * This script will:
 * 1. Seed the Supabase database with comprehensive sample data
 * 2. Skip Prisma operations since we're using Supabase directly
 * 
 * Run with: node scripts/setup-supabase-only.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting Supabase Database Setup...\n');

async function runCommand(command, description) {
  console.log(`📋 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed successfully!\n`);
  } catch (error) {
    console.error(`❌ Error during ${description.toLowerCase()}:`, error.message);
    throw error;
  }
}

async function setupSupabaseDatabase() {
  try {
    // Step 1: Check if we have the required environment variables
    console.log('🔍 Checking environment configuration...');
    
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
      console.error('❌ .env.local file not found!');
      console.log('Please create a .env.local file with your Supabase credentials:');
      console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
      console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
      process.exit(1);
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (!envContent.includes('NEXT_PUBLIC_SUPABASE_URL') || !envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY')) {
      console.error('❌ Supabase environment variables not found in .env.local!');
      console.log('Please add the following to your .env.local file:');
      console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
      console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
      process.exit(1);
    }
    
    console.log('✅ Environment configuration looks good!\n');

    // Step 2: Install tsx if not available
    try {
      execSync('npx tsx --version', { stdio: 'ignore' });
    } catch (error) {
      console.log('📦 Installing tsx for TypeScript execution...');
      await runCommand('npm install -g tsx', 'Installing tsx globally');
    }

    // Step 3: Run the seeding script
    await runCommand('npx tsx scripts/seed-supabase.ts', 'Seeding Supabase database with sample data');

    console.log('🎉 Supabase database setup completed successfully!');
    console.log('\n📋 What was set up:');
    console.log('   ✅ 10 districts with contact information');
    console.log('   ✅ 10 officials across districts');
    console.log('   ✅ 16 teams in various categories');
    console.log('   ✅ 8 match results with scores and notes');
    console.log('   ✅ 8 notices with attachments and priorities');
    console.log('   ✅ 6 users with different roles');
    console.log('   ✅ 8 static documents for compliance');
    console.log('   ✅ 3 form definitions');
    console.log('   ✅ 3 sample form submissions');
    
    console.log('\n🚀 Your website is now ready!');
    console.log('   • Visit /districts to see all districts');
    console.log('   • Visit /notices to see categorized notices');
    console.log('   • Visit /results to see match results');
    console.log('   • Visit /admin to access admin features');
    
    console.log('\n💡 Next steps:');
    console.log('   • Update your Supabase RLS policies if needed');
    console.log('   • Customize the sample data as required');
    console.log('   • Test all pages to ensure everything works');
    
    console.log('\n⚠️  Note: If you see any schema errors, you may need to:');
    console.log('   1. Run the SQL commands in scripts/update-schema.sql manually in Supabase');
    console.log('   2. Or create the missing fields through the Supabase dashboard');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check your Supabase credentials in .env.local');
    console.log('   2. Ensure your Supabase project is active');
    console.log('   3. Verify your database schema matches the expected structure');
    console.log('   4. Check your internet connection');
    console.log('   5. If schema errors occur, run the SQL in scripts/update-schema.sql manually');
    process.exit(1);
  }
}

// Run the setup
if (require.main === module) {
  setupSupabaseDatabase().catch(console.error);
}

module.exports = setupSupabaseDatabase;
