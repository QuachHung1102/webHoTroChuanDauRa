"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteQuestionAction } from "@/lib/teacher/actions/question";

export function DeleteQuestionButton({ questionId }: { questionId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Xác nhận xoá câu hỏi này?")) return;
    startTransition(async () => {
      await deleteQuestionAction(questionId);
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs text-red-500 hover:text-red-700 disabled:opacity-40 transition-colors"
    >
      {isPending ? "Đang xoá..." : "Xoá"}
    </button>
  );
}
