import Link from "next/link";
import { getStudentFlashcardSets } from "@/lib/student/queries";

export default async function StudentFlashcardsPage() {
  const sets = await getStudentFlashcardSets();

  return (
    <div className="flex flex-col gap-6">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Ôn tập Flashcard</h1>
        <p className="text-gray-500 text-sm mt-1">Các bộ flashcard giáo viên tạo cho bạn ôn luyện</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sets.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-400 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-3xl mb-2">🃏</div>
            <p>Chưa có bộ flashcard nào. Giáo viên sẽ giao khi cần ôn tập.</p>
          </div>
        ) : (
          sets.map((set) => (
            <Link
              key={set.id}
              href={`/student/flashcards/${set.id}`}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">🃏</span>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                  {set._count.items} thẻ
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {set.title}
              </h3>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-500">📚 {set.subject.name}</p>
                <p className="text-xs text-gray-500">🏫 Lớp {set.class.name}</p>
                <p className="text-xs text-gray-500">👤 GV: {set.createdBy.name}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {set._count.sessions > 0 ? `${set._count.sessions} lượt ôn` : "Chưa ôn lần nào"}
                </span>
                <span className="text-xs text-blue-600 font-medium group-hover:underline">
                  Học ngay →
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
