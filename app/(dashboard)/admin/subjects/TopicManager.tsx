"use client";

import { useState, useTransition } from "react";
import { createTopicAction, deleteTopicAction } from "@/lib/admin/actions";

interface Topic {
  id: string;
  name: string;
  gradeId: string;
  grade: { gradeNumber: number };
  _count: { questions: number };
}

interface Grade {
  id: string;
  gradeNumber: number;
}

export function TopicManager({
  subjectId,
  subjectName,
  topics,
  grades,
}: {
  subjectId: string;
  subjectName: string;
  topics: Topic[];
  grades: Grade[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-2.5 py-1 text-xs text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
      >
        {topics.length} chủ đề
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-semibold text-gray-900">{subjectName} — Chủ đề</h2>
                <p className="text-xs text-gray-400 mt-0.5">{topics.length} chủ đề</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Add form */}
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <AddTopicForm subjectId={subjectId} grades={grades} />
              </div>

              {/* Topic list by grade */}
              {grades.map((grade) => {
                const gradeTopics = topics.filter((t) => t.grade.gradeNumber === grade.gradeNumber);
                if (gradeTopics.length === 0) return null;
                return (
                  <div key={grade.id}>
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Khối {grade.gradeNumber}</p>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {gradeTopics.map((topic) => (
                        <TopicRow key={topic.id} topic={topic} />
                      ))}
                    </div>
                  </div>
                );
              })}

              {topics.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm">Chưa có chủ đề nào</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AddTopicForm({ subjectId, grades }: { subjectId: string; grades: Grade[] }) {
  const [name, setName] = useState("");
  const [gradeId, setGradeId] = useState(grades[0]?.id ?? "");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !gradeId) return;
    setError("");
    startTransition(async () => {
      const result = await createTopicAction(name, subjectId, gradeId);
      if (result?.error) setError(result.error);
      else setName("");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <p className="text-xs font-medium text-gray-600">Thêm chủ đề mới</p>
      <div className="flex gap-2">
        <select
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value)}
          className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shrink-0"
        >
          {grades.map((g) => (
            <option key={g.id} value={g.id}>Khối {g.gradeNumber}</option>
          ))}
        </select>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên chủ đề..."
          required
          className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={isPending || !name.trim()}
          className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors shrink-0"
        >
          {isPending ? "..." : "+ Thêm"}
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  );
}

function TopicRow({ topic }: { topic: Topic }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleDelete() {
    if (!confirm(`Xóa chủ đề "${topic.name}"?`)) return;
    setError("");
    startTransition(async () => {
      const result = await deleteTopicAction(topic.id);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 gap-2">
      <div>
        <span className="text-sm text-gray-900">{topic.name}</span>
        {topic._count.questions > 0 && (
          <span className="ml-2 text-xs text-gray-400">{topic._count.questions} câu hỏi</span>
        )}
        {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      </div>
      <button
        onClick={handleDelete}
        disabled={isPending || topic._count.questions > 0}
        title={topic._count.questions > 0 ? "Không thể xóa: còn câu hỏi" : "Xóa chủ đề"}
        className="px-2 py-1 text-xs text-red-500 border border-red-200 rounded hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
      >
        {isPending ? "..." : "Xóa"}
      </button>
    </div>
  );
}
