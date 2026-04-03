import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudentExamDetail } from "@/lib/student/queries";
import { startExamAction } from "@/lib/student/actions";

export default async function StudentExamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exam = await getStudentExamDetail(id);

  if (!exam) notFound();

  const attempt = exam.attempt;
  const isSubmitted = attempt !== null && attempt.submittedAt !== null;
  const isInProgress = attempt !== null && attempt.submittedAt === null;

  return (
    <div className="flex flex-col gap-6 max-w-2xl w-full">
      <div className="shrink-0">
        <Link href="/student/exams" className="text-sm text-blue-600 hover:underline">
          ← Quay lại danh sách
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-3">{exam.title}</h1>
      </div>

      {/* Exam info card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 shrink-0">
        <h2 className="font-semibold text-gray-900 mb-4">Thông tin đề thi</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">📚</span>
            <div>
              <div className="text-xs text-gray-500">Môn học</div>
              <div className="font-medium text-gray-900">{exam.subject.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🏫</span>
            <div>
              <div className="text-xs text-gray-500">Lớp</div>
              <div className="font-medium text-gray-900">{exam.class.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">📝</span>
            <div>
              <div className="text-xs text-gray-500">Số câu hỏi</div>
              <div className="font-medium text-gray-900">{exam._count.examQuestions} câu</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">⏱</span>
            <div>
              <div className="text-xs text-gray-500">Thời gian</div>
              <div className="font-medium text-gray-900">{exam.duration} phút</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status + action */}
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-green-900">✅ Bạn đã hoàn thành bài này</p>
              <p className="text-sm text-green-700 mt-1">
                Điểm: <span className="font-bold">{attempt.score !== null ? `${attempt.score.toFixed(0)}%` : "—"}</span>
                {" · "}
                Nộp lúc: {attempt.submittedAt ? new Date(attempt.submittedAt).toLocaleString("vi-VN") : "—"}
              </p>
            </div>
            <Link
              href={`/student/exams/${id}/results/${attempt.id}`}
              className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shrink-0"
            >
              Xem kết quả
            </Link>
          </div>
        </div>
      ) : isInProgress ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-yellow-900">⚠️ Bạn đang làm bài này dở</p>
              <p className="text-sm text-yellow-700 mt-1">
                Bắt đầu lúc: {new Date(attempt.startedAt).toLocaleString("vi-VN")}
              </p>
            </div>
            <Link
              href={`/student/exams/${id}/take?attemptId=${attempt.id}`}
              className="bg-yellow-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors shrink-0"
            >
              Tiếp tục làm bài
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-blue-900">📋 Sẵn sàng bắt đầu?</p>
              <p className="text-sm text-blue-700 mt-1">
                Bạn có {exam.duration} phút để hoàn thành {exam._count.examQuestions} câu hỏi.
                Chú ý: không được làm lại sau khi nộp.
              </p>
            </div>
            <form action={startExamAction.bind(null, id)}>
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shrink-0"
              >
                Bắt đầu làm bài
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
