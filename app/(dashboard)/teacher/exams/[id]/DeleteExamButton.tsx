"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteExamAction } from "@/lib/teacher/actions/exam";

export function DeleteExamButton({ examId }: { examId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!confirm("Xóa đề kiểm tra này? Thao tác không thể hoàn tác.")) return;
    startTransition(async () => {
      await deleteExamAction(examId);
      router.push("/teacher/exams");
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 disabled:opacity-50 transition-colors"
    >
      {isPending ? "Đang xóa..." : "🗑 Xóa đề"}
    </button>
  );
}
