const { PrismaClient } = require('@prisma/client');

async function testDatabaseConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test basic queries
    const districtCount = await prisma.district.count();
    const resultCount = await prisma.result.count();
    const noticeCount = await prisma.notice.count();
    const userCount = await prisma.user.count();
    
    console.log('📊 Database Statistics:');
    console.log(`   Districts: ${districtCount}`);
    console.log(`   Results: ${resultCount}`);
    console.log(`   Notices: ${noticeCount}`);
    console.log(`   Users: ${userCount}`);
    
    // Test a sample query
    const sampleDistricts = await prisma.district.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            officials: true,
            teams: true,
            results: true,
            users: true
          }
        }
      }
    });
    
    console.log('🏢 Sample Districts:');
    sampleDistricts.forEach(district => {
      console.log(`   ${district.name} (${district.slug}) - ${district._count.officials} officials, ${district._count.teams} teams`);
    });
    
    console.log('✅ All database tests passed!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();

