import { UserFilters } from "@/features/admin/users/user-filters";
import type { AdminUserRow } from "@/features/admin/users/types";
import { UsersTable } from "@/features/admin/users/users-table";

const users: AdminUserRow[] = [];

export function AdminUsersPageView() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý tài khoản</h1>
          <p className="text-gray-500 text-sm mt-1">Danh sách toàn bộ người dùng trong hệ thống</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          ➕ Thêm tài khoản
        </button>
      </div>

      <UserFilters />
      <UsersTable users={users} />
    </div>
  );
}