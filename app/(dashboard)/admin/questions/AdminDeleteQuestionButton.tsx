"use client";

import { adminDeleteQuestionAction } from "@/lib/admin/actions";
import { useTransition } from "react";

export function AdminDeleteQuestionButton({ questionId }: { questionId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Xóa câu hỏi này? Thao tác không thể hoàn tác.")) return;
    startTransition(async () => {
      await adminDeleteQuestionAction(questionId);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
    >
      {isPending ? "Đang xóa..." : "Xóa"}
    </button>
  );
}
