"use client";

import { useTransition } from "react";
import { removeStudentFromClassAction } from "@/lib/admin/actions";

export function RemoveStudentButton({
  studentId,
  classId,
  studentName,
}: {
  studentId: string;
  classId: string;
  studentName: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Xóa học sinh "${studentName}" khỏi lớp này?`)) return;
    startTransition(async () => {
      await removeStudentFromClassAction(studentId, classId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="px-2 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50 disabled:opacity-50 transition-colors"
    >
      {isPending ? "..." : "Xóa"}
    </button>
  );
}
