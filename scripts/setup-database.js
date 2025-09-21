const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('🔍 Checking database tables...');
  
  const tables = ['Result', 'Notice', 'District', 'Election'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log(`❌ Table ${table}: ${error.message}`);
      } else {
        console.log(`✅ Table ${table}: Exists (${data?.length || 0} records)`);
      }
    } catch (err) {
      console.log(`❌ Table ${table}: ${err.message}`);
    }
  }
}

async function addSampleData() {
  console.log('\n📝 Adding sample data...');
  
  try {
    // Add sample notices
    const { error: noticesError } = await supabase
      .from('Notice')
      .upsert([
        {
          title: 'Maharashtra State Championship 2024',
          slug: 'maharashtra-state-championship-2024',
          body: 'The Maharashtra State Sepaktakraw Championship 2024 will be held from March 15-20, 2024 at the Shivaji Park Sports Complex, Mumbai.',
          category: 'Tournament',
          priority: 'HIGH',
          published: true
        },
        {
          title: 'Youth Development Program Launch',
          slug: 'youth-development-program-launch',
          body: 'We are excited to announce the launch of our new Youth Development Program aimed at nurturing young talent across Maharashtra.',
          category: 'Development',
          priority: 'NORMAL',
          published: true
        },
        {
          title: 'National Team Selection Trials',
          slug: 'national-team-selection-trials',
          body: 'Selection trials for the Indian National Sepaktakraw Team will be conducted on February 25-26, 2024.',
          category: 'Selection',
          priority: 'HIGH',
          published: true
        }
      ], { onConflict: 'slug' });

    if (noticesError) {
      console.log('❌ Error adding notices:', noticesError.message);
    } else {
      console.log('✅ Notices added successfully');
    }

    // Add sample results
    const { error: resultsError } = await supabase
      .from('Result')
      .upsert([
        {
          level: 'State',
          stage: 'Final',
          teamA: 'Mumbai District',
          teamB: 'Pune District',
          scoreA: 21,
          scoreB: 18,
          date: '2024-01-15',
          venue: 'Shivaji Park Sports Complex',
          published: true
        },
        {
          level: 'District',
          stage: 'Semi-Final',
          teamA: 'Thane District',
          teamB: 'Nashik District',
          scoreA: 21,
          scoreB: 15,
          date: '2024-01-10',
          venue: 'Thane Sports Center',
          published: true
        }
      ], { onConflict: 'id' });

    if (resultsError) {
      console.log('❌ Error adding results:', resultsError.message);
    } else {
      console.log('✅ Results added successfully');
    }

    // Add sample districts
    const { error: districtsError } = await supabase
      .from('District')
      .upsert([
        {
          name: 'Mumbai',
          slug: 'mumbai',
          about: 'Mumbai District Sepaktakraw Association - Leading the sport in the financial capital of India',
          updatedAt: new Date().toISOString()
        },
        {
          name: 'Pune',
          slug: 'pune',
          about: 'Pune District Sepaktakraw Association - Promoting sepaktakraw in the cultural capital of Maharashtra',
          updatedAt: new Date().toISOString()
        },
        {
          name: 'Nagpur',
          slug: 'nagpur',
          about: 'Nagpur District Sepaktakraw Association - Developing sepaktakraw in Vidarbha region',
          updatedAt: new Date().toISOString()
        }
      ], { onConflict: 'slug' });

    if (districtsError) {
      console.log('❌ Error adding districts:', districtsError.message);
    } else {
      console.log('✅ Districts added successfully');
    }

    // Add sample elections
    const { error: electionsError } = await supabase
      .from('Election')
      .upsert([
        {
          title: 'District President Election 2024',
          description: 'Election for the position of District President across all districts in Maharashtra',
          startDate: '2024-02-01',
          endDate: '2024-02-28',
          status: 'ACTIVE',
          type: 'GENERAL',
          published: true,
          updatedAt: new Date().toISOString()
        }
      ], { onConflict: 'id' });

    if (electionsError) {
      console.log('❌ Error adding elections:', electionsError.message);
    } else {
      console.log('✅ Elections added successfully');
    }

  } catch (error) {
    console.error('❌ Error adding sample data:', error.message);
  }
}

async function testDataFetch() {
  console.log('\n🧪 Testing data fetch...');
  
  try {
    // Test notices
    const { data: notices, error: noticesError } = await supabase
      .from('Notice')
      .select('*')
      .eq('published', true)
      .limit(3);
    
    if (noticesError) {
      console.log('❌ Error fetching notices:', noticesError.message);
    } else {
      console.log(`✅ Notices fetched: ${notices?.length || 0} items`);
    }

    // Test results
    const { data: results, error: resultsError } = await supabase
      .from('Result')
      .select('*')
      .eq('published', true)
      .limit(3);
    
    if (resultsError) {
      console.log('❌ Error fetching results:', resultsError.message);
    } else {
      console.log(`✅ Results fetched: ${results?.length || 0} items`);
    }

    // Test districts
    const { data: districts, error: districtsError } = await supabase
      .from('District')
      .select('*')
      .limit(3);
    
    if (districtsError) {
      console.log('❌ Error fetching districts:', districtsError.message);
    } else {
      console.log(`✅ Districts fetched: ${districts?.length || 0} items`);
    }

  } catch (error) {
    console.error('❌ Error testing data fetch:', error.message);
  }
}

async function main() {
  console.log('🚀 Database Setup and Test Script');
  console.log('=====================================');
  
  await checkTables();
  await addSampleData();
  await testDataFetch();
  
  console.log('\n✅ Setup complete! Check your application at http://localhost:3001');
}

main().catch(console.error);