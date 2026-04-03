import Link from "next/link";
import { getTeacherSubjects, getGrades } from "@/lib/teacher/queries";
import { QuestionForm } from "./QuestionForm";

export default async function CreateQuestionPage() {
  const [subjects, grades] = await Promise.all([getTeacherSubjects(), getGrades()]);
  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 mb-6">
        <Link href="/teacher/question-bank" className="text-sm text-blue-600 hover:underline">
          ← Quay lại ngân hàng câu hỏi
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Thêm câu hỏi mới</h1>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <QuestionForm subjects={subjects} grades={grades} />
      </div>
    </div>
  );
}
