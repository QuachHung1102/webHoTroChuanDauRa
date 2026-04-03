import Link from "next/link";
import { getStudentProgress } from "@/lib/student/queries";

export default async function StudentProgressPage() {
  const attempts = await getStudentProgress();

  const avgScore =
    attempts.length > 0
      ? attempts.reduce((sum, a) => sum + (a.score ?? 0), 0) / attempts.length
      : null;

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Tiến trình học tập</h1>
        <p className="text-gray-500 text-sm mt-1">Lịch sử làm bài và phân tích năng lực của bạn</p>
      </div>

      {/* Summary cards */}
      <div className="shrink-0 grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <div className="text-3xl font-bold text-gray-900">{attempts.length}</div>
          <div className="text-xs text-gray-500 mt-1">Bài đã làm</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <div className={`text-3xl font-bold ${avgScore === null ? "text-gray-400" : avgScore >= 80 ? "text-green-600" : avgScore >= 50 ? "text-yellow-600" : "text-red-600"}`}>
            {avgScore !== null ? `${avgScore.toFixed(1)}%` : "—"}
          </div>
          <div className="text-xs text-gray-500 mt-1">Điểm trung bình</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <div className="text-3xl font-bold text-blue-600">
            {attempts.filter((a) => (a.score ?? 0) >= 80).length}
          </div>
          <div className="text-xs text-gray-500 mt-1">Bài đạt trên 80%</div>
        </div>
      </div>

      {/* History table */}
      <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="font-semibold text-gray-900">Lịch sử làm bài</h2>
        </div>
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
              <tr>
                {["Tên bài", "Môn học", "Lớp", "Ngày nộp", "Điểm", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {attempts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400">
                    <div className="text-3xl mb-2">📊</div>
                    <p>Chưa có lịch sử làm bài</p>
                  </td>
                </tr>
              ) : (
                attempts.map((attempt) => {
                  const score = attempt.score;
                  const scoreColor =
                    score === null ? "text-gray-400" : score >= 80 ? "text-green-600 font-semibold" : score >= 50 ? "text-yellow-600 font-semibold" : "text-red-600 font-semibold";
                  return (
                    <tr key={attempt.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{attempt.exam.title}</td>
                      <td className="px-4 py-3 text-gray-600">{attempt.exam.subject.name}</td>
                      <td className="px-4 py-3 text-gray-600">Lớp {attempt.exam.class.name}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {attempt.submittedAt ? new Date(attempt.submittedAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}
                      </td>
                      <td className={`px-4 py-3 ${scoreColor}`}>
                        {score !== null ? `${score.toFixed(0)}%` : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/student/exams/${attempt.examId}/results/${attempt.id}`} className="text-xs text-blue-600 hover:underline">
                          Xem kết quả
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
