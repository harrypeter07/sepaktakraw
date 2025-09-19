#!/usr/bin/env tsx
/**
 * Supabase Data Seeding Script
 * 
 * This script populates your Supabase database with comprehensive sample data
 * to make all pages functional and properly visualized.
 * 
 * Run with: npx tsx scripts/seed-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import { env } from '../env.mjs';

// Initialize Supabase client
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Sample data for Maharashtra districts
const districts = [
  { name: "Mumbai City", slug: "mumbai-city", about: "The financial capital of India, Mumbai City district is home to some of the most competitive sepaktakraw teams in Maharashtra.", address: "Mumbai, Maharashtra", phone: "+91-22-2204-1234", email: "mumbai@mskt.org", website: "https://mumbai.mskt.org" },
  { name: "Mumbai Suburban", slug: "mumbai-suburban", about: "Covering the suburban areas of Mumbai, this district has a strong tradition of sepaktakraw with excellent facilities.", address: "Mumbai Suburban, Maharashtra", phone: "+91-22-2204-5678", email: "suburban@mskt.org", website: "https://suburban.mskt.org" },
  { name: "Pune", slug: "pune", about: "Known as the cultural capital of Maharashtra, Pune has a rich history in sports including sepaktakraw.", address: "Pune, Maharashtra", phone: "+91-20-2553-1234", email: "pune@mskt.org", website: "https://pune.mskt.org" },
  { name: "Nagpur", slug: "nagpur", about: "The orange city and winter capital of Maharashtra, Nagpur has been a stronghold for sepaktakraw development.", address: "Nagpur, Maharashtra", phone: "+91-712-255-1234", email: "nagpur@mskt.org", website: "https://nagpur.mskt.org" },
  { name: "Thane", slug: "thane", about: "A rapidly growing district with modern sports infrastructure and active sepaktakraw community.", address: "Thane, Maharashtra", phone: "+91-22-2534-1234", email: "thane@mskt.org", website: "https://thane.mskt.org" },
  { name: "Nashik", slug: "nashik", about: "Known for its wine industry and religious significance, Nashik also has a vibrant sports culture.", address: "Nashik, Maharashtra", phone: "+91-253-257-1234", email: "nashik@mskt.org", website: "https://nashik.mskt.org" },
  { name: "Aurangabad", slug: "aurangabad", about: "Home to the famous Ajanta and Ellora caves, Aurangabad has a growing sepaktakraw scene.", address: "Aurangabad, Maharashtra", phone: "+91-240-240-1234", email: "aurangabad@mskt.org", website: "https://aurangabad.mskt.org" },
  { name: "Solapur", slug: "solapur", about: "Known for its textile industry, Solapur has been developing its sports infrastructure including sepaktakraw.", address: "Solapur, Maharashtra", phone: "+91-217-273-1234", email: "solapur@mskt.org", website: "https://solapur.mskt.org" },
  { name: "Kolhapur", slug: "kolhapur", about: "Famous for its wrestling tradition, Kolhapur is now embracing sepaktakraw with enthusiasm.", address: "Kolhapur, Maharashtra", phone: "+91-231-265-1234", email: "kolhapur@mskt.org", website: "https://kolhapur.mskt.org" },
  { name: "Sangli", slug: "sangli", about: "Known for its sugar industry, Sangli has a dedicated sports community supporting sepaktakraw.", address: "Sangli, Maharashtra", phone: "+91-233-230-1234", email: "sangli@mskt.org", website: "https://sangli.mskt.org" }
];

// Sample officials data
const officials = [
  { name: "Dr. Rajesh Kumar", position: "President", phone: "+91-98765-43210", email: "president@mskt.org", districtId: 1 },
  { name: "Mrs. Priya Sharma", position: "Secretary", phone: "+91-98765-43211", email: "secretary@mskt.org", districtId: 1 },
  { name: "Mr. Amit Patel", position: "Treasurer", phone: "+91-98765-43212", email: "treasurer@mskt.org", districtId: 1 },
  { name: "Ms. Sneha Desai", position: "Vice President", phone: "+91-98765-43213", email: "vp@mskt.org", districtId: 2 },
  { name: "Mr. Vikram Singh", position: "Joint Secretary", phone: "+91-98765-43214", email: "js@mskt.org", districtId: 2 },
  { name: "Dr. Anjali Joshi", position: "President", phone: "+91-98765-43215", email: "president.pune@mskt.org", districtId: 3 },
  { name: "Mr. Ravi Kumar", position: "Secretary", phone: "+91-98765-43216", email: "secretary.pune@mskt.org", districtId: 3 },
  { name: "Mrs. Kavita Reddy", position: "Treasurer", phone: "+91-98765-43217", email: "treasurer.pune@mskt.org", districtId: 3 },
  { name: "Mr. Suresh Agarwal", position: "President", phone: "+91-98765-43218", email: "president.nagpur@mskt.org", districtId: 4 },
  { name: "Ms. Deepika Sharma", position: "Secretary", phone: "+91-98765-43219", email: "secretary.nagpur@mskt.org", districtId: 4 }
];

// Sample teams data
const teams = [
  { name: "Mumbai Thunder", category: "Men", districtId: 1 },
  { name: "Mumbai Lightning", category: "Women", districtId: 1 },
  { name: "Mumbai Warriors", category: "U19", districtId: 1 },
  { name: "Suburban Stars", category: "Men", districtId: 2 },
  { name: "Suburban Eagles", category: "Women", districtId: 2 },
  { name: "Pune Panthers", category: "Men", districtId: 3 },
  { name: "Pune Phoenix", category: "Women", districtId: 3 },
  { name: "Pune Tigers", category: "U19", districtId: 3 },
  { name: "Nagpur Lions", category: "Men", districtId: 4 },
  { name: "Nagpur Cheetahs", category: "Women", districtId: 4 },
  { name: "Thane Titans", category: "Men", districtId: 5 },
  { name: "Thane Warriors", category: "Women", districtId: 5 },
  { name: "Nashik Ninjas", category: "Men", districtId: 6 },
  { name: "Nashik Knights", category: "Women", districtId: 6 },
  { name: "Aurangabad Avengers", category: "Men", districtId: 7 },
  { name: "Aurangabad Angels", category: "Women", districtId: 7 }
];

// Sample results data
const results = [
  {
    level: "State",
    stage: "Final",
    matchNo: "SF-001",
    teamA: "Mumbai Thunder",
    teamB: "Pune Panthers",
    scoreA: 21,
    scoreB: 19,
    date: "2024-12-15T10:00:00Z",
    venue: "Mumbai Sports Complex",
    districtId: 1,
    tags: ["state-championship", "final", "men"],
    notes: "Excellent match with Mumbai Thunder winning in a close contest. Both teams displayed exceptional skill and sportsmanship.",
    published: true
  },
  {
    level: "District",
    stage: "Semi-Final",
    matchNo: "DF-002",
    teamA: "Nagpur Lions",
    teamB: "Thane Titans",
    scoreA: 18,
    scoreB: 21,
    date: "2024-12-10T14:00:00Z",
    venue: "Nagpur Indoor Stadium",
    districtId: 4,
    tags: ["district-championship", "semi-final", "men"],
    notes: "Thane Titans advance to the final with a strong performance in the second set.",
    published: true
  },
  {
    level: "National",
    stage: "Quarter-Final",
    matchNo: "NF-003",
    teamA: "Maharashtra A",
    teamB: "Karnataka A",
    scoreA: 21,
    scoreB: 17,
    date: "2024-12-05T16:00:00Z",
    venue: "Delhi Sports Complex",
    districtId: null,
    tags: ["national-championship", "quarter-final", "men"],
    published: true
  },
  {
    level: "District",
    stage: "Final",
    matchNo: "DF-004",
    teamA: "Mumbai Lightning",
    teamB: "Pune Phoenix",
    scoreA: 21,
    scoreB: 15,
    date: "2024-11-28T11:00:00Z",
    venue: "Mumbai Sports Complex",
    districtId: 1,
    tags: ["district-championship", "final", "women"],
    published: true
  },
  {
    level: "State",
    stage: "Semi-Final",
    matchNo: "SF-005",
    teamA: "Nashik Ninjas",
    teamB: "Aurangabad Avengers",
    scoreA: 19,
    scoreB: 21,
    date: "2024-11-25T15:00:00Z",
    venue: "Nashik Sports Academy",
    districtId: 6,
    tags: ["state-championship", "semi-final", "men"],
    published: true
  },
  {
    level: "U19",
    stage: "Final",
    matchNo: "UF-006",
    teamA: "Mumbai Warriors",
    teamB: "Pune Tigers",
    scoreA: 21,
    scoreB: 18,
    date: "2024-11-20T12:00:00Z",
    venue: "Pune Sports Complex",
    districtId: 3,
    tags: ["u19-championship", "final", "youth"],
    published: true
  },
  {
    level: "District",
    stage: "League Match",
    matchNo: "DL-007",
    teamA: "Thane Warriors",
    teamB: "Suburban Eagles",
    scoreA: null,
    scoreB: null,
    date: "2024-12-20T10:00:00Z",
    venue: "Thane Sports Center",
    districtId: 5,
    tags: ["district-league", "women"],
    published: true
  },
  {
    level: "Training",
    stage: "Practice Match",
    matchNo: "TM-008",
    teamA: "Nagpur Cheetahs",
    teamB: "Solapur Stars",
    scoreA: 15,
    scoreB: 21,
    date: "2024-12-18T14:00:00Z",
    venue: "Nagpur Training Center",
    districtId: 4,
    tags: ["training", "practice", "women"],
    published: true
  }
];

// Sample notices data
const notices = [
  {
    title: "State Championship 2024 - Registration Open",
    slug: "state-championship-2024-registration",
    body: "Registration for the Maharashtra State Sepaktakraw Championship 2024 is now open. All districts are invited to participate. Last date for registration is December 30, 2024.",
    category: "Tournament",
    fileUrl: "/documents/state-championship-2024.pdf",
    attachments: ["state-championship-2024.pdf", "registration-form.pdf"],
    priority: "HIGH",
    published: true,
    createdAt: "2024-12-01T10:00:00Z"
  },
  {
    title: "Coaching Workshop - Advanced Techniques",
    slug: "coaching-workshop-advanced-techniques",
    body: "A comprehensive coaching workshop on advanced sepaktakraw techniques will be conducted on January 15, 2025. All district coaches are encouraged to attend.",
    category: "Training",
    fileUrl: "/documents/coaching-workshop.pdf",
    attachments: ["coaching-workshop.pdf", "workshop-schedule.pdf"],
    priority: "NORMAL",
    published: true,
    createdAt: "2024-11-28T14:00:00Z"
  },
  {
    title: "Anti-Doping Awareness Program",
    slug: "anti-doping-awareness-program",
    body: "Important notice regarding anti-doping regulations and awareness program. All athletes and coaches must attend the mandatory session on January 10, 2025.",
    category: "Compliance",
    fileUrl: "/documents/anti-doping-guidelines.pdf",
    attachments: ["anti-doping-guidelines.pdf", "awareness-brochure.pdf"],
    priority: "HIGH",
    published: true,
    createdAt: "2024-11-25T09:00:00Z"
  },
  {
    title: "Equipment Standards Update",
    slug: "equipment-standards-update",
    body: "Updated equipment standards for sepaktakraw balls and court specifications. All districts must ensure compliance with the new standards by February 1, 2025.",
    category: "Rules",
    fileUrl: "/documents/equipment-standards-2025.pdf",
    attachments: ["equipment-standards-2025.pdf"],
    priority: "NORMAL",
    published: true,
    createdAt: "2024-11-20T16:00:00Z"
  },
  {
    title: "Annual General Meeting 2025",
    slug: "annual-general-meeting-2025",
    body: "Notice for the Annual General Meeting of Maharashtra Sepaktakraw Association to be held on February 15, 2025, at Mumbai Sports Complex.",
    category: "Meeting",
    fileUrl: "/documents/agm-notice-2025.pdf",
    attachments: ["agm-notice-2025.pdf", "agenda.pdf"],
    priority: "HIGH",
    published: true,
    createdAt: "2024-11-15T11:00:00Z"
  },
  {
    title: "Youth Development Program Launch",
    slug: "youth-development-program-launch",
    body: "Launch of the new Youth Development Program aimed at nurturing young talent in sepaktakraw. Applications open for U16 and U19 categories.",
    category: "Development",
    fileUrl: "/documents/youth-program.pdf",
    attachments: ["youth-program.pdf", "application-form.pdf"],
    priority: "NORMAL",
    published: true,
    createdAt: "2024-11-10T13:00:00Z"
  },
  {
    title: "International Tournament Invitation",
    slug: "international-tournament-invitation",
    body: "Maharashtra Sepaktakraw Association has been invited to participate in the South Asian Sepaktakraw Championship 2025. Team selection trials will be held in March.",
    category: "International",
    fileUrl: "/documents/international-invitation.pdf",
    attachments: ["international-invitation.pdf", "selection-criteria.pdf"],
    priority: "HIGH",
    published: true,
    createdAt: "2024-11-05T15:00:00Z"
  },
  {
    title: "Safety Guidelines for Training",
    slug: "safety-guidelines-training",
    body: "Updated safety guidelines for sepaktakraw training sessions. All coaches and athletes must follow these guidelines to ensure safe practice sessions.",
    category: "Safety",
    fileUrl: "/documents/safety-guidelines.pdf",
    attachments: ["safety-guidelines.pdf"],
    priority: "NORMAL",
    published: true,
    createdAt: "2024-10-30T10:00:00Z"
  }
];

// Sample users data
const users = [
  {
    id: "admin-001",
    email: "admin@mskt.org",
    name: "System Administrator",
    role: "SUPER_ADMIN",
    districtId: null
  },
  {
    id: "state-admin-001",
    email: "state.admin@mskt.org",
    name: "State Administrator",
    role: "STATE_ADMIN",
    districtId: null
  },
  {
    id: "district-admin-001",
    email: "mumbai.admin@mskt.org",
    name: "Mumbai District Admin",
    role: "DISTRICT_ADMIN",
    districtId: 1
  },
  {
    id: "district-admin-002",
    email: "pune.admin@mskt.org",
    name: "Pune District Admin",
    role: "DISTRICT_ADMIN",
    districtId: 3
  },
  {
    id: "editor-001",
    email: "editor@mskt.org",
    name: "Content Editor",
    role: "EDITOR",
    districtId: null
  },
  {
    id: "viewer-001",
    email: "viewer@mskt.org",
    name: "General Viewer",
    role: "VIEWER",
    districtId: null
  }
];

// Sample static documents
const staticDocs = [
  {
    section: "Rules",
    title: "Official Sepaktakraw Rules - Regu",
    fileUrl: "/documents/rules-regu.pdf"
  },
  {
    section: "Rules",
    title: "Official Sepaktakraw Rules - Double",
    fileUrl: "/documents/rules-double.pdf"
  },
  {
    section: "Rules",
    title: "Official Sepaktakraw Rules - Quad",
    fileUrl: "/documents/rules-quad.pdf"
  },
  {
    section: "Rules",
    title: "Official Sepaktakraw Rules - Beach",
    fileUrl: "/documents/rules-beach.pdf"
  },
  {
    section: "Compliance",
    title: "Anti-Doping Guidelines",
    fileUrl: "/documents/anti-doping.pdf"
  },
  {
    section: "Compliance",
    title: "RTI Information",
    fileUrl: "/documents/rti-info.pdf"
  },
  {
    section: "Compliance",
    title: "MYAS Guidelines",
    fileUrl: "/documents/myas-guidelines.pdf"
  },
  {
    section: "Compliance",
    title: "Election Procedures",
    fileUrl: "/documents/election-procedures.pdf"
  }
];

// Sample form definitions
const formDefs = [
  {
    key: "player-registration",
    title: "Player Registration Form",
    desc: "Register new players for district teams",
    schema: {
      fields: [
        { key: "fullName", type: "text", label: "Full Name", required: true, maxLength: 100 },
        { key: "dateOfBirth", type: "date", label: "Date of Birth", required: true },
        { key: "gender", type: "select", label: "Gender", options: ["Male", "Female"], required: true },
        { key: "district", type: "select", label: "District", options: districts.map(d => d.name), required: true },
        { key: "category", type: "select", label: "Category", options: ["Men", "Women", "U19", "U16"], required: true },
        { key: "phone", type: "tel", label: "Phone Number", required: true },
        { key: "email", type: "email", label: "Email Address", required: true },
        { key: "emergencyContact", type: "text", label: "Emergency Contact", required: true },
        { key: "medicalCertificate", type: "file", label: "Medical Certificate", accept: ["application/pdf", "image/*"] },
        { key: "idProof", type: "file", label: "ID Proof", accept: ["application/pdf", "image/*"] }
      ]
    },
    active: true
  },
  {
    key: "team-entry",
    title: "Team Entry Form",
    desc: "Enter teams for tournaments and competitions",
    schema: {
      fields: [
        { key: "teamName", type: "text", label: "Team Name", required: true },
        { key: "district", type: "select", label: "District", options: districts.map(d => d.name), required: true },
        { key: "category", type: "select", label: "Category", options: ["Men", "Women", "U19", "U16"], required: true },
        { key: "tournament", type: "select", label: "Tournament", options: ["State Championship", "District Championship", "National Championship"], required: true },
        { key: "players", type: "array", label: "Players", itemSchema: {
          fields: [
            { key: "name", type: "text", label: "Player Name", required: true },
            { key: "position", type: "select", label: "Position", options: ["Tekong", "Apit Kiri", "Apit Kanan"], required: true }
          ]
        }},
        { key: "coach", type: "text", label: "Coach Name", required: true },
        { key: "manager", type: "text", label: "Manager Name", required: true },
        { key: "contactPhone", type: "tel", label: "Contact Phone", required: true },
        { key: "contactEmail", type: "email", label: "Contact Email", required: true }
      ]
    },
    active: true
  },
  {
    key: "event-registration",
    title: "Event Registration Form",
    desc: "Register for training camps, workshops, and other events",
    schema: {
      fields: [
        { key: "eventType", type: "select", label: "Event Type", options: ["Training Camp", "Workshop", "Tournament", "Exhibition"], required: true },
        { key: "participantName", type: "text", label: "Participant Name", required: true },
        { key: "district", type: "select", label: "District", options: districts.map(d => d.name), required: true },
        { key: "role", type: "select", label: "Role", options: ["Player", "Coach", "Official", "Volunteer"], required: true },
        { key: "experience", type: "textarea", label: "Experience/Background", required: false },
        { key: "phone", type: "tel", label: "Phone Number", required: true },
        { key: "email", type: "email", label: "Email Address", required: true },
        { key: "emergencyContact", type: "text", label: "Emergency Contact", required: true },
        { key: "dietaryRequirements", type: "textarea", label: "Dietary Requirements", required: false },
        { key: "accommodationRequired", type: "checkbox", label: "Accommodation Required", required: false }
      ]
    },
    active: true
  }
];

// Sample submissions
const submissions = [
  {
    formKey: "player-registration",
    data: {
      fullName: "Rajesh Kumar",
      dateOfBirth: "2000-05-15",
      gender: "Male",
      district: "Mumbai City",
      category: "Men",
      phone: "+91-98765-43210",
      email: "rajesh.kumar@email.com",
      emergencyContact: "Mrs. Sunita Kumar (+91-98765-43211)",
      medicalCertificate: "medical-cert-rajesh.pdf",
      idProof: "aadhar-rajesh.pdf"
    }
  },
  {
    formKey: "team-entry",
    data: {
      teamName: "Mumbai Thunder",
      district: "Mumbai City",
      category: "Men",
      tournament: "State Championship",
      players: [
        { name: "Rajesh Kumar", position: "Tekong" },
        { name: "Amit Patel", position: "Apit Kiri" },
        { name: "Vikram Singh", position: "Apit Kanan" }
      ],
      coach: "Mr. Suresh Agarwal",
      manager: "Mrs. Priya Sharma",
      contactPhone: "+91-98765-43212",
      contactEmail: "mumbai.thunder@email.com"
    }
  },
  {
    formKey: "event-registration",
    data: {
      eventType: "Training Camp",
      participantName: "Deepika Sharma",
      district: "Nagpur",
      role: "Player",
      experience: "Playing sepaktakraw for 3 years, district level player",
      phone: "+91-98765-43213",
      email: "deepika.sharma@email.com",
      emergencyContact: "Mr. Ravi Sharma (+91-98765-43214)",
      dietaryRequirements: "Vegetarian",
      accommodationRequired: true
    }
  }
];

async function seedDatabase() {
  console.log('🌱 Starting Supabase database seeding...\n');

  try {
    // 1. Seed Districts
    console.log('📍 Seeding Districts...');
    const { data: districtData, error: districtError } = await supabase
      .from('districts')
      .upsert(districts, { onConflict: 'slug' })
      .select();

    if (districtError) {
      console.error('Error seeding districts:', districtError);
      return;
    }
    console.log(`✅ Inserted ${districtData?.length || districts.length} districts`);

    // 2. Seed Officials
    console.log('\n👥 Seeding Officials...');
    const { data: officialData, error: officialError } = await supabase
      .from('officials')
      .upsert(officials, { onConflict: 'id' })
      .select();

    if (officialError) {
      console.error('Error seeding officials:', officialError);
    } else {
      console.log(`✅ Inserted ${officialData?.length || officials.length} officials`);
    }

    // 3. Seed Teams
    console.log('\n🏆 Seeding Teams...');
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .upsert(teams, { onConflict: 'id' })
      .select();

    if (teamError) {
      console.error('Error seeding teams:', teamError);
    } else {
      console.log(`✅ Inserted ${teamData?.length || teams.length} teams`);
    }

    // 4. Seed Results
    console.log('\n📊 Seeding Results...');
    const { data: resultData, error: resultError } = await supabase
      .from('results')
      .upsert(results, { onConflict: 'id' })
      .select();

    if (resultError) {
      console.error('Error seeding results:', resultError);
    } else {
      console.log(`✅ Inserted ${resultData?.length || results.length} results`);
    }

    // 5. Seed Notices
    console.log('\n📢 Seeding Notices...');
    const { data: noticeData, error: noticeError } = await supabase
      .from('notices')
      .upsert(notices, { onConflict: 'slug' })
      .select();

    if (noticeError) {
      console.error('Error seeding notices:', noticeError);
    } else {
      console.log(`✅ Inserted ${noticeData?.length || notices.length} notices`);
    }

    // 6. Seed Users
    console.log('\n👤 Seeding Users...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert(users, { onConflict: 'email' })
      .select();

    if (userError) {
      console.error('Error seeding users:', userError);
    } else {
      console.log(`✅ Inserted ${userData?.length || users.length} users`);
    }

    // 7. Seed Static Documents
    console.log('\n📄 Seeding Static Documents...');
    const { data: docData, error: docError } = await supabase
      .from('staticdocs')
      .upsert(staticDocs, { onConflict: 'id' })
      .select();

    if (docError) {
      console.error('Error seeding static documents:', docError);
    } else {
      console.log(`✅ Inserted ${docData?.length || staticDocs.length} static documents`);
    }

    // 8. Seed Form Definitions
    console.log('\n📝 Seeding Form Definitions...');
    const { data: formData, error: formError } = await supabase
      .from('formdefs')
      .upsert(formDefs, { onConflict: 'key' })
      .select();

    if (formError) {
      console.error('Error seeding form definitions:', formError);
    } else {
      console.log(`✅ Inserted ${formData?.length || formDefs.length} form definitions`);
    }

    // 9. Seed Submissions
    console.log('\n📋 Seeding Submissions...');
    const { data: submissionData, error: submissionError } = await supabase
      .from('submissions')
      .upsert(submissions, { onConflict: 'id' })
      .select();

    if (submissionError) {
      console.error('Error seeding submissions:', submissionError);
    } else {
      console.log(`✅ Inserted ${submissionData?.length || submissions.length} submissions`);
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   • Districts: ${districts.length}`);
    console.log(`   • Officials: ${officials.length}`);
    console.log(`   • Teams: ${teams.length}`);
    console.log(`   • Results: ${results.length}`);
    console.log(`   • Notices: ${notices.length}`);
    console.log(`   • Users: ${users.length}`);
    console.log(`   • Static Documents: ${staticDocs.length}`);
    console.log(`   • Form Definitions: ${formDefs.length}`);
    console.log(`   • Submissions: ${submissions.length}`);
    
    console.log('\n🚀 Your Supabase database is now ready with sample data!');
    console.log('   All pages should now display properly with realistic content.');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

// Run the seeding function
if (require.main === module) {
  seedDatabase().catch(console.error);
}

export default seedDatabase;
