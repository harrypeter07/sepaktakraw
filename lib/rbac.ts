export type Role = "SUPER_ADMIN" | "STATE_ADMIN" | "DISTRICT_ADMIN" | "EDITOR" | "VIEWER";

export const roleRank: Record<Role, number> = {
  SUPER_ADMIN: 5,
  STATE_ADMIN: 4,
  DISTRICT_ADMIN: 3,
  EDITOR: 2,
  VIEWER: 1,
};

export function hasAtLeast(role: Role, minimum: Role): boolean {
  return roleRank[role] >= roleRank[minimum];
}

export const permissions = {
  manageUsers: (role: Role) => hasAtLeast(role, "STATE_ADMIN"),
  manageAll: (role: Role) => hasAtLeast(role, "SUPER_ADMIN"),
  editContent: (role: Role) => hasAtLeast(role, "EDITOR"),
  editDistrict: (role: Role, districtId?: number, targetDistrictId?: number) =>
    hasAtLeast(role, "DISTRICT_ADMIN") && (!!districtId && districtId === targetDistrictId),
};


