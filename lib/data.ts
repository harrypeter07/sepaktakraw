import { prisma } from "@/lib/prisma";

// Type definitions for database operations
interface DistrictData {
  name: string;
  slug: string;
  about?: string;
}

interface OfficialData {
  name: string;
  position: string;
  email?: string;
  phone?: string;
  districtId: number;
}

interface TeamData {
  name: string;
  level: string;
  districtId: number;
}

interface ResultData {
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  date: Date;
  level: string;
  venue?: string;
  published: boolean;
  districtId: number;
}

interface NoticeData {
  title: string;
  body: string;
  category: string;
  priority?: string;
  published: boolean;
}

interface UserData {
  name: string;
  email: string;
  role: string;
  districtId?: number;
}

interface StaticDocData {
  title: string;
  content: string;
  section: string;
}

interface FormDefData {
  key: string;
  title: string;
  description?: string;
  fields: unknown;
  active: boolean;
}

interface SubmissionData {
  formKey: string;
  data: unknown;
  submittedBy?: string;
}

interface ElectionData {
  title: string;
  description?: string;
  type: string;
  status: string;
  startDate: Date;
  endDate: Date;
  published: boolean;
}

interface ElectionDocumentData {
  title: string;
  description?: string;
  fileUrl: string;
  electionId: number;
}

interface CandidateData {
  name: string;
  position: string;
  districtId: number;
  electionId: number;
}

interface VoteData {
  candidateId: number;
  electionId: number;
  voterId?: string;
}

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

  async createDistrict(data: DistrictData) {
    return await prisma.district.create({ data });
  }

  async updateDistrict(id: number, data: Partial<DistrictData>) {
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

  async createOfficial(data: OfficialData) {
    return await prisma.official.create({ data });
  }

  async updateOfficial(id: number, data: Partial<OfficialData>) {
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

  async createTeam(data: TeamData) {
    return await prisma.team.create({ data });
  }

  async updateTeam(id: number, data: Partial<TeamData>) {
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
    const where: Record<string, unknown> = {};
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

  async createResult(data: ResultData) {
    return await prisma.result.create({ data });
  }

  async updateResult(id: number, data: Partial<ResultData>) {
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
    const where: Record<string, unknown> = {};
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

  async createNotice(data: NoticeData) {
    return await prisma.notice.create({ data });
  }

  async updateNotice(id: number, data: Partial<NoticeData>) {
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
    const where: Record<string, unknown> = {};
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

  async createUser(data: UserData) {
    return await prisma.user.create({ data });
  }

  async updateUser(id: string, data: Partial<UserData>) {
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

  async createStaticDoc(data: StaticDocData) {
    return await prisma.staticDoc.create({ data });
  }

  async updateStaticDoc(id: number, data: Partial<StaticDocData>) {
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

  async createFormDef(data: FormDefData) {
    return await prisma.formDef.create({ data });
  }

  async updateFormDef(id: number, data: Partial<FormDefData>) {
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
    const where: Record<string, unknown> = {};
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

  async createSubmission(data: SubmissionData) {
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

  // Elections
  async getElections(filters?: {
    status?: string;
    published?: boolean;
    limit?: number;
  }) {
    const where: Record<string, unknown> = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.published !== undefined) where.published = filters.published;

    return await prisma.election.findMany({
      where,
      include: {
        documents: true,
        candidates: {
          include: { district: true }
        },
        _count: {
          select: {
            candidates: true,
            votes: true
          }
        }
      },
      orderBy: { startDate: "desc" },
      take: filters?.limit || 50
    });
  }

  async getElection(id: number) {
    return await prisma.election.findUnique({
      where: { id },
      include: {
        documents: true,
        candidates: {
          include: { district: true }
        },
        votes: true,
        _count: {
          select: {
            candidates: true,
            votes: true
          }
        }
      }
    });
  }

  async createElection(data: ElectionData) {
    return await prisma.election.create({ data });
  }

  async updateElection(id: number, data: Partial<ElectionData>) {
    return await prisma.election.update({
      where: { id },
      data
    });
  }

  async deleteElection(id: number) {
    return await prisma.election.delete({
      where: { id }
    });
  }

  // Election Documents
  async getElectionDocuments(electionId: number) {
    return await prisma.electionDocument.findMany({
      where: { electionId },
      orderBy: { createdAt: "desc" }
    });
  }

  async createElectionDocument(data: ElectionDocumentData) {
    return await prisma.electionDocument.create({ data });
  }

  async updateElectionDocument(id: number, data: Partial<ElectionDocumentData>) {
    return await prisma.electionDocument.update({
      where: { id },
      data
    });
  }

  async deleteElectionDocument(id: number) {
    return await prisma.electionDocument.delete({
      where: { id }
    });
  }

  // Candidates
  async getCandidates(electionId?: number) {
    const where = electionId ? { electionId } : {};
    return await prisma.candidate.findMany({
      where,
      include: { 
        district: true,
        election: true,
        _count: {
          select: { votes: true }
        }
      },
      orderBy: { name: "asc" }
    });
  }

  async getCandidate(id: number) {
    return await prisma.candidate.findUnique({
      where: { id },
      include: { 
        district: true,
        election: true,
        votes: true
      }
    });
  }

  async createCandidate(data: CandidateData) {
    return await prisma.candidate.create({ data });
  }

  async updateCandidate(id: number, data: Partial<CandidateData>) {
    return await prisma.candidate.update({
      where: { id },
      data
    });
  }

  async deleteCandidate(id: number) {
    return await prisma.candidate.delete({
      where: { id }
    });
  }

  // Votes
  async getVotes(electionId?: number) {
    const where = electionId ? { electionId } : {};
    return await prisma.vote.findMany({
      where,
      include: { 
        candidate: true,
        election: true
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async createVote(data: VoteData) {
    return await prisma.vote.create({ data });
  }

  async getVoteStats(electionId: number) {
    const stats = await prisma.vote.groupBy({
      by: ['candidateId'],
      where: { electionId },
      _count: { candidateId: true }
    });

    return stats.map(stat => ({
      candidateId: stat.candidateId,
      voteCount: stat._count.candidateId
    }));
  }

  // Recent Activity
  async getRecentActivity() {
    const [recentResults, recentNotices, recentSubmissions, recentElections] = await Promise.all([
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
      }),
      prisma.election.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          _count: {
            select: { candidates: true, votes: true }
          }
        }
      })
    ]);

    return {
      recentResults,
      recentNotices,
      recentSubmissions,
      recentElections
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
