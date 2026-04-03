export type UserRoleFilter = "ALL" | "TEACHER" | "STUDENT";

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role: Exclude<UserRoleFilter, "ALL">;
  createdAt: string;
  status: "ACTIVE" | "INACTIVE";
};