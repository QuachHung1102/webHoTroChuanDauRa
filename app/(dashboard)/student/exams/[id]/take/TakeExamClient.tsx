"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { submitExamAction } from "@/lib/student/actions";
import { MathText } from "@/components/MathText";

type Option = { label: string; text: string };
type Question = {
  id: string;
  order: number;
  content: string;
  difficulty: string;
  topicName: string;
  options: Option[];
};

type Props = {
  title: string;
  duration: number;
  subjectName: string;
  questions: Question[];
  attemptId: string;
  startedAt: Date;
};

export default function TakeExamClient({
  title,
  duration,
  subjectName,
  questions,
  attemptId,
  startedAt,
}: Props) {
  // Timer: elapsed seconds since startedAt, capped at duration * 60
  const totalSeconds = duration * 60;
  const [timeLeft, setTimeLeft] = useState(() => {
    const elapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
    return Math.max(0, totalSeconds - elapsed);
  });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const autoSubmitted = useRef(false);

  const doSubmit = useCallback(() => {
    const payload = questions.map((q) => ({
      questionId: q.id,
      selectedOption: answers[q.id] ?? null,
    }));
    startTransition(() => {
      submitExamAction(attemptId, payload);
    });
  }, [answers, attemptId, questions]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!autoSubmitted.current) {
        autoSubmitted.current = true;
        doSubmit();
      }
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, doSubmit]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLastQuestion = currentIdx === questions.length - 1;
  const answeredCount = Object.values(answers).filter((v) => v !== null && v !== undefined).length;
  const currentQ = questions[currentIdx];
  const timerColor = timeLeft < 60 ? "text-red-600" : timeLeft < 300 ? "text-yellow-600" : "text-gray-900";

  return (
    <div className="flex flex-col h-full gap-0 -mt-6 -mx-6 lg:-mx-8">
      {/* Header bar */}
      <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-semibold text-gray-900 truncate">{title}</span>
          <span className="text-xs text-gray-400">· {subjectName}</span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-xs text-gray-500">{answeredCount}/{questions.length} câu đã trả lời</span>
          <div className={`font-mono text-lg font-bold tabular-nums ${timerColor}`}>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            disabled={isPending}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {isPending ? "Đang nộp…" : "Nộp bài"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Question navigator */}
        <div className="shrink-0 w-16 lg:w-56 bg-gray-50 border-r border-gray-200 p-3 overflow-y-auto">
          <p className="hidden lg:block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Câu hỏi</p>
          <div className="grid grid-cols-4 lg:grid-cols-5 gap-1.5">
            {questions.map((q, idx) => {
              const answered = answers[q.id] !== undefined && answers[q.id] !== null;
              const isCurrent = idx === currentIdx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`aspect-square rounded-md text-xs font-semibold transition-colors
                    ${isCurrent ? "bg-blue-600 text-white" : answered ? "bg-green-100 text-green-700 border border-green-300" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current question */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Câu {currentIdx + 1}/{questions.length}
              </span>
              <span className="text-xs text-gray-400">{currentQ.topicName}</span>
            </div>

            <p className="text-base font-medium text-gray-900 mb-6 leading-relaxed">
              <MathText text={currentQ.content} />
            </p>

            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const selected = answers[currentQ.id] === optIdx;
                return (
                  <button
                    key={opt.label}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [currentQ.id]: optIdx }))
                    }
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all
                      ${selected
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-800 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                  >
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 ${selected ? "bg-white text-blue-600" : "bg-gray-100 text-gray-600"}`}>
                      {opt.label}
                    </span>
                    <MathText text={opt.text} />
                  </button>
                );
              })}
            </div>

            {/* Prev / Next */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                ← Câu trước
              </button>
              {isLastQuestion ? (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Nộp bài ✓
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Câu tiếp →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Xác nhận nộp bài</h3>
            <p className="text-sm text-gray-600 mb-1">
              Bạn đã trả lời <strong>{answeredCount}/{questions.length}</strong> câu.
            </p>
            {answeredCount < questions.length && (
              <p className="text-sm text-yellow-700 bg-yellow-50 rounded-lg px-3 py-2 mb-4">
                ⚠️ Còn {questions.length - answeredCount} câu chưa trả lời. Câu bỏ trống sẽ tính sai.
              </p>
            )}
            <p className="text-sm text-red-600 mb-6">Sau khi nộp bạn không thể làm lại.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Xem lại
              </button>
              <button
                onClick={() => { setShowConfirm(false); doSubmit(); }}
                disabled={isPending}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                {isPending ? "Đang nộp…" : "Nộp bài"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
