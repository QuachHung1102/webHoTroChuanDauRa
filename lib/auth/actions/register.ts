"use server";

import type { Role } from "@/lib/types";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

export async function registerAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;
  const role = (formData.get("role") as Role) ?? "STUDENT";

  if (!name || !email || !password) {
    return { error: "Vui lòng điền đầy đủ thông tin" };
  }
  if (password.length < 8) {
    return { error: "Mật khẩu phải có ít nhất 8 ký tự" };
  }
  if (password !== confirmPassword) {
    return { error: "Mật khẩu xác nhận không khớp" };
  }
  if (!["TEACHER", "STUDENT"].includes(role)) {
    return { error: "Vai trò không hợp lệ" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Email này đã được đăng ký" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  return { success: true };
}