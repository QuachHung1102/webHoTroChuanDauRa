"use client";

import { useTransition } from "react";
import { deleteUserAction } from "@/lib/admin/actions";

export function DeleteUserButton({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Xóa tài khoản "${userName}"? Hành động này không thể hoàn tác.`)) return;
    startTransition(async () => {
      await deleteUserAction(userId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
    >
      {isPending ? "Đang xóa..." : "Xóa"}
    </button>
  );
}
