import Link from "next/link";
import { auth, signOut } from "@/auth";
import { ROLE_LABELS } from "@/lib/auth/access";
import { dashboardNavItems } from "@/lib/navigation/dashboard";
import { redirect } from "next/navigation";
import type { Role } from "@/lib/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const role = session.user.role as Role;
  const items = dashboardNavItems[role] ?? [];
  const roleLabel = ROLE_LABELS[role];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-slate-300 flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-700">
          <Link href="/" className="text-white font-bold text-lg">
            EduAssess
          </Link>
          <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
            {roleLabel}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-700 hover:text-white transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              {session.user.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{session.user.name}</p>
              <p className="text-slate-400 text-xs truncate">{session.user.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="mt-3 w-full text-center text-xs text-slate-400 hover:text-white transition-colors"
            >
              Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto flex flex-col">{children}</main>
      </div>
    </div>
  );
}
