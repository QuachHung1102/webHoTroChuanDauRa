-- ============================================================
-- EduAssess — Enums
-- Tạo các kiểu ENUM dùng trong hệ thống
-- ============================================================

-- Vai trò người dùng
CREATE TYPE "Role" AS ENUM (
    'ADMIN',    -- Quản trị viên: phân quyền cho giáo viên
    'TEACHER',  -- Giáo viên: tạo câu hỏi, đề thi, xem kết quả học sinh
    'STUDENT'   -- Học sinh: làm bài, ôn tập flashcard
);

-- Cấp học
CREATE TYPE "SchoolLevel" AS ENUM (
    'PRIMARY',  -- Tiểu học: lớp 1–5
    'MIDDLE',   -- Trung học cơ sở: lớp 6–9
    'HIGH'      -- Trung học phổ thông: lớp 10–12
);

-- Độ khó câu hỏi
CREATE TYPE "Difficulty" AS ENUM (
    'EASY',     -- Dễ
    'MEDIUM',   -- Trung bình
    'HARD'      -- Khó
);

-- Trạng thái câu hỏi
CREATE TYPE "QuestionStatus" AS ENUM (
    'PENDING',   -- AI gợi ý, chờ giáo viên review/approve
    'APPROVED'   -- Đã được giáo viên duyệt, có thể dùng trong đề
);
