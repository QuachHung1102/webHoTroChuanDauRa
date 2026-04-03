"use client";

import { useTransition } from "react";
import { deleteClassAction } from "@/lib/admin/actions";

export function DeleteClassButton({ classId, className }: { classId: string; className: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Xóa lớp ${className}? Toàn bộ phân công giảng dạy và học sinh trong lớp sẽ bị xóa.`)) return;
    startTransition(async () => {
      await deleteClassAction(classId);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs text-red-600 hover:underline px-2 py-1 rounded hover:bg-red-50 transition-colors disabled:opacity-40"
    >
      {isPending ? "..." : "Xóa"}
    </button>
  );
}
