import Link from "next/link";
import { getTeacherSubjects, getGrades } from "@/lib/teacher/queries";
import { AiSuggestClient } from "./AiSuggestClient";

export default async function AISuggestPage() {
  const [subjects, grades] = await Promise.all([getTeacherSubjects(), getGrades()]);

  return (
    <div className="flex flex-col gap-4">
      <div className="shrink-0">
        <Link href="/teacher/question-bank" className="text-sm text-blue-600 hover:underline">
          ← Quay lại ngân hàng câu hỏi
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">AI gợi ý câu hỏi</h1>
        <p className="text-gray-500 text-sm mt-1">
          Mô tả yêu cầu, AI sẽ tạo câu hỏi và bạn review trước khi thêm vào ngân hàng
        </p>
      </div>

      <AiSuggestClient subjects={subjects} grades={grades} />
    </div>
  );
}
