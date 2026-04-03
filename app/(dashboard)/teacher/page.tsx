import Link from "next/link";
import { getTeacherStats } from "@/lib/teacher/queries";
import { auth } from "@/auth";

export default async function TeacherDashboard() {
  const [session, stats] = await Promise.all([auth(), getTeacherStats()]);

  const statCards = [
    { label: "Câu hỏi trong ngân hàng", value: stats.questionCount, icon: "🏦", href: "/teacher/question-bank" },
    { label: "Đề kiểm tra đã tạo", value: stats.examCount, icon: "📝", href: "/teacher/exams" },
    { label: "Học sinh đang quản lý", value: stats.studentCount, icon: "👥", href: "/teacher/classes" },
    { label: "Câu hỏi chờ duyệt", value: stats.pendingCount, icon: "⏳", href: "/teacher/question-bank?status=PENDING" },
  ];

  const name = session?.user?.name?.split(" ").pop() ?? "Giáo viên";

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Xin chào, {name}! 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Đây là tổng quan hoạt động của bạn</p>
      </div>

      {/* Stats */}
      <div className="shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
            <div className="text-2xl mb-2 text-center">{s.icon}</div>
            <div className="text-3xl font-bold text-gray-900 text-center">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1 text-center">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { href: "/teacher/question-bank/create", label: "Thêm câu hỏi mới", icon: "➕" },
            { href: "/teacher/question-bank/ai-suggest", label: "AI gợi ý câu hỏi", icon: "🤖" },
            { href: "/teacher/exams/create", label: "Tạo đề kiểm tra", icon: "📝" },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
            >
              <span>{a.icon}</span>
              <span className="font-medium text-gray-700">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
