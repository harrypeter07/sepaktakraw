import { prisma } from "@/lib/prisma";

// Database service layer for all data operations
export class DatabaseService {
  // Districts
  async getDistricts() {
    return await prisma.district.findMany({
      include: {
        _count: {
          select: {
            officials: true,
            teams: true,
            results: true,
            users: true
          }
        }
      },
      orderBy: { name: "asc" }
    });
  }

  async getDistrictBySlug(slug: string) {
    return await prisma.district.findUnique({
      where: { slug },
      include: {
        officials: true,
        teams: true,
        results: {
          where: { published: true },
          orderBy: { date: "desc" },
          take: 10
        },
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
  }

  async createDistrict(data: any) {
    return await prisma.district.create({ data });
  }

  async updateDistrict(id: number, data: any) {
    return await prisma.district.update({
      where: { id },
      data
    });
  }

  async deleteDistrict(id: number) {
    return await prisma.district.delete({
      where: { id }
    });
  }

  // Officials
  async getOfficials(districtId?: number) {
    const where = districtId ? { districtId } : {};
    return await prisma.official.findMany({
      where,
      include: { district: true },
      orderBy: { name: "asc" }
    });
  }

  async getOfficial(id: number) {
    return await prisma.official.findUnique({
      where: { id },
      include: { district: true }
    });
  }

  async createOfficial(data: any) {
    return await prisma.official.create({ data });
  }

  async updateOfficial(id: number, data: any) {
    return await prisma.official.update({
      where: { id },
      data
    });
  }

  async deleteOfficial(id: number) {
    return await prisma.official.delete({
      where: { id }
    });
  }

  // Teams
  async getTeams(districtId?: number) {
    const where = districtId ? { districtId } : {};
    return await prisma.team.findMany({
      where,
      include: { district: true },
      orderBy: { name: "asc" }
    });
  }

  async getTeam(id: number) {
    return await prisma.team.findUnique({
      where: { id },
      include: { district: true }
    });
  }

  async createTeam(data: any) {
    return await prisma.team.create({ data });
  }

  async updateTeam(id: number, data: any) {
    return await prisma.team.update({
      where: { id },
      data
    });
  }

  async deleteTeam(id: number) {
    return await prisma.team.delete({
      where: { id }
    });
  }

  // Results
  async getResults(filters?: {
    districtId?: number;
    level?: string;
    published?: boolean;
    limit?: number;
  }) {
    const where: any = {};
    if (filters?.districtId) where.districtId = filters.districtId;
    if (filters?.level) where.level = filters.level;
    if (filters?.published !== undefined) where.published = filters.published;

    return await prisma.result.findMany({
      where,
      include: { district: true },
      orderBy: { date: "desc" },
      take: filters?.limit || 50
    });
  }

  async getResult(id: number) {
    return await prisma.result.findUnique({
      where: { id },
      include: { district: true }
    });
  }

  async createResult(data: any) {
    return await prisma.result.create({ data });
  }

  async updateResult(id: number, data: any) {
    return await prisma.result.update({
      where: { id },
      data
    });
  }

  async deleteResult(id: number) {
    return await prisma.result.delete({
      where: { id }
    });
  }

  // Notices
  async getNotices(filters?: {
    category?: string;
    published?: boolean;
    limit?: number;
  }) {
    const where: any = {};
    if (filters?.category) where.category = filters.category;
    if (filters?.published !== undefined) where.published = filters.published;

    return await prisma.notice.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: filters?.limit || 50
    });
  }

  async getNotice(id: number) {
    return await prisma.notice.findUnique({
      where: { id }
    });
  }

  async getNoticeBySlug(slug: string) {
    return await prisma.notice.findUnique({
      where: { slug }
    });
  }

  async createNotice(data: any) {
    return await prisma.notice.create({ data });
  }

  async updateNotice(id: number, data: any) {
    return await prisma.notice.update({
      where: { id },
      data
    });
  }

  async deleteNotice(id: number) {
    return await prisma.notice.delete({
      where: { id }
    });
  }

  // Users
  async getUsers(filters?: {
    role?: string;
    districtId?: number;
  }) {
    const where: any = {};
    if (filters?.role) where.role = filters.role;
    if (filters?.districtId) where.districtId = filters.districtId;

    return await prisma.user.findMany({
      where,
      include: { district: true },
      orderBy: { name: "asc" }
    });
  }

  async getUser(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: { district: true }
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: { district: true }
    });
  }

  async createUser(data: any) {
    return await prisma.user.create({ data });
  }

  async updateUser(id: string, data: any) {
    return await prisma.user.update({
      where: { id },
      data
    });
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id }
    });
  }

  // Static Documents
  async getStaticDocs(section?: string) {
    const where = section ? { section } : {};
    return await prisma.staticDoc.findMany({
      where,
      orderBy: { title: "asc" }
    });
  }

  async getStaticDoc(id: number) {
    return await prisma.staticDoc.findUnique({
      where: { id }
    });
  }

  async createStaticDoc(data: any) {
    return await prisma.staticDoc.create({ data });
  }

  async updateStaticDoc(id: number, data: any) {
    return await prisma.staticDoc.update({
      where: { id },
      data
    });
  }

  async deleteStaticDoc(id: number) {
    return await prisma.staticDoc.delete({
      where: { id }
    });
  }

  // Form Definitions
  async getFormDefs(active?: boolean) {
    const where = active !== undefined ? { active } : {};
    return await prisma.formDef.findMany({
      where,
      orderBy: { title: "asc" }
    });
  }

  async getFormDef(key: string) {
    return await prisma.formDef.findUnique({
      where: { key }
    });
  }

  async createFormDef(data: any) {
    return await prisma.formDef.create({ data });
  }

  async updateFormDef(id: number, data: any) {
    return await prisma.formDef.update({
      where: { id },
      data
    });
  }

  async deleteFormDef(id: number) {
    return await prisma.formDef.delete({
      where: { id }
    });
  }

  // Submissions
  async getSubmissions(filters?: {
    formKey?: string;
    limit?: number;
  }) {
    const where: any = {};
    if (filters?.formKey) where.formKey = filters.formKey;

    return await prisma.submission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: filters?.limit || 50
    });
  }

  async getSubmission(id: number) {
    return await prisma.submission.findUnique({
      where: { id }
    });
  }

  async createSubmission(data: any) {
    return await prisma.submission.create({ data });
  }

  async deleteSubmission(id: number) {
    return await prisma.submission.delete({
      where: { id }
    });
  }

  // Dashboard Statistics
  async getDashboardStats() {
    const [
      totalUsers,
      totalDistricts,
      totalResults,
      totalNotices,
      totalForms,
      totalSubmissions,
      totalOfficials,
      totalTeams
    ] = await Promise.all([
      prisma.user.count(),
      prisma.district.count(),
      prisma.result.count(),
      prisma.notice.count(),
      prisma.formDef.count(),
      prisma.submission.count(),
      prisma.official.count(),
      prisma.team.count()
    ]);

    return {
      totalUsers,
      totalDistricts,
      totalResults,
      totalNotices,
      totalForms,
      totalSubmissions,
      totalOfficials,
      totalTeams
    };
  }

  // Recent Activity
  async getRecentActivity() {
    const [recentResults, recentNotices, recentSubmissions] = await Promise.all([
      prisma.result.findMany({
        orderBy: { date: "desc" },
        take: 5,
        include: { district: true }
      }),
      prisma.notice.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
      }),
      prisma.submission.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
      })
    ]);

    return {
      recentResults,
      recentNotices,
      recentSubmissions
    };
  }
}

// Create a singleton instance
export const db = new DatabaseService();

// Legacy compatibility functions (for existing code)
export async function getDistrictsWithCounts() {
  return await db.getDistricts();
}

export async function getResultsWithDistricts() {
  return await db.getResults();
}

export async function getRecentResults() {
  const activity = await db.getRecentActivity();
  return activity.recentResults;
}

export async function getRecentNotices() {
  const activity = await db.getRecentActivity();
  return activity.recentNotices;
}

export async function getRecentSubmissions() {
  const activity = await db.getRecentActivity();
  return activity.recentSubmissions;
}

// Mock data fallback (for development/testing)
export const mockData = {
  districts: [
    { id: 1, name: "Mumbai City", slug: "mumbai-city", about: "Financial capital", _count: { officials: 3, teams: 5, results: 12, users: 8 } },
    { id: 2, name: "Pune", slug: "pune", about: "Cultural capital", _count: { officials: 2, teams: 4, results: 8, users: 6 } }
  ],
  results: [
    { id: 1, teamA: "Mumbai Thunder", teamB: "Pune Panthers", scoreA: 21, scoreB: 19, date: new Date(), level: "State", published: true }
  ],
  notices: [
    { id: 1, title: "State Championship 2024", category: "Tournament", published: true, createdAt: new Date() }
  ]
};
