"use client";

import { toggleSubjectQuestionsAction } from "@/lib/admin/actions";
import { useState, useTransition } from "react";

interface Props {
  subjectId: string;
  initialEnabled: boolean;
}

export function SubjectToggle({ subjectId, initialEnabled }: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const next = !enabled;
    setEnabled(next);
    startTransition(async () => {
      const res = await toggleSubjectQuestionsAction(subjectId, next);
      if (res && "error" in res) {
        // Revert on error
        setEnabled(!next);
      }
    });
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      } ${isPending ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      title={enabled ? "Đang mở – nhấn để tắt" : "Đang tắt – nhấn để mở"}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
