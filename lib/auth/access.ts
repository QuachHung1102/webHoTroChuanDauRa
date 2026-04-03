import type { Role } from "@/lib/types";

export const PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password", "/reset-password"];

export const ROLE_HOME: Record<Role, string> = {
  ADMIN: "/admin",
  TEACHER: "/teacher",
  STUDENT: "/student",
};

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Admin",
  TEACHER: "Giáo viên",
  STUDENT: "Học sinh",
};

export const ROLE_PREFIX: Record<string, Role> = {
  "/admin": "ADMIN",
  "/teacher": "TEACHER",
  "/student": "STUDENT",
};