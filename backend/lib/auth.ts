import { NextRequest } from "next/server";
import { getAnonSupabase, getServerSupabase } from "./supabase";

export type AdminIdentity = {
  id: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN";
};

export async function requireAdmin(request: NextRequest, superOnly = false): Promise<AdminIdentity | null> {
  const bearer = request.headers.get("authorization");
  const cookie = request.cookies.get("ADMIN_SESSION")?.value;
  const token = bearer?.startsWith("Bearer ") ? bearer.slice(7) : cookie;
  if (!token) return null;

  const anon = getAnonSupabase();
  const { data, error } = await anon.auth.getUser(token);
  if (error || !data.user?.email) return null;

  const db = getServerSupabase();
  const { data: admin } = await db.from("admin_users").select("id,email,role,status")
    .eq("email", data.user.email.toLowerCase()).eq("status", "Active").maybeSingle();
  if (!admin) return null;
  if (superOnly && admin.role !== "SUPER_ADMIN") return null;
  return { id: admin.id, email: admin.email, role: admin.role };
}
