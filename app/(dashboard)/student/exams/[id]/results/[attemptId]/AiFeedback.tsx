"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { getExamFeedbackAction } from "@/lib/ai/actions";

export function AiFeedback({ attemptId }: { attemptId: string }) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function handleLoad() {
    setError("");
    setIsLoading(true);
    const result = await getExamFeedbackAction(attemptId);
    setIsLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setFeedback(result.feedback ?? "");
      setLoaded(true);
    }
  }

  async function handleReload() {
    setLoaded(false);
    setFeedback(null);
    await handleLoad();
  }

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-purple-900 flex items-center gap-2">
          🤖 Nhận xét từ AI
        </h3>
        {!loaded && !isLoading && (
          <button
            onClick={handleLoad}
            className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Xem nhận xét
          </button>
        )}
        {loaded && !isLoading && (
          <button
            onClick={handleReload}
            className="text-xs text-purple-500 hover:underline"
          >
            Tạo lại
          </button>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-purple-700 py-2">
          <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          AI đang phân tích bài làm…
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {!isLoading && !loaded && !error && (
        <p className="text-sm text-purple-600">
          Nhận phân tích điểm mạnh/yếu và gợi ý ôn tập từ AI dựa trên bài làm của bạn.
        </p>
      )}

      {feedback && !isLoading && (
        <div className="prose prose-sm max-w-none text-gray-800
          prose-headings:text-gray-900 prose-headings:font-semibold
          prose-strong:text-gray-900
          prose-ul:my-1 prose-li:my-0
          prose-p:my-1.5
          prose-pre:overflow-x-auto">
          <ReactMarkdown>{feedback}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

