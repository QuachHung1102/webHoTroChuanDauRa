import { getAdminSubjectsWithTopics, getAdminGrades } from "@/lib/admin/queries";
import { SubjectToggle } from "./SubjectToggle";
import { TopicManager } from "./TopicManager";

export default async function AdminSubjectsPage() {
  const [subjects, grades] = await Promise.all([
    getAdminSubjectsWithTopics(),
    getAdminGrades(),
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Môn học & Chủ đề</h1>
        <p className="text-gray-500 text-sm mt-1">
          Bật/tắt quyền tạo câu hỏi cho từng môn · Quản lý chủ đề theo khối
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
              <tr>
                {["Môn học", "Câu hỏi", "Chủ đề", "GV được tạo câu hỏi", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <span className="font-medium text-gray-900">{subject.name}</span>
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    {subject._count.questions} câu
                  </td>
                  <td className="px-4 py-4">
                    <TopicManager
                      subjectId={subject.id}
                      subjectName={subject.name}
                      topics={subject.topics}
                      grades={grades}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <SubjectToggle
                        subjectId={subject.id}
                        initialEnabled={(subject as unknown as { canAddQuestions: boolean }).canAddQuestions}
                      />
                      <span
                        className={`text-xs font-medium ${
                          (subject as unknown as { canAddQuestions: boolean }).canAddQuestions
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        {(subject as unknown as { canAddQuestions: boolean }).canAddQuestions ? "Đang mở" : "Đã tắt"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-400 text-xs">
                    {(subject as unknown as { canAddQuestions: boolean }).canAddQuestions
                      ? "Giáo viên có thể thêm câu hỏi"
                      : "Giáo viên không thể thêm câu hỏi mới"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
