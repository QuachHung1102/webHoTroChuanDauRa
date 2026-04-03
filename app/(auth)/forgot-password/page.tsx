"use client";

import Link from "next/link";
import { useState } from "react";
import { forgotPasswordAction } from "@/lib/auth/actions/forgot-password";

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const result = await forgotPasswordAction(formData);
    if (result?.error) {
      setError(result.error);
      setStatus("idle");
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            EduAssess
          </Link>
          <p className="text-gray-500 text-sm mt-2">Đặt lại mật khẩu</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {status === "sent" ? (
            /* Thông báo gửi thành công */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl">
                ✉️
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Kiểm tra email của bạn</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Nếu địa chỉ email tồn tại trong hệ thống, chúng tôi đã gửi hướng dẫn đặt lại mật
                khẩu. Vui lòng kiểm tra hộp thư đến (và thư mục Spam).
              </p>
              <p className="text-xs text-gray-400">Liên kết có hiệu lực trong 1 giờ.</p>
              <Link
                href="/login"
                className="inline-block mt-2 text-sm text-blue-600 font-medium hover:underline"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          ) : (
            /* Form nhập email */
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Quên mật khẩu?</h2>
                <p className="text-sm text-gray-500">
                  Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="ten@truong.edu.vn"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Đang gửi..." : "Gửi liên kết đặt lại"}
              </button>
            </form>
          )}
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
