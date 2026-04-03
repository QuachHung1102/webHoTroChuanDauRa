import Link from "next/link";
import { getAdminSubjects, getAdminGrades } from "@/lib/admin/queries";
import { AdminQuestionForm } from "./AdminQuestionForm";

export default async function AdminCreateQuestionPage() {
  const [subjects, grades] = await Promise.all([getAdminSubjects(), getAdminGrades()]);

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 mb-6">
        <Link href="/admin/questions" className="text-sm text-blue-600 hover:underline">
          ← Quay lại ngân hàng câu hỏi
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Thêm câu hỏi thủ công</h1>
        <p className="text-gray-500 text-sm mt-1">
          Câu hỏi do Admin tạo sẽ được tự động duyệt (Đã duyệt).
        </p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <AdminQuestionForm subjects={subjects} grades={grades} />
      </div>
    </div>
  );
}
