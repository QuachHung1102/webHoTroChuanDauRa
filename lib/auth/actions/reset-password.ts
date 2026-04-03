"use server";

import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

export async function resetPasswordAction(formData: FormData) {
  const token = (formData.get("token") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  if (!token || !password) {
    return { error: "Dữ liệu không hợp lệ" };
  }
  if (password.length < 8) {
    return { error: "Mật khẩu phải có ít nhất 8 ký tự" };
  }
  if (password !== confirmPassword) {
    return { error: "Mật khẩu xác nhận không khớp" };
  }

  const record = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!record || record.expiresAt < new Date()) {
    return { error: "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { email: record.email },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return { success: true };
}
