import Link from "next/link";
import { getStudentExams } from "@/lib/student/queries";
import { startExamAction } from "@/lib/student/actions";

export default async function StudentExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ pending, completed }, sp] = await Promise.all([getStudentExams(), searchParams]);
  const tab = sp.tab === "completed" ? "completed" : "pending";

  return (
    <div className="flex flex-col gap-4">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Bài kiểm tra</h1>
        <p className="text-gray-500 text-sm mt-1">Các bài kiểm tra được giáo viên giao</p>
      </div>

      {/* Tabs */}
      <div className="shrink-0 flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        <Link
          href="/student/exams?tab=pending"
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            tab === "pending" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Chờ làm ({pending.length})
        </Link>
        <Link
          href="/student/exams?tab=completed"
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            tab === "completed" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Đã hoàn thành ({completed.length})
        </Link>
      </div>

      {/* Pending exams */}
      {tab === "pending" && (
        <div className="space-y-3">
          {pending.length === 0 ? (
            <div className="text-center py-16 text-gray-400 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-3xl mb-2">🎉</div>
              <p>Không có bài nào đang chờ làm</p>
            </div>
          ) : (
            pending.map((exam) => (
              <div key={exam.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link href={`/student/exams/${exam.id}`} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {exam.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>📚 {exam.subject.name}</span>
                    <span>🏫 Lớp {exam.class.name}</span>
                    <span>📝 {exam._count.examQuestions} câu</span>
                    <span>⏱ {exam.duration} phút</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  {exam.attempt && exam.attempt.submittedAt === null && (
                    <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">Đang làm dở</span>
                  )}
                  <form action={startExamAction.bind(null, exam.id)}>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      {exam.attempt && exam.attempt.submittedAt === null ? "Tiếp tục" : "Bắt đầu"}
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Completed exams */}
      {tab === "completed" && (
        <div className="space-y-3">
          {completed.length === 0 ? (
            <div className="text-center py-16 text-gray-400 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-3xl mb-2">📝</div>
              <p>Chưa hoàn thành bài nào</p>
            </div>
          ) : (
            completed.map((exam) => {
              const score = exam.attempt.score;
              const scoreColor =
                score === null ? "text-gray-500" : score >= 80 ? "text-green-600" : score >= 50 ? "text-yellow-600" : "text-red-600";
              return (
                <div key={exam.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{exam.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>📚 {exam.subject.name}</span>
                      <span>🏫 Lớp {exam.class.name}</span>
                      <span>🗓 {exam.attempt.submittedAt ? new Date(exam.attempt.submittedAt).toLocaleDateString("vi-VN") : ""}</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-4">
                    <span className={`text-xl font-bold ${scoreColor}`}>
                      {score !== null ? `${score.toFixed(0)}%` : "—"}
                    </span>
                    <Link
                      href={`/student/exams/${exam.id}/results/${exam.attempt.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Xem kết quả
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
