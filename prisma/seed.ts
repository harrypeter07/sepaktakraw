/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const districts = [
    "Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana","Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna","Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded","Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad","Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal",
  ];

  for (const name of districts) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    await prisma.district.upsert({
      where: { slug },
      update: {},
      create: { slug, name },
    });
  }

  const nagpur = await prisma.district.findFirst({ where: { slug: "nagpur" } });
  if (nagpur) {
    await prisma.official.createMany({
      data: [
        { name: "John Doe", position: "President", email: "john@example.com", districtId: nagpur.id },
        { name: "Jane Smith", position: "Secretary", email: "jane@example.com", districtId: nagpur.id },
      ],
      skipDuplicates: true,
    });
  }

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: { email: "admin@example.com", role: Role.SUPER_ADMIN },
  });

  // Default forms
  await prisma.formDef.upsert({
    where: { key: "form1" },
    update: {},
    create: {
      key: "form1",
      title: "General Registration",
      desc: "Basic registration form",
      schema: [
        { key: "fullName", type: "text", label: "Full Name", required: true, maxLen: 100 },
        { key: "email", type: "email", label: "Email", required: true },
        { key: "district", type: "select", label: "District", options: districts, required: true },
      ] as any,
    },
  });

  await prisma.formDef.upsert({
    where: { key: "form2" },
    update: {},
    create: {
      key: "form2",
      title: "Event Entry",
      desc: "Enter teams for events",
      schema: [
        { key: "teamName", type: "text", label: "Team Name", required: true },
        { key: "category", type: "select", label: "Category", options: ["Men","Women","U19"], required: true },
        { key: "attachment", type: "file", label: "Attachment (PDF)", accept: ["application/pdf"] },
      ] as any,
    },
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});


