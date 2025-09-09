import mockData from '../data.json';
import { prisma } from './prisma';

// Helper function to get district by ID
export function getDistrictById(id: number) {
  return mockData.districts.find(d => d.id === id);
}

// Helper function to get user by ID
export function getUserById(id: string) {
  return mockData.users.find(u => u.id === id);
}

// Helper function to get results with district information
export function getResultsWithDistricts() {
  return mockData.results.map(result => ({
    ...result,
    district: getDistrictById(result.districtId)
  }));
}

// Helper function to get officials with district information
export function getOfficialsWithDistricts() {
  return mockData.officials.map(official => ({
    ...official,
    district: getDistrictById(official.districtId)
  }));
}

// Helper function to get users with district information
export function getUsersWithDistricts() {
  return mockData.users.map(user => ({
    ...user,
    district: user.districtId ? getDistrictById(user.districtId) : null
  }));
}

// Helper function to get audit logs with user information
export function getAuditLogsWithUsers() {
  return mockData.auditLogs.map(log => ({
    ...log,
    user: getUserById(log.userId)
  }));
}

// Helper function to get form definitions with submission counts
export function getFormsWithSubmissionCounts() {
  return mockData.formDefs.map(form => ({
    ...form,
    _count: {
      submissions: mockData.submissions.filter(s => s.formKey === form.key).length
    }
  }));
}

// Helper function to get districts with counts
export function getDistrictsWithCounts() {
  return mockData.districts.map(district => ({
    ...district,
    _count: {
      officials: mockData.officials.filter(o => o.districtId === district.id).length,
      teams: 0, // Mock data doesn't have teams yet
      results: mockData.results.filter(r => r.districtId === district.id).length,
      users: mockData.users.filter(u => u.districtId === district.id).length
    }
  }));
}

// Export the raw data
export const data = mockData;

// Prisma-backed repository with mock fallback
export const repo = {
  async safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
    try {
      if (!process.env.DATABASE_URL) return fallback;
      return await fn();
    } catch {
      return fallback;
    }
  },
  users: {
    list: () =>
      repo.safe(
        () => prisma.user.findMany({ include: { district: true }, orderBy: { createdAt: 'desc' } }) as unknown as Promise<any>,
        mockData.users.map(u => ({ ...u, district: u.districtId ? getDistrictById(u.districtId) : null })) as unknown as any,
      ),
    count: () => repo.safe(() => prisma.user.count(), mockData.users.length),
  },
  districts: {
    count: () => repo.safe(() => prisma.district.count(), mockData.districts.length),
  },
  results: {
    list: () =>
      repo.safe(
        () => prisma.result.findMany({ include: { district: true }, orderBy: { date: 'desc' } }) as unknown as Promise<any>,
        getResultsWithDistricts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as unknown as any,
      ),
    count: () => repo.safe(() => prisma.result.count(), mockData.results.length),
  },
  notices: {
    list: () =>
      repo.safe(
        () => prisma.notice.findMany({ orderBy: { createdAt: 'desc' } }) as unknown as Promise<any>,
        mockData.notices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as unknown as any,
      ),
    count: () => repo.safe(() => prisma.notice.count(), mockData.notices.length),
  },
  forms: {
    list: () => repo.safe(() => prisma.formDef.findMany({ orderBy: { createdAt: 'desc' } }), mockData.formDefs as any),
    count: () => repo.safe(() => prisma.formDef.count(), mockData.formDefs.length),
    submissions: {
      list: () => repo.safe(() => prisma.submission.findMany({ orderBy: { createdAt: 'desc' } }) as any, mockData.submissions as any),
      count: () => repo.safe(() => prisma.submission.count(), mockData.submissions.length),
    },
  },
  officials: {
    list: () =>
      repo.safe(
        () => prisma.official.findMany({ include: { district: true }, orderBy: { name: 'asc' } }) as any,
        mockData.officials.map(o => ({ ...o, district: getDistrictById(o.districtId) })) as any,
      ),
    count: () => repo.safe(() => prisma.official.count(), mockData.officials.length),
  },
};
