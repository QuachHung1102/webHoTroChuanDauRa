import type { AdminUserRow } from "@/features/admin/users/types";

const tableHeaders = ["Họ tên", "Email", "Vai trò", "Ngày tạo", "Trạng thái", ""];

type UsersTableProps = {
  users: AdminUserRow[];
};

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-16 text-gray-400">
                <div className="text-3xl mb-2">👥</div>
                <p>Chưa có người dùng nào</p>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-t border-gray-100">
                <td className="px-4 py-4 font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-4 text-gray-600">{user.email}</td>
                <td className="px-4 py-4 text-gray-600">{user.role}</td>
                <td className="px-4 py-4 text-gray-600">{user.createdAt}</td>
                <td className="px-4 py-4 text-gray-600">{user.status}</td>
                <td className="px-4 py-4 text-right text-gray-400">...</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}