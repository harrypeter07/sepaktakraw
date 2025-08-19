import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";
import { hasAtLeast, type Role } from "./rbac";

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
  districtId?: number | null;
};

export async function getSessionUser(req: NextRequest): Promise<SessionUser | null> {
  // Placeholder: integrate with Supabase Auth webhook/session lookup if needed
  const userId = req.headers.get("x-user-id");
  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return null;
  return { id: user.id, email: user.email, role: user.role as Role, districtId: user.districtId };
}

export async function requireRole(req: NextRequest, minimum: Role) {
  const session = await getSessionUser(req);
  if (!session || !hasAtLeast(session.role, minimum)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return null;
}


