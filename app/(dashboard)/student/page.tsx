import Link from "next/link";
import { auth } from "@/auth";
import { getStudentStats } from "@/lib/student/queries";

export default async function StudentDashboard() {
  const [session, stats] = await Promise.all([auth(), getStudentStats()]);
  const name = session?.user?.name?.split(" ").pop() ?? "bạn";

  const statCards = [
    { label: "Bài chờ làm", value: stats.pendingExams, icon: "📝", href: "/student/exams" },
    { label: "Đã hoàn thành", value: stats.completedExams, icon: "✅", href: "/student/progress" },
    { label: "Bộ flashcard", value: stats.flashcardSets, icon: "🃏", href: "/student/flashcards" },
    {
      label: "Điểm TB",
      value: stats.avgScore !== null ? `${stats.avgScore.toFixed(1)}%` : "—",
      icon: "⭐",
      href: "/student/progress",
    },
  ];

  return (
      <div className="flex flex-col gap-6">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Xin chào, {name}! 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Đây là trang học tập cá nhân của bạn</p>
      </div>

      <div className="shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
            <div className="text-2xl mb-2 text-center">{s.icon}</div>
            <div className="text-3xl font-bold text-gray-900 text-center">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1 text-center">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* AI suggestion */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <h3 className="font-semibold text-blue-900 text-sm">Gợi ý từ AI</h3>
            <p className="text-blue-700 text-sm mt-1">
              Hoàn thành ít nhất một bài kiểm tra để AI phân tích điểm mạnh/yếu và gợi ý nội dung ôn tập phù hợp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
