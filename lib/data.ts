import mockData from '../data.json';

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
