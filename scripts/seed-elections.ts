import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedElections() {
  console.log('🌱 Seeding elections data...');

  try {
    // Create sample elections
    const election1 = await prisma.election.create({
      data: {
        title: 'Elections of Office Bearers & Executive Members',
        description: 'Official elections for the term 2024-2028. All eligible members are encouraged to participate in the democratic process.',
        startDate: new Date('2024-11-01T00:00:00Z'),
        endDate: new Date('2024-12-15T23:59:59Z'),
        status: 'UPCOMING',
        type: 'GENERAL',
        published: true,
      }
    });

    const election2 = await prisma.election.create({
      data: {
        title: 'By-Election for Secretary Position',
        description: 'Special election to fill the vacant Secretary General position following the resignation of the previous office bearer.',
        startDate: new Date('2024-10-01T00:00:00Z'),
        endDate: new Date('2024-10-31T23:59:59Z'),
        status: 'COMPLETED',
        type: 'BY_ELECTION',
        published: true,
      }
    });

    // Create election documents
    await prisma.electionDocument.createMany({
      data: [
        {
          title: 'Election Notice 2024-2028',
          type: 'NOTICE',
          content: 'Official notice for the election of office bearers and executive members for the term 2024-2028. All nominations must be submitted by the specified deadline.',
          electionId: election1.id,
        },
        {
          title: 'Election Schedule',
          type: 'SCHEDULE',
          content: 'Detailed schedule of all election-related activities and deadlines including nomination period, campaigning, and voting.',
          electionId: election1.id,
        },
        {
          title: 'Nomination Forms Package',
          type: 'FORM',
          content: 'Complete set of nomination forms for all positions including President, Secretary General, Treasurer, Vice President, and Executive Members.',
          electionId: election1.id,
        },
        {
          title: 'Electoral College List',
          type: 'VOTER_INFO',
          content: 'Complete list of eligible voters and electoral college composition as per the association constitution.',
          electionId: election1.id,
        },
        {
          title: 'Returning Officer Appointment',
          type: 'APPOINTMENT',
          content: 'Official appointment letter for the Returning Officer who will oversee the election process.',
          electionId: election1.id,
        },
        {
          title: 'By-Election Notice',
          type: 'NOTICE',
          content: 'Notice for the by-election to fill the vacant Secretary General position.',
          electionId: election2.id,
        },
      ]
    });

    // Get districts for candidate assignment
    const districts = await prisma.district.findMany();
    
    if (districts.length > 0) {
      // Create candidates for election 1
      await prisma.candidate.createMany({
        data: [
          {
            name: 'Rajesh Kumar',
            position: 'President',
            districtId: districts[0]?.id,
            electionId: election1.id,
            bio: 'Experienced administrator with 10+ years in sports management. Former national team coach and current district president.',
            manifesto: 'Focus on youth development, infrastructure improvement, and international exposure for Maharashtra players.',
            status: 'ACTIVE',
          },
          {
            name: 'Priya Sharma',
            position: 'Secretary General',
            districtId: districts[1]?.id,
            electionId: election1.id,
            bio: 'Former national player and certified coach with extensive experience in tournament organization.',
            manifesto: 'Streamline administrative processes, improve communication, and enhance member services.',
            status: 'ACTIVE',
          },
          {
            name: 'Amit Patel',
            position: 'Treasurer',
            districtId: districts[0]?.id,
            electionId: election1.id,
            bio: 'Chartered accountant with expertise in sports finance and non-profit management.',
            manifesto: 'Transparent financial management, proper budgeting, and sustainable financial growth.',
            status: 'ACTIVE',
          },
          {
            name: 'Dr. Meera Singh',
            position: 'Vice President',
            districtId: districts[1]?.id,
            electionId: election1.id,
            bio: 'Sports medicine specialist and former international referee with deep understanding of the sport.',
            manifesto: 'Focus on player welfare, medical support, and fair play initiatives.',
            status: 'ACTIVE',
          },
          {
            name: 'Vikram Joshi',
            position: 'Executive Member',
            districtId: districts[2]?.id,
            electionId: election1.id,
            bio: 'Youth coach and former state champion with passion for grassroots development.',
            manifesto: 'Promote youth programs, coaching development, and school-level participation.',
            status: 'ACTIVE',
          },
          {
            name: 'Sunita Reddy',
            position: 'Executive Member',
            districtId: districts[0]?.id,
            electionId: election1.id,
            bio: 'Women\'s team coach and advocate for gender equality in sports.',
            manifesto: 'Increase women\'s participation, create safe spaces, and promote women\'s leadership.',
            status: 'ACTIVE',
          },
        ]
      });

      // Create candidates for election 2 (by-election)
      await prisma.candidate.createMany({
        data: [
          {
            name: 'Arjun Mehta',
            position: 'Secretary General',
            districtId: districts[1]?.id,
            electionId: election2.id,
            bio: 'Experienced administrator with strong organizational skills and communication abilities.',
            manifesto: 'Improve member communication, streamline processes, and enhance digital presence.',
            status: 'ACTIVE',
          },
          {
            name: 'Kavita Desai',
            position: 'Secretary General',
            districtId: districts[0]?.id,
            electionId: election2.id,
            bio: 'Former district secretary with proven track record in event management and member services.',
            manifesto: 'Focus on member engagement, transparent communication, and efficient administration.',
            status: 'ACTIVE',
          },
        ]
      });

      // Create some sample votes for the completed election
      const candidates = await prisma.candidate.findMany({
        where: { electionId: election2.id }
      });

      if (candidates.length > 0) {
        await prisma.vote.createMany({
          data: [
            {
              candidateId: candidates[0].id,
              electionId: election2.id,
              voterEmail: 'voter1@example.com',
              ipAddress: '192.168.1.1',
            },
            {
              candidateId: candidates[0].id,
              electionId: election2.id,
              voterEmail: 'voter2@example.com',
              ipAddress: '192.168.1.2',
            },
            {
              candidateId: candidates[1].id,
              electionId: election2.id,
              voterEmail: 'voter3@example.com',
              ipAddress: '192.168.1.3',
            },
            {
              candidateId: candidates[0].id,
              electionId: election2.id,
              voterEmail: 'voter4@example.com',
              ipAddress: '192.168.1.4',
            },
            {
              candidateId: candidates[1].id,
              electionId: election2.id,
              voterEmail: 'voter5@example.com',
              ipAddress: '192.168.1.5',
            },
          ]
        });
      }
    }

    console.log('✅ Elections data seeded successfully!');
    console.log(`   - Created ${2} elections`);
    console.log(`   - Created ${6} election documents`);
    console.log(`   - Created ${8} candidates`);
    console.log(`   - Created ${5} sample votes`);

  } catch (error) {
    console.error('❌ Error seeding elections data:', error);
    throw error;
  }
}

// Run the seed function
seedElections()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
