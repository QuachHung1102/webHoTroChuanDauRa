import Link from "next/link";
import { getTeacherSubjects, getTeacherClasses } from "@/lib/teacher/queries";
import { ExamForm } from "./ExamForm";

export default async function CreateExamPage() {
  const [subjects, teacherClasses] = await Promise.all([getTeacherSubjects(), getTeacherClasses()]);
  const uniqueClasses = [
    ...new Map(
      teacherClasses.map((tc) => [tc.classId, { classId: tc.classId, className: tc.class.name }])
    ).values(),
  ];
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link href="/teacher/exams" className="text-sm text-blue-600 hover:underline">
          ← Quay lại danh sách đề
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Tạo đề kiểm tra</h1>
        <p className="text-gray-500 text-sm mt-1">
          Hệ thống tự động chọn câu hỏi từ ngân hàng đã duyệt theo tỷ lệ độ khó bạn đặt.
        </p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <ExamForm subjects={subjects} teacherClasses={uniqueClasses} />
      </div>
    </div>
  );
}
