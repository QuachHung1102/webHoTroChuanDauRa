"use server";

import { prisma } from "@/lib/db/prisma";
import { randomBytes } from "crypto";

export async function forgotPasswordAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();

  if (!email) {
    return { error: "Vui lòng nhập địa chỉ email" };
  }

  // Luôn trả về success để không lộ thông tin tài khoản tồn tại hay không
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: true };
  }

  // Xóa token cũ nếu có
  await prisma.passwordResetToken.deleteMany({ where: { email } });

  // Tạo token mới, hết hạn sau 1 giờ
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { email, token, expiresAt },
  });

  // TODO: Gửi email chứa link reset password
  // Link dạng: ${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}
  // Cần tích hợp dịch vụ email (Resend, SendGrid, Nodemailer...) tại đây

  console.log(`[DEV] Reset link: /reset-password?token=${token}`);

  return { success: true };
}
