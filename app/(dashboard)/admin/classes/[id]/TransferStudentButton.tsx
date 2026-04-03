"use client";

import { useState, useTransition } from "react";
import { transferStudentAction } from "@/lib/admin/actions";

export function TransferStudentButton({
  studentId,
  studentName,
  currentClassId,
  otherClasses,
}: {
  studentId: string;
  studentName: string;
  currentClassId: string;
  otherClasses: { id: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedClass) return;
    startTransition(async () => {
      await transferStudentAction(studentId, currentClassId, selectedClass);
      setOpen(false);
      setSelectedClass("");
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-2 py-1 text-xs text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
      >
        Chuyển lớp
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-semibold text-gray-900 mb-1">Chuyển lớp học sinh</h2>
            <p className="text-sm text-gray-500 mb-4">
              Học sinh: <span className="font-medium text-gray-800">{studentName}</span>
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chuyển sang lớp
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Chọn lớp --</option>
                  {otherClasses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isPending || !selectedClass}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isPending ? "Đang chuyển..." : "Xác nhận"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
