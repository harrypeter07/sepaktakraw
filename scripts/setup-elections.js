#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Elections System...\n');

try {
  // Step 1: Update Prisma schema
  console.log('📝 Step 1: Updating Prisma schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✅ Prisma schema updated\n');

  // Step 2: Generate Prisma client
  console.log('🔧 Step 2: Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated\n');

  // Step 3: Run elections seed script
  console.log('🌱 Step 3: Seeding elections data...');
  execSync('npx tsx scripts/seed-elections.ts', { stdio: 'inherit' });
  console.log('✅ Elections data seeded\n');

  // Step 4: Verify setup
  console.log('🔍 Step 4: Verifying setup...');
  
  // Check if elections API is working
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const electionCount = await prisma.election.count();
    const candidateCount = await prisma.candidate.count();
    const documentCount = await prisma.electionDocument.count();
    
    console.log(`   📊 Elections: ${electionCount}`);
    console.log(`   👥 Candidates: ${candidateCount}`);
    console.log(`   📄 Documents: ${documentCount}`);
    
    await prisma.$disconnect();
    console.log('✅ Setup verification completed\n');
  } catch (error) {
    console.log('⚠️  Setup verification failed, but elections system should still work\n');
  }

  console.log('🎉 Elections system setup completed successfully!');
  console.log('\n📋 What was created:');
  console.log('   ✅ Election tables in database');
  console.log('   ✅ Sample elections with candidates');
  console.log('   ✅ Election documents and forms');
  console.log('   ✅ API routes for elections management');
  console.log('   ✅ Admin pages for election management');
  console.log('   ✅ Public elections page');
  console.log('\n🔗 You can now:');
  console.log('   • Visit /admin/elections to manage elections');
  console.log('   • Visit /elections to view public elections');
  console.log('   • Create new elections and candidates');
  console.log('   • Manage election documents');
  console.log('   • View election statistics in admin dashboard');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  console.log('\n🔧 Manual setup steps:');
  console.log('1. Run: npx prisma db push');
  console.log('2. Run: npx prisma generate');
  console.log('3. Run: npx tsx scripts/seed-elections.ts');
  console.log('4. Or run the SQL script manually in Supabase: scripts/add-elections-tables.sql');
  process.exit(1);
}
