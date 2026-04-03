"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { resetPasswordAction } from "@/lib/auth/actions/reset-password";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    formData.set("token", token);
    const result = await resetPasswordAction(formData);
    if (result?.error) {
      setError(result.error);
      setStatus("idle");
    } else {
      setStatus("done");
      setTimeout(() => router.push("/login"), 2500);
    }
  }

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <div className="text-4xl">⚠️</div>
        <p className="text-sm text-gray-600">Liên kết không hợp lệ.</p>
        <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
          Yêu cầu liên kết mới
        </Link>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl">
          ✅
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Đặt lại mật khẩu thành công!</h2>
        <p className="text-sm text-gray-500">Đang chuyển hướng về trang đăng nhập...</p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Đặt mật khẩu mới</h2>
        <p className="text-sm text-gray-500">Nhập mật khẩu mới cho tài khoản của bạn.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
          Mật khẩu mới
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Tối thiểu 8 ký tự"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
        />
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">
          Xác nhận mật khẩu mới
        </label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Nhập lại mật khẩu mới"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Đang lưu..." : "Đặt lại mật khẩu"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            EduAssess
          </Link>
          <p className="text-gray-500 text-sm mt-2">Đặt lại mật khẩu</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <Suspense fallback={<div className="text-center text-sm text-gray-400">Đang tải...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            ← Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
