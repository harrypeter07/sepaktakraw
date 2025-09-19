#!/usr/bin/env node
/**
 * Simple runner script for the Supabase seeding
 * This script runs the TypeScript seeding file using tsx
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Supabase Database Seeding...\n');

try {
  // Check if tsx is available
  try {
    execSync('npx tsx --version', { stdio: 'ignore' });
  } catch (error) {
    console.log('📦 Installing tsx for TypeScript execution...');
    execSync('npm install -g tsx', { stdio: 'inherit' });
  }

  // Run the seeding script
  const scriptPath = path.join(__dirname, 'seed-supabase.ts');
  execSync(`npx tsx "${scriptPath}"`, { stdio: 'inherit' });
  
  console.log('\n✅ Seeding completed successfully!');
} catch (error) {
  console.error('\n❌ Error running seeding script:', error.message);
  process.exit(1);
}
